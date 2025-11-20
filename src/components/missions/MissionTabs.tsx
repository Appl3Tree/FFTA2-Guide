import React from "react";
import { OPTIONAL_MISSIONS } from "../../data/missions/storyOptional";
import { STORY_MAIN_MISSIONS } from "../../data/missions/storyMain";
import type { Mission } from "../../types/ffta2";
import { MissionCard } from "./MissionCard";
import { MISSION_TAGS, type MissionTag } from "../../data/missions/missionTags";

function getMissionSortKey(mission: Mission) {
    // Prefer mission.id like "A1-01"
    const raw = (mission as any).id || mission.arc;

    // Expected patterns:
    // - "A1-01" (preferred)
    // - "A1-1"  (still handled)
    // - fallback: just "A1"
    const match = raw.match(/^([A-E])(\d)(?:-(\d+))?/i);

    if (!match) {
        // If something weird slips through, push it to the end
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

    // 1) Sort by chapter letter: A → E
    if (A.chapterLetter < B.chapterLetter) return -1;
    if (A.chapterLetter > B.chapterLetter) return 1;

    // 2) Sort by arc number: 1 → 5
    if (A.arcNumber !== B.arcNumber) {
        return A.arcNumber - B.arcNumber;
    }

    // 3) Sort by mission index within the arc: 01 → 16
    return A.missionIndex - B.missionIndex;
}

type ArcFilter =
    | "ALL"
    | "A1" | "A2" | "A3" | "A4" | "A5"
    | "B1" | "B2" | "B3" | "B4" | "B5"
    | "C1" | "C2" | "C3" | "C4" | "C5"
    | "D1" | "D2" | "D3" | "D4" | "D5"
    | "E1" | "E2" | "E3" | "E4" | "E5";

const ARC_FILTERS: ArcFilter[] = [
    "ALL",
    "A1", "A2", "A3", "A4", "A5",
    "B1", "B2", "B3", "B4", "B5",
    "C1", "C2", "C3", "C4", "C5",
    "D1", "D2", "D3", "D4", "D5",
    "E1", "E2", "E3", "E4", "E5",
];

const TAG_FILTERS: MissionTag[] = [
    "story",
    "optional",
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

    const normalizedSearch = searchTerm.trim().toLowerCase();

    const ALL_MISSIONS = React.useMemo<Mission[]>(() => {
        return [...STORY_MAIN_MISSIONS, ...OPTIONAL_MISSIONS].sort(sortByArcAndIndex);
    }, []);

    const toggleTag = (tag: MissionTag) => {
        setSelectedTags((prev) =>
            prev.includes(tag)
                ? prev.filter((t) => t !== tag)
                : [...prev, tag],
        );
    };

    const missions = React.useMemo(() => {
        return ALL_MISSIONS.filter((mission: Mission) => {
            // 1) Arc filter (A1–E5)
            if (activeArc !== "ALL") {
                if (mission.arc !== activeArc) {
                    return false;
                }
            }

            // 2) Merge tags (mission.tags + overlay MISSION_TAGS), minus "optional"
            const explicitTags = (mission.tags ?? []) as string[];
            const overlayTags = (MISSION_TAGS[mission.id] ?? []) as MissionTag[];

            const mergedTags = Array.from(
                new Set<string>([...explicitTags, ...overlayTags]),
            ).filter((t) => !!t);

            // 3) Tag filter (OR: must have at least one selected tag)
            if (selectedTags.length > 0) {
                const hasAnySelectedTag = mergedTags.some((tag) =>
                    selectedTags.includes(tag as MissionTag),
                );
                if (!hasAnySelectedTag) {
                    return false;
                }
            }

            // 4) Search filter (matches id, name, description, region, rewards, notes, tags)
            if (normalizedSearch.length > 0) {
                const haystackParts: string[] = [];

                haystackParts.push(mission.id);
                haystackParts.push(mission.name);

                if (mission.description) {
                    haystackParts.push(mission.description);
                }
                if (mission.region) {
                    haystackParts.push(mission.region);
                }
                if (mission.rewards?.loot) {
                    haystackParts.push(mission.rewards.loot);
                }
                if (mission.rewards?.items) {
                    haystackParts.push(mission.rewards.items);
                }
                if (mission.notes) {
                    haystackParts.push(mission.notes);
                }

                // include tags as searchable text
                haystackParts.push(...mergedTags);

                const haystack = haystackParts.join(" ").toLowerCase();

                if (!haystack.includes(normalizedSearch)) {
                    return false;
                }
            }

            return true;
        });
    }, [ALL_MISSIONS, activeArc, normalizedSearch, selectedTags]);

    return (
        <div className="space-y-4">
            {/* Search + filter toggles */}
            <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    {/* Search box */}
                    <input
                        type="text"
                        className="w-full sm:max-w-xs rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/70"
                        placeholder="Search missions (name, rewards, tags...)"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />

                    {/* Filter toggles */}
                    <div className="flex flex-wrap items-center gap-2 justify-between sm:justify-end w-full sm:w-auto">
                        {/* Filter by Arc toggle */}
                        <button
                            type="button"
                            onClick={() =>
                                setShowArcFilters((prev) => !prev)
                            }
                            className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[0.7rem] uppercase tracking-[0.16em] ${
                                showArcFilters
                                    ? "border-emerald-500/80 bg-emerald-900/60 text-emerald-100"
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

                        {/* Filter by Tag toggle */}
                        <button
                            type="button"
                            onClick={() =>
                                setShowTagFilters((prev) => !prev)
                            }
                            className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[0.7rem] uppercase tracking-[0.16em] ${
                                showTagFilters
                                    ? "border-sky-400/80 bg-sky-900/60 text-sky-50"
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
                    </div>
                </div>

                {/* Arc filter pills (A1–E5 / All), only when toggled */}
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
                                            ? "border-emerald-500/80 bg-emerald-900/60 text-emerald-100"
                                            : "border-zinc-700/80 bg-zinc-900/60 text-zinc-300 hover:border-zinc-500"
                                    }`}
                                >
                                    {arc === "ALL" ? "All" : arc}
                                </button>
                            );
                        })}
                    </div>
                )}

                {/* Tag filter pills, only when toggled */}
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
                                            ? "border-sky-400/80 bg-sky-900/60 text-sky-50"
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

