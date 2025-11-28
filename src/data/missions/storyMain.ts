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
    ]
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
        law: "Fire: weapons and abilities that deal fire damage are forbidden.",
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
                name: "Yellow Wings Grunts",
                job: "Mixed melee",
                abilities: {
                    A1: {
                        setId: "",
                        abilityIds: [
                        
                        ]
                    },
                    A2: {
                        setId: "",
                        abilityIds: [
                            "",
                        ]
                    },
                    R: "",
                    P: ""
                },
                equipment: [
                    {slot: 1, itemId: "" },
                ]
            },
            {
                name: "Yellow Wings Leader",
                job: "Human boss",
                abilities: {
                    A1: {
                        setId: "",
                        abilityIds: [
                        
                        ]
                    },
                    A2: {
                        setId: "",
                        abilityIds: [
                            "",
                        ]
                    },
                    R: "",
                    P: ""
                },
                equipment: [
                    {slot: 1, itemId: "" },
                ]
            }
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
        objective: "Rescue the tomato delivery by defeating the monsters blocking the route.",
        law: "Lightning: weapons and abilities that use lightning damage are forbidden.",
        enemies: [
            {
                name: "Plant monsters",
                job: "Flan/plant mix",
                abilities: {
                    A1: {
                        setId: "",
                        abilityIds: [
                        
                        ]
                    },
                    A2: {
                        setId: "",
                        abilityIds: [
                            "",
                        ]
                    },
                    R: "",
                    P: ""
                },
                equipment: [
                    {slot: 1, itemId: "" },
                ]
            },
            {
                name: "Supporting beasts",
                job: "Beast",
                abilities: {
                    A1: {
                        setId: "",
                        abilityIds: [
                        
                        ]
                    },
                    A2: {
                        setId: "",
                        abilityIds: [
                            "",
                        ]
                    },
                    R: "",
                    P: ""
                },
                equipment: [
                    {slot: 1, itemId: "" },
                ]
            }
        ],
        strategy: [
            "Bring a good mix of physical and magical damage to handle varied resistances.",
            "Avoid lightning abilities entirely; use neutral attacks, wind, or earth if possible.",
            "Anchor your formation around your healers and push steadily instead of overextending."
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
        objective: "Hunt down and defeat the mark, Ughor, on Baptiste Hill.",
        law: "Restoring MP: any action that restores MP is forbidden.",
        enemies: [
            {
                name: "Ughor",
                job: "Large beast (mark)",
                abilities: {
                    A1: {
                        setId: "",
                        abilityIds: [
                        
                        ]
                    },
                    A2: {
                        setId: "",
                        abilityIds: [
                            "",
                        ]
                    },
                    R: "",
                    P: ""
                },
                equipment: [
                    {slot: 1, itemId: "" },
                ]
            },
            {
                name: "Beast escorts",
                job: "Beast",
                abilities: {
                    A1: {
                        setId: "",
                        abilityIds: [
                        
                        ]
                    },
                    A2: {
                        setId: "",
                        abilityIds: [
                            "",
                        ]
                    },
                    R: "",
                    P: ""
                },
                equipment: [
                    {slot: 1, itemId: "" },
                ]
            }
        ],
        strategy: [
            "Avoid MP-restoring actions; rely on smart spell use and ethers you already have before the battle.",
            "Use tanky melee jobs to pin Ughor while ranged units and casters work from safer tiles.",
            "Clean up support beasts when they threaten your backline, but don’t lose focus on the mark."
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
        objective: "Track down and defeat Gilmunto in the Aldanna Range.",
        law: "Fire: weapons and abilities that deal fire damage are forbidden.",
        enemies: [
            {
                name: "Gilmunto",
                job: "Behemoth-type mark",
                abilities: {
                    A1: {
                        setId: "",
                        abilityIds: [
                        
                        ]
                    },
                    A2: {
                        setId: "",
                        abilityIds: [
                            "",
                        ]
                    },
                    R: "",
                    P: ""
                },
                equipment: [
                    {slot: 1, itemId: "" },
                ]
            },
            {
                name: "Beast allies",
                job: "Beast",
                abilities: {
                    A1: {
                        setId: "",
                        abilityIds: [
                        
                        ]
                    },
                    A2: {
                        setId: "",
                        abilityIds: [
                            "",
                        ]
                    },
                    R: "",
                    P: ""
                },
                equipment: [
                    {slot: 1, itemId: "" },
                ]
            }
        ],
        strategy: [
            "Use Protect, Shell, and defensive buffs to survive Gilmunto’s bursts.",
            "Focus on removing support monsters when they’re in easy reach, then commit to burning down the mark.",
            "Since fire is banned, lean on physical skills, non-fire elemental magic, and debuffs to keep the field manageable."
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
        objective: "Put out the threat in Zedlei Forest by defeating the fire-aligned foes.",
        law: "Restoring MP: actions that restore MP are forbidden.",
        enemies: [
            {
                name: "Fire-aligned monsters",
                job: "Elemental beasts",
                abilities: {
                    A1: {
                        setId: "",
                        abilityIds: [
                        
                        ]
                    },
                    A2: {
                        setId: "",
                        abilityIds: [
                            "",
                        ]
                    },
                    R: "",
                    P: ""
                },
                equipment: [
                    {slot: 1, itemId: "" },
                ]
            },
            {
                name: "Support casters",
                job: "Mage-type enemies",
                abilities: {
                    A1: {
                        setId: "",
                        abilityIds: [
                        
                        ]
                    },
                    A2: {
                        setId: "",
                        abilityIds: [
                            "",
                        ]
                    },
                    R: "",
                    P: ""
                },
                equipment: [
                    {slot: 1, itemId: "" },
                ]
            }
        ],
        strategy: [
            "Do not rely on MP regeneration; manage spell usage carefully and let physical jobs carry damage.",
            "Exploit elemental weaknesses with non-fire magic and status effects.",
            "Pull enemies in smaller groups instead of engaging the whole pack at once."
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
        objective: "Secure the pearls by defeating the monsters lurking in the depths.",
        law: "Nu Mou Actions Only: Nu Mou units may only move and perform basic attacks.",
        enemies: [
            {
                name: "Aquatic beasts",
                job: "Water-aligned monsters",
                abilities: {
                    A1: {
                        setId: "",
                        abilityIds: [
                        
                        ]
                    },
                    A2: {
                        setId: "",
                        abilityIds: [
                            "",
                        ]
                    },
                    R: "",
                    P: ""
                },
                equipment: [
                    {slot: 1, itemId: "" },
                ]
            },
            {
                name: "Support monsters",
                job: "Mixed",
                abilities: {
                    A1: {
                        setId: "",
                        abilityIds: [
                        
                        ]
                    },
                    A2: {
                        setId: "",
                        abilityIds: [
                            "",
                        ]
                    },
                    R: "",
                    P: ""
                },
                equipment: [
                    {slot: 1, itemId: "" },
                ]
            }
        ],
        strategy: [
            "Plan around Nu Mou restrictions: they are mostly on healing and basic attacks here, not full casting.",
            "Use faster physical jobs to reach and break enemy formations.",
            "Bring items and non-Nu Mou casters to compensate for the law’s constraints."
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
        objective: "Defend the mountain approach by defeating all enemies.",
        law: "Ice: weapons and abilities that use ice are forbidden.",
        enemies: [
            {
                name: "Mixed clan units",
                job: "Humans and monsters",
                abilities: {
                    A1: {
                        setId: "",
                        abilityIds: [
                        
                        ]
                    },
                    A2: {
                        setId: "",
                        abilityIds: [
                            "",
                        ]
                    },
                    R: "",
                    P: ""
                },
                equipment: [
                    {slot: 1, itemId: "" },
                ]
            },
            {
                name: "Ranged threats",
                job: "Archers / casters",
                abilities: {
                    A1: {
                        setId: "",
                        abilityIds: [
                        
                        ]
                    },
                    A2: {
                        setId: "",
                        abilityIds: [
                            "",
                        ]
                    },
                    R: "",
                    P: ""
                },
                equipment: [
                    {slot: 1, itemId: "" },
                ]
            }
        ],
        strategy: [
            "Avoid ice-element weapons and spells; bring neutral or other elemental options.",
            "Use Jump, ranged skills, or movement perks to get onto high ground quickly.",
            "Eliminate ranged threats first, then collapse on melee enemies from higher tiles."
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
        objective: "Defeat the enemies running amok in Moorabella’s airship docks.",
        law: "Harming the Weak: actions that damage a lower-level unit are forbidden.",
        enemies: [
            {
                name: "Enemy clan members",
                job: "Humans / moogles",
                abilities: {
                    A1: {
                        setId: "",
                        abilityIds: [
                        
                        ]
                    },
                    A2: {
                        setId: "",
                        abilityIds: [
                            "",
                        ]
                    },
                    R: "",
                    P: ""
                },
                equipment: [
                    {slot: 1, itemId: "" },
                ]
            },
            {
                name: "Support casters",
                job: "Mage-type enemies",
                abilities: {
                    A1: {
                        setId: "",
                        abilityIds: [
                        
                        ]
                    },
                    A2: {
                        setId: "",
                        abilityIds: [
                            "",
                        ]
                    },
                    R: "",
                    P: ""
                },
                equipment: [
                    {slot: 1, itemId: "" },
                ]
            }
        ],
        strategy: [
            "Be mindful of levels: avoid targeting low-level enemies with high-level units when possible.",
            "Use buffs and debuffs to swing fights without directly hitting weaker units until the law is no longer relevant.",
            "Control chokepoints at the docks so you only fight a few enemies at a time."
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
        objective: "Cut through the enemies in the fens and uncover what’s really going on.",
        law: "Copycat: using the same action as the previous unit is forbidden.",
        enemies: [
            {
                name: "Marsh monsters",
                job: "Beast / flan mix",
                abilities: {
                    A1: {
                        setId: "",
                        abilityIds: [
                        
                        ]
                    },
                    A2: {
                        setId: "",
                        abilityIds: [
                            "",
                        ]
                    },
                    R: "",
                    P: ""
                },
                equipment: [
                    {slot: 1, itemId: "" },
                ]
            },
            {
                name: "Enemy casters",
                job: "Mage-type enemies",
                abilities: {
                    A1: {
                        setId: "",
                        abilityIds: [
                        
                        ]
                    },
                    A2: {
                        setId: "",
                        abilityIds: [
                            "",
                        ]
                    },
                    R: "",
                    P: ""
                },
                equipment: [
                    {slot: 1, itemId: "" },
                ]
            }
        ],
        strategy: [
            "Rotate through different actions: alternate between attacks, abilities, and support skills to avoid copycat violations.",
            "Use terrain-friendly units (like ranged casters) that don’t mind slow ground movement.",
            "Target high-impact enemies first so you don’t feel pressured into mimicking their strong actions."
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
        objective: "Break the curse on the mines by defeating the Oversoul.",
        law: "Debuffs: actions that inflict debuffs are forbidden.",
        enemies: [
            {
                name: "Oversoul",
                job: "Undead boss",
                abilities: {
                    A1: {
                        setId: "",
                        abilityIds: [
                        
                        ]
                    },
                    A2: {
                        setId: "",
                        abilityIds: [
                            "",
                        ]
                    },
                    R: "",
                    P: ""
                },
                equipment: [
                    {slot: 1, itemId: "" },
                ]
            },
            {
                name: "Ghosts and undead",
                job: "Undead",
                abilities: {
                    A1: {
                        setId: "",
                        abilityIds: [
                        
                        ]
                    },
                    A2: {
                        setId: "",
                        abilityIds: [
                            "",
                        ]
                    },
                    R: "",
                    P: ""
                },
                equipment: [
                    {slot: 1, itemId: "" },
                ]
            }
        ],
        strategy: [
            "Avoid debuff skills; rely on pure damage, healing, and positional play instead.",
            "Use holy-aligned or high-impact abilities to burn down undead quickly.",
            "Focus on clearing trash enough to reach the Oversoul, then commit everything to finishing it."
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
        objective: "Protect the performance by defeating all foes on the field.",
        law: "Harming Females: actions that harm viera or gria are forbidden.",
        enemies: [
            {
                name: "Enemy troupe",
                job: "Mixed jobs",
                abilities: {
                    A1: {
                        setId: "",
                        abilityIds: [
                        
                        ]
                    },
                    A2: {
                        setId: "",
                        abilityIds: [
                            "",
                        ]
                    },
                    R: "",
                    P: ""
                },
                equipment: [
                    {slot: 1, itemId: "" },
                ]
            },
            {
                name: "Male frontliners",
                job: "Melee units",
                abilities: {
                    A1: {
                        setId: "",
                        abilityIds: [
                        
                        ]
                    },
                    A2: {
                        setId: "",
                        abilityIds: [
                            "",
                        ]
                    },
                    R: "",
                    P: ""
                },
                equipment: [
                    {slot: 1, itemId: "" },
                ]
            }
        ],
        strategy: [
            "Prioritize male enemies and any monsters to stay within the law.",
            "Use control abilities like immobilize or disable instead of direct damage on female units if needed.",
            "Keep your formation tight so you can quickly rotate targets that are safe to hit."
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
        objective: "Defeat the enemies guarding the mysterious stone.",
        law: "Targeting All Units: actions that hit all units at once are forbidden.",
        enemies: [
            {
                name: "Guardians",
                job: "Mixed melee",
                abilities: {
                    A1: {
                        setId: "",
                        abilityIds: [
                        
                        ]
                    },
                    A2: {
                        setId: "",
                        abilityIds: [
                            "",
                        ]
                    },
                    R: "",
                    P: ""
                },
                equipment: [
                    {slot: 1, itemId: "" },
                ]
            },
            {
                name: "Support mages",
                job: "Mage-type enemies",
                abilities: {
                    A1: {
                        setId: "",
                        abilityIds: [
                        
                        ]
                    },
                    A2: {
                        setId: "",
                        abilityIds: [
                            "",
                        ]
                    },
                    R: "",
                    P: ""
                },
                equipment: [
                    {slot: 1, itemId: "" },
                ]
            }
        ],
        strategy: [
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
        objective: "Confront Vaan’s crew and win the battle in the mountains.",
        law: "Not Moving 1 Tile: each unit must move exactly one tile before ending its turn.",
        enemies: [
            {
                name: "Vaan",
                job: "Sky pirate",
                abilities: {
                    A1: {
                        setId: "",
                        abilityIds: [
                        
                        ]
                    },
                    A2: {
                        setId: "",
                        abilityIds: [
                            "",
                        ]
                    },
                    R: "",
                    P: ""
                },
                equipment: [
                    {slot: 1, itemId: "" },
                ]
            },
            {
                name: "Penelo and crew",
                job: "Sky pirate allies",
                abilities: {
                    A1: {
                        setId: "",
                        abilityIds: [
                        
                        ]
                    },
                    A2: {
                        setId: "",
                        abilityIds: [
                            "",
                        ]
                    },
                    R: "",
                    P: ""
                },
                equipment: [
                    {slot: 1, itemId: "" },
                ]
            }
        ],
        strategy: [
            "Plan every move so each unit advances exactly one tile; don’t skip moves or overstep.",
            "Use ranged attacks and abilities that don’t require large movement to stay effective under the law.",
            "Focus on isolating and collapsing on individual sky pirates rather than charging the entire group."
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
        objective: "Answer the request by defeating all enemies in the ruins.",
        law: "Being Robbed: having gil or items stolen is forbidden.",
        enemies: [
            {
                name: "Thieves and rogues",
                job: "Steal-focused units",
                abilities: {
                    A1: {
                        setId: "",
                        abilityIds: [
                        
                        ]
                    },
                    A2: {
                        setId: "",
                        abilityIds: [
                            "",
                        ]
                    },
                    R: "",
                    P: ""
                },
                equipment: [
                    {slot: 1, itemId: "" },
                ]
            },
            {
                name: "Support jobs",
                job: "Mixed",
                abilities: {
                    A1: {
                        setId: "",
                        abilityIds: [
                        
                        ]
                    },
                    A2: {
                        setId: "",
                        abilityIds: [
                            "",
                        ]
                    },
                    R: "",
                    P: ""
                },
                equipment: [
                    {slot: 1, itemId: "" },
                ]
            }
        ],
        strategy: [
            "Prioritize thieves and steal-oriented enemies so they don’t trigger the law.",
            "Keep your units close enough to protect each other from pickpockets.",
            "Use status effects to pin down or disable enemies with obvious steal skills."
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
        objective: "Protect the excavation by defeating all hostile forces.",
        law: "Fire, Ice, Lightning: actions and weapons that use fire, ice, or lightning are forbidden.",
        enemies: [
            {
                name: "Excavation raiders",
                job: "Mixed clan",
                abilities: {
                    A1: {
                        setId: "",
                        abilityIds: [
                        
                        ]
                    },
                    A2: {
                        setId: "",
                        abilityIds: [
                            "",
                        ]
                    },
                    R: "",
                    P: ""
                },
                equipment: [
                    {slot: 1, itemId: "" },
                ]
            },
            {
                name: "Elemental casters",
                job: "Mage-type enemies",
                abilities: {
                    A1: {
                        setId: "",
                        abilityIds: [
                        
                        ]
                    },
                    A2: {
                        setId: "",
                        abilityIds: [
                            "",
                        ]
                    },
                    R: "",
                    P: ""
                },
                equipment: [
                    {slot: 1, itemId: "" },
                ]
            }
        ],
        strategy: [
            "Lock away any fire, ice, or lightning-based skills and weapons for this fight.",
            "Rely on neutral or off-element damage sources like physical skills, wind, or holy.",
            "Establish a defensive line near the dig site and defeat incoming waves as they arrive."
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
        objective: "Win the battle in the desert while dealing with impaired visibility.",
        law: "Ranged Weapons: attacks with bows, greatbows, guns, hand-cannons, and cards are forbidden.",
        enemies: [
            {
                name: "Desert raiders",
                job: "Mixed melee",
                abilities: {
                    A1: {
                        setId: "",
                        abilityIds: [
                        
                        ]
                    },
                    A2: {
                        setId: "",
                        abilityIds: [
                            "",
                        ]
                    },
                    R: "",
                    P: ""
                },
                equipment: [
                    {slot: 1, itemId: "" },
                ]
            },
            {
                name: "Ranged units",
                job: "Archers / gunners",
                abilities: {
                    A1: {
                        setId: "",
                        abilityIds: [
                        
                        ]
                    },
                    A2: {
                        setId: "",
                        abilityIds: [
                            "",
                        ]
                    },
                    R: "",
                    P: ""
                },
                equipment: [
                    {slot: 1, itemId: "" },
                ]
            }
        ],
        strategy: [
            "Close distance quickly on enemy ranged units using mobility skills and direct paths.",
            "Focus on gap-closing melee and magic instead of forbidden ranged weapons.",
            "Use buffs and positioning to reduce incoming damage while you advance."
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
        objective: "Deal with the sky pirate trouble in Camoa.",
        law: "Harming Bangaa: actions that harm bangaa are forbidden.",
        enemies: [
            {
                name: "Sky pirates",
                job: "Mixed jobs",
                abilities: {
                    A1: {
                        setId: "",
                        abilityIds: [
                        
                        ]
                    },
                    A2: {
                        setId: "",
                        abilityIds: [
                            "",
                        ]
                    },
                    R: "",
                    P: ""
                },
                equipment: [
                    {slot: 1, itemId: "" },
                ]
            },
            {
                name: "Non-bangaa support",
                job: "Humans / moogles / others",
                abilities: {
                    A1: {
                        setId: "",
                        abilityIds: [
                        
                        ]
                    },
                    A2: {
                        setId: "",
                        abilityIds: [
                            "",
                        ]
                    },
                    R: "",
                    P: ""
                },
                equipment: [
                    {slot: 1, itemId: "" },
                ]
            }
        ],
        strategy: [
            "Identify bangaa enemies early and plan your targeting to avoid them.",
            "Rely on crowd control, buffs, and positioning to manage bangaa without direct damage.",
            "Pick off other pirates to shrink the enemy action economy before dealing with special cases."
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
        objective: "Disrupt the ritual by defeating Illua.",
        law: "Harming Males: actions that harm male units are forbidden.",
        enemies: [
            {
                name: "Illua",
                job: "Boss spellblade",
                abilities: {
                    A1: {
                        setId: "",
                        abilityIds: [
                        
                        ]
                    },
                    A2: {
                        setId: "",
                        abilityIds: [
                            "",
                        ]
                    },
                    R: "",
                    P: ""
                },
                equipment: [
                    {slot: 1, itemId: "" },
                ]
            },
            {
                name: "Ritualists and guards",
                job: "Mixed jobs",
                abilities: {
                    A1: {
                        setId: "",
                        abilityIds: [
                        
                        ]
                    },
                    A2: {
                        setId: "",
                        abilityIds: [
                            "",
                        ]
                    },
                    R: "",
                    P: ""
                },
                equipment: [
                    {slot: 1, itemId: "" },
                ]
            }
        ],
        strategy: [
            "Keep track of which enemies are male to avoid tripping the law with careless attacks.",
            "Bring durable units and strong single-target damage to focus Illua down efficiently.",
            "Consider buffs, debuffs (when allowed), and reaction abilities to survive her bursts."
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
        objective: "Defeat Illua once and for all at the heart of the ruins.",
        law: "Buffs: abilities and actions that raise stats or apply positive status effects are forbidden.",
        enemies: [
            {
                name: "Illua",
                job: "Boss spellblade",
                abilities: {
                    A1: {
                        setId: "",
                        abilityIds: [
                        
                        ]
                    },
                    A2: {
                        setId: "",
                        abilityIds: [
                            "",
                        ]
                    },
                    R: "",
                    P: ""
                },
                equipment: [
                    {slot: 1, itemId: "" },
                ]
            },
            {
                name: "Summoned fiends",
                job: "Assorted monsters",
                abilities: {
                    A1: {
                        setId: "",
                        abilityIds: [
                        
                        ]
                    },
                    A2: {
                        setId: "",
                        abilityIds: [
                            "",
                        ]
                    },
                    R: "",
                    P: ""
                },
                equipment: [
                    {slot: 1, itemId: "" },
                ]
            },
        ],
        strategy: [
            "Bring your strongest attackers and at least one reliable healer; this is a pure damage and survival check.",
            "Decide early whether to send agile units along the short high-ground route or take the long path clearing monsters as you go.",
            "Keep ranged attackers in the back line to pick off monsters as they appear while your frontline advances.",
            "Once you reach Illua, focus on accurate, high-damage attacks to finish her quickly before her burst damage overwhelms you.",
            "Consider item-based damage and other ways to bypass the Buffs law, and keep your healer safely away from the front line.",
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
        objective: "Defeat Neukhia by destroying all of its parts.",
        law: "Reaction Abilities: abilities that trigger as reactions are forbidden.",
        enemies: [
            {
                name: "Neukhia (Wisp)",
                job: "Boss segment",
                abilities: {
                    A1: {
                        setId: "",
                        abilityIds: [
                        
                        ]
                    },
                    A2: {
                        setId: "",
                        abilityIds: [
                            "",
                        ]
                    },
                    R: "",
                    P: ""
                },
                equipment: [
                    {slot: 1, itemId: "" },
                ]
            },
            {
                name: "Neukhia (Pod)",
                job: "Boss segment",
                abilities: {
                    A1: {
                        setId: "",
                        abilityIds: [
                        
                        ]
                    },
                    A2: {
                        setId: "",
                        abilityIds: [
                            "",
                        ]
                    },
                    R: "",
                    P: ""
                },
                equipment: [
                    {slot: 1, itemId: "" },
                ]
            },
            {
                name: "Neukhia (Core)",
                job: "Final Boss",
                abilities: {
                    A1: {
                        setId: "",
                        abilityIds: [
                        
                        ]
                    },
                    A2: {
                        setId: "",
                        abilityIds: [
                            "",
                        ]
                    },
                    R: "",
                    P: ""
                },
                equipment: [
                    {slot: 1, itemId: "" },
                ]
            },
        ],
        strategy: [
            "Form small pairs or squads and fan out to quickly track down and destroy the Wisp; you cannot afford to chase it with the whole party.",
            "Once the Wisp is gone, regroup and focus on the Pod so you are not taking constant chip damage while fighting the Core.",
            "When the Core becomes vulnerable, unleash your strongest attacks and plan your turns for sustained damage over a long fight.",
            "When crystals appear, immediately redirect your attacks to destroy them; doing so can damage the Core and prevents them from punishing your team.",
            "Build a party that can handle long battles, with strong healing, item use, and ways to deal damage even under the Reaction Abilities law.",
        ],
        rewards: {
            gil: 0,
            cp: 0,
            loot: "Completion of the main story and access to post-game content.",
        },
        tags: ["story", "finale", "boss", "ex-mission"],
    }
];
