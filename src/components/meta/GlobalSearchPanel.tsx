// src/components/meta/GlobalSearchPanel.tsx
import React from "react";
import type { Mission } from "../../types/ffta2";
import { ALL_MISSIONS } from "../../data/missions/allMissions";
import {
    EQUIPMENT,
    WEAPON_RULES,
    HELMET_RULES,
    ARMOR_RULES,
    SHIELD_RULE,
    type EquipmentMeta,
} from "../../data/equipment/equipment";
import {
    ABILITIES,
    ABILITY_SETS,
    type AbilityMeta,
    type AbilitySetMeta,
} from "../../data/abilities/abilities";
import {
    GLOBAL_RETRO_ACHIEVEMENTS,
    RETRO_ACHIEVEMENTS_BY_MISSION_ID,
} from "../../data/retroAchievements";
import type { GlobalRetroAchievement } from "../../types/ffta2";
import { BAZAAR_RECIPES } from "../../data/bazaarRecipes";
import { resolveEnemyLoadout } from "../../utils/resolveAbilities";
import { resolveEnemyEquipment } from "../../utils/resolveEquipment";
import { useProgress } from "../ProgressContext";
import { getEnemyMetaForJob } from "../../data/bestiary/bestiary";

type TabKey = "missions" | "equipment" | "abilities" | "bazaar" | "retros";

interface MissionWithBlob {
    mission: Mission;
    blob: string;
}

interface EquipmentWithBlob {
    item: EquipmentMeta;
    blob: string;
}

interface AbilityWithBlob {
    set: AbilitySetMeta;
    ability: AbilityMeta;
    blob: string;
}

interface RetroEntry {
    id: string;
    key: string;
    ach: {
        id: string;
        name: string;
        description: string;
        missable?: boolean;
        category?: string;
    };
    blob: string;
}

type BazaarRecipe = (typeof BAZAAR_RECIPES)[number];

interface BazaarRecipeWithBlob {
    recipe: BazaarRecipe;
    blob: string;
}

interface BazaarSection {
    section: string;
    recipes: BazaarRecipeWithBlob[];
}

function missionBlob(m: Mission): string {
    // Mirror MissionCard + extra: arc, rank, fee/days, members, strategy, notes
    const parts: string[] = [];

    parts.push(m.id, m.name);

    if ((m as any).arc) parts.push((m as any).arc);
    if (m.questType) parts.push(m.questType);
    if (m.region) parts.push(m.region);
    if ((m as any).rank != null) parts.push(`Rank ${String((m as any).rank)}`);
    if ((m as any).fee != null) parts.push(`${String((m as any).fee)} gil fee`);
    if ((m as any).days != null) parts.push(`${String((m as any).days)} days`);
    if ((m as any).members != null) {
        parts.push(`${String((m as any).members)} members`);
    }
    if ((m as any).canDispatch) parts.push("Dispatch");
    if ((m as any).canCancel) parts.push("Cancelable");

    if (m.description) parts.push(m.description);
    if ((m as any).objective) parts.push((m as any).objective);
    if ((m as any).law) parts.push((m as any).law);
    if ((m as any).strategy) parts.push((m as any).strategy);
    if ((m as any).notes) parts.push((m as any).notes);

    if (Array.isArray((m as any).tags)) {
        parts.push(...((m as any).tags as string[]));
    }

    if (m.requiredItems) parts.push(...m.requiredItems);

    if (m.requiredTalents) {
        const t = m.requiredTalents;
        if (t.negotiation) parts.push("Negotiation");
        if (t.aptitude) parts.push("Aptitude");
        if (t.teamwork) parts.push("Teamwork");
        if (t.adaptability) parts.push("Adaptability");
    }

    if (m.dispatchRecommended && m.dispatchRecommended.length > 0) {
        parts.push(...m.dispatchRecommended);
    }

    if (m.rewards) {
        if (m.rewards.gil != null) {
            parts.push(`${String(m.rewards.gil)} gil`);
        }
        if ((m.rewards as any).cp != null) {
            parts.push(`${String((m.rewards as any).cp)} clan points`);
        }
        if ((m.rewards as any).loot) {
            parts.push(String((m.rewards as any).loot));
        }
        if (m.rewards.items) parts.push(...m.rewards.items);
        if (m.rewards.abilities) parts.push(...m.rewards.abilities);
        if ((m.rewards as any).other) {
            parts.push(String((m.rewards as any).other));
        }
    }

    if (m.enemies) {
        for (const enemy of m.enemies) {
            if (enemy.name) parts.push(enemy.name);
            if (enemy.race) parts.push(enemy.race);
            if (enemy.job) parts.push(enemy.job);
            if (enemy.level) parts.push(`Level ${enemy.level}`);
            if ((enemy as any).quantity) parts.push(`quantity ${(enemy as any).quantity}`);
            if (enemy.notes) parts.push(enemy.notes);
            
            // Include bestiary metadata for the enemy's job
            const meta = getEnemyMetaForJob(enemy.job);
            if (meta) {
                if (meta.description) parts.push(meta.description);
                if (meta.absorb) parts.push(...meta.absorb);
                if (meta.immune) parts.push(...meta.immune);
                if (meta.half) parts.push(...meta.half);
                if (meta.weak) parts.push(...meta.weak);
            }
            
            // Include enemy abilities in search
            if (enemy.abilities) {
    const loadout = resolveEnemyLoadout(enemy.abilities);
    if (loadout) {
        if (loadout.A1) {
            parts.push(loadout.A1.setName);
            if (loadout.A1.setDescription) parts.push(loadout.A1.setDescription);
            (loadout.A1.abilities ?? []).forEach((ab) => {
                parts.push(ab.name);
                if (ab.description) parts.push(ab.description);
                const abilityMeta = ABILITIES[ab.id];
                if (abilityMeta?.blueMagic) parts.push("blue magic");
            });
        }
        if (loadout.A2) {
            parts.push(loadout.A2.setName);
            (loadout.A2.abilities ?? []).forEach((ab) => {
                parts.push(ab.name);
                if (ab.description) parts.push(ab.description);
                const abilityMeta = ABILITIES[ab.id];
                if (abilityMeta?.blueMagic) parts.push("blue magic");
            });
        }
        if (loadout.R) {
            parts.push(loadout.R.name);
            if (loadout.R.description) parts.push(loadout.R.description);
        }
        if (loadout.P) {
            parts.push(loadout.P.name);
            if (loadout.P.description) parts.push(loadout.P.description);
        }
    }
}

            
            // Include enemy equipment in search
            if (enemy.equipment) {
                const equip = resolveEnemyEquipment(enemy.equipment);
                if (equip) {
                    equip.forEach(item => {
                        parts.push(item.name);
                        if (item.category) parts.push(item.category);
                        if (item.description) parts.push(item.description);
                        
                        // Include all equipment stats
                        const statKeys = ["atk", "def", "mag", "rst", "eva", "spd", "jump", "move", "hp", "mp"];
                        statKeys.forEach(key => {
                            if ((item as any)[key] != null && (item as any)[key] !== 0) {
                                parts.push(`${key.toUpperCase()} ${String((item as any)[key])}`);
                            }
                        });
                        
                        // Include equipment effects
                        if ((item as any).immunity) parts.push(...(item as any).immunity);
                        if ((item as any).absorb) parts.push(...(item as any).absorb);
                        if ((item as any)["half-damage"]) parts.push(...(item as any)["half-damage"]);
                        if ((item as any).resistance) parts.push(...(item as any).resistance);
                        if ((item as any).weakness) parts.push(...(item as any).weakness);
                        
                        if (item.teaches) {
                            Object.entries(item.teaches).forEach(([job, abilityIds]) => {
                                parts.push(job);
                                abilityIds.forEach(id => {
                                    const ability = ABILITIES[id];
                                    if (ability) {
                                        parts.push(ability.name);
                                        const set = ABILITY_SETS[ability.setId];
                                        if (set) parts.push(set.name);
                                    }
                                });
                            });
                        }
                    });
                }
            }
        }
    }

    return parts.join(" ").toLowerCase();
}

function equipmentBlob(e: EquipmentMeta): string {
    const parts: string[] = [];

    parts.push(e.name);
    if ((e as any).category) parts.push((e as any).category as string);
    if ((e as any).weaponType) parts.push((e as any).weaponType as string);
    if ((e as any).armorType) parts.push((e as any).armorType as string);
    if ((e as any).helmetType) parts.push((e as any).helmetType as string);
    if ((e as any).shieldType) parts.push((e as any).shieldType as string);
    if ((e as any).accessoryType) parts.push((e as any).accessoryType as string);

    if ((e as any).bazaar_category) {
        parts.push(String((e as any).bazaar_category));
    }

    if ((e as any).price != null) {
        parts.push(`${String((e as any).price)} gil`);
    }

    if ((e as any).description) {
        parts.push(String((e as any).description));
    }
    if ((e as any).notes) {
        parts.push(String((e as any).notes));
    }

    const statsSource: any = e;
    const statKeys = [
        "atk",
        "def",
        "mag",
        "rst",
        "eva",
        "spd",
        "jump",
        "move",
        "hp",
        "mp",
    ];
    for (const key of statKeys) {
        if (statsSource[key] != null && statsSource[key] !== 0) {
            parts.push(`${key.toUpperCase()} ${String(statsSource[key])}`);
        }
    }

    if ((e as any).immunity) {
        parts.push(...((e as any).immunity as string[]));
    }
    if ((e as any).absorb) {
        parts.push(...((e as any).absorb as string[]));
    }
    if ((e as any)["half-damage"]) {
        parts.push(...((e as any)["half-damage"] as string[]));
    }
    if ((e as any).status) {
        parts.push(...((e as any).status as string[]));
    }
    if ((e as any).element) {
        parts.push(...((e as any).element as string[]));
    }
    if ((e as any).weak) {
        parts.push(...((e as any).weak as string[]));
    }

    if ((e as any).additionalEffect) {
        parts.push(String((e as any).additionalEffect));
    }

    if ((e as any).gender) {
        parts.push(String((e as any).gender));
    }

    if ((e as any).rangeMin != null) {
        parts.push(`range min ${String((e as any).rangeMin)}`);
    }
    if ((e as any).rangeMax != null) {
        parts.push(`range max ${String((e as any).rangeMax)}`);
    }
    if ((e as any).moveBonus != null) {
        parts.push(`move bonus ${String((e as any).moveBonus)}`);
    }
    if ((e as any).jumpBonus != null) {
        parts.push(`jump bonus ${String((e as any).jumpBonus)}`);
    }

    if ((e as any).teaches) {
        for (const [job, ids] of Object.entries(
            (e as any).teaches as Record<string, string[]>,
        )) {
            parts.push(job);
            for (const id of ids) {
                const ab = ABILITIES[id];
                if (!ab) continue;
                const set = ABILITY_SETS[ab.setId];
                parts.push(
                    `${ab.name} (${set?.name ?? set?.id ?? ab.setId})`,
                );
            }
        }
    }

    return parts.join(" ").toLowerCase();
}

function abilityBlob(a: AbilityMeta, primarySet: AbilitySetMeta): string {
    const parts: string[] = [];

    // Basic identifiers
    parts.push(a.name, a.id);

    // Primary set
    parts.push(primarySet.name, primarySet.id);
    if (primarySet.description) {
        parts.push(primarySet.description);
    }

    // Additional sets (from otherSetIds)
    if (a.otherSetIds) {
        for (const setId of a.otherSetIds) {
            const extraSet = ABILITY_SETS[setId];
            if (!extraSet) continue;
            parts.push(extraSet.name, extraSet.id);
            if (extraSet.description) {
                parts.push(extraSet.description);
            }
        }
    }

    // Ability description text
    if (a.description) {
        parts.push(...a.description);
    }

    // Blue Magic tagging
    if (a.blueMagic) {
        parts.push("blue magic", "blue magick");
    }

    return parts.join(" ").toLowerCase();
}

