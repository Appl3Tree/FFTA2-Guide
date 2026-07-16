import React from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import {
    EQUIPMENT,
    HELMET_RULES,
    ARMOR_RULES,
    SHIELD_RULE,
    WEAPON_RULES,
    type EquipmentMeta,
} from "../../data/equipment/equipment";
import { equipmentScopeId } from "../../data/checklistScopes";
import { useChecklistPreferences } from "../ChecklistPreferencesContext";
import { useGuidePreference, useProgress } from "../ProgressContext";
import { Panel } from "../ui/Panel";
import { PanelProgress } from "../ui/PanelProgress";
import { getAbilityTeachingLabel } from "../../utils/abilityPresentation";

const DEFAULT_OPEN_EQUIPMENT_SECTIONS: Record<string, boolean> = {};
const DEFAULT_OPEN_EQUIPMENT_SUBSECTIONS: Record<string, boolean> = {};
const DEFAULT_OPEN_EQUIPMENT_ITEMS: Record<string, boolean> = {};

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

type RuleDetails = {
    jobs?: string;
    requiresPassives?: string;
    hands?: string;
    dualWield?: string;
    incompatible?: string;
    gender?: string;
};

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
    } else {
        rule = undefined;
    }

    if (!rule) return null;

    const details: RuleDetails = {};

    if (rule.allowedJobs && rule.allowedJobs.length > 0) {
        details.jobs = rule.allowedJobs.join(", ");
    } else if (rule.disallowedJobs && rule.disallowedJobs.length > 0) {
        details.jobs = `Everyone except ${rule.disallowedJobs.join(", ")}`;
    }

    // For shields, skip "requires passive" text entirely
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

/**
 * Decide which "subcategory" label the item belongs to within its main category.
 * e.g. Weapon → Sword, Helmet → Hat, Armor → Heavy Armor, Accessory → Shoes.
 */
function getSubcategoryKey(item: EquipmentMeta): string {
    const cat = item.category;

    if (cat === "Weapon") {
        return item.weaponType ?? "Other Weapons";
    }
    if (cat === "Helmet") {
        return item.helmetType ?? "Other Helmets";
    }
    if (cat === "Armor") {
        return item.armorType ?? "Other Armor";
    }
    if (cat === "Accessory") {
        return item.accessoryType ?? "Other Accessories";
    }
    if (cat === "Shield") {
        return "Shields";
    }

    return "Other";
}

/**
 * Build the list of stats to show, skipping 0 values.
 */
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

/**
 * Turn an equipment item into a big lowercase string used for searching.
 */
function itemToSearchBlob(item: EquipmentMeta): string {
    const parts: string[] = [];

    if (item.name) parts.push(item.name);
    if (item.category) parts.push(item.category);
    if (item.weaponType) parts.push(item.weaponType);
    if (item.helmetType) parts.push(item.helmetType);
    if (item.armorType) parts.push(item.armorType);
    if (item.accessoryType) parts.push(item.accessoryType);
    if (item.bazaar_category) parts.push(item.bazaar_category);
    if (item.description) parts.push(item.description);
    if (item.notes) parts.push(item.notes);

    if (item.immunity && item.immunity.length > 0) {
        parts.push("immune");
        parts.push(item.immunity.join(" "));
    }
    if (item.absorb && item.absorb.length > 0) {
        parts.push("absorb");
        parts.push(item.absorb.join(" "));
    }

    const anyItem = item as any;
    const halfDamage = anyItem["half-damage"] as string[] | undefined;
    if (halfDamage && halfDamage.length > 0) {
        parts.push("half");
        parts.push(halfDamage.join(" "));
    }

    if (item.weak && item.weak.length > 0) {
        parts.push("weak");
        parts.push(item.weak.join(" "));
    }
    if (item.element && item.element.length > 0) {
        parts.push("element");
        parts.push(item.element.join(" "));
    }
    if (item.gender) parts.push(item.gender);
    if (item.additionalEffect) parts.push(item.additionalEffect);

    if (item.teaches) {
        for (const [job, abilityIds] of Object.entries(item.teaches)) {
            parts.push(job);
            for (const id of abilityIds) {
                parts.push(getAbilityTeachingLabel(job, id));
            }
        }
    }

    return parts.join(" ").toLowerCase();
}

