import fs from "node:fs";
import path from "node:path";
import ts from "typescript";

const root = process.cwd();
const report = JSON.parse(fs.readFileSync(path.join(root, "audit/guide-missions-audit.json"), "utf8"));
const approvedTypes = new Set(["mission-field-mismatch", "mission-field-missing"]);
const approvedFields = new Set(["description", "objective"]);
const fixesByFile = new Map();

for (const finding of report.findings) {
    if (!approvedTypes.has(finding.type) || !approvedFields.has(finding.field)) continue;
    const list = fixesByFile.get(finding.file) ?? [];
    list.push(finding);
    fixesByFile.set(finding.file, list);
}

function keyName(node, sourceFile) {
    if (ts.isIdentifier(node) || ts.isStringLiteral(node)) return node.text;
    return node.getText(sourceFile).replace(/^["']|["']$/g, "");
}

function property(objectNode, name, sourceFile) {
    return objectNode.properties.find((item) => ts.isPropertyAssignment(item) && keyName(item.name, sourceFile) === name);
}

let fixCount = 0;
for (const [relativeFile, findings] of fixesByFile) {
    const file = path.join(root, relativeFile);
    let text = fs.readFileSync(file, "utf8");
    const sourceFile = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true);
    const missionObjects = new Map();

    function visit(node) {
        if (ts.isObjectLiteralExpression(node)) {
            const idProperty = property(node, "id", sourceFile);
            const idNode = idProperty?.initializer;
            if (idNode && ts.isStringLiteral(idNode)) missionObjects.set(idNode.text, node);
        }
        ts.forEachChild(node, visit);
    }
    visit(sourceFile);

    const edits = [];
    for (const finding of findings) {
        const mission = missionObjects.get(finding.id);
        if (!mission) throw new Error(`Mission ${finding.id} not found in ${relativeFile}`);
        const existing = property(mission, finding.field, sourceFile);
        const replacement = JSON.stringify(finding.guideValue);
        if (existing) {
            edits.push({ start: existing.initializer.getStart(sourceFile), end: existing.initializer.getEnd(), text: replacement });
        } else {
            const nameProperty = property(mission, "name", sourceFile);
            if (!nameProperty) throw new Error(`Name property missing for ${finding.id}`);
            edits.push({ start: nameProperty.getEnd(), end: nameProperty.getEnd(), text: `,\n        ${finding.field}: ${replacement}` });
        }
        fixCount += 1;
    }

    for (const edit of edits.sort((a, b) => b.start - a.start)) {
        text = text.slice(0, edit.start) + edit.text + text.slice(edit.end);
    }
    fs.writeFileSync(file, text);
}

console.log(JSON.stringify({ fixedMissionFields: fixCount }, null, 2));
