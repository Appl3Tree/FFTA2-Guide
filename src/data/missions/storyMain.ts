import type { Mission } from "../../types/ffta2";
/*
    Enemy example for copy/paste:
    enemies: [
        {
            name: "",
            job: ""
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
*/

export const STORY_MAIN_MISSIONS: Mission[] = [
    {
        id: "A1-01",
        arc: "A1",
        name: "Stranger in the Woods",
        rank: 1,
        region: "Targ Wood",
        objective: "Defeat Klesta!",
        law: "Ranged Weapons: Attacks with bows, greatbows, guns, hand-cannons, and cards are forbidden.",
        enemies: [
            {
                name: "Klesta",
                job: "crushatrice",
                abilities: {
                    A1: {
                        setId: "territorialism",
                        abilityIds: [
                            "peck",
                            "territorial-marking",
                        ],
                    },
                },
                equipment: [
                ],
            },
            {
                name: "Randomized Name",
                job: "Cockatrice",
                quantity: 2,
                abilities: {
                    A1: {
                        setId: "territorialism",
                        abilityIds: [
                            "peck",
                        ],
                    },
                },
                equipment: [],
            },
        ],
        strategy: [
            "Have Luso and Cid focus on Klesta while a White Mage keeps them patched up.",
            "Use your Black Mage to chip away at the boss from a safe distance.",
            "Pick off smaller birds only when it’s safe; the clear condition is pushing Klesta down, not full wipe (unless attempting the RetroAchievements)."
        ],
        rewards: {
            gil: 250,
            cp: 2,
            loot: "Gikhet Lead ×2, Faren Pollen ×2"
        },
        tags: ["story", "boss", "early-game"]
    },
    {
        id: "A1-06",
        arc: "A1",
        name: "A Paw Full of Feathers",
        rank: 2,
        region: "Targ Wood",
        objective: "Defeat all foes.",
        law: "Fire: Weapons and abilities that use fire are forbidden.",
        enemies: [
            {
                name: "Randomized Name",
                job: "Wolf",
                quantity: 2,
                abilities: {
                    A1: {
                        setId: "maw",
                        abilityIds: [
                            "fangs"
                        ]
                    },
                    A2: null,
                    R: null,
                    P: null
                },
                equipment: null
            },
            {
                name: "Randomized Name",
                job: "Baknamy",
                abilities: {
                    A1: {
                        setId: "taktak",
                        abilityIds: [
                            "goblin-attack"
                        ]
                    },
                    A2: null,
                    R: null,
                    P: "geomancy"
                },
                equipment: [
                    {slot: 1, itemId: "leatherClothing" },
                ]
            }
        ],
        strategy: [
            "Bring a White Mage for sustain; focused healing keeps your frontline from getting overwhelmed.",
            "Use sturdy melee (Soldier/Warrior-type jobs) to body-block wolves and prevent backline dives.",
            "Avoid any fire-element skills or weapons; lean on neutral weapon attacks and non-fire spells instead."
        ],
        rewards: {
            gil: 1050,
            cp: 4,
            loot: "Snake Skin ×2, Tiny Mushrooms ×4, Fresh Water ×4"
        },
        tags: ["story", "beasts"]
    },
    {
        id: "A1-11",
        arc: "A1",
        name: "The Yellow Wings",
        rank: 3,
        region: "Targ Wood",
        objective: "Drive off the Yellow Wings bandits clogging the highroad.",
        law: "Ice: weapons and abilities that use ice damage are forbidden.",
        enemies: [
            {
                name: "Kidd",
                job: "Thief",
                abilities: {
                    A1: {
                        setId: "thievery",
                        abilityIds: [
                            "steal-gil"
                        ]
                    },
                    A2: null,
                    R: null,
                    P: "safeguard"
                },
                equipment: [
                    {slot: 1, itemId: "jackknife" },
                    {slot: 2, itemId: "adamantVest" },
                ]
            },
            {
                name: "Yellow Wings",
                job: "Animist",
                abilities: {
                    A1: {
                        setId: "calling",
                        abilityIds: [
                            "100%-wool"
                        ]
                    },
                    A2: null,
                    R: null,
                    P: null,
                },
                equipment: [
                    {slot: 1, itemId: "demonBell" },
                    {slot: 2, itemId: "leatherClothing" },
                ]
            },
            {
                name: "Yellow Wings",
                job: "White Monk",
                abilities: {
                    A1: {
                        setId: "discipline",
                        abilityIds: [
                            
                        ]
                    },
                    A2: null,
                    R: "",
                    P: ""
                },
                equipment: [
                    {slot: 1, itemId: "leatherKnuckles" },
                    {slot: 2, itemId: "leatherClothing" },
                ]
            },
            {
                name: "Yellow Wings",
                job: "Black Mage",
                abilities: {
                    A1: {
                        setId: "black-magick",
                        abilityIds: [
                            "fire",
                            "blizzard",
                            "thunder",
                        ]
                    },
                    A2: null,
                    R: "",
                    P: ""
                },
                equipment: [
                    {slot: 1, itemId: "rod" },
                    {slot: 2, itemId: "hempenRobe" },
                ]
            },
            {
                name: "Yellow Wings",
                job: "iArcher",
                abilities: {
                    A1: {
                        setId: "precision",
                        abilityIds: [
                        "focus"
                        ]
                    },
                    A2: null,
                    R: "",
                    P: ""
                },
                equipment: [
                    {slot: 1, itemId: "shortbow" },
                    {slot: 2, itemId: "leatherClothing" },
                ]
            },
        ],
        strategy: [
            "Focus on thinning the bandits first so they don’t surround your casters.",
            "Use non-ice offensive options; keep any ice mages on support duties if you brought them.",
            "Once the trash is under control, dogpile the leader with buffs and focused damage."
        ],
        rewards: {
            gil: 1750,
            cp: 6,
            loot: "Lamia Scale ×2, Sanative Needle ×3, Earth Stone ×3"
        },
        tags: ["story", "clan-fight"]
    },
    {
        id: "A1-16",
        arc: "A1",
        name: "You Say Tomato",
        rank: 5,
        region: "Camoa",
        objective: "Defeat all Foes!",
        law: "Lightning: weapons and abilities that use lightning damage are forbidden.",
        enemies: [
            {
                name: "Randomized Name",
                job: "Mandragora",
                quantity: 3,
            },
            {
                name: "Randomized Name",
                job: "Alraune",
                quantity: 1,
            },
            {
                name: "Randomized Name",
                job: "Hornhead",
                quantity: 1,
            },
        ],
        strategy: [
            "Adelle joins as a guest Thief for this fight — a welcome extra body.",
            "The three Mandragoras ('tomatoes') on the right side of the map are the first priority; they go down easily.",
            "The Alraune can inflict poison with its toxic attack, so keep a White Mage ready to Esuna.",
            "Grab the treasure chest on the lower right with your fastest unit before enemies reach it.",
            "Finish with the Hornhead; it hits hard but falls once the smaller enemies are cleared.",
            "Avoid all lightning-element weapons and abilities for the duration."
        ],
        rewards: {
            gil: 560,
            cp: 10,
            loot: "Fury Fragments ×2, Silk Thread ×2, Rabbit Pelt ×2"
        },
        tags: ["story", "escort-adjacent"]
    },
    {
        id: "B2-01",
        arc: "B2",
        name: "Wanted: Ughor",
        rank: 8,
        region: "Baptiste Hill",
        objective: "Defeat Ughor!",
        law: "Restoring MP: any action that restores MP is forbidden.",
        enemies: [
            {
                name: "Ughor",
                job: "Shelling",
                quantity: 1,
            },
            {
                name: "Randomized Name",
                job: "Wolf",
                quantity: 2,
            },
            {
                name: "Randomized Name",
                job: "Cockatrice",
                quantity: 2,
            },
        ],
        strategy: [
            "You can defeat all enemies for extra loot and EXP, or focus straight on Ughor to end it fast.",
            "Prioritize the Cockatrices early — their Peck can inflict Petrify, which snowballs badly.",
            "Avoid MP-restoring actions entirely; plan spell usage upfront and rely on items or physical jobs for sustained damage.",
            "Ughor (the giant turtle/Shelling) is the mark — pin it with melee while ranged units chip away from safety."
        ],
        rewards: {
            gil: 1650,
            cp: 16,
            loot: "Healing Water ×4, Holy Stone ×3, Moonwood ×2"
        },
        tags: ["story", "mark", "boss"]
    },
    {
        id: "B2-06",
        arc: "B2",
        name: "Wanted: Gilmunto",
        rank: 12,
        region: "The Aldanna Range",
        objective: "Defeat Gilmunto!",
        law: "Fire: weapons and abilities that deal fire damage are forbidden.",
        enemies: [
            {
                name: "Gilmunto",
                job: "Thunder Drake",
                quantity: 1,
            },
            {
                name: "Randomized Name",
                job: "Worgen",
                quantity: 2,
            },
            {
                name: "Randomized Name",
                job: "Yellow Jelly",
                quantity: 1,
            },
            {
                name: "Randomized Name",
                job: "Asp",
                quantity: 1,
            },
        ],
        strategy: [
            "Gilmunto is the real threat — a Thunder Drake with electric attacks that hit hard.",
            "Worgens act as wolf-type harassers; clear them early to protect your backline.",
            "The Yellow Jelly absorbs most magic and can be tricky — use physical attacks on it.",
            "The Asp can inflict poison, so keep a healer ready to Esuna.",
            "Fire is banned — rely on ice, water, or physical damage (ice especially exploits Gilmunto’s dragon weakness).",
            "Bring Protect/Shell to weather the early turns while you pick off the Worgens."
        ],
        rewards: {
            gil: 1330,
            cp: 24,
            loot: "Succulent Fruit ×3, Storm Stone ×5, Quality Pelt ×2"
        },
        tags: ["story", "mark", "difficulty-spike"]
    },
    {
        id: "B2-11",
        arc: "B2",
        name: "Now That’s a Fire",
        rank: 14,
        region: "Zedlei Forest",
        objective: "Defeat all Foes!",
        law: "Restoring MP: actions that restore MP are forbidden.",
        enemies: [
            {
                name: "Randomized Name",
                job: "Bomb",
                quantity: 3,
            },
            {
                name: "Randomized Name",
                job: "Red Jelly",
                quantity: 2,
            },
            {
                name: "Randomized Name",
                job: "Floating Eye",
                quantity: 2,
            },
        ],
        strategy: [
            "Seven enemies total — an even fight on paper, but level disparity can hurt.",
            "Bombs will Self-Destruct near low HP — keep units spread out to avoid catching multiple allies in the blast.",
            "Red Jellies absorb fire and resist magic generally; use physical or water-element attacks on them.",
            "Floating Eyes can inflict confusion and blind, so bring Esuna or Remedy items.",
            "MP restoring is banned — plan your spell slots carefully and lean on physical jobs for sustained output.",
            "Take down a few enemies before they can act to avoid being overwhelmed by seven units acting in sequence."
        ],
        rewards: {
            gil: 2870,
            cp: 28,
            loot: "Platinum ×5, Agathis ×3, Suspect Mushroom ×1"
        },
        tags: ["story", "elemental"]
    },
    {
        id: "B2-16",
        arc: "B2",
        name: "Pearls in the Deep",
        rank: 17,
        region: "The Galerria Deep",
        objective: "Defeat the Lord of the Flowsand!",
        law: "Nu Mou Actions Only: Nu Mou units may only move and perform basic attacks.",
        enemies: [
            {
                name: "Lord of the Flowsand",
                job: "Antlion",
                quantity: 1,
            },
            {
                name: "Randomized Name",
                job: "Antlion",
                quantity: 3,
            },
        ],
        strategy: [
            "Your Nu Mou units — usually your most powerful mages — are reduced to basic attacks only. Plan around their absence.",
            "The mark, Lord of the Flowsand, uses a pull ability to drag units adjacent to it — positioning matters enormously.",
            "The support Antlions will advance on you relentlessly; pick them off as they come rather than letting them swarm.",
            "You start with the high ground advantage — use it to keep melee enemies at a distance and exploit range.",
            "Bring a Bishop with Aero to deal damage on the wing, supplementing your restricted Nu Mou.",
            "Once the Antlion escort is cleared, commit everything to the Lord of the Flowsand for the win."
        ],
        rewards: {
            gil: 3490,
            cp: 34,
            loot: "Zingu Pearl ×8"
        },
        tags: ["story", "law-gimmick"]
    },
    {
        id: "C3-01",
        arc: "C3",
        name: "Mountain Watch",
        rank: 20,
        region: "The Rupie Mountains",
        objective: "Defeat Ewen!",
        law: "Ice: weapons and abilities that use ice are forbidden.",
        enemies: [
            {
                name: "Ewen",
                job: "Nightfall",
                quantity: 1,
                notes: "Unique unobtainable class (advanced Ninja variant). Removes the judge from the battlefield — no clan privilege, no unit revival."
            },
            {
                name: "Randomized Name",
                job: "Ninja",
                quantity: 1,
            },
            {
                name: "Randomized Name",
                job: "Assassin",
                quantity: 1,
            },
            {
                name: "Randomized Name",
                job: "Sniper",
                quantity: 1,
            },
            {
                name: "Randomized Name",
                job: "Time Mage",
                quantity: 1,
            },
        ],
        strategy: [
            "WARNING: Ewen removes the judge at the start — there is no clan privilege and no reviving fallen units. Every KO is permanent for this fight.",
            "Ewen's Nightfall class can critical hit for 200+ damage even against high-level units; focus him down quickly to end the threat.",
            "The Sniper can pick off back-line units from long range — eliminate them early or keep your squishiest units out of line of sight.",
            "Assassins can inflict instant KO with Doom Fist — don't let them reach your healers.",
            "The Time Mage can haste the enemy team and slow yours; prioritize it if Ewen proves hard to reach.",
            "Since you cannot revive, play conservatively: use items, stay healed, and only engage when you can guarantee safety.",
            "Ice is banned — use physical skills, fire, lightning, or holy damage instead."
        ],
        rewards: {
            gil: 2450,
            cp: 40,
            loot: "Gemsteel ×3, Spiral Incisor ×3"
        },
        tags: ["story", "mountain"]
    },
    {
        id: "C3-06",
        arc: "C3",
        name: "Grounded!",
        rank: 21,
        region: "Moorabella",
        objective: "Defeat Genius Ed!",
        law: "Harming the Weak: actions that damage a lower-level unit are forbidden.",
        enemies: [
            {
                name: "Genius Ed",
                job: "Sage",
                quantity: 1,
            },
            {
                name: "Randomized Name",
                job: "Time Mage",
                quantity: 1,
            },
            {
                name: "Randomized Name",
                job: "Berserker",
                quantity: 1,
            },
            {
                name: "Randomized Name",
                job: "Fusilier",
                quantity: 1,
            },
            {
                name: "Randomized Name",
                job: "White Mage",
                quantity: 1,
            },
        ],
        strategy: [
            "The judge is back for this fight — use your clan privilege and aim for the law bonus.",
            "Vaan and Luso both appear here, each eager to prove themselves. Extra bodies are welcome.",
            "Take out the White Mage and Time Mage first — the Mage’s healing and the Time Mage’s Slow/Haste can wreck your momentum.",
            "The Fusilier’s ranged gun attacks hit hard — close the gap or use a Sniper/Archer of your own to neutralize it.",
            "The Berserker goes berserk but is easy to counter once isolated; don’t let it rampage through your healers.",
            "Genius Ed (the Sage) is the mark — focus him once the support is thinned or neutralized."
        ],
        rewards: {
            gil: 4780,
            cp: 42,
            loot: "Aqua Galac ×2, Red Geeps ×2"
        },
        tags: ["story", "law-gimmick", "city"]
    },
    {
        id: "C3-11",
        arc: "C3",
        name: "Rumours Ahead",
        rank: 22,
        region: "Tramdine Fens",
        objective: "Defeat all Foes!",
        law: "Copycat: using the same action as the preceding unit is forbidden.",
        enemies: [
            {
                name: "Randomized Name",
                job: "Wraith",
                quantity: 1,
                notes: "Has Critical: Vanish — if brought to critical HP rather than killed outright, it turns invisible and can summon more undead to the battlefield."
            },
            {
                name: "Randomized Name",
                job: "Ghost",
                quantity: 2,
                notes: "Ghosts have Sleep Touch and Silence Touch — dark-damage attacks that inflict sleep or silence."
            },
            {
                name: "Randomized Name",
                job: "Floating Eye",
                quantity: 2,
            },
            {
                name: "Randomized Name",
                job: "Zombie",
                quantity: 1,
            },
        ],
        strategy: [
            "The Wraith is top priority: if you drop it to critical HP without finishing it, it vanishes and summons more undead. Burst it down in one sustained push.",
            "Ghosts inflict Sleep and Silence — keep Esuna or Remedies on hand and don’t cluster units so one sleep touch can’t cascade.",
            "Floating Eyes can confuse units; spread your formation to limit friendly-fire chaos.",
            "All undead take damage from Cure spells and are permanently killed only by Exorcise or Phoenix Down — use those to prevent them rising again.",
            "Copycat law: vary your actions each turn. If the previous unit attacked, your unit should cast a spell, use an item, or take a support action instead."
        ],
        rewards: {
            gil: 2770,
            cp: 44,
            loot: "Rainbow Thread ×1, Pink Tail ×2"
        },
        tags: ["story", "swamp", "law-gimmick"]
    },
    {
        id: "C3-16",
        arc: "C3",
        name: "Sleepless Nights",
        rank: 24,
        region: "Nazan Mines",
        objective: "Defeat the Oversoul!",
        law: "Debuffs: actions that inflict debuffs are forbidden.",
        enemies: [
            {
                name: "Oversoul",
                job: "Oversoul",
                quantity: 1,
            },
            {
                name: "Randomized Name",
                job: "Wraith",
                quantity: 2,
            },
            {
                name: "Randomized Name",
                job: "Bloody Orb",
                quantity: 1,
            },
            {
                name: "Randomized Name",
                job: "Zombie",
                quantity: 1,
            },
        ],
        strategy: [
            "Debuffs are banned — build your team around pure damage, healing, and buffs only.",
            "Start by clearing the Bloody Orb (easiest of the escorts) then work through the Wraiths and Zombie.",
            "All undead units (Wraiths and Zombie) take damage from Cure spells. Finish them with Exorcise or Phoenix Down so they don't rise again.",
            "The Oversoul is the mark and the last target — save your biggest hitters for it.",
            "Use Protect and Shell freely since buffs are legal; sustain your party and grind down the opposition."
        ],
        rewards: {
            gil: 3780,
            cp: 48,
            loot: "Crusader Tonic ×3"
        },
        tags: ["story", "undead", "boss"]
    },
    {
        id: "D4-01",
        arc: "D4",
        name: "Making Music",
        rank: 27,
        region: "Aisenfield",
        objective: "Defeat the Alchemist!",
        law: "Harming Females: actions that harm viera or gria are forbidden.",
        enemies: [
            {
                name: "Randomized Name",
                job: "Alchemist",
                quantity: 1,
                notes: "Has Astra, Rasp, and the Beastmaster ability to control the Headless golems on the field."
            },
            {
                name: "Randomized Name",
                job: "Raptor",
                quantity: 1,
                notes: "The only female enemy on the field — cannot be harmed under the active law. Uses Power Crush, Mind Crush, and Speed Crush."
            },
            {
                name: "Randomized Name",
                job: "Ranger",
                quantity: 1,
                notes: "Uses Sten Needle, Leech (drains HP and MP), and Mirror Items — can reflect item effects back at users."
            },
            {
                name: "Randomized Name",
                job: "Headless",
                quantity: 2,
                notes: "Golem-type enemies that the Alchemist can control via Beastmaster."
            },
        ],
        strategy: [
            "The Raptor is the only female enemy — you cannot harm it under the law. Use immobilize, disable, or simply avoid it and let it waste turns.",
            "Focus all damage on the male enemies: the Alchemist, Ranger, and Headless golems.",
            "Prioritize the Ranger early — Mirror Items can turn your own healing or offensive items against you.",
            "Kill the Alchemist quickly once the Golems and Ranger are neutralized; Beastmaster makes the Golems more dangerous while he lives.",
            "Astra on the Alchemist grants status immunity for a turn — wait it out before spending debuff actions on him."
        ],
        rewards: {
            gil: 4730,
            cp: 54,
            loot: "Emperor Scale ×2, Star Fragments ×3"
        },
        tags: ["story", "law-gimmick"]
    },
    {
        id: "D4-06",
        arc: "D4",
        name: "Seeking the Stone",
        rank: 29,
        region: "The Bisga Greenlands",
        objective: "Defeat all Foes!",
        law: "Targeting All Units: actions that hit all units at once are forbidden.",
        enemies: [
            {
                name: "Narph",
                job: "Scholar",
                quantity: 1,
                notes: "Armed with Earth, Rime (ice), and Thunder Tomes for versatile elemental damage."
            },
            {
                name: "Randomized Name",
                job: "Paladin",
                quantity: 1,
                notes: "Uses Cover to protect adjacent allies — position carefully to avoid wasted damage."
            },
            {
                name: "Randomized Name",
                job: "Dragoon",
                quantity: 1,
                notes: "Uses Jump, Lancet, and Thunder Breath."
            },
            {
                name: "Randomized Name",
                job: "Ranger",
                quantity: 1,
                notes: "Uses Sten Needle, Love Potion, and Silence Gas — can silence your casters."
            },
            {
                name: "Randomized Name",
                job: "Hunter",
                quantity: 1,
                notes: "Hume Hunter with Sonic Boom and Rend MP — can drain your MP pool."
            },
            {
                name: "Randomized Name",
                job: "Hunter",
                quantity: 1,
                notes: "Gria Hunter with Vitals Shot — can deal disproportionate burst damage."
            },
        ],
        strategy: [
            "AoE abilities that target all units on the field are banned — stick to single-target and multi-target abilities with defined areas.",
            "Prioritize the Ranger first: Silence Gas will shut down your mages and casters mid-fight.",
            "The Gria Hunter's Vitals Shot can reduce a unit to 1 HP in one hit — keep your healers away from her and react fast.",
            "The Paladin uses Cover to intercept attacks on allies; don't waste burst turns when Cover is active, or pull him away from the target first.",
            "The Hunter's Rend MP can drain your spell slots over time — keep enough MP in reserve to handle emergencies.",
            "Narph the Scholar covers all three main elements (earth, ice, lightning) — there's no easy elemental immunity play; absorb through raw HP and healing."
        ],
        rewards: {
            gil: 5480,
            cp: 58,
            loot: "Einherjarium ×2, Adamantite ×5"
        },
        tags: ["story", "aoe-restriction"]
    },
    {
        id: "D4-11",
        arc: "D4",
        name: "Wanted: Sky Pirate Vaan",
        rank: 32,
        region: "The Rupie Mountains",
        objective: "Defeat all Foes while Defending the Sky Pirates!",
        law: "Not Moving 1 Tile: each unit must move exactly one tile before ending its turn.",
        enemies: [
            {
                name: "Randomized Name",
                job: "Lanista",
                quantity: 1,
                notes: "Uses Souleater and Charge! — high-damage abilities."
            },
            {
                name: "Randomized Name",
                job: "Berserker",
                quantity: 1,
                notes: "Uses Hone Senses, Furore, and Smite of Rage."
            },
            {
                name: "Randomized Name",
                job: "Ranger",
                quantity: 1,
                notes: "Uses Mirror Items, Sten Needle, and Leech — Mirror Items is especially dangerous."
            },
            {
                name: "Randomized Name",
                job: "Gladiator",
                quantity: 1,
                notes: "The primary threat — uses Rush and Thunder Assault. Can deal 200+ damage in a single attack."
            },
            {
                name: "Randomized Name",
                job: "Bishop",
                quantity: 1,
                notes: "Uses Cure, Water, and Dispel — sustains the enemy team."
            },
        ],
        strategy: [
            "Vaan and Penelo are guests who must survive — protect them, especially from the Gladiator who can one-shot them.",
            "Consider intentionally breaking the movement law early — the Gladiator behind Penelo can deal 200+ damage and the judge’s penalty is less costly than losing a guest.",
            "The Gladiator is the biggest immediate threat — rush it before it reaches Vaan or Penelo.",
            "The Ranger’s Mirror Items can reflect healing items back — either stop using items around it or eliminate it early.",
            "Kill the Bishop quickly to prevent it from undoing your damage with Cure or stripping your buffs with Dispel.",
            "The mountain terrain is uneven — use ranged attacks to cover height differences and reduce the movement tax of the law."
        ],
        rewards: {
            gil: 5040,
            cp: 64,
            loot: "Stormsoul Crystal ×2, Gemsteel ×4"
        },
        tags: ["story", "guest-fight", "law-gimmick"]
    },
    {
        id: "D4-16",
        arc: "D4",
        name: "A Request",
        rank: 34,
        region: "The Ruins of Delgantua",
        objective: "Defeat Illua!",
        law: "Being Robbed: having gil or items stolen is forbidden.",
        enemies: [
            {
                name: "Illua",
                job: "Spellblade",
                quantity: 1,
                notes: "Unique boss with a powerful personal ability set. Removes the judge — no clan privilege and no unit revival for the duration."
            },
            {
                name: "Ewen",
                job: "Nightfall",
                quantity: 1,
                notes: "Uses Throw, Unspell, and Dual Wield — can dual-wield for devastating physical combos."
            },
            {
                name: "Randomized Name",
                job: "Elementalist",
                quantity: 1,
                notes: "Uses Fire Whip, Boulder Crush, and Sliprain — wide elemental coverage."
            },
            {
                name: "Randomized Name",
                job: "Spellblade",
                quantity: 1,
                notes: "Viera Spellblade with Poison Blade, Sleep Blade, and more — can apply debilitating status effects through weapon attacks."
            },
        ],
        strategy: [
            "WARNING: Illua removes the judge — no clan privilege, no reviving fallen units. Every KO is permanent.",
            "Another mission follows this one immediately — conserve MP and items as best you can.",
            "Don’t bother using revival or raise abilities; the judge is gone and they won’t work.",
            "Focus burst damage on Illua to end the fight before attrition can set in — she’s the key to clearing.",
            "Ewen’s Dual Wield makes him a massive physical threat; if you can’t burst Illua first, neutralize Ewen with disable or bind.",
            "The Viera Spellblade’s status-infused blade attacks (Poison, Sleep) can cripple your units — keep Remedies or Esuna available.",
            "No one in this fight can steal, so the law is effectively a non-issue — focus on the combat itself."
        ],
        rewards: {
            gil: 6550,
            cp: 68,
            loot: "Crusader Tonic ×1"
        },
        tags: ["story", "law-gimmick"]
    },
    {
        id: "E5-01",
        arc: "E5",
        name: "The Dig",
        rank: 37,
        region: "Goug",
        objective: "Defeat all Foes!",
        law: "Fire, Ice, Lightning: actions and weapons that use fire, ice, or lightning are forbidden.",
        enemies: [
            {
                name: "Randomized Name",
                job: "Mooglebane",
                quantity: 4,
                notes: "Powerful beast-type enemies with high attack. Despite the name, they damage all races equally."
            },
            {
                name: "Randomized Name",
                job: "Red Chocobo",
                quantity: 1,
                notes: "Uses Choco Meteor — a powerful non-elemental spell."
            },
            {
                name: "Randomized Name",
                job: "Black Chocobo",
                quantity: 1,
                notes: "Uses Choco Flame — a fire-elemental attack (note: law bans your fire use, not theirs)."
            },
        ],
        strategy: [
            "Fire, Ice, and Lightning are all banned — you lose access to the three most common elemental spells. Bring Hunters, physical jobs, and off-element options like Wind or Holy.",
            "The four Mooglebane are the real threat: high attack power, and they advance quickly.",
            "Red Chocobo's Choco Meteor can deal massive non-elemental damage to multiple units — keep your party spread to limit splash.",
            "Bring ranged physical units (Hunters, Snipers) as your primary damage dealers since many magic options are locked out.",
            "Focus the Mooglebane first before they overwhelm your formation, then clean up the Chocobos."
        ],
        rewards: {
            gil: 7580,
            cp: 74,
            loot: "Orichalcum ×1"
        },
        tags: ["story", "elemental-ban"]
    },
    {
        id: "E5-06",
        arc: "E5",
        name: "Through Another’s Eyes",
        rank: 40,
        region: "Kthili Sands",
        objective: "Bring Adelle Back to her Senses!",
        law: "Ranged Weapons: attacks with bows, greatbows, guns, hand-cannons, and cards are forbidden.",
        enemies: [
            {
                name: "Adelle",
                job: "Heritor",
                quantity: 1,
                notes: "Unique class available only to Adelle. Watch the opening cutscene carefully — it shows how the battle begins and how to win."
            },
        ],
        strategy: [
            "Watch the opening cutscene — it directly shows you how Adelle must be defeated and what triggers the win condition.",
            "Adelle’s Heritor class has exclusive, powerful abilities not available to any other character.",
            "Ranged weapons are banned — all your archers, snipers, and gunners must switch to melee or magic roles.",
            "This is largely a focused duel-style mission; bring your strongest single-target damage dealers.",
            "Keep a healer alive and away from Adelle — her Heritor abilities can hit hard.",
            "Once Adelle falls below the threshold, the mission ends. You don’t need to ‘kill’ her."
        ],
        rewards: {
            gil: 9100,
            cp: 80,
            loot: "Orichalcum ×1"
        },
        tags: ["story", "desert", "ranged-ban"]
    },
    {
        id: "E5-11",
        arc: "E5",
        name: "Pirate Problems",
        rank: 46,
        region: "Camoa",
        objective: "Defeat Vaan...!?",
        law: "Harming Bangaa: actions that harm bangaa are forbidden.",
        enemies: [
            {
                name: "Van",
                job: "Sky Pirate",
                quantity: 1,
                notes: "The mark — an impostor posing as Vaan. Despite the law name, Van himself is not Bangaa."
            },
        ],
        strategy: [
            "The mark is Van — a fake 'Vaan' impostor. Target him to end the mission.",
            "Bangaa enemies on the field cannot be harmed; work around them with crowd control or simply avoid engaging.",
            "There are traps scattered around the battlefield — step carefully and use units with high movement or Awareness to navigate safely.",
            "Van is a straightforward headhunt; the Bangaa law is the main complication — identify which enemies are Bangaa at the start and route around them.",
            "Focus everything on Van once Bangaa units are out of the way or kept at bay."
        ],
        rewards: {
            gil: 10470,
            cp: 92,
            loot: "Scarletite ×1"
        },
        tags: ["story", "law-gimmick", "sky-pirates"]
    },
    {
        id: "E5-16",
        arc: "E5",
        name: "The Ritual",
        rank: 47,
        region: "The Ruins of Delgantua",
        objective: "Defeat Illua!",
        law: "Harming Males: actions that harm male units are forbidden.",
        enemies: [
            {
                name: "Illua",
                job: "Spellblade",
                quantity: 1,
                notes: "Final boss of the main arc. Very fast and hits extremely hard. Mirror Items + X Potion deals ~400 HP if you have Item Lore."
            },
        ],
        strategy: [
            "This is the final main story boss battle — bring your absolute best units.",
            "Illua is fast; she will act early and often. Your party needs to be durable and capable of sustained damage.",
            "Mirror Items + X Potion combo (with Item Lore equipped) deals roughly 400 HP of damage — a massive shortcut if you have it.",
            "Without Mirror Items, commit to sustained physical and magical attacks. She is not invincible, just very dangerous.",
            "Move your units to converge on Illua quickly — spreading out only gives her more turns to act freely.",
            "Male units cannot be harmed by the law, but Illua herself is female and can be freely targeted. Focus entirely on her.",
            "Keep your healer protected and at distance. One bad turn without healing can cascade into a wipe."
        ],
        rewards: {
            gil: 9870,
            cp: 94,
            loot: "Prime Pelt ×1"
        },
        tags: ["story", "finale", "boss"]
    },
    {
        id: "EX-01",
        arc: "EX",
        name: "The Two Grimoires",
        rank: 48,
        region: "The Ruins of Delgantua (Inner Sanctum)",
        objective: "Defeat Illua!",
        law: "Buffs: abilities and actions that raise stats or apply positive status effects are forbidden.",
        enemies: [
            {
                name: "Illua",
                job: "Spellblade",
                quantity: 1,
                notes: "Powered up by the Grimoire of the Rift. Very dangerous — she is even more formidable than the previous encounter."
            },
        ],
        strategy: [
            "All buff abilities and positive status effects are banned — no Protect, Shell, Haste, Bravery, or Faith. Build your party around raw stats and healing only.",
            "Mirror Items + X Potion remains one of the best options for dealing burst damage under these restrictions.",
            "Ranged attacks and magic from the back line are effective — keep your squishier units away from Illua's melee range.",
            "Pure physical attackers with high Strength are ideal here since buffs that would normally amplify them are gone.",
            "Once Illua falls, the story continues immediately into the next and final battle. Conserve what you can.",
        ],
        rewards: {
            gil: 0,
            cp: 0,
            loot: "Story progression; prepares the way for the battle with Neukhia.",
        },
        tags: ["story", "finale", "boss", "ex-mission"],
    },
    {
        id: "EX-02",
        arc: "EX",
        name: "From the Rift",
        rank: 49,
        region: "The Rift",
        objective: "Defeat the Neukhia!",
        law: "Reaction Abilities: abilities that trigger as reactions are forbidden.",
        enemies: [
            {
                name: "Neukhia (Wisp)",
                job: "Neukhia",
                quantity: 1,
                notes: "First phase. Teleports away each time it is attacked, or disappears on its own. Must be destroyed to proceed."
            },
            {
                name: "Neukhia (Pod)",
                job: "Neukhia",
                quantity: 1,
                notes: "Second phase. Deals constant chip damage while alive. Destroy before engaging the Core."
            },
            {
                name: "Neukhia (Core)",
                job: "Neukhia",
                quantity: 1,
                notes: "Final phase. Can summon crystals — destroying the crystals damages the Core and prevents them from punishing the party."
            },
        ],
        strategy: [
            "Reaction abilities are banned — unequip them before entering or you'll waste the slot. Build around action abilities and passives only.",
            "Split into pairs to hunt the Wisp: it vanishes every time it's hit, so you need units spread across the map to catch it wherever it reappears.",
            "Once the Wisp is down, regroup and destroy the Pod — it deals persistent chip damage that will drain you during the Core fight if left alive.",
            "The Core is the final target. It's a long sustained fight — strong healing, high-damage physical and magical attacks, and generous item usage are key.",
            "When the Core spawns crystals, switch immediately to destroying them. Doing so deals damage to the Core and stops the crystals from punishing your team.",
            "This is the final battle of the main story — use everything you have. There is no saving for 'later'.",
        ],
        rewards: {
            gil: 0,
            cp: 0,
            loot: "Completion of the main story and access to post-game content.",
        },
        tags: ["story", "finale", "boss", "ex-mission"],
    }
];
