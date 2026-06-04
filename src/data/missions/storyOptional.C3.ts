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
        law: "Forbidden: Not Moving – Each unit must move at least 1 tile before ending its turn.",
    enemies: [
        { name: "Randomized Name", job: "Baknamy", quantity: 2, notes: "Always present regardless of the mark. Traps are also scattered on the field." },
        { name: "Scarface", job: "Randomized Mark", quantity: 1, notes: "The mark varies per player. Heal the mark if the enemy team is about to KO it to deny them the kill. Kill enemy clan units to prevent them from stealing the kill." },
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
    enemies: [
        { name: "Randomized Name", job: "Flan", quantity: 4, notes: "Or Mimics at higher levels. Ignore enemies — rush to cleaning spots across the airship. Number of rounds scales with difficulty/level." },
    ],
        strategy: [
            "Ignore enemies and move to cleaning tiles across the airship. Rounds to complete scale with level/difficulty.",
            "Use high-movement units and Haste. Tinker's Red Springs also helps gain extra turns.",
        ],
        rewards: {
            gil: 180,
            cp: 44,
            loot: "Fine Wool ×1"
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
        objective: "Stage 1: Go to Calea! | Stage 2: Defeat all Foes and keep them away from Calea!",
        law: "Stage 1: Forbidden: Harming the Weak – Actions that harm a lower level unit are forbidden. | Stage 2: Forbidden: Copycat – Using the same action as the preceding unit is forbidden.",
    enemies: [
        // --- STAGE 1 ---
        { name: "Randomized Name", job: "Floating Eye", quantity: 4, notes: "STAGE 1. All have Supersonic Wave, Death Dive, and Gnaw. Two have Counter + Concentration; two have Critical: Quicken + Reveal. Very easy — just move to Calea to complete stage 1. Use a Gria to fly over them if blocked." },
        // --- STAGE 2 (Khamja thugs arrive after cutscene — same party, HP carries over) ---
        { name: "Khamja Lanista", job: "Lanista", quantity: 1, notes: "STAGE 2. Has Sword of Darkness, Sword of Light, Haunting Vision, Blink Counter. 4th priority." },
        { name: "Khamja Parivir", job: "Parivir", quantity: 1, notes: "STAGE 2. Has Wind Slash, Iai Blow, Shimmering Blade, Strike Back. PRIORITY 1 — very dangerous." },
        { name: "Khamja Seer", job: "Seer", quantity: 1, notes: "STAGE 2. Has Cura, Esuna, Star Cross, Wild Tornado. PRIORITY 3 — healer." },
        { name: "Khamja Master Monk", job: "Master Monk", quantity: 1, notes: "STAGE 2. Has Pummel, Withering Strike, Lifebane, Cross-Counter. PRIORITY 5." },
        { name: "Khamja Arcanist", job: "Arcanist", quantity: 1, notes: "STAGE 2. Has Gravity, Lvl. 3 Dark, Lvl. 5 Haste, Lvl. ? Shadowflare. PRIORITY 6." },
        { name: "Khamja Assassin", job: "Assassin", quantity: 1, notes: "STAGE 2. Has Shadowbind, Last Breath, Aphonia. PRIORITY 1 — Last Breath instantly kills." },
    ],
        strategy: [
            "TWO-STAGE BATTLE. Luso and Cid are forced party members in both stages.",
            "STAGE 1 (Harming the Weak law): Enemies are underleveled. Move one unit adjacent to Calea to end the stage — no combat needed. Use a Gria to fly over Floating Eyes if blocked.",
            "STAGE 2 (Copycat law): Khamja thugs arrive mid-battle. Your HP carries over — bring a White Mage. Vary each unit's action each turn to avoid Copycat violations.",
            "Kill Assassin (Last Breath) and Parivir first. Then Seer (healer) and Lanista. Arcanist and Master Monk last.",
            "LOSE if any enemy unit ends their turn within 3 tiles of Calea.",
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
    enemies: [
        { name: "Randomized Name", job: "White Monk", quantity: 3, notes: "PRIORITY: Have Air Render — eliminate all three first. Melee only due to AoE law." },
        { name: "Randomized Name", job: "Warrior", quantity: 2, notes: "Standard Bangaa melee. Lower priority than the White Monks." },
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
    enemies: [
        {
            name: "Miss Midori",
            job: "Green Mage",
            abilities: {
                A1: {
                    setId: "green-magick",
                    abilityIds: [
                        "blind",
                        "sleep"
                    ]
                },
                A2: null,
                R: null,
                P: "spellbound"
            },
            equipment: [
                {slot: 1, itemId: "druidMace" },
                {slot: 2, itemId: "hempenRobe" },
            ]
        },
        {
            name: "Miss Midori",
            job: "Green Mage",
            quantity: 3,
            abilities: {
                A1: {
                    setId: "green-magick",
                    abilityIds: []
                },
                A2: null,
                R: null,
                P: ""
            },
            equipment: [
                {slot: 1, itemId: "hempenRobe" },
            ]
        },
    ],
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
        { name: "Randomized Name", job: "Viking", quantity: 1, notes: "Has Thunder, Pickpocket, Strong-arm. Critical: Berserk. Tends to target the birds." },
        { name: "Randomized Name", job: "Soldier", quantity: 1, notes: "Has Mug Gil and Provoke. Critical: Berserk." },
        { name: "Randomized Name", job: "Black Mage", quantity: 1, notes: "PRIORITY: Has Fira, Blizzara, Thundara — highest damage potential. Critical: Berserk. Eliminate first." },
        { name: "Mamatrice", job: "Trice", quantity: 1, notes: "Protect this — the mother bird. Enemies focus attacks on her." },
        { name: "Cluckatrice", job: "Cluckatrice", quantity: 1, notes: "Protect this — the chick. Only ~200 HP, a single hit deals ~100. Extremely fragile." },
    ],
        strategy: [
            "Protect BOTH the Mamatrice and her Cluckatrice. Enemies focus their attacks on the birds — intercept with your units.",
            "Eliminate the Black Mage first (highest spell damage), then Viking, then Soldier. All three have Critical: Berserk.",
            "Minimum 20 damage per attack (law) — use physical attackers. Positioning between enemies and birds is more important than kill order.",
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
