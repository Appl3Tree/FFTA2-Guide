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
        prerequisite: "Wanted: Friends, Kupo!",
        requiredTalents: {
            negotiation: 33,
            aptitude: 0,
            teamwork: 33,
            adaptability: 0,
        },
        objective: "Defeat all Foes!",
        law: "Forbidden: Actions by Gria – Gria may only move and perform basic attacks.",
        enemies: [
            { name: "Randomized Name", job: "Blue Mage", quantity: 1, notes: "Major threat; Bad Breath and Screech can inflict multiple status effects." },
            { name: "Randomized Name", job: "White Monk", quantity: 1, notes: "Powerful attacks including Air Render and Aurablast." },
            { name: "Randomized Name", job: "White Mage", quantity: 1, notes: "Healer; eliminate early to prevent sustained recovery." },
            { name: "Randomized Name", job: "Archer", quantity: 1, notes: "Ranged threat." },
            { name: "Randomized Name", job: "Trickster", quantity: 1, notes: "Long-range card attacks." },
            { name: "Randomized Name", job: "Lanista", quantity: 1, notes: "Melee attacker." },
        ],
        strategy: [       ],
        rewards: {
            gil: 6130,
            cp: 72,
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
        prerequisite: "Fluorgis Cup; The Last Step; complete game save",
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 54,
            adaptability: 54,
        },
        enemies: [],
        strategy: [        ],
        rewards: {
            gil: 7880,
            cp: 98,
            loot: "Emperor Scale ×1"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "E5-15",
        arc: "E5",
        name: "A Dashing Duel",
        description: "I had been courting the Lady Bcja for some time, and had finally arranged for a proper... rendezvous, shall we say. When the day arrived, however, she told me she'd made other plans with another suitor! I seek a champion to fight this philanderer on my behalf and uphold my honor. I must have satisfaction! Marnot, Pride of Fluorgis",
        rank: 62,
        region: "Aisenfield",
        fee: 500,
        days: 20,
        questType: "Defeat Mark",
        canDispatch: false,
        canCancel: true,
        members: 6,
        prerequisite: "Pirate Problems; Where Could He Be?",
        requiredTalents: {
            negotiation: 1,
            aptitude: 0,
            teamwork: 1,
            adaptability: 0,
        },
        objective: "Defeat Al-Cid!",
        law: "Forbidden: Harming Viera – Actions that harm Viera are forbidden.",
        enemies: [
            { name: "Al-Cid Margrace", job: "Agent", quantity: 1, notes: "Mark; mostly covers his Viera companions rather than attacking directly." },
            { name: "Randomized Name", job: "Sniper", race: "Viera", quantity: 1, notes: "Major threat if you choose to fight the escort; Doubleshot, Beso Toxico, and Death Sickle." },
            { name: "Randomized Name", job: "Green Mage", race: "Viera", quantity: 1, notes: "Major threat; Oil, Sleep, and Ifrit." },
            { name: "Randomized Name", job: "Red Mage", race: "Viera", quantity: 1, notes: "Cure, Protect, Shell, Doublecast, Tranquilizer, and Leap support." },
            { name: "Randomized Name", job: "Spellblade", race: "Viera", quantity: 1, notes: "Stun and Maim Blade." },
            { name: "Randomized Name", job: "Fencer", race: "Viera", quantity: 1, notes: "Swarmstrike, Featherblow, and Piercing Blow." },
        ],
        strategy: [      ],
        rewards: {
            gil: 8790,
            cp: 99,
            loot: "Snowcat Crystal ×1"
        },
        notes: "",
        tags: ["optional", "story-cameo", "law-sensitive"]
    }
];
