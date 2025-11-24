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
        for (const e of m.enemies) {
            if (e.name) parts.push(e.name);
            if (e.type) parts.push(e.type);
            if (e.notes) parts.push(e.notes);
        }
    }

    // We do NOT add per-mission RA here anymore; those live in GLOBAL_RETRO_ACHIEVEMENTS.

    return parts.join(" ").toLowerCase();
}

function equipmentBlob(item: EquipmentMeta): string {
    const parts: string[] = [];
    parts.push(item.name);
    if (item.category) parts.push(item.category);
    if ((item as any).weaponType) parts.push((item as any).weaponType);
    if ((item as any).helmetType) parts.push((item as any).helmetType);
    if ((item as any).armorType) parts.push((item as any).armorType);
    if ((item as any).accessoryType)
        parts.push((item as any).accessoryType);
    if (item.description) parts.push(item.description);
    if (item.notes) parts.push(item.notes);

    if (item.teaches) {
        for (const [job, ids] of Object.entries(item.teaches)) {
            parts.push(job);
            for (const id of ids) {
                const ab = ABILITIES[id];
                if (ab) {
                    parts.push(ab.name);
                    const set = ABILITY_SETS[ab.setId];
                    parts.push(set?.name ?? ab.setId);
                } else {
                    parts.push(id);
                }
            }
        }
    }

    return parts.join(" ").toLowerCase();
}

function abilityBlob(set: AbilitySetMeta, ability: AbilityMeta): string {
    const parts: string[] = [];
    parts.push(set.name);
    if (set.description) parts.push(set.description);
    parts.push(ability.name);
    if (ability.description) parts.push(ability.description);
    return parts.join(" ").toLowerCase();
}

function retroBlob(sourceLabel: string, ach: RetroAchievement): string {
    const parts: string[] = [];
    parts.push(sourceLabel, ach.name, ach.description);
    if (ach.missable) parts.push("missable");
    return parts.join(" ").toLowerCase();
}

