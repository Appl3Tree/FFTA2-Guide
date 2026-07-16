import fs from "node:fs";
import path from "node:path";
import ts from "typescript";

const root = process.cwd();
const guidePath =
    process.env.FFTA2_GUIDE_SOURCE ??
    path.join(
        root,
        "audit",
        "source-snapshots",
        "gamefaqs-dev-53627-browser-fullbody.txt",
    );
const reportPath =
    process.env.FFTA2_BESTIARY_REPORT ??
    path.join(root, "audit", "guide-bestiary-audit.json");
const guide = fs.readFileSync(guidePath, "utf8");
const allElements = [
    "Air",
    "Dark",
    "Earth",
    "Fire",
    "Holy",
    "Ice",
    "Lightning",
    "Water",
];

function normalizeName(value) {
    return value.toLowerCase().replace(/[^a-z0-9]+/g, "");
}

function normalizeElements(values) {
    if (!values) return [];
    const expanded = values.flatMap((value) => {
        const trimmed = value.trim();
        if (trimmed === "All elements") return allElements;
        if (trimmed === "All elements except Holy and Dark") {
            return allElements.filter((element) => !["Holy", "Dark"].includes(element));
        }
        return trimmed ? [trimmed] : [];
    });
    return [...new Set(expanded)].sort();
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

function arrayStrings(node) {
    if (!node || !ts.isArrayLiteralExpression(node)) return [];
    return node.elements.map(stringValue).filter(Boolean);
}

function collectAppEnemies() {
    const file = path.join(root, "src", "data", "bestiary", "bestiary.ts");
    const sourceFile = readSource(file);
    const enemies = [];

    function visit(node) {
        if (
            ts.isVariableDeclaration(node) &&
            node.name.getText(sourceFile) === "ENEMIES" &&
            ts.isObjectLiteralExpression(node.initializer)
        ) {
            for (const prop of node.initializer.properties) {
                if (!ts.isPropertyAssignment(prop)) continue;
                const enemy = prop.initializer;
                if (!ts.isObjectLiteralExpression(enemy)) continue;
                const job = stringValue(property(enemy, "job", sourceFile));
                if (!job) continue;
                enemies.push({
                    job,
                    absorb: normalizeElements(arrayStrings(property(enemy, "absorb", sourceFile))),
                    immune: normalizeElements(arrayStrings(property(enemy, "immune", sourceFile))),
                    half: normalizeElements(arrayStrings(property(enemy, "half", sourceFile))),
                    weak: normalizeElements(arrayStrings(property(enemy, "weak", sourceFile))),
                });
            }
        }
        ts.forEachChild(node, visit);
    }

    visit(sourceFile);
    return enemies;
}

function parseElementLine(line, label) {
    const match = line
        .trim()
        .match(new RegExp(`^${label}[: ,]+\\s*(.+)$`));
    if (!match) return null;
    return normalizeElements(match[1].split(/\s*,\s*/));
}

function collectGuideEnemies() {
    const start = guide.indexOf("-=  11. Monsters  -=");
    const end = guide.indexOf("-=  12. Head Gear -=");
    if (start < 0 || end < start) {
        throw new Error("Unable to locate Monsters section in guide source.");
    }

    const lines = guide.slice(start, end).split(/\r?\n/);
    const enemies = [];
    for (let i = 0; i < lines.length; i += 1) {
        const name = lines[i].trim();
        if (!name || /^[-=]+$/.test(name)) continue;
        if (!/^[-]+$/.test(lines[i + 1]?.trim() ?? "")) continue;
        if (/^(Name|Use|Absorb|Weak|Immune|Half Damage)$/i.test(name)) continue;

        const enemy = {
            job: name,
            absorb: [],
            immune: [],
            half: [],
            weak: [],
        };
        for (let j = i + 2; j < lines.length; j += 1) {
            const line = lines[j];
            if (!line.trim()) continue;
            if (/^Name\s+Use/.test(line.trim())) break;
            if (!/^\S/.test(line)) continue;
            enemy.absorb = parseElementLine(line, "Absorb") ?? enemy.absorb;
            enemy.immune = parseElementLine(line, "Immune") ?? enemy.immune;
            enemy.half = parseElementLine(line, "Half Damage") ?? enemy.half;
            enemy.weak = parseElementLine(line, "Weak") ?? enemy.weak;
        }
        enemies.push(enemy);
    }
    return enemies;
}

const appEnemies = collectAppEnemies();
const guideEnemies = collectGuideEnemies();
const guideByName = new Map(guideEnemies.map((enemy) => [normalizeName(enemy.job), enemy]));
const appByName = new Map(appEnemies.map((enemy) => [normalizeName(enemy.job), enemy]));

const mismatches = [];
for (const appEnemy of appEnemies) {
    const guideEnemy = guideByName.get(normalizeName(appEnemy.job));
    if (!guideEnemy) continue;
    const fields = [];
    for (const field of ["absorb", "immune", "half", "weak"]) {
        if (appEnemy[field].join("|") !== guideEnemy[field].join("|")) {
            fields.push({ field, app: appEnemy[field], guide: guideEnemy[field] });
        }
    }
    if (fields.length) mismatches.push({ job: appEnemy.job, fields });
}

const missingInApp = guideEnemies
    .filter((enemy) => !appByName.has(normalizeName(enemy.job)))
    .map((enemy) => enemy.job)
    .sort((a, b) => a.localeCompare(b));
const missingInGuide = appEnemies
    .filter((enemy) => !guideByName.has(normalizeName(enemy.job)))
    .map((enemy) => enemy.job)
    .sort((a, b) => a.localeCompare(b));

const report = {
    guidePath,
    guideEnemies: guideEnemies.length,
    appEnemies: appEnemies.length,
    mismatchCount: mismatches.length,
    mismatches,
    missingInAppCount: missingInApp.length,
    missingInApp,
    missingInGuideCount: missingInGuide.length,
    missingInGuide,
};

fs.mkdirSync(path.dirname(reportPath), { recursive: true });
fs.writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`);

console.log(
    JSON.stringify(
        {
            guidePath,
            reportPath,
            guideEnemies: report.guideEnemies,
            appEnemies: report.appEnemies,
            mismatchCount: report.mismatchCount,
            firstMismatches: mismatches.slice(0, 40),
            missingInAppCount: report.missingInAppCount,
            missingInGuideCount: report.missingInGuideCount,
            missingInGuide: missingInGuide.slice(0, 40),
        },
        null,
        2,
    ),
);
