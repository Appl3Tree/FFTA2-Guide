import fs from "node:fs";
import path from "node:path";
import { build } from "esbuild";

const root = process.cwd();
const outputPath = path.join(root, "src/data/abilityJobOrder.ts");
const checkOnly = process.argv.includes("--check");
const warfreakPath = path.join(
    root,
    "audit/source-snapshots/gamefaqs-warfreak-53370-fullbody.txt",
);
const devPath = path.join(
    root,
    "audit/source-snapshots/gamefaqs-dev-53627-browser-fullbody.txt",
);

function normalize(value) {
    return String(value ?? "")
        .normalize("NFKD")
        .toLowerCase()
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/armour/g, "armor")
        .replace(/[^a-z0-9]+/g, " ")
        .trim()
        .replace(/\s+/g, " ");
}

const SOURCE_NAME_ALIASES = new Map(
    [
        ["Archer's Bane", "Archer's Bane"],
        ["Attack Up", "Attack\u2191"],
        ["Bilzzara", "Blizzara"],
        ["Blade Rush", "Blade Bash"],
        ["Confuse Blade", "Confusion Blade"],
        ["Critical: Evasion Up", "Critical: Evasion\u2191"],
        ["Defence Up", "Defense\u2191"],
        ["Defense Up", "Defense\u2191"],
        ["Learning", "Learn"],
        ["Loot Level 1", "Loot Lv. 1"],
        ["Loot Level 2", "Loot Lv. 2"],
        ["Loot Level 3", "Loot Lv. 3"],
        ["Loot Level 4", "Loot Lv. 4"],
        ["Lvl. 3 Dark", "Lv. 3 Dark"],
        ["Lvl. 5 Haste", "Lv. 5 Haste"],
        ["Lvl. ? Shadowflare", "Lv. ? Shadow Flare"],
        ["Magick Up", "Magick\u2191"],
        ["Resistance Up", "Resistance\u2191"],
        ["Silver Disk", "Silver Disc"],
        ["Unburden Sould", "Unburden Soul"],
    ].map(([source, app]) => [normalize(source), normalize(app)]),
);

function sourceName(job, name) {
    if (job === "Ravager" && normalize(name) === normalize("Reflex")) {
        // Warfreak's description is Strike Back's avoid-and-counter behavior.
        return normalize("Strike Back");
    }
    return SOURCE_NAME_ALIASES.get(normalize(name)) ?? normalize(name);
}

function parseWarfreakOrders() {
    const guide = fs.readFileSync(warfreakPath, "utf8").replace(/\r\n/g, "\n");
    const start = guide.indexOf("**SOLDIER**");
    const end = guide.indexOf("**HUME CLASSES**", start);
    if (start < 0 || end < start) {
        throw new Error("Unable to locate warfreak's playable class chapters.");
    }

    const section = guide.slice(start - 30, end);
    const headings = [
        ...section.matchAll(/^\*+\n\*\*([A-Z][A-Z ]+)\*\*\n\*+$/gm),
    ];
    const grouped = new Map();

    headings.forEach((heading, index) => {
        const job = heading[1]
            .toLowerCase()
            .replace(/\b\w/g, (letter) => letter.toUpperCase());
        const block = section.slice(
            heading.index,
            headings[index + 1]?.index ?? section.length,
        );
        const abilities = block
            .split("\n")
            .map((line) => line.trim())
            .map((line) =>
                line.match(/^(.+?) - (.+?) - (Active|Reaction|Passive)$/),
            )
            .filter(Boolean)
            .map((match) => match[1].trim());

        const existing = grouped.get(job) ?? [];
        existing.push(abilities);
        grouped.set(job, existing);
    });

    const result = new Map();
    for (const [job, variants] of grouped) {
        const longest = variants.toSorted((left, right) => right.length - left.length)[0];
        const comparable = longest.map((name) => sourceName(job, name)).join("|");
        for (const variant of variants) {
            if (variant.map((name) => sourceName(job, name)).join("|") !== comparable) {
                throw new Error(`Conflicting warfreak ability order for ${job}.`);
            }
        }
        result.set(job, longest);
    }

    return result;
}

function parseDevOrders() {
    const guide = fs.readFileSync(devPath, "utf8").replace(/\r\n/g, "\n");
    const start = guide.indexOf("-=  10. Jobs  -=");
    const end = guide.indexOf("-=  11. Monsters  -=", start);
    const section = guide.slice(start, end);
    const headings = [...section.matchAll(/^=+\n([^\n=]+)\n=+$/gm)];
    const result = new Map();

    headings.forEach((heading, index) => {
        const name = heading[1].trim();
        const block = section.slice(
            heading.index,
            headings[index + 1]?.index ?? section.length,
        );
        if (!block.slice(0, 300).includes("Races:")) return;

        const abilities = block
            .split("\n")
            .map((line) =>
                line.match(/^(.+?)\s+([ARP])\s+(\d+|-)\s+(\S+)\s+(\d+|-)\s+(.+)$/),
            )
            .filter(Boolean)
            .map((match) => match[1].trim());
        result.set(name, abilities);
    });

    return result;
}

