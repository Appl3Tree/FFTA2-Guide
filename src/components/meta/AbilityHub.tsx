import React from "react";
import { ChevronDown, List, ListChecks, UserRound, Users } from "lucide-react";
import {
    ABILITIES,
    ABILITY_SETS,
    type AbilityMeta,
    type AbilitySetMeta,
} from "../../data/abilities/abilities";
import {
    NAMED_RECRUIT_ABILITY_TARGETS,
    RACE_ABILITY_TARGETS,
    namedRecruitAbilityProgressKey,
    raceAbilityProgressKey,
    uniqueAbilitiesForTarget,
    type AbilityTrackingTarget,
} from "../../data/abilityTracking";
import {
    type ChecklistKey,
    useChecklistPreferences,
} from "../ChecklistPreferencesContext";
import { useProgress } from "../ProgressContext";
import { Panel } from "../ui/Panel";
import { PanelProgress } from "../ui/PanelProgress";

type AbilityHubMode = "browse" | "race" | "characters";
type ProgressKeyFactory = (targetId: string, abilityId: string) => string;

function abilitySearchText(ability: AbilityMeta, set: AbilitySetMeta): string {
    const parts = [set.name, set.description, ability.name];
    if (ability.description) parts.push(...ability.description);
    if (ability.blueMagic) parts.push("blue", "blue magic", "blue-magic");
    return parts.filter(Boolean).join(" ").toLowerCase();
}

