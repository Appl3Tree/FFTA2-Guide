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
                name: "Chocobo Knight",
                type: "Monster",
            },
            {
                name: "Red",
                type: "Monster",
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
                name: "Hellhound",
                type: "Monster",
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
                name: "Great Malboros ×2",
                type: "Monster",
            },
            {
                name: "Chocobos ×2",
                type: "Monster",
            },
            {
                name: "Tonberry",
                type: "Monster",
            },
            {
                name: "Cassie",
                type: "Monster",
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
        enemies: [],
        rewards: {
            gil: 2540,
            cp: 38,
            loot: "Hero Tonic ×1"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "C1-05",
        arc: "C1",
        name: "Foodstuffs: Nutrition",
        description: "Foodstuffs needed. You will be required to catch specific monsters at a specific location. The details are as follows: - Blue, round, feathered, long of tail. - Enough to feed sixteen. - One eyeball is enough to make soup for four. Too many is no good. Too few is also no good. Poison Tasters Guild",
        rank: 27,
        region: "The Galerria Deep",
        fee: 400,
        days: 20,
        questType: "Satisfy Petitioner",
        canDispatch: true,
        canCancel: true,
        members: 6,
        prerequisite: "Foodstuffs:",
        requiredTalents: {
            negotiation: 20,
            aptitude: 0,
            teamwork: 0,
            adaptability: 20,
        },
        objective: "Procure the requested ingredients!",
        law: "Forbidden: Copycat – Using the same action as the preceding units is forbidden.",
        enemies: [
            {
                name: "Floating Eyes ×4",
                type: "Monster",
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
                name: "Zahak",
                type: "Monster",
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
        enemies: [],
        strategy: [
            "Bring a healer to manage HP during the encounter",
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
        enemies: [],
        rewards: {
            gil: 4590,
            cp: 60,
            loot: "Water Sigil ×3"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "C1-10",
        arc: "C1",
        name: "Yellow Wings in Trouble",
        description: "We're at the mercy of some pretty bad customers ... I don't think we're going to make it! Help! The Yellow Wings",
        rank: 55,
        region: "The Ruins of Delgantua",
        fee: 500,
        days: 20,
        questType: "Escort",
        canDispatch: true,
        canCancel: true,
        members: 4,
        requiredTalents: {
            negotiation: 51,
            aptitude: 0,
            teamwork: 51,
            adaptability: 0,
        },
        dispatchRecommended: ["Defender"],
        objective: "Protect the Yellow Wings and Defeat all Foes!",
        law: "Forbidden: Harming the Weak – Actions that harm a lower level unit are forbidden.",
        enemies: [],
        strategy: [
            "Prioritize high-threat targets early in the battle",
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
        enemies: [],
        rewards: {
            gil: 1050,
            cp: 18,
            loot: "Damascus ×4, Birch ×1, Quality Lumber ×5"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "C1-12",
        arc: "C1",
        name: "The Nu Mou Nobles",
        description: "I am called Madreth, clan leader of the Nu Mou Nobles. I seek a king soul to fetch a phial of healing water and a shead of recall grass. we wait beneath the lone tree on Baptiste Hill. Madreth, Nu Mou Nobles.",
        rank: 12,
        region: "Baptiste Hill",
        fee: 300,
        days: 20,
        questType: "Delivery",
        canDispatch: false,
        canCancel: true,
        members: 1,
        requiredItems: ["Recall Grass ×1", "Healing Water ×1"],
        requiredTalents: {
            negotiation: 9,
            aptitude: 0,
            teamwork: 0,
            adaptability: 0,
        },
        enemies: [],
        rewards: {
            gil: 1680,
            cp: 24,
            loot: "Healing Water ×1, Body Ceffyl ×3, Soul Ceffyl ×3"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "C1-13",
        arc: "C1",
        name: "Seeding the Harvest",
        description: "***** Help Wanted! ***** It's seeding time again, and each year we lose crops to raiding monsters. We seek hardened adventurers to stand between our livelihood and their fiendish claws! T.K. Corral",
        rank: 21,
        region: "Camoa",
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
        objective: "Defeat 10 Foes!",
        law: "Forbidden: Knockback – Actions that knock the target back are forbidden.",
        enemies: [],
        strategy: [
            "Prioritize high-threat targets early in the battle",
            "Bring a healer to manage HP during the encounter",
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
                name: "Crusader Tonic",
                type: "Monster",
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