// src/data/meta/systemsPanels.ts
import type { MetaPanel } from "../../types/ffta2";

export const SYSTEMS_PANELS: MetaPanel[] = [
    {
        id: "advanced-mechanics",
        title: "Advanced Mechanics & Late-Game Prep",
        subtitle: "What to keep in mind once basic fights stop scaring you.",
        tone: "neutral",
        paragraphs: [
            "Once you’re deep into the story, fights stop being about raw levels and start being about how well your jobs and abilities mesh. Speed and turn order, reaction abilities, and positioning all matter a lot more when enemies can one-round squishier units.",
            "The core of FFTA2’s late-game power comes from stacking strong passives and reactions on jobs that can actually use them. Things like counter-style abilities, MP-efficient skills, and ways to ignore terrain or height let you control engagements instead of just trading hits.",
            "This guide assumes you will gradually upgrade from simple early-game builds into more synergistic teams: units that act often, hit hard without draining all their MP, and can survive being focused for a turn or two while your healer recovers the line."
        ]
    },
    {
        id: "quest-chains",
        title: "Notable Quest Chains & Side Missions",
        subtitle: "Which optional lines are worth tracking.",
        tone: "green",
        paragraphs: [
            "Not every side mission is created equal. Some exist mostly for flavor or minor rewards, while others unlock powerful jobs, repeatable loot, or entire new segments of the game. The guide highlights chains that meaningfully change what your clan can do or open up new strategies.",
            "Examples include story-adjacent arcs that introduce important characters, mission lines that lead to rare weapons or accessories, and chains that deepen the Heritor, sky pirate, or clan storyline payoffs. When these show up, the notes will make it clear why they are worth your time.",
            "You do not need to juggle a spreadsheet of quest names. Use this panel as a reminder that, when the guide calls out a chain explicitly, it’s because finishing it now either makes the upcoming story smoother or saves you tedious cleanup later."
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
            "Use this guide’s mission lists and notes to build small goal sets: finish a specific chain, unlock a certain class, or grab gear that pushes a favorite build to its final form. Treat postgame as a series of short, focused projects instead of one giant checklist."
        ]
    },
    {
        id: "closing",
        title: "Final Notes & Closing Thoughts",
        subtitle: "Wrap up the guide.",
        tone: "purple",
        paragraphs: [
            "FFTA2 is built to reward tinkering. This guide gives you a safe route through the story, points you at the most efficient trials, marks, and chains, and outlines the systems that matter most—but there is a lot of room to customize along the way.",
            "If you followed the suggested arcs and dipped into optional content when recommended, you should now have a clan that can handle anything Ivalice throws at it: story rematches, remaining quests, and your own challenge runs.",
            "From here, feel free to bend the rules. Try jobs you skipped, chase 100% completion, or replay arcs with different clan compositions. Use the mission and systems panels as reference when you need them, and ignore them when you already know exactly how you want to break the game."
        ]
    }
];

