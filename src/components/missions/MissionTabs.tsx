import React from "react";
import {
    RotateCcw,
    Search,
    SlidersHorizontal,
} from "lucide-react";
import { ALL_MISSIONS } from "../../data/missions/allMissions";
import type { Mission } from "../../types/ffta2";
import type { MissionTag } from "../../data/missions/missionTags";
import { RETRO_ACHIEVEMENTS_BY_MISSION_ID } from "../../data/retroAchievements";
import { missionScopeId } from "../../data/checklistScopes";
import {
    getMergedMissionTags,
    getMissionSearchScore,
} from "../../utils/missionSearch";
import { useChecklistPreferences } from "../ChecklistPreferencesContext";
import { useGuidePreference, useProgress } from "../ProgressContext";
import { MissionCard } from "./MissionCard";

type ArcFilter =
    | "ALL"
    | "A1" | "A2" | "A3" | "A4" | "A5"
    | "B1" | "B2" | "B3" | "B4" | "B5"
    | "C1" | "C2" | "C3" | "C4" | "C5"
    | "D1" | "D2" | "D3" | "D4" | "D5"
    | "E1" | "E2" | "E3" | "E4" | "E5"
    | "EX"
    | "ME";

type CompletionFilter = "ALL" | "COMPLETED" | "NOT_COMPLETED";

const ARC_FILTERS: ArcFilter[] = [
    "ALL",
    "A1", "A2", "A3", "A4", "A5",
    "B1", "B2", "B3", "B4", "B5",
    "C1", "C2", "C3", "C4", "C5",
    "D1", "D2", "D3", "D4", "D5",
    "E1", "E2", "E3", "E4", "E5",
    "EX",
    "ME",
];

const TAG_FILTERS: MissionTag[] = [
    "story",
    "optional",
    "map-event",
    "ex-mission",
    "auction",
    "treasure",
    "missable",
    "job-unlock",
    "hunt",
    "notorious-mark",
    "multi-battle",
    "chain",
    "recruit",
    "boss",
    "collection",
    "puzzle",
    "escort",
    "protection",
    "timed",
    "law-sensitive",
    "story-cameo",
    "elite",
];

const TAG_LABELS: Partial<Record<MissionTag, string>> = {
    "job-unlock": "Job unlock",
    "map-event": "Map event",
    "ex-mission": "EX mission",
    "notorious-mark": "Mark hunt",
    "multi-battle": "Multi-battle",
    "law-sensitive": "Law sensitive",
    "story-cameo": "Story cameo",
};

const MOBILE_BATCH_SIZE = 30;
const DEFAULT_MISSION_TAGS: MissionTag[] = [];

function getTagLabel(tag: MissionTag): string {
    return TAG_LABELS[tag] ?? `${tag.charAt(0).toUpperCase()}${tag.slice(1)}`;
}

function getMissionSortKey(mission: Mission) {
    const raw = mission.id || mission.arc;
    const extraMatch = raw.match(/^(EX|ME)-?(\d+)?/i);

    if (extraMatch) {
        return {
            chapterLetter: extraMatch[1].toUpperCase() === "EX" ? "X" : "Y",
            arcNumber: 0,
            missionIndex: extraMatch[2] ? Number.parseInt(extraMatch[2], 10) : 0,
        };
    }

    const match = raw.match(/^([A-E])(\d)(?:-(\d+))?/i);
    if (!match) {
        return { chapterLetter: "Z", arcNumber: 99, missionIndex: 999 };
    }

    return {
        chapterLetter: match[1].toUpperCase(),
        arcNumber: Number.parseInt(match[2], 10),
        missionIndex: match[3] ? Number.parseInt(match[3], 10) : 0,
    };
}

function sortByArcAndIndex(left: Mission, right: Mission) {
    const leftKey = getMissionSortKey(left);
    const rightKey = getMissionSortKey(right);

    return (
        leftKey.chapterLetter.localeCompare(rightKey.chapterLetter) ||
        leftKey.arcNumber - rightKey.arcNumber ||
        leftKey.missionIndex - rightKey.missionIndex
    );
}

