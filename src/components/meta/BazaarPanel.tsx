import React from "react";
import { BAZAAR_RECIPES } from "../../data/bazaarRecipes";
import { isRepeatCraftResult } from "../../data/bazaarRepeatCraft";
import {
    EQUIPMENT,
    WEAPON_RULES,
    HELMET_RULES,
    ARMOR_RULES,
    SHIELD_RULE,
    type EquipmentMeta,
} from "../../data/equipment/equipment";
import { ABILITIES, ABILITY_SETS } from "../../data/abilities/abilities";
import { bazaarScopeId } from "../../data/checklistScopes";
import { useChecklistPreferences } from "../ChecklistPreferencesContext";
import { useProgress } from "../ProgressContext";
import { Panel } from "../ui/Panel";
import { PanelProgress } from "../ui/PanelProgress";
import { RepeatCraftBadge } from "../ui/RepeatCraftBadge";

type RuleDetails = {
    jobs?: string;
    requiresPassives?: string;
    hands?: string;
    dualWield?: string;
    incompatible?: string;
    gender?: string;
};

function buildSubtypeLabel(item: EquipmentMeta): string | null {
    const cat = item.category;

    if (cat === "Weapon" && item.weaponType) {
        return `Weapon – ${item.weaponType}`;
    }

    if (cat === "Helmet" && item.helmetType) {
        return `Helmet – ${item.helmetType}`;
    }

    if (cat === "Armor" && item.armorType) {
        return `Armor – ${item.armorType}`;
    }

    if (cat === "Accessory" && item.accessoryType) {
        return `Accessory – ${item.accessoryType}`;
    }

    if (cat === "Shield") {
        return "Shield";
    }

    return null;
}

function buildRuleDetails(item: EquipmentMeta): RuleDetails | null {
    const cat = item.category;
    let rule: any | undefined;

    if (cat === "Weapon" && item.weaponType) {
        rule = WEAPON_RULES[item.weaponType];
    } else if (cat === "Helmet" && item.helmetType) {
        rule = HELMET_RULES[item.helmetType];
    } else if (cat === "Armor" && item.armorType) {
        rule = ARMOR_RULES[item.armorType];
    } else if (cat === "Shield") {
        rule = SHIELD_RULE;
    }

    if (!rule) {
        return null;
    }

    const details: RuleDetails = {};

    if (rule.allowedJobs && rule.allowedJobs.length > 0) {
        details.jobs = rule.allowedJobs.join(", ");
    } else if (rule.disallowedJobs && rule.disallowedJobs.length > 0) {
        details.jobs = `Everyone except ${rule.disallowedJobs.join(", ")}`;
    }

    if (
        cat !== "Shield" &&
        rule.requiresPassives &&
        rule.requiresPassives.length > 0
    ) {
        details.requiresPassives = rule.requiresPassives.join(", ");
    }

    if (rule.handsRequired) {
        details.hands =
            rule.handsRequired === 1 ? "1 (one-handed)" : "2 (two-handed)";
    }

    if (typeof rule.canDualWield === "boolean") {
        details.dualWield = rule.canDualWield ? "Yes" : "No";
    }

    if (rule.incompatiblePassives && rule.incompatiblePassives.length > 0) {
        details.incompatible = rule.incompatiblePassives.join(", ");
    }

    if (rule.genderRestriction === "femaleOnly") {
        details.gender = "Female only (unless a passive allows)";
    } else if (rule.genderRestriction === "maleOnly") {
        details.gender = "Male only (unless a passive allows)";
    }

    if (
        !details.jobs &&
        !details.requiresPassives &&
        !details.hands &&
        !details.dualWield &&
        !details.incompatible &&
        !details.gender
    ) {
        return null;
    }

    return details;
}

