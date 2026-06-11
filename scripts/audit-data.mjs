import fs from "node:fs";
import path from "node:path";
import ts from "typescript";

const root = process.cwd();
const srcData = path.join(root, "src", "data");

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

function lineOf(sourceFile, node) {
    return sourceFile.getLineAndCharacterOfPosition(node.getStart(sourceFile)).line + 1;
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
    if (ts.isStringLiteral(node) || ts.isNumericLiteral(node)) return node.text;
    if (node.kind === ts.SyntaxKind.NullKeyword) return null;
    return undefined;
}

function propertyString(objectNode, name, sourceFile) {
    const prop = property(objectNode, name, sourceFile);
    return prop ? stringValue(prop.initializer) : undefined;
}

function arrayStrings(arrayNode) {
    if (!ts.isArrayLiteralExpression(arrayNode)) return [];
    return arrayNode.elements
        .map((element) => stringValue(element))
        .filter((value) => typeof value === "string");
}

function visit(node, cb) {
    cb(node);
    ts.forEachChild(node, (child) => visit(child, cb));
}

function collectExportedRecord(file, exportName) {
    const sourceFile = readSource(file);
    let record;

    visit(sourceFile, (node) => {
        if (
            ts.isVariableDeclaration(node) &&
            node.name.getText(sourceFile) === exportName &&
            ts.isObjectLiteralExpression(node.initializer)
        ) {
            record = node.initializer;
        }
    });

    if (!record) return { sourceFile, entries: [] };

    const entries = [];
    for (const prop of record.properties) {
        if (!ts.isPropertyAssignment(prop) || !ts.isObjectLiteralExpression(prop.initializer)) {
            continue;
        }

        entries.push({
            key: keyName(prop.name, sourceFile),
            line: lineOf(sourceFile, prop.name),
            node: prop.initializer,
        });
    }

    return { sourceFile, entries };
}

function collectExportedRecordValues(file, exportName) {
    const sourceFile = readSource(file);
    let record;

    visit(sourceFile, (node) => {
        if (
            ts.isVariableDeclaration(node) &&
            node.name.getText(sourceFile) === exportName &&
            ts.isObjectLiteralExpression(node.initializer)
        ) {
            record = node.initializer;
        }
    });

    if (!record) return { sourceFile, entries: [] };

    const entries = [];
    for (const prop of record.properties) {
        if (!ts.isPropertyAssignment(prop)) {
            continue;
        }

        entries.push({
            key: keyName(prop.name, sourceFile),
            line: lineOf(sourceFile, prop.name),
            node: prop.initializer,
        });
    }

    return { sourceFile, entries };
}

function collectDuplicateObjectKeys(files) {
    const findings = [];

    for (const file of files) {
        const sourceFile = readSource(file);

        visit(sourceFile, (node) => {
            if (!ts.isObjectLiteralExpression(node)) return;

            const seen = new Map();
            for (const prop of node.properties) {
                if (
                    !ts.isPropertyAssignment(prop) &&
                    !ts.isShorthandPropertyAssignment(prop) &&
                    !ts.isMethodDeclaration(prop)
                ) {
                    continue;
                }

                const key = keyName(prop.name, sourceFile);
                if (!key) continue;

                const current = {
                    file: path.relative(root, file),
                    line: lineOf(sourceFile, prop.name),
                    key,
                };

                if (seen.has(key)) {
                    findings.push({
                        ...current,
                        firstLine: seen.get(key).line,
                    });
                } else {
                    seen.set(key, current);
                }
            }
        });
    }

    return findings;
}

function collectAbilities() {
    const file = path.join(srcData, "abilities", "abilities.ts");
    const { sourceFile, entries } = collectExportedRecord(file, "ABILITIES");

    return entries.map((entry) => ({
        file: path.relative(root, file),
        line: entry.line,
        key: entry.key,
        id: propertyString(entry.node, "id", sourceFile),
        setId: propertyString(entry.node, "setId", sourceFile),
        name: propertyString(entry.node, "name", sourceFile),
    }));
}

