// src/data/races/raceJobs.ts
import type { RaceJobs } from "../../types/ffta2";

export const RACE_JOBS: RaceJobs[] = [
    {
        race: "Hume",
        tagline: "Flexible all-rounders with the widest job pool and strong hybrid options.",
        jobs: [
            {
                name: "Soldier",
                role: "Frontline bruiser",
                summary: "Basic melee fighter with solid stats and simple debuffs that carry you through the early arcs.",
                notes: "You’ll run Soldier early mostly to unlock Paladin and Fighter; its abilities still matter in the first few ranks."
            },
            {
                name: "Thief",
                role: "Utility melee / speed",
                summary: "Fast melee job focused on stealing and mobility, with good speed growth and access to key support abilities.",
                notes: "Worth dipping into for speed and basic steal tools even if you don’t keep anyone as a pure Thief long term."
            },
            {
                name: "Archer",
                role: "Ranged physical",
                summary: "Bow-using attacker that chips from range and brings minor control effects like Slow or Immobilize.",
                notes: "Mainly a stepping stone into Hunter; its range is useful early but falls off once stronger jobs unlock."
            },
            {
                name: "White Mage",
                role: "Primary healer",
                summary: "Core healing and support job with Cure, Esuna-style cleanses, and simple buffs that keep your clan alive.",
                notes: "Even late game, White Magic stays relevant as a secondary set on many jobs."
            },
            {
                name: "Black Mage",
                role: "Elemental caster",
                summary: "Classic offensive mage with fire/ice/lightning magic to punish clustered enemies and elemental weaknesses.",
                notes: "Also serves as a prerequisite for Blue Mage and Illusionist, so you’ll see it on several units early."
            },
            {
                name: "Fighter",
                role: "Heavy physical attacker",
                summary: "High-power melee job with strong single-target and line attacks that trade subtlety for raw damage.",
                notes: "A straightforward way to scale your physical damage once you have enough Soldier abilities."
            },
            {
                name: "Paladin",
                role: "Tank / support melee",
                summary: "Defensive job with protective abilities, self-sustain, and utility skills that help control the frontline.",
                notes: "Pairs well with support or spell sets to create durable anchors that rarely go down."
            },
            {
                name: "Ninja",
                role: "Evasive DPS / double-wield",
                summary: "Fast, fragile striker with high evasion, multi-hit skills, and access to dual-wielding for huge damage.",
                notes: "Often used as a base for endgame physical builds thanks to its speed and Doublesword synergy."
            },
            {
                name: "Hunter",
                role: "Ranged utility damage",
                summary: "Bow user with specialized shots and monster-targeting skills that hit weaknesses and control beasts.",
                notes: "A flexible ranged job that remains useful into late game, especially against monsters and marks."
            },
            {
                name: "Illusionist",
                role: "Wide-area caster",
                summary: "MP-hungry mage that hits every enemy with large elemental illusions, trading efficiency for coverage.",
                notes: "Shines in long fights or with MP support; best when you can afford to spend big on wide AoE."
            },
            {
                name: "Blue Mage",
                role: "Reactive caster / toolbox",
                summary: "Learns enemy skills and turns them into a varied kit of debuffs, support, and unusual attacks.",
                notes: "Slow to set up but very rewarding if you commit; your route can grab several useful blue skills naturally."
            },
            {
                name: "Parivir",
                role: "Elemental melee nuke",
                summary: "Sword user with devastating elemental blades that hit extremely hard and can punish weaknesses.",
                notes: "One of the strongest physical jobs once online; thrives with support that boosts damage or mobility."
            },
            {
                name: "Seer",
                role: "Late-game mage / MP loop",
                summary: "High-tier caster that manipulates MP and chains spells, enabling sustained magical offense.",
                notes: "A capstone job for Hume casters; the guide’s route assumes you only build into Seer once your magic core is stable."
            }
        ]
    },
    {
        race: "Viera",
        tagline: "Graceful specialists with top-tier magic, ranged offense, and assassin tools.",
        jobs: [
            {
                name: "Fencer",
                role: "Agile melee",
                summary: "Balanced melee job with decent speed and access to the sword skills that lead into advanced Viera jobs.",
                notes: "Frequently used as an early stepping stone into Red Mage, Spellblade, and Assassin."
            },
            {
                name: "White Mage",
                role: "Healer / support",
                summary: "Same core healing kit as Hume White Mage, attached to a race with strong magic growth and mobility.",
                notes: "Great as a secondary set on many Viera builds, especially those that want both damage and support."
            },
            {
                name: "Green Mage",
                role: "Support / debuffer",
                summary: "Focuses on buffs, debuffs, and status tools that set up your heavy hitters and mages.",
                notes: "Pairs well with ranged or magic-oriented jobs to keep enemies softened and allies powered up."
            },
            {
                name: "Archer",
                role: "Ranged physical",
                summary: "Bow-based ranged attacker with status arrows and reliable chip damage.",
                notes: "Useful early on, and later mainly serves as a bridge to Sniper for more advanced bow skills."
            },
            {
                name: "Elementalist",
                role: "Hybrid support mage",
                summary: "Combines elemental attacks and status effects, trading raw power for versatility and utility.",
                notes: "Strong midgame option that plays well with both physical and magical secondaries."
            },
            {
                name: "Red Mage",
                role: "Hybrid caster",
                summary: "Mix of white and black magic, giving access to both healing and offense on a single unit.",
                notes: "Red Magic also unlocks Spellblade; many strong Viera builds spend some time here."
            },
            {
                name: "Spellblade",
                role: "Melee elemental tech",
                summary: "Uses sword strikes imbued with elements and status effects to punch through defenses.",
                notes: "Combines well with support or mobility abilities to reach priority targets and disable them."
            },
            {
                name: "Summoner",
                role: "High-end AoE caster",
                summary: "Calls Scions and powerful summons that cover large areas with heavy damage and utility.",
                notes: "One of the best Viera magic jobs; expensive to run, but fights end quickly when it’s set up."
            },
            {
                name: "Assassin",
                role: "Burst / disable specialist",
                summary: "Extremely dangerous job with high damage skills and instant-death or disable-style abilities.",
                notes: "A key late-game threat on the enemy side and a powerful option for your own clan if you invest."
            },
            {
                name: "Sniper",
                role: "Elite bow user",
                summary: "Upgraded archer with precise shots, debuffs, and strong single-target ranged attacks.",
                notes: "Excellent at deleting problem targets from a safe distance, especially when supported by buffs."
            }
        ]
    },
    {
        race: "Bangaa",
        tagline: "Armored bruisers and holy knights with strong front-line presence.",
        jobs: [
            {
                name: "Warrior",
                role: "Melee fighter",
                summary: "Baseline physical job with good stats and straightforward weapon skills.",
                notes: "Acts as the starting point for several advanced Bangaa jobs like Gladiator and Dragoon."
            },
            {
                name: "White Monk",
                role: "Martial healer / support",
                summary: "Unarmed style job that mixes physical techniques with basic support and healing.",
                notes: "Carries self-sustain and utility, letting Bangaa hold the front even without a dedicated healer nearby."
            },
            {
                name: "Dragoon",
                role: "Anti-dragon / jump attacker",
                summary: "Spear-wielding job with jump attacks and dragon-slaying abilities.",
                notes: "Great in areas heavy on monsters and marks, and a strong general attacker even when dragons aren’t present."
            },
            {
                name: "Defender",
                role: "Tank / mitigation",
                summary: "Highly defensive job with skills that reduce damage taken and punish enemies that overextend.",
                notes: "Excellent anchor for blocking chokepoints and protecting your squishier backline."
            },
            {
                name: "Gladiator",
                role: "Aggressive physical DPS",
                summary: "Hard-hitting frontliner with elemental sword strikes and strong single-target tools.",
                notes: "A go-to late-game damage job when you want a Bangaa built for raw offense."
            },
            {
                name: "Master Monk",
                role: "Advanced martial artist",
                summary: "Upgraded monk-style job with strong melee skills and self-sufficiency.",
                notes: "Combines well with support abilities to stay alive while punching holes in enemy lines."
            },
            {
                name: "Bishop",
                role: "Holy mage / support",
                summary: "Mixes healing, dispels, and holy-flavored damage, giving Bangaa access to magical utility.",
                notes: "Useful as a secondary set for defensive Bangaa who need both healing and debuffs."
            },
            {
                name: "Templar",
                role: "Magic-resistant knight",
                summary: "Focuses on resisting and disrupting magic, with tools that shut down enemy casters.",
                notes: "Ideal for magic-heavy battles where shutting down spells is more important than raw damage."
            },
            {
                name: "Cannoneer",
                role: "Artillery support",
                summary: "Uses cannons to hit distant targets and provide support fire with unusual effects.",
                notes: "Requires some setup and positioning, but offers unique long-range coverage."
            },
            {
                name: "Trickster",
                role: "Luck-based ranged specialist",
                summary: "Uses cards and chance-driven abilities to inflict damage and statuses from afar.",
                notes: "A more technical job that rewards players who like playing around with probability and positioning."
            }
        ]
    },
    {
        race: "Nu Mou",
        tagline: "Slow but powerful casters with deep magical job options.",
        jobs: [
            {
                name: "White Mage",
                role: "Primary healer",
                summary: "Reliable healing and status-cleansing job built on high magic and resist growth.",
                notes: "Nu Mou make some of the best pure healers in the game when left to focus on support."
            },
            {
                name: "Black Mage",
                role: "Offensive caster",
                summary: "Heavy elemental damage dealer that exploits weaknesses and punishes clusters.",
                notes: "Nu Mou’s stats push Black Magic to very high damage numbers even without fancy combos."
            },
            {
                name: "Beastmaster",
                role: "Monster control",
                summary: "Issues commands to nearby monsters, letting you turn enemies into ad-hoc allies.",
                notes: "A niche but flavorful job; shines most when you plan around specific monster abilities."
            },
            {
                name: "Time Mage",
                role: "Turn manipulation / support",
                summary: "Controls turn order, slows enemies, and speeds up allies to tilt the action economy.",
                notes: "Pairs naturally with big casters and heavy hitters who benefit most from extra turns."
            },
            {
                name: "Illusionist",
                role: "Wide-area magic",
                summary: "Covers the field with all-enemy spells, trading efficiency for massive coverage.",
                notes: "Nu Mou Illusionists hit very hard but need good MP support or careful pacing."
            },
            {
                name: "Alchemist",
                role: "Item-flavored mage",
                summary: "Uses item-like skills and magicks to heal, buff, and damage with unusual effects.",
                notes: "Great for players who enjoy flexible, utility-heavy magic that doesn’t fit neat archetypes."
            },
            {
                name: "Arcanist",
                role: "Dark / control caster",
                summary: "Specializes in potent, often risky spells that manipulate HP, MP, and status in big swings.",
                notes: "A late-game job for when you want high impact and are comfortable managing risk."
            },
            {
                name: "Sage",
                role: "High-tier hybrid mage",
                summary: "Combines offensive and supportive magicks in one kit, letting a single unit cover many roles.",
                notes: "Excellent anchor for a magic-heavy party; can both hit hard and patch things up."
            },
            {
                name: "Scholar",
                role: "Area damage / terrain mage",
                summary: "Uses knowledge-themed abilities that hit in unusual patterns and exploit enemy weaknesses.",
                notes: "Rewards careful positioning and understanding of how its area skills will land."
            }
        ]
    },
    {
        race: "Moogle",
        tagline: "Tricksters, gunners, and support specialists with quirky toolkits.",
        jobs: [
            {
                name: "Animist",
                role: "Support / starter job",
                summary: "Entry-level Moogle job with simple buffs, debuffs, and utility abilities.",
                notes: "Frequently used early, then left behind as you unlock more specialized roles."
            },
            {
                name: "Thief",
                role: "Speedy utility",
                summary: "Fast melee / utility option giving Moogles access to classic steal tools and movement tricks.",
                notes: "Helps fill out your clan’s stealing needs if your Humes are busy in other jobs."
            },
            {
                name: "Black Mage",
                role: "Offensive magic",
                summary: "Standard elemental caster with solid damage from the back line.",
                notes: "Moogle Black Mages hit less hard than Nu Mou but bring better mobility and quirky pairings."
            },
            {
                name: "Moogle Knight",
                role: "Melee defender",
                summary: "Armored frontline job with defensive skills and solid physical presence.",
                notes: "Lets Moogles hold the line instead of being confined to support and ranged roles."
            },
            {
                name: "Fusilier",
                role: "Gun user / ranged DPS",
                summary: "Uses guns to deal reliable damage at long range, mostly ignoring elevation issues.",
                notes: "Excellent at sniping problematic units when supported by buffs or debuffs from allies."
            },
            {
                name: "Juggler",
                role: "Control / disruption",
                summary: "Specializes in turns tricks, statuses, and annoying effects rather than pure damage.",
                notes: "Strong in fights where slowing or disabling key enemies matters more than raw DPS."
            },
            {
                name: "Tinker",
                role: "Randomized support",
                summary: "Uses gadgets with unpredictable effects that can help or hinder.",
                notes: "A high-variance job for players who enjoy chaos and don’t mind occasional misfires."
            },
            {
                name: "Time Mage",
                role: "Turn control",
                summary: "Provides Haste, Slow, and other temporal tricks from a small, mobile body.",
                notes: "Pairs well with gunners and jugglers who benefit from acting more often."
            },
            {
                name: "Chocobo Knight",
                role: "Mounted fighter",
                summary: "Combines chocobo mobility with melee and support abilities.",
                notes: "Great for repositioning, hit-and-run play, and exploiting terrain in wide maps."
            },
            {
                name: "Flintlock",
                role: "Support artillery",
                summary: "Mixes cannon fire with battery-style support, charging up for stronger effects.",
                notes: "A late-game curiosity that can be very strong when you build a party around it."
            }
        ]
    },
    {
        race: "Seeq",
        tagline: "Greedy brawlers and raiders with brutal melee tools.",
        jobs: [
            {
                name: "Berserker",
                role: "Pure physical DPS",
                summary: "Relentless melee attacker with high raw damage and simple, hard-hitting skills.",
                notes: "Great for deleting single targets quickly when you can keep them properly supported."
            },
            {
                name: "Ranger",
                role: "Trap / field control",
                summary: "Lays traps and uses terrain-based tricks to control where enemies can safely stand.",
                notes: "Best on maps where chokepoints and predictable paths let you plan trap placement."
            },
            {
                name: "Viking",
                role: "Debuff melee / lightning",
                summary: "Uses axes and lightning-flavored skills to weaken enemies while still hitting hard.",
                notes: "A good mix of disruption and damage, especially against armored foes."
            },
            {
                name: "Lanista",
                role: "Arena specialist",
                summary: "Hybrid job with crowd-control moves and flashy finishing techniques.",
                notes: "Rewards aggressive positioning and works well when you want your Seeq to both bruise and control."
            }
        ]
    },
    {
        race: "Gria",
        tagline: "Winged attackers with high mobility and strong physical jobs.",
        jobs: [
            {
                name: "Hunter",
                role: "Mobile ranged attacker",
                summary: "Bow-using job that combines Gria mobility with solid ranged damage and monster tools.",
                notes: "A great default for Gria who want to pick off enemies from elevated positions."
            },
            {
                name: "Raptor",
                role: "Airborne melee",
                summary: "Close-range striker that leans on the Gria’s flight to reach awkward targets.",
                notes: "Shines on vertical maps where ground-bound enemies struggle to retaliate."
            },
            {
                name: "Ravager",
                role: "Heavy physical DPS",
                summary: "Swing-for-the-fences melee job with big, punishing attacks.",
                notes: "Best used as a finisher for softened targets or when you can safely commit to aggressive plays."
            },
            {
                name: "Geomancer",
                role: "Terrain-aware fighter",
                summary: "Draws power from terrain to deliver elemental or positional attacks.",
                notes: "Especially fun on varied maps where you can leverage different tiles for extra effects."
            }
        ]
    }
];