function buildStatEntries(
    item: EquipmentMeta,
): { label: string; value: string | number }[] {
    const entries: { label: string; value: string | number }[] = [];

    if ((item.atk ?? 0) > 0) {
        entries.push({ label: "ATK", value: item.atk as number });
    }
    if ((item.def ?? 0) > 0) {
        entries.push({ label: "DEF", value: item.def as number });
    }
    if ((item.mag ?? 0) > 0) {
        entries.push({ label: "MAG", value: item.mag as number });
    }
    if ((item.rst ?? 0) > 0) {
        entries.push({ label: "RST", value: item.rst as number });
    }
    if ((item.eva ?? 0) > 0) {
        entries.push({ label: "EVA", value: item.eva as number });
    }
    if ((item.spd ?? 0) > 0) {
        entries.push({ label: "SPD", value: item.spd as number });
    }
    if ((item.jump ?? 0) > 0) {
        entries.push({ label: "Jump", value: item.jump as number });
    }
    if ((item.moveBonus ?? 0) > 0) {
        entries.push({
            label: "Move bonus",
            value: `+${item.moveBonus as number}`,
        });
    }
    if ((item.jumpBonus ?? 0) > 0) {
        entries.push({
            label: "Jump bonus",
            value: `+${item.jumpBonus as number}`,
        });
    }

    if (item.rangeMin != null && item.rangeMax != null) {
        const rangeValue =
            item.rangeMin === item.rangeMax
                ? `${item.rangeMin}`
                : `${item.rangeMin}-${item.rangeMax}`;
        entries.push({ label: "Range", value: rangeValue });
    }

    return entries;
}

const EQUIPMENT_BY_NAME: Record<string, EquipmentMeta> = (() => {
    const map: Record<string, EquipmentMeta> = {};
    for (const item of Object.values(EQUIPMENT)) {
        if (item.name) {
            map[item.name.toLowerCase()] = item;
        }
    }
    return map;
})();

interface BazaarRecipeWithSearch {
    id: string;
    section: string;
    rank: string;
    result: string;
    loot: string[];
    searchBlob: string;
    equipment: EquipmentMeta | null;
    repeatCraft: boolean;
}

interface BazaarSection {
    section: string;
    recipes: BazaarRecipeWithSearch[];
}

export function BazaarRecipesPanel() {
    const { checked } = useProgress();
    const { isChecklistEnabled, isScopeEnabled } = useChecklistPreferences();
    const trackingEnabled = isChecklistEnabled("bazaar");
    const trackedRecipes = BAZAAR_RECIPES.filter((recipe) =>
        isScopeEnabled("bazaar", bazaarScopeId(recipe.result)),
    );
    const completedRecipes = trackedRecipes.filter(
        (recipe) => checked[`bazaar:${recipe.id}`],
    ).length;

    return (
        <Panel
            title="Bazaar Recipes"
            subtitle="Use loot to unlock shop stock, then buy or re-craft extra copies."
            tone="lime"
            defaultOpen
            headerAddon={
                trackingEnabled && trackedRecipes.length > 0 ? (
                    <PanelProgress
                        completed={completedRecipes}
                        label="Recipes"
                        tone="cyan"
                        total={trackedRecipes.length}
                    />
                ) : undefined
            }
        >
            <BazaarPanel />
        </Panel>
    );
}

