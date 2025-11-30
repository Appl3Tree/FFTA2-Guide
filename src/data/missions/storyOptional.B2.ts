// src/data/missions/storyOptional.B2.ts
// Arc B2 optional missions, accurately transcribed from Side_Quests.txt

import type { Mission } from "../../types/ffta2";

export const OPTIONAL_MISSIONS_B2: Mission[] = [
    {
        id: "B2-03",
        arc: "B2",
        name: "Throw Down",
        description: "Clan (Clan Name) We are in pursuit of an infamous monster that promises to be quite a handful ... Would you aid us in driving this menace away? Bowen of House Bowen",
        rank: 14,
        region: "Baptiste Hill",
        fee: 300,
        days: 20,
        questType: "Defeat Mark",
        canDispatch: true,
        canCancel: true,
        members: 3,
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 6,
            adaptability: 6,
        },
        objective: "Defeat Klesta",
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
        battlefield: [
            "The map features elevation differences",
        ],
        strategy: [
            "Bring a healer to manage HP during the encounter",
        ],
        rewards: {
            gil: 2870,
            cp: 28,
            loot: "Zingu Pearl Shell ×3, Adamant Alloy ×8, Green Liquid ×4"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "B2-04",
        arc: "B2",
        name: "A Fatal Mistake",
        description: "A local watch hired us to set traps to help them deal with their monster problem. Unfortuately, I set my traps in the wrong place. If word of my mistake gets out, I'll be in serious trouble. That's why I need someone to destroy the traps for me without causing a big stir. Esther, New Hire",
        rank: 33,
        region: "The Galerria Deep",
        fee: 500,
        days: 20,
        questType: "Satisfy Petitioner",
        canDispatch: true,
        canCancel: true,
        members: 6,
        prerequisite: "It's a Trap",
        requiredTalents: {
            negotiation: 15,
            aptitude: 0,
            teamwork: 0,
            adaptability: 15,
        },
        dispatchRecommended: ["Ranger"],
        objective: "Destroy the traps in 3 rounds!",
        law: "Forbidden: Targeting all Units – Actions targeting all units at once are forbidden.",
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
            gil: 4830,
            cp: 66,
            loot: "Kalos ×4"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "B2-05",
        arc: "B2",
        name: "A Simple Question",
        description: "What are the Judges, really? My beau, he's in an adjudged clan - saw the ceremony of the pact when they were initiating him. They say if you swear, you will never die. But isn't that strange? I mean, it's unnatural. I don't trust it. Someone please explain to me what this is all about! Millemaila, Concerned for her beau",
        rank: 10,
        region: "The Aldanna Range",
        fee: 200,
        days: 20,
        questType: "Escort",
        canDispatch: true,
        canCancel: true,
        members: 1,
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 7,
            adaptability: 7,
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
            gil: 790,
            cp: 20,
            loot: "Kuraisle Boxwood ×2"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "B2-08",
        arc: "B2",
        name: "It's a Trap!",
        description: "While traveling through the Aldanna Range I mstakenly dropped several traps meant for sale. I'm afraid the shock of the drop has likely released their safe mechanisms, making them quite dangerous! Deactivating them would be hazardous at this point, so I just need someone to destroy them. It's the only way to be sure, Esther, New Hire",
        rank: 23,
        region: "The Aldanna Range",
        fee: 400,
        days: 20,
        questType: "Satisfy Petitioner",
        canDispatch: true,
        canCancel: true,
        members: 6,
        requiredTalents: {
            negotiation: 8,
            aptitude: 0,
            teamwork: 0,
            adaptability: 8,
        },
        dispatchRecommended: ["Ranger"],
        objective: "Destroy all the Traps!",
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
            gil: 2730,
            cp: 46,
            loot: "Red Geeps ×1, Wyrm Carapace ×1, Zincatite ×5"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "B2-09",
        arc: "B2",
        name: "Wanted: Lang Bros",
        description: "-WANTED!- Wanted: The Lang Brothers, for the injury of 28 members of the Arbiters of Death, a clan to which they formerly belonged. The eldest is a fierce warrior; the second, a skilled knife-fighter; the third, a famed archer; and the youngest brothers, a wielder of magicks. Jylland Defenders of the Peace",
        rank: 15,
        region: "The Bisga Greenlands",
        fee: 200,
        days: 20,
        questType: "Satisfy Petitioner",
        canDispatch: true,
        canCancel: true,
        members: 6,
        prerequisite: "Wanted: Gilmunto",
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 8,
            adaptability: 8,
        },
        objective: "Defeat the Lang Brothers!",
        law: "Forbidden: Actions by Nu Mou – Nu Mou may only move and perform basic attacks.",
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
            gil: 3380,
            cp: 30,
            loot: "Leestone ×5, Silk Bloom ×2, Fine Wool ×2"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "B2-10",
        arc: "B2",
        name: "Books of Magick",
        description: "I'm going to fail this year, I know it. I can't fail! Please, could someone exaplin about grimoires to me in really simple terms? After that, if they could tell me about the Four Great Spirits, and the ... (amended for length) Parore, Akademy Student",
        rank: 15,
        region: "The Aldanna Range",
        fee: 300,
        days: 20,
        questType: "Escort",
        canDispatch: true,
        canCancel: true,
        members: 1,
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 9,
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
            gil: 0,
            cp: 0,
            loot: ""
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "B2-15",
        arc: "B2",
        name: "For the Cause",
        description: "Salutations from Carm Mercantile. We would like to share with you our experiences protecting endangered monsters. While monsters can be dangerous in their own right, they can also be used for food and the making of medicines. Please make a donation to help us prevent the overhunting of mosnters, and ensure a prosperous future for all.",
        rank: 5,
        region: "Graszton",
        fee: 100,
        days: 20,
        questType: "Satisfy Petitioner",
        canDispatch: false,
        canCancel: true,
        members: 1,
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 7,
            adaptability: 7,
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
            gil: 0,
            cp: 0,
            loot: ""
        },
        notes: "",
        tags: ["optional"]
    }
];
