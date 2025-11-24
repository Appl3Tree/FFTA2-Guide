import React from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Panel } from "../ui/Panel";
import {
    GLOBAL_RETRO_ACHIEVEMENTS,
    RETRO_ACHIEVEMENTS_BY_MISSION_ID,
} from "../../data/retroAchievements";
import type { GlobalRetroAchievement } from "../../types/ffta2";
import { useProgress } from "../ProgressContext";

export function RetroAchievementsPanels() {
    const { checked, setCheck } = useProgress();

    // Build a set of missable IDs from BOTH sources
    const MISSABLE_RETRO_IDS = React.useMemo(() => {
        const s = new Set<string>();

        // Global achievements that are missable
        for (const ach of GLOBAL_RETRO_ACHIEVEMENTS) {
            if (ach.missable) {
                s.add(ach.id);
            }
        }

        // Mission-tied achievements that are missable
        for (const list of Object.values(RETRO_ACHIEVEMENTS_BY_MISSION_ID)) {
            for (const ach of list) {
                if (ach.missable) {
                    s.add(ach.id);
                }
            }
        }

        return s;
    }, []);

    // Compute grouped global achievements by category
    const byCategory = React.useMemo(() => {
        return GLOBAL_RETRO_ACHIEVEMENTS.reduce<Record<string, GlobalRetroAchievement[]>>(
            (acc, ach) => {
                const cat = ach.category ?? "Miscellaneous";
                if (!acc[cat]) acc[cat] = [];
                acc[cat].push(ach);
                return acc;
            },
            {},
        );
    }, []);

    const orderedCategories = Object.keys(byCategory).sort((a, b) =>
        a.localeCompare(b),
    );

    // Track collapsed/expanded categories
    const [openCategories, setOpenCategories] = React.useState<
        Record<string, boolean>
    >({});

    // Progress across all global achievements
    const totalAchievements = GLOBAL_RETRO_ACHIEVEMENTS.length;
    const completedAchievements = GLOBAL_RETRO_ACHIEVEMENTS.filter((ach) =>
        checked[`retro:${ach.id}`],
    ).length;
    const completionPct =
        totalAchievements === 0
            ? 0
            : Math.round((completedAchievements / totalAchievements) * 100);

    const headerProgress = (
        <div className="flex items-center justify-between gap-2 text-xs sm:text-sm">
            <div className="text-zinc-100/90">
                <span className="font-semibold">
                    {completedAchievements} / {totalAchievements}
                </span>{" "}
                achievements completed
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
        <Panel
            title="RetroAchievements"
            subtitle="Optional challenge goals from RetroAchievements."
            tone="red"
            headerAddon={headerProgress}
        >
            <div className="space-y-4 mt-2">
                {orderedCategories.map((category) => {
                    const list = byCategory[category]!;
                    const isOpen = !!openCategories[category];

                    return (
                        <section
                            key={category}
                            className="border border-zinc-200/70 dark:border-zinc-700/70 rounded-xl p-3 sm:p-4 bg-white/70 dark:bg-zinc-900/60"
                        >
                            <button
                                type="button"
                                onClick={() =>
                                    setOpenCategories((prev) => ({
                                        ...prev,
                                        [category]: !isOpen,
                                    }))
                                }
                                className="flex w-full items-center justify-between gap-1 mb-2 text-left"
                                aria-expanded={isOpen}
                            >
                                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 w-full">
                                    <div>
                                        <h3 className="text-sm sm:text-base font-semibold text-zinc-900 dark:text-zinc-50">
                                            {category}
                                        </h3>
                                        <p className="text-[0.7rem] sm:text-xs text-zinc-500 dark:text-zinc-400">
                                            {list.length} achievements
                                        </p>
                                    </div>
                                    <span className="inline-flex items-center gap-1 text-[0.7rem] text-zinc-500 dark:text-zinc-400">
                                        <span className="hidden sm:inline">
                                            {isOpen
                                                ? "Hide achievements"
                                                : "Show achievements"}
                                        </span>
                                        {isOpen ? (
                                            <ChevronUp className="h-3.5 w-3.5" />
                                        ) : (
                                            <ChevronDown className="h-3.5 w-3.5" />
                                        )}
                                    </span>
                                </div>
                            </button>

                            {isOpen && (
                                <ul className="space-y-1.5">
                                    {list.map((ach) => {
                                        const key = `retro:${ach.id}`;
                                        const isChecked = !!checked[key];
                                        const isMissable =
                                            ach.missable ||
                                            MISSABLE_RETRO_IDS.has(ach.id);

                                        return (
                                            <li
                                                key={ach.id}
                                                className="flex items-start gap-2 text-xs sm:text-sm text-zinc-800 dark:text-zinc-100/90"
                                            >
                                                <label className="flex items-start gap-2 cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        className="mt-0.5 h-3.5 w-3.5 rounded border-zinc-400 text-emerald-500 focus:ring-emerald-500/70"
                                                        checked={isChecked}
                                                        onChange={(e) =>
                                                            setCheck(
                                                                key,
                                                                e.target
                                                                    .checked,
                                                            )
                                                        }
                                                    />
                                                    <div>
                                                        <div className="flex flex-wrap items-center gap-1">
                                                            <span className="font-medium">
                                                                {ach.name}
                                                            </span>
                                                            {isMissable && (
                                                                <span className="inline-flex items-center rounded-full border border-rose-400/80 bg-rose-50/80 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 px-1.5 py-px text-[0.65rem] uppercase tracking-[0.14em]">
                                                                    Missable
                                                                </span>
                                                            )}
                                                        </div>
                                                        <p className="text-[0.7rem] sm:text-xs text-zinc-500 dark:text-zinc-400">
                                                            {ach.description}
                                                        </p>
                                                    </div>
                                                </label>
                                            </li>
                                        );
                                    })}
                                </ul>
                            )}
                        </section>
                    );
                })}
            </div>
        </Panel>
    );
}

