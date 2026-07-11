import fs from "node:fs";
import path from "node:path";
import ts from "typescript";

const root = process.cwd();
const guidePath =
    process.env.FFTA2_GUIDE_SOURCE ?? "/tmp/ffta2-dev-guide-full.txt";
const reportPath =
    process.env.FFTA2_EQUIPMENT_REPORT ??
    path.join(root, "audit", "guide-equipment-audit.json");
const guide = fs.readFileSync(guidePath, "utf8");

const effectToProp = new Map([
    ["Attack", "atk"],
    ["Defense", "def"],
    ["Magick", "mag"],
    ["Resistance", "rst"],
    ["Evasion", "eva"],
    ["Speed", "spd"],
    ["Jump", "jump"],
]);

function normalizeName(value) {
    return value
        .toLowerCase()
        .replace(/[’']/g, "")
        .replace(/&/g, "and")
        .replace(/\^/g, "up")
        .replace(/↑/g, "up")
        .replace(/[^a-z0-9]+/g, "");
}

const guideAbilityAliases = new Map([
    [normalizeName("Archer's Band"), normalizeName("Archer's Bane")],
    [normalizeName("Magick Country"), normalizeName("Magick Counter")],
    [normalizeName("Potioni Shell"), normalizeName("Potion Shell")],
    [normalizeName("Sanctity"), normalizeName("Sanctify")],
    [normalizeName("Shadow Bolt Tome"), normalizeName("Shadow Shade Tome")],
    [normalizeName("Voila"), normalizeName("Viola")],
]);

const guideCrossSectionTeaches = new Map([
    [
        normalizeName("Cachusha"),
        [
            { job: "Geomancer", abilityName: "Critical: Evasion^" },
            { job: "Spellblade", abilityName: "Critical: Evasion^" },
        ],
    ],
]);

function normalizeAbilityName(value) {
    const normalized = normalizeName(value);
    return guideAbilityAliases.get(normalized) ?? normalized;
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

function propertyAssignments(objectNode, sourceFile) {
    return objectNode.properties.filter(ts.isPropertyAssignment).map((prop) => [
        prop.name.getText(sourceFile).replace(/^["']|["']$/g, ""),
        prop.initializer,
    ]);
}

function stringValue(node) {
    return node && ts.isStringLiteral(node) ? node.text : undefined;
}

function numericValue(node) {
    if (!node) return undefined;
    if (ts.isNumericLiteral(node)) return Number(node.text);
    if (
        ts.isPrefixUnaryExpression(node) &&
        node.operator === ts.SyntaxKind.MinusToken &&
        ts.isNumericLiteral(node.operand)
    ) {
        return -Number(node.operand.text);
    }
    return undefined;
}

function arrayStrings(node) {
    if (!node || !ts.isArrayLiteralExpression(node)) return [];
    return node.elements.map(stringValue).filter(Boolean);
}

function collectAbilities() {
    const file = path.join(root, "src", "data", "abilities", "abilities.ts");
    const sourceFile = readSource(file);
    const byId = new Map();

    function visit(node) {
        if (
            ts.isVariableDeclaration(node) &&
            node.name.getText(sourceFile) === "ABILITIES" &&
            ts.isObjectLiteralExpression(node.initializer)
        ) {
            for (const [, ability] of propertyAssignments(
                node.initializer,
                sourceFile,
            )) {
                if (!ts.isObjectLiteralExpression(ability)) continue;
                const id = stringValue(property(ability, "id", sourceFile));
                const name = stringValue(property(ability, "name", sourceFile));
                if (id && name) byId.set(id, name);
            }
        }
        ts.forEachChild(node, visit);
    }

    visit(sourceFile);
    return byId;
}

function collectAppEquipment(abilityNamesById) {
    const equipmentFiles = [
        "equipment.weapons.ts",
        "equipment.shields.ts",
        "equipment.helmets.ts",
        "equipment.armors.ts",
        "equipment.accessories.ts",
    ];
    const items = [];

    for (const fileName of equipmentFiles) {
        const file = path.join(root, "src", "data", "equipment", fileName);
        const sourceFile = readSource(file);

        function visit(node) {
            if (
                ts.isVariableDeclaration(node) &&
                ts.isObjectLiteralExpression(node.initializer)
            ) {
                for (const [, item] of propertyAssignments(
                    node.initializer,
                    sourceFile,
                )) {
                    if (!ts.isObjectLiteralExpression(item)) continue;
                    const name = stringValue(property(item, "name", sourceFile));
                    if (!name) continue;

                    const teachesNode = property(item, "teaches", sourceFile);
                    const teaches = [];
                    if (teachesNode && ts.isObjectLiteralExpression(teachesNode)) {
                        for (const [job, abilitiesNode] of propertyAssignments(
                            teachesNode,
                            sourceFile,
                        )) {
                            for (const abilityId of arrayStrings(abilitiesNode)) {
                                teaches.push({
                                    job,
                                    abilityId,
                                    abilityName:
                                        abilityNamesById.get(abilityId) ?? abilityId,
                                });
                            }
                        }
                    }

                    const itemReport = {
                        file: path.relative(root, file),
                        name,
                        price: numericValue(property(item, "price", sourceFile)),
                        teaches,
                        stats: {},
                    };

                    for (const prop of effectToProp.values()) {
                        const value = numericValue(property(item, prop, sourceFile));
                        if (value !== undefined) itemReport.stats[prop] = value;
                    }
                    const jumpBonus = numericValue(
                        property(item, "jumpBonus", sourceFile),
                    );
                    if (jumpBonus !== undefined) itemReport.stats.jump = jumpBonus;

                    items.push(itemReport);
                }
            }
            ts.forEachChild(node, visit);
        }

        visit(sourceFile);
    }

    return items;
}

function nonEmptyNext(lines, index) {
    for (let i = index + 1; i < lines.length; i += 1) {
        if (lines[i].trim()) return lines[i];
    }
    return "";
}

function parseEffects(line) {
    const stats = {};
    const effects = line.replace(/^\s*Effects:\s*/, "");
    if (effects === "N/A") return stats;
    const allStats = effects.match(
        /^All Stats \(except Move and Jump\) ([+-]\d+)/,
    );
    if (allStats) {
        const value = Number(allStats[1]);
        return {
            atk: value,
            def: value,
            mag: value,
            rst: value,
            eva: value,
            spd: value,
        };
    }

    const effectPattern =
        /(Attack|Defense|Magick|Resistance|Evasion|Speed|Jump)\s+([+-]\d+)/g;
    for (const match of effects.matchAll(effectPattern)) {
        if (!match) continue;
        const prop = effectToProp.get(match[1].trim());
        if (prop && stats[prop] === undefined) stats[prop] = Number(match[2]);
    }

    return stats;
}

function parseAbilityLine(line) {
    const trimmed = line.replace(/^\s*(Abilities:\s*)?/, "").trim();
    if (!trimmed || trimmed === "N/A") return null;
    const match = trimmed.match(/^(.+?)\s+-\s+\d+\s+AP\s+-\s+(.+)$/);
    if (!match) return { unparsed: trimmed };
    const jobs = match[2].trim().split(/\s*\/\s*/);
    return jobs.map((job) => ({
        abilityName: match[1].trim(),
        job,
    }));
}

function parseGuideEquipment() {
    const start = guide.indexOf("-=  12. Head Gear -=");
    const end = guide.indexOf("-=  17. Items -=");
    if (start < 0 || end < start) {
        throw new Error("Unable to locate equipment sections in guide source.");
    }

    const lines = guide.slice(start, end).split(/\r?\n/);
    const items = [];

    for (let i = 0; i < lines.length; i += 1) {
        const line = lines[i];
        if (!line.trim() || /^\s/.test(line)) continue;
        if (/^[-=]+$/.test(line.trim())) continue;
        if (nonEmptyNext(lines, i).trim().startsWith("Effects:")) {
            const name = line.trim().replace(/\*+$/, "");
            const item = {
                name,
                stats: {},
                teaches: [],
                price: undefined,
                unparsedAbilities: [],
            };

            for (let j = i + 1; j < lines.length; j += 1) {
                const current = lines[j];
                if (!current.trim()) {
                    const next = nonEmptyNext(lines, j);
                    if (next && !/^\s/.test(next) && !next.trim().startsWith("Price:")) {
                        break;
                    }
                    continue;
                }

                if (!/^\s/.test(current)) break;

                const trimmed = current.trim();
                if (trimmed.startsWith("Effects:")) {
                    let effectsText = current;
                    for (let k = j + 1; k < lines.length; k += 1) {
                        const continuation = lines[k].trim();
                        if (
                            !continuation ||
                            continuation.startsWith("Added Effects:") ||
                            continuation.startsWith("Abilities:") ||
                            continuation.startsWith("Price:")
                        ) {
                            break;
                        }
                        effectsText += ` ${continuation}`;
                    }
                    item.stats = parseEffects(effectsText);
                } else if (
                    trimmed.startsWith("Abilities:") ||
                    (item._inAbilities && !trimmed.startsWith("Price:"))
                ) {
                    item._inAbilities = true;
                    const ability = parseAbilityLine(current);
                    if (ability?.unparsed) item.unparsedAbilities.push(ability.unparsed);
                    else if (Array.isArray(ability)) item.teaches.push(...ability);
                } else if (trimmed.startsWith("Price:")) {
                    item._inAbilities = false;
                    const price = trimmed.match(/^Price:\s+(\d+)\s+Gil$/);
                    if (price) item.price = Number(price[1]);
                }
            }

            delete item._inAbilities;
            if (
                item.teaches.length === 0 &&
                guideCrossSectionTeaches.has(normalizeName(item.name))
            ) {
                item.teaches = guideCrossSectionTeaches.get(normalizeName(item.name));
            }
            items.push(item);
        }
    }

    return items;
}

function teachKey(entry) {
    return `${normalizeName(entry.job)}:${normalizeAbilityName(entry.abilityName)}`;
}

const abilityNamesById = collectAbilities();
const appItems = collectAppEquipment(abilityNamesById);
const guideItems = parseGuideEquipment();
const appByName = new Map(appItems.map((item) => [normalizeName(item.name), item]));
const guideByName = new Map(guideItems.map((item) => [normalizeName(item.name), item]));

const aliases = new Map([
    [normalizeName("Kiku-ichimonji"), normalizeName("Kiku-ichimongi")],
    [normalizeName("Nagrarok"), normalizeName("Nagnarok")],
]);

function findGuideItem(appItem) {
    return guideByName.get(normalizeName(appItem.name)) ??
        guideByName.get(aliases.get(normalizeName(appItem.name)));
}

const mismatches = [];
const sourceGaps = [];

for (const appItem of appItems) {
    const guideItem = findGuideItem(appItem);
    if (!guideItem) {
        sourceGaps.push({
            type: "missing-guide-equipment-block",
            appName: appItem.name,
            file: appItem.file,
        });
        continue;
    }

    const fields = [];
    const statProps = new Set([
        ...Object.keys(appItem.stats),
        ...Object.keys(guideItem.stats),
    ]);

    for (const prop of [...statProps].sort()) {
        const appValue = appItem.stats[prop] ?? 0;
        const guideValue = guideItem.stats[prop] ?? 0;
        if (appValue !== guideValue) {
            fields.push({ field: prop, app: appValue, guide: guideValue });
        }
    }

    if (
        appItem.price !== undefined &&
        guideItem.price !== undefined &&
        appItem.price !== guideItem.price
    ) {
        fields.push({ field: "price", app: appItem.price, guide: guideItem.price });
    }

    const appTeaches = [...new Set(appItem.teaches.map(teachKey))].sort();
    const guideTeaches = [...new Set(guideItem.teaches.map(teachKey))].sort();
    if (appTeaches.join("|") !== guideTeaches.join("|")) {
        fields.push({
            field: "teaches",
            app: appItem.teaches
                .map((teach) => `${teach.job}: ${teach.abilityName}`)
                .sort(),
            guide: guideItem.teaches
                .map((teach) => `${teach.job}: ${teach.abilityName}`)
                .sort(),
        });
    }

    if (fields.length > 0) {
        mismatches.push({
            name: appItem.name,
            guideName: guideItem.name,
            file: appItem.file,
            fields,
        });
    }
}

const missingInApp = guideItems
    .filter((item) => {
        const key = normalizeName(item.name);
        return (
            !appByName.has(key) &&
            ![...aliases.entries()].some(
                ([appAlias, guideAlias]) => guideAlias === key && appByName.has(appAlias),
            )
        );
    })
    .map((item) => item.name);

const report = {
    guidePath,
    guideItems: guideItems.length,
    appItems: appItems.length,
    mismatchCount: mismatches.length,
    missingInAppCount: missingInApp.length,
    sourceGapCount: sourceGaps.length,
    guideInternalAliases: [
        {
            appName: "Kiku-ichimonji",
            guideEquipmentHeading: "Kiku-ichimongi",
            reason:
                "Guide Bazaar and ability references use Kiku-ichimonji; equipment heading appears inconsistent.",
        },
        {
            appName: "Nagrarok",
            guideEquipmentHeading: "Nagnarok",
            reason:
                "Guide mission/reward references use Nagrarok; equipment heading appears inconsistent.",
        },
        {
            appName: "Archer's Bane",
            guideEquipmentHeading: "Archer's Band",
            reason:
                "Guide ability tables and descriptions use Archer's Bane; Green Beret equipment line appears inconsistent.",
        },
        {
            appName: "Magick Counter",
            guideEquipmentHeading: "Magick Country",
            reason:
                "Guide ability tables and descriptions use Magick Counter; Samite Coat equipment line appears inconsistent.",
        },
        {
            appName: "Sanctify",
            guideEquipmentHeading: "Sanctity",
            reason:
                "Guide ability table uses Sanctify for Ogrenix; equipment line appears inconsistent.",
        },
        {
            appName: "Shadow Shade Tome",
            guideEquipmentHeading: "Shadow Bolt Tome",
            reason:
                "Guide ability table uses Shadow Shade Tome for Veil of Wiyu; equipment line appears inconsistent.",
        },
        {
            appName: "Viola",
            guideEquipmentHeading: "Voila",
            reason:
                "Guide story and ability table use Viola for Tiptaptwo; equipment line appears inconsistent.",
        },
        {
            appName: "Cachusha teaches Critical: Evasion",
            guideEquipmentHeading: "Cachusha Abilities: N/A",
            reason:
                "Guide Geomancer and Spellblade ability tables list Critical: Evasion on Cachusha, despite the equipment line saying N/A.",
        },
    ],
    mismatches,
    missingInApp,
    sourceGaps,
};

fs.mkdirSync(path.dirname(reportPath), { recursive: true });
fs.writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`);

console.log(
    JSON.stringify(
        {
            guidePath,
            reportPath,
            guideItems: report.guideItems,
            appItems: report.appItems,
            mismatchCount: report.mismatchCount,
            missingInAppCount: report.missingInAppCount,
            sourceGapCount: report.sourceGapCount,
            firstMismatches: mismatches.slice(0, 20),
            sourceGaps,
        },
        null,
        2,
    ),
);
