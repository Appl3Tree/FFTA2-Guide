import React from "react";
import { ChevronDown, Search } from "lucide-react";
import { Panel } from "../ui/Panel";
import { INTRO_PANELS } from "../../data/meta/introPanels";
import { SYSTEMS_PANELS } from "../../data/meta/systemsPanels";
import type { MetaPanel } from "../../types/ffta2";
import { useGuidePreference } from "../ProgressContext";

const DEFAULT_OPEN_TOPICS: Record<string, boolean> = {};

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
    const [query, setQuery] = useGuidePreference(
        "filters.start.query",
        "",
    );
    const [openTopics, setOpenTopics] = useGuidePreference<
        Record<string, boolean>
    >(
        "disclosure.start.topics",
        DEFAULT_OPEN_TOPICS,
    );
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
            preferenceKey="start.before-you-start"
        >
            <div className="space-y-4">
                <label className="relative block">
                    <span className="sr-only">Search system guidance</span>
                    <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                    <input
                        type="search"
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        placeholder="Search laws, Bazaar, auctions, Scions, recruitment..."
                        className="min-h-11 w-full rounded-md border border-zinc-700 bg-zinc-950 px-9 py-2 text-base text-zinc-50 placeholder:text-zinc-500 focus:border-fuchsia-500 focus:outline-none focus:ring-2 focus:ring-fuchsia-400 sm:text-sm"
                    />
                </label>

                <p role="status" className="text-xs text-zinc-400">
                    {normalizedQuery
                        ? `${matchCount} of ${INTRO_PANELS.length + SYSTEMS_PANELS.length} topics match.`
                        : `${INTRO_PANELS.length + SYSTEMS_PANELS.length} topics.`}
                </p>

                {matchCount === 0 ? (
                    <p className="border-y border-zinc-800 py-4 text-sm text-zinc-400">
                        No system notes match that search.
                    </p>
                ) : (
                    <div className="space-y-5">
                        <TopicGroup
                            label="Essentials"
                            onToggle={(topicId) =>
                                setOpenTopics((current) => ({
                                    ...current,
                                    [topicId]: !current[topicId],
                                }))
                            }
                            openTopics={openTopics}
                            searching={normalizedQuery.length > 0}
                            topics={introPanels}
                        />
                        <TopicGroup
                            label="Systems and progression"
                            onToggle={(topicId) =>
                                setOpenTopics((current) => ({
                                    ...current,
                                    [topicId]: !current[topicId],
                                }))
                            }
                            openTopics={openTopics}
                            searching={normalizedQuery.length > 0}
                            topics={systemsPanels}
                        />
                    </div>
                )}
            </div>
        </Panel>
    );
}

function TopicGroup({
    label,
    onToggle,
    openTopics,
    searching,
    topics,
}: {
    label: string;
    onToggle: (topicId: string) => void;
    openTopics: Record<string, boolean>;
    searching: boolean;
    topics: MetaPanel[];
}) {
    if (topics.length === 0) return null;

    return (
        <section aria-label={label}>
            <h3 className="mb-2 text-xs font-semibold uppercase text-zinc-400">
                {label}
            </h3>
            <div className="divide-y divide-zinc-800 border-y border-zinc-800">
                {topics.map((topic) => {
                    const isOpen = searching || openTopics[topic.id] === true;
                    const contentId = `guide-topic-${topic.id}`;

                    return (
                        <article key={topic.id}>
                            <button
                                type="button"
                                aria-controls={isOpen ? contentId : undefined}
                                aria-expanded={isOpen}
                                onClick={() => onToggle(topic.id)}
                                className="flex min-h-14 w-full items-center justify-between gap-3 px-2 py-2.5 text-left transition-colors hover:bg-zinc-900/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-fuchsia-300"
                            >
                                <span className="min-w-0">
                                    <span className="block text-sm font-semibold text-zinc-100">
                                        {topic.title}
                                    </span>
                                    {topic.subtitle ? (
                                        <span className="mt-0.5 block text-xs leading-relaxed text-zinc-400">
                                            {topic.subtitle}
                                        </span>
                                    ) : null}
                                </span>
                                <ChevronDown
                                    className={`h-4 w-4 shrink-0 text-zinc-400 transition-transform ${
                                        isOpen ? "rotate-180" : ""
                                    }`}
                                />
                            </button>

                            {isOpen ? (
                                <div
                                    id={contentId}
                                    className="space-y-3 bg-zinc-950/50 px-3 py-3 text-sm leading-relaxed text-zinc-300 sm:px-4"
                                >
                                    {topic.paragraphs.map((paragraph, index) => (
                                        <p key={`${topic.id}:paragraph:${index}`}>
                                            {paragraph}
                                        </p>
                                    ))}
                                    {topic.bullets?.length ? (
                                        <ul className="list-disc space-y-1 pl-5">
                                            {topic.bullets.map((bullet, index) => (
                                                <li key={`${topic.id}:bullet:${index}`}>
                                                    {bullet}
                                                </li>
                                            ))}
                                        </ul>
                                    ) : null}
                                </div>
                            ) : null}
                        </article>
                    );
                })}
            </div>
        </section>
    );
}
