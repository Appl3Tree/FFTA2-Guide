import fs from "node:fs";
import path from "node:path";
import { build } from "esbuild";

const root = process.cwd();

function normalize(value) {
    return String(value ?? "")
        .normalize("NFKD")
        .toLowerCase()
        .replace(/[’']/g, "")
        .replace(/[^a-z0-9]+/g, " ")
        .trim()
        .replace(/\s+/g, " ");
}

async function loadFinalMissionData() {
    const result = await build({
        stdin: {
            contents: `
                import { ALL_MISSIONS } from "./src/data/missions/allMissions.ts";
                import { CURATED_MISSION_GUIDANCE } from "./src/data/missions/curatedMissionGuidance.ts";
                export default { missions: ALL_MISSIONS, curatedGuidance: CURATED_MISSION_GUIDANCE };
            `,
            resolveDir: root,
            sourcefile: "mission-detail-audit-entry.ts",
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

function collectStrings(value, strings = []) {
    if (typeof value === "string") {
        strings.push(value);
        return strings;
    }
    if (Array.isArray(value)) {
        for (const item of value) collectStrings(item, strings);
        return strings;
    }
    if (value && typeof value === "object") {
        for (const item of Object.values(value)) collectStrings(item, strings);
    }
    return strings;
}

const { missions, curatedGuidance } = await loadFinalMissionData();
const byId = new Map(missions.map((mission) => [mission.id, mission]));
const findings = [];

function add(type, mission, detail) {
    findings.push({
        type,
        ...(mission ? { id: mission.id, name: mission.name } : {}),
        ...(detail ? { detail } : {}),
    });
}

function expectPatterns(id, area, value, patterns) {
    const mission = byId.get(id);
    if (!mission) {
        add("high-risk-mission-missing", null, id);
        return;
    }
    const text = Array.isArray(value) ? value.join(" ") : String(value ?? "");
    for (const pattern of patterns) {
        if (!pattern.test(text)) {
            add("high-risk-detail-missing", mission, `${area}: ${pattern}`);
        }
    }
}

const questReportMissions = missions.filter(
    (mission) => mission.arc !== "EX" && mission.arc !== "ME",
);
const otherMissions = missions.filter(
    (mission) => mission.arc === "EX" || mission.arc === "ME",
);
const combatMissions = missions.filter((mission) => mission.enemies.length > 0);
const nonCombatMissions = missions.filter((mission) => mission.enemies.length === 0);

if (missions.length !== 347) {
    add("canonical-count", null, `Expected 347; found ${missions.length}.`);
}
if (questReportMissions.length !== 300) {
    add(
        "quest-report-count",
        null,
        `Expected 300; found ${questReportMissions.length}.`,
    );
}
if (otherMissions.length !== 47) {
    add("other-mission-count", null, `Expected 47; found ${otherMissions.length}.`);
}

const duplicateIds = Object.entries(Object.groupBy(missions, (mission) => mission.id))
    .filter(([, rows]) => rows.length > 1);
for (const [id, rows] of duplicateIds) {
    add("duplicate-id", rows[0], id);
}

const auctionRewardTitles = new Map([
    ["ME-37", "Champ's Reward - Moorabella"],
    ["ME-38", "Master's Reward - Graszton"],
    ["ME-39", "Master's Reward - Camoa"],
    ["ME-40", "Master's Rewards - Moorabella"],
    ["ME-41", "Master's Reward - Fluorgis"],
    ["ME-42", "Master's Reward - Goug"],
]);
for (const [id, expectedTitle] of auctionRewardTitles) {
    const mission = byId.get(id);
    if (!mission) {
        add("auction-reward-event-missing", null, id);
        continue;
    }
    if (mission.name !== expectedTitle) {
        add("auction-reward-title-mismatch", mission, expectedTitle);
    }
    if (mission.series !== "Auction reward events") {
        add("auction-reward-series-missing", mission);
    }
    for (const alias of ["Champ's Reward", "Master's Reward"]) {
        if (!mission.searchAliases?.includes(alias)) {
            add("auction-reward-search-alias-missing", mission, alias);
        }
    }
    if (id === "ME-37") {
        if (!/Area Champion of Moorabella/i.test(mission.prerequisite ?? "")) {
            add("champ-reward-prerequisite-mismatch", mission);
        }
    } else if (
        !/Champion for Life/i.test(mission.prerequisite ?? "") ||
        !/every auction area/i.test(mission.prerequisite ?? "")
    ) {
        add("master-reward-prerequisite-mismatch", mission);
    }
}

for (const mission of combatMissions) {
    if (!mission.objective?.trim()) add("combat-objective-missing", mission);
    if (!mission.law?.trim()) add("combat-law-missing", mission);
    if (!mission.strategy?.length || mission.strategy.length < 2) {
        add(
            "combat-strategy-too-short",
            mission,
            `${mission.strategy?.length ?? 0} steps`,
        );
    }
    for (const [index, enemy] of mission.enemies.entries()) {
        if (![enemy.name, enemy.job, enemy.race].some((value) => value?.trim())) {
            add("enemy-identity-missing", mission, `Enemy ${index + 1}`);
        }
        if (enemy.quantity != null && enemy.quantity < 1) {
            add("enemy-quantity-invalid", mission, `Enemy ${index + 1}`);
        }
    }
}

for (const mission of nonCombatMissions) {
    if (!mission.strategy?.length) add("noncombat-guidance-missing", mission);
}

for (const mission of missions) {
    const normalizedStrategies = (mission.strategy ?? []).map(normalize);
    if (new Set(normalizedStrategies).size !== normalizedStrategies.length) {
        add("duplicate-strategy-step", mission);
    }

    const visibleStrings = collectStrings(mission);
    const attribution = visibleStrings.find((value) =>
        /https?:\/\/|www\.|validated (?:against|with)|\bcredit(?:s|ed)?\s+to\b/i.test(
            value,
        ),
    );
    if (attribution) add("attribution-in-app-data", mission, attribution);
    const externalUrl = visibleStrings.find((value) => /https?:\/\//i.test(value));
    if (externalUrl) add("url-in-app-data", mission, externalUrl);
}

for (const [id, expectedGuidance] of Object.entries(curatedGuidance)) {
    const mission = byId.get(id);
    if (!mission) {
        add("curated-guidance-mission-missing", null, id);
        continue;
    }
    for (const step of expectedGuidance) {
        if (!mission.strategy?.includes(step)) {
            add("curated-guidance-not-applied", mission, step);
        }
    }
}

const objectiveBattleWithoutEnemies = missions.filter(
    (mission) =>
        mission.enemies.length === 0 &&
        (/battle/i.test(mission.questType ?? "") ||
            /defeat|survive|protect|drive off|bring .* senses|see the battle/i.test(
                mission.objective ?? "",
            )),
);
const emptyEnemyAllowlist = new Set(["E3-12"]);
for (const mission of objectiveBattleWithoutEnemies) {
    if (!emptyEnemyAllowlist.has(mission.id)) {
        add("battle-objective-enemies-missing", mission);
    }
}

const clanMates = byId.get("B2-14");
const recruitment = clanMates?.recruitmentGuide;
if (!recruitment) {
    add("clan-mates-matrix-missing", clanMates);
} else {
    const expectedGroups = new Map([
        ["Hume", ["Blackfrost", "Skyfrost"]],
        ["Bangaa", ["Greenfire", "Bloodfire"]],
        ["Nu Mou", ["Rosefire", "Coppersun"]],
        ["Moogle", ["Goldsun", "Silversun"]],
        ["Viera", ["Ashleaf", "Mintleaf"]],
        ["Seeq / Gria", ["Emberleaf", "Plumfrost"]],
    ]);
    if (recruitment.groups.length !== expectedGroups.size) {
        add(
            "clan-mates-group-count",
            clanMates,
            `Expected ${expectedGroups.size}; found ${recruitment.groups.length}.`,
        );
    }

    const answerCodes = [];
    for (const first of ["A", "B"])
        for (const second of ["A", "B"])
            for (const third of ["A", "B"])
                for (const fourth of ["A", "B"])
                    answerCodes.push(`${first}${second}${third}${fourth}`);

    let totalMappings = 0;
    for (const group of recruitment.groups) {
        const expectedMonths = expectedGroups.get(group.race);
        if (!expectedMonths) {
            add("clan-mates-race-unexpected", clanMates, group.race);
        } else if (
            group.months.slice().sort().join("|") !==
            expectedMonths.slice().sort().join("|")
        ) {
            add(
                "clan-mates-months-mismatch",
                clanMates,
                `${group.race}: ${group.months.join(", ")}`,
            );
        }

        const groupCodes = group.results.flatMap((result) => result.answers);
        totalMappings += groupCodes.length;
        const uniqueCodes = new Set(groupCodes);
        if (uniqueCodes.size !== groupCodes.length) {
            add("clan-mates-answer-duplicate", clanMates, group.race);
        }
        if (
            [...uniqueCodes].sort().join("|") !== answerCodes.slice().sort().join("|")
        ) {
            add("clan-mates-answer-coverage", clanMates, group.race);
        }
        for (const result of group.results) {
            if (!result.job.trim()) {
                add("clan-mates-job-missing", clanMates, group.race);
            }
        }
    }
    if (totalMappings !== 96) {
        add(
            "clan-mates-total-mappings",
            clanMates,
            `Expected 96; found ${totalMappings}.`,
        );
    }
    if (Object.hasOwn(recruitment, "sources")) {
        add("clan-mates-unexpected-metadata", clanMates);
    }

    expectPatterns(
        "B2-14",
        "planner instructions and strategy",
        [...recruitment.instructions, ...(clanMates.strategy ?? [])],
        [/month/i, /four.*answer|answer.*four/i, /class|job/i, /unlock/i, /accept/i],
    );
}

expectPatterns("C1-14", "strategy", byId.get("C1-14")?.strategy, [
    /six orchard trees|six fruit trees/i,
    /four rounds/i,
    /gather/i,
    /spawn|keep arriving/i,
    /harming the weak/i,
]);
expectPatterns("A3-15", "strategy", byId.get("A3-15")?.strategy, [
    /seven/i,
    /gemstone|marker/i,
    /arrive|reinforcement/i,
    /reaction/i,
]);
expectPatterns("B4-03", "strategy", byId.get("B4-03")?.strategy, [
    /zombie powder/i,
    /ezel's draught/i,
    /both groups/i,
    /defaults? to zombie powder/i,
]);
expectPatterns("C1-06", "strategy", byId.get("C1-06")?.strategy, [
    /two mimics/i,
    /five fingers/i,
    /ten/i,
]);
expectPatterns("E2-08", "strategy", byId.get("E2-08")?.strategy, [
    /six.*marker/i,
    /mage cannon/i,
    /replaced/i,
]);

const storageShed = byId.get("C4-15");
const storageJobs = new Set(storageShed?.enemies.map((enemy) => enemy.job));
for (const job of ["Lanista", "Sage", "Soldier", "Time Mage"]) {
    if (!storageJobs.has(job)) add("storage-shed-enemy-missing", storageShed, job);
}
expectPatterns("C4-15", "strategy", storageShed?.strategy, [
    /Mayhew/i,
    /protected Gria/i,
    /Lanista/i,
    /Sage/i,
    /Soldier/i,
    /Time Mage/i,
]);

const flutegrass = byId.get("ME-08");
if (flutegrass?.missable !== true) add("flutegrass-not-marked-missable", flutegrass);
if (!/flutegrass/i.test(flutegrass?.rewards.other ?? "")) {
    add("flutegrass-reward-missing", flutegrass);
}
expectPatterns("ME-08", "strategy", flutegrass?.strategy, [
    /unique|missable/i,
    /flutegrass/i,
    /shining lute/i,
    /brilliant theorbo/i,
]);
expectPatterns("D4-01", "strategy", byId.get("D4-01")?.strategy, [
    /Sant D'alsa Bluff/i,
    /before crafting/i,
    /Flutegrass/i,
    /Shining Lute/i,
    /Brilliant Theorbo/i,
]);
expectPatterns("D4-11", "strategy", byId.get("D4-11")?.strategy, [
    /exactly one tile/i,
    /Vaan/i,
    /Penelo/i,
    /Gladiator/i,
]);
expectPatterns("E5-01", "strategy", byId.get("E5-01")?.strategy, [
    /Adelle temporarily leaves/i,
    /equipped items return to the inventory/i,
]);
expectPatterns("E5-06", "strategy", byId.get("E5-06")?.strategy, [
    /Luso/i,
    /Talk/i,
    /three times/i,
    /defeating her does not/i,
]);
expectPatterns("EX-02", "strategy", byId.get("EX-02")?.strategy, [
    /Wisp/i,
    /Pod/i,
    /Core/i,
    /Rewind/i,
    /dark crystals/i,
    /reaction abilities/i,
]);
expectPatterns("E1-16", "noncombat objective", byId.get("E1-16")?.strategy, [
    /talk to the townsfolk/i,
    /knock on doors/i,
    /resolutions/i,
]);
expectPatterns("E3-12", "spectator objective", byId.get("E3-12")?.strategy, [
    /do not interfere/i,
    /watch/i,
]);

const report = {
    generatedAt: new Date().toISOString(),
    coverage: {
        canonicalMissions: missions.length,
        questReportMissions: questReportMissions.length,
        otherMissions: otherMissions.length,
        combatMissions: combatMissions.length,
        nonCombatMissions: nonCombatMissions.length,
        curatedGuidanceOverrides: Object.keys(curatedGuidance).length,
        auctionRewardEvents: auctionRewardTitles.size,
        clanMatesRaceGroups: recruitment?.groups.length ?? 0,
        clanMatesAnswerMappings:
            recruitment?.groups.reduce(
                (total, group) =>
                    total + group.results.reduce((sum, result) => sum + result.answers.length, 0),
                0,
            ) ?? 0,
        findings: findings.length,
    },
    validation: [
        "Final merged mission objects, including generated guidance",
        "Combat objectives, laws, enemy identities, and multi-step strategy",
        "Noncombat mission guidance and intentional no-enemy objectives",
        "All curated mission guidance overrides",
        "All six auction reward events, exact titles, series links, and prerequisites",
        "Clan Mates month, race, class, and answer-code coverage",
        "Known high-risk quest mechanics and missable Flutegrass routing",
        "No attribution or URLs in mission-facing data",
    ],
    byType: findings.reduce((counts, finding) => {
        counts[finding.type] = (counts[finding.type] ?? 0) + 1;
        return counts;
    }, {}),
    findings,
};

fs.mkdirSync(path.join(root, "audit"), { recursive: true });
fs.writeFileSync(
    path.join(root, "audit/mission-detail-audit.json"),
    `${JSON.stringify(report, null, 2)}\n`,
);

console.log(
    JSON.stringify(
        {
            coverage: report.coverage,
            byType: report.byType,
            report: "audit/mission-detail-audit.json",
        },
        null,
        2,
    ),
);

if (findings.length) process.exitCode = 1;
