// src/data/missions/storyOptional.A5.ts
// Arc A5 optional missions, accurately transcribed from Side_Quests.txt

import type { Mission } from "../../types/ffta2";

export const OPTIONAL_MISSIONS_A5: Mission[] = [
    {
        id: "A5-01",
        arc: "A5",
        name: "Wanted: Magick Weapon",
        description: "!!!Urgent Request from the Bureau of Defense!!! Wanted: An unmanned Magick Weapon, before it has the opportunity to cause further damage. The Weapon has four legs and attacks anything that comes within range. Mist readings are off the charts, preventing detailed study. Anyone successful in stopping it will be duly rewarded. -Jylland Defenders of the Peace -Bureau of Defense",
        rank: 96,
        region: "The Aldanna Range",
        fee: 500,
        days: 20,
        questType: "Headhunt",
        canDispatch: true,
        canCancel: true,
        members: 6,
        prerequisite: "Bringer of Doom, Wanted: The Mutadragons, Adelle masters Hilo as a Heritor",
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 54,
            adaptability: 54,
        },
        objective: "Defeat the Magick Weapon at all costs!",
        law: "Forbidden: Items – Items are Forbidden",
    enemies: [
        { name: "Magick Weapon", job: "Magick Weapon", quantity: 1, notes: "Hardest boss in the game. 2000+ HP. Can Charm and Doom your units. Use Ultima attacks and high-level physical units. ReRaise on all party members is critical." },
    ],
        strategy: [
            "The Magick Weapon is a high-level Upsilon with close to 2000 HP; do not attempt it until the clan is very high level.",
            "Beguile can Charm and Doom multiple units, so equip Fortune Rings, Ribbons, Orb of Minwu, or equivalent protection.",
            "Mist explodes after two rounds and damages the whole clan; recover with abilities because Items are banned.",
            "Dual Wield and Ultima abilities such as Ultima Masher, Ultima Charge, or Ultima Sword greatly shorten the fight.",
        ],
        rewards: {
            gil: 24960,
            cp: 99,
            loot: "Fiend's Blood ×1"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "A5-03",
        arc: "A5",
        name: "Green King of Cinquleur",
        description: "We of Cinquleur seek battle with the strongest of warriors! Defeat me if you can, and you shall be rewarded! Green King Verre of Cinquleur",
        rank: 66,
        region: "Zedlei Forest",
        fee: 500,
        days: 20,
        questType: "Defeat Mark",
        canDispatch: false,
        canCancel: true,
        members: 6,
        prerequisite: "Blue King of Cinquleur",
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 8,
            adaptability: 8,
        },
        objective: "Defeat Green King Verre!",
        law: "Forbidden: Restoring HP – Actions that restore HP are forbidden.",
    enemies: [
        { name: "Green King Verre", job: "Green Mage", quantity: 1, notes: "Level 66 Viera. Has Ribbon (blocks all debuffs), Sprint Shoes, Mirror Mail (reflects magick). Uses Tranq, Last Breath, Nightmare, Ague. Has Blink Counter with a Hammer. Cannot be debuffed or hit with magick." },
    ],
        strategy: [
            "Mirror Mail reflects magick, so avoid offensive spells and lean on melee or long-range physical attackers.",
            "Ribbon prevents debuffs, and Tranq improves the accuracy of Last Breath and Nightmare.",
            "No HP restoration is allowed, so bring high max HP units and do not attempt the fight before roughly level 40.",
        ],
        rewards: {
            gil: 13090,
            cp: 99,
            loot: "Strange Liquid ×2, Great Serpent's Fang ×2, Save the Queen"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "A5-04",
        arc: "A5",
        name: "Wanted: Marksman",
        description: "We've begun development of a new gun, kupo! But developing and testing are two very different things. We need an experienced marksman to evaluate the gun for us. We think five days of testing should be enough, kupo. Goug Consortium Department of Ranged Mutilation",
        rank: 18,
        region: "Kthili Sands",
        fee: 400,
        days: 20,
        questType: "Satisfy Petitioner",
        canDispatch: false,
        canCancel: true,
        members: 1,
        prerequisite: "Making Music, visit Moorabella",
        requiredTalents: {
            negotiation: 22,
            aptitude: 0,
            teamwork: 0,
            adaptability: 22,
        },
    enemies: [],
        strategy: [
            "Dispatch mission - no combat. Send a Fusilier for five days; the request is specifically for an experienced gun user.",
        ],
        rewards: {
            gil: 3630,
            cp: 36,
            loot: "Wyvern Fang ×4"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "A5-07",
        arc: "A5",
        name: "Black King of Cinquleur",
        description: "We of Cinquleur seek battle with the strongest of warriors, kupo! Defeat me if you can, kupo, and you shall be rewarded! Black King Nware of Cinquleur",
        rank: 77,
        region: "The Galerria Deep",
        fee: 500,
        days: 20,
        questType: "Defeat Mark",
        canDispatch: false,
        canCancel: true,
        members: 6,
        prerequisite: "Now That's a Fire!, Green King of Cinquleur, complete an auction",
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 9,
            adaptability: 9,
        },
        objective: "Defeat Black King Nware!",
        law: "Forbidden: Debuffs – Debuffs are forbidden.",
    enemies: [
        { name: "Black King Nware", job: "Black Mage", quantity: 1, notes: "Moogle. Absorbs Fire, Ice, and Lightning — magick is useless. Uses Firaga, Thundaga, Blizzaga, Toadsong. Has Reflex. Use physical/melee or ranged weapons only. Cure Toad debuff with Esuna." },
    ],
        strategy: [
            "Avoid fire, ice, and lightning magick because Nware absorbs those elements and can heal from them.",
            "Use melee and long-range physical attackers such as Fusiliers and Tricksters, and exploit the opening before he has enough MP for high-tier spells.",
            "Bring Esuna or Toad recovery, but do not apply debuffs because the law forbids them.",
        ],
        rewards: {
            gil: 9820,
            cp: 99,
            loot: "Wind Sigil ×3, Crown Scepter"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "A5-08",
        arc: "A5",
        name: "Wanted: Caretaker",
        description: "I just received word that my grandmother hurt herself, kupo. She needs someone to take care of her, but I won't be able to go for another week. Will you go and see that she's all right until I arrive, kupo? Karm",
        rank: 16,
        region: "Camoa",
        fee: 300,
        days: 20,
        questType: "Satisfy Petitioner",
        canDispatch: false,
        canCancel: true,
        members: 1,
        prerequisite: "Seeking the Stone, visit any town",
        requiredTalents: {
            negotiation: 28,
            aptitude: 0,
            teamwork: 0,
            adaptability: 28,
        },
    enemies: [],
        strategy: [
            "Dispatch mission - no combat. Send a Viera White Mage for seven days; other races of White Mage do not satisfy the request.",
        ],
        rewards: {
            gil: 4100,
            cp: 32,
            loot: "Clear Sap ×3"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "A5-09",
        arc: "A5",
        name: "White King of Cinquleur",
        description: "We of Cinquleur seek battle with the strongest of warriors! Defeat me if you can, and you shall be rewarded! White King Blanch of Cinquleur",
        rank: 88,
        region: "The Rupie Mountains",
        fee: 300,
        days: 20,
        questType: "Defeat Mark",
        canDispatch: false,
        canCancel: true,
        members: 6,
        prerequisite: "Black King of Cinquleur",
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 11,
            adaptability: 11,
        },
        objective: "Defeat White King Blanch!",
        law: "Forbidden: Missing – Missing with an action is forbidden.",
    enemies: [
        { name: "White King Blanch", job: "White Mage", quantity: 1, notes: "Nu Mou. Level 88. Uses Scathe, Gigaflare, Bio (via Blood Price). Has MP Shield — forces frequent Blood Price. Use ranged attacks to drain HP." },
    ],
        strategy: [
            "Use high-accuracy attacks or Stop to avoid breaking the Missing law.",
            "White King Blanch is a level 88 Nu Mou White Mage with Sage abilities such as Scathe, Gigaflare, and Bio.",
            "Long-range attackers and Dual Wield users help force Blood Price HP loss while staying out of danger.",
            "Do not rely on MP attrition: Blood Price lets him cast with HP, and MP Shield can make repeated hits awkward.",
        ],
        rewards: {
            gil: 13720,
            cp: 99,
            loot: "Clock Gear ×8, Cheer Staff"
        },
        notes: "",
        tags: ["optional"]
    },
    {
        id: "A5-14",
        arc: "A5",
        name: "The Five Kings",
        description: "We of Cinquleur seek battle with Clan <NAME>! Cinquleur",
        rank: 99,
        region: "The Aldanna Range",
        fee: 500,
        days: 20,
        questType: "Battle",
        canDispatch: false,
        canCancel: true,
        members: 6,
        prerequisite: "White King of Cinquleur, complete game save",
        requiredTalents: {
            negotiation: 0,
            aptitude: 0,
            teamwork: 54,
            adaptability: 54,
        },
        objective: "Defeat all Foes!",
        law: "Forbidden: HP < or = 200 – having 200 HP or less is forbidden.",
    enemies: [
        { name: "Red King Ruuj", job: "Elementalist", quantity: 1, notes: "Level 99. Doublecast and Elementalist pressure." },
        { name: "White King Blanch", job: "White Mage", quantity: 1, notes: "Level 99. White Mage with Sage abilities; top priority because healing and Scathe/Gigaflare pressure can decide the fight." },
        { name: "Green King Verre", job: "Green Mage", quantity: 1, notes: "Level 99. Doom, Sleep, KO, and debuff pressure; Mirror Mail remains relevant." },
        { name: "Black King Nware", job: "Black Mage", quantity: 1, notes: "Level 99. High-tier attack magick and elemental absorption." },
        { name: "Blue King Bliu", job: "Blue Mage", quantity: 1, notes: "Level 99. Dual Wield and Magick Frenzy pressure." },
    ],
        strategy: [
            "Bring the strongest six-member clan, Scion accessories, Ribbons, Fortune Rings, and Ninja Tabis.",
            "Defeat White King Blanch first so the kings cannot recover HP, then focus one king at a time.",
            "Ultima abilities, Ranger Mirror Items, High Seraph's Plume, Zodiark from Ring of Precepts, and careful Scion use can swing the fight.",
            "Keep everyone above 200 HP and stay spread out between turns to reduce the impact of multi-target pressure.",
        ],
        rewards: {
            gil: 15440,
            cp: 99,
            loot: "Lightwing Crystal ×1, Condemner's Choker"
        },
        notes: "",
        tags: ["optional"]
    }
];
