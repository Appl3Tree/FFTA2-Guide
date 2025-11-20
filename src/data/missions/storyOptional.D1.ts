// src/data/missions/storyOptional.D1.ts
// Arc D1 optional missions, accurately transcribed from Side_Quests.txt

import type { Mission } from "../../types/ffta2";

export const OPTIONAL_MISSIONS_D1: Mission[] = [
    {
        id: "D1-01",
        arc: "D1",
        name: "An Earnest Delight",
        description: "I seek the love of my life! My search has led me through city streets and far aboard. I have even taken up the pen, and met five charming ladies in my correspondence. Ah, but I've made a mess of things by scheduling a rendezvous with each of them on the same day! I need someone to meet four of the lucky damsels in my stead. Only the dashing need apply - I've a reputation to consider. Marnot, Pride of Fluorgis",
        rank: 25,
        region: "Goug, Fens, Zed, Bisga",
        fee: 400,
        days: 6,
        questType: "Satisfy Petitioner",
        canDispatch: true,
        canCancel: true,
        members: 1,
        prerequisite: "An Earnest Multitude",
        requiredTalents: {
            negotiation: 44,
            aptitude: 0,
            teamwork: 0,
            adaptability: 44,
        },
        enemies: [],
        rewards: {
            gil: 2930,
            cp: 50,
            loot: "Prime Pelt ×1"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "D1-02",
        arc: "D1",
        name: "Oh No, Kupo!",
        description: "I don't know when or how these bombs got in here, but they made a real mess of the town, kupo! Our machine got blown to smithereens! Kupo-po! I'd pick up the pieces, but I can't see for the tears! Could someone collect what's left? Sheni, Machinist",
        rank: 39,
        region: "Goug",
        fee: 500,
        days: 20,
        questType: "Item Recovery",
        canDispatch: true,
        canCancel: true,
        members: 6,
        requiredTalents: {
            negotiation: 33,
            aptitude: 0,
            teamwork: 0,
            adaptability: 0,
        },
        objective: "Gather all the Machinery Parts!",
        law: "Forbidden: Harming the Weak – Actions that harm a lower level unit are forbidden.",
        enemies: [],
        rewards: {
            gil: 7210,
            cp: 78,
            loot: "Tanned Beast Hide ×2"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "D1-05",
        arc: "D1",
        name: "The Bangaa of the Rupies",
        description: "This rivalry has gone on for many longs years ... high time we finished it once and for all! Those cowards in the Nu Mou Nobles have had it coming, and with a little extra muscle from you, we'll see they get it! The battlefield will be the Rupie Mountains. Come prepared! Mocedad, Bangaa Brotherhood",
        rank: 50,
        region: "The Rupie Mountains",
        fee: 500,
        days: 20,
        questType: "Battle",
        canDispatch: false,
        canCancel: true,
        members: 4,
        prerequisite: "The Nu Mou Nobles",
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 20,
            adaptability: 20,
        },
        objective: "Defeat all Foes!",
        law: "Forbidden: Fire – Weapons and abilities that use fire are forbidden.",
        enemies: [
            {
                name: "Gladiator",
                type: "Monster",
            },
            {
                name: "Biship",
                type: "Monster",
            },
        ],
        strategy: [
            "Having Esuna available is recommended to handle debuffs",
            "Bring a healer to manage HP during the encounter",
        ],
        rewards: {
            gil: 4970,
            cp: 99,
            loot: "Earth Sigil ×2"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "D1-07",
        arc: "D1",
        name: "The Rivalry of the Rupies",
        description: "The Rupie Mountains are ours...but someone apparently forgot to tell those interlopers that! Come and see us stomp out this latest threat to our territory! We'll show them-and the world-that we of the Bangaa Brotherhood aren't to be trifled with! Mocedad, Bangaa Brotherhood",
        rank: 59,
        region: "The Rupie Mountains",
        fee: 500,
        days: 20,
        questType: "Escort",
        canDispatch: false,
        canCancel: true,
        members: 3,
        requiredTalents: {
            negotiation: 33,
            aptitude: 0,
            teamwork: 33,
            adaptability: 0,
        },
        objective: "Protect Mocedad and Madreth!",
        law: "Forbidden: Buffs – Buffs are forbidden.",
        enemies: [
            {
                name: "Ravager",
                type: "Monster",
            },
            {
                name: "Cannoneer",
                type: "Monster",
            },
        ],
        strategy: [
            "Ranged magical attacks are effective in this mission",
        ],
        rewards: {
            gil: 10300,
            cp: 99,
            loot: "Bangaa of Rupies ×3, Moon Ring ×2"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "D1-09",
        arc: "D1",
        name: "Tree Hugging",
        description: "Monsters are chewing on the tree where my brother and I used to compare heights as children. I fear it will soon die if nothing is done. Could someone drive off the monsters for me? Celestine, A Good Sister",
        rank: 15,
        region: "Graszton",
        fee: 300,
        days: 20,
        questType: "Satisfy Petitioner",
        canDispatch: true,
        canCancel: true,
        members: 6,
        requiredTalents: {
            negotiation: 7,
            aptitude: 0,
            teamwork: 0,
            adaptability: 7,
        },
        objective: "Defeat 10 Foes and keep them from the tree!",
        enemies: [
            {
                name: "Foes ×10",
                type: "Monster",
            },
            {
                name: "Antlions ×4",
                type: "Monster",
            },
        ],
        battlefield: [
            "The map features elevation differences",
        ],
        rewards: {
            gil: 3280,
            cp: 30,
            loot: "Power Fruit ×2, Telaq Flower ×1, Dirty Wool ×1"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "D1-10",
        arc: "D1",
        name: "The Nu Mous of the Rupies",
        description: "Our rivalry has gone on many long years ... long enough. I want it to end. We must vanquish into shame those musclebound Bangaa Brotherhood goons once and for all! Seeking warriors with faith in their mental acuity to aid our cause in battle. The battlefield will be the Rupie Mountains. Madreth, Nu Mou Nobles",
        rank: 50,
        region: "The Rupie Mountains",
        fee: 500,
        days: 20,
        questType: "Battle",
        canDispatch: false,
        canCancel: true,
        members: 6,
        prerequisite: "Bangaa of the Rupies",
        requiredTalents: {
            negotiation: 0,
            aptitude: 20,
            teamwork: 20,
            adaptability: 0,
        },
        enemies: [
            {
                name: "Brotherhood",
                type: "Monster",
            },
            {
                name: "Cannoneer",
                type: "Monster",
            },
            {
                name: "White Monk",
                type: "Monster",
            },
            {
                name: "Master Monk",
                type: "Monster",
            },
            {
                name: "Bishop",
                type: "Monster",
            },
        ],
        strategy: [
            "Bring a healer to manage HP during the encounter",
            "Ranged magical attacks are effective in this mission",
        ],
        rewards: {
            gil: 10640,
            cp: 99,
            loot: "Earth Sigil ×2"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "D1-13",
        arc: "D1",
        name: "Memories",
        rank: 15,
        region: "Targ Wood",
        fee: 300,
        days: 20,
        questType: "Delivery",
        canDispatch: false,
        canCancel: true,
        members: 1,
        requiredTalents: {
            negotiation: 1,
            aptitude: 0,
            teamwork: 0,
            adaptability: 0,
        },
        enemies: [],
        rewards: {
            gil: 140,
            cp: 30,
            loot: ""
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "D1-14",
        arc: "D1",
        name: "'Tis the Season",
        description: "Tis the season again, the seaon for those horrid mimics to start spawning. Oh, I want to get rid of them this year in the worst way, but it will take a while to activate my magickal device that should put an end to the infestation. I need someone to hold them off until it gets going! Center for Mimic Control Research Assistant to the Chief",
        rank: 29,
        region: "The Neslowe Passage",
        fee: 400,
        days: 20,
        questType: "Satisfy Petitioner",
        canDispatch: true,
        canCancel: true,
        members: 6,
        requiredTalents: {
            negotiation: 44,
            aptitude: 0,
            teamwork: 0,
            adaptability: 44,
        },
        objective: "Buy Time for Four Rounds!",
        law: "Forbidden: HP < or = 20 – Having less than 20 HP is forbidden.",
        enemies: [],
        strategy: [
            "Bring a healer to manage HP during the encounter",
        ],
        rewards: {
            gil: 6220,
            cp: 58,
            loot: "Clear Sap ×1, Magick Fruit ×1"
        },
        notes: "",
        tags: ["optional"]
    }
];