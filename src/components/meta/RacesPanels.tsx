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
            subtitle="What each race tends to do well, at a glance."
            tone="yellow"
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
                                className="flex w-full items-center justify-between gap-1 mb-2 text-left"
                                aria-expanded={isOpen}
                            >
                                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                                    <h3 className="text-sm sm:text-base font-semibold tracking-tight">
                                        {entry.race}
                                    </h3>
                                    <p className="text-xs sm:text-[0.8rem] text-zinc-600 dark:text-zinc-300">
                                        {entry.tagline}
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
                                <ul className="space-y-2 text-xs sm:text-sm">
                                    {entry.jobs.map((job) => (
                                        <li
                                            key={`${entry.race}-${job.name}`}
                                            className="flex flex-col sm:flex-row sm:items-baseline sm:gap-2"
                                        >
                                            {/* Job name */}
                                            <span className="font-semibold text-zinc-800 dark:text-zinc-100">
                                                {job.name}
                                            </span>

                                            {/* Role */}
                                            <span className="text-[0.7rem] sm:text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400 w-[11rem] shrink-0">
                                                {job.role}
                                            </span>

                                            {/* Summary */}
                                            <span className="sm:ml-2 text-zinc-700 dark:text-zinc-200 flex-1">
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
