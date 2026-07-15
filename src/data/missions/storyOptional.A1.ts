// src/data/missions/storyOptional.A1.ts
// Arc A1 optional missions, accurately transcribed from Side_Quests.txt

import type { Mission } from "../../types/ffta2";

export const OPTIONAL_MISSIONS_A1: Mission[] = [
    {
        id: "A1-02",
        arc: "A1",
        name: "Reagent Run",
        description: "The muskmallow, favored herb for treatment of ague, is again in season. Seeking herbalists to venture into Targ Wood and procure a supply. No previous experience required. -Jylland Apothecary's League",
        rank: 8,
        region: "Targ Wood",
        fee: 200,
        days: 20,
        questType: "Satisfy Petitioner",
        canDispatch: true,
        canCancel: true,
        members: 6,
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 0,
            adaptability: 0,
        },
        dispatchRecommended: ["Defender"],
        objective: "Collect a sample of muskmallow!",
        law: "Forbidden: Knockback – Actions that knock the target back are forbidden.",
    enemies: [
        {
            name: "Randomized Name",
            job: "Dreamhare",
            notes: "Enticement user with Hip Attack and Counter. Can slow down the sparkle route if ignored.",
            abilities: {
                A1: {
                    setId: "enticement",
                    abilityIds: [
                        "hip-attack",
                    ]
                },
                A2: null,
                R: "counter",
                P: null
            },
            equipment: [
            ]
        },
        {
            name: "Randomized Name",
            job: "Dreamhare",
            notes: "Enticement user with War Dance and Hip Attack. Clear only if it blocks the muskmallow route.",
            abilities: {
                A1: {
                    setId: "enticement",
                    abilityIds: [
                        "war-dance",
                        "hip-attack",
                    ]
                },
                A2: null,
                R: null,
                P: null
            },
            equipment: [
            ]
        },
        {
            name: "Randomized Name",
            job: "Baknamy",
            notes: "Uses Magick Hammer and has Archer's Bane, making it awkward for ranged physical units.",
            abilities: {
                A1: {
                    setId: "taktak",
                    abilityIds: [
                        "magick-hammer",
                    ]
                },
                A2: null,
                R: "archers-bane",
                P: null
            },
            equipment: [
                {slot: 1, itemId: "leatherClothing" },
            ]
        },
        {
            name: "Randomized Name",
            job: "Wolf",
            quantity: 2,
            notes: "Fast beasts with Summon Pack and Fangs. Body-block them while the collector reaches the sparkle.",
            abilities: {
                A1: {
                    setId: "maw",
                    abilityIds: [
                        "summon-pack",
                        "fangs",
                    ]
                },
                A2: null,
                R: null,
                P: null
            },
            equipment: [
            ]
        },
    ],
        battlefield: [
            "The muskmallow sample is a shining sparkle objective on the map.",
            "Only one of the sparkling spots contains the muskmallow sample.",
        ],
        strategy: [      ],
        rewards: {
            gil: 1580,
            cp: 16,
            loot: "Cactus Fruit ×3, Nepenthis ×1, Spruce ×3"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "A1-03",
        arc: "A1",
        name: "The First Step",
        description: "-Trade Requested- I will trade my Ocktor Tome of Medicine for your cactus fruit! We will do the deal in Targ Wood. Mack, White Mage",
        rank: 3,
        region: "Targ Wood",
        fee: 100,
        days: 20,
        questType: "Delivery",
        canDispatch: false,
        canCancel: true,
        members: 1,
        requiredItems: ["Cactus Fruit ×1"],
        requiredTalents: {
            negotiation: 3,
            aptitude: 0,
            teamwork: 0,
            adaptability: 0,
        },
        dispatchRecommended: ["Defender"],
    enemies: [],
        strategy: [
            "No combat — this is a pure trade. Bring Cactus Fruit ×1 and exchange it at the Targ Wood location.",        ],
        rewards: {
            gil: 340,
            cp: 6,
            loot: "Cruzle Brass ×4, Crooked Fang ×2, Zinconium ×3"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "A1-04",
        arc: "A1",
        name: "The Next Step",
        description: "I seek someone to deliver medicine to a small village in Targ Wood. I would go myself, but there are those who would steal my secrets-as one who crafts potent potables-and it is deemed dangerous for me to go out and about. Please, this one favor I beg of you. -Mack, Salve-maker",
        rank: 16,
        region: "Moorabella, Targ Wood",
        fee: 300,
        days: 20,
        questType: "Delivery",
        canDispatch: false,
        canCancel: true,
        members: 1,
        prerequisite: "Mountain Watch; The First Step; read the Medicinal Marvel notice",
        requiredTalents: {
            negotiation: 13,
            aptitude: 0,
            teamwork: 0,
            adaptability: 0,
        },
        enemies: [],
        strategy: [
            "Non-combat delivery route: accept in Moorabella, then deliver Mack's medicine to the small village in Targ Wood.",        ],
        rewards: {
            gil: 1330,
            cp: 32,
            loot: "Foul Liquid ×3, Divariwood ×3"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "A1-07",
        arc: "A1",
        name: "The Perfect Gift",
        description: "It's nearly my mother's birthday, and I want to give her some flowers as a gift, kupo. I need someone to gather some pretty, pink flowers for the bouquet. -Genne, Devoted Son",
        rank: 6,
        region: "Camoa",
        fee: 200,
        days: 20,
        questType: "Delivery",
        canDispatch: true,
        canCancel: true,
        members: 1,
        requiredItems: ["Prima Petal ×1"],
        requiredTalents: {
            negotiation: 1,
            aptitude: 0,
            teamwork: 0,
            adaptability: 0,
        },
    enemies: [],
        strategy: [
            "Delivery mission — no combat. Bring Prima Petal ×1 and deliver it at the Camoa location.",        ],
        rewards: {
            gil: 1050,
            cp: 12,
            loot: "Molting ×2, Trusty Frying Pan ×2, Water Stone ×3"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "A1-08",
        arc: "A1",
        name: "Kids These Days",
        description: "Some of our younger clan members have been carrying on in the pub, disturbing the peace, as it were. I reckon it's best to teach them a good lesson now, and nip the problem in the bud. That's where you come in. Give 'em a good thrashing for me! -Criek, Clan Criek Leader",
        rank: 8,
        region: "Targ Wood",
        fee: 200,
        days: 20,
        questType: "Battle",
        canDispatch: true,
        canCancel: true,
        members: 6,
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 4,
            adaptability: 4,
        },
        objective: "Defeat all foes!",
        law: "Forbidden: Ice – Weapons and Abilities that use Ice are Forbidden.",
    enemies: [
        { name: "Randomized Name", job: "Fencer", quantity: 1, notes: "Has Poison ability — prioritize early." },
        { name: "Randomized Name", job: "Archer", quantity: 1, notes: "Ranged pressure from the pub floor. Remove after the White Monk/Fencer if it targets casters." },
        { name: "Randomized Name", job: "Warrior", quantity: 1, notes: "Straightforward melee damage. Keep away from fragile units." },
        { name: "Randomized Name", job: "Soldier", quantity: 1, notes: "Durable tank. Lowest priority once damage and status threats are controlled." },
        { name: "Randomized Name", job: "Thief", quantity: 1, notes: "Fast nuisance unit. Watch for item or gil theft if the fight drags." },
        { name: "Randomized Name", job: "White Monk", quantity: 1, notes: "Air Render can hit from range and deal solid damage." },
    ],
        strategy: [   ],
        rewards: {
            gil: 790,
            cp: 16,
            loot: "Waltwood ×3, Xergis Tin ×4, Gikhet Lead ×4"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "A1-09",
        arc: "A1",
        name: "Watch Your Step",
        description: "Oh, fie on him! I chased down a marked thief, and almost had him, too, when one of his traps tripped me up! Someone please bring him in! -Finnes, Watch Chief",
        rank: 33,
        region: "Fluorgis",
        fee: 500,
        days: 20,
        questType: "Satisfy Petitioner",
        canDispatch: true,
        canCancel: true,
        members: 6,
        dispatchRecommended: ["Ranger"],
        requiredTalents: {
            negotiation: 15,
            aptitude: 0,
            teamwork: 0,
            adaptability: 15,
        },
        objective: "Defeat all Foes and Destroy all Traps!",
        law: "Forbidden: Not Moving 3 Tiles – Each unit must move exactly 3 tiles before ending its turn.",
    enemies: [
        { name: "Randomized Name", job: "Berserker", notes: "Seeq bruiser. Dangerous, but the Vikings and Ranger are the guide's priority threats." },
        { name: "Randomized Name", job: "Viking", notes: "Priority target. Thundara can hit hard if the clan is clustered or under-healed." },
        { name: "Randomized Name", job: "Ranger", quantity: 1, notes: "Can lay more traps while you are trying to clear the stolen goods from the field." },
    ],
        battlefield: [
            "The stolen goods are hidden in traps that must be set off or destroyed to complete the quest.",
            "Two treasures are on the upper wall.",
        ],
        strategy: [            "Defeat the enemies before clearing the traps so you can safely finish the objective and collect the upper-wall treasures.",           "After the Seeq are down, set off or destroy every trap to recover the stolen goods."
        ],
        rewards: {
            gil: 4830,
            cp: 66,
            loot: "Star Fragments ×2"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "A1-10",
        arc: "A1",
        name: "The Trappings of Failure",
        description: "In response to monster attacks in the regions outlying the city proper, we set a number of traps to rid ourselves of the beasts once and for all. Alas, the traps had no effect. Worse still, they now pose a danger to our citizenry. Please destroy these traps before they can do any real harm. -Camoa Ministry of Wildlife",
        rank: 12,
        region: "Targ Wood",
        fee: 300,
        days: 20,
        questType: "Satisfy Petitioner",
        canDispatch: true,
        canCancel: true,
        members: 6,
        dispatchRecommended: ["Ranger"],
        requiredTalents: {
            negotiation: 4,
            aptitude: 0,
            teamwork: 0,
            adaptability: 4,
        },
        objective: "Destroy the Traps!",
        law: "Forbidden: > 50 Damage – Dealing > 50 Damage is forbidden.",
    enemies: [
        { name: "Randomized Name", job: "Sprite", quantity: 4, notes: "Meteorite users. Clear them before triggering traps." },
        { name: "Randomized Name", job: "Banshee", quantity: 1, notes: "More dangerous than the Sprites — eliminate it when you can." },
    ],
        battlefield: [
            "Five traps must be cleared by triggering them.",
            "Each trap removes half of the acting unit's current HP.",
        ],
        strategy: [     ],
        rewards: {
            gil: 390,
            cp: 24,
            loot: "Prima Petal ×2, Mape Wood ×3, Sturdy Vine ×3"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "A1-11",
        arc: "A1",
        name: "The Yellow Wings",
        description: "Drive off those brigands, the Yellow Wings, before I lose what little business I got left! They've been squatting the highroad, demanding gil from all what pass by. If I can't use that highroad, I can't get to Camoa; and if I can't get to Camoa, I'm finished! Kagran, Merchant",
        rank: 3,
        region: "Targ Wood",
        fee: 100,
        days: undefined,
        questType: "Story Battle",
        canDispatch: false,
        canCancel: false,
        members: 5,
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 0,
            adaptability: 0,
        },
        objective: "Defeat all Foes!",
        law: "Forbidden: Ice – Weapons and abilities that use ice are forbidden.",
    enemies: [
        { name: "Yellow Wings", job: "White Monk", quantity: 1, notes: "PRIORITY 1: Bangaa dogman that dishes out heavy damage. Eliminate first." },
        { name: "Yellow Wings", job: "Black Mage", quantity: 1, notes: "PRIORITY 2: Forces you to spread out. Kill so you can gang up safely." },
        { name: "Yellow Wings", job: "Archer", quantity: 1, notes: "Boosts and hits for extra damage. Third priority." },
        { name: "Yellow Wings", job: "Animist", quantity: 1, notes: "Uses 100% Wool whenever possible." },
        { name: "Yellow Wings", job: "Thief", quantity: 1, notes: "Steals your gil — kill or keep gil-light units away." },
    ],
        strategy: [       ],
        rewards: {
            gil: 1750,
            cp: 6,
            loot: "Lamia Scale ×2, Sanative Needle ×3, Earth Stone ×3"
        },
        notes: "",
        tags: ["story", "clan-fight"]
    },
    {
        id: "A1-14",
        arc: "A1",
        name: "A Voice from the Well",
        description: "Every night I hear what sounds like a woman's voice calling to me from the rear garden. I've just moved residences, and don't care to move again - nor do I have the funds if I wanted to. It's rather disturbing to say the least, and I'd appreciate it if someone would look into this. -Lacado, Townsperson",
        rank: 7,
        region: "Camoa",
        fee: 200,
        days: 20,
        questType: "Investigation",
        canDispatch: true,
        canCancel: true,
        members: 6,
        requiredTalents: {
            negotiation: 4,
            aptitude: 4,
            teamwork: 0,
            adaptability: 0,
        },
        dispatchRecommended: ["Defender"],
        objective: "Defeat all Foes!",
        law: "Forbidden: Ranged Weapons – Attacks with bows, greatbows, guns, hand-cannons, and cards are forbidden.",
    enemies: [
        { name: "Randomized Name", job: "Lamia", quantity: 3 },
        { name: "Randomized Name", job: "Lilith", quantity: 1, notes: "Yellow Lamia-family enemy. Kiss can inflict several status effects, especially Confuse." },
    ],
        battlefield: [
            "Two Lamias begin near the party; the Lilith starts farther away.",
        ],
        strategy: [            "Lamia-family Kiss can inflict several status effects, especially Confuse, so defeat the nearby Lamias quickly.",       ],
        rewards: {
            gil: 1160,
            cp: 14,
            loot: "Rat Tail ×2, Bat Tail ×2, Bomb Shell ×4"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "A1-15",
        arc: "A1",
        name: "The Star Seal",
        description: "Have you heard of the \"Stone with No Name\"? Those philistines at the Akademy won't hear a word of it, but I think the Stone bears a message from the distant past. According to legend, holding the Star Seal to the Stone takes one to a hidden land, protected by watchful guardians. I ask you to find the truth. -Mauri, No-name researcher",
        rank: 8,
        region: "Targ Wood",
        fee: 200,
        days: 20,
        questType: "Investigation",
        canDispatch: false,
        canCancel: true,
        members: 6,
        requiredTalents: {
            negotiation: 4,
            aptitude: 4,
            teamwork: 0,
            adaptability: 0,
        },
        objective: "Examine the Stone with No Name, then defeat all foes after the warp!",
        law: "Phase 1 forbidden: Lightning. Phase 2 forbidden: Ice.",
    enemies: [
        { name: "Randomized Name", job: "Baknamy", quantity: 2, notes: "One Baknamy guards the Stone with No Name in phase 1; another appears with the phase 2 enemy group after the warp." },
        { name: "Randomized Name", job: "Wolf", notes: "Phase 2 enemy group after examining the Stone." },
        { name: "Randomized Name", job: "Sprite", notes: "Phase 2 enemy group after examining the Stone. Remember that Ice is forbidden in this phase." },
        { name: "Randomized Name", job: "Werewolf", quantity: 1, notes: "Phase 2 threat after the warp." },
    ],
        battlefield: [
            "Two-part mission: phase 1 has one chest on the Targ Wood map before examining the Stone.",
            "After examining the Stone, the clan warps to a second battle area with another chest.",
        ],
        strategy: [
            "Phase 1: defeat or move past the single Baknamy, collect the chest, then examine the Stone with No Name.",      ],
        rewards: {
            gil: 440,
            cp: 16,
            loot: "Molting ×2, Large Feather ×1, Soul Ceffyl ×5"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "A1-16",
        arc: "A1",
        name: "You Say Tomato",
        description: "You say tomato, I say kill them all! Why kill vegetables, you ask? Har! Did I mention quivering stalks, or slavering fangs? I was out for a stroll the other day and one bit clean through me britches! I doubt me or me britches are the only victims here. Help! -Gusah, Greengrocer",
        rank: 5,
        region: "Camoa",
        fee: 100,
        days: undefined,
        questType: "Story Battle",
        canDispatch: false,
        canCancel: false,
        members: 5,
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 0,
            adaptability: 0,
        },
        objective: "Defeat all Foes!",
        law: "Forbidden: Lightning – Weapons and abilities that use lightning are forbidden.",
    enemies: [
        { name: "Randomized Name", job: "Deadly Nightshade", quantity: 4, notes: "The 'tomatoes' — weak, no real challenge. Three sit on the right side of the map." },
        { name: "Randomized Name", job: "Alraune", quantity: 1, notes: "Strongest foe ('hornhead'). Toxic attacks deal sustained damage. Kill last." },
    ],
        strategy: [      ],
        rewards: {
            gil: 560,
            cp: 10,
            loot: "Fury Fragments ×2, Silk Thread ×2, Rabbit Pelt ×2"
        },
        notes: "",
        tags: ["story", "escort-adjacent"]
    }
];
