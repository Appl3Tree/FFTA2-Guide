// src/data/missions/storyOptional.E3.ts
// Arc E3 optional missions, accurately transcribed from Side_Quests.txt

import type { Mission } from "../../types/ffta2";

export const OPTIONAL_MISSIONS_E3: Mission[] = [
    {
        id: "E3-05",
        arc: "E3",
        name: "Shaved Ice",
        description: "I need someone to bring me an ice stone. You see, my daughter Coryn has taken ill, and wants to eat shaved ice. True, ice from places such as the Rupie Mountains would do, but I want only the best for my daughter. Matieu",
        rank: 20,
        region: "Fluorgis",
        fee: 300,
        days: 20,
        questType: "Delivery",
        canDispatch: true,
        canCancel: true,
        members: 1,
        requiredItems: ["Ice Stone ×1"],
        requiredTalents: {
            negotiation: 15,
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
            gil: 4990,
            cp: 60,
            loot: "High Arcana ×2"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "E3-07",
        arc: "E3",
        name: "Wish Upon a Star",
        description: "This past night I saw another falling star in the direct of Sant D'alsa Bluff. There had been another the night before last, and the night before that, too! I can't rest with the sky falling down around me. All I want is a good night's sleep! Would someone travel to Sant D'alsa Bluff and see if there's anything that can be done? Manuela, Insomniac",
        rank: 27,
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
        objective: "Defeat Entz!",
        law: "Forbidden: Elemental Effects – Use of elemental weapons and abilities is forbidden.",
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
            "Prioritize high-threat targets early in the battle",
        ],
        rewards: {
            gil: 5740,
            cp: 54,
            loot: "Darklord Crystal ×2, Mahbeny ×2"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "E3-10",
        arc: "E3",
        name: "Wanted: Hatchery Worker",
        description: "My precious chocobos will begin laying eggs soon, and I want to take on an additional hand to work in the hatchery. - No experience required - All applicants welcome - Room and board to be provided - Duration : 15 Days Yew, Chocobo Rancher",
        rank: 18,
        region: "Targ Woods",
        fee: 300,
        days: 20,
        questType: "Satisfy Petitioner",
        canDispatch: false,
        canCancel: true,
        members: 1,
        prerequisite: "Rancher's Request",
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 18,
            adaptability: 18,
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
            gil: 2560,
            cp: 36,
            loot: "Platinum ×1"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "E3-11",
        arc: "E3",
        name: "Abducted!",
        description: "My girl was taken from my arms last night! Maybe they spotted her in that beauty contest she won, and ... Oh! The horror! Were they jealous of her victory? Someone save my beauty for me! Bunbassa",
        rank: 30,
        region: "Aisenfield",
        fee: 400,
        days: 20,
        questType: "Battle",
        canDispatch: true,
        canCancel: true,
        members: 6,
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 20,
            adaptability: 20,
        },
        objective: "Defeat all Foes!",
        law: "Forbidden: Action by Seeq – Seeq may only move and perform basic attacks.",
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
            "Having Esuna available is recommended to handle debuffs",
            "Ranged magical attacks are effective in this mission",
        ],
        rewards: {
            gil: 4970,
            cp: 60,
            loot: "Godwood ×3"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "E3-12",
        arc: "E3",
        name: "Eternal Rivalry",
        description: "My master suddently left the dojo the other day, leaving behind a note that said he was off to fight his sworn enemy! I am worried for my master. Could someone go and see if he is all right? Anis, Grant's Pupil",
        rank: 99,
        region: "Sant D'alsa Bluff",
        fee: 500,
        days: 20,
        questType: "Satisfy Petitioner",
        canDispatch: true,
        canCancel: true,
        members: 1,
        requiredTalents: {
            negotiation: 22,
            aptitude: 0,
            teamwork: 0,
            adaptability: 22,
        },
        objective: "See the battle to the end!",
        law: "Forbidden: Restoring HP – Actions that restore HP are forbidden.",
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
            gil: 1750,
            cp: 66,
            loot: "Unpurified Ether ×3"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "E3-15",
        arc: "E3",
        name: "Rancher's Request - White",
        description: "I was tending my chocobos in the field when - to my unending surprise and delight - a white chocobo appeared! I tried to catch it, but it seemed to guess my intent and darted off before I could get anywhere near it. Perhaps I should be content to merely have been in the presence of such a rare beast, but I'm not! I mean to add it to my herd, and I want you to catch it for me! Yew, Chocobo Rancher",
        rank: 37,
        region: "Targ Woods",
        fee: 500,
        days: 20,
        questType: "Satisfy Petitioner",
        canDispatch: false,
        canCancel: true,
        members: 1,
        prerequisite: "Rancher's Request -",
        requiredTalents: {
            negotiation: 22,
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
            gil: 1750,
            cp: 74,
            loot: "Scarletite ×3"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "E3-16",
        arc: "E3",
        name: "Rancher's Request - Red",
        description: "Some fellow chocobo afficionados and I went chocobo - watching in the hope of seeing a red chocobo. We had spotted one and were settling in for a good viewing, when without warning it lashed out at us with a choco meteor! Our number must have spooked the poor thing. I knew I should have gone alone! Would you catch one for me? Yew, Chocobo Rancher",
        rank: 42,
        region: "Targ Woods",
        fee: 500,
        days: 20,
        questType: "Satisfy Petitioner",
        canDispatch: false,
        canCancel: true,
        members: 1,
        prerequisite: "Rancher's Request -",
        requiredTalents: {
            negotiation: 28,
            aptitude: 0,
            teamwork: 0,
            adaptability: 0,
        },
        enemies: [],
        rewards: {
            gil: 1750,
            cp: 84,
            loot: "Pink Tail ×5"
        },
        notes: "",
        tags: ["optional"]
    }
];
