// src/data/equipment/equipment.ts
export * from "./equipment.types";
export { EQUIPMENT } from "./equipment.index";

import type {
    JobName,
    HelmetType,
    ArmorType,
    WeaponType,
} from "./equipment.types";

export interface EquipRule {
    allowedJobs?: JobName[];
    disallowedJobs?: JobName[];
    requiresPassives?: string[];
    incompatiblePassives?: string[];
    notes?: string;
    handsRequired?: 1 | 2;
    canDualWield?: boolean;
    genderRestriction?: "any" | "femaleOnly";
}

/**
 * Global helmet rules, by helmet subtype.
 */
export const HELMET_RULES: Record<HelmetType, EquipRule> = {
    Helm: {
        allowedJobs: [
            "Soldier",
            "Paladin",
            "Moogle Knight",
            "Dragoon",
            "Defender",
            "Templar",
            "Lanista",
            "Viking",
            "Raptor",
            "Ravager",
        ],
        notes:
            "Standard heavy helms. Equippable by heavy front-line jobs; others can only wear them if some future passive allows it.",
    },

    "Hair Adornment": {
        genderRestriction: "femaleOnly",
        requiresPassives: ["Ribbon-bearer"],
        notes:
            "Hair adornments are equippable by female units by default. Any unit with Ribbon-bearer can also equip them regardless of gender.",
    },

    Hat: {
        disallowedJobs: ["Paladin", "Dragoon", "Defender", "Templar"],
        notes:
            "Hats can be equipped by all jobs except Paladin, Dragoon, Defender, and Templar.",
    },
};

/**
 * Global armor rules, by armor subtype.
 */
export const ARMOR_RULES: Record<ArmorType, EquipRule> = {
    "Heavy Armor": {
        allowedJobs: [
            "Soldier",
            "Paladin",
            "Moogle Knight",
            "Dragoon",
            "Defender",
            "Templar",
            "Lanista",
            "Viking",
            "Raptor",
            "Ravager",
        ],
        requiresPassives: ["Tank"],
        notes:
            "Heavy armor is for tanky melee jobs; other jobs may equip it if they have the Tank passive ability.",
    },

    "Light Armor": {
        disallowedJobs: ["Paladin", "Dragoon", "Defender", "Templar"],
        notes:
            "Light armor can be equipped by all jobs except Paladin, Dragoon, Defender, and Templar.",
    },

    Robe: {
        allowedJobs: [
            "White Mage",
            "Black Mage",
            "Illusionist",
            "Blue Mage",
            "Paladin",
            "Seer",
            "Time Mage",
            "Alchemist",
            "Arcanist",
            "Sage",
            "Bishop",
            "Templar",
            "Green Mage",
            "Red Mage",
            "Summoner",
            "Geomancer",
        ],
        notes: "Robes are primarily for magick-focused and hybrid caster jobs.",
    },
};

/**
 * Shields: only one main subtype, so a single rule object is enough.
 */
export const SHIELD_RULE: EquipRule = {
    allowedJobs: [
        "Soldier",
        "Paladin",
        "Warrior",
        "Defender",
        "Fencer",
        "Moogle Knight",
        "Sage",
        "Viking",
        "Raptor",
    ],
    requiresPassives: ["Shieldbearer"],
    handsRequired: 1,
    canDualWield: true,
    notes:
        "Shields can be equipped by listed jobs or anyone with Shieldbearer. Unit must have at least one free hand; if both hands are free, they can equip two shields.",
};

/**
 * Weapon rules by weapon type.
 * These encode which jobs can use each category plus special notes about
 * dual wielding and passive conflicts.
 */
