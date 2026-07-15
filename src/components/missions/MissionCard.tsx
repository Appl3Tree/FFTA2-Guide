import React from "react";
import type { Mission } from "../../types/ffta2";
import { ChevronDown, ChevronUp } from "lucide-react";
import {
    MISSION_TAGS,
    type MissionTag,
} from "../../data/missions/missionTags";
import { RETRO_ACHIEVEMENTS_BY_MISSION_ID } from "../../data/retroAchievements";
import { useProgress } from "../ProgressContext";
import { getEnemyMetaForJob } from "../../data/bestiary/bestiary";
import { getMissionPhaseSummary } from "../../utils/missionPhases";

function isGenericEnemyName(name?: string | null): boolean {
    if (!name) return true;
    return name.trim().toLowerCase() === "randomized name";
}

function getEnemyDisplayName(enemy: Mission["enemies"][number], fallback: string) {
    if (!isGenericEnemyName(enemy.name)) {
        return enemy.name!;
    }

    const parts = [enemy.race, enemy.job].filter(Boolean);
    return parts.length > 0 ? parts.join(" ") : fallback;
}

function getLawGuidance(law?: string): string | null {
    if (!law) return null;

    const normalized = law.toLowerCase();

    if (normalized.includes("targeting all units")) {
        return "Law reminder: avoid all-unit/full-field effects. Ordinary area attacks are only a law issue if the law also forbids targeting an area.";
    }

    if (normalized.includes("targeting an area") || normalized.includes("targeting area")) {
        return "Law reminder: avoid area or multi-tile targeting. Use single-target actions instead.";
    }

    if (normalized.includes("targeting distant units")) {
        return "Law reminder: target only adjacent or point-blank units; actions aimed two or more tiles away break the law.";
    }

    if (normalized.includes("targeting adjacent units")) {
        return "Law reminder: avoid point-blank or adjacent targeting. Use ranged, magick, or long-reach actions instead.";
    }

    if (normalized.includes("targeting self")) {
        return "Law reminder: avoid actions that target the user, including self-buffs and self-heals.";
    }

    if (normalized.includes("ranged weapons")) {
        return "Law reminder: bows, greatbows, guns, hand-cannons, and cards are forbidden; ranged spells and non-weapon skills are still separate from that weapon ban.";
    }

    if (normalized.includes("fire, ice, lightning")) {
        return "Law reminder: fire, ice, and lightning weapons or abilities are forbidden. Use neutral or other-element damage.";
    }

    if (normalized.includes("fire")) {
        return "Law reminder: avoid fire-element weapons and abilities.";
    }

    if (normalized.includes("ice")) {
        return "Law reminder: avoid ice-element weapons and abilities.";
    }

    if (normalized.includes("lightning")) {
        return "Law reminder: avoid lightning-element weapons and abilities.";
    }

    if (normalized.includes("restoring hp")) {
        return "Law reminder: HP restoration is forbidden, including Cure-style healing and healing items.";
    }

    if (normalized.includes("restoring mp")) {
        return "Law reminder: MP restoration is forbidden, including Ethers and MP-recovery actions.";
    }

    if (normalized.includes("using mp")) {
        return "Law reminder: avoid actions that consume MP. Favor basic attacks, weapon skills, and other MP-free options.";
    }

    if (normalized.includes("items")) {
        return "Law reminder: item use is forbidden. Bring ability-based recovery and utility instead.";
    }

    if (normalized.includes("buffs and debuffs")) {
        return "Law reminder: avoid both stat/status buffs and debuffs. Passive gear protection is safer than applying status effects.";
    }

    if (normalized.includes("receiving buffs and debuffs")) {
        return "Law reminder: do not let your units receive buffs or debuffs. Status immunity and prevention matter more than cleanup.";
    }

    if (normalized.includes("buffs")) {
        return "Law reminder: avoid buffing actions such as Haste, Protect, Shell, and similar positive statuses.";
    }

    if (normalized.includes("debuffs")) {
        return "Law reminder: avoid inflicting negative statuses or stat-down effects.";
    }

    if (normalized.includes("reaction abilities")) {
        return "Law reminder: unequip reaction abilities before entering so counters do not trigger a penalty.";
    }

    if (normalized.includes("opportunity commands")) {
        return "Law reminder: do not use Opportunity Commands, even when the prompt appears.";
    }

    if (normalized.includes("copycat")) {
        return "Law reminder: vary actions from turn to turn; repeating the previous unit's action breaks the law.";
    }

    if (normalized.includes("knockback")) {
        return "Law reminder: avoid abilities that push, rush, or knock targets back.";
    }

    if (normalized.includes("back attack")) {
        return "Law reminder: avoid striking from directly behind the target.";
    }

    if (normalized.includes("harming the weak")) {
        return "Law reminder: check levels before attacking; damaging lower-level units breaks the law.";
    }

    if (/\bharming (humes?|bangaa|nu mou|viera|moogles?|seeq|gria|males?|females?)\b/.test(normalized)) {
        return "Law reminder: avoid damaging the protected unit type, including splash damage, counters, and friendly fire.";
    }

    if (normalized.includes("< 20 damage") || normalized.includes("< 100 damage")) {
        return "Law reminder: weak hits break the law. Use reliable damage boosts or skip attacks that may fall under the threshold.";
    }

    if (normalized.includes("> 50 damage")) {
        return "Law reminder: heavy hits break the law. Use low-damage actions and avoid burst setups.";
    }

    if (normalized.includes("hp <= 20") || normalized.includes("< 200 hp")) {
        return "Law reminder: keep affected units above the HP threshold before ending turns or taking risks.";
    }

    if (normalized.includes("not moving")) {
        return "Law reminder: move the required number of tiles before acting or ending the unit's turn.";
    }

    if (normalized.includes("grouping")) {
        return "Law reminder: avoid ending turns clustered with too many adjacent units.";
    }

    if (normalized.includes("solitude")) {
        return "Law reminder: end turns next to an ally whenever possible.";
    }

    if (normalized.includes("swimming")) {
        return "Law reminder: avoid entering water tiles.";
    }

    if (normalized.includes("height")) {
        return "Law reminder: watch tile elevation before ending a turn.";
    }

    return "Law reminder: build your actions around the listed forbidden condition.";
}

