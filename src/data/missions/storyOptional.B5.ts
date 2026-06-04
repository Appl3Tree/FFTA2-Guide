// src/data/missions/storyOptional.B5.ts
// Arc B5 optional missions, accurately transcribed from Side_Quests.txt

import type { Mission } from "../../types/ffta2";

export const OPTIONAL_MISSIONS_B5: Mission[] = [
    {
        id: "B5-01",
        arc: "B5",
        name: "Wanted: Woodcutter",
        description: "The Lord of Camoa has decreed that several trees be cut from nearby woods. As his personal carpenter, I will oversee your work as you fell the trees. The work should only take two days to complete. Coerfantl, Carpenter",
        rank: 13,
        region: "Targ Wood",
        fee: 300,
        days: 20,
        questType: "Satisfy Petitioner",
        canDispatch: false,
        canCancel: true,
        members: 1,
        requiredTalents: {
            negotiation: 22,
            aptitude: 0,
            teamwork: 0,
            adaptability: 22,
        },
    enemies: [],
        strategy: [
            "Dispatch mission — send a Viking or Chocobo Knight equipped with an axe for 2 days.",
        ],
        rewards: {
            gil: 3630,
            cp: 26,
            loot: "Lightwing Crystal ×3, Wyrmtwig ×2"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "B5-03",
        arc: "B5",
        name: "Hunted",
        description: "A fiend hunts me. Each time I think I've slain it, I turn to find it stalking me once more. I fear I am lost. I seek help in ending my nightmare once and for all. I never want to look on this creature again. Scared Sleepless",
        rank: 39,
        region: "Aisenfield",
        fee: 500,
        days: 20,
        questType: "Battle",
        canDispatch: false,
        canCancel: true,
        members: 3,
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 39,
            adaptability: 39,
        },
        objective: "Protect Frimelda and Defeat all Foes!",
        law: "Forbidden: Ranged Weapons – Attacks with bows, greatbows, guns, hand-cannons, and cards are forbidden.",
    enemies: [
        { name: "Sir Luc Sardarc", job: "Paladin", quantity: 1, notes: "Forced party: Luso, Adelle, and Cid only. Uses Saint Cross, Holy Blade, and War Cry. Has Blink Counter and Destroyer. Protect Frimelda (undead ally). Dark Magick is effective." },
    ],
        rewards: {
            gil: 7370,
            cp: 78,
            loot: "Firebird Crystal ×2"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "B5-05",
        arc: "B5",
        name: "Wanted: Assistant",
        description: "I need an assistant to assist me in the laboratory with my research, kupo. But not the dangerous kind of assisting with explosions and fires, kupo. Oh no. I'll only need you for seven days, and you'll only be required to work a mere eight hours each day. I'll provide your lunch and afternoon tea, as well as colognes and perfumes to help mask the smell, kupo! Malbolabs Alchemical Research",
        rank: 22,
        region: "Goug",
        fee: 400,
        days: 20,
        questType: "Satisfy Petitioner",
        canDispatch: false,
        canCancel: true,
        members: 1,
        requiredTalents: {
            negotiation: 44,
            aptitude: 0,
            teamwork: 0,
            adaptability: 44,
        },
    enemies: [],
        strategy: [
            "Dispatch mission — send an Alchemist for 7 days.",
            "Bring a healer to manage HP during the encounter",
            "Ranged magical attacks are effective in this mission",
        ],
        rewards: {
            gil: 5520,
            cp: 44,
            loot: "Snowcat Crystal ×1"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "B5-07",
        arc: "B5",
        name: "Memories Forged",
        description: "To Clan Gully: A great master of the sword lies upon death's door. I would have you deliver something to them. I await in Nazan Mines",
        rank: 42,
        region: "Nazan Mines, Kthili",
        fee: 500,
        days: 20,
        questType: "Delivery",
        canDispatch: false,
        canCancel: true,
        members: 6,
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 47,
            adaptability: 47,
        },
        objective: "Investigate the Shining Object!",
        law: "Forbidden: Back Attack – Attacking a unit from behind is forbidden.",
    enemies: [
        { name: "Randomized Name", job: "Floating Eye", quantity: 2, notes: "First battle — defeat or rush past to examine the shining object. High-movement units can skip combat." },
        { name: "Randomized Name", job: "Wolf", quantity: 2, notes: "First battle. Second battle in Kthili Sands: Ghoul x4 (weak to Holy). Protect Frimelda; she enters at HP Critical. Frimelda joins as Paladin after the mission." },
    ],
        rewards: {
            gil: 6620,
            cp: 84,
            loot: "High Arcana ×1"
        },
        notes: "",
        tags: ["optional", "recruit"]
    },
    {
        id: "B5-08",
        arc: "B5",
        name: "Geomancer's Way - Mist",
        description: "Geomancers bend nature to their will. Our society has established a series of trials for prospective geomancers to determine whether they are worthy to share in our knowledge. The Trial of Seething Mist is the fourth and final trials. When you are ready to be tested, come. Naturalist Society",
        rank: 38,
        region: "The Aldanna Range",
        fee: 500,
        days: 20,
        questType: "Battle",
        canDispatch: false,
        canCancel: true,
        members: 6,
        prerequisite: "Geomancer's Way -",
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 33,
            adaptability: 33,
        },
        objective: "Defeat all Foes!",
        law: "Forbidden: HP < or = 100 – Having less than 100 HP is forbidden.",
    enemies: [
        { name: "Randomized Name", job: "Geomancer", quantity: 3, notes: "Enemy has high ground advantage. Use magick. Can use Mist ability — move fast." },
        { name: "Randomized Name", job: "Toughskin", quantity: 1, notes: "Uses Resonate — debuffs bladed-weapon users. Prioritize if you have sword/blade users." },
        { name: "Randomized Name", job: "Lamashtu", quantity: 1, notes: "Dangerous debuffer — highest priority target." },
    ],
        strategy: [
            "Having Esuna available is recommended to handle debuffs",
            "Bring a healer to manage HP during the encounter",
            "Ranged magical attacks are effective in this mission",
        ],
        rewards: {
            gil: 4850,
            cp: 76,
            loot: "Mahbeny ×2"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "B5-10",
        arc: "B5",
        name: "The Last Duelhorn",
        description: "Clan Gully, Please, stop Maquis. He's taken it upon himself to do everything alone. I would go, were it not for my wounds... Please, help. Alys",
        rank: 52,
        region: "The Bisga Greenlands",
        fee: 500,
        days: 20,
        questType: "Battle",
        canDispatch: true,
        canCancel: true,
        members: 6,
        prerequisite: "Three-Point Strategy",
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 47,
            adaptability: 47,
        },
        objective: "Defeat Maquis the Phantasm!",
        law: "Forbidden: Ranged Weapons – Attacks with bows, greatbows, guns, hand-cannons, and cards are forbidden.",
    enemies: [
        { name: "Maquis the Phantasm", job: "Juggler", quantity: 6, notes: "Duelhorn boss. Splits into 6 at battle start — all copies are real. Level ~56. Has Double Wield and various veils (debuffs). Use AoE Illusion magick (Illusionist with Halve MP + MP Efficiency recommended). All 6 must be defeated." },
    ],
        rewards: {
            gil: 5320,
            cp: 99,
            loot: "Stradivari ×1"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "B5-11",
        arc: "B5",
        name: "The Way of the Sword",
        description: "To Clan Gully: I would fight the blademaster returned from death's threshold. One on One. Come to the ruins in the north.",
        rank: 50,
        region: "The Ruins of Delgantua",
        fee: 500,
        days: 20,
        questType: "Battle",
        canDispatch: false,
        canCancel: true,
        members: 1,
        prerequisite: "Memories Forged",
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 51,
            adaptability: 51,
        },
        objective: "Defeat all Foes!",
        law: "Forbidden: < 20 Damage – Dealing < 20 Damage is forbidden.",
    enemies: [
        { name: "Ghi", job: "Parivir", quantity: 1, notes: "Frimelda fights alone. Ghi uses Shimmering Blade, Skyfury Blade, Hoarfrost Blade, and Bonecrusher. High Attack, low Resistance — use Frimelda's Dual Wield for back attacks. Cure debuffs between turns." },
    ],
        rewards: {
            gil: 7880,
            cp: 99,
            loot: "Putrid Liquid ×1"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "B5-14",
        arc: "B5",
        name: "Lethean Drought",
        description: "I must slay a certain monster for the reagents of a potion I require, and seek allies to join me on the hunt. Maquis",
        rank: 57,
        region: "The Aldanna Range",
        fee: 500,
        days: 20,
        questType: "Escort",
        canDispatch: true,
        canCancel: true,
        members: 6,
        prerequisite: "The Last Duelhorn",
        requiredTalents: {
            negotiation: 54,
            aptitude: 0,
            teamwork: 54,
            adaptability: 0,
        },
        dispatchRecommended: ["Defender"],
        objective: "Protect Maquis and Defeat all Foes!",
        law: "Forbidden: Copycat – Using the same action as the preceding unit is forbidden.",
    enemies: [
        { name: "Randomized Name", job: "Dreamhare", quantity: 4, notes: "Uses Charm abilities — Hunters with Sidewinder are ideal to eliminate quickly. Protect Maquis from being hit." },
    ],
        strategy: [
            "Bring a healer to manage HP during the encounter",
        ],
        rewards: {
            gil: 2940,
            cp: 99,
            loot: "Prime Tanned Hide ×1"
        },
        notes: "",
        tags: ["optional"]
    }
];
