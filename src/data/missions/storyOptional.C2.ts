// src/data/missions/storyOptional.C2.ts
// Arc C2 optional missions, accurately transcribed from Side_Quests.txt

import type { Mission } from "../../types/ffta2";

export const OPTIONAL_MISSIONS_C2: Mission[] = [
    {
        id: "C2-01",
        arc: "C2",
        name: "Ruinous Traps",
        description: "I was sent to remove some old traps, but the local monsters had other ideas. They're very territorial, and don't welcome",
        rank: 46,
        region: "The Ruins of Delgantua",
        fee: 500,
        days: 20,
        questType: "Satisfy Petitioner",
        canDispatch: true,
        canCancel: true,
        members: 6,
        prerequisite: "A Fatal Mistake",
        requiredTalents: {
            negotiation: 33,
            aptitude: 0,
            teamwork: 0,
            adaptability: 33,
        },
        dispatchRecommended: ["Ranger"],
        objective: "Uphold the Law and Destroy all Traps!",
        law: "Forbidden: Attack – Attacking is Forbidden",
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
            gil: 9450,
            cp: 92,
            loot: "Windslicer Pinion ×2"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "C2-02",
        arc: "C2",
        name: "Komodo Search",
        description: "There was an ... incident the other day while I was out making a delivery, and the load of potions I was meant to deliver ended up scattered along the ground. Will you help me collect them? Oh, and ... let's keep this between you and me. The fewer people that know about this, the better. Trader for a certain potion manufactory",
        rank: 20,
        region: "The Galerria Deep",
        fee: 300,
        days: 20,
        questType: "Item Recovery",
        canDispatch: true,
        canCancel: true,
        members: 6,
        prerequisite: "Komodo Departure",
        requiredTalents: {
            negotiation: 9,
            aptitude: 0,
            teamwork: 0,
            adaptability: 0,
        },
        objective: "Gather all the Potions!",
        law: "Forbidden: Restoring HP – Actions that restore HP are forbidden.",
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
            gil: 3660,
            cp: 40,
            loot: "Silk Thread ×2"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "C2-03",
        arc: "C2",
        name: "Komodo Arrival",
        description: "Finally! We've arrived in Moorabella! I've done it, Celestine! Except ... now there 's a problem. Can someone come and help me, please? Komodo Trader",
        rank: 25,
        region: "Moorabella",
        fee: 400,
        days: 20,
        questType: "Investigation",
        canDispatch: true,
        canCancel: true,
        members: 6,
        prerequisite: "Komodo Search",
        requiredTalents: {
            negotiation: 13,
            aptitude: 13,
            teamwork: 0,
            adaptability: 0,
        },
        objective: "Defeat all Foes!",
        law: "Forbidden: Targeting all Units – Actions targeting all units are forbidden.",
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
            gil: 3330,
            cp: 50,
            loot: "Holy Stone ×3, Yellow Liquid ×3"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "C2-04",
        arc: "C2",
        name: "Shipping Out",
        description: "We're up to our ears in shipping orders. IUt's getting so bad, I've even thought about taking on baknamy! As it is, the freight keeps piling up, and we don't have enough hands to keep it moving. If you aren't afraid of a little hard work, we've got a job for you.",
        rank: 11,
        region: "Targ Wood, Graszton",
        fee: 300,
        days: 20,
        questType: "Delivery",
        canDispatch: false,
        canCancel: true,
        members: 1,
        requiredTalents: {
            negotiation: 7,
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
        battlefield: [
            "The battlefield contains trap tiles that pose hazards",
        ],
        strategy: [
            "Ranged magical attacks are effective in this mission",
        ],
        rewards: {
            gil: 2200,
            cp: 32,
            loot: "Zodiac Ore ×5, Cruzle Brass ×3, Rabbit Tail ×1"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "C2-06",
        arc: "C2",
        name: "The Forests of Loar",
        description: "-Annual Wayfarer's Expedition!- Visit all the below areas within 6 days and receive a stamp on your wayfarer's log to win valuable prizes. Marsa Wayfarers Association List of Destinations: - Targ Wood - The Bisga Greenlands - Zedlei Forest",
        rank: 15,
        region: "Targ, Bisga, Zedlei",
        fee: 200,
        days: 6,
        questType: "Meet Objectives",
        canDispatch: true,
        canCancel: true,
        members: 1,
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 0,
            adaptability: 9,
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
            gil: 1750,
            cp: 30,
            loot: "Faerie Wing ×3"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "C2-07",
        arc: "C2",
        name: "The Lands of Loar",
        description: "-Annual Wayfarer's Expedition!- Visit all the below areas within 5 days and receive a stamp on your wayfarer's log to win valuable prizes. Marsa Wayfarers Association List of Destination: - Baptiste Hill - The Bisga Greenlands - The Aldanna Range",
        rank: 16,
        region: "- Baptiste Hill",
        fee: 300,
        days: 5,
        questType: "Meet Objectives",
        canDispatch: true,
        canCancel: true,
        members: 1,
        prerequisite: "The Forests of Loar",
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 0,
            adaptability: 11,
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
            gil: 2170,
            cp: 34,
            loot: "Moon Bloom ×2"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "C2-10",
        arc: "C2",
        name: "The Root of the Problem",
        description: "The counterfeiters recently remanded to our custody have divulged the source of the fake De'vine Ribbons. We'll find no lasting solution to the problem until we've stopped it at the source. Please follow up on this information and take such action as you deem appropriate. Galmia Pepe, Office of Administration",
        rank: 21,
        region: "The Galerria Deep",
        fee: 400,
        days: 20,
        questType: "Battle",
        canDispatch: true,
        canCancel: true,
        members: 6,
        prerequisite: "The Genuine Article",
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 11,
            adaptability: 11,
        },
        objective: "Defeat all Foes!",
        law: "Forbidden: >100 Damage – Dealing >100 damage is forbidden.",
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
            "The map features elevation differences",
        ],
        rewards: {
            gil: 2980,
            cp: 42,
            loot: "Black Thread ×2, Battlewyrm Carapace ×5"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "C2-11",
        arc: "C2",
        name: "The Whole Truth",
        description: "We've exhausted our supply of materials needed to make De'vine Ribbons, and we need someone to bring in the latest harvest.",
        rank: 22,
        region: "Zedlei Forest",
        fee: 400,
        days: 20,
        questType: "Battle",
        canDispatch: true,
        canCancel: true,
        members: 6,
        prerequisite: "The Root of the",
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 13,
            adaptability: 13,
        },
        objective: "Defeat all Foes!",
        law: "Forbidden: Buffs and Debuffs – Buffs and Debuffs are forbidden.",
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
            gil: 3430,
            cp: 44,
            loot: "Pearl Moss ×3, Prime Pelt ×1"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "C2-12",
        arc: "C2",
        name: "Chita on Weapons - Adepts",
        description: "Ngaaa! I teach the youths one thing, they forget ten others! Teach 'em to focus, and then they can't focus on anything else. Nothing for it but to keep teaching 'em what I can. If it means breaking every bad habit they have one by one, so be it! Chita, Chita's Weaponers",
        rank: 39,
        region: "The Rupie Mountains",
        fee: 500,
        days: 20,
        questType: "Meet Objectives",
        canDispatch: true,
        canCancel: true,
        members: 6,
        prerequisite: "Chita on Weapons -",
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 0,
            adaptability: 20,
        },
        objective: "Speed Battle vs Chita's Weaponers",
        law: "Forbidden: Bludgeoning Weapons – Attacks with rods, staves, poles, kunckles, hammers, and",
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
            gil: 5900,
            cp: 78,
            loot: "Beastlord Horn ×3"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "C2-15",
        arc: "C2",
        name: "Chita on Weapons - Novices",
        description: "Ngaaa! The youth these days can't wield a weapon to save their lives! ... Feh! Nothing for it but to teach 'em myself. Chita, Chita's Weaponers",
        rank: 33,
        region: "The Galerria Deep",
        fee: 500,
        days: 20,
        questType: "Meet Objectives",
        canDispatch: true,
        canCancel: true,
        members: 4,
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 0,
            adaptability: 13,
        },
        objective: "Speed Battle vs. Chita's Weaponers",
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
            gil: 4920,
            cp: 66,
            loot: "Damascus ×4, Coral Fragments ×3"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "C2-16",
        arc: "C2",
        name: "Kupoppy Flower",
        description: "The time has come, kupo, to propose to the one I love! Oh, she's very cultured and ladylike, so I must be a gentleman, kupo. I've heard that eating the kupoppy flower makes one more refined and elegant, kupo! Could you get one for me? Kolulu, Moogle in love",
        rank: 25,
        region: "The Rupie Mountains",
        fee: 400,
        days: 20,
        questType: "Item Recovery",
        canDispatch: true,
        canCancel: true,
        members: 6,
        requiredTalents: {
            negotiation: 11,
            aptitude: 0,
            teamwork: 0,
            adaptability: 0,
        },
        objective: "Find a Kupoppy Flower!",
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
        battlefield: [
            "The battlefield contains trap tiles that pose hazards",
            "The map features elevation differences",
        ],
        rewards: {
            gil: 3400,
            cp: 46,
            loot: "Tarkov Crystal ×6"
        },
        notes: "",
        tags: ["optional"]
    }
];