function collectEquipment() {
    const equipmentFiles = walkFiles(
        path.join(srcData, "equipment"),
        (file) => /equipment\.(weapons|shields|helmets|armors|accessories)\.ts$/.test(file),
    );
    const entries = [];

    for (const file of equipmentFiles) {
        const sourceFile = readSource(file);

        visit(sourceFile, (node) => {
            if (!ts.isVariableDeclaration(node) || !ts.isObjectLiteralExpression(node.initializer)) {
                return;
            }

            for (const prop of node.initializer.properties) {
                if (!ts.isPropertyAssignment(prop) || !ts.isObjectLiteralExpression(prop.initializer)) {
                    continue;
                }

                entries.push({
                    file: path.relative(root, file),
                    line: lineOf(sourceFile, prop.name),
                    key: keyName(prop.name, sourceFile),
                    id: propertyString(prop.initializer, "id", sourceFile),
                    name: propertyString(prop.initializer, "name", sourceFile),
                    category: propertyString(prop.initializer, "category", sourceFile),
                });
            }
        });
    }

    return entries.filter((entry) => entry.id && entry.name);
}

function collectMissions() {
    const missionFiles = walkFiles(
        path.join(srcData, "missions"),
        (file) => file.endsWith(".ts") &&
            !file.endsWith("allMissions.ts") &&
            !file.endsWith("storyOptional.ts") &&
            !file.endsWith("missionTags.ts") &&
            !file.endsWith("marks.ts"),
    );
    const missions = [];

    for (const file of missionFiles) {
        const sourceFile = readSource(file);

        visit(sourceFile, (node) => {
            if (
                !ts.isVariableDeclaration(node) ||
                !ts.isArrayLiteralExpression(node.initializer)
            ) {
                return;
            }

            const variableName = node.name.getText(sourceFile);
            if (variableName !== "STORY_MAIN_MISSIONS" && !variableName.startsWith("OPTIONAL_MISSIONS_")) {
                return;
            }

            for (const element of node.initializer.elements) {
                if (
                    !ts.isObjectLiteralExpression(element) ||
                    !property(element, "id", sourceFile) ||
                    !property(element, "name", sourceFile) ||
                    !property(element, "rewards", sourceFile)
                ) {
                    continue;
                }

                missions.push({
                    file: path.relative(root, file),
                    line: lineOf(sourceFile, element),
                    id: propertyString(element, "id", sourceFile),
                    name: propertyString(element, "name", sourceFile),
                    arc: propertyString(element, "arc", sourceFile),
                });
            }
        });
    }

    return missions;
}

function missionRuntimeSummary(missions) {
    const storyMissions = missions.filter((mission) => mission.file.endsWith("storyMain.ts"));
    const optionalMissions = missions.filter((mission) => mission.file.includes("storyOptional."));
    const byId = new Map();

    for (const mission of storyMissions) {
        byId.set(mission.id, mission);
    }

    for (const mission of optionalMissions) {
        byId.set(mission.id, mission);
    }

    return {
        raw: missions.length,
        canonical: byId.size,
        deduped: missions.length - byId.size,
    };
}

function canonicalMissionIds(missions) {
    const storyMissions = missions.filter((mission) => mission.file.endsWith("storyMain.ts"));
    const optionalMissions = missions.filter((mission) => mission.file.includes("storyOptional."));
    const byId = new Map();

    for (const mission of storyMissions) {
        byId.set(mission.id, mission);
    }

    for (const mission of optionalMissions) {
        byId.set(mission.id, mission);
    }

    return new Set(byId.keys());
}

