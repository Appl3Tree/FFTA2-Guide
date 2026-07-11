import React from "react";
import {
    AlertCircle,
    CheckCircle2,
    Cloud,
    Coffee,
    Github,
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
import { ProgressProvider, useProgress } from "./components/ProgressContext";
import { EquipmentHub } from "./components/meta/EquipmentHub";
import BazaarPanel from "./components/meta/BazaarPanel";
import { AbilityHub } from "./components/meta/AbilityHub";
import { GlobalSearchPanel } from "./components/meta/GlobalSearchPanel";
import { FaqPanel } from "./components/meta/FaqPanel";
import { ClanTrialsPanel } from "./components/meta/ClanTrialsPanel";

const STORAGE_KEY_WIDE_LAYOUT = "ffta2-guide:wide-layout";

export default function App() {
    return (
        <ProgressProvider>
            <AppInner />
        </ProgressProvider>
    );
}

function AppInner() {
    const { checked } = useProgress();
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
        </div>
    );
}

function AuthSyncControl() {
    const {
        authError,
        authStatus,
        signInWithGoogle,
        signOut,
        syncStatus,
        user,
    } = useProgress();
    const [isBusy, setIsBusy] = React.useState(false);

    const syncLabel = user
        ? syncStatus === "loading"
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
