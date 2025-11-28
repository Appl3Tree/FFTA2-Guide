import React from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Panel } from "../ui/Panel";
import { RACE_JOBS } from "../../data/races/raceJobs";

export function RacesPanels() {
    const [openRaces, setOpenRaces] = React.useState<
        Record<string, boolean>
    >({});

    return (
        <Panel
            title="Races & Jobs Overview"
            subtitle="Information on each race and its respective jobs."
            tone="amber"
        >
            <div className="space-y-4 mt-3">
                {RACE_JOBS.map((entry) => {
                    const isOpen = !!openRaces[entry.race];

                    return (
                        <section
                            key={entry.race}
                            className="border border-zinc-200/70 dark:border-zinc-700/70 rounded-xl p-3 sm:p-4 bg-white/70 dark:bg-zinc-900/60"
                        >
                            <button
                                type="button"
                                onClick={() =>
                                    setOpenRaces((prev) => ({
                                        ...prev,
                                        [entry.race]: !isOpen,
                                    }))
                                }
                                className="w-full flex items-center justify-between gap-3 text-left"
                            >
                                <div>
                                    <h3 className="text-sm sm:text-base font-semibold text-zinc-900 dark:text-zinc-50">
                                        {entry.race}
                                    </h3>
                                    {entry.tagline && (
                                        <p className="text-xs sm:text-[0.8rem] text-zinc-600 dark:text-zinc-300">
                                            {entry.tagline}
                                        </p>
                                    )}
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
                                <ul className="mt-3 space-y-2 text-xs sm:text-sm">
                                    {entry.jobs.map((job) => (
                                        <li
                                            key={`${entry.race}-${job.name}`}
                                            className="
                                                border border-zinc-300 dark:border-zinc-700/70 
                                                rounded-lg 
                                                bg-white/60 dark:bg-zinc-900/40 
                                                px-3 py-2 
                                                grid grid-cols-1 
                                                sm:grid-cols-[minmax(0,10rem)_minmax(0,1fr)] 
                                                gap-x-4 gap-y-1
                                                sm:items-start
                                            "
                                        >
                                            {/* Job name */}
                                            <span className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm">
                                                {job.name}
                                            </span>

                                            {/* Summary spanning 2 columns (sm and up) */}
                                            <span className="text-zinc-700 dark:text-zinc-200 text-sm leading-snug sm:col-span-1">
                                                {job.summary}
                                            </span>
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

