import React from "react";
import { Panel } from "../ui/Panel";
import { GLOBAL_RETRO_ACHIEVEMENTS } from "../../data/retroAchievements";
import type { GlobalRetroAchievement } from "../../types/ffta2";

export function RetroAchievementsPanels() {
    // Group achievements by category
    const byCategory = GLOBAL_RETRO_ACHIEVEMENTS.reduce<
        Record<string, GlobalRetroAchievement[]>
    >((acc, ach) => {
        if (!acc[ach.category]) acc[ach.category] = [];
        acc[ach.category].push(ach);
        return acc;
    }, {});

    // Optional: stable ordering by category name
    const orderedCategories = Object.keys(byCategory).sort((a, b) =>
        a.localeCompare(b),
    );

    return (
        <Panel
            title="RetroAchievements"
            subtitle="Optional challenge goals from RetroAchievements."
            tone="red"
        >
            <div className="space-y-4 mt-3">
                {orderedCategories.map((category) => {
                    const list = byCategory[category];
                    return (
                        <section
                            key={category}
                            className="border border-zinc-200/70 dark:border-zinc-700/70 rounded-xl p-3 sm:p-4 bg-white/70 dark:bg-zinc-900/60"
                        >
                            <header className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-2">
                                <h3 className="text-sm sm:text-base font-semibold tracking-tight">
                                    {category}
                                </h3>
                                <p className="text-xs sm:text-[0.8rem] text-zinc-600 dark:text-zinc-300">
                                    RetroAchievements tied to this aspect of
                                    your run.
                                </p>
                            </header>

                            <ul className="space-y-1.5 text-xs sm:text-sm">
                                {list.map((ach) => (
                                    <li
                                        key={ach.id}
                                        className="flex flex-col sm:flex-row sm:items-baseline sm:gap-2
                                                   rounded-xl border border-zinc-300/40 dark:border-zinc-700/40
                                                   bg-zinc-50/40 dark:bg-zinc-900/30
                                                   px-3 py-2"
                                    >
                                        <span className="font-medium text-zinc-900 dark:text-zinc-50 sm:w-[14rem] shrink-0">
                                            {ach.name}
                                        </span>
                                        <span className="sm:ml-2 text-zinc-700 dark:text-zinc-200 flex-1">
                                            {ach.description}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    );
                })}
            </div>
        </Panel>
    );
}

