import React from "react";
import { Check, Search } from "lucide-react";
import {
    CLAN_TRIAL_GUIDE,
    CLAN_TRIALS,
    CLAN_TALENTS,
    CLAN_PRIVILEGE_ROADMAP,
} from "../../data/meta/clanTrials";
import { Panel } from "../ui/Panel";
import { useProgress } from "../ProgressContext";

const KEY_GUIDE_IDS = ["what-they-are", "title-system", "talents"];

const START_TAKEAWAYS: Record<string, string> = {
    "what-they-are":
        "Spend Clan Points, choose one title row, clear the judge's challenge, and watch whether that trial fails on law-breaking.",
    "title-system":
        "Each title row is its own clear; upgradeable privileges climb one tier at a time, even when you clear a high difficulty.",
    talents:
        "Quest and trial requirements use four clan talents; trial rows can raise some values and lower others.",
};

const TRIAL_RANKS = Array.from(new Set(CLAN_TRIALS.map((trial) => trial.rank))).sort(
    (a, b) => a - b,
);

type RankFilter = "All" | number;

function getPrivilegeRewards(trial: (typeof CLAN_TRIALS)[number]) {
    const rewards: string[] = [];
    const rewardIndexes = new Map<
        string,
        { index: number; min: number; max: number }
    >();

    trial.titles.forEach((title) => {
        const privilege = title.privilege;

        if (privilege === "None" || rewards.includes(privilege)) {
            return;
        }

        const numberedPrivilege = privilege.match(
            /^(.+?)\s+(\d+)(?:-(\d+))?(?:\s+path)?$/,
        );

        if (!numberedPrivilege) {
            rewards.push(privilege);
            return;
        }

        const [, base, firstLevel, lastLevel] = numberedPrivilege;
        const min = Number(firstLevel);
        const max = Number(lastLevel ?? firstLevel);
        const existing = rewardIndexes.get(base);

        if (existing) {
            existing.min = Math.min(existing.min, min);
            existing.max = Math.max(existing.max, max);
            rewards[existing.index] =
                existing.min === existing.max
                    ? `${base} ${existing.min}`
                    : `${base} ${existing.min}-${existing.max}`;
            return;
        }

        const index = rewards.length;
        rewardIndexes.set(base, { index, min, max });
        rewards.push(min === max ? `${base} ${min}` : `${base} ${min}-${max}`);
    });

    return rewards;
}

