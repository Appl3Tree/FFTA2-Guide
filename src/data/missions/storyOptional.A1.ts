// src/data/missions/storyOptional.A1.ts
// Arc A1 optional missions, accurately transcribed from Side_Quests.txt

import type { Mission } from "../../types/ffta2";

export const OPTIONAL_MISSIONS_A1: Mission[] = [
    {
        id: "A1-02",
        arc: "A1",
        name: "Reagent Run",
        description: "The muskmallow, favoured herb for treatment of ague, is again in season. Seeking herbalists to venture into Targ Wood and procure a upply. No previous experience required. Jylland Apothecary's League",
        rank: 8,
        region: "Muskmallow Field",
        fee: 200,
        days: 20,
        questType: "Escort",
        canDispatch: true,
        canCancel: true,
        members: 6,
        requiredTalents: {
            negotiation: 0,
            aptitude: 2,
            teamwork: 0,
            adaptability: 4,
        },
        dispatchRecommended: ["Defender"],
        objective: "Collect a sample of muskmallow!",
        law: "Forbidden: Knockback – Actions that knock the target back are forbidden.",
    enemies: [
        {
            name: "Randomized Name",
            job: "Dreamhare",
            abilities: {
                A1: {
                    setId: "enticement",
                    abilityIds: [
                        "hip-attack",
                    ]
                },
                A2: null,
                R: "counter",
                P: ""
            },
            equipment: [
            ]
        },
        {
            name: "Randomized Name",
            job: "Dreamhare",
            abilities: {
                A1: {
                    setId: "enticement",
                    abilityIds: [
                        "war-dance",
                        "hip-attack",
                    ]
                },
                A2: null,
                R: "",
                P: ""
            },
            equipment: [
            ]
        },
        {
            name: "Randomized Name",
            job: "Baknamy",
            abilities: {
                A1: {
                    setId: "taktak",
                    abilityIds: [
                        "magick-hammer",
                    ]
                },
                A2: null,
                R: "archers-bane",
                P: ""
            },
            equipment: [
                {slot: 1, itemId: "leatherClothing" },
            ]
        },
        {
            name: "Randomized Name",
            job: "Wolf",
            quantity: 2,
            abilities: {
                A1: {
                    setId: "maw",
                    abilityIds: [
                        "summon-pack",
                        "fangs",
                    ]
                },
                A2: null,
                R: "",
                P: ""
            },
            equipment: [
            ]
        },
    ],
        battlefield: [
            "The battlefield contains trap tiles that pose hazards",
        ],
        rewards: {
            gil: 1580,
            cp: 16,
            loot: "Cactus Fruit ×3, Nepenthis ×1, Spruce ×3"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "A1-03",
        arc: "A1",
        name: "The First Step",
        description: "-Trade Requested- I will trade my Ocktor Tome of Medicine for your cactus fruit! We will do the deal in Targ Wood. Mack, White Mage",
        rank: 3,
        region: "Targ Wood",
        fee: 100,
        days: 20,
        questType: "Escort",
        canDispatch: false,
        canCancel: true,
        members: 1,
        requiredItems: ["Cactus Fruit ×1"],
        requiredTalents: {
            negotiation: 3,
            aptitude: 0,
            teamwork: 0,
            adaptability: 0,
        },
        dispatchRecommended: ["Defender"],
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
            gil: 340,
            cp: 6,
            loot: "Cruzle Brass ×4, Crooked Fang ×2, Zinconium ×3"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "A1-04",
        arc: "A1",
        name: "The Next Step",
        description: "I seek someone to deliver medicine to a small village in Targ Wood. I would go myself, but there are those who would steal my secrets - as one who crafts potent potables - and it is deemed dangerous for me to go out and about. Please, this one favour I beg of you. Mack, Salve-Maker",
        rank: 16,
        region: "Moorabella, Targ Wood",
        fee: 300,
        days: 20,
        questType: "Delivery",
        canDispatch: false,
        canCancel: true,
        members: 1,
        prerequisite: "The First Step",
        requiredTalents: {
            negotiation: 4,
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
            gil: 1330,
            cp: 32,
            loot: "Foul Liquid ×3, Divariwood ×3"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "A1-07",
        arc: "A1",
        name: "The Perfect Gift",
        description: "It's nearly my mother's birthday, and I want to give her some flowers as a gift, kupo. I need someone to father some pretty, pink flowers for the bouquet. Genne, Devoted Son",
        rank: 6,
        region: "Camoa",
        fee: 200,
        days: 20,
        questType: "Delivery",
        canDispatch: true,
        canCancel: true,
        members: 1,
        requiredItems: ["Prima Petal ×1"],
        requiredTalents: {
            negotiation: 1,
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
            gil: 1050,
            cp: 12,
            loot: "Molting ×2, Trusty Frying Pan ×2, Water Stone ×3"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "A1-08",
        arc: "A1",
        name: "Kids These Days",
        description: "Some of our younger clan members have been carrying on in the pub, disturbing the peace, as it were. I reckon it's best to teach a good lesson now, and nip the problem in the bud. That's where you come in. Give 'em a good thrashing for me! Criek, Clan Criek leader",
        rank: 8,
        region: "Targ Wood",
        fee: 200,
        days: 20,
        questType: "Battle",
        canDispatch: true,
        canCancel: true,
        members: 6,
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 4,
            adaptability: 4,
        },
        objective: "Defeat your Foes",
        law: "Forbidden: Ice – Weapons and Abilities that use Ice are Forbidden.",
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
            gil: 790,
            cp: 16,
            loot: "Waltwood ×3, Xergis Tin ×4, Gikhet Lead ×4"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "A1-09",
        arc: "A1",
        name: "Watch Your Step",
        description: "Oh, fie on him! I chased down a marked thief, and almost has him, too, when one of his traps tripped me up! Someone please bring him in! Finnes, Watch Chief",
        rank: 33,
        region: "Fluorgis",
        fee: 500,
        days: 20,
        questType: "Satisfy Petitioner",
        canDispatch: true,
        canCancel: true,
        members: 6,
        requiredTalents: {
            negotiation: 15,
            aptitude: 0,
            teamwork: 0,
            adaptability: 15,
        },
        objective: "Defeat all Foes and Destroy all Traps!",
        law: "Forbidden: Not Moving 3 Tiles – Each unit must move exactly 3 tiles before ending its turn.",
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
            gil: 4830,
            cp: 66,
            loot: "Star Fragments ×2"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "A1-10",
        arc: "A1",
        name: "The Trappings of Failure",
        description: "In response to monster attacks in the region outlying the city proper, we set a number of traps to rid ourselves of the beasts once and for all. Alas, the traps had no effect. Worse still, they now pose a danage to our citizenry. Please destroy these traps before they can do any real harm. Camoa Ministry of Wildlife",
        rank: 12,
        region: "Targ Wood",
        fee: 300,
        days: 20,
        questType: "Satisfy Petitioner",
        canDispatch: true,
        canCancel: true,
        members: 6,
        requiredTalents: {
            negotiation: 4,
            aptitude: 0,
            teamwork: 0,
            adaptability: 4,
        },
        objective: "Destroy the Traps!",
        law: "Forbidden: > 50 Damage – Dealing > 50 Damage is forbidden.",
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
            "Treasure chests are present on the battlefield",
        ],
        rewards: {
            gil: 390,
            cp: 24,
            loot: "Prima Petal ×2, Mape Wood ×3, Sturdy Vine ×3"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "A1-14",
        arc: "A1",
        name: "A Voice from the Well",
        description: "Every night I hear what sounds like a woman's voice calling to me from the rear garden. I've just moved residences, and don't care to move again - nor do I have the funds if I wanted to. It's rather disturbing to asy the least, and I'd appreciate it if someone would look into this. Lacado, Townsperson",
        rank: 7,
        region: "Camoa",
        fee: 200,
        days: 20,
        questType: "Escort",
        canDispatch: true,
        canCancel: true,
        members: 6,
        requiredTalents: {
            negotiation: 4,
            aptitude: 4,
            teamwork: 0,
            adaptability: 0,
        },
        dispatchRecommended: ["Defender"],
        objective: "Defeat all Foes!",
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
        battlefield: [
            "There are 2 treasure chests on the map",
        ],
        strategy: [
            "Ranged magical attacks are effective in this mission",
        ],
        rewards: {
            gil: 1160,
            cp: 14,
            loot: "Rat Tail ×2, Bat Tail ×2, Bomb Shell ×4"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "A1-15",
        arc: "A1",
        name: "The Star Seal",
        description: "Have you hard of the",
        rank: 8,
        region: "Targ Wood",
        fee: 200,
        days: 20,
        questType: "Battle",
        canDispatch: false,
        canCancel: true,
        members: 6,
        requiredTalents: {
            negotiation: 4,
            aptitude: 4,
            teamwork: 0,
            adaptability: 0,
        },
        objective: "Examine the Stone with no Name!",
        law: "Forbidden: Lightning – Weapons and Abilities that use Lightning are forbidden",
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
            "Treasure chests are present on the battlefield",
        ],
        rewards: {
            gil: 440,
            cp: 16,
            loot: "Molting ×2, Large Feather ×1, Soul Ceffyl ×5"
        },
        notes: "",
        tags: ["optional"]
    }
];
