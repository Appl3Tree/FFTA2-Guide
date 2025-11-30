// src/data/missions/storyOptional.A2.ts
// Arc A2 optional missions, accurately transcribed from Side_Quests.txt

import type { Mission } from "../../types/ffta2";

export const OPTIONAL_MISSIONS_A2: Mission[] = [
    {
        id: "A2-01",
        arc: "A2",
        name: "Camoa Cup",
        description: "Clan Tourneys are Under Way! The next tourney will be the Camoa Cup Rules are as follows: - Maximum team size: 6 - Bouts to be won: 3 Tourney Guild - Camoa Branch",
        rank: 19,
        region: "Camoa",
        fee: 300,
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
        dispatchRecommended: ["Lanista"],
        objective: "Defeat all Foes in the entry bout!",
        law: "Forbidden: Using MP – Abilities that use MP are forbidden.",
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
            gil: 2400,
            cp: 38,
            loot: "Gigas Pendant ×1"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "A2-02",
        arc: "A2",
        name: "The Sun Seal",
        description: "I begin to grasp the messag within the Stone, yet only dimly ... Perhaps I have erred, made some fundamental mistake in my research. I need you to try the Sun Seal to know if I am right or wrong. Mauri, No-Name Researcher",
        rank: 28,
        region: "Graszton",
        fee: 400,
        days: 20,
        questType: "Investigation",
        canDispatch: false,
        canCancel: true,
        members: 6,
        prerequisite: "The Moon Seal",
        requiredTalents: {
            negotiation: 13,
            aptitude: 13,
            teamwork: 0,
            adaptability: 0,
        },
        objective: "Examine the Stone with No Name!",
        law: "Forbidden: Items – Items are forbidden.",
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
            gil: 3590,
            cp: 56,
            loot: "Dragon Bone ×2, Onion ×2"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "A2-03",
        arc: "A2",
        name: "The Moon Seal",
        description: "The Stone with No Name was no mere stone! What widsom did the ancient leave for us to find? I'll need to know more in order to decipher their message to us. The legend tells of three seals. I want you to try the second, known as the Moon Seal. Mauri, No-name researcher",
        rank: 18,
        region: "Camoa",
        fee: 300,
        days: 20,
        questType: "Investigation",
        canDispatch: false,
        canCancel: true,
        members: 6,
        prerequisite: "The Star Seal",
        requiredTalents: {
            negotiation: 8,
            aptitude: 8,
            teamwork: 0,
            adaptability: 0,
        },
        objective: "Examine the Stone with No Name!",
        law: "Forbidden: Lightning – Weapons and abilities that use lightning are forbidden",
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
            gil: 1160,
            cp: 36,
            loot: "Xergis Tin ×2"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "A2-04",
        arc: "A2",
        name: "Wanted: The Cyanwolf",
        description: "-WANTED!- Wanted: The Cyanwolf, a new strain of wolf cited for 17 counts of pasture damage and 24 counts of disturbing the peace. Known to travel with a pack, though the mark may be distinguished by its unusual colouration. Jylland Defenders of the Peace",
        rank: 3,
        region: "Camoa",
        fee: 100,
        days: 20,
        questType: "Headhunt",
        canDispatch: true,
        canCancel: true,
        members: 6,
        prerequisite: "Wanted: Ughor",
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 1,
            adaptability: 1,
        },
        objective: "Defeat the Cyanwolf!",
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
            gil: 2630,
            cp: 6,
            loot: "Wolf Pelt ×3, Earth Stone ×6, Tarkov Crystal ×4"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "A2-05",
        arc: "A2",
        name: "Graszton Cup",
        description: "Clan Tourneys are Under Way! The next tourney will be the Graszton Cup. Rules are as follows: - Maximum team size : 4 - Bouts to be won: 3 Tourney Guild - Graszton Branch",
        rank: 29,
        region: "Graszton",
        fee: 300,
        days: 20,
        questType: "Battle",
        canDispatch: true,
        canCancel: true,
        members: 4,
        prerequisite: "Camoa Cup",
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 8,
            adaptability: 8,
        },
        dispatchRecommended: ["Lanista"],
        objective: "Defeat all foes in the Entry Bout!",
        law: "Forbidden: Opportunity Commands – Opportunity Commands are forbidden.",
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
            gil: 4030,
            cp: 58,
            loot: "Ice Sigil ×2"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "A2-06",
        arc: "A2",
        name: "The Stone With No Name",
        description: "My teacher, Mauri discovered the message within the Stone with No Name, yet he passed away before he could see his research through till the end. He once told me that the",
        rank: 42,
        region: "The Ruins of Delgantua",
        fee: 500,
        days: 20,
        questType: "Investigation",
        canDispatch: false,
        canCancel: true,
        members: 6,
        prerequisite: "The Sun Seal",
        requiredTalents: {
            negotiation: 39,
            aptitude: 39,
            teamwork: 0,
            adaptability: 0,
        },
        objective: "Examine the Stone with No Name!",
        law: "Forbidden: Restoring HP – Restoring HP is forbidden.",
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
            gil: 6530,
            cp: 84,
            loot: "Mythril ×1"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "A2-07",
        arc: "A2",
        name: "The Whom Gods Bow",
        description: "I heard once from an Esper that there exists something greater than them - the scions. What are these scions to whom the Espers bow and make obeisance? If there is someone who knows, I would have them teach me! Scytha, Summoner",
        rank: 17,
        region: "The Aldanna Range",
        fee: 300,
        days: 20,
        questType: "Investigation",
        canDispatch: true,
        canCancel: true,
        members: 1,
        prerequisite: "An Unfamiliar Land",
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 33,
            adaptability: 33,
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
            "Having Esuna available is recommended to handle debuffs",
            "Bring a healer to manage HP during the encounter",
        ],
        rewards: {
            gil: 7760,
            cp: 82,
            loot: ""
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "A2-10",
        arc: "A2",
        name: "Odd Places",
        description: "There is a well about which strange rumours always spring up around this time of year. They say it glows in the depth of night, when all lies sleeping, or that monsters not usually seen in these parts appear, even that there are sometimes more wells, or fewer. Could someone please find out the truth? Typical Camoan Housewife",
        rank: 39,
        region: "Camoa",
        fee: 500,
        days: 20,
        questType: "Satisfy Petitioner",
        canDispatch: false,
        canCancel: true,
        members: 6,
        requiredTalents: {
            negotiation: 28,
            aptitude: 0,
            teamwork: 0,
            adaptability: 28,
        },
        objective: "Examine the Wells!",
        law: "Forbidden: Items – Items are forbidden.",
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
            cp: 78,
            loot: "Fire Sigil ×3"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "A2-11",
        arc: "A2",
        name: "What Was Lost",
        description: "One of my house's products-in-development was stolen when bandits intercepted a shipment. It contained special materials, and should it be resold to another house, all the time and energy we spent creating it will have been for naught. Seeking information as to its whereabouts! Margot, Executive Squire, House Camelot",
        rank: 9,
        region: "Targ Wood",
        fee: 200,
        days: 20,
        questType: "Investigation",
        canDispatch: true,
        canCancel: true,
        members: 1,
        prerequisite: "The Way of the Meek",
        requiredTalents: {
            negotiation: 8,
            aptitude: 8,
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
            gil: 840,
            cp: 18,
            loot: "Hedychium ×2, Storm Stone ×4"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "A2-12",
        arc: "A2",
        name: "The Way of the Meek",
        description: "Someone's after me, I'm sure of it. But why? I haven't a clue. I'm so very frightened. Please, someone - protect me! If it's gil you want, I can pay! Dayvis the Meek",
        rank: 15,
        region: "The Bisga Greenlands",
        fee: 300,
        days: 20,
        questType: "Satisfy Petitioner",
        canDispatch: true,
        canCancel: true,
        members: 5,
        requiredTalents: {
            negotiation: 8,
            aptitude: 0,
            teamwork: 8,
            adaptability: 0,
        },
        dispatchRecommended: ["Defender"],
        objective: "Protect Dayvis and Defeat all Foes!",
        law: "Forbidden: Items – Items are forbidden",
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
            gil: 3400,
            cp: 30,
            loot: "Superior Silk Thread ×3, Earth Stone ×3"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "A2-13",
        arc: "A2",
        name: "Fluorgis Cup",
        description: "Clan Tourneys are Under Way! The next tourney will be the Fluorgis Cup. Rules are as follows: - Maximum team size: 1 - Bouts to be won: 3 Tourney Guild - Fluorgis Branch",
        rank: 24,
        region: "Fluorgis",
        fee: 400,
        days: 20,
        questType: "Battle",
        canDispatch: true,
        canCancel: true,
        members: 1,
        prerequisite: "Moorabella Cup",
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 15,
            adaptability: 15,
        },
        dispatchRecommended: ["Gladiator"],
        objective: "Defeat all foes in the entry bout!",
        law: "Forbidden: Buffs – Buffs are forbidden.",
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
            gil: 2730,
            cp: 48,
            loot: ""
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "A2-14",
        arc: "A2",
        name: "The Way of the Timid",
        description: "I've heard there are many robbers about these days, and I'd rather not travel alone. Seeking an armed escort! I've hard good things about Clan (NAME) - they'd really be best. If you can see this posting, please come to the Galerria Deep. We will meet there! Fayk the Somewhat Timid",
        rank: 18,
        region: "The Galerria Deep",
        fee: 300,
        days: 20,
        questType: "Battle",
        canDispatch: true,
        canCancel: true,
        members: 6,
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 9,
            adaptability: 9,
        },
        dispatchRecommended: ["Defender"],
        objective: "Defeat all Foes!",
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
        strategy: [
            "Prioritize high-threat targets early in the battle",
            "Having Esuna available is recommended to handle debuffs",
            "Ranged magical attacks are effective in this mission",
        ],
        rewards: {
            gil: 3330,
            cp: 36,
            loot: "Spider Silk ×1, Cod Scale ×1"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "A2-15",
        arc: "A2",
        name: "Pirate Attack",
        description: "We've received word that one of our merchant ships is being pursued by pirates. They're likely after her cargo of gemstones. She's docked in Graszton Port - someone go to her aid! Galerria Jewelers",
        rank: 13,
        region: "Graszton",
        fee: 300,
        days: 20,
        questType: "Satisfy Petitioner",
        canDispatch: true,
        canCancel: true,
        members: 6,
        requiredTalents: {
            negotiation: 7,
            aptitude: 0,
            teamwork: 0,
            adaptability: 7,
        },
        objective: "Defeat Lord Grayrl before he boards the ship!",
        law: "Forbidden: Harming Humes – Actions that harm Humes are forbidden.",
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
            gil: 2450,
            cp: 26,
            loot: "Malboro Vine ×2, Foul Liquid ×4, Sturdy Bone ×3"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "A2-16",
        arc: "A2",
        name: "Wanted: Big Eyes",
        description: "-WANTED!- Wanted: Big Eyes, for 3 counts of the disruption of business and 25 counts of inducing shock. Big Eyes possess a single large eyeball and generally travel in packs. Jylland Defenders of the Peace",
        rank: 17,
        region: "The Aldanna Range",
        fee: 200,
        days: 20,
        questType: "Headhunt",
        canDispatch: true,
        canCancel: true,
        members: 6,
        prerequisite: "Wanted: Lang Bros",
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 9,
            adaptability: 9,
        },
        objective: "Defeat the Big Eyes!",
        law: "Forbidden: Knockback – Actions that knock the target back are forbidden",
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
            cp: 34,
            loot: "Prime Tanned Hide ×1, Wyrm Carapace ×1"
        },
        notes: "",
        tags: ["optional"]
    }
];