function trackingAbilitySearchText(ability: AbilityMeta, job: string): string {
    const set = ABILITY_SETS[ability.setId];
    return [
        job,
        set?.name,
        ability.name,
        ...(ability.description ?? []),
        ability.blueMagic ? "blue magic" : "",
    ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
}

export function AbilityHubPanel() {
    const { checked } = useProgress();
    const { isChecklistEnabled, isScopeEnabled } = useChecklistPreferences();
    const raceTrackingEnabled = isChecklistEnabled("abilityRace");
    const characterTrackingEnabled = isChecklistEnabled("abilityCharacters");

    const activeProgressKeys = React.useMemo(() => {
        const keys: string[] = [];

        if (raceTrackingEnabled) {
            for (const target of RACE_ABILITY_TARGETS) {
                if (!isScopeEnabled("abilityRace", target.id)) continue;
                for (const ability of uniqueAbilitiesForTarget(target)) {
                    keys.push(raceAbilityProgressKey(target.id, ability.id));
                }
            }
        }

        if (characterTrackingEnabled) {
            for (const target of NAMED_RECRUIT_ABILITY_TARGETS) {
                if (!isScopeEnabled("abilityCharacters", target.id)) continue;
                for (const ability of uniqueAbilitiesForTarget(target)) {
                    keys.push(
                        namedRecruitAbilityProgressKey(target.id, ability.id),
                    );
                }
            }
        }

        return keys;
    }, [characterTrackingEnabled, isScopeEnabled, raceTrackingEnabled]);

    const completed = activeProgressKeys.filter((key) => checked[key]).length;

    return (
        <Panel
            title="Ability Hub"
            subtitle="Browse every ability or track mastery across enabled race and recruit lists."
            tone="blue"
            defaultOpen
            collapsible={false}
            headerAddon={
                activeProgressKeys.length > 0 ? (
                    <PanelProgress
                        completed={completed}
                        label="Learnable abilities"
                        tone="cyan"
                        total={activeProgressKeys.length}
                    />
                ) : undefined
            }
        >
            <AbilityHub />
        </Panel>
    );
}

export function AbilityHub() {
    const [mode, setMode] = React.useState<AbilityHubMode>("browse");
    const [query, setQuery] = React.useState("");
    const searchId = React.useId();

    const raceTargets = RACE_ABILITY_TARGETS;
    const characterTargets = NAMED_RECRUIT_ABILITY_TARGETS;

    return (
        <div className="space-y-4 text-sm text-zinc-100">
            <div
                role="tablist"
                aria-label="Ability Hub view"
                className="grid grid-cols-3 border-b border-zinc-800"
            >
                    <ModeTab
                        active={mode === "browse"}
                        icon={<List className="h-4 w-4" />}
                        label="Browse"
                        onClick={() => setMode("browse")}
                        panelId="ability-panel-browse"
                    />
                    <ModeTab
                        active={mode === "race"}
                        icon={<Users className="h-4 w-4" />}
                        label="Race jobs"
                        onClick={() => setMode("race")}
                        panelId="ability-panel-race"
                    />
                    <ModeTab
                        active={mode === "characters"}
                        icon={<UserRound className="h-4 w-4" />}
                        label="Recruits"
                        onClick={() => setMode("characters")}
                        panelId="ability-panel-characters"
                    />
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <label
                    htmlFor={searchId}
                    className="text-xs font-semibold uppercase text-zinc-400"
                >
                    Search abilities
                </label>
                <input
                    id={searchId}
                    type="search"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search by job, set, ability, or effect..."
                    className="min-h-11 w-full rounded-md border border-zinc-700/80 bg-zinc-950/70 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-500 focus:border-sky-500/70 focus:outline-none focus:ring-2 focus:ring-sky-500/70 sm:w-80"
                />
            </div>

            {mode === "browse" ? (
                <BrowseAbilities query={query} />
            ) : mode === "race" ? (
                <AbilityChecklistView
                    checklistKey="abilityRace"
                    progressKey={raceAbilityProgressKey}
                    query={query}
                    targets={raceTargets}
                    viewLabel="race"
                />
            ) : (
                <AbilityChecklistView
                    checklistKey="abilityCharacters"
                    progressKey={namedRecruitAbilityProgressKey}
                    query={query}
                    targets={characterTargets}
                    viewLabel="named recruit"
                />
            )}
        </div>
    );
}

function ModeTab({
    active,
    disabled = false,
    icon,
    label,
    onClick,
    panelId,
}: {
    active: boolean;
    disabled?: boolean;
    icon: React.ReactNode;
    label: string;
    onClick: () => void;
    panelId: string;
}) {
    return (
        <button
            type="button"
            role="tab"
            aria-controls={panelId}
            aria-selected={active}
            disabled={disabled}
            onClick={onClick}
            className={`flex min-h-11 items-center justify-center gap-1.5 border-b-2 px-2 text-xs font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-sky-300 disabled:cursor-not-allowed disabled:opacity-35 sm:text-sm ${
                active
                    ? "border-sky-400 text-sky-200"
                    : "border-transparent text-zinc-400 hover:text-zinc-200"
            }`}
        >
            {icon}
            <span>{label}</span>
        </button>
    );
}

function BrowseAbilities({ query }: { query: string }) {
    const [openSets, setOpenSets] = React.useState<Record<string, boolean>>({});

    const setsWithAbilities = React.useMemo(() => {
        const map: Record<string, AbilityMeta[]> = {};

        for (const ability of Object.values(ABILITIES)) {
            for (const setId of [ability.setId, ...(ability.otherSetIds ?? [])]) {
                const list = map[setId] ?? (map[setId] = []);
                list.push(ability);
            }
        }

        return Object.values(ABILITY_SETS)
            .map((set) => ({
                set,
                abilities: (map[set.id] ?? []).sort((left, right) =>
                    left.name.localeCompare(right.name),
                ),
            }))
            .sort((left, right) => left.set.name.localeCompare(right.set.name));
    }, []);

    const filtered = React.useMemo(() => {
        const normalizedQuery = query.trim().toLowerCase();
        if (!normalizedQuery) return setsWithAbilities;

        return setsWithAbilities.flatMap(({ set, abilities }) => {
            const setMatches =
                set.name.toLowerCase().includes(normalizedQuery) ||
                (set.description ?? "").toLowerCase().includes(normalizedQuery);
            const matchingAbilities = abilities.filter((ability) =>
                abilitySearchText(ability, set).includes(normalizedQuery),
            );

            if (!setMatches && matchingAbilities.length === 0) return [];
            return [
                {
                    set,
                    abilities:
                        matchingAbilities.length > 0
                            ? matchingAbilities
                            : abilities,
                },
            ];
        });
    }, [query, setsWithAbilities]);

    if (filtered.length === 0) {
        return (
            <p role="status" className="py-4 text-sm text-zinc-400">
                No ability sets match your search.
            </p>
        );
    }

    const searching = query.trim().length > 0;

    return (
        <div
            id="ability-panel-browse"
            role="tabpanel"
            className="space-y-3"
        >
            <p className="sr-only" role="status">
                {filtered.length} matching ability sets.
            </p>
            {filtered.map(({ set, abilities }) => {
                const isOpen = searching || openSets[set.id] === true;

                return (
                    <section
                        key={set.id}
                        className="overflow-hidden rounded-md border border-zinc-800/80 bg-zinc-950/60"
                    >
                        <button
                            type="button"
                            onClick={() =>
                                setOpenSets((current) => ({
                                    ...current,
                                    [set.id]: !isOpen,
                                }))
                            }
                            aria-expanded={isOpen}
                            className="flex min-h-11 w-full items-center justify-between gap-3 bg-zinc-900/80 px-3 py-2.5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-sky-300 sm:px-4 sm:py-3"
                        >
                            <span className="min-w-0">
                                <span className="block text-sm font-semibold text-zinc-50 sm:text-base">
                                    {set.name}
                                </span>
                                {set.description ? (
                                    <span className="mt-0.5 block text-xs leading-relaxed text-zinc-400">
                                        {set.description}
                                    </span>
                                ) : null}
                            </span>
                            <span className="flex shrink-0 items-center gap-2 text-xs text-zinc-400">
                                {abilities.length}
                                <ChevronDown
                                    className={`h-4 w-4 transition-transform ${
                                        isOpen ? "rotate-180" : ""
                                    }`}
                                />
                            </span>
                        </button>

                        {isOpen ? (
                            <ul className="divide-y divide-zinc-800/70">
                                {abilities.map((ability) => (
                                    <AbilityDescription
                                        key={ability.id}
                                        ability={ability}
                                    />
                                ))}
                            </ul>
                        ) : null}
                    </section>
                );
            })}
        </div>
    );
}

function AbilityChecklistView({
    checklistKey,
    progressKey,
    query,
    targets,
    viewLabel,
}: {
    checklistKey: ChecklistKey;
    progressKey: ProgressKeyFactory;
    query: string;
    targets: AbilityTrackingTarget[];
    viewLabel: string;
}) {
    const { checked, setCheck } = useProgress();
    const { isScopeEnabled } = useChecklistPreferences();
    const [selectedId, setSelectedId] = React.useState(targets[0]?.id ?? "");
    const [openJobs, setOpenJobs] = React.useState<Record<string, boolean>>({});
    const selectId = React.useId();

    React.useEffect(() => {
        if (!targets.some((target) => target.id === selectedId)) {
            setSelectedId(targets[0]?.id ?? "");
        }
    }, [selectedId, targets]);

    const target =
        targets.find((candidate) => candidate.id === selectedId) ?? targets[0];

    if (!target) {
        return (
            <p role="status" className="py-4 text-sm text-zinc-400">
                No {viewLabel} checklists are enabled. Re-enable one in Checklist
                settings.
            </p>
        );
    }

    const targetAbilities = uniqueAbilitiesForTarget(target);
    const targetTrackingEnabled = isScopeEnabled(checklistKey, target.id);
    const completed = targetAbilities.filter((ability) =>
        checked[progressKey(target.id, ability.id)],
    ).length;
    const normalizedQuery = query.trim().toLowerCase();
    const groups = target.groups
        .map((group) => ({
            ...group,
            abilities: normalizedQuery
                ? group.abilities.filter((ability) =>
                      trackingAbilitySearchText(ability, group.job).includes(
                          normalizedQuery,
                      ),
                  )
                : group.abilities,
        }))
        .filter(
            (group) =>
                group.abilities.length > 0 ||
                (!normalizedQuery && Boolean(group.note)),
        );
    const searching = normalizedQuery.length > 0;
    const panelId =
        checklistKey === "abilityRace"
            ? "ability-panel-race"
            : "ability-panel-characters";

    return (
        <div id={panelId} role="tabpanel" className="space-y-4">
            <div className="grid gap-3 border-y border-zinc-800 py-3 sm:grid-cols-[minmax(0,1fr)_minmax(16rem,20rem)] sm:items-end">
                <div>
                    <label
                        htmlFor={selectId}
                        className="text-xs font-semibold uppercase text-zinc-400"
                    >
                        {viewLabel}
                    </label>
                    <select
                        id={selectId}
                        value={target.id}
                        onChange={(event) => setSelectedId(event.target.value)}
                        className="mt-1 min-h-11 w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-base text-zinc-100 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-400 sm:text-sm"
                    >
                        {targets.map((option) => (
                            <option key={option.id} value={option.id}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                    <p className="mt-1 text-xs leading-relaxed text-zinc-400">
                        {target.description}
                    </p>
                </div>
                {targetTrackingEnabled ? (
                    <PanelProgress
                        completed={completed}
                        label={target.label}
                        tone="cyan"
                        total={targetAbilities.length}
                    />
                ) : (
                    <div className="flex min-h-11 items-center justify-between border-y border-zinc-800 py-2 text-sm sm:border-y-0 sm:py-0">
                        <span className="text-zinc-400">Reference list</span>
                        <span className="font-semibold text-zinc-200">
                            {targetAbilities.length} abilities
                        </span>
                    </div>
                )}
            </div>

            <p role="status" className="text-xs text-zinc-400">
                {searching
                    ? `${groups.reduce((total, group) => total + group.abilities.length, 0)} matching entries across ${groups.length} ${groups.length === 1 ? "job" : "jobs"}.`
                    : `${targetAbilities.length} unique abilities across ${target.groups.length} ${target.groups.length === 1 ? "job" : "jobs"}. Shared abilities update everywhere they appear.`}
            </p>

            {groups.length === 0 ? (
                <p className="py-4 text-sm text-zinc-400">
                    No abilities match your search for {target.label}.
                </p>
            ) : (
                <div className="space-y-3">
                    {groups.map((group) => {
                        if (group.abilities.length === 0) {
                            return (
                                <section
                                    key={group.job}
                                    className="border border-zinc-800 bg-zinc-950/60 px-3 py-3 sm:px-4"
                                >
                                    <div className="flex min-h-11 items-start justify-between gap-3">
                                        <span className="min-w-0">
                                            <span className="block font-semibold text-zinc-100">
                                                {group.job}
                                            </span>
                                            {group.summary ? (
                                                <span className="mt-0.5 block text-xs leading-relaxed text-zinc-400">
                                                    {group.summary}
                                                </span>
                                            ) : null}
                                            {group.note ? (
                                                <span className="mt-1 block text-xs leading-relaxed text-sky-300">
                                                    {group.note}
                                                </span>
                                            ) : null}
                                        </span>
                                        <span className="shrink-0 text-xs text-zinc-500">
                                            Reference only
                                        </span>
                                    </div>
                                </section>
                            );
                        }

                        const groupId = `${target.id}:${group.job}`;
                        const isOpen = searching || openJobs[groupId] === true;
                        const groupComplete = group.abilities.filter((ability) =>
                            checked[progressKey(target.id, ability.id)],
                        ).length;

                        return (
                            <section
                                key={group.job}
                                className="overflow-hidden rounded-md border border-zinc-800 bg-zinc-950/60"
                            >
                                <button
                                    type="button"
                                    aria-expanded={isOpen}
                                    onClick={() =>
                                        setOpenJobs((current) => ({
                                            ...current,
                                            [groupId]: !isOpen,
                                        }))
                                    }
                                    className="flex min-h-11 w-full items-center justify-between gap-3 bg-zinc-900/80 px-3 py-2.5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-sky-300 sm:px-4"
                                >
                                    <span className="min-w-0">
                                        <span className="block font-semibold text-zinc-100">
                                            {group.job}
                                        </span>
                                        {group.summary ? (
                                            <span className="mt-0.5 block text-xs leading-relaxed text-zinc-400">
                                                {group.summary}
                                            </span>
                                        ) : null}
                                        {group.note ? (
                                            <span className="mt-1 block text-xs leading-relaxed text-sky-300">
                                                {group.note}
                                            </span>
                                        ) : null}
                                    </span>
                                    <span className="flex shrink-0 items-center gap-2 text-xs text-zinc-400">
                                        {targetTrackingEnabled
                                            ? `${groupComplete}/${group.abilities.length}`
                                            : `${group.abilities.length}`}
                                        <ChevronDown
                                            className={`h-4 w-4 transition-transform ${
                                                isOpen ? "rotate-180" : ""
                                            }`}
                                        />
                                    </span>
                                </button>

                                {isOpen ? (
                                    <ul className="divide-y divide-zinc-800/70">
                                        {group.abilities.map((ability) => {
                                            const key = progressKey(
                                                target.id,
                                                ability.id,
                                            );
                                            const setName =
                                                ABILITY_SETS[ability.setId]?.name ??
                                                ability.setId;

                                            const ItemWrapper =
                                                targetTrackingEnabled
                                                    ? "label"
                                                    : "div";

                                            return (
                                                <li key={ability.id}>
                                                    <ItemWrapper
                                                        className={`flex min-h-12 items-start gap-3 px-3 py-2.5 transition-colors sm:px-4 ${
                                                            targetTrackingEnabled
                                                                ? "cursor-pointer hover:bg-zinc-900/60 focus-within:ring-2 focus-within:ring-inset focus-within:ring-sky-300"
                                                                : ""
                                                        }`}
                                                    >
                                                        {targetTrackingEnabled ? (
                                                        <input
                                                            type="checkbox"
                                                            checked={!!checked[key]}
                                                            onChange={(event) =>
                                                                setCheck(
                                                                    key,
                                                                    event.target.checked,
                                                                )
                                                            }
                                                            className="mt-0.5 h-5 w-5 shrink-0 rounded border-zinc-500 text-sky-500 focus:ring-sky-400"
                                                        />
                                                        ) : null}
                                                        <span className="min-w-0">
                                                            <span className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                                                                <span className="font-medium text-zinc-100">
                                                                    {ability.name}
                                                                </span>
                                                                <span className="text-xs text-zinc-500">
                                                                    {setName}
                                                                    {ability.ap != null
                                                                        ? ` | ${ability.ap} AP`
                                                                        : ""}
                                                                </span>
                                                            </span>
                                                            {ability.description?.[0] ? (
                                                                <span className="mt-0.5 block text-xs leading-relaxed text-zinc-400">
                                                                    {ability.description[0]}
                                                                </span>
                                                            ) : null}
                                                        </span>
                                                    </ItemWrapper>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                ) : null}
                            </section>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

function AbilityDescription({ ability }: { ability: AbilityMeta }) {
    return (
        <li className="px-3 py-2.5 sm:px-4 sm:py-3">
            <div className="flex flex-wrap items-center gap-1.5 font-medium text-zinc-50">
                <span>{ability.name}</span>
                {ability.blueMagic ? (
                    <span className="inline-flex items-center rounded-full border border-sky-600/70 bg-sky-900/40 px-1.5 py-px text-[0.65rem] uppercase text-sky-200">
                        Blue Magic
                    </span>
                ) : null}
            </div>
            {ability.description?.length ? (
                <div className="mt-0.5 space-y-0.5 text-xs leading-relaxed text-zinc-400">
                    {ability.description.map((line, index) => (
                        <p key={`${ability.id}:${index}`}>{line}</p>
                    ))}
                </div>
            ) : null}
        </li>
    );
}
