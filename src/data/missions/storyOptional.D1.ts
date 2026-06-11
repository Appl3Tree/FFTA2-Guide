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
        region: "Goug, Tramdine Fens, Zedlei Forest, The Bisga Greenlands",
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
        objective: "Impersonate Marnot!",
        law: "Forbidden: Harming Seeq – Actions that harm seeq are forbidden.",
    enemies: [
        { name: "Randomized Name", job: "Viking", quantity: 1, notes: "Only encountered if handling the Goug leg manually instead of dispatching." },
        { name: "Randomized Name", job: "Ranger", quantity: 1, notes: "Only encountered if handling the Goug leg manually instead of dispatching." },
    ],
        strategy: [
            "MUST be dispatched — the 6-day time limit makes it physically impossible to visit all four locations manually. Dispatch any unit.",
            "If attempted manually, the Goug stop begins with a small battle before the remaining three stops; the time limit still makes dispatch the practical route.",
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
        id: "D1-02",
        arc: "D1",
        name: "Oh No, Kupo!",
        description: "I don't know when or how these bombs got in here, but they made a real mess of the town, kupo! Our machines got blown to smithereens! Kupo-po! I'd pick up the pieces, but I can't see for the tears! Could someone collect what's left? Sheni, Machinist",
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
    enemies: [
        { name: "Randomized Name", job: "Bomb", quantity: 3, notes: "Can use fire attacks and Self-Destruct; collect machinery parts while avoiding law breaks." },
        { name: "Randomized Name", job: "Grenade", quantity: 1, notes: "Stronger bomb-type support with fire magick." },
        { name: "Randomized Name", job: "Headless", quantity: 1, notes: "Powerful physical monster that can get in the way of machinery-part collection." },
        { name: "Randomized Name", job: "Worgen", quantity: 1, notes: "Can become dangerous at critical HP and may call support." },
    ],
        strategy: [
            "Collect all six machinery parts from the sparkling points around Goug.",
            "The law punishes hitting lower-level units, so either route around enemies or rely on reactions/status until you know targets are safe.",
            "Bombs and Grenade are the largest area-damage risk; avoid leaving them at critical HP where Self-Destruct can punish clumped units.",
        ],
        rewards: {
            gil: 7210,
            cp: 78,
            loot: "Tanned Beast Hide ×2"
        },
        notes: "",
        tags: ["optional", "chain"]
    },
    {
        id: "D1-05",
        arc: "D1",
        name: "The Bangaa of the Rupies",
        description: "This rivalry has gone on for many long years... high time we finished it once and for all! Those cowards in the Nu Mou Nobles have had it coming, and with a little extra muscle from you, we'll see they get it! The battlefield will be the Rupie Mountains. Come prepared! Mocedad, Bangaa Brotherhood",
        rank: 50,
        region: "The Rupie Mountains",
        fee: 500,
        days: 20,
        questType: "Battle",
        canDispatch: false,
        canCancel: true,
        members: 4,
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 20,
            adaptability: 20,
        },
        objective: "Defeat all Foes!",
        law: "Forbidden: Fire – Weapons and abilities that use fire are forbidden.",
    enemies: [
        { name: "Nu Mou Nobles: Time Mage", job: "Time Mage", quantity: 1, notes: "Can Haste allies and Slow your units." },
        { name: "Nu Mou Nobles: Illusionist", job: "Illusionist", quantity: 1, notes: "Uses broad illusion magick; pressure it before it can swing the fight." },
        { name: "Nu Mou Nobles: Arcanist", job: "Arcanist", quantity: 1, notes: "Dangerous gravity/dark caster. High priority." },
        { name: "Nu Mou Nobles: White Mage", job: "White Mage", quantity: 1, notes: "Healer. Primary priority target." },
        { name: "Nu Mou Nobles: Black Mage", job: "Black Mage", quantity: 1, notes: "Offensive caster. Silence or defeat early." },
    ],
        strategy: [
            "You fight alongside the Bangaa Brotherhood: Gladiator, Bishop, and Cannoneer allies.",
            "White Mage is the cleanest first target to stop healing, then pressure the Black Mage and Arcanist before the casters overwhelm the field.",
            "Fire is banned, so rely on physical pressure, non-fire magick, and the allied Cannoneer once it begins attacking.",
        ],
        rewards: {
            gil: 4970,
            cp: 99,
            loot: "Earth Sigil ×2"
        },
        notes: "",
        tags: ["optional", "chain"]
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
        { name: "House Bowen: Ravager", job: "Ravager", quantity: 1, notes: "Heavy physical attacker from House Bowen. Keep it tied up after the Assassin and Illusionist are controlled." },
        { name: "House Bowen: Fighter", job: "Fighter", quantity: 1, notes: "Melee bruiser from House Bowen. Lower priority than the status and all-field threats." },
        { name: "House Bowen: Assassin", job: "Assassin", quantity: 1, notes: "PRIORITY: Death attacks threaten Mocedad. Eliminate first." },
        { name: "House Bowen: Illusionist", job: "Illusionist", quantity: 1, notes: "PRIORITY: AoE illusion magick hits all units. Eliminate quickly." },
    ],
        strategy: [
            "3-unit party. Mocedad (Cannoneer) and Madreth (Arcanist) join as protected allies, with a Nu Mou Time Mage also aiding the fight.",
            "Eliminate the Assassin and Illusionist first. Heal Mocedad and Madreth whenever needed.",
            "Buffs are forbidden, so use positioning, disabling statuses, and direct recovery instead of Haste/Protect/Shell-style setup.",
        ],
        rewards: {
            gil: 10030,
            cp: 99,
            loot: "Moon Ring ×2",
            other: "Shining Lute"
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
        name: "The Nu Mou of the Rupies",
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
        objective: "Defeat all Foes!",
        law: "Forbidden: Items – Items are forbidden.",
    enemies: [
        { name: "Bangaa Brotherhood: Cannoneer", job: "Cannoneer", quantity: 1, notes: "Long-range pressure and item-shot support. Close distance once the Gladiator is contained." },
        { name: "Bangaa Brotherhood: White Monk", job: "White Monk", quantity: 1, notes: "Air Render and monk utility can pressure your casters from range." },
        { name: "Bangaa Brotherhood: Master Monk", job: "Master Monk", quantity: 1, notes: "High HP melee attacker with monk techniques. Disable or kite after the Gladiator falls." },
        { name: "Bangaa Brotherhood: Bishop", job: "Bishop", quantity: 1, notes: "Holy/support caster. Interrupt healing or holy damage when possible." },
        { name: "Bangaa Brotherhood: Gladiator", job: "Gladiator", quantity: 1, notes: "PRIORITY: Very high offensive power. Eliminate first." },
    ],
        strategy: [
            "Your allies: Arcanist (leader — must not die), Illusionist, and White Mage.",
            "Items are banned, so bring reliable magick or ability-based healing and status removal.",
            "Focus on the Gladiator first, then shut down the Bishop and Cannoneer before cleaning up the monk units.",
            "Keep the allied Arcanist alive; losing the allied leader fails the fight even if your own party is healthy.",
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
    },
    {
        id: "D1-14",
        arc: "D1",
        name: "'Tis the Season",
        description: "Tis the season again, the season for those horrid mimics to start spawning. We need someone to hold them back long enough for our researchers to finish their work.",
        rank: 29,
        region: "The Neslowe Passage",
        fee: 500,
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
        law: "Forbidden: HP <= 20 – Having less than or equal to 20 HP is forbidden.",
    enemies: [
        { name: "Randomized Name", job: "Mimic", quantity: 5, notes: "Mimics keep respawning during the four-round survival objective. They use Rock and Scissors-style attacks." },
    ],
        strategy: [
            "Survive through four rounds while fighting off endlessly respawning Mimics.",
            "Keep every unit above 20 HP to preserve the law bonus; healing and positioning matter more than chasing every kill.",
            "The Mimics can drop useful loot, but do not let farming distract from surviving the round timer.",
        ],
        rewards: {
            gil: 6220,
            cp: 58,
            loot: "Magick Fruit ×1"
        },
        notes: "",
        tags: ["optional", "chain"]
    }
];
