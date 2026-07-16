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
import { useChecklistPreferences } from "../ChecklistPreferencesContext";
import { missionScopeId } from "../../data/checklistScopes";

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

export function MissionCard({
    mission,
    mode = "accordion",
}: {
    mission: Mission;
    mode?: "accordion" | "detail";
}) {
    const [accordionOpen, setAccordionOpen] = React.useState(false);
    const open = mode === "detail" || accordionOpen;
    const cardId = React.useId();
    const contentId = `${cardId}-content`;

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
        recruitmentGuide,
    } = mission;

    const { checked, setCheck } = useProgress();
    const { isScopeEnabled } = useChecklistPreferences();
    const missionTrackingEnabled = isScopeEnabled(
        "missions",
        missionScopeId(mission),
    );
    const retroTrackingEnabled = isScopeEnabled(
        "retroAchievements",
        "mission-linked",
    );

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

    const midGridClass = "divide-y divide-zinc-800 border-y border-zinc-800";

    const displayRank = rank != null ? `~${rank}` : "N/A";
    const headerSummary = (
        <div className="min-w-0 flex-1">
            <div className="flex min-w-0 flex-wrap items-baseline gap-x-2 gap-y-0.5">
                <span className="shrink-0 font-mono text-xs text-zinc-400">
                    {id}
                </span>
                <h3 className="min-w-0 text-sm font-semibold text-zinc-50 sm:text-base">
                    {name}
                </h3>
            </div>
            <p className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs leading-snug text-zinc-400">
                {questType ? <span>{questType}</span> : null}
                {region ? <span>{region}</span> : null}
                {rank != null ? (
                    <span
                        className="text-amber-300"
                        aria-label={`Recommended level ${displayRank}`}
                    >
                        Lv. {displayRank}
                    </span>
                ) : null}
            </p>
        </div>
    );

    return (
        <article
            className={
                mode === "detail"
                    ? "min-h-full bg-zinc-950"
                    : `overflow-hidden rounded-md border bg-zinc-900/80 shadow-sm transition-colors ${
                          missionTrackingEnabled && isMissionChecked
                              ? "border-emerald-700/80"
                              : "border-zinc-800/80"
                      }`
            }
        >
            <div
                className={`flex items-stretch border-b border-zinc-800 bg-zinc-900/90 ${
                    mode === "detail" ? "sticky top-0 z-10" : ""
                }`}
            >
                {mode === "detail" ? (
                    <div className="flex min-w-0 flex-1 items-center gap-3 px-4 py-3 sm:px-5">
                        {headerSummary}
                    </div>
                ) : (
                    <button
                        type="button"
                        onClick={() => setAccordionOpen((current) => !current)}
                        aria-controls={contentId}
                        aria-expanded={open}
                        className="flex min-w-0 flex-1 items-center gap-3 px-3 py-3 text-left transition-colors hover:bg-zinc-800/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-violet-300 sm:px-5"
                    >
                        {headerSummary}
                        {open ? (
                            <ChevronUp className="h-4 w-4 shrink-0 text-zinc-200" />
                        ) : (
                            <ChevronDown className="h-4 w-4 shrink-0 text-zinc-200" />
                        )}
                    </button>
                )}

                {missionTrackingEnabled && mode === "accordion" ? (
                <label className="flex min-w-11 cursor-pointer items-start justify-center border-l border-zinc-800/80 px-3 py-3 transition-colors hover:bg-emerald-950/30 focus-within:bg-emerald-950/30 sm:min-w-12 sm:px-4">
                    <input
                        type="checkbox"
                        className="mt-0.5 h-5 w-5 rounded accent-emerald-500 focus:ring-2 focus:ring-emerald-300 dark:accent-emerald-400"
                        checked={isMissionChecked}
                        onChange={() => {
                            setCheck(missionKey);
                            if (!isMissionChecked && mode === "accordion") {
                                setAccordionOpen(false);
                            }
                        }}
                    />
                    <span className="sr-only">Mark {name} complete</span>
                </label>
                ) : null}
            </div>

            {open && (
                <div
                    id={contentId}
                    className={`space-y-4 bg-zinc-950/95 px-4 pb-4 pt-3 sm:px-6 sm:pb-6 sm:pt-4 ${
                        mode === "detail" ? "min-h-[calc(100%-4.5rem)]" : ""
                    }`}
                >
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
                    <div className="grid grid-cols-1 divide-y divide-zinc-800 border-y border-zinc-800 md:grid-cols-3 md:divide-x md:divide-y-0">
                        <section className="py-4 md:pr-4">
                            <h4 className="text-[0.65rem] sm:text-xs font-semibold text-zinc-400 mb-1.5">
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

                        <section className="py-4 md:px-4">
                            <h4 className="text-[0.65rem] sm:text-xs font-semibold text-zinc-400 mb-1.5">
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

                        <section className="py-4 md:pl-4">
                            <h4 className="text-[0.65rem] sm:text-xs font-semibold text-zinc-400 mb-1.5">
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

                    {recruitmentGuide ? (
                        <RecruitmentGuideSection guide={recruitmentGuide} />
                    ) : null}

                    {/* Requirements + Strategy + RetroAchievements + Enemies / Notes */}
                    <div className={midGridClass}>
                        {hasRequirements && (
                            <section className="py-4">
                                <h4 className="text-[0.65rem] sm:text-xs font-semibold text-zinc-400 mb-1.5">
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
                            <section className="py-4">
                                <h4 className="text-[0.65rem] sm:text-xs font-semibold text-zinc-400 mb-1.5">
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
                                                    <div className="mb-1 text-[0.65rem] font-semibold uppercase text-zinc-400">
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
                            <section className="py-4">
                                <h4 className="text-[0.65rem] sm:text-xs font-semibold text-zinc-400 mb-1.5">
                                    <u>RETROACHIEVEMENTS</u>
                                </h4>
                                <ul className="space-y-1.5 text-xs sm:text-sm text-zinc-100">
                                    {retroAchievements.map((ach) => (
                                        <li key={ach.id}>
                                            <label
                                                className={`flex min-h-11 items-start gap-2 rounded-md px-1 py-1.5 ${
                                                    retroTrackingEnabled
                                                        ? "cursor-pointer hover:bg-zinc-800/60 focus-within:ring-2 focus-within:ring-indigo-300"
                                                        : ""
                                                }`}
                                            >
                                                {retroTrackingEnabled ? (
                                                    <input
                                                        type="checkbox"
                                                        className="mt-0.5 h-5 w-5 shrink-0 rounded border-zinc-500 accent-indigo-500 focus:ring-indigo-400 dark:accent-indigo-400"
                                                        checked={
                                                            !!checked[
                                                                `retro:${ach.id}`
                                                            ]
                                                        }
                                                        onChange={(event) =>
                                                            setCheck(
                                                                `retro:${ach.id}`,
                                                                event.target.checked,
                                                            )
                                                        }
                                                    />
                                                ) : null}
                                                <div className="min-w-0 flex-1">
                                                <div className="flex items-center gap-1.5">
                                                    <span className="font-semibold">
                                                        {ach.name}
                                                    </span>
                                                    {ach.missable && (
                                                        <span className="inline-flex items-center rounded-full bg-rose-700 text-rose-50 px-1.5 py-0.5 text-[0.6rem] uppercase">
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
                                            </label>
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
                            <section className="py-4">
                                <h4 className="text-[0.65rem] sm:text-xs font-semibold text-zinc-400 mb-1.5">
                                    <u>ENEMIES</u>
                                </h4>
                                <ul className="space-y-2.5 text-xs sm:text-sm text-zinc-100">
                                    {enemyRows.map((row, idx) => {
                                        if (row.type === "phase") {
                                            return (
                                                <li
                                                    key={`phase:${row.key}`}
                                                    className="rounded-lg border border-amber-700/50 bg-amber-950/20 px-2.5 py-2 sm:px-3"
                                                >
                                                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                                                        <span className="text-[0.65rem] font-semibold uppercase text-amber-200">
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
                                                className="rounded-lg border border-zinc-800/80 bg-zinc-950/60 px-2.5 py-2.5 sm:px-3 sm:py-3 space-y-1.5"
                                            >
                                                {/* header row */}
                                                <div className="flex items-center justify-between gap-2">
                                                    <div className="flex flex-wrap items-baseline gap-2">
                                                        <span className="font-semibold text-zinc-50">
                                                            {enemyDisplayName}
                                                        </span>
                                                        {showRacePill && (
                                                            <span className="inline-flex items-center rounded-full border border-zinc-700/80 px-1.5 py-0.5 text-[0.6rem] uppercase text-zinc-300">
                                                                {enemy.race}
                                                            </span>
                                                        )}
                                                        {showJobPill && (
                                                            <span className="inline-flex items-center rounded-full border border-zinc-700/80 px-1.5 py-0.5 text-[0.6rem] uppercase text-zinc-300">
                                                                {enemy.job}
                                                            </span>
                                                        )}

                                                        {/* Quantity pill (only show when > 1) */}
                                                        {quantity > 1 && (
                                                            <span className="inline-flex items-center rounded-full border border-zinc-700/80 px-1.5 py-0.5 text-[0.6rem] uppercase text-zinc-300">
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
                            <section className="py-4">
                                <h4 className="text-[0.65rem] sm:text-xs font-semibold text-zinc-400 mb-1.5">
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
                                    className="inline-flex items-center rounded-full border border-zinc-700/80 bg-zinc-900/80 px-2 py-0.5 text-[0.65rem] sm:text-[0.7rem] uppercase text-zinc-300"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </article>
    );
}

function RecruitmentGuideSection({
    guide,
}: {
    guide: NonNullable<Mission["recruitmentGuide"]>;
}) {
    return (
        <section
            className="border-y border-zinc-800 py-4"
            aria-labelledby="clan-mates-planner"
        >
            <header>
                <h4
                    id="clan-mates-planner"
                    className="text-sm font-semibold text-zinc-50"
                >
                    Recruitment planner
                </h4>
                <p className="mt-1 text-xs leading-relaxed text-zinc-400">
                    Choose the completion month first, then use one answer
                    sequence for the job you want.
                </p>
            </header>

            <ul className="mt-3 list-disc space-y-1 pl-5 text-xs leading-relaxed text-zinc-200 sm:text-sm">
                {guide.instructions.map((instruction) => (
                    <li key={instruction}>{instruction}</li>
                ))}
            </ul>

            <div className="mt-4 border-t border-zinc-800">
                {guide.groups.map((group) => {
                    const headingId = `clan-mates-${group.race
                        .toLowerCase()
                        .replace(/[^a-z0-9]+/g, "-")}`;

                    return (
                        <section
                            key={group.race}
                            className="border-b border-zinc-800 py-3"
                            aria-labelledby={headingId}
                        >
                            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                                <h5
                                    id={headingId}
                                    className="text-sm font-semibold text-zinc-100"
                                >
                                    {group.race}
                                </h5>
                                <p className="text-xs text-zinc-400">
                                    {group.months.join(" / ")}
                                </p>
                            </div>

                            <table className="mt-2 w-full table-fixed text-left text-xs sm:text-sm">
                                <caption className="sr-only">
                                    {group.race} Clan Mates answer sequences
                                </caption>
                                <thead className="text-xs text-zinc-500">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="w-[44%] py-1 pr-3 font-semibold"
                                        >
                                            Job
                                        </th>
                                        <th scope="col" className="py-1 font-semibold">
                                            Answer sequence
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-zinc-900">
                                    {group.results.map((result) => (
                                        <tr
                                            key={`${result.race ?? group.race}:${result.job}`}
                                        >
                                            <th
                                                scope="row"
                                                className="py-1.5 pr-3 font-medium text-zinc-200"
                                            >
                                                {result.job}
                                                {result.race ? (
                                                    <span className="ml-1 text-xs font-normal text-zinc-500">
                                                        ({result.race})
                                                    </span>
                                                ) : null}
                                            </th>
                                            <td className="break-words py-1.5 font-mono text-xs text-violet-200">
                                                {result.answers.join(" / ")}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </section>
                    );
                })}
            </div>
        </section>
    );
}
