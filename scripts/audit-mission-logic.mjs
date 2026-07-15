import fs from "node:fs";
import path from "node:path";
import ts from "typescript";

const root = process.cwd();
const missionsDir = path.join(root, "src", "data", "missions");

function walkFiles(dir, predicate, files = []) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            walkFiles(fullPath, predicate, files);
        } else if (predicate(fullPath)) {
            files.push(fullPath);
        }
    }
    return files;
}

function readSource(file) {
    return ts.createSourceFile(
        file,
        fs.readFileSync(file, "utf8"),
        ts.ScriptTarget.Latest,
        true,
    );
}

function visit(node, cb) {
    cb(node);
    ts.forEachChild(node, (child) => visit(child, cb));
}

function keyName(node, sourceFile) {
    if (!node) return undefined;
    if (ts.isIdentifier(node) || ts.isStringLiteral(node) || ts.isNumericLiteral(node)) {
        return node.text;
    }
    return node.getText(sourceFile);
}

function property(objectNode, name, sourceFile) {
    return objectNode.properties.find((prop) => (
        ts.isPropertyAssignment(prop) &&
        keyName(prop.name, sourceFile) === name
    ));
}

function stringValue(node) {
    if (!node) return undefined;
    if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node) || ts.isNumericLiteral(node)) {
        return node.text;
    }
    return undefined;
}

function propertyString(objectNode, name, sourceFile) {
    const prop = property(objectNode, name, sourceFile);
    return prop ? stringValue(prop.initializer) : undefined;
}

function arrayStrings(arrayNode) {
    if (!arrayNode || !ts.isArrayLiteralExpression(arrayNode)) return [];
    return arrayNode.elements
        .map((element) => stringValue(element))
        .filter((value) => typeof value === "string");
}

function propertyArrayStrings(objectNode, name, sourceFile) {
    const prop = property(objectNode, name, sourceFile);
    return prop ? arrayStrings(prop.initializer) : [];
}

function lineOf(sourceFile, node) {
    return sourceFile.getLineAndCharacterOfPosition(node.getStart(sourceFile)).line + 1;
}

function collectMissions() {
    const files = walkFiles(
        missionsDir,
        (file) => file.endsWith(".ts") &&
            !file.endsWith("allMissions.ts") &&
            !file.endsWith("storyOptional.ts") &&
            !file.endsWith("missionTags.ts") &&
            !file.endsWith("marks.ts"),
    );
    const missions = [];

    for (const file of files) {
        const sourceFile = readSource(file);
        visit(sourceFile, (node) => {
            if (!ts.isVariableDeclaration(node) || !ts.isArrayLiteralExpression(node.initializer)) {
                return;
            }
            const variableName = node.name.getText(sourceFile);
            if (variableName !== "STORY_MAIN_MISSIONS" && !variableName.startsWith("OPTIONAL_MISSIONS_")) {
                return;
            }

            for (const element of node.initializer.elements) {
                if (!ts.isObjectLiteralExpression(element) || !property(element, "id", sourceFile)) {
                    continue;
                }
                const enemiesProp = property(element, "enemies", sourceFile);
                const enemies = [];
                if (enemiesProp && ts.isArrayLiteralExpression(enemiesProp.initializer)) {
                    for (const enemy of enemiesProp.initializer.elements) {
                        if (!ts.isObjectLiteralExpression(enemy)) continue;
                        enemies.push({
                            name: propertyString(enemy, "name", sourceFile),
                            race: propertyString(enemy, "race", sourceFile),
                            job: propertyString(enemy, "job", sourceFile),
                            notes: propertyString(enemy, "notes", sourceFile),
                        });
                    }
                }

                missions.push({
                    file: path.relative(root, file),
                    line: lineOf(sourceFile, element),
                    id: propertyString(element, "id", sourceFile),
                    arc: propertyString(element, "arc", sourceFile),
                    name: propertyString(element, "name", sourceFile),
                    questType: propertyString(element, "questType", sourceFile),
                    objective: propertyString(element, "objective", sourceFile),
                    law: propertyString(element, "law", sourceFile),
                    notes: propertyString(element, "notes", sourceFile),
                    strategy: propertyArrayStrings(element, "strategy", sourceFile),
                    enemies,
                });
            }
        });
    }

    const canonical = new Map();
    for (const mission of missions.filter((mission) => mission.file.endsWith("storyMain.ts"))) {
        canonical.set(mission.id, mission);
    }
    for (const mission of missions.filter((mission) => mission.file.includes("storyOptional."))) {
        canonical.set(mission.id, mission);
    }
    return [...canonical.values()].sort((a, b) => a.id.localeCompare(b.id));
}

