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
    enemies: [
        {
            name: "",
            job: "",
            abilities: {
                A1: {
                    setId: "lowercase",
                    abilityIds: [
                        "",
                    ]
                },
                A2: {
                    setId: "lowercase",
                    abilityIds: [
                        "hyphen-name",
                    ]
                },
                R: "",
                P: ""
            },
            equipment: [
                {slot: 1, itemId: "snakeCase" },
            ]
        },
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
    enemies: [
        {
            name: "",
            job: "",
            abilities: {
                A1: {
                    setId: "lowercase",
                    abilityIds: [
                        "",
                    ]
                },
                A2: {
                    setId: "lowercase",
                    abilityIds: [
                        "hyphen-name",
                    ]
                },
                R: "",
                P: ""
            },
            equipment: [
                {slot: 1, itemId: "snakeCase" },
            ]
        },
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
    enemies: [
        {
            name: "",
            job: "",
            abilities: {
                A1: {
                    setId: "lowercase",
                    abilityIds: [
                        "",
                    ]
                },
                A2: {
                    setId: "lowercase",
                    abilityIds: [
                        "hyphen-name",
                    ]
                },
                R: "",
                P: ""
            },
            equipment: [
                {slot: 1, itemId: "snakeCase" },
            ]
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
            name: "",
            job: "",
            abilities: {
                A1: {
                    setId: "lowercase",
                    abilityIds: [
                        "",
                    ]
                },
                A2: {
                    setId: "lowercase",
                    abilityIds: [
                        "hyphen-name",
                    ]
                },
                R: "",
                P: ""
            },
            equipment: [
                {slot: 1, itemId: "snakeCase" },
            ]
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
            name: "",
            job: "",
            abilities: {
                A1: {
                    setId: "lowercase",
                    abilityIds: [
                        "",
                    ]
                },
                A2: {
                    setId: "lowercase",
                    abilityIds: [
                        "hyphen-name",
                    ]
                },
                R: "",
                P: ""
            },
            equipment: [
                {slot: 1, itemId: "snakeCase" },
            ]
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
    enemies: [
        {
            name: "",
            job: "",
            abilities: {
                A1: {
                    setId: "lowercase",
                    abilityIds: [
                        "",
                    ]
                },
                A2: {
                    setId: "lowercase",
                    abilityIds: [
                        "hyphen-name",
                    ]
                },
                R: "",
                P: ""
            },
            equipment: [
                {slot: 1, itemId: "snakeCase" },
            ]
        },
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
            name: "",
            job: "",
            abilities: {
                A1: {
                    setId: "lowercase",
                    abilityIds: [
                        "",
                    ]
                },
                A2: {
                    setId: "lowercase",
                    abilityIds: [
                        "hyphen-name",
                    ]
                },
                R: "",
                P: ""
            },
            equipment: [
                {slot: 1, itemId: "snakeCase" },
            ]
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
    enemies: [
        {
            name: "",
            job: "",
            abilities: {
                A1: {
                    setId: "lowercase",
                    abilityIds: [
                        "",
                    ]
                },
                A2: {
                    setId: "lowercase",
                    abilityIds: [
                        "hyphen-name",
                    ]
                },
                R: "",
                P: ""
            },
            equipment: [
                {slot: 1, itemId: "snakeCase" },
            ]
        },
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
