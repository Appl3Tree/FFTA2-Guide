import { EQUIPMENT } from "../data/equipment/equipment";
import type { EnemyEquipmentRef } from "../types/ffta2";

export function resolveEnemyEquipment(
    refs: EnemyEquipmentRef[] | undefined
) {
    if (!refs || refs.length === 0) return [];

    return refs
        .map((ref) => {
            const meta = EQUIPMENT[ref.itemId];
            if (!meta) {
                return {
                    slot: ref.slot,
                    id: ref.itemId,
                    name: ref.itemId,
                    category: undefined,
                    teaches: undefined,
                    description: undefined,
                };
            }

            return {
                slot: ref.slot,
                ...meta,
            };
        })
        .sort((a, b) => a.slot - b.slot);
}

