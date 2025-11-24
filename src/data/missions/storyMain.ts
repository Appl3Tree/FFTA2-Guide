import type { Mission } from "../../types/ffta2";

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
                job: "Crushatrice",
                notes: "A cockatrice of prodigious size. It uses its massive bulk as a weapon.",
                abilities: {
                    A1: {
                        setId: "territorialism",
                        abilityIds: [
                            "peck",
                            "territorial-marking",
                        ],
                    },
                    // A2, R, P can be filled when confirmed
                    /*Examples:
                    A2: {
                        setId: "blade-arts",
                        abilityIds: [
                            "oil-blade",
                        ],
                    },
                    R: "counter",
                    P: "Move +1"*/
                },
                equipment: [
                    /*{ slot: 1, itemId: "broadsword" },
                    { slot: 2, itemId: "broadsword" },
                    { slot: 3, itemId: "broadsword" },
                    { slot: 4, itemId: "broadsword" },
                    { slot: 5, itemId: "broadsword" },*/
                ],
            },
            {
                name: "Randomized Name",
                job: "Cockatrice",
                notes: "An avian creature with a violent temperament. It pecks at its foes with a razor-edged beak.",
                abilities: {
                    A1: {
                        setId: "territorialism",
                        abilityIds: [
                            "peck", // this one only has Peck
                        ],
                    },
                },
                equipment: [],
            },
            {
                name: "Randomized Name",
                job: "Cockatrice",
                notes: "An avian creature with a violent temperament. It pecks at its foes with a razor-edged beak.",
                abilities: {
                    A1: {
                        setId: "territorialism",
                        abilityIds: [
                            "peck", // also only Peck, for now
                        ],
                    },
                },
                equipment: [],
            },
        ],
        battlefield: [
            "Battle takes place in Targ Wood with uneven terrain and some height differences.",
            "Luso joins mid-fight as a Soldier alongside Cid and a small allied squad.",
            "Klesta starts up front, with smaller birds scattered nearby as support."
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
        objective: "Defeat the beasts menacing the chocobos on the woodland road.",
        law: "Fire: weapons and abilities that deal fire damage are forbidden.",
        enemies: [
            {
                name: "Wolves",
                job: "Beast",
                notes: "Mobile melee attackers; they hit hard if allowed to surround your units."
            },
            {
                name: "Support beasts",
                job: "Beast",
                notes: "A mix of additional monsters that mostly serve to flank and chip down your frontliners."
            }
        ],
        battlefield: [
            "Fight takes place on a relatively small section of Targ Wood with little verticality.",
            "Your clan starts bunched near the edge of the map, enemies spread ahead.",
            "Limited space means enemies close quickly, so your formation matters."
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
                notes: "Bandits with simple physical jobs like Soldier and Archer; they’re not individually scary but can swarm."
            },
            {
                name: "Yellow Wings Leader",
                job: "Human boss",
                notes: "Tougher than the grunts; expect higher HP and slightly stronger attacks."
            }
        ],
        battlefield: [
            "Battle is on a road-like map with a clear front line and some side paths.",
            "Enemies are generally ahead of you, forming a loose screen around their leader.",
            "Line of sight and positioning for ranged units matter more than height here."
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
                notes: "Resilient to some magic damage types; can inflict status or chip your party."
            },
            {
                name: "Supporting beasts",
                job: "Beast",
                notes: "Supplement the main enemies with straightforward physical attacks."
            }
        ],
        battlefield: [
            "Battle takes place in the streets around Camoa, with tight lanes and corners.",
            "Enemies are clustered around the middle of the map where the ‘cargo’ is threatened.",
            "Limited sight lines favor melee fighters and short-range spells."
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
                notes: "Hits hard with physical attacks and has a lot of HP."
            },
            {
                name: "Beast escorts",
                job: "Beast",
                notes: "Additional monsters that help Ughor flank and pressure your squishier units."
            }
        ],
        battlefield: [
            "Rolling hills with height differences typical of Baptiste Hill.",
            "Ughor tends to hold the high ground while support monsters fan out around him.",
            "Narrow paths can funnel your party if you rush straight in."
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
                notes: "Extremely strong physical damage and high HP; a serious midgame check."
            },
            {
                name: "Beast allies",
                job: "Beast",
                notes: "Additional monsters that help screen for Gilmunto and punish overextended units."
            }
        ],
        battlefield: [
            "High-altitude terrain of the Aldanna Range with sharp elevation changes.",
            "Narrow ridges and ledges create natural choke points.",
            "Enemies often start in positions that force you to climb into their threat range."
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
                notes: "Often resist fire and may exploit fire-element attacks."
            },
            {
                name: "Support casters",
                job: "Mage-type enemies",
                notes: "Provide elemental damage and buffs from the back line."
            }
        ],
        battlefield: [
            "Dense forest map with trees and water patches, typical of Zedlei Forest.",
            "Some enemies start clustered around choke points, others on small rises.",
            "Limited visibility and narrow lanes favor careful pulls over rushing."
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
                notes: "Can leverage terrain and may exploit water-adjacent tiles."
            },
            {
                name: "Support monsters",
                job: "Mixed",
                notes: "Round out the enemy force with status or ranged pressure."
            }
        ],
        battlefield: [
            "Subterranean-feeling map with pits and tight paths in the Galerria Deep.",
            "Plenty of elevation shifts that can trap slow units.",
            "Enemy groups like to hold chokepoints to make you fight uphill."
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
                notes: "Standard jobs with moderate stats; nothing exotic but they hit hard in groups."
            },
            {
                name: "Ranged threats",
                job: "Archers / casters",
                notes: "Use elevation and range to chip your squad if left alone."
            }
        ],
        battlefield: [
            "Steep mountain terrain with high ridges and low valleys.",
            "Enemies are spread out on higher platforms, giving them range advantage.",
            "Movement abilities or good positioning are key to reaching the back line."
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
                notes: "A mixed party that can include ranged and melee jobs."
            },
            {
                name: "Support casters",
                job: "Mage-type enemies",
                notes: "Capable of healing and buffing their allies if not interrupted."
            }
        ],
        battlefield: [
            "Dockside map with scaffolding and elevation changes around Moorabella.",
            "Narrow walkways around airships create opportunities to control positioning.",
            "Falling behind in positioning lets enemies pile onto isolated units."
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
                notes: "Use status and elemental attacks that combine well with swamp terrain."
            },
            {
                name: "Enemy casters",
                job: "Mage-type enemies",
                notes: "Can chain actions you might be tempted to copy, baiting law violations."
            }
        ],
        battlefield: [
            "Swampy terrain with water tiles, height changes, and movement penalties.",
            "Enemies often stand on favorable tiles that hamper your mobility.",
            "Ranged lines of fire can be awkward due to water and elevation."
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
                notes: "Central threat; can hit hard and may have annoying resistances."
            },
            {
                name: "Ghosts and undead",
                job: "Undead",
                notes: "Support the Oversoul with status and attrition damage."
            }
        ],
        battlefield: [
            "Mine interior with narrow corridors and small open chambers.",
            "Enemies can bottleneck you at corners if you advance too fast.",
            "Limited lines of sight can make it tricky to keep healers safe."
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
                notes: "Includes female enemies you must avoid hurting directly under the law."
            },
            {
                name: "Male frontliners",
                job: "Melee units",
                notes: "Safer to target when the law is active."
            }
        ],
        battlefield: [
            "Windy plains of Aisenfield with open sight lines and flowing terrain.",
            "Enemies are scattered around central performance areas.",
            "Few hard chokepoints; most fighting happens in open tiles."
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
                notes: "Protect the stone and try to punish clumped formations."
            },
            {
                name: "Support mages",
                job: "Mage-type enemies",
                notes: "Threaten you with area spells (which you cannot mirror due to the law)."
            }
        ],
        battlefield: [
            "Open fields with some elevation, typical of the Bisga Greenlands.",
            "The stone and its guards are near the center, forcing you to push into their zone.",
            "Enemies are spaced to tempt you into big AoE plays, which you must avoid."
        ],
        strategy: [
            "Avoid global or large-radius AoE that targets the entire battlefield.",
            "Use focused single-target skills and small-radius area attacks that don’t violate the law.",
            "Pull enemies off the central area to safer ground before committing to fights."
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
                notes: "Agile melee attacker with strong mobility and decent damage."
            },
            {
                name: "Penelo and crew",
                job: "Sky pirate allies",
                notes: "Provide support, healing, and extra damage; treat them as a full clan."
            }
        ],
        battlefield: [
            "Rupie Mountains terrain with narrow paths and multi-level cliffs.",
            "Enemy sky pirates can exploit terrain and elevation to kite or flank.",
            "Your own movement is tightly constrained by the law."
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
                notes: "Specialize in stealing gil and items; direct law interaction."
            },
            {
                name: "Support jobs",
                job: "Mixed",
                notes: "Help set up steals or soften your units for follow-up attacks."
            }
        ],
        battlefield: [
            "Ancient ruins with tight corridors and open plazas.",
            "Plenty of line-of-sight breaks for enemies to approach unseen.",
            "Treasure-style theming hints at steal-heavy enemy behavior."
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
                notes: "Balanced group with both melee and magic, trying to disrupt the dig."
            },
            {
                name: "Elemental casters",
                job: "Mage-type enemies",
                notes: "Would normally lean on fire/ice/lightning but the law pushes them to other options."
            }
        ],
        battlefield: [
            "Goug-style industrial ruins surrounding a dig site.",
            "Multiple height levels, walkways, and choke points near the excavation area.",
            "Enemies can ambush from different angles if you split too far."
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
                notes: "Use the open sands to try to surround your units."
            },
            {
                name: "Ranged units",
                job: "Archers / gunners",
                notes: "Exploit distance; you must counter them without using your own forbidden ranged weapons."
            }
        ],
        battlefield: [
            "Wide-open desert terrain in Kthili Sands with minimal cover.",
            "Visibility and movement are straightforward, but you can be attacked from many directions.",
            "Some height variations and dunes can marginally affect line of sight."
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
                notes: "Includes bangaa you must avoid damaging under the law."
            },
            {
                name: "Non-bangaa support",
                job: "Humans / moogles / others",
                notes: "Safer targets while the law is active."
            }
        ],
        battlefield: [
            "Urban Camoa terrain with alleys, stairs, and rooftops.",
            "Pirates are positioned to ambush around corners and chokepoints.",
            "Tight spaces make it easy to accidentally hit bangaa with AoE."
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
                notes: "Powerful boss with strong magic and sword skills; centerpiece of the encounter."
            },
            {
                name: "Ritualists and guards",
                job: "Mixed jobs",
                notes: "Additional enemies that support Illua with damage and utility."
            }
        ],
        battlefield: [
            "Large chamber within the Ruins of Delgantua, set up as a ritual arena.",
            "Enemies are positioned around Illua, encouraging you to push inward.",
            "Limited safe tiles if you ignore enemy positioning; missteps can leave you surrounded."
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
                notes: "Returns even stronger than before; high speed, heavy magic and physical damage, and punishing area attacks.",
            },
            {
                name: "Summoned fiends",
                job: "Assorted monsters",
                notes: "Monsters supporting Illua; can pressure you if left unchecked while you advance.",
            },
        ],
        battlefield: [
            "Upper platform deep within the Ruins of Delgantua, continuing directly from the previous battle.",
            "Illua stands on the far side of the arena with monsters flanking her and blocking direct approach routes.",
            "One route is a shorter, high-elevation path that favors units with high jump or strong mobility.",
            "The longer route circles the field and forces you through enemy groups before you reach Illua.",
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
                notes: "Moves around the arena and can vanish between attacks; must be hunted down before you can meaningfully pressure the core.",
            },
            {
                name: "Neukhia (Pod)",
                job: "Boss segment",
                notes: "Plays a defensive role but still deals serious damage; must be destroyed along with the Wisp.",
            },
            {
                name: "Neukhia (Core)",
                job: "Final Boss",
                notes: "Central body with very high HP; periodically summons crystal structures that must be destroyed quickly.",
            },
        ],
        battlefield: [
            "Strange arena suspended in the Rift, with Neukhia in the center and its parts positioned around the map.",
            "The Wisp moves and may disappear after or between attacks, forcing you to spread out in small teams to corner it.",
            "The Pod holds position and punishes slow play with steady damage.",
            "The Core is initially protected; its crystal spawns can either be turned against it or allowed to unleash damage on your party.",
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
