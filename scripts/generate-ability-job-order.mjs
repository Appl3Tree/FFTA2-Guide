import fs from "node:fs";
import path from "node:path";
import { build } from "esbuild";

const root = process.cwd();
const outputPath = path.join(root, "src/data/abilityJobOrder.ts");
const jobReferenceOutputPath = path.join(
    root,
    "src/data/jobReferenceDetails.ts",
);
const blueMagickOutputPath = path.join(
    root,
    "src/data/blueMagickReference.ts",
);
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
        ["Limit Glove", "Cornered"],
        ["Matra Magick", "Matra Magic"],
        ["Resistance Up", "Resistance\u2191"],
        ["Silver Disk", "Silver Disc"],
        ["Unburden Sould", "Unburden Soul"],
        ["Lv. ? Shadowflare", "Lv. ? Shadow Flare"],
        ["Whirl Blast", "Whirl Burst"],
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

function parseDevJobs() {
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

        const prerequisites = block
            .match(/^Prerequisites:\s*([\s\S]*?)(?=\n\nAbilities)/m)?.[1]
            ?.replace(/\s+/g, " ")
            .trim();
        const abilities = block
            .split("\n")
            .map((line) =>
                line.match(/^(.+?)\s+([ARP])\s+(\d+|-)\s+(\S+)\s+(\d+|-)\s+(.+)$/),
            )
            .filter(Boolean)
            .map((match) => ({
                name: match[1].trim(),
                type: match[2],
                mp: match[3] === "-" ? null : Number(match[3]),
                range: match[4] === "-" ? null : match[4],
                ap: match[5] === "-" ? null : Number(match[5]),
                item: match[6].trim() === "-" ? null : match[6].trim(),
            }));
        result.set(name, {
            prerequisites:
                !prerequisites || normalize(prerequisites) === "n a"
                    ? null
                    : prerequisites,
            abilities,
        });
    });

    return result;
}

