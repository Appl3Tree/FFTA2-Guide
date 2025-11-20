// src/data/missions/storyOptional.E1.ts
// Arc E1 optional missions, accurately transcribed from Side_Quests.txt

import type { Mission } from "../../types/ffta2";

export const OPTIONAL_MISSIONS_E1: Mission[] = [
    {
        id: "E1-01",
        arc: "E1",
        name: "Bonga Bugle - Goldsun",
        description: "Greetings! Bonga Bugle Head Editor here! This month: the Field of Hidden Treasures! A place where treasures are said to spring into being beneath the ground ... all by themselves! Reporting assistants wanted. Head Editor, Bonga Bugle",
        rank: 22,
        region: "Baptiste Hill",
        fee: 400,
        days: 20,
        questType: "Meet Objectives",
        canDispatch: false,
        canCancel: true,
        members: 1,
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 0,
            adaptability: 9,
        },
        objective: "Find Three Treasures",
        law: "Forbidden: Attack – Attacking is Forbidden",
        enemies: [
            {
                name: "Bugle Head Editor",
                type: "Monster",
            },
        ],
        rewards: {
            gil: 1750,
            cp: 44,
            loot: "Recall Grass ×1"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "E1-02",
        arc: "E1",
        name: "Bonga Bugle - Silversun",
        description: "Greetings! Bonga Bugle Head Editor here! This moth, we're taking a look at haunted spots, starting with that most forbidding of places, Shadeholme! ... Um, someone go with me please! Note: The actual location of our report will be top secret! Head Editor, Bonga Bugle",
        rank: 18,
        region: "Graszton",
        fee: 300,
        days: 8,
        questType: "Escort",
        canDispatch: false,
        canCancel: true,
        members: 6,
        requiredTalents: {
            negotiation: 7,
            aptitude: 0,
            teamwork: 7,
            adaptability: 0,
        },
        objective: "Defend the Head Editor and defeat all Foes!",
        law: "Forbidden: Copycat – Using the same action as the preceding unit is forbidden.",
        enemies: [],
        battlefield: [
            "The battlefield contains trap tiles that pose hazards",
        ],
        rewards: {
            gil: 3030,
            cp: 36,
            loot: "Trusty Frying Pan ×4, Turtle Shell ×2, Dipraeu Bronze ×7"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "E1-03",
        arc: "E1",
        name: "Bonga Bugle - Ashleaf",
        description: "Greetings! Bonga Bugle Head Editor here! This month, I'll be reporting on Galmia Pepe, fashion mavens known for their novel designs and commitment to quality. We'll be conducting some stealth interviews to get to the bottom of their unparalleled popularity! Reporting Assiasants wanted. Head Editor, Bonga Bugle",
        rank: 22,
        region: "Camoa",
        fee: 400,
        days: 8,
        questType: "Satisfy Petitioner",
        canDispatch: false,
        canCancel: true,
        members: 6,
        requiredTalents: {
            negotiation: 11,
            aptitude: 0,
            teamwork: 0,
            adaptability: 11,
        },
        objective: "Help the Bonga Bugle get its scoop!",
        law: "Forbidden: Ranged Weapons – Attacks with bows, greatbows, guns, hand-cannons, and cards",
        enemies: [
            {
                name: "Pepe",
                type: "Monster",
            },
        ],
        strategy: [
            "Ranged magical attacks are effective in this mission",
        ],
        rewards: {
            gil: 3890,
            cp: 44,
            loot: "Zinconium ×2, Cloudy Sap ×2"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "E1-04",
        arc: "E1",
        name: "Bonga Bugle - Mistleaf",
        description: "Greetings! Bonga Bugle Head Editor here! This month's special feature: Unlimited Power! What power? Power in battle! What battles? Clan Battles! We'll be measuring clan power, comparing the clans, and posting our results! Looking for clans to participate in this event! Head Editor, Bonga Bugle",
        rank: 34,
        region: "Baptiste Hill",
        fee: 500,
        days: 8,
        questType: "Satisfy Petitioner",
        canDispatch: false,
        canCancel: true,
        members: 6,
        requiredTalents: {
            negotiation: 33,
            aptitude: 0,
            teamwork: 0,
            adaptability: 33,
        },
        objective: "Defeat all Foes!",
        law: "Forbidden: Harming the Weak – Actions that harm a lower level unit are forbidden.",
        enemies: [
            {
                name: "Hoppy Bunny",
                type: "Monster",
            },
            {
                name: "Werewolf",
                type: "Monster",
            },
            {
                name: "Deathscythe",
                type: "Monster",
            },
            {
                name: "Malboro",
                type: "Monster",
            },
        ],
        rewards: {
            gil: 6970,
            cp: 68,
            loot: "Onion ×1"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "E1-05",
        arc: "E1",
        name: "Bonga Bugle - Coppersun",
        description: "Greetings from the Bonga Bugle! This month we're taking a very long, very close look at Prima Donna! Is there anyone who doesn't know the incredibly popular and talented ladies of this singing group! There won't be after this month's issue of the Bonga Bugle! Assistants wanted. Head Editor, Bonga Bugle *Selection by interview. P.D. fanatics preferred.",
        rank: 30,
        region: "Moorabella",
        fee: 400,
        days: 20,
        questType: "Satisfy Petitioner",
        canDispatch: false,
        canCancel: true,
        members: 1,
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 0,
            adaptability: 0,
        },
        objective: "Protect the Head Editor and Defeat all Foes!",
        law: "Forbidden: Harming Seeq – Actions that harm Seeq are forbidden.",
        enemies: [
            {
                name: "Clan Points ×60",
                type: "Monster",
            },
            {
                name: "Gil ×4590",
                type: "Monster",
            },
            {
                name: "Donna",
                type: "Monster",
            },
            {
                name: "Raptor",
                type: "Monster",
            },
            {
                name: "Spellblade",
                type: "Monster",
            },
            {
                name: "Hunter",
                type: "Monster",
            },
            {
                name: "Blue Mage",
                type: "Monster",
            },
            {
                name: "Seeq",
                type: "Monster",
            },
        ],
        rewards: {
            gil: 2,
            cp: 60,
            loot: ""
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "E1-08",
        arc: "E1",
        name: "Bonga Bugle - Emberleaf",
        description: "Greetings from the Bonga Bugle! This month we'll be investigating a true scourge upon the land - crime syndicates! As I am ... somewhat concerned for my safety, I want someone to come with me! Head Editor, Bonga Bugle * Selection by intervgiew. Wolves only. Sheep need not apply!",
        rank: 38,
        region: "Moorabella",
        fee: 500,
        days: 4,
        questType: "Satisfy Petitioner",
        canDispatch: false,
        canCancel: true,
        members: 1,
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 0,
            adaptability: 0,
        },
        enemies: [
            {
                name: "Gil ×7280",
                type: "Monster",
            },
            {
                name: "Pollen",
                type: "Monster",
            },
        ],
        rewards: {
            gil: 2,
            cp: 76,
            loot: ""
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "E1-09",
        arc: "E1",
        name: "Bonga Bugle - Rosefire",
        description: "Greetings! Bonga Bugle Head Editor here! This month's special: The Master Potter. I'll be photographing a pot on loan from master potsmith Master LePot the 3rd! Reporting assistants wanted. Head Editor, Bonga Bugle",
        rank: 15,
        region: "Zedlei Forest",
        fee: 200,
        days: 8,
        questType: "Satisfy Petitioner",
        canDispatch: false,
        canCancel: true,
        members: 6,
        requiredTalents: {
            negotiation: 8,
            aptitude: 0,
            teamwork: 0,
            adaptability: 8,
        },
        objective: "Place 5 pots on the tree stumps!",
        law: "Forbidden: Piercing Weapons – Attacks with rapiers and spears are forbidden",
        enemies: [
            {
                name: "Sprite",
                type: "Monster",
            },
            {
                name: "Baknamy",
                type: "Monster",
            },
            {
                name: "Worgen",
                type: "Monster",
            },
        ],
        rewards: {
            gil: 2730,
            cp: 30,
            loot: "Gun Gear ×3"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "E1-12",
        arc: "E1",
        name: "Bonga Bugle - Plumfrost",
        description: "Greetings! Bonga Bugle Head Editor here! This month, we'll be getting up close and personal with the man himself, the Bugle Owner! All who wish to see just what our great Owner is made of had better not miss this unique opportunity! Head Editor, Bonga Bugle *There will be interviews. The secret phrase is:",
        rank: 43,
        region: "Moorabella",
        fee: 500,
        days: 20,
        questType: "Satisfy Petitioner",
        canDispatch: false,
        canCancel: true,
        members: 1,
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 0,
            adaptability: 0,
        },
        objective: "Protect the Bugle staff and defeat all foes!",
        law: "Forbidden: Summoning Scions – Summoning Scions is forbidden.",
        enemies: [
            {
                name: "Grenades ×2",
                type: "Monster",
            },
        ],
        strategy: [
            "Prioritize high-threat targets early in the battle",
            "Bring a healer to manage HP during the encounter",
        ],
        rewards: {
            gil: 2,
            cp: 86,
            loot: ""
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "E1-13",
        arc: "E1",
        name: "Bonga Bugle - Bloodfire",
        description: "Greetings! Bonga Bugle Head Editor here! This month's special: the Working People! We're taking a look at daily life in a shop that's part of -our- daily life. Reporting assistants wanted. Head Editor, Bonga Bugle",
        rank: 12,
        region: "Targ Wood",
        fee: 200,
        days: 8,
        questType: "Meet Objectives",
        canDispatch: false,
        canCancel: true,
        members: 1,
        requiredTalents: {
            negotiation: 6,
            aptitude: 0,
            teamwork: 0,
            adaptability: 6,
        },
        enemies: [
            {
                name: "Seeq",
                type: "Monster",
            },
            {
                name: "Malbow",
                type: "Monster",
            },
        ],
        rewards: {
            gil: 1230,
            cp: 24,
            loot: "Zinconium ×9, Malboro Wine ×3"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "E1-14",
        arc: "E1",
        name: "Bonga Bugle - Greenfire",
        description: "Greetings from the Bonga Bugle! This month we'll be looking at rare and unusual laws! All laws are equal, but it turns out that some laws -are- more equal than others! I'll need assistants, of course. Head Editor, Bonga Bugle * Selection by Interview. The secret password is",
        rank: 29,
        region: "Moorabella",
        fee: 400,
        days: 8,
        questType: "Satisfy Petitioner",
        canDispatch: false,
        canCancel: true,
        members: 1,
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 0,
            adaptability: 0,
        },
        objective: "Uphold the Law and Defeat all Foes!",
        law: "Forbidden: Being Robbed – Having hil or items stolen is forbidden.",
        enemies: [
            {
                name: "Gil ×3030",
                type: "Monster",
            },
            {
                name: "Onion ×1",
                type: "Monster",
            },
        ],
        battlefield: [
            "The battlefield contains trap tiles that pose hazards",
        ],
        rewards: {
            gil: 2,
            cp: 58,
            loot: ""
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "E1-15",
        arc: "E1",
        name: "Bonga Bugle - Skyfrost",
        description: "Greetings from the Bonga Bugle! This moth we'll be taking a look at special places, traveling far and wide across Jylland to find the best and the most beautiful. And I'll need assistants! Head Editor, Bonga Bugle * Selection by Interview. Cool and collected applicants preferred.",
        rank: 31,
        region: "Moorabella",
        fee: 400,
        days: 8,
        questType: "Meet Objectives",
        canDispatch: false,
        canCancel: true,
        members: 1,
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 0,
            adaptability: 0,
        },
        objective: "Protect the Head Editor and Defeat all Foes!",
        law: "Forbidden: Buffs – Buffs are forbidden.",
        enemies: [
            {
                name: "Gil ×4940",
                type: "Monster",
            },
            {
                name: "Hedychium ×1",
                type: "Monster",
            },
        ],
        strategy: [
            "Prioritize high-threat targets early in the battle",
            "Having Esuna available is recommended to handle debuffs",
            "Bring a healer to manage HP during the encounter",
        ],
        rewards: {
            gil: 2,
            cp: 62,
            loot: ""
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "E1-16",
        arc: "E1",
        name: "Bonga Bugle - Blackfrost",
        description: "Happy New Year from the Bonga Bugle! We're doing a special on New Year's resolutions, and what better place to conduct a survey than where all the people are: in Moorabella! Calling all those willing to assist this noblest of causes. Head Editor, Bonga Bugle",
        rank: 19,
        region: "Moorabella",
        fee: 300,
        days: 8,
        questType: "Meet Objectives",
        canDispatch: false,
        canCancel: true,
        members: 5,
        requiredTalents: {
            negotiation: 13,
            aptitude: 0,
            teamwork: 0,
            adaptability: 13,
        },
        objective: "Survey New Year's Resolutions",
        law: "Forbidden: Attack – Attacking is forbidden.",
        enemies: [],
        rewards: {
            gil: 8750,
            cp: 38,
            loot: "Adamant Alloy ×3, Hedychium ×1"
        },
        notes: "",
        tags: ["optional"]
    }
];