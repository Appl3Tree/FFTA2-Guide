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
        region: "Goug, Fens, Zed, Bisga",
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
            "Bring a healer to manage HP during the encounter",
        ],
        rewards: {
            gil: 4970,
            cp: 99,
            loot: "Earth Sigil ×2"
        },
        notes: "",
        tags: ["optional"]
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
            "Ranged magical attacks are effective in this mission",
        ],
        rewards: {
            gil: 10300,
            cp: 99,
            loot: "Bangaa of Rupies ×3, Moon Ring ×2"
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
        name: "The Nu Mous of the Rupies",
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
            "Ranged magical attacks are effective in this mission",
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
            gil: 6220,
            cp: 58,
            loot: "Clear Sap ×1, Magick Fruit ×1"
        },
        notes: "",
        tags: ["optional"]
    }
];
