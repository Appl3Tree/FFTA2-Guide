import fs from "node:fs";
import path from "node:path";
import ts from "typescript";

const root = process.cwd();
const srcDir = path.join(root, "src");
const dataDir = path.join(srcDir, "data");

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
    return node.getText(sourceFile).replace(/^["']|["']$/g, "");
}

function prop(objectNode, name, sourceFile) {
    return objectNode.properties.find((property) => (
        ts.isPropertyAssignment(property) &&
        keyName(property.name, sourceFile) === name
    ));
}

function propNode(objectNode, name, sourceFile) {
    return prop(objectNode, name, sourceFile)?.initializer;
}

function stringValue(node) {
    if (!node) return undefined;
    if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return node.text;
    if (ts.isNumericLiteral(node)) return node.text;
    return undefined;
}

function numberValue(node) {
    if (!node) return undefined;
    if (ts.isNumericLiteral(node)) return Number(node.text);
    return undefined;
}

function booleanValue(node) {
    if (!node) return undefined;
    if (node.kind === ts.SyntaxKind.TrueKeyword) return true;
    if (node.kind === ts.SyntaxKind.FalseKeyword) return false;
    return undefined;
}

function stringArray(node) {
    if (!node || !ts.isArrayLiteralExpression(node)) return [];
    return node.elements
        .map((element) => stringValue(element))
        .filter((value) => typeof value === "string");
}

function lineOf(sourceFile, node) {
    return sourceFile.getLineAndCharacterOfPosition(node.getStart(sourceFile)).line + 1;
}

function findVariableInitializer(file, exportName) {
    const sourceFile = readSource(file);
    let initializer;
    visit(sourceFile, (node) => {
        if (
            ts.isVariableDeclaration(node) &&
            node.name.getText(sourceFile) === exportName
        ) {
            initializer = node.initializer;
        }
    });
    return { sourceFile, initializer };
}

function objectEntries(file, exportName) {
    const { sourceFile, initializer } = findVariableInitializer(file, exportName);
    if (!initializer || !ts.isObjectLiteralExpression(initializer)) {
        return { sourceFile, entries: [] };
    }

    return {
        sourceFile,
        entries: initializer.properties
            .filter(ts.isPropertyAssignment)
            .map((property) => ({
                key: keyName(property.name, sourceFile),
                line: lineOf(sourceFile, property.name),
                node: property.initializer,
            })),
    };
}

function arrayEntries(file, exportName) {
    const { sourceFile, initializer } = findVariableInitializer(file, exportName);
    if (!initializer || !ts.isArrayLiteralExpression(initializer)) {
        return { sourceFile, entries: [] };
    }

    return {
        sourceFile,
        entries: initializer.elements.map((node) => ({
            line: lineOf(sourceFile, node),
            node,
        })),
    };
}

function normalizeName(value) {
    return (value ?? "")
        .toLowerCase()
        .replace(/[’']/g, "")
        .replace(/&/g, "and")
        .replace(/[^a-z0-9]+/g, " ")
        .trim();
}

function collectAbilities() {
    const file = path.join(dataDir, "abilities", "abilities.ts");
    const abilitySets = objectEntries(file, "ABILITY_SETS");
    const sets = new Map();
    for (const entry of abilitySets.entries) {
        if (!ts.isObjectLiteralExpression(entry.node)) continue;
        sets.set(entry.key, {
            file: path.relative(root, file),
            line: entry.line,
            key: entry.key,
            id: stringValue(propNode(entry.node, "id", abilitySets.sourceFile)),
        });
    }

    const { sourceFile, entries } = objectEntries(file, "ABILITIES");
    const abilities = new Map();
    const abilityRows = [];
    for (const entry of entries) {
        if (!ts.isObjectLiteralExpression(entry.node)) continue;
        const row = {
            file: path.relative(root, file),
            line: entry.line,
            key: entry.key,
            id: stringValue(propNode(entry.node, "id", sourceFile)),
            setId: stringValue(propNode(entry.node, "setId", sourceFile)),
            otherSetIds: stringArray(propNode(entry.node, "otherSetIds", sourceFile)),
            name: stringValue(propNode(entry.node, "name", sourceFile)),
            description: stringArray(propNode(entry.node, "description", sourceFile)),
            equipmentRequired: stringArray(propNode(entry.node, "equipmentRequired", sourceFile)),
        };
        abilities.set(row.id, row);
        abilityRows.push(row);
    }

    return { sets, abilities, abilityRows };
}

function collectEquipment() {
    const files = [
        ["WEAPON_EQUIPMENT", "equipment.weapons.ts"],
        ["SHIELD_EQUIPMENT", "equipment.shields.ts"],
        ["HELMET_EQUIPMENT", "equipment.helmets.ts"],
        ["ARMOR_EQUIPMENT", "equipment.armors.ts"],
        ["ACCESSORY_EQUIPMENT", "equipment.accessories.ts"],
    ];
    const items = new Map();
    const byName = new Map();
    const rows = [];

    for (const [exportName, fileName] of files) {
        const file = path.join(dataDir, "equipment", fileName);
        const { sourceFile, entries } = objectEntries(file, exportName);
        for (const entry of entries) {
            if (!ts.isObjectLiteralExpression(entry.node)) continue;
            const teachesNode = propNode(entry.node, "teaches", sourceFile);
            const teaches = [];
            if (teachesNode && ts.isObjectLiteralExpression(teachesNode)) {
                for (const teachesProp of teachesNode.properties) {
                    if (!ts.isPropertyAssignment(teachesProp)) continue;
                    teaches.push({
                        job: keyName(teachesProp.name, sourceFile),
                        abilityIds: stringArray(teachesProp.initializer),
                    });
                }
            }
            const row = {
                file: path.relative(root, file),
                line: entry.line,
                key: entry.key,
                id: stringValue(propNode(entry.node, "id", sourceFile)),
                name: stringValue(propNode(entry.node, "name", sourceFile)),
                category: stringValue(propNode(entry.node, "category", sourceFile)),
                weaponType: stringValue(propNode(entry.node, "weaponType", sourceFile)),
                helmetType: stringValue(propNode(entry.node, "helmetType", sourceFile)),
                armorType: stringValue(propNode(entry.node, "armorType", sourceFile)),
                accessoryType: stringValue(propNode(entry.node, "accessoryType", sourceFile)),
                bazaarCategory: stringValue(propNode(entry.node, "bazaar_category", sourceFile)),
                gender: stringValue(propNode(entry.node, "gender", sourceFile)),
                teaches,
            };
            rows.push(row);
            if (row.id) items.set(row.id, row);
            if (row.name) byName.set(normalizeName(row.name), row);
        }
    }

    return { items, byName, rows };
}

function collectEquipmentRules() {
    const file = path.join(dataDir, "equipment", "equipment.ts");
    const ruleMaps = [
        ["WEAPON_RULES", "weaponType"],
        ["HELMET_RULES", "helmetType"],
        ["ARMOR_RULES", "armorType"],
    ];
    const rules = {
        weaponType: new Set(),
        helmetType: new Set(),
        armorType: new Set(),
        hasShieldRule: false,
    };

    for (const [exportName, bucket] of ruleMaps) {
        for (const entry of objectEntries(file, exportName).entries) {
            rules[bucket].add(entry.key);
        }
    }
    rules.hasShieldRule = objectEntries(file, "SHIELD_RULE").entries.length > 0 ||
        fs.readFileSync(file, "utf8").includes("export const SHIELD_RULE");
    return rules;
}

function collectBazaar() {
    const file = path.join(dataDir, "bazaarRecipes.ts");
    const { sourceFile, entries } = arrayEntries(file, "BAZAAR_RECIPES");
    return entries
        .filter((entry) => ts.isObjectLiteralExpression(entry.node))
        .map((entry) => ({
            file: path.relative(root, file),
            line: entry.line,
            id: stringValue(propNode(entry.node, "id", sourceFile)),
            section: stringValue(propNode(entry.node, "section", sourceFile)),
            rank: stringValue(propNode(entry.node, "rank", sourceFile)),
            result: stringValue(propNode(entry.node, "result", sourceFile)),
            loot: stringArray(propNode(entry.node, "loot", sourceFile)),
        }));
}

function collectRaceJobs() {
    const file = path.join(dataDir, "races", "raceJobs.ts");
    const { sourceFile, entries } = arrayEntries(file, "RACE_JOBS");
    const races = [];
    const jobs = new Set();
    for (const entry of entries) {
        if (!ts.isObjectLiteralExpression(entry.node)) continue;
        const race = stringValue(propNode(entry.node, "race", sourceFile));
        const jobsNode = propNode(entry.node, "jobs", sourceFile);
        const raceJobs = [];
        if (jobsNode && ts.isArrayLiteralExpression(jobsNode)) {
            for (const jobNode of jobsNode.elements) {
                if (!ts.isObjectLiteralExpression(jobNode)) continue;
                const name = stringValue(propNode(jobNode, "name", sourceFile));
                const summary = stringValue(propNode(jobNode, "summary", sourceFile));
                raceJobs.push({ name, summary });
                if (name) jobs.add(name);
            }
        }
        races.push({
            file: path.relative(root, file),
            line: entry.line,
            race,
            tagline: stringValue(propNode(entry.node, "tagline", sourceFile)),
            jobs: raceJobs,
        });
    }
    return { races, jobs };
}

function collectBestiary() {
    const file = path.join(dataDir, "bestiary", "bestiary.ts");
    const { sourceFile, entries } = objectEntries(file, "ENEMIES");
    const enemies = new Map();
    const lookup = new Set();
    for (const entry of entries) {
        if (!ts.isObjectLiteralExpression(entry.node)) continue;
        const row = {
            file: path.relative(root, file),
            line: entry.line,
            key: entry.key,
            id: stringValue(propNode(entry.node, "id", sourceFile)),
            job: stringValue(propNode(entry.node, "job", sourceFile)),
            description: stringValue(propNode(entry.node, "description", sourceFile)),
        };
        enemies.set(row.job, row);
        lookup.add(normalizeName(entry.key));
        lookup.add(normalizeName(row.id));
        lookup.add(normalizeName(row.job));
    }
    return { enemies, lookup };
}

function collectMissions() {
    const files = walkFiles(
        path.join(dataDir, "missions"),
        (file) => file.endsWith(".ts") &&
            !file.endsWith("allMissions.ts") &&
            !file.endsWith("storyOptional.ts") &&
            !file.endsWith("missionTags.ts") &&
            !file.endsWith("marks.ts"),
    );
    const missions = new Map();
    for (const file of files) {
        const sourceFile = readSource(file);
        visit(sourceFile, (node) => {
            if (!ts.isVariableDeclaration(node) || !ts.isArrayLiteralExpression(node.initializer)) return;
            const variableName = node.name.getText(sourceFile);
            if (variableName !== "STORY_MAIN_MISSIONS" && !variableName.startsWith("OPTIONAL_MISSIONS_")) return;
            for (const missionNode of node.initializer.elements) {
                if (!ts.isObjectLiteralExpression(missionNode)) continue;
                const id = stringValue(propNode(missionNode, "id", sourceFile));
                if (!id) continue;
                const enemies = [];
                const enemiesNode = propNode(missionNode, "enemies", sourceFile);
                if (enemiesNode && ts.isArrayLiteralExpression(enemiesNode)) {
                    for (const enemyNode of enemiesNode.elements) {
                        if (!ts.isObjectLiteralExpression(enemyNode)) continue;
                        enemies.push({
                            name: stringValue(propNode(enemyNode, "name", sourceFile)),
                            job: stringValue(propNode(enemyNode, "job", sourceFile)),
                            race: stringValue(propNode(enemyNode, "race", sourceFile)),
                        });
                    }
                }
                missions.set(id, {
                    file: path.relative(root, file),
                    line: lineOf(sourceFile, missionNode),
                    id,
                    name: stringValue(propNode(missionNode, "name", sourceFile)),
                    enemies,
                });
            }
        });
    }
    return missions;
}

function collectRetroAchievements() {
    const file = path.join(dataDir, "retroAchievements.ts");
    const missionRefs = [];
    const all = [];
    const missionRecord = objectEntries(file, "RETRO_ACHIEVEMENTS_BY_MISSION_ID");
    for (const entry of missionRecord.entries) {
        missionRefs.push({
            file: path.relative(root, file),
            line: entry.line,
            missionId: entry.key,
        });
        if (!ts.isArrayLiteralExpression(entry.node)) continue;
        for (const achievementNode of entry.node.elements) {
            if (!ts.isObjectLiteralExpression(achievementNode)) continue;
            all.push({
                file: path.relative(root, file),
                line: lineOf(missionRecord.sourceFile, achievementNode),
                scope: "mission",
                missionId: entry.key,
                id: stringValue(propNode(achievementNode, "id", missionRecord.sourceFile)),
                name: stringValue(propNode(achievementNode, "name", missionRecord.sourceFile)),
                description: stringValue(propNode(achievementNode, "description", missionRecord.sourceFile)),
                missable: booleanValue(propNode(achievementNode, "missable", missionRecord.sourceFile)) ?? false,
            });
        }
    }

    const globalArray = arrayEntries(file, "GLOBAL_RETRO_ACHIEVEMENTS");
    for (const entry of globalArray.entries) {
        if (!ts.isObjectLiteralExpression(entry.node)) continue;
        all.push({
            file: path.relative(root, file),
            line: entry.line,
            scope: "global",
            id: stringValue(propNode(entry.node, "id", globalArray.sourceFile)),
            name: stringValue(propNode(entry.node, "name", globalArray.sourceFile)),
            description: stringValue(propNode(entry.node, "description", globalArray.sourceFile)),
            category: stringValue(propNode(entry.node, "category", globalArray.sourceFile)),
            missable: booleanValue(propNode(entry.node, "missable", globalArray.sourceFile)) ?? false,
        });
    }

    return { all, missionRefs };
}

function collectClanTrials() {
    const file = path.join(dataDir, "meta", "clanTrials.ts");
    const trials = arrayEntries(file, "CLAN_TRIALS");
    const trialRows = [];
    for (const entry of trials.entries) {
        if (!ts.isObjectLiteralExpression(entry.node)) continue;
        const titles = [];
        const titlesNode = propNode(entry.node, "titles", trials.sourceFile);
        if (titlesNode && ts.isArrayLiteralExpression(titlesNode)) {
            for (const titleNode of titlesNode.elements) {
                if (!ts.isObjectLiteralExpression(titleNode)) continue;
                titles.push({
                    title: stringValue(propNode(titleNode, "title", trials.sourceFile)),
                    clanRank: numberValue(propNode(titleNode, "clanRank", trials.sourceFile)),
                    privilege: stringValue(propNode(titleNode, "privilege", trials.sourceFile)),
                    objective: stringValue(propNode(titleNode, "objective", trials.sourceFile)),
                });
            }
        }
        trialRows.push({
            file: path.relative(root, file),
            line: entry.line,
            id: stringValue(propNode(entry.node, "id", trials.sourceFile)),
            name: stringValue(propNode(entry.node, "name", trials.sourceFile)),
            law: stringValue(propNode(entry.node, "law", trials.sourceFile)),
            titles,
        });
    }

    const roadmap = arrayEntries(file, "CLAN_PRIVILEGE_ROADMAP");
    const roadmapRows = roadmap.entries
        .filter((entry) => ts.isObjectLiteralExpression(entry.node))
        .map((entry) => ({
            file: path.relative(root, file),
            line: entry.line,
            id: stringValue(propNode(entry.node, "id", roadmap.sourceFile)),
            privilege: stringValue(propNode(entry.node, "privilege", roadmap.sourceFile)),
            trial: stringValue(propNode(entry.node, "trial", roadmap.sourceFile)),
            title: stringValue(propNode(entry.node, "title", roadmap.sourceFile)),
        }));

    return { trialRows, roadmapRows };
}

function collectMetaArrays() {
    const configs = [
        ["meta/introPanels.ts", "INTRO_PANELS", ["id", "title", "paragraphs"]],
        ["meta/systemsPanels.ts", "SYSTEMS_PANELS", ["id", "title", "paragraphs"]],
        ["meta/faq.ts", "FAQ_ITEMS", ["id", "question", "answer", "tags"]],
    ];
    const rows = [];
    for (const [relative, exportName, required] of configs) {
        const file = path.join(dataDir, relative);
        const { sourceFile, entries } = arrayEntries(file, exportName);
        for (const entry of entries) {
            if (!ts.isObjectLiteralExpression(entry.node)) continue;
            rows.push({
                file: path.relative(root, file),
                line: entry.line,
                exportName,
                id: stringValue(propNode(entry.node, "id", sourceFile)),
                required,
                node: entry.node,
                sourceFile,
            });
        }
    }
    return rows;
}

function add(findingList, finding) {
    findingList.push(finding);
}

function duplicateGroups(rows, keyFn) {
    const groups = new Map();
    for (const row of rows) {
        const key = keyFn(row);
        if (!key) continue;
        if (!groups.has(key)) groups.set(key, []);
        groups.get(key).push(row);
    }
    return [...groups.entries()].filter(([, group]) => group.length > 1);
}

const findings = [];
const abilities = collectAbilities();
const equipment = collectEquipment();
const equipmentRules = collectEquipmentRules();
const bazaar = collectBazaar();
const raceJobs = collectRaceJobs();
const bestiary = collectBestiary();
const missions = collectMissions();
const retro = collectRetroAchievements();
const clanTrials = collectClanTrials();
const metaRows = collectMetaArrays();

for (const ability of abilities.abilityRows) {
    if (ability.key !== ability.id) {
        add(findings, { type: "ability-key-id-mismatch", ...ability });
    }
    if (!abilities.sets.has(ability.setId)) {
        add(findings, { type: "ability-missing-set", ...ability });
    }
    for (const setId of ability.otherSetIds) {
        if (!abilities.sets.has(setId)) {
            add(findings, { type: "ability-missing-other-set", setId, ...ability });
        }
    }
    if (!ability.name || ability.description.length === 0) {
        add(findings, { type: "ability-empty-display-text", ...ability });
    }
    for (const itemName of ability.equipmentRequired) {
        if (!equipment.byName.has(normalizeName(itemName))) {
            add(findings, { type: "ability-equipment-required-missing", itemName, ...ability });
        }
    }
}

for (const item of equipment.rows) {
    if (item.key !== item.id) {
        add(findings, { type: "equipment-key-id-mismatch", ...item });
    }
    if (!item.name || !item.category) {
        add(findings, { type: "equipment-empty-display-text", ...item });
    }
    if (item.category === "Weapon" && item.weaponType && !equipmentRules.weaponType.has(item.weaponType)) {
        add(findings, { type: "equipment-missing-weapon-rule", ...item });
    }
    if (item.category === "Helmet" && item.helmetType && !equipmentRules.helmetType.has(item.helmetType)) {
        add(findings, { type: "equipment-missing-helmet-rule", ...item });
    }
    if (item.category === "Armor" && item.armorType && !equipmentRules.armorType.has(item.armorType)) {
        add(findings, { type: "equipment-missing-armor-rule", ...item });
    }
    for (const teaches of item.teaches) {
        for (const abilityId of teaches.abilityIds) {
            if (!abilities.abilities.has(abilityId)) {
                add(findings, { type: "equipment-teaches-missing-ability", abilityId, ...item });
            }
        }
    }
}

for (const recipe of bazaar) {
    if (!recipe.id || !recipe.section || !recipe.rank || !recipe.result || recipe.loot.length === 0) {
        add(findings, { type: "bazaar-empty-required-field", ...recipe });
    }
    if (!equipment.byName.has(normalizeName(recipe.result))) {
        add(findings, { type: "bazaar-result-missing-equipment", ...recipe });
    }
}

for (const [key, group] of duplicateGroups(bazaar, (recipe) => recipe.id)) {
    add(findings, { type: "bazaar-duplicate-id", key, entries: group });
}

for (const race of raceJobs.races) {
    if (!race.race || !race.tagline || race.jobs.length === 0) {
        add(findings, { type: "race-empty-display-text", ...race });
    }
    for (const job of race.jobs) {
        if (!job.name || !job.summary) {
            add(findings, { type: "race-job-empty-display-text", race: race.race, job, file: race.file, line: race.line });
        }
    }
}

const knownNonBestiaryJobs = new Set([
    ...raceJobs.jobs,
    "Agent",
    "Bard",
    "Dancer",
    "Devotee",
    "Devotee Jr.",
    "Goug Watch",
    "Heritor",
    "Keeper",
    "Nightshade",
    "Nightfall",
    "Prima Donna",
    "Sky Pirate",
]);

const missionEnemyAliases = new Map([
    ["Blue Chocobo Knight", "Chocobo Knight"],
    ["Black Chocobo Knight", "Chocobo Knight"],
    ["Brown Chocobo Knight", "Chocobo Knight"],
    ["Red Chocobo Knight", "Chocobo Knight"],
    ["White Chocobo Knight", "Chocobo Knight"],
    ["Red Jelly", "Yellow Jelly"],
    ["Blue Flan", "Ice Flan"],
    ["Flan", "Ice Flan"],
    ["Assorted Flan", "Ice Flan"],
    ["Trice", "Mamatrice"],
    ["Yellow Chocobo", "Chocobo"],
    ["Giant Tortoise", "Great Tortoise"],
    ["Incubus", "Humbaba"],
]);

const aggregateMissionEnemyJobs = new Set([
    "Enemy",
    "Mage group",
    "Mixed elite group",
    "Randomized",
    "Randomized Clan",
    "Randomized Monster",
    "Rival Clan",
    "Worgen/Rocktitan/Tonberry",
]);

function bestiaryHasJob(job) {
    const alias = missionEnemyAliases.get(job) ?? job;
    return bestiary.lookup.has(normalizeName(alias));
}

function knownNonBestiaryJobExists(job) {
    const alias = missionEnemyAliases.get(job) ?? job;
    return knownNonBestiaryJobs.has(alias);
}

for (const mission of missions.values()) {
    for (const enemy of mission.enemies) {
        if (!enemy.job || enemy.job === "—") continue;
        if (
            !bestiaryHasJob(enemy.job) &&
            !knownNonBestiaryJobExists(enemy.job) &&
            !aggregateMissionEnemyJobs.has(enemy.job)
        ) {
            add(findings, {
                type: "mission-enemy-job-not-indexed",
                file: mission.file,
                line: mission.line,
                missionId: mission.id,
                missionName: mission.name,
                enemyJob: enemy.job,
            });
        }
    }
}

for (const achievementRef of retro.missionRefs) {
    if (!missions.has(achievementRef.missionId)) {
        add(findings, { type: "retro-missing-mission", ...achievementRef });
    }
}

for (const [id, group] of duplicateGroups(retro.all, (achievement) => achievement.id)) {
    const signatures = new Set(group.map((achievement) => JSON.stringify({
        name: achievement.name,
        description: achievement.description,
        missable: achievement.missable,
    })));
    if (signatures.size > 1) {
        add(findings, { type: "retro-duplicate-id-display-mismatch", id, entries: group });
    }
}

const trialNames = new Set(clanTrials.trialRows.map((trial) => trial.name));
const roadmapTrialAliases = new Map([
    ["Teamwork I / II", ["Teamwork I", "Teamwork II"]],
    ["Aptitude I / II", ["Aptitude I", "Aptitude II"]],
    ["Adaptability I / II", ["Adaptability I", "Adaptability II"]],
    ["Mixed families", [
        "Aptitude-Adaptability",
        "Teamwork-Aptitude",
        "Adaptability-Negotiation",
        "Negotiation-Teamwork",
        "General Training I",
        "General Training II",
    ]],
    ["Single-talent families", [
        "Negotiation I",
        "Negotiation II",
        "Aptitude I",
        "Aptitude II",
        "Teamwork I",
        "Teamwork II",
        "Adaptability I",
        "Adaptability II",
    ]],
    ["Teamwork-Aptitude / Adaptability-Negotiation", [
        "Teamwork-Aptitude",
        "Adaptability-Negotiation",
    ]],
]);

function roadmapTrialExists(name) {
    if (!name) return true;
    if (trialNames.has(name)) return true;
    const aliases = roadmapTrialAliases.get(name);
    return Boolean(aliases?.every((alias) => trialNames.has(alias)));
}

for (const trial of clanTrials.trialRows) {
    if (!trial.id || !trial.name || !trial.law || trial.titles.length !== 5) {
        add(findings, { type: "clan-trial-incomplete", ...trial });
    }
    for (const title of trial.titles) {
            if (!title.title || !title.objective) {
            add(findings, { type: "clan-trial-title-incomplete", trial: trial.name, title, file: trial.file, line: trial.line });
        }
    }
}

for (const item of clanTrials.roadmapRows) {
    if (!roadmapTrialExists(item.trial)) {
        add(findings, { type: "clan-roadmap-missing-trial", ...item });
    }
}

for (const row of metaRows) {
    for (const field of row.required) {
        const valueNode = propNode(row.node, field, row.sourceFile);
        const string = stringValue(valueNode);
        const list = stringArray(valueNode);
        if ((string !== undefined && !string.trim()) || (ts.isArrayLiteralExpression(valueNode) && list.length === 0) || (!string && !ts.isArrayLiteralExpression(valueNode))) {
            add(findings, {
                type: "meta-empty-required-field",
                file: row.file,
                line: row.line,
                exportName: row.exportName,
                id: row.id,
                field,
            });
        }
    }
}

const report = {
    counts: {
        abilitySets: abilities.sets.size,
        abilities: abilities.abilityRows.length,
        equipment: equipment.rows.length,
        bazaarRecipes: bazaar.length,
        races: raceJobs.races.length,
        raceJobs: raceJobs.jobs.size,
        bestiary: bestiary.enemies.size,
        missions: missions.size,
        retroAchievements: retro.all.length,
        clanTrials: clanTrials.trialRows.length,
        clanRoadmapItems: clanTrials.roadmapRows.length,
        metaRows: metaRows.length,
        findings: findings.length,
    },
    byType: findings.reduce((acc, finding) => {
        acc[finding.type] = (acc[finding.type] ?? 0) + 1;
        return acc;
    }, {}),
    findings,
};

const outDir = path.join(root, "audit");
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "app-consistency-audit.json"), `${JSON.stringify(report, null, 2)}\n`);

console.log(JSON.stringify({
    counts: report.counts,
    byType: report.byType,
    report: "audit/app-consistency-audit.json",
}, null, 2));
