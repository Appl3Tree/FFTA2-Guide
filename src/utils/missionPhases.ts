import type { Enemy, Mission } from "../types/ffta2";

export interface MissionPhaseView {
    key: string;
    title: string;
    enemies: Enemy[];
    strategy: string[];
}

export interface MissionPhaseSummary {
    sharedStrategy: string[];
    phases: MissionPhaseView[];
}

const PHASE_DEFINITIONS: Array<{
    key: string;
    title: string;
    patterns: RegExp[];
}> = [
    {
        key: "entry",
        title: "Entry Bout",
        patterns: [/\bentry\s+bout\b/i, /\bentry\b/i],
    },
    {
        key: "second",
        title: "Second Bout",
        patterns: [/\bsecond\s+bout\b/i, /\bsecond\b(?!\s+phase)/i],
    },
    {
        key: "third",
        title: "Third Bout",
        patterns: [/\bthird\s+bout\b/i, /\bthird\b(?!\s+phase)/i],
    },
    {
        key: "elimination",
        title: "Elimination Bout",
        patterns: [/\belimination\s+bout\b/i, /\belimination\b/i],
    },
    {
        key: "final",
        title: "Final Bout",
        patterns: [/\bfinal\s+bout\b/i, /\bfinal\b(?!\s+phase)/i],
    },
    {
        key: "phase-1",
        title: "Phase 1",
        patterns: [/\bphase\s*1\b/i, /\bfirst\s+phase\b/i],
    },
    {
        key: "phase-2",
        title: "Phase 2",
        patterns: [/\bphase\s*2\b/i, /\bsecond\s+phase\b/i],
    },
    {
        key: "phase-3",
        title: "Phase 3",
        patterns: [/\bphase\s*3\b/i, /\bthird\s+phase\b/i],
    },
    {
        key: "phase-final",
        title: "Final Phase",
        patterns: [/\bfinal\s+phase\b/i],
    },
    {
        key: "stage-1",
        title: "Stage 1",
        patterns: [/\bstage\s*1\b/i],
    },
    {
        key: "stage-2",
        title: "Stage 2",
        patterns: [/\bstage\s*2\b/i],
    },
    {
        key: "stage-3",
        title: "Stage 3",
        patterns: [/\bstage\s*3\b/i],
    },
    {
        key: "round-1",
        title: "Round 1",
        patterns: [/\bround\s*1\b/i],
    },
    {
        key: "round-2",
        title: "Round 2",
        patterns: [/\bround\s*2\b/i],
    },
    {
        key: "round-3",
        title: "Round 3",
        patterns: [/\bround\s*3\b/i],
    },
    {
        key: "battle-1",
        title: "Battle 1",
        patterns: [/\bbattle\s*1\b/i],
    },
    {
        key: "battle-2",
        title: "Battle 2",
        patterns: [/\bbattle\s*2\b/i],
    },
    {
        key: "battle-3",
        title: "Battle 3",
        patterns: [/\bbattle\s*3\b/i],
    },
    {
        key: "camoa",
        title: "Camoa",
        patterns: [/\bcamoa\b/i],
    },
    {
        key: "graszton",
        title: "Graszton",
        patterns: [/\bgraszton\b/i],
    },
    {
        key: "moorabella",
        title: "Moorabella",
        patterns: [/\bmoorabella\b/i, /\bmoora\b/i],
    },
    {
        key: "zedlei",
        title: "Zedlei Forest",
        patterns: [/\bzedlei\b/i],
    },
    {
        key: "bisga",
        title: "Bisga Greenlands",
        patterns: [/\bbisga\b/i],
    },
    {
        key: "nazan",
        title: "Nazan Mines",
        patterns: [/\bnazan\b/i],
    },
    {
        key: "kthili",
        title: "Kthili Sands",
        patterns: [/\bkthili\b/i],
    },
];

const PHASE_LABEL_PATTERN =
    /\b(entry|second|third|elimination|final\s+phase|final|phase\s*\d+|stage\s*\d+|round\s*\d+|battle\s*\d+|camoa|graszton|moorabella|moora|zedlei(?:\s+forest)?|bisga(?:\s+greenlands)?|nazan(?:\s+mines)?|kthili(?:\s+sands)?)\s*:/gi;

function getPhaseDefinition(text?: string | null) {
    if (!text) return undefined;
    return PHASE_DEFINITIONS.find((definition) =>
        definition.patterns.some((pattern) => pattern.test(text)),
    );
}

function getPhaseDefinitions(text?: string | null) {
    if (!text) return [];
    return PHASE_DEFINITIONS.filter((definition) =>
        definition.patterns.some((pattern) => pattern.test(text)),
    );
}

function addStrategy(
    phaseStrategies: Map<string, string[]>,
    key: string,
    line: string,
) {
    const trimmed = line.trim();
    if (!trimmed) return;
    const list = phaseStrategies.get(key) ?? [];
    list.push(trimmed);
    phaseStrategies.set(key, list);
}

function distributeStrategyLine(
    line: string,
    sharedStrategy: string[],
    phaseStrategies: Map<string, string[]>,
) {
    const matches = [...line.matchAll(PHASE_LABEL_PATTERN)];

    if (matches.length > 0) {
        matches.forEach((match, index) => {
            const label = match[1];
            const definition = getPhaseDefinition(label);
            if (!definition) return;

            const start = match.index! + match[0].length;
            const end =
                index + 1 < matches.length
                    ? matches[index + 1].index!
                    : line.length;
            const segment = line.slice(start, end).trim();
            addStrategy(phaseStrategies, definition.key, segment);
        });
        return;
    }

    const definitions = getPhaseDefinitions(line);
    if (definitions.length === 1) {
        addStrategy(phaseStrategies, definitions[0].key, line);
        return;
    }

    sharedStrategy.push(line);
}

export function getMissionPhaseSummary(
    mission: Pick<Mission, "enemies" | "strategy">,
): MissionPhaseSummary | null {
    const phaseEnemies = new Map<string, Enemy[]>();
    const phaseOrder: string[] = [];

    for (const enemy of mission.enemies ?? []) {
        const definition = getPhaseDefinition(enemy.notes);
        if (!definition) continue;

        if (!phaseEnemies.has(definition.key)) {
            phaseOrder.push(definition.key);
        }
        const list = phaseEnemies.get(definition.key) ?? [];
        list.push(enemy);
        phaseEnemies.set(definition.key, list);
    }

    if (phaseEnemies.size < 2) {
        return null;
    }

    const sharedStrategy: string[] = [];
    const phaseStrategies = new Map<string, string[]>();

    for (const line of mission.strategy ?? []) {
        distributeStrategyLine(line, sharedStrategy, phaseStrategies);
    }

    const phases = phaseOrder.flatMap((phaseKey) => {
        const definition = PHASE_DEFINITIONS.find(({ key }) => key === phaseKey);
        const enemies = phaseEnemies.get(phaseKey);
        if (!definition) return [];
        if (!enemies?.length) return [];

        return [
            {
                key: definition.key,
                title: definition.title,
                enemies,
                strategy: phaseStrategies.get(definition.key) ?? [],
            },
        ];
    });

    return phases.length >= 2 ? { sharedStrategy, phases } : null;
}
