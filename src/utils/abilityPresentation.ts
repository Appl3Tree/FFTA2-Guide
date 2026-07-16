import { ABILITIES, ABILITY_SETS } from "../data/abilities/abilities";
import { getJobAbilityReference } from "../data/jobReferenceDetails";

export function getAbilityTeachingLabel(job: string, abilityId: string): string {
    const ability = ABILITIES[abilityId];
    if (!ability) return abilityId;

    const set = ABILITY_SETS[ability.setId];
    const reference = getJobAbilityReference(job, abilityId);
    const ap = reference?.ap != null ? ` | ${reference.ap} AP` : "";

    return `${ability.name} (${set?.name ?? ability.setId})${ap}`;
}