function collectMissionTags() {
    const file = path.join(srcData, "missions", "missionTags.ts");
    const { entries } = collectExportedRecordValues(file, "MISSION_TAGS");

    return entries.map((entry) => ({
        file: path.relative(root, file),
        line: entry.line,
        missionId: entry.key,
        tags: arrayStrings(entry.node),
    }));
}

function collectRetroAchievementMissionRefs() {
    const file = path.join(srcData, "retroAchievements.ts");
    const { entries } = collectExportedRecordValues(file, "RETRO_ACHIEVEMENTS_BY_MISSION_ID");

    return entries.map((entry) => ({
        file: path.relative(root, file),
        line: entry.line,
        missionId: entry.key,
    }));
}

function collectDuplicateMissionTags(missionTags) {
    const findings = [];

    for (const entry of missionTags) {
        const seen = new Set();
        const duplicates = [];

        for (const tag of entry.tags) {
            if (seen.has(tag)) {
                duplicates.push(tag);
            } else {
                seen.add(tag);
            }
        }

        if (duplicates.length > 0) {
            findings.push({
                ...entry,
                duplicateTags: duplicates,
            });
        }
    }

    return findings;
}

function collectMissingMissionTags(missionIds, missionTags) {
    const tagIds = new Set(missionTags.map((entry) => entry.missionId));

    return [...missionIds]
        .filter((missionId) => !tagIds.has(missionId))
        .map((missionId) => ({ missionId }));
}

function collectAbilityReferences() {
    const files = walkFiles(srcData, (file) => file.endsWith(".ts"));
    const refs = [];

    for (const file of files) {
        const sourceFile = readSource(file);

        visit(sourceFile, (node) => {
            if (!ts.isPropertyAssignment(node)) return;

            const key = keyName(node.name, sourceFile);
            if (
                (key === "abilityIds" || key === "abilities") &&
                ts.isArrayLiteralExpression(node.initializer)
            ) {
                for (const id of arrayStrings(node.initializer)) {
                    refs.push({
                        file: path.relative(root, file),
                        line: lineOf(sourceFile, node),
                        prop: key,
                        id,
                    });
                }
            }

            if (key === "teaches" && ts.isObjectLiteralExpression(node.initializer)) {
                for (const jobProp of node.initializer.properties) {
                    if (!ts.isPropertyAssignment(jobProp) || !ts.isArrayLiteralExpression(jobProp.initializer)) {
                        continue;
                    }

                    for (const id of arrayStrings(jobProp.initializer)) {
                        refs.push({
                            file: path.relative(root, file),
                            line: lineOf(sourceFile, jobProp),
                            prop: "teaches",
                            id,
                        });
                    }
                }
            }
        });
    }

    return refs;
}

function enclosingPropertyAssignment(node) {
    let current = node.parent;

    while (current && !ts.isSourceFile(current)) {
        if (ts.isPropertyAssignment(current)) {
            return current;
        }

        current = current.parent;
    }

    return undefined;
}

function collectPlaceholders() {
    const files = walkFiles(srcData, (file) => file.endsWith(".ts"));
    const findings = [];
    const placeholderValues = new Set(["", "?", "snakeCase", "hyphen-name", "lowercase"]);
    const allowedEmptyProperties = new Set(["loot", "notes"]);

    for (const file of files) {
        const sourceFile = readSource(file);

        visit(sourceFile, (node) => {
            if (!ts.isStringLiteral(node) || !placeholderValues.has(node.text)) {
                return;
            }

            const parentProp = enclosingPropertyAssignment(node);
            const propName = parentProp
                ? keyName(parentProp.name, sourceFile)
                : undefined;
            const objectId = (
                parentProp &&
                ts.isObjectLiteralExpression(parentProp.parent)
            )
                ? propertyString(parentProp.parent, "id", sourceFile)
                : undefined;

            if (node.text === "" && propName && allowedEmptyProperties.has(propName)) {
                return;
            }

            findings.push({
                file: path.relative(root, file),
                line: lineOf(sourceFile, node),
                prop: propName,
                objectId,
                value: node.text,
            });
        });
    }

    return findings;
}

