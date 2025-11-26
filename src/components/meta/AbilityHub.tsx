import React from "react";
import {
    ABILITIES,
    ABILITY_SETS,
    type AbilityMeta,
    type AbilitySetMeta,
} from "../../data/abilities/abilities";

/**
 * Build a blob of text for search (set + abilities).
 */
function abilitySetToSearchBlob(set: AbilitySetMeta, abilities: AbilityMeta[]): string {
    const parts: string[] = [];

    parts.push(set.name);
    if (set.description) parts.push(set.description);

    for (const ab of abilities) {
        parts.push(ab.name);
        if (ab.description) parts.push(ab.description);
    }

    return parts.join(" ").toLowerCase();
}

export function AbilityHub() {
    const [query, setQuery] = React.useState("");

    const setsWithAbilities = React.useMemo(() => {
        const map: Record<string, AbilityMeta[]> = {};

        for (const ability of Object.values(ABILITIES)) {
            const arr = map[ability.setId] ?? (map[ability.setId] = []);
            arr.push(ability);
        }

        // sort abilities within each set
        for (const list of Object.values(map)) {
            list.sort((a, b) => a.name.localeCompare(b.name));
        }

        const result: { set: AbilitySetMeta; abilities: AbilityMeta[]; searchBlob: string }[] = [];

        for (const setId of Object.keys(ABILITY_SETS)) {
            const set = ABILITY_SETS[setId];
            const abilities = map[setId] ?? [];
            const searchBlob = abilitySetToSearchBlob(set, abilities);
            result.push({ set, abilities, searchBlob });
        }

        // sort sets by name
        result.sort((a, b) => a.set.name.localeCompare(b.set.name));

        return result;
    }, []);

    const filtered = React.useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return setsWithAbilities;
        return setsWithAbilities.filter((entry) =>
            entry.searchBlob.includes(q),
        );
    }, [setsWithAbilities, query]);

    // per-set collapse state
    const [openSets, setOpenSets] = React.useState<Record<string, boolean>>({});

    const toggleSet = (id: string) => {
        setOpenSets((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    return (
        <div className="space-y-3 sm:space-y-4 text-xs sm:text-sm text-zinc-100">
            {/* Search bar */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-1">
                <label className="text-[0.7rem] sm:text-xs font-semibold tracking-[0.16em] text-zinc-400 uppercase">
                    Search Abilities
                </label>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search by set or ability name..."
                    className="w-full sm:w-72 rounded-md border border-zinc-700/80 bg-zinc-950/70 px-2.5 py-1.5 text-xs sm:text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-1 focus:ring-violet-500/70 focus:border-violet-500/70"
                />
            </div>

            {filtered.length === 0 && (
                <p className="text-[0.75rem] text-zinc-400">
                    No ability sets match your search.
                </p>
            )}

            {filtered.map(({ set, abilities }) => {
                const isOpen = openSets[set.id] ?? false;

                return (
                    <section
                        key={set.id}
                        className="rounded-xl border border-zinc-800/80 bg-zinc-950/60 overflow-hidden"
                    >
                        <button
                            type="button"
                            onClick={() => toggleSet(set.id)}
                            className="w-full flex items-center justify-between px-3 py-2.5 sm:px-4 sm:py-3 bg-zinc-900/80 text-left"
                        >
                            <div className="flex flex-col gap-0.5">
                                <h5 className="text-sm sm:text-base font-semibold text-zinc-50">
                                    {set.name}
                                </h5>
                                {set.description && (
                                    <p className="text-[0.7rem] sm:text-xs text-zinc-300">
                                        {set.description}
                                    </p>
                                )}
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
                            <ul className="divide-y divide-zinc-800/70">
                                {abilities.map((ab) => (
                                    <li
                                        key={ab.id}
                                        className="px-3 py-2.5 sm:px-4 sm:py-3"
                                    >
                                        <div className="font-medium text-zinc-50">
                                            {ab.name}
                                        </div>
                                        {ab.description && (
                                            <div className="text-[0.7rem] sm:text-xs text-zinc-300">
                                                {ab.description}
                                            </div>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </section>
                );
            })}
        </div>
    );
}