export const WEAPON_RULES: Record<WeaponType, EquipRule> = {
    Knife: {
        allowedJobs: [
            "Hunter",
            "Ranger",
            "Thief",
            "Juggler",
            "Chocobo Knight",
            "Dancer", // Penelo
            "Heritor", // Adelle
        ],
        handsRequired: 1,
        canDualWield: true,
        notes:
            "Daggers/knives. One-handed and typically dual-wieldable.",
    },

    Sword: {
        allowedJobs: [
            "Soldier",
            "Warrior",
            "Dragoon",
            "Spellblade",
            "Chocobo Knight",
            "Sky Pirate", // Vaan
            "Heritor", // Adelle
        ],
        handsRequired: 1,
        canDualWield: true,
        notes:
            "Standard swords (shortswords, broadswords, etc.). Usually one-handed.",
    },

    Blade: {
        allowedJobs: [
            "Fighter",
            "Gladiator",
            "Moogle Knight",
            "Chocobo Knight",
            "Sky Pirate", // Vaan
            "Heritor", // Adelle
        ],
        handsRequired: 1,
        canDualWield: true,
        notes:
            "Heavier crushing blades used by physical-oriented jobs.",
    },

    Saber: {
        allowedJobs: [
            "Blue Mage",
            "Chocobo Knight",
            "Sky Pirate",
            "Heritor",
        ],
        handsRequired: 1,
        canDualWield: true,
        notes:
            "Curved blades (sabres, scimitars) used primarily by Blue Mage and special jobs.",
    },

    Knightsword: {
        allowedJobs: ["Paladin", "Defender", "Templar", "Chocobo Knight", "Heritor"],
        handsRequired: 1,
        canDualWield: true,
        notes:
            "Heavier knightly swords. Still treated as one-handed in FFTA2.",
    },

    Rapier: {
        allowedJobs: ["Red Mage", "Fencer", "Elementalist", "Chocobo Knight"],
        handsRequired: 1,
        canDualWield: true,
        notes: "Piercing swords for agile and elemental jobs.",
    },

    Greatsword: {
        allowedJobs: ["Soldier", "Paladin", "Lanista", "Ravager", "Chocobo Knight", "Heritor"],
        handsRequired: 2,
        canDualWield: false,
        notes: "Two-handed greatswords.",
    },

    Broadsword: {
        allowedJobs: ["Warrior", "Defender", "Raptor", "Chocobo Knight", "Heritor"],
        handsRequired: 2,
        canDualWield: false,
        notes:
            "Two-handed broadswords, shorter than greatswords but much broader.",
    },

    Katana: {
        allowedJobs: ["Ninja", "Parivir", "Assassin", "Chocobo Knight", "Heritor"],
        handsRequired: 1,
        canDualWield: true,
        notes: "One-handed katana.",
    },

    Spear: {
        allowedJobs: ["Dragoon", "Templar", "Chocobo Knight"],
        handsRequired: 1,
        canDualWield: true,
        notes: "Spears used primarily by Dragoon/Templar.",
    },

    Axe: {
        allowedJobs: ["Viking", "Chocobo Knight"],
        handsRequired: 1,
        canDualWield: true,
        notes: "One-handed axes.",
    },

    Rod: {
        allowedJobs: [
            "Black Mage",
            "Time Mage",
            "Arcanist",
            "Illusionist",
            "Chocobo Knight",
            "Dancer",
            "Heritor",
        ],
        handsRequired: 1,
        canDualWield: true,
        notes: "Caster rods.",
    },

    Staff: {
        allowedJobs: [
            "White Mage",
            "Summoner",
            "Bishop",
            "Chocobo Knight",
            "Dancer",
            "Heritor",
        ],
        handsRequired: 1,
        canDualWield: true,
        notes: "Holy/support staves.",
    },

    Pole: {
        allowedJobs: ["Master Monk", "Geomancer", "Chocobo Knight", "Dancer", "Heritor"],
        handsRequired: 1,
        canDualWield: false,
        notes: "Poles cannot be dual wielded.",
    },

    Knuckles: {
        allowedJobs: ["White Monk", "Tinker", "Berserker", "Chocobo Knight"],
        handsRequired: 1,
        canDualWield: true,
        incompatiblePassives: ["Doublehand"],
        notes: "Cannot be equipped when the Doublehand passive is set.",
    },

    Instrument: {
        allowedJobs: ["Animist", "Beastmaster", "Chocobo Knight", "Bard"],
        handsRequired: 1,
        canDualWield: true,
        notes: "Instruments used by monster-focused jobs and Bard.",
    },

    Hammer: {
        allowedJobs: ["Viking", "Green Mage", "Chocobo Knight"],
        handsRequired: 2,
        canDualWield: false,
        notes: "Two-handed hammers.",
    },

    Mace: {
        allowedJobs: ["Alchemist", "Sage", "Green Mage", "Chocobo Knight"],
        handsRequired: 1,
        canDualWield: true,
        notes: "One-handed maces.",
    },

    Book: {
        allowedJobs: ["Seer", "Scholar", "Chocobo Knight"],
        handsRequired: 1,
        canDualWield: false,
        notes: "Books cannot be dual wielded.",
    },

    Bow: {
        allowedJobs: ["Archer", "Ranger"],
        handsRequired: 2,
        canDualWield: false,
        notes:
            "Two-handed bows. Can strike higher elevation targets at max range but cannot shoot past obstacles.",
    },

    Greatbow: {
        allowedJobs: ["Hunter", "Sniper", "Assassin"],
        handsRequired: 2,
        canDualWield: false,
        notes:
            "Two-handed greatbows with similar elevation/obstacle behavior to bows.",
    },

    Gun: {
        allowedJobs: ["Fusilier", "Agent"],
        handsRequired: 1,
        canDualWield: true,
        notes: "Guns used by Bangaa gunners and Al-Cid.",
    },

    "Hand-cannon": {
        allowedJobs: ["Cannoneer", "Flintlock"],
        handsRequired: 2,
        canDualWield: false,
        notes: "Two-handed hand-cannons.",
    },

    Card: {
        allowedJobs: ["Trickster"],
        handsRequired: 1,
        canDualWield: true,
        notes: "Cards are exclusive to Trickster.",
    },
};
