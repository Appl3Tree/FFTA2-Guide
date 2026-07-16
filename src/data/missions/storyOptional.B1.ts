// src/data/missions/storyOptional.B1.ts
// Arc B1 optional missions, accurately transcribed from Side_Quests.txt

import type { Mission } from "../../types/ffta2";

export const OPTIONAL_MISSIONS_B1: Mission[] = [
    {
        id: "B1-01",
        arc: "B1",
        name: "A Step Further",
        description: "I seek someone to escort me to Targ Wood, providing protection as necessary. I am off to work for the Imperial League of Physicians in Rozarria, and I would like to visit the places dear to my heart one last time before I leave. Thank you. -Mack, Scholar at large",
        rank: 19,
        region: "Targ Wood",
        fee: 300,
        days: 20,
        questType: "Escort",
        canDispatch: false,
        canCancel: true,
        members: 5,
        prerequisite: "Making Music; The Next Step; visit Moorabella",
        requiredTalents: {
            negotiation: 22,
            aptitude: 0,
            teamwork: 22,
            adaptability: 0,
        },
        objective: "Protect your Charge and Defeat all Foes!",
        law: "Forbidden: Solitude – Ending the turn without a unit in an adjacent tile is forbidden.",
    enemies: [
        { name: "Randomized Name", job: "Time Mage", quantity: 1, notes: "Uses Slow, Stop, and Reflect — highest priority target." },
        { name: "Randomized Name", job: "Black Mage", quantity: 1, notes: "Uses Fira, Firaga, and Geomancy — priority target once Time Mage is down." },
        { name: "Randomized Name", job: "Arcanist", quantity: 1, notes: "Uses Gravity, Lvl. 3 Dark, and Shadowflare." },
        { name: "Randomized Name", job: "Seer", quantity: 1, notes: "Uses Cura, Fira, Esuna, and Blood Price." },
        { name: "Randomized Name", job: "Green Mage", quantity: 1, notes: "Uses Oil and Sleep." },
        { name: "Randomized Name", job: "Scholar", quantity: 1, notes: "Uses Thunder and Shadow Tomes." },
    ],
        strategy: [            "Eliminate the Black Mage, Time Mage, and Scholar quickly; their long-range magick and Stop or Slow pressure are the main dangers.",        ],
        rewards: {
            gil: 4690,
            cp: 38,
            loot: "Prime Tanned Hide ×6"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "B1-02",
        arc: "B1",
        name: "The Last Step",
        description: "-Trade Requested- I will trade my magickal earrings for the Ocktor Tome of Medicine in your possession. We will do the deal in Targ Wood. Mack, White Mage",
        rank: 15,
        region: "Targ Wood",
        fee: 300,
        days: 20,
        questType: "Delivery",
        canDispatch: false,
        canCancel: true,
        members: 1,
        prerequisite: "A Request; A Step Further; read What's Really Important notice; visit any town",
        requiredItems: ["Ocktor Tome of Medicine ×1"],
        requiredTalents: {
            negotiation: 44,
            aptitude: 0,
            teamwork: 0,
            adaptability: 0,
        },
    enemies: [],
        strategy: [
            "Trade the Ocktor Tome of Medicine for Mack's magickal earrings in Targ Wood.",        ],
        rewards: {
            gil: 4260,
            cp: 30,
            loot: "Prime Tanned Hide ×1",
            other: "Earrings of the Dead"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "B1-03",
        arc: "B1",
        name: "Sun-Ripened Mayhem",
        description: "My fields are overrun with cockatrices! I need someone to save my tomatoes! I can't offer much in the way of a reward, but I'm desperate - those tomatoes are special! Oh, and cockatrices spook real easy, so don't bring a whole bunch of folk, or they'll just run off and hide. Farmer Colt",
        rank: 7,
        region: "Camoa",
        fee: 200,
        days: 20,
        questType: "Escort",
        canDispatch: true,
        canCancel: true,
        members: 4,
        prerequisite: "Wanted: Ugohr; visit Graszton during Goldsun",
        requiredTalents: {
            negotiation: 7,
            aptitude: 0,
            teamwork: 7,
            adaptability: 0,
        },
        dispatchRecommended: ["Defender"],
        objective: "Protect the Tomatoes and Defeat all Foes!",
        law: "Forbidden: Targeting All Units – Actions targeting all units at once are forbidden.",
    enemies: [
        { name: "Randomized Name", job: "Cockatrice", quantity: 4, notes: "Defeat all 4. Do not harm the 3 Deadly Nightshade allies (the tomatoes)." },
    ],
        strategy: [      ],
        rewards: {
            gil: 910,
            cp: 14,
            loot: "Tomato Stalk ×2, Iron Carapace ×3, Bitter Sap ×4"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "B1-05",
        arc: "B1",
        name: "Beetle in a Haystack",
        description: "I was out walking my pet scarab beetle, Nero, and I lost him! I only took my eyes off him for a second, but he managed to scamper off somewhere. A friend of mine gave him to me before he moved away, and Nero's all I have to remember him by now. Please help me get him back! I polish him real good every day, so his shell really shines. Just look for something shiny on the ground and you should find him in no time! Letty",
        rank: 7,
        region: "Camoa",
        fee: 200,
        days: 20,
        questType: "Satisfy Petitioner",
        canDispatch: true,
        canCancel: true,
        members: 6,
        prerequisite: "The Yellow Wings",
        requiredTalents: {
            negotiation: 4,
            aptitude: 0,
            teamwork: 0,
            adaptability: 0,
        },
        objective: "Find the Scarab Beetle!",
        law: "Forbidden: Lightning – Weapons and Abilities that use lightning are forbidden.",
    enemies: [
        { name: "Randomized Name", job: "Axebeak", quantity: 2, notes: "Initial enemies. Focus on finding the Scarab Beetle by examining sparkle points on the map." },
        { name: "Randomized Name", job: "Wolf", quantity: 2, notes: "Initial wave." },
    ],
        strategy: [
            "Find Nero by examining shiny sparkle points, with most of the search spots across the two bridges on the far side of the map.",       ],
        rewards: {
            gil: 440,
            cp: 14,
            loot: "Ball Moss ×1, Wind Stone ×3, Pointed Horn ×1"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "B1-06",
        arc: "B1",
        name: "Wayward Drake",
        description: "I awoke one morning to find my drake, Goud, missing without a trace. I haven't the slightest notion where he might have gone. Well, that's not entirely true. I've heard rumor that a drake was recently sighted in the Aldanna Range. I need someone to venture there and discover whether or not it is my dear Goud. -Mr. Grann",
        rank: 15,
        region: "The Aldanna Range",
        fee: 300,
        days: 20,
        questType: "Satisfy Petitioner",
        canDispatch: true,
        canCancel: true,
        members: 6,
        prerequisite: "Wanted: Gilmunto; Beetle in a Haystack",
        dispatchRecommended: ["Arcanist"],
        requiredTalents: {
            negotiation: 8,
            aptitude: 0,
            teamwork: 0,
            adaptability: 8,
        },
        objective: "Weaken Goud and Defeat all Foes!",
        law: "Forbidden: Ice – Weapons and abilities that use ice are forbidden.",
    enemies: [
        { name: "Goud", job: "Fire Drake", quantity: 1, notes: "TARGET: Weaken to HP Critical — do NOT kill. Use abilities (near-zero crit chance) rather than normal attacks to avoid an accidental KO. Save it for last." },
        { name: "Randomized Name", job: "Thunder Drake", quantity: 2, notes: "Defeat these. Enemies hold the high ground but have no ranged units." },
        { name: "Randomized Name", job: "Werewolf", quantity: 1, notes: "Defeat. Fast melee." },
    ],
        strategy: [
            "Clear the Thunder Drakes and Werewolf first, then carefully weaken Goud (the Fire Drake) to HP Critical without killing it.",        ],
        rewards: {
            gil: 1330,
            cp: 30,
            loot: "Pointed Horn ×2, Dark Stone ×5, Dragon Bone ×2"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "B1-07",
        arc: "B1",
        name: "The White of Its Eye",
        description: "My pet's gone and run away again. How many times does this make? I've lost count! Her name's Chari, and I saved her from the other bloody orbs that picked on her because she was a different color. You'd think she'd be a little more grateful, but she just keeps running away. Someone help me find her! She has a beautiful white...coat? It should make her easy to tell apart. -Fes",
        rank: 21,
        region: "The Rupie Mountains",
        fee: 400,
        days: 20,
        questType: "Escort",
        canDispatch: true,
        canCancel: true,
        members: 6,
        prerequisite: "Pearls in the Deep; Wayward Drake",
        requiredTalents: {
            negotiation: 11,
            aptitude: 0,
            teamwork: 11,
            adaptability: 0,
        },
        dispatchRecommended: ["Defender"],
        objective: "Protect Chari and Defeat all Foes!",
        law: "Forbidden: Fire, Ice, Lightning – Weapons and abilities that use fire, ice, or lightning are forbidden.",
    enemies: [
        { name: "Randomized Name", job: "Floating Eye", quantity: 3, notes: "Defeat these hostile eyes. Do not harm Chari, the white Bloody Orb ally; heal Chari if needed." },
    ],
        strategy: [
            "Protect Chari, the white Bloody Orb. Do not hit Chari with area attacks or the elemental damage banned by the law.",       ],
        rewards: {
            gil: 4920,
            cp: 42,
            loot: "Crusite Alloy ×3"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "B1-08",
        arc: "B1",
        name: "Flown the Coop",
        description: "I was taking one of the cockatrices for a walk in the Menagerie grounds when it flew into a frenzy and lashed out at me with its beak. Before I knew what had happened, it had fluttered over the pen fence and run away. This is the second time one of our monsters has gotten away from me in recent days, and if Mr. Grann finds out, I won't hear the end of it! I need someone to recover the cockatrice before anyone notices it's missing. It answers to the name of Okta. -Keeper Lloyd, Grann's Menagerie",
        rank: 25,
        region: "Fluorgis",
        fee: 400,
        days: 20,
        questType: "Satisfy Petitioner",
        canDispatch: true,
        canCancel: true,
        members: 6,
        prerequisite: "Grounded!; The White of Its Eye; visit Fluorgis",
        requiredTalents: {
            negotiation: 15,
            aptitude: 0,
            teamwork: 0,
            adaptability: 15,
        },
        dispatchRecommended: ["Arcanist"],
        objective: "Weaken Okta and Defeat all Foes!",
        law: "Forbidden: Bladed Weapons – Attacks with knives, swords, blades, sabers, katanas, axes, knightswords, greatswords, and broadswords are forbidden.",
    enemies: [
        { name: "Okta", job: "Cockatrice", quantity: 1, notes: "Objective: weaken to HP critical — do NOT kill. Use water-element attacks. No melee blades allowed." },
        { name: "Randomized Name", job: "Cockatrice", quantity: 3, notes: "Kill these. Use ranged units (Hunters with Sidewinder) and water-based magick." },
    ],
        battlefield: [
            "Several hidden traps sit along the path down to the lower area.",
        ],
        strategy: [
            "Defeat the three regular Cockatrices first, then weaken Okta to HP Critical without killing it.",       ],
        rewards: {
            gil: 4500,
            cp: 50,
            loot: "Mind Ceffyl ×6"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "B1-09",
        arc: "B1",
        name: "Prepared with Love",
        description: "My husband's forgotten his lunch again! After all the work I put into making it ... I need someone to take it to him while it's still fresh. Chermie",
        rank: 6,
        region: "Targ Wood, Camoa",
        fee: 200,
        days: 20,
        questType: "Delivery",
        canDispatch: false,
        canCancel: true,
        members: 1,
        prerequisite: "The Yellow Wings; visit Camoa",
        requiredTalents: {
            negotiation: 4,
            aptitude: 0,
            teamwork: 0,
            adaptability: 0,
        },
    enemies: [],
        strategy: [
            "Delivery mission — no combat. Take the lunch from Targ Wood to Chermie's husband in Camoa.",
        ],
        rewards: {
            gil: 350,
            cp: 12,
            loot: "Cruzle Brass ×6, Coral Fragments ×1, Water Stone ×4"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "B1-10",
        arc: "B1",
        name: "Foodstuffs: Texture",
        description: "Foodstuffs needed. You will be required to catch specific monsters at a specific location. The details are as follows: - Must have fluffy white fur. - Enough to feed two. - To be used as an appetizer, one per serving. Too many is no good. Too few is also no good. Poison Tasters Guild",
        rank: 8,
        region: "Targ Wood",
        objective: "Procure the requested ingredients!",
        law: "Forbidden: Fire - Weapons and abilities that use fire are forbidden.",
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
    enemies: [
        {
            name: "Randomized Name",
            job: "Dreamhare",
            quantity: 2,
            notes: "Requested fluffy ingredient targets. Defeat exactly the required Dreamhare count and avoid fire.",
            abilities: {
                A1: {
                    setId: "enticement",
                    abilityIds: [
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
            job: "Dreamhare",
            quantity: 1,
            notes: "Extra Dreamhare with War Dance and Unscarred. Do not overkill beyond the requested amount.",
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
                P: "unscarred"
            },
            equipment: [
            ]
        },
        {
            name: "Randomized Name",
            job: "Hoppy Bunny",
            quantity: 1,
            notes: "Wrong ingredient target. Uses Blind/Silence and Critical: Berserk; control without counting it as a required kill.",
            abilities: {
                A1: {
                    setId: "enticement",
                    abilityIds: [
                        "go-go-dance",
                        "hip-attack",
                    ]
                },
                A2: {
                    setId: "green-magick",
                    abilityIds: [
                        "blind",
                        "silence",
                    ]
                },
                R: "critical-berserk",
                P: null
            },
            equipment: [
            ]
        },
        {
            name: "Randomized Name",
            job: "Hoppy Bunny",
            quantity: 1,
            notes: "Wrong ingredient target with Sleep and Critical: Berserk. Avoid unnecessary kills while gathering the exact texture request.",
            abilities: {
                A1: {
                    setId: "enticement",
                    abilityIds: [
                        "hip-attack",
                    ]
                },
                A2: {
                    setId: "green-magick",
                    abilityIds: [
                        "sleep",
                    ]
                },
                R: "critical-berserk",
                P: null
            },
            equipment: [
            ]
        },
    ],
        strategy: [      ],
        rewards: {
            gil: 620,
            cp: 16,
            loot: "Animal Bone ×3, Chocobo Skin ×1, Rat Pelt ×2"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "B1-11",
        arc: "B1",
        name: "Foodstuffs: Aroma",
        description: "Foodstuffs needed. You will be required to catch specific monsters at a specific location. The details are as follows: - Green and uniquely aromatic - Enough to feed two - Boil down considerably, so two per serving Too many is no good. Too few is also no good. Poison Tasters Guild",
        rank: 19,
        region: "Zedlei Forest",
        fee: 300,
        days: 20,
        questType: "Satisfy Petitioner",
        canDispatch: true,
        canCancel: true,
        members: 6,
        prerequisite: "Wanted: Gilmunto; Foodstuffs: Texture",
        requiredTalents: {
            negotiation: 8,
            aptitude: 0,
            teamwork: 0,
            adaptability: 8,
        },
        objective: "Procure the Requested Ingredients",
        law: "Forbidden: Knockback – Actions that knock the target back are forbidden.",
    enemies: [
        { name: "Randomized Name", job: "Malboro", quantity: 4, notes: "Objective ingredient target. Kill exactly four Malboros, no more and no less." },
        { name: "Randomized Name", job: "Alraune", quantity: 1, notes: "Wrong ingredient target; defeat only if it blocks movement or threatens a key unit." },
        { name: "Randomized Name", job: "Deadly Nightshade", quantity: 1, notes: "Wrong ingredient target; defeat only if it blocks movement or threatens a key unit." },
    ],
        strategy: [
            "Kill exactly four Malboros, then talk to the apprentice to complete the request.",            "Alraunes and Deadly Nightshades can be defeated for safety or to cycle spawns, but they are not the requested ingredient.",
        ],
        rewards: {
            gil: 2800,
            cp: 38,
            loot: "Crusader Tonic ×2, Waltwood ×3, Kempas ×2"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "B1-12",
        arc: "B1",
        name: "Foodstuffs: Appearance",
        description: "Foodstuffs needed. You will be required to catch specific monsters at a specific location. The details are as follows: -Must be yellow and lustrous. -Enough to feed nine. -One is enough for three servings. Too many is no good. Too few is also no good. -Poison Tasters Guild \"The Iron Stomach\"",
        rank: 29,
        region: "The Bisga Greenlands",
        fee: 400,
        days: 20,
        questType: "Satisfy Petitioner",
        canDispatch: true,
        canCancel: true,
        members: 6,
        prerequisite: "Rumors Abound; Foodstuffs: Aroma",
        requiredTalents: {
            negotiation: 18,
            aptitude: 0,
            teamwork: 0,
            adaptability: 18,
        },
        objective: "Procure the requested ingredients!",
        law: "Forbidden: Fire, Ice, Lightning – Weapons and abilities that use fire, ice, or lightning are forbidden.",
    enemies: [
        { name: "Randomized Name", job: "Yellow Jelly", quantity: 3, notes: "Objective ingredient target. Kill exactly three Yellow Jellies." },
        { name: "Randomized Name", job: "Assorted Flan", quantity: 1, notes: "Wrong ingredient targets appear alongside the Yellow Jellies; defeat them only to cycle respawns or clear danger." },
    ],
        strategy: [
            "Kill exactly three Yellow Jellies, then talk to the apprentice to end the quest successfully.",       ],
        rewards: {
            gil: 5920,
            cp: 58,
            loot: "Waterwyrd Crystal ×1"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "B1-14",
        arc: "B1",
        name: "Our Playground",
        description: "Some old creeps moved in on our playground! The place with the cool old well! Now my old woman's sayin' it's a good opportunity for me to study and stuff. Can you believe it!? Someone drive those creeps away! -Obuta, Camoa Kids Leader",
        rank: 7,
        region: "Camoa",
        fee: 200,
        days: 20,
        questType: "Battle",
        canDispatch: true,
        canCancel: true,
        members: 6,
        prerequisite: "Cilawa the Gluttonous, Rosefire",
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 4,
            adaptability: 4,
        },
        objective: "Defeat all Foes!",
        law: "Forbidden: Ice – Weapons and Abilities that use ice are forbidden.",
        enemies: [
            { name: "Randomized Name", job: "Yellow Jelly", quantity: 1, notes: "Enemy from the Zedlei Consortium group." },
            { name: "Randomized Name", job: "Malboro", quantity: 1, notes: "Status breath support. Avoid clustering while pushing through the Consortium group." },
            { name: "Randomized Name", job: "Grenade", quantity: 1, notes: "Eliminate early — magical ranged attacker." },
            { name: "Randomized Name", job: "Berserker", quantity: 1, notes: "Physical bruiser. Kite or disable if it pulls attention away from safer targets." },
            { name: "Randomized Name", job: "Ranger", quantity: 2, notes: "Ranged pressure and trap-planters. Remove them if traps start cutting off clean movement." },
        ],
        battlefield: [
            "The Rangers can plant traps as they move; avoid stepping where a Ranger recently acted.",
        ],
        strategy: [
            "Defeat the full Zedlei Consortium group: Yellow Jelly, Grenade, Malboro, Berserker, and two Rangers.",       ],
        rewards: {
            gil: 700,
            cp: 14,
            loot: "Insect Husk ×2, Sanative Needle ×6, Wind Stone ×9"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "B1-15",
        arc: "B1",
        name: "Mushroom Chef",
        description: "I am a mushroom chef by trade. Know any dish with fungi in it? I cook it. So you can imagine why I'd want one of those fabled Baptiste mushrooms. Careful though, there are poisonous mushrooms growing in the same place. I'm sure you'll be fine, of course. Just try them when you're out there and you'll know the difference. Sawah, Mushroom Chef",
        rank: 11,
        region: "Baptiste Hill",
        fee: 300,
        days: 20,
        questType: "Item Recovery",
        canDispatch: true,
        canCancel: true,
        members: 6,
        prerequisite: "You Say Tomato, Mistleaf",
        requiredTalents: {
            negotiation: 6,
            aptitude: 0,
            teamwork: 0,
            adaptability: 0,
        },
        objective: "Find a Baptiste Mushroom!",
        law: "Forbidden: Back Attack – Attacking a unit from behind is forbidden.",
    enemies: [
        { name: "Randomized Name", job: "Lilith", quantity: 1, notes: "Uses Night (sleeps all nearby units). Examine sparkle tiles to find the Baptiste Mushroom." },
        { name: "Randomized Name", job: "Lamia", quantity: 1, notes: "Status-oriented support monster. Keep it away from the unit checking mushrooms." },
        { name: "Randomized Name", job: "Sprite", quantity: 1, notes: "Fragile caster-type monster. Remove if it threatens the search route." },
        { name: "Randomized Name", job: "Dreamhare", quantity: 1, notes: "Enticement nuisance that can delay the search. Lower priority than Lilith." },
    ],
        battlefield: [
            "Several mushroom sparkle spots are present; one is the Baptiste Mushroom and the others are poisonous decoys.",
        ],
        strategy: [
            "Search mushroom sparkles until you find the Baptiste Mushroom. The mission ends once the correct mushroom is found.",       ],
        rewards: {
            gil: 980,
            cp: 22,
            loot: "Aged Linen Thread ×3, Cottonflue ×4, Coeurl Pelt ×3"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "B1-16",
        arc: "B1",
        name: "Showdown",
        description: "Clan Gully, I beg your assistance! No sooner had we succeeded in tracking down Klesta's demesne than Bowen disappeared! I fear he has gone to deal with the beast himself. We make haste to intercept him before it is too late, but I would ask that you secure for us some cloudy sap...it is a vital piece of our strategy for dealing with our flighty foe once and for all. Tweigel of House Bowen",
        rank: 24,
        region: "Targ Wood",
        fee: 400,
        days: 20,
        questType: "Defeat Mark",
        canDispatch: false,
        canCancel: true,
        members: 3,
        prerequisite: "Pearls in the Deep; Throw Down; I Got A Bad Feeling side quest; visit Graszton",
        requiredItems: ["Cloudy Sap ×1"],
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 11,
            adaptability: 11,
        },
        objective: "Defeat Klesta!",
        law: "Forbidden: Back Attack – Attacking a unit from behind is forbidden.",
    enemies: [
        { name: "Klesta", job: "Cockatrice", quantity: 1, notes: "Final Klesta fight. Has over 900 HP, attempts to flee at half health, then is grounded with Cloudy Sap." },
    ],
        strategy: [
            "Bring Cloudy Sap. Once Klesta reaches half health, it tries to flee and the sap grounds it so you can finish the fight.",
            "House Bowen arrives to help, but the win condition is still to defeat Klesta for good.",            "Back attacks are forbidden, so attack from the side or front even when Klesta turns away.",
        ],
        rewards: {
            gil: 3030,
            cp: 48,
            loot: "Cursed Coin ×5, Skull ×2, Vampyr Fang ×2"
            ,
            other: "Demon Feather"
        },
        notes: "",
        tags: ["optional"]
    }
];
