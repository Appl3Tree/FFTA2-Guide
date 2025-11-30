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
    enemies: [
        {
            name: "",
            job: "",
            abilities: {
                A1: {
                    setId: "lowercase",
                    abilityIds: [
                        "",
                    ]
                },
                A2: {
                    setId: "lowercase",
                    abilityIds: [
                        "hyphen-name",
                    ]
                },
                R: "",
                P: ""
            },
            equipment: [
                {slot: 1, itemId: "snakeCase" },
            ]
        },
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
    enemies: [
        {
            name: "",
            job: "",
            abilities: {
                A1: {
                    setId: "lowercase",
                    abilityIds: [
                        "",
                    ]
                },
                A2: {
                    setId: "lowercase",
                    abilityIds: [
                        "hyphen-name",
                    ]
                },
                R: "",
                P: ""
            },
            equipment: [
                {slot: 1, itemId: "snakeCase" },
            ]
        },
    ],
        rewards: {
            gil: 5150,
            cp: 74,
            loot: "Bundle of Needles ×1"
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
        {
            name: "",
            job: "",
            abilities: {
                A1: {
                    setId: "lowercase",
                    abilityIds: [
                        "",
                    ]
                },
                A2: {
                    setId: "lowercase",
                    abilityIds: [
                        "hyphen-name",
                    ]
                },
                R: "",
                P: ""
            },
            equipment: [
                {slot: 1, itemId: "snakeCase" },
            ]
        },
    ],
        strategy: [
            "Bring a healer to manage HP during the encounter",
        ],
        rewards: {
            gil: 4260,
            cp: 56,
            loot: "Screamroot ×1"
        },
        notes: "",
        tags: ["optional"]
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
        rewards: {
            gil: 5920,
            cp: 46,
            loot: "Malboro Wine ×1"
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
        rewards: {
            gil: 3260,
            cp: 40,
            loot: "Malboro Wine ×1"
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
        prerequisite: "Rancher's Request -",
        requiredTalents: {
            negotiation: 15,
            aptitude: 0,
            teamwork: 0,
            adaptability: 0,
        },
        objective: "Deliver a Black Chocobo to Yew!",
        enemies: [],
        rewards: {
            gil: 1750,
            cp: 50,
            loot: "Kuraisle Boxwood ×2"
        },
        notes: "",
        tags: ["optional"]
    }
];
