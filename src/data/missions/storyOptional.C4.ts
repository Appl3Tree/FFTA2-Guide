// src/data/missions/storyOptional.C4.ts
// Arc C4 optional missions, accurately transcribed from Side_Quests.txt

import type { Mission } from "../../types/ffta2";

export const OPTIONAL_MISSIONS_C4: Mission[] = [
    {
        id: "C4-01",
        arc: "C4",
        name: "Veis, Assassin",
        description: "I am Veis, a warrior pilgrim traveling the world and taking such widsom as she will give. I have come to Jylland to train for a time with House Bowen, a hunter clan of some renown. I request a guide to show me to them. Seeker Veis, Assassin",
        rank: 13,
        region: "The Rupie Mountains",
        fee: 300,
        days: 20,
        questType: "Meet Objectives",
        canDispatch: false,
        canCancel: true,
        members: 4,
        requiredTalents: {
            negotiation: 8,
            aptitude: 0,
            teamwork: 0,
            adaptability: 8,
        },
        objective: "Speed Battle vs House Bowen",
        law: "Forbidden: Actions by Moogles – Moogles may only move and perform basic attacks",
        enemies: [],
        battlefield: [
            "Treasure chests are present on the battlefield",
        ],
        rewards: {
            gil: 2280,
            cp: 26,
            loot: "Bomb Shell ×2, Giant Feather ×1, Fire Stone ×3"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "C4-02",
        arc: "C4",
        name: "To Be a Fighter",
        description: "Who will you find at the front line of any army worth its salt? Fighters, and plenty of 'em. Prove yourself worthy. Best us in combat, and we'll teach you the ways of the sword and fist. Jeroge, Mailed Fist Regular",
        rank: 14,
        region: "Moorabella",
        fee: 300,
        days: 20,
        questType: "Battle",
        canDispatch: false,
        canCancel: true,
        members: 6,
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 8,
            adaptability: 8,
        },
        objective: "Defeat all Foes!",
        law: "Forbidden: Restoring MP – Actions that restore MP are forbidden.",
        enemies: [
            {
                name: "Soldier ×1",
                type: "Monster",
            },
            {
                name: "Thief ×1",
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
            gil: 1600,
            cp: 28,
            loot: "Tiger Hide ×3, Peppergrass ×1, Ice Stone ×5"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "C4-05",
        arc: "C4",
        name: "Popocho's Chocobos",
        description: "Kupo! My precious chocobos have all run off! Every last one of them! It looks like they've headed for the mountains in the Aldanna Range. I need someone to ifnd them before the monsters do, kupo! Popocho, Chocobo Knight",
        rank: 27,
        region: "The Aldanna Range X 3",
        fee: 400,
        days: 20,
        questType: "Escort",
        canDispatch: false,
        canCancel: true,
        members: 4,
        requiredTalents: {
            negotiation: 13,
            aptitude: 0,
            teamwork: 13,
            adaptability: 0,
        },
        objective: "Protect the Chocobo and Defeat all Foes!",
        law: "Forbidden: > 50 Damage – Dealing > 50 Damage is forbidden.",
        enemies: [
            {
                name: "Wendigo",
                type: "Monster",
            },
            {
                name: "Cannoneer",
                type: "Monster",
            },
        ],
        strategy: [
            "Prioritize high-threat targets early in the battle",
            "Bring a healer to manage HP during the encounter",
            "Ranged magical attacks are effective in this mission",
        ],
        rewards: {
            gil: 4360,
            cp: 54,
            loot: "Adamantite ×3"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "C4-06",
        arc: "C4",
        name: "Of Kupos and Cannons",
        description: "Strange noises punctuate the night. There's naught but trees and the occasional abandoned well for many leagues, yet the din of",
        rank: 22,
        region: "Camoa",
        fee: 400,
        days: 20,
        questType: "Investigation",
        canDispatch: false,
        canCancel: true,
        members: 6,
        requiredTalents: {
            negotiation: 11,
            aptitude: 11,
            teamwork: 0,
            adaptability: 0,
        },
        objective: "Survive for 4 Rounds!",
        law: "Forbidden: Debuffs – Debuffs are forbidden.",
        enemies: [],
        strategy: [
            "Bring a healer to manage HP during the encounter",
            "Ranged magical attacks are effective in this mission",
        ],
        rewards: {
            gil: 2870,
            cp: 44,
            loot: "Tyrant Hide ×4, Alraune Drill ×2"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "C4-07",
        arc: "C4",
        name: "Instruments of Inspiration",
        description: "This is terrible! A tragedy! A travesty! My concertina is nowhere to be found! How can I possibly perform without it? I can't! I need someone to help me find it! Come with all haste! Mayhew, Prima Donna",
        rank: 19,
        region: "Moorabella",
        fee: 200,
        days: 20,
        questType: "Item Recovery",
        canDispatch: false,
        canCancel: true,
        members: 4,
        requiredTalents: {
            negotiation: 11,
            aptitude: 0,
            teamwork: 0,
            adaptability: 0,
        },
        objective: "Help Mayhew find her Concertina!",
        law: "Forbidden: Copycat – Using the same action as the preceding unit is forbidden",
        enemies: [
            {
                name: "Ice Drakes ×2",
                type: "Monster",
            },
            {
                name: "Lamia ×1",
                type: "Monster",
            },
            {
                name: "Monsters ×4",
                type: "Monster",
            },
        ],
        rewards: {
            gil: 2350,
            cp: 38,
            loot: "Hedychium Pollen ×4, Leucojam ×3"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "C4-08",
        arc: "C4",
        name: "Loar Airships Grounded",
        description: "The skies along the shipping lanes to Loar have been teeming with floating eyes. They've even infested the aerodrome. If something isn't done, they'll wreck the airships, and could even spill out into the town. Stop them before it's too late. Jaq, Airship Pilot",
        rank: 24,
        region: "Moorabella",
        fee: 400,
        days: 20,
        questType: "Battle",
        canDispatch: true,
        canCancel: true,
        members: 6,
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 13,
            adaptability: 13,
        },
        objective: "Defeat all Foes!",
        law: "Forbidden: Opportunity Commands – Opportunity Commands are forbidden.",
        enemies: [
            {
                name: "Floating Eyes ×2",
                type: "Monster",
            },
            {
                name: "Bloody Orbs ×2",
                type: "Monster",
            },
            {
                name: "Ahrimans ×2",
                type: "Monster",
            },
        ],
        rewards: {
            gil: 3750,
            cp: 48,
            loot: "Earthwyrm Crystal ×2, Bundle of Needles ×2"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "C4-09",
        arc: "C4",
        name: "Treasured Tomes",
        description: "I'm always seeking to broaden my collection of books, and with it, my knowledge. Should you come into the possession of the following volumes, please contact me. I promise to make it worth your while: - Urutan Annals - The Arnath Glyphs Otach, Scholar",
        rank: 18,
        region: "Aisenfield",
        fee: 300,
        days: 20,
        questType: "Delivery",
        canDispatch: false,
        canCancel: true,
        members: 1,
        requiredItems: ["Urutan Annals ×1", "The Arnath Glyphs ×1"],
        requiredTalents: {
            negotiation: 18,
            aptitude: 0,
            teamwork: 0,
            adaptability: 0,
        },
        enemies: [],
        rewards: {
            gil: 2350,
            cp: 36,
            loot: "The Arnath Glyphs ×1, Quince ×4"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "C4-10",
        arc: "C4",
        name: "Sleight of Hand",
        description: "Tricksters by nade and trade are we - master of sleight of hand. Beat us at our own tricks and the tricks of the trickster trade are yours for the trick...er, taking! Glackta, Trickster Extraordinaire",
        rank: 23,
        region: "Nazan Mines",
        fee: 400,
        days: 20,
        questType: "Battle",
        canDispatch: false,
        canCancel: true,
        members: 6,
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 15,
            adaptability: 15,
        },
        objective: "Defeat all Foes!",
        law: "Forbidden: Receiving Buffs and Debuffs – Receiving Buffs and Debuffs are forbidden.",
        enemies: [],
        rewards: {
            gil: 2790,
            cp: 46,
            loot: "Earth Sigil ×5"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "C4-11",
        arc: "C4",
        name: "Kidnapping!?",
        description: "I can't get word to Prima Donna, and I've tried everything! We've got a concert coming up, too ... Surely they haven't been kidnapped ... have they? Oh, gods, they have! Someone look into this, please! Manager, Prima Donna",
        rank: 30,
        region: "Fluorgis",
        fee: 400,
        days: 20,
        questType: "Investigation",
        canDispatch: true,
        canCancel: true,
        members: 6,
        prerequisite: "Instruments of",
        requiredTalents: {
            negotiation: 20,
            aptitude: 20,
            teamwork: 0,
            adaptability: 0,
        },
        objective: "Defeat all foes before they enter the water!",
        law: "Forbidden: Back Attack – Attacking a unit from behind is forbidden.",
        enemies: [
            {
                name: "Donna",
                type: "Monster",
            },
        ],
        rewards: {
            gil: 3030,
            cp: 60,
            loot: "Prime Pelt ×3"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "C4-13",
        arc: "C4",
        name: "Banbanga!",
        description: "The Tri-Bangaa Temple welcomes novices seeking guidance in the martial arts. Handed down over many hundred years, the martial arts are considered by many the pinnacle of melee combat. Temper body and mind as we share with you the secret of these arts. Monks of the Tri-Bangaa Temple",
        rank: 29,
        region: "Nazan Mines",
        fee: 400,
        days: 20,
        questType: "Battle",
        canDispatch: false,
        canCancel: true,
        members: 6,
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 22,
            adaptability: 22,
        },
        objective: "Defeat all Foes!",
        law: "Forbidden: Targeting Self – Actions targeting the user are forbidden.",
        enemies: [
            {
                name: "Master Monks ×3",
                type: "Monster",
            },
            {
                name: "White Monks ×2",
                type: "Monster",
            },
        ],
        rewards: {
            gil: 5340,
            cp: 58,
            loot: "Body Ceffyl ×4"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "C4-14",
        arc: "C4",
        name: "The Cat's Meow",
        description: "I saw it with me own eyes! A white cat as big as a man if it was a goot, it was. Leastwise, I think it were a cat. Prowling about the Rupie Mountains plain as day. Well, strutting about in a place with monsters like that will get it eaten alive in no time flat. Will you go and save it? Maerwynn, Cat Lover",
        rank: 28,
        region: "The Rupie Mountains",
        fee: 400,
        days: 20,
        questType: "Escort",
        canDispatch: false,
        canCancel: true,
        members: 6,
        requiredTalents: {
            negotiation: 20,
            aptitude: 0,
            teamwork: 20,
            adaptability: 0,
        },
        objective: "Protect Roye and Defeat all Foes!",
        law: "Forbidden: Ranged Weapons – Attacks with bows, greatbows, guns, hand-cannons, and cards",
        enemies: [],
        rewards: {
            gil: 6150,
            cp: 56,
            loot: "Einherjarium ×3, Orichalcum ×2"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "C4-15",
        arc: "C4",
        name: "The Storage Shed",
        description: "Help! Someone's in my storage shed! What if it's a thief? I can't go out there alone to check ... someone come with me! Mayhew, Prima Donna",
        rank: 6,
        region: "Tramdine Fens",
        fee: 200,
        days: 20,
        questType: "Investigation",
        canDispatch: true,
        canCancel: true,
        members: 4,
        requiredTalents: {
            negotiation: 18,
            aptitude: 18,
            teamwork: 0,
            adaptability: 0,
        },
        objective: "Defeat all Foes!",
        law: "Forbidden: Harming Gria – Actions that harm gria are forbidden.",
        enemies: [
            {
                name: "Sage",
                type: "Monster",
            },
        ],
        rewards: {
            gil: 690,
            cp: 12,
            loot: "High Arcana ×2"
        },
        notes: "",
        tags: ["optional"]
    }
];
