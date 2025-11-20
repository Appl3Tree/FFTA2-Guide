import React from "react";
import type { Mission } from "../../types/ffta2";
import { ChevronDown, ChevronUp } from "lucide-react";
import {
    MISSION_TAGS,
    type MissionTag,
} from "../../data/missions/missionTags";
import { RETRO_ACHIEVEMENTS_BY_MISSION_ID } from "../../data/retroAchievements";

export function MissionCard({ mission }: { mission: Mission }) {
    const [open, setOpen] = React.useState(false);

    const {
        id,
        arc,
        name,
        description,
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
        <div className="rounded-2xl border border-zinc-800/80 bg-zinc-950/90 overflow-hidden shadow-sm">
            {/* Header */}
            <button
                type="button"
                onClick={() => setOpen((prev) => !prev)}
                className="w-full flex items-center justify-between gap-4 px-4 sm:px-6 py-3 sm:py-4 bg-slate-900/95 hover:bg-slate-900 transition-colors"
            >
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                    <span className="inline-flex items-center rounded-full bg-slate-800 px-2.5 py-1 text-xs font-mono tracking-tight text-slate-100 border border-slate-700/80">
                        {id}
                    </span>
                    <h3 className="text-sm sm:text-base font-semibold text-slate-50">
                        {name}
                    </h3>
                </div>

                <div className="flex flex-wrap items-center gap-2 text-[0.7rem] sm:text-xs">
                    {region && (
                        <span className="inline-flex items-center rounded-full bg-slate-800/90 text-slate-100 px-2 py-0.5 border border-slate-700/80">
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
                        <ChevronUp className="h-4 w-4 text-slate-200 shrink-0" />
                    ) : (
                        <ChevronDown className="h-4 w-4 text-slate-200 shrink-0" />
                    )}
                </div>
            </button>

            {open && (
                <div className="px-4 sm:px-6 pb-4 sm:pb-6 pt-3 sm:pt-4 space-y-4 bg-zinc-950/95">
                    {/* Description / flavor text */}
                    {description && (
                        <p className="text-xs sm:text-sm text-zinc-200/90 italic">
                            {description}
                        </p>
                    )}

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
                                        <li key={ach.id}>
                                            <div className="flex items-center gap-1.5">
                                                <span className="font-semibold">{ach.name}</span>
                                                {ach.missable && (
                                                    <span className="inline-flex items-center rounded-full bg-rose-900/60 border border-rose-500/80 px-1.5 py-0.5 text-[0.6rem] uppercase tracking-[0.16em] text-rose-50">
                                                        Missable
                                                    </span>
                                                )}
                                            </div>
                                            <div className="text-[0.7rem] sm:text-xs text-zinc-300">
                                                {ach.description}
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
                                <ul className="space-y-1 text-xs sm:text-sm text-zinc-100">
                                    {enemies.map((enemy, idx) => (
                                        <li key={idx}>
                                            {enemy.name && (
                                                <span className="font-medium">
                                                    {enemy.name}
                                                </span>
                                            )}
                                            {enemy.notes && (
                                                <span className="text-zinc-400">
                                                    {" "}
                                                    ({enemy.notes})
                                                </span>
                                            )}
                                        </li>
                                    ))}
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

