import {
    ABILITIES,
    ABILITY_SETS,
} from "../data/abilities/abilities";
import type {
    EnemyAbilityLoadout,
    EnemyActionAbilityRef,
} from "../types/ffta2";

function resolveActionAbility(ref?: EnemyActionAbilityRef) {
    if (!ref || ref.abilityIds.length === 0) return null;

    const setMeta = ABILITY_SETS[ref.setId];
    const abilities = ref.abilityIds
        .map((id) => ABILITIES[id])
        .filter((a) => !!a);

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

