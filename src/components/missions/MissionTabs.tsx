import React from "react";
import { ALL_MISSIONS } from "../../data/missions/allMissions";
import type { Mission } from "../../types/ffta2";
import { MissionCard } from "./MissionCard";
import type { MissionTag } from "../../data/missions/missionTags";
import { RETRO_ACHIEVEMENTS_BY_MISSION_ID } from "../../data/retroAchievements";
import { useProgress } from "../ProgressContext";
import {
    getMergedMissionTags,
    getMissionSearchScore,
} from "../../utils/missionSearch";

function getMissionSortKey(mission: Mission) {
    const raw = (mission as any).id || mission.arc;
    const extraMatch = raw.match(/^(EX|ME)-?(\d+)?/i);

    if (extraMatch) {
        return {
            chapterLetter: extraMatch[1].toUpperCase() === "EX" ? "X" : "Y",
            arcNumber: 0,
            missionIndex: extraMatch[2] ? parseInt(extraMatch[2], 10) : 0,
        };
    }

    const match = raw.match(/^([A-E])(\d)(?:-(\d+))?/i);

    if (!match) {
        return {
            chapterLetter: "Z",
            arcNumber: 99,
            missionIndex: 999,
        };
    }

    const [, letterRaw, arcNumRaw, indexRaw] = match;
    const chapterLetter = letterRaw.toUpperCase();
    const arcNumber = parseInt(arcNumRaw, 10);
    const missionIndex = indexRaw ? parseInt(indexRaw, 10) : 0;

    return { chapterLetter, arcNumber, missionIndex };
}

function sortByArcAndIndex(a: Mission, b: Mission) {
    const A = getMissionSortKey(a);
    const B = getMissionSortKey(b);

    if (A.chapterLetter < B.chapterLetter) return -1;
    if (A.chapterLetter > B.chapterLetter) return 1;
    if (A.arcNumber !== B.arcNumber) return A.arcNumber - B.arcNumber;
    return A.missionIndex - B.missionIndex;
}

type ArcFilter =
    | "ALL"
    | "A1" | "A2" | "A3" | "A4" | "A5"
    | "B1" | "B2" | "B3" | "B4" | "B5"
    | "C1" | "C2" | "C3" | "C4" | "C5"
    | "D1" | "D2" | "D3" | "D4" | "D5"
    | "E1" | "E2" | "E3" | "E4" | "E5"
    | "EX" | "ME";

const ARC_FILTERS: ArcFilter[] = [
    "ALL",
    "A1", "A2", "A3", "A4", "A5",
    "B1", "B2", "B3", "B4", "B5",
    "C1", "C2", "C3", "C4", "C5",
    "D1", "D2", "D3", "D4", "D5",
    "E1", "E2", "E3", "E4", "E5",
    "EX", "ME",
];

type CompletionFilter = "ALL" | "COMPLETED" | "NOT_COMPLETED";

const COMPLETION_FILTERS: CompletionFilter[] = [
    "ALL",
    "COMPLETED",
    "NOT_COMPLETED",
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
    "job-unlock": "Job Unlock",
    "map-event": "Map Event",
    "ex-mission": "EX",
    auction: "Auction",
    treasure: "Treasure",
    missable: "Missable",
    "notorious-mark": "Mark Hunt",
    "multi-battle": "Multi-Battle",
    "law-sensitive": "Law Sensitive",
    "story-cameo": "Story Cameo",
};

function getTagLabel(tag: MissionTag): string {
    return TAG_LABELS[tag] ?? tag;
}

