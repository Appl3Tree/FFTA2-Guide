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
    enemies: [],
        strategy: [
            "Dispatch mission — visit Tramdine Fens, Aisenfield, and Sant D'alsa Bluff within 6 days.",
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
        strategy: [
            "Dispatch mission — visit Nazan Mines, Sant D'alsa Bluff, and Kthili Sands within 8 days.",
        ],
        rewards: {
            gil: 1750,
            cp: 38,
            loot: "Cockatrice Skin ×1"
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
        strategy: [
            "Dispatch mission — visit The Galerria Deep, Nazan Mines, The Ruins of Delgantua, and The Neslowe Passage within 13 days.",
        ],
        rewards: {
            gil: 1750,
            cp: 42,
            loot: "Mind Ceffyl ×1"
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
        { name: "Randomized Name", job: "Werewolf", quantity: 2, notes: "Moorabella battle — defeat these." },
        { name: "Randomized Name", job: "Sprite", quantity: 1, notes: "Moorabella battle — defeat." },
        { name: "Randomized Name", job: "Lamia", quantity: 2, notes: "Moorabella battle — defeat." },
        { name: "White Antlion", job: "Pit Beast", quantity: 1, notes: "DO NOT KILL — this is the target to capture. Has Critical: Vanish. Weaken then leave alive." },
        { name: "Randomized Name", job: "Antlion", quantity: 4, notes: "Bisga Greenlands battle — all Antlions except the Green one. Weak to Wind. Traps on battlefield." },
        { name: "Green Antlion", job: "Antlion", quantity: 1, notes: "Bisga Greenlands — DO NOT KILL. Defeat all other Antlions around it." },
    ],
        strategy: [
            "Three-location hunt across Moorabella, Bisga, and Zedlei. Do not kill the White Antlion or Green Antlion — defeat all other enemies.",
            "Use Hunters (Sidewinder) and Wind attacks. Antlions are weak to wind.",
        ],
        battlefield: [
            "Bisga Greenlands battle has trap tiles",
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
        strategy: [
            "Delivery mission — bring Sweet Sap ×1 to Fluorgis.",
        ],
        rewards: {
            gil: 2240,
            cp: 34,
            loot: "Body Ceffyl ×3"
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
        { name: "Randomized Name", job: "Adamantitan", quantity: 1, notes: "PRIORITY: Can damage equipped items when close. Eliminate early." },
        { name: "Randomized Name", job: "Lilith", quantity: 1, notes: "Dangerous — high priority." },
        { name: "Randomized Name", job: "Cockatrice", quantity: 2, notes: "Standard. Weak to Water and Wind." },
        { name: "Randomized Name", job: "Bloody Orb", quantity: 1, notes: "Can debuff — watch out." },
        { name: "Randomized Name", job: "Axebeak", quantity: 1, notes: "Standard monster." },
    ],
        strategy: [
            "Recipe pages are in shining sparkles on the battlefield — examine them after clearing enemies.",
            "Use Water and Wind attacks. Hunters with Sidewinder are effective against all monsters here.",
            "Target Adamantitan and Lilith first.",
        ],
        battlefield: [
            "The battlefield contains trap tiles that pose hazards",
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
        strategy: [
            "Delivery mission — bring Hedychium ×1 to Fluorgis.",
        ],
        rewards: {
            gil: 2240,
            cp: 54,
            loot: "Goldcap ×4"
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
        strategy: [
            "Delivery mission — bring Adamantite ×1 to Tramdine Fens.",
        ],
        rewards: {
            gil: 2240,
            cp: 34,
            loot: "Clear Sap ×2"
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
        { name: "Randomized Name", job: "Antlion", quantity: 5, notes: "All Antlions. Weak to Wind. Use Hunters with Sidewinder (double damage vs monsters) and Wind attacks." },
    ],
        strategy: [
            "Use Hunters with Sidewinder and Wind-element units. Antlions are weak to Wind.",
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
    enemies: [
        { name: "Randomized Name", job: "Cockatrice", quantity: 5, notes: "Some have Wake Up Call (grants adjacent ally an immediate turn) — target those first. Weak to Water and Wind." },
    ],
        strategy: [
            "Spread units widely to avoid Grouping law violations. Use ranged/magick attacks from elevated positions.",
            "Target Cockatrices with Wake Up Call first. Hunters (Sidewinder) and Water/Wind attacks recommended.",
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
