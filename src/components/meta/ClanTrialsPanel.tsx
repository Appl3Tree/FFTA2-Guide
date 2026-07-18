import React from "react";
import { Check, ChevronDown, Search } from "lucide-react";
import {
    CLAN_TRIAL_GUIDE,
    CLAN_TRIALS,
    getClanRankForTrialTitle,
} from "../../data/meta/clanTrials";
import { Panel } from "../ui/Panel";
import { useGuidePreference, useProgress } from "../ProgressContext";
import { PanelProgress } from "../ui/PanelProgress";
import { useChecklistPreferences } from "../ChecklistPreferencesContext";

const KEY_GUIDE_IDS = ["what-they-are", "title-system", "talents"];

const START_TAKEAWAYS: Record<string, string> = {
    "what-they-are":
        "Spend Clan Points, choose one title row, clear the judge's challenge, and watch whether that trial fails on law-breaking.",
    "title-system":
        "The last title you earn becomes your current title, and only that title's discount applies. Privileges and your highest Clan Rank remain unlocked. Work through accessible trials in any useful order, then finish with the best discount title you can currently complete.",
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
    const { isChecklistEnabled, isScopeEnabled } = useChecklistPreferences();
    const trackingEnabled = isChecklistEnabled("clanTrials");
    const [activeTrialId, setActiveTrialId] = React.useState("");
    const [rankFilter, setRankFilter] = useGuidePreference<RankFilter>(
        "filters.clan.rank",
        "All",
    );
    const [trialSearch, setTrialSearch] = useGuidePreference(
        "filters.clan.query",
        "",
    );
    const [guideOpen, setGuideOpen] = useGuidePreference(
        "disclosure.clan.guide",
        false,
    );
    const trackedProgressKeys = CLAN_TRIALS.filter((trial) =>
        isScopeEnabled("clanTrials", trial.id),
    ).flatMap((trial) =>
        trial.titles.map((title) => `trial:${trial.id}:${title.title}`),
    );
    const completedTitleClears = trackedProgressKeys.filter(
        (key) => checked[key],
    ).length;

    const keyGuideSections = CLAN_TRIAL_GUIDE.filter((section) =>
        KEY_GUIDE_IDS.includes(section.id),
    );

    const filteredTrials = React.useMemo(() => {
        const query = trialSearch.trim().toLowerCase();

        return CLAN_TRIALS.filter((trial) => {
            const haystack = [
                trial.name,
                trial.law,
                trial.location,
                trial.requiredTalents,
                trial.unlock,
                `party limit ${trial.members}`,
                `quest rank ${trial.rank}`,
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
        filteredTrials.find((trial) => trial.id === activeTrialId) ?? null;

    React.useEffect(() => {
        if (
            activeTrialId &&
            !filteredTrials.some((trial) => trial.id === activeTrialId)
        ) {
            setActiveTrialId("");
        }
    }, [activeTrialId, filteredTrials]);

    return (
        <Panel
            title="Clan Trials"
            subtitle="Plan trial clears, title rewards, privileges, and clan talent changes."
            tone="cyan"
            defaultOpen
            collapsible={false}
            headerAddon={trackingEnabled && trackedProgressKeys.length > 0 ? (
                <PanelProgress
                    completed={completedTitleClears}
                    label="Title clears"
                    tone="cyan"
                    total={trackedProgressKeys.length}
                />
            ) : undefined}
        >
            <div className="space-y-4 sm:space-y-5" data-testid="clan-trials-content">
                <section
                    className="border-y border-zinc-200/80 dark:border-zinc-800"
                    aria-labelledby="clan-trials-guide"
                >
                    <button
                        type="button"
                        aria-expanded={guideOpen}
                        aria-controls={
                            guideOpen
                                ? "clan-trials-guide-content"
                                : undefined
                        }
                        onClick={() => setGuideOpen((open) => !open)}
                        className="flex min-h-11 w-full items-center justify-between gap-3 py-3 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-cyan-300"
                    >
                        <span>
                            <span
                                id="clan-trials-guide"
                                className="block text-sm font-semibold text-zinc-950 dark:text-zinc-50"
                            >
                                How trials work
                            </span>
                            <span className="mt-0.5 block text-xs text-zinc-600 dark:text-zinc-300">
                                Clan Points, title clears, privileges, and talent tradeoffs.
                            </span>
                        </span>
                        <ChevronDown
                            aria-hidden="true"
                            className={`h-4 w-4 shrink-0 text-zinc-500 transition-transform ${
                                guideOpen ? "rotate-180" : ""
                            }`}
                        />
                    </button>

                    {guideOpen ? (
                    <div
                        id="clan-trials-guide-content"
                        className="grid divide-y divide-zinc-200/80 border-t border-zinc-200/80 lg:grid-cols-3 lg:divide-x lg:divide-y-0 dark:divide-zinc-800 dark:border-zinc-800"
                    >
                        {keyGuideSections.map((section) => (
                            <article
                                key={section.id}
                                className="px-1 py-3 sm:p-3"
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
                    ) : null}
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
                            {CLAN_TRIALS.length} trials grouped by quest rank,
                            with objectives, laws, rewards, and talent shifts.
                        </p>
                    </header>

                    <div className="space-y-3 rounded-lg border border-zinc-200/80 bg-white/70 p-3 dark:border-zinc-700/70 dark:bg-zinc-900/30">
                        <label className="relative block">
                            <span className="sr-only">Search clan trials</span>
                            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                            <input
                                type="search"
                                value={trialSearch}
                                onChange={(event) => setTrialSearch(event.target.value)}
                                placeholder="Search Bonus AP, barrels, Tonberries, Move..."
                                className="min-h-11 w-full rounded-lg border border-zinc-300/80 bg-white px-9 py-2 text-base text-zinc-900 placeholder:text-zinc-400 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-300/60 dark:border-zinc-700 dark:bg-zinc-950/70 dark:text-zinc-50 dark:placeholder:text-zinc-500 dark:focus:border-cyan-500 sm:text-sm"
                            />
                        </label>

                        <div
                            className="flex gap-2 overflow-x-auto pb-1"
                            aria-label="Clan trial quest rank filters"
                            role="group"
                        >
                            {(["All", ...TRIAL_RANKS] as const).map((filter) => (
                                <button
                                    key={filter}
                                    type="button"
                                    onClick={() => setRankFilter(filter)}
                                    aria-pressed={rankFilter === filter}
                                    className={`min-h-11 shrink-0 rounded-md border px-3 py-1 text-xs font-semibold uppercase transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 ${
                                        rankFilter === filter
                                            ? "border-cyan-400 bg-cyan-100 text-cyan-900 dark:border-cyan-500/80 dark:bg-cyan-950/70 dark:text-cyan-100"
                                            : "border-zinc-300 bg-white text-zinc-600 hover:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-950/50 dark:text-zinc-300 dark:hover:border-zinc-600"
                                    }`}
                                >
                                    {filter === "All"
                                        ? "All quest ranks"
                                        : `Quest rank ${filter}`}
                                </button>
                            ))}
                        </div>
                    </div>

                    {filteredTrials.length > 0 ? (
                        <div className="grid gap-3 lg:h-[75vh] lg:min-h-[38rem] lg:max-h-[48rem] lg:grid-cols-[minmax(16rem,0.8fr)_minmax(0,1.2fr)] lg:gap-0 lg:overflow-hidden lg:border-y lg:border-zinc-700/70">
                            <div className="grid content-start gap-3 lg:min-h-0 lg:overflow-y-auto lg:border-r lg:border-zinc-700/70 lg:py-3 lg:pr-3">
                            {groupedTrials.map((group) => (
                                <section key={group.rank} className="space-y-2">
                                    <div className="flex items-center justify-between gap-2 border-b border-zinc-200/80 pb-1 dark:border-zinc-700/70">
                                        <h4 className="text-[0.68rem] font-semibold uppercase text-zinc-500 dark:text-zinc-400">
                                            Quest rank {group.rank}
                                        </h4>
                                        <span className="text-[0.68rem] text-zinc-500 dark:text-zinc-400">
                                            {group.trials.length} trial
                                            {group.trials.length === 1 ? "" : "s"}
                                        </span>
                                    </div>
                                    <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-1">
                                        {group.trials.map((trial) => {
                                            const isActive = trial.id === activeTrial?.id;
                                            const trialTrackingEnabled =
                                                isScopeEnabled(
                                                    "clanTrials",
                                                    trial.id,
                                                );
                                            const completedTitles = trial.titles.filter(
                                                (title) =>
                                                    checked[`trial:${trial.id}:${title.title}`],
                                            ).length;
                                            const isComplete =
                                                trialTrackingEnabled &&
                                                completedTitles === trial.titles.length;
                                            const privilegeRewards =
                                                getPrivilegeRewards(trial);

                                            return (
                                                <React.Fragment key={trial.id}>
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            setActiveTrialId((current) =>
                                                                current === trial.id
                                                                    ? ""
                                                                    : trial.id,
                                                            )
                                                        }
                                                        aria-expanded={isActive}
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
                                                                {trial.location} · Quest rank {trial.rank} · {trial.law}
                                                            </p>
                                                        </div>
                                                        {trialTrackingEnabled ? (
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
                                                        ) : null}
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
                                                    {isActive ? (
                                                        <div className="md:col-span-2 lg:hidden">
                                                            <TrialDetail
                                                                trial={trial}
                                                                trackingEnabled={
                                                                    trialTrackingEnabled
                                                                }
                                                            />
                                                        </div>
                                                    ) : null}
                                                </React.Fragment>
                                            );
                                        })}
                                    </div>
                                </section>
                            ))}
                        </div>

                            <div className="hidden min-h-0 overflow-y-auto p-3 lg:block">
                                {activeTrial ? (
                                    <TrialDetail
                                        trial={activeTrial}
                                        trackingEnabled={isScopeEnabled(
                                            "clanTrials",
                                            activeTrial.id,
                                        )}
                                    />
                                ) : (
                                    <div className="grid h-full place-items-center text-sm font-medium text-zinc-500 dark:text-zinc-400">
                                        No trial selected
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div
                            role="status"
                            className="rounded-lg border border-zinc-200/80 bg-white/70 p-4 text-sm text-zinc-600 dark:border-zinc-700/70 dark:bg-zinc-900/40 dark:text-zinc-300"
                        >
                            No clan trials match the current search and rank filter.
                        </div>
                    )}
                </section>

            </div>
        </Panel>
    );
}

function TrialDetail({
    trackingEnabled,
    trial,
}: {
    trackingEnabled: boolean;
    trial: (typeof CLAN_TRIALS)[number];
}) {
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
                        Quest rank {trial.rank} · {trial.location} · {trial.price} ·{" "}
                        {trial.days} days
                    </p>
                </div>
                <span className="w-fit rounded-full bg-cyan-100 px-2 py-1 text-[0.68rem] font-semibold uppercase text-cyan-900 dark:bg-cyan-950 dark:text-cyan-100">
                    {trial.lawRequirement}
                </span>
            </div>
            {trackingEnabled ? (
            <p className="mt-2 text-xs font-medium text-zinc-600 dark:text-zinc-300">
                {completedTitles} / {trial.titles.length} difficulties completed
            </p>
            ) : null}

            <dl className="mt-3 grid gap-x-5 gap-y-3 border-y border-zinc-200/80 py-3 sm:grid-cols-2 xl:grid-cols-3 dark:border-zinc-800">
                <div>
                    <dt className="text-[0.68rem] font-semibold uppercase text-zinc-500 dark:text-zinc-400">
                        Law
                    </dt>
                    <dd className="mt-0.5 text-sm text-zinc-700 dark:text-zinc-200">
                        {trial.law}
                    </dd>
                </div>
                <div>
                    <dt className="text-[0.68rem] font-semibold uppercase text-zinc-500 dark:text-zinc-400">
                        Required talents
                    </dt>
                    <dd className="mt-0.5 text-sm text-zinc-700 dark:text-zinc-200">
                        {trial.requiredTalents}
                    </dd>
                </div>
                <div>
                    <dt className="text-[0.68rem] font-semibold uppercase text-zinc-500 dark:text-zinc-400">
                        Party limit
                    </dt>
                    <dd className="mt-0.5 text-sm text-zinc-700 dark:text-zinc-200">
                        {trial.members} clan members
                    </dd>
                </div>
                <div className="sm:col-span-2">
                    <dt className="text-[0.68rem] font-semibold uppercase text-zinc-500 dark:text-zinc-400">
                        Unlock condition
                    </dt>
                    <dd className="mt-0.5 text-sm text-zinc-700 dark:text-zinc-200">
                        {trial.unlock}
                    </dd>
                </div>
                <div>
                    <dt className="text-[0.68rem] font-semibold uppercase text-zinc-500 dark:text-zinc-400">
                        Title rewards
                    </dt>
                    <dd className="mt-0.5 text-sm text-zinc-700 dark:text-zinc-200">
                        {trial.titles.length} difficulties
                    </dd>
                </div>
            </dl>

            <div className="mt-3 rounded-lg bg-cyan-50/70 p-3 text-sm leading-relaxed text-zinc-800 dark:bg-cyan-950/20 dark:text-zinc-100/90">
                {trial.challenge}
            </div>

            {(trial.notes.length > 0 || trial.completionTips.length > 0) && (
                <div className="mt-3 grid gap-3 md:grid-cols-2">
                {trial.notes.length > 0 && <div>
                    <h5 className="text-[0.68rem] font-semibold uppercase text-zinc-500 dark:text-zinc-400">
                        Notes
                    </h5>
                    <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-zinc-700 dark:text-zinc-200">
                        {trial.notes.map((note) => (
                            <li key={note}>{note}</li>
                        ))}
                    </ul>
                </div>}
                {trial.completionTips.length > 0 && <div>
                    <h5 className="text-[0.68rem] font-semibold uppercase text-zinc-500 dark:text-zinc-400">
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

            <div className="mt-3 overflow-hidden rounded-md border border-zinc-200/80 dark:border-zinc-700/70">
                <ul className="divide-y divide-zinc-200/80 dark:divide-zinc-700/70">
                    {trial.titles.map((title, titleIndex) => {
                        const progressKey = `trial:${trial.id}:${title.title}`;
                        const isComplete = !!checked[progressKey];

                        return (
                            <li
                                key={title.title}
                                className="bg-white/70 px-3 py-3 text-sm text-zinc-700 dark:bg-zinc-900/30 dark:text-zinc-200"
                            >
                                {trackingEnabled ? (
                                    <label className="grid min-h-11 cursor-pointer grid-cols-[1.5rem_minmax(0,1fr)_auto] items-center gap-2 rounded-md font-semibold text-zinc-950 focus-within:ring-2 focus-within:ring-cyan-300 dark:text-zinc-50">
                                        <input
                                            type="checkbox"
                                            checked={isComplete}
                                            onChange={(event) =>
                                                setCheck(progressKey, event.target.checked)
                                            }
                                            className="h-6 w-6 shrink-0 rounded border-zinc-300 text-cyan-600 focus:ring-cyan-400 dark:border-zinc-600 dark:bg-zinc-950"
                                            aria-label={`Mark ${trial.name} - ${title.title} complete`}
                                        />
                                        <span>{title.title}</span>
                                        <span className="min-w-[5rem] text-right text-xs font-normal tabular-nums text-zinc-500 dark:text-zinc-400">
                                            <span className="block font-semibold text-cyan-700 dark:text-cyan-300">
                                                Clan rank{" "}
                                                {getClanRankForTrialTitle(
                                                    trial.id,
                                                    titleIndex,
                                                )}
                                            </span>
                                            <span className="block">
                                                Tier {titleIndex + 1} of{" "}
                                                {trial.titles.length}
                                            </span>
                                        </span>
                                    </label>
                                ) : (
                                    <div className="flex min-h-11 items-center justify-between gap-3 font-semibold text-zinc-950 dark:text-zinc-50">
                                        <span>{title.title}</span>
                                        <span className="min-w-[5rem] text-right text-xs font-normal tabular-nums text-zinc-500 dark:text-zinc-400">
                                            <span className="block font-semibold text-cyan-700 dark:text-cyan-300">
                                                Clan rank{" "}
                                                {getClanRankForTrialTitle(
                                                    trial.id,
                                                    titleIndex,
                                                )}
                                            </span>
                                            <span className="block">
                                                Tier {titleIndex + 1} of{" "}
                                                {trial.titles.length}
                                            </span>
                                        </span>
                                    </div>
                                )}
                                <div className="mt-2">
                                    <span className="text-[0.68rem] font-semibold uppercase text-zinc-500 dark:text-zinc-400">
                                        Talent shift
                                    </span>
                                    <TalentShift value={title.talents} />
                                </div>
                                <dl className="mt-3 grid grid-cols-[minmax(0,1fr)_5rem] gap-x-4 gap-y-3">
                                    <div>
                                        <dt className="text-[0.68rem] font-semibold uppercase text-zinc-500 dark:text-zinc-400">
                                            Clan privilege
                                        </dt>
                                        <dd className="mt-0.5 font-medium text-zinc-900 dark:text-zinc-100">
                                            {title.privilege}
                                        </dd>
                                    </div>
                                    <div>
                                        <dt className="text-[0.68rem] font-semibold uppercase text-zinc-500 dark:text-zinc-400">
                                            Discount
                                        </dt>
                                        <dd className="mt-0.5 tabular-nums">{title.discount}</dd>
                                    </div>
                                    <div className="col-span-2">
                                        <dt className="text-[0.68rem] font-semibold uppercase text-zinc-500 dark:text-zinc-400">
                                            Objective
                                        </dt>
                                        <dd className="mt-0.5">{title.objective}</dd>
                                    </div>
                                </dl>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </article>
    );
}

function TalentShift({ value }: { value: string }) {
    const parts = value.split(",").map((part) => part.trim()).filter(Boolean);

    return (
        <div className="mt-1 flex flex-wrap gap-1.5">
            {parts.map((part) => {
                const match = part.match(/^(.+?)\s+([+-]\d+)$/);
                const talent = match?.[1] ?? part;
                const delta = match?.[2] ?? "";
                const isPositive = delta.startsWith("+");

                return (
                    <span
                        key={part}
                        className={`inline-flex items-center gap-1 rounded-md border px-2 py-1 text-xs font-semibold leading-none ${
                            isPositive
                                ? "border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-800/80 dark:bg-emerald-950/30 dark:text-emerald-100"
                                : "border-rose-200 bg-rose-50 text-rose-800 dark:border-rose-800/80 dark:bg-rose-950/30 dark:text-rose-100"
                        }`}
                    >
                        <span>{talent}</span>
                        {delta ? (
                            <span className="tabular-nums">{delta}</span>
                        ) : null}
                    </span>
                );
            })}
        </div>
    );
}
