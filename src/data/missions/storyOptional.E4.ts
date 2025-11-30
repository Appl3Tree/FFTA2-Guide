// src/data/missions/storyOptional.E4.ts
// Arc E4 optional missions, accurately transcribed from Side_Quests.txt

import type { Mission } from "../../types/ffta2";

export const OPTIONAL_MISSIONS_E4: Mission[] = [
    {
        id: "E4-01",
        arc: "E4",
        name: "Devilish Delight",
        description: "Never tasted the delicious tears of devils brought to a simmer by the scalding heat of fire and brimstone? Then you've never tasted Imp Stew, a sinfully tasty dish! It must be eaten while piping hot, or it loses its punch, so don't dawdle once you've ladled a bowl or three! Grosso, Culinary Crusade",
        rank: 42,
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
        dispatchRecommended: ["Assassin"],
        objective: "Defeat all foes in 4 Rounds!",
        law: "Forbidden: Being Robbed – Having gil or items stolen is forbidden.",
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
            gil: 6410,
            cp: 84,
            loot: "Prime Tanned Hide ×1"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "E4-02",
        arc: "E4",
        name: "Shelling Out",
        description: "Fisherman's Tortoria is an old Graszton favorite of lightly seasoned turtle meat. Simple, and simply delicious! The trick to preparing this dish comes not in the kitchen but on the battlefield. Bring down the turtles with bladed weapons, and the entire dish tastes of metal, so best to avoid using them entirely. Are you up to the task? Grosso, Culinary Crusade",
        rank: 50,
        region: "Graszton",
        fee: 500,
        days: 20,
        questType: "Satisfy Petitioner",
        canDispatch: true,
        canCancel: true,
        members: 6,
        prerequisite: "Devilish Delight",
        requiredTalents: {
            negotiation: 44,
            aptitude: 0,
            teamwork: 0,
            adaptability: 44,
        },
        objective: "Upload the Law and Defeat all Foes!",
        law: "Forbidden: Bladed Weapons – Attacks with knives, swords, blades, sabers, katanas, axes",
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
            gil: 9230,
            cp: 99,
            loot: "Emperor Scale ×1"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "E4-03",
        arc: "E4",
        name: "Flantastic Finish",
        description: "Zedlei Flan, a specialty from the forest of the same name, is a delicate desert that melts in one's mouth, before melting one's heart. Only the freshest ingredients will do for this treat! Grosso, Culinary Crusade",
        rank: 50,
        region: "Zedlei Forest",
        fee: 500,
        days: 20,
        questType: "Satisfy Petitioner",
        canDispatch: true,
        canCancel: true,
        members: 6,
        prerequisite: "Shelling Out",
        requiredTalents: {
            negotiation: 47,
            aptitude: 0,
            teamwork: 0,
            adaptability: 47,
        },
        dispatchRecommended: ["Arcanist"],
        objective: "Weaken the Red Flan and defeat all other foes!",
        law: "Forbidden: Opportunity Commands – Opportunity Commands are forbidden.",
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
            "Bring a healer to manage HP during the encounter",
            "Ranged magical attacks are effective in this mission",
        ],
        rewards: {
            gil: 4590,
            cp: 72,
            loot: "Putrid Liquid ×2"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "E4-06",
        arc: "E4",
        name: "From 'Cross the Sea",
        description: "I've penned a reply to my dear friend Riddim 'cross the sea. I seek a courier to deliver it to her. Meena",
        rank: 25,
        region: "Goug, Camoa",
        fee: 400,
        days: 20,
        questType: "Delivery",
        canDispatch: false,
        canCancel: true,
        members: 1,
        prerequisite: "'Cross the Sea",
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
        strategy: [
            "Bring a healer to manage HP during the encounter",
        ],
        rewards: {
            gil: 10700,
            cp: 94,
            loot: "Spider Silk ×1"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "E4-09",
        arc: "E4",
        name: "'Cross the Sea",
        description: "My dear friend Meena has moved 'cross the sea. I seek a courier to deliver a letter to her. Riddim",
        rank: 25,
        region: "Camoa, Goug",
        fee: 400,
        days: 20,
        questType: "Delivery",
        canDispatch: false,
        canCancel: true,
        members: 1,
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
        strategy: [
            "Bring a healer to manage HP during the encounter",
            "Ranged magical attacks are effective in this mission",
        ],
        rewards: {
            gil: 7650,
            cp: 96,
            loot: "Lightwing Crystal ×1"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "E4-14",
        arc: "E4",
        name: "Drawn Bridge",
        description: "I'm in charge of Dow Bridge, a drawbridge linking Goug with Kthili Sands. The bridge mechanism is one of the great feats of mooglecraft! The thing is, I've run into a little problem ... I lost the key required to operate it! I dropped it in one of the mine shafts, and no one's been able to use the bridge since! My pom-pom's akimbo over the whole mess, kupo! Tchipo, Dow Bridge Operator",
        rank: 48,
        region: "Goug",
        fee: 500,
        days: 20,
        questType: "Investigation",
        canDispatch: false,
        canCancel: true,
        members: 6,
        requiredTalents: {
            negotiation: 0,
            aptitude: 44,
            teamwork: 0,
            adaptability: 0,
        },
        objective: "Find the Dow Bridge Key!",
        law: "Forbidden: Items – Items are Forbidden",
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
            gil: 10820,
            cp: 80,
            loot: "Stradivari ×1"
        },
        notes: "",
        tags: ["optional"]
    }
];
