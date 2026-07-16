import React from "react";
import { ChevronDown, SlidersHorizontal, X } from "lucide-react";
import {
    type ChecklistKey,
    useChecklistPreferences,
} from "../ChecklistPreferencesContext";
import {
    CHECKLIST_SCOPE_OPTIONS,
    type ChecklistScopeOption,
} from "../../data/checklistScopes";

const CHECKLIST_GROUPS: Array<{
    title: string;
    options: Array<{
        key: ChecklistKey;
        label: string;
        description: string;
    }>;
}> = [
    {
        title: "Progress and challenges",
        options: [
            {
                key: "missions",
                label: "Missions",
                description: "Mission completion and Quest Report progress.",
            },
            {
                key: "clanTrials",
                label: "Clan Trials",
                description: "Title difficulty clears and trial progress.",
            },
            {
                key: "retroAchievements",
                label: "RetroAchievements",
                description: "Optional challenge completion.",
            },
        ],
    },
    {
        title: "Collection",
        options: [
            {
                key: "bazaar",
                label: "Bazaar recipes",
                description: "Recipes unlocked or crafted.",
            },
            {
                key: "equipment",
                label: "Equipment",
                description: "Weapons, armor, and accessories collected.",
            },
        ],
    },
    {
        title: "Ability mastery",
        options: [
            {
                key: "abilityRace",
                label: "By race",
                description: "One complete learn list for each playable race.",
            },
            {
                key: "abilityCharacters",
                label: "By named recruit",
                description: "Separate learn lists for Luso and other named recruits.",
            },
        ],
    },
];

