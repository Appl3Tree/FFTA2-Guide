// src/data/missions/storyOptional.A1.ts
// Arc A1 optional missions, accurately transcribed from Side_Quests.txt

import type { Mission } from "../../types/ffta2";

export const OPTIONAL_MISSIONS_A1: Mission[] = [
    {
        id: "A1-02",
        arc: "A1",
        name: "Reagent Run",
        description: "The muskmallow, favoured herb for treatment of ague, is again in season. Seeking herbalists to venture into Targ Wood and procure a upply. No previous experience required. Jylland Apothecary's League",
        rank: 8,
        region: "Muskmallow Field",
        fee: 200,
        days: 20,
        questType: "Escort",
        canDispatch: true,
        canCancel: true,
        members: 6,
        requiredTalents: {
            negotiation: 0,
            aptitude: 2,
            teamwork: 0,
            adaptability: 4,
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
            "The battlefield contains trap tiles that pose hazards",
        ],
        strategy: [
            "Reach and examine the muskmallow sparkle to collect the sample; you do not need to defeat every enemy if the route is clear.",
            "Avoid knockback attacks because they break the law. Use regular damage, magick, and status control while moving toward the sample.",
            "Dreamhares can annoy or delay units and Baknamy can drain MP, so clear only the enemies blocking your path.",
        ],
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
        questType: "Escort",
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
            "No combat — this is a pure trade. Bring Cactus Fruit ×1 and exchange it at the Targ Wood location.",
            "Pick up Cactus Fruit from Reagent Run (A1-02) or from monsters that drop it; don't send it all to the Bazaar.",
        ],
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
        description: "I seek someone to deliver medicine to a small village in Targ Wood. I would go myself, but there are those who would steal my secrets - as one who crafts potent potables - and it is deemed dangerous for me to go out and about. Please, this one favour I beg of you. Mack, Salve-Maker",
        rank: 16,
        region: "Moorabella, Targ Wood",
        fee: 300,
        days: 20,
        questType: "Delivery",
        canDispatch: false,
        canCancel: true,
        members: 1,
        prerequisite: "The First Step",
        requiredTalents: {
            negotiation: 4,
            aptitude: 0,
            teamwork: 0,
            adaptability: 0,
        },
        enemies: [],
        strategy: [
            "Non-combat delivery route: accept in Moorabella, then deliver Mack's medicine to the small village in Targ Wood.",
            "Only one member is needed and no carried item is consumed from inventory.",
        ],
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
        description: "It's nearly my mother's birthday, and I want to give her some flowers as a gift, kupo. I need someone to father some pretty, pink flowers for the bouquet. Genne, Devoted Son",
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
            "Delivery mission — no combat. Bring Prima Petal ×1 and deliver it at the Camoa location.",
            "Prima Petal can be obtained from Reagent Run or as monster loot in Targ Wood-area missions.",
        ],
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
        description: "Some of our younger clan members have been carrying on in the pub, disturbing the peace, as it were. I reckon it's best to teach a good lesson now, and nip the problem in the bud. That's where you come in. Give 'em a good thrashing for me! Criek, Clan Criek leader",
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
        objective: "Defeat your Foes",
        law: "Forbidden: Ice – Weapons and Abilities that use Ice are Forbidden.",
    enemies: [
        { name: "Randomized Name", job: "Fencer", quantity: 1, notes: "Has Poison ability — prioritize early." },
        { name: "Randomized Name", job: "Archer", quantity: 1, notes: "Ranged pressure from the pub floor. Remove after the White Monk/Fencer if it targets casters." },
        { name: "Randomized Name", job: "Warrior", quantity: 1, notes: "Straightforward melee damage. Keep away from fragile units." },
        { name: "Randomized Name", job: "Soldier", quantity: 1, notes: "Durable tank. Lowest priority once damage and status threats are controlled." },
        { name: "Randomized Name", job: "Thief", quantity: 1, notes: "Fast nuisance unit. Watch for item or gil theft if the fight drags." },
        { name: "Randomized Name", job: "White Monk", quantity: 1, notes: "Air Render can hit from range and deal solid damage." },
    ],
        strategy: [
            "Pub setting — the first pub fight in the game, with all the hazard tiles that entails.",
            "None of the enemies use magic, which is a significant advantage for your casters.",
            "Prioritize the White Monk (Air Render) and the Fencer (Poison) first — their abilities are the biggest threats.",
            "Take down the Warrior and Archer next; they hit hard but are straightforward.",
            "The Soldier is purely a tank — save it for last.",
            "Ice abilities and weapons are banned — use fire, lightning, physical, or neutral options.",
        ],
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
        description: "Oh, fie on him! I chased down a marked thief, and almost has him, too, when one of his traps tripped me up! Someone please bring him in! Finnes, Watch Chief",
        rank: 33,
        region: "Fluorgis",
        fee: 500,
        days: 20,
        questType: "Satisfy Petitioner",
        canDispatch: true,
        canCancel: true,
        members: 6,
        requiredTalents: {
            negotiation: 15,
            aptitude: 0,
            teamwork: 0,
            adaptability: 15,
        },
        objective: "Defeat all Foes and Destroy all Traps!",
        law: "Forbidden: Not Moving 3 Tiles – Each unit must move exactly 3 tiles before ending its turn.",
    enemies: [
        { name: "Randomized Name", job: "Berserker", quantity: 2, notes: "Seeq Berserkers with Hone Senses, Smite of Rage, Furore, and Ground Shaker." },
        { name: "Randomized Name", job: "Seeq", quantity: 3, notes: "Additional Seeq in various jobs." },
    ],
        battlefield: [
            "The battlefield contains trap tiles that pose hazards and must be destroyed.",
        ],
        strategy: [
            "Each unit must move exactly 3 tiles before ending their turn — count carefully or you'll incur a judge penalty.",
            "Use the forced movement to your advantage: plan routes that let you close on enemies efficiently.",
            "Seeq Berserkers hit extremely hard with Smite of Rage and Ground Shaker — don't let them act freely.",
            "Destroy traps as you advance; they'll hurt your own units if ignored.",
            "Ranged and magic users can attack from their mandatory 3-tile position without needing to engage directly."
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
        description: "In response to monster attacks in the region outlying the city proper, we set a number of traps to rid ourselves of the beasts once and for all. Alas, the traps had no effect. Worse still, they now pose a danage to our citizenry. Please destroy these traps before they can do any real harm. Camoa Ministry of Wildlife",
        rank: 12,
        region: "Targ Wood",
        fee: 300,
        days: 20,
        questType: "Satisfy Petitioner",
        canDispatch: true,
        canCancel: true,
        members: 6,
        requiredTalents: {
            negotiation: 4,
            aptitude: 0,
            teamwork: 0,
            adaptability: 4,
        },
        objective: "Destroy the Traps!",
        law: "Forbidden: > 50 Damage – Dealing > 50 Damage is forbidden.",
    enemies: [
        { name: "Randomized Name", job: "Sprite", quantity: 5 },
        { name: "Randomized Name", job: "Banshee", quantity: 1, notes: "More dangerous than the Sprites — eliminate it when you can." },
    ],
        battlefield: [
            "The battlefield has trap tiles to destroy (the primary objective).",
            "Treasure chests are present — grab them before destroying the traps.",
        ],
        strategy: [
            "Kill all enemies before destroying the traps — clearing the field gives you time to loot the treasure chests safely.",
            "The >50 Damage law sounds restrictive, but at this rank your party likely won't overkill low-level Sprites anyway.",
            "Sprites and the Banshee are relatively low-level; focus fire and they fall quickly.",
            "After clearing the enemies, destroy the trap tiles to complete the mission.",
        ],
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
        rank: 6,
        region: "Targ Wood",
        fee: 100,
        days: 20,
        questType: "Battle",
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
        strategy: [
            "You start at a level disadvantage. Kill the White Monk (dogman) first, then the Black Mage, then the Archer, leaving the Animist and Thief for last.",
            "No Ice (law) — use fire, lightning, physical, or holy options instead.",
        ],
        rewards: {
            gil: 1750,
            cp: 6,
            loot: "Lamia Scale ×2, Sanative Needle ×3, Earth Stone ×3"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "A1-14",
        arc: "A1",
        name: "A Voice from the Well",
        description: "Every night I hear what sounds like a woman's voice calling to me from the rear garden. I've just moved residences, and don't care to move again - nor do I have the funds if I wanted to. It's rather disturbing to asy the least, and I'd appreciate it if someone would look into this. Lacado, Townsperson",
        rank: 7,
        region: "Camoa",
        fee: 200,
        days: 20,
        questType: "Escort",
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
        { name: "Randomized Name", job: "Lilith", quantity: 1, notes: "Evolved form of Lamia. Uses Night — puts all units in range to sleep, including your own." },
    ],
        battlefield: [
            "Two treasure chests on the map — collect them during the fight.",
        ],
        strategy: [
            "Ranged weapons (bows, guns, etc.) are banned — shift archers and fusiliers to melee or magic roles.",
            "The Lilith's Night ability puts all nearby units to sleep, including yours. Spread your party to limit how many get caught at once.",
            "Blue Mages can learn Night from the Lilith if hit by it — a useful note if you're building one.",
            "If a unit wakes from sleep, have another ally wake them with a normal attack to save the lost turn.",
            "Magical ranged attacks (spells) are unaffected by the law — mages remain fully effective.",
            "Collect the treasure chests before finishing the last enemy.",
        ],
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
        description: "Have you hard of the",
        rank: 8,
        region: "Targ Wood",
        fee: 200,
        days: 20,
        questType: "Battle",
        canDispatch: false,
        canCancel: true,
        members: 6,
        requiredTalents: {
            negotiation: 4,
            aptitude: 4,
            teamwork: 0,
            adaptability: 0,
        },
        objective: "Examine the Stone with no Name!",
        law: "Forbidden: Lightning – Weapons and Abilities that use Lightning are forbidden.",
    enemies: [
        { name: "Randomized Name", job: "Baknamy", quantity: 3, notes: "Goblin-type enemies guarding the Stone with No Name." },
    ],
        battlefield: [
            "Two treasure chests on the map — collect them during the fight.",
        ],
        strategy: [
            "Defeat the Baknamy guarding the area, then examine the Stone with No Name to complete the mission.",
            "Two treasure chests are present — grab them before finishing the last enemy.",
            "Lightning attacks and weapons are banned; use fire, ice, physical, or holy options instead.",
            "Baknamy at this point are manageable — straightforward combat.",
        ],
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
        description: "You say tomato, I say kill them all! Why kill vegetables, you ask? Har! Did I mention quivering stalks, or slavering fangs? I was for a stroll the other day and one bit clean through me britches! I doubt me or me britches are the only victims here. Help! Gusah, Greengrocer",
        rank: 10,
        region: "Camoa",
        fee: 100,
        days: 20,
        questType: "Battle",
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
        strategy: [
            "Adelle (a female Thief) joins as a 7th ally for this battle, giving you a numbers edge.",
            "Take down the three Deadly Nightshades on the right first and rush a fast unit to grab the treasure chest in the lower-right corner. Then clear the rest and finish the Alraune.",
            "No Lightning (law) — one of the easiest fights in the game.",
        ],
        rewards: {
            gil: 560,
            cp: 10,
            loot: "Fury Fragments ×2, Silk Thread ×2, Rabbit Pelt ×2"
        },
        notes: "",
        tags: ["optional"]
    }
];
