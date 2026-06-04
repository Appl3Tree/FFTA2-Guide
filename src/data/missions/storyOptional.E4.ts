// src/data/missions/storyOptional.E4.ts
// Arc E4 optional missions, accurately transcribed from Side_Quests.txt

import type { Mission } from "../../types/ffta2";

export const OPTIONAL_MISSIONS_E4: Mission[] = [
    {
        id: "E4-01",
        arc: "E4",
        name: "Devilish Delight",
        description: "Never tasted the delicious tears of devils brought to a simmer by the scalding heat of fire and brimstone? Then you've never tasted Imp Stew, a sinfully tasty dish! It must be eaten while piping hot, or it loses its punch, so don't dawdle once you've ladled a bowl or three! Grosso, Culinary Crusade",
        rank: 42,
        region: "The Neslowe Passage",
        fee: 500,
        days: 20,
        questType: "Satisfy Petitioner",
        canDispatch: true,
        canCancel: true,
        members: 6,
        requiredTalents: {
            negotiation: 44,
            aptitude: 0,
            teamwork: 0,
            adaptability: 44,
        },
        dispatchRecommended: ["Assassin", "Ninja"],
        objective: "Defeat all foes in 4 Rounds!",
        law: "Forbidden: Being Robbed – Having gil or items stolen is forbidden.",
    enemies: [
        { name: "Randomized Name", job: "Fire Drake", quantity: 2, notes: "PRIORITY: Can heal each other. Eliminate both first or they waste your turns." },
        { name: "Randomized Name", job: "Thief", quantity: 1, notes: "Being stolen from violates the law — kill from range or use Safeguard." },
        { name: "Randomized Name", job: "Master Monk", quantity: 1, notes: "Strong melee." },
        { name: "Randomized Name", job: "Berserker", quantity: 1, notes: "Strong melee." },
        { name: "Randomized Name", job: "Beastmaster", quantity: 1, notes: "Can command monsters." },
    ],
        strategy: [
            "Must defeat all 6 enemies in 4 rounds. Eliminate the Fire Drakes first — they heal each other and waste your timer.",
            "Kill the Thief from range before it can steal. Use heavy AoE attackers.",
        ],
        rewards: {
            gil: 6410,
            cp: 84,
            loot: "Prime Tanned Hide ×1"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "E4-02",
        arc: "E4",
        name: "Shelling Out",
        description: "Fisherman's Tortoria is an old Graszton favorite of lightly seasoned turtle meat. Simple, and simply delicious! The trick to preparing this dish comes not in the kitchen but on the battlefield. Bring down the turtles with bladed weapons, and the entire dish tastes of metal, so best to avoid using them entirely. Are you up to the task? Grosso, Culinary Crusade",
        rank: 50,
        region: "Graszton",
        fee: 500,
        days: 20,
        questType: "Satisfy Petitioner",
        canDispatch: true,
        canCancel: true,
        members: 6,
        prerequisite: "Devilish Delight",
        requiredTalents: {
            negotiation: 44,
            aptitude: 0,
            teamwork: 0,
            adaptability: 44,
        },
        objective: "Uphold the Law and Defeat all Foes!",
        law: "Forbidden: Bladed Weapons – Attacks with knives, swords, blades, sabers, katanas, axes, knightswords, greatswords, and broadswords are forbidden.",
    enemies: [
        { name: "Randomized Name", job: "Great Tortoise", quantity: 2, notes: "Main targets — must not be killed with bladed weapons (for flavor/law). Use magick and Sidewinder." },
        { name: "Randomized Name", job: "Lamia", quantity: 1, notes: "Standard threat." },
        { name: "Randomized Name", job: "Adamantitan", quantity: 1, notes: "High defense — use non-blade attacks." },
        { name: "Randomized Name", job: "Rocktitan", quantity: 2, notes: "High defense — use magick or Sidewinder." },
    ],
        strategy: [
            "No bladed weapons. Use Hunters (Sidewinder not considered bladed), magick attacks, and Cannoneers.",
        ],
        rewards: {
            gil: 9230,
            cp: 99,
            loot: "Emperor Scale ×1"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "E4-03",
        arc: "E4",
        name: "Flantastic Finish",
        description: "Zedlei Flan, a specialty from the forest of the same name, is a delicate desert that melts in one's mouth, before melting one's heart. Only the freshest ingredients will do for this treat! Grosso, Culinary Crusade",
        rank: 50,
        region: "Zedlei Forest",
        fee: 500,
        days: 20,
        questType: "Satisfy Petitioner",
        canDispatch: true,
        canCancel: true,
        members: 6,
        prerequisite: "Shelling Out",
        requiredTalents: {
            negotiation: 47,
            aptitude: 0,
            teamwork: 0,
            adaptability: 47,
        },
        dispatchRecommended: ["Arcanist"],
        objective: "Weaken the Red Flan and defeat all other foes!",
        law: "Forbidden: Opportunity Commands – Opportunity Commands are forbidden.",
    enemies: [
        { name: "Red Flan", job: "Flan", quantity: 1, notes: "TARGET: Weaken to HP Critical — do not kill. Defeat all other enemies first." },
        { name: "Randomized Name", job: "Deadly Nightshade", quantity: 1, notes: "Defeat first." },
        { name: "Randomized Name", job: "Dreamhare", quantity: 1, notes: "Defeat first." },
        { name: "Randomized Name", job: "Werewolf", quantity: 1, notes: "Defeat first." },
        { name: "Randomized Name", job: "Lilith", quantity: 1, notes: "Defeat first." },
        { name: "Randomized Name", job: "White Chocobo", quantity: 1, notes: "Defeat first." },
    ],
        strategy: [
            "Kill all non-Flan enemies first, then weaken the Red Flan to HP Critical. Do not kill it.",
        ],
        rewards: {
            gil: 7810,
            cp: 99,
            loot: "Fiend's Blood ×1"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "E4-06",
        arc: "E4",
        name: "From 'Cross the Sea",
        description: "I've penned a reply to my dear friend Riddim 'cross the sea. I seek a courier to deliver it to her. Meena",
        rank: 25,
        region: "Goug, Camoa",
        fee: 400,
        days: 20,
        questType: "Delivery",
        canDispatch: false,
        canCancel: true,
        members: 1,
        prerequisite: "'Cross the Sea",
        requiredTalents: {
            negotiation: 44,
            aptitude: 0,
            teamwork: 0,
            adaptability: 0,
        },
    enemies: [],
        strategy: [
            "Delivery mission — carry the reply letter from Goug to Camoa (or vice versa).",
        ],
        rewards: {
            gil: 2660,
            cp: 50,
            loot: "Mythril ×1"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "E4-09",
        arc: "E4",
        name: "'Cross the Sea",
        description: "My dear friend Meena has moved 'cross the sea. I seek a courier to deliver a letter to her. Riddim",
        rank: 25,
        region: "Camoa, Goug",
        fee: 400,
        days: 20,
        questType: "Delivery",
        canDispatch: false,
        canCancel: true,
        members: 1,
        requiredTalents: {
            negotiation: 44,
            aptitude: 0,
            teamwork: 0,
            adaptability: 0,
        },
    enemies: [],
        strategy: [
            "Delivery mission — carry the letter from Camoa to Goug.",
        ],
        rewards: {
            gil: 2660,
            cp: 50,
            loot: "Einherjarium ×1"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "E4-14",
        arc: "E4",
        name: "Drawn Bridge",
        description: "I'm in charge of Dow Bridge, a drawbridge linking Goug with Kthili Sands. The bridge mechanism is one of the great feats of mooglecraft! The thing is, I've run into a little problem ... I lost the key required to operate it! I dropped it in one of the mine shafts, and no one's been able to use the bridge since! My pom-pom's akimbo over the whole mess, kupo! Tchipo, Dow Bridge Operator",
        rank: 48,
        region: "Goug",
        fee: 500,
        days: 20,
        questType: "Investigation",
        canDispatch: false,
        canCancel: true,
        members: 6,
        requiredTalents: {
            negotiation: 0,
            aptitude: 44,
            teamwork: 0,
            adaptability: 0,
        },
        objective: "Find the Dow Bridge Key!",
        law: "Forbidden: Items – Items are Forbidden",
    enemies: [
        { name: "Randomized Name", job: "Mimic", quantity: 3, notes: "Weak to all elements. Open sparkle tiles to find the key." },
        { name: "Randomized Name", job: "Magick Pot", quantity: 1, notes: "Absorbs all elements — use physical attacks only. Cannot be killed until sated (give it what it asks for, or ignore)." },
    ],
        strategy: [
            "Key is hidden in one of several sparkle tiles. Check all sparkles — search quickly while managing enemies.",
            "Use elemental magick on Mimics. Never use elements on Magick Pot — use physical attacks or ignore it.",
            "Items are banned — no Potions. Bring healers with magick.",
        ],
        rewards: {
            gil: 7180,
            cp: 96,
            loot: "Einherjarium ×1"
        },
        notes: "",
        tags: ["optional"]
    }
];