export function GlobalSearchPanel() {
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
                    <span className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-zinc-300">
                        {title}
                    </span>
                    <span className="flex items-center gap-1 text-[0.65rem] text-zinc-400">
                        <span>{open ? "Hide" : "Show"}</span>
                        {renderChevron(open)}
                    </span>
                </button>
                {open && (
                    <div className="px-2.5 pb-2 pt-0.5 space-y-1.25 text-[0.7rem] text-zinc-200">
                        {children}
                    </div>
                )}
            </section>
        );
    }

    // MISSABLE set derived from quest-specific mapping
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
                .slice()
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((item) => ({
                    item,
                    blob: equipmentBlob(item),
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
                blob: abilityBlob(set, ability),
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
                blob: retroBlob(sourceLabel, ach),
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

    const panelClasses =
        "fixed bottom-4 right-4 z-40 w-full max-w-md sm:max-w-lg";

    const renderChevron = (isOpen: boolean) =>
        isOpen ? (
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
                    text-white
                    px-3 py-2
                    text-xs sm:text-sm
                    shadow-lg shadow-emerald-900/40
                "
            >
                <span className="inline-block h-2 w-2 rounded-full bg-emerald-200" />
                <span>Global Search</span>
            </button>
        );
    }

    return (
        <div className={panelClasses}>
            <div
                className="
                    rounded-2xl
                    border border-zinc-800/80
                    bg-zinc-950/95
                    shadow-xl shadow-black/40
                    overflow-hidden
                "
            >
                {/* Header */}
                <div className="px-3 sm:px-4 py-2.5 sm:py-3 bg-gradient-to-r from-emerald-600 to-sky-600 flex items-center justify-between gap-2">
                    <div className="flex flex-col">
                        <span className="text-xs font-semibold text-emerald-100 tracking-[0.16em] uppercase">
                            Global Search
                        </span>
                        <span className="text-sm sm:text-base font-semibold text-white">
                            Missions • Equipment • Abilities • RetroAchievements
                        </span>
                    </div>
                    <button
                        type="button"
                        onClick={() => setOpen(false)}
                        className="text-xs text-emerald-100 hover:text-white"
                    >
                        Close
                    </button>
                </div>

                {/* Search input */}
                <div className="px-3 sm:px-4 py-2.5 border-b border-zinc-800/80 bg-zinc-950">
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search anywhere in the guide..."
                        className="w-full rounded-md border border-zinc-700/80 bg-zinc-900/80 px-2.5 py-1.5 text-xs sm:text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-1 focus:ring-emerald-500/80 focus:border-emerald-500/80"
                    />
                </div>

                {/* Tabs */}
                <div className="px-3 sm:px-4 pt-2 flex gap-1 border-b border-zinc-800/80 bg-zinc-950/95">
                    {(
                        [
                            ["missions", "Missions", filteredMissions.length],
                            ["equipment", "Equipment", filteredEquipment.length],
                            ["abilities", "Abilities", filteredAbilities.length],
                            ["retros", "RetroAch.", filteredRetros.length],
                        ] as [TabKey, string, number][]
                    ).map(([key, label, count]) => (
                        <button
                            key={key}
                            type="button"
                            onClick={() => setTab(key)}
                            className={`
                                px-2.5 py-1.5 rounded-full text-[0.7rem] sm:text-xs
                                border
                                ${
                                    tab === key
                                        ? "bg-emerald-600/80 border-emerald-400 text-white"
                                        : "bg-zinc-900/70 border-zinc-700/80 text-zinc-300 hover:bg-zinc-800/80"
                                }
                            `}
                        >
                            {label}
                            <span className="ml-1 text-[0.65rem] opacity-80">
                                ({count})
                            </span>
                        </button>
                    ))}
                </div>

                {/* Results */}
                <div className="max-h-80 overflow-y-auto px-3 sm:px-4 py-3 text-[0.75rem] sm:text-xs text-zinc-100 space-y-2">
                    {/* MISSIONS TAB – mini cards with section hide/show */}
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
                                            openMissions[mission.id] ?? false;

                                        const hasRequirements =
                                            (mission.requiredItems &&
                                                mission.requiredItems.length >
                                                    0) ||
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
                                                        <span className="font-semibold text-zinc-50">
                                                            {mission.id} –{" "}
                                                            {mission.name}
                                                        </span>
                                                        <div className="flex flex-wrap items-center gap-1 text-[0.65rem] text-zinc-400">
                                                            {mission.arc && (
                                                                <span>
                                                                    {mission.arc}
                                                                </span>
                                                            )}
                                                            {mission.questType && (
                                                                <span>
                                                                    •{" "}
                                                                    {
                                                                        mission.questType
                                                                    }
                                                                </span>
                                                            )}
                                                            {mission.rank !=
                                                                null && (
                                                                <span>
                                                                    • Rec. Lv.{" "}
                                                                    {
                                                                        mission.rank
                                                                    }
                                                                </span>
                                                            )}
                                                            {mission.missable && (
                                                                <span className="inline-flex items-center rounded-full border border-rose-500/80 bg-rose-950/40 text-rose-300 px-1.5 py-px text-[0.6rem] uppercase tracking-[0.16em]">
                                                                    Missable
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <span className="flex items-center gap-1 text-[0.65rem] text-zinc-400 shrink-0">
                                                        <span>
                                                            {isOpen
                                                                ? "Hide details"
                                                                : "Show details"}
                                                        </span>
                                                        {renderChevron(isOpen)}
                                                    </span>
                                                </button>

                                                {isOpen && (
                                                    <div className="px-2.5 pb-2 pt-0.5 space-y-1.75 border-t border-zinc-800/80">
                                                        {/* Overview: description + basic meta */}
                                                        <CollapsibleSection
                                                            title="Overview"
                                                            defaultOpen
                                                        >
                                                            {mission.description && (
                                                                <p className="text-zinc-300 mb-1">
                                                                    {
                                                                        mission.description
                                                                    }
                                                                </p>
                                                            )}

                                                            <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                                                                {mission.location && (
                                                                    <div>
                                                                        <span className="text-zinc-400">
                                                                            Location:
                                                                        </span>{" "}
                                                                        <span className="font-medium">
                                                                            {
                                                                                mission.location
                                                                            }
                                                                        </span>
                                                                    </div>
                                                                )}
                                                                {mission.region && (
                                                                    <div>
                                                                        <span className="text-zinc-400">
                                                                            Region:
                                                                        </span>{" "}
                                                                        <span className="font-medium">
                                                                            {
                                                                                mission.region
                                                                            }
                                                                        </span>
                                                                    </div>
                                                                )}
                                                                {mission.objective && (
                                                                    <div className="col-span-2">
                                                                        <span className="text-zinc-400">
                                                                            Objective:
                                                                        </span>{" "}
                                                                        <span className="font-medium">
                                                                            {
                                                                                mission.objective
                                                                            }
                                                                        </span>
                                                                    </div>
                                                                )}
                                                                {mission.failure && (
                                                                    <div className="col-span-2">
                                                                        <span className="text-zinc-400">
                                                                            Fail:
                                                                        </span>{" "}
                                                                        <span className="font-medium">
                                                                            {
                                                                                mission.failure
                                                                            }
                                                                        </span>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </CollapsibleSection>

                                                        {/* Requirements: items, talents, dispatch */}
                                                        {hasRequirements && (
                                                            <CollapsibleSection title="Requirements">
                                                                {mission
                                                                    .requiredItems &&
                                                                    mission
                                                                        .requiredItems
                                                                        .length >
                                                                        0 && (
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
                                                                                Recommended for dispatch:
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
                                                                <div className="grid grid-cols-2 gap-x-4 gap-y-1">
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
                                                                        ?.exp && (
                                                                        <div>
                                                                            <span className="text-zinc-400">
                                                                                EXP:
                                                                            </span>{" "}
                                                                            <span className="font-medium">
                                                                                {
                                                                                    mission
                                                                                        .rewards
                                                                                        .exp
                                                                                }
                                                                            </span>
                                                                        </div>
                                                                    )}
                                                                    {mission
                                                                        .rewards
                                                                        ?.cp && (
                                                                        <div>
                                                                            <span className="text-zinc-400">
                                                                                Clan points:
                                                                            </span>{" "}
                                                                            <span className="font-medium">
                                                                                {
                                                                                    mission
                                                                                        .rewards
                                                                                        .cp
                                                                                }
                                                                            </span>
                                                                        </div>
                                                                    )}
                                                                    {mission
                                                                        .rewards
                                                                        ?.loot && (
                                                                        <div>
                                                                            <span className="text-zinc-400">
                                                                                Loot:
                                                                            </span>{" "}
                                                                            <span className="font-medium">
                                                                                {
                                                                                    mission
                                                                                        .rewards
                                                                                        .loot
                                                                                }
                                                                            </span>
                                                                        </div>
                                                                    )}
                                                                    {mission
                                                                        .rewards
                                                                        ?.items && (
                                                                        <div className="col-span-2">
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
                                                                </div>
                                                            </CollapsibleSection>
                                                        )}

                                                        {/* Mission-specific RetroAchievements */}
                                                        {hasRetro && (
                                                            <CollapsibleSection title="RetroAchievements">
                                                                <ul className="space-y-0.75">
                                                                    {retroList.map(
                                                                        (ach) => (
                                                                            <li
                                                                                key={
                                                                                    ach.id
                                                                                }
                                                                                className="flex flex-col"
                                                                            >
                                                                                <div className="flex flex-wrap items-center gap-1">
                                                                                    <span className="font-medium text-[0.7rem]">
                                                                                        {
                                                                                            ach.name
                                                                                        }
                                                                                    </span>
                                                                                    {ach.missable && (
                                                                                        <span className="inline-flex items-center rounded-full border border-rose-500/80 bg-rose-950/40 text-rose-300 px-1.5 py-px text-[0.6rem] uppercase tracking-[0.16em]">
                                                                                            Missable
                                                                                        </span>
                                                                                    )}
                                                                                </div>
                                                                                <span className="text-[0.65rem] text-zinc-400">
                                                                                    {
                                                                                        ach.description
                                                                                    }
                                                                                </span>
                                                                            </li>
                                                                        ),
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
                                                                            !!(loadout.A1 || loadout.A2 || loadout.R || loadout.P);
                                                                        const hasEquipment = equip.length > 0;
                                                                        const hasDetails = hasAbilities || hasEquipment;

                                                                        // If literally nothing to show for this enemy, skip
                                                                        if (!enemy.name && !enemy.type && !enemy.notes && !hasDetails) {
                                                                            return null;
                                                                        }

                                                                        return (
                                                                            <li
                                                                                key={idx}
                                                                                className="rounded-md border border-zinc-800/80 bg-zinc-950/90 px-2 py-1.5 space-y-0.75"
                                                                            >
                                                                                {/* header row: name + type */}
                                                                                <div className="flex flex-wrap items-center justify-between gap-2">
                                                                                    <div className="flex flex-wrap items-baseline gap-2">
                                                                                        {enemy.name && (
                                                                                            <span className="font-semibold text-zinc-50">
                                                                                                {enemy.name}
                                                                                            </span>
                                                                                        )}
                                                                                        {enemy.type && (
                                                                                            <span className="inline-flex items-center rounded-full border border-zinc-600/80 bg-zinc-900/80 px-1.5 py-0.5 text-[0.6rem] uppercase tracking-[0.16em] text-zinc-300">
                                                                                                {enemy.type}
                                                                                            </span>
                                                                                        )}
                                                                                    </div>
                                                                                </div>

                                                                                {/* notes */}
                                                                                {enemy.notes && (
                                                                                    <div className="text-[0.65rem] text-zinc-300">
                                                                                        {enemy.notes}
                                                                                    </div>
                                                                                )}

                                                                                {/* full loadout details – same level as Mission Hub */}
                                                                                {hasDetails && loadout && (
                                                                                    <div className="mt-0.5 space-y-0.75 text-[0.65rem] text-zinc-200">
                                                                                        {/* A1 */}
                                                                                        {loadout.A1 && (
                                                                                            <div className="space-y-0.25">
                                                                                                <div className="font-medium">
                                                                                                    A1 – {loadout.A1.setName}
                                                                                                </div>
                                                                                                {loadout.A1.abilities &&
                                                                                                    loadout.A1.abilities.length > 0 && (
                                                                                                        <ul className="list-disc list-inside space-y-0.25">
                                                                                                            {loadout.A1.abilities.map(
                                                                                                                (ab) => (
                                                                                                                    <li key={ab.id}>
                                                                                                                        <span className="font-medium">
                                                                                                                            {ab.name}
                                                                                                                        </span>
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
                                                                                                    A2 – {loadout.A2.setName}
                                                                                                </div>
                                                                                                {loadout.A2.setDescription && (
                                                                                                    <div className="text-zinc-300">
                                                                                                        {loadout.A2.setDescription}
                                                                                                    </div>
                                                                                                )}
                                                                                                {loadout.A2.abilities &&
                                                                                                    loadout.A2.abilities.length > 0 && (
                                                                                                        <ul className="list-disc list-inside space-y-0.25">
                                                                                                            {loadout.A2.abilities.map(
                                                                                                                (ab) => (
                                                                                                                    <li key={ab.id}>
                                                                                                                        <span className="font-medium">
                                                                                                                            {ab.name}
                                                                                                                        </span>
                                                                                                                        {ab.description && (
                                                                                                                            <span className="text-zinc-300">
                                                                                                                                {": "}
                                                                                                                                {
                                                                                                                                    ab.description
                                                                                                                                }
                                                                                                                            </span>
                                                                                                                        )}
                                                                                                                    </li>
                                                                                                                ),
                                                                                                            )}
                                                                                                        </ul>
                                                                                                    )}
                                                                                            </div>
                                                                                        )}

                                                                                        {/* R */}
                                                                                        {loadout.R && (
                                                                                            <div>
                                                                                                <span className="font-medium">
                                                                                                    R – {loadout.R.name}
                                                                                                </span>
                                                                                                {loadout.R.description && (
                                                                                                    <span className="text-zinc-300">
                                                                                                        {": "}
                                                                                                        {loadout.R.description}
                                                                                                    </span>
                                                                                                )}
                                                                                            </div>
                                                                                        )}

                                                                                        {/* P */}
                                                                                        {loadout.P && (
                                                                                            <div>
                                                                                                <span className="font-medium">
                                                                                                    P – {loadout.P.name}
                                                                                                </span>
                                                                                                {loadout.P.description && (
                                                                                                    <span className="text-zinc-300">
                                                                                                        {": "}
                                                                                                        {loadout.P.description}
                                                                                                    </span>
                                                                                                )}
                                                                                            </div>
                                                                                        )}

                                                                                        {/* Equipment */}
                                                                                        {hasEquipment && (
                                                                                            <div>
                                                                                                <span className="text-zinc-400">
                                                                                                    Equipment:
                                                                                                </span>{" "}
                                                                                                <span className="font-medium">
                                                                                                    {equip
                                                                                                        .map((e) => e.name)
                                                                                                        .join(", ")}
                                                                                                </span>
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
                    
                    {/* EQUIPMENT TAB (hub-level detail) */}
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
                                        const subtypes: string[] = [];
                                        if ((item as any).weaponType)
                                            subtypes.push(
                                                (item as any).weaponType,
                                            );
                                        if ((item as any).helmetType)
                                            subtypes.push(
                                                (item as any).helmetType,
                                            );
                                        if ((item as any).armorType)
                                            subtypes.push(
                                                (item as any).armorType,
                                            );
                                        if ((item as any).accessoryType)
                                            subtypes.push(
                                                (item as any).accessoryType,
                                            );

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
                                                            {item.category ??
                                                                "Other"}
                                                            {subtypes.length >
                                                                0 &&
                                                                ` • ${subtypes.join(
                                                                    ", ",
                                                                )}`}
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
                                                    <div className="px-2.5 pb-2 pt-0.5 space-y-1.5 border-t border-zinc-800/80">
                                                        {item.description && (
                                                            <p className="text-zinc-300">
                                                                {
                                                                    item.description
                                                                }
                                                            </p>
                                                        )}
                                                        {item.notes && (
                                                            <p className="text-zinc-400">
                                                                {item.notes}
                                                            </p>
                                                        )}

                                                        {item.teaches && (
                                                            <div className="text-[0.7rem] text-zinc-300 space-y-0.5">
                                                                <div className="font-medium text-zinc-100">
                                                                    Teaches:
                                                                </div>
                                                                <ul className="list-disc list-inside space-y-0.25">
                                                                    {Object.entries(
                                                                        item.teaches,
                                                                    ).map(
                                                                        ([
                                                                            job,
                                                                            ids,
                                                                        ]) => {
                                                                            const display =
                                                                                ids
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
                                                                                    <span className="font-medium">
                                                                                        {
                                                                                            job
                                                                                        }
                                                                                        :
                                                                                    </span>{" "}
                                                                                    {
                                                                                        display
                                                                                    }
                                                                                </li>
                                                                            );
                                                                        },
                                                                    )}
                                                                </ul>
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
                                                            <span className="text-[0.65rem] text-zinc-400">
                                                                {
                                                                    set.name
                                                                }
                                                            </span>
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
                                                        <div className="px-2.5 pb-2 pt-0.5 space-y-1.5 border-t border-zinc-800/80">
                                                            {set.description && (
                                                                <p className="text-[0.7rem] text-zinc-400">
                                                                    {
                                                                        set.description
                                                                    }
                                                                </p>
                                                            )}
                                                            {ability.description && (
                                                                <p className="text-zinc-300">
                                                                    {
                                                                        ability.description
                                                                    }
                                                                </p>
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

                                        return (
                                            <li
                                                key={key}
                                                className="border border-zinc-800/80 rounded-md bg-zinc-950/60"
                                            >
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setOpenRetros((prev) => ({
                                                            ...prev,
                                                            [key]: !isOpen,
                                                        }))
                                                    }
                                                    className="w-full px-2.5 py-2 flex items-center justify-between gap-2 text-left"
                                                >
                                                    <div className="flex flex-col gap-0.5">
                                                        <span className="font-semibold text-zinc-50">
                                                            {ach.name}
                                                        </span>
                                                        <span className="text-[0.65rem] text-zinc-400">
                                                            {sourceLabel}
                                                            {ach.missable &&
                                                                " • Missable"}
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
                                                    <div className="px-2.5 pb-2 pt-0.5 space-y-1.5 border-t border-zinc-800/80">
                                                        <p className="text-zinc-300">
                                                            {ach.description}
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

