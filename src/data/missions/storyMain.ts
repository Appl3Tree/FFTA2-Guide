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
                R: null,
                P: null
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
        description: "Monster in Targ Wood! We hunters of the village tried to stop 'im, to no avail. Somebody do somethin', please! You don't need to kill 'im, just drivin' 'im off will do. -Heriward, Wood Village Hunter",
        rank: 1,
        questType: "Story Battle",
        region: "Targ Wood",
        objective: "Defeat Klesta!",
        law: "Ranged Weapons: Attacks with bows, greatbows, guns, hand-cannons, and cards are forbidden.",
        enemies: [
            {
                name: "Klesta",
                job: "crushatrice",
                notes: "Boss target. Territorial Marking creates pressure while the smaller Cockatrices interfere.",
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
                notes: "Support birds. Clear them only when they threaten your healer or block safe attacks on Klesta.",
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
        strategy: [      ],
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
        description: "What's in the woods? Wolves, that's what! And my chocobos are so put out, they're molting early. Somebody, rid us of these horrible howlers! -Chocobo Corral \"Sasasha\"",
        rank: 2,
        questType: "Story Battle",
        fee: 100,
        region: "Targ Wood",
        objective: "Defeat all foes.",
        law: "Fire: Weapons and abilities that use fire are forbidden.",
        enemies: [
            {
                name: "Randomized Name",
                job: "Wolf",
                quantity: 2,
                notes: "Fast melee beasts with Fangs. Body-block them so they cannot dive onto your healer or mage.",
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
                notes: "Goblin attacker with Geomancy passive. Lower priority than the Wolves unless it blocks your formation.",
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
        strategy: [      ],
        rewards: {
            gil: 1050,
            cp: 4,
            loot: "Snake Skin ×2, Tiny Mushrooms ×2, Fresh Water ×4"
        },
        tags: ["story", "beasts"]
    },
    {
        id: "A1-11",
        arc: "A1",
        name: "The Yellow Wings",
        rank: 3,
        questType: "Story Battle",
        days: undefined,
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
                    R: null,
                    P: null
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
                    R: null,
                    P: null
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
                    R: null,
                    P: null
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
        questType: "Story Battle",
        days: undefined,
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
        name: "Wanted: Ugohr",
        rank: 8,
        questType: "Story Battle",
        region: "Baptiste Hill",
        objective: "Defeat Ugohr!",
        law: "Restoring MP: any action that restores MP is forbidden.",
        enemies: [
            {
                name: "Ugohr",
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
            "You can defeat all enemies for extra loot and EXP, or focus straight on Ugohr to end it fast.",
            "Prioritize the Cockatrices early — their Peck can inflict Petrify, which snowballs badly.",
            "Avoid MP-restoring actions entirely; plan spell usage upfront and rely on items or physical jobs for sustained damage.",
            "Ugohr (the giant turtle/Shelling) is the mark — pin it with melee while ranged units chip away from safety."
        ],
        rewards: {
            gil: 1650,
            cp: 16,
            loot: "Healing Water ×4, Holy Stone ×3, Moonwood ×3"
        },
        tags: ["story", "mark", "boss"]
    },
    {
        id: "B2-06",
        arc: "B2",
        name: "Wanted: Gilmunto",
        rank: 12,
        questType: "Story Battle",
        region: "The Aldanna Range",
        objective: "Defeat Gilmunto!",
        law: "Fire: weapons and abilities that deal fire damage are forbidden.",
        enemies: [
            {
                name: "Gilmunto",
                job: "Asp",
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
                job: "Thunder Drake",
                quantity: 1,
            },
        ],
        strategy: [
            "Gilmunto is the real threat — an Asp with high attack power and dangerous area pressure.",
            "Worgens act as wolf-type harassers; clear them early to protect your backline.",
            "The Yellow Jelly absorbs most magic and can be tricky — use physical attacks on it.",
            "The Thunder Drake can punish clustered units with lightning attacks, so keep a healer ready.",
            "Fire is banned — rely on ice, water, or physical damage while avoiding lightning on the Jelly and Drake.",
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
        questType: "Story Battle",
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
        questType: "Story Battle",
        region: "The Galleria Deep",
        objective: "Defeat the Lord of the Flowsand!",
        law: "Nu Mou Actions Only: Nu Mou units may only move and perform basic attacks.",
        enemies: [
            {
                name: "Lord of the Flowsand",
                job: "Yowie",
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
            "Once the Antlion support is controlled, commit everything to the Lord of the Flowsand for the win."
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
        description: "Kuknir Travel is looking for guards to escort touring groups headed for the Rupie Mountains. The Marsa Wayfarers Association has been gaining on them of late. Kuknir want safety as a selling point, most like. -Shink, Pub Patron",
        rank: 20,
        questType: "Story Battle",
        fee: 300,
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
                notes: "Fast physical/status attacker. Dangerous if left free after Ewen removes revival.",
            },
            {
                name: "Randomized Name",
                job: "Assassin",
                quantity: 1,
                notes: "Instant-KO/status threat. Keep away from healers and disable or defeat early.",
            },
            {
                name: "Randomized Name",
                job: "Sniper",
                quantity: 1,
                notes: "Long-range backline threat. Break line of sight or eliminate before it picks off fragile units.",
            },
            {
                name: "Randomized Name",
                job: "Time Mage",
                quantity: 1,
                notes: "Haste/Slow support. Remove if it starts controlling the turn economy.",
            },
        ],
        strategy: [  ],
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
        description: "Airship malfunction due to mechanical sabotage and inspections resulting from same have grounded our regular flight to Fluorgis. The party or parties responsible have yet to be apprehended. Calling all clans to aid us! -Moorabella Aerodrome Security",
        rank: 21,
        questType: "Story Battle",
        fee: 400,
        region: "Moorabella",
        objective: "Defeat Genius Ed!",
        law: "Harming the Weak: actions that damage a lower-level unit are forbidden.",
        enemies: [
            {
                name: "Genius Ed",
                job: "Sage",
                quantity: 1,
                notes: "Mark target. Sage magick is dangerous, but support units can make him much harder to finish.",
            },
            {
                name: "Randomized Name",
                job: "Time Mage",
                quantity: 1,
                notes: "Uses time magick to slow your party or speed enemy turns. High priority.",
            },
            {
                name: "Randomized Name",
                job: "Berserker",
                quantity: 1,
                notes: "Melee bruiser. Isolate it so it cannot rampage through healers.",
            },
            {
                name: "Randomized Name",
                job: "Fusilier",
                quantity: 1,
                notes: "Gun user with long reach. Close distance quickly or counter with your own ranged unit.",
            },
            {
                name: "Randomized Name",
                job: "White Mage",
                quantity: 1,
                notes: "Healer. Defeat early so Genius Ed and the frontline cannot recover.",
            },
        ],
        strategy: [  ],
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
        name: "Rumors Abound",
        description: "Rumors whisper of an unimaginable treasure sleeping deep within Tramdine Fens. Some say it is the Dozen-and-One Knights of Aisen's hoard, others that it is a cache of Rozarrian wealth... Whets the palate, does it not? Well? In the mood for a treasure hunt? -Kanaq, Pub Regular *No evidence has been found to support above rumors. -The Management",
        rank: 22,
        questType: "Story Battle",
        fee: 400,
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
                notes: "Ghosts have Sleep Touch and Silence Touch and may summon more undead if left unchecked."
            },
            {
                name: "Randomized Name",
                job: "Floating Eye",
                quantity: 2,
                notes: "Confusion and nuisance pressure. Clear before they create friendly-fire problems under Copycat.",
            },
            {
                name: "Randomized Name",
                job: "Zombie",
                quantity: 1,
                notes: "Undead support. Can drain HP to heal itself; finish with Phoenix Down or Exorcise to stop it from returning.",
            },
        ],
        strategy: [   ],
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
        description: "My dreams have been troubled of late. It started the night after my visit to Nazan Mines. I cannot sleep, my arms and legs are leaden, and even plump Bisga game- hen tastes like ash. They say a creature within the mines weaves ill-omened dreams. I fear...I fear I may be a victim. Please, stop it before I go mad. -Dabool, Geologist",
        rank: 24,
        questType: "Story Battle",
        fee: 400,
        region: "Nazan Mines",
        objective: "Defeat the Oversoul!",
        law: "Debuffs: actions that inflict debuffs are forbidden.",
        enemies: [
            {
                name: "Oversoul",
                job: "Oversoul",
                quantity: 1,
                notes: "Mark target. Save burst damage for it after the undead escorts are controlled.",
            },
            {
                name: "Randomized Name",
                job: "Wraith",
                quantity: 2,
                notes: "Undead support. Can prolong the fight if not permanently finished with anti-undead tools.",
            },
            {
                name: "Randomized Name",
                job: "Bloody Orb",
                quantity: 1,
                notes: "Fast, fragile escort. Clear first to reduce immediate pressure.",
            },
            {
                name: "Randomized Name",
                job: "Zombie",
                quantity: 1,
                notes: "Undead support. Use Cure damage and Phoenix Down or Exorcise to keep it down.",
            },
        ],
        strategy: [    ],
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
        description: "The timber of the strawood trees growing near Fluorgis makes the best instruments, kupo! You'll get some for me, won't you, kupo? Oh, thank you! Thank you! -Hurdy, Itinerant Bard *Oh, if you find some flutegrass too, that'd be awful nifty, kupo!",
        rank: 27,
        questType: "Story Battle",
        fee: 400,
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
        strategy: [    ],
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
        description: "I search for a piece of magicite the color of silver. I'm sure it was in my laboratory just the other day... Please, if you know something-anything at all-let me know. My laboratory is in the Bisga Greenlands. -Narph, Magick Akademy Scholar",
        rank: 29,
        questType: "Story Battle",
        fee: 400,
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
        strategy: [   ],
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
        description: "Apprehend the sky pirates Vaan and Penelo! Those scurvy scum of the skies infiltrated the Beltorey Manse and made an attempt on the baron's life. A commensurate reward is promised the one who can bring them in. -House Beltorey",
        rank: 32,
        questType: "Story Battle",
        fee: 500,
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
        strategy: [   ],
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
        description: "For Clan Gully, a request. I must speak with you. I await in the Ruins of Delgantua. P.S. I trust you enjoyed my gift?",
        rank: 34,
        questType: "Story Battle",
        fee: 500,
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
        strategy: [  ],
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
        description: "It's the 410th Goug Mines Salvage Run! Ancient machineries lie in the dark depths below Goug, and we're going to dig 'em up, kupo! You never know what you might find, kupo! -Goug Machinists Alliance",
        rank: 37,
        questType: "Story Battle",
        fee: 500,
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
        strategy: [    ],
        rewards: {
            gil: 7580,
            cp: 74,
            loot: "Orichalcum ×1, Hurdy-gurdy ×1"
        },
        tags: ["story", "elemental-ban"]
    },
    {
        id: "E5-06",
        arc: "E5",
        name: "Through Another’s Eyes",
        description: "Monsters have settled in to the area around the ancient stone heads of Kthili Sands. Not only are our surveys being delayed, I fear there may be nothing left to survey if those monsters have their way with the ruins! Please, somebody, rid us of them! -Rothwall, Archaeologikal Survey Team",
        rank: 40,
        questType: "Story Battle",
        fee: 500,
        region: "Kthili Sands",
        objective: "Bring Adelle Back to her Senses!",
        law: "Ranged Weapons: attacks with bows, greatbows, guns, hand-cannons, and cards are forbidden.",
        enemies: [
            {
                name: "Adelle",
                job: "Heritor",
                quantity: 1,
                notes: "Unique class available only to Adelle. Luso must talk to her three times; do not kill her."
            },
            {
                name: "Randomized Name",
                job: "Thunder Drake",
                quantity: 1,
                notes: "Priority monster target; elemental attacks with Geomancy hit hard."
            },
            {
                name: "Randomized Name",
                job: "Zaghnal",
                quantity: 2,
                notes: "Monster pressure while Luso moves into talk range."
            },
            {
                name: "Randomized Name",
                job: "Pit Beast",
                quantity: 2,
                notes: "Monster pressure while Luso talks Adelle back to her senses."
            },
        ],
        strategy: [    ],
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
        description: "\"Lord Even, was it? Heard you're in possession of that rarest of treasures, the 'Black Cat,' and we're coming to Camoa for it! See you soon! Swiftest of the Sky Pirates, Vaan & Penelo\" Wanted: Someone to deal with sky pirates. -Fohgginus Eden",
        rank: 46,
        questType: "Story Battle",
        fee: 500,
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
            {
                name: "Randomized Name",
                job: "Cannoneer",
                race: "Bangaa",
                quantity: 1,
                notes: "Do not harm if preserving the law; otherwise the Harming Bangaa law fails."
            },
            {
                name: "Randomized Name",
                job: "Fighter",
                quantity: 1,
                notes: "Near the starting position; remove early to prevent flank pressure."
            },
            {
                name: "Randomized Name",
                job: "Ravager",
                quantity: 1,
                notes: "Early flank pressure near the starting side."
            },
            {
                name: "Randomized Name",
                job: "Sniper",
                quantity: 1,
                notes: "Can break weapons; high priority if not rushing Van."
            },
            {
                name: "Penelo",
                job: "Dancer",
                quantity: 1,
                notes: "Impostor companion; can be ignored if rushing the mark."
            },
        ],
        strategy: [      ],
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
        description: "At last, the day when all my dreams shall know fruition is nigh! Just a few finishing touches remain. I trust you'll be on hand to celebrate? I'll be waiting at the ruins. -Illua",
        rank: 47,
        questType: "Story Battle",
        fee: 500,
        region: "The Ruins of Delgantua",
        objective: "Defeat Illua!",
        law: "Harming Males: actions that harm male units are forbidden.",
        enemies: [
            {
                name: "Illua",
                job: "Spellblade",
                quantity: 1,
                notes: "Final boss of the main arc. Very fast and hits extremely hard."
            },
        ],
        strategy: [   ],
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
        description: "The Grimoire of the Rift empowers Illua for a final confrontation while monsters continue to pour into the Inner Sanctum.",
        rank: 48,
        region: "The Ruins of Delgantua (Inner Sanctum)",
        questType: "Finale Battle",
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
            "Ignore the continuing reinforcements and concentrate damage on Illua; defeating her is the only win condition.",
            "Illua is a fast mover, so equip Ninja Tabi to keep up. Send the strongest attackers directly and keep a ranged attacker and healer ready.",
            "Buffs are forbidden. Build around direct damage and healing while concentrating solely on Illua.",
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
        description: "Clan Gully faces the Neukhia across three connected components: a moving Wisp, a dangerous Pod, and the final Core.",
        rank: 49,
        region: "The Rift",
        questType: "Finale Battle",
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
            "Spread mobile units toward the Wisp's three possible positions. Damage the Wisp until it moves, follow it, and destroy it before trying to attack the Core.",
            "The Pod is slow but its Syphonja is dangerous. Keep recovery ready while the Core heals the Wisp, then remove the Pod before committing everyone to the Core.",
            "When the Core creates dark crystals with Rewind, reclaim or destroy them before its next turn to weaken the incoming full-party attack. Unequip reaction abilities before the battle.",
        ],
        rewards: {
            gil: 0,
            cp: 0,
            loot: "Completion of the main story and access to post-game content.",
        },
        tags: ["story", "finale", "boss", "ex-mission"],
    }
];