export function MissionTabs() {
    const [activeArc, setActiveArc] = React.useState<ArcFilter>("ALL");
    const [searchTerm, setSearchTerm] = React.useState("");
    const [selectedTags, setSelectedTags] = React.useState<MissionTag[]>([]);
    const [showTagFilters, setShowTagFilters] = React.useState(false);
    const [showArcFilters, setShowArcFilters] = React.useState(false);
    const [completionFilter, setCompletionFilter] =
        React.useState<CompletionFilter>("ALL");
    const [showCompletionFilters, setShowCompletionFilters] =
        React.useState(false);
    const [missableRetrosOnly, setMissableRetrosOnly] = React.useState(false);

    const { checked } = useProgress();

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

    const allMissions = React.useMemo<Mission[]>(() => {
        return [...ALL_MISSIONS].sort(sortByArcAndIndex);
    }, []);

    const toggleTag = (tag: MissionTag) => {
        setSelectedTags((prev) =>
            prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
        );
    };

    const missions = React.useMemo(() => {
        let filtered = allMissions
            .map((mission: Mission) => {
                if (activeArc !== "ALL") {
                    if (mission.arc !== activeArc) return null;
                }

                if (
                    missableRetrosOnly &&
                    !missableRetroMissionIds.has(mission.id)
                ) {
                    return null;
                }

                const mergedTags = getMergedMissionTags(mission);

                if (selectedTags.length > 0) {
                    const hasAny = mergedTags.some((tag) =>
                        selectedTags.includes(tag as MissionTag),
                    );
                    if (!hasAny) return null;
                }

                let searchScore = 0;
                if (normalizedSearch.length > 0) {
                    const score = getMissionSearchScore(
                        mission,
                        normalizedSearch,
                        mergedTags,
                    );
                    if (score == null) return null;
                    searchScore = score;
                }

                if (completionFilter !== "ALL") {
                    const key = `mission:${mission.id}`;
                    const isCompleted = !!checked[key];

                    if (completionFilter === "COMPLETED" && !isCompleted) {
                        return null;
                    }

                    if (completionFilter === "NOT_COMPLETED" && isCompleted) {
                        return null;
                    }
                }

                return { mission, searchScore };
            })
            .filter(
                (entry): entry is { mission: Mission; searchScore: number } =>
                    entry !== null,
            );

        if (normalizedSearch.length > 0) {
            const bestScore = filtered.reduce(
                (best, entry) => Math.max(best, entry.searchScore),
                0,
            );

            if (bestScore >= 900) {
                filtered = filtered.filter((entry) => entry.searchScore >= 820);
            }

            filtered.sort((a, b) => {
                if (b.searchScore !== a.searchScore) {
                    return b.searchScore - a.searchScore;
                }
                return sortByArcAndIndex(a.mission, b.mission);
            });
        }

        return filtered.map((entry) => entry.mission);
    }, [
        allMissions,
        activeArc,
        normalizedSearch,
        selectedTags,
        completionFilter,
        missableRetrosOnly,
        missableRetroMissionIds,
        checked,
    ]);

    return (
        <div className="space-y-4">
            {/* Filters left / Search right */}
            <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    {/* Filters LEFT */}
                    <div className="flex flex-wrap items-center gap-2 justify-between sm:justify-start w-full sm:w-auto">
                        {/* Filter by Arc */}
                        <button
                            type="button"
                            onClick={() => setShowArcFilters((prev) => !prev)}
                            className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[0.7rem] uppercase tracking-[0.16em] ${
                                showArcFilters
                                    ? "border-rose-500/80 bg-rose-900/60 text-rose-100"
                                    : "border-zinc-700/80 bg-zinc-900/60 text-zinc-300 hover:border-zinc-500"
                            }`}
                        >
                            Filter by Arc
                            {activeArc !== "ALL" && (
                                <span className="ml-1 text-[0.65rem] opacity-80">
                                    ({activeArc})
                                </span>
                            )}
                        </button>

                        {/* Filter by Tag */}
                        <button
                            type="button"
                            onClick={() => setShowTagFilters((prev) => !prev)}
                            className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[0.7rem] uppercase tracking-[0.16em] ${
                                showTagFilters
                                    ? "border-emerald-400/80 bg-emerald-900/60 text-emerald-50"
                                    : "border-zinc-700/80 bg-zinc-900/60 text-zinc-300 hover:border-zinc-500"
                            }`}
                        >
                            Filter by Tag
                            {selectedTags.length > 0 && (
                                <span className="ml-1 text-[0.65rem] opacity-80">
                                    ({selectedTags.length})
                                </span>
                            )}
                        </button>

                        {/* Filter by Completion */}
                        <button
                            type="button"
                            onClick={() =>
                                setShowCompletionFilters((prev) => !prev)
                            }
                            className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[0.7rem] uppercase tracking-[0.16em] ${
                                showCompletionFilters
                                    ? "border-sky-500/80 bg-sky-900/60 text-sky-100"
                                    : "border-zinc-700/80 bg-zinc-900/60 text-zinc-300 hover:border-zinc-500"
                            }`}
                        >
                            Filter by Completion
                            {completionFilter !== "ALL" && (
                                <span className="ml-1 text-[0.65rem] opacity-80">
                                    (
                                    {completionFilter === "COMPLETED"
                                        ? "✓"
                                        : "✗"}
                                    )
                                </span>
                            )}
                        </button>

                        <button
                            type="button"
                            onClick={() =>
                                setMissableRetrosOnly((prev) => !prev)
                            }
                            aria-pressed={missableRetrosOnly}
                            className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[0.7rem] uppercase tracking-[0.16em] ${
                                missableRetrosOnly
                                    ? "border-amber-400/80 bg-amber-900/60 text-amber-100"
                                    : "border-zinc-700/80 bg-zinc-900/60 text-zinc-300 hover:border-zinc-500"
                            }`}
                        >
                            Missable Retros
                            {missableRetrosOnly && (
                                <span className="ml-1 text-[0.65rem] opacity-80">
                                    ({missableRetroMissionIds.size})
                                </span>
                            )}
                        </button>
                    </div>

                    {/* Search RIGHT */}
                    <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
                        <input
                            type="text"
                            className="w-full sm:w-72 rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/70"
                            placeholder="Search missions (name, objective, rewards...)"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {/* Arc filter pills */}
                {showArcFilters && (
                    <div className="flex flex-wrap gap-1.5">
                        {ARC_FILTERS.map((arc) => {
                            const isActive = activeArc === arc;
                            return (
                                <button
                                    key={arc}
                                    type="button"
                                    onClick={() => setActiveArc(arc)}
                                    className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[0.7rem] uppercase tracking-[0.16em] ${
                                        isActive
                                            ? "border-rose-500/80 bg-rose-900/60 text-rose-100"
                                            : "border-zinc-700/80 bg-zinc-900/60 text-zinc-300 hover:border-zinc-500"
                                    }`}
                                >
                                    {arc === "ALL" ? "All" : arc}
                                </button>
                            );
                        })}
                    </div>
                )}

                {/* Tag pills */}
                {showTagFilters && (
                    <div className="flex flex-wrap gap-1.5">
                        {TAG_FILTERS.map((tag) => {
                            const isActive = selectedTags.includes(tag);
                            return (
                                <button
                                    key={tag}
                                    type="button"
                                    onClick={() => toggleTag(tag)}
                                    className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[0.65rem] uppercase tracking-[0.16em] ${
                                        isActive
                                            ? "border-emerald-400/80 bg-emerald-900/60 text-emerald-50"
                                            : "border-zinc-700/80 bg-zinc-900/60 text-zinc-300 hover:border-zinc-500"
                                    }`}
                                >
                                    {getTagLabel(tag)}
                                </button>
                            );
                        })}

                        {selectedTags.length > 0 && (
                            <button
                                type="button"
                                onClick={() => setSelectedTags([])}
                                className="ml-1 inline-flex items-center rounded-full border border-zinc-700/80 bg-zinc-900/80 px-2.5 py-1 text-[0.65rem] uppercase tracking-[0.16em] text-zinc-400 hover:border-zinc-500"
                            >
                                Clear Tags
                            </button>
                        )}
                    </div>
                )}

                {/* Completion pills */}
                {showCompletionFilters && (
                    <div className="flex flex-wrap gap-1.5">
                        {COMPLETION_FILTERS.map((value) => {
                            const isActive = completionFilter === value;
                            const label =
                                value === "ALL"
                                    ? "All"
                                    : value === "COMPLETED"
                                    ? "✓"
                                    : "✗";
                            return (
                                <button
                                    key={value}
                                    type="button"
                                    onClick={() => setCompletionFilter(value)}
                                    className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[0.7rem] uppercase tracking-[0.16em] ${
                                        isActive
                                            ? "border-sky-500/80 bg-sky-900/60 text-sky-100"
                                            : "border-zinc-700/80 bg-zinc-900/60 text-zinc-300 hover:border-zinc-500"
                                    }`}
                                >
                                    {label}
                                </button>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Mission list */}
            <div className="space-y-3">
                {missions.map((mission) => (
                    <MissionCard key={mission.id} mission={mission} />
                ))}

                {missions.length === 0 && (
                    <p className="text-xs sm:text-sm text-zinc-400 italic">
                        No missions match the current filters.
                    </p>
                )}
            </div>
        </div>
    );
}
