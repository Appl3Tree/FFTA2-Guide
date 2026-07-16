import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import type { User } from "firebase/auth";
import { firebaseEnabled, GUIDE_SLUG } from "../lib/firebaseConfig";

type FirebaseRuntime = typeof import("../lib/firebase");

type ProgressMap = Record<string, boolean>;
export type GuidePreferences = Record<string, unknown>;
type PreferenceTimestamps = Record<string, number>;
type PreferenceState = {
    values: GuidePreferences;
    updatedAt: PreferenceTimestamps;
};
type PreferenceValue<T> = T | ((current: T | undefined) => T);
type AuthStatus = "disabled" | "loading" | "signed-out" | "signed-in";
type SyncStatus = "local-only" | "idle" | "loading" | "syncing" | "saved" | "error";
export type SyncConflictChoice = "local" | "cloud" | "merge";

export interface SyncConflict {
    local: ProgressMap;
    cloud: ProgressMap;
    merged: ProgressMap;
    localOnly: string[];
    cloudOnly: string[];
    localCount: number;
    cloudCount: number;
    mergedCount: number;
}

export interface ProgressContextValue {
    checked: ProgressMap;
    preferences: GuidePreferences;
    setCheck: (key: string, next?: boolean) => void;
    setPreference: <T>(key: string, next: PreferenceValue<T>) => void;
    user: User | null;
    authStatus: AuthStatus;
    syncStatus: SyncStatus;
    authError: string | null;
    syncConflict: SyncConflict | null;
    createAccountWithEmail: (email: string, password: string) => Promise<void>;
    resetPassword: (email: string) => Promise<void>;
    signInWithEmail: (email: string, password: string) => Promise<void>;
    signInWithGoogle: () => Promise<void>;
    signOut: () => Promise<void>;
    resolveSyncConflict: (choice: SyncConflictChoice) => void;
}

const ProgressContext = createContext<ProgressContextValue | undefined>(
    undefined,
);

const STORAGE_KEY_CHECKED = "ffta2Guide.checked";
const STORAGE_KEY_PREFERENCES = "ffta2Guide.preferences.v1";
const LEGACY_CHECKLIST_PREFERENCES_KEY =
    "ffta2-guide:checklist-preferences:v1";
const LEGACY_WIDE_LAYOUT_KEY = "ffta2-guide:wide-layout";
const SYNC_DEBOUNCE_MS = 1000;

function readLocalProgress(): ProgressMap {
    if (typeof window === "undefined") {
        return {};
    }
    try {
        const raw = window.localStorage.getItem(STORAGE_KEY_CHECKED);
        return raw ? (JSON.parse(raw) as ProgressMap) : {};
    } catch {
        return {};
    }
}

function writeLocalProgress(checked: ProgressMap) {
    if (typeof window === "undefined") {
        return;
    }
    try {
        window.localStorage.setItem(STORAGE_KEY_CHECKED, JSON.stringify(checked));
    } catch {
        // Local persistence is best-effort; cloud sync still gets a chance.
    }
}

