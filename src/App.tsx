import React from "react";
import {
    AlertCircle,
    CheckCircle2,
    Cloud,
    Coffee,
    Github,
    GitMerge,
    HardDrive,
    Info,
    LogIn,
    LogOut,
    Maximize2,
    Minimize2,
} from "lucide-react";
import { SectionLabel } from "./components/ui/SectionLabel";
import { Panel } from "./components/ui/Panel";
import { BeforeYouStartPanel } from "./components/meta/BeforeYouStartPanel";
import { RacesPanels } from "./components/meta/RacesPanels";
import { RetroAchievementsPanels } from "./components/meta/RetroAchievementsPanels";
import { MissionTabs } from "./components/missions/MissionTabs";
import { ALL_MISSIONS } from "./data/missions/allMissions";
import {
    ProgressProvider,
    useProgress,
    type SyncConflict,
    type SyncConflictChoice,
} from "./components/ProgressContext";
import { EquipmentHub } from "./components/meta/EquipmentHub";
import BazaarPanel from "./components/meta/BazaarPanel";
import { AbilityHub } from "./components/meta/AbilityHub";
import { GlobalSearchPanel } from "./components/meta/GlobalSearchPanel";
import { FaqPanel } from "./components/meta/FaqPanel";
import { ClanTrialsPanel } from "./components/meta/ClanTrialsPanel";
import { CLAN_TRIALS } from "./data/meta/clanTrials";
import {
    GLOBAL_RETRO_ACHIEVEMENTS,
    RETRO_ACHIEVEMENTS_BY_MISSION_ID,
} from "./data/retroAchievements";

const STORAGE_KEY_WIDE_LAYOUT = "ffta2-guide:wide-layout";

const MISSION_NAME_BY_ID = new Map(
    ALL_MISSIONS.map((mission) => [mission.id, mission.name]),
);

const RETRO_NAME_BY_ID = new Map(
    [
        ...GLOBAL_RETRO_ACHIEVEMENTS,
        ...Object.values(RETRO_ACHIEVEMENTS_BY_MISSION_ID).flat(),
    ].map((achievement) => [achievement.id, achievement.name]),
);

const CLAN_TRIAL_NAME_BY_ID = new Map(
    CLAN_TRIALS.map((trial) => [trial.id, trial.name]),
);

export default function App() {
    return (
        <ProgressProvider>
            <AppInner />
        </ProgressProvider>
    );
}

