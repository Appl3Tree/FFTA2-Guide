import fs from "node:fs";
import path from "node:path";
import { build } from "esbuild";

const root = process.cwd();

function normalize(value) {
    return String(value ?? "")
        .normalize("NFKD")
        .toLowerCase()
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, " ")
        .trim()
        .replace(/\s+/g, " ");
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

if (missions.length !== 347) {
    add(findings, "canonical-count", null, `Expected 347; found ${missions.length}.`);
}
if (questReportMissions.length !== 300) {
    add(
        findings,
        "quest-report-count",
        null,
        `Expected 300; found ${questReportMissions.length}.`,
    );
}
if (otherMissions.length !== 47) {
    add(
        findings,
        "other-mission-count",
        null,
        `Expected 47; found ${otherMissions.length}.`,
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
    const expectedIdPattern = mission.arc === "EX" || mission.arc === "ME"
        ? /^(?:EX|ME)-\d{2}$/
        : /^[A-E][1-5]-\d{2}$/;

    if (!expectedIdPattern.test(mission.id)) {
        add(findings, "invalid-id-format", mission);
    }
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

for (const [id, rows] of Object.entries(Object.groupBy(missions, (mission) => mission.id))) {
    if (rows.length > 1) {
        add(findings, "duplicate-id", rows[0], id);
    }
}

for (const [name, rows] of Object.entries(
    Object.groupBy(questReportMissions, (mission) => normalize(mission.name)),
)) {
    if (rows.length > 1) {
        add(findings, "duplicate-quest-name", rows[0], name);
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
    counts: {
        canonicalMissions: missions.length,
        questReportMissions: questReportMissions.length,
        otherMissions: otherMissions.length,
        missionsWithGuidance: missions.filter((mission) => mission.strategy?.length).length,
        findings: findings.length,
    },
    byType: Object.fromEntries(
        Object.entries(Object.groupBy(findings, (finding) => finding.type)).map(
            ([type, rows]) => [type, rows.length],
        ),
    ),
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
            byType: report.byType,
            report: "audit/mission-completeness-audit.json",
        },
        null,
        2,
    ),
);

if (findings.length) process.exitCode = 1;
