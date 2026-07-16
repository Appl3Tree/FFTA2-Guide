import fs from "node:fs";
import path from "node:path";
import ts from "typescript";

const root = process.cwd();
const devGuide = fs.readFileSync(
    path.join(root, "audit/source-snapshots/gamefaqs-dev-53627-browser-fullbody.txt"),
    "utf8",
).replace(/\r\n/g, "\n");
const sourceCorpus = fs.readdirSync(path.join(root, "audit/source-snapshots"))
    .filter((name) => name.endsWith("fullbody.txt"))
    .map((name) => fs.readFileSync(path.join(root, "audit/source-snapshots", name), "utf8"))
    .join("\n")
    .replace(/\r\n/g, "\n");
const warfreakGuide = fs.readFileSync(
    path.join(root, "audit/source-snapshots/gamefaqs-warfreak-53370-fullbody.txt"),
    "utf8",
).replace(/\r\n/g, "\n");

const findings = [];

function normalize(value) {
    return String(value ?? "")
        .toLowerCase()
        .replace(/[’‘]/g, "'")
        .replace(/armour/g, "armor")
        .replace(/magical/g, "magickal")
        .replace(/[^a-z0-9]+/g, " ")
        .trim()
        .replace(/\s+/g, " ");
}

const normalizedSourceCorpus = normalize(sourceCorpus);

function tokenSimilarity(left, right) {
    const ignored = new Set(["a", "an", "and", "as", "at", "by", "for", "from", "in", "is", "it", "of", "on", "or", "that", "the", "their", "this", "to", "with"]);
    const tokens = (value) => new Set(normalize(value).split(" ").filter((token) => token.length > 2 && !ignored.has(token)));
    const leftTokens = tokens(left);
    const rightTokens = tokens(right);
    if (leftTokens.size === 0) return 1;
    return [...leftTokens].filter((token) => rightTokens.has(token)).length / leftTokens.size;
}

function readSource(file) {
    return ts.createSourceFile(file, fs.readFileSync(file, "utf8"), ts.ScriptTarget.Latest, true);
}

function visit(node, cb) {
    cb(node);
    ts.forEachChild(node, (child) => visit(child, cb));
}

