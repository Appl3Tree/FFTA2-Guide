import type { Mission } from "../types/ffta2";
import { MISSION_TAGS, type MissionTag } from "../data/missions/missionTags";

export interface MissionSearchResult {
    mission: Mission;
    score: number;
}

function normalize(value: string): string {
    return value.trim().toLowerCase();
}

function addText(parts: string[], value?: string | string[] | null) {
    if (!value) return;
    if (Array.isArray(value)) {
        parts.push(...value);
    } else {
        parts.push(value);
    }
}

function fieldIncludes(query: string, ...values: Array<string | string[] | null | undefined>) {
    const parts: string[] = [];
    for (const value of values) {
        addText(parts, value);
    }
    return parts.some((part) => normalize(part).includes(query));
}

function allTokensMatch(query: string, ...values: Array<string | string[] | null | undefined>) {
    const tokens = query.split(/\s+/).filter(Boolean);
    if (tokens.length <= 1) return false;

    const parts: string[] = [];
    for (const value of values) {
        addText(parts, value);
    }

    const haystack = normalize(parts.join(" "));
    return tokens.every((token) => haystack.includes(token));
}

export function getMergedMissionTags(mission: Mission): MissionTag[] {
    const explicitTags = (mission.tags ?? []) as MissionTag[];
    const overlayTags = MISSION_TAGS[mission.id] ?? [];
    return Array.from(new Set([...explicitTags, ...overlayTags])).filter(Boolean);
}

export function getMissionSearchScore(
    mission: Mission,
    query: string,
    mergedTags = getMergedMissionTags(mission),
): number | null {
    const q = normalize(query);
    if (!q) return 0;

    const name = normalize(mission.name);
    const series = normalize(mission.series ?? "");
    const searchAliases = mission.searchAliases ?? [];
    const id = normalize(mission.id);
    const arc = normalize(mission.arc);
    const tagText = mergedTags.map((tag) => tag.replace(/-/g, " "));
    const recommendedLevelText = mission.rank != null
        ? [`recommended level ${mission.rank}`, `rec lv ${mission.rank}`, `rank ${mission.rank}`]
        : [];
    const rewardText = [
        mission.rewards?.abilityPoints != null
            ? `${mission.rewards.abilityPoints} ap ability points`
            : "",
        (mission.rewards?.cp ?? mission.rewards?.clanPoints) != null
            ? `${mission.rewards.cp ?? mission.rewards.clanPoints} clan points cp`
            : "",
        ...Object.entries(mission.rewards?.talentChanges ?? {}).map(
            ([talent, amount]) => `${talent} plus ${amount}`,
        ),
    ];

    if (name === q) return 1000;
    if (name.startsWith(q)) return 950;
    if (searchAliases.some((alias) => normalize(alias) === q)) return 940;
    if (name.includes(q)) return 900;
    if (searchAliases.some((alias) => normalize(alias).includes(q))) return 890;
    if (series.includes(q)) return 880;
    if (allTokensMatch(q, mission.name)) return 875;
    if (allTokensMatch(q, mission.series, searchAliases)) return 870;

    if (id === q || arc === q) return 850;
    if (id.includes(q) || arc.includes(q)) return 820;

    if (fieldIncludes(q, mission.objective, mission.questType)) return 760;
    if (fieldIncludes(q, mergedTags, tagText)) return 730;
    if (fieldIncludes(q, mission.region, recommendedLevelText)) return 700;

    if (
        mission.enemies.some((enemy) =>
            fieldIncludes(q, enemy.name, enemy.job, enemy.race, enemy.notes),
        )
    ) {
        return 640;
    }

    if (
        fieldIncludes(
            q,
            mission.rewards?.loot,
            mission.rewards?.items,
            mission.rewards?.abilities,
            mission.rewards?.other,
            rewardText,
        )
    ) {
        return 560;
    }

    if (
        fieldIncludes(q, mission.requiredItems, mission.dispatchRecommended) ||
        (mission.requiredTalents &&
            fieldIncludes(
                q,
                Object.entries(mission.requiredTalents)
                    .filter(([, value]) => !!value)
                    .map(([talent, value]) => `${talent} ${value}`),
            ))
    ) {
        return 500;
    }

    if (fieldIncludes(q, mission.description, mission.law, mission.strategy, mission.notes)) {
        return 380;
    }

    if (
        fieldIncludes(
            q,
            mission.members != null ? `${mission.members} members party` : "",
            mission.fee != null ? `${mission.fee} gil fee` : "",
            mission.days != null ? `${mission.days} days` : "",
            mission.canDispatch ? "dispatch allowed" : "dispatch not allowed",
            mission.canCancel ? "cancel allowed" : "cancel not allowed",
        )
    ) {
        return 300;
    }

    if (fieldIncludes(q, mission.prerequisite)) return 120;

    return null;
}
