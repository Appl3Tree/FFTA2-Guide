// src/data/missions/storyOptional.D5.ts
// Arc D5 optional missions, accurately transcribed from Side_Quests.txt

import type { Mission } from "../../types/ffta2";

export const OPTIONAL_MISSIONS_D5: Mission[] = [
    {
        id: "D5-01",
        arc: "D5",
        name: "Graszton Nightwatch",
        description: "A plague of robberies has fallen upon the land! All occur at night and follow a similar pattern, indicating that a single group may be responsible. For the swift resolution of this case, and the safety of our citizens, we are currently accepting applications to join the Graszton Nightwatch. Jylland Sovereignty Society",
        rank: 43,
        region: "Graszton",
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
        objective: "Defeat all foes within four rounds!",
        law: "Forbidden: Targeting Distant Units – Actions targeting units two or more tiles away are forbidden.",
        enemies: [
            { name: "Randomized Name", job: "Baknamy", quantity: 3, notes: "Have Magick Hammer and Goblin Attack. Must defeat all within 4 rounds." },
            { name: "Randomized Name", job: "Luchorpan", quantity: 1, notes: "Has Magick Hammer and Mutilate." },
        ],
        strategy: [
            "Close-range only due to Targeting Distant law. Chita's Weaponers join as allies: Gladiator + 2 Warriors.",
            "Must defeat all 4 enemies within 4 rounds. Break the law if necessary to win in time.",
        ],
        battlefield: [
            "The battlefield contains trap tiles that pose hazards",
        ],
        rewards: {
            gil: 6620,
            cp: 86,
            loot: "Stormsoul Crystal ×1"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "D5-02",
        arc: "D5",
        name: "The Camoa Nightwatch",
        description: "A plague of robberies has fallen upon the land! All occur at night and follow a similar pattern, indicating that a single group may be responsible. For the swift resolution of this case, and the safety of our citizens, we are currently accepting applications to join the Camoa Nightwatch. Jylland Sovereignty Society",
        rank: 38,
        region: "Camoa",
        fee: 500,
        days: 20,
        questType: "Satisfy Petitioner",
        canDispatch: true,
        canCancel: true,
        members: 4,
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 0,
            adaptability: 0,
        },
        objective: "Defeat all Foes within Four Rounds!",
        law: "Forbidden: Targeting Self – Actions targeting the user are forbidden.",
        enemies: [
            { name: "Randomized Name", job: "Baknamy", quantity: 3, notes: "Have Magick Hammer and Goblin Attack. Must defeat all within 4 rounds." },
            { name: "Randomized Name", job: "Luchorpan", quantity: 1, notes: "Has Magick Hammer and Mutilate." },
        ],
        strategy: [
            "Camoa Braves join as allies: Warrior (leader) + 2 White Monks. Targeting Self forbidden — no self-buffs or self-healing items.",
            "Must defeat all 4 enemies within 4 rounds.",
        ],
        battlefield: [
            "The battlefield contains trap tiles that pose hazards",
        ],
        rewards: {
            gil: 6620,
            cp: 76,
            loot: "Stradivari ×1"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "D5-03",
        arc: "D5",
        name: "Stowaways",
        description: "There are murmurings among our passengers that there are ghosts aboard the airships. Though understandably concerned, we are yet mindful that rumour is not fact. We need someone trustworthy to investigate, and, in the event that there is a ghostly infestation, remedy the problem with all haste. Jylland Airship Inspection Board",
        rank: 23,
        region: "Fluorgis",
        fee: 400,
        days: 20,
        questType: "Battle",
        canDispatch: true,
        canCancel: true,
        members: 6,
        dispatchRecommended: ["White Monk"],
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 15,
            adaptability: 15,
        },
        objective: "Defeat all Foes!",
        law: "Forbidden: Solitude – Ending the turn without a unit in an adjacent tile is forbidden.",
        enemies: [
            { name: "Randomized Name", job: "Deathscythe", quantity: 1, notes: "Has Doom, Deep Sleep, Shackle. Priority target — stop Doom." },
            { name: "Randomized Name", job: "Ghost", quantity: 2, notes: "One has Flash+Dark, one has Sleep+Silence Touch. Use Exorcise." },
            { name: "Randomized Name", job: "Ahriman", quantity: 2, notes: "Has Demonic Gaze and Bewitching Glance — avoid facing them. Priority." },
            { name: "Randomized Name", job: "Bloody Orb", quantity: 1, notes: "Has Parasite and Counter." },
        ],
        strategy: [
            "Keep units adjacent to allies to avoid Solitude law violations. Fight in tight formation.",
            "Bring Exorcise for Ghosts. Prioritize Ahrimans (face away) and Deathscythe (stops Doom).",
        ],
        rewards: {
            gil: 2610,
            cp: 46,
            loot: "Wyrm Carapace ×4"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "D5-05",
        arc: "D5",
        name: "Wanted: Devotees!",
        description: "Wanted: The criminals known as the Devotees! - Duo responsible for several acts of theft. - Though to be involved in arms deals. - Thought to be followers of a certain band of musicians. Jylland Sovereignty Society",
        rank: 25,
        region: "The Ruins of Delgantua",
        fee: 400,
        days: 20,
        questType: "Battle",
        canDispatch: true,
        canCancel: true,
        members: 6,
        prerequisite: "The Stone With No Name; Moorabella Nightwatch; Goug Nightwatch; Graszton Nightwatch; The Camoa Nightwatch; Fluorgis Nightwatch",
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 0,
            adaptability: 0,
        },
        objective: "Defeat the Devotees",
        law: "Forbidden: Ranged Weapons – Attacks with bows, greatbows, guns, hand-cannons, and cards are forbidden.",
        enemies: [
            { name: "Devotee", job: "Lanista", quantity: 1, notes: "Target. Very low level and not aggressive." },
            { name: "Devotee Jr.", job: "Time Mage", quantity: 1, notes: "Target. Very low level and not aggressive." },
            { name: "Randomized Name", job: "Baknamy", quantity: 2, notes: "Bodyguard monster. Stronger than the Devotees; defeat or bypass to reach the targets." },
            { name: "Randomized Name", job: "Luchorpan", quantity: 1, notes: "Bodyguard monster. Stronger than the Devotees." },
        ],
        strategy: [
            "Prerequisite: must complete all 5 Nightwatch missions AND Stone with No Name.",
            "Answer 5 Prima Donna trivia questions before battle. All answers are Prima Donna merchandise (order varies by Nightwatch completion sequence): Prima Donna Armband, Prima Donna Photograph, Prima Donna Towel, Prima Donna Necklace, Prima Donna Hairpin.",
            "Melee only (Ranged Weapons forbidden). Devotees are trivial (level 1–2) but their monster bodyguards are much stronger. Focus bodyguards first if they block your path.",
        ],
        rewards: {
            gil: 5130,
            cp: 50,
            loot: "Aurea Pollen ×1"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "D5-06",
        arc: "D5",
        name: "Fluorgis Nightwatch",
        description: "A plague of robberies has fallen upon the land! All occur at night and follow a similar pattern, indicating that a single group may be responsible. For the swift resolution of this case, and the safety of our citizens, we are currently accepting applications to join the Fluorgis Nightwatch. Jylland Sovereignty Society",
        rank: 43,
        region: "Fluorgis",
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
        law: "Forbidden: Swimming – Entering a water tile is forbidden.",
        enemies: [
            { name: "Randomized Name", job: "Baknamy", quantity: 3, notes: "Have Magick Hammer and Goblin Attack. Must defeat all within 4 rounds." },
            { name: "Randomized Name", job: "Luchorpan", quantity: 1, notes: "Has Magick Hammer and Mutilate." },
        ],
        strategy: [
            "House Bowen joins as allies (Bowen, Loa, Veis, Tweigel) — very easy with their firepower.",
            "Stay off water tiles. Must defeat all 4 enemies within 4 rounds.",
        ],
        rewards: {
            gil: 6620,
            cp: 86,
            loot: "High Arcana ×1"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "D5-08",
        arc: "D5",
        name: "A Lost Companion",
        description: "Got a strange letter today at the pub from someone named Gade. Whoever Gade is, it sounds like a friend of his named Shoofa is lost on a \"snowy plain.\" I'm pretty sure the letter came to us by accident, but now it's got me curious.",
        rank: 25,
        region: "The Rupie Mountains",
        questType: "Defeat Mark",
        canDispatch: false,
        canCancel: false,
        members: 6,
        prerequisite: "Gifted",
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 0,
            adaptability: 0,
        },
        objective: "Defeat Gade!",
        law: "Forbidden: Debuffs – Debuffs are forbidden.",
        enemies: [
            { name: "Gade", job: "Wraith", quantity: 1, notes: "Mark. Has Flash, Wake the Dead, and dark magicks. Adelle is required." },
            { name: "Randomized Name", job: "Ghost", quantity: 2, notes: "Touch abilities — use Exorcise." },
            { name: "Randomized Name", job: "Zombie", quantity: 2, notes: "Have Drain Touch and Miasma." },
        ],
        strategy: [
            "Adelle is required. Available very late in the game — enemies should be far under your level.",
            "All undead — bring Holy attacks and Exorcise. Focus Gade last; clear Ghosts and Zombies first.",
        ],
        rewards: {
            gil: 3940,
            cp: 50,
            loot: "Tiptaptwo ×1"
        },
        notes: "Requires reading the A Lost Friend notice. Rewards Tiptaptwo, which teaches Adelle Viola.",
        tags: ["optional"]
    },
    {
        id: "D5-12",
        arc: "D5",
        name: "Help!",
        description: "We got a letter today from a man named Wermut, some old guy who hurt himself out in the swamp. He wants us to bring him a potion, so let's make sure we've got at least one to spare before heading out there.",
        rank: 42,
        region: "Zedlei Forest",
        questType: "Delivery",
        canDispatch: false,
        canCancel: false,
        members: 1,
        prerequisite: "A Lost Companion; Adelle mastered Viola; read Send Help! at the pub",
        requiredItems: ["Potion ×1"],
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 0,
            adaptability: 0,
        },
        enemies: [],
        strategy: [
            "Delivery mission — bring a Potion to Wermut in Zedlei Forest.",
            "This rewards Whale Whisker, which teaches Adelle Wermut.",
        ],
        rewards: {
            gil: 160,
            cp: 84,
            loot: "Whale Whisker ×1"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "D5-13",
        arc: "D5",
        name: "Bringer of Doom",
        description: "Came across a worrying notice in the pub about a creature threatening the town of Goug. Hard to know whether this prophet Hilo can be trusted, but it may be a good idea to take a look, just to be on the safe side.",
        rank: 45,
        region: "Goug",
        questType: "Defeat Mark",
        canDispatch: false,
        canCancel: false,
        members: 6,
        prerequisite: "Shrine of the Paling Gods; Adelle mastered Elpe; read Calamity Cometh at the pub",
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 0,
            adaptability: 0,
        },
        objective: "Defeat the Smoldering Incubus!",
        law: "Forbidden: Reaction Abilities – Reaction Abilities are forbidden.",
        enemies: [
            { name: "Smoldering Incubus", job: "Incubus", quantity: 1, notes: "Mark. Cannot be approached directly; uses powerful ranged attacks and group Charm/Doom pressure." },
        ],
        strategy: [
            "Equip Adelle with Chirijiraden immediately and use Hilo for long-range damage.",
            "Bring long-range attackers such as Hunters with Sidewinder, Cannoneers, Flintlocks, or Fusiliers. This battle is mostly ranged artillery.",
            "Use Ribbons or Orbs of Minwu where possible to blunt Charm and Doom, and keep dedicated healing/revival ready.",
        ],
        rewards: {
            gil: 10240,
            cp: 90,
            loot: "Gold Chalice ×1, Chirijiraden ×1"
        },
        notes: "",
        tags: ["optional", "chain", "hunt", "boss", "elite", "law-sensitive"]
    },
    {
        id: "D5-14",
        arc: "D5",
        name: "Shrine of the Paling Gods",
        description: "Came across a worrying notice in the pub about something strange happenings at the shrines of the Paling Gods in Tramdine Fens. It sounds like there has been a growing number of monster sightings in the area. Might be worth looking into.",
        rank: 38,
        region: "Tramdine Fens",
        questType: "Satisfy Petitioner",
        canDispatch: false,
        canCancel: false,
        members: 6,
        prerequisite: "The Beast of Aisenfield; Adelle mastered Nesiaam; read Shrine of the Paling Gods at the pub",
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 0,
            adaptability: 0,
        },
        objective: "Rekindle the power of the Stones!",
        law: "Forbidden: Harming the Weak – Actions that harm a lower level unit are forbidden.",
        enemies: [
            { name: "Randomized Name", job: "Malboro", quantity: 1, notes: "Do not attack — likely lower level. Avoid entirely." },
            { name: "Randomized Name", job: "Great Malboro", quantity: 1, notes: "Do not attack — likely lower level. Avoid entirely." },
            { name: "Randomized Name", job: "Green Chocobo", quantity: 1, notes: "Do not attack if lower level." },
            { name: "Randomized Name", job: "Black Chocobo", quantity: 1, notes: "Do not attack if lower level." },
        ],
        strategy: [
            "Move to each of the 3 pillars and power them up — ignore enemies entirely to avoid breaking the law.",
            "Fast movement units are ideal. Do not attack anything.",
        ],
        rewards: {
            gil: 8650,
            cp: 76,
            loot: "Hyakushiki-Masamune ×1"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "D5-15",
        arc: "D5",
        name: "The Beast of Aisenfield",
        description: "Read a tale about a man who possessed a terrible power. Those he knew turned against him, and over time he became a beast. If the story's true, maybe he still stalks Aisenfield?",
        rank: 36,
        region: "Aisenfield",
        questType: "Defeat Mark",
        canDispatch: false,
        canCancel: false,
        members: 6,
        prerequisite: "Woman of the Wood; Adelle mastered Ljda; read The Beast of Aisenfield at the pub",
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 0,
            adaptability: 0,
        },
        objective: "Defeat Nesiaam!",
        law: "Forbidden: < 20 Damage – Dealing less than 20 damage is forbidden.",
        enemies: [
            { name: "Nesiaam", job: "Zahak", quantity: 1, notes: "Mark. Weak to Holy; only required target." },
            { name: "Randomized Name", job: "Fire Drake", quantity: 2, notes: "Can Charm with Mesmerize; use Ice attacks." },
            { name: "Randomized Name", job: "Headless", quantity: 1, notes: "Weak to Wind." },
            { name: "Randomized Name", job: "Axebeak", quantity: 1, notes: "Uses Wake-Up Call/Quicken-style support. Weak to Water." },
            { name: "Randomized Name", job: "Rocktitan", quantity: 1, notes: "Can Immobilize with Headbutt. Weak to Wind." },
        ],
        strategy: [
            "Only Nesiaam must fall. Use Holy damage if available and avoid chip attacks that could break the < 20 Damage law.",
            "If clearing support first, prioritize Fire Drakes for Charm pressure, then Axebeak, Headless, and Rocktitan.",
            "Hunters and Elementalists are strong here because several enemies have clear elemental weaknesses.",
        ],
        rewards: {
            gil: 6300,
            cp: 72,
            loot: "Nagrarok ×1"
        },
        notes: "",
        tags: ["optional", "chain", "hunt", "boss", "elite", "law-sensitive"]
    },
    {
        id: "D5-16",
        arc: "D5",
        name: "Woman of the Wood",
        description: "Came across a worrying notice in the pub about a woman surrounded by monsters in the woods. If she's still there, and still alive, she may well need help.",
        rank: 31,
        region: "Moorabella",
        questType: "Defeat Mark",
        canDispatch: false,
        canCancel: false,
        members: 6,
        prerequisite: "Help!; Adelle mastered Wermut; read Screaming Beauty at the pub",
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 0,
            adaptability: 0,
        },
        objective: "Defeat Ljda!",
        law: "Forbidden: Knockback – Actions that knock the target back are forbidden.",
        enemies: [
            { name: "Ljda", job: "Elementalist", quantity: 1, notes: "Mark. Gifted One. Level ~37. Only required target." },
            { name: "Randomized Name", job: "Banshee", quantity: 1, notes: "Priority if clearing all enemies — eliminate first." },
            { name: "Randomized Name", job: "Ice Drake", quantity: 1, notes: "Optional kill. Bring Fire damage if clearing the field." },
            { name: "Randomized Name", job: "Fire Drake", quantity: 1, notes: "Optional kill. Bring Ice or Water damage if clearing the field." },
            { name: "Randomized Name", job: "Thunder Drake", quantity: 1, notes: "Optional kill. Keep lightning resistance or spread out to reduce breath pressure." },
            { name: "Randomized Name", job: "White Chocobo", quantity: 1, notes: "Lowest threat — kill last if clearing board." },
        ],
        strategy: [
            "Only Ljda must be defeated. Available late game — your level should far exceed hers (~37).",
            "Avoid Knockback abilities entirely; even accidental knockback breaks the law.",
            "If clearing all enemies: Banshee first, then the Drakes by elemental weakness, and White Chocobo last.",
        ],
        rewards: {
            gil: 5430,
            cp: 62,
            loot: "Ayvuir Blue ×1"
        },
        notes: "",
        tags: ["optional"]
    }
];
