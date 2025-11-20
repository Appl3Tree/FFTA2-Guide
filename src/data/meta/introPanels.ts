// src/data/meta/introPanels.ts
import type { MetaPanel } from "../../types/ffta2";

export const INTRO_PANELS: MetaPanel[] = [
    {
        id: "how-to-use",
        title: "How to Use This Guide",
        subtitle: "Where to start and how to read mission entries.",
        tone: "blue",
        paragraphs: [
            "This guide is built around FFTA2’s main story arcs, from the opening A1 missions all the way through the final battles. Each mission card is meant to be something you can glance at quickly while playing, not a wall of spoilers.",
            "Every story mission entry includes its arc label, rank, recommended region, law, enemy mix, and a short set of battlefield and strategy notes. The idea is that you can check what you’re walking into, decide whether you’re ready, and see which laws or enemy types might cause trouble.",
            "Optional content, marks, and quest chains are folded into the broader route rather than separated into a pure side-quest dump. When you see references to marks or chains here, they’re chosen because they support the main progression: more loot, better gear, or key abilities that smooth out later story fights."
        ],
        bullets: [
            "Use the arc labels (A1–E5) and rank to roughly gauge where a mission sits in the story and how hard it will be.",
            "Read the objective, law, and enemy summary first; if you’re underleveled or missing certain tools, you’ll know before you accept the mission.",
            "Treat the strategy notes as suggestions, not strict scripts—you can lean into your own favorite jobs and still follow the overall route.",
            "If you’re caught up on the story but feel weak, skim the sidequest and trials panels for ideas on what to clear next."
        ]
    },
    {
        id: "early-clan",
        title: "Early Clan Setup & Party Ideas",
        subtitle: "Low-stress starting squads and job ideas.",
        tone: "green",
        paragraphs: [
            "The early game is forgiving as long as you bring a balanced squad. You don’t need perfect stat growth or rare gear to get through the first arcs; you just need a couple of solid frontliners, at least one reliable healer, and some way to hit clustered enemies.",
            "FFTA2 strongly rewards flexible job picks. Humes in particular can branch into many physical and hybrid roles, while Viera, Bangaa, and Nu Mou provide early access to key support and damage jobs. You can safely rotate a few units through basic jobs to unlock their better options without falling behind.",
            "Don’t panic about min-maxing or power-leveling right away. The guide assumes a relatively normal pace: you clear missions as they appear, dip into a few sidequests and marks for extra loot and CP, and let abilities accumulate naturally."
        ],
        bullets: [
            "Aim for 2–3 melee-oriented units, 1 dedicated healer, and 1–2 ranged or caster slots in your starting lineup.",
            "Rotate Humes and Viera through basic jobs to unlock strong hybrids later instead of locking them into a single role too early.",
            "Give someone access to area damage (black magic, wide skills, or ranged attacks) to clean up clustered low-HP enemies.",
            "Use early missions to test jobs and weapons; if something feels awkward, you can shift that unit a few missions later with no long-term penalty."
        ]
    },
    {
        id: "judge-system",
        title: "Judge System, Laws & Privileges",
        subtitle: "Keeping the Judge on your side without feeling restricted.",
        tone: "amber",
        paragraphs: [
            "Every battle in FFTA2 comes with a Judge and a law. Follow the law and you earn Judge Points and keep access to your clan privilege for that fight. Break it and the Judge leaves: no more privilege, no more automatic revives, and no bonus JP at the end.",
            "Most laws fall into a few simple patterns: banning a specific element, disallowing a weapon type, or restricting a category of actions like items or debuffs. Some late-game laws are more unusual, like punishing repeated actions or attacks against certain races or level differences.",
            "The goal of this guide is not to make you play scared of laws. For each story mission, notes will call out when a law is especially awkward and when it’s reasonable to ignore it. Many fights are easier if you accept a law break in exchange for a safer or faster clear."
        ],
        bullets: [
            "Always glance at the law before you commit to a mission; small changes in your lineup (different weapons or spell loadouts) can save a run.",
            "Think of Judge Points and privileges as nice bonuses rather than something you must protect at all costs.",
            "If a law would shut down your entire core strategy, it’s often better to break it on your terms than to fight with half your toolkit.",
            "Later in the game, experiment with different clan privileges—damage boosts, extra turns, and defensive buffs can all trivialize certain missions."
        ]
    },
    {
        id: "bazaar",
        title: "Bazaar, Loot & Equipment Flow",
        subtitle: "Turning drops into real power spikes.",
        tone: "purple",
        paragraphs: [
            "Loot is the backbone of FFTA2’s equipment system. Instead of buying most gear directly, you trade monster drops and mission rewards into the Bazaar, which then unlocks new weapons, armor, and accessories in shops.",
            "The guide assumes you are feeding most of your loot into Bazaar recipes as you go. You don’t need to memorize exact combinations: the important part is that you steadily unlock new tiers of weapons, staves, bows, and armor so that your clan’s abilities and survivability keep pace with story ranks.",
            "Some loot comes from normal fights, but marks, clan trials, and certain quest chains provide higher-quality drops that push Bazaar tiers forward faster. When the notes suggest a cluster of optional missions, it is usually because the loot and Bazaar unlocks behind them are worth the time investment."
        ],
        bullets: [
            "Check the Bazaar whenever you finish a handful of missions; new recipes often appear in small bursts.",
            "Prioritize weapon unlocks that teach core abilities for your favorite jobs, then fill in armor and accessories.",
            "If a weapon teaches a key skill for a job you plan to use long term, buy and master it even if the stats are slightly below your current gear.",
            "Keep an eye out for loot-rich marks and sidequests; they’re often the fastest way to push your Bazaar options forward between story arcs."
        ]
    },
    {
        id: "clan-trials",
        title: "Clan Trials, Sidequests & Marks",
        subtitle: "Optional content that quietly carries your clan.",
        tone: "red",
        paragraphs: [
            "Clan trials, sidequests, and mark hunts sit alongside the main story and quietly define how strong your clan feels. Trials unlock clan privileges and can permanently improve your clan’s stats, while marks and notable sidequests shower you with extra loot, gil, and unique items.",
            "The guide will occasionally nudge you toward specific trials or marks when they line up naturally with the story or when their rewards are too efficient to ignore. You don’t have to clear every optional mission, but doing none of them makes later arcs feel much harsher than intended.",
            "Think of this content as a toolbox: when the story starts to push back, you dip into marks, trials, and chains to grab more power, then return to the next arc once you feel comfortably ahead again."
        ],
        bullets: [
            "Use clan trials to unlock stronger privileges and small permanent boosts rather than treating them as one-off curiosities.",
            "Mix marks and sidequests into your route whenever you feel undergeared or short on gil and loot.",
            "Pay attention to quest chains that unlock jobs, equipment, or high-quality loot; they often pay off for many hours afterward.",
            "Don’t feel obligated to 100% everything during the story—this guide is structured so you can leave some content for cleanup and postgame."
        ]
    }
];

