// src/data/missions/storyOptional.B2.ts
// Arc B2 optional missions, accurately transcribed from Side_Quests.txt

import type { Mission } from "../../types/ffta2";

export const OPTIONAL_MISSIONS_B2: Mission[] = [
    {
        id: "B2-01",
        arc: "B2",
        name: "Wanted: Ugohr",
        description: "Wanted: Ugohr, a green-coloured shelling, last spotted on Baptiste Hill. One report case of injury arising from contact with said beast. Payment to be made by injured party. Jylland Defenders of the Peace",
        rank: 8,
        region: "Baptiste Hill",
        fee: 200,
        days: undefined,
        questType: "Headhunt",
        canDispatch: false,
        canCancel: false,
        members: 6,
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 0,
            adaptability: 0,
        },
        objective: "Defeat Ugohr!",
        law: "Forbidden: Restoring MP – Actions that restore MP are forbidden.",
    enemies: [
        { name: "Ugohr", job: "Great Tortoise", quantity: 1, notes: "The mark — a giant turtle. High defense. Hit from behind for extra damage." },
        { name: "Randomized Name", job: "Cockatrice", quantity: 2, notes: "PRIORITY: Their peck hurts — pick off with ranged/Black Magick first." },
        { name: "Randomized Name", job: "Wolf", quantity: 2, notes: "Fast melee. Attack from behind." },
    ],
        strategy: [
            "Kill the Cockatrices first with ranged units and Black Magick (effective on groups), then the Wolves, then focus Ugohr.",
            "Fast units that flank for back-attacks have the advantage here.",
        ],
        rewards: {
            gil: 1650,
            cp: 16,
            loot: "Healing Water ×4, Holy Stone ×3, Moonwood ×3"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "B2-03",
        arc: "B2",
        name: "Throw Down",
        description: "Clan (Clan Name) We are in pursuit of an infamous monster that promises to be quite a handful ... Would you aid us in driving this menace away? Bowen of House Bowen",
        rank: 14,
        region: "Baptiste Hill",
        fee: 300,
        days: 20,
        questType: "Defeat Mark",
        canDispatch: true,
        canCancel: true,
        members: 3,
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 6,
            adaptability: 6,
        },
        objective: "Defeat Klesta",
        law: "Forbidden: Harming the Weak – Actions that harm a lower level unit are forbidden.",
    enemies: [
        { name: "Klesta", job: "Cockatrice", quantity: 1, notes: "Boss. Level scales with your clan. 3-unit party; House Bowen sends AI reinforcements (Fighter, Gria Ravager, Nu Mou Illusionist). Klesta scales to your level — law prevents harming lower-level units." },
    ],
        battlefield: [
            "The map features elevation differences",
        ],
        strategy: [
            "Klesta is the only required target, but House Bowen reinforcements will pressure your small 3-unit party.",
            "Check levels before attacking: Harming the Weak can punish you if Klesta or a reinforcement is lower level than the acting unit.",
            "Use controlled ranged damage and healing to keep the party stable while focusing Klesta down.",
        ],
        rewards: {
            gil: 2870,
            cp: 28,
            loot: "Zingu Pearl Shell ×3, Adamant Alloy ×8, Green Liquid ×4"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "B2-04",
        arc: "B2",
        name: "A Fatal Mistake",
        description: "A local watch hired us to set traps to help them deal with their monster problem. Unfortuately, I set my traps in the wrong place. If word of my mistake gets out, I'll be in serious trouble. That's why I need someone to destroy the traps for me without causing a big stir. Esther, New Hire",
        rank: 33,
        region: "The Galerria Deep",
        fee: 500,
        days: 20,
        questType: "Satisfy Petitioner",
        canDispatch: true,
        canCancel: true,
        members: 6,
        prerequisite: "It's a Trap",
        requiredTalents: {
            negotiation: 15,
            aptitude: 0,
            teamwork: 0,
            adaptability: 15,
        },
        dispatchRecommended: ["Ranger"],
        objective: "Destroy the traps in 3 rounds!",
        law: "Forbidden: Targeting all Units – Actions targeting all units at once are forbidden.",
    enemies: [
        { name: "Randomized Name", job: "Baknamy", quantity: 2, notes: "All enemies have Avoid Traps passive — cannot be lured onto traps. Must destroy traps yourself in 3 rounds." },
        { name: "Randomized Name", job: "Luchorpan", quantity: 2, notes: "Has Avoid Traps." },
        { name: "Randomized Name", job: "Tonberry", quantity: 1, notes: "Has Avoid Traps. Very dangerous if it gets a turn — prioritize traps over combat." },
    ],
        strategy: [
            "Destroy every trap within 3 rounds; enemies all have Avoid Traps, so they cannot be used to trigger the objective for you.",
            "Bring a Ranger or other high-mobility trap clearer and spend early turns on the traps instead of trying to wipe the field.",
            "Avoid all-unit targeting because of the law. If the Tonberry reaches you, disable or delay it long enough to finish the trap route.",
        ],
        rewards: {
            gil: 4830,
            cp: 66,
            loot: "Kalos ×4"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "B2-05",
        arc: "B2",
        name: "A Simple Question",
        description: "What are the Judges, really? My beau, he's in an adjudged clan - saw the ceremony of the pact when they were initiating him. They say if you swear, you will never die. But isn't that strange? I mean, it's unnatural. I don't trust it. Someone please explain to me what this is all about! Millemaila, Concerned for her beau",
        rank: 10,
        region: "The Aldanna Range",
        fee: 200,
        days: 20,
        questType: "Escort",
        canDispatch: true,
        canCancel: true,
        members: 1,
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 7,
            adaptability: 7,
        },
    enemies: [],
        strategy: [
            "Non-combat mission — send a unit to Lezaford's college or dispatch to complete. No battle.",
        ],
        rewards: {
            gil: 790,
            cp: 20,
            loot: "Kuraisle Boxwood ×2"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "B2-06",
        arc: "B2",
        name: "Wanted: Gilmunto",
        description: "Wanted: Gilmunto, possibly a varient strain of nidhogg, known to lurk in the foothills of the Aldanna Range. Vicious and violent, should be considered dangerous in the extreme! Though small, it should not be underestimated. Jylland Defenders of the Peace",
        rank: 12,
        region: "The Aldanna Range",
        fee: 300,
        days: undefined,
        questType: "Headhunt",
        canDispatch: false,
        canCancel: false,
        members: 6,
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 0,
            adaptability: 0,
        },
        objective: "Defeat Gilmunto!",
        law: "Forbidden: Fire – Weapons and abilities that use fire are forbidden.",
    enemies: [
        { name: "Gilmunto", job: "Asp", quantity: 1, notes: "The mark — a hard-to-kill serpent. Bring strength and healers; save it for last." },
        { name: "Randomized Name", job: "Worgen", quantity: 2, notes: "Wolf-type. Defeat first." },
        { name: "Randomized Name", job: "Yellow Jelly", quantity: 1, notes: "Defeat after the Worgens." },
        { name: "Randomized Name", job: "Thunder Drake", quantity: 1, notes: "Defeat before Gilmunto." },
    ],
        strategy: [
            "Kill order: Worgens first, then the Yellow Jelly, then the Thunder Drake, and finally Gilmunto (the Asp).",
            "No Fire (law). Grab the treasure on the map if you can, but don't lose units over it. Bring healers — you'll take damage.",
        ],
        rewards: {
            gil: 1330,
            cp: 24,
            loot: "Succulent Fruit ×3, Storm Stone ×5, Quality Pelt ×2"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "B2-08",
        arc: "B2",
        name: "It's a Trap!",
        description: "While traveling through the Aldanna Range I mstakenly dropped several traps meant for sale. I'm afraid the shock of the drop has likely released their safe mechanisms, making them quite dangerous! Deactivating them would be hazardous at this point, so I just need someone to destroy them. It's the only way to be sure, Esther, New Hire",
        rank: 23,
        region: "The Aldanna Range",
        fee: 400,
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
        dispatchRecommended: ["Ranger"],
        objective: "Destroy all the Traps!",
    enemies: [
        { name: "Randomized Name", job: "Baknamy", quantity: 4, notes: "All have Avoid Traps passive. Kill enemies first, then activate/destroy all trap tiles to complete." },
    ],
        strategy: [
            "Defeat the Baknamy first, then destroy or activate every trap tile to complete the request.",
            "All Baknamy have Avoid Traps, so do not waste turns trying to lure them onto hazards.",
            "A Ranger makes the cleanup safer, but any mobile party can finish once the enemies are gone.",
        ],
        rewards: {
            gil: 2730,
            cp: 46,
            loot: "Red Geeps ×1, Wyrm Carapace ×1, Zincatite ×5"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "B2-09",
        arc: "B2",
        name: "Wanted: Lang Bros",
        description: "-WANTED!- Wanted: The Lang Brothers, for the injury of 28 members of the Arbiters of Death, a clan to which they formerly belonged. The eldest is a fierce warrior; the second, a skilled knife-fighter; the third, a famed archer; and the youngest brothers, a wielder of magicks. Jylland Defenders of the Peace",
        rank: 15,
        region: "The Bisga Greenlands",
        fee: 200,
        days: 20,
        questType: "Satisfy Petitioner",
        canDispatch: true,
        canCancel: true,
        members: 6,
        prerequisite: "Wanted: Gilmunto",
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 8,
            adaptability: 8,
        },
        objective: "Defeat the Lang Brothers!",
        law: "Forbidden: Actions by Nu Mou – Nu Mou may only move and perform basic attacks.",
    enemies: [
        { name: "Lang Bro", job: "Plague", quantity: 2, notes: "Targets. Can petrify units that face them. Weak to Holy. Priority targets — do not expose your back to them." },
        { name: "Randomized Name", job: "Bloody Orb", quantity: 3, notes: "Dangerous and fast. Weak to Holy. Fight off en route to the Plagues." },
    ],
        battlefield: [
            "The battlefield contains trap tiles that pose hazards",
        ],
        strategy: [
            "Defeat both Lang Brothers, the two Plagues, while keeping your units' backs turned away from their petrifying gaze.",
            "Nu Mou are restricted to movement and basic attacks; leave them out unless you only need simple attacks from them.",
            "Use Holy damage on the Plagues and clear Bloody Orbs when they block access or threaten fast KOs.",
        ],
        rewards: {
            gil: 3380,
            cp: 30,
            loot: "Leestone ×5, Silk Bloom ×2, Fine Wool ×2"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "B2-10",
        arc: "B2",
        name: "Books of Magick",
        description: "I'm going to fail this year, I know it. I can't fail! Please, could someone exaplin about grimoires to me in really simple terms? After that, if they could tell me about the Four Great Spirits, and the ... (amended for length) Parore, Akademy Student",
        rank: 15,
        region: "The Aldanna Range",
        fee: 300,
        days: 20,
        questType: "Escort",
        canDispatch: true,
        canCancel: true,
        members: 1,
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 9,
            adaptability: 9,
        },
    enemies: [],
        strategy: [
            "Non-combat mission — visit Lezaford's college or dispatch to complete.",
        ],
        rewards: {
            gil: 2370,
            cp: 30,
            loot: "Storm Sigil ×2, Water Sigil ×2"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "B2-11",
        arc: "B2",
        name: "Now That's a Fire!",
        description: "Zedlei Forest has been bombed! Looking for a clan to rid our woods of an infestation of bombs! With auction season upon us, who doesn't want a few more clan points in the bank? Society of the Protection of Monsters",
        rank: 14,
        region: "Zedlei Forest",
        fee: 300,
        days: undefined,
        questType: "Battle",
        canDispatch: false,
        canCancel: false,
        members: 6,
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 0,
            adaptability: 0,
        },
        objective: "Defeat all Foes!",
        law: "Forbidden: Restoring MP – Actions that restore MP are forbidden.",
    enemies: [
        { name: "Randomized Name", job: "Bomb", quantity: 3, notes: "Fire/explosion type. The 'Marshmallow' (largest) should be killed first before it spreads fire damage." },
        { name: "Randomized Name", job: "Red Jelly", quantity: 2, notes: "Fire-element. Weak to Ice." },
        { name: "Randomized Name", job: "Floating Eye", quantity: 2, notes: "Lowest threat. Clean up last." },
    ],
        strategy: [
            "7 enemies, an even fight apart from level. Kill the large Bomb first to stop its fire AoE, then the rest.",
            "No Restoring MP (law). Use Ice on the Red Jellies.",
        ],
        rewards: {
            gil: 2870,
            cp: 28,
            loot: "Platinum ×5, Agathis ×3, Suspect Mushroom ×1"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "B2-13",
        arc: "B2",
        name: "The Ultimate Book",
        description: "I've been reading some old these of late, and was intrigued by mention of the Ultimate Book of Magick. I know its very existence may only be a legend, still, if you have any information, I would be most grateful. Scholar of the Arcane",
        rank: 18,
        region: "The Aldanna Range",
        fee: 300,
        days: 20,
        questType: "Investigation",
        canDispatch: true,
        canCancel: true,
        members: 1,
        prerequisite: "Books of Magick",
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 44,
            adaptability: 44,
        },
    enemies: [],
        strategy: [
            "Investigation dispatch — send a unit to The Aldanna Range to research the Ultimate Book of Magick. No combat.",
        ],
        rewards: {
            gil: 5990,
            cp: 36,
            loot: "Cockatrice Skin ×1"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "B2-14",
        arc: "B2",
        name: "Clan Mates",
        description: "Looking for a new clan member to round out your roster? Your search is ended! The more the merrier, to be sure, but we go one further; providing you with a companion chosen to suit your clan's needs. Seek us out in Targ Wood. Clan Mates Adventurer's Guild",
        rank: 5,
        region: "Targ Wood",
        fee: 100,
        days: 20,
        questType: "Satisfy Petitioner",
        canDispatch: false,
        canCancel: true,
        members: 6,
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 0,
            adaptability: 0,
        },
    enemies: [],
        strategy: [
            "Recruitment mission — no combat. Talk to the Nu Mou in Targ Wood and answer questions about what your clan needs.",
            "The candidate offered depends on the in-game month and your answers. Only one candidate type is available per month; you can retry, but you must accept someone to finish.",
        ],
        rewards: {
            gil: 0,
            cp: 0,
            loot: ""
        },
        notes: "",
        tags: ["optional", "recruit"]
    },
    {
        id: "B2-15",
        arc: "B2",
        name: "For the Cause",
        description: "Salutations from Carm Mercantile. We would like to share with you our experiences protecting endangered monsters. While monsters can be dangerous in their own right, they can also be used for food and the making of medicines. Please make a donation to help us prevent the overhunting of mosnters, and ensure a prosperous future for all.",
        rank: 5,
        region: "Graszton",
        fee: 100,
        days: 20,
        questType: "Satisfy Petitioner",
        canDispatch: false,
        canCancel: true,
        members: 1,
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 7,
            adaptability: 7,
        },
    enemies: [],
        strategy: [
            "Non-combat mission — donate Gil (minimum 100) to Carm Mercantile to complete.",
        ],
        rewards: {
            gil: 0,
            cp: 0,
            loot: ""
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "B2-16",
        arc: "B2",
        name: "Pearls in the Deep",
        description: "Tis the season: zingu pearl season in the Galerria Deep! All those who wish to go pearl hunting must register by accepting this quest. WARNING: Unregistered pearl hunters will be considered poachers. Galerria Pearl Divers' Association",
        rank: 17,
        region: "The Galerria Deep",
        fee: 300,
        days: undefined,
        questType: "Escort",
        canDispatch: false,
        canCancel: false,
        members: 6,
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 0,
            adaptability: 0,
        },
        objective: "Defeat the Lord of the Flowsand!",
        law: "Forbidden: Actions by Nu Mous – Nu Mou may only move and perform basic attacks.",
    enemies: [
        { name: "Lord of the Flowsand", job: "Yowie", quantity: 1, notes: "The mark — VERY high HP and very hard to kill. Its attacks pull your units toward it. You hold the high ground." },
        { name: "Randomized Name", job: "Antlion", quantity: 3, notes: "Support monsters that advance while you fight the mark." },
    ],
        strategy: [
            "Nu Mou are restricted (law) — leave your strongest Nu Mou mages out and bring other healers.",
            "Bring a Bishop with Aero and grind the Lord of the Flowsand down. Watch for its pull attacks dragging units off the high ground.",
        ],
        rewards: {
            gil: 3490,
            cp: 34,
            loot: "Zingu Pearl ×8"
        },
        notes: "",
        tags: ["optional"]
    }
];
