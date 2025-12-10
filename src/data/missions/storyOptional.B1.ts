// src/data/missions/storyOptional.B1.ts
// Arc B1 optional missions, accurately transcribed from Side_Quests.txt

import type { Mission } from "../../types/ffta2";

export const OPTIONAL_MISSIONS_B1: Mission[] = [
    {
        id: "B1-01",
        arc: "B1",
        name: "A Step Further",
        description: "I seek someone to escort me to Targ Wood, providing protect as necessary. I am off to work for the Imperial League of Physicians in Rozarria, and I would like to visit the places dear to my heart one last time before I leave. Thank you. Mack, Scholar at Large",
        rank: 19,
        region: "Targ Wood",
        fee: 300,
        days: 20,
        questType: "Escort",
        canDispatch: false,
        canCancel: true,
        members: 5,
        prerequisite: "The Next Step",
        requiredTalents: {
            negotiation: 22,
            aptitude: 0,
            teamwork: 22,
            adaptability: 0,
        },
        objective: "Protect your Charge and Defeat all Foes!",
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
            "Having Esuna available is recommended to handle debuffs",
        ],
        rewards: {
            gil: 4690,
            cp: 38,
            loot: "Prime Tanned Hide ×6"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "B1-02",
        arc: "B1",
        name: "The Last Step",
        description: "-Trade Requested- I will trade my magickal earrings for the Ocktor Tome of Medicine in your possession. We will do the deal in Targ Wood. Mack, White Mage",
        rank: 15,
        region: "Targ Wood",
        fee: 300,
        days: 20,
        questType: "Delivery",
        canDispatch: false,
        canCancel: true,
        members: 1,
        prerequisite: "A Step Further",
        requiredTalents: {
            negotiation: 44,
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
            gil: 4260,
            cp: 30,
            loot: "Prime Tanned Hide ×1"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "B1-03",
        arc: "B1",
        name: "Sun-Ripened Mayhem",
        description: "My fields are overrun with cockatrices! I need someone to save my tomatoes! I can't offer much in the way of a reward, but I'm desperate - those tomatoes are special! Oh, and cockatrices spook real easy, so don't bring a whole bunch of folk, or they'll just run off and hide. Farmer Colt",
        rank: 7,
        region: "Camoa",
        fee: 200,
        days: 20,
        questType: "Escort",
        canDispatch: true,
        canCancel: true,
        members: 4,
        requiredTalents: {
            negotiation: 7,
            aptitude: 0,
            teamwork: 7,
            adaptability: 0,
        },
        dispatchRecommended: ["Defender"],
        objective: "Protect the Tomatoes and Defeat all Foes!",
        law: "Forbidden: Targeting All Units – Actions targeting all units at once are forbidden.",
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
            gil: 910,
            cp: 14,
            loot: "Tomato Stalk ×2, Iron Carapace ×3, Bitter Sap ×4"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "B1-05",
        arc: "B1",
        name: "Beetle in a Haystack",
        description: "I was out walking my pet scarab beetle, Nero, and I lost him! I only took my eyes off him for a second, but he managed to scamper off somewhere. A friend of mine gave him to me before he moved away, and Nero's all I have to remember him by now. Please help me get him back! I polish him real good every day, so his shell really shines. Just look for something shiny on the ground and you should find him in no time! Letty",
        rank: 7,
        region: "Camoa",
        fee: 200,
        days: 20,
        questType: "Satisfy Petitioner",
        canDispatch: true,
        canCancel: true,
        members: 6,
        requiredTalents: {
            negotiation: 4,
            aptitude: 0,
            teamwork: 0,
            adaptability: 0,
        },
        objective: "Find the Scarab Beetle!",
        law: "Forbidden: Lightning – Weapons and Abilities to use lightning are forbidden",
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
            "Ranged magical attacks are effective in this mission",
        ],
        rewards: {
            gil: 1330,
            cp: 30,
            loot: "Pointed Horn ×2, Dark Stone ×5, Dragon Bone ×2"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "B1-07",
        arc: "B1",
        name: "The Whites of Its Eyes",
        description: "My pet's gone and run away again. How many times does this make? I've lost count! Her name's Chari, and I saved her from the other bloody orbs that picked on her because she was a different colour. You'd think she'd be a bit more grateful, but she just keeps running away. Someone help me find her! She has a beautiful white ... coat? It should make her easy to tell apart. Fes",
        rank: 21,
        region: "The Rupie Mountains",
        fee: 400,
        days: 20,
        questType: "Escort",
        canDispatch: true,
        canCancel: true,
        members: 6,
        prerequisite: "The Wayward Drake",
        requiredTalents: {
            negotiation: 11,
            aptitude: 0,
            teamwork: 11,
            adaptability: 0,
        },
        dispatchRecommended: ["Defender"],
        objective: "Protect Chari and Defeat all Foes!",
        law: "Forbidden: Fire, Ice, Lightning – Weapons and abilities that use fire, ice or lightning",
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
            cp: 42,
            loot: "Crusite Alloy ×3"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "B1-08",
        arc: "B1",
        name: "Flown the Coop",
        description: "I was taking one of the cockatrices for a walk in the Menagerie grounds when it flew into a frenzy and lashed out at me with its beak. Before I knew what had happened, it had fluttered over the pen fence and run away. This is the second time one of our monsters has gotten away from me in recent days, and if Mr. Grann finds out, I won't hear the end of it! I need someone to recover the cockatrice before anyone notice it's missing. It answers to the name of Okta. Keeper Lloyd, Grann's Menagerie",
        rank: 25,
        region: "Fluorgis",
        fee: 400,
        days: 20,
        questType: "Satisfy Petitioner",
        canDispatch: true,
        canCancel: true,
        members: 6,
        prerequisite: "The Whites of Its",
        requiredTalents: {
            negotiation: 15,
            aptitude: 0,
            teamwork: 0,
            adaptability: 15,
        },
        dispatchRecommended: ["Arcanist"],
        objective: "Weaken Okta and Defeat all Foes!",
        law: "Forbidden: Bladed Weapons – Attacks with knives, swords, blades, sabers, katanas, axes,",
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
            gil: 4500,
            cp: 50,
            loot: "Mind Ceffyl ×6"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "B1-09",
        arc: "B1",
        name: "Prepared with Love",
        description: "My husband's forgotten his lunch again! After all the work I put into making it ... I need someone to take it to him while it's still fresh. Chermie",
        rank: 6,
        region: "Targ Wood, Camoa",
        fee: 200,
        days: 20,
        questType: "Delivery",
        canDispatch: false,
        canCancel: true,
        members: 1,
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
            gil: 350,
            cp: 12,
            loot: "Cruzle Brass ×6, Coral Fragments ×1, Water Stone ×4"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "B1-10",
        arc: "B1",
        name: "Foodstuffs: Texture",
        description: "Foodstuffs njeeded. You will be required to catch specific monsters at a specific location. The details are as follows: - Must have fluffy white fur. - Enough to feed two. - To be used as an appetizer, one per serving. Too many is no good. Too few is also no good. Poison Tasters Guild",
        rank: 8,
        region: "Targ Wood",
        objective: "Procure the requested ingredients!",
        law: "Fire: Weapons and abilities that use fire are forbidden.",
        fee: 200,
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
    enemies: [
        {
            name: "Randomized Name",
            job: "Dreamhare",
            quantity: 2,
            abilities: {
                A1: {
                    setId: "enticement",
                    abilityIds: [
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
            job: "Dreamhare",
            quantity: 1,
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
                P: "unscarred"
            },
            equipment: [
            ]
        },
        {
            name: "Randomized Name",
            job: "Hoppy Bunny",
            quantity: 1,
            abilities: {
                A1: {
                    setId: "enticement",
                    abilityIds: [
                        "go-go-dance",
                        "hip-attack",
                    ]
                },
                A2: {
                    setId: "green-magick",
                    abilityIds: [
                        "blind",
                        "silence",
                    ]
                },
                R: "critical-berserk",
                P: ""
            },
            equipment: [
            ]
        },
        {
            name: "Randomized Name",
            job: "Hoppy Bunny",
            quantity: 1,
            abilities: {
                A1: {
                    setId: "enticement",
                    abilityIds: [
                        "hip-attack",
                    ]
                },
                A2: {
                    setId: "green-magick",
                    abilityIds: [
                        "sleep",
                    ]
                },
                R: "critical-berserk",
                P: ""
            },
            equipment: [
            ]
        },
    ],
        rewards: {
            gil: 620,
            cp: 16,
            loot: "Animal Bone ×3, Chocobo Skin ×1, Rat Pelt ×2"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "B1-11",
        arc: "B1",
        name: "Foodstuffs: Aroma",
        description: "Foodstuffs needed. You will be required to catch specific monsters at a specific location. The details are as follows: - Green and uniquely aromatic - Enough to feed two - Boil down considerably, so two per serving Too many is no good. Too few is also no good. Poison Tasters Guild",
        rank: 19,
        region: "Zedlei Forest",
        fee: 300,
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
        objective: "Procure the Requested Ingredients",
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
            "Bring a healer to manage HP during the encounter",
        ],
        rewards: {
            gil: 2800,
            cp: 38,
            loot: "Crusader Tonic ×2, Waltwood ×3, Kempas ×2"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "B1-12",
        arc: "B1",
        name: "Foodstuffs: Appearance",
        description: "Foodstuffs needed. You will be required to catch specific monsters at a specific location. The details are as follows: - Must be yellow and lustrous - Enough to feed nine - One is enough for three jellies Too many is no good. Too few is also no good. Poison Tasters Guild",
        rank: 29,
        region: "The Bisga Greenlands",
        fee: 400,
        days: 20,
        questType: "Satisfy Petitioner",
        canDispatch: true,
        canCancel: true,
        members: 6,
        requiredTalents: {
            negotiation: 18,
            aptitude: 0,
            teamwork: 0,
            adaptability: 18,
        },
        objective: "Procure the requested ingredients!",
        law: "Forbidden: Fire, Ice, Lightning – Weapons and abilities that use fire, ice, or lightning",
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
            gil: 5920,
            cp: 58,
            loot: "Waterwyrd Crystal ×1"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "B1-14",
        arc: "B1",
        name: "Our Playground",
        description: "Some old creeps moved in on our playground! The place with the cool odl well! Now my old woman's sayin' it's a good opportunity for me to study and stuff. Can you believe it? Someone drive those creeps away! Obuta, Camoa Kids Leader",
        rank: 7,
        region: "Camoa",
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
        objective: "Defeat all Foes!",
        law: "Forbidden: Ice – Weapons and Abilities that use ice are forbidden",
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
            gil: 700,
            cp: 14,
            loot: "Insect Husk ×2, Sanative Needle ×6, Wind Stone ×9"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "B1-15",
        arc: "B1",
        name: "Mushroom Chef",
        description: "I am a mushroom chef by trade. Know any dish with fungi in it? I cook it. So you can imagine why I'd want one of those fabled Baptiste mushrooms. Careful though, there are poisonous mushrooms growing in the same place. I'm sure you'll be fine, of course. Just try them when you're out there and you'll know the difference. Sawah, Mushroom Chef",
        rank: 11,
        region: "Baptiste Hill",
        fee: 300,
        days: 20,
        questType: "Meet Objectives",
        canDispatch: true,
        canCancel: true,
        members: 6,
        requiredTalents: {
            negotiation: 6,
            aptitude: 0,
            teamwork: 0,
            adaptability: 0,
        },
        objective: "Find a Baptiste Mushroom!",
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
            gil: 980,
            cp: 22,
            loot: "Aged Linen Thread ×3, Cottonflue ×4, Coeurl Pelt ×3"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "B1-16",
        arc: "B1",
        name: "Showdown",
        description: "Clan <Name> I beg your assistance! No sooner had we succeeded in tracking down Klesta's demesne than Bowen disappeared! I fear he has gone to deal with the beast himself. We make haste to intercept him before it is too late, but I wuold ask that you secure for us some cloudy sap .. it is a vital piece of our strategy for dealing with our flighty foe once and for all. Tweigel of House Bowen",
        rank: 24,
        region: "Targ Wood",
        fee: 400,
        days: 20,
        questType: "Defeat Mark",
        canDispatch: false,
        canCancel: true,
        members: 3,
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 11,
            adaptability: 11,
        },
        objective: "Defeat Klesta!",
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
            gil: 3030,
            cp: 48,
            loot: "Cursed Coin ×5, Skull ×2, Vampyr Fang ×2"
        },
        notes: "",
        tags: ["optional"]
    }
];
