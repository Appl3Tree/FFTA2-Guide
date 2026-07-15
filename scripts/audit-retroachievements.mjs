import fs from "node:fs";
import path from "node:path";
import ts from "typescript";

const root = process.cwd();
const dataFile = path.join(root, "src/data/retroAchievements.ts");
const snapshotFile = path.join(root, "audit/source-snapshots/retroachievements-game-4958.json");
const sourceFile = ts.createSourceFile(
    dataFile,
    fs.readFileSync(dataFile, "utf8"),
    ts.ScriptTarget.Latest,
    true,
);
const snapshot = JSON.parse(fs.readFileSync(snapshotFile, "utf8"));
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

const appAchievements = globalInitializer.elements
    .filter(ts.isObjectLiteralExpression)
    .map(readAchievement);
const appByName = new Map(appAchievements.map((achievement) => [achievement.name, achievement]));
const appById = new Map(appAchievements.map((achievement) => [achievement.id, achievement]));
const sourceByName = new Map(snapshot.achievements.map((achievement) => [achievement.title, achievement]));

if (snapshot.count !== 185 || snapshot.achievements.length !== 185) {
    findings.push({ type: "source-count-mismatch", declared: snapshot.count, actual: snapshot.achievements.length });
}
if (new Set(snapshot.achievements.map((achievement) => achievement.raId)).size !== snapshot.achievements.length) {
    findings.push({ type: "duplicate-source-ra-id" });
}
if (new Set(appAchievements.map((achievement) => achievement.id)).size !== appAchievements.length) {
    findings.push({ type: "duplicate-app-id" });
}

for (const appAchievement of appAchievements) {
    const sourceAchievement = sourceByName.get(appAchievement.name);
    if (!sourceAchievement) {
        findings.push({ type: "app-achievement-not-on-source", ...appAchievement });
    } else if (appAchievement.description !== sourceAchievement.description) {
        findings.push({
            type: "description-mismatch",
            id: appAchievement.id,
            name: appAchievement.name,
            appValue: appAchievement.description,
            sourceValue: sourceAchievement.description,
        });
    }
}

for (const sourceAchievement of snapshot.achievements) {
    if (!appByName.has(sourceAchievement.title)) {
        findings.push({ type: "source-achievement-missing-in-app", ...sourceAchievement });
    }
}

let missionLinkedCount = 0;
for (const missionProperty of missionInitializer.properties) {
    if (!ts.isPropertyAssignment(missionProperty) || !ts.isArrayLiteralExpression(missionProperty.initializer)) {
        continue;
    }
    const missionId = keyName(missionProperty.name);
    for (const objectNode of missionProperty.initializer.elements.filter(ts.isObjectLiteralExpression)) {
        missionLinkedCount += 1;
        const linkedAchievement = readAchievement(objectNode);
        const globalAchievement = appById.get(linkedAchievement.id);
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

const report = {
    sourceUrl: snapshot.sourceUrl,
    capturedAt: snapshot.capturedAt,
    counts: {
        sourceAchievements: snapshot.achievements.length,
        appAchievements: appAchievements.length,
        missionLinkedAchievements: missionLinkedCount,
        findings: findings.length,
    },
    findings,
};

fs.writeFileSync(
    path.join(root, "audit/retroachievements-audit.json"),
    `${JSON.stringify(report, null, 2)}\n`,
);

console.log(JSON.stringify({
    counts: report.counts,
    report: "audit/retroachievements-audit.json",
}, null, 2));

if (findings.length > 0) process.exitCode = 1;
