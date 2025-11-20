// src/data/missions/storyOptional.B4.ts
// Arc B4 optional missions, accurately transcribed from Side_Quests.txt

import type { Mission } from "../../types/ffta2";

export const OPTIONAL_MISSIONS_B4: Mission[] = [
    {
        id: "B4-01",
        arc: "B4",
        name: "Great Land Festival",
        description: "It will be Silversun soon, and in Camoa Silversun means the Great Land Festival! We're looking for people to join in the festivities and help decorate our town! The work will last for ten days, with lodging and board provided! Come one, come all! Camoa Great Land Festival Committee",
        rank: 7,
        region: "Camoa",
        fee: 200,
        days: 10,
        questType: "Satisfy Petitioner",
        canDispatch: false,
        canCancel: true,
        members: 1,
        requiredTalents: {
            negotiation: 4,
            aptitude: 0,
            teamwork: 0,
            adaptability: 4,
        },
        objective: "Dispatch the right person for the job.",
        enemies: [],
        rewards: {
            gil: 320,
            cp: 14,
            loot: "Knot of Rust ×8, Ether ×4, Phoenix Down ×4"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "B4-02",
        arc: "B4",
        name: "Strong Lady",
        description: "That old man dressed up as a lady was fighting, ohm and he was strong. Real strong! And the clan that lost got dragged off somewheres. I cried a little then, and he gave me a sweet. But I thought I should tell someone anyway. Crybaby Kocoot",
        rank: 30,
        region: "Camoa",
        fee: 400,
        days: 20,
        questType: "Defeat Mark",
        canDispatch: true,
        canCancel: true,
        members: 6,
        prerequisite: "Making Port",
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 15,
            adaptability: 15,
        },
        objective: "Defeat the Night Dancer!",
        law: "Forbidden: Harming the Weak – Actions that harm a lower level unit are forbidden.",
        enemies: [
            {
                name: "Trickster",
                type: "Monster",
            },
        ],
        rewards: {
            gil: 5320,
            cp: 60,
            loot: "Windgod Crystal ×1, Mythril ×4"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "B4-03",
        arc: "B4",
        name: "I Want to Forget",
        description: "I love someone whom I can never have. The very thought haunts me each moment I draw breath. It is more than I can bear. And so I wish to quit this mortal life. There is a substance known as zombie powder which may grant me the relief I so deseperately seek. Please, find this and bring it to me. End my suffering. Glefein",
        rank: 33,
        region: "Tramdine Fens",
        fee: 500,
        days: 20,
        questType: "Satisfy Petitioner",
        canDispatch: false,
        canCancel: true,
        members: 6,
        prerequisite: "I've Been Had, Kupo!",
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 18,
            adaptability: 18,
        },
        objective: "Fulfill the obligations of your quest!",
        law: "Forbidden: Using > or = 20 MP – Actions that consume 20 or more HP are forbidden.",
        enemies: [],
        rewards: {
            gil: 7880,
            cp: 66,
            loot: "Crusite Alloy ×5"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "B4-04",
        arc: "B4",
        name: "The Goug Consortium",
        description: "Kupo! Some members of our department went to field-test our latest prototype, but they haven't returned, kupo! We need someone to see if they're all right. If that gun were to fall into the wrong hands ... well, let's not think of that! Goug Consortium Department of Ranged Mutilation",
        rank: 17,
        region: "Zedlei Forest",
        fee: 300,
        days: 20,
        questType: "Battle",
        canDispatch: false,
        canCancel: true,
        members: 6,
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 9,
            adaptability: 9,
        },
        objective: "Defeat all Foes!",
        law: "Forbidden: Targeting All Units – Actions targeting all units at once are forbidden",
        enemies: [
            {
                name: "Fusiliers ×6",
                type: "Monster",
            },
        ],
        battlefield: [
            "The map features elevation differences",
        ],
        strategy: [
            "Bring a healer to manage HP during the encounter",
            "Ranged magical attacks are effective in this mission",
        ],
        rewards: {
            gil: 2890,
            cp: 34,
            loot: "Silver Liquid ×2"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "B4-05",
        arc: "B4",
        name: "Wanted: Sidekick",
        description: "By the archmage Lezaford and all those great men and women who followed him into the annals of history was our world shaped. Surely, such potential must exist today no less than it did in the ages of old! Two months is all I ask! Lend me your aid on my journey to find these great people of our time! Marcol, Researcher of Future History",
        rank: 14,
        region: "Graszton",
        fee: 300,
        days: 20,
        questType: "Satisfy Petitioner",
        canDispatch: false,
        canCancel: true,
        members: 1,
        requiredTalents: {
            negotiation: 7,
            aptitude: 0,
            teamwork: 0,
            adaptability: 7,
        },
        enemies: [],
        strategy: [
            "Ranged magical attacks are effective in this mission",
        ],
        rewards: {
            gil: 1110,
            cp: 28,
            loot: "Marriom Heather ×2"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "B4-06",
        arc: "B4",
        name: "Caravan Cry",
        description: "Bandits! Bandits in the Kthili Sands! Help! Griv's Caravan",
        rank: 34,
        region: "Kthili Sands",
        fee: 500,
        days: 20,
        questType: "Escort",
        canDispatch: true,
        canCancel: true,
        members: 6,
        prerequisite: "Strong Lady",
        requiredTalents: {
            negotiation: 18,
            aptitude: 0,
            teamwork: 18,
            adaptability: 0,
        },
        objective: "Protect Alys the Ensorceled and Defeat all Foes!",
        law: "Forbidden: Opportunity Commands – Opportunity Commands are forbidden.",
        enemies: [
            {
                name: "Thief",
                type: "Monster",
            },
        ],
        strategy: [
            "Having Esuna available is recommended to handle debuffs",
            "Bring a healer to manage HP during the encounter",
        ],
        rewards: {
            gil: 5410,
            cp: 68,
            loot: "Ancient Turtle Shell ×2"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "B4-07",
        arc: "B4",
        name: "Under the Weather",
        description: "I'm... not feeling well of late. A but under the weather you might say. Could someone bring a potion ... and a hi-potion to Tramdine Fens for me? Many Thanks. Lotice, Friend to no physician",
        rank: 11,
        region: "Tramdine Fens",
        fee: 300,
        days: 20,
        questType: "Satisfy Petitioner",
        canDispatch: false,
        canCancel: true,
        members: 1,
        requiredItems: ["Potion ×1"],
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 18,
            adaptability: 18,
        },
        enemies: [],
        rewards: {
            gil: 7880,
            cp: 22,
            loot: "Silver Liquid ×4"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "B4-08",
        arc: "B4",
        name: "The Eastwatch",
        description: "Clan <Name> The might of your clan is renowned throughout Jylland, We have traveled from a land beyond where the sun rises in hopes of testing that might against our own. Will you face us in battle? Zengen, The Eastwatch",
        rank: 25,
        region: "Moorabella",
        fee: 400,
        days: 20,
        questType: "Battle",
        canDispatch: false,
        canCancel: true,
        members: 6,
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 15,
            adaptability: 15,
        },
        objective: "Defeat all Foes!",
        law: "Forbidden: Summoning Scions – Summoning Scions is forbidden.",
        enemies: [
            {
                name: "Parivir ×3",
                type: "Monster",
            },
            {
                name: "Ninjas ×2",
                type: "Monster",
            },
        ],
        strategy: [
            "Prioritize high-threat targets early in the battle",
        ],
        rewards: {
            gil: 3910,
            cp: 50,
            loot: "Moon Ring ×5"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "B4-09",
        arc: "B4",
        name: "Wanted: Shiny Maces",
        description: "Ngaaa! I'm short-handed! Don't have anyone to polish up these maces! You interested? If you can so much as hold a mace, you're the right one for the job! Ten days or so ought to help me clear out the backlog. Chita, Chita's Weapons",
        rank: 5,
        region: "The Bisga Greenlands",
        fee: 100,
        days: 20,
        questType: "Battle",
        canDispatch: false,
        canCancel: true,
        members: 1,
        requiredTalents: {
            negotiation: 7,
            aptitude: 0,
            teamwork: 0,
            adaptability: 7,
        },
        enemies: [
            {
                name: "Green Mage",
                type: "Monster",
            },
        ],
        rewards: {
            gil: 1110,
            cp: 10,
            loot: "Aged Turtle Shell ×1, Soft Cotton ×2, Bone Chips ×1"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "B4-10",
        arc: "B4",
        name: "Aid the Serpent",
        description: "We've been after a certain mark for some time now, but have been foiled in our efforts to stop it. Who better to aid us than everyone's favourite swords-for-hire, Clan <Name>? Come, fight with us! Clan Serpentina",
        rank: 39,
        region: "The Ruins of Delgantua",
        fee: 500,
        days: 20,
        questType: "Headhunt",
        canDispatch: true,
        canCancel: true,
        members: 6,
        prerequisite: "Caravan Cry",
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 22,
            adaptability: 22,
        },
        objective: "Defeat the Mark!",
        law: "Forbidden: Actions by Viera – Viera may only move and perform basic attacks.",
        enemies: [],
        strategy: [
            "Having Esuna available is recommended to handle debuffs",
            "Bring a healer to manage HP during the encounter",
            "Ranged magical attacks are effective in this mission",
        ],
        rewards: {
            gil: 5320,
            cp: 78,
            loot: "Adamantite ×2"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "B4-11",
        arc: "B4",
        name: "A Chill in the Night",
        description: "Night after night monsters plague the lands surrounding our homes. Something must be done, but I'm too frightened to do anything myself. Please, find the source of these monsters and drive them from our lands! Tod Hapwell",
        rank: 19,
        region: "Fluorgis",
        fee: 300,
        days: 20,
        questType: "Satisfy Petitioner",
        canDispatch: false,
        canCancel: true,
        members: 1,
        prerequisite: "Under the Weather",
        requiredTalents: {
            negotiation: 28,
            aptitude: 0,
            teamwork: 0,
            adaptability: 28,
        },
        enemies: [
            {
                name: "Lotice",
                type: "Monster",
            },
        ],
        rewards: {
            gil: 5080,
            cp: 38,
            loot: "Windslicer Pinion ×1"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "B4-12",
        arc: "B4",
        name: "To Be a Spellblade",
        description: "Magick and steel: two paths seemingly at odds. Yet both heed the spellblade and her will. One may not undertake the trial to become a spellblade alone, and I would have your fight at my side. Hana, Red Mage",
        rank: 28,
        region: "Moorabella",
        fee: 400,
        days: 20,
        questType: "Escort",
        canDispatch: false,
        canCancel: true,
        members: 3,
        requiredTalents: {
            negotiation: 18,
            aptitude: 0,
            teamwork: 18,
            adaptability: 0,
        },
        objective: "Protect Hana and Defeat 10 Foes!",
        law: "Forbidden: Actions by Gria – Gria may only move and perform basic attacks.",
        enemies: [
            {
                name: "Fencer ×1",
                type: "Monster",
            },
        ],
        strategy: [
            "Bring a healer to manage HP during the encounter",
            "Ranged magical attacks are effective in this mission",
        ],
        rewards: {
            gil: 8190,
            cp: 56,
            loot: "Unpurified Ether ×2"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "B4-13",
        arc: "B4",
        name: "Wanted: Artillery",
        description: "We seek someone to supplement our ranks for a short time and aid us in our fight against a powerful foe. Our strength is in melee, so we need a recruit to provide artillery support. Once the barrage has broken their ranks, we'll move in and mop up what's left. Ten days should be enough to finish the campaign. Bedeviled, Daemons of Battle",
        rank: 12,
        region: "Fluorgis",
        fee: 300,
        days: 20,
        questType: "Satisfy Petitioner",
        canDispatch: false,
        canCancel: true,
        members: 1,
        requiredTalents: {
            negotiation: 15,
            aptitude: 0,
            teamwork: 0,
            adaptability: 15,
        },
        enemies: [],
        rewards: {
            gil: 2680,
            cp: 24,
            loot: "Gemsteel ×5"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "B4-14",
        arc: "B4",
        name: "Caravan Cry II",
        description: "We're under attack in Sant D'alsa Bluff from some mean-looking sorts. Send help, quick! Pie-Thon Caravan",
        rank: 45,
        region: "Sant D'alsa Bluff",
        fee: 500,
        days: 20,
        questType: "Escort",
        canDispatch: true,
        canCancel: true,
        members: 6,
        requiredTalents: {
            negotiation: 28,
            aptitude: 0,
            teamwork: 28,
            adaptability: 0,
        },
        dispatchRecommended: ["Defender"],
        objective: "Protect Duke Snakeheart and Defeat all Foes!",
        law: "Forbidden: Non-Elemental Effects – Use of non-elemental weapons and abilities is forbidden.",
        enemies: [
            {
                name: "Seer",
                type: "Monster",
            },
            {
                name: "Master Monk",
                type: "Monster",
            },
        ],
        strategy: [
            "Having Esuna available is recommended to handle debuffs",
        ],
        rewards: {
            gil: 6010,
            cp: 90,
            loot: "Snowcat Crystal ×1"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "B4-15",
        arc: "B4",
        name: "Show of Strength",
        description: "Help! My chocobo corral's been taken over by a ruffian calling himself the Swordking and his band of cohorts! Problem is, they're good. Quite good. They claim they've never been bested! I cannot protect my beloved chocobos ... Someone help me, please! Yew, Chocobo Rancher",
        rank: 33,
        region: "Targ Wood",
        fee: 500,
        days: 20,
        questType: "Battle",
        canDispatch: false,
        canCancel: true,
        members: 6,
        prerequisite: "A Chill in the Night",
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 33,
            adaptability: 33,
        },
        objective: "Protect Ghi and Defeat all Foes!",
        law: "Forbidden: Targeting an Area – Actions targeting two or more tiles are forbidden.",
        enemies: [
            {
                name: "Viking",
                type: "Monster",
            },
            {
                name: "Parivir",
                type: "Monster",
            },
        ],
        rewards: {
            gil: 5670,
            cp: 66,
            loot: "Windgod Crystal ×3"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "B4-16",
        arc: "B4",
        name: "Lord Grayrl!",
        description: "You be wanting that rare gem of gems, the noble pearl, eh? Perhaps I might part with it for 10 million ... no, 30 million - wait, 50 million! A good price, no? Bwa ha ha! Come to the wharf in Graszton. Bring yer money and nothing else ... 'cept maybe a few wheelbarrows to carry it in! Bwah ha! Lord Grayrl, Gentleman Trader",
        rank: 28,
        region: "Graszton",
        fee: 400,
        days: 20,
        questType: "Defeat Mark",
        canDispatch: false,
        canCancel: true,
        members: 6,
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 22,
            adaptability: 22,
        },
        objective: "Defeat Lord Grayrl!",
        law: "Forbidden: Not Moving 3 Tiles – Each unit must move exactly 3 tiles before ending its turn.",
        enemies: [],
        strategy: [
            "Prioritize high-threat targets early in the battle",
            "Bring a healer to manage HP during the encounter",
        ],
        rewards: {
            gil: 5110,
            cp: 56,
            loot: "Wyvern Wing ×2"
        },
        notes: "",
        tags: ["optional"]
    }
];
