// src/data/missions/missionTags.ts
import type { MissionTag } from "../../types/ffta2";

export const MISSION_TAGS: Record<string, MissionTag[]> = {
    // =========================
    // A1 block
    // =========================
    "A1-01": ["story"], // Stranger in the Woods – starts the Step chain 
    "A1-02": ["optional", "chain"], // Reagent Run – part of early “farming/harvest” arc with tomatoes, etc. 
    "A1-03": ["optional", "chain"], // The First Step – explicit part of the Step quest line 
    "A1-04": ["optional", "chain"], // The Next Step – Step chain
    "A1-06": ["story"], // A Paw Full of Feathers
    "A1-07": ["optional"], // The Perfect Gift
    "A1-08": ["optional"], // Kids These Days
    "A1-09": ["optional"], // Watch Your Step
    "A1-10": ["optional"], // The Trappings of Failure (trap gimmick but not flagging as puzzle)
    "A1-11": ["story",, "law-sensitive"], // The Yellow Wings (House Bowen chain, special Ice law) 
    "A1-14": ["optional"], // A Voice from the Well
    "A1-15": ["optional"], // The Star Seal
    "A1-16": ["story"], // You Say Tomato – in the tomato/harvest chain (Sun-Ripened Mayhem etc.) 

    // =========================
    // A2 block
    // =========================
    "A2-01": ["optional", "multi-battle", "elite", "treasure"], // Camoa Cup – cup tournament, unlocks esper item :contentReference[oaicite:5]{index=5}
    "A2-02": ["optional"], // The Sun Seal
    "A2-03": ["optional"], // The Moon Seal
    "A2-04": ["optional", "hunt", "notorious-mark"], // Wanted: The Cyanwolf 
    "A2-05": ["optional", "multi-battle", "elite", "treasure"], // Graszton Cup :contentReference[oaicite:7]{index=7}
    "A2-06": ["optional"], // The Stone With No Name
    "A2-07": ["optional"], // The Whom Gods Bow
    "A2-08": ["optional"], // An Unfamiliar Land
    "A2-09": ["optional", "multi-battle", "elite", "treasure"], // Moorabella Cup :contentReference[oaicite:8]{index=8}
    "A2-10": ["optional"], // Odd Places
    "A2-11": ["optional"], // What Was Lost
    "A2-12": ["optional"], // The Way of the Meek
    "A2-13": ["optional", "multi-battle", "elite", "treasure"], // Fluorgis Cup :contentReference[oaicite:9]{index=9}
    "A2-14": ["optional"], // The Way of the Timid
    "A2-15": ["optional", "story-cameo", "chain"], // Pirate Attack – part of Vaan/Penelo pirate arc 
    "A2-16": ["optional", "hunt", "notorious-mark"], // Wanted: Big Eyes 

    // =========================
    // A3 block
    // =========================
    "A3-01": ["optional", "multi-battle", "elite", "treasure"], // Goug Cup :contentReference[oaicite:12]{index=12}
    "A3-03": ["optional", "hunt", "notorious-mark"], // Wanted: Mirage Bunny 
    "A3-05": ["optional", "multi-battle", "elite", "treasure"], // Loar Cup 
    "A3-06": ["optional", "hunt", "notorious-mark"], // Wanted: Florah 
    "A3-08": ["optional", "chain", "law-sensitive", "puzzle"], // Death March II – law-focused movement/puzzle quest 
    "A3-09": ["optional", "multi-battle", "elite", "treasure"], // Ordalia Cup
    "A3-10": ["optional", "hunt", "notorious-mark"], // Wanted: Tonberrion
    "A3-11": ["optional", "chain", "law-sensitive", "puzzle"], // Death March, III
    "A3-12": ["optional", "hunt", "notorious-mark"], // Wanted: Combatants
    "A3-13": ["optional", "multi-battle", "elite", "treasure"], // Jylland Cup
    "A3-14": ["optional", "hunt", "notorious-mark"], // Wanted: Gaitsnipe
    "A3-15": ["optional"], // Something's Dropped!
    "A3-16": ["optional"], // Hunting Season

    // =========================
    // A4 block
    // =========================
    "A4-01": ["optional", "multi-battle", "elite", "treasure"], // Champions' Cup – top cup
    "A4-02": ["optional", "hunt", "notorious-mark"], // Wanted: Icicle Ark
    "A4-03": ["optional", "chain"], // Thieves in the Ruins – House Bowen/Duelhorn-relevant chain quest 
    "A4-06": ["optional", "hunt", "notorious-mark"], // Wanted: Floraxion
    "A4-08": ["optional", "hunt", "notorious-mark"], // Wanted: Musicians!
    "A4-10": ["optional", "hunt", "notorious-mark"], // Wanted: Moogle Rangers
    "A4-11": ["optional", "hunt", "notorious-mark", "elite", "job-unlock"], // Red King of Cinquleur – also unlocks Red Mage via Cinquleur chain :contentReference[oaicite:18]{index=18}
    "A4-12": ["optional", "hunt", "notorious-mark"], // Wanted: Tutor
    "A4-14": ["optional", "hunt", "notorious-mark", "elite"], // Wanted: The Mutadragons – late-game high-rank mark tied into Adelle chain 
    "A4-15": ["optional", "hunt", "notorious-mark", "elite"], // Blue King of Cinquleur
    "A4-16": ["optional", "hunt", "notorious-mark"], // Wanted: Woodworker

    // =========================
    // A5 block
    // =========================
    "A5-01": ["optional", "hunt", "notorious-mark", "elite"], // Wanted: Magick Weapon – late Heritor-gated mark 
    "A5-03": ["optional", "hunt", "notorious-mark", "elite"], // Green King of Cinquleur
    "A5-04": ["optional", "hunt", "notorious-mark"], // Wanted: Marksman
    "A5-07": ["optional", "hunt", "notorious-mark", "elite"], // Black King of Cinquleur
    "A5-08": ["optional", "hunt", "notorious-mark"], // Wanted: Caretaker
    "A5-09": ["optional", "hunt", "notorious-mark", "elite"], // White King of Cinquleur
    "A5-14": ["optional", "hunt", "notorious-mark", "multi-battle", "elite", "boss", "chain"], // The Five Kings – all Cinquleur at once :contentReference[oaicite:21]{index=21}

    // =========================
    // B1 block
    // =========================
    "B1-01": ["optional", "chain"], // A Step Further – Step chain
    "B1-02": ["optional", "chain"], // The Last Step – Step chain
    "B1-03": ["optional", "chain", "protection"], // Sun-Ripened Mayhem – protect tomatoes 
    "B1-05": ["optional"], // Beetle in a Haystack
    "B1-06": ["optional"], // Wayward Drake
    "B1-07": ["optional", "chain", "protection"], // The Whites of Its Eyes – protect white Bloody Orb 
    "B1-08": ["optional", "chain"], // Flown the Coop – House Bowen kids arc
    "B1-09": ["optional"], // Prepared with Love
    "B1-10": ["optional", "chain"], // Foodstuffs: Texture – Foodstuffs chain 
    "B1-11": ["optional", "chain"], // Foodstuffs: Aroma
    "B1-12": ["optional", "chain"], // Foodstuffs: Appearance
    "B1-14": ["optional", "chain"], // Our Playground – House Bowen chain
    "B1-15": ["optional"], // Mushroom Chef
    "B1-16": ["optional", "chain", "law-sensitive"], // Showdown – speed battle vs House Bowen with special law 

    // =========================
    // B2 block
    // =========================
    "B2-01": ["story", "hunt", "notorious-mark"], // Wanted: Ughor/Ugohr 
    "B2-03": ["optional", "chain"], // Throw Down – part of Duelhorn/House Bowen arc 
    "B2-04": ["optional"], // A Fatal Mistake
    "B2-05": ["optional"], // A Simple Question
    "B2-06": ["story", "hunt", "notorious-mark"], // Wanted: Gilmunto
    "B2-08": ["optional"], // It's a Trap!
    "B2-09": ["optional", "hunt", "notorious-mark"], // Wanted: Lang Bros
    "B2-10": ["optional"], // Books of Magick
    "B2-11": ["story"], // Now That's a Fire
    "B2-13": ["optional"], // The Ultimate Book
    "B2-14": ["optional"], // Clan Mates
    "B2-15": ["optional"], // For the Cause
    "B2-16": ["story"], // Pearls in the Deep

    // =========================
    // B3 block
    // =========================
    "B3-01": ["optional", "chain", "law-sensitive", "puzzle"], // Death March 
    "B3-03": ["optional", "chain"], // A Lady's Proposition – Duelhorn chain 
    "B3-04": ["optional", "hunt", "protection", "chain"], // On the Rampage – defeat Mamatrice, leads into Monster Poaching 
    "B3-06": ["optional", "chain"], // A Lady's Persistance – Duelhorn/House Alys chain 
    "B3-08": ["optional", "chain"], // Unfamiliar Folk – Duelhorn chain prereq 
    "B3-09": ["optional", "chain", "law-sensitive"], // A Lady's Insistence – infamously restrictive law 
    "B3-11": ["optional", "chain"], // Duelhorn – named clan chain quest 
    "B3-13": ["optional"], // Wanted: Barmaid
    "B3-14": ["optional", "chain"], // Making Port – Duelhorn chain 
    "B3-16": ["optional", "job-unlock"], // Knowing the Beast – unlocks Beastmaster :contentReference[oaicite:36]{index=36}

    // =========================
    // B4 block
    // =========================
    "B4-01": ["optional", "chain"], // Great Land Festival – House Bowen / Al-Cid related festival
    "B4-02": ["optional", "chain"], // Strong Lady – Duelhorn chain (Night Dancer) 
    "B4-03": ["optional"], // I Want to Forget
    "B4-04": ["optional", "job-unlock"], // The Goug Consortium – unlocks Fusilier :contentReference[oaicite:38]{index=38}
    "B4-05": ["optional", "chain"], // Wanted: Sidekick – Duelhorn chain (Snakeheart) 
    "B4-06": ["optional", "chain", "protection"], // Caravan Cry – protect Alys 
    "B4-07": ["optional"], // Under the Weather
    "B4-08": ["optional", "job-unlock"], // The Eastwatch – unlocks Parivir :contentReference[oaicite:41]{index=41}
    "B4-09": ["optional", "hunt", "notorious-mark"], // Wanted: Shiny Maces
    "B4-10": ["optional", "chain", "boss"], // Aid the Serpent – Duelhorn chain, Duke Snakeheart boss 
    "B4-11": ["optional", "job-unlock"], // A Chill in the Night – part of job/ability unlock path (iffy; leaving empty feels safer)
    "B4-12": ["optional", "job-unlock"], // To Be a Spellblade – unlocks Spellblade + protection objective :contentReference[oaicite:43]{index=43}
    "B4-13": ["optional", "job-unlock"], // Banbanga! – unlocks Master Monk :contentReference[oaicite:44]{index=44}
    "B4-14": ["optional", "chain"], // Caravan Cry II – Duelhorn chain, protect Duke Snakeheart 
    "B4-15": ["optional", "hunt", "notorious-mark", "elite"], // Blue King of Cinquleur already tagged in A4; this is different: Show of Strength (Duelhorn); leave as ["optional"]
    "B4-16": ["optional", "job-unlock"], // Lord Grayrl! – unlocks Viking :contentReference[oaicite:46]{index=46}

    // =========================
    // B5 block
    // =========================
    "B5-01": ["optional", "hunt", "notorious-mark"], // Wanted: Woodcutter
    "B5-02": ["optional"], // Summons (Duelhorn chain, but leaving untagged beyond chain)
    "B5-03": ["optional", "hunt", "elite"], // Hunted – Ultima esper hunt :contentReference[oaicite:47]{index=47}
    "B5-04": ["optional", "chain", "job-unlock"], // Geomancer's Way - Snow :contentReference[oaicite:48]{index=48}
    "B5-05": ["optional"], // Wanted: Assistant
    "B5-06": ["optional", "chain", "boss"], // Three-Point Strategy – Duelhorn multi-city bosses 
    "B5-07": ["optional", "chain"], // Memories Forged – Duelhorn epilogue chain
    "B5-08": ["optional", "chain", "job-unlock"], // Geomancer's Way - Mist :contentReference[oaicite:50]{index=50}
    "B5-10": ["optional", "chain", "boss"], // The Last Duelhorn – Maquis boss 
    "B5-11": ["optional", "chain", "boss"], // The Way of the Sword – Frimelda duel 
    "B5-14": ["optional", "chain"], // Lethean Drought – Duelhorn epilogue chain 
    "B5-15": ["optional", "chain", "puzzle"], // Devil's Pact – choice-based Duelhorn quest 
    "B5-16": ["optional", "chain", "boss"], // One Last Memory – final Duelhorn battle 

    // =========================
    // C1 block
    // =========================
    "C1-01": ["optional", "chain"], // It's a Secret to Everybody – part of harvest/food chain 
    "C1-02": ["optional"], // Hellhound Astray
    "C1-03": ["optional"], // My Little Carrot
    "C1-04": ["optional", "chain"], // An Earnest Multitde – Earnest chain
    "C1-05": ["optional", "chain"], // Foodstuffs: Nutrition – Foodstuffs chain 
    "C1-06": ["optional", "chain"], // Foodstuffs: Bon Appetit – Foodstuffs chain
    "C1-07": ["optional", "chain"], // An Earnest Quandary – Earnest chain
    "C1-09": ["optional", "chain"], // House Bowen's Challenge – Bowen chain
    "C1-10": ["optional", "chain"], // Yellow Wings in Trouble – Bowen chain
    "C1-11": ["optional", "chain"], // An Earnest Search – Earnest chain
    "C1-12": ["optional", "job-unlock"], // The Nu Mou Nobles – unlocks Arcanist :contentReference[oaicite:58]{index=58}
    "C1-13": ["optional", "chain"], // Seeding the Harvest – harvest chain
    "C1-14": ["optional", "chain"], // A Harvest Hand – harvest chain
    "C1-15": ["optional", "job-unlock"], // The Bangaa Brotherhood – unlocks Cannoneer :contentReference[oaicite:59]{index=59}
    "C1-16": ["optional"], // It's the Thought

    // =========================
    // C2 block
    // =========================
    "C2-01": ["optional"], // Ruinous Traps
    "C2-02": ["optional", "chain"], // Komodo Search – Komodo chain
    "C2-03": ["optional", "chain"], // Komodo Arrival – Komodo chain
    "C2-04": ["optional", "chain"], // Shipping Out – Komodo/Loar travel chain
    "C2-05": ["optional", "chain"], // Komodo Departure – Komodo chain
    "C2-06": ["optional", "chain", "timed"], // The Forests of Loar – visit locations in time 
    "C2-07": ["optional", "chain", "timed"], // The Lands of Loar – timed travel 
    "C2-08": ["optional", "chain", "timed"], // The Towns of Loar – timed travel 
    "C2-09": ["optional"], // The Genuine Article
    "C2-10": ["optional"], // The Root of the Problem
    "C2-11": ["optional"], // The Whole Truth
    "C2-12": ["optional", "chain", "treasure"], // Chita on Weapons - Adepts – weapon/trade chain 
    "C2-15": ["optional", "chain", "treasure"], // Chita on Weapons - Novices
    "C2-16": ["optional", "chain", "collection"], // Kupoppy Flower – Loar flora chain

    // =========================
    // C3 block
    // =========================
    "C3-01": ["story"], // Mountain Watch
    "C3-03": ["optional"], // Speed Battle, Kupo!
    "C3-04": ["optional"], // For My Love
    "C3-05": ["optional", "protection", "chain"], // Monster Poaching – protect Cluckatrices, follows On the Rampage 
    "C3-06": ["story"], // Grounded!
    "C3-08": ["optional", "chain"], // Cleaning to Ordalia – cleaning/transport chain
    "C3-09": ["optional"], // Stuck in the Muck
    "C3-10": ["optional", "chain", "protection"], // Poachers Spotted – poaching chain
    "C3-11": ["story"], // Rumours Ahead
    "C3-13": ["optional", "job-unlock"], // Kyrra, Dragoon – unlocks Dragoon :contentReference[oaicite:65]{index=65}
    "C3-14": ["optional", "job-unlock"], // Green Dominion – unlocks Green Mage :contentReference[oaicite:66]{index=66}
    "C3-15": ["optional"], // An Unseen Foe
    "C3-16": ["story"], // Sleepless Nights

    // =========================
    // C4 block
    // =========================
    "C4-01": ["optional", "job-unlock", "boss"], // Veis, Assassin – unlocks Assassin :contentReference[oaicite:67]{index=67}
    "C4-02": ["optional", "job-unlock"], // To Be a Fighter – unlocks Fighter :contentReference[oaicite:68]{index=68}
    "C4-05": ["optional", "job-unlock"], // Popocho's Chocobos – unlocks Chocobo Knight :contentReference[oaicite:69]{index=69}
    "C4-06": ["optional", "job-unlock"], // Of Kupos and Cannons – unlocks Flintlock :contentReference[oaicite:70]{index=70}
    "C4-07": ["optional", "job-unlock"], // Instruments of Inspiration – unlocks Raptor :contentReference[oaicite:71]{index=71}
    "C4-08": ["optional"], // Loar Airships Grounded
    "C4-09": ["optional", "job-unlock"], // Treasured Tomes – unlocks Scholar :contentReference[oaicite:72]{index=72}
    "C4-10": ["optional", "job-unlock"], // Sleight of Hand – unlocks Trickster :contentReference[oaicite:73]{index=73}
    "C4-11": ["optional"], // Kidnapping!?
    "C4-13": ["optional", "job-unlock"], // Banbanga! – unlocks Master Monk :contentReference[oaicite:74]{index=74}
    "C4-14": ["optional", "job-unlock"], // The Cat's Meow – unlocks Seer :contentReference[oaicite:75]{index=75}
    "C4-15": ["optional"], // The Storage Shed

    "C5-01": ["optional", "chain", "job-unlock"], // Geomancer's Way - Rain :contentReference[oaicite:76]{index=76}
    "C5-02": ["optional", "chain", "job-unlock"], // Geomancer's Way - Sun :contentReference[oaicite:77]{index=77}
    "C5-03": ["optional"], // Starstruck
    "C5-04": ["optional", "timed"], // Moorabella Nightwatch – defeat foes in limited rounds :contentReference[oaicite:78]{index=78}
    "C5-05": ["optional", "job-unlock", "hunt"], // Ravager – unlocks Ravager :contentReference[oaicite:79]{index=79}
    "C5-06": ["optional", "job-unlock"], // A Lanista's Pride – unlocks Lanista :contentReference[oaicite:80]{index=80}
    "C5-08": ["optional", "timed"], // Goug Nightwatch – timed nightwatch quest :contentReference[oaicite:81]{index=81}
    "C5-13": ["optional", "chain"], // A Lasting Peace – Duelhorn epilogue story 
    "C5-16": ["optional", "chain", "boss", "elite"], // Unplumbed Depths – final Heritor ability quest 

    // =========================
    // D1 block
    // =========================
    "D1-01": ["optional", "chain"], // An Earnest Delight – Earnest chain
    "D1-02": ["optional", "chain"], // Oh No, Kupo! – tied to Bonga Bugle/Earnest/Kupo arcs
    "D1-05": ["optional", "chain"], // The Bangaa of the Rupies – Rupies chain 
    "D1-07": ["optional", "chain", "protection"], // The Rivalry of the Rupies – protect NPCs 
    "D1-09": ["optional"], // Tree Hugging
    "D1-10": ["optional", "chain"], // The Nu Mous of the Rupies – Rupies chain
    "D1-13": ["optional", "chain"], // Memories – heritor story chain :contentReference[oaicite:86]{index=86}
    "D1-14": ["optional", "chain"], // 'Tis the Season – seasonal chain

    // =========================
    // D2 block
    // =========================
    "D2-01": ["optional", "chain", "timed"], // The Seas of Ordalia – timed travel quest 
    "D2-02": ["optional", "chain", "timed"], // The Wonders of Ordalia – timed travel 
    "D2-03": ["optional", "chain", "timed"], // The Wonders of Loar – timed travel 
    "D2-04": ["optional", "chain"], // The Forgotten Places
    "D2-05": ["optional", "chain", "treasure"], // Chita on Weapons - Masters – weapon chain :contentReference[oaicite:90]{index=90}
    "D2-06": ["optional", "hunt"], // Bug Hunt
    "D2-07": ["optional", "chain"], // The Show's Not Over – performance chain
    "D2-08": ["optional"], // Fluffy Flier?
    "D2-09": ["optional", "chain"], // Cake: The Recipe – cake chain
    "D2-10": ["optional", "chain"], // Cake: The Ingredients – cake chain
    "D2-11": ["optional", "chain"], // Cake: The Catastrophe – cake chain
    "D2-12": ["optional"], // One Red Phial
    "D2-13": ["optional"], // My Secret Shame
    "D2-14": ["optional"], // Maintaining the Balance
    "D2-15": ["optional", "hunt"], // The Natural Order – cockatrice hunt 
    "D2-16": ["optional", "hunt", "boss"], // Cilawa the Gluttonous – named boss hunt 

    // =========================
    // D3 block
    // =========================
    "D3-01": ["optional"], // Gripped by Fear
    "D3-04": ["optional"], // I Must Have It!
    "D3-05": ["optional"], // Rude Awakening
    "D3-06": ["optional"], // Drowsy Draught
    "D3-07": ["optional"], // Teach a Man to Run
    "D3-09": ["optional", "chain"], // Cleaning to Loar
    "D3-10": ["optional", "chain", "protection"], // Teach a Man to Fish – protect Enchan 
    "D3-11": ["optional"], // Love-Struck
    "D3-12": ["optional", "chain"], // All Good Things...
    "D3-15": ["optional", "chain"], // Rancher's Request - Yellow / Black – chocobo ranch chain 

    // =========================
    // D4 block
    // =========================
    "D4-01": ["story"], // Making Music
    "D4-04": ["optional"], // Hors D'oeuvre of the Hour
    "D4-06": ["story"], // Seeking the Stone
    "D4-07": ["optional"], // I've Been Had, Kupo!
    "D4-08": ["optional"], // Beneath the Sands
    "D4-09": ["optional", "protection"], // Airship S.O.S.! – protect airship crew
    "D4-11": ["story", "story-cameo", "recruit"], // Wanted: Sky Pirate Vaan – Vaan recruitment chain 
    "D4-12": ["optional"], // A Small Favour
    "D4-14": ["optional", "chain", "timed"], // Ordalia Airships Grounded – airship law/time related 
    "D4-16": ["story"], // A Request – heritor chain entry :contentReference[oaicite:97]{index=97}

    // =========================
    // D5 block
    // =========================
    "D5-01": ["optional", "timed"], // Graszton Nightwatch – timed watch 
    "D5-02": ["optional", "timed"], // The Camoa Nightwatch – timed watch 
    "D5-03": ["optional"], // Stowaways
    "D5-05": ["optional"], // Wanted: Devotees!
    "D5-06": ["optional", "timed"], // Fluorgis Nightwatch :contentReference[oaicite:100]{index=100}
    "D5-08": ["optional"], // A Lost Companion
    "D5-12": ["optional"], // Help!
    "D5-13": ["optional", "chain", "hunt", "boss", "elite", "law-sensitive"], // Bringer of Doom – heritor chain, special law 
    "D5-14": ["optional", "chain", "hunt", "boss", "elite", "law-sensitive"], // The Shrine of Paling Gods – heritor chain 
    "D5-15": ["optional", "chain", "hunt", "boss", "elite", "law-sensitive"], // The Beast of Aisenfield – Nesiaam mark 
    "D5-16": ["optional", "chain", "hunt", "boss", "elite", "law-sensitive"], // Woman of the Wood – Ljda mark, heritor 

    // =========================
    // E1 block – Bonga Bugle series
    // =========================
    "E1-01": ["optional", "chain", "law-sensitive", "timed"], // Bonga Bugle - Goldsun – calendar/law focused 
    "E1-02": ["optional", "chain", "law-sensitive", "timed"], // Silversun
    "E1-03": ["optional", "chain", "law-sensitive", "timed"], // Ashleaf
    "E1-04": ["optional", "chain", "law-sensitive", "timed"], // Mistleaf
    "E1-05": ["optional", "chain", "law-sensitive", "timed"], // Coppersun
    "E1-08": ["optional", "chain", "law-sensitive", "timed"], // Emberleaf
    "E1-09": ["optional", "chain", "law-sensitive", "timed"], // Rosefire
    "E1-12": ["optional", "chain", "law-sensitive", "timed"], // Plumfrost
    "E1-13": ["optional", "chain", "law-sensitive", "timed"], // Bloodfire
    "E1-14": ["optional", "chain", "law-sensitive", "timed"], // Greenfire
    "E1-15": ["optional", "chain", "law-sensitive", "timed"], // Skyfrost
    "E1-16": ["optional", "chain", "law-sensitive", "timed"], // Blackfrost

    // =========================
    // E2 block – Survey + misc
    // =========================
    "E2-05": ["optional", "chain", "puzzle"], // Survey No. 258 – tile/location puzzle 
    "E2-06": ["optional", "chain", "puzzle"], // Survey No. 259
    "E2-07": ["optional", "chain", "puzzle"], // Survey No. 260
    "E2-08": ["optional", "chain", "puzzle"], // Survey No. 261
    "E2-09": ["optional", "chain", "treasure"], // The Finest Blade – sword-focused quest 
    "E2-10": ["optional", "chain", "treasure"], // A Charm for Luck
    "E2-11": ["optional"], // Gimme That!
    "E2-12": ["optional"], // Vim, Vigor, and Go
    "E2-13": ["optional"], // Plea for Help
    "E2-14": ["optional", "treasure"], // A Treasured Heirloom
    "E2-15": ["optional", "chain"], // Picnic Pleasure
    "E2-16": ["optional", "escort"], // Escort Wanted – explicit escort quest 

    // =========================
    // E3 block – Rancher, etc.
    // =========================
    "E3-05": ["optional"], // Shaved Ice
    "E3-06": ["optional"], // Meeting the Quota
    "E3-07": ["optional"], // Wish Upon a Star
    "E3-10": ["optional", "hunt"], // Wanted: Hatchery Worker – effectively a hunt
    "E3-11": ["optional", "protection"], // Abducted! – rescue/protect quest
    "E3-12": ["optional", "chain"], // Eternal Rivalry – Duelhorn/House rivalry epilogue 
    "E3-13": ["optional", "chain"], // Rancher's Request - Green
    "E3-14": ["optional", "chain"], // Rancher's Request - Brown
    "E3-15": ["optional", "chain"], // Rancher's Request - White
    "E3-16": ["optional", "chain"], // Rancher's Request - Red

    // =========================
    // E4 block
    // =========================
    "E4-01": ["optional"], // Devilish Delight
    "E4-02": ["optional"], // Shelling Out
    "E4-03": ["optional"], // Flantastic Finish
    "E4-05": ["optional"], // The Honorable Thing
    "E4-06": ["optional"], // From 'Cross the Sea
    "E4-07": ["optional"], // Training Wanted
    "E4-08": ["optional"], // Wall of Flame
    "E4-09": ["optional"], // 'Cross the Sea
    "E4-10": ["optional"], // Watching the Watchers
    "E4-11": ["optional"], // Crying Eyeball
    "E4-12": ["optional", "protection"], // Time to Act – protect Goug Watch 
    "E4-14": ["optional", "chain"], // Drawn Bridge
    "E4-15": ["optional"], // Inspiration or Perspiration?

    // =========================
    // E5 block
    // =========================
    "E5-01": ["story"], // The Dig
    "E5-06": ["story"], // Through Another's Eyes
    "E5-08": ["optional", "story-cameo"], // A Bride for Montblanc – Montblanc-focused quest :contentReference[oaicite:111]{index=111}
    "E5-11": ["story", "story-cameo", "recruit"], // Pirate Problems – Vaan/Penelo chain, Montblanc conditions 
    "E5-12": ["optional", "chain"], // Wanted: Friends, Kupo!
    "E5-15": ["optional", "story-cameo", "law-sensitive"], // A Dashing Duel – Al-Cid fight, special Viera law 
    "E5-16": ["story"], // The Ritual – heritor/Adelle-related quest 
};