function groupDuplicates(entries, keyFn) {
    const groups = new Map();
    for (const entry of entries) {
        const key = keyFn(entry);
        if (!key) continue;
        if (!groups.has(key)) groups.set(key, []);
        groups.get(key).push(entry);
    }

    return [...groups.entries()]
        .filter(([, grouped]) => grouped.length > 1)
        .map(([key, grouped]) => ({ key, entries: grouped }));
}

function isKnownDuplicateAbilityName(group) {
    return group.key === "Sanctify" &&
        group.entries.length === 2 &&
        group.entries.some((entry) => entry.id === "sanctify-abyss" && entry.setId === "abyss") &&
        group.entries.some((entry) => entry.id === "sanctify" && entry.setId === "chivalry");
}

function isKnownDuplicateMissionId(group) {
    return group.entries.length === 2 &&
        group.entries.some((entry) => entry.file.endsWith("storyMain.ts")) &&
        group.entries.some((entry) => entry.file.includes("storyOptional."));
}

function isKnownDuplicateMissionName(group) {
    return group.entries.length === 2 &&
        group.entries[0].id === group.entries[1].id &&
        group.entries.some((entry) => entry.file.endsWith("storyMain.ts")) &&
        group.entries.some((entry) => entry.file.includes("storyOptional."));
}

function isKnownPlaceholder(finding) {
    return finding.file === "src/data/bestiary/bestiary.ts" &&
        finding.objectId === "dark-behemoth" &&
        finding.value === "?" &&
        ["absorb", "immune", "half", "weak"].includes(finding.prop);
}

function summarize() {
    const dataFiles = walkFiles(srcData, (file) => file.endsWith(".ts"));
    const abilities = collectAbilities();
    const equipment = collectEquipment();
    const missions = collectMissions();
    const abilityIds = new Set(abilities.map((ability) => ability.key));
    const abilityRefs = collectAbilityReferences();
    const missionIds = canonicalMissionIds(missions);
    const missionTags = collectMissionTags();
    const retroAchievementMissionRefs = collectRetroAchievementMissionRefs();
    const missingAbilityRefs = abilityRefs.filter((ref) => !abilityIds.has(ref.id));
    const missingMissionTagRefs = missionTags.filter((ref) => !missionIds.has(ref.missionId));
    const missingRetroAchievementMissionRefs = retroAchievementMissionRefs.filter((ref) => !missionIds.has(ref.missionId));

    const report = {
        counts: {
            dataFiles: dataFiles.length,
            abilities: abilities.length,
            equipment: equipment.length,
            missions: missionRuntimeSummary(missions),
            abilityRefs: abilityRefs.length,
            missionTagRefs: missionTags.length,
            retroAchievementMissionRefs: retroAchievementMissionRefs.length,
        },
        duplicateObjectKeys: collectDuplicateObjectKeys(dataFiles),
        duplicateAbilityIds: groupDuplicates(abilities, (ability) => ability.id),
        duplicateAbilityNames: groupDuplicates(abilities, (ability) => ability.name),
        abilityKeyIdMismatches: abilities.filter((ability) => ability.key !== ability.id),
        missingAbilityRefs: groupDuplicates(missingAbilityRefs, (ref) => ref.id),
        duplicateEquipmentIds: groupDuplicates(equipment, (item) => item.id),
        duplicateEquipmentNamesWithinCategory: groupDuplicates(equipment, (item) => `${item.category}|${item.name}`),
        equipmentKeyIdMismatches: equipment.filter((item) => item.key !== item.id),
        duplicateMissionIdsRaw: groupDuplicates(missions, (mission) => mission.id),
        duplicateMissionNames: groupDuplicates(missions, (mission) => mission.name),
        missingMissionTagRefs,
        missingMissionTags: collectMissingMissionTags(missionIds, missionTags),
        duplicateMissionTags: collectDuplicateMissionTags(missionTags),
        missingRetroAchievementMissionRefs,
        placeholders: collectPlaceholders(),
    };

    report.knownExceptions = {
        duplicateAbilityNames: report.duplicateAbilityNames.filter(isKnownDuplicateAbilityName),
        duplicateMissionIdsRaw: report.duplicateMissionIdsRaw.filter(isKnownDuplicateMissionId),
        duplicateMissionNames: report.duplicateMissionNames.filter(isKnownDuplicateMissionName),
        placeholders: report.placeholders.filter(isKnownPlaceholder),
    };

    report.actionable = {
        duplicateObjectKeys: report.duplicateObjectKeys,
        duplicateAbilityIds: report.duplicateAbilityIds,
        duplicateAbilityNames: report.duplicateAbilityNames.filter((group) => !isKnownDuplicateAbilityName(group)),
        abilityKeyIdMismatches: report.abilityKeyIdMismatches,
        missingAbilityRefs: report.missingAbilityRefs,
        duplicateEquipmentIds: report.duplicateEquipmentIds,
        duplicateEquipmentNamesWithinCategory: report.duplicateEquipmentNamesWithinCategory,
        equipmentKeyIdMismatches: report.equipmentKeyIdMismatches,
        duplicateMissionIdsRaw: report.duplicateMissionIdsRaw.filter((group) => !isKnownDuplicateMissionId(group)),
        duplicateMissionNames: report.duplicateMissionNames.filter((group) => !isKnownDuplicateMissionName(group)),
        missingMissionTagRefs: report.missingMissionTagRefs,
        missingMissionTags: report.missingMissionTags,
        duplicateMissionTags: report.duplicateMissionTags,
        missingRetroAchievementMissionRefs: report.missingRetroAchievementMissionRefs,
        placeholders: report.placeholders.filter((finding) => !isKnownPlaceholder(finding)),
    };

    return report;
}

