// src/data/retroAchievements.ts (top import unchanged)
import type { RetroAchievement, GlobalRetroAchievement } from "../types/ffta2";

export const RETRO_ACHIEVEMENTS_BY_MISSION_ID: Record<string, RetroAchievement[]> = {
    "A1-01": [
        {
            id: "ra-stranger-clear",
            name: "Stranger in the Woods",
            description: 'Clear story mission "Stranger in the Woods".',
        },
        {
            id: "ra-it-starts",
            name: "It Starts",
            description:
                'During "Stranger in the Woods", defeat all enemies without Cid dying.',
            missable: true,
        },
        // NEW: Hard variant
        {
            id: "ra-stranger-in-the-woods-hard",
            name: "Stranger in the Woods (Hard)",
            description: 'Clear Story Mission "Stranger in the Woods"',
        },
    ],
    "A1-06": [
        {
            id: "ra-paw-clear",
            name: "A Paw Full of Feathers",
            description: 'Clear story mission "A Paw Full of Feathers".',
        },
        {
            id: "ra-kamikaze-cid",
            name: "Kamikaze Cid",
            description:
                'During "A Paw Full of Feathers", defeat all enemies without Cid taking damage three times.',
            missable: true,
        },
        // NEW: Hard variant
        {
            id: "ra-a-paw-full-of-feathers-clear-hard",
            name: "A Paw Full of Feathers (Hard)",
            description: 'Clear Story Mission "A Paw Full of Feathers"',
        },
    ],
    "A1-11": [
        {
            id: "ra-yellow-wings-clear",
            name: "Yellow Wings",
            description: 'Clear story mission "The Yellow Wings".',
        },
        {
            id: "ra-united-we-stand",
            name: "United We Stand",
            description:
                'During "The Yellow Wings", do not let any of your units die.',
            missable: true,
        },
        // NEW: Hard variant
        {
            id: "ra-yellow-wings-hard",
            name: "Yellow Wings (Hard)",
            description: 'Clear Story Mission "Yellow Wings"',
        },
    ],
    "A1-16": [
        {
            id: "ra-you-say-tomato-clear",
            name: "You Say Tomato",
            description: 'Clear story mission "You Say Tomato".',
        },
        {
            id: "ra-tomato-paste",
            name: "Tomato Paste",
            description:
                'During "You Say Tomato", defeat all "Deadly Nightshade" enemies before the "Alraune".',
            missable: true,
        },
        // NEW: Hard variant
        {
            id: "ra-you-say-tomato-hard",
            name: "You Say Tomato (Hard)",
            description: 'Clear Story Mission "You Say Tomato"',
        },
    ],
    "B2-01": [
        {
            id: "ra-ughor-clear",
            name: "Wanted: Ugohr!",
            description: 'Clear story mission "Wanted: Ugohr!".',
        },
        {
            id: "ra-turtle-power",
            name: "Turtle Power",
            description:
                'During "Wanted: Ugohr!", defeat all other enemies before defeating Ugohr.',
            missable: true,
        },
        // NEW: Hard variant
        {
            id: "ra-wanted-ughor-hard",
            name: "Wanted: Ugohr! (Hard)",
            description: 'Clear Story Mission "Wanted: Ugohr!"',
        },
    ],
    "B2-06": [
        {
            id: "ra-gilmunto-clear",
            name: "Wanted: Gilmunto!",
            description: 'Clear story mission "Wanted: Gilmunto!".',
        },
        {
            id: "ra-dragon-force",
            name: "Dragon Force",
            description:
                'During "Wanted: Gilmunto!", defeat all other enemies before defeating Gilmunto.',
            missable: true,
        },
        // NEW: Hard variant
        {
            id: "ra-wanted-gilmunto-hard",
            name: "Wanted: Gilmunto! (Hard)",
            description: 'Clear Story Mission "Wanted: Gilmunto!"',
        },
    ],
    "B2-11": [
        {
            id: "ra-now-thats-fire-clear",
            name: "Now That's Fire!",
            description: 'Clear story mission "Now That\'s Fire!".',
        },
        {
            id: "ra-sleeping-death",
            name: "Sleeping Death",
            description:
                'During "Now That\'s Fire!", defeat all enemies without any party member being Poisoned.',
            missable: true,
        },
        // NEW: Hard variant
        {
            id: "ra-now-thats-fire-hard",
            name: "Now That\'s Fire! (Hard)",
            description: 'Clear Story Mission "Now That\'s Fire!"',
        },
    ],
    "B2-16": [
        {
            id: "ra-pearls-clear",
            name: "Pearls in the Deep",
            description: 'Clear story mission "Pearls in the Deep".',
        },
        {
            id: "ra-sandstorm",
            name: "Sandstorm",
            description:
                'During "Pearls in the Deep", defeat "Flowsand Lord" while only attacking it when there are two "Pit Beasts" alive.',
            missable: true,
        },
        // NEW: Hard variant
        {
            id: "ra-pearls-in-the-deep-hard",
            name: "Pearls in the Deep (Hard)",
            description: 'Clear Story Mission "Pearls in the Deep"',
        },
    ],
    "C3-01": [
        {
            id: "ra-mountain-watch-clear",
            name: "Mountain Watch",
            description: 'Clear story mission "Mountain Watch".',
        },
        {
            id: "ra-equivalent-exchange",
            name: "Equivalent Exchange",
            description:
                'During "Mountain Watch", defeat Ewen while he only gets one turn.',
            missable: true,
        },
        // NEW
        {
            id: "ra-mountain-watch-hard",
            name: "Mountain Watch (Hard)",
            description: 'Clear Story Mission "Mountain Watch"',
        },
    ],
    "C3-06": [
        {
            id: "ra-grounded-clear",
            name: "Grounded!",
            description: 'Clear story mission "Grounded!".',
        },
        {
            id: "ra-law-abiding-citizen",
            name: "Law Abiding Citizen",
            description:
                'During "Grounded!", clear the mission without breaking the law.',
            missable: true,
        },
        // NEW
        {
            id: "ra-grounded-hard",
            name: "Grounded! (Hard)",
            description: 'Clear Story Mission "Grounded!"',
        },
    ],
    "C3-11": [
        {
            id: "ra-rumors-abound-clear",
            name: "Rumors Abound",
            description: 'Clear story mission "Rumors Abound".',
        },
        {
            id: "ra-evil-dead",
            name: "Evil Dead",
            description:
                'During "Rumors Abound", complete the mission without using any Phoenix Downs.',
            missable: true,
        },
        // NEW
        {
            id: "ra-rumors-abound-hard",
            name: "Rumors Abound (Hard)",
            description: 'Clear Story Mission "Rumors Abound"',
        },
    ],
    "C3-16": [
        {
            id: "ra-sleepless-clear",
            name: "Sleepless Nights",
            description: 'Clear story mission "Sleepless Nights".',
        },
        {
            id: "ra-nightmares",
            name: "Nightmares",
            description:
                'During "Sleepless Nights", finish the objective without consuming MP.',
            missable: true,
        },
        // NEW
        {
            id: "ra-sleepless-nights-hard",
            name: "Sleepless Nights (Hard)",
            description: 'Clear Story Mission "Sleepless Nights"',
        },
    ],
    "D4-01": [
        {
            id: "ra-making-music-clear",
            name: "Making Music",
            description: 'Clear story mission "Making Music".',
        },
        {
            id: "ra-trap-card",
            name: "I Activate My Trap Card!",
            description:
                'During "Making Music", clear the mission before the Ranger places two traps.',
            missable: true,
        },
        // NEW
        {
            id: "ra-making-music-hard",
            name: "Making Music (Hard)",
            description: 'Clear Story Mission "Making Music"',
        },
    ],
    "D4-06": [
        {
            id: "ra-seeking-stone-clear",
            name: "Seeking the Stone",
            description: 'Clear story mission "Seeking the Stone".',
        },
        {
            id: "ra-slow-and-steady",
            name: "Slow & Steady",
            description:
                'During "Seeking the Stone", do not let any of your characters take more than two steps in a single turn.',
            missable: true,
        },
        // NEW
        {
            id: "ra-seeking-the-stone-hard",
            name: "Seeking the Stone (Hard)",
            description: 'Clear Story Mission "Seeking the Stone"',
        },
    ],
    "D4-11": [
        {
            id: "ra-sky-pirate-vaan-clear",
            name: "Wanted: Sky Pirate Vaan",
            description: 'Clear story mission "Wanted: Sky Pirate Vaan".',
        },
        {
            id: "ra-one-on-one",
            name: "One on One",
            description:
                'During "Wanted: Sky Pirate Vaan", do not hit more than once in a single turn.',
            missable: true,
        },
        // NEW
        {
            id: "ra-wanted-sky-pirate-vaan-hard",
            name: "Wanted: Sky Pirate Vaan (Hard)",
            description: 'Clear Story Mission "Wanted: Sky Pirate Vaan"',
        },
    ],
    "D4-16": [
        {
            id: "ra-a-request-clear",
            name: "A Request",
            description: 'Clear story mission "A Request".',
        },
        {
            id: "ra-fire-the-cannon",
            name: "Fire The Cannon!",
            description:
                'During "A Request", trigger the explosion four times before defeating Neukhia.',
            missable: true,
        },
        // NEW
        {
            id: "ra-a-request-clear-hard",
            name: "A Request (Hard)",
            description: 'Clear Story Mission "A Request"',
        },
    ],
    "E5-01": [
        {
            id: "ra-the-dig-clear",
            name: "The Dig",
            description: 'Clear story mission "The Dig".',
        },
        {
            id: "ra-elemental-block",
            name: "Elemental Block",
            description:
                'During "The Dig", do not use any fire, ice, or lightning attacks, spells, or weapons.',
            missable: true,
        },
        // NEW
        {
            id: "ra-the-dig-hard",
            name: "The Dig (Hard)",
            description: 'Clear Story Mission "The Dig"',
        },
    ],
    "E5-06": [
        {
            id: "ra-through-anothers-eyes-clear",
            name: "Through Another's Eyes",
            description:
                'Clear story mission "Through Another\'s Eyes".',
        },
        {
            id: "ra-so-close-yet-so-far",
            name: "So Close, Yet So Far Away",
            description:
                'During "Through Another\'s Eyes", clear the mission without using ranged weapons.',
            missable: true,
        },
        // NEW
        {
            id: "ra-through-anothers-eyes-hard",
            name: "Through Another's Eyes (Hard)",
            description: 'Clear Story Mission "Through Another\'s Eyes"',
        },
    ],
    "E5-11": [
        {
            id: "ra-pirate-problems-clear",
            name: "Pirate Problems",
            description: 'Clear story mission "Pirate Problems".',
        },
        {
            id: "ra-imposter-domination",
            name: "Imposter Domination",
            description:
                'During "Pirate Problems", defeat "Vaan?" in three hits or fewer.',
            missable: true,
        },
        // NEW
        {
            id: "ra-pirate-problems-hard",
            name: "Pirate Problems (Hard)",
            description: 'Clear Story Mission "Pirate Problems"',
        },
    ],
    "E5-16": [
        {
            id: "ra-the-ritual-clear",
            name: "The Ritual",
            description: 'Clear story mission "The Ritual".',
        },
        {
            id: "ra-my-judge",
            name: "My Judge!",
            description:
                'During "The Ritual", uphold the law and do not let Illua dismiss the Judge.',
            missable: true,
        },
        // NEW
        {
            id: "ra-the-ritual-hard",
            name: "The Ritual (Hard)",
            description: 'Clear Story Mission "The Ritual"',
        },
    ],
    "EX-01": [
        {
            id: "ra-two-grimoires-clear",
            name: "The Two Grimoires",
            description: 'Clear story mission "The Two Grimoires".',
        },
        {
            id: "ra-the-end",
            name: "The End?",
            description:
                'During "The Two Grimoires", defeat Illua while upholding the law and collecting the chest.',
            missable: true,
        },
        // NEW
        {
            id: "ra-the-two-grimoires-hard",
            name: "The Two Grimoires (Hard)",
            description: 'Clear Story Mission "The Two Grimoires"',
        },
    ],
    "EX-02": [
        {
            id: "ra-from-the-rift-clear",
            name: "From the Rift",
            description: 'Clear the final mission "From the Rift".',
        },
        {
            id: "ra-all-or-nothing",
            name: "All or Nothing",
            description:
                'During "From the Rift", defeat all three parts of Neukhia.',
            missable: true,
        },
        // NEW
        {
            id: "ra-from-the-rift-hard",
            name: "From the Rift (Hard)",
            description: 'Clear The Final Mission "From the Rift"',
        },
    ],

    // NEW OPTIONAL-MISSION HOOKS

    "C4-04": [
        {
            id: "ra-cat-burglar",
            name: "Cat Burglar",
            description:
                'During "The Cat\'s Meow" Obtain both Treasure Chests while avoiding all the traps',
            missable: true,
        },
    ],
    "C4-06": [
        {
            id: "ra-dont-fear-the-moogle",
            name: "Don't Fear The Moogle",
            description:
                'Complete Quest "Of Kupos and Cannons" without Harming a Moogle',
            missable: true,
        },
    ],
    "B4-04": [
        {
            id: "ra-fire-away",
            name: "Fire Away!",
            description:
                'During "The Goug Consortium" Clear all enemies without exceeding 60 tiles moved across all enemy & ally units',
            missable: true,
        },
    ],
    "C3-14": [
        {
            id: "ra-four-x-four",
            name: "Four x Four",
            description:
                'During "Green Dominion" Defeat All 4 "Green Mages" Before any of them take their 4th Turn',
            missable: true,
        },
    ],
    "C3-13": [
        {
            id: "ra-jump",
            name: "Jump!",
            description:
                'During "Kyrra, Dragoon" Every enemy must be killed by "Kyrra"',
            missable: true,
        },
    ],
    "C4-10": [
        {
            id: "ra-king-of-thieves",
            name: "King of Thieves",
            description:
                'During "Sleight of Hand" Do Not Harm an Enemy before you take all the Treasure Chests',
            missable: true,
        },
    ],
    "C4-05": [
        {
            id: "ra-living-dead",
            name: "Living Dead",
            description:
                'During Battle 3 of "Popocho\'s Chocobos" Defeat all enemies without "Ghost" Reviving',
            missable: true,
        },
    ],
    "C4-07": [
        {
            id: "ra-mayhews-devotees",
            name: "Mayhew's Devotee's",
            description:
                'During "Instrument of Inspiration" Clear the Mission without both "Devotee\'s" Dying',
            missable: true,
        },
    ],
    "C4-13": [
        {
            id: "ra-no-freebies",
            name: "No Freebies",
            description:
                'During "Banbanga!" Defeat all Enemies without using any items',
            missable: true,
        },
    ],
    "B4-12": [
        {
            id: "ra-rune-fencer",
            name: "Rune Fencer",
            description:
                'During "To Be a Spellblade" Don\'t let Hana\'s HP go below 100',
            missable: true,
        },
    ],
    "C5-06": [
        {
            id: "ra-tick-tock-tick-tock",
            name: "Tick Tock... Tick Tock...",
            description:
                'During "A Lanista\'s Pride" Kill all enemies within 10 minutes (Timer Starts at Battle Start)',
            missable: true,
        },
    ],
    "C5-05": [
        {
            id: "ra-up-close-and-personal",
            name: "Up Close & Personal",
            description:
                'During "Ravager" Beat the Mission while not targeting anyone or anything that isn\'t next to you',
            missable: true,
        },
    ],
    "C4-01": [
        {
            id: "ra-useless-assassin",
            name: "Useless Assassin",
            description:
                'During "Veis, Assassin" Defeat "Nlogax" Without Veis doing any damage',
            missable: true,
        },
    ],
    "B3-16": [
        {
            id: "ra-stand-guard",
            name: "Stand Guard",
            description:
                'During "Knowing the Beast" successfully hold out for 4 rounds with only 2 party members placed on the field.',
            missable: true,
        },
    ],
    "B4-08": [
        {
            id: "ra-juggernaut",
            name: "Juggernaut",
            description:
                'During "The Eastwatch" kill all enemies without healing or having a unit die.',
            missable: true,
        },
    ],
    "B4-16": [
        {
            id: "ra-hard-hitter",
            name: "Hard Hitter",
            description:
                'During "Lord Grayrl!" defeat "Lord Grayrl" in 5 hits or less (Double Hit Attacks & Dual Cast count as 2).',
            missable: true,
        },
    ],
    "B5-08": [
        {
            id: "ra-shields-up",
            name: "Shields Up!",
            description:
                'During "Geomancer\'s Way - Mist" do not let any unit fall under 100 HP.',
            missable: true,
        },
    ],
    "C4-02": [
        {
            id: "ra-spikey-demise",
            name: "Spikey Demise",
            description:
                'During "To Be A Fighter" clear the level without laying or triggering any traps on your turn.',
            missable: true,
        },
    ],
};

