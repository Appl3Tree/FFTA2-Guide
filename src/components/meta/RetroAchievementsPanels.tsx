import React from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Panel } from "../ui/Panel";
import {
    GLOBAL_RETRO_ACHIEVEMENTS,
    RETRO_ACHIEVEMENTS_BY_MISSION_ID,
} from "../../data/retroAchievements";
import type { GlobalRetroAchievement } from "../../types/ffta2";
import { useGuidePreference, useProgress } from "../ProgressContext";
import { PanelProgress } from "../ui/PanelProgress";
import { useChecklistPreferences } from "../ChecklistPreferencesContext";
import { globalRetroScopeId } from "../../data/checklistScopes";

const DEFAULT_OPEN_CATEGORIES: Record<string, boolean> = {};

export function RetroAchievementsPanels() {
    const { checked, setCheck } = useProgress();
    const { isChecklistEnabled, isScopeEnabled } = useChecklistPreferences();
    const trackingEnabled = isChecklistEnabled("retroAchievements");
    const [missableOnly, setMissableOnly] = useGuidePreference(
        "filters.achievements.missable-only",
        false,
    );

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
    const [openCategories, setOpenCategories] = useGuidePreference<
        Record<string, boolean>
    >("disclosure.achievements.categories", DEFAULT_OPEN_CATEGORIES);

    const missionLinkedAchievementIds = React.useMemo(
        () =>
            new Set(
                Object.values(RETRO_ACHIEVEMENTS_BY_MISSION_ID)
                    .flat()
                    .map((achievement) => achievement.id),
            ),
        [],
    );
    const missionLinkedTrackingEnabled = isScopeEnabled(
        "retroAchievements",
        "mission-linked",
    );
    const trackedAchievements = GLOBAL_RETRO_ACHIEVEMENTS.filter(
        (achievement) =>
            isScopeEnabled(
                "retroAchievements",
                globalRetroScopeId(achievement),
            ) ||
            (missionLinkedTrackingEnabled &&
                missionLinkedAchievementIds.has(achievement.id)),
    );
    const totalAchievements = trackedAchievements.length;
    const totalMissableAchievements = GLOBAL_RETRO_ACHIEVEMENTS.filter(
        (ach) => ach.missable || MISSABLE_RETRO_IDS.has(ach.id),
    ).length;
    const completedAchievements = trackedAchievements.filter((ach) =>
        checked[`retro:${ach.id}`],
    ).length;
    const headerProgress = (
        <PanelProgress
            completed={completedAchievements}
            label="Achievements"
            tone="amber"
            total={totalAchievements}
        />
    );

    return (
        <Panel
            title="RetroAchievements"
            subtitle="Optional challenge goals from RetroAchievements."
            tone="amber"
            defaultOpen
            collapsible={false}
            headerAddon={
                trackingEnabled && totalAchievements > 0
                    ? headerProgress
                    : undefined
            }
        >
            <div className="space-y-4 mt-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                    <label
                        className={`inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-md border px-3 py-1.5 text-xs font-semibold uppercase focus-within:ring-2 focus-within:ring-amber-300 ${
                            missableOnly
                                ? "border-amber-400/80 bg-amber-900/60 text-amber-100"
                                : "border-zinc-700/80 bg-zinc-900/60 text-zinc-300 hover:border-zinc-500"
                        }`}
                    >
                        <input
                            type="checkbox"
                            checked={missableOnly}
                            onChange={(event) =>
                                setMissableOnly(event.target.checked)
                            }
                            className="h-4 w-4 rounded border-zinc-500 accent-amber-400"
                        />
                        Missable only
                        {missableOnly && (
                            <span className="ml-1 text-[0.65rem] opacity-80">
                                ({totalMissableAchievements})
                            </span>
                        )}
                    </label>

                    {missableOnly && (
                        <span className="text-[0.7rem] text-zinc-500 dark:text-zinc-400">
                            Showing missable RetroAchievements only
                        </span>
                    )}
                </div>

                <div className="divide-y divide-zinc-800 border-y border-zinc-800">
                {orderedCategories.map((category) => {
                    const list = missableOnly
                        ? byCategory[category]!.filter(
                              (ach) =>
                                  ach.missable || MISSABLE_RETRO_IDS.has(ach.id),
                          )
                        : byCategory[category]!;

                    if (list.length === 0) return null;

                    const isOpen = !!openCategories[category];

                    return (
                        <section
                            key={category}
                            className="bg-white/40 dark:bg-zinc-950/20"
                        >
                            <button
                                type="button"
                                onClick={() =>
                                    setOpenCategories((prev) => ({
                                        ...prev,
                                        [category]: !isOpen,
                                    }))
                                }
                                className="flex min-h-14 w-full items-center justify-between gap-3 px-3 py-2 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-amber-300"
                                aria-expanded={isOpen}
                            >
                                <div className="flex w-full items-center justify-between gap-3">
                                    <div>
                                        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                                            {category}
                                        </h3>
                                        <p className="text-[0.7rem] sm:text-xs text-zinc-500 dark:text-zinc-400">
                                            {list.length} achievements
                                        </p>
                                    </div>
                                    <span className="inline-flex shrink-0 items-center gap-1 text-[0.7rem] text-zinc-500 dark:text-zinc-400">
                                        <span className="hidden sm:inline">
                                            {isOpen
                                                ? "Hide"
                                                : "Show"}
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
                                <ul className="divide-y divide-zinc-200/70 border-t border-zinc-200/70 px-2 dark:divide-zinc-800 dark:border-zinc-800">
                                    {list.map((ach) => {
                                        const key = `retro:${ach.id}`;
                                        const isChecked = !!checked[key];
                                        const achievementTrackingEnabled =
                                            isScopeEnabled(
                                                "retroAchievements",
                                                globalRetroScopeId(ach),
                                            );
                                        const isMissable =
                                            ach.missable ||
                                            MISSABLE_RETRO_IDS.has(ach.id);
                                        const ItemWrapper = achievementTrackingEnabled
                                            ? "label"
                                            : "div";

                                        return (
                                            <li
                                                key={ach.id}
                                                className="text-xs text-zinc-800 dark:text-zinc-100/90 sm:text-sm"
                                            >
                                                <ItemWrapper
                                                    className={`flex min-h-11 w-full items-start gap-2 rounded-md px-1.5 py-1.5 transition-colors ${
                                                        achievementTrackingEnabled
                                                            ? "cursor-pointer hover:bg-zinc-100/80 focus-within:ring-2 focus-within:ring-amber-300 dark:hover:bg-zinc-800/60"
                                                            : ""
                                                    }`}
                                                >
                                                    {achievementTrackingEnabled ? (
                                                    <input
                                                        type="checkbox"
                                                        className="mt-0.5 h-5 w-5 shrink-0 rounded border-zinc-400 text-emerald-500 focus:ring-emerald-500/70"
                                                        checked={isChecked}
                                                        onChange={(e) =>
                                                            setCheck(
                                                                key,
                                                                e.target
                                                                    .checked,
                                                            )
                                                        }
                                                    />
                                                    ) : null}
                                                    <div>
                                                        <div className="flex flex-wrap items-center gap-1">
                                                            <span className="font-medium">
                                                                {ach.name}
                                                            </span>
                                                            {isMissable && (
                                                                <span className="inline-flex items-center rounded-full border border-rose-400/80 bg-rose-50/80 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 px-1.5 py-px text-[0.65rem] uppercase">
                                                                    Missable
                                                                </span>
                                                            )}
                                                        </div>
                                                        <p className="text-[0.7rem] sm:text-xs text-zinc-500 dark:text-zinc-400">
                                                            {ach.description}
                                                        </p>
                                                        {ach.notes && (
                                                            <p className="text-[0.68rem] sm:text-[0.72rem] text-amber-700 dark:text-amber-300">
                                                                {ach.notes}
                                                            </p>
                                                        )}
                                                    </div>
                                                </ItemWrapper>
                                            </li>
                                        );
                                    })}
                                </ul>
                            )}
                        </section>
                    );
                })}
                </div>
            </div>
        </Panel>
    );
}
