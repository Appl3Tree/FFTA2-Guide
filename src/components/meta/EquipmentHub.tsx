import React from "react";
import {
    EQUIPMENT,
    HELMET_RULES,
    ARMOR_RULES,
    SHIELD_RULE,
    WEAPON_RULES,
    type EquipmentMeta,
} from "../../data/equipment/equipment";
import { ABILITIES, ABILITY_SETS } from "../../data/abilities/abilities";

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
                const ab = ABILITIES[id];
                if (ab) {
                    parts.push(ab.name);
                    const set = ABILITY_SETS[ab.setId];
                    if (set) {
                        parts.push(set.name);
                    } else {
                        parts.push(ab.setId);
                    }
                } else {
                    parts.push(id);
                }
            }
        }
    }

    return parts.join(" ").toLowerCase();
}

export function EquipmentHub() {
    const [query, setQuery] = React.useState("");

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

    const [openSections, setOpenSections] = React.useState<
        Record<string, boolean>
    >({});
    const [openSubsections, setOpenSubsections] = React.useState<
        Record<string, boolean>
    >({});

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

    return (
        <div className="space-y-3 sm:space-y-4 text-xs sm:text-sm text-zinc-100">
            {/* Search bar */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-1">
                <label className="text-[0.7rem] sm:text-xs font-semibold tracking-[0.16em] text-zinc-400 uppercase">
                    Search Equipment
                </label>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search by name, type, job, ability, or effects..."
                    className="w-full sm:w-72 rounded-md border border-zinc-700/80 bg-zinc-950/70 px-2.5 py-1.5 text-xs sm:text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-1 focus:ring-emerald-500/70 focus:border-emerald-500/70"
                />
            </div>

            {categories.length === 0 && (
                <p className="text-[0.75rem] text-zinc-400">
                    No equipment matches your search.
                </p>
            )}

            {categories.map(([category, list]) => {
                const isOpen = !!openSections[category];

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
                        className="rounded-xl border border-zinc-800/80 bg-zinc-950/60 overflow-hidden"
                    >
                        <button
                            type="button"
                            onClick={() => toggleSection(category)}
                            className="w-full flex items-center justify-between px-3 py-2.5 sm:px-4 sm:py-3 bg-zinc-900/80 text-left"
                        >
                            <div className="flex items-baseline gap-2">
                                <h5 className="text-sm sm:text-base font-semibold text-zinc-50">
                                    {category}
                                </h5>
                                <span className="text-[0.7rem] text-zinc-400">
                                    {list.length} item
                                    {list.length === 1 ? "" : "s"}
                                </span>
                            </div>
                            <span className="flex items-center gap-1 text-[0.65rem] text-zinc-300 uppercase tracking-[0.16em]">
                                <span className="hidden sm:inline">
                                    {isOpen ? "Hide" : "Show"}
                                </span>
                                {isOpen ? (
                                    <svg
                                        className="h-3.5 w-3.5"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="m18 15-6-6-6 6" />
                                    </svg>
                                ) : (
                                    <svg
                                        className="h-3.5 w-3.5"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="m6 9 6 6 6-6" />
                                    </svg>
                                )}
                            </span>
                        </button>

                        {isOpen && (
                            <div className="divide-y divide-zinc-800/70">
                                {subcategories.map(([subLabel, subItems]) => {
                                    const subKey = `${category}::${subLabel}`;
                                    const subOpen =
                                        openSubsections[subKey] ?? false;

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
                                                className="w-full px-3 py-2 sm:px-4 sm:py-2.5 bg-zinc-950/70 flex items-center justify-between"
                                            >
                                                <span className="text-[0.7rem] sm:text-xs font-semibold uppercase tracking-[0.16em] text-zinc-400">
                                                    {subLabel}
                                                </span>
                                                <span className="flex items-center gap-2">
                                                    <span className="text-[0.65rem] text-zinc-500">
                                                        {subItems.length} item
                                                        {subItems.length === 1
                                                            ? ""
                                                            : "s"}
                                                    </span>
                                                    {subOpen ? (
                                                        <svg
                                                            className="h-3 w-3 text-zinc-400"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        >
                                                            <path d="m18 15-6-6-6 6" />
                                                        </svg>
                                                    ) : (
                                                        <svg
                                                            className="h-3 w-3 text-zinc-400"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        >
                                                            <path d="m6 9 6 6 6-6" />
                                                        </svg>
                                                    )}
                                                </span>
                                            </button>

                                            {subOpen && (
                                                <ul className="divide-y divide-zinc-800/70">
                                                    {subItems.map((item) => {
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
                                                                        <h4 className="text-[0.65rem] sm:text-xs font-semibold tracking-[0.16em] text-zinc-400 mb-1.5">
                                                                            <u>
                                                                                BASICS
                                                                            </u>
                                                                        </h4>
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
                                                                                        {
                                                                                            item.price
                                                                                        }{" "}
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
                                                                        <h4 className="text-[0.65rem] sm:text-xs font-semibold tracking-[0.16em] text-zinc-400 mb-1.5">
                                                                            <u>
                                                                                STATS
                                                                            </u>
                                                                        </h4>
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
                                                                        <h4 className="text-[0.65rem] sm:text-xs font-semibold tracking-[0.16em] text-zinc-400 mb-1.5">
                                                                            <u>
                                                                                EFFECTS
                                                                            </u>
                                                                        </h4>
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
                                                                        <h4 className="text-[0.65rem] sm:text-xs font-semibold tracking-[0.16em] text-zinc-400 mb-1.5">
                                                                            <u>
                                                                                RULES
                                                                            </u>
                                                                        </h4>
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
                                                                        <h4 className="text-[0.65rem] sm:text-xs font-semibold tracking-[0.16em] text-zinc-400 mb-1.5">
                                                                            <u>
                                                                                TEACHES
                                                                            </u>
                                                                        </h4>
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
                                                                                                        const ab =
                                                                                                            ABILITIES[
                                                                                                                id
                                                                                                            ];
                                                                                                        if (
                                                                                                            !ab
                                                                                                        ) {
                                                                                                            return id;
                                                                                                        }
                                                                                                        const set =
                                                                                                            ABILITY_SETS[
                                                                                                                ab
                                                                                                                    .setId
                                                                                                            ];
                                                                                                        const setName =
                                                                                                            set
                                                                                                                ?.name ??
                                                                                                            ab.setId;
                                                                                                        return `${ab.name} (${setName})`;
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
                                                                className="px-3 py-2.5 sm:px-4 sm:py-3 space-y-1.5"
                                                            >
                                                                <div className="flex flex-col gap-0.5">
                                                                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                                                                        <span className="font-semibold text-zinc-50">
                                                                            {
                                                                                item.name
                                                                            }
                                                                        </span>
                                                                        {subtypeLabel && (
                                                                            <span className="text-[0.7rem] text-zinc-400">
                                                                                {
                                                                                    subtypeLabel
                                                                                }
                                                                            </span>
                                                                        )}
                                                                    </div>

                                                                    {item.description && (
                                                                        <p className="text-[0.7rem] sm:text-xs text-zinc-300">
                                                                            {
                                                                                item.description
                                                                            }
                                                                        </p>
                                                                    )}

                                                                    {item.notes && (
                                                                        <p className="text-[0.7rem] sm:text-xs text-zinc-400">
                                                                            {
                                                                                item.notes
                                                                            }
                                                                        </p>
                                                                    )}
                                                                </div>

                                                                {hasAnyModules && (
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
                                                                                    "rounded-xl border border-zinc-800/80 bg-zinc-900/40 px-3 py-2.5 sm:px-4 sm:py-3" +
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
    );
}

