import React from "react";
import { OPTIONAL_MISSIONS } from "../../data/missions/storyOptional";
import { STORY_MAIN_MISSIONS } from "../../data/missions/storyMain";
import type { Mission } from "../../types/ffta2";
import { MissionCard } from "./MissionCard";
import { MISSION_TAGS, type MissionTag } from "../../data/missions/missionTags";
import { useProgress } from "../ProgressContext";

function getMissionSortKey(mission: Mission) {
    const raw = (mission as any).id || mission.arc;
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
    | "EX";

const ARC_FILTERS: ArcFilter[] = [
    "ALL",
    "A1", "A2", "A3", "A4", "A5",
    "B1", "B2", "B3", "B4", "B5",
    "C1", "C2", "C3", "C4", "C5",
    "D1", "D2", "D3", "D4", "D5",
    "E1", "E2", "E3", "E4", "E5",
    "EX",
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
    const [completionFilter, setCompletionFilter] =
        React.useState<CompletionFilter>("ALL");
    const [showCompletionFilters, setShowCompletionFilters] =
        React.useState(false);

    const { checked } = useProgress();

    const normalizedSearch = searchTerm.trim().toLowerCase();

    const ALL_MISSIONS = React.useMemo<Mission[]>(() => {
        return [...STORY_MAIN_MISSIONS, ...OPTIONAL_MISSIONS].sort(
            sortByArcAndIndex,
        );
    }, []);

    const toggleTag = (tag: MissionTag) => {
        setSelectedTags((prev) =>
            prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
        );
    };

    const missions = React.useMemo(() => {
        return ALL_MISSIONS.filter((mission: Mission) => {
            if (activeArc !== "ALL") {
                if (mission.arc !== activeArc) return false;
            }

            const explicitTags = (mission.tags ?? []) as string[];
            const overlayTags = (MISSION_TAGS[mission.id] ?? []) as MissionTag[];

            const mergedTags = Array.from(
                new Set<string>([...explicitTags, ...overlayTags]),
            ).filter((t) => !!t);

            if (selectedTags.length > 0) {
                const hasAny = mergedTags.some((tag) =>
                    selectedTags.includes(tag as MissionTag),
                );
                if (!hasAny) return false;
            }

            if (normalizedSearch.length > 0) {
                const haystackParts: string[] = [];

                haystackParts.push(mission.id);
                haystackParts.push(mission.name);

                if (mission.description) haystackParts.push(mission.description);
                if (mission.region) haystackParts.push(mission.region);
                if (mission.rewards?.loot) haystackParts.push(mission.rewards.loot);
                if (mission.rewards?.items) haystackParts.push(mission.rewards.items);
                if (mission.notes) haystackParts.push(mission.notes);

                haystackParts.push(...mergedTags);

                const haystack = haystackParts.join(" ").toLowerCase();

                if (!haystack.includes(normalizedSearch)) return false;
            }

            if (completionFilter !== "ALL") {
                const key = `mission:${mission.id}`;
                const isCompleted = !!checked[key];

                if (completionFilter === "COMPLETED" && !isCompleted) {
                    return false;
                }

                if (completionFilter === "NOT_COMPLETED" && isCompleted) {
                    return false;
                }
            }

            return true;
        });
    }, [
        ALL_MISSIONS,
        activeArc,
        normalizedSearch,
        selectedTags,
        completionFilter,
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
                    </div>

                    {/* Search RIGHT */}
                    <input
                        type="text"
                        className="w-full sm:max-w-xs rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/70"
                        placeholder="Search missions (name, rewards, tags...)"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
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

