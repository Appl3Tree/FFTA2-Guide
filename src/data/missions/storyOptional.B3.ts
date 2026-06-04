// src/data/missions/storyOptional.B3.ts
// Arc B3 optional missions, accurately transcribed from Side_Quests.txt

import type { Mission } from "../../types/ffta2";

export const OPTIONAL_MISSIONS_B3: Mission[] = [
    {
        id: "B3-01",
        arc: "B3",
        name: "Death March",
        description: "- The Game Is On - Wanted: Participants for the greatest game in Ivalice! This time, it's the Death March. To the victor goes the spoils. - Rules of the Game - * Uphold the Law Bronkrise Gamer's Guild",
        rank: 23,
        region: "Graszton",
        fee: 400,
        days: 20,
        questType: "Uphold the Law",
        canDispatch: true,
        canCancel: true,
        members: 6,
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 9,
            adaptability: 9,
        },
        dispatchRecommended: ["Sage"],
        objective: "Uphold the Law and Defeat all Foes!",
        law: "Forbidden: Not Moving – Each unit must move at least 1 tile before ending its turn.",
    enemies: [
        { name: "Randomized Name", job: "Black Mage", quantity: 1, notes: "Uses Fire, Blizzard, Blizzara, Ice — highest priority target." },
        { name: "Randomized Name", job: "White Mage", quantity: 1, notes: "Uses Cure and Esuna — eliminate to deny healing." },
        { name: "Randomized Name", job: "White Monk", quantity: 1, notes: "Uses Roundhouse and Air Render." },
        { name: "Randomized Name", job: "Soldier", quantity: 1, notes: "Has one Rend skill and Mug." },
        { name: "Randomized Name", job: "Thief", quantity: 1, notes: "Has Steal Items, Steal Gil, and Doublehand (passive, not used offensively)." },
    ],
        strategy: [
            "Prioritize high-threat targets early in the battle",
            "Having Esuna available is recommended to handle debuffs",
            "Bring a healer to manage HP during the encounter",
        ],
        rewards: {
            gil: 2440,
            cp: 46,
            loot: "Dipraeu Bronze ×3"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "B3-03",
        arc: "B3",
        name: "A Lady's Proposition",
        description: "I want to fight against a monster and know the thrill of battle for myself. Father tells me to put such thoughts from my mind, but I will have none of it. Will you fight alongside me? I wait in the Rupie Mountains. Syrenead Sie Hyskaris",
        rank: 25,
        region: "The Rupie Mountains",
        fee: 400,
        days: 20,
        questType: "Satisfy Petitioner",
        canDispatch: true,
        canCancel: true,
        members: 6,
        requiredTalents: {
            negotiation: 11,
            aptitude: 0,
            teamwork: 0,
            adaptability: 11,
        },
        dispatchRecommended: ["Defender"],
        objective: "Protect Syrenead and Defeat all Foes!",
        law: "Forbidden: Harming the Weak – Actions that harm a lower level unit are forbidden.",
    enemies: [
        { name: "Randomized Name", job: "Ivory Wyrm", quantity: 1, notes: "Boss. Path is full of traps and at a height disadvantage. Use Gria flight, magick, or powerful ranged weapons to attack from a safe distance. Syrenead is a guest ally." },
    ],
        strategy: [
            "Ranged magical attacks are effective in this mission",
        ],
        rewards: {
            gil: 4500,
            cp: 50,
            loot: "Zodiac Ore ×8, Orichalcum ×1"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "B3-04",
        arc: "B3",
        name: "On the Rampage",
        description: "There's a monster on a nearby hill and, well, it's completely out of control! They say it lost its children, and being a mother I can understand how it must feel, but it's causing landslides right and left ... I'm sorry, but could someone deal with it? Concerned Mother",
        rank: 22,
        region: "Moorabella",
        fee: 400,
        days: 20,
        questType: "Defeat Mark",
        canDispatch: true,
        canCancel: true,
        members: 6,
        prerequisite: "For the Cause",
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 9,
            adaptability: 9,
        },
        objective: "Defeat the Mamatrice!",
        law: "Forbidden: > 100 Damage – Dealing > 100 Damage is Forbidden",
    enemies: [
        { name: "Mamatrice", job: "Cockatrice", quantity: 1, notes: "Klesta's mother. 800+ HP. Dangerous at close range — use Hunters (Sidewinder) and magick from a distance. Law makes damage output very slow." },
    ],
        battlefield: [
            "The battlefield contains trap tiles that pose hazards",
        ],
        strategy: [
            "Bring a healer to manage HP during the encounter",
        ],
        rewards: {
            gil: 2700,
            cp: 44,
            loot: "Fiend's Blood ×4"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "B3-06",
        arc: "B3",
        name: "A Lady's Persistance",
        description: "Father didn't believe I defeated a wyrm in my first battle. Perhaps if I capture it and show it to him he will not find it so easy a claim to dismiss. Will you assist me? I wait in the Rupie Mountains. Syrenead Sie Hyskaris",
        rank: 31,
        region: "The Rupie Mountains",
        fee: 400,
        days: 20,
        questType: "Satisfy Petitioner",
        canDispatch: true,
        canCancel: true,
        members: 6,
        prerequisite: "A Lady's Proposition",
        requiredTalents: {
            negotiation: 18,
            aptitude: 0,
            teamwork: 0,
            adaptability: 18,
        },
        objective: "Protect Syrenead and Defeat all Foes!",
        law: "Forbidden: Harming the Weak – Actions that harm a lower level unit are forbidden.",
    enemies: [
        { name: "Randomized Name", job: "Ivory Wyrm", quantity: 1, notes: "TARGET: Weaken to HP Critical — do NOT kill. Use abilities (near-zero crit chance) to avoid an accidental KO." },
    ],
        strategy: [
            "Protect Syrenead. The goal is to leave the Ivory Wyrm at HP Critical (not killed), so use controlled ability damage and Hunters with Sidewinder.",
            "Bring healers. Harming the Weak (law) — be careful not to over-damage low-level foes.",
        ],
        rewards: {
            gil: 5740,
            cp: 62,
            loot: "Mind Ceffyl ×2"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "B3-08",
        arc: "B3",
        name: "Unfamiliar Folk",
        description: "I saw some unfamiliar folk in the Ruins of Delgantua. It's just a feeling, but I don't think they're from around here. I don't think they're even from Jylland! They looked like thgey were planning something. ... Maybe someone aught inquire further? Perna, Professor of Archaeology",
        rank: 24,
        region: "The Ruins of Delgantua",
        fee: 400,
        days: 20,
        questType: "Investigation",
        canDispatch: true,
        canCancel: true,
        members: 6,
        requiredTalents: {
            negotiation: 9,
            aptitude: 9,
            teamwork: 0,
            adaptability: 0,
        },
        objective: "Defeat all Foes!",
        law: "Forbidden: Actions by Humes – Humes may only move and perform basic attacks.",
    enemies: [
        { name: "Randomized Name", job: "Archer", quantity: 1, notes: "Viera. Uses Blackout (Blind), Swarmstrike (Poison), Shadowstick (Speed Down) — highest priority target." },
        { name: "Randomized Name", job: "Black Mage", quantity: 1, notes: "Uses Blizzard and Blizzara." },
        { name: "Randomized Name", job: "Warrior", quantity: 1, notes: "Has Rend abilities and some debuffs." },
        { name: "Randomized Name", job: "Soldier", quantity: 1, notes: "Paladin-style with Counter." },
        { name: "Randomized Name", job: "Moogle", quantity: 1, notes: "Uses Sheep Count (Sleep) and Catnip (Berserk)." },
        { name: "Randomized Name", job: "Archer", quantity: 1, notes: "Hume. Weak ranged attacker." },
    ],
        strategy: [
            "Prioritize high-threat targets early in the battle",
            "Having Esuna available is recommended to handle debuffs",
            "Bring a healer to manage HP during the encounter",
            "Ranged magical attacks are effective in this mission",
        ],
        rewards: {
            gil: 2940,
            cp: 48,
            loot: "Four-Leaf Clover ×2, Platinum ×3"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "B3-09",
        arc: "B3",
        name: "A Lady's Insistance",
        description: "The wyrm I keep at our home is well behaved and docile, but a group of our neighbours have voiced complaint. Such ignorance ... To appease them, I've resolved to cut off my poor pet's horn - that should make him appear less fearsome. This is easier said than done, however, and I shall require help. Syrenead Sie Hyskaris",
        rank: 30,
        region: "Moorabella",
        fee: 400,
        days: 20,
        questType: "Satisfy Petitioner",
        canDispatch: true,
        canCancel: true,
        members: 6,
        requiredTalents: {
            negotiation: 28,
            aptitude: 0,
            teamwork: 0,
            adaptability: 28,
        },
        dispatchRecommended: ["Defender"],
        objective: "Protect Syrenead and Weaken the Ivory Wyrm!",
        law: "Forbidden: Attack – Attacking is Forbidden.",
    enemies: [
        { name: "Randomized Name", job: "Ivory Wyrm", quantity: 1, notes: "Objective: weaken to HP Critical — do NOT kill. Wyrm stays stationary. The law forbids normal attacks but abilities still work — use spells and skills. Protect Syrenead from being killed." },
    ],
        strategy: [
            "Prioritize high-threat targets early in the battle",
            "Bring a healer to manage HP during the encounter",
            "Ranged magical attacks are effective in this mission",
        ],
        rewards: {
            gil: 8510,
            cp: 60,
            loot: "Beastlord Horn ×2"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "B3-11",
        arc: "B3",
        name: "Duelhorn",
        description: "There's a forest not too far from where I live and at night I see, well, shapes flitting through the trees ... or something. I've gone during the day, but no one's there. Could someone go and look into it? I get this feeling there're more of them every time. Anonymous",
        rank: 26,
        region: "Baptiste Hill",
        fee: 400,
        days: 20,
        questType: "Battle",
        canDispatch: true,
        canCancel: true,
        members: 6,
        prerequisite: "Unfamiliar Folk",
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 11,
            adaptability: 11,
        },
        objective: "Defeat all Foes!",
        law: "Forbidden: Restoring MP – Actions that restore MP are forbidden.",
    enemies: [
        { name: "Randomized Name", job: "Hunter", quantity: 1, notes: "Gria Hunter — has Sneak Attack." },
        { name: "Randomized Name", job: "Thief", quantity: 1, notes: "Moogle Thief — has Mog Knight skills including Moogle Lance." },
        { name: "Randomized Name", job: "White Mage", quantity: 1, notes: "Healer — eliminate to stop sustained healing." },
        { name: "Randomized Name", job: "Blue Mage", quantity: 1, notes: "Has Magick Hammer (drains MP)." },
    ],
        strategy: [
            "No Restoring MP (law). Kill the White Mage to cut healing, then handle the rest.",
            "Watch the Blue Mage's Magick Hammer draining your MP and the Hunter's Sneak Attack.",
        ],
        rewards: {
            gil: 4800,
            cp: 52,
            loot: "Wyrmtwig ×2"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "B3-13",
        arc: "B3",
        name: "Wanted: Barmaid",
        description: "To assist with the Great Land Festival in Camoa, we are currently on the look out for attractive barmaids. During the month of the festival, you will be provided lodging at the pub. Let's see those applicants! Targ Barman",
        rank: 2,
        region: "Targ Wood",
        fee: 100,
        days: 10,
        questType: "Satisfy Petitioner",
        canDispatch: false,
        canCancel: true,
        members: 1,
        requiredTalents: {
            negotiation: 3,
            aptitude: 0,
            teamwork: 0,
            adaptability: 3,
        },
        objective: "Dispatch the right person for the job",
    enemies: [],
        strategy: [
            "Dispatch mission — send a Viera or Gria member for 14 days. No other races qualify for the barmaid role.",
        ],
        rewards: {
            gil: 880,
            cp: 4,
            loot: "Knot of Rust ×6, Ether ×3, Phoenix Down ×3"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "B3-14",
        arc: "B3",
        name: "Making Port",
        description: "There's a ship coming in to port soon I got a bad feelin about. The chief says the paperwork checks out - no problem. No problem with the paperwork? That's suspicious right there! Someone look into this for me. Dock Worker",
        rank: 25,
        region: "Graszton",
        fee: 400,
        days: 20,
        questType: "Investigation",
        canDispatch: true,
        canCancel: true,
        members: 6,
        prerequisite: "Duelhorn",
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 0,
            adaptability: 0,
        },
    enemies: [],
        strategy: [
            "Part of the Duelhorn questline — investigate the incoming ship in Graszton. Advances the story toward the smuggling/Duelhorn plot.",
        ],
        rewards: {
            gil: 4380,
            cp: 50,
            loot: "Crusite Alloy ×4"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "B3-16",
        arc: "B3",
        name: "Knowing the Beast",
        rank: 6,
        region: "Camoa",
        fee: 200,
        days: 20,
        questType: "Satisfy Petitioner",
        canDispatch: false,
        canCancel: true,
        members: 6,
        requiredTalents: {
            negotiation: 4,
            aptitude: 0,
            teamwork: 0,
            adaptability: 4,
        },
        objective: "Guard the Bridge for 4 rounds!",
        law: "Forbidden: Reaction Abilities – Reaction Abilities are forbidden",
    enemies: [
        { name: "Randomized Name", job: "Wolf", quantity: 2, notes: "Initial wave. Enemy reinforcements keep crossing the bridges after each wave is killed." },
        { name: "Randomized Name", job: "Baknamy", quantity: 2, notes: "Initial wave. Use two frontline tanks to block the bridges and ranged support behind." },
    ],
        rewards: {
            gil: 830,
            cp: 12,
            loot: "Danbukwood ×4, Skull ×3, Clock Gear ×5"
        },
        notes: "",
        tags: ["optional"]
    }
];
