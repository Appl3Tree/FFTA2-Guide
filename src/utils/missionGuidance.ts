import type { Mission } from "../types/ffta2";
import { SOURCE_VALIDATED_MISSION_GUIDANCE } from "../data/missions/sourceValidatedGuidance";

const BESPOKE_GUIDANCE: Readonly<Record<string, readonly string[]>> = {
    "C1-14": [
        "Bring fast, mobile units and consider the Speed Up clan privilege: there are six fruit trees and only four rounds.",
        "Move next to a red-dotted fruit tree and choose Gather. Split the clan across the orchard instead of sending everyone toward the same tree.",
        "Do not try to clear the map because monsters keep arriving. Remove only enemies that block a route or threaten the party, and check levels before attacking under Harming the Weak.",
    ],
    "EX-01": [
        "Ignore the continuing reinforcements and concentrate damage on Illua; defeating her is the only win condition.",
        "Illua is a fast mover, so equip Ninja Tabi to keep up. Send the strongest attackers directly and keep a ranged attacker and healer ready.",
        "Buffs are forbidden. Build around direct damage and healing while concentrating solely on Illua.",
    ],
    "EX-02": [
        "Spread mobile units toward the Wisp's three possible positions. Damage the Wisp until it moves, follow it, and destroy it before trying to attack the Core.",
        "The Pod is slow but its Syphonja is dangerous. Keep recovery ready while the Core heals the Wisp, then remove the Pod before committing everyone to the Core.",
        "When the Core creates dark crystals with Rewind, reclaim or destroy them before its next turn to weaken the incoming full-party attack. Unequip reaction abilities before the battle.",
    ],
};

function ensureSentence(value: string): string {
    const trimmed = value.trim();
    if (!trimmed) return "";
    return /[.!?]$/.test(trimmed) ? trimmed : `${trimmed}.`;
}

function enemyLabel(enemy: Mission["enemies"][number]): string {
    const name = enemy.name?.trim();
    if (name && name.toLowerCase() !== "randomized name") return name;
    return [enemy.race, enemy.job].filter(Boolean).join(" ") || "Enemy";
}

function objectiveGuidance(mission: Mission): string | null {
    const objective = mission.objective?.trim();
    if (!objective) return null;

    const normalized = objective.toLowerCase();
    if (/protect|escort|keep .* safe/.test(normalized)) {
        return `${ensureSentence(objective)} Keep the protected unit behind the front line, block direct routes to it, and remove the nearest threats first.`;
    }
    if (/gather|collect|recover|reach|activate|destroy .* crystal|inspect/.test(normalized)) {
        return `${ensureSentence(objective)} Spend movement and actions on the objective first; fight only when an enemy blocks progress or creates an immediate threat.`;
    }
    if (/survive|hold out|last .* rounds?|wait .* rounds?/.test(normalized)) {
        return `${ensureSentence(objective)} Favor durable positioning, recovery, and disabling pressure over chasing enemies that do not affect the timer.`;
    }
    if (/defeat .*!(?:$)|defeat [^.!]+$/.test(normalized) && !/all foes|all enemies/.test(normalized)) {
        return `${ensureSentence(objective)} Focus the named target and avoid spending turns on support units unless they prevent a safe approach.`;
    }
    return `Win condition: ${ensureSentence(objective)}`;
}

function nonCombatGuidance(mission: Mission): string[] {
    const guidance: string[] = [];

    if (mission.requiredItems?.length) {
        guidance.push(
            `Have ${mission.requiredItems.join(", ")} in the inventory before traveling to ${mission.region}; this entry has no listed combat encounter.`,
        );
    } else if (mission.questType === "Map Event") {
        guidance.push(
            `Travel to ${mission.region} after meeting the listed prerequisite to trigger this map event; there is no battle to prepare for.`,
        );
    } else {
        guidance.push(
            `Travel to ${mission.region} and follow the petitioner's prompt; this entry has no listed combat encounter.`,
        );
    }

    if (mission.dispatchRecommended?.length) {
        guidance.push(
            `For dispatch, the validated recommended ${mission.dispatchRecommended.length === 1 ? "job is" : "jobs are"} ${mission.dispatchRecommended.join(", ")}.`,
        );
    }

    if (mission.rewards.other) {
        guidance.push(`Completion result: ${ensureSentence(mission.rewards.other)}`);
    }

    return guidance;
}

function supplementExplicitGuidance(
    mission: Mission,
    explicitGuidance: string[],
): string[] {
    if (!mission.enemies?.length || explicitGuidance.length >= 2) {
        return explicitGuidance;
    }

    const guidance = [...explicitGuidance];
    const candidates = [
        ...(mission.battlefield ?? []).map(ensureSentence),
        ...mission.enemies.flatMap((enemy) =>
            enemy.notes?.trim()
                ? [`${enemyLabel(enemy)}: ${ensureSentence(enemy.notes)}`]
                : [],
        ),
        objectiveGuidance(mission),
    ].filter((candidate): candidate is string => Boolean(candidate));

    for (const candidate of candidates) {
        const normalizedCandidate = candidate.toLowerCase();
        if (
            guidance.some((line) =>
                normalizedCandidate.includes(line.toLowerCase()) ||
                line.toLowerCase().includes(normalizedCandidate),
            )
        ) {
            continue;
        }
        guidance.push(candidate);
        if (guidance.length >= 3) break;
    }

    return guidance;
}

export function buildMissionGuidance(mission: Mission): string[] {
    if (mission.strategy?.some((step) => step.trim())) {
        return supplementExplicitGuidance(
            mission,
            mission.strategy.filter((step) => step.trim()),
        );
    }

    const bespoke = BESPOKE_GUIDANCE[mission.id];
    if (bespoke) return [...bespoke];

    const sourceValidated = SOURCE_VALIDATED_MISSION_GUIDANCE[mission.id];
    if (sourceValidated) return [...sourceValidated];

    if (!mission.enemies?.length) {
        const objective = objectiveGuidance(mission);
        return [
            ...(objective ? [objective] : []),
            ...nonCombatGuidance(mission),
        ];
    }

    const guidance: string[] = [];
    const objective = objectiveGuidance(mission);
    if (objective) guidance.push(objective);

    for (const battlefieldNote of mission.battlefield ?? []) {
        if (guidance.length >= 3) break;
        const sentence = ensureSentence(battlefieldNote);
        if (sentence && !guidance.includes(sentence)) guidance.push(sentence);
    }

    for (const enemy of mission.enemies) {
        if (guidance.length >= 3) break;
        if (!enemy.notes?.trim()) continue;
        const sentence = `${enemyLabel(enemy)}: ${ensureSentence(enemy.notes)}`;
        if (!guidance.includes(sentence)) guidance.push(sentence);
    }

    if (guidance.length === 0) {
        guidance.push(
            `Defeat the listed opposition in ${mission.region}, keeping the mission objective and law visible while choosing targets.`,
        );
    }

    return guidance;
}

export function withMissionGuidance(mission: Mission): Mission {
    return {
        ...mission,
        strategy: buildMissionGuidance(mission),
    };
}
