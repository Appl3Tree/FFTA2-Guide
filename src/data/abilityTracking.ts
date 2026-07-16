import { ABILITIES, ABILITY_SETS, type AbilityMeta } from "./abilities/abilities";
import { EQUIPMENT } from "./equipment/equipment";
import { RACE_JOBS } from "./races/raceJobs";
import { JOB_ABILITY_ORDER } from "./abilityJobOrder";

export interface AbilityTrackingGroup {
    job: string;
    abilities: AbilityMeta[];
    note?: string;
    summary?: string;
}

export interface AbilityTrackingTarget {
    id: string;
    label: string;
    description: string;
    groups: AbilityTrackingGroup[];
}

interface NamedRecruitDefinition {
    id: string;
    label: string;
    race?: string;
    extraJobs?: string[];
    excludedJobs?: string[];
    description: string;
}

const ADDITIONAL_JOB_SETS: Record<string, string[]> = {
    "Blue Mage": ["blue-magick"],
    Agent: ["reconnaissance"],
    Bard: ["song"],
    Dancer: ["dance"],
    Heritor: ["instinct"],
    "Sky Pirate": ["piracy"],
};

const JOB_NOTES: Record<string, string> = {
    "Blue Mage": "Includes Blue Magick learned from monsters.",
    "Chocobo Knight": "Chococraft actions depend on the mounted chocobo and are not mastered with AP.",
    Heritor: "Heritor actions are earned through Adelle's Gifted quest line.",
};

const NAMED_RECRUIT_DEFINITIONS: NamedRecruitDefinition[] = [
    {
        id: "luso",
        label: "Luso",
        race: "Hume",
        description: "All Hume jobs.",
    },
    {
        id: "adelle",
        label: "Adelle",
        race: "Hume",
        extraJobs: ["Heritor"],
        description: "All Hume jobs plus Heritor.",
    },
    {
        id: "cid",
        label: "Cid",
        race: "Bangaa",
        description: "All Bangaa jobs.",
    },
    {
        id: "hurdy",
        label: "Hurdy",
        race: "Moogle",
        excludedJobs: ["Chocobo Knight"],
        extraJobs: ["Bard"],
        description: "Moogle jobs except Chocobo Knight, plus Bard.",
    },
    {
        id: "frimelda",
        label: "Frimelda",
        race: "Hume",
        description: "All Hume jobs.",
    },
    {
        id: "penelo",
        label: "Penelo",
        race: "Viera",
        extraJobs: ["Dancer"],
        description: "All Viera jobs plus Dancer.",
    },
    {
        id: "vaan",
        label: "Vaan",
        race: "Hume",
        extraJobs: ["Sky Pirate"],
        description: "All Hume jobs plus Sky Pirate.",
    },
    {
        id: "al-cid",
        label: "Al-Cid",
        extraJobs: ["Agent"],
        description: "Agent only; Al-Cid cannot change jobs.",
    },
    {
        id: "montblanc",
        label: "Montblanc",
        race: "Moogle",
        excludedJobs: ["Chocobo Knight"],
        description: "Moogle jobs except Chocobo Knight.",
    },
];

const RACE_BY_NAME = new Map(RACE_JOBS.map((race) => [race.race, race]));
const JOB_SUMMARY_BY_NAME = new Map(
    RACE_JOBS.flatMap((race) =>
        race.jobs.map((job) => [job.name, job.summary] as const),
    ),
);

const EQUIPMENT_ABILITY_IDS_BY_JOB = (() => {
    const result = new Map<string, Set<string>>();

    for (const item of Object.values(EQUIPMENT)) {
        for (const [job, abilityIds] of Object.entries(item.teaches ?? {})) {
            const ids = result.get(job) ?? new Set<string>();
            abilityIds.forEach((abilityId) => ids.add(abilityId));
            result.set(job, ids);
        }
    }

    return result;
})();

