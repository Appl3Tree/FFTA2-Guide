// src/data/missions/storyOptional.D2.ts
// Arc D2 optional missions, accurately transcribed from Side_Quests.txt

import type { Mission } from "../../types/ffta2";

export const OPTIONAL_MISSIONS_D2: Mission[] = [
    {
        id: "D2-01",
        arc: "D2",
        name: "The Seas of Ordalia",
        description: "-Annual Wayfarer's Expedition!- Visit all the below areas within 6 days and receive a stamp in your wayfarer's log to win valuable prizes! Marsa Wayfarers Association List of Destinations: - Tramdine Fens - Aisenfield - Sant D'alsa Bluff",
        rank: 18,
        region: "Tramdine, Sant, Aisen",
        fee: 300,
        days: 6,
        questType: "Meet Objectives",
        canDispatch: true,
        canCancel: true,
        members: 1,
        prerequisite: "The Towns of Loar",
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 0,
            adaptability: 33,
        },
        enemies: [
            {
                name: "Bluff",
                type: "Monster",
            },
        ],
        rewards: {
            gil: 1750,
            cp: 36,
            loot: "Earth Sigil ×1"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "D2-02",
        arc: "D2",
        name: "The Wonders of Ordalia",
        description: "-Annual Wayfarer's Expedition!- Visit all the below areas within 8 days and receive a stamp in your wayfarer's log to win valuable prizes! Marsa Wayfarers Association List of Destinations: - Nazan Mines - Sant D'alsa Bluff - Kthili Sands",
        rank: 19,
        region: "Nazan, Sant, Kthili",
        fee: 300,
        days: 8,
        questType: "Meet Objectives",
        canDispatch: true,
        canCancel: true,
        members: 1,
        prerequisite: "The Seas of Ordalia",
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 0,
            adaptability: 39,
        },
        enemies: [],
        rewards: {
            gil: 1750,
            cp: 38,
            loot: "Cockatrice Skin ×1"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "D2-03",
        arc: "D2",
        name: "The Wonders of Loar",
        description: "-Annual Wayfarer's Expedition!- Visit all the below areas within 16 days and receive a stamp in your wayfarer's log to win valuable prizes! Marsa Wayfarer's Association List of Destinations: - Baptiste Hill - The Aldanna Range - The Rupie Mountains - The Ruins of Delgantua",
        rank: 20,
        region: "Bapt, Hill, Ald, Ruins",
        fee: 300,
        days: 16,
        questType: "Meet Objectives",
        canDispatch: true,
        canCancel: true,
        members: 1,
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 0,
            adaptability: 47,
        },
        enemies: [
            {
                name: "Range",
                type: "Monster",
            },
        ],
        rewards: {
            gil: 1750,
            cp: 40,
            loot: "Wyrmtwig ×1"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "D2-04",
        arc: "D2",
        name: "The Forgotten Places",
        description: "-Annual Wayfarer's Expedition!- Visit all the below areas within 13 days and receive a stamp in your wayfarer's log to win valuable prizes! Marsa Wayfarer's Association List of Destinations: - The Galerria Deep - Nazan Mines - The Ruins of Delgantua - The Neslowe Passage",
        rank: 21,
        region: "Gal, Nazan, Del, Nes",
        fee: 400,
        days: 20,
        questType: "Meet Objectives",
        canDispatch: true,
        canCancel: true,
        members: 1,
        prerequisite: "The Wonders of Loar",
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 0,
            adaptability: 51,
        },
        enemies: [],
        rewards: {
            gil: 1750,
            cp: 42,
            loot: "Mind Ceffyl ×1"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "D2-05",
        arc: "D2",
        name: "Chita on Weapons - Masters",
        description: "Ngaaa! It's just no good! I've sung the praises of focus and determination high and low, but it just doesn't seem to stick! Nothing for it but for me to give a lecture to end all lectures! Chita, Chita's Weaponers",
        rank: 49,
        region: "The Ruins of Delgantua",
        fee: 500,
        days: 20,
        questType: "Meet Objectives",
        canDispatch: true,
        canCancel: true,
        members: 4,
        prerequisite: "Chita on Weapons -",
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 0,
            adaptability: 33,
        },
        objective: "Speed Battle vs Chita's Weaponers",
        law: "Forbidden: Piercing Weapons – Attacks with rapiers and spears are forbidden.",
        enemies: [],
        strategy: [
            "Ranged magical attacks are effective in this mission",
        ],
        rewards: {
            gil: 7550,
            cp: 98,
            loot: "Bundle of Needles ×3"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "D2-06",
        arc: "D2",
        name: "Bug Hunt",
        description: "I need someone to catch these really rare antlions for me. They're supposed to be different colours from the other antlions. I never seen them myself, but they're supposed to live in the forest, or grasslands, or something like that. Oh, and I heard of one being seen near Moorabella once, too. Eckt, Bug Collector",
        rank: 30,
        region: "Zedlei, Bisga, Moora",
        fee: 400,
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
        objective: "Defeat all foes except the White Antlion!",
        law: "Forbidden: Lightning – Weapons and abilities that use lightning are forbidden.",
        enemies: [
            {
                name: "Sprite ×1",
                type: "Monster",
            },
            {
                name: "Antlions ×2",
                type: "Monster",
            },
            {
                name: "Pit Beast",
                type: "Monster",
            },
            {
                name: "Chocobo",
                type: "Monster",
            },
            {
                name: "Giant Tortoise",
                type: "Monster",
            },
        ],
        battlefield: [
            "The battlefield contains trap tiles that pose hazards",
        ],
        strategy: [
            "Prioritize high-threat targets early in the battle",
        ],
        rewards: {
            gil: 2650,
            cp: 60,
            loot: "Fire Sigil ×4, Wind Sigil ×3"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "D2-07",
        arc: "D2",
        name: "The Show's Not Over",
        description: "I am a songstress. My voice is my livelihood. I have a series of performances scheduled, but I've come down with a terrible sore throat. I cna't possible perform in this condition. I've heard sweet sap can soothe the pain. Would you bring me some? Teis, Songstress",
        rank: 17,
        region: "Flourgis",
        fee: 300,
        days: 20,
        questType: "Delivery",
        canDispatch: true,
        canCancel: true,
        members: 1,
        requiredItems: ["Sweet Sap ×1"],
        requiredTalents: {
            negotiation: 15,
            aptitude: 0,
            teamwork: 0,
            adaptability: 0,
        },
        enemies: [],
        rewards: {
            gil: 2240,
            cp: 34,
            loot: "Body Ceffyl ×3"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "D2-08",
        arc: "D2",
        name: "Fluffy Flier?",
        description: "I saw someone fly over a volcano the other day! Flitting through the air right over the hot flowing lava, they were! My mom says I'm full of it, but I know what I saw. Could someone go check it out? Uwattyo, Adventurous Boy",
        rank: 38,
        region: "The Neslowe Passage",
        fee: 500,
        days: 20,
        questType: "Investigation",
        canDispatch: true,
        canCancel: true,
        members: 6,
        requiredTalents: {
            negotiation: 44,
            aptitude: 44,
            teamwork: 0,
            adaptability: 0,
        },
        objective: "Defeat all Foes!",
        law: "Forbidden: Summoning Scions – Summoning Scions is forbidden.",
        enemies: [
            {
                name: "Sprites ×3",
                type: "Monster",
            },
            {
                name: "Banshee ×1",
                type: "Monster",
            },
            {
                name: "Brown Chocobo",
                type: "Monster",
            },
            {
                name: "Drake",
                type: "Monster",
            },
        ],
        strategy: [
            "Prioritize high-threat targets early in the battle",
            "Ranged magical attacks are effective in this mission",
        ],
        rewards: {
            gil: 5410,
            cp: 76,
            loot: "Emperor Scale ×1"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "D2-09",
        arc: "D2",
        name: "Cake: The Recipe",
        description: "I had a fight with my father the other day, and we haven't spoken a word since. I wanted to make up with him by baking one of my special carrot cakes for his birthday ... but a monster took all six pages of my recipe! Please, someone, get them back for me! Lea, Who is in truth fond of her father.",
        rank: 27,
        region: "Fluorgis",
        fee: 400,
        days: 20,
        questType: "Item Recovery",
        canDispatch: true,
        canCancel: true,
        members: 6,
        requiredTalents: {
            negotiation: 15,
            aptitude: 0,
            teamwork: 0,
            adaptability: 0,
        },
        objective: "Gather all the pages of the Recipe!",
        law: "Forbidden: Lightning – Weapons and abilities that use lightning are forbidden.",
        enemies: [
            {
                name: "Cockatrices ×2",
                type: "Monster",
            },
        ],
        battlefield: [
            "The battlefield contains trap tiles that pose hazards",
        ],
        strategy: [
            "Bring a healer to manage HP during the encounter",
            "Ranged magical attacks are effective in this mission",
        ],
        rewards: {
            gil: 2590,
            cp: 54,
            loot: "Windslicer Pinion ×4"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "D2-10",
        arc: "D2",
        name: "Cake: The Ingredients",
        description: "I went collecting ingredients to make my grandmother's special cake, and I've gone and tired myself out completely. Would someone be kind enough to procure the final ingredient, a hedychium bloom? Lea, Who is in truth not a good cook",
        rank: 18,
        region: "Fluorgis",
        fee: 300,
        days: 20,
        questType: "Delivery",
        canDispatch: true,
        canCancel: true,
        members: 6,
        requiredItems: ["Hedychium ×1"],
        prerequisite: "Cake: The Recipe",
        requiredTalents: {
            negotiation: 15,
            aptitude: 0,
            teamwork: 0,
            adaptability: 0,
        },
        enemies: [],
        rewards: {
            gil: 2240,
            cp: 54,
            loot: "Goldcap ×4"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "D2-11",
        arc: "D2",
        name: "Cake: The Catastrophe",
        description: "It took me five days, but I finally finished baking my grandmother's special cake - but on my way to deliver it to my father, I was set upon by a monster like a great ball of feathers, and it stole the cake, box and all! Won't someone please get it back for me? Lea, Who is often set upon by monsters",
        rank: 37,
        region: "Kthili Sands",
        fee: 500,
        days: 20,
        questType: "Battle",
        canDispatch: true,
        canCancel: true,
        members: 6,
        prerequisite: "Cake:The Ingredients",
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 39,
            adaptability: 39,
        },
        objective: "Defeat all Foes!",
        law: "Forbidden: Bladed Weapons – Attacks with knives, swords, blades, sabers, katanas, axes",
        enemies: [],
        battlefield: [
            "The battlefield contains trap tiles that pose hazards",
        ],
        strategy: [
            "Bring a healer to manage HP during the encounter",
        ],
        rewards: {
            gil: 6830,
            cp: 74,
            loot: "Godwood ×2"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "D2-12",
        arc: "D2",
        name: "One Red Phial",
        description: "Ever heard the story of the",
        rank: 17,
        region: "Tramdine Fens",
        fee: 300,
        days: 20,
        questType: "Delivery",
        canDispatch: true,
        canCancel: true,
        members: 1,
        requiredItems: ["Adamantite ×1"],
        requiredTalents: {
            negotiation: 15,
            aptitude: 0,
            teamwork: 0,
            adaptability: 0,
        },
        enemies: [],
        rewards: {
            gil: 2240,
            cp: 34,
            loot: "Clear Sap ×2"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "D2-13",
        arc: "D2",
        name: "My Secret Shame",
        description: "That Killan has done it again! He's thrown my final exam papers out the window. If anyone learns the marks I receivedm I'll never be able to show my face in the Akademy again. I think the papers are still in the forest behind the school. Gather them and return them with all haste! Udite, Second Year Akademy Student",
        rank: 25,
        region: "Moorabella",
        fee: 400,
        days: 20,
        questType: "Item Recovery",
        canDispatch: true,
        canCancel: true,
        members: 6,
        requiredTalents: {
            negotiation: 13,
            aptitude: 0,
            teamwork: 0,
            adaptability: 0,
        },
        objective: "Gather Udite's exam papers!",
        law: "Forbidden: Back Attack – Attacking a unit from behind is forbidden.",
        enemies: [
            {
                name: "Deadly Nightshades ×2",
                type: "Monster",
            },
            {
                name: "Sprite",
                type: "Monster",
            },
            {
                name: "Hoppy Bunny",
                type: "Monster",
            },
        ],
        rewards: {
            gil: 2720,
            cp: 50,
            loot: "Bat Wing ×5, Wyvern Wing ×1"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "D2-14",
        arc: "D2",
        name: "Maintaining the Balance",
        description: "The creatures of Tramdine Fends are on the brink of catastrophe! A swell in the number of antlions have driven the native cockatrices into decline. If something isn't done, they'll disappear from the fens altogether. Please travel to Tramdine Fens and thin the antlion population. Baran, Society of the Protection of Monsters.",
        rank: 27,
        region: "Tramdine Fens",
        fee: 400,
        days: 20,
        questType: "Battle",
        canDispatch: true,
        canCancel: true,
        members: 6,
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 18,
            adaptability: 18,
        },
        objective: "Defeat all Foes!",
        law: "Forbidden: Reaction Abilities – Reaction abilities are forbidden.",
        enemies: [
            {
                name: "Antlions ×5",
                type: "Monster",
            },
        ],
        battlefield: [
            "The battlefield contains trap tiles that pose hazards",
        ],
        strategy: [
            "Ranged magical attacks are effective in this mission",
        ],
        rewards: {
            gil: 4970,
            cp: 54,
            loot: "Skull ×2, Giant Feather ×1"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "D2-15",
        arc: "D2",
        name: "The Natural Order",
        description: "Natural habitats in the Tramdine Fens are in danger! Cockatrice wattles blot out the sun, and they're eating everything in sight! We need someone to eradicate those cockatrices. They are a blight upon the land. Goran, Friends of the Fen",
        rank: 29,
        region: "Tramdine Fens",
        fee: 400,
        days: 20,
        questType: "Battle",
        canDispatch: true,
        canCancel: true,
        members: 6,
        prerequisite: "Maintaining the",
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 20,
            adaptability: 20,
        },
        objective: "Defeat all Foes!",
        law: "Forbidden: Grouping – Ending the turn next to another unit is forbidden.",
        enemies: [],
        strategy: [
            "Bring a healer to manage HP during the encounter",
            "Ranged magical attacks are effective in this mission",
        ],
        rewards: {
            gil: 3290,
            cp: 58,
            loot: "Alraune Drill ×4, Succulent Fruit ×1"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "D2-16",
        arc: "D2",
        name: "Cilawa the Gluttonous",
        description: "I've thought up a new formula I'm eager to put to the test. I'll need someone to bring me a fresh rat tail for the mixture. Cilawa the Gluttonous",
        rank: 5,
        region: "Camoa",
        fee: 100,
        days: 20,
        questType: "Delivery",
        canDispatch: true,
        canCancel: true,
        members: 1,
        requiredItems: ["Rat Tail ×1"],
        requiredTalents: {
            negotiation: 4,
            aptitude: 0,
            teamwork: 0,
            adaptability: 0,
        },
        enemies: [],
        rewards: {
            gil: 560,
            cp: 10,
            loot: "Tanned Hide ×3, Ladies' Tresses ×2, Cloudy Sap ×3"
        },
        notes: "",
        tags: ["optional"]
    }
];
