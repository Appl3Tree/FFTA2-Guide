import React from "react";

export type ChecklistKey =
    | "missions"
    | "clanTrials"
    | "retroAchievements"
    | "bazaar"
    | "equipment"
    | "abilityRace"
    | "abilityCharacters";

type ChecklistState = Record<ChecklistKey, boolean>;

interface ChecklistPreferences {
    trackingEnabled: boolean;
    checklists: ChecklistState;
    scopes: Partial<Record<ChecklistKey, Record<string, boolean>>>;
}

interface ChecklistPreferencesValue extends ChecklistPreferences {
    isChecklistEnabled: (key: ChecklistKey) => boolean;
    isScopeEnabled: (key: ChecklistKey, scopeId: string) => boolean;
    setChecklistEnabled: (key: ChecklistKey, enabled: boolean) => void;
    setScopeEnabled: (
        key: ChecklistKey,
        scopeId: string,
        enabled: boolean,
    ) => void;
    setTrackingEnabled: (enabled: boolean) => void;
}

const STORAGE_KEY = "ffta2-guide:checklist-preferences:v1";

const DEFAULT_CHECKLISTS: ChecklistState = {
    missions: true,
    clanTrials: true,
    retroAchievements: true,
    bazaar: true,
    equipment: true,
    abilityRace: true,
    abilityCharacters: true,
};

const DEFAULT_SCOPES: ChecklistPreferences["scopes"] = {
    missions: {
        "other-missions": false,
    },
};

const DEFAULT_PREFERENCES: ChecklistPreferences = {
    trackingEnabled: true,
    checklists: DEFAULT_CHECKLISTS,
    scopes: DEFAULT_SCOPES,
};

const ChecklistPreferencesContext =
    React.createContext<ChecklistPreferencesValue | null>(null);

function parsePreferences(raw: string | null): ChecklistPreferences {
    if (!raw) return DEFAULT_PREFERENCES;

    try {
        const parsed = JSON.parse(raw) as Partial<ChecklistPreferences>;
        const storedChecklists: Partial<ChecklistState> =
            parsed.checklists ?? {};
        const storedScopes =
            parsed.scopes && typeof parsed.scopes === "object"
                ? parsed.scopes
                : {};
        const storedMissionScopes =
            storedScopes.missions &&
            typeof storedScopes.missions === "object"
                ? storedScopes.missions
                : {};
        const checklists = Object.fromEntries(
            (Object.keys(DEFAULT_CHECKLISTS) as ChecklistKey[]).map((key) => [
                key,
                typeof storedChecklists[key] === "boolean"
                    ? storedChecklists[key]
                    : DEFAULT_CHECKLISTS[key],
            ]),
        ) as ChecklistState;

        return {
            trackingEnabled:
                typeof parsed.trackingEnabled === "boolean"
                    ? parsed.trackingEnabled
                    : true,
            checklists,
            scopes: {
                ...storedScopes,
                missions: {
                    ...DEFAULT_SCOPES.missions,
                    ...storedMissionScopes,
                },
            },
        };
    } catch {
        return DEFAULT_PREFERENCES;
    }
}

export function ChecklistPreferencesProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [preferences, setPreferences] = React.useState<ChecklistPreferences>(
        () => {
            if (typeof window === "undefined") return DEFAULT_PREFERENCES;
            return parsePreferences(window.localStorage.getItem(STORAGE_KEY));
        },
    );

    React.useEffect(() => {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
    }, [preferences]);

    React.useEffect(() => {
        const handleStorage = (event: StorageEvent) => {
            if (event.key === STORAGE_KEY) {
                setPreferences(parsePreferences(event.newValue));
            }
        };

        window.addEventListener("storage", handleStorage);
        return () => window.removeEventListener("storage", handleStorage);
    }, []);

    const setTrackingEnabled = React.useCallback((enabled: boolean) => {
        setPreferences((current) => ({
            ...current,
            trackingEnabled: enabled,
        }));
    }, []);

    const setChecklistEnabled = React.useCallback(
        (key: ChecklistKey, enabled: boolean) => {
            setPreferences((current) => ({
                ...current,
                checklists: {
                    ...current.checklists,
                    [key]: enabled,
                },
            }));
        },
        [],
    );

    const setScopeEnabled = React.useCallback(
        (key: ChecklistKey, scopeId: string, enabled: boolean) => {
            setPreferences((current) => ({
                ...current,
                scopes: {
                    ...current.scopes,
                    [key]: {
                        ...current.scopes[key],
                        [scopeId]: enabled,
                    },
                },
            }));
        },
        [],
    );

    const isChecklistEnabled = React.useCallback(
        (key: ChecklistKey) =>
            preferences.trackingEnabled && preferences.checklists[key],
        [preferences.checklists, preferences.trackingEnabled],
    );

    const isScopeEnabled = React.useCallback(
        (key: ChecklistKey, scopeId: string) =>
            preferences.trackingEnabled &&
            preferences.checklists[key] &&
            preferences.scopes[key]?.[scopeId] !== false,
        [
            preferences.checklists,
            preferences.scopes,
            preferences.trackingEnabled,
        ],
    );

    const value = React.useMemo<ChecklistPreferencesValue>(
        () => ({
            ...preferences,
            isChecklistEnabled,
            isScopeEnabled,
            setChecklistEnabled,
            setScopeEnabled,
            setTrackingEnabled,
        }),
        [
            isChecklistEnabled,
            isScopeEnabled,
            preferences,
            setChecklistEnabled,
            setScopeEnabled,
            setTrackingEnabled,
        ],
    );

    return (
        <ChecklistPreferencesContext.Provider value={value}>
            {children}
        </ChecklistPreferencesContext.Provider>
    );
}

export function useChecklistPreferences(): ChecklistPreferencesValue {
    const value = React.useContext(ChecklistPreferencesContext);
    if (!value) {
        throw new Error(
            "useChecklistPreferences must be used within ChecklistPreferencesProvider",
        );
    }
    return value;
}
