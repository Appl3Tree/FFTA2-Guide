import fs from "node:fs";
import path from "node:path";
import { build } from "esbuild";

const root = process.cwd();
const sourcePath = path.join(
    root,
    "audit/source-snapshots/fandom-bazaar.json",
);

function normalize(value) {
    return String(value ?? "")
        .normalize("NFKD")
        .toLowerCase()
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[\u2019']/g, "")
        .replace(/[^a-z0-9]+/g, " ")
        .trim()
        .replace(/\s+/g, " ");
}

function wikiLinkLabel(line) {
    const match = line.match(/\[\[([^\]]+)\]\]/);
    if (!match) return null;
    return match[1].split("|").at(-1)?.trim() ?? null;
}

function sourceRows() {
    const payload = JSON.parse(fs.readFileSync(sourcePath, "utf8"));
    const wikitext = payload.parse?.wikitext?.["*"];
    if (!wikitext) {
        throw new Error("Fandom Bazaar snapshot has no parsed wikitext.");
    }

    const lines = wikitext.split(/\r?\n/);
    const rows = [];

    for (let index = 0; index < lines.length; index += 1) {
        const rank = lines[index].match(
            /^!\s*rowspan="([23])"\s*\|\s*Rank ([A-E])/,
        );
        if (!rank) continue;

        const resultPattern = new RegExp(
            `^\\|\\s*rowspan="${rank[1]}"\\s*\\|?`,
        );
        const resultLine = lines
            .slice(index + 1, index + 5)
            .find((line) => resultPattern.test(line));
        const result = resultLine ? wikiLinkLabel(resultLine) : null;
        if (!resultLine || !result) {
            throw new Error(`Unable to parse Bazaar result near line ${index + 1}.`);
        }

        rows.push({
            result,
            rank: `Rank ${rank[2]}`,
            repeatCraft: /'''/.test(resultLine),
        });
    }

    return rows;
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

const source = sourceRows();
const app = await loadAppData();
const findings = [];
const sourceByName = new Map(source.map((row) => [normalize(row.result), row]));
const appByName = new Map(
    app.recipes.map((recipe) => [normalize(recipe.result), recipe]),
);
const sourceRepeat = new Set(
    source.filter((row) => row.repeatCraft).map((row) => normalize(row.result)),
);
const appRepeat = new Set(app.repeatCraft.map(normalize));

if (source.length !== 355 || app.recipes.length !== 355) {
    findings.push({
        type: "recipe-count",
        source: source.length,
        app: app.recipes.length,
    });
}
if (sourceRepeat.size !== 112 || appRepeat.size !== 112) {
    findings.push({
        type: "repeat-craft-count",
        source: sourceRepeat.size,
        app: appRepeat.size,
    });
}

for (const [name, row] of sourceByName) {
    const recipe = appByName.get(name);
    if (!recipe) {
        findings.push({ type: "source-result-missing-in-app", result: row.result });
    } else if (recipe.rank !== row.rank) {
        findings.push({
            type: "rank-mismatch",
            result: row.result,
            source: row.rank,
            app: recipe.rank,
        });
    }
}
for (const recipe of app.recipes) {
    if (!sourceByName.has(normalize(recipe.result))) {
        findings.push({ type: "app-result-missing-in-source", result: recipe.result });
    }
}
for (const name of sourceRepeat) {
    if (!appRepeat.has(name)) {
        findings.push({ type: "repeat-craft-marker-missing", result: name });
    }
}
for (const name of appRepeat) {
    if (!sourceRepeat.has(name)) {
        findings.push({ type: "unexpected-repeat-craft-marker", result: name });
    }
}
if (!appRepeat.has(normalize("Battle Boots"))) {
    findings.push({ type: "battle-boots-not-repeat-craft" });
}

const report = {
    counts: {
        sourceRecipes: source.length,
        appRecipes: app.recipes.length,
        sourceRepeatCraft: sourceRepeat.size,
        appRepeatCraft: appRepeat.size,
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
