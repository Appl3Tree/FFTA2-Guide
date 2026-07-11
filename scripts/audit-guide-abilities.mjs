import fs from "node:fs";
import path from "node:path";
import ts from "typescript";

const root = process.cwd();
const guidePath =
    process.env.FFTA2_GUIDE_SOURCE ?? "/tmp/ffta2-dev-guide-full.txt";
const reportPath =
    process.env.FFTA2_ABILITIES_REPORT ??
    path.join(root, "audit", "guide-abilities-audit.json");
const guide = fs.readFileSync(guidePath, "utf8");

function normalizeName(value) {
    return value
        .toLowerCase()
        .replace(/[’']/g, "")
        .replace(/&/g, "and")
        .replace(/\^/g, "up")
        .replace(/↑/g, "up")
        .replace(/[^a-z0-9]+/g, "");
}

const guideAbilityAliases = new Map([
    [normalizeName("Archer's Band"), normalizeName("Archer's Bane")],
    [normalizeName("Magick Country"), normalizeName("Magick Counter")],
    [normalizeName("Sanctity"), normalizeName("Sanctify")],
    [normalizeName("Shadow Bolt Tome"), normalizeName("Shadow Shade Tome")],
    [normalizeName("Voila"), normalizeName("Viola")],
    [normalizeName("Whirl Blast"), normalizeName("Whirl Burst")],
]);

function abilityKey(value) {
    const normalized = normalizeName(value);
    return guideAbilityAliases.get(normalized) ?? normalized;
}

function readSource(file) {
    return ts.createSourceFile(
        file,
        fs.readFileSync(file, "utf8"),
        ts.ScriptTarget.Latest,
        true,
    );
}

function property(objectNode, name, sourceFile) {
    return objectNode.properties.find(
        (prop) =>
            ts.isPropertyAssignment(prop) &&
            prop.name.getText(sourceFile).replace(/^["']|["']$/g, "") === name,
    )?.initializer;
}

function stringValue(node) {
    return node && ts.isStringLiteral(node) ? node.text : undefined;
}

function collectAppAbilities() {
    const file = path.join(root, "src", "data", "abilities", "abilities.ts");
    const sourceFile = readSource(file);
    const abilities = [];

    function visit(node) {
        if (
            ts.isVariableDeclaration(node) &&
            node.name.getText(sourceFile) === "ABILITIES" &&
            ts.isObjectLiteralExpression(node.initializer)
        ) {
            for (const prop of node.initializer.properties) {
                if (!ts.isPropertyAssignment(prop)) continue;
                const ability = prop.initializer;
                if (!ts.isObjectLiteralExpression(ability)) continue;
                const id = stringValue(property(ability, "id", sourceFile));
                const name = stringValue(property(ability, "name", sourceFile));
                const setId = stringValue(property(ability, "setId", sourceFile));
                if (id && name) abilities.push({ id, name, setId });
            }
        }
        ts.forEachChild(node, visit);
    }

    visit(sourceFile);
    return abilities;
}

function collectGuideAbilityRows() {
    const start = guide.indexOf("-=  10. Jobs  -=");
    const end = guide.indexOf("-=  11. Monsters  -=");
    if (start < 0 || end < start) {
        throw new Error("Unable to locate Jobs ability section in guide source.");
    }

    const rows = [];
    let inTable = false;
    for (const line of guide.slice(start, end).split(/\r?\n/)) {
        if (/^Name\s+Type\s+MP\s+Range\s+AP\s+Item/.test(line.trim())) {
            inTable = true;
            continue;
        }
        if (!inTable) continue;
        if (!line.trim()) {
            inTable = false;
            continue;
        }
        if (/^-{5,}/.test(line.trim())) continue;
        if (/^\s+-\s/.test(line)) continue;

        const row = line.match(/^(.+?)\s{2,}([APR])\s{2,}(.+?)\s{2,}(.+?)\s{2,}(\d+)\s{2,}(.+)$/);
        if (row) {
            rows.push({
                name: row[1].trim(),
                type: row[2],
                mp: row[3].trim(),
                range: row[4].trim(),
                ap: Number(row[5]),
                item: row[6].trim(),
            });
        }
    }
    return rows;
}

const appAbilities = collectAppAbilities();
const guideRows = collectGuideAbilityRows();
const appByName = new Map(appAbilities.map((ability) => [abilityKey(ability.name), ability]));
const guideByName = new Map();
for (const row of guideRows) {
    const key = abilityKey(row.name);
    if (!guideByName.has(key)) guideByName.set(key, []);
    guideByName.get(key).push(row);
}

const missingInApp = [...guideByName.entries()]
    .filter(([key]) => !appByName.has(key))
    .map(([, rows]) => rows[0].name)
    .sort((a, b) => a.localeCompare(b));

const appOnlyNamedAbilities = appAbilities
    .filter((ability) => !guideByName.has(abilityKey(ability.name)))
    .map((ability) => ability.name)
    .sort((a, b) => a.localeCompare(b));

const report = {
    guidePath,
    guideRows: guideRows.length,
    guideUniqueAbilities: guideByName.size,
    appAbilities: appAbilities.length,
    missingInAppCount: missingInApp.length,
    missingInApp,
    appOnlyNamedAbilitiesCount: appOnlyNamedAbilities.length,
    appOnlyNamedAbilities,
    guideInternalAliases: [
        "Archer's Band -> Archer's Bane",
        "Magick Country -> Magick Counter",
        "Sanctity -> Sanctify",
        "Shadow Bolt Tome -> Shadow Shade Tome",
        "Voila -> Viola",
        "Whirl Blast -> Whirl Burst",
    ],
};

fs.mkdirSync(path.dirname(reportPath), { recursive: true });
fs.writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`);

console.log(
    JSON.stringify(
        {
            guidePath,
            reportPath,
            guideRows: report.guideRows,
            guideUniqueAbilities: report.guideUniqueAbilities,
            appAbilities: report.appAbilities,
            missingInAppCount: report.missingInAppCount,
            missingInApp: missingInApp.slice(0, 80),
            appOnlyNamedAbilitiesCount: report.appOnlyNamedAbilitiesCount,
        },
        null,
        2,
    ),
);
