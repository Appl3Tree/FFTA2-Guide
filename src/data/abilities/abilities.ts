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
        description: "."
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
        name: "Choco Cure",
        description: [
            "Restores HP.",
        ],
    },
        "choco-esuna": {
        id: "choco-esuna",
        setId: "chocobo-wiles",
        name: "Choco Esuna",
        description: [
            "Removes debuffs.",
        ],
    },
        "choco-flame": {
        id: "choco-flame",
        setId: "chocobo-wiles",
        name: "Choco Flame",
        description: [
            "Deals Fire damage to one enemy, ignoring Defense rating.",
        ],
    },
        "choco-meteor": {
        id: "choco-meteor",
        setId: "chocobo-wiles",
        name: "Choco Meteor",
        description: [
            "Deals heavy area damage.",
        ],
    },
        "choco-beak": {
        id: "choco-beak",
        setId: "chocobo-wiles",
        name: "Choco Beak",
        description: [
            "Deals damage to one foe.",
        ],
    },
        "choco-recharge": {
        id: "choco-recharge",
        setId: "chocobo-wiles",
        name: "Choco Recharge",
        description: [
            "Restores MP.",
        ],
    },
        "choco-guard": {
        id: "choco-guard",
        setId: "chocobo-wiles",
        name: "Choco Guard",
        description: [
            "Bestows Regen and increases Defense and Magick Resistance.",
        ],
    },
        "choco-barrier": {
        id: "choco-barrier",
        setId: "chocobo-wiles",
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
        name: "Fire Breath",
        description: [
            "Deals Fire damage in an area.",
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
        name: "Ice Breath",
        description: [
            "Deals Ice damage in an area.",
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
        name: "Thunder Breath",
        description: [
            "Deals Lightning damage in one area.",
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
        name: "En Garde",
        description: [
            "Enters a defensive state and counters all attacks in range.",
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
        name: "Cure",
        description: [
            "Magickally bind the target's wounds. Restores HP and deals damage to undead.",
        ],
    },
    cura: {
        id: "cura",
        setId: "white-magick",
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
        name: "Esuna",
        description: [
            "Magickally purge the target of debuffs.",
        ],
    },
    raise: {
        id: "raise",
        setId: "white-magick",
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
        name: "Fire",
        description: [
            "Hurl a ball of magick fire, deal fire damage to the target.",
        ],
    },
    fira: {
        id: "fira",
        setId: "black-magick",
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
        name: "Thunder",
        description: [
            "Call down a bolt of lightning, deal lightning damage to the target.",
        ],
    },
    thundara: {
        id: "thundara",
        setId: "black-magick",
        name: "Thundara",
        description: [
            "An improved version of Thunder. Deals even greater lightning damage to its targets.",
        ],
    },
    thundaga: {
        id: "thundaga",
        setId: "black-magick",
        name: "Thundaga",
        description: [
            "The greatest Thunder magick. Blasts its target with countless bolts, dealing massive lightning damage.",
        ],
    },
    blizzard: {
        id: "blizzard",
        setId: "black-magick",
        name: "Blizzard",
        description: [
            "Pierce target with a shard of ice, deal ice damage to the target.",
        ],
    },
    blizzara: {
        id: "blizzara",
        setId: "black-magick",
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
            "Lowers resistance to the user's elemental attacks. (Absorb > Immune > Half > Normal > Weak)",
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
    /*"magick-hammer": {
        id: "magick-hammer",
        setId: "blue-magick",
        name: "Magick Hammer",
        description: [
            "Deals MP damage to target.",
            "Learned from Baknamykind.",
        ],
    },
    /* Template y8y
    : {
        id: "",
        setId: "",
        name: "",
        description: [
            ".",
        ],
    },
    */
};

