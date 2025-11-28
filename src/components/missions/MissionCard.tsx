import React from "react";
import type { Mission } from "../../types/ffta2";
import { ChevronDown, ChevronUp } from "lucide-react";
import {
    MISSION_TAGS,
    type MissionTag,
} from "../../data/missions/missionTags";
import { RETRO_ACHIEVEMENTS_BY_MISSION_ID } from "../../data/retroAchievements";
import { useProgress } from "../ProgressContext";
import { resolveEnemyLoadout } from "../../utils/resolveAbilities";
import { resolveEnemyEquipment } from "../../utils/resolveEquipment";
import { ABILITIES, ABILITY_SETS } from "../../data/abilities/abilities";
import { getEnemyMetaForJob } from "../../data/bestiary/bestiary";

export function MissionCard({ mission }: { mission: Mission }) {
    const [open, setOpen] = React.useState(false);
    const [openEnemies, setOpenEnemies ] = React.useState<Record<number, boolean>>({});

    const toggleEnemyDetails = (index: number) => {
        setOpenEnemies((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
    };

    const {
        id,
        arc,
        name,
        description,
        objective,
        law,
        rank,
        region,
        fee,
        days,
        questType,
        canDispatch,
        canCancel,
        members,
        requiredItems,
        requiredTalents,
        dispatchRecommended,
        enemies,
        strategy,
        rewards,
        notes,
        tags,
    } = mission;

    const { checked, setCheck } = useProgress();

    const missionKey = `mission:${id}`;
    const isMissionChecked = !!checked[missionKey];

    // Merge tags from the mission data with overlay tags from MISSION_TAGS
    const explicitTags = (tags ?? []) as string[];
    const overlayTags = (MISSION_TAGS[id] ?? []) as MissionTag[];

    const allTags = Array.from(
        new Set<string>([...explicitTags, ...overlayTags]),
    );

    const visibleTags = allTags.filter((tag) => tag);

    const hasRequirements =
        (requiredItems && requiredItems.length > 0) ||
        (requiredTalents &&
            (requiredTalents.negotiation ||
                requiredTalents.aptitude ||
                requiredTalents.teamwork ||
                requiredTalents.adaptability)) ||
        (dispatchRecommended && dispatchRecommended.length > 0);

    const hasEnemies = enemies && enemies.length > 0;
    const hasStrategy = strategy && strategy.length > 0;
    const hasNotes = notes && notes.trim().length > 0;

    // Per-mission RetroAchievements
    const retroAchievements =
        RETRO_ACHIEVEMENTS_BY_MISSION_ID[id] ?? [];
    const hasRetroAchievements = retroAchievements.length > 0;

    // How many “primary” mid-row sections exist?
    const numPrimarySections =
        (hasRequirements ? 1 : 0) +
        (hasStrategy ? 1 : 0) +
        (hasRetroAchievements ? 1 : 0);

    const midGridClass =
        numPrimarySections <= 1
            ? "grid grid-cols-1 gap-3 sm:gap-4"
            : "grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4";

    const displayRank = rank != null ? `~${rank}` : "N/A";

    return (
        <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/80 overflow-hidden shadow-sm">
            {/* Header */}
            <div className="flex items-stretch bg-zinc-900/40">
                <button
                    type="button"
                    onClick={() => setOpen((prev) => !prev)}
                    className="flex-1 w-full flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 transition-colors text-left"
                >
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                        <span className="inline-flex items-center rounded-full px-2 py-0.5 text-[0.7rem] sm:text-xs font-mono tracking-tight text-zinc-100 border border-zinc-700/80">
                            {id}
                        </span>
                        <h3 className="text-sm sm:text-base font-semibold text-zinc-50">
                            {name}
                        </h3>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 text-[0.7rem] sm:text-xs">
                        {questType && (
                            <span className="inline-flex items-center rounded-full bg-zinc-800/90 text-zinc-100 px-2 py-0.5 border border-zinc-700/80">
                                <span className="mr-1 opacity-70">Type:</span>
                                {questType}
                            </span>
                        )}
                        {region && (
                            <span className="inline-flex items-center rounded-full bg-zinc-800/90 text-zinc-100 px-2 py-0.5 border border-zinc-700/80">
                                <span className="mr-1 opacity-70">Region:</span>
                                {region}
                            </span>
                        )}
                        {rank != null && (
                            <span className="inline-flex items-center rounded-full bg-amber-700/90 text-amber-50 px-2 py-0.5 border border-amber-500/80">
                                <span className="mr-1 opacity-80">Rec. Lv.</span>
                                {displayRank}
                            </span>
                        )}
                        {open ? (
                            <ChevronUp className="h-4 w-4 text-zinc-200 shrink-0" />
                        ) : (
                            <ChevronDown className="h-4 w-4 text-zinc-200 shrink-0" />
                        )}
                    </div>
                </button>

                <div className="pr-4 sm:pr-5 pl-2 sm:pl-3 py-3 sm:py-4 flex items-start">
                    <input
                        type="checkbox"
                        aria-label="Mark mission complete"
                        className="mt-0.5 h-4 w-4 accent-emerald-500 dark:accent-emerald-400"
                        checked={isMissionChecked}
                        onChange={() => {
                            setCheck(missionKey);
                            // If we just marked this as complete, collapse the details.
                            if (!isMissionChecked) {
                                setOpen(false);
                            }
                        }}
                        onClick={(e) => {
                            // Don’t let the checkbox click toggle the card open/closed.
                            e.stopPropagation();
                        }}
                    />
                </div>
            </div>

            {open && (
                <div className="px-4 sm:px-6 pb-4 sm:pb-6 pt-3 sm:pt-4 space-y-4 bg-zinc-950/95">
                    {/* Description / flavor text */}
                    {description && (
                        <p className="text-xs sm:text-sm text-zinc-200/90 italic">
                            {description}
                        </p>
                    )}

                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-[0.7rem] text-zinc-100">
                        {objective && (
                            <div>
                                <span className="text-zinc-400">Objective:</span>{" "}
                                <span className="font-medium">{objective}</span>
                            </div>
                        )}

                        {law && (
                            <div>
                                <span className="text-zinc-400">Law:</span>{" "}
                                <span className="font-medium">{law}</span>
                            </div>
                        )}
                    </div>

                    {/* Top meta grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
                        <section className="rounded-xl border border-zinc-800/80 bg-zinc-900/40 px-3 py-2.5 sm:px-4 sm:py-3">
                            <h4 className="text-[0.65rem] sm:text-xs font-semibold tracking-[0.16em] text-zinc-400 mb-1.5">
                                <u>QUEST BASICS</u>
                            </h4>
                            <dl className="space-y-1 text-xs sm:text-sm text-zinc-100">
                                <div className="flex justify-between gap-2">
                                    <dt className="text-zinc-400">Arc</dt>
                                    <dd className="font-medium">{arc}</dd>
                                </div>
                                {questType && (
                                    <div className="flex justify-between gap-2">
                                        <dt className="text-zinc-400">
                                            Type
                                        </dt>
                                        <dd className="font-medium">
                                            {questType}
                                        </dd>
                                    </div>
                                )}
                                {typeof members === "number" && (
                                    <div className="flex justify-between gap-2">
                                        <dt className="text-zinc-400">
                                            Members
                                        </dt>
                                        <dd className="font-medium">
                                            {members}
                                        </dd>
                                    </div>
                                )}
                            </dl>
                        </section>

                        <section className="rounded-xl border border-zinc-800/80 bg-zinc-900/40 px-3 py-2.5 sm:px-4 sm:py-3">
                            <h4 className="text-[0.65rem] sm:text-xs font-semibold tracking-[0.16em] text-zinc-400 mb-1.5">
                                <u>CONTRACT</u>
                            </h4>
                            <dl className="space-y-1 text-xs sm:text-sm text-zinc-100">
                                {typeof fee === "number" && (
                                    <div className="flex justify-between gap-2">
                                        <dt className="text-zinc-400">Fee</dt>
                                        <dd className="font-medium">
                                            {fee} gil
                                        </dd>
                                    </div>
                                )}
                                {typeof days === "number" && (
                                    <div className="flex justify-between gap-2">
                                        <dt className="text-zinc-400">
                                            Days
                                        </dt>
                                        <dd className="font-medium">
                                            {days}
                                        </dd>
                                    </div>
                                )}
                                <div className="flex justify-between gap-2">
                                    <dt className="text-zinc-400">
                                        Dispatch
                                    </dt>
                                    <dd className="font-medium">
                                        {canDispatch ? "Allowed" : "Not allowed"}
                                    </dd>
                                </div>
                                <div className="flex justify-between gap-2">
                                    <dt className="text-zinc-400">
                                        Cancel
                                    </dt>
                                    <dd className="font-medium">
                                        {canCancel ? "Allowed" : "Not allowed"}
                                    </dd>
                                </div>
                            </dl>
                        </section>

                        <section className="rounded-xl border border-zinc-800/80 bg-zinc-900/40 px-3 py-2.5 sm:px-4 sm:py-3">
                            <h4 className="text-[0.65rem] sm:text-xs font-semibold tracking-[0.16em] text-zinc-400 mb-1.5">
                                <u>REWARDS</u>
                            </h4>
                            <dl className="space-y-1 text-xs sm:text-sm text-zinc-100">
                                {rewards?.gil != null && (
                                    <div className="flex justify-between gap-2">
                                        <dt className="text-zinc-400">Gil</dt>
                                        <dd className="font-medium">
                                            {rewards.gil}
                                        </dd>
                                    </div>
                                )}
                                {rewards?.cp != null && (
                                    <div className="flex justify-between gap-2">
                                        <dt className="text-zinc-400">
                                            Clan Points
                                        </dt>
                                        <dd className="font-medium">
                                            {rewards.cp}
                                        </dd>
                                    </div>
                                )}
                                {rewards?.loot && (
                                    <div className="flex flex-col gap-0.5">
                                        <dt className="text-zinc-400">
                                            Loot
                                        </dt>
                                        <dd className="font-medium">
                                            {rewards.loot}
                                        </dd>
                                    </div>
                                )}
                                {rewards?.items && (
                                    <div className="flex flex-col gap-0.5">
                                        <dt className="text-zinc-400">
                                            Items
                                        </dt>
                                        <dd className="font-medium">
                                            {rewards.items}
                                        </dd>
                                    </div>
                                )}
                            </dl>
                        </section>
                    </div>

                    {/* Requirements + Strategy + RetroAchievements + Enemies / Notes */}
                    <div className={midGridClass}>
                        {hasRequirements && (
                            <section className="rounded-xl border border-zinc-800/80 bg-zinc-900/40 px-3 py-2.5 sm:px-4 sm:py-3">
                                <h4 className="text-[0.65rem] sm:text-xs font-semibold tracking-[0.16em] text-zinc-400 mb-1.5">
                                    <u>REQUIREMENTS</u>
                                </h4>
                                <div className="space-y-1.5 text-xs sm:text-sm text-zinc-100">
                                    {requiredItems &&
                                        requiredItems.length > 0 && (
                                            <div>
                                                <div className="text-zinc-400">
                                                    Items
                                                </div>
                                                <ul className="list-disc list-inside mt-0.5 space-y-0.5">
                                                    {requiredItems.map(
                                                        (item) => (
                                                            <li
                                                                key={item}
                                                                className="text-zinc-100"
                                                            >
                                                                {item}
                                                            </li>
                                                        ),
                                                    )}
                                                </ul>
                                            </div>
                                        )}

                                    {requiredTalents &&
                                        (requiredTalents.negotiation ||
                                            requiredTalents.aptitude ||
                                            requiredTalents.teamwork ||
                                            requiredTalents.adaptability) && (
                                            <div>
                                                <div className="text-zinc-400 mb-0.5">
                                                    Talents
                                                </div>
                                                <dl className="grid grid-cols-2 gap-x-4 gap-y-0.5">
                                                    {requiredTalents.negotiation ? (
                                                        <div className="flex gap-2">
                                                            <dt className="text-zinc-400">
                                                                Negotiation:
                                                            </dt>
                                                            <dd className="font-medium">
                                                                {
                                                                    requiredTalents.negotiation
                                                                }
                                                            </dd>
                                                        </div>
                                                    ) : null}
                                                    {requiredTalents.aptitude ? (
                                                        <div className="flex gap-2">
                                                            <dt className="text-zinc-400">
                                                                Aptitude:
                                                            </dt>
                                                            <dd className="font-medium">
                                                                {
                                                                    requiredTalents.aptitude
                                                                }
                                                            </dd>
                                                        </div>
                                                    ) : null}
                                                    {requiredTalents.teamwork ? (
                                                        <div className="flex gap-2">
                                                            <dt className="text-zinc-400">
                                                                Teamwork:
                                                            </dt>
                                                            <dd className="font-medium">
                                                                {
                                                                    requiredTalents.teamwork
                                                                }
                                                            </dd>
                                                        </div>
                                                    ) : null}
                                                    {requiredTalents.adaptability ? (
                                                        <div className="flex gap-2">
                                                            <dt className="text-zinc-400">
                                                                Adaptability:
                                                            </dt>
                                                            <dd className="font-medium">
                                                                {
                                                                    requiredTalents.adaptability
                                                                }
                                                            </dd>
                                                        </div>
                                                    ) : null}
                                                </dl>
                                            </div>
                                        )}

                                    {dispatchRecommended &&
                                        dispatchRecommended.length > 0 && (
                                            <div>
                                                <div className="text-zinc-400">
                                                    Recommended/Required Jobs
                                                </div>
                                                <div className="mt-0.5 flex flex-wrap gap-1">
                                                    {dispatchRecommended.map(
                                                        (job) => (
                                                            <span
                                                                key={job}
                                                                className="inline-flex items-center rounded-full bg-emerald-900/40 border border-emerald-700/70 px-2 py-0.5 text-[0.7rem] sm:text-xs text-emerald-100"
                                                            >
                                                                {job}
                                                            </span>
                                                        ),
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                </div>
                            </section>
                        )}

                        {hasStrategy && (
                            <section className="rounded-xl border border-zinc-800/80 bg-zinc-900/40 px-3 py-2.5 sm:px-4 sm:py-3">
                                <h4 className="text-[0.65rem] sm:text-xs font-semibold tracking-[0.16em] text-zinc-400 mb-1.5">
                                    <u>STRATEGY</u>
                                </h4>
                                <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm text-zinc-100">
                                    {strategy.map((line, idx) => (
                                        <li key={idx}>{line}</li>
                                    ))}
                                </ul>
                            </section>
                        )}

                        {hasRetroAchievements && (
                            <section className="rounded-xl border border-zinc-800/80 bg-zinc-900/40 px-3 py-2.5 sm:px-4 sm:py-3">
                                <h4 className="text-[0.65rem] sm:text-xs font-semibold tracking-[0.16em] text-zinc-400 mb-1.5">
                                    <u>RETROACHIEVEMENTS</u>
                                </h4>
                                <ul className="space-y-1.5 text-xs sm:text-sm text-zinc-100">
                                    {retroAchievements.map((ach) => (
                                        <li key={ach.id} className="flex items-start gap-2">
                                            <input
                                                type="checkbox"
                                                aria-label={`Mark RetroAchievement "${ach.name}" complete`}
                                                className="mt-0.5 h-3.5 w-3.5 accent-indigo-500 dark:accent-indigo-400"
                                                checked={!!checked[`retro:${ach.id}`]}
                                                onChange={() => setCheck(`retro:${ach.id}`)}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                }}
                                            />
                                            <div className="flex-1">
                                                <div className="flex items-center gap-1.5">
                                                    <span className="font-semibold">
                                                        {ach.name}
                                                    </span>
                                                    {ach.missable && (
                                                        <span className="inline-flex items-center rounded-full bg-rose-700 text-rose-50 px-1.5 py-0.5 text-[0.6rem] uppercase tracking-[0.16em]">
                                                            Missable
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="text-[0.7rem] sm:text-xs text-zinc-300">
                                                    {ach.description}
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                                <p className="mt-2 text-[0.65rem] sm:text-[0.7rem] text-zinc-400">
                                    These are optional challenge conditions from{" "}
                                    <span className="font-semibold">
                                        RetroAchievements
                                    </span>
                                    .
                                </p>
                            </section>
                        )}

                        {hasEnemies && (
                            <section className="rounded-xl border border-zinc-800/80 bg-zinc-900/40 px-3 py-2.5 sm:px-4 sm:py-3 md:col-span-2">
                                <h4 className="text-[0.65rem] sm:text-xs font-semibold tracking-[0.16em] text-zinc-400 mb-1.5">
                                    <u>ENEMIES</u>
                                </h4>
                                <ul className="space-y-2.5 text-xs sm:text-sm text-zinc-100">
                                    {enemies.map((enemy, idx) => {
                                        const loadout = resolveEnemyLoadout(enemy.abilities);
                                        const equip = resolveEnemyEquipment(enemy.equipment);
                                        const meta = getEnemyMetaForJob(enemy.job);

                                        const hasAbilities =
                                            !!loadout &&
                                            !!(loadout.A1 || loadout.A2 || loadout.R || loadout.P);

                                        const hasEquipment = equip.length > 0;
                                        const hasDetails = hasAbilities || hasEquipment;
                                        const isOpen = !!openEnemies[idx];

                                        const hasAffinities =
                                            (meta?.absorb?.length ?? 0) > 0 ||
                                            (meta?.immune?.length ?? 0) > 0 ||
                                            (meta?.half?.length ?? 0) > 0 ||
                                            (meta?.weak?.length ?? 0) > 0;

                                        const quantity = enemy.quantity ?? 1;

                                        return (
                                            <li
                                                key={idx}
                                                className="rounded-xl border border-zinc-800/80 bg-zinc-950/60 px-2.5 py-2.5 sm:px-3 sm:py-3 space-y-1.5"
                                            >
                                                {/* header row */}
                                                <div className="flex items-center justify-between gap-2">
                                                    <div className="flex flex-wrap items-baseline gap-2">
                                                        {enemy.name && (
                                                            <span className="font-semibold text-zinc-50">
                                                                {enemy.name}
                                                            </span>
                                                        )}
                                                        {enemy.job && (
                                                            <span className="inline-flex items-center rounded-full border border-zinc-700/80 px-1.5 py-0.5 text-[0.6rem] uppercase tracking-[0.16em] text-zinc-300">
                                                                {enemy.job}
                                                            </span>
                                                        )}

                                                        {/* Quantity pill (only show when > 1) */}
                                                        {quantity > 1 && (
                                                            <span className="inline-flex items-center rounded-full border border-zinc-700/80 px-1.5 py-0.5 text-[0.6rem] uppercase tracking-[0.16em] text-zinc-300">
                                                                ×{quantity}
                                                            </span>
                                                        )}
                                                    </div>

                                                    {hasDetails && (
                                                        <button
                                                            type="button"
                                                            onClick={() => toggleEnemyDetails(idx)}
                                                            className="inline-flex items-center gap-1 text-[0.65rem] uppercase tracking-[0.16em] text-zinc-400"
                                                        >
                                                            {isOpen ? "Hide" : "Show"} loadout
                                                            {isOpen ? (
                                                                <ChevronUp className="h-3.5 w-3.5" />
                                                            ) : (
                                                                <ChevronDown className="h-3.5 w-3.5" />
                                                            )}
                                                        </button>
                                                    )}
                                                </div>

                                                {/* Bestiary description (always visible) */}
                                                {meta?.description && (
                                                    <div className="text-[0.7rem] text-zinc-300">
                                                        {meta.description}
                                                    </div>
                                                )}

                                                {/* small notes line from mission data */}
                                                {enemy.notes && (
                                                    <div className="text-[0.7rem] text-zinc-300">
                                                        {enemy.notes}
                                                    </div>
                                                )}

                                                {/* details: affinities + abilities + equipment (only when expanded) */}
                                                {isOpen && hasDetails && (() => {
                                                    const hasBoth = hasAbilities && hasEquipment;
                                                    const gridClass = hasBoth
                                                        ? "grid grid-cols-1 md:grid-cols-2 gap-4"
                                                        : "grid grid-cols-1 gap-4";

                                                    return (
                                                        <div className="mt-1.5 text-[0.7rem] space-y-1.5">
                                                            {/* Bestiary elemental/status affinities (only when expanded) */}
                                                            {hasAffinities && (
                                                                <div className="text-[0.65rem] text-zinc-300 flex flex-wrap gap-x-4 gap-y-0.5">
                                                                    {(meta?.absorb?.length ?? 0) > 0 && (
                                                                        <div>
                                                                            <span className="text-zinc-400">
                                                                                Absorb:
                                                                            </span>{" "}
                                                                            <span className="font-medium">
                                                                                {meta!.absorb!.join(", ")}
                                                                            </span>
                                                                        </div>
                                                                    )}
                                                                    {(meta?.immune?.length ?? 0) > 0 && (
                                                                        <div>
                                                                            <span className="text-zinc-400">
                                                                                Immune:
                                                                            </span>{" "}
                                                                            <span className="font-medium">
                                                                                {meta!.immune!.join(", ")}
                                                                            </span>
                                                                        </div>
                                                                    )}
                                                                    {(meta?.half?.length ?? 0) > 0 && (
                                                                        <div>
                                                                            <span className="text-zinc-400">
                                                                                Resists:
                                                                            </span>{" "}
                                                                            <span className="font-medium">
                                                                                {meta!.half!.join(", ")}
                                                                            </span>
                                                                        </div>
                                                                    )}
                                                                    {(meta?.weak?.length ?? 0) > 0 && (
                                                                        <div>
                                                                            <span className="text-zinc-400">
                                                                                Weak:
                                                                            </span>{" "}
                                                                            <span className="font-medium">
                                                                                {meta!.weak!.join(", ")}
                                                                            </span>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            )}

                                                            <div className={gridClass}>
                                                                {/* ───────── ABILITIES COLUMN ───────── */}
                                                                {hasAbilities && loadout && (
                                                                    <div className="space-y-1.5">
                                                                        <div className="font-semibold text-zinc-200">
                                                                            Abilities
                                                                        </div>

                                                                        {/* A1 */}
                                                                        {loadout.A1 && (
                                                                            <div className="
                                                                                border border-zinc-800/80
                                                                                rounded-md
                                                                                bg-zinc-950/50
                                                                                p-2
                                                                                space-y-0.5
                                                                            ">
                                                                                <div className="font-medium">
                                                                                    A1: {loadout.A1.setName}
                                                                                </div>
                                                                                {loadout.A1.setDescription && (
                                                                                    <div className="text-zinc-300">
                                                                                        {loadout.A1.setDescription}
                                                                                    </div>
                                                                                )}
                                                                                <ul className="list-disc list-inside space-y-0.5">
                                                                                    {loadout.A1.abilities.map((ab) => (
                                                                                        <li key={ab.id}>
                                                                                            <span className="font-medium">{ab.name}</span>
                                                                                            {ab.description && (
                                                                                                <span className="text-zinc-300">
                                                                                                    {": "}
                                                                                                    {ab.description}
                                                                                                </span>
                                                                                            )}
                                                                                        </li>
                                                                                    ))}
                                                                                </ul>
                                                                            </div>
                                                                        )}

                                                                        {/* A2 */}
                                                                        {loadout.A2 && (
                                                                            <div className="
                                                                                border border-zinc-800/80
                                                                                rounded-md
                                                                                bg-zinc-950/50
                                                                                p-2
                                                                                space-y-0.5
                                                                            ">
                                                                                <div className="font-medium">
                                                                                    A2: {loadout.A2.setName}
                                                                                </div>
                                                                                <ul className="list-disc list-inside space-y-0.5">
                                                                                    {loadout.A2.abilities.map((ab) => (
                                                                                        <li key={ab.id}>
                                                                                            <span className="font-medium">{ab.name}</span>
                                                                                            {ab.description && (
                                                                                                <span className="text-zinc-300">
                                                                                                    {": "}
                                                                                                    {ab.description}
                                                                                                </span>
                                                                                            )}
                                                                                        </li>
                                                                                    ))}
                                                                                </ul>
                                                                            </div>
                                                                        )}

                                                                        {/* R */}
                                                                        {loadout.R && (
                                                                            <div className="
                                                                                border border-zinc-800/80
                                                                                rounded-md
                                                                                bg-zinc-950/50
                                                                                p-2
                                                                            ">
                                                                                <span className="font-medium">
                                                                                    R: {loadout.R.name}
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
                                                                            <div className="
                                                                                border border-zinc-800/80
                                                                                rounded-md
                                                                                bg-zinc-950/50
                                                                                p-2
                                                                            ">
                                                                                <span className="font-medium">
                                                                                    P: {loadout.P.name}
                                                                                </span>
                                                                                {loadout.P.description && (
                                                                                    <span className="text-zinc-300">
                                                                                        {": "}
                                                                                        {loadout.P.description}
                                                                                    </span>
                                                                                )}
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                )}

                                                                {/* ───────── EQUIPMENT COLUMN ───────── */}
                                                                {hasEquipment && (
                                                                    <div className="space-y-1.5">
                                                                        <div className="font-semibold text-zinc-200">
                                                                            Equipment
                                                                        </div>

                                                                        <ul className="space-y-1.5">
                                                                            {equip.map((item) => (
                                                                                <li
                                                                                    key={item.slot}
                                                                                    className="
                                                                                        border border-zinc-800/80
                                                                                        rounded-md
                                                                                        bg-zinc-950/50
                                                                                        p-2
                                                                                        space-y-0.5
                                                                                    "
                                                                                >
                                                                                    <div>
                                                                                        <span className="font-medium">
                                                                                            Slot {item.slot}:
                                                                                        </span>{" "}
                                                                                        {item.name}
                                                                                        {item.category && (
                                                                                            <span className="ml-1 text-zinc-400">
                                                                                                ({item.category})
                                                                                            </span>
                                                                                        )}
                                                                                    </div>

                                                                                    {item.description && (
                                                                                        <div className="text-zinc-400">
                                                                                            {item.description}
                                                                                        </div>
                                                                                    )}

                                                                                    {item.teaches && (
                                                                                        <div className="ml-4 text-zinc-400 text-[0.65rem]">
                                                                                            <div className="font-medium text-zinc-300">
                                                                                                Teaches:
                                                                                            </div>
                                                                                            <ul className="list-disc list-inside">
                                                                                                {Object.entries(item.teaches).map(
                                                                                                    ([job, abilityIds]) => {
                                                                                                        const display = abilityIds
                                                                                                            .map((id) => {
                                                                                                                const ability = ABILITIES[id];
                                                                                                                if (!ability) return id;
                                                                                                                const set = ABILITY_SETS[ability.setId];
                                                                                                                const setName = set?.name ?? ability.setId;
                                                                                                                return `${ability.name} (${setName})`;
                                                                                                            })
                                                                                                            .join(", ");

                                                                                                        return (
                                                                                                            <li key={job}>
                                                                                                                <span className="font-medium text-zinc-200">
                                                                                                                    {job}:
                                                                                                                </span>{" "}
                                                                                                                {display}
                                                                                                            </li>
                                                                                                        );
                                                                                                    },
                                                                                                )}
                                                                                            </ul>
                                                                                        </div>
                                                                                    )}
                                                                                </li>
                                                                            ))}
                                                                        </ul>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    );
                                                })()}
                                            </li>
                                        );
                                    })}
                                </ul>
                            </section>
                        )}

                        {hasNotes && (
                            <section className="rounded-xl border border-zinc-800/80 bg-zinc-900/40 px-3 py-2.5 sm:px-4 sm:py-3 md:col-span-2">
                                <h4 className="text-[0.65rem] sm:text-xs font-semibold tracking-[0.16em] text-zinc-400 mb-1.5">
                                    <u>NOTES</u>
                                </h4>
                                <p className="text-xs sm:text-sm text-zinc-100 whitespace-pre-line">
                                    {notes}
                                </p>
                            </section>
                        )}
                    </div>

                    {/* Tags (merged + filtered) */}
                    {visibleTags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-1 border-t border-zinc-900/70 mt-1">
                            {visibleTags.map((tag) => (
                                <span
                                    key={tag}
                                    className="inline-flex items-center rounded-full border border-zinc-700/80 bg-zinc-900/80 px-2 py-0.5 text-[0.65rem] sm:text-[0.7rem] uppercase tracking-[0.16em] text-zinc-300"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

