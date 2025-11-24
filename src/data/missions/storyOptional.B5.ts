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
        rewards: {
            gil: 3630,
            cp: 26,
            loot: "Lightwing Crystal ×3, Wyrmtwig ×2"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "B5-02",
        arc: "B5",
        name: "Summons",
        description: "Clan <NAME>! Exactly what is your relationship to Duelhorn? Show us. We wait in the Bisga Greenlands. A Mysterious Organisation",
        rank: 40,
        region: "The Bisga Greenlands",
        fee: 500,
        days: 20,
        questType: "Battle",
        canDispatch: true,
        canCancel: true,
        members: 6,
        prerequisite: "Caravan Cry II",
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 33,
            adaptability: 33,
        },
        objective: "Defeat all Foes!",
        law: "Forbidden: Actions by Bangaa – Bangaa may only move and perform basic attacks.",
        enemies: [],
        strategy: [
            "Bring a healer to manage HP during the encounter",
        ],
        rewards: {
            gil: 3330,
            cp: 80,
            loot: "Spider Silk ×1"
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
        law: "Forbidden: Ranged Weapons – Attack with bows, greatbows, guns, hand-cannons, and cards",
        enemies: [],
        rewards: {
            gil: 7370,
            cp: 78,
            loot: "Firebird Crystal ×2"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "B5-04",
        arc: "B5",
        name: "Geomancer's Way - Snow",
        description: "Geomancers bend nature to their will. Our society has established a series of trials for prospective geomancers to determine whether they are worthy to share in our knowledge. The Trial of Rivening Snow is the third of four trials. When you are ready to be tested, come. Naturalist Society",
        rank: 37,
        region: "Moorabella",
        fee: 500,
        days: 20,
        questType: "Battle",
        canDispatch: false,
        canCancel: true,
        members: 6,
        prerequisite: "Geomancer's Way Rain",
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 33,
            adaptability: 33,
        },
        objective: "Defeat all Foes!",
        law: "Forbidden: Actions that consume 20 or more MP are forbidden. – Well, there are 3 Geomancer's here, with an Ice Drake and a Zahak to top",
        enemies: [],
        strategy: [
            "Prioritize high-threat targets early in the battle",
        ],
        rewards: {
            gil: 4730,
            cp: 74,
            loot: "Stradivari ×1"
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
        rewards: {
            gil: 5520,
            cp: 44,
            loot: "Snowcat Crystal ×1"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "B5-06",
        arc: "B5",
        name: "Three-Point Strategy",
        description: "A missive containing Duelhorn's strategic plans for the near future has been intercepted. - Three-Point Strategy - Launch coordinated attacks on Camoa, Graszton, and Moorabella using the confusion this generated to ....... Kh ....... headquarters ..... *A word from the pub Poster Unknown, some sections illegible.",
        rank: 48,
        region: "Camoa, Graszton, Moora",
        fee: 500,
        days: 20,
        questType: "Defeat Mark",
        canDispatch: true,
        canCancel: true,
        members: 6,
        prerequisite: "Summons",
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 39,
            adaptability: 39,
        },
        objective: "Defeat the Night Dancer!",
        law: "Forbidden: Harming the Opposite Sex – Actions that harm members of the opposite sex are forbidden.",
        enemies: [
            {
                name: "Cannoneer",
                type: "Monster",
            },
            {
                name: "Bishop",
                type: "Monster",
            },
            {
                name: "Master Monk",
                type: "Monster",
            },
            {
                name: "Dragoon",
                type: "Monster",
            },
            {
                name: "Time Mage",
                type: "Monster",
            },
            {
                name: "Black Mage",
                type: "Monster",
            },
            {
                name: "Sage",
                type: "Monster",
            },
            {
                name: "Sniper",
                type: "Monster",
            },
            {
                name: "Spellblade",
                type: "Monster",
            },
        ],
        strategy: [
            "Bring a healer to manage HP during the encounter",
            "Ranged magical attacks are effective in this mission",
        ],
        rewards: {
            gil: 4920,
            cp: 96,
            loot: "Wyvern Wing ×1"
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
            {
                name: "Zombie",
                type: "Monster",
            },
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
            {
                name: "Toughskin",
                type: "Monster",
            },
            {
                name: "Geomancer",
                type: "Monster",
            },
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
        law: "Forbidden: Ranged Weapons – Atacks with bows, greatbows, guns, hand-cannons, and",
        enemies: [],
        strategy: [
            "Bring a healer to manage HP during the encounter",
            "Ranged magical attacks are effective in this mission",
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
            {
                name: "Opportunity Command",
                type: "Monster",
            },
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
        enemies: [],
        rewards: {
            gil: 3940,
            cp: 99,
            loot: "Aurea Pollen ×1"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "B5-15",
        arc: "B5",
        name: "Devil's Pact",
        description: "I am afflicted with a terrible disease that eats away at my body each day. A kind man named Maquis brings me medicine to slow its effects, but he's begun to behave strangely. He's had dealings with the Witch of the Fens, and I think there may be a connection between her and his behaviour. I need someone who knows the witch to look into this matter on my behalf. Cyda",
        rank: 54,
        region: "Tramdine Fens",
        fee: 500,
        days: 20,
        questType: "Satisfy Petitioner",
        canDispatch: true,
        canCancel: true,
        members: 6,
        prerequisite: "Lethean Drought",
        requiredTalents: {
            negotiation: 54,
            aptitude: 0,
            teamwork: 0,
            adaptability: 54,
        },
        objective: "Answer the Witch of the Fens!",
        law: "Forbidden: HP < or = 20 – Having less than 20 HP is forbidden.",
        enemies: [],
        rewards: {
            gil: 3280,
            cp: 99,
            loot: "Cockatrice Skin ×1"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "B5-16",
        arc: "B5",
        name: "One Last Memory",
        description: "Maquis cared for me when I was ill. I owe him a debt of kindness that can never be repayed. So when he left with a grim look on his face muttering something about a snake, a great fear took me. I feel I may never see him again. Someone, please, see that he's all right. Cyda",
        rank: 60,
        region: "The Galleria Deep",
        fee: 500,
        days: 20,
        questType: "Defeat Mark",
        canDispatch: true,
        canCancel: true,
        members: 6,
        prerequisite: "Devil's Pact",
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 54,
            adaptability: 54,
        },
        objective: "Defeat Duke Snakeheart",
        law: "Forbidden: Back Attack – Attacking a unit from behind is forbidden.",
        enemies: [],
        battlefield: [
            "The battlefield contains trap tiles that pose hazards",
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