const lawChecks = [
    {
        id: "targeting-all-units",
        law: /\btargeting all units\b/i,
        avoid: /\b(all[- ]unit|all units|full[- ]map|field[- ]wide|target(?:ing)? all units|hit all units|include every unit)\b/i,
        conflation: /\b(no aoe|avoid aoe|area attacks?|area-target|multi-tile|two or more tiles|single-target everything|single target everything)\b/i,
        message: "Law forbids all-unit effects, not ordinary area/AoE targeting.",
    },
    {
        id: "targeting-area",
        law: /\btargeting (?:an )?area\b/i,
        avoid: /\b(area|aoe|multi-tile|two or more tiles|splash|wide)\b/i,
        conflation: /\b(all[- ]unit|full[- ]map|target(?:ing)? all units|hit all units|include every unit)\b/i,
        message: "Law forbids area/multi-tile targeting, not only all-unit effects.",
    },
    {
        id: "ranged-weapons",
        law: /\branged weapons?\b/i,
        banned: /\b(bow|greatbow|gun|hand-?cannon|card|fusilier|flintlock|ranged weapon)\b/i,
        avoid: /\b(avoid|do not|don't|forbid|bans?|without|no)\b.{0,40}\b(bow|greatbow|gun|hand-?cannon|card|ranged weapon)\b/i,
    },
    {
        id: "fire",
        law: /\bfire\b/i,
        banned: /\b(fire|fira|firaga|flame|choco flame|oil plus fire|fire spell)\b/i,
        avoid: /\b(avoid|do not|don't|forbid|bans?|without|no|non-fire)\b.{0,45}\b(fire|fira|firaga|flame)\b/i,
    },
    {
        id: "ice",
        law: /\bice\b/i,
        banned: /\b(ice|blizzard|blizzara|blizzaga|freezeblink|frost)\b/i,
        avoid: /\b(avoid|do not|don't|forbid|bans?|without|no|non-ice)\b.{0,45}\b(ice|blizzard|blizzara|blizzaga|freezeblink|frost)\b/i,
    },
    {
        id: "lightning",
        law: /\blightning\b/i,
        banned: /\b(lightning|thunder|thundara|thundaga|bolt)\b/i,
        avoid: /\b(avoid|do not|don't|forbid|bans?|without|no|non-lightning)\b.{0,45}\b(lightning|thunder|thundara|thundaga|bolt)\b/i,
    },
    {
        id: "restoring-hp",
        law: /\brestoring hp\b/i,
        banned: /\b(cure|cura|curaga|heal|healing|restore hp|potions?)\b/i,
        avoid: /\b(avoid|do not|don't|forbid|bans?|without|no)\b.{0,45}\b(cure|cura|curaga|heal|healing|restore hp|potions?)\b/i,
    },
    {
        id: "restoring-mp",
        law: /\brestoring mp\b/i,
        banned: /\b(ether|restore mp|mp recovery|magick frenzy)\b/i,
        avoid: /\b(avoid|do not|don't|forbid|bans?|without|no)\b.{0,45}\b(ether|restore mp|mp recovery)\b/i,
    },
    {
        id: "using-mp",
        law: /\busing mp\b/i,
        banned: /\b(spell|magick|cast|mp-cost|consume mp|using mp)\b/i,
        avoid: /\b(avoid|do not|don't|forbid|bans?|without|no|mp-free)\b.{0,45}\b(spell|magick|cast|mp|abilities)\b/i,
    },
    {
        id: "items",
        law: /\bitems?\b/i,
        banned: /\b(item|potion|phoenix down|ether|remedy)\b/i,
        avoid: /\b(avoid|do not|don't|forbid|bans?|without|no)\b.{0,45}\b(item|potion|phoenix down|ether|remedy)\b/i,
    },
    {
        id: "buffs",
        law: /\bbuffs?\b/i,
        banned: /\b(buff|haste|protect|shell|regen|raise stats?)\b/i,
        avoid: /\b(avoid|do not|don't|forbid|bans?|without|no)\b.{0,45}\b(buff|haste|protect|shell|regen)\b/i,
    },
    {
        id: "debuffs",
        law: /\bdebuffs?\b/i,
        banned: /\b(debuff|poison|blind|sleep|silence|slow|disable|immobilize|charm|doom|oil|status)\b/i,
        avoid: /\b(avoid|do not|don't|forbid|bans?|without|no)\b.{0,45}\b(debuff|poison|blind|sleep|silence|slow|disable|immobilize|charm|doom|oil|status)\b/i,
    },
    {
        id: "reaction-abilities",
        law: /\breaction abilities\b/i,
        banned: /\b(counter|reaction|magick counter|reflex|bonecrusher)\b/i,
        avoid: /\b(avoid|do not|don't|forbid|bans?|without|no|disable|unequip)\b.{0,45}\b(counter|reaction|magick counter|reflex|bonecrusher)\b/i,
    },
    {
        id: "opportunity-commands",
        law: /\bopportunity commands\b/i,
        banned: /\b(opportunity command|opportunity turn)\b/i,
        avoid: /\b(avoid|do not|don't|forbid|bans?|without|no)\b.{0,45}\b(opportunity command|opportunity turn)\b/i,
    },
    {
        id: "knockback",
        law: /\bknockback\b/i,
        banned: /\b(knockback|knock back|rush|air render|aurablast)\b/i,
        avoid: /\b(avoid|do not|don't|forbid|bans?|without|no)\b.{0,45}\b(knockback|knock back|rush|air render|aurablast)\b/i,
    },
    {
        id: "back-attack",
        law: /\bback attack\b/i,
        banned: /\b(back attack|from behind|behind the target|rear)\b/i,
        avoid: /\b(avoid|do not|don't|forbid|bans?|without|no)\b.{0,45}\b(back attack|from behind|behind|rear)\b/i,
    },
    {
        id: "copycat",
        law: /\bcopycat\b/i,
        banned: /\b(repeat|same action|copycat|same command)\b/i,
        avoid: /\b(avoid|do not|don't|forbid|bans?|without|no|alternate|vary)\b.{0,45}\b(repeat|same action|copycat|same command)\b/i,
    },
    {
        id: "targeting-self",
        law: /\btargeting self\b/i,
        banned: /\b(self-target|target yourself|targeting the user|use on self|self-buff)\b/i,
        avoid: /\b(avoid|do not|don't|forbid|bans?|without|no)\b.{0,45}\b(self-target|target yourself|targeting the user|self-buff)\b/i,
    },
    {
        id: "distant-units",
        law: /\btargeting distant units\b/i,
        banned: /\b(ranged|distance|two or more tiles|2\+ tiles|far away|from range)\b/i,
        avoid: /\b(avoid|do not|don't|forbid|bans?|without|no|adjacent|point-blank)\b.{0,50}\b(ranged|distance|two or more tiles|2\+ tiles|from range)\b/i,
    },
    {
        id: "adjacent-units",
        law: /\btargeting adjacent units\b/i,
        banned: /\b(adjacent|melee|next to|point-blank)\b/i,
        avoid: /\b(avoid|do not|don't|forbid|bans?|without|no|keep distance)\b.{0,50}\b(adjacent|melee|next to|point-blank)\b/i,
    },
    {
        id: "harming-protected",
        law: /\bharming (?:the weak|humes?|bangaa|nu mou|viera|moogles?|seeq|gria|males?|females?)\b/i,
        banned: /\b(harm|hit|attack|damage|aoe|area|counter|friendly fire)\b/i,
        avoid: /\b(avoid|do not|don't|forbid|bans?|without|no|careful)\b.{0,50}\b(harm|hit|attack|damage|aoe|area|counter|friendly fire)\b/i,
    },
];

function compact(value) {
    return (value ?? "").replace(/\s+/g, " ").trim();
}

function missionText(mission) {
    return [
        mission.objective,
        mission.law,
        ...mission.strategy,
        mission.notes,
        ...mission.enemies.map((enemy) => enemy.notes),
    ].filter(Boolean).join(" ");
}

function sentences(text) {
    return compact(text)
        .split(/(?<=[.!?])\s+|;\s+/)
        .map((sentence) => sentence.trim())
        .filter(Boolean);
}

function hasAvoidance(check, text) {
    return check.avoid?.test(text) || false;
}

function analyzeMission(mission) {
    const findings = [];
    const law = compact(mission.law);
    const strategyText = compact([...mission.strategy, mission.notes].filter(Boolean).join(" "));
    const combined = missionText(mission);

    if (!law && /battle|defeat|protect|uphold/i.test(`${mission.questType} ${mission.objective}`)) {
        findings.push({
            severity: "review",
            type: "missing-law",
            detail: "Combat-like quest has no law text.",
        });
    }

    for (const check of lawChecks) {
        if (!check.law.test(law)) continue;

        const conflationSentences = check.conflation
            ? sentences(strategyText).filter((sentence) => (
                check.conflation.test(sentence) &&
                !/\bonly a problem\b|\bnot the law issue\b|\bnot (?:a|the) law\b/i.test(sentence)
            ))
            : [];

        if (conflationSentences.length > 0) {
            findings.push({
                severity: "fix",
                type: `${check.id}-conflation`,
                detail: check.message,
            });
        }

        // Free-form strategies frequently mention enemy jobs, enemy pressure, or
        // objective objects that share terms with laws. Keep this audit focused
        // on concrete contradictions rather than fuzzy keyword suspicion.
    }

    return findings;
}

const missions = collectMissions();
const findings = [];
for (const mission of missions) {
    for (const finding of analyzeMission(mission)) {
        findings.push({
            file: mission.file,
            line: mission.line,
            id: mission.id,
            name: mission.name,
            law: mission.law,
            objective: mission.objective,
            strategy: mission.strategy,
            ...finding,
        });
    }
}

const report = {
    counts: {
        missions: missions.length,
        withLaw: missions.filter((mission) => mission.law).length,
        withStrategy: missions.filter((mission) => mission.strategy.length > 0).length,
        findings: findings.length,
        fixes: findings.filter((finding) => finding.severity === "fix").length,
        reviews: findings.filter((finding) => finding.severity === "review").length,
    },
    findings,
};

const outDir = path.join(root, "audit");
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "mission-logic-audit.json"), `${JSON.stringify(report, null, 2)}\n`);

console.log(JSON.stringify({
    counts: report.counts,
    byType: findings.reduce((acc, finding) => {
        acc[finding.type] = (acc[finding.type] ?? 0) + 1;
        return acc;
    }, {}),
    report: "audit/mission-logic-audit.json",
}, null, 2));
