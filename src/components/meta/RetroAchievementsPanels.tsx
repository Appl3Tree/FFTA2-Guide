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

    // Group global achievements by category
    const byCategory = GLOBAL_RETRO_ACHIEVEMENTS.reduce<
        Record<string, GlobalRetroAchievement[]>
    >((acc, ach) => {
        if (!acc[ach.category]) acc[ach.category] = [];
        acc[ach.category].push(ach);
        return acc;
    }, {});

    // Collect ALL mission-based RetroAchievements that are missable
    const MISSABLE_RETRO_IDS = new Set<string>();
    Object.values(RETRO_ACHIEVEMENTS_BY_MISSION_ID).forEach((list) => {
        list.forEach((ach) => {
            if (ach.missable) {
                MISSABLE_RETRO_IDS.add(ach.id);
            }
        });
    });

    const [openCategories, setOpenCategories] = React.useState<
        Record<string, boolean>
    >({});

    const orderedCategories = Object.keys(byCategory).sort((a, b) =>
        a.localeCompare(b),
    );

    // 🔍 Search state
    const [query, setQuery] = React.useState("");

    // Apply search across name/description/category and missable flag
    const filteredByCategory = React.useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return byCategory;

        const out: Record<string, GlobalRetroAchievement[]> = {};

        for (const category of orderedCategories) {
            const list = byCategory[category];
            const filtered = list.filter((ach) => {
                const parts: string[] = [];
                parts.push(category, ach.name, ach.description);
                if (MISSABLE_RETRO_IDS.has(ach.id)) {
                    parts.push("missable");
                }
                const blob = parts.join(" ").toLowerCase();
                return blob.includes(q);
            });

            if (filtered.length > 0) {
                out[category] = filtered;
            }
        }

        return out;
    }, [byCategory, orderedCategories, query, MISSABLE_RETRO_IDS]);

    const filteredCategories = orderedCategories.filter(
        (cat) => filteredByCategory[cat]?.length,
    );

    return (
        <Panel
            title="RetroAchievements"
            subtitle="Optional challenge goals from RetroAchievements."
            tone="red"
        >
            {/* Search bar */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3 mt-1">
                <label className="text-[0.7rem] sm:text-xs font-semibold tracking-[0.16em] text-zinc-500 dark:text-zinc-300 uppercase">
                    Search RetroAchievements
                </label>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search by name, description, category..."
                    className="w-full sm:w-72 rounded-md border border-zinc-300/80 dark:border-zinc-700/80 bg-white/80 dark:bg-zinc-900/70 px-2.5 py-1.5 text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:outline-none focus:ring-1 focus:ring-rose-500/70 focus:border-rose-500/70"
                />
            </div>

            <div className="space-y-4 mt-1">
                {filteredCategories.length === 0 && (
                    <p className="text-[0.75rem] text-zinc-600 dark:text-zinc-300">
                        No RetroAchievements match your search.
                    </p>
                )}

                {filteredCategories.map((category) => {
                    const list = filteredByCategory[category];
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
                                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                                    <h3 className="text-sm sm:text-base font-semibold tracking-tight">
                                        {category}
                                    </h3>
                                    <p className="text-xs sm:text-[0.8rem] text-zinc-600 dark:text-zinc-300">
                                        RetroAchievements tied to this aspect of
                                        your run.
                                    </p>
                                </div>
                                <span className="ml-2 inline-flex items-center justify-center">
                                    {isOpen ? (
                                        <ChevronUp className="h-4 w-4 text-zinc-500" />
                                    ) : (
                                        <ChevronDown className="h-4 w-4 text-zinc-500" />
                                    )}
                                </span>
                            </button>

                            {isOpen && (
                                <ul className="space-y-1.5 text-xs sm:text-sm">
                                    {list.map((ach) => (
                                        <li
                                            key={ach.id}
                                            className="relative rounded-xl border border-zinc-300/40 dark:border-zinc-700/40 bg-zinc-50/40 dark:bg-zinc-900/30 px-3 py-2"
                                        >
                                            {MISSABLE_RETRO_IDS.has(ach.id) && (
                                                <span className="absolute -top-1.5 right-2 inline-flex items-center rounded-full bg-rose-700 px-1.5 py-0.5 text-[0.6rem] uppercase tracking-[0.16em] text-rose-50">
                                                    Missable
                                                </span>
                                            )}

                                            <div className="font-semibold text-zinc-900 dark:text-zinc-50 sm:w-[14rem]">
                                                {ach.name}
                                            </div>

                                            <div className="text-zinc-700 dark:text-zinc-200 mt-1">
                                                {ach.description}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </section>
                    );
                })}
            </div>
        </Panel>
    );
}