function abilityUsesSet(ability: AbilityMeta, setId: string): boolean {
    return ability.setId === setId || ability.otherSetIds?.includes(setId) === true;
}

export function getAbilitiesForJob(job: string): AbilityMeta[] {
    const abilityIds = new Set(EQUIPMENT_ABILITY_IDS_BY_JOB.get(job) ?? []);

    for (const setId of ADDITIONAL_JOB_SETS[job] ?? []) {
        for (const ability of Object.values(ABILITIES)) {
            if (abilityUsesSet(ability, setId)) {
                abilityIds.add(ability.id);
            }
        }
    }

    const sourceOrder = new Map(
        (JOB_ABILITY_ORDER[job] ?? []).map((abilityId, index) => [
            abilityId,
            index,
        ]),
    );

    return [...abilityIds]
        .map((abilityId) => ABILITIES[abilityId])
        .filter((ability): ability is AbilityMeta => Boolean(ability))
        .sort((left, right) => {
            const leftIndex = sourceOrder.get(left.id) ?? Number.MAX_SAFE_INTEGER;
            const rightIndex = sourceOrder.get(right.id) ?? Number.MAX_SAFE_INTEGER;
            return leftIndex - rightIndex || left.name.localeCompare(right.name);
        });
}

function buildGroups(jobs: string[]): AbilityTrackingGroup[] {
    return jobs
        .map((job) => ({
            job,
            abilities: getAbilitiesForJob(job),
            note: JOB_NOTES[job],
            summary: JOB_SUMMARY_BY_NAME.get(job),
        }))
        .filter(
            (group) =>
                group.abilities.length > 0 || group.job === "Chocobo Knight",
        );
}

export const RACE_ABILITY_TARGETS: AbilityTrackingTarget[] = RACE_JOBS.filter(
    (race) => race.race !== "Special",
).map((race) => ({
    id: race.race.toLowerCase().replace(/\s+/g, "-"),
    label: race.race,
    description: `${race.jobs.length} jobs available to ${race.race} units.`,
    groups: buildGroups(race.jobs.map((job) => job.name)),
}));

export const NAMED_RECRUIT_ABILITY_TARGETS: AbilityTrackingTarget[] =
    NAMED_RECRUIT_DEFINITIONS.map((recruit) => {
        const raceJobs = recruit.race
            ? (RACE_BY_NAME.get(recruit.race)?.jobs.map((job) => job.name) ?? [])
            : [];
        const excluded = new Set(recruit.excludedJobs ?? []);
        const jobs = [
            ...raceJobs.filter((job) => !excluded.has(job)),
            ...(recruit.extraJobs ?? []),
        ];

        return {
            id: recruit.id,
            label: recruit.label,
            description: recruit.description,
            groups: buildGroups(jobs),
        };
    });

export function uniqueAbilitiesForTarget(
    target: AbilityTrackingTarget,
): AbilityMeta[] {
    const byId = new Map<string, AbilityMeta>();
    target.groups.forEach((group) =>
        group.abilities.forEach((ability) => byId.set(ability.id, ability)),
    );
    return [...byId.values()];
}

export function uniqueAbilitiesForTargets(
    targets: AbilityTrackingTarget[],
): AbilityMeta[] {
    const byId = new Map<string, AbilityMeta>();
    targets.forEach((target) =>
        uniqueAbilitiesForTarget(target).forEach((ability) =>
            byId.set(ability.id, ability),
        ),
    );
    return [...byId.values()];
}

export const RECRUIT_LEARNABLE_ABILITIES = uniqueAbilitiesForTargets([
    ...RACE_ABILITY_TARGETS,
    ...NAMED_RECRUIT_ABILITY_TARGETS,
]);

export function raceAbilityProgressKey(
    targetId: string,
    abilityId: string,
): string {
    return `ability-race:${targetId}:${abilityId}`;
}

export function namedRecruitAbilityProgressKey(
    targetId: string,
    abilityId: string,
): string {
    return `ability-character:${targetId}:${abilityId}`;
}
