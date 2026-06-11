// src/data/missions/allMissions.ts
import type { Mission } from "../../types/ffta2";
import { STORY_MAIN_MISSIONS } from "./storyMain";
import { STORY_OPTIONAL_MISSIONS } from "./storyOptional";

function mergeMissionTags(a: Mission, b: Mission): string[] | undefined {
    const tags = Array.from(new Set([...(a.tags ?? []), ...(b.tags ?? [])]));
    return tags.length > 0 ? tags : undefined;
}

function mergeMission(primary: Mission, secondary: Mission): Mission {
    return {
        ...secondary,
        ...primary,
        battlefield: primary.battlefield ?? secondary.battlefield,
        enemies: primary.enemies?.length ? primary.enemies : secondary.enemies,
        notes: primary.notes || secondary.notes,
        rewards: {
            ...secondary.rewards,
            ...primary.rewards,
        },
        strategy: primary.strategy?.length ? primary.strategy : secondary.strategy,
        tags: mergeMissionTags(primary, secondary),
    };
}

export function mergeMissionsById(
    storyMissions: Mission[],
    optionalMissions: Mission[],
): Mission[] {
    const missions = new Map<string, Mission>();

    for (const mission of storyMissions) {
        missions.set(mission.id, mission);
    }

    for (const mission of optionalMissions) {
        const existing = missions.get(mission.id);
        missions.set(
            mission.id,
            existing ? mergeMission(mission, existing) : mission,
        );
    }

    return Array.from(missions.values());
}

export const ALL_MISSIONS: Mission[] = mergeMissionsById(
    STORY_MAIN_MISSIONS,
    STORY_OPTIONAL_MISSIONS,
);
