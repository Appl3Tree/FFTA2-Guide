import React from "react";
import { HelpCircle } from "lucide-react";
import { FAQ_ITEMS } from "../../data/meta/faq";
import { Panel } from "../ui/Panel";

export function FaqPanel() {
    return (
        <Panel
            title="FAQ"
            subtitle="Quick answers to the questions that tend to come up while planning a run."
            tone="indigo"
        >
            <div className="space-y-4">
                <p className="text-sm text-zinc-700 dark:text-zinc-200">
                    Practical answers for common planning, mission, law, job,
                    and progression questions.
                </p>

                <div className="grid gap-3 md:grid-cols-2">
                    {FAQ_ITEMS.map((item) => (
                        <article
                            key={item.id}
                            className="rounded-lg border border-zinc-200/80 bg-white/80 p-3 shadow-sm dark:border-zinc-700/70 dark:bg-zinc-900/40"
                        >
                            <div className="flex items-start gap-2">
                                <HelpCircle className="mt-0.5 h-4 w-4 shrink-0 text-zinc-600 dark:text-zinc-300" />
                                <div className="space-y-2">
                                    <h3 className="text-sm font-semibold leading-snug text-zinc-950 dark:text-zinc-50">
                                        {item.question}
                                    </h3>
                                    <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-200">
                                        {item.answer}
                                    </p>
                                    <div className="flex flex-wrap gap-1.5">
                                        {item.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="rounded-full bg-zinc-200/80 px-2 py-0.5 text-[0.68rem] font-semibold uppercase tracking-wide text-zinc-800 dark:bg-zinc-800 dark:text-zinc-100"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </Panel>
    );
}