export function ChecklistSettingsDialog({
    onClose,
    open,
}: {
    onClose: () => void;
    open: boolean;
}) {
    const {
        checklists,
        scopes,
        setChecklistEnabled,
        setScopeEnabled,
        setTrackingEnabled,
        trackingEnabled,
    } = useChecklistPreferences();
    const dialogRef = React.useRef<HTMLDivElement>(null);
    const [openAdvanced, setOpenAdvanced] = React.useState<
        Partial<Record<ChecklistKey, boolean>>
    >({});

    React.useEffect(() => {
        if (!open) return;

        const previouslyFocused = document.activeElement as HTMLElement | null;
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        const focusFrame = window.requestAnimationFrame(() =>
            dialogRef.current?.querySelector<HTMLElement>("button")?.focus(),
        );

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                event.preventDefault();
                onClose();
                return;
            }

            if (event.key !== "Tab" || !dialogRef.current) return;
            const focusable = Array.from(
                dialogRef.current.querySelectorAll<HTMLElement>(
                    'button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])',
                ),
            );
            if (focusable.length === 0) return;

            const first = focusable[0]!;
            const last = focusable[focusable.length - 1]!;
            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => {
            window.cancelAnimationFrame(focusFrame);
            document.body.style.overflow = previousOverflow;
            document.removeEventListener("keydown", handleKeyDown);
            previouslyFocused?.focus();
        };
    }, [onClose, open]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-4">
            <div
                className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                aria-hidden="true"
                onClick={onClose}
            />
            <div
                ref={dialogRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby="checklist-settings-title"
                aria-describedby="checklist-settings-description"
                className="relative flex max-h-[calc(100dvh-0.75rem)] w-full max-w-xl flex-col overflow-hidden rounded-t-lg border border-zinc-700 bg-zinc-950 text-zinc-100 shadow-2xl sm:max-h-[90dvh] sm:rounded-lg"
            >
                <header className="flex items-start justify-between gap-4 border-b border-zinc-800 px-4 py-4 sm:px-5">
                    <div>
                        <h2
                            id="checklist-settings-title"
                            className="text-lg font-semibold"
                        >
                            Checklist settings
                        </h2>
                        <p
                            id="checklist-settings-description"
                            className="mt-1 text-sm leading-relaxed text-zinc-400"
                        >
                            Choose which completion and collection controls appear in
                            the app.
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close checklist settings"
                        className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-md text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </header>

                <div className="overflow-y-auto px-4 py-4 sm:px-5">
                    <ToggleRow
                        checked={trackingEnabled}
                        description="Hide every checklist and use the app as a reference only. Saved progress is retained."
                        label="Enable tracking"
                        onChange={setTrackingEnabled}
                        prominent
                    />

                    <div className="mt-5 space-y-5">
                        {CHECKLIST_GROUPS.map((group) => (
                            <fieldset key={group.title}>
                                <legend className="mb-2 text-xs font-semibold uppercase text-zinc-400">
                                    {group.title}
                                </legend>
                                <div className="divide-y divide-zinc-800 border-y border-zinc-800">
                                    {group.options.map((option) => {
                                        const scopeOptions =
                                            CHECKLIST_SCOPE_OPTIONS[option.key];
                                        const advancedOpen =
                                            openAdvanced[option.key] === true;
                                        const optionEnabled =
                                            trackingEnabled &&
                                            checklists[option.key];

                                        return (
                                            <div key={option.key}>
                                                <ToggleRow
                                                    checked={checklists[option.key]}
                                                    description={option.description}
                                                    disabled={!trackingEnabled}
                                                    label={option.label}
                                                    onChange={(enabled) =>
                                                        setChecklistEnabled(
                                                            option.key,
                                                            enabled,
                                                        )
                                                    }
                                                />
                                                <AdvancedScopeSettings
                                                    checklistKey={option.key}
                                                    disabled={!optionEnabled}
                                                    onOpenChange={(nextOpen) =>
                                                        setOpenAdvanced((current) => ({
                                                            ...current,
                                                            [option.key]: nextOpen,
                                                        }))
                                                    }
                                                    onScopeChange={(scopeId, enabled) =>
                                                        setScopeEnabled(
                                                            option.key,
                                                            scopeId,
                                                            enabled,
                                                        )
                                                    }
                                                    open={advancedOpen}
                                                    options={scopeOptions}
                                                    scopeState={scopes[option.key] ?? {}}
                                                />
                                            </div>
                                        );
                                    })}
                                </div>
                            </fieldset>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

function AdvancedScopeSettings({
    checklistKey,
    disabled,
    onOpenChange,
    onScopeChange,
    open,
    options,
    scopeState,
}: {
    checklistKey: ChecklistKey;
    disabled: boolean;
    onOpenChange: (open: boolean) => void;
    onScopeChange: (scopeId: string, enabled: boolean) => void;
    open: boolean;
    options: ChecklistScopeOption[];
    scopeState: Record<string, boolean>;
}) {
    const regionId = `checklist-advanced-${checklistKey}`;
    const enabledCount = options.filter(
        (option) => scopeState[option.id] !== false,
    ).length;

    return (
        <div className="pb-2 pl-2 pr-2">
            <button
                type="button"
                aria-controls={open ? regionId : undefined}
                aria-expanded={open}
                disabled={disabled}
                onClick={() => onOpenChange(!open)}
                className="flex min-h-11 w-full items-center gap-2 rounded-md px-2 text-left text-xs font-semibold text-zinc-400 transition-colors hover:bg-zinc-900/60 hover:text-zinc-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 disabled:cursor-not-allowed disabled:opacity-40"
            >
                <SlidersHorizontal className="h-4 w-4" />
                <span>Advanced</span>
                <span className="ml-auto font-normal text-zinc-500">
                    {enabledCount}/{options.length} shown
                </span>
                <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                        open ? "rotate-180" : ""
                    }`}
                />
            </button>

            {open ? (
                <fieldset
                    id={regionId}
                    className="ml-4 border-l-2 border-zinc-800 py-1 pl-3"
                >
                    <legend className="sr-only">
                        Advanced {checklistKey} checklist settings
                    </legend>
                    {options.map((option) => (
                        <ToggleRow
                            key={option.id}
                            checked={scopeState[option.id] !== false}
                            description={option.description ?? "Show this checklist."}
                            disabled={disabled}
                            label={option.label}
                            onChange={(enabled) =>
                                onScopeChange(option.id, enabled)
                            }
                        />
                    ))}
                </fieldset>
            ) : null}
        </div>
    );
}

function ToggleRow({
    checked,
    description,
    disabled = false,
    label,
    onChange,
    prominent = false,
}: {
    checked: boolean;
    description: string;
    disabled?: boolean;
    label: string;
    onChange: (checked: boolean) => void;
    prominent?: boolean;
}) {
    const controlId = React.useId();
    const labelId = `${controlId}-label`;
    const descriptionId = `${controlId}-description`;

    return (
        <button
            type="button"
            role="switch"
            aria-checked={checked}
            aria-describedby={descriptionId}
            aria-labelledby={labelId}
            disabled={disabled}
            onClick={() => onChange(!checked)}
            className={`flex min-h-16 w-full items-center justify-between gap-4 px-2 py-3 text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 ${
                prominent ? "rounded-lg bg-zinc-900/80 px-3" : ""
            } ${disabled ? "cursor-not-allowed opacity-50" : "hover:bg-zinc-900/60"}`}
        >
            <span className="min-w-0">
                <span
                    id={labelId}
                    className="block text-sm font-semibold text-zinc-100"
                >
                    {label}
                </span>
                <span
                    id={descriptionId}
                    className="mt-0.5 block text-xs leading-relaxed text-zinc-400"
                >
                    {description}
                </span>
            </span>
            <span
                aria-hidden="true"
                className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
                    checked ? "bg-sky-500" : "bg-zinc-700"
                }`}
            >
                <span
                    className={`absolute left-1 top-1 h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${
                        checked ? "translate-x-5" : ""
                    }`}
                />
            </span>
        </button>
    );
}
