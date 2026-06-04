// src/data/missions/storyOptional.E2.ts
// Arc E2 optional missions, accurately transcribed from Side_Quests.txt

import type { Mission } from "../../types/ffta2";

export const OPTIONAL_MISSIONS_E2: Mission[] = [
    {
        id: "E2-05",
        arc: "E2",
        name: "Survey No. 258",
        description: "Wanted: Researchers to assist with geological survey of the Galerria Deep. Please survey the area assigned and report your findings. Jylland Geological Survey Committee",
        rank: 24,
        region: "The Galerria Deep",
        fee: 400,
        days: 20,
        questType: "Satisfy Petitioner",
        canDispatch: true,
        canCancel: true,
        members: 6,
        requiredTalents: {
            negotiation: 13,
            aptitude: 0,
            teamwork: 0,
            adaptability: 13,
        },
        objective: "Survey points of geological interest!",
        law: "Forbidden: Bludgeoning Weapons – Attacks with rods, staves, poles, knuckles, hammers and maces are forbidden.",
    enemies: [
        { name: "Randomized Name", job: "Ahriman", quantity: 2, notes: "Do not face them — gaze attacks cause heavy debuffs. Can be ignored if you avoid facing them." },
        { name: "Randomized Name", job: "Zombie", quantity: 3, notes: "Undead — use Cure/Holy to damage. Leave tombstone with Phoenix Down to prevent resurrection." },
        { name: "Randomized Name", job: "Black Chocobo", quantity: 1, notes: "Relatively harmless compared to others." },
    ],
        strategy: [
            "Survey all geological points to complete mission. Enemies don't need to be killed but make surveying easier.",
            "Use Cure on Zombies to damage them. Keep facing away from Ahrimans at all times.",
        ],
        battlefield: [
            "The battlefield contains trap tiles that pose hazards",
        ],
        rewards: {
            gil: 5000,
            cp: 48,
            loot: "Leestone ×7, Quality Pelt ×1"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "E2-06",
        arc: "E2",
        name: "Survey No. 259",
        description: "Wanted: Researchers to assist with geological survey of Nazan Mines. Please survey the area assigned and report your findings. Transportation fees will be provided. Jylland Geological Survey Committee",
        rank: 33,
        region: "Nazan Mines",
        fee: 500,
        days: 20,
        questType: "Satisfy Petitioner",
        canDispatch: true,
        canCancel: true,
        members: 6,
        prerequisite: "Survey No. 258",
        requiredTalents: {
            negotiation: 22,
            aptitude: 0,
            teamwork: 0,
            adaptability: 22,
        },
        objective: "Survey points of geological interest!",
        law: "Forbidden: Summoning Scions – Summoning Scions is forbidden.",
    enemies: [
        { name: "Randomized Name", job: "Plague", quantity: 1, notes: "Has Roulette, Binding Circle, and Dread. Kill last." },
        { name: "Randomized Name", job: "Zombie", quantity: 1, notes: "Undead — use Cure/Holy. Has Miasma and Drain Touch." },
        { name: "Randomized Name", job: "Ghoul", quantity: 1, notes: "Has Darkra, Absorb Damage. Kill first — respawns if tombstone not cleared with Phoenix Down." },
        { name: "Randomized Name", job: "Bloody Orb", quantity: 1, notes: "Has Vampire and Supersonic Wave." },
    ],
        strategy: [
            "Survey all geological points. Use Exorcise on undead units. Kill Ghoul and Zombie first.",
            "Use Phoenix Down on tombstones to prevent resurrection. Then target Bloody Orb and Plague.",
        ],
        rewards: {
            gil: 5250,
            cp: 66,
            loot: "Darklord Crystal ×5, Demon Feather ×3"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "E2-07",
        arc: "E2",
        name: "Survey No. 260",
        description: "Wanted: Researchers to assist with geological survey of the Neslowe Passage. Please survey the area assigned and report your findings. Transportation fees and hazard pay (x2) will be provided. Jylland Geological Survey Committee",
        rank: 42,
        region: "The Neslowe Passage",
        fee: 500,
        days: 20,
        questType: "Satisfy Petitioner",
        canDispatch: true,
        canCancel: true,
        members: 6,
        prerequisite: "Survey No. 259",
        requiredTalents: {
            negotiation: 44,
            aptitude: 0,
            teamwork: 0,
            adaptability: 44,
        },
        objective: "Survey Points of Geological Interest!",
        law: "Forbidden: Opportunity Commands – Opportunity Commands are forbidden.",
    enemies: [
        { name: "Randomized Name", job: "Cannoneer", quantity: 1, notes: "PRIORITY: Extremely long range cannon attacks — kill first." },
        { name: "Randomized Name", job: "Trickster", quantity: 1, notes: "PRIORITY: Long-range card attacks — kill second." },
        { name: "Randomized Name", job: "Ninja", quantity: 1, notes: "High speed melee." },
        { name: "Randomized Name", job: "Parivir", quantity: 1, notes: "Strong melee attacker." },
        { name: "Randomized Name", job: "Seer", quantity: 1, notes: "Support unit." },
        { name: "Randomized Name", job: "Master Monk", quantity: 1, notes: "Strong melee." },
    ],
        strategy: [
            "Must investigate all 6 sparkle points. Killing enemies makes this much easier.",
            "Send fastest units to eliminate Cannoneer and Trickster first — their range is the biggest threat.",
        ],
        rewards: {
            gil: 10250,
            cp: 84,
            loot: "Firebird Crystal ×1"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "E2-08",
        arc: "E2",
        name: "Survey No. 261",
        description: "Wanted: Researchers to assist with geological survey of Zellea, the Forbidden Land. Please survey the area assigned and report your findings. Transportation fees and hazard pay (x3) will be provided. Jylland Geological Survey Committee",
        rank: 56,
        region: "Zellea, Forbidden Land",
        fee: 500,
        days: 20,
        questType: "Satisfy Petitioner",
        canDispatch: true,
        canCancel: true,
        members: 6,
        prerequisite: "Survey No. 260",
        requiredTalents: {
            negotiation: 54,
            aptitude: 54,
            teamwork: 0,
            adaptability: 0,
        },
        objective: "Survey Points of Geological Interest!",
        law: "Forbidden: Targeting Distant Units – Actions targeting units two or more tiles away are forbidden.",
    enemies: [
        { name: "Randomized Name", job: "Behemoth", quantity: 2, notes: "Endless respawns as killed. Survey all sparkle points — killing is for loot only." },
        { name: "Randomized Name", job: "Reaver", quantity: 2, notes: "Endless respawns." },
        { name: "Randomized Name", job: "Tonberry King", quantity: 1, notes: "Karma attack — 999 damage to anyone who has killed many enemies. High priority." },
        { name: "Randomized Name", job: "Plague", quantity: 1, notes: "Has Roulette and Binding Circle." },
        { name: "Randomized Name", job: "Malboro King", quantity: 1, notes: "Heavy debuffer." },
    ],
        strategy: [
            "Close-range only (law). Rush sparkle points with fastest units. Enemies respawn infinitely — only kill to clear a path.",
            "Tonberry King must be eliminated first — Karma deals 999 damage. Use Hunters with Sidewinder.",
            "Bring multiple healers. Malboro King's debuffs are severe.",
        ],
        rewards: {
            gil: 15250,
            cp: 99,
            loot: "Scarletite ×1"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "E2-09",
        arc: "E2",
        name: "The Finest Blade",
        description: "You know the shelled beasts that walk this land with their long-forgotten foes' swords lodged in their backs? One such beast is the toughskin, and it is rare, for few blades can so much as scratch its reddish hide, said to be the hardest of all its ilk. And yet there are rumours that one has been spotted, and with sword! I would very much like to see such a sword. Bring it to me! Metallurgist Steeling",
        rank: 42,
        region: "The Neslowe Passage",
        fee: 500,
        days: 20,
        questType: "Defeat Mark",
        canDispatch: true,
        canCancel: true,
        members: 6,
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 44,
            adaptability: 44,
        },
        objective: "Defeat the Blade Biter!",
        law: "Forbidden: Bludgeoning Weapons – Attacks with rods, staves, poles, knuckles, hammers, and maces are forbidden.",
    enemies: [
        { name: "Blade Biter", job: "Toughskin", quantity: 1, notes: "Mark — only required target. Very high defense." },
        { name: "Randomized Name", job: "Dreamhare", quantity: 1, notes: "PRIORITY: Has Go-Go Dance (Haste). Eliminate immediately." },
        { name: "Randomized Name", job: "Rocktitan", quantity: 2, notes: "Tough melee. Not required — only kill if they interfere." },
        { name: "Randomized Name", job: "Pit Beast", quantity: 2, notes: "Guard the mark. Not required." },
    ],
        strategy: [
            "Only need to defeat the Blade Biter (Toughskin). Eliminate the Dreamhare first — its Go-Go Dance is Haste for enemies.",
            "Rocktitans and Pit Beasts don't need to be killed unless they block you.",
        ],
        rewards: {
            gil: 7740,
            cp: 84,
            loot: "Prime Tanned Hide ×1"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "E2-10",
        arc: "E2",
        name: "A Charm for Luck",
        description: "Lyze, my beloved, has left to travel the world seeking riches. He says he'll return when he's wealthy enough for us to be married. But it's not wealth I want, it's him. My only wish is that he returns safely. I seek someone to bring him a charm to keep him safe. Remie, Waiting Anxiously",
        rank: 15,
        region: "Tramdine Fens, Nazan M",
        fee: 300,
        days: 20,
        questType: "Delivery",
        canDispatch: true,
        canCancel: true,
        members: 1,
        requiredTalents: {
            negotiation: 18,
            aptitude: 0,
            teamwork: 0,
            adaptability: 0,
        },
    enemies: [],
        strategy: [
            "Delivery mission — find Lyze at Tramdine Fens or Nazan Mines and deliver the charm. No combat.",
        ],
        rewards: {
            gil: 1470,
            cp: 30,
            loot: "Magick Fruit ×5"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "E2-12",
        arc: "E2",
        name: "Vim, Vigor, and Go",
        description: "I'm exhausted. Work keeps me so busy I can scarecely find time to eat, let alone rest. But nhow's no time to pack it in. If someone could bring me a pick-me-up, something to put the spring back in my step, I'd be very grateful. Bease, Overworked and underappreciated",
        rank: 25,
        region: "The Neslowe Passage",
        fee: 400,
        days: 20,
        questType: "Delivery",
        canDispatch: true,
        canCancel: true,
        members: 1,
        requiredItems: ["Crusader Tonic ×1"],
        requiredTalents: {
            negotiation: 44,
            aptitude: 0,
            teamwork: 0,
            adaptability: 0,
        },
    enemies: [],
        strategy: [
            "Delivery mission — bring Crusader Tonic ×1 to The Neslowe Passage.",
        ],
        rewards: {
            gil: 4260,
            cp: 50,
            loot: "Platinum ×1"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "E2-14",
        arc: "E2",
        name: "A Treasured Heirloom",
        description: "My most treasured family heirloom - a gill snapper shell - has broken clean in two! That shell has been handed down for generations as a charm to bring good fourtune to our family business. That it's broken is an affront to my ancestors, and I fear it may bring ill luck on my trade. I seek someone to catch a gil snapper and replace the broken shell! Money's no object - I don't need gil, I need a gil snapper! Maat, Dealer of Antiquities",
        rank: 28,
        region: "Sant D'alsa Bluff",
        fee: 400,
        days: 20,
        questType: "Defeat Mark",
        canDispatch: true,
        canCancel: true,
        members: 6,
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 20,
            adaptability: 20,
        },
        objective: "Defeat the Gil Snapper!",
        law: "Forbidden: Fire, Ice, Lightning – Weapons and abilities that use fire, ice, and lightning are forbidden.",
    enemies: [
        { name: "Gil Snapper", job: "Adamantitan", quantity: 1, notes: "Mark — must defeat. Very high Defense." },
        { name: "Randomized Name", job: "Banshee", quantity: 2, notes: "PRIORITY: Nasty abilities — eliminate first." },
        { name: "Randomized Name", job: "Great Tortoise", quantity: 2, notes: "Tank — high defense. Lower priority." },
    ],
        strategy: [
            "Eliminate Banshees first, then focus the Gil Snapper. Great Tortoises can be left for last.",
            "No Fire/Ice/Lightning — use Wind, Holy, and physical attacks.",
        ],
        battlefield: [
            "The battlefield contains trap tiles that pose hazards",
        ],
        rewards: {
            gil: 5170,
            cp: 56,
            loot: "Spiral Vine ×3"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "E2-15",
        arc: "E2",
        name: "Picnic Pleasure",
        description: "I'll be taking my children in my class on a picnic soon, but now I hear monsters have been sighted near our picnic spot, and frankly, I'm a little concerned. Could someone go ahead and make sure it's safe? Thil, Child Warder-in-Training",
        rank: 26,
        region: "Nazan Mines",
        fee: 400,
        days: 20,
        questType: "Battle",
        canDispatch: true,
        canCancel: true,
        members: 6,
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 18,
            adaptability: 18,
        },
        objective: "Defeat all Foes!",
        law: "Forbidden: Fire, Ice, Lightning – Weapons and abilities that use fire, ice, and lightning are forbidden.",
    enemies: [
        { name: "Randomized Name", job: "Headless", quantity: 2, notes: "Weak to Wind." },
        { name: "Randomized Name", job: "Grenade", quantity: 1, notes: "Fire/explosion attacks." },
        { name: "Randomized Name", job: "Ice Flan", quantity: 2, notes: "Can self-heal — use Hunters (Sidewinder) or Wind." },
        { name: "Randomized Name", job: "Yellow Jelly", quantity: 1, notes: "Has Geomancy and can self-heal." },
    ],
        strategy: [
            "No Fire/Ice/Lightning. Use Wind attacks (strong vs Headless) and Hunters with Sidewinder.",
            "Flans can self-heal — focus them down quickly with physical attacks.",
        ],
        rewards: {
            gil: 4800,
            cp: 52,
            loot: "Storm Sigil ×3"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "E2-16",
        arc: "E2",
        name: "Escort Wanted",
        description: "I'm designing the fastest airship ever built, and I need to find a light, but strong metal to use for the gears, kupo. I believe the Goug Mines might hold the object of my search, but they also hold horde of monsters! I seek an armed escort to accompany and protect me, kupo. Thamas, Airship Architect",
        rank: 41,
        region: "Goug",
        fee: 500,
        days: 20,
        questType: "Escort",
        canDispatch: true,
        canCancel: true,
        members: 5,
        requiredTalents: {
            negotiation: 44,
            aptitude: 0,
            teamwork: 44,
            adaptability: 0,
        },
        objective: "Protect Thamas and Defeat all Foes!",
        law: "Forbidden: Knockback – Actions that knock the target back are forbidden.",
        enemies: [],
        rewards: {
            gil: 7180,
            cp: 32,
            loot: "Putrid Liquid ×2"
        },
        notes: "",
        tags: ["optional"]
    }
];
