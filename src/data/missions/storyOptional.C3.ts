// src/data/missions/storyOptional.C3.ts
// Arc C3 optional missions, accurately transcribed from Side_Quests.txt

import type { Mission } from "../../types/ffta2";

export const OPTIONAL_MISSIONS_C3: Mission[] = [
    {
        id: "C3-03",
        arc: "C3",
        name: "Speed Battle, Kupo!",
        description: "We're looking for a clan to face us in a fearsome speed battle, kupo! We'll find a suitably vicious beast - all you need do is arrive at the appointed place. To battle, kupo! Scarface, Lord of the Speed Battle",
        rank: 22,
        region: "The Galerria Deep",
        fee: 400,
        days: 20,
        questType: "Meet Objectives",
        canDispatch: true,
        canCancel: true,
        members: 4,
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 20,
            adaptability: 20,
        },
        dispatchRecommended: ["Templar"],
        objective: "Speed Battle vs Scarface",
        law: "Forbidden: Not Moving – Each unit must move at least 1 tile before ending its",
        enemies: [],
        battlefield: [
            "The battlefield contains trap tiles that pose hazards",
        ],
        rewards: {
            gil: 12830,
            cp: 44,
            loot: "Giant's Tanned Hide ×5, Tanned Tyrant Hide ×5"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "C3-04",
        arc: "C3",
        name: "For My Love",
        description: "The most charming man visits my shop each morning. I think he's interested in me, and I want to bake him a special cookie to show him how I feel. Please bring me a bat tail so I can bake him a treat he'll never forget! Mille, Love-Struck Maiden",
        rank: 16,
        region: "Moorabella",
        fee: 300,
        days: 20,
        questType: "Delivery",
        canDispatch: true,
        canCancel: true,
        members: 1,
        requiredItems: ["Bat Tail ×1"],
        requiredTalents: {
            negotiation: 13,
            aptitude: 0,
            teamwork: 0,
            adaptability: 0,
        },
        enemies: [],
        rewards: {
            gil: 2140,
            cp: 32,
            loot: "Gurnat ×3, Gimble Stalk ×2"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "C3-05",
        arc: "C3",
        name: "Monster Poaching",
        description: "Saw some suspicious fellows the other day, fragging this little monster off somewhere ... I wonder if it weren't on o' them endangered monsters?! A Carm Mercentile fella was only telling me about 'em the other day. Made a donation right there and then, I did! Anyway, that little monster I saw matched the description of one of 'em! Maybe someone could go and help? A Passerby",
        rank: 36,
        region: "Baptiste Hill",
        fee: 500,
        days: 20,
        questType: "Defeat Mark",
        canDispatch: true,
        canCancel: true,
        members: 6,
        prerequisite: "On the Rampage",
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 13,
            adaptability: 13,
        },
        dispatchRecommended: ["Defender"],
        objective: "Protect the Cluckatrices and Defeat all Foes!",
        law: "Forbidden: Piercing Weapons – Attacks with Rapiers and Spears are Forbidden.",
        enemies: [
            {
                name: "Hellhounds ×2",
                type: "Monster",
            },
            {
                name: "Beastmaster",
                type: "Monster",
            },
        ],
        strategy: [
            "Bring a healer to manage HP during the encounter",
        ],
        rewards: {
            gil: 2400,
            cp: 72,
            loot: "Mind Ceffyl ×3"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "C3-08",
        arc: "C3",
        name: "Cleaning to Ordalia",
        description: "Looking for helpers to swab an airship. We haven't had the crew to properly clean her for some time now. It would be a shame to put her out of service, si we'll have you cleaning her mid-flight. Oh, and watch out for the rats. Jylland Airship Inspection Board",
        rank: 22,
        region: "Moorabella",
        fee: 400,
        days: 4,
        questType: "Satisfy Petitioner",
        canDispatch: false,
        canCancel: true,
        members: 6,
        requiredTalents: {
            negotiation: 0,
            aptitude: 1,
            teamwork: 0,
            adaptability: 0,
        },
        objective: "Clean the airship within X rounds!",
        law: "Forbidden: Fire – Weapons and abilities that use fire are forbidden.",
        enemies: [],
        rewards: {
            gil: 180,
            cp: 44,
            loot: "Fine Wool ×1"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "C3-09",
        arc: "C3",
        name: "Stuck in the Muck",
        description: "Ever since my husband passed away, I've been having this recurring dream in which he tells me he wants to come home. My husband met his end in Tramdine Fens, but his wedding ring was never found. Perhaps this is why he cannot find his way? Someone, please recover it! Widow Maleen",
        rank: 26,
        region: "Tramdine Fens",
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
        objective: "Find the Lost Wedding Ring!",
        law: "Forbidden: Ranged Weapons – Attacks with bows, greatbows, guns, hand-cannons, and",
        enemies: [
            {
                name: "Chocobos ×3",
                type: "Monster",
            },
            {
                name: "Green",
                type: "Monster",
            },
            {
                name: "Chocobo Knight",
                type: "Monster",
            },
        ],
        strategy: [
            "Ranged magical attacks are effective in this mission",
        ],
        rewards: {
            gil: 4610,
            cp: 52,
            loot: "Mythril ×2, Spiral Incisor ×3"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "C3-10",
        arc: "C3",
        name: "Poachers Spotted",
        description: "They took her away! They took Calea away! I'd been wounded in battle, and she went to the woods to pick herbs for a poultice, when she saw them - she saw those endangered monster poachers doing a deal! That's why they took her! Someone, please help her in my place! Leeger, Warrior-in-Training",
        rank: 40,
        region: "The Bisga Greenlands",
        fee: 500,
        days: 20,
        questType: "Satisfy Petitioner",
        canDispatch: true,
        canCancel: true,
        members: 6,
        prerequisite: "Monster Poaching",
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 18,
            adaptability: 18,
        },
        objective: "Go to Calea!",
        law: "Forbidden: Harming the Weak – Actions that harm a lower level unit are forbidden.",
        enemies: [
            {
                name: "Dark ×3",
                type: "Monster",
            },
            {
                name: "Haste ×5",
                type: "Monster",
            },
            {
                name: "Gria",
                type: "Monster",
            },
            {
                name: "White Mage",
                type: "Monster",
            },
        ],
        strategy: [
            "Prioritize high-threat targets early in the battle",
            "Having Esuna available is recommended to handle debuffs",
            "Bring a healer to manage HP during the encounter",
        ],
        rewards: {
            gil: 7880,
            cp: 80,
            loot: "Kuraisle Boxwood ×2"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "C3-13",
        arc: "C3",
        name: "Kyrra, Dragoon",
        description: "There's trouble brewing in Targ Wood! Come across a young bangaa run afoul of a band of ne'er-do-wells. Thinking I'd be little good against so many, I ran, hoping to find some as might defend him well and proper. Ksava, Woodcutter",
        rank: 7,
        region: "Targ Wood",
        fee: 200,
        days: 20,
        questType: "Escort",
        canDispatch: false,
        canCancel: true,
        members: 6,
        requiredTalents: {
            negotiation: 4,
            aptitude: 0,
            teamwork: 0,
            adaptability: 4,
        },
        objective: "Protect Kyrra and defeat all Foes!",
        law: "Forbidden: Targeting an Area – Actions targeting two or more tiles are forbidden.",
        enemies: [],
        battlefield: [
            "Treasure chests are present on the battlefield",
        ],
        rewards: {
            gil: 690,
            cp: 14,
            loot: "Xergis Tin ×3, Wool ×1, Animal Bone ×3"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "C3-14",
        arc: "C3",
        name: "Green Dominion",
        description: "There's talk of a strange group gathering in Targ Wood. They stand in a circle chanting of a",
        rank: 2,
        region: "Targ Wood",
        fee: 100,
        days: 20,
        questType: "Battle",
        canDispatch: false,
        canCancel: true,
        members: 6,
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 3,
            adaptability: 3,
        },
        objective: "Defeat all Foes!",
        law: "Forbidden: Reaction Abilities – Reaction Abilities are forbidden",
        enemies: [],
        battlefield: [
            "Treasure chests are present on the battlefield",
        ],
        strategy: [
            "Ranged magical attacks are effective in this mission",
        ],
        rewards: {
            gil: 370,
            cp: 4,
            loot: "Xergis Tin ×4, Gikhet Lead ×3, Birch ×2"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "C3-15",
        arc: "C3",
        name: "An Unseen Foe",
        description: "Illegal monster gambling has been going on in Graszton, right on Baron Beltorey's doorstep. It is my belief that this has something to do with the poaching of endangered monsters which we hear so much about of late. If you know anything, please tell me. Anrias, Reporter of the Truth",
        rank: 50,
        region: "Graszton",
        fee: 500,
        days: 20,
        questType: "Investigation",
        canDispatch: true,
        canCancel: true,
        members: 4,
        prerequisite: "Poachers Spotted",
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 22,
            adaptability: 22,
        },
        dispatchRecommended: ["Defender"],
        objective: "Protect the 'trices and defeat all foes!",
        law: "Forbidden: Dealing < 20 Damage – Dealing < 20 Damage is forbidden.",
        enemies: [
            {
                name: "Viking",
                type: "Monster",
            },
            {
                name: "Defence",
                type: "Monster",
            },
        ],
        strategy: [
            "Ranged magical attacks are effective in this mission",
        ],
        rewards: {
            gil: 7880,
            cp: 99,
            loot: "Waterwyrd Crystal ×1"
        },
        notes: "",
        tags: ["optional"]
    }
];
