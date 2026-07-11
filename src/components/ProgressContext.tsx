import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import {
    onAuthStateChanged,
    signInWithPopup,
    signOut as firebaseSignOut,
    type User,
} from "firebase/auth";
import {
    doc,
    getDoc,
    serverTimestamp,
    setDoc,
} from "firebase/firestore";
import {
    auth,
    db,
    firebaseEnabled,
    googleProvider,
    GUIDE_SLUG,
} from "../lib/firebase";

type ProgressMap = Record<string, boolean>;
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
    setCheck: (key: string, next?: boolean) => void;
    user: User | null;
    authStatus: AuthStatus;
    syncStatus: SyncStatus;
    authError: string | null;
    syncConflict: SyncConflict | null;
    signInWithGoogle: () => Promise<void>;
    signOut: () => Promise<void>;
    resolveSyncConflict: (choice: SyncConflictChoice) => void;
}

const ProgressContext = createContext<ProgressContextValue | undefined>(
    undefined,
);

const STORAGE_KEY_CHECKED = "ffta2Guide.checked";
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

function progressDocRef(userId: string) {
    if (!db) {
        throw new Error("Firestore is not configured.");
    }
    return doc(db, "users", userId, "guides", GUIDE_SLUG);
}

export function ProgressProvider({ children }: { children: React.ReactNode }) {
    const [checked, setChecked] = useState<ProgressMap>(readLocalProgress);
    const checkedRef = useRef(checked);
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
        if (!firebaseEnabled || !auth) {
            setAuthStatus("disabled");
            setSyncStatus("local-only");
            return;
        }

        return onAuthStateChanged(auth, async (nextUser) => {
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
                const snapshot = await getDoc(progressDocRef(nextUser.uid));
                const remoteChecked = snapshot.exists()
                    ? ((snapshot.data().checked ?? {}) as ProgressMap)
                    : {};
                const localChecked = checkedRef.current;
                const localCount = progressCount(localChecked);
                const cloudCount = progressCount(remoteChecked);

                if (
                    localCount > 0 &&
                    cloudCount > 0 &&
                    !sameProgress(localChecked, remoteChecked)
                ) {
                    setSyncConflict(createSyncConflict(localChecked, remoteChecked));
                    setSyncStatus("idle");
                    return;
                }

                setChecked(cloudCount > 0 ? remoteChecked : localChecked);
                setRemoteReady(true);
                setSyncStatus("saved");
            } catch (error) {
                setAuthError(
                    error instanceof Error
                        ? error.message
                        : "Unable to load cloud progress.",
                );
                setSyncStatus("error");
            }
        });
    }, []);

    useEffect(() => {
        if (!firebaseEnabled || !user || !remoteReady) {
            return;
        }

        setSyncStatus("syncing");
        const timeout = window.setTimeout(async () => {
            try {
                await setDoc(
                    progressDocRef(user.uid),
                    {
                        checked,
                        guideSlug: GUIDE_SLUG,
                        schemaVersion: 1,
                        updatedAt: serverTimestamp(),
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
    }, [checked, remoteReady, syncRevision, user]);

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
        if (!auth || !googleProvider) {
            setAuthError("Firebase Auth is not configured.");
            return;
        }

        setAuthError(null);
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (error) {
            setAuthError(
                error instanceof Error
                    ? error.message
                    : "Unable to sign in with Google.",
            );
        }
    }, []);

    const handleSignOut = useCallback(async () => {
        if (!auth) {
            return;
        }

        setAuthError(null);
        setSyncConflict(null);
        try {
            await firebaseSignOut(auth);
        } catch (error) {
            setAuthError(
                error instanceof Error ? error.message : "Unable to sign out.",
            );
        }
    }, []);

    const value = useMemo(
        () => ({
            checked,
            setCheck,
            user,
            authStatus,
            syncStatus,
            authError,
            syncConflict,
            signInWithGoogle: handleGoogleSignIn,
            signOut: handleSignOut,
            resolveSyncConflict,
        }),
        [
            authError,
            authStatus,
            checked,
            handleGoogleSignIn,
            handleSignOut,
            resolveSyncConflict,
            setCheck,
            syncConflict,
            syncStatus,
            user,
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
