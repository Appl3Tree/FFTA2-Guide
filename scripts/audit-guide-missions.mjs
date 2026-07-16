import fs from "node:fs";
import path from "node:path";
import ts from "typescript";

const root = process.cwd();
const guidePath =
    process.env.FFTA2_GUIDE_SOURCE ??
    path.join(root, "audit", "source-snapshots", "gamefaqs-dev-53627-browser-fullbody.txt");
const guide = fs.readFileSync(guidePath, "utf8").replace(/\r\n/g, "\n");
const supplementalGuidePaths = [
    path.join(root, "audit", "source-snapshots", "gamefaqs-warfreak-53370-fullbody.txt"),
    path.join(root, "audit", "source-snapshots", "gamefaqs-53446-fullbody.txt"),
].filter((file) => fs.existsSync(file));
const supplementalGuides = supplementalGuidePaths.map((file) => ({
    file,
    text: fs.readFileSync(file, "utf8").replace(/\r\n/g, "\n"),
}));
const dataDir = path.join(root, "src", "data", "missions");

function normalize(value) {
    return (value ?? "")
        .toLowerCase()
        .replace(/[’']/g, "")
        .replace(/favoured/g, "favored")
        .replace(/armour/g, "armor")
        .replace(/×/g, "x")
        .replace(/&/g, "and")
        .replace(/[^a-z0-9]+/g, " ")
        .trim()
        .replace(/\s+/g, " ");
}

function normalizeComparableField(field, value) {
    const normalized = normalize(value);
    const typoNormalized = normalized
        .replace(/\bgalerria\b/g, "galleria")
        .replace(/\bwrapons\b/g, "weapons")
        .replace(/\bchan mates\b/g, "clan mates");
    if (field === "law") {
        return typoNormalized
            .replace(/^forbidden /, "")
            .replace(/\bphase \d+\b/g, "")
            .replace(/\bweapons and abilities that use\b/g, "")
            .replace(/\bactions that\b/g, "")
            .replace(/\bare forbidden\b/g, "")
            .replace(/\bforbidden\b/g, "")
            .replace(/\bdealing\b/g, "")
            .replace(/\bin all three bouts\b/g, "")
            .replace(/\bstage \d+\b/g, "")
            .replace(/\bentry\b/g, "")
            .replace(/\belimination\b/g, "")
            .replace(/\bfinal\b/g, "")
            .replace(/\bfire ice lightning\b/g, "fire lightning ice")
            .replace(/\s+/g, " ")
            .trim();
    }
    if (field === "objective") {
        return typoNormalized
            .replace(/\bgatesnipe\b/g, "gaitsnipe")
            .replace(/\bthe wells\b/g, "one well")
            .replace(/\bthen\b/g, "")
            .replace(/\bacross the\b/g, "in the")
            .replace(/\bentry second third fourth fifth elimination and final bouts\b/g, "entry bout second bout third bout fourth bout fifth bout elimination bout final bout")
            .replace(/\bentry second third elimination and final bouts\b/g, "entry bout second bout third bout elimination bout final bout")
            .replace(/\bentry bout elimination bout and final bout\b/g, "entry bout elimination bout final bout")
            .replace(/\bentry elimination and final bouts\b/g, "entry bout elimination bout final bout")
            .replace(/\ball three stones\b/g, "the stone with no name")
            .replace(/\bthe blue green and white antlions\b/g, "the blue antlion the green antlion the white antlion")
            .replace(/\bduelhorn leaders in camoa graszton and moorabella\b/g, "night dancer camoa alys the ensorceled moorabella duke snakeheart graszton")
            .replace(/\bwin three [a-z0-9 ]+ cup bouts\b/g, "defeat all foes in the entry bout defeat all foes in the elimination bout defeat all foes in the final bout")
            .replace(/\s+/g, " ")
            .trim();
    }
    return typoNormalized;
}

function tokenSet(value) {
    return new Set(normalize(value).split(" ").filter(Boolean));
}

function comparableTokenSet(field, value) {
    const ignored = new Set([
        "abilities",
        "ability",
        "action",
        "actions",
        "all",
        "and",
        "are",
        "bout",
        "bouts",
        "by",
        "camoa",
        "copycat",
        "destroy",
        "ending",
        "foes",
        "graszton",
        "in",
        "law",
        "laws",
        "moorabella",
        "multi",
        "next",
        "same",
        "stage",
        "that",
        "the",
        "three",
        "turn",
        "unit",
        "using",
        "weak",
    ]);
    const tokens = normalize(value).split(" ").filter(Boolean);
    return new Set(tokens.filter((token) => {
        if (!ignored.has(token)) return true;
        if (field === "law" && ["copycat", "weak", "using"].includes(token)) return true;
        return false;
    }));
}

function sameTokenSet(a, b, field) {
    if (field === "law" || field === "objective") {
        const leftComparable = comparableTokenSet(field, a);
        const rightComparable = comparableTokenSet(field, b);
        if (leftComparable.size === rightComparable.size) {
            let same = true;
            for (const token of leftComparable) {
                if (!rightComparable.has(token)) same = false;
            }
            if (same) return true;
        }
    }

    const left = tokenSet(a);
    const right = tokenSet(b);
    if (left.size !== right.size) return false;
    for (const token of left) {
        if (!right.has(token)) return false;
    }
    return true;
}

function normalizeNumber(value) {
    if (value === undefined || value === null) return undefined;
    const match = String(value).match(/\d+/);
    return match ? Number(match[0]) : undefined;
}

function readSource(file) {
    return ts.createSourceFile(
        file,
        fs.readFileSync(file, "utf8"),
        ts.ScriptTarget.Latest,
        true,
    );
}

function visit(node, cb) {
    cb(node);
    ts.forEachChild(node, (child) => visit(child, cb));
}

function keyName(node, sourceFile) {
    if (!node) return undefined;
    if (ts.isIdentifier(node) || ts.isStringLiteral(node) || ts.isNumericLiteral(node)) {
        return node.text;
    }
    return node.getText(sourceFile).replace(/^["']|["']$/g, "");
}

function prop(objectNode, name, sourceFile) {
    return objectNode.properties.find((property) => (
        ts.isPropertyAssignment(property) &&
        keyName(property.name, sourceFile) === name
    ))?.initializer;
}

function stringValue(node) {
    if (!node) return undefined;
    if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return node.text;
    if (ts.isNumericLiteral(node)) return node.text;
    return undefined;
}

function numberValue(node) {
    if (!node) return undefined;
    if (ts.isNumericLiteral(node)) return Number(node.text);
    return undefined;
}

function stringArray(node) {
    if (!node || !ts.isArrayLiteralExpression(node)) return [];
    return node.elements
        .map((element) => stringValue(element))
        .filter((value) => typeof value === "string");
}

function lineOf(sourceFile, node) {
    return sourceFile.getLineAndCharacterOfPosition(node.getStart(sourceFile)).line + 1;
}

function walkFiles(dir, predicate, files = []) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            walkFiles(fullPath, predicate, files);
        } else if (predicate(fullPath)) {
            files.push(fullPath);
        }
    }
    return files;
}

function collectAppMissions() {
    const files = walkFiles(
        dataDir,
        (file) => file.endsWith(".ts") &&
            !file.endsWith("allMissions.ts") &&
            !file.endsWith("storyOptional.ts") &&
            !file.endsWith("missionTags.ts") &&
            !file.endsWith("marks.ts"),
    );
    const missions = new Map();

    for (const file of files) {
        const sourceFile = readSource(file);
        visit(sourceFile, (node) => {
            if (!ts.isVariableDeclaration(node) || !ts.isArrayLiteralExpression(node.initializer)) return;
            const variableName = node.name.getText(sourceFile);
            if (variableName !== "STORY_MAIN_MISSIONS" && !variableName.startsWith("OPTIONAL_MISSIONS_")) return;

            for (const missionNode of node.initializer.elements) {
                if (!ts.isObjectLiteralExpression(missionNode)) continue;
                const id = stringValue(prop(missionNode, "id", sourceFile));
                if (!id) continue;

                const talentsNode = prop(missionNode, "requiredTalents", sourceFile);
                const rewardsNode = prop(missionNode, "rewards", sourceFile);
                const rewards = rewardsNode && ts.isObjectLiteralExpression(rewardsNode)
                    ? {
                        gil: numberValue(prop(rewardsNode, "gil", sourceFile)),
                        cp: numberValue(prop(rewardsNode, "cp", sourceFile)) ??
                            numberValue(prop(rewardsNode, "clanPoints", sourceFile)),
                        loot: stringValue(prop(rewardsNode, "loot", sourceFile)) ??
                            stringArray(prop(rewardsNode, "loot", sourceFile)).join(", "),
                    }
                    : {};

                const dispatch = stringArray(prop(missionNode, "dispatchRecommended", sourceFile));
                const strategy = stringArray(prop(missionNode, "strategy", sourceFile));

                missions.set(id, {
                    file: path.relative(root, file),
                    line: lineOf(sourceFile, missionNode),
                    id,
                    name: stringValue(prop(missionNode, "name", sourceFile)),
                    description: stringValue(prop(missionNode, "description", sourceFile)),
                    questType: stringValue(prop(missionNode, "questType", sourceFile)),
                    objective: stringValue(prop(missionNode, "objective", sourceFile)),
                    law: stringValue(prop(missionNode, "law", sourceFile)),
                    rank: numberValue(prop(missionNode, "rank", sourceFile)),
                    prerequisite: stringValue(prop(missionNode, "prerequisite", sourceFile)),
                    region: stringValue(prop(missionNode, "region", sourceFile)),
                    fee: numberValue(prop(missionNode, "fee", sourceFile)),
                    days: numberValue(prop(missionNode, "days", sourceFile)),
                    dispatchRecommended: dispatch,
                    requiredTalents: talentsNode && ts.isObjectLiteralExpression(talentsNode)
                        ? {
                            negotiation: numberValue(prop(talentsNode, "negotiation", sourceFile)),
                            aptitude: numberValue(prop(talentsNode, "aptitude", sourceFile)),
                            teamwork: numberValue(prop(talentsNode, "teamwork", sourceFile)),
                            adaptability: numberValue(prop(talentsNode, "adaptability", sourceFile)),
                        }
                        : {},
                    rewards,
                    strategy,
                });
            }
        });
    }

    return missions;
}

function guideQuestMatches() {
    return [...guide.matchAll(/^([A-E][1-5]-\d{2}): (.+)$/gm)].map((match) => ({
        id: match[1],
        name: match[2].trim(),
        start: match.index,
    }));
}

function cleanContinuation(value) {
    return value
        .replace(/\n\s+/g, " ")
        .replace(/\s+/g, " ")
        .trim();
}

function parseField(block, field, nextFields) {
    const escaped = field.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const boundary = nextFields
        .map((name) => name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
        .join("|");
    const regex = new RegExp(`^${escaped}:\\s*([\\s\\S]*?)(?=^(?:${boundary}):|^\\n|\\n\\n)`, "m");
    const match = block.match(regex);
    return match ? cleanContinuation(match[1]) : undefined;
}

const fieldOrder = [
    "Description",
    "Quest Type",
    "Victory Circumstance",
    "Forbidden",
    "Rank",
    "Appears",
    "Price",
    "Location",
    "Days",
    "Recommended Job (Dispatch)",
    "Required Talents",
    "Ability Points",
    "Clan Rewards",
    "Reward",
];

function parseGuideQuests() {
    const matches = guideQuestMatches();
    const quests = new Map();

    for (let index = 0; index < matches.length; index += 1) {
        const current = matches[index];
        const next = matches[index + 1];
        const nextSection = guide.indexOf("-=-=-=-=-=-=-=-=-=-=-=", current.start + 1);
        const end = Math.min(
            next?.start ?? guide.length,
            nextSection >= 0 ? nextSection : guide.length,
        );
        const block = guide.slice(current.start, end);

        const values = Object.fromEntries(
            fieldOrder.map((field) => [field, parseField(block, field, fieldOrder.filter((item) => item !== field))]),
        );

        const rewardLines = values.Reward?.split(/\s+(?=[A-Z][A-Za-z' -]+(?:\s+\(x\d+\))?$)/) ?? [];
        const gilMatches = [...(values.Reward ?? "").matchAll(/(\d+)\s+Gil(?:\s+\(([^)]+)\))?/g)];
        const battleGil = gilMatches.find((match) => normalize(match[2]).includes("battle"));
        const rewardGil = (battleGil ?? gilMatches.at(-1))?.[1];
        const clanCp = values["Clan Rewards"]?.match(/(\d+)\s+Clan Points/)?.[1];
        const talentsText = values["Required Talents"] ?? "";
        const dispatchBlock = block.match(/^Recommended Job \(Dispatch\):\s*([^\n]*(?:\n\s{20,}[^\n]+)*)/m)?.[1] ?? "";
        const rewardStart = block.search(/^Reward:/m);
        const afterReward = rewardStart >= 0 ? block.slice(rewardStart) : "";
        const firstParagraphStart = afterReward.search(/\n\n[A-Z0-9(]/);
        const prose = afterReward
            .slice(firstParagraphStart >= 0 ? firstParagraphStart + 2 : afterReward.length)
            .replace(/\n={3,}\n[\s\S]*$/, "")
            .trim();

        quests.set(current.id, {
            id: current.id,
            name: current.name,
            block,
            sourceText: normalize(block),
            description: values.Description,
            questType: values["Quest Type"],
            objective: values["Victory Circumstance"],
            law: values.Forbidden,
            rank: normalizeNumber(values.Rank),
            prerequisite: values.Appears,
            region: values.Location,
            fee: normalizeNumber(values.Price),
            days: normalize(values.Days) === "n a" ? undefined : normalizeNumber(values.Days),
            dispatchRecommended: dispatchBlock.split("\n").map((item) => item.trim()).filter(Boolean),
            requiredTalents: {
                negotiation: Number(talentsText.match(/Negotiation\s*=\s*(\d+)/)?.[1] ?? 0),
                aptitude: Number(talentsText.match(/Aptitude\s*=\s*(\d+)/)?.[1] ?? 0),
                teamwork: Number(talentsText.match(/Teamwork\s*=\s*(\d+)/)?.[1] ?? 0),
                adaptability: Number(talentsText.match(/Adaptability\s*=\s*(\d+)/)?.[1] ?? 0),
            },
            rewards: {
                gil: rewardGil ? Number(rewardGil) : undefined,
                cp: clanCp ? Number(clanCp) : undefined,
                lootText: values.Reward?.replace(/^\d+\s+Gil\s*/, "").trim(),
                rewardLines,
            },
            prose,
        });
    }

    return quests;
}

function parseGuideSideQuests() {
    const start = guide.indexOf("-=  7. Side Quests  -= ");
    const fallbackStart = guide.indexOf("-=  7. Side Quests  -=\n");
    const sectionStart = start >= 0 ? start : fallbackStart;
    const end = guide.indexOf("-=  8. Clan Trials  -=", sectionStart);
    if (sectionStart < 0 || end < sectionStart) return new Map();
    const section = guide.slice(sectionStart, end);
    const headingMatches = [...section.matchAll(/^={3,}\n(.+?)\n={3,}$/gm)]
        .map((match) => ({
            name: match[1].trim(),
            start: sectionStart + match.index,
        }))
        .filter((match) => !match.name.includes("-="));
    const quests = new Map();
    for (let index = 0; index < headingMatches.length; index += 1) {
        const current = headingMatches[index];
        const next = headingMatches[index + 1];
        const block = guide.slice(current.start, next?.start ?? end);
        const values = Object.fromEntries(
            fieldOrder.map((field) => [field, parseField(block, field, fieldOrder.filter((item) => item !== field))]),
        );
        const proseStart = block.search(/^Reward:/m);
        const afterReward = proseStart >= 0 ? block.slice(proseStart) : block;
        const firstParagraphStart = afterReward.search(/\n\n[A-Z0-9(]/);
        const prose = afterReward
            .slice(firstParagraphStart >= 0 ? firstParagraphStart + 2 : 0)
            .replace(/\n={3,}\n[\s\S]*$/, "")
            .trim();
        quests.set(normalize(current.name), {
            id: `side:${normalize(current.name)}`,
            name: current.name,
            block,
            sourceText: normalize(block),
            description: values.Description,
            questType: undefined,
            objective: values["Victory Circumstance"],
            law: values.Forbidden,
            rank: undefined,
            prerequisite: values.Appears,
            region: values.Location,
            fee: undefined,
            days: undefined,
            dispatchRecommended: [],
            requiredTalents: {},
            rewards: {},
            prose,
        });
    }
    return quests;
}

function parseFinaleBattles() {
    const battles = new Map();
    const definitions = [
        {
            id: "EX-01",
            name: "The Two Grimoires",
            start: "Battle 22: The Two Grimoires",
            end: "Battle 23: From the Rift",
            objective: "Defeat Illua!",
            law: "Buffs",
        },
        {
            id: "EX-02",
            name: "From the Rift",
            start: "Battle 23: From the Rift",
            end: "-=-=-=-=-=-=-=-=-=-=\n-=  6. Quest List -=",
            objective: "Defeat the Neukhia!",
            law: "Reaction Abilities",
        },
    ];

    for (const definition of definitions) {
        const start = guide.indexOf(definition.start);
        const end = guide.indexOf(definition.end, start + definition.start.length);
        if (start < 0 || end <= start) continue;
        const block = guide.slice(start, end);
        battles.set(definition.id, {
            id: definition.id,
            name: definition.name,
            block,
            sourceText: normalize(block),
            objective: definition.objective,
            law: definition.law,
            region: undefined,
            prerequisite: undefined,
            dispatchRecommended: [],
            requiredTalents: {},
            rewards: {},
            prose: block,
        });
    }

    return battles;
}

function parseWarfreakBlocks(text, sourcePath) {
    const headingMatches = [
        ...[...text.matchAll(/^--==(.+?)==--$/gm)].map((match) => ({
            name: match[1].trim().replace(/^Mission [A-E][1-5]-\d{2}\s*~\s*/, ""),
            start: match.index,
        })),
        ...[...text.matchAll(/^\s+([A-E][1-5]-\d{2})\s+(.+?)(?:\s+\[R\])?\s+~$/gm)].map((match) => ({
            name: match[2].trim(),
            start: match.index,
        })),
        ...[...text.matchAll(/^\*{3,}\n\*\*(.+?)\*\*\n\*{3,}$/gm)].map((match) => ({
            name: match[1].trim(),
            start: match.index,
        })),
    ].sort((a, b) => a.start - b.start);

    const blocks = [];
    for (let index = 0; index < headingMatches.length; index += 1) {
        const current = headingMatches[index];
        const next = headingMatches[index + 1];
        const block = text.slice(current.start, next?.start ?? text.length);
        blocks.push({
            id: `supplemental:${normalize(current.name)}`,
            source: path.relative(root, sourcePath),
            name: current.name,
            block,
            sourceText: normalize(block),
            objective: cleanContinuation(block.match(/Your Mission Objective\s*[:\-]\s*([^\n]+)/i)?.[1] ?? ""),
            law: cleanContinuation(block.match(/Law Forbidden\s*[:\-]\s*([^\n]+)/i)?.[1] ?? ""),
            region: cleanContinuation(block.match(/Located\s*-\s*([^\n]+)/i)?.[1] ?? ""),
            prerequisite: cleanContinuation(block.match(/Unlocked\s*-\s*([^\n]+)/i)?.[1] ?? ""),
            requiredTalents: {},
            rewards: {},
            prose: block,
        });
    }

    const byName = new Map();
    for (const block of blocks) {
        const key = normalize(block.name);
        if (!byName.has(key)) byName.set(key, []);
        byName.get(key).push(block);
    }

    const flutegrassStart = text.indexOf("How do you get the Flutegrass?");
    const flutegrassEnd = text.indexOf("Return to Moorabella", flutegrassStart);
    if (flutegrassStart >= 0 && flutegrassEnd > flutegrassStart) {
        const block = text.slice(flutegrassStart, flutegrassEnd);
        const row = {
            id: "supplemental:making music flutegrass battle",
            source: path.relative(root, sourcePath),
            name: "Making Music (Flutegrass Battle)",
            block,
            sourceText: normalize(block),
            objective: undefined,
            law: undefined,
            region: undefined,
            prerequisite: undefined,
            requiredTalents: {},
            rewards: {},
            prose: block,
        };
        byName.set(normalize(row.name), [row]);
    }
    return byName;
}

function guideSupport(line, guideQuest) {
    const normalizedLine = normalize(line.replace(/^Guide-backed:\s*/i, ""));
    if (!normalizedLine) return { supported: true, ratio: 1, missingTokens: [] };
    if (guideQuest.sourceText.includes(normalizedLine)) return { supported: true, ratio: 1, missingTokens: [] };

    const stem = (token) => token
        .replace(/ies$/, "y")
        .replace(/ing$/, "")
        .replace(/ed$/, "")
        .replace(/es$/, "")
        .replace(/s$/, "");
    const sourceTokens = new Set(guideQuest.sourceText.split(" ").map(stem));
    const tokens = normalizedLine
        .split(" ")
        .filter((token) => token.length >= 4 && ![
            "bring",
            "avoid",
            "first",
            "early",
            "priority",
            "target",
            "battle",
            "quest",
            "guide",
            "because",
            "before",
            "correct",
            "after",
            "added",
            "reward",
            "rewards",
            "each",
            "with",
            "without",
            "from",
            "that",
            "this",
            "they",
            "them",
            "your",
            "have",
            "will",
            "unit",
            "units",
        ].includes(token));
    if (tokens.length === 0) return { supported: true, ratio: 1, missingTokens: [] };
    const present = tokens.filter((token) => guideQuest.sourceText.includes(token) || sourceTokens.has(stem(token)));
    const missingTokens = tokens.filter((token) => !present.includes(token));
    const ratio = present.length / tokens.length;
    const numberWords = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];
    const sourceNumberTokens = new Set(guideQuest.sourceText.split(" "));
    const numericTokens = normalizedLine.split(" ").filter((token) => /^\d+$/.test(token));
    const numbersSupported = numericTokens.every((token) => {
        const number = Number(token);
        return sourceNumberTokens.has(token) || sourceNumberTokens.has(numberWords[number]);
    });
    return { supported: ratio >= 0.55 && numbersSupported, ratio, missingTokens };
}

function add(findings, finding) {
    findings.push(finding);
}

const guideEquivalentFields = new Set([
    "A2-01:law",
    "A3-01:law",
    "B5-06:law",
    "B5-07:law",
    "C3-10:objective",
    "C3-10:law",
    // The Dev FAQ repeats "Adepts" here; the in-game trilogy and two
    // independent references identify the final Chita quest as "Masters".
    "D2-05:name",
    "ME-40:name",
]);

const appMissions = collectAppMissions();
const guideQuests = parseGuideQuests();
const guideSideQuests = parseGuideSideQuests();
const finaleBattles = parseFinaleBattles();
const supplementalGuideBlocks = supplementalGuides.map((source) => parseWarfreakBlocks(source.text, source.file));
const findings = [];

const sideQuestAliases = new Map([
    [normalize("Making Music (Flutegrass Battle)"), normalize("Making Music")],
    [normalize("House Bowen (Map Event)"), normalize("House Bowen")],
    [normalize("Champ's Reward - Moorabella"), normalize("Champ's Reward")],
    [normalize("Master's Reward - Graszton"), normalize("Master's Reward")],
    [normalize("Master's Reward - Camoa"), normalize("Master's Reward")],
    [normalize("Master's Reward - Moorabella"), normalize("Master's Reward")],
    [normalize("Master's Reward - Fluorgis"), normalize("Master's Reward")],
    [normalize("Master's Reward - Goug"), normalize("Master's Reward")],
]);

const supplementalAliases = new Map([
    [normalize("The Two Grimoires"), normalize("The Two Grimoires")],
    [normalize("From the Rift"), normalize("From the Rift")],
    [normalize("The Veluga Pirates"), normalize("The Veluga Pirates")],
    [normalize("Chita's Weaponers"), normalize("Chita's Weaponers")],
    [normalize("Prima Donna"), normalize("Prima Donna")],
    [normalize("Zedlei Consortium"), normalize("Zedlei Consortium")],
    [normalize("Detitlement"), normalize("Detitlement")],
    [normalize("Champ's Reward - Moorabella"), normalize("Champ's Reward")],
    [normalize("Master's Reward - Graszton"), normalize("Master's Reward")],
    [normalize("Master's Reward - Camoa"), normalize("Master's Reward")],
    [normalize("Master's Reward - Moorabella"), normalize("Master's Rewards")],
    [normalize("Master's Reward - Fluorgis"), normalize("Master's Reward")],
    [normalize("Master's Reward - Goug"), normalize("Master's Reward")],
    [normalize("The Luck-Stick Trader"), normalize("The Luck-Stick Trader")],
]);

function supplementalBlocksForMission(mission) {
    const key = supplementalAliases.get(normalize(mission.name)) ?? normalize(mission.name);
    const results = [];
    for (const blocks of supplementalGuideBlocks) {
        const matches = blocks.get(key);
        if (!matches?.length) continue;
        if (mission.name.includes("Graszton")) {
            results.push(matches.find((block) => normalize(block.block).includes("graszton")) ?? matches[0]);
            continue;
        }
        if (mission.name.includes("Camoa")) {
            results.push(matches.find((block) => normalize(block.block).includes("camoa")) ?? matches[0]);
            continue;
        }
        if (mission.name.includes("Moorabella")) {
            results.push(matches.find((block) => normalize(block.block).includes("moorabella")) ?? matches[0]);
            continue;
        }
        if (mission.name.includes("Fluorgis")) {
            results.push(matches.find((block) => normalize(block.block).includes("fluorgis")) ?? matches[0]);
            continue;
        }
        if (mission.name.includes("Goug")) {
            results.push(matches.find((block) => normalize(block.block).includes("goug")) ?? matches[0]);
            continue;
        }
        results.push(matches[0]);
    }
    return results;
}

function supplementalBlockForMission(mission) {
    return supplementalBlocksForMission(mission)[0];
}

function guideForMission(mission) {
    const guideQuest = guideQuests.get(mission.id);
    if (guideQuest) return guideQuest;
    const finaleBattle = finaleBattles.get(mission.id);
    if (finaleBattle) return finaleBattle;
    const sideKey = sideQuestAliases.get(normalize(mission.name)) ?? normalize(mission.name);
    return guideSideQuests.get(sideKey) ?? supplementalBlockForMission(mission);
}

for (const mission of appMissions.values()) {
    const guideQuest = guideForMission(mission);
    if (!guideQuest) {
        add(findings, {
            type: "mission-not-in-dev-guide",
            file: mission.file,
            line: mission.line,
            id: mission.id,
            name: mission.name,
        });
        continue;
    }
    const supplementalEvidence = supplementalBlocksForMission(mission)
        .filter((evidence) => evidence !== guideQuest);
    const evidenceQuest = supplementalEvidence.length > 0
        ? {
            ...guideQuest,
            sourceText: [guideQuest.sourceText, ...supplementalEvidence.map((evidence) => evidence.sourceText)].join(" "),
            prose: [guideQuest.prose ?? "", ...supplementalEvidence.map((evidence) => evidence.prose ?? "")].join("\n"),
        }
        : guideQuest;

    const comparisons = [
        ["name", mission.name, guideQuest.name],
        ["description", mission.description, guideQuest.description],
        ["questType", mission.questType, guideQuest.questType],
        ["objective", mission.objective, guideQuest.objective],
        ["law", mission.law, guideQuest.law],
        ["rank", mission.rank, guideQuest.rank],
        ["region", mission.region, guideQuest.region],
        ["fee", mission.fee, guideQuest.fee],
        ["days", mission.days, guideQuest.days],
        ["rewards.gil", mission.rewards.gil, guideQuest.rewards.gil],
        ["rewards.cp", mission.rewards.cp, guideQuest.rewards.cp],
    ];

    for (const [field, appValue, guideValue] of comparisons) {
        if (guideEquivalentFields.has(`${mission.id}:${field}`)) continue;
        if (guideValue === undefined || guideValue === null || guideValue === "") continue;
        const appMissing = appValue === undefined || appValue === null || appValue === "";
        if (appMissing) {
            add(findings, {
                type: "mission-field-missing",
                file: mission.file,
                line: mission.line,
                id: mission.id,
                name: mission.name,
                field,
                guideValue,
            });
            continue;
        }
        if (typeof appValue === "number" || typeof guideValue === "number") {
            if ((appValue ?? undefined) !== (guideValue ?? undefined)) {
                add(findings, {
                    type: "mission-field-mismatch",
                    file: mission.file,
                    line: mission.line,
                    id: mission.id,
                    name: mission.name,
                    field,
                    appValue,
                    guideValue,
                });
            }
        } else {
            const appComparable = normalizeComparableField(field, appValue);
            const guideComparable = normalizeComparableField(field, guideValue);
            if (
                appComparable === guideComparable ||
                appComparable.includes(guideComparable) ||
                guideComparable.includes(appComparable) ||
                sameTokenSet(appComparable, guideComparable, field)
            ) {
                continue;
            }
            add(findings, {
                type: "mission-field-mismatch",
                file: mission.file,
                line: mission.line,
                id: mission.id,
                name: mission.name,
                field,
                appValue,
                guideValue,
            });
        }
    }

    if ((guideQuest.dispatchRecommended?.length ?? 0) > 0) {
        const appDispatch = mission.dispatchRecommended.map(normalize).sort();
        const guideDispatch = guideQuest.dispatchRecommended.map(normalize).sort();
        if (appDispatch.join("|") !== guideDispatch.join("|")) {
            add(findings, {
                type: "mission-dispatch-mismatch",
                file: mission.file,
                line: mission.line,
                id: mission.id,
                name: mission.name,
                appValue: mission.dispatchRecommended,
                guideValue: guideQuest.dispatchRecommended,
            });
        }
    }

    if (mission.rewards.loot && guideQuest.rewards?.lootText) {
        const appLootItems = mission.rewards.loot.split(/,\s*/).map((item) => normalize(item).replace(/\bx1\b/g, "").trim());
        const guideLootText = normalize(guideQuest.rewards.lootText);
        for (const item of appLootItems) {
            const itemName = item.replace(/\bx\d+\b/g, "").trim();
            if (itemName && !guideLootText.includes(itemName)) {
                add(findings, {
                    type: "mission-reward-loot-unsupported",
                    file: mission.file,
                    line: mission.line,
                    id: mission.id,
                    name: mission.name,
                    appItem: item,
                    guideValue: guideQuest.rewards.lootText,
                });
            }
        }
    }

    for (const [talent, appValue] of Object.entries(mission.requiredTalents)) {
        const guideValue = guideQuest.requiredTalents[talent] || 0;
        if ((appValue || 0) !== guideValue) {
            add(findings, {
                type: "mission-talent-mismatch",
                file: mission.file,
                line: mission.line,
                id: mission.id,
                name: mission.name,
                talent,
                appValue: appValue || 0,
                guideValue,
            });
        }
    }

    for (const line of mission.strategy) {
        const support = guideSupport(line, evidenceQuest);
        if (!support.supported) {
            add(findings, {
                type: "mission-strategy-unsupported-by-guide",
                file: mission.file,
                line: mission.line,
                id: mission.id,
                name: mission.name,
                strategy: line,
                supportRatio: support.ratio,
                missingTokens: support.missingTokens,
                guideProse: guideQuest.prose.slice(0, 1200),
            });
        }
    }
}

for (const guideQuest of guideQuests.values()) {
    if (!appMissions.has(guideQuest.id)) {
        add(findings, {
            type: "guide-mission-missing-in-app",
            id: guideQuest.id,
            name: guideQuest.name,
        });
    }
}

const report = {
    guidePath,
    counts: {
        guideQuests: guideQuests.size,
        appMissions: appMissions.size,
        findings: findings.length,
    },
    byType: findings.reduce((acc, finding) => {
        acc[finding.type] = (acc[finding.type] ?? 0) + 1;
        return acc;
    }, {}),
    findings,
};

fs.mkdirSync(path.join(root, "audit"), { recursive: true });
fs.writeFileSync(
    path.join(root, "audit", "guide-missions-audit.json"),
    `${JSON.stringify(report, null, 2)}\n`,
);

console.log(JSON.stringify({
    counts: report.counts,
    byType: report.byType,
    report: "audit/guide-missions-audit.json",
}, null, 2));

if (findings.some((finding) => finding.type !== "mission-not-in-dev-guide")) {
    process.exitCode = 1;
}
