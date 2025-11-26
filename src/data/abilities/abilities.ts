// src/data/abilities/abilities.ts

export type AbilityId = string;
export type AbilitySetId = string;

export interface AbilitySetMeta {
    id: AbilitySetId;
    name: string;          // "Arts of War"
    description?: string;  // optional flavor
}

export interface AbilityMeta {
    id: AbilityId;
    setId: AbilitySetId;   // <- ties it to its set
    name: string;          // "First Aid"
    description: string;   // "Restore a small amount of HP..."
    // later: apCost, range, etc.
}

export const ABILITY_SETS: Record<AbilitySetId, AbilitySetMeta> = {
    reactions: {
        id: "reactions",
        name: "Reactions",
        description: "Reaction abilities are triggered in response to enemy attacks."
    },
    passives: {
        id: "passives",
        name: "Passives",
        description: "Passive abilities enhancea  unit's attributes or enable them to use equipment they wouldn't otherwise be able to equip."
    },
    "arts-of-war": {
        id: "arts-of-war",
        name: "Arts of War",
        description: "Soldiers and Warriors use these skills to weaken foes' defenses.",
    },
    "blade-arts": {
        id: "blade-arts",
        name: "Blade Arts",
        description: "These skills imbue the weapons of the Spellblade with magicks that weaken those they strike.",
    },
    territorialism: {
        id: "territorialism",
        name: "Territorialism",
        description: "Cockatrices use their powerful wings to shield themselves from attack and strike at their prey.",
    },
    // etc.
};

export const ABILITIES: Record<AbilityId, AbilityMeta> = {
    counter: {
        id: "counter",
        setId: "reactions",
        name: "Counter",
        description: "Follow up an enemy attack with an attack of the players' own."
    },
    shieldbearer: {
        id: "shieldbearer",
        setId: "passives",
        name: "Shieldbearer",
        description: "Allows shield-wielding, regardless of jobs."
    },
    "first-aid": {
        id: "first-aid",
        setId: "arts-of-war",
        name: "First Aid",
        description: "Treat the user's wounds, restoring HP.",
    },
    "oil-blade": {
        id: "oil-blade",
        setId: "blade-arts",
        name: "Oil Blade",
        description: "Inflict Oil on target with a weapon attack.",
    },
    "peck": {
        id: "peck",
        setId: "territorialism",
        name: "Peck",
        description: "Run target through with a ferocious strike of the beak.",
    },
    "territorial-marking": {
        id: "territorial-marking",
        setId: "territorialism",
        name: "Territorial Marking",
        description: "Leap into the air and land with a heavy thud. Damages units caught underneath.",
    },
};

