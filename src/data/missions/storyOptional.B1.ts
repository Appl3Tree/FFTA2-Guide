// src/data/missions/storyOptional.B1.ts
// Arc B1 optional missions, accurately transcribed from Side_Quests.txt

import type { Mission } from "../../types/ffta2";

export const OPTIONAL_MISSIONS_B1: Mission[] = [
    {
        id: "B1-01",
        arc: "B1",
        name: "A Step Further",
        description: "I seek someone to escort me to Targ Wood, providing protect as necessary. I am off to work for the Imperial League of Physicians in Rozarria, and I would like to visit the places dear to my heart one last time before I leave. Thank you. Mack, Scholar at Large",
        rank: 19,
        region: "Targ Wood",
        fee: 300,
        days: 20,
        questType: "Escort",
        canDispatch: false,
        canCancel: true,
        members: 5,
        prerequisite: "The Next Step",
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
        strategy: [
            "Keep Mack protected under the Solitude law: end each turn with an adjacent ally, including Mack's turns when possible.",
            "Eliminate the Time Mage first to stop Slow, Stop, and Reflect, then remove the Black Mage and Green Mage before their magick and status effects pile up.",
            "Bring Esuna or status recovery for Sleep/Oil and arrange the party in pairs so no unit accidentally ends a turn isolated.",
        ],
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
        prerequisite: "A Step Further",
        requiredItems: ["Ocktor Tome of Medicine ×1"],
        requiredTalents: {
            negotiation: 44,
            aptitude: 0,
            teamwork: 0,
            adaptability: 0,
        },
    enemies: [],
        strategy: [
            "Trade the Ocktor Tome of Medicine for Mack's magickal earrings in Targ Wood.",
            "Bring the tome and complete the trade route; there is no combat.",
        ],
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
        strategy: [
            "Protect the three Deadly Nightshade tomatoes. Do not target them with area attacks or friendly fire.",
            "Only the four Cockatrices need to be defeated. Keep the fight small and controlled so the tomatoes are not caught in crossfire.",
            "Targeting all units is forbidden, so avoid full-map or all-unit effects and use single-target attacks instead.",
        ],
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
        requiredTalents: {
            negotiation: 4,
            aptitude: 0,
            teamwork: 0,
            adaptability: 0,
        },
        objective: "Find the Scarab Beetle!",
        law: "Forbidden: Lightning – Weapons and Abilities that use lightning are forbidden.",
    enemies: [
        { name: "Randomized Name", job: "Axebeak", quantity: 2, notes: "Initial wave. Enemy reinforcements keep arriving — focus on finding the Scarab Beetle (examine sparkle points on the map)." },
        { name: "Randomized Name", job: "Wolf", quantity: 2, notes: "Initial wave." },
    ],
        battlefield: [
            "The battlefield contains trap tiles that pose hazards",
        ],
        strategy: [
            "Find Nero by examining shiny sparkle points; enemies keep arriving, so do not try to farm every reinforcement.",
            "Avoid lightning attacks and weapons because of the law. Use fire, ice, wind, earth, holy, dark, or physical damage instead.",
            "Clear Axebeaks and Wolves only when they block a search route, then keep checking sparkles until the Scarab Beetle is found.",
        ],
        rewards: {
            gil: 690,
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
        description: "I awoke one morning to find my drake, Goud, missing without a trace. I haven't the slightest notion where he might have gone. Well, that's not entirely true. I've heard rumour that a drake was recently sighted in the Aldanna Range. I need someone to venture there and discover whether or not it is my dear Goud. Mr. Grann",
        rank: 15,
        region: "The Aldanna Range",
        fee: 300,
        days: 20,
        questType: "Satisfy Petitioner",
        canDispatch: true,
        canCancel: true,
        members: 6,
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
            "Clear the Thunder Drakes and Werewolf first, then carefully weaken Goud (the Fire Drake) to HP Critical without killing it.",
            "No Ice (law). Use precise ability damage on Goud to control its HP.",
        ],
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
        description: "My pet's gone and run away again. How many times does this make? I've lost count! Her name's Chari, and I saved her from the other bloody orbs that picked on her because she was a different colour. You'd think she'd be a bit more grateful, but she just keeps running away. Someone help me find her! She has a beautiful white ... coat? It should make her easy to tell apart. Fes",
        rank: 21,
        region: "The Rupie Mountains",
        fee: 400,
        days: 20,
        questType: "Escort",
        canDispatch: true,
        canCancel: true,
        members: 6,
        prerequisite: "The Wayward Drake",
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
        { name: "Randomized Name", job: "Bloody Orb", quantity: 3, notes: "Defeat these. Do not harm Chari, the white Bloody Orb ally — heal it if needed, or let it use Vampire to self-sustain." },
    ],
        strategy: [
            "Protect Chari, the white Bloody Orb. Do not hit Chari with area attacks or the elemental damage banned by the law.",
            "Defeat the three hostile Bloody Orbs while keeping Chari alive. Heal Chari if it gets focused, or let it sustain itself with Vampire when safe.",
            "Fire, ice, and lightning are forbidden, so bring neutral physical attacks, non-banned magick, or monster-killer abilities.",
        ],
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
        description: "I was taking one of the cockatrices for a walk in the Menagerie grounds when it flew into a frenzy and lashed out at me with its beak. Before I knew what had happened, it had fluttered over the pen fence and run away. This is the second time one of our monsters has gotten away from me in recent days, and if Mr. Grann finds out, I won't hear the end of it! I need someone to recover the cockatrice before anyone notice it's missing. It answers to the name of Okta. Keeper Lloyd, Grann's Menagerie",
        rank: 25,
        region: "Fluorgis",
        fee: 400,
        days: 20,
        questType: "Satisfy Petitioner",
        canDispatch: true,
        canCancel: true,
        members: 6,
        prerequisite: "The White of Its Eye",
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
        strategy: [
            "Defeat the three regular Cockatrices first, then weaken Okta to HP Critical without killing it.",
            "Bladed weapons are forbidden, so avoid knives, swords, blades, sabers, katanas, axes, knightswords, greatswords, and broadswords.",
            "Use controlled non-bladed damage on Okta near the end; abilities are safer than critical-hit-prone normal attacks.",
        ],
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
        description: "Foodstuffs njeeded. You will be required to catch specific monsters at a specific location. The details are as follows: - Must have fluffy white fur. - Enough to feed two. - To be used as an appetizer, one per serving. Too many is no good. Too few is also no good. Poison Tasters Guild",
        rank: 8,
        region: "Targ Wood",
        objective: "Procure the requested ingredients!",
        law: "Fire: Weapons and abilities that use fire are forbidden.",
        fee: 200,
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
        strategy: [
            "Defeat exactly the two Dreamhares required for the ingredient request; killing too many or too few of the wrong fluffy targets fails the foodstuff condition.",
            "Do not use Fire attacks or fire-element weapons because of the law.",
            "The Hoppy Bunnies can inflict Blind, Silence, and Sleep, so either disable them without killing the needed count or keep status recovery ready while focusing the Dreamhares.",
        ],
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
        requiredTalents: {
            negotiation: 8,
            aptitude: 0,
            teamwork: 0,
            adaptability: 8,
        },
        objective: "Procure the Requested Ingredients",
        law: "Forbidden: Knockback – Actions that knock the target back are forbidden.",
    enemies: [
        { name: "Randomized Name", job: "Dreamhare", quantity: 2, notes: "OBJECTIVE: Kill exactly 2 Dreamhares. Do NOT kill the Hoppy Bunnies — only white Dreamhares count." },
        { name: "Randomized Name", job: "Hoppy Bunny", quantity: 3, notes: "Do not kill — wrong ingredient." },
    ],
        strategy: [
            "Kill exactly two Dreamhares. Do not defeat the Hoppy Bunnies or you will bring back the wrong ingredient.",
            "Knockback is forbidden, so use precise single-target attacks and avoid abilities with push effects.",
            "If Hoppy Bunnies get in the way, disable, immobilize, or route around them rather than killing them.",
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
        description: "Foodstuffs needed. You will be required to catch specific monsters at a specific location. The details are as follows: - Must be yellow and lustrous - Enough to feed nine - One is enough for three jellies Too many is no good. Too few is also no good. Poison Tasters Guild",
        rank: 29,
        region: "The Bisga Greenlands",
        fee: 400,
        days: 20,
        questType: "Satisfy Petitioner",
        canDispatch: true,
        canCancel: true,
        members: 6,
        requiredTalents: {
            negotiation: 18,
            aptitude: 0,
            teamwork: 0,
            adaptability: 18,
        },
        objective: "Procure the requested ingredients!",
        law: "Forbidden: Fire, Ice, Lightning – Weapons and abilities that use fire, ice, or lightning are forbidden.",
    enemies: [
        { name: "Randomized Name", job: "Malboro", quantity: 4, notes: "OBJECTIVE: Kill exactly 4 Malboros. Other enemies (Alraune, Deadly Nightshade) respawn indefinitely — ignore them." },
        { name: "Randomized Name", job: "Alraune", quantity: 2, notes: "Ignore — they respawn. Focus on Malboros only." },
        { name: "Randomized Name", job: "Deadly Nightshade", quantity: 2, notes: "Ignore — they respawn." },
    ],
        strategy: [
            "Kill exactly four Malboros to satisfy the ingredient request.",
            "Alraunes and Deadly Nightshades respawn indefinitely, so only defeat them when they block movement or threaten a key unit.",
            "Fire, ice, and lightning are forbidden. Use wind, water, earth, holy, dark, non-elemental abilities, or monster-killer attacks.",
        ],
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
        description: "Some old creeps moved in on our playground! The place with the cool odl well! Now my old woman's sayin' it's a good opportunity for me to study and stuff. Can you believe it? Someone drive those creeps away! Obuta, Camoa Kids Leader",
        rank: 7,
        region: "Camoa",
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
        objective: "Defeat all Foes!",
        law: "Forbidden: Ice – Weapons and Abilities that use ice are forbidden.",
    enemies: [
        { name: "Randomized Name", job: "Yellow Flan", quantity: 2, notes: "OBJECTIVE: Defeat the Yellow Flans. Enemy reinforcements keep arriving." },
        { name: "Randomized Name", job: "Malboro", quantity: 1, notes: "Status breath support. Avoid clustering while pushing toward the Yellow Flans." },
        { name: "Randomized Name", job: "Grenade", quantity: 1, notes: "Eliminate early — magical ranged attacker." },
        { name: "Randomized Name", job: "Berserker", quantity: 1, notes: "Physical reinforcement. Kite or disable if it pulls attention away from the Flans." },
        { name: "Randomized Name", job: "Ranger", quantity: 2, notes: "Ranged reinforcement pressure. Remove only if they block safe access to the Flans." },
    ],
        battlefield: [
            "The battlefield contains trap tiles that pose hazards",
        ],
        strategy: [
            "Defeat the two Yellow Flans to clear the mission. Enemy reinforcements continue arriving, so focus on the objective instead of trying to wipe every unit.",
            "Avoid ice attacks and weapons because of the law. Use fire, lightning, wind, physical, or non-elemental damage.",
            "The Grenade is the most disruptive support enemy; remove it if its ranged magick threatens your path to the Yellow Flans.",
        ],
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
        questType: "Meet Objectives",
        canDispatch: true,
        canCancel: true,
        members: 6,
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
            "Search mushroom sparkles until you find the Baptiste Mushroom. The mission ends once the correct mushroom is found.",
            "Poisonous mushrooms can inflict bad status, so bring Esuna, items, or a healer if you want to search before clearing enemies.",
            "The Lilith is the most disruptive enemy because Night can put nearby units to sleep; remove it before methodically checking sparkles.",
        ],
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
        description: "Clan <Name> I beg your assistance! No sooner had we succeeded in tracking down Klesta's demesne than Bowen disappeared! I fear he has gone to deal with the beast himself. We make haste to intercept him before it is too late, but I wuold ask that you secure for us some cloudy sap .. it is a vital piece of our strategy for dealing with our flighty foe once and for all. Tweigel of House Bowen",
        rank: 24,
        region: "Targ Wood",
        fee: 400,
        days: 20,
        questType: "Defeat Mark",
        canDispatch: false,
        canCancel: true,
        members: 3,
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 11,
            adaptability: 11,
        },
        objective: "Defeat Klesta!",
        law: "Forbidden: Back Attack – Attacking a unit from behind is forbidden.",
    enemies: [
        { name: "Klesta", job: "Cockatrice", quantity: 1, notes: "Boss. Uses Piston Drop (damages all units on battlefield). Start with 3 units; 3 reinforcements arrive after battle begins. Bowen and Illusionist Tweigel are unkillable allies." },
    ],
        strategy: [
            "Only three clan members deploy at first; the rest of the team arrives as reinforcements after the fight begins.",
            "Klesta's Piston Drop can hit the whole field, so keep HP high and do not drag the battle out.",
            "Bowen and Tweigel fight as allied guests and cannot be killed. Let them help absorb pressure while your clan focuses Klesta.",
            "Back attacks are forbidden, so attack from the side or front even when Klesta turns away.",
        ],
        rewards: {
            gil: 3030,
            cp: 48,
            loot: "Cursed Coin ×5, Skull ×2, Vampyr Fang ×2"
        },
        notes: "",
        tags: ["optional"]
    }
];