const report = summarize();
const outDir = path.join(root, "audit");
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "data-audit.json"), `${JSON.stringify(report, null, 2)}\n`);

console.log(JSON.stringify({
    counts: report.counts,
    actionable: {
        duplicateObjectKeys: report.actionable.duplicateObjectKeys.length,
        duplicateAbilityIds: report.actionable.duplicateAbilityIds.length,
        duplicateAbilityNames: report.actionable.duplicateAbilityNames.length,
        abilityKeyIdMismatches: report.actionable.abilityKeyIdMismatches.length,
        missingAbilityRefs: report.actionable.missingAbilityRefs.length,
        duplicateEquipmentIds: report.actionable.duplicateEquipmentIds.length,
        duplicateEquipmentNamesWithinCategory: report.actionable.duplicateEquipmentNamesWithinCategory.length,
        equipmentKeyIdMismatches: report.actionable.equipmentKeyIdMismatches.length,
        duplicateMissionIdsRaw: report.actionable.duplicateMissionIdsRaw.length,
        duplicateMissionNames: report.actionable.duplicateMissionNames.length,
        missingMissionTagRefs: report.actionable.missingMissionTagRefs.length,
        missingMissionTags: report.actionable.missingMissionTags.length,
        duplicateMissionTags: report.actionable.duplicateMissionTags.length,
        missingRetroAchievementMissionRefs: report.actionable.missingRetroAchievementMissionRefs.length,
        placeholders: report.actionable.placeholders.length,
    },
    knownExceptions: {
        duplicateAbilityNames: report.knownExceptions.duplicateAbilityNames.length,
        duplicateMissionIdsRaw: report.knownExceptions.duplicateMissionIdsRaw.length,
        duplicateMissionNames: report.knownExceptions.duplicateMissionNames.length,
        placeholders: report.knownExceptions.placeholders.length,
    },
    report: "audit/data-audit.json",
}, null, 2));
