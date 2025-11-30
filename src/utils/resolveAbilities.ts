import {
    ABILITIES,
    ABILITY_SETS,
    type AbilityMeta,
    type AbilitySetMeta
} from "../data/abilities/abilities";
import type {
    EnemyAbilityLoadout,
    EnemyActionAbilityRef,
} from "../types/ffta2";

interface EnemyActionAbilityRef {
    setId: string;
    abilityIds?: string[];
}

interface ResolvedAbilitySet {
    setId: string;
    setName: string;
    setDescription?: string;
    abilities: AbilityMeta[]; // always an array, maybe empty
}

function resolveActionAbility(ref?: EnemyActionAbilityRef | null): ResolvedAbilitySet | null {
    if (!ref) return null;

    const setMeta: AbilitySetMeta | undefined = ABILITY_SETS[ref.setId];

    // Normalize abilityIds to an array (possibly empty)
    const abilityIds = Array.isArray(ref.abilityIds) ? ref.abilityIds : [];

    const abilities: AbilityMeta[] = abilityIds
        .map((id) => ABILITIES[id])
        .filter((a): a is AbilityMeta => !!a);

    return {
        setId: ref.setId,
        setName: setMeta?.name ?? ref.setId,
        setDescription: setMeta?.description,
        abilities,
    };
}

export function resolveEnemyLoadout(loadout?: EnemyAbilityLoadout) {
    if (!loadout) return null;

    const A1 = resolveActionAbility(loadout.A1);
    const A2 = resolveActionAbility(loadout.A2);
    const R = loadout.R ? ABILITIES[loadout.R] ?? null : null;
    const P = loadout.P ? ABILITIES[loadout.P] ?? null : null;

    return { A1, A2, R, P };
}

