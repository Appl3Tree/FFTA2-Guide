// src/data/missions/storyOptional.E4.ts
// Arc E4 optional missions, accurately transcribed from Side_Quests.txt

import type { Mission } from "../../types/ffta2";

export const OPTIONAL_MISSIONS_E4: Mission[] = [
    {
        id: "E4-01",
        arc: "E4",
        name: "Devilish Delight",
        description: "Never tasted the delicious tears of devils brought to a simmer by the scalding heat of fire and brimstone? Then you've never tasted Imp Stew, a sinfully tasty dish! It must be eaten while piping hot, or it loses its punch, so don't dawdle once you've ladled a bowl or three! Grosso, Culinary Crusade",
        rank: 42,
        region: "The Neslowe Passage",
        fee: 500,
        days: 20,
        questType: "Satisfy Petitioner",
        canDispatch: true,
        canCancel: true,
        members: 6,
        requiredTalents: {
            negotiation: 44,
            aptitude: 0,
            teamwork: 0,
            adaptability: 44,
        },
        dispatchRecommended: ["Assassin"],
        objective: "Defeat all foes in 4 Rounds!",
        law: "Forbidden: Being Robbed – Having gil or items stolen is forbidden.",
        enemies: [
            {
                name: "Fire Drakes ×2",
                type: "Monster",
            },
            {
                name: "Master Monk",
                type: "Monster",
            },
        ],
        rewards: {
            gil: 6410,
            cp: 84,
            loot: "Prime Tanned Hide ×1"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "E4-02",
        arc: "E4",
        name: "Shelling Out",
        description: "Fisherman's Tortoria is an old Graszton favorite of lightly seasoned turtle meat. Simple, and simply delicious! The trick to preparing this dish comes not in the kitchen but on the battlefield. Bring down the turtles with bladed weapons, and the entire dish tastes of metal, so best to avoid using them entirely. Are you up to the task? Grosso, Culinary Crusade",
        rank: 50,
        region: "Graszton",
        fee: 500,
        days: 20,
        questType: "Satisfy Petitioner",
        canDispatch: true,
        canCancel: true,
        members: 6,
        prerequisite: "Devilish Delight",
        requiredTalents: {
            negotiation: 44,
            aptitude: 0,
            teamwork: 0,
            adaptability: 44,
        },
        objective: "Upload the Law and Defeat all Foes!",
        law: "Forbidden: Bladed Weapons – Attacks with knives, swords, blades, sabers, katanas, axes",
        enemies: [
            {
                name: "Lamia",
                type: "Monster",
            },
        ],
        rewards: {
            gil: 9230,
            cp: 99,
            loot: "Emperor Scale ×1"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "E4-03",
        arc: "E4",
        name: "Flantastic Finish",
        description: "Zedlei Flan, a specialty from the forest of the same name, is a delicate desert that melts in one's mouth, before melting one's heart. Only the freshest ingredients will do for this treat! Grosso, Culinary Crusade",
        rank: 50,
        region: "Zedlei Forest",
        fee: 500,
        days: 20,
        questType: "Satisfy Petitioner",
        canDispatch: true,
        canCancel: true,
        members: 6,
        prerequisite: "Shelling Out",
        requiredTalents: {
            negotiation: 47,
            aptitude: 0,
            teamwork: 0,
            adaptability: 47,
        },
        dispatchRecommended: ["Arcanist"],
        objective: "Weaken the Red Flan and defeat all other foes!",
        law: "Forbidden: Opportunity Commands – Opportunity Commands are forbidden.",
        enemies: [],
        rewards: {
            gil: 7810,
            cp: 99,
            loot: "Fiend's Blood ×1"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "E4-05",
        arc: "E4",
        name: "The Honorable Thing",
        description: "Ah, the sweet lips of my love. My one pleasure in this life. But the vile Balfonne has stolen a kiss from my dearling Preme, and with it, her love. I could not let such a slight go unanswered! I immediately challenged Balfonne to a duel to settle this point of honor, bit sadly, urgent matters prevent me from dealing with the scoundrel myself. I seek someone to do battle in my place. Hseaunon, Preme's True Love",
        rank: 36,
        region: "The Ruins of Delgantua",
        fee: 500,
        days: 20,
        questType: "Battle",
        canDispatch: true,
        canCancel: true,
        members: 6,
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 33,
            adaptability: 33,
        },
        objective: "Defeat all Foes!",
        law: "Forbidden: Buffs – Buffs are forbidden",
        enemies: [
            {
                name: "Parivir",
                type: "Monster",
            },
            {
                name: "Cannoneer",
                type: "Monster",
            },
            {
                name: "Defender",
                type: "Monster",
            },
        ],
        strategy: [
            "Prioritize high-threat targets early in the battle",
            "Bring a healer to manage HP during the encounter",
            "Ranged magical attacks are effective in this mission",
        ],
        rewards: {
            gil: 4590,
            cp: 72,
            loot: "Putrid Liquid ×2"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "E4-06",
        arc: "E4",
        name: "From 'Cross the Sea",
        description: "I've penned a reply to my dear friend Riddim 'cross the sea. I seek a courier to deliver it to her. Meena",
        rank: 25,
        region: "Goug, Camoa",
        fee: 400,
        days: 20,
        questType: "Delivery",
        canDispatch: false,
        canCancel: true,
        members: 1,
        prerequisite: "'Cross the Sea",
        requiredTalents: {
            negotiation: 44,
            aptitude: 0,
            teamwork: 0,
            adaptability: 0,
        },
        enemies: [],
        rewards: {
            gil: 2660,
            cp: 50,
            loot: "Mythril ×1"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "E4-07",
        arc: "E4",
        name: "Training Wanted",
        description: "Those parivir we hired to watch over our town were nothing but trouble, kupo. But we learned out lesson. If we want something done right, we have to do it ourselves! We've formed a town watch to protect the city, but what we have in determination we lack in experience. We need someone to help us harden us, kupo! Zupp, Commander of the Goug Watch",
        rank: 45,
        region: "Goug",
        fee: 500,
        days: 20,
        questType: "Satisfy Petitioner",
        canDispatch: false,
        canCancel: true,
        members: 6,
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 44,
            adaptability: 44,
        },
        objective: "Defeat all Foes!",
        law: "Forbidden: > 100 Damage – Dealing > 100 Damage is forbidden.",
        enemies: [],
        rewards: {
            gil: 6620,
            cp: 90,
            loot: "Mysidia Alloy ×1"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "E4-08",
        arc: "E4",
        name: "Wall of Flame",
        description: "A connoisseur of fine cuisine is always in search of the next great meal. I am happy to tell you that meal is here, my friends! If you think you have what it takes to appreciate the finest of gastronomical delights, meet me in Aisenfield! Grosso, Culinary Crusade",
        rank: 47,
        region: "Aisenfield",
        fee: 500,
        days: 20,
        questType: "Satisfy Petitioner",
        canDispatch: true,
        canCancel: true,
        members: 6,
        prerequisite: "Flantastic Finish",
        requiredTalents: {
            negotiation: 51,
            aptitude: 0,
            teamwork: 0,
            adaptability: 51,
        },
        enemies: [
            {
                name: "Behemoths ×4",
                type: "Monster",
            },
            {
                name: "Reaver",
                type: "Monster",
            },
        ],
        strategy: [
            "Bring a healer to manage HP during the encounter",
        ],
        rewards: {
            gil: 10700,
            cp: 94,
            loot: "Spider Silk ×1"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "E4-09",
        arc: "E4",
        name: "'Cross the Sea",
        description: "My dear friend Meena has moved 'cross the sea. I seek a courier to deliver a letter to her. Riddim",
        rank: 25,
        region: "Camoa, Goug",
        fee: 400,
        days: 20,
        questType: "Delivery",
        canDispatch: false,
        canCancel: true,
        members: 1,
        requiredTalents: {
            negotiation: 44,
            aptitude: 0,
            teamwork: 0,
            adaptability: 0,
        },
        enemies: [],
        rewards: {
            gil: 2660,
            cp: 50,
            loot: "Einherjarium ×1"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "E4-10",
        arc: "E4",
        name: "Watching the Watchers",
        description: "We hired a group of parivir to protect our precious city from outside attacks, but those very same parivir have started wreaking havoc -inside- the city, kupo! We need a group of hunters to come and take care of the troublemakers. Zupp, Goug Youth Alliance",
        rank: 38,
        region: "Goug",
        fee: 500,
        days: 20,
        questType: "Battle",
        canDispatch: true,
        canCancel: true,
        members: 6,
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 44,
            adaptability: 44,
        },
        objective: "Defeat all Foes!",
        law: "Forbidden: Piercing Weapons – Attacks with rapiers and spears are forbidden.",
        enemies: [],
        rewards: {
            gil: 7000,
            cp: 76,
            loot: "Prime Pelt ×2"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "E4-11",
        arc: "E4",
        name: "Crying Eyeball",
        description: "You're not going to believe this, but I saw tons of these eyeball monsters coming out of this old mineshaft ... and they were headed for Goug! I know I say a lot of things that aren't exactly true, but this time is different! Someone hold those eyeballs off while I alert the watch! Riger, The Boy Who Cried Eyeball",
        rank: 31,
        region: "Goug",
        fee: 400,
        days: 20,
        questType: "Satisfy Petitioner",
        canDispatch: true,
        canCancel: true,
        members: 6,
        prerequisite: "Time to Act",
        requiredTalents: {
            negotiation: 44,
            aptitude: 0,
            teamwork: 0,
            adaptability: 44,
        },
        objective: "Stop the Incursion and Survive 3 Rounds!",
        law: "Forbidden: HP < or = 20 – Having less than 20 HP is forbidden.",
        enemies: [],
        rewards: {
            gil: 6390,
            cp: 62,
            loot: "Kuraisle Boxwood ×1"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "E4-12",
        arc: "E4",
        name: "Time to Act",
        description: "The parivir driven out of Goug are holding a grudge, kupo. They're back, and they've brought friends! The Goug Watch is ready to move, but this is our first real battle, and having someone to watch our backs would really be a comfort, kupo. Zupp, Commander of the Goug Watch",
        rank: 48,
        region: "Goug",
        fee: 500,
        days: 20,
        questType: "Escort",
        canDispatch: false,
        canCancel: true,
        members: 1,
        prerequisite: "Training Wanted",
        requiredTalents: {
            negotiation: 47,
            aptitude: 0,
            teamwork: 47,
            adaptability: 0,
        },
        objective: "Protect the Goug Watch and Defeat all Foes!",
        law: "Forbidden: Harming Moogles – Actions that harm moogles are forbidden.",
        enemies: [
            {
                name: "Heritor",
                type: "Monster",
            },
        ],
        strategy: [
            "Bring a healer to manage HP during the encounter",
            "Ranged magical attacks are effective in this mission",
        ],
        rewards: {
            gil: 7650,
            cp: 96,
            loot: "Lightwing Crystal ×1"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "E4-14",
        arc: "E4",
        name: "Drawn Bridge",
        description: "I'm in charge of Dow Bridge, a drawbridge linking Goug with Kthili Sands. The bridge mechanism is one of the great feats of mooglecraft! The thing is, I've run into a little problem ... I lost the key required to operate it! I dropped it in one of the mine shafts, and no one's been able to use the bridge since! My pom-pom's akimbo over the whole mess, kupo! Tchipo, Dow Bridge Operator",
        rank: 48,
        region: "Goug",
        fee: 500,
        days: 20,
        questType: "Investigation",
        canDispatch: false,
        canCancel: true,
        members: 6,
        requiredTalents: {
            negotiation: 0,
            aptitude: 44,
            teamwork: 0,
            adaptability: 0,
        },
        objective: "Find the Dow Bridge Key!",
        law: "Forbidden: Items – Items are Forbidden",
        enemies: [],
        rewards: {
            gil: 7180,
            cp: 96,
            loot: "Einherjarium ×1"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "E4-15",
        arc: "E4",
        name: "Inspiration or Perspiration?",
        description: "I seek a guide to guide me to Neslowe Peak. There I intend to stand beside a river of boiling magma and feel its heat on my skin. So inspired, I will paint a picture to capture the heat, making it real for all who look on it! You will be well reward for your trouble. Master Painter Kismunt",
        rank: 40,
        region: "The Neslowe Passage",
        fee: 500,
        days: 20,
        questType: "Escort",
        canDispatch: true,
        canCancel: true,
        members: 5,
        requiredTalents: {
            negotiation: 44,
            aptitude: 0,
            teamwork: 44,
            adaptability: 0,
        },
        dispatchRecommended: ["Defender"],
        objective: "Protect your Guest and Defeat all Foes!",
        law: "Forbidden: Instruments and Books – Attacks with Instruments and Books are Forbidden.",
        enemies: [
            {
                name: "Red Marshmallow",
                type: "Monster",
            },
        ],
        rewards: {
            gil: 10820,
            cp: 80,
            loot: "Stradivari ×1"
        },
        notes: "",
        tags: ["optional"]
    }
];