// src/data/missions/storyOptional.B3.ts
// Arc B3 optional missions, accurately transcribed from Side_Quests.txt

import type { Mission } from "../../types/ffta2";

export const OPTIONAL_MISSIONS_B3: Mission[] = [
    {
        id: "B3-01",
        arc: "B3",
        name: "Death March",
        description: "- The Game Is On - Wanted: Participants for the greatest game in Ivalice! This time, it's the Death March. To the victor goes the spoils. - Rules of the Game - * Uphold the Law Bronkrise Gamer's Guild",
        rank: 23,
        region: "Graszton",
        fee: 400,
        days: 20,
        questType: "Uphold the Law",
        canDispatch: true,
        canCancel: true,
        members: 6,
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 9,
            adaptability: 9,
        },
        dispatchRecommended: ["Sage"],
        objective: "Uphold the Law and Defeat all Foes!",
        law: "Forbidden: Not Moving – Each unit must move at least 1 tile before ending its turn.",
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
            gil: 2440,
            cp: 46,
            loot: "Dipraeu Bronze ×3"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "B3-03",
        arc: "B3",
        name: "A Lady's Proposition",
        description: "I want to fight against a monster and know the thrill of battle for myself. Father tells me to put such thoughts from my mind, but I will have none of it. Will you fight alongside me? I wait in the Rupie Mountains. Syrenead Sie Hyskaris",
        rank: 25,
        region: "The Rupie Mountains",
        fee: 400,
        days: 20,
        questType: "Satisfy Petitioner",
        canDispatch: true,
        canCancel: true,
        members: 6,
        requiredTalents: {
            negotiation: 11,
            aptitude: 0,
            teamwork: 0,
            adaptability: 11,
        },
        dispatchRecommended: ["Defender"],
        objective: "Protect Syrenead and Defeat all Foes!",
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
        strategy: [
            "Ranged magical attacks are effective in this mission",
        ],
        rewards: {
            gil: 4500,
            cp: 50,
            loot: "Zodiac Ore ×8, Orichalcum ×1"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "B3-04",
        arc: "B3",
        name: "On the Rampage",
        description: "There's a monster on a nearby hill and, well, it's completely out of control! They say it lost its children, and being a mother I can understand how it must feel, but it's causing landslides right and left ... I'm sorry, but could someone deal with it? Concerned Mother",
        rank: 22,
        region: "Moorabella",
        fee: 400,
        days: 20,
        questType: "Defeat Mark",
        canDispatch: true,
        canCancel: true,
        members: 6,
        prerequisite: "For the Cause",
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 9,
            adaptability: 9,
        },
        objective: "Defeat the Mamatrice!",
        law: "Forbidden: > 100 Damage – Dealing > 100 Damage is Forbidden",
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
            "Bring a healer to manage HP during the encounter",
        ],
        rewards: {
            gil: 5740,
            cp: 62,
            loot: "Mind Ceffyl ×2"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "B3-08",
        arc: "B3",
        name: "Unfamiliar Folk",
        description: "I saw some unfamiliar folk in the Ruins of Delgantua. It's just a feeling, but I don't think they're from around here. I don't think they're even from Jylland! They looked like thgey were planning something. ... Maybe someone aught inquire further? Perna, Professor of Archaeology",
        rank: 24,
        region: "The Ruins of Delgantua",
        fee: 400,
        days: 20,
        questType: "Investigation",
        canDispatch: true,
        canCancel: true,
        members: 6,
        requiredTalents: {
            negotiation: 9,
            aptitude: 9,
            teamwork: 0,
            adaptability: 0,
        },
        objective: "Defeat all Foes!",
        law: "Forbidden: Actions by Humes – Humes may only move and perform basic attacks.",
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
            "Ranged magical attacks are effective in this mission",
        ],
        rewards: {
            gil: 2940,
            cp: 48,
            loot: "Platinum ×3"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "B3-09",
        arc: "B3",
        name: "A Lady's Insistance",
        description: "The wyrm I keep at our home is well behaved and docile, but a group of our neighbours have voiced complaint. Such ignorance ... To appease them, I've resolved to cut off my poor pet's horn - that should make him appear less fearsome. This is easier said than done, however, and I shall require help. Syrenead Sie Hyskaris",
        rank: 30,
        region: "Moorabella",
        fee: 400,
        days: 20,
        questType: "Satisfy Petitioner",
        canDispatch: true,
        canCancel: true,
        members: 6,
        requiredTalents: {
            negotiation: 28,
            aptitude: 0,
            teamwork: 0,
            adaptability: 28,
        },
        dispatchRecommended: ["Defender"],
        objective: "Protect Syrenead and Weaken the Ivory Wyrm!",
        law: "Forbidden: Attack – Attacking is Forbidden.",
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
            "Bring a healer to manage HP during the encounter",
            "Ranged magical attacks are effective in this mission",
        ],
        rewards: {
            gil: 4800,
            cp: 52,
            loot: "Wyrmtwig ×2"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "B3-13",
        arc: "B3",
        name: "Wanted: Barmaid",
        description: "To assist with the Great Land Festival in Camoa, we are currently on the look out for attractive barmaids. During the month of the festival, you will be provided lodging at the pub. Let's see those applicants! Targ Barman",
        rank: 2,
        region: "Targ Wood",
        fee: 100,
        days: 10,
        questType: "Satisfy Petitioner",
        canDispatch: false,
        canCancel: true,
        members: 1,
        requiredTalents: {
            negotiation: 3,
            aptitude: 0,
            teamwork: 0,
            adaptability: 3,
        },
        objective: "Dispatch the right person for the job",
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
            gil: 4380,
            cp: 50,
            loot: "Crusite Alloy ×4"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "B3-16",
        arc: "B3",
        name: "Knowing the Beast",
        rank: 6,
        region: "Camoa",
        fee: 200,
        days: 20,
        questType: "Satisfy Petitioner",
        canDispatch: false,
        canCancel: true,
        members: 6,
        requiredTalents: {
            negotiation: 4,
            aptitude: 0,
            teamwork: 0,
            adaptability: 4,
        },
        objective: "Guard the Bridge for 4 rounds!",
        law: "Forbidden: Reaction Abilities – Reaction Abilities are forbidden",
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
            gil: 830,
            cp: 12,
            loot: "Danbukwood ×4, Skull ×3, Clock Gear ×5"
        },
        notes: "",
        tags: ["optional"]
    }
];
