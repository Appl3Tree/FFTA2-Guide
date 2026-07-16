// src/data/meta/systemsPanels.ts
import type { MetaPanel } from "../../types/ffta2";

export const SYSTEMS_PANELS: MetaPanel[] = [
    {
        id: "clan-privileges-ranks",
        title: "Clan Privileges, Titles & Rank",
        subtitle: "How trial rewards actually stack.",
        tone: "cyan",
        paragraphs: [
            "Clan privileges are battle bonuses you choose before judge-led fights. They keep working only while the Judge remains in the battle; breaking the law turns off the privilege, removes revival support, and costs the law bonus for that fight.",
            "Trials are the main source of new privileges and privilege upgrades, but the title row matters. Clearing a higher row does not grant every lower row beneath it. If you want every privilege tied to a trial family, you must earn those rows or repeat the upgrade rows until the privilege has advanced step by step.",
            "Your visible clan title comes from the most recently completed trial and is mainly a display label. Changing it does not remove benefits earned from earlier trial rows; those benefits stack. Talent changes and unlocked privilege upgrades also remain in effect."
        ],
        bullets: [
            "Only one clan privilege can be active at a time in battle.",
            "Only the highest version of a privilege applies; you do not run Power 1, Power 2, and Power 3 at the same time.",
            "Different trial families place rewards differently: single-talent trials often have empty rows, while hybrid trials can offer meaningful privileges across every difficulty.",
            "A row printed with a higher numbered privilege should be read as an upgrade checkpoint, not a promise that one high clear finishes the whole ladder."
        ]
    },
    {
        id: "auctions-control",
        title: "Auctions & Area Control",
        subtitle: "What auctions are for and why CP matters.",
        tone: "orange",
        paragraphs: [
            "Auctions are how your clan controls regions. They unlock after the story reaches the auction system, then expand as later travel opens. Winning control is not just cosmetic: controlled areas can spawn rival clan fights, reduce shop and pub costs, improve sell value, and trigger citizen rewards.",
            "Auction season happens once per year in each major locale. Registering costs Clan Points, then bidding uses auction coins. Ties are dangerous because a defending clan wins tied bids automatically, so watch rival coin totals instead of throwing high-value coins away early.",
            "If you take every area in a region, you become Region Champ and permanently control that region. After that, you can still enter auctions there, but the reward changes from area control to items."
        ],
        bullets: [
            "Auctions open after Now That's a Fire! and completing the introductory auction step.",
            "Entering an auction costs CP, and bidding uses 1-, 2-, 3-, and 5-coin auction tokens rather than gil.",
            "Winning territory can lead to rival clan battles, which are valuable for gil and Clan Points but can be rough if attempted too early.",
            "Auction records can add starting coins, unlock the Token Shop, award CP, and eventually allow the Region Master title."
        ]
    },
    {
        id: "dispatch-deep-dive",
        title: "Dispatch Missions",
        subtitle: "Why some units succeed and others fail.",
        tone: "indigo",
        paragraphs: [
            "Dispatch success combines unit strength, equipment-boosted stats, quest rank, required clan talents, leader suitability, member compatibility, MVP or leader value, and whether the job matches a recommended role.",
            "The practical takeaway is simpler than the math: send strong, well-equipped units; make the best-fitting unit the leader; respect recommended jobs; and do not ignore required clan talents. Hard mode also raises the target difficulty, so a setup that barely passes on normal can fail there.",
            "Many dispatch quests can be played manually instead. Manual play is often better early because you keep the experience and loot, and it avoids sending away a unit you still need for other missions."
        ],
        bullets: [
            "Recommended jobs help more when used as the leader, but still help as members.",
            "Non-recommended jobs are penalized; no-recommendation quests avoid that job multiplier entirely.",
            "The dispatch screen's body language is a useful quick read, but it is a display of underlying suitability, not pure luck.",
            "When a mission has steals, chests, sparkle points, or battle loot you care about, do it manually unless dispatch is truly the point."
        ]
    },
    {
        id: "recruitment-clan-mates",
        title: "Recruitment & Clan Mates",
        subtitle: "How new units are steered.",
        tone: "emerald",
        paragraphs: [
            "Recruitment is not purely random. Traveling recruits depend on the in-game month and region, so the race and job pool changes as the calendar turns. If you are hunting a specific race, check the right month first instead of wandering everywhere.",
            "Clan Mates is the directed recruitment quest in Targ Wood. It is a no-combat quest where the activation month determines the recruit's race and four answers steer the offered job. It appears after Now That's a Fire! and completion of an auction.",
            "A new recruit's level is based on the clan's average level, capped at level 30. Jobs must already be unlocked before they can be recruited, and some advanced jobs also require further story progress."
        ],
        bullets: [
            "Map recruits: month plus region controls the available race/job pool.",
            "Clan Mates: Targ Wood, 100 gil, 20 days, no combat, new clan member reward.",
            "Use Clan Mates when you need a specific roster role instead of waiting for a travel recruit.",
            "Do not dismiss trained units casually; recruitment is useful for filling gaps, not mandatory roster churn."
        ]
    },
    {
        id: "opportunity-turns",
        title: "Opportunity Turns",
        subtitle: "Random bonuses that depend on positioning.",
        tone: "yellow",
        paragraphs: [
            "Opportunity turns are occasional special actions or buffs. Luck privileges can raise the chance of seeing them, but they are still unreliable enough that you should treat them as bonuses rather than a plan.",
            "An Opportunity Command is random rather than triggered by the Smash Gauge. When one appears, the command depends on adjacent units: allies create buffs, while adjacent enemies create melee attack commands. You can move before using it to change the arrangement, but the opportunity does not carry over to the next turn.",
            "Positioning matters because the exact command depends on how many allies or enemies are next to the acting unit. An adjacent enemy takes priority over allies, while an even split of two enemies and two allies produces no command. Several missions also ban Opportunity Commands, so check the law before counting on one."
        ],
        bullets: [
            "No adjacent units: self Protect and Shell.",
            "Adjacent allies: buffs scale from Attack/Resilience through Hastega, Astra, and Curaga.",
            "Adjacent enemies: attack commands scale from two hits on one enemy to attacks against several adjacent enemies.",
            "Do not build strategy around opportunity turns; build strategy so they are a welcome extra."
        ]
    },
    {
        id: "scions-and-smash",
        title: "Scions & Smash Gauge",
        subtitle: "Powerful summons with strict timing.",
        tone: "purple",
        paragraphs: [
            "Scions are large summon effects tied to the Smash Gauge and specific accessories. A unit needs the right accessory equipped and at least 25% Smash Gauge before it can use that Scion; saving more gauge strengthens the effect.",
            "Scion abilities are not mastered through AP and are not permanently learned. If the unit removes the accessory, that Scion command is no longer available.",
            "Several missions and laws forbid summoning Scions, and gauge timing can be awkward, so use them as a powerful option rather than your only hard-fight plan. Smash Gauge Bonus privileges help if you want to build around them."
        ],
        bullets: [
            "Accessory equipped: required for the specific Scion command.",
            "Smash Gauge at 25% or more: required before the summon can be used; saving more gauge strengthens its effect.",
            "Once per battle: a Scion cannot be summoned a second time in the same fight.",
            "No AP mastery: Scion commands come from the accessory, not permanent learning.",
            "When a mission law bans Scions, plan a normal damage route instead of treating the summon as backup."
        ]
    },
    {
        id: "chocobos",
        title: "Chocobos & Chocobo Knights",
        subtitle: "Where mounts come from.",
        tone: "lime",
        paragraphs: [
            "Chocobos matter because Chocobo Knights need mounts to be more than a novelty. Chocobo colors appear in region-specific random encounters, so finding one means checking the right map and waiting for encounters to spawn.",
            "A random encounter remains for 10 days if ignored and reappears 50 days from its initial appearance. If defeated, that location's encounter respawns 120 days after completion. Other events on the same tile can take priority and temporarily hide the encounter.",
            "For practical routing, treat chocobo hunting as a side project once the relevant class and regions are available. Do not stall main progression for it unless you specifically want a Chocobo Knight plan."
        ],
        bullets: [
            "Targ Wood: Yellow; Kthili Sands: Red; Galleria Deep: Black.",
            "Zedlei Forest: Green; Aldanna Range: Brown; Rupie Mountains: White.",
            "Goug can produce a random chocobo color.",
            "Random encounters follow location-specific timing, so clearing one starts that location's longer defeated-encounter respawn cycle."
        ]
    },
    {
        id: "abilities-jobs-races",
        title: "Abilities, Jobs & Race Locks",
        subtitle: "Why gear, AP, and race matter.",
        tone: "blue",
        paragraphs: [
            "FFTA2's ability system is equipment-driven. A unit can use abilities from its current gear, but those abilities disappear when the gear comes off unless the unit has earned enough AP to master them.",
            "Mastering an ability is not the last step. Secondary, reaction, and passive abilities still have to be equipped in the unit setup before they affect battle, and movement boosts come from special shoes or boots rather than a normal learned movement slot.",
            "Jobs are race-locked, and many advanced jobs require mastered action abilities in prerequisite jobs. A few jobs also require quest progress, so a missing job can mean either not enough mastered abilities or a job-unlock quest that has not been cleared yet."
        ],
        bullets: [
            "Keep ability-teaching gear equipped until the AP cost is mastered.",
            "After mastery, set the learned ability in the correct action, reaction, or passive slot.",
            "Use the race/job overview to confirm whether the unit's race can ever access the job you want.",
            "If a job still does not appear, check both ability prerequisites and quest unlocks."
        ]
    },
    {
        id: "advanced-mechanics",
        title: "Advanced Mechanics & Late-Game Prep",
        subtitle: "What to keep in mind once basic fights stop scaring you.",
        tone: "neutral",
        paragraphs: [
            "Once you’re deep into the story, fights stop being about raw levels and start being about how well your jobs and abilities mesh. Speed and turn order, reaction abilities, and positioning all matter a lot more when enemies can one-round squishier units.",
            "The core of FFTA2’s late-game power comes from stacking strong passives and reactions on jobs that can actually use them. Things like counter-style abilities, MP-efficient skills, and ways to ignore terrain or height let you control engagements instead of just trading hits.",
            "Gradually upgrade from simple early-game builds into more synergistic teams: units that act often, hit hard without draining all their MP, and can survive being focused for a turn or two while your healer recovers the line."
        ]
    },
    {
        id: "quest-chains",
        title: "Notable Quest Chains & Side Missions",
        subtitle: "Which optional lines are worth tracking.",
        tone: "emerald",
        paragraphs: [
            "Not every side mission is created equal. Some exist mostly for flavor or minor rewards, while others unlock powerful jobs, repeatable loot, or entire new segments of the game. Prioritize chains that expand what your clan can do or open new strategies.",
            "Examples include story-adjacent arcs that introduce important characters, mission lines that lead to rare weapons or accessories, and chains that deepen the Heritor, sky pirate, or clan storyline payoffs. When these show up, the notes will make it clear why they are worth your time.",
            "You do not need to juggle a spreadsheet of quest names. A highlighted chain is worth attention because finishing it now can make the upcoming story smoother or save tedious cleanup later."
        ]
    },
    {
        id: "postgame",
        title: "Postgame & Cleanup Route",
        subtitle: "A structure for exploring the endgame without burning out.",
        tone: "blue",
        paragraphs: [
            "After the final story missions, FFTA2 opens up into a long tail of high-rank marks, leftover quests, and optimization projects. The danger is not that the content is impossible, but that it can feel directionless if you just accept missions at random.",
            "A good postgame loop alternates between: clearing remaining story-adjacent chains, tackling tougher marks to scoop up top-tier loot, and experimenting with late-game job combinations that you didn’t have the space to try during the main arcs.",
            "Use the mission lists and notes to build small goal sets: finish a specific chain, unlock a certain class, or grab gear that pushes a favorite build to its final form. Treat postgame as a series of short, focused projects instead of one giant checklist."
        ]
    },
    {
        id: "closing",
        title: "Final Notes & Closing Thoughts",
        subtitle: "Set your own endgame goals.",
        tone: "purple",
        paragraphs: [
            "FFTA2 is built to reward tinkering. The suggested route covers efficient trials, marks, chains, and the systems that matter most, but there is still plenty of room to customize along the way.",
            "If you followed the suggested arcs and dipped into optional content when recommended, you should now have a clan that can handle anything Ivalice throws at it: story rematches, remaining quests, and your own challenge runs.",
            "From here, feel free to bend the rules. Try jobs you skipped, chase 100% completion, or replay arcs with different clan compositions. Use the mission and systems panels as reference when you need them, and ignore them when you already know exactly how you want to break the game."
        ]
    }
];
