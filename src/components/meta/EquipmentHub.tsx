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

function buildRuleSummary(item: EquipmentMeta): string | null {
    const cat = item.category;
    let rule: any | undefined = undefined;

    if (cat === "Weapon" && item.weaponType) {
        rule = WEAPON_RULES[item.weaponType];
    } else if (cat === "Helmet" && item.helmetType) {
        rule = HELMET_RULES[item.helmetType];
    } else if (cat === "Armor" && item.armorType) {
        rule = ARMOR_RULES[item.armorType];
    } else if (cat === "Shield") {
        rule = SHIELD_RULE;
    } else {
        return null;
    }

    if (!rule) return null;

    const parts: string[] = [];

    if (rule.allowedJobs && rule.allowedJobs.length > 0) {
        parts.push(`Jobs: ${rule.allowedJobs.join(", ")}`);
    } else if (rule.disallowedJobs && rule.disallowedJobs.length > 0) {
        parts.push(`Jobs: Everyone except ${rule.disallowedJobs.join(", ")}`);
    }

    if (rule.requiresPassives && rule.requiresPassives.length > 0) {
        parts.push(`Also via passive: ${rule.requiresPassives.join(", ")}`);
    }

    if (rule.handsRequired) {
        let handText =
            rule.handsRequired === 1
                ? "Hands: 1 (one-handed)"
                : "Hands: 2 (two-handed)";

        if (typeof rule.canDualWield === "boolean") {
            handText += rule.canDualWield
                ? ", dual-wield OK"
                : ", cannot be dual-wielded";
        }

        parts.push(handText);
    }

    if (rule.incompatiblePassives && rule.incompatiblePassives.length > 0) {
        parts.push(
            `Incompatible with: ${rule.incompatiblePassives.join(", ")}`,
        );
    }

    if (rule.genderRestriction === "femaleOnly") {
        parts.push(
            "Gender: female only (unless a passive allows otherwise)",
        );
    }

    if (parts.length === 0) return null;
    return parts.join(" • ");
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
    if (item.description) parts.push(item.description);
    if (item.notes) parts.push(item.notes);

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
                    // fallback to raw id if metadata missing
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

    // Search filter (like MissionHub-style free text search)
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

    // collapsed by default for top-level sections
    const [openSections, setOpenSections] = React.useState<
        Record<string, boolean>
    >({});

    // collapsed/expanded for subcategories (e.g. Weapon::Sword)
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
                    placeholder="Search by name, type, job, or ability..."
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
                                        openSubsections[subKey] ?? true; // default open

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
                                                        const ruleSummary =
                                                            buildRuleSummary(
                                                                item,
                                                            );

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
                                                                                item
                                                                                    .description
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

                                                                    {ruleSummary && (
                                                                        <p className="text-[0.7rem] sm:text-xs text-zinc-400">
                                                                            {
                                                                                ruleSummary
                                                                            }
                                                                        </p>
                                                                    )}
                                                                </div>

                                                                {item.teaches && (
                                                                    <div className="mt-1.5 text-[0.7rem] text-zinc-400">
                                                                        <div className="font-medium text-zinc-200">
                                                                            Teaches
                                                                        </div>
                                                                        <ul className="list-disc list-inside space-y-0.5">
                                                                            {Object.entries(
                                                                                item.teaches,
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
                                                                                            <span className="font-medium text-zinc-200">
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

