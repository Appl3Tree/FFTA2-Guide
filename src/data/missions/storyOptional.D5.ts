// src/data/missions/storyOptional.D5.ts
// Arc D5 optional missions, accurately transcribed from Side_Quests.txt

import type { Mission } from "../../types/ffta2";

export const OPTIONAL_MISSIONS_D5: Mission[] = [
    {
        id: "D5-01",
        arc: "D5",
        name: "Graszton Nightwatch",
        description: "A plague of robberies gas fallen upon the land! All occur at night and follow a similar pattern, indicating that a single group may be responsible. For the swift resolution of this case, and the safety of our citizens, we are currently accepting applications to join the Graszton Nightwatch. Jylland Sovereignty Society",
        rank: 43,
        region: "Graszton",
        fee: 500,
        days: 20,
        questType: "Satisfy Petitioner",
        canDispatch: true,
        canCancel: true,
        members: 4,
        requiredTalents: {
            negotiation: 44,
            aptitude: 0,
            teamwork: 44,
            adaptability: 44,
        },
        objective: "Defeat all foes within four rounds!",
        law: "Forbidden: Targeting Distant Units – Actions targeting units two or more tiles away are forbidden.",
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
        battlefield: [
            "The battlefield contains trap tiles that pose hazards",
        ],
        rewards: {
            gil: 6620,
            cp: 86,
            loot: "Stormsoul Crystal ×1"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "D5-02",
        arc: "D5",
        name: "The Camoa Nightwatch",
        description: "A plague of robberies gas fallen upon the land! All occur at night and follow a similar pattern, indicating that a single group may be responsible. For the swift resolution of this case, and the safety of our citizens, we are currently accepting applications to join the Camoa Nightwatch. Jylland Sovereignty Society",
        rank: 38,
        region: "Camoa",
        fee: 500,
        days: 20,
        questType: "Satisfy Petitioner",
        canDispatch: true,
        canCancel: true,
        members: 4,
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 0,
            adaptability: 0,
        },
        objective: "Defeat all Foes within Four Rounds!",
        law: "Forbidden: Targeting Self – Actions targeting the user are forbidden.",
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
        battlefield: [
            "The battlefield contains trap tiles that pose hazards",
        ],
        rewards: {
            gil: 6620,
            cp: 76,
            loot: "Stradivari ×1"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "D5-03",
        arc: "D5",
        name: "Stowaways",
        description: "There are murmurings among our passengers that there are ghosts aboard the airships. Though understandably concerned, we are yet mindful that rumour is not fact. We need someone trustworthy to investigate, and, in the event that there is a ghostly infestation, remedy the problem with all haste. Jylland Airship Inspection Board",
        rank: 23,
        region: "Fluorgis",
        fee: 400,
        days: 20,
        questType: "Battle",
        canDispatch: true,
        canCancel: true,
        members: 6,
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 15,
            adaptability: 15,
        },
        objective: "Defeat all Foes!",
        law: "Forbidden: Solitude – Ending the turn without a unit in an adjacent tile is",
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
            "Prioritize high-threat targets early in the battle",
        ],
        rewards: {
            gil: 2610,
            cp: 46,
            loot: "Wyrm Carapace ×4"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "D5-05",
        arc: "D5",
        name: "Wanted: Devotees!",
        description: "Wanted: The criminals known as the Devotees! - Duo responsible for several acts of theft. - Though to be involved in arms deals. - Thought to be followers of a certain band of musicians. Jylland Sovereignty Society",
        rank: 25,
        region: "The Ruins of Delgantua",
        fee: 400,
        days: 20,
        questType: "Battle",
        canDispatch: true,
        canCancel: true,
        members: 6,
        prerequisite: "ALL 5 NIGHTWATCHES",
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 0,
            adaptability: 0,
        },
        objective: "Defeat the Devotees",
        law: "Forbidden: Ranged Weapons – Attacks with bows, greatbows, guns, hand-cannons, and cards",
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
            gil: 5130,
            cp: 50,
            loot: "Aurea Pollen ×1"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "D5-06",
        arc: "D5",
        name: "Fluorgis Nightwatch",
        description: "A plague of robberies gas fallen upon the land! All occur at night and follow a similar pattern, indicating that a single group may be responsible. For the swift resolution of this case, and the safety of our citizens, we are currently accepting applications to join the Fluorgis Nightwatch. Jylland Sovereignty Society",
        rank: 43,
        region: "Fluorgis",
        fee: 500,
        days: 20,
        questType: "Satisfy Petitioner",
        canDispatch: true,
        canCancel: true,
        members: 4,
        requiredTalents: {
            negotiation: 44,
            aptitude: 0,
            teamwork: 44,
            adaptability: 44,
        },
        objective: "Defeat all Foes in Four Rounds!",
        law: "Forbidden: Swimming – Entering a water tile is forbidden.",
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
            cp: 86,
            loot: "High Arcana ×1"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "D5-08",
        arc: "D5",
        name: "A Lost Companion",
        description: "Got a strange letter today at the pub from someone named Gade. Whoever Gade is, it sounds like a friend of his name Shoofa is lost on a",
        region: "The Rupie Mountains",
        questType: "Defeat Mark",
        canDispatch: false,
        canCancel: false,
        members: 6,
        prerequisite: "Gifted",
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 0,
            adaptability: 0,
        },
        objective: "Defeat Gade!",
        law: "Forbidden: Debuffs – Debuffs are forbidden.",
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
            gil: 3940,
            cp: 50,
            loot: ""
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "D5-12",
        arc: "D5",
        name: "Help!",
        description: "We got a letter today from a man named Wermut, some old guy who hurt himself out in the swamp. He wants us to bring him a potion, so let's make sure we've got at least one to spare before heading out there.",
        region: "Zedlei Forest",
        questType: "Delivery",
        canDispatch: false,
        canCancel: false,
        members: 1,
        prerequisite: "A Lost Companion",
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 0,
            adaptability: 0,
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
            gil: 10240,
            cp: 90,
            loot: "Gold Chalice ×1"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "D5-14",
        arc: "D5",
        name: "The Shrine of Paling Gods",
        description: "Came across a worrying notice in the pub about something strange happenings at the shrines of the Paling Gods in Tramdine Fens. It sounds like there has been a growing number of monster sightings in the area. Might be worth looking into.",
        region: "Tramdine Fens",
        questType: "Defeat Mark",
        canDispatch: false,
        canCancel: false,
        members: 6,
        prerequisite: "Shrine of Paling Gods",
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 0,
            adaptability: 0,
        },
        objective: "Rekindle the power of the Stones!",
        law: "Forbidden: Harming the Weak – Actions that harm a lower level unit are forbidden.",
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
            gil: 6300,
            cp: 62,
            loot: "Nagrarok ×1"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "D5-16",
        arc: "D5",
        name: "Woman of the Wood",
        description: "Came across a worrying notice in the pub about a woman surrounded by monsters in the woods. If she's still there, and still alive, she may well need help.",
        region: "Moorabella",
        questType: "Defeat Mark",
        canDispatch: false,
        canCancel: false,
        members: 6,
        prerequisite: "Help!",
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 0,
            adaptability: 0,
        },
        objective: "Defeat Ljda!",
        law: "Forbidden: Knockback – Actions that knock the target back are forbidden.",
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
            gil: 5430,
            cp: 62,
            loot: "Ayuvir Blue ×1"
        },
        notes: "",
        tags: ["optional"]
    }
];