function AppInner() {
    const { checked, resolveSyncConflict, syncConflict } = useProgress();
    const [wideLayout, setWideLayout] = React.useState(() => {
        if (typeof window === "undefined") return false;
        return window.localStorage.getItem(STORAGE_KEY_WIDE_LAYOUT) === "true";
    });

    React.useEffect(() => {
        window.localStorage.setItem(
            STORAGE_KEY_WIDE_LAYOUT,
            String(wideLayout),
        );
    }, [wideLayout]);

    const allMissionIds = React.useMemo(
        () => ALL_MISSIONS.map((m) => m.id),
        [],
    );

    const totalMissions = allMissionIds.length;
    const completedMissions = allMissionIds.filter(
        (id) => checked[`mission:${id}`],
    ).length;

    const completionPct =
        totalMissions === 0
            ? 0
            : Math.round((completedMissions / totalMissions) * 1000) / 10;

    const missionHeaderProgress = (
        <div className="flex items-center justify-between gap-2 text-xs sm:text-sm">
            <div className="text-zinc-600 dark:text-zinc-300">
                <span className="font-semibold">
                    {completedMissions} / {totalMissions}
                </span>{" "}
                missions completed
            </div>
            <div className="flex items-center gap-2">
                <div className="h-1.5 w-28 sm:w-40 rounded-full bg-zinc-300/80 dark:bg-zinc-800 overflow-hidden">
                    <div
                        className="h-full bg-violet-500 dark:bg-violet-300"
                        style={{ width: `${completionPct}%` }}
                    />
                </div>
                <span className="text-[0.7rem] text-zinc-500 dark:text-zinc-400">
                    {completionPct}%
                </span>
            </div>
        </div>
    );

    const mainClassName = wideLayout
        ? "w-full max-w-none px-2 sm:px-4 lg:px-6 py-6 sm:py-8"
        : "w-full max-w-5xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8";

    return (
        <div className="min-h-screen flex flex-col items-center bg-[radial-gradient(circle_at_top_left,_rgba(14,165,233,0.16),_transparent_32rem),linear-gradient(135deg,_#09090b,_#18181b)] text-zinc-50">
            <main className={mainClassName}>
                <div className="canvas-card">
                    {/* Top banner */}
                    <div className="relative overflow-hidden rounded-t-lg border border-zinc-800/80 bg-zinc-950/95 text-white shadow-sm ring-1 ring-white/10">
                        <div className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,_#d946ef,_#ef4444,_#f97316,_#f59e0b,_#eab308,_#84cc16,_#10b981,_#0ea5e9,_#8b5cf6)]" />
                        <div className="px-4 sm:px-6 py-4 sm:py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                            <div>
                                <h1 className="text-2xl sm:text-3xl font-bold mb-1 tracking-tight">
                                    FFTA2 Progression &amp; Completion Guide
                                </h1>
                                <p className="max-w-3xl text-sm leading-relaxed text-zinc-300">
                                    Track story missions, side quests, RetroAchievements, and
                                    optimize your clan&apos;s builds as you work through{" "}
                                    <span className="font-semibold">
                                        Final Fantasy Tactics A2: Grimoire of the Rift
                                    </span>
                                    .
                                </p>
                            </div>
                            <div className="flex shrink-0 flex-col items-stretch gap-2 sm:items-end">
                                <AuthSyncControl />
                                <button
                                    type="button"
                                    onClick={() => setWideLayout((prev) => !prev)}
                                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-xs font-semibold text-zinc-100 shadow-sm transition-colors hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-sky-300"
                                    aria-pressed={wideLayout}
                                    aria-label={
                                        wideLayout
                                            ? "Use default content width"
                                            : "Use full window width"
                                    }
                                    title={
                                        wideLayout
                                            ? "Use default content width"
                                            : "Use full window width"
                                    }
                                >
                                    {wideLayout ? (
                                        <Minimize2 className="h-4 w-4" />
                                    ) : (
                                        <Maximize2 className="h-4 w-4" />
                                    )}
                                    <span className="hidden sm:inline">
                                        {wideLayout ? "Default width" : "Full width"}
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Main card body */}
                    <section className="bg-zinc-100 dark:bg-zinc-950/90 rounded-b-lg shadow-sm ring-1 ring-zinc-950/10 dark:ring-white/10 border-t-0 px-4 sm:px-6 pb-6 sm:pb-8 pt-4 sm:pt-6 space-y-6">
                        <header className="space-y-4 sm:space-y-6">
                            {/* Pre-game heads-up / info */}
                            <BeforeYouStartPanel />

                            {/* Frequently asked planning questions */}
                            <FaqPanel />

                            {/* Clan trials and privilege planning */}
                            <ClanTrialsPanel />

                            {/* RetroAchievements (kept separate) */}
                            <RetroAchievementsPanels />

                            {/* Races & Jobs Overview (kept separate) */}
                            <RacesPanels />
                        </header>

                        <div className="space-y-4 sm:space-y-5">
                            <Panel
                                title="Bazaar Recipes"
                                subtitle="Use loot to unlock shop stock, then buy or re-craft extra copies."
                                tone="lime"
                            >
                                <BazaarPanel />
                            </Panel>

                            <Panel
                                title="Equipment Hub"
                                subtitle="Browse all weapons, armor, and accessories."
                                tone="emerald"
                            >
                                <EquipmentHub />
                            </Panel>

                            <Panel
                                title="Ability Hub"
                                subtitle="Browse all ability sets and their respective abilities."
                                tone="blue"
                            >
                                <AbilityHub />
                            </Panel>

                            <Panel
                                title="Missions Hub"
                                subtitle="Track main story and optional quests."
                                tone="purple"
                                headerAddon={missionHeaderProgress}
                            >
                                <MissionTabs />
                            </Panel>
                        </div>
                    </section>
                </div>
            </main>

            <footer className="flex items-center gap-3 text-zinc-600 dark:text-zinc-400 text-xs mt-12">
                <span>Built with React, Tailwind, and lucide-react</span>
                <span className="text-zinc-700 dark:text-zinc-600">|</span>
                <a
                    href="https://github.com/appl3tree/FFTA2-Guide/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 hover:text-zinc-300 transition-colors"
                    aria-label="GitHub"
                >
                    <Github size={13} />
                </a>
                <a
                    href="https://ko-fi.com/appl3tree"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 hover:text-zinc-300 transition-colors"
                    aria-label="Ko-fi"
                >
                    <Coffee size={13} />
                </a>
            </footer>

            {/* Floating global search drawer */}
            <GlobalSearchPanel />
            {syncConflict ? (
                <SyncConflictDialog
                    conflict={syncConflict}
                    onConfirm={resolveSyncConflict}
                />
            ) : null}
        </div>
    );
}

