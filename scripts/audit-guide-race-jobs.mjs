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
    process.env.FFTA2_RACE_JOBS_REPORT ??
    path.join(root, "audit", "guide-race-jobs-audit.json");
const guide = fs.readFileSync(guidePath, "utf8");

function normalizeName(value) {
    return value.toLowerCase().replace(/[^a-z0-9]+/g, "");
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

function collectAppRaceJobs() {
    const file = path.join(root, "src", "data", "races", "raceJobs.ts");
    const sourceFile = readSource(file);
    const races = new Map();

    function visit(node) {
        if (
            ts.isVariableDeclaration(node) &&
            node.name.getText(sourceFile) === "RACE_JOBS" &&
            ts.isArrayLiteralExpression(node.initializer)
        ) {
            for (const raceNode of node.initializer.elements) {
                if (!ts.isObjectLiteralExpression(raceNode)) continue;
                const race = stringValue(property(raceNode, "race", sourceFile));
                const jobsNode = property(raceNode, "jobs", sourceFile);
                if (!race || !jobsNode || !ts.isArrayLiteralExpression(jobsNode)) continue;
                const jobs = jobsNode.elements
                    .filter(ts.isObjectLiteralExpression)
                    .map((jobNode) => stringValue(property(jobNode, "name", sourceFile)))
                    .filter(Boolean);
                races.set(race, jobs);
            }
        }
        ts.forEachChild(node, visit);
    }

    visit(sourceFile);
    return races;
}

function collectGuideRaceJobs() {
    const start = guide.indexOf("Bangaa: Bishop, Cannoneer, Defender");
    const end = guide.indexOf("By looking at each race's set of possible jobs", start);
    if (start < 0 || end < start) {
        throw new Error("Unable to locate guide race/job overview.");
    }

    const races = new Map();
    let currentRace = null;
    let currentJobs = "";

    const flush = () => {
        if (!currentRace) return;
        races.set(
            currentRace,
            currentJobs
                .split(",")
                .map((job) => job.trim())
                .filter(Boolean),
        );
        currentRace = null;
        currentJobs = "";
    };

    for (const line of guide.slice(start, end).split(/\r?\n/)) {
        const raceLine = line.match(/^(Bangaa|Gria|Hume|Moogle|Nu Mou|Seeq|Viera):\s*(.*)$/);
        if (raceLine) {
            flush();
            currentRace = raceLine[1];
            currentJobs = raceLine[2].trim();
        } else if (currentRace && /^\s+\S/.test(line)) {
            currentJobs += ` ${line.trim()}`;
        } else if (!line.trim()) {
            flush();
        }
    }
    flush();
    return races;
}

const appRaceJobs = collectAppRaceJobs();
const guideRaceJobs = collectGuideRaceJobs();
const mismatches = [];

for (const [race, guideJobs] of guideRaceJobs) {
    const appJobs = appRaceJobs.get(race) ?? [];
    const appSet = new Set(appJobs.map(normalizeName));
    const guideSet = new Set(guideJobs.map(normalizeName));
    const missingInApp = guideJobs.filter((job) => !appSet.has(normalizeName(job)));
    const extraInApp = appJobs.filter((job) => !guideSet.has(normalizeName(job)));
    if (missingInApp.length || extraInApp.length) {
        mismatches.push({ race, missingInApp, extraInApp });
    }
}

const specialJobs = appRaceJobs.get("Special") ?? [];
const report = {
    guidePath,
    guideRaces: guideRaceJobs.size,
    appRaces: appRaceJobs.size,
    mismatchCount: mismatches.length,
    mismatches,
    specialJobs,
    note:
        "The GameFAQs race overview lists the seven recruitable races. The app also has a Special bucket for named/enemy-only jobs such as Agent, Bard, Dancer, Heritor, and Sky Pirate.",
};

fs.mkdirSync(path.dirname(reportPath), { recursive: true });
fs.writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`);

console.log(
    JSON.stringify(
        {
            guidePath,
            reportPath,
            guideRaces: report.guideRaces,
            appRaces: report.appRaces,
            mismatchCount: report.mismatchCount,
            mismatches,
            specialJobs,
        },
        null,
        2,
    ),
);
