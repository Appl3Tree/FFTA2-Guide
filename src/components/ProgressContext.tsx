import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";

type ProgressMap = Record<string, boolean>;

export interface ProgressContextValue {
    checked: ProgressMap;
    setCheck: (key: string, next?: boolean) => void;
}

const ProgressContext = createContext<ProgressContextValue | undefined>(
    undefined,
);

const STORAGE_KEY_CHECKED = "ffta2Guide.checked";

export function ProgressProvider({ children }: { children: React.ReactNode }) {
    const [checked, setChecked] = useState<ProgressMap>(() => {
        if (typeof window === "undefined") {
            return {};
        }
        try {
            const raw = window.localStorage.getItem(STORAGE_KEY_CHECKED);
            return raw ? (JSON.parse(raw) as ProgressMap) : {};
        } catch {
            return {};
        }
    });

    useEffect(() => {
        if (typeof window === "undefined") {
            return;
        }
        try {
            window.localStorage.setItem(
                STORAGE_KEY_CHECKED,
                JSON.stringify(checked),
            );
        } catch {
            // ignore
        }
    }, [checked]);

    const setCheck = useCallback((key: string, next?: boolean) => {
        setChecked((prev) => {
            const value = next ?? !prev[key];
            // If you uncheck, we can remove the key entirely to keep storage small.
            if (!value) {
                const copy = { ...prev };
                delete copy[key];
                return copy;
            }
            return { ...prev, [key]: value };
        });
    }, []);

    const value = useMemo(
        () => ({
            checked,
            setCheck,
        }),
        [checked, setCheck],
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