function isRecord(value: unknown): value is Record<string, unknown> {
    return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function readLocalPreferences(): PreferenceState {
    const empty: PreferenceState = { values: {}, updatedAt: {} };
    if (typeof window === "undefined") return empty;

    let state = empty;
    try {
        const raw = window.localStorage.getItem(STORAGE_KEY_PREFERENCES);
        if (raw) {
            const parsed = JSON.parse(raw) as unknown;
            if (isRecord(parsed)) {
                const values = isRecord(parsed.values) ? parsed.values : {};
                const rawTimestamps = isRecord(parsed.updatedAt)
                    ? parsed.updatedAt
                    : {};
                const updatedAt = Object.fromEntries(
                    Object.entries(rawTimestamps).flatMap(([key, value]) =>
                        typeof value === "number" && Number.isFinite(value)
                            ? [[key, value]]
                            : [],
                    ),
                );
                state = { values, updatedAt };
            }
        }
    } catch {
        state = empty;
    }

    const values = { ...state.values };
    const updatedAt = { ...state.updatedAt };
    const migratedAt = Date.now();

    if (!("checklists" in values)) {
        try {
            const legacy = window.localStorage.getItem(
                LEGACY_CHECKLIST_PREFERENCES_KEY,
            );
            if (legacy) {
                const parsed = JSON.parse(legacy) as unknown;
                if (isRecord(parsed)) {
                    values.checklists = parsed;
                    updatedAt.checklists = migratedAt;
                }
            }
        } catch {
            // Ignore malformed legacy data and use the current defaults.
        }
    }

    if (!("layout.wide" in values)) {
        const legacy = window.localStorage.getItem(LEGACY_WIDE_LAYOUT_KEY);
        if (legacy === "true" || legacy === "false") {
            values["layout.wide"] = legacy === "true";
            updatedAt["layout.wide"] = migratedAt;
        }
    }

    return { values, updatedAt };
}

function writeLocalPreferences(state: PreferenceState) {
    if (typeof window === "undefined") return;
    try {
        window.localStorage.setItem(
            STORAGE_KEY_PREFERENCES,
            JSON.stringify(state),
        );
    } catch {
        // Local persistence is best-effort; cloud sync still gets a chance.
    }
}

function mergePreferenceStates(
    local: PreferenceState,
    remote: PreferenceState,
): PreferenceState {
    const values: GuidePreferences = {};
    const updatedAt: PreferenceTimestamps = {};
    const keys = new Set([
        ...Object.keys(remote.values),
        ...Object.keys(local.values),
    ]);

    for (const key of keys) {
        const hasLocal = Object.prototype.hasOwnProperty.call(
            local.values,
            key,
        );
        const hasRemote = Object.prototype.hasOwnProperty.call(
            remote.values,
            key,
        );
        const localTimestamp = local.updatedAt[key] ?? 0;
        const remoteTimestamp = remote.updatedAt[key] ?? 0;
        const useLocal =
            hasLocal &&
            (!hasRemote || localTimestamp >= remoteTimestamp);

        values[key] = useLocal ? local.values[key] : remote.values[key];
        updatedAt[key] = useLocal ? localTimestamp : remoteTimestamp;
    }

    return { values, updatedAt };
}

function parseRemotePreferences(data: Record<string, unknown>): PreferenceState {
    const values = isRecord(data.preferences) ? data.preferences : {};
    const rawTimestamps = isRecord(data.preferenceUpdatedAt)
        ? data.preferenceUpdatedAt
        : {};
    const updatedAt = Object.fromEntries(
        Object.entries(rawTimestamps).flatMap(([key, value]) =>
            typeof value === "number" && Number.isFinite(value)
                ? [[key, value]]
                : [],
        ),
    );
    return { values, updatedAt };
}

function mergeProgress(local: ProgressMap, remote: ProgressMap): ProgressMap {
    return { ...remote, ...local };
}

function checkedKeys(progress: ProgressMap): string[] {
    return Object.keys(progress).filter((key) => progress[key]).sort();
}

function progressCount(progress: ProgressMap): number {
    return checkedKeys(progress).length;
}

function sameProgress(left: ProgressMap, right: ProgressMap): boolean {
    const leftKeys = checkedKeys(left);
    const rightKeys = checkedKeys(right);
    return (
        leftKeys.length === rightKeys.length &&
        leftKeys.every((key, index) => key === rightKeys[index])
    );
}

function createSyncConflict(local: ProgressMap, cloud: ProgressMap): SyncConflict {
    const merged = mergeProgress(local, cloud);
    const localKeys = checkedKeys(local);
    const cloudKeys = checkedKeys(cloud);
    const localSet = new Set(localKeys);
    const cloudSet = new Set(cloudKeys);

    return {
        local,
        cloud,
        merged,
        localOnly: localKeys.filter((key) => !cloudSet.has(key)),
        cloudOnly: cloudKeys.filter((key) => !localSet.has(key)),
        localCount: localKeys.length,
        cloudCount: cloudKeys.length,
        mergedCount: progressCount(merged),
    };
}

function progressDocRef(runtime: FirebaseRuntime, userId: string) {
    const database = runtime.db;
    if (!database) {
        throw new Error("Firestore is not configured.");
    }
    return runtime.doc(
        database,
        "users",
        userId,
        "guides",
        GUIDE_SLUG,
    );
}

export function ProgressProvider({ children }: { children: React.ReactNode }) {
    const [checked, setChecked] = useState<ProgressMap>(readLocalProgress);
    const [preferenceState, setPreferenceState] =
        useState<PreferenceState>(readLocalPreferences);
    const checkedRef = useRef(checked);
    const preferenceStateRef = useRef(preferenceState);
    const firebaseRuntimeRef = useRef<FirebaseRuntime | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [authStatus, setAuthStatus] = useState<AuthStatus>(
        firebaseEnabled ? "loading" : "disabled",
    );
    const [syncStatus, setSyncStatus] = useState<SyncStatus>(
        firebaseEnabled ? "idle" : "local-only",
    );
    const [authError, setAuthError] = useState<string | null>(null);
    const [remoteReady, setRemoteReady] = useState(false);
    const [syncConflict, setSyncConflict] = useState<SyncConflict | null>(null);
    const [syncRevision, setSyncRevision] = useState(0);

    useEffect(() => {
        checkedRef.current = checked;
        writeLocalProgress(checked);
    }, [checked]);

    useEffect(() => {
        preferenceStateRef.current = preferenceState;
        writeLocalPreferences(preferenceState);
    }, [preferenceState]);

    useEffect(() => {
        const handleStorage = (event: StorageEvent) => {
            if (event.key === STORAGE_KEY_CHECKED) {
                setChecked(readLocalProgress());
            }
            if (event.key === STORAGE_KEY_PREFERENCES) {
                setPreferenceState(readLocalPreferences());
            }
        };

        window.addEventListener("storage", handleStorage);
        return () => window.removeEventListener("storage", handleStorage);
    }, []);

    useEffect(() => {
        let active = true;
        let unsubscribe: (() => void) | undefined;

        if (!firebaseEnabled) {
            setAuthStatus("disabled");
            setSyncStatus("local-only");
            return;
        }

        const initializeFirebase = async () => {
            try {
                const runtime = await import("../lib/firebase");
                if (!active) return;

                firebaseRuntimeRef.current = runtime;
                const auth = runtime.auth;
                if (!auth) {
                    setAuthStatus("disabled");
                    setSyncStatus("local-only");
                    return;
                }

                unsubscribe = runtime.onAuthStateChanged(
                    auth,
                    async (nextUser) => {
                        if (!active) return;

                        setUser(nextUser);
                        setAuthError(null);
                        setRemoteReady(false);
                        setSyncConflict(null);

                        if (!nextUser) {
                            setAuthStatus("signed-out");
                            setSyncStatus("idle");
                            return;
                        }

                        setAuthStatus("signed-in");
                        setSyncStatus("loading");

                        try {
                            const snapshot = await runtime.getDoc(
                                progressDocRef(runtime, nextUser.uid),
                            );
                            if (!active) return;

                            const snapshotData = snapshot.exists()
                                ? (snapshot.data() as Record<string, unknown>)
                                : {};
                            const remoteChecked = isRecord(snapshotData.checked)
                                ? (snapshotData.checked as ProgressMap)
                                : {};
                            const mergedPreferences = mergePreferenceStates(
                                preferenceStateRef.current,
                                parseRemotePreferences(snapshotData),
                            );
                            const localChecked = checkedRef.current;
                            const localCount = progressCount(localChecked);
                            const cloudCount = progressCount(remoteChecked);

                            setPreferenceState(mergedPreferences);

                            if (
                                localCount > 0 &&
                                cloudCount > 0 &&
                                !sameProgress(localChecked, remoteChecked)
                            ) {
                                setSyncConflict(
                                    createSyncConflict(
                                        localChecked,
                                        remoteChecked,
                                    ),
                                );
                                setSyncStatus("idle");
                                return;
                            }

                            setChecked(
                                cloudCount > 0 ? remoteChecked : localChecked,
                            );
                            setRemoteReady(true);
                            setSyncStatus("saved");
                        } catch (error) {
                            if (!active) return;
                            setAuthError(
                                error instanceof Error
                                    ? error.message
                                    : "Unable to load cloud progress.",
                            );
                            setSyncStatus("error");
                        }
                    },
                );
            } catch (error) {
                if (!active) return;
                setAuthError(
                    error instanceof Error
                        ? error.message
                        : "Unable to initialize cloud progress.",
                );
                setAuthStatus("disabled");
                setSyncStatus("error");
            }
        };

        void initializeFirebase();

        return () => {
            active = false;
            unsubscribe?.();
        };
    }, []);

    useEffect(() => {
        const runtime = firebaseRuntimeRef.current;
        if (!firebaseEnabled || !runtime || !user || !remoteReady) {
            return;
        }

        setSyncStatus("syncing");
        const timeout = window.setTimeout(async () => {
            try {
                await runtime.setDoc(
                    progressDocRef(runtime, user.uid),
                    {
                        checked,
                        preferences: preferenceState.values,
                        preferenceUpdatedAt: preferenceState.updatedAt,
                        guideSlug: GUIDE_SLUG,
                        schemaVersion: 2,
                        updatedAt: runtime.serverTimestamp(),
                    },
                );
                setSyncStatus("saved");
            } catch (error) {
                setAuthError(
                    error instanceof Error
                        ? error.message
                        : "Unable to save cloud progress.",
                );
                setSyncStatus("error");
            }
        }, SYNC_DEBOUNCE_MS);

        return () => window.clearTimeout(timeout);
    }, [checked, preferenceState, remoteReady, syncRevision, user]);

    const setCheck = useCallback((key: string, next?: boolean) => {
        setChecked((prev) => {
            const value = next ?? !prev[key];
            if (!value) {
                const copy = { ...prev };
                delete copy[key];
                return copy;
            }
            return { ...prev, [key]: value };
        });
    }, []);

    const setPreference = useCallback(
        <T,>(key: string, next: PreferenceValue<T>) => {
            setPreferenceState((current) => {
                const currentValue = current.values[key] as T | undefined;
                const nextValue =
                    typeof next === "function"
                        ? (next as (value: T | undefined) => T)(currentValue)
                        : next;

                return {
                    values: {
                        ...current.values,
                        [key]: nextValue,
                    },
                    updatedAt: {
                        ...current.updatedAt,
                        [key]: Date.now(),
                    },
                };
            });
        },
        [],
    );

    const resolveSyncConflict = useCallback((choice: SyncConflictChoice) => {
        setSyncConflict((current) => {
            if (!current) {
                return null;
            }

            const nextChecked =
                choice === "local"
                    ? current.local
                    : choice === "cloud"
                      ? current.cloud
                      : current.merged;

            setChecked(nextChecked);
            setRemoteReady(true);
            setSyncStatus("syncing");
            setSyncRevision((revision) => revision + 1);
            return null;
        });
    }, []);

    const handleGoogleSignIn = useCallback(async () => {
        const runtime = firebaseRuntimeRef.current;
        const auth = runtime?.auth;
        const googleProvider = runtime?.googleProvider;
        if (!runtime || !auth || !googleProvider) {
            setAuthError("Firebase Auth is not configured.");
            return;
        }

        setAuthError(null);
        try {
            await runtime.signInWithPopup(auth, googleProvider);
        } catch (error) {
            setAuthError(
                error instanceof Error
                    ? error.message
                    : "Unable to sign in with Google.",
            );
        }
    }, []);

    const handleEmailSignIn = useCallback(async (email: string, password: string) => {
        const runtime = firebaseRuntimeRef.current;
        const auth = runtime?.auth;
        if (!runtime || !auth) {
            setAuthError("Firebase Auth is not configured.");
            return;
        }

        setAuthError(null);
        try {
            await runtime.signInWithEmailAndPassword(
                auth,
                email,
                password,
            );
        } catch (error) {
            setAuthError(
                error instanceof Error
                    ? error.message
                    : "Unable to sign in with email.",
            );
        }
    }, []);

    const handleEmailCreateAccount = useCallback(
        async (email: string, password: string) => {
            const runtime = firebaseRuntimeRef.current;
            const auth = runtime?.auth;
            if (!runtime || !auth) {
                setAuthError("Firebase Auth is not configured.");
                return;
            }

            setAuthError(null);
            try {
                await runtime.createUserWithEmailAndPassword(
                    auth,
                    email,
                    password,
                );
            } catch (error) {
                setAuthError(
                    error instanceof Error
                        ? error.message
                        : "Unable to create account.",
                );
            }
        },
        [],
    );

    const handlePasswordReset = useCallback(async (email: string) => {
        const runtime = firebaseRuntimeRef.current;
        const auth = runtime?.auth;
        if (!runtime || !auth) {
            setAuthError("Firebase Auth is not configured.");
            return;
        }

        setAuthError(null);
        try {
            await runtime.sendPasswordResetEmail(auth, email);
        } catch (error) {
            setAuthError(
                error instanceof Error
                    ? error.message
                    : "Unable to send password reset email.",
            );
        }
    }, []);

    const handleSignOut = useCallback(async () => {
        const runtime = firebaseRuntimeRef.current;
        const auth = runtime?.auth;
        if (!runtime || !auth) {
            return;
        }

        setAuthError(null);
        setSyncConflict(null);
        try {
            await runtime.firebaseSignOut(auth);
        } catch (error) {
            setAuthError(
                error instanceof Error ? error.message : "Unable to sign out.",
            );
        }
    }, []);

    const value = useMemo(
        () => ({
            checked,
            preferences: preferenceState.values,
            setCheck,
            setPreference,
            user,
            authStatus,
            syncStatus,
            authError,
            syncConflict,
            createAccountWithEmail: handleEmailCreateAccount,
            resetPassword: handlePasswordReset,
            signInWithEmail: handleEmailSignIn,
            signInWithGoogle: handleGoogleSignIn,
            signOut: handleSignOut,
            resolveSyncConflict,
        }),
        [
            authError,
            authStatus,
            checked,
            handleEmailCreateAccount,
            handleEmailSignIn,
            handleGoogleSignIn,
            handlePasswordReset,
            handleSignOut,
            resolveSyncConflict,
            setCheck,
            setPreference,
            syncConflict,
            syncStatus,
            user,
            preferenceState.values,
        ],
    );

    return (
        <ProgressContext.Provider value={value}>
            {children}
        </ProgressContext.Provider>
    );
}

export function useProgress(): ProgressContextValue {
    const ctx = useContext(ProgressContext);
    if (!ctx) {
        throw new Error("useProgress must be used within a ProgressProvider");
    }
    return ctx;
}

export function useGuidePreference<T>(
    key: string,
    defaultValue: T,
): [T, React.Dispatch<React.SetStateAction<T>>] {
    const { preferences, setPreference } = useProgress();
    const storedValue = Object.prototype.hasOwnProperty.call(preferences, key)
        ? (preferences[key] as T)
        : defaultValue;

    const setStoredValue = useCallback<React.Dispatch<React.SetStateAction<T>>>(
        (next) => {
            setPreference<T>(key, (current) => {
                const resolvedCurrent = current ?? defaultValue;
                return typeof next === "function"
                    ? (next as (value: T) => T)(resolvedCurrent)
                    : next;
            });
        },
        [defaultValue, key, setPreference],
    );

    return [storedValue, setStoredValue];
}
