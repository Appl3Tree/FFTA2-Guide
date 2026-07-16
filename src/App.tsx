import React from "react";
import {
    AlertCircle,
    BookOpen,
    CheckCircle2,
    Cloud,
    GitMerge,
    HardDrive,
    Info,
    LogIn,
    LogOut,
    Mail,
    Maximize2,
    Minimize2,
    Package,
    ScrollText,
    Search,
    Settings,
    Shield,
    Sparkles,
    Trophy,
} from "lucide-react";
import {
    ProgressProvider,
    useProgress,
    type SyncConflict,
    type SyncConflictChoice,
} from "./components/ProgressContext";
import { ChecklistPreferencesProvider } from "./components/ChecklistPreferencesContext";

const BeforeYouStartPanel = React.lazy(() =>
    import("./components/meta/BeforeYouStartPanel").then((module) => ({
        default: module.BeforeYouStartPanel,
    })),
);
const FaqPanel = React.lazy(() =>
    import("./components/meta/FaqPanel").then((module) => ({
        default: module.FaqPanel,
    })),
);
const ClanTrialsPanel = React.lazy(() =>
    import("./components/meta/ClanTrialsPanel").then((module) => ({
        default: module.ClanTrialsPanel,
    })),
);
const RetroAchievementsPanels = React.lazy(() =>
    import("./components/meta/RetroAchievementsPanels").then((module) => ({
        default: module.RetroAchievementsPanels,
    })),
);
const BazaarRecipesPanel = React.lazy(() =>
    import("./components/meta/BazaarPanel").then((module) => ({
        default: module.BazaarRecipesPanel,
    })),
);
const EquipmentHubPanel = React.lazy(() =>
    import("./components/meta/EquipmentHub").then((module) => ({
        default: module.EquipmentHubPanel,
    })),
);
const AbilityHubPanel = React.lazy(() =>
    import("./components/meta/AbilityHub").then((module) => ({
        default: module.AbilityHubPanel,
    })),
);
const MissionsPanel = React.lazy(() =>
    import("./components/missions/MissionsPanel").then((module) => ({
        default: module.MissionsPanel,
    })),
);
const GlobalSearchPanel = React.lazy(() =>
    import("./components/meta/GlobalSearchPanel").then((module) => ({
        default: module.GlobalSearchPanel,
    })),
);
const ChecklistSettingsDialog = React.lazy(() =>
    import("./components/settings/ChecklistSettingsDialog").then((module) => ({
        default: module.ChecklistSettingsDialog,
    })),
);

const STORAGE_KEY_WIDE_LAYOUT = "ffta2-guide:wide-layout";

type AppView =
    | "guide"
    | "clan"
    | "challenges"
    | "collection"
    | "abilities"
    | "missions";

const APP_VIEWS: Array<{
    id: AppView;
    label: string;
    title: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
}> = [
    {
        id: "guide",
        label: "Start Here",
        title: "Plan your playthrough",
        description: "Core systems, early decisions, and practical answers for a new or returning run.",
        icon: BookOpen,
    },
    {
        id: "clan",
        label: "Clan Trials",
        title: "Clan development",
        description: "Plan Trial title clears, privilege upgrades, and talent tradeoffs.",
        icon: Shield,
    },
    {
        id: "challenges",
        label: "Achievements",
        title: "Challenge progress",
        description: "Track global goals, mission challenges, and missable conditions.",
        icon: Trophy,
    },
    {
        id: "collection",
        label: "Gear & Bazaar",
        title: "Collection and crafting",
        description: "Connect Bazaar recipes to the equipment, stats, and abilities they unlock.",
        icon: Package,
    },
    {
        id: "abilities",
        label: "Jobs & Abilities",
        title: "Jobs and ability mastery",
        description: "Explore race job pools and maintain separate mastery lists for named recruits.",
        icon: Sparkles,
    },
    {
        id: "missions",
        label: "Missions",
        title: "Mission planning",
        description: "Find requirements, enemies, rewards, laws, and field strategy without losing your place.",
        icon: ScrollText,
    },
];

