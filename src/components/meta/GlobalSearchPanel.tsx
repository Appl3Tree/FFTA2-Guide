// src/components/meta/GlobalSearchPanel.tsx
import React from "react";
import type { Mission } from "../../types/ffta2";
import { ALL_MISSIONS } from "../../data/missions/allMissions";
import {
    EQUIPMENT,
    type EquipmentMeta,
} from "../../data/equipment/equipment";
import {
    ABILITIES,
    ABILITY_SETS,
    type AbilityMeta,
    type AbilitySetMeta,
} from "../../data/abilities/abilities";
import {
    RETRO_ACHIEVEMENTS_BY_MISSION_ID,
    GLOBAL_RETRO_ACHIEVEMENTS,
} from "../../data/retroAchievements";
import type { GlobalRetroAchievement } from "../../types/ffta2";
import { resolveEnemyLoadout } from "../../utils/resolveAbilities";
import { resolveEnemyEquipment } from "../../utils/resolveEquipment";
import { useProgress } from "../ProgressContext";

type TabKey = "missions" | "equipment" | "abilities" | "retros";

type RetroAchievement = {
    id: string;
    name: string;
    description: string;
    missable?: boolean;
};

interface RetroEntry {
    key: string;
    sourceLabel: string; // e.g. category
    ach: RetroAchievement;
    blob: string;
}

function missionBlob(m: Mission): string {
    const parts: string[] = [];
    parts.push(m.id, m.name);
    if (m.description) parts.push(m.description);
    if (m.region) parts.push(m.region);
    if (m.questType) parts.push(m.questType);
    if ((m as any).objective) parts.push((m as any).objective);
    if (m.tags) parts.push(...m.tags);

    // Enemies: names / types / notes
    if (m.enemies) {
        for (const enemy of m.enemies) {
            if (enemy.name) parts.push(enemy.name);
            if (enemy.race) parts.push(enemy.race);
            if (enemy.job) parts.push(enemy.job);
            if (enemy.notes) parts.push(enemy.notes);
        }
    }

    // Required items / talents
    if (m.requiredItems) parts.push(...m.requiredItems);
    if (m.requiredTalents) {
        const t = m.requiredTalents;
        if (t.negotiation) parts.push("Negotiation");
        if (t.aptitude) parts.push("Aptitude");
        if (t.teamwork) parts.push("Teamwork");
        if (t.adaptability) parts.push("Adaptability");
    }

    // Dispatch hints
    if (m.dispatchRecommended && m.dispatchRecommended.length > 0) {
        parts.push(...m.dispatchRecommended);
    }

    // Rewards
    if (m.rewards) {
        if (m.rewards.gil) parts.push(`${m.rewards.gil} gil`);
        if (m.rewards.items) parts.push(...m.rewards.items);
        if (m.rewards.abilities) parts.push(...m.rewards.abilities);
    }

    return parts.join(" ").toLowerCase();
}

function equipmentBlob(e: EquipmentMeta): string {
    const parts: string[] = [];
    parts.push(e.name);
    if (e.category) parts.push(e.category);
    if ((e as any).weaponType) parts.push((e as any).weaponType);
    if ((e as any).helmetType) parts.push((e as any).helmetType);
    if ((e as any).armorType) parts.push((e as any).armorType);
    if ((e as any).accessoryType)
        parts.push((e as any).accessoryType);
    if (e.description) parts.push(e.description);
    if (e.notes) parts.push(e.notes);

    if (e.teaches) {
        for (const [job, ids] of Object.entries(e.teaches)) {
            parts.push(job);
            for (const id of ids) {
                const ab = ABILITIES[id];
                if (ab) {
                    const set = ABILITY_SETS[ab.setId];
                    parts.push(
                        `${ab.name} (${set?.name ?? ab.setId})`,
                    );
                }
            }
        }
    }

    if (e.stats) {
        const s = e.stats;
        if (s.atk) parts.push(`ATK ${s.atk}`);
        if (s.mag) parts.push(`MAG ${s.mag}`);
        if (s.def) parts.push(`DEF ${s.def}`);
        if (s.res) parts.push(`RES ${s.res}`);
        if (s.spd) parts.push(`SPD ${s.spd}`);
    }

    if (e.element) parts.push(...e.element);
    if (e.absorb) parts.push(...e.absorb);
    if (e.weak) parts.push(...e.weak);
    if (e.immune) parts.push(...e.immune);

    return parts.join(" ").toLowerCase();
}

function abilityBlob(a: AbilityMeta, set: AbilitySetMeta): string {
    const parts: string[] = [];
    parts.push(a.name, a.id, set.name, set.id);
    if (a.description) parts.push(a.description);
    if (a.job) parts.push(a.job);
    if (a.notes) parts.push(a.notes);
    if (a.element) parts.push(...a.element);
    if (a.immune) parts.push(...a.immune);
    if (a.inflicts) parts.push(...a.inflicts);
    if (a.requires) parts.push(...a.requires);
    if (a.equipmentRequired) parts.push(...a.equipmentRequired);
    if (set.description) parts.push(set.description);
    return parts.join(" ").toLowerCase();
}