export function EquipmentHubPanel() {
    const { checked } = useProgress();
    const { isChecklistEnabled, isScopeEnabled } = useChecklistPreferences();
    const trackingEnabled = isChecklistEnabled("equipment");
    const trackedItems = Object.values(EQUIPMENT).filter((item) =>
        isScopeEnabled("equipment", equipmentScopeId(item)),
    );
    const completedItems = trackedItems.filter(
        (item) => checked[`equipment:${item.id}`],
    ).length;

    return (
        <Panel
            title="Equipment Hub"
            subtitle="Browse weapons, armor, accessories, stats, and taught abilities."
            tone="emerald"
            preferenceKey="collection.equipment"
            headerAddon={
                trackingEnabled && trackedItems.length > 0 ? (
                    <PanelProgress
                        completed={completedItems}
                        label="Collected"
                        tone="cyan"
                        total={trackedItems.length}
                    />
                ) : undefined
            }
        >
            <EquipmentHub />
        </Panel>
    );
}

export function EquipmentHub() {
    const { checked, setCheck } = useProgress();
    const { isScopeEnabled } = useChecklistPreferences();
    const [query, setQuery] = useGuidePreference(
        "filters.equipment.query",
        "",
    );
    const searchId = React.useId();

    const items = React.useMemo(
        () =>
            Object.values(EQUIPMENT).sort((a, b) =>
                a.name.localeCompare(b.name),
            ),
        [],
    );

    const filteredItems = React.useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return items;

        return items.filter((item) => {
            const blob = itemToSearchBlob(item);
            return blob.includes(q);
        });
    }, [items, query]);
    const searching = query.trim().length > 0;

    // Top-level: Weapon / Helmet / Armor / Accessory / Shield / Other
    const categories = React.useMemo(() => {
        const map: Record<string, EquipmentMeta[]> = {};
        for (const item of filteredItems) {
            const category = item.category ?? "Other";
            if (!map[category]) {
                map[category] = [];
            }
            map[category].push(item);
        }
        return Object.entries(map).sort(([a], [b]) => a.localeCompare(b));
    }, [filteredItems]);

    const [openSections, setOpenSections] = useGuidePreference<
        Record<string, boolean>
    >("disclosure.equipment.sections", DEFAULT_OPEN_EQUIPMENT_SECTIONS);
    const [openSubsections, setOpenSubsections] = useGuidePreference<
        Record<string, boolean>
    >(
        "disclosure.equipment.subsections",
        DEFAULT_OPEN_EQUIPMENT_SUBSECTIONS,
    );
    const [openItems, setOpenItems] = useGuidePreference<
        Record<string, boolean>
    >("disclosure.equipment.items", DEFAULT_OPEN_EQUIPMENT_ITEMS);

    const toggleSection = (category: string) => {
        setOpenSections((prev) => ({
            ...prev,
            [category]: !prev[category],
        }));
    };

    const toggleSubsection = (category: string, subLabel: string) => {
        const key = `${category}::${subLabel}`;
        setOpenSubsections((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    const toggleItem = (itemId: string) => {
        setOpenItems((current) => ({
            ...current,
            [itemId]: !current[itemId],
        }));
    };

    return (
        <div className="space-y-3 sm:space-y-4 text-xs sm:text-sm text-zinc-100">
            {/* Search bar */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-1">
                <label
                    htmlFor={searchId}
                    className="text-xs font-semibold uppercase text-zinc-400"
                >
                    Search Equipment
                </label>
                <input
                    id={searchId}
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search by name, type, job, ability, or effects..."
                    className="min-h-11 w-full rounded-md border border-zinc-700/80 bg-zinc-950/70 px-3 py-2 text-base text-zinc-100 placeholder:text-zinc-500 focus:border-emerald-500/70 focus:outline-none focus:ring-2 focus:ring-emerald-500/70 sm:w-72 sm:text-sm"
                />
            </div>

            {categories.length === 0 && (
                <p className="text-[0.75rem] text-zinc-400">
                    No equipment matches your search.
                </p>
            )}

            {categories.length > 0 ? (
            <div className="space-y-3 lg:max-h-[70vh] lg:overflow-y-auto lg:pr-2">
            {categories.map(([category, list]) => {
                const isOpen = searching || !!openSections[category];
                const trackedCategoryItems = list.filter((item) =>
                    isScopeEnabled("equipment", equipmentScopeId(item)),
                );
                const completedCategoryItems = trackedCategoryItems.filter(
                    (item) => checked[`equipment:${item.id}`],
                ).length;

                // Build subcategories within this main category
                const subMap: Record<string, EquipmentMeta[]> = {};
                for (const item of list) {
                    const subKey = getSubcategoryKey(item);
                    if (!subMap[subKey]) {
                        subMap[subKey] = [];
                    }
                    subMap[subKey].push(item);
                }
                const subcategories = Object.entries(subMap).sort(([a], [b]) =>
                    a.localeCompare(b),
                );

                return (
                    <section
                        key={category}
                        className="overflow-hidden rounded-lg border border-zinc-800/80 bg-zinc-950/60"
                    >
                        <button
                            type="button"
                            onClick={() => toggleSection(category)}
                            aria-expanded={isOpen}
                            className="flex min-h-11 w-full items-center justify-between bg-zinc-900/80 px-3 py-2.5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-emerald-300 sm:px-4 sm:py-3"
                        >
                            <div className="flex items-baseline gap-2">
                                <h3 className="text-sm sm:text-base font-semibold text-zinc-50">
                                    {category}
                                </h3>
                                <span className="text-[0.7rem] text-zinc-400">
                                    {list.length} item
                                    {list.length === 1 ? "" : "s"}
                                    {trackedCategoryItems.length > 0
                                        ? ` | ${completedCategoryItems}/${trackedCategoryItems.length} collected`
                                        : ""}
                                </span>
                            </div>
                            <span className="flex items-center gap-1 text-[0.65rem] text-zinc-300 uppercase">
                                <span className="hidden sm:inline">
                                    {isOpen ? "Hide" : "Show"}
                                </span>
                                {isOpen ? (
                                    <ChevronUp className="h-3.5 w-3.5" />
                                ) : (
                                    <ChevronDown className="h-3.5 w-3.5" />
                                )}
                            </span>
                        </button>

                        {isOpen && (
                            <div className="divide-y divide-zinc-800/70">
                                {subcategories.map(([subLabel, subItems]) => {
                                    const subKey = `${category}::${subLabel}`;
                                    const subOpen =
                                        searching ||
                                        (openSubsections[subKey] ?? false);

                                    return (
                                        <div key={subLabel}>
                                            {/* Subcategory header: e.g. Sword, Helm, Heavy Armor */}
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    toggleSubsection(
                                                        category,
                                                        subLabel,
                                                    )
                                                }
                                                aria-expanded={subOpen}
                                                className="flex min-h-11 w-full items-center justify-between bg-zinc-950/70 px-3 py-2 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-emerald-300 sm:px-4 sm:py-2.5"
                                            >
                                                <h4 className="text-[0.7rem] sm:text-xs font-semibold uppercase text-zinc-400">
                                                    {subLabel}
                                                </h4>
                                                <span className="flex items-center gap-2">
                                                    <span className="text-[0.65rem] text-zinc-500">
                                                        {subItems.length} item
                                                        {subItems.length === 1
                                                            ? ""
                                                            : "s"}
                                                    </span>
                                                    {subOpen ? (
                                                        <ChevronUp className="h-3.5 w-3.5 text-zinc-400" />
                                                    ) : (
                                                        <ChevronDown className="h-3.5 w-3.5 text-zinc-400" />
                                                    )}
                                                </span>
                                            </button>

                                            {subOpen && (
                                                <ul className="divide-y divide-zinc-800/70">
                                                    {subItems.map((item) => {
                                                        const itemProgressKey =
                                                            `equipment:${item.id}`;
                                                        const itemTrackingEnabled =
                                                            isScopeEnabled(
                                                                "equipment",
                                                                equipmentScopeId(
                                                                    item,
                                                                ),
                                                            );
                                                        const itemComplete =
                                                            !!checked[
                                                                itemProgressKey
                                                            ];
                                                        const itemOpen =
                                                            openItems[item.id] === true;
                                                        const subtypeLabel =
                                                            buildSubtypeLabel(
                                                                item,
                                                            );
                                                        const ruleDetails =
                                                            buildRuleDetails(
                                                                item,
                                                            );
                                                        const statEntries =
                                                            buildStatEntries(
                                                                item,
                                                            );
                                                        const hasStats =
                                                            statEntries.length >
                                                            0;

                                                        const anyItem =
                                                            item as any;
                                                        const halfDamage =
                                                            anyItem[
                                                                "half-damage"
                                                            ] as
                                                                | string[]
                                                                | undefined;

                                                        const hasBasics =
                                                            !!subtypeLabel ||
                                                            !!item
                                                                .bazaar_category ||
                                                            item.price != null;

                                                        const hasEffects =
                                                            (item.immunity &&
                                                                item.immunity
                                                                    .length >
                                                                    0) ||
                                                            (item.absorb &&
                                                                item.absorb
                                                                    .length >
                                                                    0) ||
                                                            (halfDamage &&
                                                                halfDamage
                                                                    .length >
                                                                    0) ||
                                                            (item.weak &&
                                                                item.weak
                                                                    .length >
                                                                    0) ||
                                                            (item.element &&
                                                                item.element
                                                                    .length >
                                                                    0) ||
                                                            !!item.gender ||
                                                            !!item
                                                                .additionalEffect;

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
                                                        if (
                                                            ruleDetails?.hands
                                                        ) {
                                                            ruleEntries.push({
                                                                label: "Hands",
                                                                value: ruleDetails.hands,
                                                            });
                                                        }
                                                        if (
                                                            ruleDetails?.dualWield
                                                        ) {
                                                            ruleEntries.push({
                                                                label: "Dual-wield",
                                                                value: ruleDetails.dualWield,
                                                            });
                                                        }
                                                        if (
                                                            ruleDetails?.requiresPassives
                                                        ) {
                                                            ruleEntries.push({
                                                                label: "Requires passive",
                                                                value: ruleDetails.requiresPassives,
                                                            });
                                                        }
                                                        if (
                                                            ruleDetails?.incompatible
                                                        ) {
                                                            ruleEntries.push({
                                                                label: "Incompatible",
                                                                value: ruleDetails.incompatible,
                                                            });
                                                        }
                                                        if (
                                                            ruleDetails?.gender
                                                        ) {
                                                            ruleEntries.push({
                                                                label: "Gender",
                                                                value: ruleDetails.gender,
                                                            });
                                                        }
                                                        const hasRules =
                                                            ruleEntries.length >
                                                            0;

                                                        const hasTeaches =
                                                            !!item.teaches &&
                                                            Object.keys(
                                                                item.teaches,
                                                            ).length > 0;

                                                        const modules: {
                                                            key: string;
                                                            content: JSX.Element;
                                                        }[] = [];

                                                        if (hasBasics) {
                                                            modules.push({
                                                                key: "basics",
                                                                content: (
                                                                    <>
                                                                        <h5 className="text-[0.65rem] sm:text-xs font-semibold text-zinc-400 mb-1.5">
                                                                            BASICS
                                                                        </h5>
                                                                        <dl className="space-y-1 text-[0.7rem] sm:text-xs text-zinc-200">
                                                                            {subtypeLabel && (
                                                                                <div className="flex justify-between gap-2">
                                                                                    <dt className="text-zinc-400">
                                                                                        Category
                                                                                    </dt>
                                                                                    <dd className="font-medium text-right">
                                                                                        {
                                                                                            subtypeLabel
                                                                                        }
                                                                                    </dd>
                                                                                </div>
                                                                            )}
                                                                            {item.bazaar_category && (
                                                                                <div className="flex justify-between gap-2">
                                                                                    <dt className="text-zinc-400">
                                                                                        Bazaar
                                                                                    </dt>
                                                                                    <dd className="font-medium text-right">
                                                                                        {
                                                                                            item.bazaar_category
                                                                                        }
                                                                                    </dd>
                                                                                </div>
                                                                            )}
                                                                            {item.price !=
                                                                                null && (
                                                                                <div className="flex justify-between gap-2">
                                                                                    <dt className="text-zinc-400">
                                                                                        Purchase
                                                                                    </dt>
                                                                                    <dd className="font-medium text-right">
                                                                                        {item.price.toLocaleString()}{" "}
                                                                                        gil
                                                                                    </dd>
                                                                                </div>
                                                                            )}
                                                                        </dl>
                                                                    </>
                                                                ),
                                                            });
                                                        }

                                                        if (hasStats) {
                                                            const useTwoColsStats =
                                                                statEntries.length >
                                                                3;
                                                            const dlStatsClass =
                                                                useTwoColsStats
                                                                    ? "grid grid-cols-2 gap-x-4 gap-y-1"
                                                                    : "space-y-1";

                                                            modules.push({
                                                                key: "stats",
                                                                content: (
                                                                    <>
                                                                        <h5 className="text-[0.65rem] sm:text-xs font-semibold text-zinc-400 mb-1.5">
                                                                            STATS
                                                                        </h5>
                                                                        <dl className={dlStatsClass}>
                                                                            {statEntries.map(
                                                                                (
                                                                                    entry,
                                                                                ) => (
                                                                                    <div
                                                                                        key={
                                                                                            entry.label
                                                                                        }
                                                                                        className="flex justify-between gap-2"
                                                                                    >
                                                                                        <dt className="text-zinc-400">
                                                                                            {
                                                                                                entry.label
                                                                                            }
                                                                                        </dt>
                                                                                        <dd className="font-medium">
                                                                                            {
                                                                                                entry.value
                                                                                            }
                                                                                        </dd>
                                                                                    </div>
                                                                                ),
                                                                            )}
                                                                        </dl>
                                                                    </>
                                                                ),
                                                            });
                                                        }

                                                        if (hasEffects) {
                                                            modules.push({
                                                                key: "effects",
                                                                content: (
                                                                    <>
                                                                        <h5 className="text-[0.65rem] sm:text-xs font-semibold text-zinc-400 mb-1.5">
                                                                            EFFECTS
                                                                        </h5>
                                                                        <dl className="space-y-1 text-[0.7rem] sm:text-xs text-zinc-200">
                                                                            {item.immunity &&
                                                                                item
                                                                                    .immunity
                                                                                    .length >
                                                                                    0 && (
                                                                                    <div className="flex justify-between gap-2">
                                                                                        <dt className="text-zinc-400">
                                                                                            Immune
                                                                                        </dt>
                                                                                        <dd className="font-medium text-right">
                                                                                            {item.immunity.join(
                                                                                                ", ",
                                                                                            )}
                                                                                        </dd>
                                                                                    </div>
                                                                                )}
                                                                            {item.absorb &&
                                                                                item
                                                                                    .absorb
                                                                                    .length >
                                                                                    0 && (
                                                                                    <div className="flex justify-between gap-2">
                                                                                        <dt className="text-zinc-400">
                                                                                            Absorb
                                                                                        </dt>
                                                                                        <dd className="font-medium text-right">
                                                                                            {item.absorb.join(
                                                                                                ", ",
                                                                                            )}
                                                                                        </dd>
                                                                                    </div>
                                                                                )}
                                                                            {halfDamage &&
                                                                                halfDamage
                                                                                    .length >
                                                                                    0 && (
                                                                                    <div className="flex justify-between gap-2">
                                                                                        <dt className="text-zinc-400">
                                                                                            Half
                                                                                        </dt>
                                                                                        <dd className="font-medium text-right">
                                                                                            {halfDamage.join(
                                                                                                ", ",
                                                                                            )}
                                                                                        </dd>
                                                                                    </div>
                                                                                )}
                                                                            {item.weak &&
                                                                                item
                                                                                    .weak
                                                                                    .length >
                                                                                    0 && (
                                                                                    <div className="flex justify-between gap-2">
                                                                                        <dt className="text-zinc-400">
                                                                                            Weak
                                                                                        </dt>
                                                                                        <dd className="font-medium text-right">
                                                                                            {item.weak.join(
                                                                                                ", ",
                                                                                            )}
                                                                                        </dd>
                                                                                    </div>
                                                                                )}
                                                                            {item.element &&
                                                                                item
                                                                                    .element
                                                                                    .length >
                                                                                    0 && (
                                                                                    <div className="flex justify-between gap-2">
                                                                                        <dt className="text-zinc-400">
                                                                                            Element
                                                                                        </dt>
                                                                                        <dd className="font-medium text-right">
                                                                                            {item.element.join(
                                                                                                ", ",
                                                                                            )}
                                                                                        </dd>
                                                                                    </div>
                                                                                )}
                                                                            {item.gender && (
                                                                                <div className="flex justify-between gap-2">
                                                                                    <dt className="text-zinc-400">
                                                                                        Gender
                                                                                    </dt>
                                                                                    <dd className="font-medium text-right">
                                                                                        {
                                                                                            item.gender
                                                                                        }
                                                                                    </dd>
                                                                                </div>
                                                                            )}
                                                                            {item.additionalEffect && (
                                                                                <div className="flex justify-between gap-2">
                                                                                    <dt className="text-zinc-400">
                                                                                        Other
                                                                                    </dt>
                                                                                    <dd className="font-medium text-right">
                                                                                        {
                                                                                            item.additionalEffect
                                                                                        }
                                                                                    </dd>
                                                                                </div>
                                                                            )}
                                                                        </dl>
                                                                    </>
                                                                ),
                                                            });
                                                        }

                                                        if (hasRules) {
                                                            const useTwoColsRules =
                                                                ruleEntries.length >
                                                                3;
                                                            const dlRulesClass =
                                                                useTwoColsRules
                                                                    ? "grid grid-cols-2 gap-x-4 gap-y-1"
                                                                    : "space-y-1";

                                                            modules.push({
                                                                key: "rules",
                                                                content: (
                                                                    <>
                                                                        <h5 className="text-[0.65rem] sm:text-xs font-semibold text-zinc-400 mb-1.5">
                                                                            RULES
                                                                        </h5>
                                                                        <dl className={dlRulesClass}>
                                                                            {ruleEntries.map(
                                                                                (
                                                                                    entry,
                                                                                ) => (
                                                                                    <div
                                                                                        key={
                                                                                            entry.label
                                                                                        }
                                                                                        className="flex justify-between gap-2"
                                                                                    >
                                                                                        <dt className="text-zinc-400">
                                                                                            {
                                                                                                entry.label
                                                                                            }
                                                                                        </dt>
                                                                                        <dd className="font-medium text-right">
                                                                                            {
                                                                                                entry.value
                                                                                            }
                                                                                        </dd>
                                                                                    </div>
                                                                                ),
                                                                            )}
                                                                        </dl>
                                                                    </>
                                                                ),
                                                            });
                                                        }

                                                        if (hasTeaches) {
                                                            modules.push({
                                                                key: "teaches",
                                                                content: (
                                                                    <>
                                                                        <h5 className="text-[0.65rem] sm:text-xs font-semibold text-zinc-400 mb-1.5">
                                                                            TEACHES
                                                                        </h5>
                                                                        <div className="mt-0.5 text-[0.7rem] sm:text-xs text-zinc-300">
                                                                            <ul className="list-disc list-inside space-y-0.5">
                                                                                {Object.entries(
                                                                                    item.teaches ??
                                                                                        {},
                                                                                ).map(
                                                                                    ([
                                                                                        job,
                                                                                        abilityIds,
                                                                                    ]) => {
                                                                                        const display =
                                                                                            abilityIds
                                                                                                .map(
                                                                                                    (
                                                                                                        id,
                                                                                                    ) => {
                                                                                                        return getAbilityTeachingLabel(
                                                                                                            job,
                                                                                                            id,
                                                                                                        );
                                                                                                    },
                                                                                                )
                                                                                                .join(
                                                                                                    ", ",
                                                                                                );

                                                                                        return (
                                                                                            <li
                                                                                                key={
                                                                                                    job
                                                                                                }
                                                                                            >
                                                                                                <span className="font-medium text-zinc-100">
                                                                                                    {
                                                                                                        job
                                                                                                    }
                                                                                                    :
                                                                                                </span>{" "}
                                                                                                {
                                                                                                    display
                                                                                                }
                                                                                            </li>
                                                                                        );
                                                                                    },
                                                                                )}
                                                                            </ul>
                                                                        </div>
                                                                    </>
                                                                ),
                                                            });
                                                        }

                                                        const hasAnyModules =
                                                            modules.length > 0;

                                                        const gridClass =
                                                            modules.length <= 1
                                                                ? "mt-1.5 grid grid-cols-1 gap-2.5 sm:gap-3"
                                                                : "mt-1.5 grid grid-cols-1 md:grid-cols-2 gap-2.5 sm:gap-3";

                                                        return (
                                                            <li
                                                                key={item.id}
                                                                className="bg-zinc-950/20"
                                                            >
                                                                <div
                                                                    className={`grid items-stretch ${
                                                                        itemTrackingEnabled
                                                                            ? "grid-cols-[minmax(0,1fr)_auto]"
                                                                            : "grid-cols-1"
                                                                    }`}
                                                                >
                                                                    <button
                                                                        type="button"
                                                                        onClick={() =>
                                                                            toggleItem(
                                                                                item.id,
                                                                            )
                                                                        }
                                                                        aria-expanded={
                                                                            itemOpen
                                                                        }
                                                                        className="flex min-h-14 min-w-0 items-center justify-between gap-3 px-3 py-2.5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-emerald-300 sm:px-4"
                                                                    >
                                                                        <span className="min-w-0">
                                                                            <span className="block font-semibold text-zinc-50">
                                                                                {item.name}
                                                                            </span>
                                                                            {subtypeLabel ? (
                                                                                <span className="mt-1 block text-[0.7rem] text-zinc-400">
                                                                                    {subtypeLabel}
                                                                                </span>
                                                                            ) : null}
                                                                        </span>
                                                                        <ChevronDown
                                                                            aria-hidden="true"
                                                                            className={`h-4 w-4 shrink-0 text-zinc-500 transition-transform ${
                                                                                itemOpen
                                                                                    ? "rotate-180"
                                                                                    : ""
                                                                            }`}
                                                                        />
                                                                    </button>
                                                                    {itemTrackingEnabled ? (
                                                                        <label className="flex min-h-14 cursor-pointer items-center gap-2 border-l border-zinc-800/70 px-3 text-xs font-semibold text-zinc-300 hover:bg-zinc-900/70 focus-within:ring-2 focus-within:ring-inset focus-within:ring-emerald-300">
                                                                            <input
                                                                                type="checkbox"
                                                                                aria-label={`Mark ${item.name} collected`}
                                                                                checked={
                                                                                    itemComplete
                                                                                }
                                                                                onChange={(
                                                                                    event,
                                                                                ) =>
                                                                                    setCheck(
                                                                                        itemProgressKey,
                                                                                        event
                                                                                            .target
                                                                                            .checked,
                                                                                    )
                                                                                }
                                                                                className="h-5 w-5 rounded border-zinc-500 text-emerald-500 focus:ring-emerald-400"
                                                                            />
                                                                            <span className="hidden sm:inline">
                                                                                Collected
                                                                            </span>
                                                                        </label>
                                                                    ) : null}
                                                                </div>

                                                                {itemOpen ? (
                                                                <div className="border-t border-zinc-800/70 px-3 pb-3 pt-2.5 sm:px-4">
                                                                    {item.description ? (
                                                                        <p className="text-xs leading-relaxed text-zinc-300">
                                                                            {item.description}
                                                                        </p>
                                                                    ) : null}
                                                                    {item.notes ? (
                                                                        <p className="mt-1 text-xs leading-relaxed text-zinc-400">
                                                                            {item.notes}
                                                                        </p>
                                                                    ) : null}
                                                                {hasAnyModules ? (
                                                                    <div className={gridClass}>
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
                                                                                    "border-t border-zinc-800/80 px-1 py-2.5 sm:py-3" +
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
                                                                ) : null}
                                                                </div>
                                                                ) : null}
                                                            </li>
                                                        );
                                                    })}
                                                </ul>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </section>
                );
            })}
            </div>
            ) : null}
        </div>
    );
}