function AuthSyncControl() {
    const {
        authError,
        authStatus,
        signInWithGoogle,
        signOut,
        syncConflict,
        syncStatus,
        user,
    } = useProgress();
    const [isBusy, setIsBusy] = React.useState(false);

    const syncLabel = user
        ? syncConflict
            ? "Choose progress source"
            : syncStatus === "loading"
            ? "Loading cloud progress"
            : syncStatus === "syncing"
              ? "Syncing to cloud"
              : syncStatus === "saved"
                ? "Cloud progress saved"
                : syncStatus === "error"
                  ? "Cloud sync issue"
                  : "Cloud sync ready"
        : "Progress saved locally";
    const storageHelpText = user
        ? "Signed-in progress is synced to Firebase under your account. Firestore security rules restrict each user to their own guide progress."
        : "Progress is saved locally in this browser by default. Sign in to sync progress to your account through Firebase.";

    const statusIcon =
        syncStatus === "error" ? (
            <AlertCircle className="h-3.5 w-3.5 text-rose-300" />
        ) : syncStatus === "saved" ? (
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-300" />
        ) : (
            <Cloud className="h-3.5 w-3.5 text-sky-300" />
        );

    const handleSignIn = async () => {
        setIsBusy(true);
        try {
            await signInWithGoogle();
        } finally {
            setIsBusy(false);
        }
    };

    const handleSignOut = async () => {
        setIsBusy(true);
        try {
            await signOut();
        } finally {
            setIsBusy(false);
        }
    };

    if (authStatus === "disabled") {
        return (
            <div className="relative inline-flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-900/90 px-3 py-2 text-xs text-zinc-300">
                <Cloud className="h-3.5 w-3.5 text-zinc-500" />
                <span>Progress saved locally</span>
                <StorageHelpTooltip text={storageHelpText} />
            </div>
        );
    }

    return (
        <div className="flex flex-col items-stretch gap-1 sm:items-end">
            <div className="inline-flex items-center justify-between gap-2 rounded-lg border border-zinc-700 bg-zinc-900/90 px-3 py-2 text-xs text-zinc-200 shadow-sm">
                <span className="inline-flex min-w-0 items-center gap-2">
                    {statusIcon}
                    <span className="truncate">
                        {user?.email ?? "Progress saved locally"}
                    </span>
                    <StorageHelpTooltip text={storageHelpText} />
                </span>
                {user ? (
                    <button
                        type="button"
                        onClick={handleSignOut}
                        disabled={isBusy}
                        className="inline-flex items-center gap-1 rounded-md px-2 py-1 font-semibold text-zinc-100 transition-colors hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        <LogOut className="h-3.5 w-3.5" />
                        <span>Sign out</span>
                    </button>
                ) : (
                    <button
                        type="button"
                        onClick={handleSignIn}
                        disabled={isBusy || authStatus === "loading"}
                        className="inline-flex items-center gap-1 rounded-md px-2 py-1 font-semibold text-zinc-100 transition-colors hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        <LogIn className="h-3.5 w-3.5" />
                        <span>Sign in</span>
                    </button>
                )}
            </div>
            {user ? (
                <div className="text-right text-[0.68rem] text-zinc-500">
                    {syncLabel}
                </div>
            ) : null}
            {authError ? (
                <div className="max-w-xs text-right text-[0.68rem] text-rose-300">
                    {authError}
                </div>
            ) : null}
        </div>
    );
}

