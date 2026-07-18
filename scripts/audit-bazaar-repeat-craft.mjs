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

async function loadAppData() {
    const result = await build({
        stdin: {
            contents: `
                import { BAZAAR_RECIPES } from "./src/data/bazaarRecipes.ts";
                import { REPEAT_CRAFT_RESULTS } from "./src/data/bazaarRepeatCraft.ts";
                export default { recipes: BAZAAR_RECIPES, repeatCraft: REPEAT_CRAFT_RESULTS };
            `,
            resolveDir: root,
            sourcefile: "bazaar-repeat-craft-audit-entry.ts",
            loader: "ts",
        },
        bundle: true,
        platform: "node",
        format: "esm",
        write: false,
        logLevel: "silent",
    });
    const module = await import(
        `data:text/javascript;base64,${Buffer.from(result.outputFiles[0].text).toString("base64")}`
    );
    return module.default;
}

const app = await loadAppData();
const findings = [];
const recipesByResult = Object.groupBy(
    app.recipes,
    (recipe) => normalize(recipe.result),
);
const recipesById = Object.groupBy(app.recipes, (recipe) => recipe.id);
const normalizedRepeatCraft = app.repeatCraft.map(normalize);
const repeatCraftSet = new Set(normalizedRepeatCraft);

if (app.recipes.length !== 355) {
    findings.push({
        type: "recipe-count",
        expected: 355,
        actual: app.recipes.length,
    });
}
if (app.repeatCraft.length !== 112) {
    findings.push({
        type: "repeat-craft-count",
        expected: 112,
        actual: app.repeatCraft.length,
    });
}

for (const recipe of app.recipes) {
    for (const field of ["id", "section", "rank", "result"]) {
        if (!String(recipe[field] ?? "").trim()) {
            findings.push({ type: "required-field-missing", id: recipe.id, field });
        }
    }
    if (!/^Rank [A-E]$/.test(recipe.rank)) {
        findings.push({ type: "invalid-rank", id: recipe.id, rank: recipe.rank });
    }
    if (!Array.isArray(recipe.loot) || recipe.loot.length < 2 || recipe.loot.length > 3) {
        findings.push({ type: "invalid-loot-count", id: recipe.id, loot: recipe.loot });
    } else if (recipe.loot.some((item) => !String(item).trim())) {
        findings.push({ type: "empty-loot-name", id: recipe.id });
    }
}

for (const [id, rows] of Object.entries(recipesById)) {
    if (rows.length > 1) {
        findings.push({ type: "duplicate-recipe-id", id, count: rows.length });
    }
}
for (const [result, rows] of Object.entries(recipesByResult)) {
    if (rows.length > 1) {
        findings.push({
            type: "duplicate-recipe-result",
            result,
            ids: rows.map((recipe) => recipe.id),
        });
    }
}
if (repeatCraftSet.size !== app.repeatCraft.length) {
    findings.push({ type: "duplicate-repeat-craft-result" });
}

for (const [index, result] of app.repeatCraft.entries()) {
    const recipes = recipesByResult[normalizedRepeatCraft[index]] ?? [];
    if (recipes.length !== 1) {
        findings.push({
            type: "repeat-craft-result-mapping",
            result,
            matchingRecipes: recipes.length,
        });
    }
}
if (!repeatCraftSet.has(normalize("Battle Boots"))) {
    findings.push({ type: "battle-boots-not-repeat-craft" });
}

const report = {
    counts: {
        recipes: app.recipes.length,
        uniqueRecipeResults: Object.keys(recipesByResult).length,
        repeatCraftResults: app.repeatCraft.length,
        uniqueRepeatCraftResults: repeatCraftSet.size,
        findings: findings.length,
    },
    byType: Object.fromEntries(
        Object.entries(Object.groupBy(findings, (finding) => finding.type)).map(
            ([type, rows]) => [type, rows.length],
        ),
    ),
    findings,
};

const reportPath = path.join(root, "audit/bazaar-repeat-craft-audit.json");
fs.writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify({ ...report, report: path.relative(root, reportPath) }, null, 2));

if (findings.length) process.exitCode = 1;
