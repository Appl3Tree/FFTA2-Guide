// src/data/missions/storyOptional.D4.ts
// Arc D4 optional missions, accurately transcribed from Side_Quests.txt

import type { Mission } from "../../types/ffta2";

export const OPTIONAL_MISSIONS_D4: Mission[] = [
    {
        id: "D4-04",
        arc: "D4",
        name: "Hors D'oeuvre of the Hour",
        description: "Haven't tried Culinary Crusade's latest gastronomical triumph, Amarette Malbonara yet? Now's your chance! Just be careful not to burn the ingredients when you harvest them. Heat muddles the flavor. Grosso, Culinary Crusade",
        rank: 41,
        region: "The Bisga Greenland",
        fee: 500,
        days: 20,
        questType: "Satisfy Petitioner",
        canDispatch: true,
        canCancel: true,
        members: 6,
        requiredTalents: {
            negotiation: 39,
            aptitude: 0,
            teamwork: 0,
            adaptability: 39,
        },
        objective: "Uphold the Law and Defeat all Foes!",
        law: "Forbidden: Fire – Weapons and abilities that use fire are forbidden.",
        enemies: [
            { name: "Randomized Name", job: "Malboro", quantity: 3, notes: "Have Bad Breath, Goo, Purify. Two have Counter, one has Evade Magick. Heavy debuffers." },
            { name: "Randomized Name", job: "Malboro King", quantity: 1, notes: "Boss Malboro. Same skills plus stronger attacks. Highest priority." },
        ],
        strategy: [
            "Bring White Mage with Esuna — Bad Breath inflicts mass debuffs. Use Wind Magick and Hunters (Sidewinder) only.",
            "No Fire at all (law). Prioritize the Malboro King, then the Malboros with Counter.",
        ],
        rewards: {
            gil: 3980,
            cp: 82,
            loot: "Ancient Turtle Shell ×2"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "D4-07",
        arc: "D4",
        name: "I've Been Had, Kupo!",
        description: "Kupo!!! I've been had, kupo, had!!!",
        rank: 32,
        region: "The Bisga Greenlands",
        fee: 500,
        days: 20,
        questType: "Defeat Mark",
        canDispatch: false,
        canCancel: true,
        members: 6,
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 28,
            adaptability: 28,
        },
        objective: "Defeat Nezzel the Alchemist!",
        law: "Forbidden: Height > or = 10 – Moving to a tile with height of 10 of more is forbidden.",
        enemies: [
            { name: "Nezzel the Alchemist", job: "Alchemist", quantity: 1, notes: "Mark. Has Flare, Poison, Toad, and Items. Luso is required; Cid is not." },
            { name: "Randomized Name", job: "Black Mage", quantity: 1, notes: "Has Fira, Thundara, Blizzara, Blizzaga." },
            { name: "Randomized Name", job: "Time Mage", quantity: 1, notes: "Has Slow and Stop — dangerous support. Priority." },
            { name: "Randomized Name", job: "Green Mage", quantity: 1, notes: "Has Blind, Sleep, and Silence — priority debuffer." },
            { name: "Randomized Name", job: "White Monk", quantity: 1, notes: "Has Roundhouse and Air Render." },
        ],
        strategy: [
            "Luso is required. Check tile height on the bottom screen — cannot move to h10+ tiles.",
            "Eliminate Time Mage and Green Mage first to prevent Slow/Stop/Silence debuffs. Then focus on Nezzel.",
        ],
        rewards: {
            gil: 1960,
            cp: 64,
            loot: "Kalos ×3"
        },
        notes: "Required for some postgame unlock chains alongside The Ritual.",
        tags: ["optional"]
    },
    {
        id: "D4-08",
        arc: "D4",
        name: "Beneath the Sands",
        description: "Need someone to head over to Kthili Sands and look for my treasure. Buried it out there a chocobo's age ago, and now I can't remember where it's at. Went looking for it myself, but didn't have any luck. Maybe you'll do better. Ricard, Former treasure hunter",
        rank: 40,
        region: "Kthili Sands",
        fee: 500,
        days: 20,
        questType: "Item Recovery",
        canDispatch: true,
        canCancel: true,
        members: 6,
        requiredTalents: {
            negotiation: 39,
            aptitude: 0,
            teamwork: 0,
            adaptability: 0,
        },
        objective: "Find the Buried Treasure!",
        law: "Forbidden: Summoning Scions – Summoning Scions is forbidden.",
        enemies: [
            { name: "Randomized Name", job: "Antlion", quantity: 2, notes: "Have Sandstorm, Saliva, Subsidence, and Bonecrusher." },
            { name: "Randomized Name", job: "Brown Chocobo", quantity: 1, notes: "Has Choco Cure, Choco Beak, Choco Guard." },
            { name: "Randomized Name", job: "Yellow Jelly", quantity: 1, notes: "Has Merge, Acid, Thundara, and Geomancy — Geomancy is the most dangerous ability." },
            { name: "Randomized Name", job: "Drake", quantity: 1, notes: "Has Lightning, Thunder Breath, Shockbolt." },
        ],
        strategy: [
            "Treasure is hidden in one of 6 sparkles on the battlefield. Examine all of them — first sparkle you find may be the treasure.",
            "Watch for hidden charm traps while checking sparkles. A Ranger with Awareness can help if you are clearing the map thoroughly.",
            "Clear enemies quickly to focus on searching sparkles. Yellow Jelly's Geomancy is the biggest threat.",
        ],
        rewards: {
            gil: 6270,
            cp: 80,
            loot: "Wyvern Wing ×1"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "D4-09",
        arc: "D4",
        name: "Airship S.O.S.!",
        description: "No one's noticed yet, but an airship sitting in the dock has been hijacked. O don't want to contact the watch and cause a commotion, so I'm posting for help here. Neah, Accidental Witness",
        rank: 19,
        region: "Moorabella",
        fee: 300,
        days: 20,
        questType: "Battle",
        canDispatch: true,
        canCancel: true,
        members: 6,
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 15,
            adaptability: 15,
        },
        objective: "Defeat all Foes!",
        law: "Forbidden: Being Robbed – Having gil or items stolen is forbidden.",
        enemies: [
            { name: "Randomized Name", job: "Thief", quantity: 3, notes: "Has Steal Gil — being stolen from violates the law. Kill from range or use Safeguard to prevent theft." },
            { name: "Randomized Name", job: "Soldier", quantity: 2, notes: "Has Provoke (inflicts Berserk). Manageable threat." },
        ],
        strategy: [
            "Use ranged attacks to kill Thieves before they can steal from you. Safeguard clan privilege also prevents theft.",
            "Enemies are low level — unlocked after getting Hurdy. Should be well under your level.",
        ],
        rewards: {
            gil: 2960,
            cp: 38,
            loot: "Gurnat ×2, Strange Liquid ×4"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "D4-12",
        arc: "D4",
        name: "A Small Favor",
        description: "I require an ether. Bring me one, won't you? Master Metallurgist",
        rank: 30,
        region: "Tramdine Fens",
        fee: 400,
        days: 20,
        questType: "Delivery",
        canDispatch: false,
        canCancel: true,
        members: 1,
        prerequisite: "The Ritual; I Want to Forget; Gifted",
        requiredItems: ["Ether ×1"],
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 0,
            adaptability: 0,
        },
        enemies: [],
        strategy: [
            "Bring an Ether to Tramdine Fens. The petitioner leaves a note pointing to the true delivery location, which changes between repeats.",
            "Possible note destinations: Goug, Nazan Mines, The Ruins of Delgantua, Zedlei Forest, and Zellea, the Forbidden Land.",
            "This quest can be completed five times; after the fifth delivery, it stops appearing.",
        ],
        rewards: {
            gil: 7880,
            cp: 60,
            loot: "Wyvern Wing ×1"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "D4-14",
        arc: "D4",
        name: "Ordalia Airships Grounded",
        description: "A pack of bombs from Sant D'alsa Bluff is posing a threat to the aerodrome. If they detonate near even one of the airships moored there, the entire fleet could go up in flames. Destroy them all before it's too late! Ash, Airship Pilot",
        rank: 25,
        region: "Fluorgis",
        fee: 400,
        days: 20,
        questType: "Battle",
        canDispatch: true,
        canCancel: true,
        members: 6,
        prerequisite: "Seeking the Stone; Odd Places; must be in Fluorgis",
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 15,
            adaptability: 15,
        },
        objective: "Defeat all Foes!",
        law: "Forbidden: Targeting Distant Units – Actions targeting units two or more tiles away are forbidden.",
        enemies: [
            { name: "Randomized Name", job: "Bomb", quantity: 3, notes: "Fire-type monster. Can punish nearby units with fire attacks or self-destruct behavior at low HP." },
            { name: "Randomized Name", job: "Red Marshmallow", quantity: 2, notes: "Flan-type support that resists physical damage better than Bombs." },
            { name: "Randomized Name", job: "Grenade", quantity: 1, notes: "Stronger bomb-type enemy. Watch for Oil plus fire damage." },
        ],
        strategy: [
            "The law blocks actions targeting units two or more tiles away, so plan for melee-range attacks and short-range support.",
            "Bring water or ice damage if available, but avoid leaving bomb-family enemies at critical HP next to clustered allies.",
            "Spread out before finishing weakened Bombs or the Grenade to reduce self-destruct/fire burst risk.",
        ],
        rewards: {
            gil: 4610,
            cp: 50,
            loot: "Strange Liquid ×2"
        },
        notes: "",
        tags: ["optional", "chain", "timed"]
    }
];