export function MissionCard({ mission }: { mission: Mission }) {
    const [open, setOpen] = React.useState(false);

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
        prerequisite,
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
    const lawGuidance = getLawGuidance(law);
    const phaseSummary = getMissionPhaseSummary(mission);
    const enemyRows = phaseSummary
        ? phaseSummary.phases.flatMap((phase) => [
              { type: "phase" as const, phase, key: phase.key },
              ...phase.enemies.map((enemy, phaseIndex) => ({
                  type: "enemy" as const,
                  enemy,
                  key: `${phase.key}:${phaseIndex}`,
              })),
          ])
        : (enemies ?? []).map((enemy, enemyIndex) => ({
              type: "enemy" as const,
              enemy,
              key: String(enemyIndex),
          }));

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
                                {prerequisite && (
                                    <div className="flex flex-col gap-0.5 pt-1">
                                        <dt className="text-zinc-400">
                                            Prerequisite
                                        </dt>
                                        <dd className="font-medium">
                                            {prerequisite}
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
                                {rewards?.other && (
                                    <div className="flex flex-col gap-0.5">
                                        <dt className="text-zinc-400">
                                            Other
                                        </dt>
                                        <dd className="font-medium">
                                            {rewards.other}
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
                                {lawGuidance && (
                                    <p className="mb-2 rounded-md border border-amber-700/50 bg-amber-950/30 px-2.5 py-1.5 text-[0.7rem] sm:text-xs text-amber-100">
                                        {lawGuidance}
                                    </p>
                                )}
                                {phaseSummary ? (
                                    <div className="space-y-2 text-xs sm:text-sm text-zinc-100">
                                        {phaseSummary.sharedStrategy.length > 0 && (
                                            <ul className="list-disc list-inside space-y-1">
                                                {phaseSummary.sharedStrategy.map((line, idx) => (
                                                    <li key={idx}>{line}</li>
                                                ))}
                                            </ul>
                                        )}

                                        <div className="space-y-2">
                                            {phaseSummary.phases.map((phase) => (
                                                <div
                                                    key={phase.key}
                                                    className="rounded-lg border border-zinc-800/70 bg-zinc-950/40 px-2.5 py-2"
                                                >
                                                    <div className="mb-1 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-zinc-400">
                                                        {phase.title}
                                                    </div>
                                                    {phase.strategy.length > 0 ? (
                                                        <ul className="list-disc list-inside space-y-1">
                                                            {phase.strategy.map((line, idx) => (
                                                                <li key={idx}>{line}</li>
                                                            ))}
                                                        </ul>
                                                    ) : (
                                                        <p className="text-[0.7rem] text-zinc-400">
                                                            Follow the enemy priorities listed for this phase.
                                                        </p>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm text-zinc-100">
                                        {strategy.map((line, idx) => (
                                            <li key={idx}>{line}</li>
                                        ))}
                                    </ul>
                                )}
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
                                                {ach.notes && (
                                                    <div className="text-[0.68rem] sm:text-[0.72rem] text-indigo-200">
                                                        {ach.notes}
                                                    </div>
                                                )}
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
                                    {enemyRows.map((row, idx) => {
                                        if (row.type === "phase") {
                                            return (
                                                <li
                                                    key={`phase:${row.key}`}
                                                    className="rounded-xl border border-amber-700/50 bg-amber-950/20 px-2.5 py-2 sm:px-3"
                                                >
                                                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                                                        <span className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-amber-200">
                                                            {row.phase.title}
                                                        </span>
                                                        <span className="text-[0.65rem] text-amber-100/70">
                                                            {row.phase.enemies.length} enemy
                                                            {row.phase.enemies.length === 1 ? "" : " groups"}
                                                        </span>
                                                    </div>
                                                    {row.phase.strategy.length > 0 && (
                                                        <ul className="mt-1 list-disc list-inside space-y-0.5 text-[0.7rem] text-amber-50/85">
                                                            {row.phase.strategy.map((line, lineIndex) => (
                                                                <li key={lineIndex}>{line}</li>
                                                            ))}
                                                        </ul>
                                                    )}
                                                </li>
                                            );
                                        }

                                        const enemy = row.enemy;
                                        const meta = getEnemyMetaForJob(enemy.job);

                                        const hasAffinities =
                                            (meta?.absorb?.length ?? 0) > 0 ||
                                            (meta?.immune?.length ?? 0) > 0 ||
                                            (meta?.half?.length ?? 0) > 0 ||
                                            (meta?.weak?.length ?? 0) > 0;

                                        const quantity = enemy.quantity ?? 1;
                                        const enemyDisplayName = getEnemyDisplayName(
                                            enemy,
                                            `Enemy ${idx + 1}`,
                                        );
                                        const showRacePill =
                                            !!enemy.race &&
                                            !enemyDisplayName.includes(enemy.race);
                                        const showJobPill =
                                            !!enemy.job &&
                                            !enemyDisplayName.includes(enemy.job);

                                        return (
                                            <li
                                                key={row.key}
                                                className="rounded-xl border border-zinc-800/80 bg-zinc-950/60 px-2.5 py-2.5 sm:px-3 sm:py-3 space-y-1.5"
                                            >
                                                {/* header row */}
                                                <div className="flex items-center justify-between gap-2">
                                                    <div className="flex flex-wrap items-baseline gap-2">
                                                        <span className="font-semibold text-zinc-50">
                                                            {enemyDisplayName}
                                                        </span>
                                                        {showRacePill && (
                                                            <span className="inline-flex items-center rounded-full border border-zinc-700/80 px-1.5 py-0.5 text-[0.6rem] uppercase tracking-[0.16em] text-zinc-300">
                                                                {enemy.race}
                                                            </span>
                                                        )}
                                                        {showJobPill && (
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

                                                {hasAffinities && (
                                                    <div className="text-[0.65rem] text-zinc-300 flex flex-wrap gap-x-4 gap-y-0.5">
                                                        {(meta?.absorb?.length ?? 0) > 0 && (
                                                            <div>
                                                                <span className="text-zinc-400">Absorb:</span>{" "}
                                                                <span className="font-medium">{meta!.absorb!.join(", ")}</span>
                                                            </div>
                                                        )}
                                                        {(meta?.immune?.length ?? 0) > 0 && (
                                                            <div>
                                                                <span className="text-zinc-400">Immune:</span>{" "}
                                                                <span className="font-medium">{meta!.immune!.join(", ")}</span>
                                                            </div>
                                                        )}
                                                        {(meta?.half?.length ?? 0) > 0 && (
                                                            <div>
                                                                <span className="text-zinc-400">Resists:</span>{" "}
                                                                <span className="font-medium">{meta!.half!.join(", ")}</span>
                                                            </div>
                                                        )}
                                                        {(meta?.weak?.length ?? 0) > 0 && (
                                                            <div>
                                                                <span className="text-zinc-400">Weak:</span>{" "}
                                                                <span className="font-medium">{meta!.weak!.join(", ")}</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
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