export function ClanTrialsPanel() {
    const { checked } = useProgress();
    const [activeTrialId, setActiveTrialId] = React.useState("negotiation-teamwork");
    const [rankFilter, setRankFilter] = React.useState<RankFilter>("All");
    const [trialSearch, setTrialSearch] = React.useState("");
    const [showRoadmap, setShowRoadmap] = React.useState(false);

    const keyGuideSections = CLAN_TRIAL_GUIDE.filter((section) =>
        KEY_GUIDE_IDS.includes(section.id),
    );

    const earlyRoadmapItems = CLAN_PRIVILEGE_ROADMAP.slice(0, 6);

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

            const matchesFilter = rankFilter === "All" || trial.rank === rankFilter;

            return matchesQuery && matchesFilter;
        });
    }, [rankFilter, trialSearch]);

    const groupedTrials = React.useMemo(() => {
        return TRIAL_RANKS.map((rank) => ({
            rank,
            trials: filteredTrials.filter((trial) => trial.rank === rank),
        })).filter((group) => group.trials.length > 0);
    }, [filteredTrials]);

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
                            Browse by trial rank, then open a trial to inspect its
                            five title difficulties.
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
                            aria-label="Clan trial rank filters"
                        >
                            {(["All", ...TRIAL_RANKS] as const).map((filter) => (
                                <button
                                    key={filter}
                                    type="button"
                                    onClick={() => setRankFilter(filter)}
                                    aria-pressed={rankFilter === filter}
                                    className={`shrink-0 rounded-full border px-2.5 py-1 text-[0.7rem] font-semibold uppercase tracking-wide transition-colors ${
                                        rankFilter === filter
                                            ? "border-cyan-400 bg-cyan-100 text-cyan-900 dark:border-cyan-500/80 dark:bg-cyan-950/70 dark:text-cyan-100"
                                            : "border-zinc-300 bg-white text-zinc-600 hover:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-950/50 dark:text-zinc-300 dark:hover:border-zinc-600"
                                    }`}
                                >
                                    {filter === "All" ? "All ranks" : `Rank ${filter}`}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid gap-3 xl:grid-cols-[minmax(16rem,0.8fr)_minmax(0,1.2fr)]">
                        <div className="grid content-start gap-3">
                            {groupedTrials.map((group) => (
                                <section key={group.rank} className="space-y-2">
                                    <div className="flex items-center justify-between gap-2 border-b border-zinc-200/80 pb-1 dark:border-zinc-700/70">
                                        <h4 className="text-[0.68rem] font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                                            Rank {group.rank}
                                        </h4>
                                        <span className="text-[0.68rem] text-zinc-500 dark:text-zinc-400">
                                            {group.trials.length} trial
                                            {group.trials.length === 1 ? "" : "s"}
                                        </span>
                                    </div>
                                    <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-1">
                                        {group.trials.map((trial) => {
                                            const isActive = trial.id === activeTrial.id;
                                            const completedTitles = trial.titles.filter(
                                                (title) =>
                                                    checked[`trial:${trial.id}:${title.title}`],
                                            ).length;
                                            const isComplete =
                                                completedTitles === trial.titles.length;
                                            const privilegeRewards =
                                                getPrivilegeRewards(trial);

                                            return (
                                                <button
                                                    key={trial.id}
                                                    type="button"
                                                    onClick={() => setActiveTrialId(trial.id)}
                                                    aria-pressed={isActive}
                                                    className={`rounded-lg border p-3 text-left transition-colors ${
                                                        isActive
                                                            ? "border-cyan-400 bg-cyan-50/80 ring-1 ring-cyan-200 dark:border-cyan-600/80 dark:bg-cyan-950/30 dark:ring-cyan-900/50"
                                                            : isComplete
                                                              ? "border-emerald-300 bg-emerald-50/75 hover:border-emerald-400 hover:bg-emerald-50 dark:border-emerald-800/80 dark:bg-emerald-950/20 dark:hover:border-emerald-700"
                                                            : "border-zinc-200/80 bg-white/80 hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-700/70 dark:bg-zinc-900/40 dark:hover:border-zinc-600"
                                                    }`}
                                                >
                                                    <div className="flex items-start justify-between gap-3">
                                                        <div>
                                                            <h5 className="text-sm font-semibold text-zinc-950 dark:text-zinc-50">
                                                                {trial.name}
                                                            </h5>
                                                            <p className="mt-1 text-xs leading-snug text-zinc-600 dark:text-zinc-300">
                                                                {trial.location} · {trial.law}
                                                            </p>
                                                        </div>
                                                        <div className="flex shrink-0 flex-col items-end gap-1">
                                                            {isComplete && (
                                                                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[0.65rem] font-semibold text-emerald-800 dark:bg-emerald-900/70 dark:text-emerald-100">
                                                                    <Check className="h-3 w-3" />
                                                                    Done
                                                                </span>
                                                            )}
                                                            <span className="rounded-full bg-zinc-200/80 px-2 py-0.5 text-[0.65rem] font-semibold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200">
                                                                {completedTitles} /{" "}
                                                                {trial.titles.length}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div
                                                        className="mt-2 flex flex-wrap gap-1"
                                                        aria-label={`${trial.name} privilege rewards`}
                                                    >
                                                        {privilegeRewards.map((privilege) => (
                                                            <span
                                                                key={privilege}
                                                                className={`rounded-full border px-1.5 py-0.5 text-[0.65rem] font-medium leading-tight ${
                                                                    isComplete
                                                                        ? "border-emerald-200 bg-emerald-100/80 text-emerald-900 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-100"
                                                                        : "border-cyan-200/70 bg-cyan-50/70 text-cyan-900 dark:border-cyan-900/70 dark:bg-cyan-950/30 dark:text-cyan-100"
                                                                }`}
                                                            >
                                                                {privilege}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </section>
                            ))}
                        </div>

                        <TrialDetail trial={activeTrial} />
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
                                        setRankFilter("All");
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
    const { checked, setCheck } = useProgress();
    const completedTitles = trial.titles.filter(
        (title) => checked[`trial:${trial.id}:${title.title}`],
    ).length;

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
            <p className="mt-2 text-xs font-medium text-zinc-600 dark:text-zinc-300">
                {completedTitles} / {trial.titles.length} difficulties completed
            </p>

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
                <div className="hidden grid-cols-[0.45fr_0.8fr_1.2fr_1fr_0.8fr_1.5fr] gap-2 bg-zinc-100/90 px-3 py-2 text-[0.68rem] font-semibold uppercase tracking-wide text-zinc-600 dark:bg-zinc-900/80 dark:text-zinc-300 md:grid">
                    <span>Done</span>
                    <span>Title / rank</span>
                    <span>Talent shift</span>
                    <span>Clan privilege</span>
                    <span>Discount</span>
                    <span>Objective</span>
                </div>
                <ul className="divide-y divide-zinc-200/80 dark:divide-zinc-700/70">
                    {trial.titles.map((title) => {
                        const progressKey = `trial:${trial.id}:${title.title}`;
                        const isComplete = !!checked[progressKey];

                        return (
                            <li
                                key={title.title}
                                className="grid gap-2 bg-white/70 px-3 py-3 text-sm text-zinc-700 dark:bg-zinc-900/30 dark:text-zinc-200 md:grid-cols-[0.45fr_0.8fr_1.2fr_1fr_0.8fr_1.5fr] md:gap-2"
                            >
                                <label className="flex items-center gap-2 text-sm font-semibold text-zinc-700 dark:text-zinc-200 md:items-start">
                                    <input
                                        type="checkbox"
                                        checked={isComplete}
                                        onChange={() => setCheck(progressKey)}
                                        className="mt-0.5 h-4 w-4 rounded border-zinc-300 text-cyan-600 focus:ring-cyan-400 dark:border-zinc-600 dark:bg-zinc-950"
                                        aria-label={`Mark ${trial.name} - ${title.title} complete`}
                                    />
                                    <span className="md:hidden">Complete</span>
                                </label>
                                <div>
                                    <span className="md:hidden text-[0.68rem] font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                                        Title
                                    </span>
                                    <div className="font-semibold text-zinc-950 dark:text-zinc-50">
                                        {title.title}
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
                                        Clan privilege
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
                        );
                    })}
                </ul>
            </div>

            {(trial.notes.length > 0 || trial.completionTips.length > 0) && (
                <div className="mt-3 grid gap-3 md:grid-cols-2">
                {trial.notes.length > 0 && <div>
                    <h5 className="text-[0.68rem] font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                        Guide notes
                    </h5>
                    <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-zinc-700 dark:text-zinc-200">
                        {trial.notes.map((note) => (
                            <li key={note}>{note}</li>
                        ))}
                    </ul>
                </div>}
                {trial.completionTips.length > 0 && <div>
                    <h5 className="text-[0.68rem] font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                        How to beat it
                    </h5>
                    <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-zinc-700 dark:text-zinc-200">
                        {trial.completionTips.map((tip) => (
                            <li key={tip}>{tip}</li>
                        ))}
                    </ul>
                </div>}
                </div>
            )}
        </article>
    );
}

function RoadmapTable() {
    return (
        <div className="overflow-hidden rounded-lg border border-zinc-200/80 dark:border-zinc-700/70">
            <div className="hidden grid-cols-[1.1fr_1.2fr_1fr_1.4fr] gap-3 bg-zinc-100/90 px-3 py-2 text-[0.68rem] font-semibold uppercase tracking-wide text-zinc-600 dark:bg-zinc-900/80 dark:text-zinc-300 md:grid">
                <span>Privilege</span>
                <span>Effect</span>
                <span>Trial / title</span>
                <span>Objective</span>
            </div>
            <ul className="divide-y divide-zinc-200/80 dark:divide-zinc-700/70">
                {CLAN_PRIVILEGE_ROADMAP.map((item) => (
                    <li
                        key={item.id}
                        className="grid gap-2 bg-white/80 px-3 py-3 text-sm text-zinc-700 dark:bg-zinc-900/40 dark:text-zinc-200 md:grid-cols-[1.1fr_1.2fr_1fr_1.4fr] md:gap-3"
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
                    </li>
                ))}
            </ul>
        </div>
    );
}
