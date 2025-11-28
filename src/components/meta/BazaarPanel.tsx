import React from "react";
import { BAZAAR_RECIPES } from "../../data/bazaarRecipes";

interface BazaarRecipeWithSearch {
    id: string;
    section: string;
    rank: string;
    result: string;
    loot: string[];
    searchBlob: string;
}

interface BazaarSection {
    section: string;
    recipes: BazaarRecipeWithSearch[];
}

export function BazaarPanel() {
    const [query, setQuery] = React.useState("");

    const sections = React.useMemo<BazaarSection[]>(() => {
        // Attach a lowercased search blob to each recipe
        const withSearch: BazaarRecipeWithSearch[] = BAZAAR_RECIPES.map((r) => {
            const parts: string[] = [];
            parts.push(r.section);
            parts.push(r.rank);
            parts.push(r.result);
            parts.push(r.loot.join(" "));
            const searchBlob = parts.join(" ").toLowerCase();

            return {
                ...r,
                searchBlob,
            };
        });

        // Group by section
        const bySection = new Map<string, BazaarRecipeWithSearch[]>();
        for (const r of withSearch) {
            const key = r.section;
            const bucket = bySection.get(key);
            if (bucket) {
                bucket.push(r);
            } else {
                bySection.set(key, [r]);
            }
        }

        // Sort sections and recipes
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
            .map((section) => {
                const recipes = section.recipes.filter((r) =>
                    r.searchBlob.includes(q),
                );
                return { ...section, recipes };
            })
            .filter((section) => section.recipes.length > 0);
    }, [sections, query]);

    const [openSections, setOpenSections] = React.useState<Record<string, boolean>>(
        () => {
            const initial: Record<string, boolean> = {};
            for (const section of sections) {
                initial[section.section] = false;
            }
            return initial;
        },
    );

    const toggleSection = (sectionName: string) => {
        setOpenSections((prev) => ({
            ...prev,
            [sectionName]: !prev[sectionName],
        }));
    };

    return (
        <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <label className="text-[0.7rem] sm:text-xs font-semibold tracking-[0.16em] text-zinc-400 uppercase">
                    Search Bazaar Recipes
                </label>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search by result, loot, section, or rank…"
                    className="w-full sm:w-80 rounded-md border border-zinc-300 dark:border-zinc-700 bg-white/80 dark:bg-zinc-900/70 px-3 py-1.5 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-emerald-500/70 focus:border-emerald-500/70"
                />
            </div>

            {filteredSections.length === 0 ? (
                <p className="text-[0.8rem] text-zinc-500 dark:text-zinc-400">
                    No bazaar recipes match your search.
                </p>
            ) : (
                <div className="space-y-3">
                    {filteredSections.map((section) => (
                        <section
                            key={section.section}
                            className="border border-zinc-200 dark:border-zinc-700 rounded-xl bg-white/70 dark:bg-zinc-900/60 overflow-hidden"
                        >
                            <button
                                type="button"
                                onClick={() => toggleSection(section.section)}
                                className="w-full flex items-center justify-between px-3 sm:px-4 py-2.5 text-left text-sm font-medium text-zinc-800 dark:text-zinc-100"
                            >
                                <span className="flex items-center gap-2">
                                    <span>{section.section}</span>
                                    <span className="inline-flex items-center rounded-full bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 text-[0.7rem] font-semibold text-zinc-600 dark:text-zinc-300">
                                        {section.recipes.length} recipe
                                        {section.recipes.length === 1 ? "" : "s"}
                                    </span>
                                </span>
                                <span className="text-xs text-zinc-400 uppercase">
                                    {openSections[section.section] === false
                                        ? "Show"
                                        : "Hide"}
                                </span>
                            </button>

                            {openSections[section.section] !== false && (
                                <div className="border-t border-zinc-200 dark:border-zinc-700 px-3 sm:px-4 py-2.5 sm:py-3 text-sm">
                                    <ul className="space-y-2.5">
                                        {section.recipes.map((recipe) => (
                                            <li
                                                key={recipe.id}
                                                className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1.5"
                                            >
                                                <div>
                                                    <div className="flex flex-wrap items-center gap-1.5">
                                                        <span className="font-semibold">
                                                            {recipe.result}
                                                        </span>
                                                        <span className="inline-flex items-center rounded-full bg-emerald-100 dark:bg-emerald-900/40 px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-200">
                                                            {recipe.rank}
                                                        </span>
                                                    </div>
                                                    <div className="text-[0.75rem] text-zinc-500 dark:text-zinc-400">
                                                        Loot Required:{" "}
                                                        <span className="font-medium">
                                                            {recipe.loot.join(", ")}
                                                        </span>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </section>
                    ))}
                </div>
            )}
        </div>
    );
}