export default function BazaarPanel() {
    const { checked, setCheck } = useProgress();
    const { isChecklistEnabled, isScopeEnabled } = useChecklistPreferences();
    const trackingEnabled = isChecklistEnabled("bazaar");
    const [query, setQuery] = React.useState("");
    const searchId = React.useId();

    const sections = React.useMemo<BazaarSection[]>(() => {
        const withSearch: BazaarRecipeWithSearch[] = BAZAAR_RECIPES.map(
            (r) => {
                const parts: string[] = [];
                parts.push(r.section);
                parts.push(r.rank);
                parts.push(r.result);
                parts.push(r.loot.join(" "));
                const repeatCraft = isRepeatCraftResult(r.result);
                if (repeatCraft) parts.push("repeat craft multi craft one stock");

                const searchBlob = parts.join(" ").toLowerCase();
                const equipment =
                    EQUIPMENT_BY_NAME[r.result.toLowerCase()] ?? null;

                return {
                    ...r,
                    searchBlob,
                    equipment,
                    repeatCraft,
                };
            },
        );

        const bySection = new Map<string, BazaarRecipeWithSearch[]>();
        for (const r of withSearch) {
            const list = bySection.get(r.section);
            if (list) {
                list.push(r);
            } else {
                bySection.set(r.section, [r]);
            }
        }

        const result: BazaarSection[] = Array.from(bySection.entries())
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([section, recipes]) => ({
                section,
                recipes: recipes.sort((a, b) => {
                    const rankCmp = a.rank.localeCompare(b.rank);
                    if (rankCmp !== 0) return rankCmp;
                    return a.result.localeCompare(b.result);
                }),
            }));

        return result;
    }, []);

    const filteredSections = React.useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return sections;

        return sections
            .map((section) => ({
                section: section.section,
                recipes: section.recipes.filter((r) =>
                    r.searchBlob.includes(q),
                ),
            }))
            .filter((section) => section.recipes.length > 0);
    }, [query, sections]);

    const [openSections, setOpenSections] = React.useState<Record<string, boolean>>(
        {},
    );

    const toggleSection = (sectionName: string) => {
        setOpenSections((prev) => {
            const current = prev[sectionName] ?? false; // default closed
            return {
                ...prev,
                [sectionName]: !current, // flip closed/open
            };
        });
    };

    return (
        <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <p className="max-w-2xl text-sm leading-relaxed text-zinc-400">
                    See which loot unlocks shop equipment. A Repeat craft label
                    means the recipe stocks one copy; submit it again after a
                    purchase to stock another.
                </p>

                <div className="flex items-center gap-2">
                    <label htmlFor={searchId} className="sr-only">
                        Search bazaar recipes
                    </label>
                    <input
                        id={searchId}
                        type="search"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search by result, loot, section, or rank…"
                        className="min-h-11 w-full rounded-md border border-zinc-700 bg-zinc-900/60 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-500 focus:border-emerald-500/70 focus:outline-none focus:ring-2 focus:ring-emerald-500/70 sm:w-80"
                    />
                </div>
            </div>

            {filteredSections.length === 0 ? (
                <p className="text-[0.8rem] text-zinc-500 dark:text-zinc-400">
                    No bazaar recipes match your search.
                </p>
            ) : (
                <div className="space-y-3">
                    {filteredSections.map((section) => {
                        const isOpen = openSections[section.section] === true;
                        const trackedSectionRecipes = section.recipes.filter(
                            (recipe) =>
                                isScopeEnabled(
                                    "bazaar",
                                    bazaarScopeId(recipe.result),
                                ),
                        );
                        const completedSectionRecipes = trackedSectionRecipes.filter(
                            (recipe) => checked[`bazaar:${recipe.id}`],
                        ).length;

                        return (
                            <section
                                key={section.section}
                                className="rounded-lg border border-zinc-800/70 bg-zinc-950/40"
                            >
                                <button
                                    type="button"
                                    onClick={() => toggleSection(section.section)}
                                    aria-expanded={isOpen}
                                    className="flex min-h-11 w-full items-center justify-between px-3 py-2.5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-lime-300 sm:px-4 sm:py-3"
                                >
                                    <div>
                                        <h3 className="text-sm font-semibold text-zinc-100">
                                            {section.section}
                                        </h3>
                                        <p className="text-[0.75rem] text-zinc-500">
                                            {section.recipes.length} recipe
                                            {section.recipes.length === 1 ? "" : "s"}
                                            {trackingEnabled &&
                                            trackedSectionRecipes.length > 0
                                                ? ` | ${completedSectionRecipes}/${trackedSectionRecipes.length} complete`
                                                : ""}
                                        </p>
                                    </div>
                                    <span className="text-[0.7rem] uppercase text-emerald-300">
                                        {isOpen ? "Hide" : "Show"}
                                    </span>
                                </button>

                                {isOpen && (
                                    <div className="border-t border-zinc-800/70 px-3 sm:px-4 py-2.5 sm:py-3 text-sm">
                                        <ul className="space-y-2.5">
                                            {section.recipes.map((recipe) => {
                                                const equip = recipe.equipment;
                                                const recipeKey = `bazaar:${recipe.id}`;
                                                const recipeTrackingEnabled =
                                                    isScopeEnabled(
                                                        "bazaar",
                                                        bazaarScopeId(recipe.result),
                                                    );
                                                const recipeComplete =
                                                    !!checked[recipeKey];
                                                const subtypeLabel =
                                                    equip && buildSubtypeLabel(equip);
                                                const ruleDetails =
                                                    equip && buildRuleDetails(equip);
                                                const statEntries =
                                                    equip && buildStatEntries(equip);
                                                const hasStats =
                                                    !!statEntries && statEntries.length > 0;
                                                const hasRules =
                                                    !!ruleDetails &&
                                                    (ruleDetails.jobs ||
                                                        ruleDetails.requiresPassives ||
                                                        ruleDetails.hands ||
                                                        ruleDetails.dualWield ||
                                                        ruleDetails.incompatible ||
                                                        ruleDetails.gender);
                                                const hasTeaches =
                                                    !!equip &&
                                                    !!equip.teaches &&
                                                    Object.keys(equip.teaches).length > 0;

                                                const ruleEntries: {
                                                    label: string;
                                                    value: string;
                                                }[] = [];

                                                if (ruleDetails?.jobs) {
                                                    ruleEntries.push({
                                                        label: "Jobs",
                                                        value: ruleDetails.jobs,
                                                    });
                                                }
                                                if (ruleDetails?.hands) {
                                                    ruleEntries.push({
                                                        label: "Hands",
                                                        value: ruleDetails.hands,
                                                    });
                                                }
                                                if (ruleDetails?.dualWield) {
                                                    ruleEntries.push({
                                                        label: "Dual-wield",
                                                        value: ruleDetails.dualWield,
                                                    });
                                                }
                                                if (ruleDetails?.requiresPassives) {
                                                    ruleEntries.push({
                                                        label: "Requires passive",
                                                        value: ruleDetails.requiresPassives,
                                                    });
                                                }
                                                if (ruleDetails?.incompatible) {
                                                    ruleEntries.push({
                                                        label: "Incompatible",
                                                        value: ruleDetails.incompatible,
                                                    });
                                                }
                                                if (ruleDetails?.gender) {
                                                    ruleEntries.push({
                                                        label: "Gender",
                                                        value: ruleDetails.gender,
                                                    });
                                                }

                                                const hasAnyModules =
                                                    equip &&
                                                    (subtypeLabel ||
                                                        equip.bazaar_category ||
                                                        typeof equip.price === "number" ||
                                                        hasStats ||
                                                        hasRules ||
                                                        hasTeaches);

                                                const modules: {
                                                    key: string;
                                                    content: JSX.Element;
                                                }[] = [];

                                                if (
                                                    equip &&
                                                    (subtypeLabel ||
                                                        equip.bazaar_category ||
                                                        typeof equip.price === "number")
                                                ) {
                                                    modules.push({
                                                        key: "basics",
                                                        content: (
                                                            <>
                                                                <h4 className="text-[0.7rem] sm:text-xs font-semibold text-zinc-400 mb-1.5">
                                                                    <u>BASICS</u>
                                                                </h4>
                                                                <dl className="space-y-1 text-[0.7rem] sm:text-xs text-zinc-200">
                                                                    {subtypeLabel && (
                                                                        <div className="flex justify-between gap-2">
                                                                            <dt className="text-zinc-400">
                                                                                Category
                                                                            </dt>
                                                                            <dd className="font-medium text-right">
                                                                                {subtypeLabel}
                                                                            </dd>
                                                                        </div>
                                                                    )}
                                                                    {equip.bazaar_category && (
                                                                        <div className="flex justify-between gap-2">
                                                                            <dt className="text-zinc-400">
                                                                                Bazaar
                                                                            </dt>
                                                                            <dd className="font-medium text-right">
                                                                                {
                                                                                    equip.bazaar_category
                                                                                }
                                                                            </dd>
                                                                        </div>
                                                                    )}
                                                                    {typeof equip.price ===
                                                                        "number" && (
                                                                        <div className="flex justify-between gap-2">
                                                                            <dt className="text-zinc-400">
                                                                                Purchase
                                                                            </dt>
                                                                            <dd className="font-medium text-right">
                                                                                {equip.price} gil
                                                                            </dd>
                                                                        </div>
                                                                    )}
                                                                </dl>
                                                            </>
                                                        ),
                                                    });
                                                }

                                                if (equip && hasStats) {
                                                    modules.push({
                                                        key: "stats",
                                                        content: (
                                                            <>
                                                                <h4 className="text-[0.7rem] sm:text-xs font-semibold text-zinc-400 mb-1.5">
                                                                    <u>STATS</u>
                                                                </h4>
                                                                <dl className="space-y-1 text-[0.7rem] sm:text-xs text-zinc-200">
                                                                    {statEntries!.map((entry) => (
                                                                        <div
                                                                            key={entry.label}
                                                                            className="flex justify-between gap-2"
                                                                        >
                                                                            <dt className="text-zinc-400">
                                                                                {entry.label}
                                                                            </dt>
                                                                            <dd className="font-medium text-right">
                                                                                {entry.value}
                                                                            </dd>
                                                                        </div>
                                                                    ))}
                                                                </dl>
                                                            </>
                                                        ),
                                                    });
                                                }

                                                if (equip && hasRules && ruleEntries.length > 0) {
                                                    const useTwoColsRules =
                                                        ruleEntries.length > 3;
                                                    const dlRulesClass = useTwoColsRules
                                                        ? "grid grid-cols-2 gap-x-4 gap-y-1"
                                                        : "space-y-1";

                                                    modules.push({
                                                        key: "rules",
                                                        content: (
                                                            <>
                                                                <h4 className="text-[0.7rem] sm:text-xs font-semibold text-zinc-400 mb-1.5">
                                                                    <u>RULES</u>
                                                                </h4>
                                                                <dl className={dlRulesClass}>
                                                                    {ruleEntries.map((entry) => (
                                                                        <div
                                                                            key={entry.label}
                                                                            className="flex justify-between gap-2 text-[0.7rem] sm:text-xs text-zinc-200"
                                                                        >
                                                                            <dt className="text-zinc-400">
                                                                                {entry.label}
                                                                            </dt>
                                                                            <dd className="font-medium text-right">
                                                                                {entry.value}
                                                                            </dd>
                                                                        </div>
                                                                    ))}
                                                                </dl>
                                                            </>
                                                        ),
                                                    });
                                                }

                                                if (equip && hasTeaches) {
                                                    modules.push({
                                                        key: "teaches",
                                                        content: (
                                                            <>
                                                                <h4 className="text-[0.7rem] sm:text-xs font-semibold text-zinc-400 mb-1.5">
                                                                    <u>TEACHES</u>
                                                                </h4>
                                                                <div className="mt-0.5 text-[0.7rem] sm:text-xs text-zinc-300">
                                                                    <ul className="list-disc list-inside space-y-0.5">
                                                                        {Object.entries(
                                                                            equip.teaches ?? {},
                                                                        ).map(([job, ids]) => {
                                                                            const display = (
                                                                                ids as string[]
                                                                            )
                                                                                .map((id) => {
                                                                                    const ab =
                                                                                        ABILITIES[
                                                                                            id
                                                                                        ];
                                                                                    if (!ab)
                                                                                        return id;
                                                                                    const set =
                                                                                        ABILITY_SETS[
                                                                                            ab.setId
                                                                                        ];
                                                                                    const setName =
                                                                                        set?.name ??
                                                                                        ab.setId;
                                                                                    return `${ab.name} (${setName})`;
                                                                                })
                                                                                .join(", ");

                                                                            return (
                                                                                <li key={job}>
                                                                                    <span className="font-semibold">
                                                                                        {job}:
                                                                                    </span>{" "}
                                                                                    {display}
                                                                                </li>
                                                                            );
                                                                        })}
                                                                    </ul>
                                                                </div>
                                                            </>
                                                        ),
                                                    });
                                                }

                                                const gridClass =
                                                    modules.length <= 1
                                                        ? "mt-2 grid grid-cols-1 gap-2.5 sm:gap-3"
                                                        : "mt-2 grid grid-cols-1 md:grid-cols-2 gap-2.5 sm:gap-3";

                                                return (
                                                    <li
                                                        key={recipe.id}
                                                        className="flex flex-col gap-1.5"
                                                    >
                                                        <div>
                                                            <div className="flex items-start justify-between gap-3">
                                                                <div className="flex min-w-0 flex-wrap items-center gap-1.5">
                                                                    <span className="font-semibold text-zinc-50">
                                                                        {recipe.result}
                                                                    </span>
                                                                    <span className="inline-flex items-center rounded-full bg-emerald-100/10 border border-emerald-500/70 px-1.5 py-px text-[0.65rem] font-semibold uppercase text-emerald-300">
                                                                        {recipe.rank}
                                                                    </span>
                                                                    {recipe.repeatCraft ? (
                                                                        <RepeatCraftBadge />
                                                                    ) : null}
                                                                </div>
                                                                {recipeTrackingEnabled ? (
                                                                    <label className="flex min-h-11 shrink-0 cursor-pointer items-center gap-2 rounded-md px-2 text-xs font-semibold text-zinc-300 hover:bg-zinc-900/70 focus-within:ring-2 focus-within:ring-lime-300">
                                                                        <input
                                                                            type="checkbox"
                                                                            aria-label={`Mark ${recipe.result} crafted`}
                                                                            checked={recipeComplete}
                                                                            onChange={(event) =>
                                                                                setCheck(
                                                                                    recipeKey,
                                                                                    event.target.checked,
                                                                                )
                                                                            }
                                                                            className="h-5 w-5 rounded border-zinc-500 text-lime-500 focus:ring-lime-400"
                                                                        />
                                                                        <span className="hidden sm:inline">
                                                                            Crafted
                                                                        </span>
                                                                    </label>
                                                                ) : null}
                                                            </div>
                                                            <div className="mt-0.5 text-[0.75rem] text-zinc-400">
                                                                Loot Required:{" "}
                                                                <span className="font-medium text-zinc-200">
                                                                    {recipe.loot.join(", ")}
                                                                </span>
                                                            </div>

                                                            {equip && (
                                                                <>
                                                                    <div className="mt-2 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                                                                        {equip.description && (
                                                                            <p className="text-[0.8rem] text-zinc-200 italic">
                                                                                {equip.description}
                                                                            </p>
                                                                        )}
                                                                        {subtypeLabel && (
                                                                            <div className="text-[0.75rem] text-zinc-400 sm:text-right">
                                                                                {subtypeLabel}
                                                                            </div>
                                                                        )}
                                                                    </div>

                                                                    {hasAnyModules &&
                                                                        modules.length > 0 && (
                                                                            <div
                                                                                className={
                                                                                    gridClass
                                                                                }
                                                                            >
                                                                                {modules.map(
                                                                                    (
                                                                                        module,
                                                                                        index,
                                                                                    ) => {
                                                                                        const isLast =
                                                                                            index ===
                                                                                            modules.length -
                                                                                                1;
                                                                                        const shouldSpan =
                                                                                            modules.length >
                                                                                                1 &&
                                                                                            modules.length %
                                                                                                2 ===
                                                                                                1 &&
                                                                                            isLast;

                                                                                        const sectionClass =
                                                                                            "rounded-md border border-zinc-800/80 bg-zinc-900/40 px-3 py-2.5 sm:px-4 sm:py-3" +
                                                                                            (shouldSpan
                                                                                                ? " md:col-span-2"
                                                                                                : "");

                                                                                        return (
                                                                                            <section
                                                                                                key={
                                                                                                    module.key
                                                                                                }
                                                                                                className={
                                                                                                    sectionClass
                                                                                                }
                                                                                            >
                                                                                                {
                                                                                                    module.content
                                                                                                }
                                                                                            </section>
                                                                                        );
                                                                                    },
                                                                                )}
                                                                            </div>
                                                                        )}
                                                                </>
                                                            )}
                                                        </div>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </div>
                                )}
                            </section>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
