import type { FaqItem } from "../../types/ffta2";

export const FAQ_ITEMS: FaqItem[] = [
    {
        id: "failed-missions",
        question: "What happens if I fail or cancel a mission?",
        answer: "Most non-story quests can be attempted again after they rotate back into the pub roster. The Other tab shows how many days remain before an unavailable quest returns. Canceling a quest is done from Current Quests at a pub, but the quest fee is not refunded. Main story quests generally cannot be canceled, and failing one is treated much more seriously than failing an ordinary pub quest.",
        tags: ["Missions", "Failure"],
    },
    {
        id: "dispatch-failure",
        question: "Why do my dispatch missions keep failing?",
        answer: "Dispatch success is not random guesswork. Some dispatches want a specific job, race, or recommended role; others care about level, MVP status, and how suitable the chosen unit or team looks. If the dispatch screen shows a unit jumping or cheering, that is a strong success signal. If the best candidates look sad or neutral, do the mission manually when possible or come back later.",
        tags: ["Dispatch", "MVP"],
    },
    {
        id: "manual-dispatch",
        question: "Do I have to dispatch quests, or can I play them myself?",
        answer: "Many FFTA2 dispatch quests can be completed manually instead of sending units away. Manual play is often better when your dispatch odds are poor, when you want steals or loot, or when the objective has a specific trick. True send-away dispatches still need the right unit, so check the mission's member count and recommended job before committing.",
        tags: ["Dispatch", "Quests"],
    },
    {
        id: "missing-quests",
        question: "Why won't a quest show up at the pub?",
        answer: "Quests commonly have hidden gates: main story progress, previous quests in a chain, required notices or rumors, clan talent levels, location access, month/season timing, or required items. If a quest is missing, advance the story a little, read new pub notices, check the chain prerequisite, and raise clan talents through trials or other quests.",
        tags: ["Quests", "Unlocks"],
    },
    {
        id: "laws-break",
        question: "Is it ever worth breaking a law?",
        answer: "In normal battles, breaking a law removes the judge support, privilege, revival safety, and law bonus, but it is sometimes still the safest way to win. Clan Trials are different: several trials require you to obey the law, and breaking it can fail the trial outright. Treat laws as a risk decision, not a moral rule.",
        tags: ["Laws", "Trials"],
    },
    {
        id: "revive-allies",
        question: "How do I revive someone during battle?",
        answer: "Early on, buy Phoenix Downs and give a unit the Item action ability so they can actually use them. Later options include White Mage's Raise, White Monk's Revive, and Summoner's Phoenix. If you broke the law and lost the judge, do not count on judge support to bail out fallen units.",
        tags: ["Battle", "Items"],
    },
    {
        id: "learn-abilities",
        question: "Why did my unit lose an ability after changing equipment?",
        answer: "Gear teaches abilities, but the unit only keeps an ability permanently after earning its AP cost. Keep the item equipped until the ability is mastered, then set the learned ability in the unit's action, reaction, or passive slots. Before that point, swapping the weapon or armor can make the ability disappear from the usable list.",
        tags: ["Abilities", "Equipment"],
    },
    {
        id: "equipment-locks",
        question: "Why can't this unit equip a weapon or armor I bought?",
        answer: "Equipment is restricted by race, job, slot, and sometimes hand usage. A sword that works for one job may be unavailable to another, and two-handed weapons can conflict with shields. In shops and unit menus, use the equipment help/details view to check which jobs can equip an item before spending gil.",
        tags: ["Equipment", "Jobs"],
    },
    {
        id: "unlock-jobs",
        question: "Why are jobs unlocking so slowly?",
        answer: "Most jobs unlock after mastering enough action abilities in prerequisite jobs, so your job growth is tied to Bazaar gear and AP. Some jobs also require specific quests. If a job is missing, check both requirements: the learned abilities for that race and whether a job-unlock quest has been cleared.",
        tags: ["Jobs", "Abilities"],
    },
    {
        id: "bazaar-sell",
        question: "Should I sell loot or put it into the Bazaar?",
        answer: "Use loot for Bazaar recipes unless you have a specific reason to hold it. Bazaar unlocks are how many new weapons, armor, accessories, and ability-teaching items enter shops. After unlocking an item, remember that you still need to buy it from the shop, and some recipes may need to be made again for extra copies.",
        tags: ["Bazaar", "Loot"],
    },
    {
        id: "clan-trials",
        question: "What are clan trials and talents actually for?",
        answer: "Clan Trials are special battles that change Negotiation, Aptitude, Teamwork, and Adaptability, unlock or improve privileges, raise clan rank, and sometimes give shop or quest discounts. Those talents also gate quests and trials, so low talents can be the reason content is missing. Spend clan points carefully because trials and auctions both use them.",
        tags: ["Clan Trials", "Talents"],
    },
    {
        id: "underleveled",
        question: "Am I underleveled, undergeared, or just on a hard mission?",
        answer: "A sudden spike usually means all three are possible. Pearls in the Deep is a common wall, and auction revenge battles can also be rough early. Clear nearby sidequests manually, update Bazaar gear, learn a few key abilities, and run clan trials for stronger privileges before forcing the next story fight.",
        tags: ["Difficulty", "Progression"],
    },
    {
        id: "ap-mastery",
        question: "Can I run out of missions before mastering abilities?",
        answer: "No. AP is effectively renewable because the game has repeatable quests, random encounters in many areas, and postgame content. You do not need to master everything during the story. Prioritize healing, revival, core damage, mobility, and job-unlock requirements first; completionist mastery can wait.",
        tags: ["AP", "Postgame"],
    },
    {
        id: "starting-units",
        question: "Should I replace my starting units with better recruits?",
        answer: "Usually no. Keep early units if you like them, because low-level stat differences are not worth stressing over in a normal run. Replacing or dismissing units mostly matters for min-maxing, controlling clan average level for special recruits, or filling a race/job role your roster lacks.",
        tags: ["Roster", "Recruiting"],
    },
    {
        id: "auctions",
        question: "Are auctions worth doing early?",
        answer: "Yes, but save beforehand and do not spend clan points blindly. Territory auctions eventually lead into item auctions, and winning can give useful gear or rare items earlier than normal progression. If the follow-up rival clan fights are too hard, leave them until your levels, gear, and privileges catch up.",
        tags: ["Auctions", "Rewards"],
    },
];
