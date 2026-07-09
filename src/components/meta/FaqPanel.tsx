import React from "react";
import { HelpCircle, Search } from "lucide-react";
import { FAQ_ITEMS } from "../../data/meta/faq";
import { Panel } from "../ui/Panel";

export function FaqPanel() {
    const [query, setQuery] = React.useState("");
    const filteredItems = React.useMemo(() => {
        const normalized = query.trim().toLowerCase();
        if (!normalized) return FAQ_ITEMS;

        return FAQ_ITEMS.filter((item) =>
            [
                item.question,
                item.answer,
                ...item.tags,
            ]
                .join(" ")
                .toLowerCase()
                .includes(normalized),
        );
    }, [query]);

    return (
        <Panel
            title="FAQ"
            subtitle="Quick answers to the questions that tend to come up while planning a run."
            tone="indigo"
        >
            <div className="space-y-4">
                <div className="space-y-2">
                    <p className="text-sm text-zinc-700 dark:text-zinc-200">
                        Practical answers for common planning, mission, law, job,
                        and progression questions.
                    </p>
                    <label className="relative block">
                        <span className="sr-only">Search FAQ answers</span>
                        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                        <input
                            value={query}
                            onChange={(event) => setQuery(event.target.value)}
                            placeholder="Search failed missions, auctions, Scions, Bazaar..."
                            className="w-full rounded-lg border border-zinc-300/80 bg-white px-9 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-300/60 dark:border-zinc-700 dark:bg-zinc-950/70 dark:text-zinc-50 dark:placeholder:text-zinc-500 dark:focus:border-indigo-500"
                        />
                    </label>
                    {query.trim() && (
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">
                            Showing {filteredItems.length} of {FAQ_ITEMS.length} answers.
                        </p>
                    )}
                </div>

                {filteredItems.length === 0 ? (
                    <p className="rounded-lg border border-zinc-200/80 bg-white/70 p-3 text-sm text-zinc-600 dark:border-zinc-700/70 dark:bg-zinc-900/40 dark:text-zinc-300">
                        No FAQ answers match that search.
                    </p>
                ) : (
                    <div className="grid gap-3 md:grid-cols-2">
                        {filteredItems.map((item) => (
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
                )}
            </div>
        </Panel>
    );
}
