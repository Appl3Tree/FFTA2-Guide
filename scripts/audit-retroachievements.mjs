import fs from "node:fs";
import path from "node:path";
import ts from "typescript";

const root = process.cwd();
const dataFile = path.join(root, "src/data/retroAchievements.ts");
const sourceFile = ts.createSourceFile(
    dataFile,
    fs.readFileSync(dataFile, "utf8"),
    ts.ScriptTarget.Latest,
    true,
);
const findings = [];

function visit(node, callback) {
    callback(node);
    ts.forEachChild(node, (child) => visit(child, callback));
}

function keyName(node) {
    if (ts.isIdentifier(node) || ts.isStringLiteral(node) || ts.isNumericLiteral(node)) {
        return node.text;
    }
    return node.getText(sourceFile).replace(/^['"]|['"]$/g, "");
}

function propertyNode(objectNode, name) {
    return objectNode.properties.find((property) => (
        ts.isPropertyAssignment(property) && keyName(property.name) === name
    ))?.initializer;
}

function stringValue(node) {
    if (node && (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node))) {
        return node.text;
    }
    return undefined;
}

function findInitializer(variableName) {
    let initializer;
    visit(sourceFile, (node) => {
        if (ts.isVariableDeclaration(node) && node.name.getText(sourceFile) === variableName) {
            initializer = node.initializer;
        }
    });
    return initializer;
}

function readAchievement(objectNode) {
    return {
        id: stringValue(propertyNode(objectNode, "id")),
        name: stringValue(propertyNode(objectNode, "name")),
        description: stringValue(propertyNode(objectNode, "description")),
    };
}

const globalInitializer = findInitializer("GLOBAL_RETRO_ACHIEVEMENTS");
const missionInitializer = findInitializer("RETRO_ACHIEVEMENTS_BY_MISSION_ID");

if (!globalInitializer || !ts.isArrayLiteralExpression(globalInitializer)) {
    throw new Error("Could not parse GLOBAL_RETRO_ACHIEVEMENTS");
}
if (!missionInitializer || !ts.isObjectLiteralExpression(missionInitializer)) {
    throw new Error("Could not parse RETRO_ACHIEVEMENTS_BY_MISSION_ID");
}

const achievements = globalInitializer.elements
    .filter(ts.isObjectLiteralExpression)
    .map(readAchievement);
const achievementsById = new Map(achievements.map((achievement) => [achievement.id, achievement]));
const achievementNames = new Set(achievements.map((achievement) => achievement.name));

if (achievements.length !== 185) {
    findings.push({ type: "achievement-count", expected: 185, actual: achievements.length });
}
if (achievementsById.size !== achievements.length) {
    findings.push({ type: "duplicate-achievement-id" });
}
if (achievementNames.size !== achievements.length) {
    findings.push({ type: "duplicate-achievement-name" });
}
for (const achievement of achievements) {
    for (const field of ["id", "name", "description"]) {
        if (!achievement[field]?.trim()) {
            findings.push({
                type: "achievement-field-missing",
                id: achievement.id,
                field,
            });
        }
    }
}

let missionLinkedCount = 0;
const linkedMissionIds = new Set();
for (const missionProperty of missionInitializer.properties) {
    if (!ts.isPropertyAssignment(missionProperty) || !ts.isArrayLiteralExpression(missionProperty.initializer)) {
        findings.push({ type: "invalid-mission-link-entry" });
        continue;
    }

    const missionId = keyName(missionProperty.name);
    if (linkedMissionIds.has(missionId)) {
        findings.push({ type: "duplicate-mission-link-key", missionId });
    }
    linkedMissionIds.add(missionId);

    const idsForMission = new Set();
    for (const objectNode of missionProperty.initializer.elements.filter(ts.isObjectLiteralExpression)) {
        missionLinkedCount += 1;
        const linkedAchievement = readAchievement(objectNode);
        const globalAchievement = achievementsById.get(linkedAchievement.id);

        if (idsForMission.has(linkedAchievement.id)) {
            findings.push({
                type: "duplicate-achievement-on-mission",
                missionId,
                achievementId: linkedAchievement.id,
            });
        }
        idsForMission.add(linkedAchievement.id);

        if (!globalAchievement) {
            findings.push({ type: "mission-link-missing-global", missionId, ...linkedAchievement });
        } else if (
            linkedAchievement.name !== globalAchievement.name ||
            linkedAchievement.description !== globalAchievement.description
        ) {
            findings.push({
                type: "mission-link-display-mismatch",
                missionId,
                linkedAchievement,
                globalAchievement,
            });
        }
    }
}

if (missionLinkedCount !== 111) {
    findings.push({
        type: "mission-link-count",
        expected: 111,
        actual: missionLinkedCount,
    });
}

const report = {
    counts: {
        achievements: achievements.length,
        linkedMissions: linkedMissionIds.size,
        missionLinkedAchievements: missionLinkedCount,
        findings: findings.length,
    },
    byType: Object.fromEntries(
        Object.entries(Object.groupBy(findings, (finding) => finding.type)).map(
            ([type, rows]) => [type, rows.length],
        ),
    ),
    findings,
};

fs.writeFileSync(
    path.join(root, "audit/retroachievements-audit.json"),
    `${JSON.stringify(report, null, 2)}\n`,
);

console.log(JSON.stringify({
    counts: report.counts,
    byType: report.byType,
    report: "audit/retroachievements-audit.json",
}, null, 2));

if (findings.length > 0) process.exitCode = 1;
