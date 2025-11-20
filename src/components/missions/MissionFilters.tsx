import React, { useMemo } from "react";
import type { Mission } from "../../types/ffta2";
import { Filter } from "lucide-react";

export function MissionFilters({
    missions,
    filterArc,
    setFilterArc,
    searchTerm,
    setSearchTerm,
}: {
    missions: Mission[];
    filterArc: string;
    setFilterArc: (next: string) => void;
    searchTerm: string;
    setSearchTerm: (next: string) => void;
}) {
    const arcs = useMemo(
        () => Array.from(new Set(missions.map((m) => m.arc))).sort(),
        [missions],
    );

    return (
        <div className="rounded-xl border border-zinc-300/70 dark:border-zinc-700/70 bg-zinc-50/60 dark:bg-zinc-900/60 px-3 py-3 sm:px-4 sm:py-4 space-y-2">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-zinc-700 dark:text-zinc-200">
                    <Filter className="h-4 w-4" />
                    <span>Filters</span>
                    {filterArc && (
                        <button
                            type="button"
                            onClick={() => setFilterArc("")}
                            className="ml-2 text-[0.7rem] sm:text-xs rounded-full px-2 py-0.5 border border-zinc-300/70 dark:border-zinc-700/70 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100/70 dark:hover:bg-zinc-800/70"
                        >
                            Clear arc
                        </button>
                    )}
                </div>

                <div className="w-full sm:w-64">
                    <label className="sr-only" htmlFor="mission-search">
                        Search missions
                    </label>
                    <input
                        id="mission-search"
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search..."
                        className="w-full rounded-lg border border-zinc-300/70 dark:border-zinc-700/70 bg-white/80 dark:bg-zinc-900/80 px-3 py-1.5 text-xs sm:text-sm text-zinc-900 dark:text-zinc-50 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/70 focus:border-emerald-500/70"
                    />
                </div>
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
                <button
                    type="button"
                    onClick={() => setFilterArc("")}
                    className={`px-2 py-1 rounded-full border text-xs sm:text-[0.8rem] transition-colors ${
                        filterArc === ""
                            ? "bg-emerald-600 text-white border-emerald-600"
                            : "border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100/70 dark:hover:bg-zinc-800/70"
                    }`}
                >
                    All arcs
                </button>
                {arcs.map((arc) => (
                    <button
                        key={arc}
                        type="button"
                        onClick={() => setFilterArc(arc)}
                        className={`px-2 py-1 rounded-full border text-xs sm:text-[0.8rem] transition-colors ${
                            filterArc === arc
                                ? "bg-emerald-600 text-white border-emerald-600"
                                : "border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100/70 dark:hover:bg-zinc-800/70"
                        }`}
                    >
                        {arc}
                    </button>
                ))}
            </div>
        </div>
    );
}

