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
        { name: "Randomized Name", job: "Archer", quantity: 1, notes: "Ranged threat." },
        { name: "Randomized Name", job: "Blue Mage", quantity: 1, notes: "Heavy debuffer — second priority. Has White Wind, Bad Breath." },
        { name: "Randomized Name", job: "Trickster", quantity: 1, notes: "Long-range card attacks." },
        { name: "Randomized Name", job: "Lanista", quantity: 1, notes: "Melee attacker." },
        { name: "Randomized Name", job: "White Mage", quantity: 1, notes: "PRIORITY: Healer — eliminate first to prevent sustained healing." },
        { name: "Randomized Name", job: "White Monk", quantity: 1, notes: "Strong melee." },
    ],
        strategy: [
            "Gria are restricted to move and basic attack only — avoid relying on Gria abilities.",
            "Kill the White Mage first to cut off healing, then target the Blue Mage (Bad Breath/heavy debuffs). The rest is manageable.",
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
    enemies: [],
        strategy: [
            "No combat — Montblanc, Marche's companion from FFTA, is the unsigned letter writer. Head to Baptiste Hill and he joins your clan as a Black Mage. Do not refuse him.",
        ],
        rewards: {
            gil: 7880,
            cp: 98,
            loot: "Emperor Scale ×1"
        },
        notes: "",
        tags: ["optional"]
    }
];
