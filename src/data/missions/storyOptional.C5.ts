// src/data/missions/storyOptional.C5.ts
// Arc C5 optional missions, accurately transcribed from Side_Quests.txt

import type { Mission } from "../../types/ffta2";

export const OPTIONAL_MISSIONS_C5: Mission[] = [
    {
        id: "C5-01",
        arc: "C5",
        name: "Geomancer's Way - Rain",
        description: "Geomancers bend nature to their will. Our society has established a series of trials for prospective geomancers to determine whether they are worthy to share in our knowledge. The Trial of Venomed Rain is the second of four trials. When you are ready to be tested, come. Naturalist Society",
        rank: 36,
        region: "Tramdine Fens",
        fee: 500,
        days: 20,
        questType: "Battle",
        canDispatch: false,
        canCancel: true,
        members: 6,
        prerequisite: "Geomancer's Way -",
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 33,
            adaptability: 33,
        },
        objective: "Defeat all Foes!",
        law: "Forbidden: Swimming – Entering a water tile is forbidden.",
        enemies: [
            {
                name: "Geomancers ×3",
                type: "Monster",
            },
        ],
        strategy: [
            "Ranged magical attacks are effective in this mission",
        ],
        rewards: {
            gil: 4080,
            cp: 72,
            loot: "Rainbow Thread ×2"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "C5-02",
        arc: "C5",
        name: "Geomancer's Way - Sun",
        description: "Geomancers bend nature to their will. Our society has established a series of trials for prospective geomancers to determine whether they are worthy to share in our knowledge. The Trial of the Sun is the first of four trials. When you are ready to be tested, come. Naturalist Society",
        rank: 35,
        region: "Kthili Sands",
        fee: 500,
        days: 20,
        questType: "Battle",
        canDispatch: false,
        canCancel: true,
        members: 6,
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 33,
            adaptability: 33,
        },
        objective: "Defeat all Foes!",
        law: "Forbidden: Reaction Abilities – Reaction Abilities are forbidden.",
        enemies: [
            {
                name: "Geomancers ×3",
                type: "Monster",
            },
            {
                name: "Hellhound",
                type: "Monster",
            },
        ],
        strategy: [
            "Prioritize high-threat targets early in the battle",
            "Ranged magical attacks are effective in this mission",
        ],
        rewards: {
            gil: 5460,
            cp: 70,
            loot: "Cockatrice Skin ×2"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "C5-03",
        arc: "C5",
        name: "Starstruck",
        description: "We've been so busy with our singing we've entirely neglected our stage combat. Sparring is well and good, but our adoring public wants authenticity - only a proper melee with beasts and blood will do! I'm sure we can handle ourselves, but we are out of practice, so a bodyguard would be welcome. Will no one come to our aid? Prima Donna",
        rank: 47,
        region: "The Ruins of Delgantua",
        fee: 500,
        days: 20,
        questType: "Battle",
        canDispatch: true,
        canCancel: true,
        members: 3,
        prerequisite: "The Storage Shed",
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 33,
            adaptability: 33,
        },
        objective: "Defeat all Foes!",
        law: "Forbidden: Restoring MP – Actions that restore MP are forbidden.",
        enemies: [
            {
                name: "Nidhogg",
                type: "Monster",
            },
            {
                name: "Great Malboro",
                type: "Monster",
            },
            {
                name: "Lamia",
                type: "Monster",
            },
        ],
        rewards: {
            gil: 8670,
            cp: 94,
            loot: "Wayerwyrd Crystal ×1"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "C5-04",
        arc: "C5",
        name: "Moorabella Nightwatch",
        description: "A plague of robberies has fallen upon the land! All occur at night and follow a similar pattern, indicating that a single group may be responsible. For the swift resolution of this case, and the safety of our citizens, we are currently accepting applications to join the Moorabella Nightwatch. Jylland Sovereignty Society",
        rank: 40,
        region: "Moorabella",
        fee: 500,
        days: 20,
        questType: "Satisfy Petitioner",
        canDispatch: true,
        canCancel: true,
        members: 4,
        requiredTalents: {
            negotiation: 44,
            aptitude: 0,
            teamwork: 44,
            adaptability: 44,
        },
        objective: "Defeat all Foes in Four Rounds!",
        law: "Forbidden: Copycat – Using the same action as the preceding unit is forbidden.",
        enemies: [
            {
                name: "Baknamy ×3",
                type: "Monster",
            },
            {
                name: "Luchorpan ×1",
                type: "Monster",
            },
            {
                name: "Monsters ×4",
                type: "Monster",
            },
        ],
        strategy: [
            "Prioritize high-threat targets early in the battle",
            "Ranged magical attacks are effective in this mission",
        ],
        rewards: {
            gil: 6620,
            cp: 80,
            loot: "Aurea Pollen ×1"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "C5-05",
        arc: "C5",
        name: "Ravager",
        description: "To Clan <Name>, Think you're all that? Prive it! I'm waiting in the Galerria Deep! Tigrina, Ravager",
        rank: 44,
        region: "The Galerria Deep",
        fee: 500,
        days: 20,
        questType: "Meet Objectives",
        canDispatch: false,
        canCancel: true,
        members: 4,
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 0,
            adaptability: 44,
        },
        objective: "Speed Battle vs. Tigrina",
        law: "Forbidden: Targeting Distant Units – Actions targeting units two or more tiles away are forbidden.",
        enemies: [
            {
                name: "Mirror Items ×2",
                type: "Monster",
            },
            {
                name: "Ravager",
                type: "Monster",
            },
            {
                name: "Yowie",
                type: "Monster",
            },
        ],
        strategy: [
            "Ranged magical attacks are effective in this mission",
        ],
        rewards: {
            gil: 6720,
            cp: 88,
            loot: "Scarletite ×1"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "C5-06",
        arc: "C5",
        name: "A Lanista's Pride",
        description: "Something horrible has happened: a great affront to my family I cannot let stand! Though it's only a few days before the next Prima Donna concert - I've never missed one yet - I find myself contemplating selling my tickets and going to face those responsible for said affront! In short, I have resolved to confront them, and I need someone to stand witness. Viva Prima Donna! - Devotee",
        rank: 26,
        region: "Fluorgis",
        fee: 400,
        days: 20,
        questType: "Escort",
        canDispatch: false,
        canCancel: true,
        members: 5,
        requiredTalents: {
            negotiation: 44,
            aptitude: 0,
            teamwork: 44,
            adaptability: 44,
        },
        objective: "Defend the Devotee and Defeat all Foes!",
        law: "Forbidden: Lightning – Weapons and abilities that use Lightning are forbidden.",
        enemies: [
            {
                name: "Parivir",
                type: "Monster",
            },
        ],
        rewards: {
            gil: 3050,
            cp: 52,
            loot: "Hero Tonic ×4"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "C5-13",
        arc: "C5",
        name: "A Lasting Peace",
        description: "Clan <Name>, I wish to speak with you. Would you meet me at the Moorabella Aerodrome? Alys",
        rank: 20,
        region: "Moorabella",
        fee: 300,
        days: 20,
        questType: "Satisfy Petitioner",
        canDispatch: false,
        canCancel: true,
        members: 1,
        prerequisite: "One Last Memory",
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 0,
            adaptability: 54,
        },
        enemies: [],
        rewards: {
            gil: 7000,
            cp: 40,
            loot: "Mythril ×1"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "C5-16",
        arc: "C5",
        name: "Unplumbed Depths",
        description: "Came across a curious notice in the pub about a new tunnel discovered in the Neslowe Passage. A little exploration may turn up the treasure the passage is rumoured to hold.",
        region: "The Neslowe Passage",
        questType: "Defeat Mark",
        canDispatch: false,
        canCancel: false,
        members: 6,
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 0,
            adaptability: 0,
        },
        objective: "Get the Treasure!",
        law: "Forbidden: Targeting Self – Actions targeting the user are forbidden.",
        enemies: [],
        battlefield: [
            "Treasure chests are present on the battlefield",
        ],
        rewards: {
            gil: 11150,
            cp: 99,
            loot: "Stormsoul Crystal ×1"
        },
        notes: "",
        tags: ["optional"]
    }
];
