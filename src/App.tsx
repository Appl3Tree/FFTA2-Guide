import React from "react";
import { SectionLabel } from "./components/ui/SectionLabel";
import { Panel } from "./components/ui/Panel";
import { BeforeYouStartPanel } from "./components/meta/BeforeYouStartPanel";
import { RacesPanels } from "./components/meta/RacesPanels";
import { RetroAchievementsPanels } from "./components/meta/RetroAchievementsPanels";
import { MissionTabs } from "./components/missions/MissionTabs";
import { STORY_MAIN_MISSIONS } from "./data/missions/storyMain";
import { OPTIONAL_MISSIONS } from "./data/missions/storyOptional";
import { ProgressProvider, useProgress } from "./components/ProgressContext";
import { EquipmentHub } from "./components/meta/EquipmentHub";
import BazaarPanel from "./components/meta/BazaarPanel";
import { AbilityHub } from "./components/meta/AbilityHub";
import { GlobalSearchPanel } from "./components/meta/GlobalSearchPanel";

export default function App() {
    return (
        <ProgressProvider>
            <AppInner />
        </ProgressProvider>
    );
}

function AppInner() {
    const { checked } = useProgress();

    const allMissionIds = React.useMemo(
        () => [...STORY_MAIN_MISSIONS, ...OPTIONAL_MISSIONS].map((m) => m.id),
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
            <div className="text-zinc-100/90">
                <span className="font-semibold">
                    {completedMissions} / {totalMissions}
                </span>{" "}
                missions completed
            </div>
            <div className="flex items-center gap-2">
                <div className="h-1.5 w-28 sm:w-40 rounded-full bg-black/30 overflow-hidden">
                    <div
                        className="h-full bg-emerald-300 dark:bg-emerald-300"
                        style={{ width: `${completionPct}%` }}
                    />
                </div>
                <span className="text-[0.7rem] text-zinc-100/80">
                    {completionPct}%
                </span>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-zinc-950 to-zinc-900 text-zinc-50">
            <main className="w-full max-w-5xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
                <div className="canvas-card">
                    {/* Top banner, modeled after fftaprogression_guide.tsx */}
                    <div className="bg-gradient-to-r from-purple-600/90 to-emerald-500/90 text-white rounded-t-2xl ring-1 ring-zinc-950/10 dark:ring-white/10 shadow-sm">
                        <div className="px-4 sm:px-6 py-4 sm:py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                            <div>
                                <h1 className="text-3xl font-bold mb-1">
                                    FFTA2 Progression &amp; Completion Guide
                                </h1>
                                <p className="text-sm text-zinc-50/90">
                                    Track story missions, side quests, RetroAchievements, and
                                    optimize your clan&apos;s builds as you work through{" "}
                                    <span className="font-semibold">
                                        Final Fantasy Tactics A2: Grimoire of the Rift
                                    </span>
                                    .
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Main card body */}
                    <section className="bg-zinc-100 dark:bg-zinc-950/90 rounded-b-2xl shadow-sm ring-1 ring-zinc-950/10 dark:ring-white/10 border-t-0 px-4 sm:px-6 pb-6 sm:pb-8 pt-4 sm:pt-6 space-y-6">
                        <header className="space-y-4 sm:space-y-6">
                            {/* Pre-game heads-up / info */}
                            <BeforeYouStartPanel />

                            {/* RetroAchievements (kept separate) */}
                            <RetroAchievementsPanels />

                            {/* Races & Jobs Overview (kept separate) */}
                            <RacesPanels />
                        </header>

                        <div className="space-y-4 sm:space-y-5">
                            <Panel
                                title="Bazaar Recipes"
                                subtitle="See which loot unlocks which bazaar rewards."
                                tone="yellow"
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
                                <MissionTabs
                                    storyMissions={STORY_MAIN_MISSIONS}
                                    optionalMissions={OPTIONAL_MISSIONS}
                                />
                            </Panel>
                        </div>
                    </section>
                </div>
            </main>

            <footer className="text-zinc-600 dark:text-zinc-400 text-xs mt-12">
                Built with React, Tailwind, and lucide-react
            </footer>

            {/* Floating global search drawer */}
            <GlobalSearchPanel />
        </div>
    );
}