function isAppView(value: string): value is AppView {
    return APP_VIEWS.some((view) => view.id === value);
}

export default function App() {
    return (
        <ChecklistPreferencesProvider>
            <ProgressProvider>
                <AppInner />
            </ProgressProvider>
        </ChecklistPreferencesProvider>
    );
}

function AppInner() {
    const { resolveSyncConflict, syncConflict } = useProgress();
    const [settingsOpen, setSettingsOpen] = React.useState(false);
    const [activeView, setActiveView] = React.useState<AppView>(() => {
        if (typeof window === "undefined") return "guide";
        const hashView = window.location.hash.replace(/^#/, "");
        return isAppView(hashView) ? hashView : "guide";
    });
    const viewTopRef = React.useRef<HTMLElement>(null);
    const pendingViewScrollRef = React.useRef(false);
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

    React.useEffect(() => {
        const syncViewFromLocation = () => {
            const hashView = window.location.hash.replace(/^#/, "");
            if (isAppView(hashView)) setActiveView(hashView);
        };

        window.addEventListener("popstate", syncViewFromLocation);
        window.addEventListener("hashchange", syncViewFromLocation);
        return () => {
            window.removeEventListener("popstate", syncViewFromLocation);
            window.removeEventListener("hashchange", syncViewFromLocation);
        };
    }, []);

    const selectView = (view: AppView) => {
        if (view === activeView) return;
        pendingViewScrollRef.current = true;
        setActiveView(view);
        window.history.pushState(null, "", `#${view}`);
    };

    const handleViewReady = React.useCallback(() => {
        if (!pendingViewScrollRef.current) return;
        pendingViewScrollRef.current = false;
        viewTopRef.current?.scrollIntoView({ block: "start" });
    }, []);

    const activeViewMeta =
        APP_VIEWS.find((view) => view.id === activeView) ?? APP_VIEWS[0]!;
    const ActiveViewIcon = activeViewMeta.icon;

    const mainClassName = wideLayout
        ? "w-full max-w-none px-2 sm:px-4 lg:px-6 py-6 sm:py-8"
        : "w-full max-w-6xl px-2 sm:px-6 lg:px-8 py-4 sm:py-8";

    return (
        <div className="flex min-h-screen flex-col items-center bg-zinc-950 text-zinc-50">
            <main className={mainClassName}>
                <div className="canvas-card">
                    {/* Top banner */}
                    <div className="relative overflow-hidden rounded-t-lg border border-zinc-800/80 bg-zinc-950/95 text-white shadow-sm ring-1 ring-white/10">
                        <div className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,_#d946ef,_#ef4444,_#f97316,_#f59e0b,_#eab308,_#84cc16,_#10b981,_#0ea5e9,_#8b5cf6)]" />
                        <div className="px-4 sm:px-6 py-4 sm:py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                            <div>
                                <h1 className="text-2xl sm:text-3xl font-bold mb-1">
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
                                <div className="grid grid-cols-2 gap-2 sm:flex sm:justify-end">
                                    <button
                                        type="button"
                                        onClick={() => setSettingsOpen(true)}
                                        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-xs font-semibold text-zinc-100 shadow-sm transition-colors hover:bg-zinc-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
                                        aria-haspopup="dialog"
                                        aria-expanded={settingsOpen}
                                        aria-label="Open checklist settings"
                                        title="Checklist settings"
                                    >
                                        <Settings className="h-4 w-4" />
                                        <span>Checklists</span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setWideLayout((prev) => !prev)}
                                        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-xs font-semibold text-zinc-100 shadow-sm transition-colors hover:bg-zinc-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
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
                                        <span>
                                            {wideLayout ? "Default width" : "Full width"}
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <nav
                        aria-label="Primary guide sections"
                        className="sticky top-0 z-30 border-x border-b border-zinc-800 bg-zinc-950/95 shadow-lg shadow-black/20 backdrop-blur"
                    >
                        <div className="grid auto-cols-[minmax(6.5rem,1fr)] grid-flow-col overflow-x-auto lg:grid-flow-row lg:grid-cols-6">
                            {APP_VIEWS.map((view) => {
                                const Icon = view.icon;
                                const selected = activeView === view.id;

                                return (
                                    <button
                                        key={view.id}
                                        type="button"
                                        aria-current={selected ? "page" : undefined}
                                        onClick={() => selectView(view.id)}
                                        className={`flex min-h-14 items-center justify-center gap-2 border-b-2 px-3 text-xs font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-sky-300 sm:text-sm ${
                                            selected
                                                ? "border-sky-400 bg-zinc-900 text-zinc-50"
                                                : "border-transparent text-zinc-400 hover:bg-zinc-900/70 hover:text-zinc-100"
                                        }`}
                                    >
                                        <Icon className="h-4 w-4 shrink-0" />
                                        <span>{view.label}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </nav>

                    <section
                        ref={viewTopRef}
                        aria-labelledby="active-view-title"
                        className="min-h-[60vh] scroll-mt-16 pb-6 pt-5 sm:pb-8 sm:pt-7"
                    >
                        <header className="mb-5 border-b border-zinc-800 pb-4 sm:mb-6">
                            <div className="flex items-start gap-3">
                                <ActiveViewIcon className="mt-0.5 h-5 w-5 shrink-0 text-sky-300" />
                                <div>
                                    <h2
                                        id="active-view-title"
                                        className="text-xl font-semibold text-zinc-50 sm:text-2xl"
                                    >
                                        {activeViewMeta.title}
                                    </h2>
                                    <p className="mt-1 max-w-3xl text-sm leading-relaxed text-zinc-400">
                                        {activeViewMeta.description}
                                    </p>
                                </div>
                            </div>
                        </header>

                        <div className="space-y-4 sm:space-y-5">
                            <React.Suspense fallback={<SectionLoading />}>
                                {activeView === "guide" ? (
                                    <>
                                        <BeforeYouStartPanel />
                                        <FaqPanel />
                                    </>
                                ) : null}
                                {activeView === "clan" ? <ClanTrialsPanel /> : null}
                                {activeView === "challenges" ? (
                                    <RetroAchievementsPanels />
                                ) : null}
                                {activeView === "collection" ? (
                                    <>
                                        <BazaarRecipesPanel />
                                        <EquipmentHubPanel />
                                    </>
                                ) : null}
                                {activeView === "abilities" ? (
                                    <AbilityHubPanel />
                                ) : null}
                                {activeView === "missions" ? <MissionsPanel /> : null}
                                <ViewReady
                                    onReady={handleViewReady}
                                    view={activeView}
                                />
                            </React.Suspense>
                        </div>
                    </section>
                </div>
            </main>

            <footer className="mb-6 mt-12 flex items-center justify-center text-xs text-zinc-600 dark:text-zinc-400">
                <span>Final Fantasy Tactics A2 play companion</span>
            </footer>

            {/* Floating global search drawer */}
            <DeferredGlobalSearch />
            {settingsOpen ? (
                <React.Suspense fallback={<SettingsLoadingDialog />}>
                    <ChecklistSettingsDialog
                        open
                        onClose={() => setSettingsOpen(false)}
                    />
                </React.Suspense>
            ) : null}
            {syncConflict ? (
                <SyncConflictDialog
                    conflict={syncConflict}
                    onConfirm={resolveSyncConflict}
                />
            ) : null}
        </div>
    );
}

function SectionLoading() {
    return (
        <div
            role="status"
            aria-label="Loading section"
            className="min-h-40 animate-pulse border-y border-zinc-800 py-5 motion-reduce:animate-none"
        >
            <div className="h-4 w-40 rounded bg-zinc-800" />
            <div className="mt-3 h-3 w-full max-w-xl rounded bg-zinc-900" />
            <div className="mt-2 h-3 w-4/5 max-w-lg rounded bg-zinc-900" />
        </div>
    );
}

function ViewReady({
    onReady,
    view,
}: {
    onReady: () => void;
    view: AppView;
}) {
    React.useLayoutEffect(() => onReady(), [onReady, view]);
    return null;
}

function SettingsLoadingDialog() {
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
            role="status"
            aria-label="Loading checklist settings"
        >
            <div className="w-full max-w-xl rounded-lg border border-zinc-700 bg-zinc-950 px-5 py-6 text-sm text-zinc-300 shadow-2xl">
                Loading checklist settings...
            </div>
        </div>
    );
}

const globalSearchTriggerClass =
    "fixed z-40 inline-flex h-12 w-12 items-center justify-center rounded-full border border-emerald-300/50 bg-emerald-600/95 text-sm font-semibold text-white shadow-lg shadow-emerald-500/30 transition-colors hover:bg-emerald-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-200 sm:min-h-11 sm:w-auto sm:gap-2 sm:px-4";

const globalSearchTriggerStyle: React.CSSProperties = {
    bottom: "max(1rem, env(safe-area-inset-bottom))",
    right: "max(1rem, env(safe-area-inset-right))",
};

function DeferredGlobalSearch() {
    const [requested, setRequested] = React.useState(false);

    if (!requested) {
        return (
            <button
                type="button"
                onClick={() => setRequested(true)}
                aria-expanded={false}
                aria-haspopup="dialog"
                aria-label="Open global search"
                title="Global search"
                className={globalSearchTriggerClass}
                style={globalSearchTriggerStyle}
            >
                <Search className="h-4 w-4" />
                <span className="hidden sm:inline">Global search</span>
            </button>
        );
    }

    return (
        <React.Suspense
            fallback={
                <div
                    role="status"
                    aria-label="Loading global search"
                    className={globalSearchTriggerClass}
                    style={globalSearchTriggerStyle}
                >
                    <Search className="h-4 w-4" />
                    <span className="hidden sm:inline">Loading search</span>
                </div>
            }
        >
            <GlobalSearchPanel initialOpen />
        </React.Suspense>
    );
}

function AuthSyncControl() {
    const {
        authError,
        authStatus,
        signOut,
        syncConflict,
        syncStatus,
        user,
    } = useProgress();
    const [authDialogOpen, setAuthDialogOpen] = React.useState(false);
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
        ? "Signed-in progress is synced to Firebase under your account. Firestore security rules restrict each user to their own app progress."
        : "Progress is saved locally in this browser by default. Sign in to sync progress to your account through Firebase.";

    const statusIcon =
        syncStatus === "error" ? (
            <AlertCircle className="h-3.5 w-3.5 text-rose-300" />
        ) : syncStatus === "saved" ? (
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-300" />
        ) : (
            <Cloud className="h-3.5 w-3.5 text-sky-300" />
        );

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
                        className="inline-flex min-h-11 items-center gap-1 rounded-md px-2.5 py-1 font-semibold text-zinc-100 transition-colors hover:bg-zinc-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        <LogOut className="h-3.5 w-3.5" />
                        <span>Sign out</span>
                    </button>
                ) : (
                    <button
                        type="button"
                        onClick={() => setAuthDialogOpen(true)}
                        disabled={isBusy || authStatus === "loading"}
                        className="inline-flex min-h-11 items-center gap-1 rounded-md px-2.5 py-1 font-semibold text-zinc-100 transition-colors hover:bg-zinc-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 disabled:cursor-not-allowed disabled:opacity-60"
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
            {authDialogOpen ? (
                <AuthDialog onClose={() => setAuthDialogOpen(false)} />
            ) : null}
        </div>
    );
}

function useModalFocus(
    dialogRef: React.RefObject<HTMLDivElement>,
    onEscape?: () => void,
) {
    React.useEffect(() => {
        const previouslyFocused = document.activeElement as HTMLElement | null;
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        const focusFrame = window.requestAnimationFrame(() => {
            const initialFocus =
                dialogRef.current?.querySelector<HTMLElement>(
                    "[data-dialog-initial-focus]",
                ) ??
                dialogRef.current?.querySelector<HTMLElement>(
                    'button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), summary, [href], [tabindex]:not([tabindex="-1"])',
                );
            initialFocus?.focus();
        });

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape" && onEscape) {
                event.preventDefault();
                onEscape();
                return;
            }
            if (event.key !== "Tab" || !dialogRef.current) return;

            const focusable = Array.from(
                dialogRef.current.querySelectorAll<HTMLElement>(
                    'button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), summary, [href], [tabindex]:not([tabindex="-1"])',
                ),
            ).filter((element) => !element.hasAttribute("hidden"));
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
    }, [dialogRef, onEscape]);
}

function AuthDialog({ onClose }: { onClose: () => void }) {
    const {
        authError,
        createAccountWithEmail,
        resetPassword,
        signInWithEmail,
        signInWithGoogle,
        user,
    } = useProgress();
    const [email, setEmail] = React.useState("");
    const [mode, setMode] = React.useState<"signin" | "create">("signin");
    const [password, setPassword] = React.useState("");
    const [isBusy, setIsBusy] = React.useState(false);
    const [resetMessage, setResetMessage] = React.useState<string | null>(null);
    const dialogRef = React.useRef<HTMLDivElement>(null);

    useModalFocus(dialogRef, onClose);

    React.useEffect(() => {
        if (user) {
            onClose();
        }
    }, [onClose, user]);

    const canSubmit = email.trim().length > 0 && password.length >= 6 && !isBusy;
    const title = mode === "signin" ? "Sign in" : "Create account";

    const handleEmailSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!canSubmit) {
            return;
        }

        setIsBusy(true);
        setResetMessage(null);
        try {
            if (mode === "signin") {
                await signInWithEmail(email.trim(), password);
            } else {
                await createAccountWithEmail(email.trim(), password);
            }
        } finally {
            setIsBusy(false);
        }
    };

    const handleGoogleSubmit = async () => {
        setIsBusy(true);
        setResetMessage(null);
        try {
            await signInWithGoogle();
        } finally {
            setIsBusy(false);
        }
    };

    const handleReset = async () => {
        if (email.trim().length === 0 || isBusy) {
            return;
        }

        setIsBusy(true);
        setResetMessage(null);
        try {
            await resetPassword(email.trim());
            setResetMessage("Password reset email sent.");
        } finally {
            setIsBusy(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-6 backdrop-blur-sm">
            <div
                ref={dialogRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby="auth-dialog-title"
                aria-describedby="auth-dialog-description"
                className="w-full max-w-md rounded-lg border border-zinc-700 bg-zinc-950 text-zinc-100 shadow-2xl shadow-black/40 ring-1 ring-white/10"
            >
                <div className="border-b border-zinc-800 px-4 py-4 sm:px-5">
                    <p className="text-[0.7rem] font-semibold uppercase text-sky-300">
                        Cloud progress
                    </p>
                    <h2
                        id="auth-dialog-title"
                        className="mt-1 text-lg font-semibold"
                    >
                        {title}
                    </h2>
                    <p
                        id="auth-dialog-description"
                        className="mt-2 text-sm leading-relaxed text-zinc-300"
                    >
                        Use an account to sync this app&apos;s progress across
                        browsers and devices.
                    </p>
                </div>

                <form className="space-y-3 px-4 py-4 sm:px-5" onSubmit={handleEmailSubmit}>
                    <label className="block space-y-1.5 text-sm">
                        <span className="font-semibold text-zinc-200">Email</span>
                        <input
                            type="email"
                            data-dialog-initial-focus
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            autoComplete="email"
                            className="min-h-11 w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-base text-zinc-100 outline-none transition-colors placeholder:text-zinc-500 focus:border-sky-400 focus:ring-2 focus:ring-sky-300/30 sm:text-sm"
                            placeholder="you@example.com"
                        />
                    </label>

                    <label className="block space-y-1.5 text-sm">
                        <span className="font-semibold text-zinc-200">Password</span>
                        <input
                            type="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            autoComplete={
                                mode === "signin"
                                    ? "current-password"
                                    : "new-password"
                            }
                            className="min-h-11 w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-base text-zinc-100 outline-none transition-colors placeholder:text-zinc-500 focus:border-sky-400 focus:ring-2 focus:ring-sky-300/30 sm:text-sm"
                            placeholder="Minimum 6 characters"
                        />
                    </label>

                    <button
                        type="submit"
                        disabled={!canSubmit}
                        className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-sky-400 px-4 py-2 text-sm font-semibold text-zinc-950 transition-colors hover:bg-sky-300 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        <Mail className="h-4 w-4" />
                        {mode === "signin" ? "Sign in with email" : "Create account"}
                    </button>

                    <button
                        type="button"
                        onClick={handleGoogleSubmit}
                        disabled={isBusy}
                        className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2 text-sm font-semibold text-zinc-100 transition-colors hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        <LogIn className="h-4 w-4" />
                        Continue with Google
                    </button>

                    {authError ? (
                        <p className="rounded-lg border border-rose-500/40 bg-rose-500/10 px-3 py-2 text-xs leading-relaxed text-rose-200">
                            {authError}
                        </p>
                    ) : null}
                    {resetMessage ? (
                        <p className="rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-3 py-2 text-xs leading-relaxed text-emerald-200">
                            {resetMessage}
                        </p>
                    ) : null}
                </form>

                <div className="flex flex-col gap-2 border-t border-zinc-800 px-4 py-4 text-sm sm:flex-row sm:items-center sm:justify-between sm:px-5">
                    <div className="flex flex-wrap gap-x-3 gap-y-2">
                        <button
                            type="button"
                            onClick={() =>
                                setMode((current) =>
                                    current === "signin" ? "create" : "signin",
                                )
                            }
                            className="inline-flex min-h-11 items-center font-semibold text-sky-300 hover:text-sky-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
                        >
                            {mode === "signin"
                                ? "Create an account"
                                : "Use existing account"}
                        </button>
                        {mode === "signin" ? (
                            <button
                                type="button"
                                onClick={handleReset}
                                disabled={email.trim().length === 0 || isBusy}
                                className="inline-flex min-h-11 items-center font-semibold text-zinc-300 hover:text-zinc-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                Reset password
                            </button>
                        ) : null}
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="inline-flex min-h-11 items-center font-semibold text-zinc-400 hover:text-zinc-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
                    >
                        Cancel
                    </button>
                </div>
            </div>
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
    const [nameMaps, setNameMaps] = React.useState<ProgressNameMaps>({
        clanTrials: new Map(),
        missions: new Map(),
        retroAchievements: new Map(),
    });
    const dialogRef = React.useRef<HTMLDivElement>(null);

    useModalFocus(dialogRef);

    React.useEffect(() => {
        let active = true;

        void Promise.all([
            import("./data/missions/allMissions"),
            import("./data/meta/clanTrials"),
            import("./data/retroAchievements"),
        ])
            .then(([missions, clanTrials, retroAchievements]) => {
                if (!active) return;

                setNameMaps({
                    missions: new Map(
                        missions.ALL_MISSIONS.map((mission) => [
                            mission.id,
                            mission.name,
                        ]),
                    ),
                    clanTrials: new Map(
                        clanTrials.CLAN_TRIALS.map((trial) => [
                            trial.id,
                            trial.name,
                        ]),
                    ),
                    retroAchievements: new Map(
                        [
                            ...retroAchievements.GLOBAL_RETRO_ACHIEVEMENTS,
                            ...Object.values(
                                retroAchievements.RETRO_ACHIEVEMENTS_BY_MISSION_ID,
                            ).flat(),
                        ].map((achievement) => [
                            achievement.id,
                            achievement.name,
                        ]),
                    ),
                });
            })
            .catch(() => undefined);

        return () => {
            active = false;
        };
    }, []);

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
                ref={dialogRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby="sync-conflict-title"
                aria-describedby="sync-conflict-description"
                className="max-h-[calc(100vh-2rem)] w-full max-w-2xl overflow-auto rounded-lg border border-zinc-700 bg-zinc-950 text-zinc-100 shadow-2xl shadow-black/40 ring-1 ring-white/10"
            >
                <div className="border-b border-zinc-800 px-4 py-4 sm:px-5">
                    <p className="text-[0.7rem] font-semibold uppercase text-sky-300">
                        Progress sync
                    </p>
                    <h2
                        id="sync-conflict-title"
                        className="mt-1 text-lg font-semibold"
                    >
                        Choose which progress to keep
                    </h2>
                    <p
                        id="sync-conflict-description"
                        className="mt-2 text-sm leading-relaxed text-zinc-300"
                    >
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
                                    data-dialog-initial-focus={
                                        option.choice === "merge" ? "true" : undefined
                                    }
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
                        <summary className="flex min-h-11 cursor-pointer items-center px-3 py-2 text-sm font-semibold text-zinc-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-sky-300">
                            Show differences
                        </summary>
                        <div className="grid gap-3 border-t border-zinc-800 p-3 sm:grid-cols-2">
                            <DifferenceList
                                emptyText="No checked items exist only locally."
                                items={conflict.localOnly}
                                nameMaps={nameMaps}
                                title={`Only local (${conflict.localOnly.length})`}
                            />
                            <DifferenceList
                                emptyText="No checked items exist only in cloud."
                                items={conflict.cloudOnly}
                                nameMaps={nameMaps}
                                title={`Only cloud (${conflict.cloudOnly.length})`}
                            />
                        </div>
                    </details>
                </div>

                <div className="flex flex-col gap-2 border-t border-zinc-800 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
                    <p className="text-xs leading-relaxed text-zinc-400">
                        Confirming writes the selected progress to local storage and
                        Firebase for this app.
                    </p>
                    <button
                        type="button"
                        onClick={() => onConfirm(choice)}
                        className="inline-flex min-h-11 items-center justify-center rounded-lg bg-sky-400 px-4 py-2 text-sm font-semibold text-zinc-950 transition-colors hover:bg-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-200"
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
    nameMaps,
    title,
}: {
    emptyText: string;
    items: string[];
    nameMaps: ProgressNameMaps;
    title: string;
}) {
    return (
        <div>
            <h3 className="text-xs font-semibold uppercase text-zinc-400">
                {title}
            </h3>
            {items.length > 0 ? (
                <ul className="mt-2 max-h-44 space-y-1 overflow-auto pr-1 text-xs text-zinc-300">
                    {items.map((item) => (
                        <li
                            key={item}
                            className="rounded-md bg-zinc-950/70 px-2 py-1"
                        >
                            {formatProgressKey(item, nameMaps)}
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="mt-2 text-xs text-zinc-500">{emptyText}</p>
            )}
        </div>
    );
}

interface ProgressNameMaps {
    clanTrials: Map<string, string>;
    missions: Map<string, string>;
    retroAchievements: Map<string, string>;
}

function formatProgressKey(key: string, nameMaps: ProgressNameMaps): string {
    const [scope, ...rest] = key.split(":");

    if (scope === "mission") {
        const missionId = rest.join(":");
        return `Mission: ${nameMaps.missions.get(missionId) ?? friendlyId(missionId)}`;
    }

    if (scope === "retro") {
        const achievementId = rest.join(":");
        return `RetroAchievement: ${
            nameMaps.retroAchievements.get(achievementId) ??
            friendlyId(achievementId)
        }`;
    }

    if (scope === "trial" || scope === "clan-trial") {
        const [trialId, ...titleParts] = rest;
        const trialName =
            nameMaps.clanTrials.get(trialId) ?? friendlyId(trialId);
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
                className="inline-flex h-11 w-11 items-center justify-center rounded-full text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
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