function SyncConflictDialog({
    conflict,
    onConfirm,
}: {
    conflict: SyncConflict;
    onConfirm: (choice: SyncConflictChoice) => void;
}) {
    const [choice, setChoice] = React.useState<SyncConflictChoice>("merge");

    const options: Array<{
        choice: SyncConflictChoice;
        description: string;
        icon: React.ReactNode;
        label: string;
        total: number;
    }> = [
        {
            choice: "local",
            description: "Use only the progress saved in this browser.",
            icon: <HardDrive className="h-4 w-4" />,
            label: "Use Local",
            total: conflict.localCount,
        },
        {
            choice: "cloud",
            description: "Use only the progress synced to your account.",
            icon: <Cloud className="h-4 w-4" />,
            label: "Use Cloud",
            total: conflict.cloudCount,
        },
        {
            choice: "merge",
            description: "Keep anything checked in either place.",
            icon: <GitMerge className="h-4 w-4" />,
            label: "Merge Both",
            total: conflict.mergedCount,
        },
    ];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-6 backdrop-blur-sm">
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="sync-conflict-title"
                className="max-h-[calc(100vh-2rem)] w-full max-w-2xl overflow-auto rounded-lg border border-zinc-700 bg-zinc-950 text-zinc-100 shadow-2xl shadow-black/40 ring-1 ring-white/10"
            >
                <div className="border-b border-zinc-800 px-4 py-4 sm:px-5">
                    <p className="text-[0.7rem] font-semibold uppercase tracking-wide text-sky-300">
                        Progress sync
                    </p>
                    <h2
                        id="sync-conflict-title"
                        className="mt-1 text-lg font-semibold tracking-tight"
                    >
                        Choose which progress to keep
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-300">
                        This browser and your cloud account both have checked
                        progress, and they do not match. Pick the source you want
                        to save going forward.
                    </p>
                </div>

                <div className="space-y-4 px-4 py-4 sm:px-5">
                    <div className="grid gap-3 sm:grid-cols-3">
                        {options.map((option) => {
                            const selected = choice === option.choice;
                            return (
                                <button
                                    key={option.choice}
                                    type="button"
                                    onClick={() => setChoice(option.choice)}
                                    className={[
                                        "rounded-lg border p-3 text-left transition-colors focus:outline-none focus:ring-2 focus:ring-sky-300",
                                        selected
                                            ? "border-sky-400 bg-sky-400/10 text-white"
                                            : "border-zinc-800 bg-zinc-900/80 text-zinc-200 hover:border-zinc-600",
                                    ].join(" ")}
                                    aria-pressed={selected}
                                >
                                    <span className="flex items-center justify-between gap-2">
                                        <span className="inline-flex items-center gap-2 text-sm font-semibold">
                                            {option.icon}
                                            {option.label}
                                        </span>
                                        {selected ? (
                                            <CheckCircle2 className="h-4 w-4 text-sky-300" />
                                        ) : null}
                                    </span>
                                    <span className="mt-2 block text-2xl font-bold">
                                        {option.total}
                                    </span>
                                    <span className="block text-xs text-zinc-400">
                                        checked items
                                    </span>
                                    <span className="mt-2 block text-xs leading-relaxed text-zinc-300">
                                        {option.description}
                                    </span>
                                </button>
                            );
                        })}
                    </div>

                    <details className="rounded-lg border border-zinc-800 bg-zinc-900/70">
                        <summary className="cursor-pointer px-3 py-2 text-sm font-semibold text-zinc-200">
                            Show differences
                        </summary>
                        <div className="grid gap-3 border-t border-zinc-800 p-3 sm:grid-cols-2">
                            <DifferenceList
                                emptyText="No checked items exist only locally."
                                items={conflict.localOnly}
                                title={`Only local (${conflict.localOnly.length})`}
                            />
                            <DifferenceList
                                emptyText="No checked items exist only in cloud."
                                items={conflict.cloudOnly}
                                title={`Only cloud (${conflict.cloudOnly.length})`}
                            />
                        </div>
                    </details>
                </div>

                <div className="flex flex-col gap-2 border-t border-zinc-800 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
                    <p className="text-xs leading-relaxed text-zinc-400">
                        Confirming writes the selected progress to local storage and
                        Firebase for this guide.
                    </p>
                    <button
                        type="button"
                        onClick={() => onConfirm(choice)}
                        className="inline-flex items-center justify-center rounded-lg bg-sky-400 px-4 py-2 text-sm font-semibold text-zinc-950 transition-colors hover:bg-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-200"
                    >
                        Confirm{" "}
                        {choice === "merge"
                            ? "Merge"
                            : choice === "local"
                              ? "Local"
                              : "Cloud"}
                    </button>
                </div>
            </div>
        </div>
    );
}