async function loadAppData() {
    const result = await build({
        stdin: {
            contents: `
                import { ABILITIES } from "./src/data/abilities/abilities.ts";
                import { EQUIPMENT } from "./src/data/equipment/equipment.ts";
                import { RACE_JOBS } from "./src/data/races/raceJobs.ts";
                export default { ABILITIES, EQUIPMENT, RACE_JOBS };
            `,
            resolveDir: root,
            sourcefile: "ability-order-generator-entry.ts",
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

const ADDITIONAL_JOB_SETS = {
    "Blue Mage": ["blue-magick"],
    Agent: ["reconnaissance"],
    Bard: ["song"],
    Dancer: ["dance"],
    Heritor: ["instinct"],
    "Sky Pirate": ["piracy"],
};
const SPECIAL_JOBS = ["Agent", "Bard", "Dancer", "Heritor", "Sky Pirate"];

function abilityUsesSet(ability, setId) {
    return ability.setId === setId || ability.otherSetIds?.includes(setId);
}

const app = await loadAppData();
const warfreakOrders = parseWarfreakOrders();
const devOrders = parseDevOrders();
const idsByJob = new Map();

for (const item of Object.values(app.EQUIPMENT)) {
    for (const [job, abilityIds] of Object.entries(item.teaches ?? {})) {
        const ids = idsByJob.get(job) ?? new Set();
        abilityIds.forEach((abilityId) => ids.add(abilityId));
        idsByJob.set(job, ids);
    }
}
for (const [job, setIds] of Object.entries(ADDITIONAL_JOB_SETS)) {
    const ids = idsByJob.get(job) ?? new Set();
    for (const ability of Object.values(app.ABILITIES)) {
        if (setIds.some((setId) => abilityUsesSet(ability, setId))) {
            ids.add(ability.id);
        }
    }
    idsByJob.set(job, ids);
}

const idByName = new Map(
    Object.values(app.ABILITIES).map((ability) => [normalize(ability.name), ability.id]),
);
const standardJobs = [
    ...new Set(
        app.RACE_JOBS.filter((race) => race.race !== "Special").flatMap((race) =>
            race.jobs.map((job) => job.name),
        ),
    ),
];
const jobs = [...standardJobs, ...SPECIAL_JOBS];
const orderByJob = {};
const findings = [];

for (const job of jobs) {
    const appIds = idsByJob.get(job) ?? new Set();
    const primaryNames = warfreakOrders.get(job) ?? devOrders.get(job) ?? [];
    const devNames = devOrders.get(job) ?? [];
    const ordered = [];

    const appendSourceNames = (names) => {
        for (const name of names) {
            const normalized = sourceName(job, name);
            const abilityId = idByName.get(normalized);
            if (abilityId && appIds.has(abilityId) && !ordered.includes(abilityId)) {
                ordered.push(abilityId);
            }
        }
    };

    appendSourceNames(primaryNames);
    appendSourceNames(devNames);
    for (const abilityId of appIds) {
        if (app.ABILITIES[abilityId] && !ordered.includes(abilityId)) {
            ordered.push(abilityId);
        }
    }

    if (ordered.length !== appIds.size) {
        findings.push({
            type: "job-order-coverage",
            job,
            appAbilities: appIds.size,
            orderedAbilities: ordered.length,
        });
    }
    orderByJob[job] = ordered;
}

const whiteMageNames = orderByJob["White Mage"].map(
    (id) => app.ABILITIES[id]?.name,
);
const redMageNames = orderByJob["Red Mage"].map(
    (id) => app.ABILITIES[id]?.name,
);
if (whiteMageNames[0] !== "Cure" || whiteMageNames[1] !== "Cura") {
    findings.push({ type: "white-mage-leading-order", actual: whiteMageNames.slice(0, 2) });
}
if (redMageNames[0] !== "Cure" || redMageNames[1] !== "Thunder") {
    findings.push({ type: "red-mage-leading-order", actual: redMageNames.slice(0, 2) });
}
if (findings.length) {
    console.error(JSON.stringify({ findings }, null, 2));
    process.exit(1);
}

const rows = Object.entries(orderByJob)
    .map(
        ([job, abilityIds]) =>
            `    ${JSON.stringify(job)}: [\n${abilityIds
                .map((abilityId) => `        ${JSON.stringify(abilityId)},`)
                .join("\n")}\n    ],`,
    )
    .join("\n");
const output = `/**\n * Canonical ability order for player jobs.\n *\n * Generated by scripts/generate-ability-job-order.mjs.\n */\nexport const JOB_ABILITY_ORDER: Readonly<Record<string, readonly string[]>> = {\n${rows}\n};\n`;

const current = fs.existsSync(outputPath) ? fs.readFileSync(outputPath, "utf8") : "";
if (checkOnly) {
    const report = {
        jobs: jobs.length,
        orderedEntries: Object.values(orderByJob).reduce(
            (total, abilityIds) => total + abilityIds.length,
            0,
        ),
        current: current === output,
        source: path.relative(root, warfreakPath),
    };
    console.log(JSON.stringify(report, null, 2));
    if (!report.current) process.exitCode = 1;
} else {
    fs.writeFileSync(outputPath, output);
    console.log(`Wrote ${path.relative(root, outputPath)} for ${jobs.length} jobs.`);
}
