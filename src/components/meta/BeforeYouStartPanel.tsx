import React from "react";
import { Search } from "lucide-react";
import { Panel } from "../ui/Panel";
import { INTRO_PANELS } from "../../data/meta/introPanels";
import { SYSTEMS_PANELS } from "../../data/meta/systemsPanels";
import type { MetaPanel } from "../../types/ffta2";

function matchesPanel(panel: MetaPanel, query: string) {
    if (!query) return true;

    return [
        panel.title,
        panel.subtitle ?? "",
        ...panel.paragraphs,
        ...(panel.bullets ?? []),
    ]
        .join(" ")
        .toLowerCase()
        .includes(query);
}

export function BeforeYouStartPanel() {
    const [query, setQuery] = React.useState("");
    const normalizedQuery = query.trim().toLowerCase();
    const introPanels = React.useMemo(
        () => INTRO_PANELS.filter((panel) => matchesPanel(panel, normalizedQuery)),
        [normalizedQuery],
    );
    const systemsPanels = React.useMemo(
        () => SYSTEMS_PANELS.filter((panel) => matchesPanel(panel, normalizedQuery)),
        [normalizedQuery],
    );
    const matchCount = introPanels.length + systemsPanels.length;

    return (
        <Panel
            title="Before You Start"
            subtitle="Heads-up notes and systems to keep in mind as you begin your FFTA2 run."
            tone="pink"
        >
            <div className="space-y-5 mt-3">
                <div className="space-y-2">
                    <label className="relative block">
                        <span className="sr-only">Search system guidance</span>
                        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                        <input
                            value={query}
                            onChange={(event) => setQuery(event.target.value)}
                            placeholder="Search laws, Bazaar, auctions, Scions, recruitment..."
                            className="w-full rounded-lg border border-zinc-300/80 bg-white px-9 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-300/60 dark:border-zinc-700 dark:bg-zinc-950/70 dark:text-zinc-50 dark:placeholder:text-zinc-500 dark:focus:border-pink-500"
                        />
                    </label>
                    {normalizedQuery && (
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">
                            Showing {matchCount} of{" "}
                            {INTRO_PANELS.length + SYSTEMS_PANELS.length} sections.
                        </p>
                    )}
                </div>

                {/* Intro / how-to-use sections */}
                {introPanels.map((panel) => (
                    <section key={panel.id} className="space-y-3">
                        <header className="space-y-1">
                            <h3 className="text-sm sm:text-base font-semibold tracking-tight">
                                {panel.title}
                            </h3>
                            {panel.subtitle && (
                                <p className="text-xs sm:text-[0.8rem] text-zinc-600 dark:text-zinc-300">
                                    {panel.subtitle}
                                </p>
                            )}
                        </header>

                        <div className="space-y-3 text-sm sm:text-[0.9rem]">
                            {panel.paragraphs.map((p, idx) => (
                                <p key={idx}>{p}</p>
                            ))}

                            {panel.bullets && panel.bullets.length > 0 && (
                                <ul className="list-disc list-inside space-y-1">
                                    {panel.bullets.map((b, idx) => (
                                        <li key={idx}>{b}</li>
                                    ))}
                                </ul>
                            )}
                        </div>
                        <hr className="border-dashed border-zinc-300/70 dark:border-zinc-700/70" />
                    </section>
                ))}

                {/* Systems / mechanics sections */}
                {systemsPanels.map((panel) => (
                    <section key={panel.id} className="space-y-3">
                        <header className="space-y-1">
                            <h3 className="text-sm sm:text-base font-semibold tracking-tight">
                                {panel.title}
                            </h3>
                            {panel.subtitle && (
                                <p className="text-xs sm:text-[0.8rem] text-zinc-600 dark:text-zinc-300">
                                    {panel.subtitle}
                                </p>
                            )}
                        </header>

                        <div className="space-y-3 text-sm sm:text-[0.9rem]">
                            {panel.paragraphs.map((p, idx) => (
                                <p key={idx}>{p}</p>
                            ))}

                            {panel.bullets && panel.bullets.length > 0 && (
                                <ul className="list-disc list-inside space-y-1">
                                    {panel.bullets.map((b, idx) => (
                                        <li key={idx}>{b}</li>
                                    ))}
                                </ul>
                            )}
                            <hr className="border-dashed border-zinc-300/70 dark:border-zinc-700/70" />
                        </div>
                    </section>
                ))}

                {matchCount === 0 && (
                    <p className="rounded-lg border border-zinc-200/80 bg-white/70 p-3 text-sm text-zinc-600 dark:border-zinc-700/70 dark:bg-zinc-900/40 dark:text-zinc-300">
                        No system notes match that search.
                    </p>
                )}
            </div>
        </Panel>
    );
}
