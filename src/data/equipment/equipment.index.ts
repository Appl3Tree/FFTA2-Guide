import { EquipmentId, EquipmentMeta } from "./equipment.types";
import { WEAPON_EQUIPMENT } from "./equipment.weapons";
import { SHIELD_EQUIPMENT } from "./equipment.shields";
import { HELMET_EQUIPMENT } from "./equipment.helmets";
import { ARMOR_EQUIPMENT } from "./equipment.armors";
import { ACCESSORY_EQUIPMENT } from "./equipment.accessories";

export const EQUIPMENT: Record<EquipmentId, EquipmentMeta> = {
    ...WEAPON_EQUIPMENT,
    ...SHIELD_EQUIPMENT,
    ...HELMET_EQUIPMENT,
    ...ARMOR_EQUIPMENT,
    ...ACCESSORY_EQUIPMENT,
};
