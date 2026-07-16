import fs from "node:fs";
import path from "node:path";
import { build } from "esbuild";

const root = process.cwd();
const primaryGuidePath = path.join(
    root,
    "audit/source-snapshots/gamefaqs-dev-53627-browser-fullbody.txt",
);
const secondaryGuidePath = path.join(
    root,
    "audit/source-snapshots/thonky-all-quest-guides.html",
);

function normalize(value) {
    return String(value ?? "")
        .normalize("NFKD")
        .toLowerCase()
        .replace(/[’']/g, "")
        .replace(/[^a-z0-9]+/g, " ")
        .trim()
        .replace(/\s+/g, " ");
}

function decodeHtml(value) {
    return value
        .replace(/<[^>]+>/g, "")
        .replace(/&(?:#39|apos);/g, "'")
        .replace(/&#x2019;/g, "’")
        .replace(/&amp;/g, "&")
        .replace(/&quot;/g, '"')
        .trim();
}

async function loadMissions() {
    const result = await build({
        stdin: {
            contents: `import { ALL_MISSIONS } from "./src/data/missions/allMissions.ts"; export default ALL_MISSIONS;`,
            resolveDir: root,
            sourcefile: "mission-completeness-entry.ts",
            loader: "ts",
        },
        bundle: true,
        platform: "node",
        format: "esm",
        write: false,
        logLevel: "silent",
    });
    const source = result.outputFiles[0].text;
    const module = await import(
        `data:text/javascript;base64,${Buffer.from(source).toString("base64")}`
    );
    return module.default;
}

function add(findings, type, mission, detail) {
    findings.push({
        type,
        ...(mission ? { id: mission.id, name: mission.name } : {}),
        ...(detail ? { detail } : {}),
    });
}

const missions = await loadMissions();
const questReportMissions = missions.filter(
    (mission) => mission.arc !== "EX" && mission.arc !== "ME",
);
const otherMissions = missions.filter(
    (mission) => mission.arc === "EX" || mission.arc === "ME",
);
const findings = [];

if (missions.length !== 346) {
    add(findings, "canonical-count", null, `Expected 346; found ${missions.length}.`);
}
if (questReportMissions.length !== 300) {
    add(
        findings,
        "quest-report-count",
        null,
        `Expected 300; found ${questReportMissions.length}.`,
    );
}
if (otherMissions.length !== 46) {
    add(
        findings,
        "other-mission-count",
        null,
        `Expected 46; found ${otherMissions.length}.`,
    );
}

for (const field of ["id", "arc", "name", "description", "region", "questType"]) {
    for (const mission of missions) {
        if (!String(mission[field] ?? "").trim()) {
            add(findings, "required-field-missing", mission, field);
        }
    }
}

for (const mission of missions) {
    if (!Array.isArray(mission.enemies)) {
        add(findings, "enemies-not-array", mission);
    }
    if (!mission.rewards || mission.rewards.gil == null) {
        add(findings, "rewards-missing", mission);
    }
    if (!mission.tags?.length) {
        add(findings, "tags-missing", mission);
    }
    if (!mission.strategy?.length || mission.strategy.some((step) => !step.trim())) {
        add(findings, "strategy-missing", mission);
    }
    if (mission.enemies?.length && !mission.objective?.trim()) {
        add(findings, "combat-objective-missing", mission);
    }
    if (mission.enemies?.length && !mission.law?.trim()) {
        add(findings, "combat-law-missing", mission);
    }
}

const duplicateIds = Object.entries(Object.groupBy(missions, (mission) => mission.id))
    .filter(([, rows]) => rows.length > 1);
for (const [id, rows] of duplicateIds) {
    add(findings, "duplicate-id", rows[0], id);
}

const duplicateQuestNames = Object.entries(
    Object.groupBy(questReportMissions, (mission) => normalize(mission.name)),
).filter(([, rows]) => rows.length > 1);
for (const [name, rows] of duplicateQuestNames) {
    add(findings, "duplicate-quest-name", rows[0], name);
}

const primaryGuide = fs.readFileSync(primaryGuidePath, "utf8");
const primaryIds = new Set(
    [...primaryGuide.matchAll(/^([A-E][1-5]-\d{2}):\s+.+$/gm)].map(
        (match) => match[1],
    ),
);
if (primaryIds.size !== 300) {
    add(
        findings,
        "primary-source-count",
        null,
        `Expected 300 structured quest IDs; found ${primaryIds.size}.`,
    );
}
for (const mission of questReportMissions) {
    if (!primaryIds.has(mission.id)) {
        add(findings, "primary-source-missing", mission);
    }
}

const secondaryGuide = fs.readFileSync(secondaryGuidePath, "utf8");
const secondaryNames = [
    ...secondaryGuide.matchAll(/<h3\b[^>]*>([\s\S]*?)<\/h3>/gi),
].map((match) => decodeHtml(match[1]));
if (secondaryNames.length !== 300) {
    add(
        findings,
        "secondary-source-count",
        null,
        `Expected 300 quest headings; found ${secondaryNames.length}.`,
    );
}
const secondaryNameSet = new Set(secondaryNames.map(normalize));
const secondaryAliases = new Map([
    [normalize("Devilish Delight"), normalize("Devilish Delights")],
]);
for (const mission of questReportMissions) {
    const name = normalize(mission.name);
    const sourceName = secondaryAliases.get(name) ?? name;
    if (!secondaryNameSet.has(sourceName)) {
        add(findings, "secondary-source-missing", mission);
    }
}

const harvest = missions.find((mission) => mission.id === "C1-14");
const harvestText = harvest?.strategy?.join(" ") ?? "";
for (const pattern of [
    /six fruit trees/i,
    /four rounds/i,
    /choose Gather/i,
    /keep arriving/i,
    /Harming the Weak/i,
]) {
    if (!pattern.test(harvestText)) {
        add(findings, "harvest-guidance-incomplete", harvest, String(pattern));
    }
}

const report = {
    generatedAt: new Date().toISOString(),
    sources: [
        {
            name: "GameFAQs guide by Dev, version 1.25",
            url: "https://gamefaqs.gamespot.com/ds/937330-final-fantasy-tactics-a2-grimoire-of-the-rift/faqs/53627",
            coverage: "Structured contract fields and walkthrough evidence for all 300 Quest Report quests.",
        },
        {
            name: "Thonky all quest guides",
            url: "https://www.thonky.com/ffta2/all-quest-guides",
            coverage: "Independent title and quest-set validation for all 300 Quest Report quests.",
        },
        {
            name: "GameFAQs supplemental guides by warfreak and Dark_Vortex",
            coverage: "Additional battle strategy, enemy, finale, and map-event evidence.",
        },
    ],
    counts: {
        canonicalMissions: missions.length,
        questReportMissions: questReportMissions.length,
        otherMissions: otherMissions.length,
        missionsWithGuidance: missions.filter((mission) => mission.strategy?.length).length,
        primaryStructuredQuests: primaryIds.size,
        secondaryQuestHeadings: secondaryNames.length,
        findings: findings.length,
    },
    findings,
};

fs.mkdirSync(path.join(root, "audit"), { recursive: true });
fs.writeFileSync(
    path.join(root, "audit/mission-completeness-audit.json"),
    `${JSON.stringify(report, null, 2)}\n`,
);

console.log(
    JSON.stringify(
        {
            counts: report.counts,
            byType: findings.reduce((counts, finding) => {
                counts[finding.type] = (counts[finding.type] ?? 0) + 1;
                return counts;
            }, {}),
            report: "audit/mission-completeness-audit.json",
        },
        null,
        2,
    ),
);

if (findings.length) process.exitCode = 1;
