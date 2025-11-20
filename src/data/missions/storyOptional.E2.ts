// src/data/missions/storyOptional.E2.ts
// Arc E2 optional missions, accurately transcribed from Side_Quests.txt

import type { Mission } from "../../types/ffta2";

export const OPTIONAL_MISSIONS_E2: Mission[] = [
    {
        id: "E2-05",
        arc: "E2",
        name: "Survey No. 258",
        description: "Wanted: Researchers to assist with geological survey of the Galerria Deep. Please survey the area assigned and report your findings. Jylland Geological Survey Committee",
        rank: 24,
        region: "The Galerria Deep",
        fee: 400,
        days: 20,
        questType: "Satisfy Petitioner",
        canDispatch: true,
        canCancel: true,
        members: 6,
        requiredTalents: {
            negotiation: 13,
            aptitude: 0,
            teamwork: 0,
            adaptability: 13,
        },
        objective: "Survey points of geological interest!",
        law: "Forbidden: Bludgeoning Weapons – Attacks with rods, staves, poles, knuckles, hammers and maces",
        enemies: [
            {
                name: "Ahrimans ×2",
                type: "Monster",
            },
            {
                name: "Zombies ×3",
                type: "Monster",
            },
            {
                name: "Black Chocobo",
                type: "Monster",
            },
        ],
        battlefield: [
            "The battlefield contains trap tiles that pose hazards",
        ],
        strategy: [
            "Having Esuna available is recommended to handle debuffs",
        ],
        rewards: {
            gil: 5000,
            cp: 48,
            loot: "Leestone ×7, Quality Pelt ×1"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "E2-06",
        arc: "E2",
        name: "Survey No. 259",
        description: "Wanted: Researchers to assist with geological survey of Nazan Mines. Please survey the area assigned and report your findings. Transportation fees will be provided. Jylland Geological Survey Committee",
        rank: 33,
        region: "Nazan Mines",
        fee: 500,
        days: 20,
        questType: "Satisfy Petitioner",
        canDispatch: true,
        canCancel: true,
        members: 6,
        prerequisite: "Survey No. 258",
        requiredTalents: {
            negotiation: 22,
            aptitude: 0,
            teamwork: 0,
            adaptability: 22,
        },
        objective: "Survey points of geological interest!",
        law: "Forbidden: Summoning Scions – Summoning Scions is forbidden.",
        enemies: [
            {
                name: "Plague",
                type: "Monster",
            },
            {
                name: "Zombie",
                type: "Monster",
            },
            {
                name: "White Mage",
                type: "Monster",
            },
        ],
        strategy: [
            "Prioritize high-threat targets early in the battle",
            "Bring a healer to manage HP during the encounter",
        ],
        rewards: {
            gil: 5250,
            cp: 66,
            loot: "Darklord Crystal ×5, Demon Feather ×3"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "E2-07",
        arc: "E2",
        name: "Survey No. 260",
        description: "Wanted: Researchers to assist with geological survey of the Neslowe Passage. Please survey the area assigned and report your findings. Transportation fees and hazard pay (x2) will be provided. Jylland Geological Survey Committee",
        rank: 42,
        region: "The Neslowe Passage",
        fee: 500,
        days: 20,
        questType: "Satisfy Petitioner",
        canDispatch: true,
        canCancel: true,
        members: 6,
        prerequisite: "Survey No. 259",
        requiredTalents: {
            negotiation: 44,
            aptitude: 0,
            teamwork: 0,
            adaptability: 44,
        },
        objective: "Survey Points of Geological Interest!",
        law: "Forbidden: Opportunity Commands – Opportunity Commands are forbidden.",
        enemies: [
            {
                name: "Ninja",
                type: "Monster",
            },
        ],
        rewards: {
            gil: 10250,
            cp: 84,
            loot: "Firebird Crystal ×1"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "E2-08",
        arc: "E2",
        name: "Survey No. 261",
        description: "Wanted: Researchers to assist with geological survey of Zellea, the Forbidden Land. Please survey the area assigned and report your findings. Transportation fees and hazard pay (x3) will be provided. Jylland Geological Survey Committee",
        rank: 56,
        region: "Zellea, Forbidden Land",
        fee: 500,
        days: 20,
        questType: "Satisfy Petitioner",
        canDispatch: true,
        canCancel: true,
        members: 6,
        prerequisite: "Survey No. 260",
        requiredTalents: {
            negotiation: 54,
            aptitude: 54,
            teamwork: 0,
            adaptability: 0,
        },
        objective: "Survey Points of Geological Interest!",
        law: "Forbidden: Targeting Distant Units – Actions targeting units two or more tiles away are forbidden.",
        enemies: [],
        strategy: [
            "Bring a healer to manage HP during the encounter",
        ],
        rewards: {
            gil: 15250,
            cp: 99,
            loot: "Scarletite ×1"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "E2-09",
        arc: "E2",
        name: "The Finest Blade",
        description: "You know the shelled beasts that walk this land with their long-forgotten foes' swords lodged in their backs? One such beast is the toughskin, and it is rare, for few blades can so much as scratch its reddish hide, said to be the hardest of all its ilk. And yet there are rumours that one has been spotted, and with sword! I would very much like to see such a sword. Bring it to me! Metallurgist Steeling",
        rank: 42,
        region: "The Neslowe Passage",
        fee: 500,
        days: 20,
        questType: "Defeat Mark",
        canDispatch: true,
        canCancel: true,
        members: 6,
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 44,
            adaptability: 44,
        },
        objective: "Defeat the Blade Biter!",
        law: "Forbidden: Bludgeoning Weapons – Attacks with rods, staves, poles, knuckles, hammers, and maces",
        enemies: [
            {
                name: "Rocktitans ×2",
                type: "Monster",
            },
            {
                name: "Pit Beasts ×2",
                type: "Monster",
            },
            {
                name: "Hoppy Bunny",
                type: "Monster",
            },
        ],
        strategy: [
            "Bring a healer to manage HP during the encounter",
        ],
        rewards: {
            gil: 7740,
            cp: 84,
            loot: "Prime Tanned Hide ×1"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "E2-10",
        arc: "E2",
        name: "A Charm for Luck",
        description: "Lyze, my beloved, has left to travel the world seeking riches. He says he'll return when he's wealthy enough for us to be married. But it's not wealth I want, it's him. My only wish is that he returns safely. I seek someone to bring him a charm to keep him safe. Remie, Waiting Anxiously",
        rank: 15,
        region: "Tramdine Fens, Nazan M",
        fee: 300,
        days: 20,
        questType: "Delivery",
        canDispatch: true,
        canCancel: true,
        members: 1,
        requiredTalents: {
            negotiation: 18,
            aptitude: 0,
            teamwork: 0,
            adaptability: 0,
        },
        enemies: [],
        rewards: {
            gil: 1470,
            cp: 30,
            loot: "Magick Fruit ×5"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "E2-11",
        arc: "E2",
        name: "Gimme That!",
        description: "Nyeh heh heh heh! Know what I want? A darklord crystal! It's valuable, oh, it's valuable ... but I'll pay the price! The drop off will go down in the Zedlei Forest. Nyeh, heh heh! I'll be waiting! Zedlei Consortium",
        rank: 28,
        region: "Zedlei Forest",
        fee: 400,
        days: 20,
        questType: "Delivery",
        canDispatch: true,
        canCancel: true,
        members: 6,
        requiredItems: ["Darklord Crystal ×1"],
        requiredTalents: {
            negotiation: 20,
            aptitude: 0,
            teamwork: 0,
            adaptability: 0,
        },
        objective: "Defeat all Foes!",
        law: "Forbidden: Non-Elemental Effects – Use of non-elemental weapons and abilities are forbidden",
        enemies: [
            {
                name: "Seeq",
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
            gil: 0,
            cp: 56,
            loot: ""
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "E2-12",
        arc: "E2",
        name: "Vim, Vigor, and Go",
        description: "I'm exhausted. Work keeps me so busy I can scarecely find time to eat, let alone rest. But nhow's no time to pack it in. If someone could bring me a pick-me-up, something to put the spring back in my step, I'd be very grateful. Bease, Overworked and underappreciated",
        rank: 25,
        region: "The Neslowe Passage",
        fee: 400,
        days: 20,
        questType: "Delivery",
        canDispatch: true,
        canCancel: true,
        members: 1,
        requiredItems: ["Crusader Tonic ×1"],
        requiredTalents: {
            negotiation: 44,
            aptitude: 0,
            teamwork: 0,
            adaptability: 0,
        },
        enemies: [],
        rewards: {
            gil: 4260,
            cp: 50,
            loot: "Platinum ×1"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "E2-13",
        arc: "E2",
        name: "Plea for Help",
        description: "We were digging a shaft in the Nazan Mines when it collapsed, trapping me and my friends in the darkness. Up until a few days ago I could hear my friend's voices, but now I hear only the cries of spirits. I'm placing this note in a bottle and casting it in one of the underground rivers that runs through the mine in the slim hope it will be found in time. Rasgow, Nazan Miner",
        rank: 25,
        region: "Nazan Mines",
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
        law: "Forbidden: Targeting an Area – Actions targeting two or more tiles are forbidden.",
        enemies: [
            {
                name: "Ghosts ×5",
                type: "Monster",
            },
            {
                name: "Wraith ×1",
                type: "Monster",
            },
        ],
        battlefield: [
            "The battlefield contains trap tiles that pose hazards",
        ],
        strategy: [
            "Bring a healer to manage HP during the encounter",
        ],
        rewards: {
            gil: 4260,
            cp: 50,
            loot: "Suspect Mushroom ×2, Cod Scale ×2"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "E2-14",
        arc: "E2",
        name: "A Treasured Heirloom",
        description: "My most treasured family heirloom - a gill snapper shell - has broken clean in two! That shell has been handed down for generations as a charm to bring good fourtune to our family business. That it's broken is an affront to my ancestors, and I fear it may bring ill luck on my trade. I seek someone to catch a gil snapper and replace the broken shell! Money's no object - I don't need gil, I need a gil snapper! Maat, Dealer of Antiquities",
        rank: 28,
        region: "Sant D'alsa Bluff",
        fee: 400,
        days: 20,
        questType: "Defeat Mark",
        canDispatch: true,
        canCancel: true,
        members: 6,
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 20,
            adaptability: 20,
        },
        objective: "Defeat the Gil Snapper!",
        law: "Forbidden: Fire, Ice, Lightning – Weapons and abilities that use fire, ice, and lightning",
        enemies: [
            {
                name: "Banshees ×2",
                type: "Monster",
            },
            {
                name: "Great Tortoises ×2",
                type: "Monster",
            },
            {
                name: "Seeq",
                type: "Monster",
            },
        ],
        battlefield: [
            "The battlefield contains trap tiles that pose hazards",
        ],
        strategy: [
            "Bring a healer to manage HP during the encounter",
        ],
        rewards: {
            gil: 5170,
            cp: 56,
            loot: "Spiral Vine ×3"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "E2-15",
        arc: "E2",
        name: "Picnic Pleasure",
        description: "I'll be taking my children in my class on a picnic soon, but now I hear monsters have been sighted near our picnic spot, and frankly, I'm a little concerned. Could someone go ahead and make sure it's safe? Thil, Child Warder-in-Training",
        rank: 26,
        region: "Nazan Mines",
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
        law: "Forbidden: Fire, Ice, Lightning – Weapon and abilities that use fire, ice, and lightning",
        enemies: [
            {
                name: "Ice Flan ×1",
                type: "Monster",
            },
            {
                name: "Yellow Jelly ×1",
                type: "Monster",
            },
            {
                name: "Grenade",
                type: "Monster",
            },
        ],
        rewards: {
            gil: 4800,
            cp: 52,
            loot: "Storm Sigil ×3"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "E2-16",
        arc: "E2",
        name: "Escort Wanted",
        description: "I'm designing the fastest airship ever built, and I need to find a light, but strong metal to use for the gears, kupo. I believe the Goug Mines might hold the object of my search, but they also hold horde of monsters! I seek an armed escort to accompany and protect me, kupo. Thamas, Airship Architect",
        rank: 41,
        region: "Goug",
        fee: 500,
        days: 20,
        questType: "Escort",
        canDispatch: true,
        canCancel: true,
        members: 5,
        requiredTalents: {
            negotiation: 44,
            aptitude: 0,
            teamwork: 44,
            adaptability: 0,
        },
        objective: "Protect Thamas and Defeat all Foes!",
        law: "Forbidden: Knockback – Actions that knock the target back are forbidden.",
        enemies: [],
        rewards: {
            gil: 7180,
            cp: 32,
            loot: "Putrid Liquid ×2"
        },
        notes: "",
        tags: ["optional"]
    }
];