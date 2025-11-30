// src/data/missions/storyOptional.C1.ts
// Arc C1 optional missions, accurately transcribed from Side_Quests.txt

import type { Mission } from "../../types/ffta2";

export const OPTIONAL_MISSIONS_C1: Mission[] = [
    {
        id: "C1-01",
        arc: "C1",
        name: "It's a Secret to Everybody",
        description: "My pet shelling, Titoise, has run away, kupo, and I need someone to find him for me! You see, I've been keeping him in secret, kupo. If Mr. Grann finds out, this little moogle is going to be in big trouble. Kupo! Of that wasn't bad enough, Mr. Grann's daughter, Fes, can't stand shellings. So I'm sure to catch a pom-pom lashing from both of them, kupo! Keeper Pirillo, Grann's Menagerie",
        rank: 40,
        region: "Goug",
        fee: 500,
        days: 20,
        questType: "Satisfy Petitioner",
        canDispatch: true,
        canCancel: true,
        members: 6,
        prerequisite: "Flown the Coop",
        requiredTalents: {
            negotiation: 44,
            aptitude: 0,
            teamwork: 0,
            adaptability: 44,
        },
        objective: "Weaken Titoise and Defeat all Foes!",
        law: "Forbidden: Ice – Weapons and abilities that use ice are forbidden.",
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
            gil: 4080,
            cp: 80,
            loot: "Aqua Galac ×1"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "C1-02",
        arc: "C1",
        name: "Hellhound Astray",
        description: "I was cleaning out Helda's pen - one of our hellhounds - and when I finished she was gone! She must have broken free of her chain, but I know who they'll blame! Helda's one of Mrs. Zamaree's favourites, and you can be sure that if she finds her missing, there will be, well, hell to pay. I need someone to find Helda and bring her back before she's missed! Keeper, Leena, Grann's Menagerie",
        rank: 39,
        region: "Kthili Sands",
        fee: 500,
        days: 20,
        questType: "Satisfy Petitioner",
        canDispatch: true,
        canCancel: true,
        members: 6,
        prerequisite: "It's a Secret to",
        requiredTalents: {
            negotiation: 33,
            aptitude: 0,
            teamwork: 0,
            adaptability: 33,
        },
        dispatchRecommended: ["Arcanist"],
        objective: "Weaken Helda and Defeat all Foes!",
        law: "Forbidden: Bludgeoning Weapons – Attacks with rods, staves, poles, knucles, hammers, and",
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
            gil: 7370,
            cp: 78,
            loot: "Gold Chalice ×1"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "C1-03",
        arc: "C1",
        name: "My Little Carrot",
        description: "Oh, it's terrible. Simply terrible! My poor little Carrot has gone wild all of a sudden and hied off to gods now where! Her eyes ... Oh, her eyes were like unto a malboro's! I hope you can bring her back, but if you can't, perhaps you could put her out of her misery? Mrs. Zamaree, A certain menagerie owner's wife.",
        rank: 43,
        region: "Zedlei Forest",
        fee: 500,
        days: 20,
        questType: "Defeat Mark",
        canDispatch: true,
        canCancel: true,
        members: 6,
        prerequisite: "Hellhound Astray",
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 44,
            adaptability: 44,
        },
        objective: "Defeat Carrot!",
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
        battlefield: [
            "The battlefield contains trap tiles that pose hazards",
        ],
        rewards: {
            gil: 6090,
            cp: 86,
            loot: "Scarletite ×1"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "C1-04",
        arc: "C1",
        name: "An Earnest Multitde",
        description: "I seek the love of my life! My search has led me through city streets and far abroad. I have even taken up the pen, and met four charming ladies in my correspondence. Ah, but I've made a mess pof things by scheduling a rendezvous with each of them on the same day! I need someone to meet three of the lucky damsels in my steed. Only the dashing need apply - I've a reputation to consider! Marnot, Pride of Fluorgis",
        rank: 19,
        region: "Fluor, Moora, Targ",
        fee: 300,
        days: 6,
        questType: "Satisfy Petitioner",
        canDispatch: true,
        canCancel: true,
        members: 1,
        prerequisite: "An Earnest Quandary",
        requiredTalents: {
            negotiation: 28,
            aptitude: 0,
            teamwork: 0,
            adaptability: 28,
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
            gil: 3780,
            cp: 54,
            loot: "Demon Feather ×2, Adamantite ×2"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "C1-06",
        arc: "C1",
        name: "Foodstuffs: Bon Appetit",
        description: "Foodstuffs needed. You will be required to catch specific monsters at a specific location. The details are as follows: - Hidden within a treasure chest. - Enough to feed ten. - One finger per serving. Too many is no good. Too few is also no good. Poison Tasters Guild",
        rank: 40,
        region: "Goug",
        fee: 500,
        days: 20,
        questType: "Satisfy Petitioner",
        canDispatch: true,
        canCancel: true,
        members: 6,
        prerequisite: "Foodstuff: Nutrition",
        requiredTalents: {
            negotiation: 33,
            aptitude: 0,
            teamwork: 0,
            adaptability: 33,
        },
        objective: "Procure the Requested Ingredients",
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
            "Treasure chests are present on the battlefield",
        ],
        rewards: {
            gil: 8420,
            cp: 80,
            loot: "Mysidia Alloy ×2"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "C1-07",
        arc: "C1",
        name: "An Earnest Quandary",
        description: "I seek the love of my life! My search has led me through city streets and far aboard. I have even taken up the pen, and met three charming ladies in my correspondence. Ah, but I've made a mess of things by scheduling a rendezvous with each of them on the same day! I need someone to meet two of the lucky damsels in my stead. Only the dashing need apply - I've a reputation to consider! Marnot, Pride of Fluorgis",
        rank: 14,
        region: "Camoa, Graszton",
        fee: 300,
        days: 6,
        questType: "Satisfy Petitioner",
        canDispatch: true,
        canCancel: true,
        members: 1,
        prerequisite: "An Earnest Search",
        requiredTalents: {
            negotiation: 15,
            aptitude: 0,
            teamwork: 0,
            adaptability: 15,
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
            cp: 28,
            loot: "Aged Turtle Shell ×4"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "C1-09",
        arc: "C1",
        name: "House Bowen's Challenge",
        rank: 30,
        region: "Targ Wood",
        fee: 400,
        days: 20,
        questType: "Meet Objectives",
        canDispatch: true,
        canCancel: true,
        members: 4,
        prerequisite: "Showdown",
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 0,
            adaptability: 15,
        },
        objective: "Speed Battle vs. House Bowen",
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
        rewards: {
            gil: 12780,
            cp: 99,
            loot: "Orichalcum ×1"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "C1-11",
        arc: "C1",
        name: "An Earnest Search",
        description: "I seek the love of my life! My search has lead me through city streets and far abroad. I have even taken up the pen, and met two charming ladies in my correspondence. Ah, but I've made a mess of things by scheduling a rendezvous with each of them on the same day! I need someone to meet one of the lucky damsels in my stead. Only the dashing need apply - I've a reputation to consider. Marnot, Pride of Fluorgis",
        rank: 9,
        region: "Targ Wood",
        fee: 200,
        days: 6,
        questType: "Satisfy Petitioner",
        canDispatch: true,
        canCancel: true,
        members: 1,
        requiredTalents: {
            negotiation: 8,
            aptitude: 0,
            teamwork: 0,
            adaptability: 8,
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
            gil: 9240,
            cp: 42,
            loot: "Tiny Mushrooms ×2"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "C1-14",
        arc: "C1",
        name: "A Harvest Hand",
        description: "***** Help Wanted! ***** It's harvest time, and what a year it's been! Our crop is so large, we need all the hands we can find to help us bring it in. The more you harvest, the greater your reward! T. K. Corral",
        rank: 25,
        region: "Camoa",
        fee: 400,
        days: 20,
        questType: "Satisfy Petitioner",
        canDispatch: true,
        canCancel: true,
        members: 6,
        prerequisite: "Seeding the Harvest",
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 0,
            adaptability: 9,
        },
        objective: "Gather as much fruit as you can in 4 rounds!",
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
            "Bring a healer to manage HP during the encounter",
        ],
        rewards: {
            gil: 12830,
            cp: 50,
            loot: "Healing Water ×2, Insect Husk ×1"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "C1-15",
        arc: "C1",
        name: "The Bangaa Brotherhood",
        description: "Mocedad's the name, leader of the Bangaa Brotherhood. We're looking to get our hands on a fire stone and a piece of zinconium. If anyone happens on any they'd be willing to part with, they can find us camped along the highroad in the Bisga Greenlands for a time. Mocedad, Bangaa Brotherhood",
        rank: 19,
        region: "The Bisga Greenlands",
        fee: 300,
        days: 20,
        questType: "Delivery",
        canDispatch: false,
        canCancel: true,
        members: 1,
        requiredItems: ["Fire Stone ×1", "Zinconium ×1"],
        requiredTalents: {
            negotiation: 11,
            aptitude: 0,
            teamwork: 0,
            adaptability: 0,
        },
        enemies: [],
        rewards: {
            gil: 2020,
            cp: 38,
            loot: "Zinconium ×1, Sweet Sap ×5, Rat Pelt ×1"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "C1-16",
        arc: "C1",
        name: "It's the Thought",
        description: "I've been thinking of getting a gift for my employer. A little treat of sorts-but something healthy. They saw succulent fruit has a number of benefits. But not too many, I hope. If he were any healthier, he would work me to death! Tagore, Aspiring Apprentice",
        rank: 7,
        region: "Graszton",
        fee: 200,
        days: 4,
        questType: "Delivery",
        canDispatch: true,
        canCancel: true,
        members: 1,
        requiredTalents: {
            negotiation: 7,
            aptitude: 0,
            teamwork: 0,
            adaptability: 0,
        },
        enemies: [],
        rewards: {
            gil: 1120,
            cp: 14,
            loot: "Fire Stone ×5, Whisperweed ×1, Gun Gear ×2"
        },
        notes: "",
        tags: ["optional"]
    }
];
