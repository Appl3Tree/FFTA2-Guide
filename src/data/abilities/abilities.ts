// src/data/abilities/abilities.ts

export type AbilityId = string;
export type AbilitySetId = string;

export interface AbilitySetMeta {
    id: AbilitySetId;
    name: string;          // "Arts of War"
    description?: string;  // optional flavor
}

export interface AbilityMeta {
    id: AbilityId;
    setId: AbilitySetId;   // <- ties it to its set
    otherSetIds?: string[];
    name: string;          // "First Aid"
    description: string[];   // "Restore a small amount of HP..."
    blueMagic?: boolean;
}

export const ABILITY_SETS: Record<AbilitySetId, AbilitySetMeta> = {
    /* Template y5y
    : {
        id: "",
        name: "",
        description: ""
    },
    */
    acrobatics: {
        id: "acrobatics",
        name: "Acrobatics",
        description: "JUGGLERS attack with a rain of rings and baubles."
    },
    alchemy: {
        id: "alchemy",
        name: "Alchemy",
        description: "The skills of the ALCHEMIST center on their ability to transmute and alter matter to suit their whim."
    },
    "arcane-magicks": {
        id: "arcane-magicks",
        name: "Arcane Magicks",
        description: "Fire, ice, and lightning have no place among the magicks of the ARCANIST."
    },
    "arts-of-war": {
        id: "arts-of-war",
        name: "Arts of War",
        description: "SOLDIERS and WARRIORS use these skills to weaken foes' defenses."
    },
    assassination: {
        id: "assassination",
        name: "Assassination",
        description: "The abilities of the ASSASSIN mark their target for death."
    },
    astutia: {
        id: "astutia",
        name: "Astutia",
        description: "The LANISTA turn to these skills bought with blood and blade."
    },
    ballistics: {
        id: "ballistics",
        name: "Ballistics",
        description: "FLINTLOCKS use these skills to imbue shells with the power of their magicks."
    },
    "black-magick": {
        id: "black-magick",
        name: "Black Magick",
        description: "The elemental magicks of the BLACK MAGE strike with the power of fire and ice."
    },
    "blue-magick": {
        id: "blue-magick",
        name: "Blue Magick",
        description: "BLUE MAGES learn the abilities of their foes and use them to fight back."
    },
    "beast-lore": {
        id: "beast-lore",
        name: "Beast Lore",
        description: "The powers of the BEASTMASTER are the powers of the beasts themselves."
    },
    "blade-arts": {
        id: "blade-arts",
        name: "Blade Arts",
        description: "These skills imbue the weapons of the SPELLBLADE with magicks that weaken those they strike."
    },
    brutality: {
        id: "brutality",
        name: "Brutality",
        description: "VIKINGS plunder the battlefield and call down lightning from the skies."
    },
    calling: {
        id: "calling",
        name: "Calling",
        description: "The ANIMIST uses the abilities of the beasts of the wild."
    },
    cannonry: {
        id: "cannonry",
        name: "Cannonry",
        description: "CANNONEERS possess an array of abilities useful in almost any battle."
    },
    chivalry: {
        id: "chivalry",
        name: "Chivalry",
        description: "The PALADIN commands these abilities to defend allies with a practiced blade."
    },
    chococraft: {
        id: "chococraft",
        name: "Chococraft",
        description: "The CHOCOBO KNIGHT has the powers of his mount at his command."
    },
    clockwork: {
        id: "clockwork",
        name: "Clockwork",
        description: "The TINKER crafts elaborate devices that wreak havoc on the battlefield."
    },
    dance: {
        id: "dance",
        name: "Dance",
        description: "The arts of the DANCER, used to perform magical dances with an array of unique effects."
    },
    devastation: {
        id: "devastation",
        name: "Devastation",
        description: "These abilities allow the RAPTOR to channel her energy through her blade to strike down her foes."
    },
    discipline: {
        id: "discipline",
        name: "Discipline",
        description: "The abilities of the WHITE MONK turn the body itself into a powerful weapon."
    },
    "dragon-soul": {
        id: "dragon-soul",
        name: "Dragon Soul",
        description: "The power of dragons stirs within the abilities of the DRAGOON."
    },
    "elemental-magick": {
        id: "elemental-magick",
        name: "Elemental Magick",
        description: "The craft of the ELEMENTALIST enables her to call on the spirits of nature."
    },
    fencing: {
        id: "fencing",
        name: "Fencing",
        description: "The FENCER fights with attacks that pierce even the hardest steel."
    },
    feralism: {
        id: "feralism",
        name: "Feralism",
        description: "The base instincts of battle are the weapons of the RAVAGER."
    },
    flair: {
        id: "flair",
        name: "Flair",
        description: "The arsenal of the Parivir beats down foes with blindingly fast swordstrikes of deadly precision."
    },
    geomancy: {
        id: "geomancy",
        name: "Geomancy",
        description: "The breath of the wind and the lay of the earth are the GEOMANCER's power."
    },
    "green-magick": {
        id: "green-magick",
        name: "Green Magick",
        description: "The magicks of the GREEN MAGE lend strength and succor to her allies."
    },
    guile: {
        id: "guile",
        name: "Guile",
        description: "The malice festering in the hearts of the NIGHTSHADES led them to these dark arts."
    },
    gunmanship: {
        id: "gunmanship",
        name: "Gunmanship",
        description: "The abilities of the FUSILIER enchant their shot, with a variety of effects."
    },
    "high-magick": {
        id: "high-magick",
        name: "High Magick",
        description: "The magicks of the SEER can decimate foes and mend wounded allies."
    },
    illusion: {
        id: "illusion",
        name: "Illusion",
        description: "The ILLUSIONIST commands powerful magicks that strike foes throughout the battlefield."
    },
    instinct: {
        id: "instinct",
        name: "Instinct",
        description: "The secrets of the Gifted are the weapons of the HERITOR."
    },
    intercession: {
        id: "intercession",
        name: "Intercession",
        description: "BISHOPS chant these sacred prayers to sway battle in their favor."
    },
    lore: {
        id: "lore",
        name: "Lore",
        description: "SCHOLARS find their power in the study of ancient texts."
    },
    "martial-arts": {
        id: "martial-arts",
        name: "Martial Arts",
        description: "MASTER MONKS use these age old attacks to deal debilitating blows with their fists."
    },
    ninjutsu: {
        id: "ninjutsu",
        name: "Ninjutsu",
        description: "NINJA attack with this unique school of techniques learned from a distant land."
    },
    onslaught: {
        id: "onslaught",
        name: "Onslaught",
        description: "MOOGLE KNIGHTS charge bravely into battle with these mighty attacks."
    },
    passive: {
        id: "passive",
        name: "Passive",
        description: "Passive abilities are always around, helping you out. Some might let you use equipment you normally wouldn't be able to, or boost the damage you deal."
    },
    piracy: {
        id: "piracy",
        name: "Piracy",
        description: "SKY PIRATES know countless tricks to make the money of many into the wealth of one."
    },
    precision: {
        id: "precision",
        name: "Precision",
        description: "The skills of the ARCHER do not call for brute force, but deadly accuracy to fell a foe."
    },
    pugilism: {
        id: "pugilism",
        name: "Pugilism",
        description: "FIGHTERS use their abilities to attack with a fury of blades."
    },
    reaction: {
        id: "reaction",
        name: "Reaction",
        description: "Reaction abilities trigger automatically when someone else does something to you."
    },
    reconnaissance: {
        id: "reconnaissance",
        name: "Reconnaissance",
        description: "The AGENT does all in the name of his liege lady."
    },
    "red-magick": {
        id: "red-magick",
        name: "Red Magick",
        description: "RED MAGES have a broad range of magicks at their disposal."
    },
    "sacred-blade": {
        id: "sacred-blade",
        name: "Sacred Blade",
        description: "The arsenal of the TEMPLAR boasts powerful sword attacks and support magicks."
    },
    sagacity: {
        id: "sagacity",
        name: "Sagacity",
        description: "SAGES are proud wizards, quick to distinguish their magicks from those of the Black Mage."
    },
    savagery: {
        id: "savagery",
        name: "Savagery",
        description: "These ferocious attacks of the BERSERKER defy the conventions of battle and belief."
    },
    sharpshooting: {
        id: "sharpshooting",
        name: "Sharpshooting",
        description: "SNIPERS end the lives of their victims with shots of uncanny accuracy."
    },
    "sleight-of-hand": {
        id: "sleight-of-hand",
        name: "Sleight of Hand",
        description: "The TRICKSTER deceives his foes with these crafty abilities."
    },
    song: {
        id: "song",
        name: "Song",
        description: "The BARD plays songs that impart strange magicks on those who harken them."
    },
    sparring: {
        id: "sparring",
        name: "Sparring",
        description: "The GLADIATOR calls on this peculiar mix of sword and sorcery."
    },
    "summoning-magick": {
        id: "summoning-magick",
        name: "Summoning Magick",
        description: "SUMMONERS use these abilities to call powerful Espers from the world of illusion."
    },
    survivalism: {
        id: "survivalism",
        name: "Survivalism",
        description: "RANGERS use the traps in this extensive arsenal to bring down their mark."
    },
    thievery: {
        id: "thievery",
        name: "Thievery",
        description: "The THIEF uses this shadowy craft to make the possessions of others his own."
    },
    "time-magick": {
        id: "time-magick",
        name: "Time Magick",
        description: "TIME MAGES use these powerful magicks to manipulate space and time."
    },
    trapping: {
        id: "trapping",
        name: "Trapping",
        description: "HUNTERS stalk their foes with these skills learned on the hunt."
    },
    turning: {
        id: "turning",
        name: "Turning",
        description: "The KEEPER of the tower wields these powerful abilities that glean their power from the moon."
    },
    warding: {
        id: "warding",
        name: "Warding",
        description: "These skills protect the DEFENDER and his allies."
    },
    "white-magick": {
        id: "white-magick",
        name: "White Magick",
        description: "WHITE MAGES work these magicks to heal and restore their allies."
    },
    abyss: {
        id: "abyss",
        name: "Abyss",
        description: "The Neukhia pulastes with the dark powers of the underworld.",
    },
    ambrosia: {
        id: "ambrosia",
        name: "Ambrosia",
        description: "Rafflesia attack with long vines and clouds of suffocating stench.",
    },
    ambush: {
        id: "ambush",
        name: "Ambush",
        description: "The Yowie attacks by drawing its prey beneath the sands.",
    },
    "bestial-force": {
        id: "bestial-force",
        name: "Bestial Force",
        description: "Behemoths sunder the defenses of their prey with claws as sharp as any forge-wrought blade.",
    },
    breath: {
        id: "breath",
        name: "Breath",
        description: "Drakes breathe great gouts of frost and flame across the battlefield.",
    },
    "brute-force": {
        id: "brute-force",
        name: "Brute Force",
        description: null,
    },
    "call-of-the-wild": {
        id: "call-of-the-wild",
        name: "Call of the Wild",
        description: "Werewolves raise a blood-curdling cry as they rend the flesh from their prey.",
    },
    "chocobo-wiles": {
        id: "chocobo-wiles",
        name: "Chocobo Wiles",
        description: "The color of the chocobo's plumage hints at its powers.",
    },
    darkness: {
        id: "darkness",
        name: "Darkness",
        description: null,
    },
    "dark-magick": {
        id: "dark-magick",
        name: "Dark Magick",
        description: "The spirits of the dead have a fondness for these dark magicks.",
    },
    "deadly-nightshade": {
        id: "deadly-nightshade",
        name: "Deadly Nightshade",
        description: "The large head of the deadly nightshade makes for a fearsome weapon.",
    },
    "deaths-grasp": {
        id: "deaths-grasp",
        name: "Death's Grasp",
        description: "Zombies sap the strength of their victims with a belch of fetid breath.",
    },
    defense: {
        id: "defense",
        name: "Defense",
        description: null,
    },
    elimination: {
        id: "elimination",
        name: "Elimination",
        description: null,
    },
    enthrallment: {
        id: "enthrallment",
        name: "Enthrallment",
        description: "The haunting gaze of the Ahriman's giant eye is a thing to be feared.",
    },
    enticement: {
        id: "enticement",
        name: "Enticement",
        description: "Though cute and cuddly, dreamhares have a number of abilities with which to defend themselves against would-be predators.",
    },
    "ghostly-touch": {
        id: "ghostly-touch",
        name: "Ghostly Touch",
        description: "The icy touch of the ghost drains the life force of those who fall into its clutches.",
    },
    halitosis: {
        id: "halitosis",
        name: "Halitosis",
        description: "Malboros and their kin belch noxious gasses and are generally unpleasant.",
    },
    impale: {
        id: "impale",
        name: "Impale",
        description: "The alraune attacks with the drill-shaped horn atop its head.",
    },
    maw: {
        id: "maw",
        name: "Maw",
        description: "Wolves stalk their prey with steel-sharp claws and slavering fangs.",
    },
    metamorphosis: {
        id: "metamorphosis",
        name: "Metamorphosis",
        description: "Flans use their own fluidic bodies to heal allies and attack foes.",
    },
    mischief: {
        id: "mischief",
        name: "Mischief",
        description: "Sprites use these abilities to harry and harass their foes.",
    },
    nightmare: {
        id: "nightmare",
        name: "Nightmare",
        description: "Deathscythes guide the living to the world beyond with these powers of darkness.",
    },
    "paper-rock-scissors": {
        id: "paper-rock-scissors",
        name: "Paper-Rock-Scissors",
        description: "Mimics have their own peculiar way of fighting.",
    },
    parasite: {
        id: "parasite",
        name: "Parasite",
        description: "Floating eyes stun their prey with a beat of their wings before swooping in to bite with powerful jaws.",
    },
    revenge: {
        id: "revenge",
        name: "Revenge",
        description: "Tonberries seek retribution for those whose lives were cut short in battle.",
    },
    sands: {
        id: "sands",
        name: "Sands",
        description: "A storm of sand and vile poisons awaits those who draw too near to an antlion.",
    },
    "shell-crush": {
        id: "shell-crush",
        name: "Shell Crush",
        description: "Shellings crush enemies with their rock-hard carapaces.",
    },
    taktak: {
        id: "taktak",
        name: "Taktak",
        description: "The attacks of the baknamy pass unhindered through a foe's defenses.",
    },
    territorialism: {
        id: "territorialism",
        name: "Territorialism",
        description: "Cockatrices use their powerful wings to shield themselves from attack and strike at their prey.",
    },
    volatility: {
        id: "volatility",
        name: "Volatility",
        description: null,
    },
    wyrmcraft: {
        id: "wyrmcraft",
        name: "Wyrmcraft",
        description: "Few, if any, can stand before the might of the great wyrms and prevail.",
    },
    "???": {
        id: "???",
        name: "???",
        description: "Few can say just what a magick pot will do...",
    },
};