export function MissionTabs() {
    const { checked, setCheck } = useProgress();
    const { isChecklistEnabled, isScopeEnabled } = useChecklistPreferences();
    const [activeArc, setActiveArc] = useGuidePreference<ArcFilter>(
        "filters.missions.arc",
        "ALL",
    );
    const [completionFilter, setCompletionFilter] =
        useGuidePreference<CompletionFilter>(
            "filters.missions.completion",
            "ALL",
        );
    const [filtersOpen, setFiltersOpen] = useGuidePreference(
        "disclosure.missions.filters",
        false,
    );
    const [missableRetrosOnly, setMissableRetrosOnly] = useGuidePreference(
        "filters.missions.missable-retros",
        false,
    );
    const [searchTerm, setSearchTerm] = useGuidePreference(
        "filters.missions.query",
        "",
    );
    const [selectedMissionId, setSelectedMissionId] = useGuidePreference(
        "selection.missions.active",
        "",
    );
    const [selectedTags, setSelectedTags] = useGuidePreference<MissionTag[]>(
        "filters.missions.tags",
        DEFAULT_MISSION_TAGS,
    );
    const [visibleCount, setVisibleCount] = React.useState(MOBILE_BATCH_SIZE);
    const detailRef = React.useRef<HTMLDivElement>(null);
    const filterId = React.useId();

    const missionTrackingEnabled =
        isChecklistEnabled("missions") &&
        (isScopeEnabled("missions", "quest-report") ||
            isScopeEnabled("missions", "other-missions"));
    const normalizedSearch = searchTerm.trim().toLowerCase();

    const missableRetroMissionIds = React.useMemo(() => {
        const ids = new Set<string>();
        for (const [missionId, achievements] of Object.entries(
            RETRO_ACHIEVEMENTS_BY_MISSION_ID,
        )) {
            if (achievements.some((achievement) => achievement.missable)) {
                ids.add(missionId);
            }
        }
        return ids;
    }, []);

    const allMissions = React.useMemo(
        () => [...ALL_MISSIONS].sort(sortByArcAndIndex),
        [],
    );

    const missions = React.useMemo(() => {
        let filtered = allMissions.flatMap((mission) => {
            if (activeArc !== "ALL" && mission.arc !== activeArc) return [];
            if (
                missableRetrosOnly &&
                !missableRetroMissionIds.has(mission.id)
            ) {
                return [];
            }

            const mergedTags = getMergedMissionTags(mission);
            if (
                selectedTags.length > 0 &&
                !mergedTags.some((tag) =>
                    selectedTags.includes(tag as MissionTag),
                )
            ) {
                return [];
            }

            let searchScore = 0;
            if (normalizedSearch) {
                const score = getMissionSearchScore(
                    mission,
                    normalizedSearch,
                    mergedTags,
                );
                if (score == null) return [];
                searchScore = score;
            }

            if (completionFilter !== "ALL") {
                if (!isScopeEnabled("missions", missionScopeId(mission))) {
                    return [];
                }
                const completed = Boolean(checked[`mission:${mission.id}`]);
                if (completionFilter === "COMPLETED" && !completed) return [];
                if (completionFilter === "NOT_COMPLETED" && completed) return [];
            }

            return [{ mission, searchScore }];
        });

        if (normalizedSearch) {
            const bestScore = filtered.reduce(
                (best, entry) => Math.max(best, entry.searchScore),
                0,
            );
            if (bestScore >= 900) {
                filtered = filtered.filter((entry) => entry.searchScore >= 820);
            }
            filtered.sort(
                (left, right) =>
                    right.searchScore - left.searchScore ||
                    sortByArcAndIndex(left.mission, right.mission),
            );
        }

        return filtered.map((entry) => entry.mission);
    }, [
        activeArc,
        allMissions,
        checked,
        completionFilter,
        isScopeEnabled,
        missableRetroMissionIds,
        missableRetrosOnly,
        normalizedSearch,
        selectedTags,
    ]);

    React.useEffect(() => {
        setVisibleCount(MOBILE_BATCH_SIZE);
    }, [activeArc, completionFilter, missableRetrosOnly, normalizedSearch, selectedTags]);

    React.useEffect(() => {
        if (!missionTrackingEnabled) setCompletionFilter("ALL");
    }, [missionTrackingEnabled]);

    const selectedMission =
        missions.find((mission) => mission.id === selectedMissionId) ?? null;
    const visibleMissions = missions.slice(0, visibleCount);
    const remainingMissions = Math.max(
        0,
        missions.length - visibleMissions.length,
    );
    const activeFilterCount =
        (activeArc === "ALL" ? 0 : 1) +
        (completionFilter === "ALL" ? 0 : 1) +
        (missableRetrosOnly ? 1 : 0) +
        selectedTags.length;

    const toggleTag = (tag: MissionTag) => {
        setSelectedTags((current) =>
            current.includes(tag)
                ? current.filter((candidate) => candidate !== tag)
                : [...current, tag],
        );
    };

    const resetFilters = () => {
        setActiveArc("ALL");
        setCompletionFilter("ALL");
        setMissableRetrosOnly(false);
        setSelectedTags([]);
    };

    const selectMission = (missionId: string) => {
        setSelectedMissionId((current) =>
            current === missionId ? "" : missionId,
        );
        detailRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <div className="space-y-4">
            <div className="grid gap-2 md:grid-cols-[minmax(0,1fr)_auto]">
                <label className="relative block">
                    <span className="sr-only">Search missions</span>
                    <Search
                        aria-hidden="true"
                        className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500"
                    />
                    <input
                        type="search"
                        value={searchTerm}
                        onChange={(event) => setSearchTerm(event.target.value)}
                        placeholder="Search missions, objectives, rewards, or recruits"
                        className="min-h-11 w-full rounded-md border border-zinc-700 bg-zinc-950 py-2 pl-10 pr-3 text-base text-zinc-100 placeholder:text-zinc-500 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/70 sm:text-sm"
                    />
                </label>
                <button
                    type="button"
                    aria-controls={filtersOpen ? filterId : undefined}
                    aria-expanded={filtersOpen}
                    onClick={() => setFiltersOpen((open) => !open)}
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm font-semibold text-zinc-200 transition-colors hover:border-zinc-500 hover:bg-zinc-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-300"
                >
                    <SlidersHorizontal aria-hidden="true" className="h-4 w-4" />
                    Filters
                    {activeFilterCount > 0 ? (
                        <span className="min-w-5 rounded-full bg-violet-400 px-1.5 py-0.5 text-center text-xs font-bold tabular-nums text-violet-950">
                            {activeFilterCount}
                        </span>
                    ) : null}
                </button>
            </div>

            {filtersOpen ? (
                <div id={filterId} className="border-y border-zinc-800 py-3">
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                        <label className="text-xs font-semibold text-zinc-400">
                            Arc
                            <select
                                value={activeArc}
                                onChange={(event) =>
                                    setActiveArc(event.target.value as ArcFilter)
                                }
                                className="mt-1 min-h-11 w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-base font-normal text-zinc-100 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-400 sm:text-sm"
                            >
                                {ARC_FILTERS.map((arc) => (
                                    <option key={arc} value={arc}>
                                        {arc === "ALL" ? "All arcs" : arc}
                                    </option>
                                ))}
                            </select>
                        </label>

                        {missionTrackingEnabled ? (
                            <label className="text-xs font-semibold text-zinc-400">
                                Completion
                                <select
                                    value={completionFilter}
                                    onChange={(event) =>
                                        setCompletionFilter(
                                            event.target.value as CompletionFilter,
                                        )
                                    }
                                    className="mt-1 min-h-11 w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-base font-normal text-zinc-100 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-400 sm:text-sm"
                                >
                                    <option value="ALL">All missions</option>
                                    <option value="NOT_COMPLETED">Not completed</option>
                                    <option value="COMPLETED">Completed</option>
                                </select>
                            </label>
                        ) : null}

                        <label className="flex min-h-11 cursor-pointer items-center gap-2 self-end rounded-md px-2 text-sm text-zinc-200 hover:bg-zinc-900 focus-within:ring-2 focus-within:ring-amber-300">
                            <input
                                type="checkbox"
                                checked={missableRetrosOnly}
                                onChange={(event) =>
                                    setMissableRetrosOnly(event.target.checked)
                                }
                                className="h-5 w-5 rounded border-zinc-500 accent-amber-400"
                            />
                            Missable RetroAchievements
                        </label>

                        <button
                            type="button"
                            onClick={resetFilters}
                            disabled={activeFilterCount === 0}
                            className="inline-flex min-h-11 items-center justify-center gap-2 self-end rounded-md px-3 py-2 text-sm font-semibold text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-zinc-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                            <RotateCcw aria-hidden="true" className="h-4 w-4" />
                            Reset filters
                        </button>
                    </div>

                    <fieldset className="mt-4 border-t border-zinc-800 pt-3">
                        <legend className="px-1 text-xs font-semibold text-zinc-400">
                            Tags
                        </legend>
                        <div className="mt-2 grid grid-cols-2 gap-x-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
                            {TAG_FILTERS.map((tag) => (
                                <label
                                    key={tag}
                                    className="flex min-h-11 cursor-pointer items-center gap-2 rounded-md px-2 text-xs text-zinc-300 transition-colors hover:bg-zinc-900 focus-within:ring-2 focus-within:ring-emerald-300"
                                >
                                    <input
                                        type="checkbox"
                                        checked={selectedTags.includes(tag)}
                                        onChange={() => toggleTag(tag)}
                                        className="h-4 w-4 shrink-0 rounded border-zinc-500 accent-emerald-400"
                                    />
                                    <span>{getTagLabel(tag)}</span>
                                </label>
                            ))}
                        </div>
                    </fieldset>
                </div>
            ) : null}

            <div
                className="flex flex-wrap items-center justify-between gap-2 border-y border-zinc-800 py-2 text-xs text-zinc-400"
                aria-live="polite"
            >
                <span>
                    <span className="font-semibold tabular-nums text-zinc-100">
                        {missions.length}
                    </span>{" "}
                    result{missions.length === 1 ? "" : "s"}
                </span>
                {missions.length > visibleMissions.length ? (
                    <span className="tabular-nums lg:hidden">
                        Showing {visibleMissions.length}
                    </span>
                ) : null}
            </div>

            {missions.length === 0 ? (
                <p role="status" className="py-6 text-center text-sm text-zinc-400">
                    No missions match the current search and filters.
                </p>
            ) : (
                <>
                    <div className="space-y-2 lg:hidden">
                        {visibleMissions.map((mission) => (
                            <MissionCard key={mission.id} mission={mission} />
                        ))}
                        {remainingMissions > 0 ? (
                            <div className="grid gap-2 border-t border-zinc-800 pt-3 sm:grid-cols-2">
                                <button
                                    type="button"
                                    onClick={() =>
                                        setVisibleCount((count) =>
                                            Math.min(
                                                count + MOBILE_BATCH_SIZE,
                                                missions.length,
                                            ),
                                        )
                                    }
                                    className="inline-flex min-h-11 items-center justify-center rounded-md border border-violet-700 bg-violet-950/40 px-4 py-2 text-sm font-semibold text-violet-100 hover:border-violet-500 hover:bg-violet-900/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-300"
                                >
                                    Show next {Math.min(MOBILE_BATCH_SIZE, remainingMissions)}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setVisibleCount(missions.length)}
                                    className="inline-flex min-h-11 items-center justify-center rounded-md px-4 py-2 text-sm font-semibold text-zinc-300 hover:bg-zinc-800 hover:text-zinc-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400"
                                >
                                    Show all {missions.length}
                                </button>
                            </div>
                        ) : null}
                    </div>

                    <div className="hidden h-[75vh] min-h-[38rem] max-h-[48rem] grid-cols-[minmax(18rem,0.85fr)_minmax(0,1.65fr)] overflow-hidden border-y border-zinc-800 lg:grid">
                        <nav
                            aria-label="Mission results"
                            className="min-h-0 overflow-y-auto border-r border-zinc-800"
                        >
                            <ol>
                                {missions.map((mission) => {
                                    const selected = selectedMission?.id === mission.id;
                                    const completed = Boolean(
                                        checked[`mission:${mission.id}`],
                                    );
                                    const rowTrackingEnabled = isScopeEnabled(
                                        "missions",
                                        missionScopeId(mission),
                                    );
                                    return (
                                        <li
                                            key={mission.id}
                                            className={`grid border-b border-zinc-800/80 ${
                                                rowTrackingEnabled
                                                    ? "grid-cols-[3rem_minmax(0,1fr)]"
                                                    : "grid-cols-1"
                                            } ${
                                                selected
                                                    ? "bg-violet-950/60 text-zinc-50"
                                                    : "text-zinc-200 hover:bg-zinc-900"
                                            }`}
                                        >
                                            {rowTrackingEnabled ? (
                                                <label className="flex min-h-16 cursor-pointer items-center justify-center border-r border-zinc-800/80 focus-within:ring-2 focus-within:ring-inset focus-within:ring-emerald-300">
                                                    <input
                                                        type="checkbox"
                                                        checked={completed}
                                                        onChange={(event) =>
                                                            setCheck(
                                                                `mission:${mission.id}`,
                                                                event.target.checked,
                                                            )
                                                        }
                                                        className="h-5 w-5 rounded border-zinc-500 accent-emerald-500 focus:ring-2 focus:ring-emerald-300"
                                                        aria-label={`Mark ${mission.name} complete`}
                                                    />
                                                </label>
                                            ) : null}
                                            <button
                                                type="button"
                                                aria-current={selected ? "true" : undefined}
                                                onClick={() => selectMission(mission.id)}
                                                className="grid min-h-16 w-full min-w-0 grid-cols-1 items-center px-3 py-2.5 text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-violet-300"
                                            >
                                                <span className="min-w-0">
                                                    <span className="flex items-baseline gap-2">
                                                        <span className="shrink-0 font-mono text-xs text-zinc-500">
                                                            {mission.id}
                                                        </span>
                                                        <span className="truncate text-sm font-semibold">
                                                            {mission.name}
                                                        </span>
                                                    </span>
                                                    <span className="mt-1 flex min-w-0 items-center gap-2 text-xs text-zinc-500">
                                                        <span className="min-w-0 flex-1 truncate">
                                                            {[mission.questType, mission.region]
                                                                .filter(Boolean)
                                                                .join(" | ")}
                                                        </span>
                                                        {mission.rank != null ? (
                                                            <span
                                                                aria-label={`Recommended level approximately ${mission.rank}`}
                                                                className="shrink-0 rounded border border-zinc-700/80 bg-zinc-950/70 px-1.5 py-0.5 font-semibold tabular-nums text-zinc-300"
                                                            >
                                                                Rec. Lv. ~{mission.rank}
                                                            </span>
                                                        ) : null}
                                                    </span>
                                                </span>
                                            </button>
                                        </li>
                                    );
                                })}
                            </ol>
                        </nav>
                        <div
                            ref={detailRef}
                            className="min-h-0 min-w-0 overflow-y-auto"
                        >
                            {selectedMission ? (
                                <MissionCard mission={selectedMission} mode="detail" />
                            ) : (
                                <p
                                    role="status"
                                    className="grid min-h-full place-items-center p-6 text-sm font-medium text-zinc-500"
                                >
                                    No mission selected.
                                </p>
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
