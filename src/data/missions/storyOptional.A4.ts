// src/data/missions/storyOptional.A4.ts
// Arc A4 optional missions, accurately transcribed from Side_Quests.txt

import type { Mission } from "../../types/ffta2";

export const OPTIONAL_MISSIONS_A4: Mission[] = [
    {
        id: "A4-01",
        arc: "A4",
        name: "Champions' Cup",
        description: "Announcing a Special Champions' Cup Clan Tourney! The Champions' Cup pits the winners of this year's clan tourney with the winners of last year's tourney. Come and see the best of the best in desperate combat! Tourney Guild - Ivalice Headquarters",
        rank: 54,
        region: "Fluorgis",
        fee: 500,
        days: 20,
        questType: "Battle",
        canDispatch: true,
        canCancel: true,
        members: 6,
        prerequisite: "Jylland Cup",
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 54,
            adaptability: 54,
        },
        dispatchRecommended: ["Lanista"],
        objective: "Defeat all foes in the Special Bout!",
        law: "Forbidden: Dealing < 20 Damage – Dealing < 20 Damage is forbidden.",
        enemies: [
            {
                name: "White Monk",
                type: "Monster",
            },
        ],
        strategy: [
            "Bring a healer to manage HP during the encounter",
        ],
        rewards: {
            gil: 8510,
            cp: 99,
            loot: "Waterwyrd Crystal ×1"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "A4-02",
        arc: "A4",
        name: "Wanted: Icicle Ark",
        description: "-WANTED!- Wanted: Icicle Ark, for encasing both a manor and its lord in solid ice. These masters of ice manupulation are currently confined to the Kthili Sands area. Jylland Defenders of the Peace",
        rank: 26,
        region: "Kthili Sands",
        fee: 400,
        days: 20,
        questType: "Headhunt",
        canDispatch: true,
        canCancel: true,
        members: 6,
        prerequisite: "Wanted: Gaitsnipe",
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 20,
            adaptability: 20,
        },
        objective: "Defeat Icicle Ark!",
        law: "Forbidden: Fire – Weapons and abilities that use fire are forbidden.",
        enemies: [],
        rewards: {
            gil: 3150,
            cp: 52,
            loot: "Cockatrice Skin ×2, Mysidia Alloy ×5"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "A4-03",
        arc: "A4",
        name: "Thieves in the Ruins",
        description: "We've found evidence of trespassing at a ruins site not yet cleared for excavation. We suspect grave robbers. If left to their own devices, it could mean the loss of priceless and irreplaceable cultural artifacts. Our society would like to request that someone put a stop to this activity at once. Naturalist Society",
        rank: 35,
        region: "Kthili Sands",
        fee: 500,
        days: 20,
        questType: "Battle",
        canDispatch: true,
        canCancel: true,
        members: 4,
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 28,
            adaptability: 28,
        },
        objective: "Defeat all Foes!",
        law: "Forbidden: Opportunity Commands – Opportunity Commands are Forbidden.",
        enemies: [
            {
                name: "Thieves ×2",
                type: "Monster",
            },
            {
                name: "Beastmaster",
                type: "Monster",
            },
        ],
        rewards: {
            gil: 5460,
            cp: 70,
            loot: "Aurea Pollen ×2"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "A4-06",
        arc: "A4",
        name: "Wanted: Floraxion",
        description: "-WANTED!- Wanted: Floraxion, for 23 counts of violence, and the general spreading of mayhem. This giant plant is to be considered extremely dangerous. Jylland Defenders of the Peace",
        rank: 30,
        region: "Baptiste Hill",
        fee: 400,
        days: 20,
        questType: "Headhunt",
        canDispatch: true,
        canCancel: true,
        members: 6,
        prerequisite: "Wanted: Icicle Ark",
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 22,
            adaptability: 22,
        },
        objective: "Defeat Floraxion!",
        law: "Forbidden: Actions by Viera – Viera may only move and perform basic attacks.",
        enemies: [
            {
                name: "Great Malboro ×2",
                type: "Monster",
            },
        ],
        battlefield: [
            "The battlefield contains trap tiles that pose hazards",
        ],
        strategy: [
            "Having Esuna available is recommended to handle debuffs",
            "Bring a healer to manage HP during the encounter",
        ],
        rewards: {
            gil: 6760,
            cp: 60,
            loot: "Putrid Liquid ×4, Malboro Vine ×1, Malboro Flower ×2"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "A4-08",
        arc: "A4",
        name: "Wanted: Musicians!",
        description: "A member of our troupe has been injured and won't be able to perform at the music competition in Fluorgis. We've been preparing so long for this, it would be a shame to miss out now, kupo! Please, help us find a replacement in time. We'll need them for no less than six days if we're to have enough time to rehearse! Pompo, Troupe Leader",
        rank: 26,
        region: "Aisenfield",
        fee: 400,
        days: 20,
        questType: "Satisfy Petitioner",
        canDispatch: true,
        canCancel: true,
        members: 6,
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 15,
            adaptability: 15,
        },
        enemies: [],
        rewards: {
            gil: 2420,
            cp: 52,
            loot: "Hero Tonic ×1"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "A4-10",
        arc: "A4",
        name: "Wanted: Moogle Rangers",
        description: "-WANTED!- Wanted: The Moogle Rangers, for 245 counts of disrupting the peace, and 1 count of trespassing. Do not be taken in by the adorable appearance of these five moogles - they are to be considered rude and riotous. Jylland Defenders of the Peace",
        rank: 32,
        region: "Sant D'alsa Bluff",
        fee: 500,
        days: 20,
        questType: "Headhunt",
        canDispatch: true,
        canCancel: true,
        members: 6,
        prerequisite: "Wanted: Floraxion",
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 33,
            adaptability: 33,
        },
        objective: "Defeat the Moogle Rangers!",
        law: "Forbidden: Missing – Missing with an action is forbidden.",
        enemies: [
            {
                name: "Moogle Knight",
                type: "Monster",
            },
            {
                name: "Black Mage",
                type: "Monster",
            },
            {
                name: "Juggler",
                type: "Monster",
            },
            {
                name: "Chocobo Knight",
                type: "Monster",
            },
            {
                name: "White Rider",
                type: "Monster",
            },
            {
                name: "Flintlock",
                type: "Monster",
            },
        ],
        battlefield: [
            "The battlefield contains trap tiles that pose hazards",
        ],
        strategy: [
            "Ranged magical attacks are effective in this mission",
        ],
        rewards: {
            gil: 6090,
            cp: 64,
            loot: "Screamroot ×2"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "A4-11",
        arc: "A4",
        name: "Red King of Cinquleur",
        description: "We of Cinquleur seek battle with the strongest of warriors! Defeat me if you can, and you shall be rewarded! Red King Ruuj of Cinquleur",
        rank: 44,
        region: "Baptiste Hill",
        fee: 500,
        days: 20,
        questType: "Defeat Mark",
        canDispatch: true,
        canCancel: true,
        members: 6,
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 6,
            adaptability: 6,
        },
        objective: "Defeat Red King Ruuj!",
        law: "Forbidden: Fire, Ice, and Lightning – Weapons and abilities that use fire, ice, or lightning are",
        enemies: [],
        battlefield: [
            "The battlefield contains trap tiles that pose hazards",
        ],
        strategy: [
            "Bring a healer to manage HP during the encounter",
            "Ranged magical attacks are effective in this mission",
        ],
        rewards: {
            gil: 8110,
            cp: 88,
            loot: "Chocobo Skin ×1, Coeurl Pelt ×1"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "A4-12",
        arc: "A4",
        name: "Wanted: Tutor",
        description: "I seek a talented home tutor for my son, for seven days during the summer holidays. The successful applicant will have a good attitude, and be willing to live in our home for the duration. Marianne, House Havemille Head Maid",
        rank: 16,
        region: "Moorabella",
        fee: 300,
        days: 20,
        questType: "Satisfy Petitioner",
        canDispatch: false,
        canCancel: true,
        members: 1,
        requiredTalents: {
            negotiation: 13,
            aptitude: 0,
            teamwork: 0,
            adaptability: 13,
        },
        enemies: [],
        rewards: {
            gil: 2520,
            cp: 32,
            loot: "Mysidia Alloy ×3, White Thread ×2"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "A4-14",
        arc: "A4",
        name: "Wanted: The Mutadragons",
        description: "-WANTED!- Wanted: The Mutadragons, for multiple counts of violent assault resulting in injury and destruction of property. These dragons are a rare species, unknown anywhere else. Jylland Defenders of the Peace",
        rank: 36,
        region: "The Aldanna Range",
        fee: 500,
        days: 20,
        questType: "Headhunt",
        canDispatch: true,
        canCancel: true,
        members: 6,
        prerequisite: "Wanted: Moogle Ranger",
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 44,
            adaptability: 44,
        },
        objective: "Defeat the Mutadragons!",
        law: "Forbidden: Targeting all Units – Actions targeting all units at once are forbidden.",
        enemies: [],
        battlefield: [
            "The battlefield contains trap tiles that pose hazards",
        ],
        strategy: [
            "Ranged magical attacks are effective in this mission",
        ],
        rewards: {
            gil: 7490,
            cp: 72,
            loot: "High Arcana ×1"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "A4-15",
        arc: "A4",
        name: "Blue King of Cinquleur",
        description: "We of Cinquleur seek battle with the strongest of warriors! Defeat me if you can, and you shall be rewarded! Blue King Bliu of Cinquleur",
        rank: 55,
        region: "The Bisga Greenlands",
        fee: 500,
        days: 20,
        questType: "Defeat Mark",
        canDispatch: false,
        canCancel: true,
        members: 6,
        prerequisite: "Red King of Cinquleur",
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 7,
            adaptability: 7,
        },
        objective: "Defeat Blue King Bliu!",
        law: "Forbidden: Using MP – Actions that consume MP are forbidden.",
        enemies: [
            {
                name: "Light Sabers ×2",
                type: "Monster",
            },
            {
                name: "Blue Mage",
                type: "Monster",
            },
        ],
        rewards: {
            gil: 7810,
            cp: 99,
            loot: "Platinum ×2, Lamia Scale ×2, Divariwood ×1"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "A4-16",
        arc: "A4",
        name: "Wanted: Woodworker",
        description: "My roof's about to collapse under the weight of all this snow. If I don't shore it up soon, that'll be the end of the whole thing! But the job is bigger than I can manage on my own, so I'm gonna need a second pair of hands to finish it up. I fugure she'll take about five days to get squared away. Bique, Retired Woodworker",
        rank: 16,
        region: "Moorabella",
        fee: 300,
        days: 20,
        questType: "Satisfy Petitioner",
        canDispatch: false,
        canCancel: true,
        members: 1,
        requiredTalents: {
            negotiation: 13,
            aptitude: 0,
            teamwork: 0,
            adaptability: 13,
        },
        enemies: [],
        rewards: {
            gil: 2520,
            cp: 32,
            loot: "Rose Branch ×4, Quality Hide ×3"
        },
        notes: "",
        tags: ["optional"]
    }
];