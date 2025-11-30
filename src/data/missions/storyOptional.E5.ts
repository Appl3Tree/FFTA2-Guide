// src/data/missions/storyOptional.E5.ts
// Arc E5 optional missions, accurately transcribed from Side_Quests.txt

import type { Mission } from "../../types/ffta2";

export const OPTIONAL_MISSIONS_E5: Mission[] = [
    {
        id: "E5-08",
        arc: "E5",
        name: "A Bride for Montblanc",
        description: "My Dear Montblanc, I have long admired you from afar, and now I wish to see you and profess my feelings in person. Yours, Cois, Maiden of the Wood",
        rank: 36,
        region: "The Ruins of Delgantua",
        fee: 500,
        days: 20,
        questType: "Satisfy Petitioner",
        canDispatch: true,
        canCancel: true,
        members: 6,
        prerequisite: "Wanted: Friends! Kupo",
        requiredTalents: {
            negotiation: 33,
            aptitude: 0,
            teamwork: 33,
            adaptability: 0,
        },
        objective: "Defeat all Foes!",
        law: "Forbidden: Actions by Gria – Gria may only move and perform basic attacks.",
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
            gil: 6130,
            cp: 94,
            loot: "High Arcana ×1"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "E5-12",
        arc: "E5",
        name: "Wanted: Friends, Kupo!",
        description: "I am an itinerant black mage, kupo. I've come all this way alone, but now I feel it's time to take on some traveling companions. Meet me on Baptiste Hill if you think you're right for the job, kupo! (Unsigned)",
        rank: 49,
        region: "Baptiste Hill",
        fee: 500,
        days: 20,
        questType: "Satisfy Petitioner",
        canDispatch: false,
        canCancel: true,
        members: 1,
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 54,
            adaptability: 54,
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
            gil: 8790,
            cp: 99,
            loot: "Snowcay Crystal ×1"
        },
        notes: "",
        tags: ["optional"]
    }
];