function retroBlob(ach: GlobalRetroAchievement, missable: boolean): string {
    const parts: string[] = [];
    parts.push(ach.id, ach.name, ach.description);
    if (ach.category) parts.push(ach.category);
    if (missable) parts.push("missable");
    return parts.join(" ").toLowerCase();
}

function bazaarBlob(r: BazaarRecipe): string {
    const parts: string[] = [];
    parts.push(r.id, r.section, r.result);
    if ((r as any).rank) parts.push((r as any).rank as string);
    if (Array.isArray(r.loot)) {
        parts.push(...r.loot);
    }
    return parts.join(" ").toLowerCase();
}

type RuleDetails = {
    jobs?: string;
    requiresPassives?: string;
    hands?: string;
    dualWield?: string;
    incompatible?: string;
    gender?: string;
};

function buildSubtypeLabel(item: EquipmentMeta): string | null {
    const cat = item.category as string | undefined;

    if (cat === "Weapon" && (item as any).weaponType) {
        return `Weapon – ${(item as any).weaponType}`;
    }

    if (cat === "Helmet" && (item as any).helmetType) {
        return `Helmet – ${(item as any).helmetType}`;
    }

    if (cat === "Armor" && (item as any).armorType) {
        return `Armor – ${(item as any).armorType}`;
    }

    if (cat === "Accessory" && (item as any).accessoryType) {
        return `Accessory – ${(item as any).accessoryType}`;
    }

    if (cat === "Shield") {
        return "Shield";
    }

    return null;
}

