import type { ChecklistKey } from "../components/ChecklistPreferencesContext";
import type { GlobalRetroAchievement } from "../types/ffta2";
import { BAZAAR_RECIPES } from "./bazaarRecipes";
import { CLAN_TRIALS } from "./meta/clanTrials";
import { EQUIPMENT, type EquipmentMeta } from "./equipment/equipment";
import type { Mission } from "../types/ffta2";
import { GLOBAL_RETRO_ACHIEVEMENTS } from "./retroAchievements";
import {
    NAMED_RECRUIT_ABILITY_TARGETS,
    RACE_ABILITY_TARGETS,
} from "./abilityTracking";

export interface ChecklistScopeOption {
    id: string;
    label: string;
    description?: string;
}

const EQUIPMENT_BY_NAME = new Map(
    Object.values(EQUIPMENT).map((item) => [item.name.toLowerCase(), item]),
);

const EQUIPMENT_CATEGORY_LABELS: Record<string, string> = {
    Weapon: "Weapons",
    Armor: "Armor",
    Helmet: "Helmets",
    Shield: "Shields",
    Accessory: "Accessories",
    Other: "Other items",
};

function slug(value: string): string {
    return value
        .toLowerCase()
        .replace(/&/g, "and")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
}

export const MISSION_SCOPE_OPTIONS: ChecklistScopeOption[] = [
    {
        id: "quest-report",
        label: "Quest Report",
        description: "Missions counted by the in-game Quest Report.",
    },
    {
        id: "other-missions",
        label: "Other missions & map events",
        description: "Extra missions and map events outside the Quest Report.",
    },
];

export function missionScopeId(mission: Mission): string {
    return mission.arc === "EX" || mission.arc === "ME"
        ? "other-missions"
        : "quest-report";
}

export const CLAN_TRIAL_SCOPE_OPTIONS: ChecklistScopeOption[] = CLAN_TRIALS.map(
    (trial) => ({
        id: trial.id,
        label: trial.name,
        description: `${trial.titles.length} title difficulties.`,
    }),
);

const RETRO_CATEGORIES = [...new Set(
    GLOBAL_RETRO_ACHIEVEMENTS.map(
        (achievement) => achievement.category ?? "Miscellaneous",
    ),
)].sort((left, right) => left.localeCompare(right));

export const RETRO_SCOPE_OPTIONS: ChecklistScopeOption[] = [
    ...RETRO_CATEGORIES.map((category) => ({
        id: `global-${slug(category)}`,
        label: category,
        description: "Global RetroAchievements category.",
    })),
    {
        id: "mission-linked",
        label: "Mission-linked",
        description: "Achievements shown inside individual missions.",
    },
];

export function globalRetroScopeId(
    achievement: GlobalRetroAchievement,
): string {
    return `global-${slug(achievement.category ?? "Miscellaneous")}`;
}

export const EQUIPMENT_SCOPE_OPTIONS: ChecklistScopeOption[] = Object.entries(
    Object.values(EQUIPMENT).reduce<Record<string, number>>((counts, item) => {
        const category = item.category ?? "Other";
        counts[category] = (counts[category] ?? 0) + 1;
        return counts;
    }, {}),
)
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([category, total]) => ({
        id: slug(category),
        label: EQUIPMENT_CATEGORY_LABELS[category] ?? category,
        description: `${total} items.`,
    }));

export function equipmentScopeId(item: EquipmentMeta): string {
    return slug(item.category ?? "Other");
}

const BAZAAR_SCOPE_COUNTS = BAZAAR_RECIPES.reduce<Record<string, number>>(
    (counts, recipe) => {
        const item = EQUIPMENT_BY_NAME.get(recipe.result.toLowerCase());
        const category = item?.category ?? "Other";
        counts[category] = (counts[category] ?? 0) + 1;
        return counts;
    },
    {},
);

export const BAZAAR_SCOPE_OPTIONS: ChecklistScopeOption[] = Object.entries(
    BAZAAR_SCOPE_COUNTS,
)
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([category, total]) => ({
        id: slug(category),
        label: EQUIPMENT_CATEGORY_LABELS[category] ?? category,
        description: `${total} recipes.`,
    }));

export function bazaarScopeId(result: string): string {
    const item = EQUIPMENT_BY_NAME.get(result.toLowerCase());
    return slug(item?.category ?? "Other");
}

export const CHECKLIST_SCOPE_OPTIONS: Record<
    ChecklistKey,
    ChecklistScopeOption[]
> = {
    missions: MISSION_SCOPE_OPTIONS,
    clanTrials: CLAN_TRIAL_SCOPE_OPTIONS,
    retroAchievements: RETRO_SCOPE_OPTIONS,
    bazaar: BAZAAR_SCOPE_OPTIONS,
    equipment: EQUIPMENT_SCOPE_OPTIONS,
    abilityRace: RACE_ABILITY_TARGETS.map((target) => ({
        id: target.id,
        label: target.label,
        description: target.description,
    })),
    abilityCharacters: NAMED_RECRUIT_ABILITY_TARGETS.map((target) => ({
        id: target.id,
        label: target.label,
        description: target.description,
    })),
};
