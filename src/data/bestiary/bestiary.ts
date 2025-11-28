// src/data/bestiary/bestiary.ts

export type EnemyId = string;

export interface EnemyMeta {
    id: EnemyId,
    job: string,
    description: string;
    absorb: string[];
    immune: string[];
    half: string[];
    weak: string[];
};

export const ENEMIES: Record<EnemyId, EnemyMeta> = {
    ahriman: {
        id: 'ahriman',
        job: 'Ahriman',
        description: "The Ahriman's evil stare afflicts those it lights upon with a variety of ailments.",
        absorb: ["Dark"],
        immune: null,
        half: null,
        weak: ["Holy"]
    },
    plague: {
        id: 'plague',
        job: 'Plague',
        description: "The gaze of this giant eye can freeze foes where they stand.",
        absorb: ["Dark"],
        immune: null,
        half: null,
        weak: ["Holy"]
    },
    "evil-eye": {
        id: 'evil-eye',
        job: 'Evil Eye',
        description: "Evil Eyes only appear in Brightmoon Tor. They also have the Brightmoon Tor secondary ability skillset of Turning.",
        absorb: ["Dark"],
        immune: null,
        half: null,
        weak: ["Holy"]
    },
    antlion: {
        id: 'antlion',
        job: 'Antlion',
        description: "This pit beast has needlelike limbs and powerful jaws.",
        absorb: ["Earth"],
        immune: null,
        half: null,
        weak: ["Air"]
    },
    "pit-beast": {
        id: 'pit-beast',
        job: 'Pit Beast',
        description: "This pit beast expels gastric acids on its victims, dissolving them for later consumption.",
        absorb: ["Earth"],
        immune: null,
        half: null,
        weak: ["Air"]
    },
    baknamy: {
        id: 'baknamy',
        job: 'Baknamy',
        description: 'Members of this race are seldom seen without their distinguishing masks. What they lack in intelligence they make up for in aggression.',
        absorb: null,
        immune: null,
        half: null,
        weak: null
    },
    luchorpan: {
        id: 'luchorpan',
        job: 'Luchorpan',
        description: 'This variety of Baknamy boasts a broad range of physical and magick attacks.',
        absorb: null,
        immune: null,
        half: null,
        weak: null
    },
    pavilsag: {
        id: 'pavilsag',
        job: 'Pavilsag',
        description: 'Pavilsags only appear in Brightmoon Tor. They also have the Brightmoon Tor secondary ability skillset of Turning.',
        absorb: null,
        immune: null,
        half: null,
        weak: null
    },
    behemoth: {
        id: 'behemoth',
        job: 'Behemoth',
        description: 'This fell beast has a long flowing mane and terrible claws that sunder steel with ease.',
        absorb: null,
        immune: null,
        half: null,
        weak: ["Ice"]
    },
    reaver: {
        id: 'reaver',
        job: 'Reaver',
        description: 'A creature of the spirit world whose cruelty knows no bounds. Blood stains its gruesome claws.',
        absorb: null,
        immune: null,
        half: null,
        weak: ["Earth"]
    },
    "mutadragon-red": {
        id: 'mutadragon-red',
        job: 'Mutadragon',
        description: 'Often called the guardian of the earth, this dragon stirs for the first time in many years.',
        absorb: null,
        immune: null,
        half: null,
        weak: ["Earth"]
    },
    "dark-behemoth": {
        id: 'dark-behemoth',
        job: 'Dark Behemoth',
        description: "Dark Behemoths appear in Brightmoon Tor's third location and can have the secondary set of Turning.",
        absorb: ["?"],
        immune: ["?"],
        half: ["?"],
        weak: ["?"]
    },
    bomb: {
        id: 'bomb',
        job: 'Bomb',
        description: "Red flame envolopes this strange monster. It absorbs fire's heat, adding it to its own.",
        absorb: ["Fire"],
        immune: null,
        half: null,
        weak: ["Ice"]
    },
    grenade: {
        id: 'grenade',
        job: 'Grenade',
        description: "This powerful member of the bomb family burns with a searing blue flame.",
        absorb: ["Fire"],
        immune: null,
        half: null,
        weak: ["Water"]
    },
    chocobo: {
        id: 'chocobo',
        job: 'Chocobo',
        description: "A bird-like creature witha  pleasant temperament. Its choco cure can mend the wounds of its allies.",
        absorb: null,
        immune: null,
        half: null,
        weak: ["Lightning", "Holy"]
    },
    "red-chocobo": {
        id: 'red-chocobo',
        job: 'red-chocobo',
        description: "The red-plumed chocobo rains destruction from the skies with its choco meteor.",
        absorb: null,
        immune: null,
        half: null,
        weak: ["Lightning", "Holy"]
    },
    "black-chocobo": {
        id: 'black-chocobo',
        job: 'Black Chocobo',
        description: "The black-plumed chocobo is the only variety capable of flight.",
        absorb: null,
        immune: null,
        half: null,
        weak: ["Lightning", "Holy"]
    },
    "green-chocobo": {
        id: 'green-chocobo',
        job: 'Green Chocobo',
        description: "The green-plumbed chocobo removes ailiments from its allies using choco esuna.",
        absorb: null,
        immune: null,
        half: null,
        weak: ["Lightning", "Holy"]
    },
    "brown-chocobo": {
        id: 'brown-chocobo',
        job: 'Brown Chocobo',
        description: "This brown-plumed chocobo protects the flock with its choco guard.",
        absorb: null,
        immune: null,
        half: null,
        weak: ["Lightning", "Holy"]
    },
    "white-chocobo": {
        id: 'white-chocobo',
        job: 'White Chocobo',
        description: "The white-plumed chocobo restores magickal power with its choco recharge.",
        absorb: null,
        immune: null,
        half: null,
        weak: ["Lightning", "Holy"]
    },
    cockatrice: {
        id: 'cockatrice',
        job: 'Cockatrice',
        description: 'An avian creature with a violent temperament. It pecks at its foes with a razor-edged beak.',
        absorb: null,
        immune: null,
        half: null,
        weak: ["Water"]
    },
    axebeak: {
        id: 'axebeak',
        job: 'Axebeak',
        description: "This relative of the cockatrice intimidates its foes with a display of its brilliantly hued wings.",
        absorb: null,
        immune: null,
        half: null,
        weak: ["Water"]
    },
    cluckatrice: {
        id: 'cluckatrice',
        job: 'Cluckatrice',
        description: "This variety of cockatrice is covered in snow white feathers. A rare bird, seldom seen.",
        absorb: ["Air"],
        immune: null,
        half: null,
        weak: ["Earth"]
    },
    blackwind: {
        id: 'blackwind',
        job: 'Blackwind',
        description: "Blackwinds only appear in Brightmoon Tor. They also have the Brightmoon Tor secondary ability skillset of Turning.",
        absorb: null,
        immune: null,
        half: null,
        weak: ["Water"]
    },
    crushatrice: {
        id: 'crushatrice',
        job: 'Crushatrice',
        description: 'A cockatrice of prodigious size. It uses its massive bulk as a weapon.',
        absorb: null,
        immune: null,
        half: null,
        weak: null
    },
    mamatrice: {
        id: 'mamatrice',
        job: 'Mamatrice',
        description: "This variety of cockatrice is covered in snow white feathers. A rare bird, seldom seen.",
        absorb: null,
        immune: null,
        half: null,
        weak: null
    },
    cerayn: {
        id: 'cerayn',
        job: 'Cerayn',
        description: "Glistening black plumage covers this monster. It rips and tears into all those who would do it harm.",
        absorb: null,
        immune: null,
        half: null,
        weak: null
    },
    deathscythe: {
        id: 'deathscythe',
        job: 'Deathscythe',
        description: "A reaper from the land of the dead. It harvests its victim with scythe-like claws.",
        absorb: ["Dark"],
        immune: null,
        half: null,
        weak: ["Holy"]
    },
    oversoul: {
        id: 'oversoul',
        job: 'Oversoul',
        description: "A demon that harvests souls for the lord of the dead.",
        absorb: ["Dark"],
        immune: null,
        half: null,
        weak: ["Holy"]
    },
    "demon-wall": {
        id: 'demon-wall',
        job: 'Demon Wall',
        description: "A trap built long ago to ward off intruders. It pursues its quarry relentlessly, grinding their bones to dust.",
        absorb: null,
        immune: null,
        half: null,
        weak: ["Holy"]
    },
    "fire-drake": {
        id: 'fire-drake',
        job: 'Fire Drake',
        description: "Scales cover the body of this migty wyrm. Its breath scorches the earth.",
        absorb: ["Fire"],
        immune: null,
        half: null,
        weak: ["Ice"]
    },
    "ice-drake": {
        id: 'ice-drake',
        job: 'Ice Drake',
        description: "Scales cover the body of this mighty wyrm. Its breath chills the air.",
        absorb: ["Ice"],
        immune: null,
        half: null,
        weak: ["Fire"]
    },
    "thunder-drake": {
        id: 'thunder-drake',
        job: 'Thunder Drake',
        description: "Scales cover the body of this mighty wyrm. Its breath dances with sparks.",
        absorb: ["Lightning"],
        immune: null,
        half: null,
        weak: ["Water"]
    },
    "mutadragon-purple": {
        id: 'mutadragon-purple',
        job: 'Mutadragon',
        description: "Often called the guardian of the earth, this dragon stirs for the first time in many years.",
        absorb: ["Fire"],
        immune: null,
        half: null,
        weak: ["Ice"]
    },
    varigarmanda: {
        id: 'varigarmanda',
        job: 'Varigarmanda',
        description: "Varigarmandas only appear in Brightmoon Tor.",
        absorb: ["Ice"],
        immune: null,
        half: null,
        weak: ["Fire"]
    },
    nagaraja: {
        id: 'nagaraja',
        job: 'Nagaraja',
        description: "This powerful drake breathes gouts of dark flame that sow misery and despair.",
        absorb: ["Dark"],
        immune: null,
        half: ["Fire", "Ice", "Lightning"],
        weak: ["Holy"]
    },
    jormungand: {
        id: 'jormungand',
        job: 'Jormungand',
        description: "This powerful drake breathes gouts of dark flame that sow misery and despair.",
        absorb: null,
        immune: null,
        half: null,
        weak: null
    },
    nidhogg: {
        id: 'nidhogg',
        job: 'Nidhogg',
        description: "The fangs of this powerful drake are harder than any metal worked by hand of man.",
        absorb: ["Dark"],
        immune: null,
        half: ["Fire", "Ice", "Lightning"],
        weak: ["Holy"]
    },
    asp: {
        id: 'asp',
        job: 'Asp',
        description: "Brilliant golden scales armor of this close relative of a nidhogg. A fearsome creature.",
        absorb: ["Dark"],
        immune: null,
        half: ["Fire", "Ice", "Lightning"],
        weak: ["Holy"]
    },
    opion: {
        id: 'opion',
        job: 'Opion',
        description: "The fangs of this powerful drake are harder than any metal worked by hand of man.",
        absorb: null,
        immune: null,
        half: null,
        weak: null
    },
    zahak: {
        id: 'zahak',
        job: 'Zahak',
        description: "Even demons tremble before the might of this great drake.",
        absorb: ["Dark"],
        immune: null,
        half: ["Fire", "Ice", "Lightning"],
        weak: ["Holy"]
    },
    "mutadragon-white": {
        id: 'mutadragon-white',
        job: 'Mutadragon',
        description: "Often called the guardian of the earth, this dragon stirs for the first time in many years.",
        absorb: ["Dark"],
        immune: null,
        half: ["Fire", "Ice", "Lightning"],
        weak: ["Holy"]
    },
    tiamat: {
        id: 'tiamat',
        job: 'Tiamat',
        description: "Tiamats only appear in Brightmoon Tor. They also have the Brightmoon Tor secondary ability skillset of Turning.",
        absorb: ["Dark"],
        immune: null,
        half: ["Fire", "Ice", "Lightning"],
        weak: ["Holy"]
    },
    dreamhare: {
        id: 'dreamhare',
        job: 'Dreamhare',
        description: "Cute creatures with large, fluffy tails. They remain docile unless provoked.",
        absorb: ["Holy"],
        immune: null,
        half: null,
        weak: ["Fire"]
    },
    "happy-bunny": {
        id: 'happy-bunny',
        job: 'Happy Bunny',
        description: "These seemingly harmless creatures strike at predators with bounding attacks.",
        absorb: ["Holy"],
        immune: null,
        half: null,
        weak: ["Fire"]
    },
    mooglebane: {
        id: 'mooglebane',
        job: 'Mooglebane',
        description: "Moogles have no greater fear. Do not be taken in by their cute and cuddle appearance.",
        absorb: ["Holy"],
        immune: null,
        half: null,
        weak: ["Fire"]
    },
    fury: {
        id: 'fury',
        job: 'Fury',
        description: "A spirit born of rage, taking a beast as its host. Its only impulse is to spread destruction.",
        absorb: ["Holy"],
        immune: null,
        half: null,
        weak: ["Fire"]
    },
    "red-marshmallow": {
        id: 'red-marshmallow',
        job: 'Red Marshmallow',
        description: "This gelatinous red monster absorbs fire.",
        absorb: ["Fire"],
        immune: null,
        half: null,
        weak: ["Ice"]
    },
    "ice-flan": {
        id: 'ice-flan',
        job: 'Ice Flan',
        description: "This gelatinous blue monster absorbs ice.",
        absorb: ["Ice"],
        immune: null,
        half: null,
        weak: ["Fire"]
    },
    "yellow-jelly": {
        id: 'yellow-jelly',
        job: 'Yellow Jelly',
        description: "This gelatinous yellow monster absorbs lightning.",
        absorb: ["Lightning"],
        immune: null,
        half: null,
        weak: ["Water"]
    },
    "white-pudding": {
        id: 'white-pudding',
        job: 'White Pudding',
        description: "This gelatinous pink monster is resistant to both physical and magickal attacks.",
        absorb: null,
        immune: ["All elements except Holy and Dark"],
        half: null,
        weak: ["Holy", "Dark"]
    },
    orthros: {
        id: 'orthros',
        job: 'Orthros',
        description: "A curious monster possessed of both an incredibly malleable body and piercing intellect. Rather fond of pretty girls.",
        absorb: null,
        immune: null,
        half: null,
        weak: null
    },
    "floating-eye": {
        id: 'floating-eye',
        job: 'Floating Eye',
        description: "A monster that consists of little more than eyeball with wings. It bites at its victims with poisoned fangs.",
        absorb: null,
        immune: null,
        half: null,
        weak: ["Earth", "Holy"]
    },
    "bloody-orb": {
        id: 'bloody-orb',
        job: 'Bloody Orb',
        description: "This disembodied eyeball gorges itself on the blood of its victims.",
        absorb: null,
        immune: null,
        half: null,
        weak: ["Earth", "Holy"]
    },
    ghost: {
        id: 'ghost',
        job: 'Ghost',
        description: "Spirits born from the regrets of the dead.",
        absorb: ["Dark"],
        immune: null,
        half: null,
        weak: ["Holy"]
    },
    wraith: {
        id: 'wraith',
        job: 'Wraith',
        description: "Spirits magickally bound to this world by a powerful curse.",
        absorb: ["Dark"],
        immune: null,
        half: null,
        weak: ["Holy"]
    },
    headless: {
        id: 'headless',
        job: 'Headless',
        description: "Giants that smash their enemies with arms thick as tree trunks.",
        absorb: null,
        immune: null,
        half: null,
        weak: ["Air"]
    },
    wendigo: {
        id: 'wendigo',
        job: 'Wendigo',
        description: "These headless giants stalk men for many days, such is their hatred.",
        absorb: ["Ice"],
        immune: null,
        half: null,
        weak: ["Lightning"]
    },
    golem: {
        id: 'golem',
        job: 'Golem',
        description: "A headless giant animated and given life by ancient magicks.",
        absorb: null,
        immune: null,
        half: null,
        weak: ["Air"]
    },
    lamia: {
        id: 'lamia',
        job: 'Lamia',
        description: "Vile creatures that lull their victims with song before they strike.",
        absorb: null,
        immune: null,
        half: ["Air", "Lightning"],
        weak: null
    },
    lilith: {
        id: 'lilith',
        job: 'Lilith',
        description: "A monster that basks in blood and rejoices in death.",
        absorb: null,
        immune: null,
        half: ["Air", "Lightning"],
        weak: null
    },
    lamashtu: {
        id: 'lamashtu',
        job: 'Lamashtu',
        description: "An eerie air surrounds this beast.",
        absorb: ["Dark"],
        immune: null,
        half: ["Air", "Lightning"],
        weak: null
    },
    "magick-pot": {
        id: 'magick-pot',
        job: 'Magick Pot',
        description: null,
        absorb: ["All elements"],
        immune: null,
        half: null,
        weak: null
    },
    malboro: {
        id: 'malboro',
        job: 'Malboro',
        description: "A slithering mass of tentacles and filth. The stench is terrible.",
        absorb: null,
        immune: null,
        half: null,
        weak: null
    },
    "great-malboro": {
        id: 'great-malboro',
        job: 'Great Malboro',
        description: "The stench is greater too.",
        absorb: null,
        immune: null,
        half: null,
        weak: null
    },
    "malboro-king": {
        id: 'malboro-king',
        job: 'Malboro King',
        description: "Lord of the Malboros, with the crown to prove it.",
        absorb: null,
        immune: null,
        half: null,
        weak: null
    },
    cassie: {
        id: 'cassie',
        job: 'Cassie',
        description: "Cassies are notable for being the source of De'Vine ribbons made by the clothing designer Galmia Pepe. They are also more agile than their fellow kin.",
        absorb: null,
        immune: null,
        half: null,
        weak: null
    },
    kukunoch: {
        id: 'kukunoch',
        job: 'Kukunoch',
        description: "Kukunochs only appear in Brightmoon Tor.",
        absorb: null,
        immune: null,
        half: null,
        weak: null
    },
    nemeshis: {
        id: 'nemeshis',
        job: 'Nemeshis',
        description: "Nemeshis only appear in Brightmoon Tor. They also have the Brightmoon Tor secondary ability skillset of Turning.",
        absorb: null,
        immune: null,
        half: null,
        weak: null
    },
    mimic: {
        id: 'mimic',
        job: 'Mimic',
        description: "These fiendish creatures conceal themselves to take unwary adventurers by surprise.",
        absorb: null,
        immune: null,
        half: null,
        weak: ["All elements"]
    },
    "neukhia-pod": {
        id: 'neukhia-pod',
        job: 'Neukhia Pod',
        description: "An extension of the Neukhia. It destroys all who draw near.",
        absorb: null,
        immune: null,
        half: null,
        weak: null
    },
    "neukhia-core": {
        id: 'neukhia-core',
        job: 'Neukhia Core',
        description: "The heart of the Neukhia. The fires of the Apocalypse burn within its light.",
        absorb: null,
        immune: null,
        half: null,
        weak: null
    },
    "neukhia-wisp": {
        id: 'neukhia-wisp',
        job: 'Neukhia Wisp',
        description: "An extension of the Neukhia. Its ghostly form dances before the shapeless mass.",
        absorb: null,
        immune: null,
        half: null,
        weak: null
    },
    rafflesia: {
        id: 'rafflesia',
        job: 'Rafflesia',
        description: "A pungent aroma surrounds this giant plant beast. It lashes its prey with powerful vines.",
        absorb: ["Water", "Earth"],
        immune: null,
        half: null,
        weak: ["Fire"]
    },
    floraxion: {
        id: 'floraxion',
        job: 'Floraxion',
        description: 'A palette swap of the Rafflesia. It only appears in the "Wanted: Floraxion" quest, however, it is identical in nature to a normal Rafflesia.',
        absorb: ["Water", "Earth"],
        immune: null,
        half: null,
        weak: ["Fire"]
    },
    "great-tortoise": {
        id: 'great-tortoise',
        job: 'Great Tortoise',
        description: "A hard, thick shell protects this beast. It often attacks by ramming its ponderous bulk into foes.",
        absorb: ["Earth"],
        immune: null,
        half: null,
        weak: ["Air"]
    },
    rocktitan: {
        id: 'rocktitan',
        job: 'Rocktitan',
        description: "Rocky protrusions cover the shell of this immense tortoise.",
        absorb: ["Earth"],
        immune: null,
        half: null,
        weak: ["Air"]
    },
    adamantitan: {
        id: 'adamantitan',
        job: 'Adamantitan',
        description: "The adamantitan crushes prey between its steel-like jaws.",
        absorb: ["Earth"],
        immune: null,
        half: null,
        weak: ["Air"]
    },
    toughskin: {
        id: 'toughskin',
        job: 'Toughskin',
        description: "No sword can pierce the shell of the toughskin, though many have been lost in the attempt.",
        absorb: ["Earth"],
        immune: null,
        half: null,
        weak: ["Air"]
    },
    sprite: {
        id: 'sprite',
        job: 'Sprite',
        description: "These airborne creatures take delight in harassing unsuspecting travelers.",
        absorb: ["Holy"],
        immune: null,
        half: null,
        weak: ["Dark"]
    },
    banshee: {
        id: 'banshee',
        job: 'Banshee',
        description: 'Their name meaning "woman of the faeries", banshees are sprite kin who wield divine powers.',
        absorb: ["Holy"],
        immune: null,
        half: null,
        weak: ["Dark"]
    },
    alraune: {
        id: 'alraune',
        job: 'Alraune',
        description: "Humanoid in appearance, the alraune is actually a plant. It attacks with the sharp horn on its head.",
        absorb: null,
        immune: null,
        half: null,
        weak: ["Air"]
    },
    "deadly-nightshade": {
        id: 'deadly-nightshade',
        job: 'Deadly Nightshade',
        description: "A variety of alraune with a tomato-red head. Some have even been known to possess enough intellect to cast magicks.",
        absorb: null,
        immune: null,
        half: null,
        weak: ["Water"]
    },
    tonberry: {
        id: 'tonberry',
        job: 'Tonberry',
        description: "The knife of this hooded creature gleams with the hatred of its dead brethren for the living.",
        absorb: null,
        immune: null,
        half: ["All elements"],
        weak: null
    },
    "tonberry-king": {
        id: 'tonberry-king',
        job: 'Tonberry King',
        description: "A garish crown rests atop the head of this purple-skinned creature. Its lamp swings mournfully in time with its silent footfalls.",
        absorb: null,
        immune: null,
        half: ["All elements"],
        weak: null
    },
    upsilon: {
        id: 'upsilon',
        job: 'Upsilon',
        description: "This creature fires a deadly beam from its vantage point atop spidery legs.",
        absorb: null,
        immune: ["All elements"],
        half: null,
        weak: null
    },
    "magick-weapon": {
        id: 'magick-weapon',
        job: 'Magick Weapon',
        description: "This creature fires a deadly beam from its vantage point atop spidery legs.",
        absorb: null,
        immune: ["All elements"],
        half: null,
        weak: null
    },
    werewolf: {
        id: 'werewolf',
        job: 'Werewolf',
        description: "Ferocious creatures, part man, part beast. They shred their prey with razor-sharp claws.",
        absorb: null,
        immune: null,
        half: null,
        weak: ["Air"]
    },
    zaghnal: {
        id: 'zaghnal',
        job: 'Zaghnal',
        description: "This relative of the werewolf attacks with a deafening roar.",
        absorb: null,
        immune: null,
        half: null,
        weak: ["Air"]
    },
    "loup-garou": {
        id: 'loup-garou',
        job: 'Loup-garou',
        description: "A variant of the werewolf that has retained enough intelligence to use items to heal its wounds.",
        absorb: null,
        immune: null,
        half: null,
        weak: ["Air"]
    },
    humbaba: {
        id: 'humbaba',
        job: 'Humbaba',
        description: 'Some have called this violent monster "King of the Beasts". Its massive fists pummel and crack the earth.',
        absorb: null,
        immune: null,
        half: null,
        weak: ["Air"]
    },
    wolf: {
        id: 'wolf',
        job: 'Wolf',
        description: 'Wolves are often found in the wild places of Ivalice, where they prey on unwary travelers.',
        absorb: null,
        immune: null,
        half: ["Earth",],
        weak:["Water",] 
    },
    worgen: {
        id: 'worgen',
        job: 'Worgen',
        description: "These wolf kin let out a deep growl that sends men running in fear.",
        absorb: null,
        immune: null,
        half: ["Earth"],
        weak: ["Water"]
    },
    hellhound: {
        id: 'hellhound',
        job: 'Hellhound',
        description: "Fell power emanates from this twisted mockery of a wolf.",
        absorb: ["Dark"],
        immune: null,
        half: ["Earth"],
        weak: ["Water", "Holy"]
    },
    yowie: {
        id: 'yowie',
        job: 'Yowie',
        description: "This giant beast lives beneat the sands. It captures its prey in a torrent of quicksand.",
        absorb: null,
        immune: ["Earth"],
        half: null,
        weak: ["Air"]
    },
    zombie: {
        id: 'zombie',
        job: 'Zombie',
        description: "Foul magicks animate these walking corpses.",
        absorb: ["Dark"],
        immune: null,
        half: null,
        weak: ["Holy"]
    },
    ghoul: {
        id: 'ghoul',
        job: 'Ghoul',
        description: "These shambling corpses drain life from the living with their foul touch.",
        absorb: ["Dark"],
        immune: null,
        half: null,
        weak: ["Holy"]
    },
    /* Example:
    name: {
        id: 'name',
        job: 'Name',
        description: "",
        absorb: null,
        immune: null,
        half: null,
        weak: null
    },
    */
};

export function getEnemyMetaForJob(job: string | undefined | null): EnemyMeta | undefined {
    if (!job) {
        return undefined;
    }

    const key = job.trim().toLowerCase();

    // 1) Direct id match (e.g. "crushatrice")
    if (ENEMIES[key]) {
        return ENEMIES[key];
    }

    // 2) Fallback: match by display job name (e.g. "Crushatrice")
    return Object.values(ENEMIES).find(
        (meta) => meta.job.toLowerCase() === key,
    );
}