function keyName(node, sourceFile) {
    if (!node) return undefined;
    if (ts.isIdentifier(node) || ts.isStringLiteral(node) || ts.isNumericLiteral(node)) return node.text;
    return node.getText(sourceFile).replace(/^["']|["']$/g, "");
}

function propertyNode(objectNode, name, sourceFile) {
    return objectNode.properties.find((property) => (
        ts.isPropertyAssignment(property) && keyName(property.name, sourceFile) === name
    ))?.initializer;
}

function scalar(node) {
    if (!node) return undefined;
    if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return node.text;
    if (ts.isNumericLiteral(node)) return Number(node.text);
    if (node.kind === ts.SyntaxKind.NullKeyword) return null;
    return undefined;
}

function stringArray(node) {
    if (!node || !ts.isArrayLiteralExpression(node)) return [];
    return node.elements.map(scalar).filter((value) => typeof value === "string");
}

function findInitializer(file, variableName) {
    const sourceFile = readSource(file);
    let initializer;
    visit(sourceFile, (node) => {
        if (ts.isVariableDeclaration(node) && node.name.getText(sourceFile) === variableName) {
            initializer = node.initializer;
        }
    });
    return { sourceFile, initializer };
}

function objectRows(file, variableName) {
    const { sourceFile, initializer } = findInitializer(file, variableName);
    if (!initializer || !ts.isObjectLiteralExpression(initializer)) return [];
    return initializer.properties
        .filter(ts.isPropertyAssignment)
        .filter((entry) => ts.isObjectLiteralExpression(entry.initializer))
        .map((entry) => ({
            key: keyName(entry.name, sourceFile),
            node: entry.initializer,
            sourceFile,
            file: path.relative(root, file),
            line: sourceFile.getLineAndCharacterOfPosition(entry.getStart(sourceFile)).line + 1,
        }));
}

function arrayRows(file, variableName) {
    const { sourceFile, initializer } = findInitializer(file, variableName);
    if (!initializer || !ts.isArrayLiteralExpression(initializer)) return [];
    return initializer.elements
        .filter(ts.isObjectLiteralExpression)
        .map((node) => ({
            node,
            sourceFile,
            file: path.relative(root, file),
            line: sourceFile.getLineAndCharacterOfPosition(node.getStart(sourceFile)).line + 1,
        }));
}

function parseDevEquipment() {
    const start = devGuide.indexOf("-=  12. Head Gear -=");
    const end = devGuide.indexOf("-=  17. Items -=", start);
    const lines = devGuide.slice(start, end).split("\n");
    const items = new Map();
    let section = "";

    for (let index = 0; index < lines.length; index += 1) {
        if (/^=+$/.test(lines[index]) && lines[index + 1] && /^=+$/.test(lines[index + 2] ?? "")) {
            section = lines[index + 1].trim();
            index += 2;
            continue;
        }
        const rawName = lines[index];
        if (!rawName || /^\s/.test(rawName) || /^[-=*]+$/.test(rawName)) continue;
        if (!/^\s{4}(Effects|Added Effects|Abilities|Price):/.test(lines[index + 1] ?? "")) continue;

        const name = rawName.replace(/\*$/, "").trim();
        const blockLines = [];
        let cursor = index + 1;
        while (cursor < lines.length) {
            const line = lines[cursor];
            if (!line.trim()) {
                if (!/^\s/.test(lines[cursor + 1] ?? "") && lines[cursor + 1]?.trim()) break;
            }
            if (/^=+$/.test(line)) break;
            blockLines.push(line);
            cursor += 1;
        }
        const block = blockLines.join("\n");
        const fields = new Map();
        let activeField;
        for (const line of blockLines) {
            const fieldMatch = line.match(/^\s{4}(Effects|Added Effects|Abilities|Price):\s*(.*)$/);
            if (fieldMatch) {
                activeField = fieldMatch[1];
                fields.set(activeField, fieldMatch[2].trim());
            } else if (activeField && /^\s+\S/.test(line)) {
                fields.set(activeField, `${fields.get(activeField)} ${line.trim()}`.trim());
            }
        }
        const effects = {};
        const effectsText = fields.get("Effects") ?? "";
        for (const match of effectsText.matchAll(/(Attack|Defense|Magick|Resistance|Evasion|Speed|Move|Jump) \+(-?\d+)/g)) {
            if (effects[match[1]] === undefined) effects[match[1]] = Number(match[2]);
        }
        if (/All Stats \(except Move and Jump\) \+5/i.test(effectsText)) {
            for (const stat of ["Attack", "Defense", "Magick", "Resistance", "Evasion", "Speed"]) effects[stat] = 5;
        }
        const priceText = fields.get("Price") ?? "";
        const priceMatch = priceText.match(/(\d+) Gil/);
        const added = fields.get("Added Effects") ?? "";
        const abilityText = fields.get("Abilities") ?? "";
        const abilities = [];
        for (const abilityLine of abilityText.split(/(?<=\S)\s+(?=[A-Za-z0-9?.'↑^ -]+\s+-\s+\d+ AP\s+-\s+)/)) {
            const match = abilityLine.trim().match(/^(.+?)\s+-\s+(\d+) AP\s+-\s+(.+)$/);
            if (match) abilities.push({ name: match[1].trim(), ap: Number(match[2]), jobs: match[3].split("/").map((job) => job.trim()) });
        }
        items.set(normalize(name), {
            name,
            section,
            effects,
            price: priceMatch ? Number(priceMatch[1]) : undefined,
            added,
            abilityText,
            abilities,
        });
        index = cursor - 1;
    }
    return items;
}

function parseDevBazaar() {
    const start = devGuide.indexOf("-=  19. Bazaar Formulas -=");
    const end = devGuide.indexOf("-=  20. Auction House -=", start);
    const lines = devGuide.slice(start, end).split("\n");
    const rows = new Map();
    let section = "";
    for (let index = 0; index < lines.length; index += 1) {
        if (/^=+$/.test(lines[index]) && lines[index + 1] && /^=+$/.test(lines[index + 2] ?? "")) {
            section = lines[index + 1].trim();
            index += 2;
            continue;
        }
        const match = lines[index].match(/^([A-E])\s{2,}(.+?)\s{2,}(.+)$/);
        if (!match || !section) continue;
        const [, grade, item] = match;
        let formula = match[3].trim();
        let cursor = index + 1;
        while (formula.endsWith("+") && /^\s{10,}\S/.test(lines[cursor] ?? "")) {
            formula += ` ${lines[cursor].trim()}`;
            cursor += 1;
        }
        rows.set(normalize(item), {
            section,
            rank: `Rank ${grade}`,
            result: item.trim(),
            loot: formula.split(/\s+\+\s+/).map((value) => value.trim()),
        });
        index = cursor - 1;
    }
    return rows;
}

function parseWarfreakEquipmentDescriptions() {
    const headings = [...warfreakGuide.matchAll(/^\*+\n\*\*(.+?)\*\*\n\*+$/gm)];
    const descriptions = new Map();
    for (let index = 0; index < headings.length; index += 1) {
        const block = warfreakGuide.slice(headings[index].index, headings[index + 1]?.index ?? warfreakGuide.length);
        const description = block.match(/\n\n"([\s\S]*?)"\n\n\s*-{10,}/)?.[1]
            ?.replace(/\n\s*/g, " ")
            .replace(/\s+/g, " ")
            .trim();
        if (description) descriptions.set(normalize(headings[index][1]), description);
    }
    return descriptions;
}

function collectAbilities() {
    const file = path.join(root, "src/data/abilities/abilities.ts");
    const rows = objectRows(file, "ABILITIES");
    return new Map(rows.map((row) => {
        const name = scalar(propertyNode(row.node, "name", row.sourceFile));
        return [row.key, {
            ...row,
            name,
            ap: scalar(propertyNode(row.node, "ap", row.sourceFile)),
            job: scalar(propertyNode(row.node, "job", row.sourceFile)),
            description: stringArray(propertyNode(row.node, "description", row.sourceFile)),
        }];
    }));
}

function collectEquipment() {
    const files = [
        ["equipment.weapons.ts", "WEAPON_EQUIPMENT"],
        ["equipment.helmets.ts", "HELMET_EQUIPMENT"],
        ["equipment.armors.ts", "ARMOR_EQUIPMENT"],
        ["equipment.shields.ts", "SHIELD_EQUIPMENT"],
        ["equipment.accessories.ts", "ACCESSORY_EQUIPMENT"],
    ];
    return files.flatMap(([name, variable]) => objectRows(path.join(root, "src/data/equipment", name), variable).map((row) => {
        const value = (field) => scalar(propertyNode(row.node, field, row.sourceFile));
        const list = (field) => stringArray(propertyNode(row.node, field, row.sourceFile));
        const teachesNode = propertyNode(row.node, "teaches", row.sourceFile);
        const teaches = [];
        if (teachesNode && ts.isObjectLiteralExpression(teachesNode)) {
            for (const property of teachesNode.properties) {
                if (!ts.isPropertyAssignment(property)) continue;
                for (const abilityId of stringArray(property.initializer)) {
                    teaches.push({ job: keyName(property.name, row.sourceFile), abilityId });
                }
            }
        }
        return {
            ...row,
            id: value("id"), name: value("name"), price: value("price"), description: value("description"),
            atk: value("atk"), def: value("def"), mag: value("mag"), rst: value("rst"), eva: value("eva"), spd: value("spd"),
            move: value("moveBonus") ?? value("move"), jump: value("jumpBonus") ?? value("jump"), element: list("element"), immunity: list("immunity"),
            half: list("half-damage"), absorb: list("absorb"), weak: list("weak"), status: list("status"), teaches,
        };
    }));
}

const abilities = collectAbilities();
const appEquipment = collectEquipment();
const guideEquipment = parseDevEquipment();
const guideEquipmentDescriptions = parseWarfreakEquipmentDescriptions();

const statMap = { atk: "Attack", def: "Defense", mag: "Magick", rst: "Resistance", eva: "Evasion", spd: "Speed", move: "Move", jump: "Jump" };
const equipmentNameAliases = new Map([
    [normalize("Kiku-ichimonji"), normalize("Kiku-ichimongi")],
]);
const abilityNameAliases = new Map([
    [normalize("Archer's Bane"), normalize("Archer's Band")],
    [normalize("Lv. ? Shadow Flare"), normalize("Lv. ? Shadowflare")],
    [normalize("Sanctify"), normalize("Sanctity")],
    [normalize("Viola"), normalize("Voila")],
    [normalize("Shadow Shade Tome"), normalize("Shadow Bolt Tome")],
    [normalize("Magick Counter"), normalize("Magick Country")],
]);
for (const item of appEquipment) {
    const itemKey = equipmentNameAliases.get(normalize(item.name)) ?? normalize(item.name);
    const guideItem = guideEquipment.get(itemKey);
    if (!guideItem) {
        if (!normalizedSourceCorpus.includes(normalize(item.name))) {
            findings.push({ type: "equipment-missing-from-guide", file: item.file, line: item.line, id: item.id, name: item.name });
        }
        continue;
    }
    for (const [appField, guideField] of Object.entries(statMap)) {
        const appValue = item[appField] ?? 0;
        const guideValue = guideItem.effects[guideField] ?? 0;
        if (appValue !== guideValue) findings.push({ type: "equipment-stat-mismatch", file: item.file, line: item.line, id: item.id, name: item.name, field: appField, appValue, guideValue });
    }
    if (guideItem.price !== undefined && item.price !== guideItem.price) {
        findings.push({ type: "equipment-price-mismatch", file: item.file, line: item.line, id: item.id, name: item.name, appValue: item.price, guideValue: guideItem.price });
    }
    for (const taught of item.teaches) {
        const ability = abilities.get(taught.abilityId);
        if (!ability) continue;
        const sourceAbility = abilityNameAliases.get(normalize(ability.name)) ?? normalize(ability.name);
        const sourceText = normalize(guideItem.abilityText);
        const match = sourceText.includes(sourceAbility) && sourceText.includes(normalize(taught.job));
        if (!match && ![
            "cachusha:critical-evasion↑:Geomancer",
            "cachusha:critical-evasion↑:Spellblade",
        ].includes(`${item.id}:${taught.abilityId}:${taught.job}`)) {
            findings.push({ type: "equipment-taught-ability-mismatch", file: item.file, line: item.line, id: item.id, name: item.name, job: taught.job, abilityId: taught.abilityId, abilityName: ability.name, guideAbilityText: guideItem.abilityText });
        }
    }
    const guideDescription = guideEquipmentDescriptions.get(normalize(item.name));
    if (item.description && guideDescription && !(
        normalize(item.description) === normalize(guideDescription) ||
        normalize(guideDescription).includes(normalize(item.description)) ||
        tokenSimilarity(item.description, guideDescription) >= 0.72
    )) {
        findings.push({ type: "equipment-description-mismatch", file: item.file, line: item.line, id: item.id, name: item.name, appValue: item.description, guideValue: guideDescription });
    } else if (item.description && !guideDescription && !normalizedSourceCorpus.includes(normalize(item.description)) && tokenSimilarity(item.description, sourceCorpus) < 0.78) {
        findings.push({ type: "equipment-description-not-found-in-guides", file: item.file, line: item.line, id: item.id, name: item.name, appValue: item.description });
    }
}

function parseDevJobs() {
    const start = devGuide.indexOf("-=  10. Jobs  -=");
    const end = devGuide.indexOf("-=  11. Monsters  -=", start);
    const section = devGuide.slice(start, end);
    const headingMatches = [...section.matchAll(/^=+\n([^\n=]+)\n=+$/gm)];
    const jobs = new Map();
    for (let index = 0; index < headingMatches.length; index += 1) {
        const match = headingMatches[index];
        const name = match[1].trim();
        if (!section.slice(match.index, match.index + 300).includes("Races:")) continue;
        const block = section.slice(match.index, headingMatches[index + 1]?.index ?? section.length);
        const races = (block.match(/^Races:\s*(.+)$/m)?.[1] ?? "")
            .replace(/\s*\(.+\)$/, "")
            .split(/,\s*/)
            .map((race) => race.trim())
            .filter(Boolean);
        const prerequisites = block.match(/^Prerequisites:\s*([\s\S]*?)(?=\n\nAbilities)/m)?.[1].replace(/\s+/g, " ").trim();
        const abilityRows = [];
        for (const line of block.split("\n")) {
            const ability = line.match(/^(.+?)\s+([ARP])\s+(\d+|-)\s+(\S+)\s+(\d+|-)\s+(.+)$/);
            if (!ability) continue;
            abilityRows.push({ name: ability[1].trim(), type: ability[2], ap: ability[5] === "-" ? undefined : Number(ability[5]), item: ability[6].trim() });
        }
        jobs.set(normalize(name), { name, races, prerequisites, abilities: abilityRows, block });
    }
    return jobs;
}

function collectRaceJobs() {
    const file = path.join(root, "src/data/races/raceJobs.ts");
    const rows = arrayRows(file, "RACE_JOBS");
    const result = [];
    for (const row of rows) {
        const race = scalar(propertyNode(row.node, "race", row.sourceFile));
        const jobsNode = propertyNode(row.node, "jobs", row.sourceFile);
        if (!jobsNode || !ts.isArrayLiteralExpression(jobsNode)) continue;
        for (const jobNode of jobsNode.elements) {
            if (!ts.isObjectLiteralExpression(jobNode)) continue;
            result.push({
                file: row.file,
                line: row.sourceFile.getLineAndCharacterOfPosition(jobNode.getStart(row.sourceFile)).line + 1,
                race,
                name: scalar(propertyNode(jobNode, "name", row.sourceFile)),
                summary: scalar(propertyNode(jobNode, "summary", row.sourceFile)),
            });
        }
    }
    return result;
}

function parseDevBestiary() {
    const start = devGuide.indexOf("-=  11. Monsters  -=");
    const end = devGuide.indexOf("-=  12. Head Gear -=", start);
    const section = devGuide.slice(start, end);
    const headings = [...section.matchAll(/^([^\n=*-][^\n]*)\n-+$/gm)];
    const monsters = new Map();
    for (let index = 0; index < headings.length; index += 1) {
        const name = headings[index][1].trim();
        if (["Name                  Use", "Name"].includes(name)) continue;
        const block = section.slice(headings[index].index, headings[index + 1]?.index ?? section.length);
        const affinity = (field) => (block.match(new RegExp(`^${field === "Half" ? "Half(?: Damage)?" : field}[:,]\\s*(.+)$`, "m"))?.[1] ?? "")
            .split(/,\s*/).map((value) => value.trim()).filter(Boolean);
        if (!/^(Absorb|Immune|Half|Weak):/m.test(block) && !/^Name\s+Use/m.test(block)) continue;
        monsters.set(normalize(name), { name, absorb: affinity("Absorb"), immune: affinity("Immune"), half: affinity("Half"), weak: affinity("Weak"), block });
    }
    return monsters;
}

function collectBestiary() {
    const file = path.join(root, "src/data/bestiary/bestiary.ts");
    return objectRows(file, "ENEMIES").map((row) => ({
        ...row,
        id: scalar(propertyNode(row.node, "id", row.sourceFile)),
        job: scalar(propertyNode(row.node, "job", row.sourceFile)),
        description: scalar(propertyNode(row.node, "description", row.sourceFile)),
        absorb: stringArray(propertyNode(row.node, "absorb", row.sourceFile)),
        immune: stringArray(propertyNode(row.node, "immune", row.sourceFile)),
        half: stringArray(propertyNode(row.node, "half", row.sourceFile)),
        weak: stringArray(propertyNode(row.node, "weak", row.sourceFile)),
    }));
}

function parseDevClanTrials() {
    const start = devGuide.indexOf("-=  8. Clan Trials  -=");
    const end = devGuide.indexOf("-=  9. Brightmoon Tor -=", start);
    const section = devGuide.slice(start, end);
    const headings = [...section.matchAll(/^=+\n([^\n=]+)\n=+$/gm)];
    const trials = new Map();
    for (let index = 0; index < headings.length; index += 1) {
        const name = headings[index][1].trim();
        const block = section.slice(headings[index].index, headings[index + 1]?.index ?? section.length);
        if (!/^Forbidden:/m.test(block)) continue;
        trials.set(normalize(name), {
            name,
            block,
            sourceText: normalize(block),
            rewards: parseClanTrialTable(block, "Clan Privilege"),
            objectives: parseClanTrialTable(block, "Rounds"),
        });
    }
    return trials;
}

function parseClanTrialTable(block, requiredHeader) {
    const lines = block.split("\n");
    const headerIndex = lines.findIndex((line) => line.startsWith("Title") && line.includes(requiredHeader));
    if (headerIndex < 0) return [];

    const header = lines[headerIndex];
    const columns = [...header.matchAll(/\S(?:.*?\S)?(?=\s{2,}|$)/g)].map((match) => ({
        name: match[0].trim(),
        start: match.index,
    }));
    const rows = [];
    let current;

    for (let index = headerIndex + 2; index < lines.length; index += 1) {
        const line = lines[index];
        if (!line.trim()) break;
        const values = columns.map((column, columnIndex) =>
            line.slice(column.start, columns[columnIndex + 1]?.start).trim(),
        );
        const titlePart = values[0];
        const startsNewRow = titlePart && !/^\s/.test(line);
        if (startsNewRow) {
            current = { title: titlePart };
            for (let columnIndex = 1; columnIndex < columns.length; columnIndex += 1) {
                current[columns[columnIndex].name] = values[columnIndex];
            }
            rows.push(current);
            continue;
        }
        if (!current) continue;
        if (titlePart) current.title = `${current.title} ${titlePart}`;
        for (let columnIndex = 1; columnIndex < columns.length; columnIndex += 1) {
            if (!values[columnIndex]) continue;
            const key = columns[columnIndex].name;
            current[key] = `${current[key] ?? ""} ${values[columnIndex]}`.trim();
        }
    }

    return rows;
}

function talentMap(value) {
    return new Map([...String(value).matchAll(/(Adaptability|Aptitude|Negotiation|Teamwork|All)\s*([+-]\d+)/gi)]
        .map((match) => [normalize(match[1]), Number(match[2])]));
}

function normalizedPrivilege(value) {
    return normalize(String(value))
        .replace(/\bn a\b/g, "none")
        .replace(/\bap\b/g, "bonus ap")
        .replace(/\bexp\b/g, "bonus exp")
        .replace(/\^/g, "")
        .replace(/\s+/g, " ")
        .trim();
}

function canonicalTrialName(value) {
    return normalize(value)
        .replace(/adaptibility/g, "adaptability")
        .replace(/ 1$/, " i")
        .replace(/ 2$/, " ii");
}

function parseWarfreakClanTrials() {
    const headings = [...warfreakGuide.matchAll(/^\*Clan Trial - (.+)\*$/gm)];
    const trials = new Map();
    for (let index = 0; index < headings.length; index += 1) {
        const name = headings[index][1].trim();
        trials.set(canonicalTrialName(name), warfreakGuide.slice(headings[index].index, headings[index + 1]?.index ?? warfreakGuide.length));
    }
    return trials;
}

function collectClanTrials() {
    const file = path.join(root, "src/data/meta/clanTrials.ts");
    return arrayRows(file, "CLAN_TRIAL_BASES").map((row) => {
        const value = (field) => scalar(propertyNode(row.node, field, row.sourceFile));
        const strings = (field) => stringArray(propertyNode(row.node, field, row.sourceFile));
        const titlesNode = propertyNode(row.node, "titles", row.sourceFile);
        const titles = titlesNode && ts.isArrayLiteralExpression(titlesNode)
            ? titlesNode.elements.filter(ts.isObjectLiteralExpression).map((titleNode) => ({
                title: scalar(propertyNode(titleNode, "title", row.sourceFile)),
                clanRank: scalar(propertyNode(titleNode, "clanRank", row.sourceFile)),
                talents: scalar(propertyNode(titleNode, "talents", row.sourceFile)),
                privilege: scalar(propertyNode(titleNode, "privilege", row.sourceFile)),
                discount: scalar(propertyNode(titleNode, "discount", row.sourceFile)),
                objective: scalar(propertyNode(titleNode, "objective", row.sourceFile)),
            }))
            : [];
        return {
            ...row,
            id: value("id"), name: value("name"), law: value("law"), rank: value("rank"), location: value("location"),
            days: value("days"), price: value("price"), requiredTalents: value("requiredTalents"), challenge: value("challenge"),
            privilegePathNote: value("privilegePathNote"), titles, notes: strings("notes"), completionTips: strings("completionTips"),
        };
    });
}

function sourceSupport(value, sourceText) {
    const ignored = new Set(["a", "all", "and", "are", "as", "at", "be", "before", "bring", "by", "can", "do", "for", "from", "if", "in", "is", "it", "of", "on", "or", "so", "than", "that", "the", "their", "them", "then", "this", "to", "use", "with", "you", "your"]);
    const stem = (token) => token.replace(/ies$/, "y").replace(/ing$/, "").replace(/ed$/, "").replace(/es$/, "").replace(/s$/, "");
    const sourceTokens = new Set(normalize(sourceText).split(" ").map(stem));
    const tokens = normalize(value).split(" ").filter((token) => token.length >= 3 && !ignored.has(token));
    if (!tokens.length) return { ratio: 1, missing: [] };
    const missing = tokens.filter((token) => !sourceTokens.has(stem(token)));
    return { ratio: (tokens.length - missing.length) / tokens.length, missing };
}

const guideJobs = parseDevJobs();
const appRaceJobs = collectRaceJobs();
const specialJobAliases = new Map([[normalize("Keeper"), normalize("Keeper")]]);
for (const job of appRaceJobs) {
    const guideJob = guideJobs.get(normalize(job.name));
    if (!guideJob) {
        if (!normalizedSourceCorpus.includes(normalize(job.name))) findings.push({ type: "job-missing-from-guides", ...job });
        continue;
    }
    if (job.race !== "Special" && !guideJob.races.some((race) => normalize(race) === normalize(job.race))) {
        findings.push({ type: "job-race-mismatch", ...job, guideRaces: guideJob.races });
    }
    if (job.summary && !normalizedSourceCorpus.includes(normalize(job.summary))) {
        if (tokenSimilarity(job.summary, sourceCorpus) < 0.8) findings.push({ type: "job-summary-unsupported-by-guides", ...job });
    }
}

const guideBestiary = parseDevBestiary();
const appBestiary = collectBestiary();
const allElements = ["dark", "earth", "fire", "holy", "ice", "lightning", "water", "wind"];
const affinityNormalize = (values) => values.flatMap((value) => {
    const normalized = normalize(value).replace(/^air$/, "wind");
    if (normalized === "all elements") return allElements;
    if (normalized === "all elements except holy and dark") return allElements.filter((element) => !["holy", "dark"].includes(element));
    return normalized;
}).sort().join("|");
for (const enemy of appBestiary) {
    const guideEnemy = guideBestiary.get(normalize(enemy.job));
    if (!guideEnemy) {
        if (!normalizedSourceCorpus.includes(normalize(enemy.job))) findings.push({ type: "bestiary-entry-missing-from-guide", file: enemy.file, line: enemy.line, id: enemy.id, job: enemy.job });
        continue;
    }
    for (const field of ["absorb", "immune", "half", "weak"]) {
        if (affinityNormalize(enemy[field]) !== affinityNormalize(guideEnemy[field])) findings.push({ type: "bestiary-affinity-mismatch", file: enemy.file, line: enemy.line, id: enemy.id, job: enemy.job, field, appValue: enemy[field], guideValue: guideEnemy[field] });
    }
}

const guideAbilityNames = new Set();
for (const job of guideJobs.values()) for (const ability of job.abilities) guideAbilityNames.add(normalize(ability.name));
for (const enemy of guideBestiary.values()) {
    for (const line of enemy.block.split("\n")) {
        const match = line.match(/^(.+?)\s{2,}[ARP]\s{2,}.+$/);
        if (match) guideAbilityNames.add(normalize(match[1]));
    }
}
for (const ability of abilities.values()) {
    const name = abilityNameAliases.get(normalize(ability.name)) ?? normalize(ability.name);
    if (!guideAbilityNames.has(name) && !normalizedSourceCorpus.includes(name)) findings.push({ type: "ability-missing-from-guides", file: ability.file, line: ability.line, id: ability.key, name: ability.name });
}

const guideClanTrials = parseDevClanTrials();
const warfreakClanTrials = parseWarfreakClanTrials();
const appClanTrials = collectClanTrials();
for (const trial of appClanTrials) {
    const guideTrial = guideClanTrials.get(normalize(trial.name));
    if (!guideTrial) {
        findings.push({ type: "clan-trial-missing-from-guide", file: trial.file, line: trial.line, id: trial.id, name: trial.name });
        continue;
    }
    const trialSourceText = `${guideTrial.sourceText} ${normalize(warfreakClanTrials.get(canonicalTrialName(trial.name)) ?? "")}`;
    for (const [field, value] of Object.entries({ law: trial.law, rank: trial.rank, location: trial.location, days: trial.days, price: trial.price, requiredTalents: trial.requiredTalents })) {
        if (value === undefined) continue;
        const support = sourceSupport(String(value).replace(" CP", " Clan Points"), trialSourceText);
        if (support.ratio < 0.75) findings.push({ type: "clan-trial-field-mismatch", file: trial.file, line: trial.line, id: trial.id, name: trial.name, field, appValue: value, support });
    }
    for (const title of trial.titles) {
        for (const [field, value] of Object.entries(title)) {
            if (value === undefined || value === "None") continue;
            const support = sourceSupport(String(value).replace(/None/g, "N/A"), trialSourceText);
            if (support.ratio < 0.6) findings.push({ type: "clan-trial-title-detail-unsupported", file: trial.file, line: trial.line, id: trial.id, name: trial.name, title: title.title, field, appValue: value, support });
        }
    }
    if (guideTrial.rewards.length !== trial.titles.length || guideTrial.objectives.length !== trial.titles.length) {
        findings.push({
            type: "clan-trial-guide-table-parse-mismatch",
            file: trial.file,
            line: trial.line,
            id: trial.id,
            name: trial.name,
            appTitles: trial.titles.length,
            rewardRows: guideTrial.rewards.length,
            objectiveRows: guideTrial.objectives.length,
        });
    } else {
        for (let titleIndex = 0; titleIndex < trial.titles.length; titleIndex += 1) {
            const appTitle = trial.titles[titleIndex];
            const rewardRow = guideTrial.rewards[titleIndex];
            const objectiveRow = guideTrial.objectives[titleIndex];
            if (normalize(appTitle.title) !== normalize(rewardRow.title) || normalize(appTitle.title) !== normalize(objectiveRow.title)) {
                findings.push({ type: "clan-trial-title-row-mismatch", file: trial.file, line: trial.line, id: trial.id, name: trial.name, appTitle: appTitle.title, rewardTitle: rewardRow.title, objectiveTitle: objectiveRow.title });
                continue;
            }

            const appTalents = talentMap(appTitle.talents);
            const guideTalents = talentMap(rewardRow.Talents);
            if (JSON.stringify([...appTalents]) !== JSON.stringify([...guideTalents])) {
                findings.push({ type: "clan-trial-title-talents-mismatch", file: trial.file, line: trial.line, id: trial.id, name: trial.name, title: appTitle.title, appValue: appTitle.talents, guideValue: rewardRow.Talents });
            }

            const appDiscount = normalize(appTitle.discount).replace("none", "n a");
            const guideDiscount = normalize(rewardRow["Quest/Item Discounts"]);
            if (appDiscount !== guideDiscount) {
                findings.push({ type: "clan-trial-title-discount-mismatch", file: trial.file, line: trial.line, id: trial.id, name: trial.name, title: appTitle.title, appValue: appTitle.discount, guideValue: rewardRow["Quest/Item Discounts"] });
            }

            const privilegeSupport = sourceSupport(normalizedPrivilege(appTitle.privilege), normalizedPrivilege(rewardRow["Clan Privilege"]));
            if (privilegeSupport.ratio < 0.6) {
                findings.push({ type: "clan-trial-title-privilege-mismatch", file: trial.file, line: trial.line, id: trial.id, name: trial.name, title: appTitle.title, appValue: appTitle.privilege, guideValue: rewardRow["Clan Privilege"], support: privilegeSupport });
            }

            const objectiveNumbers = new Set((appTitle.objective.match(/\d+/g) ?? []).map(Number));
            for (const [field, rawValue] of Object.entries(objectiveRow)) {
                if (field === "title" || rawValue === "N/A") continue;
                const number = Number(rawValue);
                if (Number.isFinite(number) && !objectiveNumbers.has(number)) {
                    findings.push({ type: "clan-trial-title-objective-mismatch", file: trial.file, line: trial.line, id: trial.id, name: trial.name, title: appTitle.title, field, appValue: appTitle.objective, guideValue: rawValue });
                }
            }
        }
    }
    for (const [field, values] of Object.entries({ challenge: [trial.challenge], privilegePathNote: [trial.privilegePathNote], notes: trial.notes, completionTips: trial.completionTips })) {
        for (const value of values.filter(Boolean)) {
            const support = sourceSupport(value, trialSourceText);
            if (support.ratio < 0.5) findings.push({ type: "clan-trial-guidance-unsupported", file: trial.file, line: trial.line, id: trial.id, name: trial.name, field, appValue: value, support });
        }
    }
}

const guideBazaar = parseDevBazaar();
const bazaarFile = path.join(root, "src/data/bazaarRecipes.ts");
for (const row of arrayRows(bazaarFile, "BAZAAR_RECIPES")) {
    const value = (field) => scalar(propertyNode(row.node, field, row.sourceFile));
    const app = { id: value("id"), section: value("section"), rank: value("rank"), result: value("result"), loot: stringArray(propertyNode(row.node, "loot", row.sourceFile)) };
    const guideRow = guideBazaar.get(normalize(app.result));
    if (!guideRow) {
        findings.push({ type: "bazaar-result-missing-from-guide", file: row.file, line: row.line, ...app });
        continue;
    }
    for (const field of ["section", "rank"]) {
        if (normalize(app[field]) !== normalize(guideRow[field])) findings.push({ type: "bazaar-field-mismatch", file: row.file, line: row.line, id: app.id, result: app.result, field, appValue: app[field], guideValue: guideRow[field] });
    }
    if (app.loot.map(normalize).sort().join("|") !== guideRow.loot.map(normalize).sort().join("|")) {
        findings.push({ type: "bazaar-loot-mismatch", file: row.file, line: row.line, id: app.id, result: app.result, appValue: app.loot, guideValue: guideRow.loot });
    }
}

const report = {
    counts: {
        appEquipment: appEquipment.length,
        guideEquipment: guideEquipment.size,
        guideEquipmentDescriptions: guideEquipmentDescriptions.size,
        appBazaar: arrayRows(bazaarFile, "BAZAAR_RECIPES").length,
        guideBazaar: guideBazaar.size,
        appRaceJobs: appRaceJobs.length,
        guideJobs: guideJobs.size,
        appBestiary: appBestiary.length,
        guideBestiary: guideBestiary.size,
        appAbilities: abilities.size,
        guideAbilityNames: guideAbilityNames.size,
        appClanTrials: appClanTrials.length,
        guideClanTrials: guideClanTrials.size,
        warfreakClanTrials: warfreakClanTrials.size,
        findings: findings.length,
    },
    byType: findings.reduce((acc, finding) => ({ ...acc, [finding.type]: (acc[finding.type] ?? 0) + 1 }), {}),
    findings,
};
fs.mkdirSync(path.join(root, "audit"), { recursive: true });
fs.writeFileSync(path.join(root, "audit/guide-reference-audit.json"), `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify({ counts: report.counts, byType: report.byType, report: "audit/guide-reference-audit.json" }, null, 2));
if (findings.length) process.exitCode = 1;