function DifferenceList({
    emptyText,
    items,
    title,
}: {
    emptyText: string;
    items: string[];
    title: string;
}) {
    return (
        <div>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-zinc-400">
                {title}
            </h3>
            {items.length > 0 ? (
                <ul className="mt-2 max-h-44 space-y-1 overflow-auto pr-1 text-xs text-zinc-300">
                    {items.map((item) => (
                        <li
                            key={item}
                            className="rounded-md bg-zinc-950/70 px-2 py-1"
                        >
                            {formatProgressKey(item)}
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="mt-2 text-xs text-zinc-500">{emptyText}</p>
            )}
        </div>
    );
}

function formatProgressKey(key: string): string {
    const [scope, ...rest] = key.split(":");

    if (scope === "mission") {
        const missionId = rest.join(":");
        return `Mission: ${MISSION_NAME_BY_ID.get(missionId) ?? friendlyId(missionId)}`;
    }

    if (scope === "retro") {
        const achievementId = rest.join(":");
        return `RetroAchievement: ${
            RETRO_NAME_BY_ID.get(achievementId) ?? friendlyId(achievementId)
        }`;
    }

    if (scope === "trial" || scope === "clan-trial") {
        const [trialId, ...titleParts] = rest;
        const trialName = CLAN_TRIAL_NAME_BY_ID.get(trialId) ?? friendlyId(trialId);
        const title = titleParts.join(":");
        return title
            ? `Clan trial: ${trialName} - ${title}`
            : `Clan trial: ${trialName}`;
    }

    return `Progress: ${friendlyId(rest.join(":") || key)}`;
}

function friendlyId(value: string): string {
    return value
        .replace(/^ra-/, "")
        .replace(/[_-]/g, " ")
        .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function StorageHelpTooltip({ text }: { text: string }) {
    return (
        <span className="group/help relative inline-flex shrink-0">
            <button
                type="button"
                className="inline-flex h-5 w-5 items-center justify-center rounded-full text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-sky-300"
                aria-label="How progress storage works"
            >
                <Info className="h-3.5 w-3.5" />
            </button>
            <span
                role="tooltip"
                className="pointer-events-none fixed left-1/2 top-28 z-20 mt-2 w-72 max-w-[calc(100vw-2rem)] -translate-x-1/2 rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-left text-[0.72rem] font-normal leading-relaxed text-zinc-200 opacity-0 shadow-xl shadow-black/30 ring-1 ring-white/10 transition-opacity group-hover/help:opacity-100 group-focus-within/help:opacity-100 sm:absolute sm:left-auto sm:right-0 sm:top-full sm:translate-x-0"
            >
                {text}
            </span>
        </span>
    );
}
