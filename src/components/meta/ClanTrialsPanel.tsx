import React from "react";
import { Search, Trophy } from "lucide-react";
import {
    CLAN_TRIAL_GUIDE,
    CLAN_TRIAL_PRIORITIES,
    CLAN_TRIALS,
    CLAN_TALENTS,
    CLAN_PRIVILEGE_ROADMAP,
} from "../../data/meta/clanTrials";
import { Panel } from "../ui/Panel";

const KEY_GUIDE_IDS = ["what-they-are", "title-system", "recommended-route"];

const START_TAKEAWAYS: Record<string, string> = {
    "what-they-are":
        "Spend Clan Points, choose one title row, clear that row's objective, and get exactly that row's listed reward.",
    "title-system":
        "Higher titles raise clan rank, but rank does not stack from repeats. Chase the specific title row you actually want.",
    "recommended-route":
        "Prioritize AP, CP, Move, Power, Speed, and Safe Keeping before niche race boosts or completion cleanup.",
};

const TRIAL_FILTERS = [
    "All",
    "Recommended",
    "AP",
    "Power",
    "Speed",
    "Move",
    "MP",
    "Object",
] as const;

type TrialFilter = (typeof TRIAL_FILTERS)[number];

export function ClanTrialsPanel() {
    const [activeTrialId, setActiveTrialId] = React.useState("negotiation-teamwork");
    const [trialFilter, setTrialFilter] = React.useState<TrialFilter>("Recommended");
    const [trialSearch, setTrialSearch] = React.useState("");
    const [showRoadmap, setShowRoadmap] = React.useState(false);

    const keyGuideSections = CLAN_TRIAL_GUIDE.filter((section) =>
        KEY_GUIDE_IDS.includes(section.id),
    );

    const earlyRoadmapItems = CLAN_PRIVILEGE_ROADMAP.filter(
        (item) => item.priority === "Early" || item.priority === "Useful",
    ).slice(0, 6);

    const filteredTrials = React.useMemo(() => {
        const query = trialSearch.trim().toLowerCase();

        return CLAN_TRIALS.filter((trial) => {
            const haystack = [
                trial.name,
                trial.law,
                trial.location,
                trial.requiredTalents,
                trial.challenge,
                ...trial.notes,
                ...trial.completionTips,
                ...trial.titles.flatMap((title) => [
                    title.title,
                    title.privilege,
                    title.objective,
                ]),
            ]
                .join(" ")
                .toLowerCase();

            const matchesQuery = query.length === 0 || haystack.includes(query);

            const matchesFilter =
                query.length > 0 ||
                trialFilter === "All" ||
                (trialFilter === "Recommended" &&
                    [
                        "negotiation-teamwork",
                        "general-training-i",
                        "general-training-ii",
                        "aptitude-i",
                        "teamwork-i",
                    ].includes(trial.id)) ||
                (trialFilter === "AP" && haystack.includes("bonus ap")) ||
                (trialFilter === "Power" && haystack.includes("power")) ||
                (trialFilter === "Speed" && haystack.includes("speed")) ||
                (trialFilter === "Move" && haystack.includes("move")) ||
                (trialFilter === "MP" && haystack.includes("mp ")) ||
                (trialFilter === "Object" &&
                    (haystack.includes("barrel") ||
                        haystack.includes("urn") ||
                        haystack.includes("light")));

            return matchesQuery && matchesFilter;
        });
    }, [trialFilter, trialSearch]);

    const activeTrial =
        CLAN_TRIALS.find((trial) => trial.id === activeTrialId) ??
        filteredTrials[0] ??
        CLAN_TRIALS[0]!;

    React.useEffect(() => {
        if (!filteredTrials.some((trial) => trial.id === activeTrialId)) {
            setActiveTrialId(filteredTrials[0]?.id ?? CLAN_TRIALS[0]!.id);
        }
    }, [activeTrialId, filteredTrials]);

    return (
        <Panel
            title="Clan Trials"
            subtitle="What trials unlock, which rewards matter, and how talents fit into progression."
            tone="cyan"
        >
            <div className="space-y-4 sm:space-y-5" data-testid="clan-trials-content">
                <section className="space-y-3" aria-labelledby="clan-trials-start">
                    <header>
                        <h3
                            id="clan-trials-start"
                            className="text-sm font-semibold text-zinc-950 dark:text-zinc-50"
                        >
                            Start Here
                        </h3>
                        <p className="text-xs text-zinc-600 dark:text-zinc-300">
                            The short version before you spend Clan Points.
                        </p>
                    </header>

                    <div className="grid gap-2 lg:grid-cols-3">
                        {keyGuideSections.map((section) => (
                            <article
                                key={section.id}
                                className="rounded-lg border border-zinc-200/80 bg-white/80 p-2.5 sm:p-3 dark:border-zinc-700/70 dark:bg-zinc-900/40"
                            >
                                <h4 className="text-sm font-semibold text-zinc-950 dark:text-zinc-50">
                                    {section.title}
                                </h4>
                                <p className="mt-1 text-sm leading-snug text-zinc-700 sm:leading-relaxed dark:text-zinc-200">
                                    {START_TAKEAWAYS[section.id]}
                                </p>
                                <ul className="mt-2 hidden space-y-1 text-xs leading-relaxed text-zinc-600 sm:block dark:text-zinc-300">
                                    {section.bullets.slice(0, 2).map((bullet) => (
                                        <li key={bullet} className="flex gap-2">
                                            <span aria-hidden="true">-</span>
                                            <span>{bullet}</span>
                                        </li>
                                    ))}
                                </ul>
                            </article>
                        ))}
                    </div>
                </section>

                <section className="space-y-3" aria-labelledby="trial-browser">
                    <header>
                        <h3
                            id="trial-browser"
                            className="text-sm font-semibold text-zinc-950 dark:text-zinc-50"
                        >
                            Trial Browser
                        </h3>
                        <p className="text-xs text-zinc-600 dark:text-zinc-300">
                            Search for a reward, objective, law, or trial name. Pick
                            one trial to inspect its title rows.
                        </p>
                        <p className="mt-1 hidden text-xs text-zinc-500 sm:block dark:text-zinc-400">
                            Use the search box for rewards, laws, enemies, or tactical
                            terms like Roulette, Slow, Mirror Item, and barrels.
                        </p>
                    </header>

                    <div className="space-y-3 rounded-lg border border-zinc-200/80 bg-white/70 p-3 dark:border-zinc-700/70 dark:bg-zinc-900/30">
                        <label className="relative block">
                            <span className="sr-only">Search clan trials</span>
                            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                            <input
                                value={trialSearch}
                                onChange={(event) => setTrialSearch(event.target.value)}
                                placeholder="Search Bonus AP, barrels, Tonberries, Move..."
                                className="w-full rounded-lg border border-zinc-300/80 bg-white px-9 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-300/60 dark:border-zinc-700 dark:bg-zinc-950/70 dark:text-zinc-50 dark:placeholder:text-zinc-500 dark:focus:border-cyan-500"
                            />
                        </label>

                        <div
                            className="flex gap-2 overflow-x-auto pb-1"
                            aria-label="Clan trial filters"
                        >
                            {TRIAL_FILTERS.map((filter) => (
                                <button
                                    key={filter}
                                    type="button"
                                    onClick={() => setTrialFilter(filter)}
                                    aria-pressed={trialFilter === filter}
                                    className={`shrink-0 rounded-full border px-2.5 py-1 text-[0.7rem] font-semibold uppercase tracking-wide transition-colors ${
                                        trialFilter === filter
                                            ? "border-cyan-400 bg-cyan-100 text-cyan-900 dark:border-cyan-500/80 dark:bg-cyan-950/70 dark:text-cyan-100"
                                            : "border-zinc-300 bg-white text-zinc-600 hover:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-950/50 dark:text-zinc-300 dark:hover:border-zinc-600"
                                    }`}
                                >
                                    {filter}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid gap-3 xl:grid-cols-[minmax(16rem,0.8fr)_minmax(0,1.2fr)]">
                        <div className="grid content-start gap-2 md:grid-cols-2 xl:grid-cols-1">
                            {filteredTrials.map((trial) => {
                                const isActive = trial.id === activeTrial.id;
                                const priorityPrivilege =
                                    trial.titles.find((title) => title.privilege !== "None")
                                        ?.privilege ?? "Title rewards";

                                return (
                                    <button
                                        key={trial.id}
                                        type="button"
                                        onClick={() => setActiveTrialId(trial.id)}
                                        aria-pressed={isActive}
                                        className={`rounded-lg border p-3 text-left transition-colors ${
                                            isActive
                                                ? "border-cyan-400 bg-cyan-50/80 ring-1 ring-cyan-200 dark:border-cyan-600/80 dark:bg-cyan-950/30 dark:ring-cyan-900/50"
                                                : "border-zinc-200/80 bg-white/80 hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-700/70 dark:bg-zinc-900/40 dark:hover:border-zinc-600"
                                        }`}
                                    >
                                        <div className="flex items-start justify-between gap-3">
                                            <div>
                                                <h4 className="text-sm font-semibold text-zinc-950 dark:text-zinc-50">
                                                    {trial.name}
                                                </h4>
                                                <p className="mt-1 text-xs leading-snug text-zinc-600 dark:text-zinc-300">
                                                    Rank {trial.rank} · {trial.location}
                                                </p>
                                            </div>
                                            <span className="rounded-full bg-zinc-200/80 px-2 py-0.5 text-[0.65rem] font-semibold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200">
                                                {trial.titles.length} titles
                                            </span>
                                        </div>
                                        <p className="mt-2 text-xs leading-snug text-zinc-600 dark:text-zinc-300">
                                            {priorityPrivilege}
                                        </p>
                                    </button>
                                );
                            })}
                        </div>

                        <TrialDetail trial={activeTrial} />
                    </div>
                </section>

                <section className="space-y-3">
                    <header>
                        <h3 className="text-sm font-semibold text-zinc-950 dark:text-zinc-50">
                            Recommended Targets
                        </h3>
                        <p className="text-xs text-zinc-600 dark:text-zinc-300">
                            Good rewards to chase before completion cleanup.
                        </p>
                    </header>
                    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                        {CLAN_TRIAL_PRIORITIES.map((priority) => (
                            <article
                                key={priority.id}
                                className="rounded-lg border border-zinc-200/80 bg-white/80 p-3 dark:border-zinc-700/70 dark:bg-zinc-900/40"
                            >
                                <div className="flex items-start gap-2">
                                    <Trophy className="mt-0.5 h-4 w-4 shrink-0 text-zinc-600 dark:text-zinc-300" />
                                    <div className="space-y-1">
                                        <h4 className="text-sm font-semibold text-zinc-950 dark:text-zinc-50">
                                            {priority.title}
                                        </h4>
                                        <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-200">
                                            {priority.why}
                                        </p>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setTrialFilter("All");
                                                setTrialSearch(priority.trial);
                                            }}
                                            className="inline-flex rounded-full bg-zinc-200/80 px-2 py-0.5 text-[0.68rem] font-semibold uppercase tracking-wide text-zinc-800 transition-colors hover:bg-zinc-300 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
                                        >
                                            {priority.trial}
                                        </button>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>

                <section className="space-y-3">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <header>
                            <h3 className="text-sm font-semibold text-zinc-950 dark:text-zinc-50">
                                Privilege Roadmap
                            </h3>
                            <p className="text-xs text-zinc-600 dark:text-zinc-300">
                                A compact reward lookup. Keep the full table hidden until needed.
                            </p>
                        </header>
                        <button
                            type="button"
                            onClick={() => setShowRoadmap((prev) => !prev)}
                            className="inline-flex w-fit rounded-full border border-zinc-300 bg-white/80 px-2.5 py-1 text-[0.7rem] font-semibold uppercase tracking-wide text-zinc-700 hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900/60 dark:text-zinc-200 dark:hover:bg-zinc-800"
                            aria-expanded={showRoadmap}
                        >
                            {showRoadmap ? "Hide roadmap" : "Show roadmap"}
                        </button>
                    </div>

                    {!showRoadmap && (
                        <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
                            {earlyRoadmapItems.map((item) => (
                                <button
                                    key={item.id}
                                    type="button"
                                    onClick={() => {
                                        setTrialFilter("All");
                                        setTrialSearch(item.trial);
                                    }}
                                    className="rounded-lg border border-zinc-200/80 bg-white/80 p-3 text-left text-sm transition-colors hover:border-cyan-300 hover:bg-cyan-50/60 dark:border-zinc-700/70 dark:bg-zinc-900/40 dark:hover:border-cyan-700/70 dark:hover:bg-cyan-950/20"
                                >
                                    <div className="font-semibold text-zinc-950 dark:text-zinc-50">
                                        {item.privilege}
                                    </div>
                                    <div className="mt-1 text-xs text-zinc-600 dark:text-zinc-300">
                                        {item.trial} · {item.title}
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}

                    {showRoadmap && <RoadmapTable />}
                </section>

                <section className="space-y-3">
                    <header>
                        <h3 className="text-sm font-semibold text-zinc-950 dark:text-zinc-50">
                            Clan Talents
                        </h3>
                        <p className="text-xs text-zinc-600 dark:text-zinc-300">
                            Progression gates, not unit stats.
                        </p>
                    </header>
                    <div className="grid gap-3 md:grid-cols-2">
                        {CLAN_TALENTS.map((talent) => (
                            <article
                                key={talent.id}
                                className="rounded-lg border border-zinc-200/80 bg-white/80 p-3 dark:border-zinc-700/70 dark:bg-zinc-900/40"
                            >
                                <h4 className="text-sm font-semibold text-zinc-950 dark:text-zinc-50">
                                    {talent.name}
                                </h4>
                                <p className="mt-1 text-sm leading-relaxed text-zinc-700 dark:text-zinc-200">
                                    {talent.summary}
                                </p>
                                <p className="mt-2 text-xs leading-relaxed text-zinc-600 dark:text-zinc-300">
                                    <span className="font-semibold">Watch for:</span>{" "}
                                    {talent.watchFor}
                                </p>
                            </article>
                        ))}
                    </div>
                </section>
            </div>
        </Panel>
    );
}

function TrialDetail({ trial }: { trial: (typeof CLAN_TRIALS)[number] }) {
    return (
        <article className="rounded-lg border border-cyan-200/80 bg-white/90 p-3 dark:border-cyan-800/60 dark:bg-zinc-950/50">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <h4 className="text-base font-semibold text-zinc-950 dark:text-zinc-50">
                        {trial.name}
                    </h4>
                    <p className="mt-1 text-xs leading-snug text-zinc-600 dark:text-zinc-300">
                        Rank {trial.rank} · {trial.location} · {trial.price} ·{" "}
                        {trial.days} days
                    </p>
                </div>
                <span className="w-fit rounded-full bg-cyan-100 px-2 py-1 text-[0.68rem] font-semibold uppercase tracking-wide text-cyan-900 dark:bg-cyan-950 dark:text-cyan-100">
                    {trial.lawRequirement}
                </span>
            </div>

            <dl className="mt-3 grid gap-2 sm:grid-cols-3">
                <div>
                    <dt className="text-[0.68rem] font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                        Law
                    </dt>
                    <dd className="mt-0.5 text-sm text-zinc-700 dark:text-zinc-200">
                        {trial.law}
                    </dd>
                </div>
                <div>
                    <dt className="text-[0.68rem] font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                        Required talents
                    </dt>
                    <dd className="mt-0.5 text-sm text-zinc-700 dark:text-zinc-200">
                        {trial.requiredTalents}
                    </dd>
                </div>
                <div>
                    <dt className="text-[0.68rem] font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                        Titles
                    </dt>
                    <dd className="mt-0.5 text-sm text-zinc-700 dark:text-zinc-200">
                        {trial.titles.length} title rewards
                    </dd>
                </div>
            </dl>

            <div className="mt-3 rounded-lg bg-cyan-50/70 p-3 text-sm leading-relaxed text-zinc-800 dark:bg-cyan-950/20 dark:text-zinc-100/90">
                {trial.challenge}
            </div>

            <div className="mt-3 overflow-hidden rounded-lg border border-zinc-200/80 dark:border-zinc-700/70">
                <div className="hidden grid-cols-[0.8fr_1.2fr_1fr_0.8fr_1.5fr] gap-2 bg-zinc-100/90 px-3 py-2 text-[0.68rem] font-semibold uppercase tracking-wide text-zinc-600 dark:bg-zinc-900/80 dark:text-zinc-300 md:grid">
                    <span>Title / rank</span>
                    <span>Talent shift</span>
                    <span>Privilege</span>
                    <span>Discount</span>
                    <span>Objective</span>
                </div>
                <ul className="divide-y divide-zinc-200/80 dark:divide-zinc-700/70">
                    {trial.titles.map((title) => (
                        <li
                            key={title.title}
                            className="grid gap-2 bg-white/70 px-3 py-3 text-sm text-zinc-700 dark:bg-zinc-900/30 dark:text-zinc-200 md:grid-cols-[0.8fr_1.2fr_1fr_0.8fr_1.5fr] md:gap-2"
                        >
                            <div>
                                <span className="md:hidden text-[0.68rem] font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                                    Title / rank
                                </span>
                                <div className="font-semibold text-zinc-950 dark:text-zinc-50">
                                    {title.title}
                                </div>
                                <div className="text-xs text-zinc-500 dark:text-zinc-400">
                                    Clan rank {title.clanRank}
                                </div>
                            </div>
                            <div>
                                <span className="md:hidden text-[0.68rem] font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                                    Talent shift
                                </span>
                                <div>{title.talents}</div>
                            </div>
                            <div>
                                <span className="md:hidden text-[0.68rem] font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                                    Privilege
                                </span>
                                <div className="font-medium text-zinc-900 dark:text-zinc-100">
                                    {title.privilege}
                                </div>
                            </div>
                            <div>
                                <span className="md:hidden text-[0.68rem] font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                                    Discount
                                </span>
                                <div>{title.discount}</div>
                            </div>
                            <div>
                                <span className="md:hidden text-[0.68rem] font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                                    Objective
                                </span>
                                <div>{title.objective}</div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="mt-3 grid gap-3 md:grid-cols-2">
                <div>
                    <h5 className="text-[0.68rem] font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                        Guide notes
                    </h5>
                    <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-zinc-700 dark:text-zinc-200">
                        {trial.notes.map((note) => (
                            <li key={note}>{note}</li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h5 className="text-[0.68rem] font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                        How to beat it
                    </h5>
                    <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-zinc-700 dark:text-zinc-200">
                        {trial.completionTips.map((tip) => (
                            <li key={tip}>{tip}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </article>
    );
}

function RoadmapTable() {
    return (
        <div className="overflow-hidden rounded-lg border border-zinc-200/80 dark:border-zinc-700/70">
            <div className="hidden grid-cols-[1.1fr_1.2fr_1fr_1.4fr_0.7fr] gap-3 bg-zinc-100/90 px-3 py-2 text-[0.68rem] font-semibold uppercase tracking-wide text-zinc-600 dark:bg-zinc-900/80 dark:text-zinc-300 md:grid">
                <span>Privilege</span>
                <span>Effect</span>
                <span>Trial / title</span>
                <span>Objective</span>
                <span>Priority</span>
            </div>
            <ul className="divide-y divide-zinc-200/80 dark:divide-zinc-700/70">
                {CLAN_PRIVILEGE_ROADMAP.map((item) => (
                    <li
                        key={item.id}
                        className="grid gap-2 bg-white/80 px-3 py-3 text-sm text-zinc-700 dark:bg-zinc-900/40 dark:text-zinc-200 md:grid-cols-[1.1fr_1.2fr_1fr_1.4fr_0.7fr] md:gap-3"
                    >
                        <div>
                            <span className="md:hidden text-[0.68rem] font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                                Privilege
                            </span>
                            <div className="font-semibold text-zinc-950 dark:text-zinc-50">
                                {item.privilege}
                            </div>
                        </div>
                        <div>
                            <span className="md:hidden text-[0.68rem] font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                                Effect
                            </span>
                            <div>{item.effect}</div>
                        </div>
                        <div>
                            <span className="md:hidden text-[0.68rem] font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                                Trial / title
                            </span>
                            <div className="font-medium text-zinc-900 dark:text-zinc-100">
                                {item.trial}
                            </div>
                            <div className="text-xs text-zinc-500 dark:text-zinc-400">
                                {item.title}
                            </div>
                        </div>
                        <div>
                            <span className="md:hidden text-[0.68rem] font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                                Objective
                            </span>
                            <div>{item.objective}</div>
                        </div>
                        <div>
                            <span className="md:hidden text-[0.68rem] font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                                Priority
                            </span>
                            <span className="inline-flex rounded-full bg-zinc-200/80 px-2 py-0.5 text-[0.68rem] font-semibold uppercase tracking-wide text-zinc-800 dark:bg-zinc-800 dark:text-zinc-100">
                                {item.priority}
                            </span>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
