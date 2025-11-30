// src/data/missions/storyOptional.D4.ts
// Arc D4 optional missions, accurately transcribed from Side_Quests.txt

import type { Mission } from "../../types/ffta2";

export const OPTIONAL_MISSIONS_D4: Mission[] = [
    {
        id: "D4-04",
        arc: "D4",
        name: "Hors D'oeuvre of the Hour",
        description: "Haven't tried Culinary Crusade's latest gastronomical triumph, Amarette Malbonara yet? Now's your chance! Just be careful not to burn the ingredients when you harvest them. Heat muddles the flavor. Grosso, Culinary Crusade",
        rank: 41,
        region: "The Bisga Greenland",
        fee: 500,
        days: 20,
        questType: "Satisfy Petitioner",
        canDispatch: true,
        canCancel: true,
        members: 6,
        requiredTalents: {
            negotiation: 39,
            aptitude: 0,
            teamwork: 0,
            adaptability: 39,
        },
        objective: "Uphold the Law and Defeat all Foes!",
        law: "Forbidden: Fire – Weapons and abilities that use fire are forbidden.",
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
            "Having Esuna available is recommended to handle debuffs",
            "Bring a healer to manage HP during the encounter",
        ],
        rewards: {
            gil: 3980,
            cp: 82,
            loot: "Ancient Turtle Shell ×2"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "D4-07",
        arc: "D4",
        name: "I've Been Had, Kupo!",
        description: "Kupo!!! I've been had, kupo, had!!!",
        rank: 32,
        region: "The Bisga Greenlands",
        fee: 500,
        days: 20,
        questType: "Defeat Mark",
        canDispatch: false,
        canCancel: true,
        members: 6,
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 28,
            adaptability: 28,
        },
        objective: "Defeat Nezzel the Alchemist!",
        law: "Forbidden: Height > or = 10 – Moving to a tile with height of 10 of more is forbidden.",
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
            gil: 1960,
            cp: 64,
            loot: "Kalos ×3"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "D4-08",
        arc: "D4",
        name: "Beneath the Sands",
        description: "Need someone to head over to Kthili Sands and look for my treasure. Buried it out there a chocobo's age ago, and now I can't remember where it's at. Went looking for it myself, but didn't have any luck. Maybe you'll do better. Ricard, Former treasure hunter",
        rank: 40,
        region: "Kthili Sands",
        fee: 500,
        days: 20,
        questType: "Item Recovery",
        canDispatch: true,
        canCancel: true,
        members: 6,
        requiredTalents: {
            negotiation: 39,
            aptitude: 0,
            teamwork: 0,
            adaptability: 0,
        },
        objective: "Find the Buried Treasure!",
        law: "Forbidden: Summoning Scions – Summoning Scions is forbidden.",
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
        strategy: [
            "Prioritize high-threat targets early in the battle",
            "Bring a healer to manage HP during the encounter",
        ],
        rewards: {
            gil: 6270,
            cp: 80,
            loot: "Wyvern Wing ×1"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "D4-09",
        arc: "D4",
        name: "Airship S.O.S.!",
        description: "No one's noticed yet, but an airship sitting in the dock has been hijacked. O don't want to contact the watch and cause a commotion, so I'm posting for help here. Neah, Accidental Witness",
        rank: 19,
        region: "Moorabella",
        fee: 300,
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
        law: "Forbidden: Being Robbed – Having gil or items stolen is forbidden.",
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
            "Ranged magical attacks are effective in this mission",
        ],
        rewards: {
            gil: 4610,
            cp: 50,
            loot: "Strange Liquid ×2"
        },
        notes: "",
        tags: ["optional"]
    }
];
