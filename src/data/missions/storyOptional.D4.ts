// src/data/missions/storyOptional.D4.ts
// Arc D4 optional missions, accurately transcribed from Side_Quests.txt

import type { Mission } from "../../types/ffta2";

export const OPTIONAL_MISSIONS_D4: Mission[] = [
    {
        id: "D4-04",
        arc: "D4",
        name: "Hors D'oeuvre of the Hour",
        description: "Haven't tried Culinary Crusade's latest gastronomical triumph, Amarette Malbonara yet? Now's your chance! Just be careful not to burn the ingredients when you harvest them. Heat muddles the flavor. Grosso, Culinary Crusade",
        rank: 41,
        region: "The Bisga Greenland",
        fee: 500,
        days: 20,
        questType: "Satisfy Petitioner",
        canDispatch: true,
        canCancel: true,
        members: 6,
        requiredTalents: {
            negotiation: 39,
            aptitude: 0,
            teamwork: 0,
            adaptability: 39,
        },
        objective: "Uphold the Law and Defeat all Foes!",
        law: "Forbidden: Fire – Weapons and abilities that use fire are forbidden.",
        enemies: [
            {
                name: "Malboros ×4",
                type: "Monster",
            },
            {
                name: "Malboro King",
                type: "Monster",
            },
        ],
        strategy: [
            "Prioritize high-threat targets early in the battle",
            "Having Esuna available is recommended to handle debuffs",
            "Bring a healer to manage HP during the encounter",
        ],
        rewards: {
            gil: 3980,
            cp: 82,
            loot: "Ancient Turtle Shell ×2"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "D4-07",
        arc: "D4",
        name: "I've Been Had, Kupo!",
        description: "Kupo!!! I've been had, kupo, had!!!",
        rank: 32,
        region: "The Bisga Greenlands",
        fee: 500,
        days: 20,
        questType: "Defeat Mark",
        canDispatch: false,
        canCancel: true,
        members: 6,
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 28,
            adaptability: 28,
        },
        objective: "Defeat Nezzel the Alchemist!",
        law: "Forbidden: Height > or = 10 – Moving to a tile with height of 10 of more is forbidden.",
        enemies: [],
        battlefield: [
            "The map features elevation differences",
        ],
        rewards: {
            gil: 1960,
            cp: 64,
            loot: "Kalos ×3"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "D4-08",
        arc: "D4",
        name: "Beneath the Sands",
        description: "Need someone to head over to Kthili Sands and look for my treasure. Buried it out there a chocobo's age ago, and now I can't remember where it's at. Went looking for it myself, but didn't have any luck. Maybe you'll do better. Ricard, Former treasure hunter",
        rank: 40,
        region: "Kthili Sands",
        fee: 500,
        days: 20,
        questType: "Item Recovery",
        canDispatch: true,
        canCancel: true,
        members: 6,
        requiredTalents: {
            negotiation: 39,
            aptitude: 0,
            teamwork: 0,
            adaptability: 0,
        },
        objective: "Find the Buried Treasure!",
        law: "Forbidden: Summoning Scions – Summoning Scions is forbidden.",
        enemies: [
            {
                name: "Antlions ×2",
                type: "Monster",
            },
        ],
        battlefield: [
            "The battlefield contains trap tiles that pose hazards",
        ],
        strategy: [
            "Prioritize high-threat targets early in the battle",
            "Bring a healer to manage HP during the encounter",
        ],
        rewards: {
            gil: 6270,
            cp: 80,
            loot: "Wyvern Wing ×1"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "D4-09",
        arc: "D4",
        name: "Airship S.O.S.!",
        description: "No one's noticed yet, but an airship sitting in the dock has been hijacked. O don't want to contact the watch and cause a commotion, so I'm posting for help here. Neah, Accidental Witness",
        rank: 19,
        region: "Moorabella",
        fee: 300,
        days: 20,
        questType: "Battle",
        canDispatch: true,
        canCancel: true,
        members: 6,
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 15,
            adaptability: 15,
        },
        objective: "Defeat all Foes!",
        law: "Forbidden: Being Robbed – Having gil or items stolen is forbidden.",
        enemies: [],
        rewards: {
            gil: 2960,
            cp: 38,
            loot: "Gurnat ×2, Strange Liquid ×4"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "D4-12",
        arc: "D4",
        name: "A Small Favour",
        description: "I require an ether. Bring me one, won't you? Master Metallurgist",
        rank: 30,
        region: "Tramdine Fens",
        fee: 400,
        days: 20,
        questType: "Defeat Mark",
        canDispatch: false,
        canCancel: true,
        members: 1,
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 0,
            adaptability: 0,
        },
        enemies: [],
        rewards: {
            gil: 7880,
            cp: 60,
            loot: "Wyvern Wing ×1"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "D4-14",
        arc: "D4",
        name: "Ordalia Airships Grounded",
        description: "A pack of bombs from Sant D'alsa Bluff is posing a threat to the aerodrome. If they detonate near even one of the airships moored there, the entire fleet could go up in flames. Destroy them all before it's too late! Ash, Airship Pilot",
        rank: 25,
        region: "Fluorgis",
        fee: 400,
        days: 20,
        questType: "Battle",
        canDispatch: true,
        canCancel: true,
        members: 6,
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 15,
            adaptability: 15,
        },
        objective: "Defeat all Foes!",
        law: "Forbidden: Targeting Distant Units – Actions targeting units two or more tiles away are forbidden.",
        enemies: [
            {
                name: "Bombs ×3",
                type: "Monster",
            },
        ],
        strategy: [
            "Ranged magical attacks are effective in this mission",
        ],
        rewards: {
            gil: 4610,
            cp: 50,
            loot: "Strange Liquid ×2"
        },
        notes: "",
        tags: ["optional"]
    }
];