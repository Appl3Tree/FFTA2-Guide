import React from "react";
import { SectionLabel } from "./components/ui/SectionLabel";
import { Panel } from "./components/ui/Panel";
import { IntroPanels } from "./components/meta/IntroPanels";
import { SystemsPanels } from "./components/meta/SystemsPanels";
import { RacesPanels } from "./components/meta/RacesPanels";
import { MissionTabs } from "./components/missions/MissionTabs";

export default function App() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-start py-10 px-4 sm:px-6 lg:px-8 bg-zinc-100 text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100 transition-colors">
            {/* Optional header, mirroring the other guide */}
            {/* 
            <header className="mb-8 text-center">
                <h1 className="text-2xl font-semibold tracking-tight">
                    Final Fantasy Tactics A2 Progression Guide
                </h1>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm mt-1">by appl3tree</p>
            </header>
            */}

            <main className="w-full max-w-5xl">
                <div className="canvas-card">
                    {/* Top banner, modeled after fftaprogression_guide.tsx */}
                    <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 rounded-t-2xl ring-1 ring-zinc-950/10 dark:ring-white/10 shadow-sm">
                        <h1 className="text-3xl font-bold mb-1">
                            FFTA2 Story Progression Guide
                        </h1>
                        <p className="text-sm opacity-90">
                            Story Missions • Side Quests • Races &amp; Jobs • Clan Systems
                        </p>
                    </div>

                    {/* Main card body */}
                    <section className="bg-zinc-100 dark:bg-zinc-900 rounded-b-2xl ring-1 ring-zinc-950/10 dark:ring-white/10 border-t-0 px-4 sm:px-6 pb-6 sm:pb-8 pt-4 sm:pt-6 space-y-6">
                        <header className="space-y-4 sm:space-y-6">
                            {/* <SectionLabel>FFTA2 Guide</SectionLabel> */}
                            <IntroPanels />
                            <RacesPanels />
                            <SystemsPanels />
                        </header>

                        <div className="space-y-4 sm:space-y-5">
                            <Panel
                                title="Mission Hub"
                                subtitle="Switch between story and optional missions."
                                tone="blue"
                            >
                                <MissionTabs />
                            </Panel>
                        </div>
                    </section>
                </div>
            </main>

            <footer className="text-zinc-600 dark:text-zinc-400 text-xs mt-12">
                Built with React, Tailwind, and lucide-react
            </footer>
        </div>
    );
}

