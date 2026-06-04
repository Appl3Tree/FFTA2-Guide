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
        { name: "Randomized Name", job: "Geomancer", quantity: 3, notes: "PRIORITY: Use rain-enhanced water spells. Eliminate quickly with Fusiliers or ranged units." },
        { name: "Randomized Name", job: "Wendigo", quantity: 1, notes: "Melee bruiser — use melee units to handle." },
        { name: "Randomized Name", job: "Nagaraja", quantity: 1, notes: "Melee monster — use melee units to handle." },
    ],
        strategy: [
            "Stay off water tiles. Kill Geomancers first with Fusiliers or ranged attackers — they use water spells in the rain.",
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
        { name: "Randomized Name", job: "Geomancer", quantity: 2, notes: "Have Shining Flare, Nature's Embrace, and Artifice's Embrace. Priority targets." },
        { name: "Randomized Name", job: "Geomancer", quantity: 1, notes: "Has Shining Flare and Nature's Embrace (default loadout)." },
        { name: "Randomized Name", job: "Hellhound", quantity: 1, notes: "Has Shadowy Blow and standard abilities." },
        { name: "Randomized Name", job: "Nidhogg", quantity: 1, notes: "Uses Fire and Lightning breath attacks." },
    ],
        strategy: [
            "Target Geomancers first. Nidhogg uses Fire/Lightning — bring units resistant to those elements.",
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
        { name: "Randomized Name", job: "Deathscythe", quantity: 1, notes: "Uses Doom, Shackle, Daraga, and Blood Price. Priority target." },
        { name: "Randomized Name", job: "Nidhogg", quantity: 1, notes: "Uses Fire and Ice Breath." },
        { name: "Randomized Name", job: "Great Malboro", quantity: 1, notes: "Uses Eerie Sound Wave, Goo, and Putrid Breath — heavy debuffer." },
        { name: "Randomized Name", job: "Lamia", quantity: 1, notes: "Uses Night, Twister, and Hand Slap." },
        { name: "Randomized Name", job: "Headless", quantity: 1, notes: "Uses Quake, Bone Shatter, and Sunder Earth." },
    ],
        strategy: [
            "4 Prima Donna units join as allies. Target the Deathscythe first to stop Doom — then Great Malboro to prevent mass debuffs.",
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
        { name: "Randomized Name", job: "Baknamy", quantity: 3, notes: "All-monster battle. Must be killed within 4 rounds (possibly 2 rounds at higher difficulty)." },
        { name: "Randomized Name", job: "Luchorpan", quantity: 1, notes: "All-monster battle." },
    ],
        strategy: [
            "4-unit party only. Bring Hunters and Mages — no melee. Must defeat all in 4 rounds (possibly 2).",
            "Vary each unit's action to avoid Copycat law violations.",
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
        { name: "Flowsand Lord", job: "Yowie", quantity: 1, notes: "Speed battle mark. ~1600 HP. Weak to Wind. Use Mirror Items (X Potion doubled) and Wind attacks to burst HP. Also contested by Tigrina's team." },
        { name: "Randomized Name", job: "Pit Beast", quantity: 2, notes: "Guard the Flowsand Lord — eliminate or bypass." },
    ],
        strategy: [
            "4-unit party (your team) vs Tigrina's team (3 units) vs Yowie mark. Must land the killing blow.",
            "Use 2 Seeqs with Mirror Items + X Potions to deal ~800 burst damage. Gria Raptors with Wind attacks are also effective.",
            "Close-range only due to law — position units adjacent to mark before attacking.",
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
        { name: "Randomized Name", job: "Parivir", quantity: 1, notes: "~10 levels above rank. High speed." },
        { name: "Randomized Name", job: "Ninja", quantity: 1, notes: "Has Dual Wield. ~10 levels above rank. High speed." },
        { name: "Randomized Name", job: "Assassin", quantity: 1, notes: "~10 levels above rank. High speed." },
    ],
        strategy: [
            "Enemies are ~10 levels above quest rank — fight at equal or higher level. Avoid Lightning entirely.",
            "Protect the Devotee. Use tanks to intercept the high-speed enemies before they reach the escort target.",
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
        strategy: [
            "No battle — cutscene conclusion to the Duelhorn questline. Alys gives you the Ring of Precepts (Scion summoning item).",
        ],
        rewards: {
            gil: 7000,
            cp: 40,
            loot: "Mythril ×1"
        },
        notes: "",
        tags: ["optional"]
    }
];
