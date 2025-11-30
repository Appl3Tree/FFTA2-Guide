// src/data/missions/storyOptional.A3.ts
// Arc A3 optional missions, accurately transcribed from Side_Quests.txt

import type { Mission } from "../../types/ffta2";

export const OPTIONAL_MISSIONS_A3: Mission[] = [
    {
        id: "A3-01",
        arc: "A3",
        name: "Goug Cup",
        description: "Clan Tourneys are Under Way! The next tourney will be the Goug Cup. Rules are as follows: - Maximum team size: 6 - Bouts to be won: 3 Tourney Guild - Goug Branch",
        rank: 26,
        region: "Goug",
        fee: 400,
        days: 20,
        questType: "Battle",
        canDispatch: true,
        canCancel: true,
        members: 6,
        prerequisite: "Fluorgis Cup",
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 20,
            adaptability: 20,
        },
        dispatchRecommended: ["Lanista"],
        objective: "Defeat all foes in the entry bout!",
        law: "Forbidden: Grouping – Ending the turn next to another unit is forbidden.",
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
            gil: 2630,
            cp: 52,
            loot: ""
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "A3-03",
        arc: "A3",
        name: "Wanted: Mirage Bunny",
        description: "-WANTED!- Wanted: The Mirage Bunny, for 1,268 counts of footpadery abd 4,232 counts of eating and running, Small in size, adorable in aspect, and quick to flee the scene of the crime. Jylland Defenders of the Peace",
        rank: 19,
        region: "The Galerria Deep",
        fee: 300,
        days: 20,
        questType: "Headhunt",
        canDispatch: true,
        canCancel: true,
        members: 6,
        prerequisite: "Wanted: Big Eyes",
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 11,
            adaptability: 11,
        },
        objective: "Defeat the Mirage Bunny!",
        law: "Forbidden: Instruments and Books – Attacks with instruments and books are forbidden.",
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
            gil: 5710,
            cp: 38,
            loot: "Pagoda Wood ×5"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "A3-05",
        arc: "A3",
        name: "Loar Cup",
        description: "Clan Tourneys are Under Way! The next tourney will be the Loar Cup. Rules are as follows: - Maximum team size: 6 - Bouts to be won: 5 Tourney Guild - Jylland Branch",
        rank: 34,
        region: "Moorabellla",
        fee: 500,
        days: 20,
        questType: "Battle",
        canDispatch: true,
        canCancel: true,
        members: 6,
        prerequisite: "Goug Cup",
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 28,
            adaptability: 28,
        },
        dispatchRecommended: ["Lanista"],
        objective: "Defeat all foes in the entry bout!",
        law: "Forbidden: Using MP – Actions that consume MP are forbidden.",
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
            gil: 4290,
            cp: 68,
            loot: ""
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "A3-06",
        arc: "A3",
        name: "Wanted: Florah",
        description: "-WANTED!- Wanted: Florah, for various injuries inflicted on loggers, and for escaping incarceration. A young girl, Florah exhibits a strange talent for controlling vegetative life. Jylland Defenders of the Peace",
        rank: 21,
        region: "Baptiste Hill",
        fee: 400,
        days: 20,
        questType: "Headhunt",
        canDispatch: true,
        canCancel: true,
        members: 6,
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 13,
            adaptability: 13,
        },
        objective: "Defeat Florah!",
        law: "Forbidden: >50 Damage – Dealing >50 damage is forbidden.",
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
            gil: 4010,
            cp: 42,
            loot: "Rabbit Tail ×4, Screamroot ×1"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "A3-08",
        arc: "A3",
        name: "Death March II",
        description: "- The Game Is On! - Wanted: Participants for the greatest game in Ivalice! This time, it's the second Death March. To the victor go the spoils. - Rules of the Game - * Uphold the Law Bronkrise Gamer's Guild",
        rank: 28,
        region: "Graszton",
        fee: 400,
        days: 20,
        questType: "Uphold the Law",
        canDispatch: true,
        canCancel: true,
        members: 6,
        prerequisite: "Death March",
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 15,
            adaptability: 15,
        },
        dispatchRecommended: ["Sage"],
        objective: "Uphold the Law and Defeat all Foes!",
        law: "Forbidden: Not Moving 1 Tile – Each unit must move exactly 1 tile before ending its turn",
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
            gil: 2770,
            cp: 56,
            loot: "Lightwing Crystal ×1"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "A3-09",
        arc: "A3",
        name: "Ordalia Cup",
        description: "Clan Tourneys are Under Way! The next tourney will be the Ordalia Cup. Rules are as follows: - Maximum team size: 6 - Bouts to be won: 5 Tourney Guild - Rozarria Branch",
        rank: 37,
        region: "Fluorgis",
        fee: 500,
        days: 20,
        questType: "Battle",
        canDispatch: true,
        canCancel: true,
        members: 6,
        prerequisite: "Loar Cup",
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 39,
            adaptability: 39,
        },
        dispatchRecommended: ["Lanista"],
        objective: "Defeat all foes in the entry bout!",
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
        strategy: [
            "Prioritize high-threat targets early in the battle",
            "Having Esuna available is recommended to handle debuffs",
            "Bring a healer to manage HP during the encounter",
            "Ranged magical attacks are effective in this mission",
        ],
        rewards: {
            gil: 4660,
            cp: 74,
            loot: ""
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "A3-10",
        arc: "A3",
        name: "Wanted: Tonberrion",
        description: "-WANTED!- Wanted: Tonberrion, for possession of a deadly weapon (carving knife) and rampant hatred. Must be dealt with in four rounds of battle if further losses are to be avoided. Jylland Defenders of the Peace",
        rank: 23,
        region: "Tramdine Fens",
        fee: 400,
        days: 20,
        questType: "Headhunt",
        canDispatch: true,
        canCancel: true,
        members: 6,
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 15,
            adaptability: 15,
        },
        objective: "Defeat the tonberrions in 4 rounds!",
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
        rewards: {
            gil: 3190,
            cp: 46,
            loot: "Low Arcana ×3"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "A3-11",
        arc: "A3",
        name: "Death March, III",
        description: "-The Game Is On!- Wanted: Participants for the greatest game in Ivalice! This time, it's the final Death March. To the victor go the spoils. - Rules of the Game - * Uphold the Law Bronkrise Gamer's Guild",
        rank: 41,
        region: "Graszton",
        fee: 500,
        days: 20,
        questType: "Uphold the Law",
        canDispatch: true,
        canCancel: true,
        members: 6,
        prerequisite: "Death March, II",
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 39,
            adaptability: 39,
        },
        dispatchRecommended: ["Sage"],
        objective: "Uphold the Law and Defeat all Foes!",
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
        rewards: {
            gil: 5520,
            cp: 70,
            loot: ""
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "A3-13",
        arc: "A3",
        name: "Jylland Cup",
        description: "Clan Tourneys are Under Way! The next tourney will be the Jylland Cup. Rules are as follows: - Maximum team size: 6 - Bouts to be won: 7 Tourney Guild - Ivalice Headquarters",
        rank: 41,
        region: "Moorabella",
        fee: 500,
        days: 20,
        questType: "Battle",
        canDispatch: true,
        canCancel: true,
        members: 6,
        prerequisite: "Ordalia Cup",
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 44,
            adaptability: 44,
        },
        dispatchRecommended: ["Lanista"],
        objective: "Defeat all foes in the entry bout!",
        law: "Forbidden: Dealing < 100 Damage – Dealing < 100 Damage is forbidden.",
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
            gil: 6270,
            cp: 82,
            loot: ""
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "A3-14",
        arc: "A3",
        name: "Wanted: Gaitsnipe",
        description: "-WANTED!- Wanted: Gaitsnipe, for poaching offenses, and the assassination of notable personages. These cold-blooded killers are highly skilled in the use of ranged- weaponry. Jylland Defenders of the Peace",
        rank: 24,
        region: "Baptiste Hill",
        fee: 400,
        days: 20,
        questType: "Headhunt",
        canDispatch: true,
        canCancel: true,
        members: 6,
        prerequisite: "Wanted: Tonberrion",
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 18,
            adaptability: 18,
        },
        objective: "Defeat Gaitsnipe!",
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
            "The battlefield contains trap tiles that pose hazards",
        ],
        strategy: [
            "Prioritize high-threat targets early in the battle",
            "Bring a healer to manage HP during the encounter",
            "Ranged magical attacks are effective in this mission",
        ],
        rewards: {
            gil: 5410,
            cp: 48,
            loot: "Malboro Wine ×2"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "A3-15",
        arc: "A3",
        name: "Something's Dropped!",
        description: "One of the mooglewalkers we use for transporting goods has overturned! It was full of valuable gemstones, kupo! If someone makes off with the load, we're finished for sure! Bankruptcy, kupo!!! Retrieve the load as soon as you can! Save our house, kupo! Moogle Porters",
        rank: 27,
        region: "Nazan Mines",
        fee: 400,
        days: 20,
        questType: "Item Recovery",
        canDispatch: true,
        canCancel: true,
        members: 6,
        requiredTalents: {
            negotiation: 18,
            aptitude: 0,
            teamwork: 0,
            adaptability: 0,
        },
        objective: "Gather all the Gemstones!",
        law: "Forbidden: Reaction Abilities – Reaction Abilities are forbidden.",
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
            gil: 4820,
            cp: 54,
            loot: "Tanned Beast Hide ×3"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "A3-16",
        arc: "A3",
        name: "Hunting Season",
        description: "-The Game Is On!- Wanted: Participants for the greatest game in Ivalice! This time, it's the Jylland Hunt. To the victor go the spoils. - Rules of the Game - * Remove the tag from your quarry to score * Time limit: One year Bronkise Gamer's Guild",
        rank: 46,
        region: "Graszton, Kthili Sands",
        fee: 500,
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
            gil: 8750,
            cp: 92,
            loot: "Quality Pelt ×1, White Thread ×1"
        },
        notes: "",
        tags: ["optional"]
    }
];