export const GLOBAL_RETRO_ACHIEVEMENTS: GlobalRetroAchievement[] = [
    // Quest completion grids
    {
        id: "ra-completionist-i",
        name: "Completionist I",
        description: 'Complete all quests in the "1-A" quest grid.',
        category: "Quest Completion Grids",
    },
    {
        id: "ra-completionist-ii",
        name: "Completionist II",
        description: 'Complete all quests in the "1-B" quest grid.',
        category: "Quest Completion Grids",
    },
    {
        id: "ra-completionist-iii",
        name: "Completionist III",
        description: 'Complete all quests in the "1-C" quest grid.',
        category: "Quest Completion Grids",
    },
    {
        id: "ra-completionist-iv",
        name: "Completionist IV",
        description: 'Complete all quests in the "1-D" quest grid.',
        category: "Quest Completion Grids",
    },
    {
        id: "ra-completionist-v",
        name: "Completionist V",
        description: 'Complete all quests in the "1-E" quest grid.',
        category: "Quest Completion Grids",
    },
    {
        id: "ra-completionist-vi",
        name: "Completionist VI",
        description: 'Complete all quests in the "2-A" quest grid.',
        category: "Quest Completion Grids",
    },
    {
        id: "ra-completionist-vii",
        name: "Completionist VII",
        description: 'Complete all quests in the "2-B" quest grid.',
        category: "Quest Completion Grids",
    },
    {
        id: "ra-completionist-viii",
        name: "Completionist VIII",
        description: 'Complete all quests in the "2-C" quest grid.',
        category: "Quest Completion Grids",
    },
    {
        id: "ra-completionist-ix",
        name: "Completionist IX",
        description: 'Complete all quests in the "2-D" quest grid.',
        category: "Quest Completion Grids",
    },
    {
        id: "ra-completionist-x",
        name: "Completionist X",
        description: 'Complete all quests in the "2-E" quest grid.',
        category: "Quest Completion Grids",
    },
    {
        id: "ra-completionist-xi",
        name: "Completionist XI",
        description: 'Complete all quests in the "3-A" quest grid.',
        category: "Quest Completion Grids",
    },
    {
        id: "ra-completionist-xii",
        name: "Completionist XII",
        description: 'Complete all quests in the "3-B" quest grid.',
        category: "Quest Completion Grids",
    },
    {
        id: "ra-completionist-xiii",
        name: "Completionist XIII",
        description: 'Complete all quests in the "3-C" quest grid.',
        category: "Quest Completion Grids",
    },
    {
        id: "ra-completionist-xiv",
        name: "Completionist XIV",
        description: 'Complete all quests in the "3-D" quest grid.',
        category: "Quest Completion Grids",
    },
    {
        id: "ra-completionist-xv",
        name: "Completionist XV",
        description: 'Complete all quests in the "3-E" quest grid.',
        category: "Quest Completion Grids",
    },
    {
        id: "ra-completionist-xvi",
        name: "Completionist XVI",
        description: 'Complete all quests in the "4-A" quest grid.',
        category: "Quest Completion Grids",
    },
    {
        id: "ra-completionist-xvii",
        name: "Completionist XVII",
        description: 'Complete all quests in the "4-B" quest grid.',
        category: "Quest Completion Grids",
    },
    {
        id: "ra-completionist-xviii",
        name: "Completionist XVIII",
        description: 'Complete all quests in the "4-C" quest grid.',
        category: "Quest Completion Grids",
    },
    {
        id: "ra-completionist-xix",
        name: "Completionist XIX",
        description: 'Complete all quests in the "4-D" quest grid.',
        category: "Quest Completion Grids",
    },
    {
        id: "ra-completionist-xx",
        name: "Completionist XX",
        description: 'Complete all quests in the "4-E" quest grid.',
        category: "Quest Completion Grids",
    },
    {
        id: "ra-completionist-xxi",
        name: "Completionist XXI",
        description: 'Complete all quests in the "5-A" quest grid.',
        category: "Quest Completion Grids",
    },
    {
        id: "ra-completionist-xxii",
        name: "Completionist XXII",
        description: 'Complete all quests in the "5-B" quest grid.',
        category: "Quest Completion Grids",
    },
    {
        id: "ra-completionist-xxiii",
        name: "Completionist XXIII",
        description: 'Complete all quests in the "5-C" quest grid.',
        category: "Quest Completion Grids",
    },
    {
        id: "ra-completionist-xxiv",
        name: "Completionist XXIV",
        description: 'Complete all quests in the "5-D" quest grid.',
        category: "Quest Completion Grids",
    },
    {
        id: "ra-completionist-xxv",
        name: "Completionist XXV",
        description: 'Complete all quests in the "5-E" quest grid.',
        category: "Quest Completion Grids",
    },

    // Level milestones
    {
        id: "ra-leveled-i",
        name: "Leveled I",
        description: "Have any unit reach level 25.",
        category: "Level Milestones",
    },
    {
        id: "ra-leveled-ii",
        name: "Leveled II",
        description: "Have any unit reach level 50.",
        category: "Level Milestones",
    },
    {
        id: "ra-leveled-iii",
        name: "Leveled III",
        description: "Have any unit reach level 99.",
        category: "Level Milestones",
    },

    // Auctions & tokens
    {
        id: "ra-token-emporium",
        name: "Token Emporium",
        description: 'Obtain the reward for "Played" in Auctions.',
        category: "Auctions & Tokens",
    },
    {
        id: "ra-fancy-pants",
        name: "Fancy Pants",
        description: 'Obtain the reward for "Bonuses" in Auctions.',
        category: "Auctions & Tokens",
    },
    {
        id: "ra-region-master",
        name: "Region Master",
        description: 'Obtain the reward for "1st" place in Auctions.',
        category: "Auctions & Tokens",
    },
    {
        id: "ra-runner-up",
        name: "Runner Up",
        description: 'Obtain the reward for "2nd" place in Auctions.',
        category: "Auctions & Tokens",
    },
    {
        id: "ra-might-as-well-be-last",
        name: "Might As Well Be Last",
        description: 'Obtain the reward for "3rd" place in Auctions.',
        category: "Auctions & Tokens",
    },
    {
        id: "ra-tokens-small",
        name: "Tokens Small",
        description: 'Obtain the reward for "1-Coin Tokens" in Auctions.',
        category: "Auctions & Tokens",
    },
    {
        id: "ra-tokens-medium",
        name: "Tokens Medium",
        description: 'Obtain the reward for "2-Coin Tokens" in Auctions.',
        category: "Auctions & Tokens",
    },
    {
        id: "ra-tokens-large",
        name: "Tokens Large",
        description: 'Obtain the reward for "3-Coin Tokens" in Auctions.',
        category: "Auctions & Tokens",
    },
    {
        id: "ra-tokens-xtra",
        name: "Tokens Xtra",
        description: 'Obtain the reward for "5-Coin Tokens" in Auctions.',
        category: "Auctions & Tokens",
    },
    {
        id: "ra-you-shall-pass",
        name: "You Shall Pass",
        description: 'Obtain the reward for "Passes" in Auctions.',
        category: "Auctions & Tokens",
    },
    {
        id: "ra-hoarder",
        name: "Hoarder",
        description: "Hold 20 of each Auction Token.",
        category: "Auctions & Tokens",
    },
    {
        id: "ra-motherlode",
        name: "Motherlode",
        description: "Win an Auction round by spending 30 or more coins.",
        category: "Auctions & Tokens",
    },
    {
        id: "ra-master-of-camoa",
        name: "Master of Camoa Region",
        description: 'Win all rounds in a single Auction for the "Camoa Region".',
        category: "Auctions & Tokens",
    },
    {
        id: "ra-master-of-moorabella",
        name: "Master of Moorabella Region",
        description: 'Win all rounds in a single Auction for the "Moorabella Region".',
        category: "Auctions & Tokens",
    },
    {
        id: "ra-master-of-graszton",
        name: "Master of Graszton Region",
        description: 'Win all rounds in a single Auction for the "Graszton Region".',
        category: "Auctions & Tokens",
    },
    {
        id: "ra-master-of-fluorgis",
        name: "Master of Fluorgis Region",
        description: 'Win all rounds in a single Auction for the "Fluorgis Region".',
        category: "Auctions & Tokens",
    },
    {
        id: "ra-master-of-goug",
        name: "Master of Goug Region",
        description: 'Win all rounds in a single Auction for the "Goug Region".',
        category: "Auctions & Tokens",
    },

    // Scions, Heritor, Brightmoon Tor
    {
        id: "ra-heritor-to-the-max",
        name: "Heritor to the Max",
        description: "Obtain all Heritor weapons.",
        category: "Scions & Brightmoon Tor",
    },
    {
        id: "ra-scions-of-the-seventh-dawn",
        name: "Scions of the Seventh Dawn",
        description: "Obtain all the Scion-related rewards.",
        category: "Scions & Brightmoon Tor",
    },
    {
        id: "ra-red-demon",
        name: "The Red Demon",
        description: 'Defeat Redhawk and obtain the "Shemhazai" Scion summon.',
        category: "Scions & Brightmoon Tor",
    },
    {
        id: "ra-mysterious-tower-i",
        name: "Mysterious Tower Part I",
        description: 'Clear the first "Brightmoon Tor" tower.',
        category: "Scions & Brightmoon Tor",
    },
    {
        id: "ra-bloody-tears",
        name: "Bloody Tears",
        description: 'Obtain the "Crimson Tear".',
        category: "Scions & Brightmoon Tor",
    },
    {
        id: "ra-mysterious-tower-ii",
        name: "Mysterious Tower Part II",
        description: 'Clear the second "Brightmoon Tor" tower.',
        category: "Scions & Brightmoon Tor",
    },
    {
        id: "ra-my-tears",
        name: "My Tears",
        description: 'Obtain the "Snowy Tear".',
        category: "Scions & Brightmoon Tor",
    },
    {
        id: "ra-mysterious-tower-iii",
        name: "Mysterious Tower Part III",
        description: 'Clear the third "Brightmoon Tor" tower.',
        category: "Scions & Brightmoon Tor",
    },
    {
        id: "ra-sky-tears",
        name: "Sky Tears",
        description: 'Obtain the "Azure Tear".',
        category: "Scions & Brightmoon Tor",
    },

    // MVP & laws
    {
        id: "ra-number-one",
        name: "Number One",
        description: "Reach the top of the MVP Tower on any character.",
        category: "Laws & Records",
    },
    {
        id: "ra-law-man",
        name: "Law Man",
        description: "Obtain at least 50% of the laws in the game.",
        category: "Laws & Records",
    },
    {
        id: "ra-law-maker",
        name: "Law Maker",
        description: "Obtain all 70 laws in the game.",
        category: "Laws & Records",
    },

    // Notices & rumors
    {
        id: "ra-notice-board",
        name: "Notice Board",
        description: 'Read at least 50% of the "Notices".',
        category: "Notices & Rumors",
    },
    {
        id: "ra-noticed-it-all",
        name: "Noticed It All!",
        description: 'Read all of the "Notices".',
        category: "Notices & Rumors",
    },
    {
        id: "ra-have-you-heard",
        name: "Have You Heard?",
        description: 'Read at least 50% of the "Rumors".',
        category: "Notices & Rumors",
    },
    {
        id: "ra-heard-it-all",
        name: "Heard It All!",
        description: 'Read all of the "Rumors".',
        category: "Notices & Rumors",
    },

    // Clan growth (trials, privileges, talents)
    {
        id: "ra-trials",
        name: "Trials",
        description: "Complete all Clan Trials at least once.",
        category: "Clan Growth",
    },
    {
        id: "ra-privileges",
        name: "Privileges",
        description: "Obtain all Clan Privileges.",
        category: "Clan Growth",
    },
    {
        id: "ra-talented-bunch",
        name: "Talented Bunch",
        description: "Max out all Clan Talents.",
        category: "Clan Growth",
    },

    // Crafting
    {
        id: "ra-apprentice",
        name: "Apprentice",
        description: "Craft your first item at the Bazaar.",
        category: "Crafting",
    },
    {
        id: "ra-hobbyist",
        name: "Hobbyist",
        description: "Continue crafting and build up your Bazaar creations.",
        category: "Crafting",
    },
    {
        id: "ra-master-crafter",
        name: "Master Crafter",
        description: "In a single visit to the Bazaar, craft five items.",
        category: "Crafting",
    },

    // Advanced jobs & special recruits
    {
        id: "ra-the-gifted",
        name: "The Gifted",
        description: 'Unlock the "Heritor" job.',
        category: "Advanced Jobs & Recruits",
    },
    {
        id: "ra-fire-in-the-hole",
        name: "Fire in the Hole!",
        description: 'Unlock the "Cannoneer" job.',
        category: "Advanced Jobs & Recruits",
    },
    {
        id: "ra-reagents-my-boy",
        name: "Reagents, My Boy!",
        description: 'Unlock the "Arcanist" job.',
        category: "Advanced Jobs & Recruits",
    },
    {
        id: "ra-textbook",
        name: "Textbook",
        description: 'Unlock the "Scholar" job.',
        category: "Advanced Jobs & Recruits",
    },
    {
        id: "ra-class-fit-for-a-plumber",
        name: "Class Fit for a Plumber",
        description: 'Unlock the "Dragoon" job.',
        category: "Advanced Jobs & Recruits",
    },
    {
        id: "ra-rumble-in-the-jungle",
        name: "Rumble in the Jungle",
        description: 'Unlock the "Green Mage" job.',
        category: "Advanced Jobs & Recruits",
    },
    {
        id: "ra-monster-tamer",
        name: "Monster Tamer",
        description: 'Unlock the "Beastmaster" job.',
        category: "Advanced Jobs & Recruits",
    },
    {
        id: "ra-fight-club",
        name: "Fight Club",
        description: 'Unlock the "Fighter" job.',
        category: "Advanced Jobs & Recruits",
    },
    {
        id: "ra-silent-but-deadly",
        name: "Silent But Deadly",
        description: 'Unlock the "Assassin" job.',
        category: "Advanced Jobs & Recruits",
    },
    {
        id: "ra-under-fire",
        name: "Under Fire!",
        description: 'Unlock the "Fusilier" job.',
        category: "Advanced Jobs & Recruits",
    },
    {
        id: "ra-firing-practice",
        name: "Firing Practice",
        description: 'Unlock the "Flintlock" job.',
        category: "Advanced Jobs & Recruits",
    },
    {
        id: "ra-blue",
        name: "Blue",
        description: 'Unlock the "Raptor" job.',
        category: "Advanced Jobs & Recruits",
    },
    {
        id: "ra-knight-of-the-yellow-feather",
        name: "Knight of the Yellow Feather",
        description: 'Unlock the "Chocobo Knight" job.',
        category: "Advanced Jobs & Recruits",
    },
    {
        id: "ra-bodyguard",
        name: "Bodyguard",
        description: 'Unlock the "Parivir" job.',
        category: "Advanced Jobs & Recruits",
    },
    {
        id: "ra-master-sabin",
        name: "Master Sabin",
        description: 'Unlock the "Master Monk" job.',
        category: "Advanced Jobs & Recruits",
    },
    {
        id: "ra-sword-mage",
        name: "Sword Mage",
        description: 'Unlock the "Spellblade" job.',
        category: "Advanced Jobs & Recruits",
    },
    {
        id: "ra-black-and-white",
        name: "Black & White",
        description: 'Unlock the "Seer" job.',
        category: "Advanced Jobs & Recruits",
    },
    {
        id: "ra-trick-room",
        name: "Trick Room",
        description: 'Unlock the "Trickster" job.',
        category: "Advanced Jobs & Recruits",
    },
    {
        id: "ra-til-valhalla",
        name: "Til Valhalla!",
        description: 'Unlock the "Viking" job.',
        category: "Advanced Jobs & Recruits",
    },
    {
        id: "ra-weather-man",
        name: "Weather Man",
        description: 'Unlock the "Geomancer" job.',
        category: "Advanced Jobs & Recruits",
    },
    {
        id: "ra-eye-for-an-eye",
        name: "Eye For An Eye",
        description: 'Unlock the "Lanista" job.',
        category: "Advanced Jobs & Recruits",
    },
    {
        id: "ra-final-strike",
        name: "Final Strike!",
        description: 'Unlock the "Ravager" job.',
        category: "Advanced Jobs & Recruits",
    },
    {
        id: "ra-dancer",
        name: "Dancer",
        description: "Recruit Penelo.",
        category: "Advanced Jobs & Recruits",
    },
    {
        id: "ra-sky-pirate",
        name: "Sky Pirate",
        description: "Recruit Vaan.",
        category: "Advanced Jobs & Recruits",
    },
    {
        id: "ra-saboteur",
        name: "Saboteur",
        description: "Recruit Al-Cid.",
        category: "Advanced Jobs & Recruits",
    },
    {
        id: "ra-kupo",
        name: "Kupo!",
        description: "Recruit Montblanc.",
        category: "Advanced Jobs & Recruits",
    },
    {
        id: "ra-zombie",
        name: "Zombie",
        description: "Recruit Frimelda.",
        category: "Advanced Jobs & Recruits",
    },

    // Blue Magic & chocobos
    {
        id: "ra-im-blue",
        name: "I'm Blue",
        description: 'Obtain all "Blue Mage" abilities from monsters.',
        category: "Blue Magic & Chocobo Taming",
    },
    {
        id: "ra-red-rider",
        name: "Red Rider",
        description: "Tame a Red Chocobo.",
        category: "Blue Magic & Chocobo Taming",
    },
    {
        id: "ra-yellow-rider",
        name: "Yellow Rider",
        description: "Tame a Yellow Chocobo.",
        category: "Blue Magic & Chocobo Taming",
    },
    {
        id: "ra-black-rider",
        name: "Black Rider",
        description: "Tame a Black Chocobo.",
        category: "Blue Magic & Chocobo Taming",
    },
    {
        id: "ra-green-rider",
        name: "Green Rider",
        description: "Tame a Green Chocobo.",
        category: "Blue Magic & Chocobo Taming",
    },
    {
        id: "ra-brown-rider",
        name: "Brown Rider",
        description: "Tame a Brown Chocobo.",
        category: "Blue Magic & Chocobo Taming",
    },
    {
        id: "ra-white-rider",
        name: "White Rider",
        description: "Tame a White Chocobo.",
        category: "Blue Magic & Chocobo Taming",
    },
    {
        id: "ra-stranger-clear",
        name: "Stranger in the Woods",
        description: 'Clear story mission "Stranger in the Woods".',
        category: "Quest Challenges",
    },
    {
        id: "ra-it-starts",
        name: "It Starts",
        description: 'During "Stranger in the Woods", defeat all enemies without Cid dying.',
        category: "Quest Challenges",
        missable: true,
    },

    {
        id: "ra-paw-clear",
        name: "A Paw Full of Feathers",
        description: 'Clear story mission "A Paw Full of Feathers".',
        category: "Quest Challenges",
    },
    {
        id: "ra-kamikaze-cid",
        name: "Kamikaze Cid",
        description: 'During "A Paw Full of Feathers", defeat all enemies without Cid taking damage three times.',
        category: "Quest Challenges",
        missable: true,
    },

    {
        id: "ra-yellow-wings-clear",
        name: "Yellow Wings",
        description: 'Clear story mission "The Yellow Wings".',
        category: "Quest Challenges",
    },
    {
        id: "ra-united-we-stand",
        name: "United We Stand",
        description: 'During "The Yellow Wings", do not let any of your units die.',
        category: "Quest Challenges",
        missable: true,
    },

    {
        id: "ra-you-say-tomato-clear",
        name: "You Say Tomato",
        description: 'Clear story mission "You Say Tomato".',
        category: "Quest Challenges",
    },
    {
        id: "ra-tomato-paste",
        name: "Tomato Paste",
        description: 'During "You Say Tomato", defeat all "Deadly Nightshade" enemies before the "Alraune".',
        category: "Quest Challenges",
        missable: true,
    },

    {
        id: "ra-ughor-clear",
        name: "Wanted: Ugohr!",
        description: 'Clear story mission "Wanted: Ugohr!".',
        category: "Quest Challenges",
    },
    {
        id: "ra-turtle-power",
        name: "Turtle Power",
        description: 'During "Wanted: Ugohr!", defeat all other enemies before defeating Ugohr.',
        category: "Quest Challenges",
        missable: true,
    },

    {
        id: "ra-gilmunto-clear",
        name: "Wanted: Gilmunto!",
        description: 'Clear story mission "Wanted: Gilmunto!".',
        category: "Quest Challenges",
    },
    {
        id: "ra-dragon-force",
        name: "Dragon Force",
        description: 'During "Wanted: Gilmunto!", defeat all other enemies before defeating Gilmunto.',
        category: "Quest Challenges",
        missable: true,
    },

    {
        id: "ra-now-thats-fire-clear",
        name: "Now That's Fire!",
        description: 'Clear story mission "Now That\'s Fire!".',
        category: "Quest Challenges",
    },
    {
        id: "ra-sleeping-death",
        name: "Sleeping Death",
        description: 'During "Now That\'s Fire!", defeat all enemies without any party member being Poisoned.',
        category: "Quest Challenges",
        missable: true,
    },

    {
        id: "ra-pearls-clear",
        name: "Pearls in the Deep",
        description: 'Clear story mission "Pearls in the Deep".',
        category: "Quest Challenges",
    },
    {
        id: "ra-sandstorm",
        name: "Sandstorm",
        description: 'During "Pearls in the Deep", defeat "Flowsand Lord" while only attacking it when there are two "Pit Beasts" alive.',
        category: "Quest Challenges",
        missable: true,
    },

    {
        id: "ra-mountain-watch-clear",
        name: "Mountain Watch",
        description: 'Clear story mission "Mountain Watch".',
        category: "Quest Challenges",
    },
    {
        id: "ra-equivalent-exchange",
        name: "Equivalent Exchange",
        description: 'During "Mountain Watch", defeat Ewen while he only gets one turn.',
        category: "Quest Challenges",
        missable: true,
    },

    {
        id: "ra-grounded-clear",
        name: "Grounded!",
        description: 'Clear story mission "Grounded!".',
        category: "Quest Challenges",
    },
    {
        id: "ra-law-abiding-citizen",
        name: "Law Abiding Citizen",
        description: 'During "Grounded!", clear the mission without breaking the law.',
        category: "Quest Challenges",
        missable: true,
    },

    {
        id: "ra-rumors-abound-clear",
        name: "Rumors Abound",
        description: 'Clear story mission "Rumors Abound".',
        category: "Quest Challenges",
    },
    {
        id: "ra-evil-dead",
        name: "Evil Dead",
        description: 'During "Rumors Abound", complete the mission without using any Phoenix Downs.',
        category: "Quest Challenges",
        missable: true,
    },

    {
        id: "ra-sleepless-clear",
        name: "Sleepless Nights",
        description: 'Clear story mission "Sleepless Nights".',
        category: "Quest Challenges",
    },
    {
        id: "ra-nightmares",
        name: "Nightmares",
        description: 'During "Sleepless Nights", finish the objective without consuming MP.',
        category: "Quest Challenges",
        missable: true,
    },

    {
        id: "ra-making-music-clear",
        name: "Making Music",
        description: 'Clear story mission "Making Music".',
        category: "Quest Challenges",
    },
    {
        id: "ra-trap-card",
        name: "I Activate My Trap Card!",
        description: 'During "Making Music", clear the mission before the Ranger places two traps.',
        category: "Quest Challenges",
        missable: true,
    },

    {
        id: "ra-seeking-stone-clear",
        name: "Seeking the Stone",
        description: 'Clear story mission "Seeking the Stone".',
        category: "Quest Challenges",
    },
    {
        id: "ra-slow-and-steady",
        name: "Slow & Steady",
        description: 'During "Seeking the Stone", do not let any of your characters take more than two steps in a single turn.',
        category: "Quest Challenges",
        missable: true,
    },

    {
        id: "ra-sky-pirate-vaan-clear",
        name: "Wanted: Sky Pirate Vaan",
        description: 'Clear story mission "Wanted: Sky Pirate Vaan".',
        category: "Quest Challenges",
    },
    {
        id: "ra-one-on-one",
        name: "One on One",
        description: 'During "Wanted: Sky Pirate Vaan", do not hit more than once in a single turn.',
        category: "Quest Challenges",
        missable: true,
    },

    {
        id: "ra-a-request-clear",
        name: "A Request",
        description: 'Clear story mission "A Request".',
        category: "Quest Challenges",
    },
    {
        id: "ra-fire-the-cannon",
        name: "Fire The Cannon!",
        description: 'During "A Request", trigger the explosion four times before defeating Neukhia.',
        category: "Quest Challenges",
        missable: true,
    },

    {
        id: "ra-the-dig-clear",
        name: "The Dig",
        description: 'Clear story mission "The Dig".',
        category: "Quest Challenges",
    },
    {
        id: "ra-elemental-block",
        name: "Elemental Block",
        description: 'During "The Dig", do not use any fire, ice, or lightning attacks, spells, or weapons.',
        category: "Quest Challenges",
        missable: true,
    },

    {
        id: "ra-through-anothers-eyes-clear",
        name: "Through Another's Eyes",
        description: 'Clear story mission "Through Another\'s Eyes".',
        category: "Quest Challenges",
    },
    {
        id: "ra-so-close-yet-so-far",
        name: "So Close, Yet So Far Away",
        description: 'During "Through Another\'s Eyes", clear the mission without using ranged weapons.',
        category: "Quest Challenges",
        missable: true,
    },

    {
        id: "ra-pirate-problems-clear",
        name: "Pirate Problems",
        description: 'Clear story mission "Pirate Problems".',
        category: "Quest Challenges",
    },
    {
        id: "ra-imposter-domination",
        name: "Imposter Domination",
        description: 'During "Pirate Problems", defeat "Vaan?" in three hits or fewer.',
        category: "Quest Challenges",
        missable: true,
    },

    {
        id: "ra-the-ritual-clear",
        name: "The Ritual",
        description: 'Clear story mission "The Ritual".',
        category: "Quest Challenges",
    },
    {
        id: "ra-my-judge",
        name: "My Judge!",
        description: 'During "The Ritual", uphold the law and do not let Illua dismiss the Judge.',
        category: "Quest Challenges",
        missable: true,
    },

    {
        id: "ra-two-grimoires-clear",
        name: "The Two Grimoires",
        description: 'Clear story mission "The Two Grimoires".',
        category: "Quest Challenges",
    },
    {
        id: "ra-the-end",
        name: "The End?",
        description: 'During "The Two Grimoires", defeat Illua while upholding the law and collecting the chest.',
        category: "Quest Challenges",
        missable: true,
    },
    {
        id: "ra-from-the-rift-clear",
        name: "From the Rift",
        description: 'Clear the final mission "From the Rift".',
        category: "Quest Challenges",
    },
    {
        id: "ra-all-or-nothing",
        name: "All or Nothing",
        description: 'During "From the Rift", defeat all three parts of Neukhia.',
        category: "Quest Challenges",
        missable: true,
    },
    {
        id: "ra-a-paw-full-of-feathers-clear-hard",
        name: "A Paw Full of Feathers (Hard)",
        description: 'Clear Story Mission "Stranger in the Woods"',
        category: "Quest Challenges",
    },
    {
        id: "ra-a-request-clear-hard",
        name: "A Request (Hard)",
        description: 'Clear Story Mission "A Request"',
        category: "Quest Challenges",
    },
    {
        id: "ra-cat-burglar",
        name: "Cat Burglar",
        description:
            'During "The Cat\'s Meow" Obtain both Treasure Chests while avoiding all the traps',
        category: "Quest Challenges",
        missable: true,
    },
    {
        id: "ra-dont-fear-the-moogle",
        name: "Don't Fear The Moogle",
        description:
            'Complete Quest "Of Kupos and Cannons" without Harming a Moogle',
        category: "Quest Challenges",
        missable: true,
    },
    {
        id: "ra-fire-away",
        name: "Fire Away!",
        description:
            'During "The Goug Consortium" Clear all enemies without exceeding 60 tiles moved across all enemy & ally units',
        category: "Quest Challenges",
        missable: true,
    },
    {
        id: "ra-four-x-four",
        name: "Four x Four",
        description:
            'During "Green Dominion" Defeat All 4 "Green Mages" Before any of them take their 4th Turn',
        category: "Quest Challenges",
        missable: true,
    },
    {
        id: "ra-from-the-rift-hard",
        name: "From the Rift (Hard)",
        description: 'Clear The Final Mission "From the Rift"',
        category: "Quest Challenges",
    },
    {
        id: "ra-grounded-hard",
        name: "Grounded! (Hard)",
        description: 'Clear Story Mission "Grounded!"',
        category: "Quest Challenges",
    },
    {
        id: "ra-hard-hitter",
        name: "Hard Hitter",
        description:
            'During "Lord Grayrl!" Defeat "Lord Grayrl" in 5 hits or less (Double Hit Attacks & Dual Cast Count as 2)',
        category: "Quest Challenges",
        missable: true,
    },
    {
        id: "ra-juggernaut",
        name: "Juggernaut",
        description:
            'During "The Eastwatch" Kill all enemies without healing or having a unit die',
        category: "Quest Challenges",
        missable: true,
    },
    {
        id: "ra-jump",
        name: "Jump!",
        description:
            'During "Kyrra, Dragoon" Every enemy must be killed by "Kyrra"',
        category: "Quest Challenges",
        missable: true,
    },
    {
        id: "ra-king-of-thieves",
        name: "King of Thieves",
        description:
            'During "Sleight of Hand" Do Not Harm an Enemy before you take all the Treasure Chests',
        category: "Quest Challenges",
        missable: true,
    },
    {
        id: "ra-living-dead",
        name: "Living Dead",
        description:
            'During Battle 3 of "Popocho\'s Chocobos" Defeat all enemies without "Ghost" Reviving',
        category: "Quest Challenges",
        missable: true,
    },
    {
        id: "ra-making-music-hard",
        name: "Making Music (Hard)",
        description: 'Clear Story Mission "Making Music"',
        category: "Quest Challenges",
    },
    {
        id: "ra-mayhews-devotees",
        name: "Mayhew's Devotee's",
        description:
            'During "Instrument of Inspiration" Clear the Mission without both "Devotee\'s" Dying',
        category: "Quest Challenges",
        missable: true,
    },
    {
        id: "ra-mountain-watch-hard",
        name: "Mountain Watch (Hard)",
        description: 'Clear Story Mission "Mountain Watch"',
        category: "Quest Challenges",
    },
    {
        id: "ra-no-freebies",
        name: "No Freebies",
        description:
            'During "Banbanga!" Defeat all Enemies without using any items',
        category: "Quest Challenges",
        missable: true,
    },
    {
        id: "ra-now-thats-fire-hard",
        name: "Now That\'s Fire! (Hard)",
        description: 'Clear Story Mission "Now That\'s Fire!"',
        category: "Quest Challenges",
    },
    {
        id: "ra-pearls-in-the-deep-hard",
        name: "Pearls in the Deep (Hard)",
        description: 'Clear Story Mission "Pearls in the Deep"',
        category: "Quest Challenges",
    },
    {
        id: "ra-pirate-problems-hard",
        name: "Pirate Problems (Hard)",
        description: 'Clear Story Mission "Pirate Problems"',
        category: "Quest Challenges",
    },
    {
        id: "ra-rumors-abound-hard",
        name: "Rumors Abound (Hard)",
        description: 'Clear Story Mission "Rumors Abound"',
        category: "Quest Challenges",
    },
    {
        id: "ra-rune-fencer",
        name: "Rune Fencer",
        description:
            'During "To Be a Spellblade" Don\'t let Hana\'s HP go below 100',
        category: "Quest Challenges",
        missable: true,
    },
    {
        id: "ra-seeking-the-stone-hard",
        name: "Seeking the Stone (Hard)",
        description: 'Clear Story Mission "Seeking the Stone"',
        category: "Quest Challenges",
    },
    {
        id: "ra-shields-up",
        name: "Shields Up!",
        description:
            'During "Geomancer\'s Way - Mist" Do Not let any unit fall under 100 HP',
        category: "Quest Challenges",
        missable: true,
    },
    {
        id: "ra-sleepless-nights-hard",
        name: "Sleepless Nights (Hard)",
        description: 'Clear Story Mission "Sleepless Nights"',
        category: "Quest Challenges",
    },
    {
        id: "ra-spikey-demise",
        name: "Spikey Demise",
        description:
            'During "To Be A Fighter" Clear the level without laying or triggering any traps on your turn',
        category: "Quest Challenges",
        missable: true,
    },
    {
        id: "ra-stand-guard",
        name: "Stand Guard",
        description:
            'During "Knowing the Beast" Successfully hold out for 4 Rounds with only 2 Party Members placed on the field.',
        category: "Quest Challenges",
        missable: true,
    },
    {
        id: "ra-stranger-in-the-woods-hard",
        name: "Stranger in the Woods (Hard)",
        description: 'Clear Story Mission "Stranger in the Woods"',
        category: "Quest Challenges",
    },
    {
        id: "ra-the-dig-hard",
        name: "The Dig (Hard)",
        description: 'Clear Story Mission "The Dig"',
        category: "Quest Challenges",
    },
    {
        id: "ra-the-ritual-hard",
        name: "The Ritual (Hard)",
        description: 'Clear Story Mission "The Ritual"',
        category: "Quest Challenges",
    },
    {
        id: "ra-the-two-grimoires-hard",
        name: "The Two Grimoires (Hard)",
        description: 'Clear Story Mission "The Two Grimoires"',
        category: "Quest Challenges",
    },
    {
        id: "ra-through-anothers-eyes-hard",
        name: "Through Another's Eyes (Hard)",
        description: 'Clear Story Mission "Through Another\'s Eyes"',
        category: "Quest Challenges",
    },
    {
        id: "ra-tick-tock-tick-tock",
        name: "Tick Tock... Tick Tock...",
        description:
            'During "A Lanista\'s Pride" Kill all enemies within 10 minutes (Timer Starts at Battle Start)',
        category: "Quest Challenges",
        missable: true,
    },
    {
        id: "ra-up-close-and-personal",
        name: "Up Close & Personal",
        description:
            'During "Ravager" Beat the Mission while not targeting anyone or anything that isn\'t next to you',
        category: "Quest Challenges",
        missable: true,
    },
    {
        id: "ra-useless-assassin",
        name: "Useless Assassin",
        description:
            'During "Veis, Assassin" Defeat "Nlogax" Without Veis doing any damage',
        category: "Quest Challenges",
        missable: true,
    },
    {
        id: "ra-wanted-gilmunto-hard",
        name: "Wanted: Gilmunto! (Hard)",
        description: 'Clear Story Mission "Wanted: Gilmunto!"',
        category: "Quest Challenges",
    },
    {
        id: "ra-wanted-sky-pirate-vaan-hard",
        name: "Wanted: Sky Pirate Vaan (Hard)",
        description: 'Clear Story Mission "Wanted: Sky Pirate Vaan"',
        category: "Quest Challenges",
    },
    {
        id: "ra-wanted-ughor-hard",
        name: "Wanted: Ugohr! (Hard)",
        description: 'Clear Story Mission "Wanted: Ugohr!"',
        category: "Quest Challenges",
    },
    {
        id: "ra-yellow-wings-hard",
        name: "Yellow Wings (Hard)",
        description: 'Clear Story Mission "Yellow Wings"',
        category: "Quest Challenges",
    },
    {
        id: "ra-you-say-tomato-hard",
        name: "You Say Tomato (Hard)",
        description: 'Clear Story Mission "You Say Tomato"',
        category: "Quest Challenges",
    },
];

