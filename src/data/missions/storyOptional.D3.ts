// src/data/missions/storyOptional.D3.ts
// Arc D3 optional missions, accurately transcribed from Side_Quests.txt

import type { Mission } from "../../types/ffta2";

export const OPTIONAL_MISSIONS_D3: Mission[] = [
    {
        id: "D3-01",
        arc: "D3",
        name: "Gripped by Fear",
        description: "You have flown abord an airship? Seen the world from above the clouds and felt the cool wind on your face? I too wish to know what it is to feel this, but heights terrify me. I seek a companion to accompany me aboard an airship and help keep my fears at bay. Arna the Superstitious",
        rank: 15,
        region: "Moorabella",
        fee: 300,
        days: 20,
        questType: "Satisfy Petitioner",
        canDispatch: true,
        canCancel: true,
        members: 1,
        requiredTalents: {
            negotiation: 13,
            aptitude: 13,
            teamwork: 0,
            adaptability: 0,
        },
        enemies: [],
        strategy: [
            "Dispatch mission — send a unit with both Negotiation and Aptitude talent to accompany Arna on the airship.",
        ],
        rewards: {
            gil: 1330,
            cp: 30,
            loot: "Spider Silk ×3"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "D3-04",
        arc: "D3",
        name: "I Must Have It!",
        description: "I've recently taken up crafting figurines in the likeness of monsters and fanatastic beasts. No easy getting them to look like the real thing. To finish the piece I'm working on, I require a faerie wing. Bring one to me, and you'll be well rewarded. Maddock, Perfectionist",
        rank: 25,
        region: "Goug",
        fee: 400,
        days: 20,
        questType: "Delivery",
        canDispatch: true,
        canCancel: true,
        members: 1,
        requiredItems: ["Faerie Wing ×1"],
        requiredTalents: {
            negotiation: 44,
            aptitude: 0,
            teamwork: 0,
            adaptability: 0,
        },
        enemies: [],
        strategy: [
            "Delivery mission — bring Faerie Wing ×1 to Goug.",
        ],
        rewards: {
            gil: 4260,
            cp: 50,
            loot: "Emperor Scale ×2"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "D3-05",
        arc: "D3",
        name: "Rude Awakening",
        description: "My problem is simple: I oversleep, and I keep missing my classes. I've heard that malboro draught might help me wake up on time. It's made from malboro vine and foul liquid, and the Witch of the Fens is said to know how to make it. Geldran the Drowsy",
        rank: 18,
        region: "Tramdine Fens",
        fee: 300,
        days: 20,
        questType: "Delivery",
        canDispatch: false,
        canCancel: true,
        members: 1,
        requiredItems: ["Malboro Vine ×1", "Foul Liquid ×1"],
        requiredTalents: {
            negotiation: 18,
            aptitude: 0,
            teamwork: 0,
            adaptability: 0,
        },
    enemies: [],
        strategy: [
            "Delivery mission — bring Malboro Vine and Foul Liquid to the Witch of the Fens in Tramdine Fens.",
        ],
        rewards: {
            gil: 2350,
            cp: 36,
            loot: ""
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "D3-06",
        arc: "D3",
        name: "Drowsy Draught",
        description: "I need a potion that will help me sleep at night. Please bring a succulent fruit and some sweet sap to the Witch of the Fens. Geldran the Once Drowsy",
        rank: 20,
        region: "Fluorgis",
        fee: 300,
        days: 20,
        questType: "Delivery",
        canDispatch: true,
        canCancel: true,
        members: 1,
        requiredItems: ["Succulent Fruit ×1", "Sweet Sap ×1"],
        prerequisite: "Rude Awakening",
        requiredTalents: {
            negotiation: 20,
            aptitude: 0,
            teamwork: 0,
            adaptability: 0,
        },
    enemies: [],
        strategy: [
            "Delivery mission — bring Succulent Fruit and Sweet Sap to the Witch of the Fens.",
        ],
        rewards: {
            gil: 2580,
            cp: 40,
            loot: ""
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "D3-07",
        arc: "D3",
        name: "Teach a Man to Run",
        description: "The ultimate fisherman needs no rod, line, or hook. All he needs is the bravery to flee when the fish are too large. Enchan, Perspiring Fisherman",
        rank: 37,
        region: "Tramdine Fens",
        fee: 500,
        days: 20,
        questType: "Escort",
        canDispatch: false,
        canCancel: true,
        members: 6,
        prerequisite: "Teach a Man to Fish",
        requiredTalents: {
            negotiation: 22,
            aptitude: 0,
            teamwork: 22,
            adaptability: 0,
        },
        objective: "Protect Enchan and defeat all Foes!",
        law: "Forbidden: Copycat – Using the same action as the preceding unit is forbidden.",
        enemies: [
        { name: "Randomized Name", job: "Rafflesia", quantity: 1, notes: "Primary enemy. Can shoot seeds that immediately sprout into Malboros." },
        { name: "Randomized Name", job: "Malboro", quantity: 1, notes: "Respawns when defeated while the Rafflesia remains active." },
    ],
        strategy: [
            "Protect Enchan, who cannot meaningfully defend himself. Keep healing ready and intercept anything that moves toward him.",
            "Focus the Rafflesia; once it and its spawned Malboro are defeated, the mission ends.",
            "Vary actions carefully to avoid the Copycat law.",
        ],
        rewards: {
            gil: 5150,
            cp: 74,
            loot: "",
            items: "Potion"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "D3-09",
        arc: "D3",
        name: "Cleaning to Loar",
        description: "Looking for helpers to swab an airship. We haven't had the crew to properly clean her for some time now. It would be a shame to put her out of service, so we'll have you cleaning her mid-flight. Oh, and watch out for the rats. Jylland Airship Inspection Board",
        rank: 22,
        region: "Fluorgis",
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
        law: "Forbidden: Lightning – Weapons and abilities that use lightning are forbidden.",
        enemies: [
        { name: "Randomized Name", job: "Flan", quantity: 4, notes: "Or Mimics at higher levels. Ignore enemies — rush to cleaning spots across the airship. Rounds scale with difficulty/level." },
    ],
        strategy: [
            "Same mechanic as Cleaning to Ordalia — ignore enemies and move to cleaning tiles. Use high-movement units and Haste.",
            "Tinker's Red Springs grants extra turns. Number of rounds to complete scales with level/difficulty.",
        ],
        rewards: {
            gil: 180,
            cp: 44,
            loot: "Great Serpent's Fang ×2"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "D3-10",
        arc: "D3",
        name: "Teach a Man to Fish",
        description: "The ultimate fisherman needs no rod, line, or hook. All he needs is a safe fishing hole, but monsters keep intruding. Enchan, Aspiring Fisherman",
        rank: 28,
        region: "Tramdine Fens",
        fee: 400,
        days: 10,
        questType: "Escort",
        canDispatch: true,
        canCancel: true,
        members: 5,
        dispatchRecommended: ["Defender"],
        requiredTalents: {
            negotiation: 18,
            aptitude: 0,
            teamwork: 18,
            adaptability: 0,
        },
        objective: "Protect Enchan and defeat all Foes!",
        law: "Forbidden: Harming Nu Mou – Actions that harm nu mou are forbidden.",
    enemies: [
        { name: "Randomized Name", job: "Wendigo", quantity: 1, notes: "Strong monster attacking Enchan's fishing hole." },
        { name: "Randomized Name", job: "Hellhound", quantity: 1, notes: "Fast monster support." },
        { name: "Randomized Name", job: "Adamantitan", quantity: 1, notes: "Durable monster support." },
        { name: "Randomized Name", job: "Rocktitan", quantity: 1, notes: "Strong physical monster support." },
    ],
        strategy: [
            "Keep Enchan alive. Bring a healer or Defender-style unit to body-block monsters that close on him.",
            "The law bans harming Nu Mou, so be careful with wide areas if Enchan is nearby.",
        ],
        rewards: {
            gil: 4260,
            cp: 56,
            loot: ""
        },
        notes: "",
        tags: ["optional", "chain", "protection"]
    },
    {
        id: "D3-11",
        arc: "D3",
        name: "Love-Struck",
        description: "I was developing a love philtre for my studies, but a classmate drank the potion before I could complete it and has come down with a terrible fever. I need someone to ask the Witch of the Fens to make a potion to cool down the fever before my classmate's condition grows worst. The ingredients needed are silk bloom and malboro wine. Thanks! (And hurry!) Kuleek, Morrabella Magick Akademy.",
        rank: 23,
        region: "Moorabella",
        fee: 400,
        days: 20,
        questType: "Delivery",
        canDispatch: false,
        canCancel: true,
        members: 1,
        requiredItems: ["Silk Bloom ×1", "Malboro Wine ×1"],
        requiredTalents: {
            negotiation: 22,
            aptitude: 0,
            teamwork: 0,
            adaptability: 0,
        },
        enemies: [],
        strategy: [
            "Delivery mission — bring Silk Bloom ×1 and Malboro Wine ×1 for the Witch of the Fens potion request.",
            "No combat. The next quest in this chain also needs Malboro Wine, so keep a second bottle if you have one.",
        ],
        rewards: {
            gil: 2910,
            cp: 46,
            loot: ""
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "D3-12",
        arc: "D3",
        name: "All Good Things...",
        description: "My unfinished love phiultre seems to have taken premature effect, and my classmate has become infatuated with me! Though I must confess I am somewhat pleased by this, I am left feeling strangely unwholesome. I need someone to ask the Witch of the Fens to make an antidote to the philtre! The ingredients needed are cactus fruit and malboro wine. Thanks! (And ... don't hurry too much.) Kuleek, Moorabella Magick Akademy",
        rank: 26,
        region: "Moorabella",
        fee: 400,
        days: 20,
        questType: "Delivery",
        canDispatch: false,
        canCancel: true,
        members: 1,
        requiredItems: ["Cactus Fruit ×1", "Malboro Wine ×1"],
        prerequisite: "Love-Struck",
        requiredTalents: {
            negotiation: 28,
            aptitude: 0,
            teamwork: 0,
            adaptability: 0,
        },
        enemies: [],
        strategy: [
            "Delivery mission — bring Cactus Fruit ×1 and Malboro Wine ×1 for the antidote request.",
            "No combat. This follows Love-Struck and continues Kuleek's potion chain.",
        ],
        rewards: {
            gil: 3260,
            cp: 52,
            loot: ""
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "D3-15",
        arc: "D3",
        name: "Rancher's Request - Yellow",
        description: "I'm big on chocobos. So big, I decided to build a chocobo rach. All well and good, right? Wrong! I spent so much on the ranch, I didn't have anything left to buy chocobos! That's why I need you to go out and catch me a wild one. Yellow should do just fine. Yew, Chocobo Rancher",
        rank: 21,
        region: "Targ Wood",
        fee: 400,
        days: 20,
        questType: "Satisfy Petitioner",
        canDispatch: false,
        canCancel: true,
        members: 1,
        requiredTalents: {
            negotiation: 13,
            aptitude: 0,
            teamwork: 0,
            adaptability: 0,
        },
        objective: "Deliver a Yellow Chocobo to Yew!",
        enemies: [],
        strategy: [
            "Capture a Yellow Chocobo with a Moogle Chocobo Knight before turning in the quest.",
            "Find a wild Yellow Chocobo in a battle, weaken it to critical HP, move the Chocobo Knight next to it, and mount it.",
            "Keep the Chocobo Knight mounted after the battle, then return to Targ Wood to deliver the chocobo to Yew.",
        ],
        rewards: {
            gil: 180,
            cp: 42,
            loot: "Spiral Vine ×3, Kempas ×3"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "D3-16",
        arc: "D3",
        name: "Rancher's Request - Black",
        description: "My ranch is up and running, but with only one chocobo, it seems even emptier than before! That's why I'm asking you to catch another wild chocobo for me! A black chocobo would do nicely. Yew, Chocobo Rancher",
        rank: 25,
        region: "Targ Woods",
        fee: 400,
        days: 20,
        questType: "Satisfy Petitioner",
        canDispatch: false,
        canCancel: true,
        members: 1,
        prerequisite: "Rancher's Request - Yellow",
        requiredTalents: {
            negotiation: 15,
            aptitude: 0,
            teamwork: 0,
            adaptability: 0,
        },
        objective: "Deliver a Black Chocobo to Yew!",
        enemies: [],
        strategy: [
            "Capture a Black Chocobo with a Moogle Chocobo Knight before accepting the delivery turn-in.",
            "Defeat or control the other enemies in the encounter, weaken the Black Chocobo to critical HP, then mount it with the Chocobo Knight.",
            "Black Chocobos use Choco Flame, so spread out and heal while lowering its HP carefully enough to avoid KOing it.",
        ],
        rewards: {
            gil: 1750,
            cp: 50,
            loot: "Kuraisle Boxwood ×2"
        },
        notes: "",
        tags: ["optional"]
    }
];
