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
        strategy: [
            "MUST be dispatched — the 6-day time limit makes it physically impossible to visit all four locations manually. Dispatch any unit.",
        ],
        rewards: {
            gil: 2930,
            cp: 50,
            loot: "Prime Pelt ×1"
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
        { name: "House Bowen: Ravager", job: "Ravager", quantity: 1, notes: "House Bowen unit." },
        { name: "House Bowen: Fighter", job: "Fighter", quantity: 1, notes: "House Bowen unit." },
        { name: "House Bowen: Assassin", job: "Assassin", quantity: 1, notes: "PRIORITY: Death attacks threaten Mocedad. Eliminate first." },
        { name: "House Bowen: Illusionist", job: "Illusionist", quantity: 1, notes: "PRIORITY: AoE illusion magick hits all units. Eliminate quickly." },
    ],
        strategy: [
            "3-unit party. Mocedad (Cannoneer) and Madreth (Time Mage) join as allies — protect both.",
            "Eliminate the Assassin and Illusionist first. Heal Mocedad and Madreth whenever needed.",
        ],
        rewards: {
            gil: 10300,
            cp: 99,
            loot: "Moon Ring ×2"
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
        law: "Forbidden: Restoring MP – Actions that restore MP are forbidden.",
    enemies: [
        { name: "Randomized Name", job: "Antlion", quantity: 4, notes: "Endless reinforcements — as each is killed, another replaces it. Kill 10 total. One also joins mid-battle even without kills. Gang up to kill quickly." },
    ],
        strategy: [
            "Station a Counter unit adjacent to the tree to block enemies from touching it.",
            "Focus multiple units on each Antlion — don't fight 1v1. Kill all 10 as fast as possible.",
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
        law: "Forbidden: Items – Items are forbidden.",
    enemies: [
        { name: "Bangaa Brotherhood: Cannoneer", job: "Cannoneer", quantity: 1, notes: "Bangaa enemy." },
        { name: "Bangaa Brotherhood: White Monk", job: "White Monk", quantity: 1, notes: "Bangaa enemy." },
        { name: "Bangaa Brotherhood: Master Monk", job: "Master Monk", quantity: 1, notes: "Bangaa enemy." },
        { name: "Bangaa Brotherhood: Bishop", job: "Bishop", quantity: 1, notes: "Bangaa enemy." },
        { name: "Bangaa Brotherhood: Gladiator", job: "Gladiator", quantity: 1, notes: "PRIORITY: Very high offensive power. Eliminate first." },
    ],
        strategy: [
            "Your allies: Arcanist (leader — must not die), Illusionist, and White Mage.",
            "Items are banned. Focus on Gladiator first — high offense. Use Arcanist and Illusionist support.",
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
        strategy: [
            "Delivery mission — bring logs from The Forests of Loar, Towns of Loar, or Lands of Loar. More logs = better bonus reward. Logs are removed from Clan Primer upon delivery.",
        ],
        rewards: {
            gil: 140,
            cp: 30,
            loot: ""
        },
        notes: "",
        tags: ["optional"]
    }
];
