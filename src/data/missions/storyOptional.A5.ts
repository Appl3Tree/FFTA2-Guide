// src/data/missions/storyOptional.A5.ts
// Arc A5 optional missions, accurately transcribed from Side_Quests.txt

import type { Mission } from "../../types/ffta2";

export const OPTIONAL_MISSIONS_A5: Mission[] = [
    {
        id: "A5-01",
        arc: "A5",
        name: "Wanted: Magick Weapon",
        description: "!!!Urgent Request from the Bureau of Defense!!! Wanted: An unmanned Magick Weapon, before it has the opportunity to cause further damage. The Weapon has four legs and attacks anything that comes within range. Mist readings are off the charts, preventing detailed study. Anyone successful in stopping it will be duly rewarded. -Jylland Defenders of the Peace -Bureau of Defense",
        rank: 96,
        region: "The Aldanna Range",
        fee: 500,
        days: 20,
        questType: "Headhunt",
        canDispatch: true,
        canCancel: true,
        members: 6,
        prerequisite: "The Mutadragons",
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 54,
            adaptability: 54,
        },
        objective: "Defeat the Magick Weapon at all costs!",
        law: "Forbidden: Items – Items are Forbidden",
        enemies: [
            {
                name: "Attacks",
                type: "Monster",
            },
        ],
        strategy: [
            "Bring a healer to manage HP during the encounter",
            "Ranged magical attacks are effective in this mission",
        ],
        rewards: {
            gil: 24960,
            cp: 99,
            loot: "Fiend's Blood ×1"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "A5-03",
        arc: "A5",
        name: "Green King of Cinquleur",
        description: "We of Cinquleur seek battle with the straongest of warriors! Defeat me if you can, and you shall be rewarded! Green King Verre of Cinquleur",
        rank: 66,
        region: "Zedlei Forest",
        fee: 500,
        days: 20,
        questType: "Defeat Mark",
        canDispatch: false,
        canCancel: true,
        members: 6,
        prerequisite: "Blue King of",
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 8,
            adaptability: 8,
        },
        objective: "Defeat Green King Verre!",
        law: "Forbidden: Restoring HP – Actions that restore HP are forbidden.",
        enemies: [
            {
                name: "Green Mage ×66",
                type: "Monster",
            },
            {
                name: "Ribbon",
                type: "Monster",
            },
            {
                name: "Hammer",
                type: "Monster",
            },
        ],
        strategy: [
            "Ranged magical attacks are effective in this mission",
        ],
        rewards: {
            gil: 13090,
            cp: 99,
            loot: "Strange Liquid ×2, Great Serpent's Fang ×2"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "A5-04",
        arc: "A5",
        name: "Wanted: Marksman",
        description: "We've begun development of a new gun, kupo! But developing and testing are two very different things. We need an experienced marksman to evaluate the gun for us. We think five days of testing should be enough, kupo. Goug Consortium Department of Ranged Mutilation",
        rank: 18,
        region: "Kthili Sands",
        fee: 400,
        days: 20,
        questType: "Satisfy Petitioner",
        canDispatch: false,
        canCancel: true,
        members: 1,
        requiredTalents: {
            negotiation: 22,
            aptitude: 0,
            teamwork: 0,
            adaptability: 22,
        },
        enemies: [
            {
                name: "Fusilier",
                type: "Monster",
            },
            {
                name: "Flintlock",
                type: "Monster",
            },
        ],
        rewards: {
            gil: 3630,
            cp: 36,
            loot: "Wyvern Fang ×4"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "A5-07",
        arc: "A5",
        name: "Black King of Cinquleur",
        description: "We of Cinquleur seek battle with the strongest of warriors, kupo! Defeat me if you can, kujpo, and you shall be rewarded! Black King Nware of Cinquleur",
        rank: 77,
        region: "The Galerria Deep",
        fee: 500,
        days: 20,
        questType: "Defeat Mark",
        canDispatch: false,
        canCancel: true,
        members: 6,
        prerequisite: "Green King of",
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 9,
            adaptability: 9,
        },
        objective: "Defeat Black King Nware!",
        law: "Forbidden: Debuffs – Debuffs are forbidden.",
        enemies: [],
        strategy: [
            "Bring a healer to manage HP during the encounter",
            "Ranged magical attacks are effective in this mission",
        ],
        rewards: {
            gil: 9820,
            cp: 99,
            loot: "Wind Sigil ×3"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "A5-08",
        arc: "A5",
        name: "Wanted: Caretaker",
        description: "I just received word that my grandmother hurt herself, kupo. She needs someone to take care of her, but I won't be able to go for another week. Will you go and see that she's all right until I arrive, kupo? Karm",
        rank: 16,
        region: "Camoa",
        fee: 300,
        days: 20,
        questType: "Satisfy Petitioner",
        canDispatch: false,
        canCancel: true,
        members: 1,
        requiredTalents: {
            negotiation: 28,
            aptitude: 0,
            teamwork: 0,
            adaptability: 28,
        },
        enemies: [
            {
                name: "Class",
                type: "Monster",
            },
        ],
        strategy: [
            "Bring a healer to manage HP during the encounter",
        ],
        rewards: {
            gil: 4100,
            cp: 32,
            loot: "Clear Sap ×3"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "A5-09",
        arc: "A5",
        name: "White King of Cinquleur",
        description: "We of Cinquleur seek battle with the strongest of warriors! Defeat me if you can, and you shall be rewarded! White King Blanch of Cinquleur",
        rank: 88,
        region: "The Rupie Mountains",
        fee: 300,
        days: 20,
        questType: "Defeat Mark",
        canDispatch: false,
        canCancel: true,
        members: 6,
        prerequisite: "Black King of",
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 11,
            adaptability: 11,
        },
        objective: "Defeat White King Blanch!",
        law: "Forbidden: Missing – Missing with an action is forbidden.",
        enemies: [
            {
                name: "Nu Mou",
                type: "Monster",
            },
            {
                name: "Tabi",
                type: "Monster",
            },
            {
                name: "Cheer Staff",
                type: "Monster",
            },
        ],
        strategy: [
            "Bring a healer to manage HP during the encounter",
            "Ranged magical attacks are effective in this mission",
        ],
        rewards: {
            gil: 13720,
            cp: 99,
            loot: "Clock Gear ×8"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "A5-14",
        arc: "A5",
        name: "The Five Kings",
        description: "We of Cinquleur seek battle with Clan <NAME>! Cinquleur",
        rank: 99,
        region: "The Aldanna Range",
        fee: 500,
        days: 20,
        questType: "Battle",
        canDispatch: false,
        canCancel: true,
        members: 6,
        prerequisite: "White King of Cinqul",
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 54,
            adaptability: 54,
        },
        objective: "Defeat all Foes!",
        law: "Forbidden: HP < or = 200 – Having less than 200 HP is forbidden.",
        enemies: [
            {
                name: "Black",
                type: "Monster",
            },
        ],
        strategy: [
            "Bring a healer to manage HP during the encounter",
            "Ranged magical attacks are effective in this mission",
        ],
        rewards: {
            gil: 15440,
            cp: 99,
            loot: "Lightwing Crystal ×1"
        },
        notes: "",
        tags: ["optional"]
    }
];