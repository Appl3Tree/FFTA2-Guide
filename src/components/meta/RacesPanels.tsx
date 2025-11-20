import React from "react";
import { Panel } from "../ui/Panel";
import { RACE_JOBS } from "../../data/races/raceJobs";

export function RacesPanels() {
    return (
        <Panel
            title="Races & Jobs Overview"
            subtitle="What each race tends to do well, at a glance."
            tone="yellow"
        >
            <div className="space-y-4 mt-3">
                {RACE_JOBS.map((entry) => (
                    <section
                        key={entry.race}
                        className="border border-zinc-200/70 dark:border-zinc-700/70 rounded-xl p-3 sm:p-4 bg-white/70 dark:bg-zinc-900/60"
                    >
                        <header className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-2">
                            <h3 className="text-sm sm:text-base font-semibold tracking-tight">{entry.race}</h3>
                            <p className="text-xs sm:text-[0.8rem] text-zinc-600 dark:text-zinc-300">
                                {entry.tagline}
                            </p>
                        </header>
                        <ul className="space-y-2 text-xs sm:text-sm">
                            {entry.jobs.map((job) => (
                                <li
                                    key={`${entry.race}-${job.name}`}
                                    className="flex flex-col sm:flex-row sm:items-baseline sm:gap-2
                                               rounded-xl border border-zinc-300/40 dark:border-zinc-700/40
                                               bg-zinc-50/40 dark:bg-zinc-900/30
                                               px-3 py-2"
                                >
                                    {/* Job name */}
                                    <span className="font-medium text-zinc-900 dark:text-zinc-50 w-[6.7rem] shrink-0">
                                        {job.name}
                                    </span>

                                    {/* Role */}
                                    <span className="text-[0.7rem] uppercase tracking-wide text-zinc-500 dark:text-zinc-400 w-[11rem] shrink-0">
                                        {job.role}
                                    </span>

                                    {/* Summary */}
                                    <span className="sm:ml-2 text-zinc-700 dark:text-zinc-200 flex-1">
                                        {job.summary}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </section>
                ))}
            </div>
        </Panel>
    );
}
