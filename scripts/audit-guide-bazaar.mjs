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
const guide = fs.readFileSync(guidePath, "utf8");

function parseGuideBazaarRows() {
    const bazaarStart = guide.indexOf("-=  19. Bazaar Formulas -=");
    const bazaarEnd = guide.indexOf("-=  20. Auction House -=");

    if (bazaarStart < 0 || bazaarEnd < bazaarStart) {
        throw new Error("Unable to locate Bazaar Formulas section in guide source.");
    }

    const lines = guide.slice(bazaarStart, bazaarEnd).split(/\r?\n/);
    const rows = [];
    let currentSection = null;
    let previousNonEmpty = "";
    let pending = null;

    const pushPending = () => {
        if (!pending) return;
        rows.push({
            section: pending.section,
            rank: pending.rank,
            result: pending.result,
            loot: pending.formula.split(/\s+\+\s+/).map((part) => part.trim()),
        });
        pending = null;
    };

    for (const line of lines) {
        if (
            /^={3,}\s*$/.test(line) &&
            previousNonEmpty &&
            !/^[-=]+$/.test(previousNonEmpty) &&
            !/^Grade\s+Item/.test(previousNonEmpty)
        ) {
            pushPending();
            currentSection = previousNonEmpty.trim();
        }

        const row = line.match(/^([A-E])\s{2,}(.+?)\s{2,}(.+)$/);
        if (row && currentSection && row[3].includes("+")) {
            pushPending();
            pending = {
                section: currentSection,
                rank: `Rank ${row[1]}`,
                result: row[2].trim(),
                formula: row[3].trim(),
            };
        } else if (pending && /^\s{20,}\S/.test(line)) {
            pending.formula += ` ${line.trim()}`;
        } else if (
            pending &&
            line.trim() &&
            !line.startsWith(" ") &&
            !/^[-=]+$/.test(line) &&
            !/^Grade\s+Item/.test(line) &&
            !/^-----/.test(line)
        ) {
            pushPending();
        }

        if (line.trim()) previousNonEmpty = line.trim();
    }

    pushPending();
    return rows;
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

function collectAppRecipes() {
    const file = path.join(root, "src", "data", "bazaarRecipes.ts");
    const sourceFile = readSource(file);
    let recipes = [];

    function visit(node) {
        if (
            ts.isVariableDeclaration(node) &&
            node.name.getText(sourceFile) === "BAZAAR_RECIPES" &&
            ts.isArrayLiteralExpression(node.initializer)
        ) {
            recipes = node.initializer.elements
                .filter(ts.isObjectLiteralExpression)
                .map((recipe) => ({
                    section: stringValue(property(recipe, "section", sourceFile)),
                    rank: stringValue(property(recipe, "rank", sourceFile)),
                    result: stringValue(property(recipe, "result", sourceFile)),
                    loot: arrayStrings(property(recipe, "loot", sourceFile)),
                }));
        }

        ts.forEachChild(node, visit);
    }

    visit(sourceFile);
    return recipes;
}

const guideRows = parseGuideBazaarRows();
const appRecipes = collectAppRecipes();
const guideByResult = new Map(
    guideRows.map((row) => [row.result.toLowerCase(), row]),
);
const appByResult = new Map(
    appRecipes.map((recipe) => [recipe.result.toLowerCase(), recipe]),
);

const mismatches = [];
for (const recipe of appRecipes) {
    const guideRecipe = guideByResult.get(recipe.result.toLowerCase());
    if (!guideRecipe) {
        mismatches.push({ type: "missing-in-guide", app: recipe });
        continue;
    }

    const fields = [];
    if (recipe.section !== guideRecipe.section) {
        fields.push(["section", recipe.section, guideRecipe.section]);
    }
    if (recipe.rank !== guideRecipe.rank) {
        fields.push(["rank", recipe.rank, guideRecipe.rank]);
    }
    if (recipe.loot.join("|") !== guideRecipe.loot.join("|")) {
        fields.push(["loot", recipe.loot, guideRecipe.loot]);
    }
    if (fields.length > 0) {
        mismatches.push({
            type: "field-mismatch",
            result: recipe.result,
            fields,
        });
    }
}

const missingInApp = guideRows
    .filter((row) => !appByResult.has(row.result.toLowerCase()))
    .map((row) => row.result);

const report = {
    guidePath,
    guideRows: guideRows.length,
    appRecipes: appRecipes.length,
    mismatchCount: mismatches.length,
    mismatches,
    missingInAppCount: missingInApp.length,
    missingInApp,
};

console.log(JSON.stringify(report, null, 2));

if (mismatches.length > 0 || missingInApp.length > 0) {
    process.exitCode = 1;
}