export function GlobalSearchPanel() {
    const { checked, setCheck } = useProgress();
    const [open, setOpen] = React.useState(false);
    const [tab, setTab] = React.useState<TabKey>("missions");
    const [query, setQuery] = React.useState("");

    // Per-result expansion state for each tab
    const [openMissions, setOpenMissions] = React.useState<
        Record<string, boolean>
    >({});
    const [openEquipment, setOpenEquipment] = React.useState<
        Record<string, boolean>
    >({});
    const [openAbilities, setOpenAbilities] = React.useState<
        Record<string, boolean>
    >({});
    const [openRetros, setOpenRetros] = React.useState<
        Record<string, boolean>
    >({});

    function CollapsibleSection({
        title,
        defaultOpen = false,
        children,
    }: {
        title: string;
        defaultOpen?: boolean;
        children: React.ReactNode;
    }) {
        const [open, setOpen] = React.useState(defaultOpen);

        // If no content, skip rendering this section entirely
        if (!children) return null;

        return (
            <section className="border border-zinc-800/80 rounded-md bg-zinc-950/40">
                <button
                    type="button"
                    onClick={() => setOpen((v) => !v)}
                    className="w-full px-2 py-1.5 flex items-center justify-between gap-2 text-left"
                >
                    <span className="text-xs font-semibold text-zinc-100">
                        {title}
                    </span>
                    <span className="flex items-center gap-1 text-[0.65rem] text-zinc-400">
                        <span>{open ? "Hide" : "Show"}</span>
                        {open ? (
                            <svg
                                className="h-3 w-3 text-zinc-400"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="m18 15-6-6-6 6" />
                            </svg>
                        ) : (
                            <svg
                                className="h-3 w-3 text-zinc-400"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="m6 9 6 6 6-6" />
                            </svg>
                        )}
                    </span>
                </button>
                {open && (
                    <div className="px-2 pb-2 pt-0 space-y-1.5 text-[0.7rem] text-zinc-100">
                        {children}
                    </div>
                )}
            </section>
        );
    }

    const missableRetroIds = React.useMemo(() => {
        const s = new Set<string>();
        Object.values(RETRO_ACHIEVEMENTS_BY_MISSION_ID).forEach((list) => {
            list.forEach((ach: any) => {
                if (ach.missable) {
                    s.add(ach.id);
                }
            });
        });
        return s;
    }, []);

    // Missions, sorted by id (A1-01 ... E5-16)
    const missionsWithBlob = React.useMemo(
        () =>
            [...ALL_MISSIONS]
                .sort((a, b) => a.id.localeCompare(b.id))
                .map((m) => ({
                    mission: m,
                    blob: missionBlob(m),
                })),
        [],
    );

    // Equipment, sorted alphabetically by name
    const equipmentWithBlob = React.useMemo(
        () =>
            Object.values(EQUIPMENT)
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((e) => ({
                    item: e,
                    blob: equipmentBlob(e),
                })),
        [],
    );

    // Abilities, sorted alphabetically by ability name, then set name
    const abilitiesWithBlob = React.useMemo(() => {
        const result: {
            set: AbilitySetMeta;
            ability: AbilityMeta;
            blob: string;
        }[] = [];

        for (const ability of Object.values(ABILITIES)) {
            const set = ABILITY_SETS[ability.setId];
            if (!set) continue;
            result.push({
                set,
                ability,
                blob: abilityBlob(ability, set),
            });
        }

        result.sort((a, b) => {
            const n = a.ability.name.localeCompare(b.ability.name);
            if (n !== 0) return n;
            return a.set.name.localeCompare(b.set.name);
        });

        return result;
    }, []);

    // RetroAchievements: ONLY from GLOBAL_RETRO_ACHIEVEMENTS, mark missable via missableRetroIds
    const retroWithBlob = React.useMemo(() => {
        const list: RetroEntry[] = [];

        for (const g of GLOBAL_RETRO_ACHIEVEMENTS as GlobalRetroAchievement[]) {
            const ach: RetroAchievement = {
                id: g.id,
                name: g.name,
                description: g.description,
                missable:
                    missableRetroIds.has(g.id) ||
                    (g as any).missable === true,
            };

            const sourceLabel = g.category;
            const key = g.id;

            list.push({
                key,
                sourceLabel,
                ach,
                blob: `${sourceLabel ?? ""} ${ach.name} ${ach.description}`.toLowerCase(),
            });
        }

        // Alphabetical by achievement name
        list.sort((a, b) => a.ach.name.localeCompare(b.ach.name));
        return list;
    }, [missableRetroIds]);

    const q = query.trim().toLowerCase();

    const filteredMissions = React.useMemo(
        () =>
            !q
                ? missionsWithBlob
                : missionsWithBlob.filter((m) => m.blob.includes(q)),
        [missionsWithBlob, q],
    );

    const filteredEquipment = React.useMemo(
        () =>
            !q
                ? equipmentWithBlob
                : equipmentWithBlob.filter((e) => e.blob.includes(q)),
        [equipmentWithBlob, q],
    );

    const filteredAbilities = React.useMemo(
        () =>
            !q
                ? abilitiesWithBlob
                : abilitiesWithBlob.filter((a) => a.blob.includes(q)),
        [abilitiesWithBlob, q],
    );

    const filteredRetros = React.useMemo(
        () =>
            !q
                ? retroWithBlob
                : retroWithBlob.filter((r) => r.blob.includes(q)),
        [retroWithBlob, q],
    );

    function renderChevron(isOpen: boolean) {
        return isOpen ? (
            <svg
                className="h-3 w-3 text-zinc-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="m18 15-6-6-6 6" />
            </svg>
        ) : (
            <svg
                className="h-3 w-3 text-zinc-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="m6 9 6 6 6-6" />
            </svg>
        );
    }

    if (!open) {
        // Collapsed pill
        return (
            <button
                type="button"
                onClick={() => setOpen(true)}
                className="
                    fixed bottom-4 right-4 z-40
                    inline-flex items-center gap-2
                    rounded-full
                    bg-emerald-600/90 hover:bg-emerald-500
                    px-3 py-1.5
                    text-xs font-semibold text-white
                    shadow-lg shadow-emerald-500/30
                    border border-emerald-300/50
                "
            >
                <svg
                    className="h-3.5 w-3.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.3-4.3" />
                </svg>
                <span>Global search</span>
            </button>
        );
    }

    return (
        <div className="fixed inset-0 z-40 flex items-end sm:items-center justify-center">
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={() => setOpen(false)}
            />
            <div className="relative w-full max-w-5xl max-h-[90vh] rounded-t-2xl sm:rounded-2xl bg-zinc-950/95 border border-zinc-800 shadow-2xl shadow-black/60 overflow-hidden flex flex-col">
                {/* Header */}
                <div className="flex items-center gap-3 px-4 sm:px-5 py-3 border-b border-zinc-800/80 bg-zinc-950">
                    <svg
                        className="h-4 w-4 text-emerald-300"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <circle cx="11" cy="11" r="8" />
                        <path d="m21 21-4.3-4.3" />
                    </svg>
                    <div className="flex-1 flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                            <h2 className="text-xs sm:text-sm font-semibold text-zinc-100">
                                Global search
                            </h2>
                            <span className="text-[0.6rem] uppercase tracking-[0.16em] text-emerald-300">
                                Missions • Equipment • Abilities • Retro
                            </span>
                        </div>
                        <div className="flex items-center gap-2 bg-zinc-900/80 border border-zinc-800/80 rounded-md px-2 py-1">
                            <svg
                                className="h-3.5 w-3.5 text-zinc-500"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <circle cx="11" cy="11" r="8" />
                                <path d="m21 21-4.3-4.3" />
                            </svg>
                            <input
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search missions, equipment, abilities, and RetroAchievements..."
                                className="bg-transparent border-none outline-none text-xs sm:text-sm text-zinc-100 placeholder:text-zinc-500 flex-1"
                                autoFocus
                            />
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={() => setOpen(false)}
                        className="ml-2 rounded-md p-1.5 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/80"
                    >
                        <svg
                            className="h-4 w-4"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M18 6 6 18" />
                            <path d="m6 6 12 12" />
                        </svg>
                    </button>
                </div>

                {/* Tabs */}
                <div className="border-b border-zinc-800/80 bg-zinc-950/90 px-4 sm:px-5">
                    <div className="flex gap-2 py-2 text-[0.7rem] sm:text-xs">
                        {(
                            [
                                ["missions", "Missions"],
                                ["equipment", "Equipment"],
                                ["abilities", "Abilities"],
                                ["retros", "Retro"],
                            ] as [TabKey, string][]
                        ).map(([key, label]) => {
                            const isActive = tab === key;
                            return (
                                <button
                                    key={key}
                                    type="button"
                                    onClick={() => setTab(key)}
                                    className={[
                                        "px-2.5 py-1 rounded-full border text-[0.7rem]",
                                        isActive
                                            ? "border-emerald-400 bg-emerald-500/20 text-emerald-100"
                                            : "border-zinc-700/80 bg-zinc-900/70 text-zinc-300 hover:border-zinc-500",
                                    ].join(" ")}
                                >
                                    {label}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Body */}
                <div className="flex-1 overflow-y-auto px-4 sm:px-5 py-3 space-y-3 text-[0.75rem]">
                    {/* MISSIONS TAB */}
                    {tab === "missions" && (
                        <>
                            {filteredMissions.length === 0 ? (
                                <p className="text-zinc-500">
                                    No missions match your search.
                                </p>
                            ) : (
                                <ul className="space-y-1.5">
                                    {filteredMissions.map(({ mission }) => {
                                        const isOpen =
                                            openMissions[mission.id] ??
                                            false;

                                        const hasDispatch =
                                            mission.requiredItems ||
                                            (mission.requiredTalents &&
                                                (mission.requiredTalents
                                                    .negotiation ||
                                                    mission.requiredTalents
                                                        .aptitude ||
                                                    mission.requiredTalents
                                                        .teamwork ||
                                                    mission.requiredTalents
                                                        .adaptability)) ||
                                            (mission.dispatchRecommended &&
                                                mission.dispatchRecommended
                                                    .length > 0);

                                        const hasRewards = !!mission.rewards;
                                        const hasEnemies =
                                            mission.enemies &&
                                            mission.enemies.length > 0;

                                        const retroList =
                                            RETRO_ACHIEVEMENTS_BY_MISSION_ID[
                                                mission.id
                                            ] ?? [];
                                        const hasRetro =
                                            retroList.length > 0;

                                        return (
                                            <li
                                                key={mission.id}
                                                className="border border-zinc-800/80 rounded-md bg-zinc-950/60"
                                            >
                                                {/* Row header: id, name, rank, missable */}
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setOpenMissions(
                                                            (prev) => ({
                                                                ...prev,
                                                                [mission.id]:
                                                                    !isOpen,
                                                            }),
                                                        )
                                                    }
                                                    className="w-full px-2.5 py-2 flex items-center justify-between gap-2 text-left"
                                                >
                                                    <div className="flex flex-col gap-0.5">
                                                        <div className="flex items-center gap-1.5">
                                                            <span className="text-[0.65rem] font-mono text-zinc-400">
                                                                {mission.id}
                                                            </span>
                                                            <span className="font-semibold text-zinc-50">
                                                                {mission.name}
                                                            </span>
                                                        </div>
                                                        <div className="flex flex-wrap items-center gap-1.5">
                                                            {mission.questType && (
                                                                <span className="inline-flex items-center rounded-full bg-zinc-900/80 border border-zinc-700/80 px-1.5 py-px text-[0.6rem] uppercase tracking-[0.14em] text-zinc-300">
                                                                    {
                                                                        mission.questType
                                                                    }
                                                                </span>
                                                            )}
                                                            {mission.region && (
                                                                <span className="inline-flex items-center rounded-full bg-zinc-900/80 border border-zinc-700/80 px-1.5 py-px text-[0.6rem] uppercase tracking-[0.14em] text-zinc-300">
                                                                    {
                                                                        mission.region
                                                                    }
                                                                </span>
                                                            )}
                                                            {mission.tags &&
                                                                mission.tags.map(
                                                                    (t) => (
                                                                        <span
                                                                            key={
                                                                                t
                                                                            }
                                                                            className="inline-flex items-center rounded-full bg-zinc-900/80 border border-zinc-700/80 px-1.5 py-px text-[0.6rem] uppercase tracking-[0.14em] text-zinc-400"
                                                                        >
                                                                            {t}
                                                                        </span>
                                                                    ),
                                                                )}
                                                            {mission.missable && (
                                                                <span className="inline-flex items-center rounded-full border border-rose-400/70 bg-rose-500/10 px-1.5 py-px text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-rose-300">
                                                                    Missable
                                                                </span>
                                                            )}
                                                            {hasRetro && (
                                                                <span className="inline-flex items-center rounded-full border border-emerald-400/70 bg-emerald-500/10 px-1.5 py-px text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-emerald-300">
                                                                    Retro
                                                                    goals
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <span className="flex items-center gap-1 text-[0.65rem] text-zinc-400">
                                                        <span>
                                                            {isOpen
                                                                ? "Hide details"
                                                                : "Show details"}
                                                        </span>
                                                        {renderChevron(isOpen)}
                                                    </span>
                                                </button>

                                                {isOpen && (
                                                    <div className="px-2.5 pb-2 pt-0.5 space-y-2 border-t border-zinc-800/80">
                                                        {mission.description && (
                                                            <p className="text-zinc-300 text-[0.75rem]">
                                                                {
                                                                    mission.description
                                                                }
                                                            </p>
                                                        )}

                                                        {/* Objective */}
                                                        {(mission as any)
                                                            .objective && (
                                                            <div className="text-[0.7rem] text-zinc-100">
                                                                <span className="text-zinc-400">
                                                                    Objective:
                                                                </span>{" "}
                                                                <span className="font-medium">
                                                                    {
                                                                        (
                                                                            mission as any
                                                                        )
                                                                            .objective
                                                                    }
                                                                </span>
                                                            </div>
                                                        )}

                                                        {/* Dispatch info */}
                                                        {hasDispatch && (
                                                            <CollapsibleSection
                                                                title="Dispatch requirements & hints"
                                                            >
                                                                {mission.requiredItems && (
                                                                    <div>
                                                                        <span className="text-zinc-400">
                                                                            Required items:
                                                                        </span>{" "}
                                                                        <span className="font-medium">
                                                                            {mission.requiredItems.join(
                                                                                ", ",
                                                                            )}
                                                                        </span>
                                                                    </div>
                                                                )}

                                                                {mission
                                                                    .requiredTalents && (
                                                                    <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-1">
                                                                        {mission
                                                                            .requiredTalents
                                                                            .negotiation && (
                                                                            <div>
                                                                                <span className="text-zinc-400">
                                                                                    Negotiation:
                                                                                </span>{" "}
                                                                                <span className="font-medium">
                                                                                    {
                                                                                        mission
                                                                                            .requiredTalents
                                                                                            .negotiation
                                                                                    }
                                                                                </span>
                                                                            </div>
                                                                        )}
                                                                        {mission
                                                                            .requiredTalents
                                                                            .aptitude && (
                                                                            <div>
                                                                                <span className="text-zinc-400">
                                                                                    Aptitude:
                                                                                </span>{" "}
                                                                                <span className="font-medium">
                                                                                    {
                                                                                        mission
                                                                                            .requiredTalents
                                                                                            .aptitude
                                                                                    }
                                                                                </span>
                                                                            </div>
                                                                        )}
                                                                        {mission
                                                                            .requiredTalents
                                                                            .teamwork && (
                                                                            <div>
                                                                                <span className="text-zinc-400">
                                                                                    Teamwork:
                                                                                </span>{" "}
                                                                                <span className="font-medium">
                                                                                    {
                                                                                        mission
                                                                                            .requiredTalents
                                                                                            .teamwork
                                                                                    }
                                                                                </span>
                                                                            </div>
                                                                        )}
                                                                        {mission
                                                                            .requiredTalents
                                                                            .adaptability && (
                                                                            <div>
                                                                                <span className="text-zinc-400">
                                                                                    Adaptability:
                                                                                </span>{" "}
                                                                                <span className="font-medium">
                                                                                    {
                                                                                        mission
                                                                                            .requiredTalents
                                                                                            .adaptability
                                                                                    }
                                                                                </span>
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                )}

                                                                {mission
                                                                    .dispatchRecommended &&
                                                                    mission
                                                                        .dispatchRecommended
                                                                        .length >
                                                                        0 && (
                                                                        <div className="mt-1">
                                                                            <span className="text-zinc-400">
                                                                                Recommended jobs:
                                                                            </span>{" "}
                                                                            <span className="font-medium">
                                                                                {mission.dispatchRecommended.join(
                                                                                    ", ",
                                                                                )}
                                                                            </span>
                                                                        </div>
                                                                    )}
                                                            </CollapsibleSection>
                                                        )}

                                                        {/* Rewards */}
                                                        {hasRewards && (
                                                            <CollapsibleSection title="Rewards">
                                                                {mission
                                                                    .rewards
                                                                    ?.gil && (
                                                                    <div>
                                                                        <span className="text-zinc-400">
                                                                            Gil:
                                                                        </span>{" "}
                                                                        <span className="font-medium">
                                                                            {
                                                                                mission
                                                                                    .rewards
                                                                                    .gil
                                                                            }
                                                                        </span>
                                                                    </div>
                                                                )}
                                                                {mission
                                                                    .rewards
                                                                    ?.items && (
                                                                    <div>
                                                                        <span className="text-zinc-400">
                                                                            Items:
                                                                        </span>{" "}
                                                                        <span className="font-medium">
                                                                            {mission.rewards.items.join(
                                                                                ", ",
                                                                            )}
                                                                        </span>
                                                                    </div>
                                                                )}
                                                                {mission
                                                                    .rewards
                                                                    ?.abilities && (
                                                                    <div>
                                                                        <span className="text-zinc-400">
                                                                            Abilities:
                                                                        </span>{" "}
                                                                        <span className="font-medium">
                                                                            {mission.rewards.abilities.join(
                                                                                ", ",
                                                                            )}
                                                                        </span>
                                                                    </div>
                                                                )}
                                                            </CollapsibleSection>
                                                        )}

                                                        {/* RetroAchievements for this mission */}
                                                        {hasRetro && (
                                                            <CollapsibleSection title="RetroAchievements for this mission">
                                                                <ul className="space-y-0.75 text-[0.7rem]">
                                                                    {retroList.map(
                                                                        (
                                                                            ach,
                                                                        ) => {
                                                                            const key = `retro:${ach.id}`;
                                                                            const isChecked =
                                                                                !!checked[
                                                                                    key
                                                                                ];

                                                                            return (
                                                                                <li
                                                                                    key={
                                                                                        ach.id
                                                                                    }
                                                                                >
                                                                                    <label className="flex items-start gap-2 cursor-pointer">
                                                                                        <input
                                                                                            type="checkbox"
                                                                                            className="mt-0.5 h-3.5 w-3.5 rounded border-zinc-400 text-emerald-500 focus:ring-emerald-500/70"
                                                                                            checked={
                                                                                                isChecked
                                                                                            }
                                                                                            onChange={(
                                                                                                e,
                                                                                            ) =>
                                                                                                setCheck(
                                                                                                    key,
                                                                                                    e
                                                                                                        .target
                                                                                                        .checked,
                                                                                                )
                                                                                            }
                                                                                        />
                                                                                        <div>
                                                                                            <div className="flex flex-wrap items-center gap-1">
                                                                                                <span className="font-medium">
                                                                                                    {
                                                                                                        ach.name
                                                                                                    }
                                                                                                </span>
                                                                                                {ach.missable && (
                                                                                                    <span className="inline-flex items-center rounded-full border border-rose-400/70 bg-rose-500/10 px-1.5 py-px text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-rose-300">
                                                                                                        Missable
                                                                                                    </span>
                                                                                                )}
                                                                                            </div>
                                                                                            <p className="text-zinc-300 text-[0.7rem]">
                                                                                                {
                                                                                                    ach.description
                                                                                                }
                                                                                            </p>
                                                                                        </div>
                                                                                    </label>
                                                                                </li>
                                                                            );
                                                                        },
                                                                    )}
                                                                </ul>
                                                            </CollapsibleSection>
                                                        )}

                                                        {/* Enemies – same level of detail as Mission Hub */}
                                                        {/* Enemies – section-level collapse, full loadout detail */}
                                                        {hasEnemies && (
                                                            <CollapsibleSection title="Enemies">
                                                                <ul className="space-y-1.25 text-[0.7rem] text-zinc-100">
                                                                    {mission.enemies!.map((enemy, idx) => {
                                                                        const loadout = resolveEnemyLoadout(enemy.abilities);
                                                                        const equip = resolveEnemyEquipment(enemy.equipment);

                                                                        const hasAbilities =
                                                                            !!loadout &&
                                                                            (Boolean(
                                                                                loadout.P ||
                                                                                loadout.A1 ||
                                                                                loadout.A2,
                                                                            ) ||
                                                                                Boolean(
                                                                                    loadout.R ||
                                                                                    loadout.S ||
                                                                                    loadout.C,
                                                                                ));

                                                                        const hasEquipment =
                                                                            !!equip &&
                                                                            (Boolean(
                                                                                equip.weapon ||
                                                                                equip.offhand,
                                                                            ) ||
                                                                                Boolean(
                                                                                    equip.head ||
                                                                                    equip.body ||
                                                                                    equip.accessory,
                                                                                ));

                                                                        return (
                                                                            <li
                                                                                key={
                                                                                    enemy.name ??
                                                                                    `${mission.id}-enemy-${idx}`
                                                                                }
                                                                                className="border border-zinc-800/80 rounded-md bg-zinc-950/50 px-2 py-1.5"
                                                                            >
                                                                                {/* Enemy header */}
                                                                                <div className="flex flex-wrap items-center justify-between gap-2">
                                                                                    <div className="flex flex-wrap items-center gap-1.5">
                                                                                        <span className="font-semibold text-zinc-50">
                                                                                            {enemy.name ??
                                                                                                `Enemy ${idx + 1}`}
                                                                                        </span>
                                                                                        {enemy.race && (
                                                                                            <span className="inline-flex items-center rounded-full bg-zinc-900/80 border border-zinc-700/80 px-1.5 py-px text-[0.6rem] uppercase tracking-[0.14em] text-zinc-300">
                                                                                                {
                                                                                                    enemy.race
                                                                                                }
                                                                                            </span>
                                                                                        )}
                                                                                        {enemy.job && (
                                                                                            <span className="inline-flex items-center rounded-full bg-zinc-900/80 border border-zinc-700/80 px-1.5 py-px text-[0.6rem] uppercase tracking-[0.14em] text-zinc-300">
                                                                                                {
                                                                                                    enemy.job
                                                                                                }
                                                                                            </span>
                                                                                        )}
                                                                                        {enemy.notes && (
                                                                                            <span className="text-[0.65rem] text-zinc-400">
                                                                                                {
                                                                                                    enemy.notes
                                                                                                }
                                                                                            </span>
                                                                                        )}
                                                                                    </div>
                                                                                </div>

                                                                                {/* Loadout */}
                                                                                {(hasAbilities || hasEquipment) && (
                                                                                    <div className="mt-1.5 grid grid-cols-1 sm:grid-cols-2 gap-2">
                                                                                        {/* Abilities */}
                                                                                        {hasAbilities && loadout && (
                                                                                            <div className="space-y-0.75">
                                                                                                {/* P */}
                                                                                                {loadout.P && (
                                                                                                    <div className="space-y-0.25">
                                                                                                        <div className="font-medium">
                                                                                                            P –{" "}
                                                                                                            {
                                                                                                                loadout
                                                                                                                    .P
                                                                                                                    .setName
                                                                                                            }
                                                                                                        </div>
                                                                                                        {loadout.P.setDescription && (
                                                                                                            <div className="text-zinc-300">
                                                                                                                {
                                                                                                                    loadout
                                                                                                                        .P
                                                                                                                        .setDescription
                                                                                                                }
                                                                                                            </div>
                                                                                                        )}
                                                                                                        {loadout.P.abilities &&
                                                                                                            loadout.P.abilities.length >
                                                                                                                0 && (
                                                                                                                <ul className="list-disc list-inside space-y-0.25">
                                                                                                                    {loadout.P.abilities.map(
                                                                                                                        (
                                                                                                                            ab,
                                                                                                                        ) => (
                                                                                                                            <li
                                                                                                                                key={
                                                                                                                                    ab.id
                                                                                                                                }
                                                                                                                            >
                                                                                                                                {
                                                                                                                                    ab.name
                                                                                                                                }
                                                                                                                            </li>
                                                                                                                        ),
                                                                                                                    )}
                                                                                                                </ul>
                                                                                                            )}
                                                                                                    </div>
                                                                                                )}

                                                                                                {/* A1 */}
                                                                                                {loadout.A1 && (
                                                                                                    <div className="space-y-0.25">
                                                                                                        <div className="font-medium">
                                                                                                            A1 –{" "}
                                                                                                            {
                                                                                                                loadout
                                                                                                                    .A1
                                                                                                                    .setName
                                                                                                            }
                                                                                                        </div>
                                                                                                        {loadout.A1.setDescription && (
                                                                                                            <div className="text-zinc-300">
                                                                                                                {
                                                                                                                    loadout
                                                                                                                        .A1
                                                                                                                        .setDescription
                                                                                                                }
                                                                                                            </div>
                                                                                                        )}
                                                                                                        {loadout.A1.abilities &&
                                                                                                            loadout.A1.abilities.length >
                                                                                                                0 && (
                                                                                                                <ul className="list-disc list-inside space-y-0.25">
                                                                                                                    {loadout.A1.abilities.map(
                                                                                                                        (
                                                                                                                            ab,
                                                                                                                        ) => (
                                                                                                                            <li
                                                                                                                                key={
                                                                                                                                    ab.id
                                                                                                                                }
                                                                                                                            >
                                                                                                                                {
                                                                                                                                    ab.name
                                                                                                                                }
                                                                                                                            </li>
                                                                                                                        ),
                                                                                                                    )}
                                                                                                                </ul>
                                                                                                            )}
                                                                                                    </div>
                                                                                                )}

                                                                                                {/* A2 */}
                                                                                                {loadout.A2 && (
                                                                                                    <div className="space-y-0.25">
                                                                                                        <div className="font-medium">
                                                                                                            A2 –{" "}
                                                                                                            {
                                                                                                                loadout
                                                                                                                    .A2
                                                                                                                    .setName
                                                                                                            }
                                                                                                        </div>
                                                                                                        {loadout.A2.setDescription && (
                                                                                                            <div className="text-zinc-300">
                                                                                                                {
                                                                                                                    loadout
                                                                                                                        .A2
                                                                                                                        .setDescription
                                                                                                                }
                                                                                                            </div>
                                                                                                        )}
                                                                                                        {loadout.A2.abilities &&
                                                                                                            loadout.A2.abilities.length >
                                                                                                                0 && (
                                                                                                                <ul className="list-disc list-inside space-y-0.25">
                                                                                                                    {loadout.A2.abilities.map(
                                                                                                                        (
                                                                                                                            ab,
                                                                                                                        ) => (
                                                                                                                            <li
                                                                                                                                key={
                                                                                                                                    ab.id
                                                                                                                                }
                                                                                                                            >
                                                                                                                                {
                                                                                                                                    ab.name
                                                                                                                                }
                                                                                                                            </li>
                                                                                                                        ),
                                                                                                                    )}
                                                                                                                </ul>
                                                                                                            )}
                                                                                                    </div>
                                                                                                )}

                                                                                                {/* R / S / C */}
                                                                                                {(loadout.R ||
                                                                                                    loadout.S ||
                                                                                                    loadout.C) && (
                                                                                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 text-[0.65rem]">
                                                                                                        {loadout.R && (
                                                                                                            <div>
                                                                                                                <div className="font-medium">
                                                                                                                    R
                                                                                                                </div>
                                                                                                                <div className="text-zinc-300">
                                                                                                                    {
                                                                                                                        loadout
                                                                                                                            .R
                                                                                                                    }
                                                                                                                </div>
                                                                                                            </div>
                                                                                                        )}
                                                                                                        {loadout.S && (
                                                                                                            <div>
                                                                                                                <div className="font-medium">
                                                                                                                    S
                                                                                                                </div>
                                                                                                                <div className="text-zinc-300">
                                                                                                                    {
                                                                                                                        loadout
                                                                                                                            .S
                                                                                                                    }
                                                                                                                </div>
                                                                                                            </div>
                                                                                                        )}
                                                                                                        {loadout.C && (
                                                                                                            <div>
                                                                                                                <div className="font-medium">
                                                                                                                    C
                                                                                                                </div>
                                                                                                                <div className="text-zinc-300">
                                                                                                                    {
                                                                                                                        loadout
                                                                                                                            .C
                                                                                                                    }
                                                                                                                </div>
                                                                                                            </div>
                                                                                                        )}
                                                                                                    </div>
                                                                                                )}
                                                                                            </div>
                                                                                        )}

                                                                                        {/* Equipment */}
                                                                                        {hasEquipment && equip && (
                                                                                            <div className="space-y-0.75">
                                                                                                {equip.weapon && (
                                                                                                    <div>
                                                                                                        <span className="text-zinc-400">
                                                                                                            Weapon:
                                                                                                        </span>{" "}
                                                                                                        <span className="font-medium">
                                                                                                            {
                                                                                                                equip.weapon
                                                                                                            }
                                                                                                        </span>
                                                                                                    </div>
                                                                                                )}
                                                                                                {equip.offhand && (
                                                                                                    <div>
                                                                                                        <span className="text-zinc-400">
                                                                                                            Off-hand:
                                                                                                        </span>{" "}
                                                                                                        <span className="font-medium">
                                                                                                            {
                                                                                                                equip.offhand
                                                                                                            }
                                                                                                        </span>
                                                                                                    </div>
                                                                                                )}
                                                                                                {equip.head && (
                                                                                                    <div>
                                                                                                        <span className="text-zinc-400">
                                                                                                            Head:
                                                                                                        </span>{" "}
                                                                                                        <span className="font-medium">
                                                                                                            {
                                                                                                                equip.head
                                                                                                            }
                                                                                                        </span>
                                                                                                    </div>
                                                                                                )}
                                                                                                {equip.body && (
                                                                                                    <div>
                                                                                                        <span className="text-zinc-400">
                                                                                                            Body:
                                                                                                        </span>{" "}
                                                                                                        <span className="font-medium">
                                                                                                            {
                                                                                                                equip.body
                                                                                                            }
                                                                                                        </span>
                                                                                                    </div>
                                                                                                )}
                                                                                                {equip.accessory && (
                                                                                                    <div>
                                                                                                        <span className="text-zinc-400">
                                                                                                            Accessory:
                                                                                                        </span>{" "}
                                                                                                        <span className="font-medium">
                                                                                                            {
                                                                                                                equip.accessory
                                                                                                            }
                                                                                                        </span>
                                                                                                    </div>
                                                                                                )}
                                                                                            </div>
                                                                                        )}
                                                                                    </div>
                                                                                )}
                                                                            </li>
                                                                        );
                                                                    })}
                                                                </ul>
                                                            </CollapsibleSection>
                                                        )}
                                                    </div>
                                                )}
                                            </li>
                                        );
                                    })}
                                </ul>
                            )}
                        </>
                    )}

                    {/* EQUIPMENT TAB */}
                    {tab === "equipment" && (
                        <>
                            {filteredEquipment.length === 0 ? (
                                <p className="text-zinc-500">
                                    No equipment matches your search.
                                </p>
                            ) : (
                                <ul className="space-y-1.5">
                                    {filteredEquipment.map(({ item }) => {
                                        const isOpen =
                                            openEquipment[item.id] ?? false;

                                        return (
                                            <li
                                                key={item.id}
                                                className="border border-zinc-800/80 rounded-md bg-zinc-950/60"
                                            >
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setOpenEquipment(
                                                            (prev) => ({
                                                                ...prev,
                                                                [item.id]:
                                                                    !isOpen,
                                                            }),
                                                        )
                                                    }
                                                    className="w-full px-2.5 py-2 flex items-center justify-between gap-2 text-left"
                                                >
                                                    <div className="flex flex-col gap-0.5">
                                                        <span className="font-semibold text-zinc-50">
                                                            {item.name}
                                                        </span>
                                                        <span className="text-[0.65rem] text-zinc-400">
                                                            {item.category}
                                                        </span>
                                                    </div>
                                                    <span className="flex items-center gap-1 text-[0.65rem] text-zinc-400">
                                                        <span>
                                                            {isOpen
                                                                ? "Hide details"
                                                                : "Show details"}
                                                        </span>
                                                        {renderChevron(isOpen)}
                                                    </span>
                                                </button>
                                                {isOpen && (
                                                    <div className="px-2.5 pb-2 pt-0.5 space-y-1.5 border-t border-zinc-800/80 text-[0.7rem] text-zinc-100">
                                                        {item.description && (
                                                            <p className="text-zinc-300">
                                                                {
                                                                    item.description
                                                                }
                                                            </p>
                                                        )}

                                                        {item.stats && (
                                                            <div className="grid grid-cols-3 gap-x-3 gap-y-0.5">
                                                                {item.stats
                                                                    .atk && (
                                                                    <div>
                                                                        <span className="text-zinc-400">
                                                                            ATK:
                                                                        </span>{" "}
                                                                        <span className="font-medium">
                                                                            {
                                                                                item
                                                                                    .stats
                                                                                    .atk
                                                                            }
                                                                        </span>
                                                                    </div>
                                                                )}
                                                                {item.stats
                                                                    .mag && (
                                                                    <div>
                                                                        <span className="text-zinc-400">
                                                                            MAG:
                                                                        </span>{" "}
                                                                        <span className="font-medium">
                                                                            {
                                                                                item
                                                                                    .stats
                                                                                    .mag
                                                                            }
                                                                        </span>
                                                                    </div>
                                                                )}
                                                                {item.stats
                                                                    .def && (
                                                                    <div>
                                                                        <span className="text-zinc-400">
                                                                            DEF:
                                                                        </span>{" "}
                                                                        <span className="font-medium">
                                                                            {
                                                                                item
                                                                                    .stats
                                                                                    .def
                                                                            }
                                                                        </span>
                                                                    </div>
                                                                )}
                                                                {item.stats
                                                                    .res && (
                                                                    <div>
                                                                        <span className="text-zinc-400">
                                                                            RES:
                                                                        </span>{" "}
                                                                        <span className="font-medium">
                                                                            {
                                                                                item
                                                                                    .stats
                                                                                    .res
                                                                            }
                                                                        </span>
                                                                    </div>
                                                                )}
                                                                {item.stats
                                                                    .spd && (
                                                                    <div>
                                                                        <span className="text-zinc-400">
                                                                            SPD:
                                                                        </span>{" "}
                                                                        <span className="font-medium">
                                                                            {
                                                                                item
                                                                                    .stats
                                                                                    .spd
                                                                            }
                                                                        </span>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        )}

                                                        {item.teaches && (
                                                            <CollapsibleSection title="Teaches">
                                                                <ul className="space-y-0.5">
                                                                    {Object.entries(
                                                                        item.teaches,
                                                                    ).map(
                                                                        ([
                                                                            job,
                                                                            ids,
                                                                        ]) => {
                                                                            const label =
                                                                                job;
                                                                            const abilities =
                                                                                (
                                                                                    ids as string[]
                                                                                )
                                                                                    .map(
                                                                                        (
                                                                                            id,
                                                                                        ) => {
                                                                                            const ab =
                                                                                                ABILITIES[
                                                                                                    id
                                                                                                ];
                                                                                            if (
                                                                                                !ab
                                                                                            )
                                                                                                return id;
                                                                                            const set =
                                                                                                ABILITY_SETS[
                                                                                                    ab
                                                                                                        .setId
                                                                                                ];
                                                                                            const setName =
                                                                                                set
                                                                                                    ?.name ??
                                                                                                ab.setId;
                                                                                            return `${ab.name} (${setName})`;
                                                                                        },
                                                                                    )
                                                                                    .join(
                                                                                        ", ",
                                                                                    );
                                                                            return (
                                                                                <li
                                                                                    key={
                                                                                        job
                                                                                    }
                                                                                >
                                                                                    <span className="text-zinc-400">
                                                                                        {
                                                                                            label
                                                                                        }
                                                                                        :
                                                                                    </span>{" "}
                                                                                    <span className="font-medium">
                                                                                        {
                                                                                            abilities
                                                                                        }
                                                                                    </span>
                                                                                </li>
                                                                            );
                                                                        },
                                                                    )}
                                                                </ul>
                                                            </CollapsibleSection>
                                                        )}
                                                    </div>
                                                )}
                                            </li>
                                        );
                                    })}
                                </ul>
                            )}
                        </>
                    )}

                    {/* ABILITIES TAB */}
                    {tab === "abilities" && (
                        <>
                            {filteredAbilities.length === 0 ? (
                                <p className="text-zinc-500">
                                    No abilities match your search.
                                </p>
                            ) : (
                                <ul className="space-y-1.5">
                                    {filteredAbilities.map(
                                        ({ set, ability }) => {
                                            const key = `${set.id}:${ability.id}`;
                                            const isOpen =
                                                openAbilities[key] ?? false;

                                            return (
                                                <li
                                                    key={key}
                                                    className="border border-zinc-800/80 rounded-md bg-zinc-950/60"
                                                >
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            setOpenAbilities(
                                                                (prev) => ({
                                                                    ...prev,
                                                                    [key]:
                                                                        !isOpen,
                                                                }),
                                                            )
                                                        }
                                                        className="w-full px-2.5 py-2 flex items-center justify-between gap-2 text-left"
                                                    >
                                                        <div className="flex flex-col gap-0.5">
                                                            <span className="font-semibold text-zinc-50">
                                                                {
                                                                    ability.name
                                                                }
                                                            </span>
                                                            <div className="flex flex-wrap items-center gap-1.5">
                                                                <span className="inline-flex items-center rounded-full bg-zinc-900/80 border border-zinc-700/80 px-1.5 py-px text-[0.6rem] uppercase tracking-[0.14em] text-zinc-300">
                                                                    {
                                                                        set.name
                                                                    }
                                                                </span>
                                                                {ability.job && (
                                                                    <span className="inline-flex items-center rounded-full bg-zinc-900/80 border border-zinc-700/80 px-1.5 py-px text-[0.6rem] uppercase tracking-[0.14em] text-zinc-300">
                                                                        {
                                                                            ability.job
                                                                        }
                                                                    </span>
                                                                )}
                                                                {ability.cost && (
                                                                    <span className="inline-flex items-center rounded-full bg-zinc-900/80 border border-zinc-700/80 px-1.5 py-px text-[0.6rem] uppercase tracking-[0.14em] text-zinc-300">
                                                                        {ability.cost}{" "}
                                                                        AP
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <span className="flex items-center gap-1 text-[0.65rem] text-zinc-400">
                                                            <span>
                                                                {isOpen
                                                                    ? "Hide details"
                                                                    : "Show details"}
                                                            </span>
                                                            {renderChevron(
                                                                isOpen,
                                                            )}
                                                        </span>
                                                    </button>
                                                    {isOpen && (
                                                        <div className="px-2.5 pb-2 pt-0.5 space-y-1.5 border-t border-zinc-800/80 text-[0.7rem] text-zinc-100">
                                                            {ability.description && (
                                                                <p className="text-zinc-300">
                                                                    {
                                                                        ability.description
                                                                    }
                                                                </p>
                                                            )}

                                                            {(ability.element ||
                                                                ability.inflicts ||
                                                                ability.immune) && (
                                                                <div className="flex flex-wrap gap-1">
                                                                    {ability.element && (
                                                                        <span className="inline-flex items-center rounded-full bg-zinc-900/80 border border-zinc-700/80 px-1.5 py-px text-[0.6rem] uppercase tracking-[0.14em] text-zinc-300">
                                                                            Element:{" "}
                                                                            {ability.element.join(
                                                                                ", ",
                                                                            )}
                                                                        </span>
                                                                    )}
                                                                    {ability.inflicts && (
                                                                        <span className="inline-flex items-center rounded-full bg-zinc-900/80 border border-zinc-700/80 px-1.5 py-px text-[0.6rem] uppercase tracking-[0.14em] text-zinc-300">
                                                                            Inflicts:{" "}
                                                                            {ability.inflicts.join(
                                                                                ", ",
                                                                            )}
                                                                        </span>
                                                                    )}
                                                                    {ability.immune && (
                                                                        <span className="inline-flex items-center rounded-full bg-zinc-900/80 border border-zinc-700/80 px-1.5 py-px text-[0.6rem] uppercase tracking-[0.14em] text-zinc-300">
                                                                            Grants
                                                                            immunity
                                                                            to:{" "}
                                                                            {ability.immune.join(
                                                                                ", ",
                                                                            )}
                                                                        </span>
                                                                    )}
                                                                </div>
                                                            )}

                                                            {(ability.requires ||
                                                                ability.equipmentRequired) && (
                                                                <div className="space-y-0.5">
                                                                    {ability.requires && (
                                                                        <div>
                                                                            <span className="text-zinc-400">
                                                                                Requires:
                                                                            </span>{" "}
                                                                            <span className="font-medium">
                                                                                {ability.requires.join(
                                                                                    ", ",
                                                                                )}
                                                                            </span>
                                                                        </div>
                                                                    )}
                                                                    {ability.equipmentRequired && (
                                                                        <div>
                                                                            <span className="text-zinc-400">
                                                                                Req. equipment:
                                                                            </span>{" "}
                                                                            <span className="font-medium">
                                                                                {ability.equipmentRequired.join(
                                                                                    ", ",
                                                                                )}
                                                                            </span>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}
                                                </li>
                                            );
                                        },
                                    )}
                                </ul>
                            )}
                        </>
                    )}

                    {/* RETROACHIEVEMENTS TAB (GLOBAL LIST ONLY) */}
                    {tab === "retros" && (
                        <>
                            {filteredRetros.length === 0 ? (
                                <p className="text-zinc-500">
                                    No RetroAchievements match your search.
                                </p>
                            ) : (
                                <ul className="space-y-1.5">
                                    {filteredRetros.map((entry) => {
                                        const { key, ach, sourceLabel } =
                                            entry;
                                        const isOpen =
                                            openRetros[key] ?? false;
                                        const progressKey = `retro:${ach.id}`;
                                        const isChecked =
                                            !!checked[progressKey];

                                        return (
                                            <li
                                                key={key}
                                                className="border border-zinc-800/80 rounded-md bg-zinc-950/60"
                                            >
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setOpenRetros(
                                                            (prev) => ({
                                                                ...prev,
                                                                [key]:
                                                                    !isOpen,
                                                            }),
                                                        )
                                                    }
                                                    className="w-full px-2.5 py-2 flex items-center justify-between gap-2 text-left"
                                                >
                                                    <div className="flex items-start gap-2">
                                                        <input
                                                            type="checkbox"
                                                            className="mt-0.5 h-3.5 w-3.5 rounded border-zinc-500 text-emerald-500 focus:ring-emerald-500/70"
                                                            checked={
                                                                isChecked
                                                            }
                                                            onChange={(e) =>
                                                                setCheck(
                                                                    progressKey,
                                                                    e.target
                                                                        .checked,
                                                                )
                                                            }
                                                            onClick={(e) =>
                                                                e.stopPropagation()
                                                            }
                                                        />
                                                        <div className="flex flex-col gap-0.5">
                                                            <span className="font-semibold text-zinc-50">
                                                                {ach.name}
                                                            </span>
                                                            {sourceLabel && (
                                                                <span className="text-[0.65rem] text-zinc-400">
                                                                    {
                                                                        sourceLabel
                                                                    }
                                                                </span>
                                                            )}
                                                            {ach.missable && (
                                                                <span className="inline-flex items-center rounded-full border border-rose-400/70 bg-rose-500/10 px-1.5 py-px text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-rose-300">
                                                                    Missable
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <span className="flex items-center gap-1 text-[0.65rem] text-zinc-400">
                                                        <span>
                                                            {isOpen
                                                                ? "Hide details"
                                                                : "Show details"}
                                                        </span>
                                                        {renderChevron(isOpen)}
                                                    </span>
                                                </button>

                                                {isOpen && (
                                                    <div className="px-2.5 pb-2 pt-0.5 space-y-1.5 border-t border-zinc-800/80">
                                                        <p className="text-zinc-300 text-[0.75rem]">
                                                            {
                                                                ach.description
                                                            }
                                                        </p>
                                                        {ach.missable && (
                                                            <div className="text-[0.7rem] text-rose-300">
                                                                This RetroAchievement
                                                                is missable.
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                            </li>
                                        );
                                    })}
                                </ul>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