function parseDevMonsterAbilities() {
    const guide = fs.readFileSync(devPath, "utf8").replace(/\r\n/g, "\n");
    const start = guide.indexOf("-=  11. Monsters  -=");
    const end = guide.indexOf("-=  12. Head Gear -=", start);
    const section = guide.slice(start, end);
    const headings = [...section.matchAll(/^([^\n=*-][^\n]*)\n-+$/gm)];
    const monsters = [];

    headings.forEach((heading, index) => {
        const name = heading[1].trim();
        if (["Name", "Name                  Use"].includes(name)) return;
        const block = section.slice(
            heading.index,
            headings[index + 1]?.index ?? section.length,
        );
        if (!/^Name\s+Use/m.test(block)) return;

        const abilities = block
            .split("\n")
            .map((line) => line.match(/^(.+?)\s{2,}[ARP]\s{2,}.+$/))
            .filter(Boolean)
            .map((match) => match[1].trim());
        monsters.push({ name, abilities });
    });

    return monsters;
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
const devJobs = parseDevJobs();
const devOrders = new Map(
    [...devJobs].map(([job, detail]) => [
        job,
        detail.abilities.map((ability) => ability.name),
    ]),
);
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

const abilityIdsByName = new Map();
for (const ability of Object.values(app.ABILITIES)) {
    const key = normalize(ability.name);
    const ids = abilityIdsByName.get(key) ?? [];
    ids.push(ability.id);
    abilityIdsByName.set(key, ids);
}

function resolveAbilityId(job, name, allowedIds) {
    const candidates = abilityIdsByName.get(sourceName(job, name)) ?? [];
    return candidates.find((abilityId) => !allowedIds || allowedIds.has(abilityId));
}
const standardJobs = [
    ...new Set(
        app.RACE_JOBS.filter((race) => race.race !== "Special").flatMap((race) =>
            race.jobs.map((job) => job.name),
        ),
    ),
];
const jobs = [...standardJobs, ...SPECIAL_JOBS];
const orderByJob = {};
const referenceByJob = {};
const findings = [];

for (const job of jobs) {
    const appIds = idsByJob.get(job) ?? new Set();
    const primaryNames = warfreakOrders.get(job) ?? devOrders.get(job) ?? [];
    const devNames = devOrders.get(job) ?? [];
    const ordered = [];

    const appendSourceNames = (names) => {
        for (const name of names) {
            const normalized = sourceName(job, name);
            const abilityId = resolveAbilityId(job, normalized, appIds);
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

    const sourceJob = devJobs.get(job);
    const sourceDetailsById = {};
    for (const detail of sourceJob?.abilities ?? []) {
        const abilityId = resolveAbilityId(job, detail.name, appIds);
        if (!abilityId || !appIds.has(abilityId)) continue;
        sourceDetailsById[abilityId] = {
            type: { A: "Action", R: "Reaction", P: "Passive" }[detail.type],
            mp: detail.mp,
            range: detail.range,
            ap: detail.ap,
            item: detail.item,
        };
    }
    const missingDetails = ordered.filter(
        (abilityId) => !sourceDetailsById[abilityId],
    );
    if (missingDetails.length > 0) {
        findings.push({
            type: "job-reference-detail-coverage",
            job,
            missingAbilityIds: missingDetails,
        });
    }
    referenceByJob[job] = {
        prerequisites: sourceJob?.prerequisites ?? null,
        abilities: Object.fromEntries(
            ordered
                .filter((abilityId) => sourceDetailsById[abilityId])
                .map((abilityId) => [abilityId, sourceDetailsById[abilityId]]),
        ),
    };
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
const rows = Object.entries(orderByJob)
    .map(
        ([job, abilityIds]) =>
            `    ${JSON.stringify(job)}: [\n${abilityIds
                .map((abilityId) => `        ${JSON.stringify(abilityId)},`)
                .join("\n")}\n    ],`,
    )
    .join("\n");
const output = `/**\n * Canonical ability order for player jobs.\n *\n * Generated by scripts/generate-ability-job-order.mjs.\n */\nexport const JOB_ABILITY_ORDER: Readonly<Record<string, readonly string[]>> = {\n${rows}\n};\n`;

const referenceOutput = `/**\n * Validated learning and unlock details for player jobs.\n *\n * Generated by scripts/generate-ability-job-order.mjs.\n */\nexport type JobAbilityType = "Action" | "Reaction" | "Passive";\n\nexport interface JobAbilityReference {\n    type: JobAbilityType;\n    mp: number | null;\n    range: string | null;\n    ap: number | null;\n    item: string | null;\n}\n\nexport interface JobReferenceDetail {\n    prerequisites: string | null;\n    abilities: Readonly<Record<string, JobAbilityReference>>;\n}\n\nexport const JOB_REFERENCE_DETAILS: Readonly<Record<string, JobReferenceDetail>> = ${JSON.stringify(referenceByJob, null, 4)};\n\nexport function getJobAbilityReference(job: string, abilityId: string): JobAbilityReference | undefined {\n    return JOB_REFERENCE_DETAILS[job]?.abilities[abilityId];\n}\n\nexport function getAbilityJobReferences(abilityId: string): Array<{ job: string; reference: JobAbilityReference }> {\n    return Object.entries(JOB_REFERENCE_DETAILS).flatMap(([job, detail]) => {\n        const reference = detail.abilities[abilityId];\n        return reference ? [{ job, reference }] : [];\n    });\n}\n`;

const sourceMonstersByAbilityId = new Map();
for (const monster of parseDevMonsterAbilities()) {
    for (const sourceAbilityName of monster.abilities) {
        const abilityId = (abilityIdsByName.get(sourceName("", sourceAbilityName)) ?? [])
            .find((candidate) => app.ABILITIES[candidate]?.blueMagic);
        if (!abilityId) continue;
        const sources = sourceMonstersByAbilityId.get(abilityId) ?? new Set();
        sources.add(monster.name);
        sourceMonstersByAbilityId.set(abilityId, sources);
    }
}

const blueMagickIds = orderByJob["Blue Mage"].filter(
    (abilityId) => app.ABILITIES[abilityId]?.blueMagic,
);
const missingBlueMagickSources = blueMagickIds.filter(
    (abilityId) => !sourceMonstersByAbilityId.get(abilityId)?.size,
);
if (missingBlueMagickSources.length > 0) {
    findings.push({
        type: "blue-magick-source-coverage",
        missingAbilityIds: missingBlueMagickSources,
    });
}
if (findings.length) {
    console.error(JSON.stringify({ findings }, null, 2));
    process.exit(1);
}

const controlledBlueMagick = new Set([
    "angel-whisper",
    "dragon-force",
    "mighty-guard",
    "war-dance",
    "white-wind",
]);
const reraiseBlueMagick = new Set(["cornered", "roulette"]);
const blueMagickReference = Object.fromEntries(
    blueMagickIds.map((abilityId) => [
        abilityId,
        {
            sources: [...(sourceMonstersByAbilityId.get(abilityId) ?? [])],
            note: controlledBlueMagick.has(abilityId)
                ? "Use a Beastmaster to make the monster target the learner; enemies do not normally cast this beneficial ability on your clan."
                : reraiseBlueMagick.has(abilityId)
                  ? "Give the learner Reraise first so the KO effect can resolve without ending their participation in the battle."
                  : null,
        },
    ]),
);
const blueMagickOutput = `/**\n * Validated monster sources for recruit-learnable Blue Magick.\n *\n * Generated by scripts/generate-ability-job-order.mjs.\n */\nexport interface BlueMagickReference {\n    sources: readonly string[];\n    note: string | null;\n}\n\nexport const BLUE_MAGICK_GUIDANCE = [\n    "Equip the Learn passive, mastered from the Light Saber, before the monster uses the ability on that unit.",\n    "The learner must be affected by the ability and remain eligible to learn it when the action resolves.",\n] as const;\n\nexport const BLUE_MAGICK_REFERENCE: Readonly<Record<string, BlueMagickReference>> = ${JSON.stringify(blueMagickReference, null, 4)};\n\nexport function getBlueMagickReference(abilityId: string): BlueMagickReference | undefined {\n    return BLUE_MAGICK_REFERENCE[abilityId === "limit-glove" ? "cornered" : abilityId];\n}\n`;

const current = fs.existsSync(outputPath) ? fs.readFileSync(outputPath, "utf8") : "";
const currentReference = fs.existsSync(jobReferenceOutputPath)
    ? fs.readFileSync(jobReferenceOutputPath, "utf8")
    : "";
const currentBlueMagick = fs.existsSync(blueMagickOutputPath)
    ? fs.readFileSync(blueMagickOutputPath, "utf8")
    : "";
if (checkOnly) {
    const report = {
        jobs: jobs.length,
        orderedEntries: Object.values(orderByJob).reduce(
            (total, abilityIds) => total + abilityIds.length,
            0,
        ),
        detailedEntries: Object.values(referenceByJob).reduce(
            (total, detail) => total + Object.keys(detail.abilities).length,
            0,
        ),
        blueMagickEntries: blueMagickIds.length,
        current:
            current === output &&
            currentReference === referenceOutput &&
            currentBlueMagick === blueMagickOutput,
        source: path.relative(root, warfreakPath),
    };
    console.log(JSON.stringify(report, null, 2));
    if (!report.current) process.exitCode = 1;
} else {
    fs.writeFileSync(outputPath, output);
    fs.writeFileSync(jobReferenceOutputPath, referenceOutput);
    fs.writeFileSync(blueMagickOutputPath, blueMagickOutput);
    console.log(
        `Wrote player ability order and reference data for ${jobs.length} jobs.`,
    );
}