export const ABILITIES: Record<AbilityId, AbilityMeta> = {
    roulette: {
        id: "roulette",
        setId: "enthrallment",
        otherSetIds: ["blue-magick"],
        name: "Roulette",
        description: [
            "Randomly KOs a unit on the field.",
			"Learned from Ahriman.",
        ],
        blueMagic: true
    },
    glare: {
        id: "glare",
        setId: "enthrallment",
        name: "Glare",
        description: [
            "Inflicts Petrify.",
        ],
    },
    "demonic-gaze": {
        id: "demonic-gaze",
        setId: "enthrallment",
        name: "Demonic Gaze",
        description: [
            "Inflicts Confuse.",
        ],
    },
    "binding-circle": {
        id: "binding-circle",
        setId: "enthrallment",
        name: "Binding Circle",
        description: [
            "Inflicts Slow and lowers Speed.",
        ],
    },
    dread: {
        id: "dread",
        setId: "enthrallment",
        name: "Dread",
        description: [
            "Inflicts Disable and Addle.",
        ],
    },
    "bewitching-gaze": {
        id: "bewitching-gaze",
        setId: "enthrallment",
        name: "Bewitching Gaze",
        description: [
            "Inflicts Charm and Slow.",
        ],
    },
    sandstorm: {
        id: "sandstorm",
        setId: "sands",
        otherSetIds: ["blue-magick"],
        name: "Sandstorm",
        description: [
            "Deals Earth damage and inflicts Blind.",
			"Learned from Antlion.",
        ],
        blueMagic: true
    },
    cannibalize: {
        id: "cannibalize",
        setId: "sands",
        name: "Cannibalize",
        description: [
            "KO an ally to raise stats by one level.",
        ],
    },
    suffocate: {
        id: "suffocate",
        setId: "sands",
        name: "Suffocate",
        description: [
            "Delays target's next turn.",
        ],
    },
    bile: {
        id: "bile",
        setId: "sands",
        name: "bile",
        description: [
            "Damages and lowers Defense and Magick Resistance.",
        ],
    },
    mucus: {
        id: "mucus",
        setId: "sands",
        name: "mucus",
        description: [
            "Damages and inflicts Slow.",
        ],
    },
    saliva: {
        id: "saliva",
        setId: "sands",
        name: "saliva",
        description: [
            "Damages and decreases Speed.",
        ],
    },
    subsidence: {
        id: "subsidence",
        setId: "sands",
        name: "subsidence",
        description: [
            "Deals Earth damage.",
        ],
    },
    "magick-hammer": {
        id: "magick-hammer",
        setId: "taktak",
        otherSetIds: ["blue-magick"],
        name: "Magick Hammer",
        description: [
            "Smite foe with a mysterious hammer. Depletes target's MP.",
			"Learned from Baknamykind.",
        ],
        blueMagic: true
    },
    "goblin-attack": {
        id: "goblin-attack",
        setId: "taktak",
        name: "Goblin Attack",
        description: [
            "Execute a series of quick punches. Ignores target's armor DEFENSE.",
        ],
    },
    mutilate: {
        id: "mutilate",
        setId: "taktak",
        name: "Mutilate",
        description: [
            "Drains half of target's current HP. Accuracy is half of Attack rating.",
        ],
    },
    "rend-shield": {
        id: "rend-shield",
        setId: "bestial-force",
        name: "Rend Shield",
        description: [
            "Damages and destroys target's shield.",
        ],
    },
    "rend-defense": {
        id: "rend-defense",
        setId: "bestial-force",
        name: "Rend Defense",
        description: [
            "Damages and lowers target's Defense.",
        ],
    },
    "hell-assault": {
        id: "hell-assault",
        setId: "bestial-force",
        name: "Hell Assault",
        description: [
            "Damages, knocks targets back, and grants user Focus status.",
        ],
    },
    "self-destruct": {
        id: "self-destruct",
        setId: "volatility",
        otherSetIds: ["blue-magick"],
        name: "Self-Destruct",
        description: [
            "KOs self to deal massive damage.",
			"Learned from Bomb.",
        ],
        blueMagic: true
    },
    "flame-attack": {
        id: "flame-attack",
        setId: "volatility",
        name: "Flame Attack",
        description: [
            "Deals Fire damage to one enemy.",
        ],
    },
    spark: {
        id: "spark",
        setId: "volatility",
        name: "Spark",
        description: [
            "Restores own HP and damages surrounding foes.",
        ],
    },
        "choco-cure": {
        id: "choco-cure",
        setId: "chocobo-wiles",
        otherSetIds: ["chococraft"],
        name: "Choco Cure",
        description: [
            "Restores HP.",
        ],
    },
        "choco-esuna": {
        id: "choco-esuna",
        setId: "chocobo-wiles",
        otherSetIds: ["chococraft"],
        name: "Choco Esuna",
        description: [
            "Removes debuffs.",
        ],
    },
        "choco-flame": {
        id: "choco-flame",
        setId: "chocobo-wiles",
        otherSetIds: ["chococraft"],
        name: "Choco Flame",
        description: [
            "Deals Fire damage to one enemy, ignoring Defense rating.",
        ],
    },
        "choco-meteor": {
        id: "choco-meteor",
        setId: "chocobo-wiles",
        otherSetIds: ["chococraft"],
        name: "Choco Meteor",
        description: [
            "Deals heavy area damage.",
        ],
    },
        "choco-beak": {
        id: "choco-beak",
        setId: "chocobo-wiles",
        otherSetIds: ["chococraft"],
        name: "Choco Beak",
        description: [
            "Deals damage to one foe.",
        ],
    },
        "choco-recharge": {
        id: "choco-recharge",
        setId: "chocobo-wiles",
        otherSetIds: ["chococraft"],
        name: "Choco Recharge",
        description: [
            "Restores MP.",
        ],
    },
        "choco-guard": {
        id: "choco-guard",
        setId: "chocobo-wiles",
        otherSetIds: ["chococraft"],
        name: "Choco Guard",
        description: [
            "Bestows Regen and increases Defense and Magick Resistance.",
        ],
    },
        "choco-barrier": {
        id: "choco-barrier",
        setId: "chocobo-wiles",
        otherSetIds: ["chococraft"],
        name: "Choco Barrier",
        description: [
            "Bestows Protect and Shell.",
        ],
    },
    "stone-breath": {
        id: "stone-breath",
        setId: "territorialism",
        name: "Stone Breath",
        description: [
            "Inflicts Stone debuff to target.",
        ],
    },
    fluster: {
        id: "fluster",
        setId: "territorialism",
        name: "Fluster",
        description: [
            "Inflicts Berserk.",
        ],
    },
    scurry: {
        id: "scurry",
        setId: "territorialism",
        name: "Scurry",
        description: [
            "Inflicts Haste.",
        ],
    },
    peck: {
        id: "peck",
        setId: "territorialism",
        name: "Peck",
        description: [
            "Run target through with a ferocious strike of the beak.",
        ],
    },
    scatter: {
        id: "scatter",
        setId: "territorialism",
        name: "Scatter",
        description: [
            "Deals damage to surrounding units and raises user's Evasion.",
        ],
    },
    "wake-up-call": {
        id: "wake-up-call",
        setId: "territorialism",
        name: "Wake-up Call",
        description: [
            "Bestows Quicken upon target.",
        ],
    },
    fortify: {
        id: "fortify",
        setId: "territorialism",
        name: "Fortify",
        description: [
            "Raises Attack power.",
        ],
    },
    devour: {
        id: "devour",
        setId: "territorialism",
        name: "Devour",
        description: [
            "Deals damage in a large area in front of user.",
        ],
    },
    "territorial-marking": {
        id: "territorial-marking",
        setId: "territorialism",
        name: "Territorial Marking",
        description: [
            "Leap into the air and land with a heavy thud. Damages units caught underneath.",
        ],
    },
    "piston-drop": {
        id: "piston-drop",
        setId: "territorialism",
        name: "Piston Drop",
        description: [
            "Bounces around field, damage all foes.",
        ],
    },
    doom: {
        id: "doom",
        setId: "nightmare",
        otherSetIds: ["blue-magick"],
        name: "Doom",
        description: [
            "Inflicts Doom.",
			"Learned from Deathscythe.",
        ],
        blueMagic: true
    },
    "steal-thoughts": {
        id: "steal-thoughts",
        setId: "nightmare",
        name: "Steal Thoughts",
        description: [
            "Inflicts Addle.",
        ],
    },
    "deep-sleep": {
        id: "deep-sleep",
        setId: "nightmare",
        name: "Deep Sleep",
        description: [
            "Inflicts Sleep and Stop.",
        ],
    },
    shackle: {
        id: "shackle",
        setId: "nightmare",
        name: "Shackle",
        description: [
            "Inflicts Immobilize and Disable.",
        ],
    },
    dark: {
        id: "dark",
        setId: "dark-magick",
        name: "Dark",
        description: [
            "Deals light Dark damage in an area.",
        ],
    },
    darkra: {
        id: "darka",
        setId: "dark-magick",
        name: "Dakra",
        description: [
            "Deals moderate Dark damage in an area.",
        ],
    },
    darkga: {
        id: "darkga",
        setId: "dark-magick",
        name: "Darkga",
        description: [
            "Deals heavy Dark damage in an area.",
        ],
    },
    invert: {
        id: "invert",
        setId: "dark-magick",
        name: "Invert",
        description: [
            "Switches one target's HP and MP.",
        ],
    },
    telega: {
        id: "telega",
        setId: "elimination",
        name: "Telega",
        description: [
            "Teleports random enemy target in front of user and inflicts Immobilie with 100% Accuracy.",
        ],
    },
    repel: {
        id: "repel",
        setId: "elimination",
        name: "Repel",
        description: [
            "User moves forward one panel and kncoks back unit in front of them. Units pushed into the abyss are KO'd.",
        ],
    },
    "shining-darkness": {
        id: "shining-darkness",
        setId: "elimination",
        name: "Shining Darkness",
        description: [
            "Inflicts Petrify, Immobilize, or Sleep.",
        ],
    },
    gravija: {
        id: "gravija",
        setId: "elimination",
        name: "Gravija",
        description: [
            "Reduces target's HP to 1.",
        ],
    },
    fireball: {
        id: "fireball",
        setId: "breath",
        name: "Fireball",
        description: [
            "Deals Fire damage to one target.",
        ],
    },
    "fire-breath": {
        id: "fire-breath",
        setId: "breath",
        otherSetIds: ["dragon-soul"],
        name: "Fire Breath",
        description: [
            "Breathe flame in a cone in front of the user. Deals Fire damage in an area.",
        ],
    },
    "ice-orb": {
        id: "ice-orb",
        setId: "breath",
        name: "Ice Orb",
        description: [
            "Deals Ice damage to one target.",
        ],
    },
    "ice-breath": {
        id: "ice-breath",
        setId: "breath",
        otherSetIds: ["dragon-soul"],
        name: "Ice Breath",
        description: [
            "Breathe frost in a cone in front of the user. Deals Ice damage in an area.",
        ],
    },
    lightning: {
        id: "lightning",
        setId: "breath",
        name: "Lightning",
        description: [
            "Deals Lightning damage to one target.",
        ],
    },
    "thunder-breath": {
        id: "thunder-breath",
        setId: "breath",
        otherSetIds: ["dragon-soul"],
        name: "Thunder Breath",
        description: [
            "Breathe electricity in a cone in front of the user. Deals Lightning damage in one area.",
        ],
    },
    "expose-weakness": {
        id: "expose-weakness",
        setId: "wyrmcraft",
        otherSetIds: ["blue-magick"],
        name: "Expose Weakness",
        description: [
            "Lowers target's Defense and Magick Resistance.",
			"Learned from Fire Drake.",
        ],
        blueMagic: true
    },
    "mighty-guard": {
        id: "mighty-guard",
        setId: "wyrmcraft",
        otherSetIds: ["blue-magick"],
        name: "Mighty Guard",
        description: [
            "Raises target's Defense and Magick Resistance.",
			"Learned from Thunder Drake.",
        ],
        blueMagic: true
    },
    "dragon-force": {
        id: "dragon-force",
        setId: "wyrmcraft",
        otherSetIds: ["blue-magick"],
        name: "Dragon Force",
        description: [
            "Raises target's Attack and Magick Attack.",
			"Learned from Ice Drake.",
        ],
        blueMagic: true
    },
    mesmerize: {
        id: "mesmerize",
        setId: "wyrmcraft",
        name: "Mesmerize",
        description: [
            "Inflicts Charm and lowers Speed.",
        ],
    },
    sleet: {
        id: "sleet",
        setId: "wyrmcraft",
        name: "Sleet",
        description: [
            "Inflicts Sleep and Doom.",
        ],
    },
    shockbolt: {
        id: "shockbolt",
        setId: "wyrmcraft",
        name: "Shockbolt",
        description: [
            "Inflicts Confuse and Addle.",
        ],
    },
    "war-dance": {
        id: "war-dance",
        setId: "enticement",
        otherSetIds: ["blue-magick"],
        name: "War Dance",
        description: [
            "A dance that boosts the morale of units in a small area. Raises ATTACK.",
			"Learned from Dreamhare.",
        ],
        blueMagic: true
    },
    illude: {
        id: "illude",
        setId: "enticement",
        name: "Illude",
        description: [
            "Weave an illusion with a flick of the tail. CHARMS the target.",
        ],
    },
    "go-go-dance": {
        id: "go-go-dance",
        setId: "enticement",
        name: "Go-Go Dance",
        description: [
            "Dance a lively jig to HASTEN the pulse of targets in a small area.",
        ],
    },
    "hip-attack": {
        id: "hip-attack",
        setId: "enticement",
        name: "Hip Attack",
        description: [
            "Leap high into the air and pounce on the target bottom first.",
        ],
    },
    unction: {
        id: "unction",
        setId: "metamorphosis",
        otherSetIds: ["blue-magick"],
        name: "Unction",
        description: [
            "Inflicts Oil debuff.",
			"Learned from Red Marshmallow (Flan).",
        ],
        blueMagic: true
    },
    merge: {
        id: "merge",
        setId: "metamorphosis",
        name: "Merge",
        description: [
            "KOs self to fully restore target's HP.",
        ],
    },
    acid: {
        id: "acid",
        setId: "metamorphosis",
        name: "Acid",
        description: [
            "Inflicts Slow, Petrify, Disable, Immobilize, or Stop.",
        ],
    },
    simper: {
        id: "simper",
        setId: "metamorphosis",
        name: "Simper",
        description: [
            "Inflicts Charm.",
        ],
    },
    menace: {
        id: "menace",
        setId: "metamorphosis",
        name: "Menace",
        description: [
            "Inflicts Toad and Silence.",
        ],
    },
    vampire: {
        id: "vampire",
        setId: "parasite",
        name: "Vampire",
        description: [
            "Drains HP from target.",
        ],
    },
    "supersonic-wave": {
        id: "supersonic-wave",
        setId: "parasite",
        name: "Supersonic Wave",
        description: [
            "Damages and inflicts Silence.",
        ],
    },
    "death-dive": {
        id: "death-dive",
        setId: "parasite",
        name: "Death Dive",
        description: [
            "KOs user and deals damage equal to HP lost.",
        ],
    },
    gnaw: {
        id: "gnaw",
        setId: "parasite",
        name: "Gnaw",
        description: [
            "Damages and inflicts Poison.",
        ],
    },
    flash: {
        id: "flash",
        setId: "ghostly-touch",
        name: "Flash",
        description: [
            "Inflicts Blind.",
        ],
    },
    "sleep-touch": {
        id: "sleep-touch",
        setId: "ghostly-touch",
        name: "Sleep Touch",
        description: [
            "Deals Dark damage and inflicts Sleep.",
        ],
    },
    "silence-touch": {
        id: "silence-touch",
        setId: "ghostly-touch",
        name: "Silence Touch",
        description: [
            "Deals Dark damage and inflicts Silence.",
        ],
    },
    "wake-the-dead": {
        id: "wake-the-dead",
        setId: "ghostly-touch",
        name: "Wake the Dead",
        description: [
            "Summons an undead monster into play.",
        ],
    },
    quake: {
        id: "quake",
        setId: "brute-force",
        otherSetIds: ["blue-magick"],
        name: "Quake",
        description: [
            "Deals Earth damage in an area.",
			"Learned from Headlesskind.",
        ],
        blueMagic: true
    },
    "bone-shatter": {
        id: "bone-shatter",
        setId: "brute-force",
        name: "Bone Shatter",
        description: [
            "Damages and reduces target's ATP to 0, delaying next turn.",
        ],
    },
    "brute-strength": {
        id: "brute-strength",
        setId: "brute-force",
        name: "Brute Strength",
        description: [
            "Raises Attack power.",
        ],
    },
    "sunder-earth": {
        id: "sunder-earth",
        setId: "brute-force",
        name: "Sunder Earth",
        description: [
            "Deals Earth damage.",
        ],
    },
    helmsplitter: {
        id: "helmsplitter",
        setId: "brute-force",
        name: "Helmsplitter",
        description: [
            "Damages and destroys target's equipped helm. Accuracy is 1/4 of Attack rate.",
        ],
    },
    night: {
        id: "night",
        setId: "darkness",
        otherSetIds: ["blue-magick"],
        name: "Night",
        description: [
            "Puts all units to sleep.",
			"Learned from Lamiakind.",
        ],
        blueMagic: true
    },
    "poison-frog": {
        id: "poison-frog",
        setId: "darkness",
        name: "Poison Frog",
        description: [
            "Inflicts Poison and Toad.",
        ],
    },
    kiss: {
        id: "kiss",
        setId: "darkness",
        name: "Kiss",
        description: [
            "Inflicts Doom and Charm.",
        ],
    },
    "hand-slap": {
        id: "hand-slap",
        setId: "darkness",
        name: "Hand Slap",
        description: [
            "Damages and reduces target's ATP to 0, delaying turn.",
        ],
    },
    twister: {
        id: "twister",
        setId: "darkness",
        name: "Twister",
        description: [
            "Halves current HP of targets in an area. Hit rate is half of Attack.",
        ],
    },
    "eternal-sleep": {
        id: "eternal-sleep",
        setId: "darkness",
        name: "Eternal Sleep",
        description: [
            "Inflicts Doom on all units on the field, and puts all units except for user to Sleep.",
        ],
    },
    "eternal-oblivion": {
        id: "eternal-oblivion",
        setId: "darkness",
        name: "Eternal Oblivion",
        description: [
            "Damages and inflicts Addle.",
        ],
    },
    pester: {
        id: "pester",
        setId: "???",
        name: "Pester",
        description: [
            "Asks for an Elixir.",
        ],
    },
    punish: {
        id: "punish",
        setId: "???",
        name: "Punish",
        description: [
            "Deals 999 damage to target. 100% Accuracy.",
        ],
    },
    reward: {
        id: "reward",
        setId: "???",
        name: "Reward",
        description: [
            "KOs self.",
        ],
    },
    "bad-breath": {
        id: "bad-breath",
        setId: "halitosis",
        otherSetIds: ["blue-magick"],
        name: "Bad Breath",
        description: [
            "Inflicts Blind, Poison, and Silence.",
			"Learned from Malborokind.",
        ],
        blueMagic: true
    },
    "eerie-sound-wave": {
        id: "eerie-sound-wave",
        setId: "halitosis",
        otherSetIds: ["blue-magick"],
        name: "Eerie Sound Wave",
        description: [
            "Dispels buffs on one unit.",
			"Learned from Malborokind.",
        ],
        blueMagic: true
    },
    goo: {
        id: "goo",
        setId: "halitosis",
        name: "Goo",
        description: [
            "Inflicts Immobilize and lowers Speed of one target.",
        ],
    },
    "malboro-song": {
        id: "malboro-song",
        setId: "halitosis",
        name: "Malboro Song",
        description: [
            "Bestows Regen and raises Attack in an area.",
        ],
    },
    "putrid-breath": {
        id: "putrid-breath",
        setId: "halitosis",
        name: "Putrid Breath",
        description: [
            "Inflicts Toad, Doom, and Confuse.",
        ],
    },
    purify: {
        id: "purify",
        setId: "halitosis",
        name: "Purify",
        description: [
            "Removes all debuffs.",
        ],
    },
    "honeyed-breath": {
        id: "honeyed-breath",
        setId: "halitosis",
        name: "Honeyed Breath",
        description: [
            "Inflicts Charm.",
        ],
    },
    "love-song": {
        id: "love-song",
        setId: "halitosis",
        name: "Love Song",
        description: [
            "Restores HP, grants Regen, and increases Defense in an area.",
        ],
    },
    "cloying-breath": {
        id: "cloying-breath",
        setId: "halitosis",
        name: "Cloying Breath",
        description: [
            "Inflicts Sleep and Slow.",
        ],
    },
    rock: {
        id: "rock",
        setId: "paper-rock-scissors",
        name: "Rock",
        description: [
            "Restores user's HP.",
        ],
    },
    scissors: {
        id: "scissors",
        setId: "paper-rock-scissors",
        name: "Scissors",
        description: [
            "Damages units in an area (Lightning-elemental).",
        ],
    },
    "grand-cross": {
        id: "grand-cross",
        setId: "abyss",
        name: "Grand Cross",
        description: [
            "Physical attack.",
        ],
    },
    consumption: {
        id: "consumption",
        setId: "abyss",
        name: "Consumption",
        description: [
            "Damages units in a large area.",
        ],
    },
    "white-hole": {
        id: "white-hole",
        setId: "abyss",
        name: "White Hole",
        description: [
            "Damages units in its path.",
        ],
    },
    syphonja: {
        id: "syphonja",
        setId: "abyss",
        name: "Syphonja",
        description: [
            "Reduces MP to 0 in a large area.",
        ],
    },
    dispelja: {
        id: "dispelja",
        setId: "abyss",
        name: "Dispelja",
        description: [
            "Removes buffs from all opponents.",
        ],
    },
    apocalypse: {
        id: "apocalypse",
        setId: "abyss",
        name: "Apocalypse",
        description: [
            "Inflicts Confuse on units in an area.",
        ],
    },
    gigadust: {
        id: "gigadust",
        setId: "abyss",
        name: "Gigadust",
        description: [
            "Deals magical damage to all enemeis.",
        ],
    },
    catastrophe: {
        id: "catastrophe",
        setId: "abyss",
        name: "Catastrophe",
        description: [
            "Lowers Defense and Resistance of untis in an area with 100% accuracy.",
        ],
    },
    "punishing-ray": {
        id: "punishing-ray",
        setId: "abyss",
        name: "Punishing Ray",
        description: [
            "Damages one unit.",
        ],
    },
    "restoration-ray": {
        id: "restoration-ray",
        setId: "abyss",
        name: "Restoration Ray",
        description: [
            "Restores Neukhia Wisp's HP.",
        ],
    },
    "charge-ray": {
        id: "charge-ray",
        setId: "abyss",
        name: "Charge Ray",
        description: [
            "Bestows Neukhia Charge on Neukhia Wisp.",
        ],
    },
    sanctify: {
        id: "sanctify",
        setId: "abyss",
        name: "Sanctify",
        description: [
            "Damages all enemies; uses up Neukhia Charge.",
        ],
    },
    rewind: {
        id: "rewind",
        setId: "abyss",
        name: "Rewind",
        description: [
            "Makes three stones shine with golden light.",
        ],
    },
    seed: {
        id: "seed",
        setId: "ambrosia",
        name: "Seed",
        description: [
            "Release a seed that quickly grows into a new ally.",
        ],
    },
    "nectar-volley": {
        id: "nectar-volley",
        setId: "ambrosia",
        name: "Nectar Volley",
        description: [
            "Lob a mass of congealed nectar into the air. POISONS and SILENCES units in a small area.",
        ],
    },
    "vine-lash": {
        id: "vine-lash",
        setId: "ambrosia",
        name: "Vine Lash",
        description: [
            "Lash out at surrounding units. Damages, SLOWS, and delays their next turn.",
        ],
    },
    "blinding-cloud": {
        id: "blinding-cloud",
        setId: "ambrosia",
        name: "Blinding Cloud",
        description: [
            "Release an aromatic cloud that stings the eyes. BLINDS surrounding units.",
        ],
    },
    "soporific-cloud": {
        id: "soporific-cloud",
        setId: "ambrosia",
        name: "Soporific Cloud",
        description: [
            "Release a tranquilizing cloud of pollen. Puts surrounding units to SLEEP.",
        ],
    },
    "bewildering-cloud": {
        id: "bewildering-cloud",
        setId: "ambrosia",
        name: "Bewildering Cloud",
        description: [
            "Release a heavy-scented cloud of mischief. CONFUSES surrounding units.",
        ],
    },
    "limit-glove": {
        id: "limit-glove",
        setId: "shell-crush",
        name: "Limit Glove",
        description: [
            "Deals 999 damage to one target with 100% Accuracy if user's HP is in single digits.",
            "AKA Cornered.",
			"Learned from Great Tortoise."
        ],
        blueMagic: true
    },
    "matra-magic": {
        id: "matra-magic",
        setId: "shell-crush",
        otherSetIds: ["blue-magick"],
        name: "Matra Magic",
        description: [
            "Switches one target's HP and MP.",
			"Learned from Adamantitan.",
        ],
        blueMagic: true
    },
    headbutt: {
        id: "headbutt",
        setId: "shell-crush",
        name: "Headbutt",
        description: [
            "Damages one target and inflicts Immobilize.",
        ],
    },
    "sonic-spin": {
        id: "sonic-spin",
        setId: "shell-crush",
        name: "Sonic Spin",
        description: [
            "Damages surrounding units.",
        ],
    },
    "rain-of-stone": {
        id: "rain-of-stone",
        setId: "shell-crush",
        name: "Rain of Stone",
        description: [
            "Deals Earth damage to units in an area.",
        ],
    },
    munch: {
        id: "munch",
        setId: "shell-crush",
        name: "Munch",
        description: [
            "Destroys target's weapon, shield, or body armor. Hit Rate varies on targeted equipment.",
        ],
    },
    resonate: {
        id: "resonate",
        setId: "shell-crush",
        name: "Resonate",
        description: [
            "Inflicts Disable on all units equipped with a Knife, Sword, Blade, Saber, Knightsword, Greatsword, Broadsword, Katana, or Axe.",
        ],
    },
    "white-wind": {
        id: "white-wind",
        setId: "mischief",
        otherSetIds: ["blue-magick"],
        name: "White Wind",
        description: [
            "Restores HP equal to the caster's current HP in an area.",
			"Learned from Sprite.",
        ],
        blueMagic: true
    },
    "angel-whisper": {
        id: "angel-whisper",
        setId: "mischief",
        otherSetIds: ["blue-magick"],
        name: "Angel Whisper",
        description: [
            "Heals one target's HP and bestows Reraise. Holy-elemental.",
			"Learned from Sprite.",
        ],
        blueMagic: true
    },
    meteorite: {
        id: "meteorite",
        setId: "mischief",
        name: "Meteorite",
        description: [
            "Call down a small, fiery meteorite. Damages a single target.",
        ],
    },
    "lv-?-holy": {
        id: "lv-?-holy",
        setId: "mischief",
        name: "Lv. ? Holy",
        description: [
            "Deals Holy damage to all units with the same first digit in their level as the caster. Accuracy is half of normal hit rate.",
        ],
    },
    "petrifying-rattle": {
        id: "petrifying-rattle",
        setId: "mischief",
        name: "Petrifying Rattle",
        description: [
            "Inflicts Petrify on targets in cone in front of user.",
        ],
    },
    "horn-blow": {
        id: "horn-blow",
        setId: "impale",
        name: "Horn Blow",
        description: [
            "Damages and knocks back.",
        ],
    },
    "horn-venom": {
        id: "horn-venom",
        setId: "impale",
        name: "Horn Venom",
        description: [
            "Damages and inflicts Poison.",
        ],
    },
    "horn-shot": {
        id: "horn-shot",
        setId: "impale",
        name: "Horn Shot",
        description: [
            "Deals 3/4 of normal damage, increases hit rate by 20%.",
        ],
    },
    "tomato-fang": {
        id: "tomato-fang",
        setId: "deadly-nightshade",
        name: "Tomato Fang",
        description: [
            "Damages and knocks back.",
        ],
    },
    "tomato-tackle": {
        id: "tomato-tackle",
        setId: "deadly-nightshade",
        name: "Tomato Tackle",
        description: [
            "Damages and lowers Speed.",
        ],
    },
    "tomato-ketchup": {
        id: "tomato-ketchup",
        setId: "deadly-nightshade",
        name: "Tomato Ketchup",
        description: [
            "Inflicts Berserk.",
        ],
    },
    knife: {
        id: "knife",
        setId: "revenge",
        name: "Knife",
        description: [
            "Reduces HP by 90%. Hit rate of 100%.",
        ],
    },
    karma: {
        id: "karma",
        setId: "revenge",
        name: "Karma",
        description: [
            "Damages depending on number of monsters slain by target. Hit rate 100%. Damage is equal to the number of kills multiplied by ten, so as soon as the target has 100 kills, they are automatically KO'd, even if they are immune to Instant Death.",
        ],
    },
    "butchers-knife": {
        id: "butchers-knife",
        setId: "revenge",
        name: "Butcher's Knife",
        description: [
            "Reduces target's HP to 1. Hit rate 100%.",
        ],
    },
    voodoo: {
        id: "voodoo",
        setId: "revenge",
        name: "Voodoo",
        description: [
            "Deals 999 damage.",
        ],
    },
    stalk: {
        id: "stalk",
        setId: "revenge",
        name: "Stalk",
        description: [
            "Targets unit. Tonberry will not act until it is adjacent to target, at which point it will KO target with 100% accuracy.",
        ],
    },
    "primary-weapon": {
        id: "primary-weapon",
        setId: "defense",
        name: "Primary Weapon",
        description: [
            "Does damage equal to 1/2 of target's current HP.",
        ],
    },
    "secondary-weapon": {
        id: "secondary-weapon",
        setId: "defense",
        name: "Secondary Weapon",
        description: [
            "Deals heavy damage.",
        ],
    },
    beguile: {
        id: "beguile",
        setId: "defense",
        name: "Beguile",
        description: [
            "Inflicts Charm and Doom.",
        ],
    },
    roar: {
        id: "roar",
        setId: "call-of-the-wild",
        otherSetIds: ["blue-magick"],
        name: "Roar",
        description: [
            "Dispels buffs from all other units on the field.",
			"Learned from Werewolfkind.",
        ],
        blueMagic: true
    },
    howl: {
        id: "howl",
        setId: "call-of-the-wild",
        name: "Howl",
        description: [
            "Deals MP damage and inflicts Confuse.",
        ],
    },
    slug: {
        id: "slug",
        setId: "call-of-the-wild",
        name: "Slug",
        description: [
            "Damages and ignores opponent's Defense rating.",
        ],
    },
    assault: {
        id: "assault",
        setId: "call-of-the-wild",
        name: "Assault",
        description: [
            "Damages and inflicts Immobilize.",
        ],
    },
    "en-garde": {
        id: "en-garde",
        setId: "call-of-the-wild",
        otherSetIds: ["feralism"],
        name: "En Garde",
        description: [
            "Enters a defensive state and counters all attacks in range.",
            "Assume a defensive stance. Unit will COUNTER attacks until the next turn.",
        ],
    },
    screech: {
        id: "screech",
        setId: "maw",
        otherSetIds: ["blue-magick"],
        name: "Screech",
        description: [
            "Damages one unit and inflicts Confuse.",
			"Learned from Wolfkind.",
        ],
        blueMagic: true
    },
    "summon-pack": {
        id: "summon-pack",
        setId: "maw",
        name: "Summon Pack",
        description: [
            "Call nearby allies with an echoing howl.",
        ],
    },
    fangs: {
        id: "fangs",
        setId: "maw",
        name: "Fangs",
        description: [
            "Attack target with razor sharp fangs.",
        ],
    },
    "chilling-blow": {
        id: "chilling-blow",
        setId: "maw",
        name: "Chilling Blow",
        description: [
            "Send a wave of chilling frost crashing through foes. Deals ice damage and IMMOBILIZES target.",
        ],
    },
    "fiery-blow": {
        id: "fiery-blow",
        setId: "maw",
        name: "Fiery Blow",
        description: [
            "SEnd a wave of searing flames burning through foes. Deals fire damage and SILENCES target.",
        ],
    },
    "shadowy-blow": {
        id: "shadowy-blow",
        setId: "maw",
        name: "Shadowy Blow",
        description: [
            "Deals Dark damage to units in a line and inflicts Blind.",
        ],
    },
    "draw-in": {
        id: "draw-in",
        setId: "ambush",
        name: "Draw In",
        description: [
            "Drains HP from one unit and draws it to an adjacent tile to the user. 100% Accuracy.",
        ],
    },
    "stun-crush": {
        id: "stun-crush",
        setId: "ambush",
        name: "Stun Crush",
        description: [
            "Damages surrounding units and inflicts Immobilize.",
        ],
    },
    "gravity-flux": {
        id: "gravity-flux",
        setId: "ambush",
        name: "Gravity Flux",
        description: [
            "Damages all foes.",
        ],
    },
    miasma: {
        id: "miasma",
        setId: "deaths-grasp",
        name: "Miasma",
        description: [
            "Damages units in an area and inflicts Poison.",
        ],
    },
    "drain-touch": {
        id: "drain-touch",
        setId: "deaths-grasp",
        name: "Drain Touch",
        description: [
            "Drains HP from one target.",
        ],
    },
    "first-aid": {
        id: "first-aid",
        setId: "arts-of-war",
        name: "First Aid",
        description: [
            "Treat the user's wounds, restoring HP.",
        ],
    },
    "rend-power": {
        id: "rend-power",
        setId: "arts-of-war",
        name: "Rend Power",
        description: [
            "Lower the target's ATTACK, reducing physical damage dealt.",
        ],
    },
    "rend-magick": {
        id: "rend-magick",
        setId: "arts-of-war",
        name: "Rend Magick",
        description: [
            "Lower the target's MAGICK, reducing spell potency.",
        ],
    },
    "rend-mp": {
        id: "rend-mp",
        setId: "arts-of-war",
        name: "Rend MP",
        description: [
            "Deplete the target's MP.",
        ],
    },
    "rend-speed": {
        id: "rend-speed",
        setId: "arts-of-war",
        name: "Rend Speed",
        description: [
            "Lower the target's SPEED.",
        ],
    },
    "mug-gil": {
        id: "mug-gil",
        setId: "arts-of-war",
        name: "Mug Gil",
        description: [
            "Deal damage and steal gil from the target.",
        ],
    },
    provoke: {
        id: "provoke",
        setId: "arts-of-war",
        name: "Provoke",
        description: [
            "Cause the target to go BERSERK.",
        ],
    },
    gauge: {
        id: "gauge",
        setId: "arts-of-war",
        name: "Gauge",
        description: [
            "Reveal the target's Lv. 1 Loot and Items.",
        ],
    },
    shieldbearer: {
        id: "shieldbearer",
        setId: "passive",
        name: "Shieldbearer",
        description: [
            "Enables the user to equip shields, regardless of their current job.",
        ],
    },
    "monkey-grip": {
        id: "monkey-grip",
        setId: "passive",
        name: "Monkey Grip",
        description: [
            "Wield two-handed weapon with one hand.",
        ],
    },
    cure: {
        id: "cure",
        setId: "white-magick",
        otherSetIds: ["red-magick"],
        name: "Cure",
        description: [
            "Magickally bind the target's wounds. Restores HP and deals damage to undead.",
        ],
    },
    cura: {
        id: "cura",
        setId: "white-magick",
        otherSetIds: ["high-magick", "intercession"],
        name: "Cura",
        description: [
            "Magickally restore a large amount of HP. Deals damage to undead.",
        ],
    },
    curaga: {
        id: "curaga",
        setId: "white-magick",
        name: "Curaga",
        description: [
            "Magickally restore a great amount of HP. Deals damage to undead.",
        ],
    },
    esuna: {
        id: "esuna",
        setId: "white-magick",
        otherSetIds: ["high-magick"],
        name: "Esuna",
        description: [
            "Magickally purge the target of debuffs.",
        ],
    },
    raise: {
        id: "raise",
        setId: "white-magick",
        otherSetIds: ["high-magick"],
        name: "Raise",
        description: [
            "Magickally revive the target, removing KO. Deals damage to undead.",
        ],
    },
    arise: {
        id: "arise",
        setId: "white-magick",
        name: "Arise",
        description: [
            "Magickally revive the target. Removes KO and restores full HP. Deals damage to undead.",
        ],
    },
    reraise: {
        id: "reraise",
        setId: "white-magick",
        name: "Reraise",
        description: [
            "Grant RERAISE buff to the target. Automatically casts Raise on them if they are KO'd.",
        ],
    },
    refresh: {
        id: "refresh",
        setId: "white-magick",
        name: "Refresh",
        description: [
            "Magickally cleanse the target of debuffs unaffected by Esuna.",
        ],
    },
    "turbo-mp": {
        id: "turbo-mp",
        setId: "passive",
        name: "Turbo MP",
        description: [
            "Spells cost twice their usual MP, but are much more potent.",
        ],
    },
    focus: {
        id: "focus",
        setId: "precision",
        name: "Focus",
        description: [
            "Muster the user's strength, increasing next action's ATTACK.",
        ],
    },
    "leg-shot": {
        id: "leg-shot",
        setId: "precision",
        name: "Leg Shot",
        description: [
            "Take aim at the target's legs to IMMOBILIZE it.",
        ],
    },
    "arm-shot": {
        id: "arm-shot",
        setId: "precision",
        name: "Arm Shot",
        description: [
            "Take aim at the target's arms to DISABLE it.",
        ],
    },
    cupid: {
        id: "cupid",
        setId: "precision",
        name: "Cupid",
        description: [
            "Pierce the target's heart with a magicked arrow. CHARMS the target.",
        ],
    },
    burial: {
        id: "burial",
        setId: "precision",
        name: "Burial",
        description: [
            "Bring peace to the Undead.",
        ],
    },
    "take-aim": {
        id: "take-aim",
        setId: "precision",
        name: "Take Aim",
        description: [
            "Take careful aim at the target, increasing chance to hit, but dealing less damage.",
        ],
    },
    "lightning-strike": {
        id: "lightning-strike",
        setId: "precision",
        name: "Lightning Strike",
        description: [
            "A blindingly fast attack that does not trigger reaction abilities.",
        ],
    },
    blackout: {
        id: "blackout",
        setId: "precision",
        name: "Blackout",
        description: [
            "Loose specially prepared arrows to Blind the target.",
        ],
    },
    "archers-bane": {
        id: "archers-bane",
        setId: "reaction",
        name: "Archer's Bane",
        description: [
            "Avoid all bow-based basic attacks.",
        ],
    },
    concentration: {
        id: "concentration",
        setId: "passive",
        name: "Concentration",
        description: [
            "Focuses the user's thoughts. Increases chance to hit.",
        ],
    },
    fire: {
        id: "fire",
        setId: "black-magick",
        otherSetIds: ["red-magick"],
        name: "Fire",
        description: [
            "Hurl a ball of magick fire, deal fire damage to the target.",
        ],
    },
    fira: {
        id: "fira",
        setId: "black-magick",
        otherSetIds: ["high-magick"],
        name: "Fira",
        description: [
            "An improved version of Fire. Deals even greater fire damage to its targets.",
        ],
    },
    firaga: {
        id: "firaga",
        setId: "black-magick",
        name: "Firaga",
        description: [
            "The greatest Fire magick. Consumes its target in hellfire, dealing massive fire damage.",
        ],
    },
    thunder: {
        id: "thunder",
        setId: "black-magick",
        otherSetIds: ["red-magick", "brutality"],
        name: "Thunder",
        description: [
            "Call down a bolt of lightning, deal lightning damage to the target.",
        ],
    },
    thundara: {
        id: "thundara",
        setId: "black-magick",
        otherSetIds: ["high-magick", "brutality"],
        name: "Thundara",
        description: [
            "An improved version of Thunder. Deals even greater lightning damage to its targets.",
        ],
    },
    thundaga: {
        id: "thundaga",
        setId: "black-magick",
        otherSetIds: ["brutality"],
        name: "Thundaga",
        description: [
            "The greatest Thunder magick. Blasts its target with countless bolts, dealing massive lightning damage.",
        ],
    },
    blizzard: {
        id: "blizzard",
        setId: "black-magick",
        otherSetIds: ["red-magick"],
        name: "Blizzard",
        description: [
            "Pierce target with a shard of ice, deal ice damage to the target.",
        ],
    },
    blizzara: {
        id: "blizzara",
        setId: "black-magick",
        otherSetIds: ["high-magick"],
        name: "Blizzara",
        description: [
            "An improved version of Blizzard. Deals even greater ice damage to its targets.",
        ],
    },
    blizzaga: {
        id: "blizzaga",
        setId: "black-magick",
        name: "Blizzaga",
        description: [
            "The greatest Blizzard magick. Impales target, dealing massive ice damage.",
        ],
    },
    "magick-counter": {
        id: "magick-counter",
        setId: "reaction",
        name: "Magick Counter",
        description: [
            "Cast magicks target the user back at the caster. Magicks cast in this way require MP.",
        ],
    },
    geomancy: {
        id: "geomancy",
        setId: "passive",
        name: "Geomancy",
        description: [
            "Lowers resistance to the user's elemental attacks.",
            "(Absorb > Immune > Half > Normal > Weak)",
        ],
    },
    cornered: {
        id: "cornered",
        setId: "blue-magick",
        name: "Cornered",
        description: [
            "Deals 999 damage to one target with 100% Accuracy if user's HP is in single digits.",
            "AKA Limit Glove.",
			"Learned from Great Tortoise."
        ],
        blueMagic: true
    },
    "mp-shield": {
        id: "mp-shield",
        setId: "reaction",
        name: "MP Shield",
        description: [
            "Damage taken depletes MP rather than HP. Has no effect when the user has no MP.",
        ],
    },
    learn: {
        id: "learn",
        setId: "passive",
        name: "Learn",
        description: [
            "Learn the blue magick equivalent of any special monster abilities that target the user.",
        ],
    },
    immunity: {
        id: "immunity",
        setId: "passive",
        name: "immunity",
        description: [
            "Neither buffs nor debuffs can be removed from the user.",
        ],
    },
    rush: {
        id: "rush",
        setId: "pugilism",
        otherSetIds: ["sparring"],
        name: "Rush",
        description: [
            "Attack with staggering force, knocking the target back.",
        ],
    },
    "wild-swing": {
        id: "wild-swing",
        setId: "pugilism",
        otherSetIds: ["sparring"],
        name: "Wild Swing",
        description: [
            "Spin in a tight circle with weapon outheld, damaging surrounding units.",
        ],
    },
    "beat-down": {
        id: "beat-down",
        setId: "pugilism",
        otherSetIds: ["sparring"],
        name: "Beat Down",
        description: [
            "An all-out attack that deals heavy damage, but with a reduced chance to hit.",
        ],
    },
    blitz: {
        id: "blitz",
        setId: "pugilism",
        otherSetIds: ["sparring"],
        name: "Blitz",
        description: [
            "Take the measure of the target before attacking. Increases chance to hit but deals less damage.",
        ],
    },
    "air-render": {
        id: "air-render",
        setId: "pugilism",
        otherSetIds: ["discipline"],
        name: "Air Render",
        description: [
            "Focus the user's ki, sending blades of air tearing through the target.",
        ],
    },
    aurablast: {
        id: "aurablast",
        setId: "pugilism",
        otherSetIds: ["discipline"],
        name: "Aurablast",
        description: [
            "Unleash a detonation of ki, dealing damage to units in a small area.",
        ],
    },
    "air-blast": {
        id: "air-blast",
        setId: "pugilism",
        name: "Air Blast",
        description: [
            "Breathe a rush of air, dealing wind damage to units in a cone in front of the user.",
        ],
    },
    "back-draft": {
        id: "back-draft",
        setId: "pugilism",
        name: "Back Draft",
        description: [
            "Focus the user's ki into a fiery attack, dealing fire damage to the target and the user.",
        ],
    },
    bonecrusher: {
        id: "bonecrusher",
        setId: "reaction",
        name: "Bonecrusher",
        description: [
            "Counter attack after taking physical damage. Always deals greater damage than that taken.",
        ],
    },
    doublehand: {
        id: "doublehand",
        setId: "passive",
        name: "Doublehand",
        description: [
            "Wield one-handed weapons with both hands. Deals additional damage.",
        ],
    },
    "sonic-boom": {
        id: "sonic-boom",
        setId: "trapping",
        name: "Sonic Boom",
        description: [
            "Use the latent power of the user's weapon to send out a shock wave. Damages units in a small area.",
        ],
    },
    oust: {
        id: "oust",
        setId: "trapping",
        name: "Oust",
        description: [
            "Force target monster to flee the battle field.",
        ],
    },
    advice: {
        id: "advice",
        setId: "trapping",
        name: "Advice",
        description: [
            "Share the tricks of the hunting trade with the target. Raises chance to score a CRITICAL HIT.",
        ],
    },
    "vitals-shot": {
        id: "vitals-shot",
        setId: "trapping",
        name: "Vitals Shot",
        description: [
            "Inflicts random status to one foe.",
        ],
    },
    hunting: {
        id: "hunting",
        setId: "trapping",
        name: "Hunting",
        description: [
            "A well-aimed attack meant to fell the hunter's prey. If the attack kills the target, you also obtain loot.",
        ],
    },
    "counter-force": {
        id: "counter-force",
        setId: "trapping",
        name: "Counter Force",
        description: [
            "ADDLE target monster.",
        ],
    },
    "ultima-shot": {
        id: "ultima-shot",
        setId: "trapping",
        name: "Ultima Shot",
        description: [
            "Derived from the most powerful of magicks. This is the ultimate hunter ability.",
        ],
    },
    sidewinder: {
        id: "sidewinder",
        setId: "trapping",
        name: "Sidewinder",
        description: [
            "A powerful attack that strikes with whip-like speed. Deals additional damage to monsters.",
        ],
    },
    regenerate: {
        id: "regenerate",
        setId: "reaction",
        name: "Regenerate",
        description: [
            "Gain REGEN after taking damage.",
        ],
    },
    "attack↑": {
        id: "attack↑",
        setId: "passive",
        name: "Attack↑",
        description: [
            "Raises ATTACK. Increases physical damage dealt.",
        ],
    },
    prominence: {
        id: "prominence",
        setId: "illusion",
        name: "Prominence",
        description: [
            "Harness the fires of the sun in a tremendous explosion. Deals fire damage to all foes.",
        ],
    },
    tempest: {
        id: "tempest",
        setId: "illusion",
        name: "Tempest",
        description: [
            "Unleash a lightning storm mighty enough to rock the heavens. Deals lightning damage to all foes.",
        ],
    },
    freezeblink: {
        id: "freezeblink",
        setId: "illusion",
        name: "Freezeblink",
        description: [
            "Freeze the water in the air into razor-edged shards. Deals ice damage to all foes.",
        ],
    },
    "star-cross": {
        id: "star-cross",
        setId: "illusion",
        name: "Star Cross",
        description: [
            "Bathe the battlefield in a divine light. Deals holy damage to all foes.",
        ],
    },
    stardust: {
        id: "stardust",
        setId: "illusion",
        name: "Stardust",
        description: [
            "Call down a shower of meteors from the sky. Deal damage to all foes.",
        ],
    },
    deluge: {
        id: "deluge",
        setId: "illusion",
        name: "Deluge",
        description: [
            "Send a torrent of water to scour the battlefield. Deals water damage to all foes.",
        ],
    },
    rockfall: {
        id: "rockfall",
        setId: "illusion",
        name: "Rockfall",
        description: [
            "Pummel foes with a barrage of rocks. Deals earth damage to all foes.",
        ],
    },
    "wild-tornado": {
        id: "wild-tornado",
        setId: "illusion",
        name: "Wild Tornado",
        description: [
            "Buffet foes with a mighty tornado. Deals wind damage to all foes.",
        ],
    },
    "absorb-mp": {
        id: "absorb-mp",
        setId: "reaction",
        name: "Absorb MP",
        description: [
            "Gains MP equal to the MP cost of attacks used on the unit.",
        ],
    },
    "halve-mp": {
        id: "halve-mp",
        setId: "passive",
        name: "Halve MP",
        description: [
            "Reduces the MP cost of abilities by 50%.",
        ],
    },
    "throw": {
        id: "throw",
        setId: "ninjutsu",
        name: "Throw",
        description: [
            "Throw a piece of equipment from the party's inventory to deal damage to the target.",
        ],
    },
    "wood-veil": {
        id: "wood-veil",
        setId: "ninjutsu",
        name: "Wood Veil",
        description: [
            "Damage and IMMOBILIZE the target.",
        ],
    },
    "fire-veil": {
        id: "fire-veil",
        setId: "ninjutsu",
        name: "Fire Veil",
        description: [
            "Deal fire damage and CONFUSE target.",
        ],
    },
    "earth-veil": {
        id: "earth-veil",
        setId: "ninjutsu",
        name: "Earth Veil",
        description: [
            "Deal earth damage and SLOW the target.",
        ],
    },
    "gold-veil": {
        id: "gold-veil",
        setId: "ninjutsu",
        name: "Gold Veil",
        description: [
            "Damage and BLIND the target.",
        ],
    },
    "water-veil": {
        id: "water-veil",
        setId: "ninjutsu",
        name: "Water Veil",
        description: [
            "Deal water damage and SILENCE the target.",
        ],
    },
    unspell: {
        id: "unspell",
        setId: "ninjutsu",
        name: "Unspell",
        description: [
            "A chant that quells the target's spirit. Neutralizes buffs.",
        ],
    },
    oblivion: {
        id: "oblivion",
        setId: "ninjutsu",
        otherSetIds: ["assassination"],
        name: "Oblivion",
        description: [
            "ADDLE the target with a cloud of poison-laced dust.",
        ],
    },
    "critical-haste": {
        id: "critical-haste",
        setId: "reaction",
        name: "Critical: Haste",
        description: [
            "Gain HASTE when user becomes HP Critical.",
        ],
    },
    "dual-wield": {
        id: "dual-wield",
        setId: "passive",
        name: "Dual Wield",
        description: [
            "Wield one weapon in each hand. Enables user to attack twice.",
        ],
    },
    nurse: {
        id: "nurse",
        setId: "chivalry",
        name: "Nurse",
        description: [
            "Attempt to make the user's wounds more bearable by restoring HP and removing debuffs.",
        ],
    },
    defend: {
        id: "defend",
        setId: "chivalry",
        name: "Defend",
        description: [
            "Concentrate solely on protecting one's self. Raises DEFENSE and RESISTANCE until the user's next action.",
        ],
    },
    cover: {
        id: "cover",
        setId: "chivalry",
        name: "Cover",
        description: [
            "Take all damage directed at the target until the user's next action.",
        ],
    },
    parley: {
        id: "parley",
        setId: "chivalry",
        name: "Parley",
        description: [
            "Compel foe to flee the battlefield.",
        ],
    },
    "saint-cross": {
        id: "saint-cross",
        setId: "chivalry",
        name: "Saint Cross",
        description: [
            "Project a righteous aura, dealing holy damage to surrounding units.",
        ],
    },
    "holy-blade": {
        id: "holy-blade",
        setId: "chivalry",
        name: "Holy Blade",
        description: [
            "Normal damage; Holy element.",
        ],
    },
    sanctify: {
        id: "sanctify",
        setId: "chivalry",
        name: "Sanctify",
        description: [
            "Unleash a flash of holy light, banishing the undead.",
        ],
    },
    "war-cry": {
        id: "war-cry",
        setId: "chivalry",
        otherSetIds: ["brutality"],
        name: "War Cry",
        description: [
            "Let out a heartening battle cry, raising RESILIENCE of surrounding units to debuffs.",
        ],
    },
    reflex: {
        id: "reflex",
        setId: "reaction",
        name: "Reflex",
        description: [
            "Avoid all basic attacks.",
        ],
    },
    "defense↑": {
        id: "defense↑",
        setId: "passive",
        name: "Defense↑",
        description: [
            "Raises DEFENSE. Decreases physical damage received.",
        ],
    },
    "wind-slash": {
        id: "wind-slash",
        setId: "flair",
        name: "Wind Slash",
        description: [
            "Engulf the target in a whirlwind. Deals wind damage.",
        ],
    },
    "iai-blow": {
        id: "iai-blow",
        setId: "flair",
        name: "Iai Blow",
        description: [
            "An attack with a swift and deadly swing. Has a small chance of striking a vital organ, killing the target.",
            "Requires: Bladed weapon.",
        ],
    },
    "blade-bash": {
        id: "blade-bash",
        setId: "flair",
        name: "Blade Bash",
        description: [
            "Strike the target with the face of the blade, attempting to IMMOBILIZE them.",
            "Requires: Bladed weapon.",
        ],
    },
    "shimmering-blade": {
        id: "shimmering-blade",
        setId: "flair",
        name: "Shimmering Blade",
        description: [
            "Strike repeatedly at the target with a flaming blade to CONFUSE them.",
            "Requires: Bladed weapon.",
        ],
    },
    "hoarfrost-blade": {
        id: "hoarfrost-blade",
        setId: "flair",
        name: "Hoarfrost Blade",
        description: [
            "Strike repeatedly at the target with a frozen blade of ice. SLOWS the target.",
            "Requires: Bladed weapon.",
        ],
    },
    "skyfury-blade": {
        id: "skyfury-blade",
        setId: "flair",
        name: "Skyfury Blade",
        description: [
            "Strike repeatedly at the target with a lightning-imbued blade. Drives the target into a Berserk.",
            "Requires: Bladed weapon.",
        ],
    },
    "lifethread-blade": {
        id: "lifethread-blade",
        setId: "flair",
        name: "Lifethread Blade",
        description: [
            "Strike repeatedly at the target with a dark-forged blade. Marks the target with DOOM.",
            "Requires: Bladed weapon.",
        ],
    },
    "unburden-soul": {
        id: "unburden-soul",
        setId: "flair",
        name: "Unburden Soul",
        description: [
            "Sacrifice the user, completely restoring all allies' HP and curing them of debuffs.",
        ],
    },
    "strike-back": {
        id: "strike-back",
        setId: "reaction",
        name: "Strike Back",
        description: [
            "Avoid all basic attacks and launch counter attack in return.",
        ],
    },
    "death-strike": {
        id: "death-strike",
        setId: "passive",
        name: "Death Strike",
        description: [
            "Makes the user lucky. Increases chance to score a critical hit.",
        ],
    },
    recharge: {
        id: "recharge",
        setId: "high-magick",
        name: "Recharge",
        description: [
            "Absorb the latent Mist in the air. Restores user's MP.",
        ],
    },
    "magick-frenzy": {
        id: "magick-frenzy",
        setId: "high-magick",
        name: "Magick Frenzy",
        description: [
            "Damage units in a small area with combination of magick and physical attacks.",
        ],
    },
    "replenish-mp": {
        id: "replenish-mp",
        setId: "reaction",
        name: "Replenish MP",
        description: [
            "Gain MP equal to 20% of damage taken.",
        ],
    },
    pierce: {
        id: "pierce",
        setId: "passive",
        name: "Pierce",
        description: [
            "Spells cast by the user are unaffected by REFLECT.",
        ],
    },
    "ribbon-bearer": {
        id: "ribbon-bearer",
        setId: "passive",
        name: "Ribbon-Bearer",
        description: [
            "Enables the user to equip a ribbon, regardless of their current job.",
        ],
    },
    "steal-items": {
        id: "steal-items",
        setId: "thievery",
        name: "Steal Items",
        description: [
            "Steal the target's Items.",
        ],
    },
    "steal-gil": {
        id: "steal-gil",
        setId: "thievery",
        name: "Steal Gil",
        description: [
            "Steal the target's gil.",
        ],
    },
    "loot-lv-1": {
        id: "loot-lv-1",
        setId: "thievery",
        name: "Loot Lv. 1",
        description: [
            "Steal the target's Lv. 1 Loot.",
        ],
    },
    "loot-lv-2": {
        id: "loot-lv-2",
        setId: "thievery",
        name: "Loot Lv. 2",
        description: [
            "Steal the target's Lv. 2 Loot.",
        ],
    },
    "loot-lv-3": {
        id: "loot-lv-3",
        setId: "thievery",
        name: "Loot Lv. 3",
        description: [
            "Steal the target's Lv. 3 Loot.",
        ],
    },
    "loot-lv-4": {
        id: "loot-lv-4",
        setId: "thievery",
        name: "Loot Lv. 4",
        description: [
            "Steal the target's Lv. 4 Loot.",
        ],
    },
    "steal-accessory": {
        id: "steal-accessory",
        setId: "thievery",
        name: "Steal Accessory",
        description: [
            "Steal the target's Accessory.",
        ],
    },
    "steal-limelight": {
        id: "steal-limelight",
        setId: "thievery",
        name: "Steal Limelight",
        description: [
            "Steal the target's accumulated Smash Gauge points.",
        ],
    },
    counter: {
        id: "counter",
        setId: "reaction",
        name: "Counter",
        description: [
            "Counter attack when targeted with an offensive action.",
        ],
    },
    safeguard: {
        id: "safeguard",
        setId: "passive",
        name: "Safeguard",
        description: [
            "Prevents the user's weapon from being stolen or destroyed.",
        ],
    },
    "body-slam": {
        id: "body-slam",
        setId: "arts-of-war",
        name: "Body Slam",
        description: [
            "Ram the target with a powerful melee attack. Also deals damage to the user.",
        ],
    },
    "greased-lightning": {
        id: "greased-lightning",
        setId: "arts-of-war",
        name: "Greased Lightning",
        description: [
            "Strike an unexpected blow, negating the target's reaction ability.",
        ],
    },
    lifetap: {
        id: "lifetap",
        setId: "arts-of-war",
        name: "Lifetap",
        description: [
            "Summon a field of energy to snuff out the target's life force. reduces HP by 50%.",
            "Can be used on two enemies at once with spear-type weapon.",
        ],
    },
    roundhouse: {
        id: "roundhouse",
        setId: "discipline",
        name: "Roundhouse",
        description: [
            "A spin attack that damages surrounding units.",
        ],
    },
    "earth-render": {
        id: "earth-render",
        setId: "discipline",
        name: "Earth Render",
        description: [
            "A focused attack that sunders the ground. Deals earth damage in a line extending from the user.",
        ],
    },
    chakra: {
        id: "chakra",
        setId: "discipline",
        name: "Chakra",
        description: [
            "Focus the user's ki on the body's chakra points. Restores HP and removes debuffs.",
        ],
    },
    revive: {
        id: "revive",
        setId: "discipline",
        name: "Revive",
        description: [
            "Send the user's ki to the target, reviving it from KO.",
        ],
    },
    exorcise: {
        id: "exorcise",
        setId: "discipline",
        name: "Exorcise",
        description: [
            "Use the energy of the life chakra to ward off evil. Destroys undead.",
        ],
    },
    "holy-sign": {
        id: "holy-sign",
        setId: "discipline",
        name: "Holy Sign",
        description: [
            "Weave a sacred symbol in the air. Removes buffs from the target.",
        ],
    },
    dispel: {
        id: "dispel",
        setId: "intercession",
        name: "Dispel",
        description: [
            "Magickally return targets to their natural state. Removes buffs from units in a small area.",
        ],
    },
    holy: {
        id: "holy",
        setId: "intercession",
        name: "Holy",
        description: [
            "Call upon the light of heavenly judgment to strike the target. Deals holy damage.",
        ],
    },
    barrier: {
        id: "barrier",
        setId: "intercession",
        name: "Barrier",
        description: [
            "Bestows Protect and Shell in an area.",
        ],
    },
    water: {
        id: "water",
        setId: "intercession",
        otherSetIds: ["sagacity"],
        name: "Water",
        description: [
            "Drench units in a small area with a burst of water. Deals water damage.",
        ],
    },
    aero: {
        id: "aero",
        setId: "intercession",
        otherSetIds: ["sagacity"],
        name: "Aero",
        description: [
            "Envelop units in a small area in a fierce whirlwind. Deals wind damage.",
        ],
    },
    "break": {
        id: "break",
        setId: "intercession",
        name: "Break",
        description: [
            "Turn the target to STONE with a cloud of petrifying gas.",
        ],
    },
    pilfer: {
        id: "pilfer",
        setId: "intercession",
        name: "Pilfer",
        description: [
            "Lightly bump the target, stealing a piece of loot in the process.",
        ],
    },
    prime: {
        id: "prime",
        setId: "cannonry",
        otherSetIds: ["ballistics"],
        name: "Prime",
        description: [
            "Specially prepare shells to deal increased damage. Raises ATTACK bonus of next basic attack.",
            "Infuse cannon with MP. Enables ballistic attacks.",
            "Requires: Hand-cannon.",
        ],
    },
    foresight: {
        id: "foresight",
        setId: "cannonry",
        name: "Foresight",
        description: [
            "Organize shells for quick reloading. Raises number of shots fired in next basic attack.",
            "Requires: Hand-cannon.",
        ],
    },
    buckshot: {
        id: "buckshot",
        setId: "cannonry",
        name: "Buckshot",
        description: [
            "Load cannon with fragmentation shells. Increases damage radius of next basic attack.",
            "Requires: Hand-cannon.",
        ],
    },
    scope: {
        id: "scope",
        setId: "cannonry",
        name: "Scope",
        description: [
            "Attach a scope to the cannon. Increases ACCURACY of next basic attack.",
            "Requires: Hand-cannon.",
        ],
    },
    mortar: {
        id: "mortar",
        setId: "cannonry",
        name: "Mortar",
        description: [
            "Plant the cannon firmly on the ground before firing. Deals heavy damage, but unit cannot move next turn.",
            "Requires: Hand-cannon.",
        ],
    },
    target: {
        id: "target",
        setId: "cannonry",
        name: "Target",
        description: [
            "Take careful aim of the target. Deals heavy damage on the next turn.",
            "Requires: Hand-cannon.",
        ],
    },
    "potion-shell": {
        id: "potion-shell",
        setId: "cannonry",
        name: "Potioni Shell",
        description: [
            "Fire a potion-infused shell at the target. Restores HP.",
            "Requires: Hand-cannon.",
        ],
    },
    "ether-shell": {
        id: "ether-shell",
        setId: "cannonry",
        name: "Ether Shell",
        description: [
            "Fire a ether-infused shell at the target. Restores MP.",
            "Requires: Hand-cannon.",
        ],
    },
    "blur": {
        id: "blur",
        setId: "reaction",
        name: "Blur",
        description: [
            "Avoid hand-cannon and gun-based basic attacks.",
        ],
    },
    "whirl-burst": {
        id: "whirl-burst",
        setId: "warding",
        name: "Whirl Burst",
        description: [
            "A powerful whirlwind attack. Damages and knocks back surrounding units.",
        ],
    },
    meltdown: {
        id: "meltdown",
        setId: "warding",
        name: "Meltdown",
        description: [
            "Sacrifice the user to deal damage equal to their current HP to target.",
        ],
    },
    defense: {
        id: "defense",
        setId: "warding",
        name: "Defense",
        description: [
            "Concentrate solely on protecting one's self. Raises DEFENSE and RESISTANCE until the user's next turn.",
        ],
    },
    "rend-weapon": {
        id: "rend-weapon",
        setId: "warding",
        name: "Rend Weapon",
        description: [
            "Attempt to destroy the target's weapon with a attack aimed at the hands.",
        ],
    },
    hibernate: {
        id: "hibernate",
        setId: "warding",
        name: "Hibernate",
        description: [
            "Place the user in a state of restful SLEEP. Removes debuffs, but leaves the user defenseless.",
        ],
    },
    "mow-down": {
        id: "mow-down",
        setId: "warding",
        name: "Mow Down",
        description: [
            "A powerful attack that damages surrounding units. Leaves the user exhausted, lowering EVASION.",
        ],
    },
    aura: {
        id: "aura",
        setId: "warding",
        name: "Aura",
        description: [
            "A secret technique that augments the user's aura. RERAISE and REGEN.",
        ],
    },
    bulwark: {
        id: "bulwark",
        setId: "warding",
        otherSetIds: ["devastation"],
        name: "Bulwark",
        description: [
            "Protect the user from all damage until its next turn.",
        ],
    },
    "critical-berserk": {
        id: "critical-berserk",
        setId: "reaction",
        name: "Critical: Berserk",
        description: [
            "Gain BERSERK when user becomes HP Critical.",
        ],
    },
    tank: {
        id: "tank",
        setId: "passive",
        name: "tank",
        description: [
            "Enables the user to equip helms and heavy armor, regardless of their current job.",
        ],
    },
    jump: {
        id: "jump",
        setId: "dragon-soul",
        name: "Jump",
        description: [
            "Leap into the air and impale the target.",
            "Requires: Spear.",
        ],
    },
    "bangaa-cry": {
        id: "bangaa-cry",
        setId: "dragon-soul",
        name: "Bangaa Cry",
        description: [
            "Let out a distinctly bangaa shout. Damages and CONFUSES in a cone in front of the user.",
        ],
    },
    wyrmtamer: {
        id: "wyrmtamer",
        setId: "dragon-soul",
        name: "Wyrmtamer",
        description: [
            "Persuade target dragon to flee the battlefield.",
        ],
    },
    wyrmkiller: {
        id: "wyrmkiller",
        setId: "dragon-soul",
        name: "Wyrmkiller",
        description: [
            "The best guarded secret of the dragoons. Deals heavy damage to dragons.",
        ],
    },
    lancet: {
        id: "lancet",
        setId: "dragon-soul",
        name: "Lancet",
        description: [
            "Use the soul of the wyrm to steal HP from the target.",
        ],
    },
    dragonheart: {
        id: "dragonheart",
        setId: "reaction",
        name: "Dragonheart",
        description: [
            "Gain RERAISE after taking damage. Only works once per battle.",
        ],
    },
    "fire-soul": {
        id: "fire-soul",
        setId: "sparring",
        name: "Fire Soul",
        description: [
            "Send ball of flame hurtling towards the target. Deal fire damage.",
        ],
    },
    "thunder-assault": {
        id: "thunder-assault",
        setId: "sparring",
        name: "Thunder Assault",
        description: [
            "Strike the target with a bolt of lightning. Deals lightning damage.",
        ],
    },
    "blizzard-tackle": {
        id: "blizzard-tackle",
        setId: "sparring",
        name: "Blizzard Tackle",
        description: [
            "Impale the target on a massive shard of ice. Deals ice damage.",
        ],
    },
    "ultima-sword": {
        id: "ultima-sword",
        setId: "sparring",
        name: "Ultima Sword",
        description: [
            "Derived from the most powerful of magicks, this is the ultimate sparring ability.",
        ],
    },
    pummel: {
        id: "pummel",
        setId: "martial-arts",
        name: "pummel",
        description: [
            "Attack the target with two consecutive punches.",
        ],
    },
    "dark-fist": {
        id: "dark-fist",
        setId: "martial-arts",
        name: "Dark Fist",
        description: [
            "Sacrifices HP to deal a blindingly fast attack that pierces its target.",
        ],
    },
    "withering-strike": {
        id: "withering-strike",
        setId: "martial-arts",
        name: "Withering Strike",
        description: [
            "An attack that deals damage based on the user's current HP. The lower the HP, the greater the damage.",
        ],
    },
    lifebane: {
        id: "lifebane",
        setId: "martial-arts",
        name: "Lifebane",
        description: [
            "Strike at the target's vitals. Has a chance to DOOM the target.",
        ],
    },
    "holy-strike": {
        id: "holy-strike",
        setId: "martial-arts",
        name: "Holy Strike",
        description: [
            "Focus the wrath of the gods into a powerful strike. Deals holy damage.",
        ],
    },
    "cross-counter": {
        id: "cross-counter",
        setId: "martial-arts",
        name: "Cross-counter",
        description: [
            "Use the target's own Counter ability to deal massive damage.",
        ],
    },
    "inner-focus": {
        id: "inner-focus",
        setId: "martial-arts",
        name: "Inner Focus",
        description: [
            "Manipulate the user's ki to rid the body of the impurities. Restores HP and removes debuffs.",
        ],
    },
    "rend-armor": {
        id: "rend-armor",
        setId: "martial-arts",
        name: "Rend Armor",
        description: [
            "A powerful attack with a chance to destroy the target's armor.",
        ],
    },
    "blink-counter": {
        id: "blink-counter",
        setId: "reaction",
        name: "Blink Counter",
        description: [
            "Counter attack and knock back the attacker after being the target of an offensive action.",
        ],
    },
    unscarred: {
        id: "unscarred",
        setId: "passive",
        name: "Unscarred",
        description: [
            "Raises ATTACK, DEFENSE, MAGICK, and RESISTANCE when the user has full HP.",
        ],
    },
    astra: {
        id: "astra",
        setId: "sacred-blade",
        otherSetIds: ["alchemy"],
        name: "Astra",
        description: [
            "Render units in a small area immune to debuffs.",
        ],
    },
    "piercing-cry": {
        id: "piercing-cry",
        setId: "sacred-blade",
        name: "Piercing Cry",
        description: [
            "Let out a fearsome roar, lowering SPEED of surrounding units.",
        ],
    },
    rasp: {
        id: "rasp",
        setId: "sacred-blade",
        otherSetIds: ["alchemy"],
        name: "Rasp",
        description: [
            "Prey on the minds of your foes. Depletes MP of units in a small area.",
        ],
    },
    discipline: {
        id: "discipline",
        setId: "sacred-blade",
        name: "Discipline",
        description: [
            "Center the user's thoughts. Raises ATTACK.",
        ],
    },
    silence: {
        id: "silence",
        setId: "sacred-blade",
        otherSetIds: ["green-magick", "red-magick"],
        name: "Silence",
        description: [
            "Steal the target's voice. SILENCES units in a small area.",
        ],
    },
    "soul-sphere": {
        id: "soul-sphere",
        setId: "sacred-blade",
        name: "Soul Sphere",
        description: [
            "Summon a magick field to drain the target's energy. Depletes MP.",
        ],
    },
    haste: {
        id: "haste",
        setId: "sacred-blade",
        otherSetIds: ["time-magick"],
        name: "Haste",
        description: [
            "Hasten the flow of time around the target. Raises SPEED.",
        ],
    },
    lifebreak: {
        id: "lifebreak",
        setId: "sacred-blade",
        name: "Lifebreak",
        description: [
            "Deal dark damage equal to the amount of HP the user has lost.",
        ],
    },
    snigger: {
        id: "snigger",
        setId: "sleight-of-hand",
        name: "Snigger",
        description: [
            "Laugh snidely at the target, driving them into a BERSERK rage.",
        ],
    },
    suggestion: {
        id: "suggestion",
        setId: "sleight-of-hand",
        name: "Suggestion",
        description: [
            "Inflicts Frog.",
        ],
    },
    hypochondria: {
        id: "hypochondria",
        setId: "sleight-of-hand",
        name: "Hypochondria",
        description: [
            "Magickal chant that convinces the target they've come into contact with a deadly POISON.",
        ],
    },
    "shadow-of-doubt": {
        id: "shadow-of-doubt",
        setId: "sleight-of-hand",
        name: "Shadow of Doubt",
        description: [
            "Whisper rumors in the target's ear, undermining their confidence. IMMOBILIZES target.",
        ],
    },
    charisma: {
        id: "charisma",
        setId: "sleight-of-hand",
        name: "Charisma",
        description: [
            "Inflicts Charm.",
        ],
    },
    traumatize: {
        id: "traumatize",
        setId: "sleight-of-hand",
        name: "Traumatize",
        description: [
            "Add injury to insult, damaging debuffed targets. Deals greater damage to targets with more debuffs.",
        ],
    },
    agitate: {
        id: "agitate",
        setId: "sleight-of-hand",
        name: "Agitate",
        description: [
            "Deal damage equal to the user's lost HP. Damages unit in a small area.",
        ],
    },
    mug: {
        id: "mug",
        setId: "sleight-of-hand",
        name: "Mug",
        description: [
            "Attack the target an steal loot from it in the ensuing commotion.",
        ],
    },
    "absorb-damage": {
        id: "absorb-damage",
        setId: "reaction",
        name: "Absorb Damage",
        description: [
            "Gain HP equal to 10% of damage taken.",
        ],
    },
    dreamhare: {
        id: "dreamhare",
        setId: "beast-lore",
        name: "Dreamhare",
        description: [
            "Take control of dreamhares.",
        ],
    },
    "deadly-nightshade": {
        id: "deadly-nightshade",
        setId: "beast-lore",
        name: "Deadly Nightshade",
        description: [
            "Take control of deadly nightshades.",
        ],
    },
    baknamy: {
        id: "baknamy",
        setId: "beast-lore",
        name: "Baknamy",
        description: [
            "Take control of baknamy.",
        ],
    },
    flan: {
        id: "flan",
        setId: "beast-lore",
        name: "Flan",
        description: [
            "Take control of flans.",
        ],
    },
    lamia: {
        id: "lamia",
        setId: "beast-lore",
        name: "Lamia",
        description: [
            "Take control of lamias.",
        ],
    },
    wolf: {
        id: "wolf",
        setId: "beast-lore",
        name: "Wolf",
        description: [
            "Take control of woles.",
        ],
    },
    werewolf: {
        id: "werewolf",
        setId: "beast-lore",
        name: "Werewolf",
        description: [
            "Take control of werewolves.",
        ],
    },
    shelling: {
        id: "shelling",
        setId: "beast-lore",
        name: "Shelling",
        description: [
            "Take control of shellings.",
        ],
    },
    headless: {
        id: "headless",
        setId: "beast-lore",
        name: "Headless",
        description: [
            "Take control of headlesses.",
        ],
    },
    zombie: {
        id: "zombie",
        setId: "beast-lore",
        name: "Zombie",
        description: [
            "Take control of zombies.",
        ],
    },
    ghost: {
        id: "ghost",
        setId: "beast-lore",
        name: "Ghost",
        description: [
            "Take control of ghosts.",
        ],
    },
    deathscythe: {
        id: "deathscythe",
        setId: "beast-lore",
        name: "Deathscythe",
        description: [
            "Take control of deathscythes.",
        ],
    },
    malboro: {
        id: "malboro",
        setId: "beast-lore",
        name: "Malboro",
        description: [
            "Take control of malboros.",
        ],
    },
    bomb: {
        id: "bomb",
        setId: "beast-lore",
        name: "Bomb",
        description: [
            "Take control of bombs.",
        ],
    },
    ahriman: {
        id: "ahriman",
        setId: "beast-lore",
        name: "Ahriman",
        description: [
            "Take control of ahrimans.",
        ],
    },
    "floating-eye": {
        id: "floating-eye",
        setId: "beast-lore",
        name: "Floating Eye",
        description: [
            "Take control of floating eyes.",
        ],
    },
    sprite: {
        id: "sprite",
        setId: "beast-lore",
        name: "Sprite",
        description: [
            "Take control of sprites.",
        ],
    },
    antlion: {
        id: "antlion",
        setId: "beast-lore",
        name: "Antlion",
        description: [
            "Take control of antlions.",
        ],
    },
    cockatrice: {
        id: "cockatrice",
        setId: "beast-lore",
        name: "Cockatrice",
        description: [
            "Take control of cockatrices.",
        ],
    },
    drake: {
        id: "drake",
        setId: "beast-lore",
        name: "Drake",
        description: [
            "Take control of drakes.",
        ],
    },
    behemoth: {
        id: "behemoth",
        setId: "beast-lore",
        name: "Behemoth",
        description: [
            "Take control of behemoths.",
        ],
    },
    transmute: {
        id: "transmute",
        setId: "alchemy",
        name: "Transmute",
        description: [
            "Transmute an HP Critical unit into a consumable item.",
        ],
    },
    protometeor: {
        id: "protometeor",
        setId: "alchemy",
        name: "Protometeor",
        description: [
            "Call a giant meteor from the sky, damaging units in a small area.",
        ],
    },
    flare: {
        id: "flare",
        setId: "alchemy",
        name: "Flare",
        description: [
            "Abruptly raise the temperature of the air surrounding the target, causing a violent explosion.",
        ],
    },
    poison: {
        id: "poison",
        setId: "alchemy",
        name: "Poison",
        description: [
            "Distill toxins from the air to POISON the target.",
        ],
    },
    toad: {
        id: "toad",
        setId: "alchemy",
        name: "Toad",
        description: [
            "Release a gas that alters the target's biology, turning it into a TOAD.",
        ],
    },
    "magick↑": {
        id: "magick↑",
        setId: "passive",
        name: "Magick↑",
        description: [
            "Raises MAGICK. Increases magick damage dealt.",
        ],
    },
    "item-lore": {
        id: "item-lore",
        setId: "passive",
        name: "Item Lore",
        description: [
            "Increases the effect potions and other consumables have on the user.",
        ],
    },
    syphon: {
        id: "syphon",
        setId: "arcane-magick",
        name: "Syphon",
        description: [
            "Syphon MP from the target, converting it to HP for the user.",
        ],
    },
    death: {
        id: "death",
        setId: "arcane-magick",
        name: "Death",
        description: [
            "Sever the target's life thread to KO the target.",
        ],
    },
    gravity: {
        id: "gravity",
        setId: "arcane-magick",
        name: "Gravity",
        description: [
            "Create a small gravity well around the target. Reduces HP by 25%.",
        ],
    },
    drain: {
        id: "drain",
        setId: "arcane-magick",
        name: "Drain",
        description: [
            "Steal the target's vitality. Transfers HP from the target to the user.",
        ],
    },
    graviga: {
        id: "graviga",
        setId: "arcane-magick",
        name: "Graviga",
        description: [
            "Create a large gravity well around the target. Reduces HP by 50%.",
        ],
    },
    "lv-3-dark": {
        id: "lv-3-dark",
        setId: "arcane-magick",
        name: "Lv. 3 Dark",
        description: [
            "Deal dark damage to each unit whose level is a multiple of 3.",
        ],
    },
    "lv-5-haste": {
        id: "lv-5-haste",
        setId: "arcane-magick",
        name: "Lv. 5 Haste",
        description: [
            "Grant HASTE to each unit whose level is a multiple of 5.",
        ],
    },
    "lv-?-shadow-flare": {
        id: "lv-?-shadow-flare",
        setId: "arcane-magick",
        name: "Lv. ? Shadow Flare",
        description: [
            "Cast Shadowflare on all units who share the first digit of the caster's level. Deals dark damage.",
        ],
    },
    blind: {
        id: "blind",
        setId: "sagacity",
        otherSetIds: ["green-magick"],
        name: "Blind",
        description: [
            "Conjure a black mist to BLIND the target.",
        ],
    },
    scathe: {
        id: "scathe",
        setId: "sagacity",
        name: "Scathe",
        description: [
            "Unleash a column of concentrated magickal energy in line extending from the caster. Deals heavy damage.",
        ],
    },
    esunaga: {
        id: "esunaga",
        setId: "sagacity",
        name: "Esunaga",
        description: [
            "An enhanced version of Esuna. Purges debuffs from all units in a small area.",
        ],
    },
    gigaflare: {
        id: "gigaflare",
        setId: "sagacity",
        name: "Gigaflare",
        description: [
            "A more powerful version of Flare. Deals heavy damage to units in a small area.",
        ],
    },
    bio: {
        id: "bio",
        setId: "sagacity",
        name: "Bio",
        description: [
            "Damage and POISON units in a small area with tendrils of toxic sludge.",
        ],
    },
    "ultima-blow": {
        id: "ultima-blow",
        setId: "sagacity",
        name: "Ultima Blow",
        description: [
            "Derived from the most powerful of magicks, this is the ultimate sage ability.",
        ],
    },
    study: {
        id: "study",
        setId: "lore",
        name: "Study",
        description: [
            "Pour over the available information on the target. Reveals the loot and items the unit is carrying.",
        ],
    },
    "natural-selection": {
        id: "natural-selection",
        setId: "lore",
        name: "Natural Selection",
        description: [
            "Exploit the racial weaknesses of the target. Deals damage to all units of the targeted race.",
        ],
    },
    "earth-dragon-tome": {
        id: "earth-dragon-tome",
        setId: "lore",
        name: "Earth Dragon Tome",
        description: [
            "Read from the ancient tome to wake the earth dragon. Deals earth damage to friend and foe alike.",
        ],
    },
    "rime-bolt-tome": {
        id: "rime-bolt-tome",
        setId: "lore",
        name: "Rime Bolt Tome",
        description: [
            "Read from the ancient tome to conjure a storm of ice. Deals ice damage to friend and foe alike.",
        ],
    },
    "thunder-flare-tome": {
        id: "thunder-flare-tome",
        setId: "lore",
        name: "Thunder Flare Tome",
        description: [
            "Read from the ancient tome to rain lightning from the sky. Deals lightning damage to friend and foe alike.",
        ],
    },
    "shadow-shade-tome": {
        id: "shadow-shade-tome",
        setId: "lore",
        name: "Shadow Shade Tome",
        description: [
            "Read from the ancient tome to unleash the powers of darkness. Deals dark damage to friend and foe alike.",
        ],
    },
    force: {
        id: "force",
        setId: "lore",
        name: "Force",
        description: [
            "Encloses units in a small area inside a protective barrier. Raises RESILIENCE.",
        ],
    },
    "mad-scientist": {
        id: "mad-scientist",
        setId: "lore",
        name: "Mad Scientist",
        description: [
            "Read a mystic incantation from an ancient tome. Grants target a random buff.",
        ],
    },
    spellbound: {
        id: "spellbound",
        setId: "passive",
        name: "Spellbound",
        description: [
            "Extends the duration of buffs and debuffs on the user.",
        ],
    },
    hastega: {
        id: "hastega",
        setId: "time-magick",
        name: "Hastega",
        description: [
            "An improved version of Haste. Raises the SPEED of all units in a small area.",
        ],
    },
    quicken: {
        id: "quicken",
        setId: "time-magick",
        name: "Quicken",
        description: [
            "Slide the target through time. Enables target to take its next turn immediately.",
        ],
    },
    slow: {
        id: "slow",
        setId: "time-magick",
        name: "Slow",
        description: [
            "Slow the flow of time around the target. Lowers SPEED.",
        ],
    },
    reflect: {
        id: "reflect",
        setId: "time-magick",
        name: "Reflect",
        description: [
            "Erect an invisible barrier around the target that bounces magicks back at their caster.",
        ],
    },
    "stop": {
        id: "stop",
        setId: "time-magick",
        name: "Stop",
        description: [
            "Stop the flow of time around the target. Prevents the unit from taking any action.",
        ],
    },
    extend: {
        id: "extend",
        setId: "time-magick",
        name: "Extend",
        description: [
            "Alter the flow of time, increasing the duration of buffs and debuffs on units in a small area.",
        ],
    },
    undo: {
        id: "undo",
        setId: "time-magick",
        name: "Undo",
        description: [
            "Reverse time's flow, reverting target's HP and MP to their value the previous turn.",
        ],
    },
    "critical-quicken": {
        id: "critical-quicken",
        setId: "reaction",
        name: "Critical: Quicken",
        description: [
            "Act next when user become HP Critical.",
        ],
    },
    "evade-magick": {
        id: "evade-magick",
        setId: "reaction",
        name: "Evade Magick",
        description: [
            "Resist spells that deal damage.",
        ],
    },
    swarmstrike: {
        id: "swarmstrike",
        setId: "fencing",
        name: "Swarmstrike",
        description: [
            "Attack with the speed of a hornet. Damages and POISONS the target.",
        ],
    },
    shadowstick: {
        id: "shadowstick",
        setId: "fencing",
        name: "Shadowstick",
        description: [
            "An attack that takes target unawares. Lowers SPEED.",
        ],
    },
    checkmate: {
        id: "checkmate",
        setId: "fencing",
        name: "Checkmate",
        description: [
            "A decisive attack that DOOMS the target to an inevitable death.",
        ],
    },
    featherblow: {
        id: "featherblow",
        setId: "fencing",
        name: "Featherblow",
        description: [
            "Strike with the grace of a feather on the wind. Has a heightened chance to hit, but deals minimal damage.",
        ],
    },
    swallowtail: {
        id: "swallowtail",
        setId: "fencing",
        name: "Swallowtail",
        description: [
            "A graceful spin attack that cuts down surrounding units.",
        ],
    },
    manastrike: {
        id: "manastrike",
        setId: "fencing",
        name: "Manastrike",
        description: [
            "Conjure a magick-charged whirlwind to wither the target. Depletes MP.",
        ],
    },
    "piercing-blow": {
        id: "piercing-blow",
        setId: "fencing",
        name: "Piercing Blow",
        description: [
            "Release a focused shock wave. Penetrates the target, damaging any unit behind it as well.",
        ],
    },
    nighthawk: {
        id: "nighthawk",
        setId: "fencing",
        name: "Nighthawk",
        description: [
            "Shred the target with the talons of a deadly bird of prey. Able to strike even distant foes.",
        ],
    },
    shadowbind: {
        id: "shadowbind",
        setId: "assassination",
        name: "Shadowbind",
        description: [
            "STOPS the target.",
        ],
    },
    "last-breath": {
        id: "last-breath",
        setId: "assassination",
        name: "Last Breath",
        description: [
            "Strike the target's vitals. Suffocates and KOs target.",
        ],
    },
    aphonia: {
        id: "aphonia",
        setId: "assassination",
        name: "Aphonia",
        description: [
            "Aim for the target's throat. SILENCES the target.",
        ],
    },
    nightmare: {
        id: "nightmare",
        setId: "assassination",
        name: "Nightmare",
        description: [
            "Place the target in a magick-induced SLEEP. Occasionally DOOMS the target as well.",
        ],
    },
    ague: {
        id: "ague",
        setId: "assassination",
        name: "Ague",
        description: [
            "Cause a terrible fear to grip the target. SLOWS the targets actions.",
        ],
    },
    rockseal: {
        id: "rockseal",
        setId: "assassination",
        name: "Rockseal",
        description: [
            "Recite an ancient chant, sealing the target in STONE.",
        ],
    },
    "ultima-masher": {
        id: "ultima-masher",
        setId: "assassination",
        name: "Ultima Masher",
        description: [
            "Derived from the most powerful of magicks, the is the ultimate assassination ability.",
        ],
    },
    "return-fire": {
        id: "return-fire",
        setId: "reaction",
        name: "Return Fire",
        description: [
            "Avoid bow-based enemy attacks and fire an arrow back at the attacker.",
        ],
    },
    "fire-whip": {
        id: "fire-whip",
        setId: "elemental-magick",
        name: "Fire Whip",
        description: [
            "Hurl a ball of flame at the target. Deals fire damage and DISABLES the target.",
        ],
    },
    "earth-heal": {
        id: "earth-heal",
        setId: "elemental-magick",
        name: "Earth Heal",
        description: [
            "Harness the energies of leaf and loam to heal the target. Restores HP.",
        ],
    },
    "white-flame": {
        id: "white-flame",
        setId: "elemental-magick",
        name: "White Flame",
        description: [
            "Summon a divine flame to heal units in a small area.",
        ],
    },
    "shining-air": {
        id: "shining-air",
        setId: "elemental-magick",
        name: "Shining Air",
        description: [
            "Buffet the target with a shining gale. Deals wind damage and BLINDS the target.",
        ],
    },
    "evil-gaze": {
        id: "evil-gaze",
        setId: "elemental-magick",
        name: "Evil Gaze",
        description: [
            "Summon the evil that lurks in the shadows. Deals dark damage and CONFUSES target.",
        ],
    },
    "boulder-crush": {
        id: "boulder-crush",
        setId: "elemental-magick",
        name: "Boulder Crush",
        description: [
            "Drop an enormous boulder on the target. Deals earth damage and IMMOBILIZES target.",
        ],
    },
    sliprain: {
        id: "sliprain",
        setId: "elemental-magick",
        name: "Sliprain",
        description: [
            "Drench the target with driving rain. Deals water damage and SLOWS target.",
        ],
    },
    "thunderous-roar": {
        id: "thunderous-roar",
        setId: "elemental-magick",
        name: "Thunderous Roar",
        description: [
            "Strike the target with a bolt of lightning. Deals lightning damage and SILENCES target.",
        ],
    },
    protect: {
        id: "protect",
        setId: "green-magick",
        otherSetIds: ["red-magick"],
        name: "Protect",
        description: [
            "Create an invisible shield around units in a small area. Raises DEFENSE.",
        ],
    },
    shell: {
        id: "shell",
        setId: "green-magick",
        otherSetIds: ["red-magick"],
        name: "Shell",
        description: [
            "Surround units in a small area with a veil of divine protection. Raises RESISTANCE.",
        ],
    },
    tranq: {
        id: "tranq",
        setId: "green-magick",
        name: "Tranq",
        description: [
            "Soothe the target's nerves. Raises ACCURACY.",
        ],
    },
    leap: {
        id: "leap",
        setId: "green-magick",
        name: "Leap",
        description: [
            "Stimulate the muscles in the user's legs. Raises MOVE and JUMP.",
        ],
    },
    oil: {
        id: "oil",
        setId: "green-magick",
        name: "Oil",
        description: [
            "Coat the target with a film of black, sticky OIL.",
        ],
    },
    sleep: {
        id: "sleep",
        setId: "green-magick",
        name: "Sleep",
        description: [
            "Put units in a small area to SLEEP with a powerful gas.",
        ],
    },
    doublecast: {
        id: "doublecast",
        setId: "red-magick",
        name: "Doublecast",
        description: [
            "Cast two spells during the same turn.",
        ],
    },
    "sticky-fingers": {
        id: "sticky-fingers",
        setId: "reaction",
        name: "Sticky Fingers",
        description: [
            "Catch items thrown at the user and place them in the party's inventory.",
        ],
    },
    doubleshot: {
        id: "doubleshot",
        setId: "sharpshooting",
        name: "Doubleshot",
        description: [
            "Attack when the target is off guard to land two consecutive strikes.",
        ],
    },
    "beso-toxico": {
        id: "beso-toxico",
        setId: "sharpshooting",
        name: "Beso Toxico",
        description: [
            "Coat weapon with a deadly poison before attacking. Deals damage and POISONS the target.",
        ],
    },
    "death-sickle": {
        id: "death-sickle",
        setId: "sharpshooting",
        name: "Death Sickle",
        description: [
            "Call the reapers of the dead to DOOM the target.",
        ],
    },
    vanish: {
        id: "vanish",
        setId: "sharpshooting",
        name: "Vanish",
        description: [
            "Conceal one's self from foes. Taking any action will break the effect.",
        ],
    },
    "marksmans-spite": {
        id: "marksmans-spite",
        setId: "sharpshooting",
        name: "Marksman's Spite",
        description: [
            "Deal damage and deplete MP equal to the user's lost HP.",
            "Requires: Bow, Crossbow.",
        ],
    },
    "armor-shot": {
        id: "armor-shot",
        setId: "sharpshooting",
        name: "Armor Shot",
        description: [
            "Attempt to destroy the target's armor.",
        ],
    },
    "weapon-shot": {
        id: "weapon-shot",
        setId: "sharpshooting",
        name: "Weapon Shot",
        description: [
            "Attempt to destroy the target's weapon.",
        ],
    },
    "wallet-shot": {
        id: "wallet-shot",
        setId: "sharpshooting",
        name: "Wallet Shot",
        description: [
            "Aim for the target's gil pouch. Successful hits score a large amount of gil.",
        ],
    },
    "poison-blade": {
        id: "poison-blade",
        setId: "blade-arts",
        name: "Poison Blade",
        description: [
            "Attack with a magickally envenomed blade. Damages and POISONS the target.",
        ],
    },
    "oil-blade": {
        id: "oil-blade",
        setId: "blade-arts",
        name: "Oil Blade",
        description: [
            "Attack with an oil-smeared blade. Damages and coats the target with OIL.",
        ],
    },
    "sleep-blade": {
        id: "sleep-blade",
        setId: "blade-arts",
        name: "Sleep Blade",
        description: [
            "Attack with a Sleep-imbued blade. Damages and puts the target to SLEEP.",
        ],
    },
    "slow-blade": {
        id: "slow-blade",
        setId: "blade-arts",
        name: "Slow Blade",
        description: [
            "Attack with a Slow-imbued blade. Damages and SLOW the target.",
        ],
    },
    "confusion-blade": {
        id: "confusion-blade",
        setId: "blade-arts",
        name: "Confusion Blade",
        description: [
            "Attack with a magickally befuddling blade. Damages and CONFUSES the target.",
        ],
    },
    "stun-blade": {
        id: "stun-blade",
        setId: "blade-arts",
        name: "Stun Blade",
        description: [
            "Attack with a blade that numbs the legs of its target. Damages and IMMOBILIZES.",
        ],
    },
    "maim-blade": {
        id: "maim-blade",
        setId: "blade-arts",
        name: "Maim Blade",
        description: [
            "Attack with a blade that binds the hands of its target. Damages and may inflict DISABLES the target.",
        ],
    },
    "doom-blade": {
        id: "doom-blade",
        setId: "blade-arts",
        name: "Doom Blade",
        description: [
            "Attack with a death-imbued blade. Damages and DOOMS the target.",
        ],
    },
    "Critical: Evasion↑": {
        id: "Critical: Evasion↑",
        setId: "reaction",
        name: "Critical: Evasion↑",
        description: [
            "Gain EVASION when user becomes HP Critical.",
        ],
    },
    "blood-price": {
        id: "blood-price",
        setId: "passive",
        name: "Blood Price",
        description: [
            "The user expends HP rather than MP when casting spells. The HP cost is twice the usual MP cost.",
        ],
    },
    unicorn: {
        id: "unicorn",
        setId: "summoning-magick",
        name: "Unicorn",
        description: [
            "Summon the spirit beast Unicorn from the world of illusion. Restores HP and purges debuffs from units in a large area.",
        ],
    },
    ifrit: {
        id: "ifrit",
        setId: "summoning-magick",
        name: "Ifrit",
        description: [
            "Summon the gigas Ifrit from the world of illusion. Deals fire damage to units in a large area.",
        ],
    },
    ramuh: {
        id: "ramuh",
        setId: "summoning-magick",
        name: "Ramuh",
        description: [
            "Summon the gigas Ramuh from the world of illusion. Deals lightning damage to units in a large area.",
        ],
    },
    shiva: {
        id: "shiva",
        setId: "summoning-magick",
        name: "Shiva",
        description: [
            "Summon the gigas Shiva from the world of illusion. Deals ice damage to units in a large area.",
        ],
    },
    kirin: {
        id: "kirin",
        setId: "summoning-magick",
        name: "Kirin",
        description: [
            "Summon the spirit beast Kirin from the world of illusion. Grants REGEN to units in a large area.",
        ],
    },
    carbuncle: {
        id: "carbuncle",
        setId: "summoning-magick",
        name: "Carbuncle",
        description: [
            "Bestows Reflect to all units in a large area.",
        ],
    },
    phoenix: {
        id: "phoenix",
        setId: "summoning-magick",
        name: "Phoenix",
        description: [
            "Summon the spirit beast Phoenix from the world of illusion. Revives and restores HP to units in a large area.",
        ],
    },
    maduin: {
        id: "maduin",
        setId: "summoning-magick",
        name: "Maduin",
        description: [
            "Summon the spirit beast Maduin from the world of illusion. Deals holy damage to units in a large area.",
        ],
    },
    "100%-wool": {
        id: "100%-wool",
        setId: "calling",
        name: "100% Wool",
        description: [
            "Wrap the unit in soft, fluffy wool. Grants Protect and SHELL.",
        ],
    },
    catnip: {
        id: "catnip",
        setId: "calling",
        name: "Catnip",
        description: [
            "Bombard the target with catnip, driving it into a BERSERK frenzy.",
        ],
    },
    "chocobo-rush": {
        id: "chocobo-rush",
        setId: "calling",
        name: "Chocobo Rush",
        description: [
            "Send a flock of charging chocobos to trample anything in their path.",
        ],
    },
    toadsong: {
        id: "toadsong",
        setId: "calling",
        name: "Toadsong",
        description: [
            "This mysterious song transforms the target into a TOAD.",
        ],
    },
    cuisine: {
        id: "cuisine",
        setId: "calling",
        name: "Cuisine",
        description: [
            "Feed the target a hearty meal that sticks to the ribs. Fully restores HP.",
        ],
    },
    friend: {
        id: "friend",
        setId: "calling",
        name: "Friend",
        description: [
            "Calls a random summon.",
        ],
    },
   "tail-wag": {
        id: "tail-wag",
        setId: "calling",
        name: "Tail Wag",
        description: [
            "CHARM the target with the wiles of a cute barnyard animal.",
        ],
    },
    "sheep-count": {
        id: "sheep-count",
        setId: "calling",
        name: "Sheep Count",
        description: [
            "Summon a flock of softly bleating sheep. Lulls units in a small area to SLEEP.",
        ],
    },
    "cure-cannon": {
        id: "cure-cannon",
        setId: "ballistics",
        name: "Cure Cannon",
        description: [
            "Use the primed cannon to remove debuffs and restore HP to the target.",
            "Requires: Hand-cannon.",
        ],
    },
    "protect-cannon": {
        id: "protect-cannon",
        setId: "ballistics",
        name: "Protect Cannon",
        description: [
            "Use the prime cannon to place PROTECT and REGEN on the target.",
            "Requires: Hand-cannon.",
        ],
    },
    "shell-cannon": {
        id: "shell-cannon",
        setId: "ballistics",
        name: "Shell Cannon",
        description: [
            "Use the prime cannon to place SHELL and REGEN on the target.",
            "Requires: Hand-cannon.",
        ],
    },
    "ether-cannon": {
        id: "ether-cannon",
        setId: "ballistics",
        name: "Ether Cannon",
        description: [
            "Use the primed cannon to restore MP to the target.",
            "Requires: Hand-cannon.",
        ],
    },
    "teleport-cannon": {
        id: "teleport-cannon",
        setId: "ballistics",
        name: "Teleport Cannon",
        description: [
            "Use the primed cannon to teleport the target to a random location.",
            "Requires: Hand-cannon.",
        ],
    },
    "ether-boost": {
        id: "ether-boost",
        setId: "ballistics",
        name: "Ether Boost",
        description: [
            "Use the primed cannon to attack to the target.",
            "Requires: Hand-cannon.",
        ],
    },
    blowback: {
        id: "blowback",
        setId: "ballistics",
        name: "Blowback",
        description: [
            "Sacrifice the user's HP launch a devastating attack.",
            "Requires: Hand-cannon.",
        ],
    },
    "charged-attacks": {
        id: "charged-attacks",
        setId: "passive",
        name: "Charged Attacks",
        description: [
            "Attacks consume MP, but deal additional damage.",
        ],
    },
    fireshot: {
        id: "fireshot",
        setId: "gunmanship",
        name: "Fireshot",
        description: [
            "An attack that explodes in a ball of flame on impact. Deals fire damage.",
        ],
    },
    boltshot: {
        id: "boltshot",
        setId: "gunmanship",
        name: "Boltshot",
        description: [
            "Send lightning leaping down at the target. Deals lightning damage.",
        ],
    },
    iceshot: {
        id: "iceshot",
        setId: "gunmanship",
        name: "Iceshot",
        description: [
            "An attack that impales its target on a glacial shard. Deals ice damage.",
        ],
    },
    confushot: {
        id: "confushot",
        setId: "gunmanship",
        name: "Confushot",
        description: [
            "A percussive attack that delivers a powerful shock. Damages and CONFUSES target.",
        ],
    },
    charmshot: {
        id: "charmshot",
        setId: "gunmanship",
        name: "Charmshot",
        description: [
            "A beguiling attack that robs the target on its senses. Damages and CHARMS target.",
        ],
    },
    blindshot: {
        id: "blindshot",
        setId: "gunmanship",
        name: "Blindshot",
        description: [
            "An attack that leaves the target in darkness. Damages and BLINDS target.",
        ],
    },
    silenceshot: {
        id: "silenceshot",
        setId: "gunmanship",
        name: "Silenceshot",
        description: [
            "An attack that paralyzes the target's throat. Damages and SILENCES target.",
        ],
    },
    stopshot: {
        id: "stopshot",
        setId: "gunmanship",
        name: "Stopshot",
        description: [
            "An attack that halts the target in its tracks. Damages and STOPS target.",
        ],
    },
    "weapon-toss": {
        id: "weapon-toss",
        setId: "acrobatics",
        name: "Weapon Toss",
        description: [
            "Throw a weapon from the party's inventory at the target.",
        ],
    },
    "ring-toss": {
        id: "ring-toss",
        setId: "acrobatics",
        name: "Ring Toss",
        description: [
            "Throw a ring around the target to STOP it from taking damage.",
        ],
    },
    "molotov-cocktail": {
        id: "molotov-cocktail",
        setId: "acrobatics",
        name: "Molotov Cocktail",
        description: [
            "Hurl a flaming bottle that explodes in a gout of fire. Deals fire damage and drives target into a BERSERK rage.",
        ],
    },
    "ball-toss": {
        id: "ball-toss",
        setId: "acrobatics",
        name: "Ball Toss",
        description: [
            "Bounce a ball off the target's head. Damages and CONFUSES the target.",
        ],
    },
    "dagger-toss": {
        id: "dagger-toss",
        setId: "acrobatics",
        name: "Dagger Toss",
        description: [
            "Send a razor-sharp dagger whizzing through the air. Damage and inflict DISABLES the target.",
        ],
    },
    "smile-toss": {
        id: "smile-toss",
        setId: "acrobatics",
        name: "Smile Toss",
        description: [
            "Put a smile on the target's face. Target takes the next turn.",
        ],
    },
    "gil-toss": {
        id: "gil-toss",
        setId: "acrobatics",
        name: "Gil Toss",
        description: [
            "Pummel the target with gil. Gil used in the attack are gone forever.",
        ],
    },
    "moogle-attack": {
        id: "moogle-attack",
        setId: "onslaught",
        name: "Moogle Attack",
        description: [
            "A mighty swing that damages and knocks back the target.",
        ],
    },
    "moogle-guard": {
        id: "moogle-guard",
        setId: "onslaught",
        name: "Moogle Guard",
        description: [
            "Assume a defensive stance until the user's next turn. Raises DEFENSE and RESISTANCE.",
        ],
    },
    "moogle-lance": {
        id: "moogle-lance",
        setId: "onslaught",
        name: "Moogle Lance",
        description: [
            "A trademark attack of the moogle knight. Able to strike even distant foes.",
        ],
    },
    "moogle-rush": {
        id: "moogle-rush",
        setId: "onslaught",
        name: "Moogle Rush",
        description: [
            "Throws the user's entire body into one powerful attack. Deals heavy damage but has a reduced chance to hit.",
        ],
    },
    "moogle-shield": {
        id: "moogle-shield",
        setId: "onslaught",
        name: "Moogle Shield",
        description: [
            "Invoke an age-old ward to keep the target from harm. Renders target immune to next debuff.",
        ],
    },
    "moogle-aid": {
        id: "moogle-aid",
        setId: "onslaught",
        name: "Moogle Aid",
        description: [
            "Enter a state of inner calm, restoring the user's HP and purging debuffs.",
        ],
    },
    "moogle-disarm": {
        id: "moogle-disarm",
        setId: "onslaught",
        name: "Moogle Disarm",
        description: [
            "Strike a powerful blow, attempting to destroy a piece of the target's equipment.",
        ],
    },
    "ultima-charge": {
        id: "ultima-charge",
        setId: "onslaught",
        name: "Ultima Charge",
        description: [
            "Derived from the most powerful of magicks, this is the ultimate onslaught ability.",
        ],
    },
    "red-spring": {
        id: "red-spring",
        setId: "clockwork",
        name: "Red Spring",
        description: [
            "An ingenious contraption that casts Haste. Where it lands, nobody knows...",
        ],
    },
    "blue-screw": {
        id: "blue-screw",
        setId: "clockwork",
        name: "Blue Screw",
        description: [
            "An ingenious contraption that casts Dispel. Where it lands, nobody knows...",
        ],
    },
    "green-gear": {
        id: "green-gear",
        setId: "clockwork",
        name: "Green Gear",
        description: [
            "An ingenious contraption that POISONS its victims. Where it lands, nobody knows...",
        ],
    },
    "silver-disc": {
        id: "silver-disc",
        setId: "clockwork",
        name: "Sivler Disc",
        description: [
            "An ingenious contraption that BLINDS its victims. Where it lands, nobody knows...",
        ],
    },
    "gold-battery": {
        id: "gold-battery",
        setId: "clockwork",
        name: "Gold Battery",
        description: [
            "An ingenious contraption that heals wounds. Where it lands, nobody knows...",
        ],
    },
    "black-ingot": {
        id: "black-ingot",
        setId: "clockwork",
        name: "Black Ingot",
        description: [
            "An ingenious contraption that DOOMS its victims. Where it lands, nobody knows...",
        ],
    },
    "chroma-gem": {
        id: "chroma-gem",
        setId: "clockwork",
        name: "Chroma Gem",
        description: [
            "An ingenious contraption that pits its victims to SLEEP. Where it lands, nobody knows...",
        ],
    },
    "gold-moogletron": {
        id: "gold-moogletron",
        setId: "clockwork",
        name: "Gold Moogletron",
        description: [
            "An ingenious contraption that casts Barrier. Where it lands, nobody knows...",
        ],
    },
    scream: {
        id: "scream",
        setId: "savagery",
        name: "Scream",
        description: [
            "Let out a blood curdling scream that removes buffs from surrounding units.",
        ],
    },
    "hone-senses": {
        id: "hone-senses",
        setId: "savagery",
        name: "Hone Senses",
        description: [
            "Sharpen the user's senses, raising CRITICAL HIT rate.",
        ],
    },
    furore: {
        id: "furore",
        setId: "savagery",
        name: "Furore",
        description: [
            "A violent attack that damages and knocks back surrounding units.",
        ],
    },
    "ground-shaker": {
        id: "ground-shaker",
        setId: "savagery",
        name: "Ground Shaker",
        description: [
            "Smash the ground, sending a shock wave radiating from the unit. Deal earth damage.",
        ],
    },
    "smite-of-rage": {
        id: "smite-of-rage",
        setId: "savagery",
        name: "Smite of Rage",
        description: [
            "Focus the user's rage into a devastating attack. Deals damage and inflicts various debuff.",
        ],
    },
    "inner-calm": {
        id: "inner-calm",
        setId: "savagery",
        name: "Inner Calm",
        description: [
            "Center the user's thoughts, raising EVASION.",
        ],
    },
    "helm-smash": {
        id: "helm-smash",
        setId: "savagery",
        name: "Helm Smash",
        description: [
            "A fierce attack aimed at the target's head. Deals damage and may destroy the target's helm.",
        ],
    },
    smash: {
        id: "smash",
        setId: "savagery",
        name: "Smash",
        description: [
            "Launch a focused strike at the target. Deals damage and may destroy the target's accessory.",
        ],
    },
    "sten-needle": {
        id: "sten-needle",
        setId: "survivalism",
        name: "Sten Needle",
        description: [
            "Set a trap that fires a burst of needles. Deals damage to the unit that springs it.",
        ],
    },
    "silence-gas": {
        id: "silence-gas",
        setId: "survivalism",
        name: "Silence Gas",
        description: [
            "Set a trap that releases a choking gas. SILENCES the unit that springs it.",
        ],
    },
    leech: {
        id: "leech",
        setId: "survivalism",
        name: "Leech",
        description: [
            "Set a trap filled with leeches. The leeches feed on the MP of the unit that springs it.",
        ],
    },
    "love-potion": {
        id: "love-potion",
        setId: "survivalism",
        name: "Love Potion",
        description: [
            "Set a trap laced with a potent love potion. CHARMS the unit that springs it.",
        ],
    },
    "mirror-items": {
        id: "mirror-items",
        setId: "survivalism",
        name: "Mirror Items",
        description: [
            "Use items to deliver the opposite of their usual effects.",
        ],
    },
    camouflage: {
        id: "camouflage",
        setId: "survivalism",
        name: "Camouflage",
        description: [
            "Disguise the unit to blend in to the surrounding terrain. INVISIBLE units cannot be the target of enemy attacks.",
        ],
    },
    awareness: {
        id: "awareness",
        setId: "survivalism",
        name: "Awareness",
        description: [
            "Reveals the location of traps and invisible units.",
        ],
    },
    "life-bond": {
        id: "life-bond",
        setId: "survivalism",
        name: "Life Bond",
        description: [
            "Share the user's HP with the target. Restores the target's HP, but damages the user.",
        ],
    },
    "critical-vanish": {
        id: "critical-vanish",
        setId: "reaction",
        name: "Critical: Vanish",
        description: [
            "Become INVISIBLE when user becomes HP Critical.",
        ],
    },
    "avoid-traps": {
        id: "avoid-traps",
        setId: "passive",
        name: "Avoid Traps",
        description: [
            "The user will not spring traps.",
        ],
    },
    souleater: {
        id: "souleater",
        setId: "astutia",
        name: "Souleater",
        description: [
            "Sacrifice the user's HP to deal dark damage to the target.",
        ],
    },
    "sword-of-darkness": {
        id: "sword-of-darkness",
        setId: "astutia",
        name: "Sword of Darkness",
        description: [
            "Steal the target's life force. Restores HP to the unit.",
        ],
    },
    "sword-of-light": {
        id: "sword-of-light",
        setId: "astutia",
        name: "Sword of Light",
        description: [
            "Steal the target's magickal energy. Restores MP to the unit.",
        ],
    },
    "haunting-vision": {
        id: "haunting-vision",
        setId: "astutia",
        name: "Haunting Vision",
        description: [
            "Show the target a vision from their darkest dreams. Deals damage and BLINDS the target.",
        ],
    },
    block: {
        id: "block",
        setId: "astutia",
        name: "Block",
        description: [
            "Conjure a magickal shield around units in a small area. Raises DEFENSE.",
        ],
    },
    strike: {
        id: "strike",
        setId: "astutia",
        name: "Strike",
        description: [
            "Temporarily grants extensive anatomical knowledge that can be used to carefully target attacks. Raises the CRITICAL HIT rate of units in a small area.",
        ],
    },
    charge: {
        id: "charge",
        setId: "astutia",
        name: "Charge",
        description: [
            "Magickally strengthen the unit for a single rush attack. Deals damage and knocks the target back. May also destroy the target's armor.",
        ],
    },
    "razzle-dazzle": {
        id: "razzle-dazzle",
        setId: "astutia",
        name: "Razzle-Dazzle",
        description: [
            "Absorb the life force of surrounding units. Restores HP.",
        ],
    },
    pickpocket: {
        id: "pickpocket",
        setId: "brutality",
        name: "Pickpocket",
        description: [
            "Deftly steal gil from the target without arousing suspicion.",
        ],
    },
    "strong-arm": {
        id: "strong-arm",
        setId: "brutality",
        name: "Strong-Arm",
        description: [
            "Rough up the target. Deals damage and steals an item.",
        ],
    },
    pillage: {
        id: "pillage",
        setId: "brutality",
        name: "Pillage",
        description: [
            "Brutalize the target. Deals damage and steal armor.",
        ],
    },
    tsunami: {
        id: "tsunami",
        setId: "brutality",
        name: "Tsunami",
        description: [
            "Send a giant wave crashing on units in a large area. Deals water damage and depletes MP. Only useable in water.",
        ],
    },
    "gil-snapper": {
        id: "gil-snapper",
        setId: "reaction",
        name: "Gil Snapper",
        description: [
            "Obtain gil after receiving a critical hit.",
        ],
    },
    "shining-flare": {
        id: "shining-flare",
        setId: "geomancy",
        name: "Shining Flare",
        description: [
            "Focus the scorching heat of the sun on your foes. Deals fire damage to units in a small area. Can only be used when the sun is shining.",
        ],
    },
    "venom-squall": {
        id: "venom-squall",
        setId: "geomancy",
        name: "Venom Squall",
        description: [
            "Deals water damage and POISONS target. Can only be used when it's raining.",
        ],
    },
    avalanche: {
        id: "avalanche",
        setId: "geomancy",
        name: "Avalanche",
        description: [
            "Ravage foes with a howling snowstorm. Deals ice damage and puts units in a small area to SLEEP. Can only be used when it's snowing.",
        ],
    },
    "mist-storm": {
        id: "mist-storm",
        setId: "geomancy",
        name: "Mist Storm",
        description: [
            "Summon a tempest of seething Mist. Deals damage and depletes MP of units in a small area. Can only be used when the Mist grows thick.",
        ],
    },
    "natures-embrace": {
        id: "natures-embrace",
        setId: "geomancy",
        name: "Nature's Embrace",
        description: [
            "Call upon the power of nature to attack the target. User must be standing on natural terrain.",
        ],
    },
    "artifices-embrace": {
        id: "artifices-embrace",
        setId: "geomancy",
        name: "Artifice's Embrace",
        description: [
            "Call upon the power of the works of Man. Deals damage and SLOWS target. User must be standing on artificial terrain.",
        ],
    },
    "lifes-embrace": {
        id: "lifes-embrace",
        setId: "geomancy",
        name: "Life's Embrace",
        description: [
            "Call upon the power of the living earth. Deals damage and IMMOBILIZES target. User must be standing on grass or the like.",
        ],
    },
    "earths-embrace": {
        id: "earths-embrace",
        setId: "geomancy",
        name: "Earth's Embrace",
        description: [
            "Call upon the power of soil and stone. Deals damage and DISABLES target. User must be standing on barren ground.",
        ],
    },
    "critical-evasion↑": {
        id: "critical-evasion↑",
        setId: "reaction",
        name: "Critical: Evasion↑",
        description: [
            "Gain EVASION when user becomes HP Critical.",
        ],
    },
    "resistance↑": {
        id: "resistance↑",
        setId: "passive",
        name: "Resistance↑",
        description: [
            "Raises RESISTANCE. Decrease magick damage received.",
        ],
    },
    "power-crush": {
        id: "power-crush",
        setId: "devastation",
        name: "Power Crush",
        description: [
            "Strike target with a crushing attack. Deals damage and lowers DEFENSE.",
        ],
    },
    "mind-crush": {
        id: "mind-crush",
        setId: "devastation",
        name: "Mind Crush",
        description: [
            "Send target reeling with a powerful blow. Deals damage and lowers RESISTANCE.",
        ],
    },
    "speed-crush": {
        id: "speed-crush",
        setId: "devastation",
        name: "Speed Crush",
        description: [
            "A quick, low strike. Deals damage and lowers SPEED.",
        ],
    },
    "soul-crush": {
        id: "soul-crush",
        setId: "devastation",
        name: "Soul Crush",
        description: [
            "A brutal attack that punishes body and mind. Deals damage and depletes MP.",
        ],
    },
    cyclone: {
        id: "cyclone",
        setId: "devastation",
        name: "Cyclone",
        description: [
            "Consume your foes in a gale of howling wind. Deals wind damage to units in a small area.",
        ],
    },
    "shield-bash": {
        id: "shield-bash",
        setId: "devastation",
        name: "Shield Bash",
        description: [
            "Strike target with the user's shield. DISABLES and knocks the target back.",
            "Requires: Shield.",
        ],
    },
    whirlwind: {
        id: "whirlwind",
        setId: "devastation",
        name: "Whirlwind",
        description: [
            "Slice target with scything gusts of magickal wind. Deals wind damage to one unit and CONFUSES target.",
        ],
    },
    "sweeping-spin": {
        id: "sweeping-spin",
        setId: "feralism",
        name: "Sweeping Spin",
        description: [
            "A forceful spin attack that damages surrounding units.",
        ],
    },
    "sneak-attack": {
        id: "sneak-attack",
        setId: "feralism",
        name: "Sneak Attack",
        description: [
            "An attack that deals varying damage based on the facing of the target.",
        ],
    },
    "full-assault": {
        id: "full-assault",
        setId: "feralism",
        name: "Full Assault",
        description: [
            "An extremely potent attack that gives no quarter. The effort leaves the unit is a state of deep SLEEP.",
        ],
    },
    overpower: {
        id: "overpower",
        setId: "feralism",
        name: "Overpower",
        description: [
            "Strike at the target from the sky. Bypasses reaction abilities.",
        ],
    },
    "battle-cry": {
        id: "battle-cry",
        setId: "feralism",
        name: "Battle Cry",
        description: [
            "Let out a fierce cry, rallying the unit to arms. Raises ATTACK but lowers DEFENSE.",
        ],
    },
    tenacity: {
        id: "tenacity",
        setId: "feralism",
        name: "Tenacity",
        description: [
            "An attack that deals more damage the more debuffs the unit has.",
        ],
    },
    "blast-wave": {
        id: "blast-wave",
        setId: "feralism",
        name: "Blast Wave",
        description: [
            "Loose battle's rage from the heavens to the earth. Damages units in a row extending from the caster.",
        ],
    },
    escort: {
        id: "escort",
        setId: "reconnaissance",
        name: "Escort",
        description: [
            '"I would lay down my life at a single word..."',
            "Take all damage directed at the target female unit until her next action.",
        ],
    },
    flourish: {
        id: "flourish",
        setId: "reconnaissance",
        name: "Flourish",
        description: [
            '"If it is a fight you want, you shall have it..."',
            "Why just attack, when you can attack with a flourish? Deals additional damage if there are female units in the battle party.",
        ],
    },
    fawn: {
        id: "fawn",
        setId: "reconnaissance",
        name: "Fawn",
        description: [
            '"A rose on the battlefield is a thing of beauty, no?"',
            "Flattery will get you everywhere. Grants REGEN and ASTRA to target female unit.",
        ],
    },
    enchant: {
        id: "enchant",
        setId: "reconnaissance",
        name: "Enchant",
        description: [
            '"Lend me your strength, my lady."',
            "Whisper sweet nothing to target female unit. CHARMS foes and raises allies' ATTACK.",
        ],
    },
    interrogate: {
        id: "interrogate",
        setId: "reconnaissance",
        name: "Interrogate",
        description: [
            '"What do my little birds have to say?"',
            "Reveal the loot and items the target is carrying. Also reveals the location of traps and invisible units.",
        ],
    },
    succor: {
        id: "succor",
        setId: "reconnaissance",
        name: "Succor",
        description: [
            '"A moment\'s rest for the weary."',
            "Take a brief break from the battle. Restores HP and removes debuffs.",
        ],
    },
    impassion: {
        id: "impassion",
        setId: "reconnaissance",
        name: "Impassion",
        description: [
            '"It\'s all in the wrist."',
            "Talk the target into a BERSERK frenzy. Also raises target's chance to score a CRITICAL HIT.",
        ],
    },
    "reckless-abandon": {
        id: "reckless-abandon",
        setId: "reconnaissance",
        name: "Reckless Abandon",
        description: [
            '"Time to take off the proverbial gloves."',
            "An attack that holds nothing back. Lowers target's SPEED.",
            "Requires: Gun.",
        ],
    },
    requiem: {
        id: "requiem",
        setId: "song",
        name: "Requiem",
        description: [
            "Lift up a song of prayer, that the dead may know true rest. Deals heavy damage to undead.",
        ],
    },
    hide: {
        id: "hide",
        setId: "song",
        name: "Hide",
        description: [
            "Cloak the unit in the words of a magick chant. INVISIBLE units cannot be the target of enemy attacks.",
        ],
    },
    angelsong: {
        id: "angelsong",
        setId: "song",
        name: "Angelsong",
        description: [
            "A song of restoration sung by angels in the heavens. Grants Regen to an ally.",
        ],
    },
    "battle-chant": {
        id: "battle-chant",
        setId: "song",
        name: "Battle Chant",
        description: [
            "A hearty chant that emboldens even the timid. Raises target's DEFENSE.",
        ],
    },
    "magickal-refrain": {
        id: "magickal-refrain",
        setId: "song",
        name: "Magickal Refrain",
        description: [
            "A mystic song from times forgotten. Raises target's RESISTANCE.",
        ],
    },
    "nameless-song": {
        id: "nameless-song",
        setId: "song",
        name: "Nameless Song",
        description: [
            "A peculiar melody penned by an unknown bard. Grants random buffs to units in a small area.",
        ],
    },
    "magick-ballad": {
        id: "magick-ballad",
        setId: "song",
        name: "Magick Ballad",
        description: [
            "Restores 10 MP in an area.",
        ],
    },
    "soul-etude": {
        id: "soul-etude",
        setId: "song",
        name: "Soul Etude",
        description: [
            "A ballad that sings of life and all its wonders. Restores HP and removes debuffs from units in a in a small area.",
        ],
    },
    "mincing-minuet": {
        id: "mincing-minuet",
        setId: "dance",
        name: "Mincing Minuet",
        description: [
            "Attack without missing a step.",
        ],
    },
    "blade-dance": {
        id: "blade-dance",
        setId: "dance",
        name: "Blade Dance",
        description: [
            "Swing blade in a fluid motion, striking target with two hits in quick succession.",
            "Requires: Bladed Weapon.",
        ],
    },
    "forbidden-dance": {
        id: "forbidden-dance",
        setId: "dance",
        name: "Forbidden Dance",
        description: [
            "A dance whose name dare not be spoken for fear of the otherworldly powers it make awake. Afflicts target with random debuffs.",
        ],
    },
    "slow-dance": {
        id: "slow-dance",
        setId: "dance",
        name: "Slow Dance",
        description: [
            "A languid dance that SLOWS the target's actions.",
        ],
    },
    "witch-hunt": {
        id: "witch-hunt",
        setId: "dance",
        name: "Witch Hunt",
        description: [
            "The bane of mage and sorcerer. Depletes target's MP.",
        ],
    },
    polka: {
        id: "polka",
        setId: "dance",
        name: "Polka",
        description: [
            "To look on this dance in to know despair. Lowers ATTACK of units in a small area.",
        ],
    },
    "heathen-frolic": {
        id: "heathen-frolic",
        setId: "dance",
        name: "Heathen Frolic",
        description: [
            "A lurid, distracting dance. Lowers MAGICK of units in a small area.",
        ],
    },
    jitterbug: {
        id: "jitterbug",
        setId: "dance",
        name: "Jitterbug",
        description: [
            "A passionate dance to melt the coldest heart. Steals HP from the target.",
        ],
    },
    "gold-hourglass": {
        id: "gold-hourglass",
        setId: "turning",
        name: "Gold Hourglass",
        description: [
            "Deal damage to all foes and afflicts them with SLOW.",
        ],
    },
    "otherworldly-wind": {
        id: "otherworldly-wind",
        setId: "turning",
        name: "Otherworldly Wind",
        description: [
            "Send a powerful magewind tearing through all foes.",
        ],
    },
    "dark-elixir": {
        id: "dark-elixir",
        setId: "turning",
        name: "Dark Elixir",
        description: [
            "Overcome the target's body and mind with nether energies. Reduces HP and MP to single digits.",
        ],
    },
    shadowflare: {
        id: "shadowflare",
        setId: "turning",
        name: "Shadowflare",
        description: [
            "Deals massive non-elemental damage to all foes.",
        ],
    },
    "soul-spring": {
        id: "soul-spring",
        setId: "turning",
        name: "Soul Spring",
        description: [
            "Drains the target's vital and magickal energy to restore the unit.",
        ],
    },
    "light-curtain": {
        id: "light-curtain",
        setId: "turning",
        name: "Light Curtain",
        description: [
            "Wrap all allies in a curtain of magickal light. Grants HASTE and PROTECT.",
        ],
    },
    "veil-of-darkness": {
        id: "veil-of-darkness",
        setId: "turning",
        name: "Veil of Darkness",
        description: [
            "Cast a veil of impenetrable darkness, reducing the MP of all foes to 0.",
        ],
    },
    "flash-bomb": {
        id: "flash-bomb",
        setId: "turning",
        name: "Flash Bomb",
        description: [
            "Set off an explosion that damages and nullifies the reaction abilities of the target.",
        ],
    },
    wermut: {
        id: "wermut",
        setId: "instinct",
        name: "Wermut",
        description: [
            "Send a shock wave of energy tearing through foes. Damages and SLOWS the target.",
        ],
    },
    nesiaam: {
        id: "nesiaam",
        setId: "instinct",
        name: "Nesiaam",
        description: [
            "Throw the enemy's mind into disarray. Damages and ADDLES the target.",
        ],
    },
    lennart: {
        id: "lennart",
        setId: "instinct",
        name: "Lennart",
        description: [
            "Send out a pulse of brilliant light, damaging all in its path.",
        ],
    },
    hilo: {
        id: "hilo",
        setId: "instinct",
        name: "Hilo",
        description: [
            "Damage and Confuse status at a range.",
        ],
    },
    elpe: {
        id: "elpe",
        setId: "instinct",
        name: "Elpe",
        description: [
            "Sacrifice unit to revive and fully heal all allies.",
        ],
    },
    viola: {
        id: "viola",
        setId: "instinct",
        name: "Viola",
        description: [
            "Manifest the user's suffering in a burst of energy, damaging units in a small area. The lower the user's HP, the greater the damage dealt.",
        ],
    },
    ljda: {
        id: "ljda",
        setId: "instinct",
        name: "Ljda",
        description: [
            "Entice your foe with the softest of whispers. CHARMS the target.",
        ],
    },
    adelaide: {
        id: "adelaide",
        setId: "instinct",
        name: "Adelaide",
        description: [
            "Grants Regen to either self or a nearby ally.",
        ],
    },
    "time-blade": {
        id: "time-blade",
        setId: "guile",
        name: "Time Blade",
        description: [
            "Temporarily sever the target from time's flow. Damages the target and delays its next turn.",
        ],
    },
    saber: {
        id: "saber",
        setId: "guile",
        name: "Saber",
        description: [
            "Waken the user's latent powers. Raises Attack power and Accuracy of user.",
        ],
    },
    "dimensional-rift": {
        id: "dimensional-rift",
        setId: "guile",
        name: "Dimensional Rift",
        description: [
            "Tears holes in the fabric of time. Reduces the HP of units in a large area by 75%.",
        ],
    },
    "abyssal-slash": {
        id: "abyssal-slash",
        setId: "guile",
        name: "Abyssal Slash",
        description: [
            "Summon a vision of the great abyss above the battlefield, maddening all who gaze into its depths. Damages and STOPS targets.",
        ],
    },
    annul: {
        id: "annul",
        setId: "guile",
        name: "Annul",
        description: [
            "A brilliant light dances from the user's fingertips to the target. Completely depletes the target's MP.",
        ],
    },
    rebirth: {
        id: "rebirth",
        setId: "guile",
        name: "Rebirth",
        description: [
            "Infuse the user's body with Mist. Fully restores the user's HP and removes all debuffs.",
        ],
    },
    sheol: {
        id: "sheol",
        setId: "guile",
        name: "Sheol",
        description: [
            "Shift the sands of time in the user's favor. Slow and Immobilize for all foes, Haste and Regen for all allies.",
        ],
    },
    impervious: {
        id: "impervious",
        setId: "passive",
        name: "Impervious",
        description: [
            "Immune to debuffs.",
        ],
    },
    "trophy-hunt": {
        id: "trophy-hunt",
        setId: "piracy",
        name: "Trophy Hunt",
        description: [
            "A weak attack that nonetheless yields the highest level loot should it fell the target.",
        ],
    },
    "shadow-stalk": {
        id: "shadow-stalk",
        setId: "piracy",
        name: "Shadow Stalk",
        description: [
            "Strike at your target from the shadows. Bypasses reaction abilities.",
        ],
    },
    salvage: {
        id: "salvage",
        setId: "piracy",
        name: "Salvage",
        description: [
            "Disarm traps surrounding the unit. Any traps disarmed in the process yield loot.",
        ],
    },
    "life-of-crime": {
        id: "life-of-crime",
        setId: "piracy",
        name: "Life of Crime",
        description: [
            "For sky pirates, crime pays. Deals damage based on the number of times the unit has used the Steal command.",
        ],
    },
    steal: {
        id: "steal",
        setId: "piracy",
        name: "Steal",
        description: [
            "Steal target's items, gil, or loot.",
        ],
    },
    swipe: {
        id: "swipe",
        setId: "piracy",
        name: "Swipe",
        description: [
            "Pick the target's pocket with blinding speed. Steals a large quantity of gil.",
        ],
    },
    "razors-edge": {
        id: "razors-edge",
        setId: "piracy",
        name: "Razor's Edge",
        description: [
            "Place the unit in a heightened state of awareness. Raises EVASION.",
        ],
    },
    flee: {
        id: "flee",
        setId: "piracy",
        name: "Flee",
        description: [
            "Enable the unit to flee its attacker by boosting MOVE and JUMP.",
        ],
    },
    vigilance: {
        id: "vigilance",
        setId: "passive",
        name: "Vigilance",
        description: [
            "Attacks from the user's back or sides deal normal damage.",
        ],
    },
    /* Template y8y
    : {
        id: "",
        setId: "",
        name: "",
        description: [
            "",
        ],
    },
    */
};