function buildRuleDetails(item: EquipmentMeta): RuleDetails | null {
    const cat = item.category as string | undefined;
    let rule: any | undefined;

    if (cat === "Weapon" && (item as any).weaponType) {
        rule = WEAPON_RULES[(item as any).weaponType];
    } else if (cat === "Helmet" && (item as any).helmetType) {
        rule = HELMET_RULES[(item as any).helmetType];
    } else if (cat === "Armor" && (item as any).armorType) {
        rule = ARMOR_RULES[(item as any).armorType];
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

    if (cat !== "Shield" && rule.requiresPassives && rule.requiresPassives.length > 0) {
        details.requiresPassives = rule.requiresPassives.join(", ");
    }

    if (rule.handsRequired) {
        details.hands = rule.handsRequired === 1 ? "1 (one-handed)" : "2 (two-handed)";
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

function buildStatEntries(item: EquipmentMeta): { label: string; value: string | number }[] {
    const entries: { label: string; value: string | number }[] = [];
    const src: any = item;

    if ((src.atk ?? 0) > 0) {
        entries.push({ label: "ATK", value: src.atk });
    }
    if ((src.def ?? 0) > 0) {
        entries.push({ label: "DEF", value: src.def });
    }
    if ((src.mag ?? 0) > 0) {
        entries.push({ label: "MAG", value: src.mag });
    }
    if ((src.rst ?? 0) > 0) {
        entries.push({ label: "RST", value: src.rst });
    }
    if ((src.eva ?? 0) > 0) {
        entries.push({ label: "EVA", value: src.eva });
    }
    if ((src.spd ?? 0) > 0) {
        entries.push({ label: "SPD", value: src.spd });
    }
    if ((src.jump ?? 0) > 0) {
        entries.push({ label: "Jump", value: src.jump });
    }
    if ((src.moveBonus ?? 0) > 0) {
        entries.push({ label: "Move bonus", value: `+${src.moveBonus}` });
    }
    if ((src.jumpBonus ?? 0) > 0) {
        entries.push({ label: "Jump bonus", value: `+${src.jumpBonus}` });
    }

    if (src.rangeMin != null && src.rangeMax != null) {
        const rangeValue =
            src.rangeMin === src.rangeMax
                ? String(src.rangeMin)
                : `${src.rangeMin}-${src.rangeMax}`;
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

function CollapsibleSection({
    title,
    children,
    defaultOpen = false,
}: {
    title: string;
    children: React.ReactNode;
    defaultOpen?: boolean;
}) {
    const [open, setOpen] = React.useState(defaultOpen);

    if (!children) return null;

    return (
        <section className="border border-zinc-800/80 rounded-md bg-zinc-950/40">
            <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                className="w-full px-2 py-1.5 flex items-center justify-between gap-2 text-left"
            >
                <span className="text-xs font-semibold text-zinc-100">
                    {title}
                </span>
                <span className="flex items-center gap-1 text-[0.65rem] text-zinc-400">
                    {open ? (
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
            {open && (
                <div className="px-2 pb-2 pt-0 space-y-1.5 text-[0.7rem] text-zinc-100">
                    {children}
                </div>
            )}
        </section>
    );
}

function renderChevron(open: boolean) {
    return open ? (
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
    );
}

export function GlobalSearchPanel() {
    const { checked, setCheck } = useProgress();

    const [open, setOpen] = React.useState(false);
    const [activeTab, setActiveTab] = React.useState<TabKey>("missions");
    const [query, setQuery] = React.useState("");

    const [openMissions, setOpenMissions] = React.useState<
        Record<string, boolean>
    >({});
    const [openEquipment, setOpenEquipment] = React.useState<
        Record<string, boolean>
    >({});
    const [openAbilities, setOpenAbilities] = React.useState<
        Record<string, boolean>
    >({});
    const [openBazaarSections, setOpenBazaarSections] = React.useState<
        Record<string, boolean>
    >({});
    const [openRetros, setOpenRetros] = React.useState<
        Record<string, boolean>
    >({});
    const [openEnemies, setOpenEnemies] = React.useState<
        Record<string, boolean>
    >({});

    // Missable Retro IDs (from any source)
    const missableRetroIds = React.useMemo(() => {
        const s = new Set<string>();
        Object.values(RETRO_ACHIEVEMENTS_BY_MISSION_ID).forEach((arr) => {
            arr.forEach((ach: any) => {
                if (ach.missable) s.add(ach.id);
            });
        });
        return s;
    }, []);

    // Missions
    const missionsWithBlob: MissionWithBlob[] = React.useMemo(
        () =>
            [...ALL_MISSIONS]
                .sort((a, b) => a.id.localeCompare(b.id))
                .map((mission) => ({
                    mission,
                    blob: missionBlob(mission),
                })),
        [],
    );

    // Equipment
    const equipmentWithBlob: EquipmentWithBlob[] = React.useMemo(
        () =>
            Object.values(EQUIPMENT)
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((item) => ({
                    item,
                    blob: equipmentBlob(item),
                })),
        [],
    );

    // Abilities
    const abilitiesWithBlob: AbilityWithBlob[] = React.useMemo(() => {
        const all: AbilityWithBlob[] = [];

        for (const ability of Object.values(ABILITIES)) {
            const set = ABILITY_SETS[ability.setId];
            if (!set) continue;
            all.push({
                set,
                ability,
                blob: abilityBlob(ability, set),
            });
        }

        all.sort((a, b) => {
            const byName = a.ability.name.localeCompare(b.ability.name);
            if (byName !== 0) return byName;
            return a.set.name.localeCompare(b.set.name);
        });

        return all;
    }, []);

    // Global RetroAchievements
    const retroEntries: RetroEntry[] = React.useMemo(() => {
        const list: RetroEntry[] = [];

        for (const ach of GLOBAL_RETRO_ACHIEVEMENTS as GlobalRetroAchievement[]) {
            const missable =
                missableRetroIds.has(ach.id) || (ach as any).missable === true;
            list.push({
                id: ach.id,
                key: `retro:${ach.id}`,
                ach: {
                    id: ach.id,
                    name: ach.name,
                    description: ach.description,
                    missable,
                    category: ach.category,
                },
                blob: retroBlob(ach, missable),
            });
        }

        list.sort((a, b) => a.ach.name.localeCompare(b.ach.name));
        return list;
    }, [missableRetroIds]);

    // Bazaar
    const bazaarSections: BazaarSection[] = React.useMemo(() => {
        const withBlob: BazaarRecipeWithBlob[] = BAZAAR_RECIPES.map(
            (recipe) => ({
                recipe,
                blob: bazaarBlob(recipe),
            }),
        );

        const map = new Map<string, BazaarRecipeWithBlob[]>();
        for (const r of withBlob) {
            const key =
                (r.recipe as any).section ??
                (r.recipe as any).category ??
                (r.recipe as any).group ??
                "Miscellaneous";
            const bucket = map.get(key);
            if (bucket) {
                bucket.push(r);
            } else {
                map.set(key, [r]);
            }
        }

        return Array.from(map.entries())
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([section, recipes]) => ({
                section,
                recipes: recipes.sort((a, b) => {
                    const rankA = (a.recipe as any).rank ?? "";
                    const rankB = (b.recipe as any).rank ?? "";
                    const rc = rankA.localeCompare(rankB);
                    if (rc !== 0) return rc;
                    return a.recipe.result.localeCompare(b.recipe.result);
                }),
            }));
    }, []);

    const q = query.trim().toLowerCase();

    const filteredMissions = React.useMemo(
        () =>
            !q
                ? missionsWithBlob
                : missionsWithBlob.filter((m) => m.blob.includes(q)),
        [missionsWithBlob, q],
    );

    const filteredEquipment = React.useMemo(
        () =>
            !q
                ? equipmentWithBlob
                : equipmentWithBlob.filter((e) => e.blob.includes(q)),
        [equipmentWithBlob, q],
    );

    const filteredAbilities = React.useMemo(
        () =>
            !q
                ? abilitiesWithBlob
                : abilitiesWithBlob.filter((a) => a.blob.includes(q)),
        [abilitiesWithBlob, q],
    );

    const filteredRetros = React.useMemo(
        () =>
            !q
                ? retroEntries
                : retroEntries.filter((r) => r.blob.includes(q)),
        [retroEntries, q],
    );

    const filteredBazaarSections = React.useMemo(
        () =>
            !q
                ? bazaarSections
                : bazaarSections
                      .map((section) => {
                          const recipes = section.recipes.filter((r) =>
                              r.blob.includes(q),
                          );
                          return { ...section, recipes };
                      })
                      .filter((section) => section.recipes.length > 0),
        [bazaarSections, q],
    );

    const missionsCount = filteredMissions.length;
    const equipmentCount = filteredEquipment.length;
    const abilitiesCount = filteredAbilities.length;
    const retrosCount = filteredRetros.length;
    const bazaarCount = filteredBazaarSections.reduce(
        (acc, s) => acc + s.recipes.length,
        0,
    );

    const tabCounts: Record<TabKey, number> = {
        missions: missionsCount,
        equipment: equipmentCount,
        abilities: abilitiesCount,
        bazaar: bazaarCount,
        retros: retrosCount,
    };

    const tabLabels: Record<TabKey, string> = {
        missions: "Missions",
        equipment: "Equipment",
        abilities: "Abilities",
        bazaar: "Bazaar",
        retros: "RetroAchievements",
    };

    if (!open) {
        return (
            <button
                type="button"
                onClick={() => setOpen(true)}
                className="fixed bottom-4 right-4 z-40 inline-flex items-center gap-2 rounded-full bg-emerald-600/90 hover:bg-emerald-500 px-3 py-1.5 text-xs font-semibold text-white shadow-lg shadow-emerald-500/30 border border-emerald-300/50"
            >
                <svg
                    className="h-3.5 w-3.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.3-4.3" />
                </svg>
                <span>Global search</span>
            </button>
        );
    }

    return (
        <div className="fixed inset-0 z-40 flex items-end sm:items-center justify-center">
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={() => setOpen(false)}
            />
            <div className="relative w-full max-w-5xl max-h-[90vh] rounded-t-2xl sm:rounded-2xl bg-zinc-950/95 border border-zinc-800 shadow-2xl shadow-black/60 overflow-hidden flex flex-col">
                {/* Header */}
                <div className="flex items-center gap-3 px-4 sm:px-5 py-3 border-b border-zinc-800/80 bg-zinc-950">
                    <svg
                        className="h-4 w-4 text-emerald-300"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <circle cx="11" cy="11" r="8" />
                        <path d="m21 21-4.3-4.3" />
                    </svg>
                    <div className="flex-1 flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                            <h2 className="text-xs sm:text-sm font-semibold text-zinc-100">
                                Global search
                            </h2>
                            <span className="text-[0.6rem] uppercase tracking-[0.16em] text-emerald-300">
                                Missions • Equipment • Abilities • Bazaar • RetroAchievements
                            </span>
                        </div>
                        <div className="flex items-center gap-2 bg-zinc-900/80 border border-zinc-800/80 rounded-md px-2 py-1">
                            <svg
                                className="h-3.5 w-3.5 text-zinc-500"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <circle cx="11" cy="11" r="8" />
                                <path d="m21 21-4.3-4.3" />
                            </svg>
                            <input
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search missions, equipment, abilities, bazaar recipes, and RetroAchievements..."
                                className="bg-transparent border-none outline-none text-xs sm:text-sm text-zinc-100 placeholder:text-zinc-500 flex-1"
                                autoFocus
                            />
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={() => setOpen(false)}
                        className="ml-2 rounded-md p-1.5 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/80"
                    >
                        <svg
                            className="h-4 w-4"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M18 6 6 18" />
                            <path d="m6 6 12 12" />
                        </svg>
                    </button>
                </div>

                {/* Tabs */}
                <div className="border-b border-zinc-800/80 bg-zinc-950/90 px-4 sm:px-5">
                    <div className="flex gap-2 py-2 text-[0.7rem] sm:text-xs">
                        {(["missions", "equipment", "abilities", "bazaar", "retros"] as TabKey[]).map(
                            (key) => {
                                const active = activeTab === key;
                                const label = `${tabLabels[key]} (${tabCounts[key] ?? 0})`;
                                return (
                                    <button
                                        key={key}
                                        type="button"
                                        onClick={() => setActiveTab(key)}
                                        className={[
                                            "px-2.5 py-1 rounded-full border text-[0.7rem]",
                                            active
                                                ? "border-emerald-400 bg-emerald-500/20 text-emerald-100"
                                                : "border-zinc-700/80 bg-zinc-900/70 text-zinc-300 hover:border-zinc-500",
                                        ].join(" ")}
                                    >
                                        {label}
                                    </button>
                                );
                            },
                        )}
                    </div>
                </div>

                {/* Body */}
                <div className="flex-1 overflow-y-auto px-4 sm:px-5 py-3 space-y-3 text-[0.75rem]">
                    {/* MISSIONS */}
                    {activeTab === "missions" && (
                        <>
                            {missionsCount === 0 ? (
                                <p className="text-zinc-500">
                                    No missions match your search.
                                </p>
                            ) : (
                                <ul className="space-y-1.5">
                                    {filteredMissions.map(({ mission }) => {
                                        const isOpen =
                                            openMissions[mission.id] ?? false;
                                        const missionKey = `mission:${mission.id}`;
                                        const isMissionChecked =
                                            !!checked[missionKey];

                                        const hasDispatch =
                                            !!mission.requiredItems ||
                                            !!(
                                                mission.requiredTalents &&
                                                (mission.requiredTalents
                                                    .negotiation ||
                                                    mission.requiredTalents
                                                        .aptitude ||
                                                    mission.requiredTalents
                                                        .teamwork ||
                                                    mission.requiredTalents
                                                        .adaptability)
                                            ) ||
                                            !!(
                                                mission.dispatchRecommended &&
                                                mission.dispatchRecommended
                                                    .length > 0
                                            );

                                        const hasRewards = !!mission.rewards;
                                        const hasEnemies =
                                            mission.enemies &&
                                            mission.enemies.length > 0;

                                        const retroList =
                                            RETRO_ACHIEVEMENTS_BY_MISSION_ID[
                                                mission.id
                                            ] ?? [];
                                        const hasRetro = retroList.length > 0;

                                        const displayRank =
                                            (mission as any).rank != null
                                                ? `~${String(
                                                      (mission as any).rank,
                                                  )}`
                                                : "N/A";

                                        const arcLabel = (mission as any)
                                            .arc
                                            ? String(
                                                  (mission as any).arc,
                                              )
                                            : null;

                                        const fee = (mission as any)
                                            .fee as number | undefined;
                                        const days = (mission as any)
                                            .days as number | undefined;
                                        const members = (mission as any)
                                            .members as number | undefined;

                                        const canDispatch = Boolean(
                                            (mission as any).canDispatch,
                                        );
                                        const canCancel = Boolean(
                                            (mission as any).canCancel,
                                        );

                                        return (
                                            <li
                                                key={mission.id}
                                                className="border border-zinc-800/80 rounded-md bg-zinc-950/60"
                                            >
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setOpenMissions(
                                                            (prev) => ({
                                                                ...prev,
                                                                [mission.id]:
                                                                    !isOpen,
                                                            }),
                                                        )
                                                    }
                                                    className="w-full px-2.5 py-2 flex items-center justify-between gap-2 text-left"
                                                >
                                                    <div className="flex flex-col gap-0.5">
                                                        <div className="flex flex-wrap items-center gap-1.5">
                                                            <span className="text-[0.65rem] font-mono text-zinc-400">
                                                                {mission.id}
                                                            </span>
                                                            <span className="font-semibold text-zinc-50">
                                                                {mission.name}
                                                            </span>
                                                        </div>
                                                        <div className="flex flex-wrap items-center gap-1.5">
                                                            {mission.questType && (
                                                                <span className="inline-flex items-center rounded-full bg-zinc-900/80 border border-zinc-700/80 px-1.5 py-px text-[0.6rem] tracking-[0.14em] text-zinc-300">
                                                                    Type: {
                                                                        mission.questType
                                                                    }
                                                                </span>
                                                            )}
                                                            {mission.region && (
                                                                <span className="inline-flex items-center rounded-full bg-zinc-900/80 border border-zinc-700/80 px-1.5 py-px text-[0.6rem] tracking-[0.14em] text-zinc-300">
                                                                    Region: {
                                                                        mission.region
                                                                    }
                                                                </span>
                                                            )}
                                                            <span className="inline-flex items-center rounded-full border border-amber-500/80 bg-amber-500/10 px-1.5 py-px text-[0.6rem] font-semibold tracking-[0.14em] text-zinc-300">
                                                                Rec. Lv.: {displayRank}
                                                            </span>
                                                            {mission.missable && (
                                                                <span className="inline-flex items-center rounded-full border border-rose-400/70 bg-rose-500/10 px-1.5 py-px text-[0.6rem] font-semibold tracking-[0.14em] text-rose-300">
                                                                    Missable
                                                                </span>
                                                            )}
                                                        </div>
                                                        {(fee != null ||
                                                            days != null ||
                                                            members != null ||
                                                            canDispatch ||
                                                            canCancel) && (
                                                            <div className="flex flex-wrap items-center gap-2 text-[0.65rem] text-zinc-400">
                                                                {fee != null && (
                                                                    <span>
                                                                        Fee:{" "}
                                                                        <span className="text-zinc-100 font-medium">
                                                                            {fee} gil
                                                                        </span>
                                                                    </span>
                                                                )}
                                                                {days != null && (
                                                                    <span>
                                                                        Days:{" "}
                                                                        <span className="text-zinc-100 font-medium">
                                                                            {days}
                                                                        </span>
                                                                    </span>
                                                                )}
                                                                {members != null && (
                                                                    <span>
                                                                        Members:{" "}
                                                                        <span className="text-zinc-100 font-medium">
                                                                            {
                                                                                members
                                                                            }
                                                                        </span>
                                                                    </span>
                                                                )}
                                                                {canDispatch && (
                                                                    <span className="text-emerald-300">
                                                                        Dispatch OK
                                                                    </span>
                                                                )}
                                                                {canCancel && (
                                                                    <span className="text-zinc-300">
                                                                        Cancelable
                                                                    </span>
                                                                )}
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <input
                                                            type="checkbox"
                                                            aria-label="Mark mission complete"
                                                            className="h-3.5 w-3.5 rounded border-zinc-500 text-emerald-500 focus:ring-emerald-500/70"
                                                            checked={isMissionChecked}
                                                            onChange={() => {
                                                                setCheck(
                                                                    missionKey,
                                                                );
                                                                if (
                                                                    !isMissionChecked
                                                                ) {
                                                                    setOpenMissions(
                                                                        (
                                                                            prev,
                                                                        ) => ({
                                                                            ...prev,
                                                                            [mission
                                                                                .id]:
                                                                                false,
                                                                        }),
                                                                    );
                                                                }
                                                            }}
                                                            onClick={(e) =>
                                                                e.stopPropagation()
                                                            }
                                                        />
                                                        <span className="flex items-center gap-1 text-[0.65rem] text-zinc-400">
                                                            <span>
                                                            </span>
                                                            {renderChevron(
                                                                isOpen,
                                                            )}
                                                        </span>
                                                    </div>
                                                </button>

                                                {isOpen && (
                                                    <div className="px-2.5 pb-2 pt-0.5 space-y-2 border-t border-zinc-800/80">
                                                        {mission.description && (
                                                            <p className="text-zinc-300 text-[0.75rem]">
                                                                {
                                                                    mission.description
                                                                }
                                                            </p>
                                                        )}

                                                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-[0.7rem] text-zinc-100">
                                                        {(mission as any).objective && (
                                                            <div>
                                                                <span className="text-zinc-400">Objective:</span>{" "}
                                                                <span className="font-medium">{(mission as any).objective}</span>
                                                            </div>
                                                        )}

                                                        {(mission as any).law && (
                                                            <div>
                                                                <span className="text-zinc-400">Law:</span>{" "}
                                                                <span className="font-medium">{(mission as any).law}</span>
                                                            </div>
                                                        )}
                                                    </div>


                                                        {(mission as any)
                                                            .strategy ||
                                                        (mission as any).notes ? (
                                                            <CollapsibleSection title="Strategy & notes">
                                                                {(mission as any)
                                                                    .strategy && (
                                                                    <div className="space-y-0.5">
                                                                        <div className="text-zinc-400 text-[0.7rem]">
                                                                            Strategy
                                                                        </div>
                                                                        <p className="text-[0.7rem] text-zinc-100">
                                                                            {
                                                                                (
                                                                                    mission as any
                                                                                )
                                                                                    .strategy.join(" ")
                                                                            }
                                                                        </p>
                                                                    </div>
                                                                )}
                                                                {(mission as any)
                                                                    .notes && (
                                                                    <div className="space-y-0.5">
                                                                        <div className="text-zinc-400 text-[0.7rem]">
                                                                            Notes
                                                                        </div>
                                                                        <p className="text-[0.7rem] text-zinc-100">
                                                                            {
                                                                                (
                                                                                    mission as any
                                                                                )
                                                                                    .notes
                                                                            }
                                                                        </p>
                                                                    </div>
                                                                )}
                                                            </CollapsibleSection>
                                                        ) : null}

                                                        {hasDispatch && (
                                                            <CollapsibleSection title="Requirements">
                                                                {mission.requiredItems && (
                                                                    <div>
                                                                        <span className="text-zinc-400">
                                                                            Required items:
                                                                        </span>{" "}
                                                                        <span className="font-medium">
                                                                            {mission.requiredItems.join(
                                                                                ", ",
                                                                            )}
                                                                        </span>
                                                                    </div>
                                                                )}
                                                                {mission
                                                                    .requiredTalents && (
                                                                    <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-1">
                                                                        {mission
                                                                            .requiredTalents
                                                                            .negotiation > 0 && (
                                                                            <div>
                                                                                <span className="text-zinc-400">
                                                                                    Negotiation:
                                                                                </span>{" "}
                                                                                <span className="font-medium">
                                                                                    {
                                                                                        mission
                                                                                            .requiredTalents
                                                                                            .negotiation
                                                                                    }
                                                                                </span>
                                                                            </div>
                                                                        )}
                                                                        {mission
                                                                            .requiredTalents
                                                                            .aptitude > 0 && (
                                                                            <div>
                                                                                <span className="text-zinc-400">
                                                                                    Aptitude:
                                                                                </span>{" "}
                                                                                <span className="font-medium">
                                                                                    {
                                                                                        mission
                                                                                            .requiredTalents
                                                                                            .aptitude
                                                                                    }
                                                                                </span>
                                                                            </div>
                                                                        )}
                                                                        {mission
                                                                            .requiredTalents
                                                                            .teamwork > 0 && (
                                                                            <div>
                                                                                <span className="text-zinc-400">
                                                                                    Teamwork:
                                                                                </span>{" "}
                                                                                <span className="font-medium">
                                                                                    {
                                                                                        mission
                                                                                            .requiredTalents
                                                                                            .teamwork
                                                                                    }
                                                                                </span>
                                                                            </div>
                                                                        )}
                                                                        {mission
                                                                            .requiredTalents
                                                                            .adaptability > 0 && (
                                                                            <div>
                                                                                <span className="text-zinc-400">
                                                                                    Adaptability:
                                                                                </span>{" "}
                                                                                <span className="font-medium">
                                                                                    {
                                                                                        mission
                                                                                            .requiredTalents
                                                                                            .adaptability
                                                                                    }
                                                                                </span>
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                )}
                                                                {mission
                                                                    .dispatchRecommended &&
                                                                    mission
                                                                        .dispatchRecommended
                                                                        .length >
                                                                        0 && (
                                                                        <div className="mt-1">
                                                                            <span className="text-zinc-400">
                                                                                Recommended jobs:
                                                                            </span>{" "}
                                                                            <span className="font-medium">
                                                                                {mission.dispatchRecommended.join(
                                                                                    ", ",
                                                                                )}
                                                                            </span>
                                                                        </div>
                                                                    )}
                                                            </CollapsibleSection>
                                                        )}

                                                        {hasRewards && (
                                                            <CollapsibleSection title="Rewards">
                                                                {mission
                                                                    .rewards
                                                                    ?.gil !=
                                                                    null && (
                                                                    <div className="flex justify-between gap-2">
                                                                        <span className="text-zinc-400">
                                                                            Gil
                                                                        </span>
                                                                        <span className="font-medium">
                                                                            {
                                                                                mission
                                                                                    .rewards
                                                                                    .gil
                                                                            }
                                                                        </span>
                                                                    </div>
                                                                )}
                                                                {(mission.rewards as any)
                                                                    ?.cp != null && (
                                                                    <div className="flex justify-between gap-2">
                                                                        <span className="text-zinc-400">
                                                                            Clan points
                                                                        </span>
                                                                        <span className="font-medium">
                                                                            {
                                                                                (mission.rewards as any)
                                                                                    .cp
                                                                            }
                                                                        </span>
                                                                    </div>
                                                                )}
                                                                {mission
                                                                    .rewards
                                                                    ?.loot && (
                                                                    <div className="flex justify-between gap-2">
                                                                        <span className="text-zinc-400">
                                                                            Items
                                                                        </span>
                                                                        <span className="font-medium text-right">
                                                                            {mission.rewards.loot}
                                                                        </span>
                                                                    </div>
                                                                )}
                                                                {mission
                                                                    .rewards
                                                                    ?.abilities && (
                                                                    <div className="flex justify-between gap-2">
                                                                        <span className="text-zinc-400">
                                                                            Abilities
                                                                        </span>
                                                                        <span className="font-medium text-right">
                                                                            {mission.rewards.abilities.join(
                                                                                ", ",
                                                                            )}
                                                                        </span>
                                                                    </div>
                                                                )}
                                                                {(mission.rewards as any)
                                                                    ?.other && (
                                                                    <div className="flex justify-between gap-2">
                                                                        <span className="text-zinc-400">
                                                                            Other
                                                                        </span>
                                                                        <span className="font-medium text-right">
                                                                            {
                                                                                (mission.rewards as any)
                                                                                    .other
                                                                            }
                                                                        </span>
                                                                    </div>
                                                                )}
                                                            </CollapsibleSection>
                                                        )}

                                                        {hasRetro && (
                                                            <CollapsibleSection title="Retro Achievements">
                                                                <ul className="space-y-0.75 text-[0.7rem]">
                                                                    {retroList.map(
                                                                        (
                                                                            ach: any,
                                                                        ) => {
                                                                            const key = `retro:${ach.id}`;
                                                                            const isChecked =
                                                                                !!checked[
                                                                                    key
                                                                                ];

                                                                            return (
                                                                                <li
                                                                                    key={
                                                                                        ach.id
                                                                                    }
                                                                                >
                                                                                    <label className="flex items-start gap-2 cursor-pointer">
                                                                                        <input
                                                                                            type="checkbox"
                                                                                            className="mt-0.5 h-3.5 w-3.5 rounded border-zinc-400 text-emerald-500 focus:ring-emerald-500/70"
                                                                                            checked={
                                                                                                isChecked
                                                                                            }
                                                                                            onChange={(
                                                                                                e,
                                                                                            ) =>
                                                                                                setCheck(
                                                                                                    key,
                                                                                                    e
                                                                                                        .target
                                                                                                        .checked,
                                                                                                )
                                                                                            }
                                                                                            onClick={(
                                                                                                e,
                                                                                            ) =>
                                                                                                e.stopPropagation()
                                                                                            }
                                                                                        />
                                                                                        <div>
                                                                                            <div className="flex flex-wrap items-center gap-1">
                                                                                                <span className="font-medium">
                                                                                                    {
                                                                                                        ach.name
                                                                                                    }
                                                                                                </span>
                                                                                                {ach.missable && (
                                                                                                    <span className="inline-flex items-center rounded-full border border-rose-400/70 bg-rose-500/10 px-1.5 py-px text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-rose-300">
                                                                                                        Missable
                                                                                                    </span>
                                                                                                )}
                                                                                            </div>
                                                                                            <p className="text-zinc-300 text-[0.7rem]">
                                                                                                {
                                                                                                    ach.description
                                                                                                }
                                                                                            </p>
                                                                                        </div>
                                                                                    </label>
                                                                                </li>
                                                                            );
                                                                        },
                                                                    )}
                                                                </ul>
                                                            </CollapsibleSection>
                                                        )}

                                                        {hasEnemies && (
                                                            <CollapsibleSection title="Enemies">
                                                                <ul className="space-y-1.25 text-[0.7rem] text-zinc-100">
                                                                    {mission.enemies!.map((enemy, idx) => {
                                                                        const loadout = resolveEnemyLoadout(enemy.abilities);
                                                                        const equip = resolveEnemyEquipment(enemy.equipment) ?? [];
                                                                        const meta = getEnemyMetaForJob(enemy.job);

                                                                        const hasAbilities =
                                                                            !!loadout &&
                                                                            !!(loadout.A1 || loadout.A2 || loadout.R || loadout.P);

                                                                        const hasEquipment = equip.length > 0;

                                                                        const hasAffinities =
                                                                            (meta?.absorb?.length ?? 0) > 0 ||
                                                                            (meta?.immune?.length ?? 0) > 0 ||
                                                                            (meta?.half?.length ?? 0) > 0 ||
                                                                            (meta?.weak?.length ?? 0) > 0;

                                                                        const quantity = (enemy as any).quantity ?? 1;

                                                                        const enemyKey = `${mission.id}:${idx}`;
                                                                        const isEnemyOpen = openEnemies[enemyKey] ?? false;

                                                                        const showDetails =
                                                                            isEnemyOpen &&
                                                                            (hasAbilities || hasEquipment || hasAffinities);

                                                                        return (
                                                                            <li
                                                                                key={enemy.name ?? `${mission.id}-enemy-${idx}`}
                                                                                className="border border-zinc-800/80 rounded-md bg-zinc-950/50 px-2 py-1.5"
                                                                            >
                                                                                {/* Header row: name, race, job, quantity, notes, toggle */}
                                                                                <div className="flex flex-wrap items-center justify-between gap-2">
                                                                                    <div className="flex flex-wrap items-center gap-1.5">
                                                                                        <span className="font-semibold text-zinc-50">
                                                                                            {enemy.name ?? `Enemy ${idx + 1}`}
                                                                                        </span>

                                                                                        {enemy.race && (
                                                                                            <span className="inline-flex items-center rounded-full bg-zinc-900/80 border border-zinc-700/80 px-1.5 py-px text-[0.6rem] uppercase tracking-[0.14em] text-zinc-300">
                                                                                                {enemy.race}
                                                                                            </span>
                                                                                        )}

                                                                                        {enemy.job && (
                                                                                            <span className="inline-flex items-center rounded-full bg-zinc-900/80 border border-zinc-700/80 px-1.5 py-px text-[0.6rem] uppercase tracking-[0.14em] text-zinc-300">
                                                                                                {enemy.job}
                                                                                            </span>
                                                                                        )}

                                                                                        {quantity > 1 && (
                                                                                            <span className="inline-flex items-center rounded-full border border-zinc-700/80 px-1.5 py-px text-[0.6rem] uppercase tracking-[0.14em] text-zinc-300">
                                                                                                ×{quantity}
                                                                                            </span>
                                                                                        )}

                                                                                        {enemy.notes && (
                                                                                            <span className="text-[0.65rem] text-zinc-400">
                                                                                                {enemy.notes}
                                                                                            </span>
                                                                                        )}
                                                                                    </div>

                                                                                    {(hasAbilities || hasEquipment || hasAffinities) && (
                                                                                        <button
                                                                                            type="button"
                                                                                            onClick={(e) => {
                                                                                                e.stopPropagation();
                                                                                                setOpenEnemies((prev) => ({
                                                                                                    ...prev,
                                                                                                    [enemyKey]: !isEnemyOpen,
                                                                                                }));
                                                                                            }}
                                                                                            className="text-[0.65rem] text-zinc-400 inline-flex items-center gap-1"
                                                                                        >
                                                                                            <span>
                                                                                                {isEnemyOpen
                                                                                                    ? "Hide loadout"
                                                                                                    : "Show loadout"}
                                                                                            </span>
                                                                                            {renderChevron(isEnemyOpen)}
                                                                                        </button>
                                                                                    )}
                                                                                </div>

                                                                                {/* Bestiary description (always visible) */}
                                                                                {meta?.description && (
                                                                                    <div className="mt-0.5 text-[0.65rem] text-zinc-300">
                                                                                        {meta.description}
                                                                                    </div>
                                                                                )}

                                                                                {/* Details: affinities + abilities + equipment (only when enemy is expanded) */}
                                                                                {showDetails && (
                                                                                    <div className="mt-1.5 space-y-1.25">
                                                                                        {/* Affinities – same styling as MissionCard, only when expanded */}
                                                                                        {hasAffinities && (
                                                                                            <div className="text-[0.65rem] text-zinc-300 flex flex-wrap gap-x-4 gap-y-0.5">
                                                                                                {(meta?.absorb?.length ?? 0) > 0 && (
                                                                                                    <div>
                                                                                                        <span className="text-zinc-400">
                                                                                                            Absorb:
                                                                                                        </span>{" "}
                                                                                                        <span className="font-medium">
                                                                                                            {meta!.absorb!.join(", ")}
                                                                                                        </span>
                                                                                                    </div>
                                                                                                )}
                                                                                                {(meta?.immune?.length ?? 0) > 0 && (
                                                                                                    <div>
                                                                                                        <span className="text-zinc-400">
                                                                                                            Immune:
                                                                                                        </span>{" "}
                                                                                                        <span className="font-medium">
                                                                                                            {meta!.immune!.join(", ")}
                                                                                                        </span>
                                                                                                    </div>
                                                                                                )}
                                                                                                {(meta?.half?.length ?? 0) > 0 && (
                                                                                                    <div>
                                                                                                        <span className="text-zinc-400">
                                                                                                            Resists:
                                                                                                        </span>{" "}
                                                                                                        <span className="font-medium">
                                                                                                            {meta!.half!.join(", ")}
                                                                                                        </span>
                                                                                                    </div>
                                                                                                )}
                                                                                                {(meta?.weak?.length ?? 0) > 0 && (
                                                                                                    <div>
                                                                                                        <span className="text-zinc-400">
                                                                                                            Weak:
                                                                                                        </span>{" "}
                                                                                                        <span className="font-medium">
                                                                                                            {meta!.weak!.join(", ")}
                                                                                                        </span>
                                                                                                    </div>
                                                                                                )}
                                                                                            </div>
                                                                                        )}

                                                                                        {(hasAbilities || hasEquipment) && (
                                                                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                                                                                {/* ───────── ABILITIES COLUMN ───────── */}
                                                                                                {hasAbilities && loadout && (
                                                                                                    <div className="space-y-1.5">
                                                                                                        <div className="font-semibold text-zinc-200">
                                                                                                            Abilities
                                                                                                        </div>

                                                                                                        {/* A1 */}
                                                                                                        {loadout.A1 && (
                                                                                                            <div
                                                                                                                className="
                                                                                                                    border border-zinc-800/80
                                                                                                                    rounded-md
                                                                                                                    bg-zinc-950/50
                                                                                                                    p-2
                                                                                                                    space-y-0.5
                                                                                                                "
                                                                                                            >
                                                                                                                <div className="font-medium">
                                                                                                                    A1: {loadout.A1.setName}
                                                                                                                </div>
                                                                                                                {loadout.A1
                                                                                                                    .setDescription && (
                                                                                                                    <div className="text-zinc-300">
                                                                                                                        {
                                                                                                                            loadout.A1
                                                                                                                                .setDescription
                                                                                                                        }
                                                                                                                    </div>
                                                                                                                )}
                                                                                                                <ul className="list-disc list-inside space-y-0.5">
                                                                                                                    {loadout.A1.abilities.map(
                                                                                                                        (ab) => {
                                                                                                                            const abilityMeta = ABILITIES[ab.id];
                                                                                                                            const isBlueMagic = abilityMeta?.blueMagic === true;
                                                                                                                            return (
                                                                                                                                <li
                                                                                                                                    key={
                                                                                                                                        ab.id
                                                                                                                                    }
                                                                                                                                >
                                                                                                                                    <span className="font-medium">
                                                                                                                                        {
                                                                                                                                            ab.name
                                                                                                                                        }
                                                                                                                                    </span>
                                                                                                                                    {isBlueMagic && (
                                                                                                                                        <span className="ml-1.5 inline-flex items-center rounded-full bg-blue-900/40 border border-blue-500/70 px-1.5 py-px text-[0.55rem] uppercase tracking-[0.14em] text-blue-200">
                                                                                                                                            Blue Magic
                                                                                                                                        </span>
                                                                                                                                    )}
                                                                                                                                    {ab.description && (
                                                                                                                                        <span className="text-zinc-300">
                                                                                                                                            {": "}
                                                                                                                                            {
                                                                                                                                                ab.description
                                                                                                                                            }
                                                                                                                                        </span>
                                                                                                                                    )}
                                                                                                                                </li>
                                                                                                                            );
                                                                                                                        },
                                                                                                                    )}
                                                                                                                </ul>
                                                                                                            </div>
                                                                                                        )}

                                                                                                        {/* A2 */}
                                                                                                        {loadout.A2 && (
                                                                                                            <div
                                                                                                                className="
                                                                                                                    border border-zinc-800/80
                                                                                                                    rounded-md
                                                                                                                    bg-zinc-950/50
                                                                                                                    p-2
                                                                                                                    space-y-0.5
                                                                                                                "
                                                                                                            >
                                                                                                                <div className="font-medium">
                                                                                                                    A2: {loadout.A2.setName}
                                                                                                                </div>
                                                                                                                <ul className="list-disc list-inside space-y-0.5">
                                                                                                                    {loadout.A2.abilities.map(
                                                                                                                        (ab) => {
                                                                                                                            const abilityMeta = ABILITIES[ab.id];
                                                                                                                            const isBlueMagic = abilityMeta?.blueMagic === true;
                                                                                                                            return (
                                                                                                                                <li
                                                                                                                                    key={
                                                                                                                                        ab.id
                                                                                                                                    }
                                                                                                                                >
                                                                                                                                    <span className="font-medium">
                                                                                                                                        {
                                                                                                                                            ab.name
                                                                                                                                        }
                                                                                                                                    </span>
                                                                                                                                    {isBlueMagic && (
                                                                                                                                        <span className="ml-1.5 inline-flex items-center rounded-full bg-blue-900/40 border border-blue-500/70 px-1.5 py-px text-[0.55rem] uppercase tracking-[0.14em] text-blue-200">
                                                                                                                                            Blue Magic
                                                                                                                                        </span>
                                                                                                                                    )}
                                                                                                                                    {ab.description && (
                                                                                                                                        <span className="text-zinc-300">
                                                                                                                                            {": "}
                                                                                                                                            {
                                                                                                                                                ab.description
                                                                                                                                            }
                                                                                                                                        </span>
                                                                                                                                    )}
                                                                                                                                </li>
                                                                                                                            );
                                                                                                                        },
                                                                                                                    )}
                                                                                                                </ul>
                                                                                                            </div>
                                                                                                        )}

                                                                                                        {/* R */}
                                                                                                        {loadout.R && (
                                                                                                            <div
                                                                                                                className="
                                                                                                                    border border-zinc-800/80
                                                                                                                    rounded-md
                                                                                                                    bg-zinc-950/50
                                                                                                                    p-2
                                                                                                                "
                                                                                                            >
                                                                                                                <span className="font-medium">
                                                                                                                    R: {loadout.R.name}
                                                                                                                </span>
                                                                                                                {loadout.R.description && (
                                                                                                                    <span className="text-zinc-300">
                                                                                                                        {": "}
                                                                                                                        {
                                                                                                                            loadout.R
                                                                                                                                .description
                                                                                                                        }
                                                                                                                    </span>
                                                                                                                )}
                                                                                                            </div>
                                                                                                        )}

                                                                                                        {/* P */}
                                                                                                        {loadout.P && (
                                                                                                            <div
                                                                                                                className="
                                                                                                                    border border-zinc-800/80
                                                                                                                    rounded-md
                                                                                                                    bg-zinc-950/50
                                                                                                                    p-2
                                                                                                                "
                                                                                                            >
                                                                                                                <span className="font-medium">
                                                                                                                    P: {loadout.P.name}
                                                                                                                </span>
                                                                                                                {loadout.P.description && (
                                                                                                                    <span className="text-zinc-300">
                                                                                                                        {": "}
                                                                                                                        {
                                                                                                                            loadout.P
                                                                                                                                .description
                                                                                                                        }
                                                                                                                    </span>
                                                                                                                )}
                                                                                                            </div>
                                                                                                        )}
                                                                                                    </div>
                                                                                                )}

                                                                                                {/* ───────── EQUIPMENT COLUMN ───────── */}
                                                                                                {hasEquipment && (
                                                                                                    <div className="space-y-0.75">
                                                                                                        <div className="font-semibold text-zinc-200">
                                                                                                            Equipment
                                                                                                        </div>

                                                                                                        <ul className="space-y-0.75">
                                                                                                            {equip.map((item) => (
                                                                                                                <li
                                                                                                                    key={item.slot}
                                                                                                                    className="
                                                                                                                        border border-zinc-800/80
                                                                                                                        rounded-md
                                                                                                                        bg-zinc-950/50
                                                                                                                        p-1.5
                                                                                                                        space-y-0.25
                                                                                                                    "
                                                                                                                >
                                                                                                                    <div>
                                                                                                                        <span className="font-medium">
                                                                                                                            Slot{" "}
                                                                                                                            {
                                                                                                                                item.slot
                                                                                                                            }
                                                                                                                            :
                                                                                                                        </span>{" "}
                                                                                                                        <span>
                                                                                                                            {
                                                                                                                                item.name
                                                                                                                            }
                                                                                                                        </span>
                                                                                                                        {item.category && (
                                                                                                                            <span className="ml-1 text-zinc-400">
                                                                                                                                (
                                                                                                                                {
                                                                                                                                    item.category
                                                                                                                                }
                                                                                                                                )
                                                                                                                            </span>
                                                                                                                        )}
                                                                                                                    </div>

                                                                                                                    {item.description && (
                                                                                                                        <div className="text-zinc-400">
                                                                                                                            {
                                                                                                                                item.description
                                                                                                                            }
                                                                                                                        </div>
                                                                                                                    )}

                                                                                                                    {item.teaches && (
                                                                                                                        <div className="ml-3 text-zinc-400 text-[0.65rem]">
                                                                                                                            <div className="font-medium text-zinc-300">
                                                                                                                                Teaches:
                                                                                                                            </div>
                                                                                                                            <ul className="list-disc list-inside">
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
                                                                                                                                                        const ability =
                                                                                                                                                            ABILITIES[
                                                                                                                                                                id
                                                                                                                                                            ];
                                                                                                                                                        if (
                                                                                                                                                            !ability
                                                                                                                                                        )
                                                                                                                                                            return id;
                                                                                                                                                        const set =
                                                                                                                                                            ABILITY_SETS[
                                                                                                                                                                ability
                                                                                                                                                                    .setId
                                                                                                                                                            ];
                                                                                                                                                        const setName =
                                                                                                                                                            set?.name ??
                                                                                                                                                            ability
                                                                                                                                                                .setId;
                                                                                                                                                        return `${ability.name} (${setName})`;
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
                                                                                                            ))}
                                                                                                        </ul>
                                                                                                    </div>
                                                                                                )}
                                                                                            </div>
                                                                                        )}
                                                                                    </div>
                                                                                )}
                                                                            </li>
                                                                        );
                                                                    })}
                                                                </ul>
                                                            </CollapsibleSection>
                                                        )}

                                                    </div>
                                                )}
                                            </li>
                                        );
                                    })}
                                </ul>
                            )}
                        </>
                    )}

                    {/* EQUIPMENT */}
                    {activeTab === "equipment" && (
                        <>
                            {equipmentCount === 0 ? (
                                <p className="text-zinc-500">
                                    No equipment matches your search.
                                </p>
                            ) : (
                                <ul className="space-y-1.5">
                                    {filteredEquipment.map(({ item }) => {
                                        const isOpen =
                                            openEquipment[item.id] ?? false;

                                        const statsSource: any = item;
                                        const hasAnyStats = [
                                            "atk",
                                            "def",
                                            "mag",
                                            "rst",
                                            "eva",
                                            "spd",
                                            "jump",
                                            "move",
                                            "hp",
                                            "mp",
                                        ].some(
                                            (key) =>
                                                statsSource[key] != null &&
                                                statsSource[key] !== 0,
                                        );

                                        // Build subtype label (Category – WeaponType, etc.)
                                        const subtypeParts: string[] = [];
                                        if ((item as any).category) {
                                            subtypeParts.push(
                                                String(
                                                    (item as any).category,
                                                ),
                                            );
                                        }
                                        if ((item as any).weaponType) {
                                            subtypeParts.push(
                                                String(
                                                    (item as any).weaponType,
                                                ),
                                            );
                                        }
                                        if ((item as any).armorType) {
                                            subtypeParts.push(
                                                String(
                                                    (item as any).armorType,
                                                ),
                                            );
                                        }
                                        if ((item as any).helmetType) {
                                            subtypeParts.push(
                                                String(
                                                    (item as any).helmetType,
                                                ),
                                            );
                                        }
                                        if ((item as any).shieldType) {
                                            subtypeParts.push(
                                                String(
                                                    (item as any).shieldType,
                                                ),
                                            );
                                        }
                                        if ((item as any).accessoryType) {
                                            subtypeParts.push(
                                                String(
                                                    (item as any)
                                                        .accessoryType,
                                                ),
                                            );
                                        }
                                        const subtypeLabel =
                                            subtypeParts.length > 0
                                                ? subtypeParts.join(" – ")
                                                : null;

                                        const hasBasics =
                                            !!subtypeLabel ||
                                            !!(item as any).bazaar_category ||
                                            (item as any).price != null;

                                        const hasEffects =
                                            ((item as any).immunity &&
                                                (item as any).immunity
                                                    .length > 0) ||
                                            ((item as any).absorb &&
                                                (item as any).absorb.length >
                                                    0) ||
                                            ((item as any)["half-damage"] &&
                                                (item as any)[
                                                    "half-damage"
                                                ].length > 0) ||
                                            ((item as any).status &&
                                                (item as any).status.length > 0) ||
                                            ((item as any).element &&
                                                (item as any).element.length > 0) ||
                                            ((item as any).weak &&
                                                (item as any).weak.length > 0);

                                        const teaches =
                                            (item as any)
                                                .teaches as
                                                | Record<string, string[]>
                                                | undefined;
                                        const hasTeaches =
                                            teaches &&
                                            Object.keys(teaches).length > 0;

                                        // Check for weapon/equipment rules
                                        const ruleDetails = buildRuleDetails(item);
                                        const hasRules = !!ruleDetails && Object.keys(ruleDetails).length > 0;

                                        // Check for range/movement bonuses
                                        const hasRangeMovement = 
                                            (item as any).rangeMin != null ||
                                            (item as any).rangeMax != null ||
                                            (item as any).moveBonus != null ||
                                            (item as any).jumpBonus != null;

                                        // Check for additional effect
                                        const hasAdditionalEffect = !!(item as any).additionalEffect;

                                        // Check for gender restriction
                                        const hasGenderRestriction = !!(item as any).gender;

                                        // Build modules in the same style as BazaarPanel:
                                        // BASICS / STATS / EFFECTS / TEACHES cards
                                        const modules: {
                                            key: string;
                                            content: JSX.Element;
                                        }[] = [];

                                        if (hasBasics) {
                                            modules.push({
                                                key: "basics",
                                                content: (
                                                    <>
                                                        <h4 className="text-[0.7rem] sm:text-xs font-semibold tracking-[0.16em] text-zinc-400 mb-1.5">
                                                            <u>BASICS</u>
                                                        </h4>
                                                        <div className="space-y-1 text-[0.7rem] sm:text-xs text-zinc-200">
                                                            {subtypeLabel && (
                                                                <div className="flex justify-between gap-2">
                                                                    <span className="text-zinc-400">
                                                                        Category
                                                                    </span>
                                                                    <span className="font-medium text-right">
                                                                        {
                                                                            subtypeLabel
                                                                        }
                                                                    </span>
                                                                </div>
                                                            )}
                                                            {(item as any)
                                                                .bazaar_category && (
                                                                <div className="flex justify-between gap-2">
                                                                    <span className="text-zinc-400">
                                                                        Bazaar
                                                                    </span>
                                                                    <span className="font-medium text-right">
                                                                        {
                                                                            (item as any)
                                                                                .bazaar_category
                                                                        }
                                                                    </span>
                                                                </div>
                                                            )}
                                                            {(item as any)
                                                                .price !=
                                                                null && (
                                                                <div className="flex justify-between gap-2">
                                                                    <span className="text-zinc-400">
                                                                        Purchase
                                                                    </span>
                                                                    <span className="font-medium text-right">
                                                                        {
                                                                            (item as any)
                                                                                .price
                                                                        }{" "}
                                                                        gil
                                                                    </span>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </>
                                                ),
                                            });
                                        }

                                        if (hasAnyStats) {
                                            modules.push({
                                                key: "stats",
                                                content: (
                                                    <>
                                                        <h4 className="text-[0.7rem] sm:text-xs font-semibold tracking-[0.16em] text-zinc-400 mb-1.5">
                                                            <u>STATS</u>
                                                        </h4>
                                                        <div className="grid grid-cols-3 gap-x-3 gap-y-0.5 text-[0.7rem] sm:text-xs text-zinc-200">
                                                            {[
                                                                "atk",
                                                                "def",
                                                                "mag",
                                                                "rst",
                                                                "eva",
                                                                "spd",
                                                                "jump",
                                                                "move",
                                                                "hp",
                                                                "mp",
                                                            ].map((key) =>
                                                                statsSource[
                                                                    key
                                                                ] != null &&
                                                                statsSource[
                                                                    key
                                                                ] !== 0 ? (
                                                                    <div
                                                                        key={
                                                                            key
                                                                        }
                                                                    >
                                                                        <span className="text-zinc-400">
                                                                            {key.toUpperCase()}
                                                                            :
                                                                        </span>{" "}
                                                                        <span className="font-medium">
                                                                            {
                                                                                statsSource[
                                                                                    key
                                                                                ]
                                                                            }
                                                                        </span>
                                                                    </div>
                                                                ) : null,
                                                            )}
                                                        </div>
                                                    </>
                                                ),
                                            });
                                        }

                                        if (hasEffects) {
                                            modules.push({
                                                key: "effects",
                                                content: (
                                                    <>
                                                        <h4 className="text-[0.7rem] sm:text-xs font-semibold tracking-[0.16em] text-zinc-400 mb-1.5">
                                                            <u>EFFECTS</u>
                                                        </h4>
                                                        <div className="space-y-1 text-[0.7rem] sm:text-xs text-zinc-200">
                                                            {(item as any)
                                                                .immunity &&
                                                                (
                                                                    item as any
                                                                ).immunity
                                                                    .length >
                                                                    0 && (
                                                                    <div>
                                                                        <span className="text-zinc-400">
                                                                            Immunity:
                                                                        </span>{" "}
                                                                        <span className="font-medium">
                                                                            {(
                                                                                item as any
                                                                            ).immunity.join(
                                                                                ", ",
                                                                            )}
                                                                        </span>
                                                                    </div>
                                                                )}
                                                            {(item as any)
                                                                .absorb &&
                                                                (
                                                                    item as any
                                                                ).absorb
                                                                    .length >
                                                                    0 && (
                                                                    <div>
                                                                        <span className="text-zinc-400">
                                                                            Absorb:
                                                                        </span>{" "}
                                                                        <span className="font-medium">
                                                                            {(
                                                                                item as any
                                                                            ).absorb.join(
                                                                                ", ",
                                                                            )}
                                                                        </span>
                                                                    </div>
                                                                )}
                                                            {(item as any)[
                                                                "half-damage"
                                                            ] &&
                                                                (item as any)[
                                                                    "half-damage"
                                                                ].length >
                                                                    0 && (
                                                                    <div>
                                                                        <span className="text-zinc-400">
                                                                            Half
                                                                            damage:
                                                                        </span>{" "}
                                                                        <span className="font-medium">
                                                                            {(
                                                                                item as any
                                                                            )[
                                                                                "half-damage"
                                                                            ].join(
                                                                                ", ",
                                                                            )}
                                                                        </span>
                                                                    </div>
                                                                )}
                                                            {(item as any)
                                                                .status &&
                                                                (
                                                                    item as any
                                                                ).status
                                                                    .length >
                                                                    0 && (
                                                                    <div>
                                                                        <span className="text-zinc-400">
                                                                            Status:
                                                                        </span>{" "}
                                                                        <span className="font-medium">
                                                                            {(
                                                                                item as any
                                                                            ).status.join(
                                                                                ", ",
                                                                            )}
                                                                        </span>
                                                                    </div>
                                                                )}
                                                            {(item as any)
                                                                .element &&
                                                                (
                                                                    item as any
                                                                ).element
                                                                    .length >
                                                                    0 && (
                                                                    <div>
                                                                        <span className="text-zinc-400">
                                                                            Element:
                                                                        </span>{" "}
                                                                        <span className="font-medium">
                                                                            {(
                                                                                item as any
                                                                            ).element.join(
                                                                                ", ",
                                                                            )}
                                                                        </span>
                                                                    </div>
                                                                )}
                                                            {(item as any)
                                                                .weak &&
                                                                (
                                                                    item as any
                                                                ).weak
                                                                    .length >
                                                                    0 && (
                                                                    <div>
                                                                        <span className="text-zinc-400">
                                                                            Weak to:
                                                                        </span>{" "}
                                                                        <span className="font-medium">
                                                                            {(
                                                                                item as any
                                                                            ).weak.join(
                                                                                ", ",
                                                                            )}
                                                                        </span>
                                                                    </div>
                                                                )}
                                                        </div>
                                                    </>
                                                ),
                                            });
                                        }

                                        if (hasRules && ruleDetails) {
                                            modules.push({
                                                key: "rules",
                                                content: (
                                                    <>
                                                        <h4 className="text-[0.7rem] sm:text-xs font-semibold tracking-[0.16em] text-zinc-400 mb-1.5">
                                                            <u>EQUIP RULES</u>
                                                        </h4>
                                                        <div className="space-y-1 text-[0.7rem] sm:text-xs text-zinc-200">
                                                            {ruleDetails.jobs && (
                                                                <div>
                                                                    <span className="text-zinc-400">
                                                                        Jobs:
                                                                    </span>{" "}
                                                                    <span className="font-medium">
                                                                        {ruleDetails.jobs}
                                                                    </span>
                                                                </div>
                                                            )}
                                                            {ruleDetails.requiresPassives && (
                                                                <div>
                                                                    <span className="text-zinc-400">
                                                                        Requires:
                                                                    </span>{" "}
                                                                    <span className="font-medium">
                                                                        {ruleDetails.requiresPassives}
                                                                    </span>
                                                                </div>
                                                            )}
                                                            {ruleDetails.hands && (
                                                                <div>
                                                                    <span className="text-zinc-400">
                                                                        Hands:
                                                                    </span>{" "}
                                                                    <span className="font-medium">
                                                                        {ruleDetails.hands}
                                                                    </span>
                                                                </div>
                                                            )}
                                                            {ruleDetails.dualWield && (
                                                                <div>
                                                                    <span className="text-zinc-400">
                                                                        Dual Wield:
                                                                    </span>{" "}
                                                                    <span className="font-medium">
                                                                        {ruleDetails.dualWield}
                                                                    </span>
                                                                </div>
                                                            )}
                                                            {ruleDetails.incompatible && (
                                                                <div>
                                                                    <span className="text-zinc-400">
                                                                        Incompatible with:
                                                                    </span>{" "}
                                                                    <span className="font-medium">
                                                                        {ruleDetails.incompatible}
                                                                    </span>
                                                                </div>
                                                            )}
                                                            {ruleDetails.gender && (
                                                                <div>
                                                                    <span className="text-zinc-400">
                                                                        Gender:
                                                                    </span>{" "}
                                                                    <span className="font-medium">
                                                                        {ruleDetails.gender}
                                                                    </span>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </>
                                                ),
                                            });
                                        }

                                        if (hasRangeMovement) {
                                            modules.push({
                                                key: "range",
                                                content: (
                                                    <>
                                                        <h4 className="text-[0.7rem] sm:text-xs font-semibold tracking-[0.16em] text-zinc-400 mb-1.5">
                                                            <u>RANGE & MOVEMENT</u>
                                                        </h4>
                                                        <div className="space-y-1 text-[0.7rem] sm:text-xs text-zinc-200">
                                                            {(item as any).rangeMin != null && (
                                                                <div>
                                                                    <span className="text-zinc-400">
                                                                        Range Min:
                                                                    </span>{" "}
                                                                    <span className="font-medium">
                                                                        {(item as any).rangeMin}
                                                                    </span>
                                                                </div>
                                                            )}
                                                            {(item as any).rangeMax != null && (
                                                                <div>
                                                                    <span className="text-zinc-400">
                                                                        Range Max:
                                                                    </span>{" "}
                                                                    <span className="font-medium">
                                                                        {(item as any).rangeMax}
                                                                    </span>
                                                                </div>
                                                            )}
                                                            {(item as any).moveBonus != null && (
                                                                <div>
                                                                    <span className="text-zinc-400">
                                                                        Move Bonus:
                                                                    </span>{" "}
                                                                    <span className="font-medium">
                                                                        +{(item as any).moveBonus}
                                                                    </span>
                                                                </div>
                                                            )}
                                                            {(item as any).jumpBonus != null && (
                                                                <div>
                                                                    <span className="text-zinc-400">
                                                                        Jump Bonus:
                                                                    </span>{" "}
                                                                    <span className="font-medium">
                                                                        +{(item as any).jumpBonus}
                                                                    </span>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </>
                                                ),
                                            });
                                        }

                                        if (hasAdditionalEffect) {
                                            modules.push({
                                                key: "additionalEffect",
                                                content: (
                                                    <>
                                                        <h4 className="text-[0.7rem] sm:text-xs font-semibold tracking-[0.16em] text-zinc-400 mb-1.5">
                                                            <u>ADDITIONAL EFFECT</u>
                                                        </h4>
                                                        <div className="text-[0.7rem] sm:text-xs text-zinc-200">
                                                            {(item as any).additionalEffect}
                                                        </div>
                                                    </>
                                                ),
                                            });
                                        }

                                        if (hasGenderRestriction) {
                                            modules.push({
                                                key: "gender",
                                                content: (
                                                    <>
                                                        <h4 className="text-[0.7rem] sm:text-xs font-semibold tracking-[0.16em] text-zinc-400 mb-1.5">
                                                            <u>GENDER RESTRICTION</u>
                                                        </h4>
                                                        <div className="text-[0.7rem] sm:text-xs text-zinc-200">
                                                            {(item as any).gender}
                                                        </div>
                                                    </>
                                                ),
                                            });
                                        }

                                        if (hasTeaches && teaches) {
                                            modules.push({
                                                key: "teaches",
                                                content: (
                                                    <>
                                                        <h4 className="text-[0.7rem] sm:text-xs font-semibold tracking-[0.16em] text-zinc-400 mb-1.5">
                                                            <u>TEACHES</u>
                                                        </h4>
                                                        <ul className="space-y-0.5 text-[0.7rem] sm:text-xs text-zinc-200">
                                                            {Object.entries(
                                                                teaches,
                                                            ).map(
                                                                ([
                                                                    job,
                                                                    ids,
                                                                ]) => {
                                                                    const abilityLabels =
                                                                        ids.map(
                                                                            (
                                                                                id,
                                                                            ) => {
                                                                                const ab =
                                                                                    ABILITIES[
                                                                                        id
                                                                                    ];
                                                                                if (
                                                                                    !ab
                                                                                )
                                                                                    return id;
                                                                                const set =
                                                                                    ABILITY_SETS[
                                                                                        ab
                                                                                            .setId
                                                                                    ];
                                                                                const setName =
                                                                                    set
                                                                                        ?.name ??
                                                                                    set
                                                                                        ?.id ??
                                                                                    ab.setId;
                                                                                return `${ab.name} (${setName})`;
                                                                            },
                                                                        );
                                                                    return (
                                                                        <li
                                                                            key={
                                                                                job
                                                                            }
                                                                        >
                                                                            <span className="text-zinc-400">
                                                                                {
                                                                                    job
                                                                                }
                                                                                :
                                                                            </span>{" "}
                                                                            <span className="font-medium">
                                                                                {abilityLabels.join(
                                                                                    ", ",
                                                                                )}
                                                                            </span>
                                                                        </li>
                                                                    );
                                                                },
                                                            )}
                                                        </ul>
                                                    </>
                                                ),
                                            });
                                        }

                                        const hasAnyModules =
                                            modules.length > 0;

                                        const gridClass =
                                            modules.length <= 1
                                                ? "mt-2 grid grid-cols-1 gap-2.5 sm:gap-3"
                                                : "mt-2 grid grid-cols-1 md:grid-cols-2 gap-2.5 sm:gap-3";

                                        return (
                                            <li
                                                key={item.id}
                                                className="border border-zinc-800/80 rounded-md bg-zinc-950/60"
                                            >
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setOpenEquipment(
                                                            (prev) => ({
                                                                ...prev,
                                                                [item.id]:
                                                                    !isOpen,
                                                            }),
                                                        )
                                                    }
                                                    className="w-full px-2.5 py-2 flex items-center justify-between gap-2 text-left"
                                                >
                                                    <div className="flex flex-col gap-0.5">
                                                        <span className="font-semibold text-zinc-50">
                                                            {item.name}
                                                        </span>
                                                        {subtypeLabel && (
                                                            <span className="text-[0.65rem] text-zinc-400">
                                                                {
                                                                    subtypeLabel
                                                                }
                                                            </span>
                                                        )}
                                                    </div>
                                                    <span className="flex items-center gap-1 text-[0.65rem] text-zinc-400">
                                                        <span>
                                                            {isOpen
                                                                ? "Hide details"
                                                                : "Show details"}
                                                        </span>
                                                        {renderChevron(isOpen)}
                                                    </span>
                                                </button>

                                                {isOpen && (
                                                    <div className="mt-1.5 border-t border-zinc-800/80 text-[0.7rem] text-zinc-100 px-2.5 py-2">
                                                        {item.description && (
                                                            <p className="text-zinc-300">
                                                                {
                                                                    item.description
                                                                }
                                                            </p>
                                                        )}

                                                        {hasAnyModules &&
                                                            modules.length >
                                                                0 && (
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
                                                                                "rounded-2xl border border-zinc-800/80 bg-zinc-900/40 px-3 py-2.5 sm:px-4 sm:py-3" +
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
                                                    </div>
                                                )}
                                            </li>
                                        );
                                    })}
                                </ul>
                            )}
                        </>
                    )}

                    {/* ABILITIES */}
                    {activeTab === "abilities" && (
                        <>
                            {abilitiesCount === 0 ? (
                                <p className="text-zinc-500">
                                    No abilities match your search.
                                </p>
                            ) : (
                                <ul className="space-y-1.5">
    {filteredAbilities.map(({ set, ability }) => {
        // Open/close state keyed by ability so there is only one row per ability
        const key = ability.id;
        const isOpen = openAbilities[key] ?? false;

        // Collect all sets this ability belongs to: primary + additional
        const allSetIds = [
            ability.setId,
            ...(ability.otherSetIds ?? []),
        ];

        const allSets = allSetIds
            .map((setId) => ABILITY_SETS[setId])
            .filter((s): s is AbilitySetMeta => !!s);

        return (
            <li
                key={key}
                className="border border-zinc-800/80 rounded-md bg-zinc-950/60"
            >
                <button
                    type="button"
                    onClick={() =>
                        setOpenAbilities((prev) => ({
                            ...prev,
                            [key]: !isOpen,
                        }))
                    }
                    className="w-full px-2.5 py-2 flex items-center justify-between gap-2 text-left"
                >
                    <div className="flex flex-col gap-0.5">
                        <span className="font-semibold text-zinc-50">
                            {ability.name}
                        </span>
                        <div className="flex flex-wrap items-center gap-1.5">
                            {/* All ability sets (primary + otherSetIds) */}
                            {allSets.map((s) => (
                                <span
                                    key={s.id}
                                    className="inline-flex items-center rounded-full bg-zinc-900/80 border border-zinc-700/80 px-1.5 py-px text-[0.6rem] uppercase tracking-[0.14em] text-zinc-300"
                                >
                                    {s.name}
                                </span>
                            ))}

                            {ability.blueMagic && (
                                <span className="inline-flex items-center rounded-full bg-blue-900/40 border border-blue-500/70 px-1.5 py-px text-[0.6rem] uppercase tracking-[0.14em] text-blue-200">
                                    Blue Magic
                                </span>
                            )}
                            {ability.job && (
                                <span className="inline-flex items-center rounded-full bg-zinc-900/80 border border-zinc-700/80 px-1.5 py-px text-[0.6rem] uppercase tracking-[0.14em] text-zinc-300">
                                    {ability.job}
                                </span>
                            )}
                            {(ability as any).ap != null && (
                                <span className="inline-flex items-center rounded-full bg-zinc-900/80 border border-zinc-700/80 px-1.5 py-px text-[0.6rem] uppercase tracking-[0.14em] text-zinc-300">
                                    {(ability as any).ap} AP
                                </span>
                            )}
                        </div>
                    </div>
                    <span className="flex items-center gap-1 text-[0.65rem] text-zinc-400">
                        <span>
                            {isOpen ? "Hide details" : "Show details"}
                        </span>
                        {renderChevron(isOpen)}
                    </span>
                </button>

                {isOpen && (
                    <div className="px-2.5 pb-2 pt-0.5 space-y-1.5 border-t border-zinc-800/80 text-[0.7rem] text-zinc-100">
                        {ability.description && (
                            <div className="text-zinc-300 space-y-0.5">
                                {Array.isArray(ability.description)
                                    ? ability.description.map((line, idx) => (
                                          <p key={idx}>{line}</p>
                                      ))
                                    : (
                                        <p>{ability.description}</p>
                                      )}
                            </div>
                        )}

                        {(ability.element ||
                            ability.inflicts ||
                            ability.immune) && (
                            <div className="flex flex-wrap gap-1">
                                {ability.element && (
                                    <span className="inline-flex items-center rounded-full bg-zinc-900/80 border border-zinc-700/80 px-1.5 py-px text-[0.6rem] uppercase tracking-[0.14em] text-zinc-300">
                                        Element:{" "}
                                        {ability.element.join(", ")}
                                    </span>
                                )}
                                {ability.inflicts && (
                                    <span className="inline-flex items-center rounded-full bg-zinc-900/80 border border-zinc-700/80 px-1.5 py-px text-[0.6rem] uppercase tracking-[0.14em] text-zinc-300">
                                        Inflicts:{" "}
                                        {ability.inflicts.join(", ")}
                                    </span>
                                )}
                                {ability.immune && (
                                    <span className="inline-flex items-center rounded-full bg-zinc-900/80 border border-zinc-700/80 px-1.5 py-px text-[0.6rem] uppercase tracking-[0.14em] text-zinc-300">
                                        Grants immunity to:{" "}
                                        {ability.immune.join(", ")}
                                    </span>
                                )}
                            </div>
                        )}

                        {(ability.requires ||
                            ability.equipmentRequired) && (
                            <div className="space-y-0.5">
                                {ability.requires && (
                                    <div>
                                        <span className="text-zinc-400">
                                            Requires:
                                        </span>{" "}
                                        <span className="font-medium">
                                            {ability.requires.join(", ")}
                                        </span>
                                    </div>
                                )}
                                {ability.equipmentRequired && (
                                    <div>
                                        <span className="text-zinc-400">
                                            Req. equipment:
                                        </span>{" "}
                                        <span className="font-medium">
                                            {ability.equipmentRequired.join(
                                                ", ",
                                            )}
                                        </span>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </li>
        );
    })}
</ul>
                                )}
                        </>
                    )}

                    {/* BAZAAR */}
                    {activeTab === "bazaar" && (
                        <>
                            {bazaarCount === 0 ? (
                                <p className="text-zinc-500">
                                    No bazaar recipes match your search.
                                </p>
                            ) : (
                                <div className="space-y-1.5">
                                    {filteredBazaarSections.map((section) => {
                                        const isOpenSection =
                                            openBazaarSections[section.section] ?? false;

                                        return (
                                            <section
                                                key={section.section}
                                                className="border border-zinc-800/80 rounded-md bg-zinc-950/60"
                                            >
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setOpenBazaarSections((prev) => ({
                                                            ...prev,
                                                            [section.section]: !isOpenSection,
                                                        }))
                                                    }
                                                    className="w-full px-2.5 py-2 flex items-center justify-between gap-2 text-left"
                                                >
                                                    <div className="flex flex-col gap-0.5">
                                                        <span className="text-sm font-semibold text-zinc-50">
                                                            {section.section}
                                                        </span>
                                                        <span className="text-[0.65rem] text-zinc-400">
                                                            {section.recipes.length}{" "}
                                                            recipe
                                                            {section.recipes.length === 1 ? "" : "s"}
                                                        </span>
                                                    </div>
                                                    <span className="flex items-center gap-1 text-[0.65rem] text-zinc-400">
                                                        <span>
                                                            {isOpenSection ? "Hide" : "Show"}
                                                        </span>
                                                        {renderChevron(isOpenSection)}
                                                    </span>
                                                </button>

                                                {isOpenSection && (
                                                    <div className="border-t border-zinc-800/80 px-2.5 py-2 text-[0.7rem] text-zinc-100">
                                                        <ul className="space-y-2.5">
                                                            {section.recipes.map(({ recipe }) => {
                                                                const r = recipe as any;

                                                                const equipName =
                                                                    typeof r.result === "string"
                                                                        ? r.result.toLowerCase()
                                                                        : "";
                                                                const equip =
                                                                    EQUIPMENT_BY_NAME[equipName] ?? null;

                                                                const subtypeLabel =
                                                                    equip && buildSubtypeLabel(equip);
                                                                const ruleDetails =
                                                                    equip && buildRuleDetails(equip);
                                                                const statEntries =
                                                                    equip && buildStatEntries(equip);
                                                                const hasStats =
                                                                    !!statEntries &&
                                                                    statEntries.length > 0;
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
                                                                    !!(equip as any).teaches &&
                                                                    Object.keys(
                                                                        (equip as any).teaches as Record<
                                                                            string,
                                                                            string[]
                                                                        >,
                                                                    ).length > 0;

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
                                                                        (equip as any).bazaar_category ||
                                                                        typeof (equip as any).price ===
                                                                            "number" ||
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
                                                                        (equip as any).bazaar_category ||
                                                                        typeof (equip as any).price ===
                                                                            "number")
                                                                ) {
                                                                    modules.push({
                                                                        key: "basics",
                                                                        content: (
                                                                            <>
                                                                                <h4 className="text-[0.7rem] sm:text-xs font-semibold tracking-[0.16em] text-zinc-400 mb-1.5">
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
                                                                                    {(equip as any)
                                                                                        .bazaar_category && (
                                                                                        <div className="flex justify-between gap-2">
                                                                                            <dt className="text-zinc-400">
                                                                                                Bazaar
                                                                                            </dt>
                                                                                            <dd className="font-medium text-right">
                                                                                                {
                                                                                                    (equip as any)
                                                                                                        .bazaar_category
                                                                                                }
                                                                                            </dd>
                                                                                        </div>
                                                                                    )}
                                                                                    {typeof (equip as any)
                                                                                        .price === "number" && (
                                                                                        <div className="flex justify-between gap-2">
                                                                                            <dt className="text-zinc-400">
                                                                                                Purchase
                                                                                            </dt>
                                                                                            <dd className="font-medium text-right">
                                                                                                {
                                                                                                    (equip as any)
                                                                                                        .price
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

                                                                if (equip && hasStats) {
                                                                    modules.push({
                                                                        key: "stats",
                                                                        content: (
                                                                            <>
                                                                                <h4 className="text-[0.7rem] sm:text-xs font-semibold tracking-[0.16em] text-zinc-400 mb-1.5">
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
                                                                                <h4 className="text-[0.7rem] sm:text-xs font-semibold tracking-[0.16em] text-zinc-400 mb-1.5">
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
                                                                                <h4 className="text-[0.7rem] sm:text-xs font-semibold tracking-[0.16em] text-zinc-400 mb-1.5">
                                                                                    <u>TEACHES</u>
                                                                                </h4>
                                                                                <div className="mt-0.5 text-[0.7rem] sm:text-xs text-zinc-300">
                                                                                    <ul className="list-disc list-inside space-y-0.5">
                                                                                        {Object.entries(
                                                                                            (equip as any)
                                                                                                .teaches as Record<
                                                                                                string,
                                                                                                string[]
                                                                                            >,
                                                                                        ).map(
                                                                                            ([
                                                                                                job,
                                                                                                ids,
                                                                                            ]) => {
                                                                                                const display =
                                                                                                    ids
                                                                                                        .map(
                                                                                                            (
                                                                                                                id,
                                                                                                            ) => {
                                                                                                                const ab =
                                                                                                                    ABILITIES[
                                                                                                                        id
                                                                                                                    ];
                                                                                                                if (!ab) {
                                                                                                                    return id;
                                                                                                                }
                                                                                                                const set =
                                                                                                                    ABILITY_SETS[
                                                                                                                        ab
                                                                                                                            .setId
                                                                                                                    ];
                                                                                                                const setName =
                                                                                                                    set?.name ??
                                                                                                                    ab.setId;
                                                                                                                return `${ab.name} (${setName})`;
                                                                                                            },
                                                                                                        )
                                                                                                        .join(", ");

                                                                                                return (
                                                                                                    <li key={job}>
                                                                                                        <span className="font-semibold">
                                                                                                            {job}:
                                                                                                        </span>{" "}
                                                                                                        {display}
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

                                                                const gridClass =
                                                                    modules.length <= 1
                                                                        ? "mt-2 grid grid-cols-1 gap-2.5 sm:gap-3"
                                                                        : "mt-2 grid grid-cols-1 md:grid-cols-2 gap-2.5 sm:gap-3";

                                                                return (
                                                                    <li
                                                                        key={r.id}
                                                                        className="flex flex-col gap-1.5 border border-zinc-800/80 rounded-md bg-zinc-950/50 px-2 py-1.5"
                                                                    >
                                                                        <div>
                                                                            <div className="flex flex-wrap items-center gap-1.5">
                                                                                <span className="font-semibold text-zinc-50">
                                                                                    {r.result}
                                                                                </span>
                                                                                {r.rank && (
                                                                                    <span className="inline-flex items-center rounded-full bg-emerald-100/10 border border-emerald-500/70 px-1.5 py-px text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-emerald-300">
                                                                                        {r.rank}
                                                                                    </span>
                                                                                )}
                                                                            </div>
                                                                            <div className="mt-0.5 text-[0.75rem] text-zinc-400">
                                                                                Loot Required:{" "}
                                                                                <span className="font-medium text-zinc-200">
                                                                                    {Array.isArray(r.loot)
                                                                                        ? r.loot.join(", ")
                                                                                        : ""}
                                                                                </span>
                                                                            </div>

                                                                            {equip && (
                                                                                <>
                                                                                    <div className="mt-2 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                                                                                        {(equip as any).description && (
                                                                                            <p className="text-[0.8rem] text-zinc-200 italic">
                                                                                                {(equip as any).description}
                                                                                            </p>
                                                                                        )}
                                                                                        {subtypeLabel && (
                                                                                            <div className="text-[0.75rem] text-zinc-400 sm:text-right">
                                                                                                {subtypeLabel}
                                                                                            </div>
                                                                                        )}
                                                                                    </div>

                                                                                    {hasAnyModules && modules.length > 0 && (
                                                                                        <div className={gridClass}>
                                                                                            {modules.map((module, index) => {
                                                                                                const isLast =
                                                                                                    index ===
                                                                                                    modules.length - 1;
                                                                                                const shouldSpan =
                                                                                                    modules.length > 1 &&
                                                                                                    modules.length % 2 === 1 &&
                                                                                                    isLast;

                                                                                                const sectionClass =
                                                                                                    "rounded-2xl border border-zinc-800/80 bg-zinc-900/40 px-3 py-2.5 sm:px-4 sm:py-3" +
                                                                                                    (shouldSpan
                                                                                                        ? " md:col-span-2"
                                                                                                        : "");

                                                                                                return (
                                                                                                    <section
                                                                                                        key={module.key}
                                                                                                        className={sectionClass}
                                                                                                    >
                                                                                                        {module.content}
                                                                                                    </section>
                                                                                                );
                                                                                            })}
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
                        </>
                    )}

                    {/* RETRO ACHIEVEMENTS */}
                    {activeTab === "retros" && (
                        <>
                            {retrosCount === 0 ? (
                                <p className="text-zinc-500">
                                    No RetroAchievements match your search.
                                </p>
                            ) : (
                                <ul className="space-y-1.5">
                                    {filteredRetros.map((entry) => {
                                        const { key, ach } = entry;
                                        const isOpen =
                                            openRetros[key] ?? false;
                                        const isChecked =
                                            !!checked[`retro:${ach.id}`];

                                        return (
                                            <li
                                                key={key}
                                                className="border border-zinc-800/80 rounded-md bg-zinc-950/60"
                                            >
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setOpenRetros(
                                                            (prev) => ({
                                                                ...prev,
                                                                [key]:
                                                                    !isOpen,
                                                            }),
                                                        )
                                                    }
                                                    className="w-full px-2.5 py-2 flex items-center justify-between gap-2 text-left"
                                                >
                                                    <div className="flex flex-col gap-0.5 items-start">
                                                        <span className="font-semibold text-zinc-50">
                                                            {ach.name}
                                                        {ach.category && (
                                                            <span className="text-[0.65rem] text-zinc-400">
                                                                {" {"}{ach.category}{")"}
                                                            </span>
                                                        )}
                                                        </span>
                                                        {ach.missable && (
                                                            <span className="inline-flex items-center rounded-full border border-rose-400/70 bg-rose-500/10 px-1.5 py-px text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-rose-300">
                                                                Missable
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <input
                                                            type="checkbox"
                                                            className="h-3.5 w-3.5 rounded border-zinc-500 text-emerald-500 focus:ring-emerald-500/70"
                                                            checked={isChecked}
                                                            onChange={(e) =>
                                                                setCheck(
                                                                    `retro:${ach.id}`,
                                                                    e.target
                                                                        .checked,
                                                                )
                                                            }
                                                            onClick={(e) =>
                                                                e.stopPropagation()
                                                            }
                                                        />
                                                        <span className="flex items-center gap-1 text-[0.65rem] text-zinc-400">
                                                            <span>
                                                                {isOpen
                                                                    ? "Hide details"
                                                                    : "Show details"}
                                                            </span>
                                                            {renderChevron(
                                                                isOpen,
                                                            )}
                                                        </span>
                                                    </div>
                                                </button>

                                                {isOpen && (
                                                    <div className="px-2.5 pb-2 pt-0.5 space-y-1.5 border-t border-zinc-800/80">
                                                        <p className="text-zinc-300 text-[0.75rem]">
                                                            {ach.description}
                                                        </p>
                                                        {ach.missable && (
                                                            <div className="text-[0.7rem] text-rose-300">
                                                                This RetroAchievement
                                                                is missable.
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                            </li>
                                        );
                                    })}
                                </ul>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
