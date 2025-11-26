export type EquipmentId = string;

export type EquipmentCategory =
    | "Weapon"
    | "Shield"
    | "Helmet"
    | "Armor"
    | "Accessory";

export type JobName = string;

export type WeaponType =
    | "Knife"
    | "Sword"
    | "Blade"
    | "Saber"
    | "Knightsword"
    | "Rapier"
    | "Greatsword"
    | "Broadsword"
    | "Katana"
    | "Spear"
    | "Axe"
    | "Rod"
    | "Staff"
    | "Pole"
    | "Knuckles"
    | "Instrument"
    | "Hammer"
    | "Mace"
    | "Book"
    | "Bow"
    | "Greatbow"
    | "Gun"
    | "Hand-cannon"
    | "Card";

export type HelmetType = "Helm" | "Hair Adornment" | "Hat";

export type ArmorType = "Heavy Armor" | "Light Armor" | "Robe";

export type AccessoryType = "Shoes" | "Gloves" | "Accessory";

export type TeachesMap = Record<JobName, string[]>;

export interface EquipmentMeta {
    id: EquipmentId;
    name: string;
    category?: EquipmentCategory;
    bazaar_category?: string;

    price?: number;

    weaponType?: WeaponType;
    helmetType?: HelmetType;
    armorType?: ArmorType;
    accessoryType?: AccessoryType;

    description?: string;
    notes?: string;

    status?: string[];
    immunity?: string[];
    "half-damage"?: string[];
    absorb?: string[];
    element?: string[];
    weak?: string[];
    gender?: "Male-only" | "Female-only";

    atk?: number;
    def?: number;
    mag?: number;
    rst?: number;
    eva?: number;
    spd?: number;

    jump?: number;
    moveBonus?: number;
    jumpBonus?: number;
    rangeMin?: number;
    rangeMax?: number;

    additionalEffect?: string;

    teaches?: TeachesMap;
}
