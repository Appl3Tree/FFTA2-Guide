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
import { RETRO_ACHIEVEMENTS_BY_MISSION_ID } from "../../data/retroAchievements";

type RetroAchievement = {
    id: string;
    name: string;
    description: string;
    missable?: boolean;
};

type TabKey = "missions" | "equipment" | "abilities" | "retros";

interface RetroEntry {
    missionId: string;
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
    return parts.join(" ").toLowerCase();
}

function equipmentBlob(item: EquipmentMeta): string {
    const parts: string[] = [];
    parts.push(item.name);
    if (item.category) parts.push(item.category);
    if ((item as any).weaponType) parts.push((item as any).weaponType);
    if ((item as any).helmetType) parts.push((item as any).helmetType);
    if ((item as any).armorType) parts.push((item as any).armorType);
    if ((item as any).accessoryType) parts.push((item as any).accessoryType);
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

function retroBlob(missionId: string, ach: RetroAchievement): string {
    const parts: string[] = [];
    parts.push(missionId, ach.name, ach.description);
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

    const missionsWithBlob = React.useMemo(
        () =>
            ALL_MISSIONS.map((m) => ({
                mission: m,
                blob: missionBlob(m),
            })),
        [],
    );

    const equipmentWithBlob = React.useMemo(
        () =>
            Object.values(EQUIPMENT).map((item) => ({
                item,
                blob: equipmentBlob(item),
            })),
        [],
    );

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
            const s = a.set.name.localeCompare(b.set.name);
            if (s !== 0) return s;
            return a.ability.name.localeCompare(b.ability.name);
        });

        return result;
    }, []);

    const retroWithBlob = React.useMemo(() => {
        const list: RetroEntry[] = [];

        for (const [missionId, arr] of Object.entries(
            RETRO_ACHIEVEMENTS_BY_MISSION_ID,
        )) {
            for (const ach of arr as RetroAchievement[]) {
                list.push({
                    missionId,
                    ach,
                    blob: retroBlob(missionId, ach),
                });
            }
        }

        list.sort((a, b) => {
            const m = a.missionId.localeCompare(b.missionId);
            if (m !== 0) return m;
            return a.ach.name.localeCompare(b.ach.name);
        });

        return list;
    }, []);

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

    const renderChevron = (isOpen: boolean) => (
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
        )
    );

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
                            Missions • Equipment • Abilities • RAs
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
                                            openMissions[mission.id] ?? false;
                                        return (
                                            <li
                                                key={mission.id}
                                                className="border border-zinc-800/80 rounded-md bg-zinc-950/60"
                                            >
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
                                                        {mission.region && (
                                                            <span className="text-[0.65rem] text-zinc-400">
                                                                {mission.region}
                                                            </span>
                                                        )}
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
                                                        {mission.description && (
                                                            <p className="text-zinc-300">
                                                                {
                                                                    mission.description
                                                                }
                                                            </p>
                                                        )}

                                                        <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                                                            {mission.arc && (
                                                                <div>
                                                                    <span className="text-zinc-400">
                                                                        Arc:
                                                                    </span>{" "}
                                                                    <span className="font-medium">
                                                                        {
                                                                            mission.arc
                                                                        }
                                                                    </span>
                                                                </div>
                                                            )}
                                                            {mission.questType && (
                                                                <div>
                                                                    <span className="text-zinc-400">
                                                                        Type:
                                                                    </span>{" "}
                                                                    <span className="font-medium">
                                                                        {
                                                                            mission.questType
                                                                        }
                                                                    </span>
                                                                </div>
                                                            )}
                                                            {typeof mission.rank ===
                                                                "number" && (
                                                                <div>
                                                                    <span className="text-zinc-400">
                                                                        Rec.
                                                                        Lv.:
                                                                    </span>{" "}
                                                                    <span className="font-medium">
                                                                        ~
                                                                        {
                                                                            mission.rank
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
                                                        </div>

                                                        {(mission.tags &&
                                                            mission.tags
                                                                .length) ||
                                                        mission.rewards ? (
                                                            <div className="space-y-1">
                                                                {mission.tags &&
                                                                    mission
                                                                        .tags
                                                                        .length >
                                                                        0 && (
                                                                        <div>
                                                                            <span className="text-zinc-400">
                                                                                Tags:
                                                                            </span>{" "}
                                                                            <span className="text-zinc-200">
                                                                                {mission.tags.join(
                                                                                    ", ",
                                                                                )}
                                                                            </span>
                                                                        </div>
                                                                    )}
                                                                {mission.rewards && (
                                                                    <div>
                                                                        <span className="text-zinc-400">
                                                                            Rewards:
                                                                        </span>{" "}
                                                                        <span className="text-zinc-200">
                                                                            {mission
                                                                                .rewards
                                                                                .gil !=
                                                                                null &&
                                                                                `${mission.rewards.gil} gil`}
                                                                            {mission
                                                                                .rewards
                                                                                .cp !=
                                                                                null &&
                                                                                `, ${mission.rewards.cp} CP`}
                                                                            {mission
                                                                                .rewards
                                                                                .loot &&
                                                                                `, ${mission.rewards.loot}`}
                                                                            {mission
                                                                                .rewards
                                                                                .items &&
                                                                                `, ${mission.rewards.items}`}
                                                                        </span>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        ) : null}
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

                    {/* RETROACHIEVEMENTS TAB */}
                    {tab === "retros" && (
                        <>
                            {filteredRetros.length === 0 ? (
                                <p className="text-zinc-500">
                                    No RetroAchievements match your search.
                                </p>
                            ) : (
                                <ul className="space-y-1.5">
                                    {filteredRetros.map(
                                        ({ missionId, ach }) => {
                                            const key = ach.id;
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
                                                        <div className="flex flex-col gap-0.5">
                                                            <span className="font-semibold text-zinc-50">
                                                                {ach.name}
                                                            </span>
                                                            <span className="text-[0.65rem] text-zinc-400">
                                                                {missionId}
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
                                                            {renderChevron(
                                                                isOpen,
                                                            )}
                                                        </span>
                                                    </button>

                                                    {isOpen && (
                                                        <div className="px-2.5 pb-2 pt-0.5 space-y-1.5 border-t border-zinc-800/80">
                                                            <p className="text-zinc-300">
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
                                        },
                                    )}
                                </ul>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

