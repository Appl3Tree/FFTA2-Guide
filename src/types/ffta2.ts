export type AbilityId = string;
export type AbilitySetId = string;
export type EquipmentId = string;

export interface EnemyActionAbilityRef {
    setId: string;          // AbilitySetId, e.g. "territorialism"
    abilityIds: string[];   // AbilityId[] — explicit subset
}

export interface EnemyAbilityLoadout {
    A1?: EnemyActionAbilityRef; // Action Ability 1
    A2?: EnemyActionAbilityRef; // Action Ability 2
    R?: AbilityId;              // AbilityId for Reaction (if you want full text)
    P?: AbilityId;              // AbilityId for Passive
}

export interface EnemyEquipment {
    weapon?: EquipmentId;
    shield?: EquipmentId;
    head?: EquipmentId;
    body?: EquipmentId;
    accessory?: EquipmentId;
}

export interface Enemy {
    id: string;
    name: string;
    job: string;
    quantity?: number;
    abilities?: EnemyAbilityLoadout;
    equipment?: EnemyEquipment;
}

export interface Reward {
    gil: number;
    clanPoints: number;
    items: string[];
    loot: string[];
    laws?: string[];
}

export interface MissionTag {
    id: string;
    label: string;
    description?: string;
}

export interface Mission {
    id: string;
    arc: string;
    name: string;
    rank: number;
    recommendedLevel?: string;
    region: string;
    objective: string;
    law: string;
    enemies: Enemy[];
    battlefield: string[];
    strategy: string[];
    rewards: Reward;
    notes?: string;
    tags?: string[];
    retroAchievementIds?: string[];
}

export interface RetroAchievementRef {
    id: string;
    missable?: boolean;
}

export interface RetroAchievementMeta {
    id: string;
    name: string;
    description: string;
    points: number;
    missable?: boolean;
    hidden?: boolean;
    notes?: string;
    missionId?: string;
}

export interface GlobalRetroAchievement extends RetroAchievementMeta {
    category: string;
}

export interface Race {
    id: string;
    name: string;
    tagline: string;
    jobs: Job[];
}

export interface Job {
    id: string;
    name: string;
    description: string;
    detail: string;
    race: string;
    notes?: string;
}

export interface AbilityMeta {
    id: AbilityId;
    name: string;
    description: string;
    job: string;
    type: string; // Action, Reaction, Passive
    mpCost?: number;
    apCost?: number;
    notes?: string;
}

export interface AbilitySetMeta {
    id: AbilitySetId;
    name: string;
    description?: string;
    job: string;
    abilities: AbilityId[];
    notes?: string;
}

export type EquipmentCategory = "Weapon" | "Armor" | "Shield" | "Head" | "Body" | "Accessory";

export type WeaponType =
    | "Sword"
    | "Greatsword"
    | "Katana"
    | "Saber"
    | "Knight Sword"
    | "Axe"
    | "Hammer"
    | "Rods"
    | "Staves"
    | "Maces"
    | "Bows"
    | "Greatbows"
    | "Guns"
    | "Daggers"
    | "Rapiers"
    | "Hand-bombs"
    | "Polearms"
    | "Instruments"
    | "Books"
    | "Measures"
    | "Ninjutsu"
    | "Rods/Staves"
    | "Unarmed"
    | "Other";

export type ArmorType = "Light Armor" | "Heavy Armor" | "Robes" | "Clothing";

export type ShieldType = "Shield";

export type HelmetType = "Helm" | "Hat";

export type AccessoryType =
    | "Ring"
    | "Bangle"
    | "Boots"
    | "Pendant"
    | "Amulet"
    | "Cape"
    | "Gloves"
    | "Belt"
    | "Other";

export interface EquipmentMeta {
    id: EquipmentId;
    name: string;
    category: EquipmentCategory;
    weaponType?: WeaponType;
    armorType?: ArmorType;
    helmetType?: HelmetType;
    shieldType?: ShieldType;
    accessoryType?: AccessoryType;
    jobs: string[];
    abilities: AbilityId[];
    buy?: number;
    sell?: number;
    description?: string;
    notes?: string;
    element?: string[];
    absorb?: string[];
    immune?: string[];
    weak?: string[];
    gender?: "M" | "F";
}

export interface EquipmentRuleBase {
    id: string;
    notes?: string;
    allowedJobs?: string[];
    disallowedJobs?: string[];
    requiresPassives?: string[];
    handsRequired?: 1 | 2;
}

export interface HelmetRule extends EquipmentRuleBase {
    slots: 1;
}

export interface ArmorRule extends EquipmentRuleBase {
    slots: 1;
}

export interface ShieldRule extends EquipmentRuleBase {
    slots: 1;
}

export interface WeaponRule extends EquipmentRuleBase {
    slots: 1 | 2;
}

export type EquipmentRule = HelmetRule | ArmorRule | ShieldRule | WeaponRule;

export interface BazaarRecipe {
    id: string;
    section: string;
    rank: string;      // e.g. "Rank E"
    result: string;    // Resulting item name
    loot: string[];    // Required loot item names
}

export type PanelTone = "blue" | "emerald" | "red" | "purple" | "amber" | "neutral" | "yellow";

export interface MetaPanel {
    id: string;
    title: string;
    subtitle?: string;
    tone: PanelTone;
    paragraphs: string[];
    bullets?: string[];
}

