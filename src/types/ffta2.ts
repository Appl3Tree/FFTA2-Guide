export type AbilityId = string;
export type AbilitySetId = string;
export type EquipmentId = string;

export interface EnemyActionAbilityRef {
    setId: string;          // AbilitySetId, e.g. "territorialism"
    abilityIds?: string[];  // AbilityId[] — explicit subset
}

export interface EnemyAbilityLoadout {
    A1?: EnemyActionAbilityRef | null; // Action Ability 1
    A2?: EnemyActionAbilityRef | null; // Action Ability 2
    R?: AbilityId | null;              // AbilityId for Reaction (if you want full text)
    P?: AbilityId | null;              // AbilityId for Passive
}

export interface EnemyEquipmentRef {
    slot: number;
    itemId: EquipmentId;
}

export interface Enemy {
    id?: string;
    name: string;
    job: string;
    race?: string;
    level?: string | number;
    quantity?: number;
    abilities?: EnemyAbilityLoadout;
    equipment?: EnemyEquipmentRef[] | null;
    notes?: string;
}

export interface Reward {
    gil: number;
    cp?: number;
    clanPoints?: number;
    items?: string[] | string;
    loot?: string[] | string;
    abilities?: string[];
    other?: string;
    laws?: string[];
}

export type MissionTag = string;

export interface RequiredTalents {
    negotiation?: number;
    aptitude?: number;
    teamwork?: number;
    adaptability?: number;
}

export interface MissionRecruitmentResult {
    job: string;
    answers: string[];
    race?: string;
}

export interface MissionRecruitmentGroup {
    race: string;
    months: string[];
    results: MissionRecruitmentResult[];
}

export interface MissionRecruitmentGuide {
    instructions: string[];
    groups: MissionRecruitmentGroup[];
}

export interface Mission {
    id: string;
    arc: string;
    name: string;
    description?: string;
    rank?: number;
    recommendedLevel?: string;
    region: string;
    fee?: number;
    days?: number;
    questType?: string;
    canDispatch?: boolean;
    canCancel?: boolean;
    members?: number;
    prerequisite?: string;
    requiredItems?: string[];
    requiredTalents?: RequiredTalents;
    dispatchRecommended?: string[];
    objective?: string;
    law?: string;
    enemies: Enemy[];
    battlefield?: string[];
    strategy?: string[];
    rewards: Reward;
    notes?: string;
    tags?: string[];
    missable?: boolean;
    retroAchievementIds?: string[];
    recruitmentGuide?: MissionRecruitmentGuide;
}

export interface RetroAchievement {
    id: string;
    name: string;
    description: string;
    points?: number;
    missable?: boolean;
    hidden?: boolean;
    notes?: string;
    missionId?: string;
    category?: string;
}

export interface RetroAchievementRef {
    id: string;
    missable?: boolean;
}

export interface RetroAchievementMeta {
    id: string;
    name: string;
    description: string;
    points?: number;
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

export interface RaceJob {
    name: string;
    summary: string;
}

export interface RaceJobs {
    race: string;
    tagline: string;
    jobs: RaceJob[];
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

export type PanelTone =
    | "pink"
    | "red"
    | "orange"
    | "amber"
    | "yellow"
    | "lime"
    | "emerald"
    | "cyan"
    | "blue"
    | "indigo"
    | "purple"
    | "neutral";

export interface MetaPanel {
    id: string;
    title: string;
    subtitle?: string;
    tone: PanelTone;
    paragraphs: string[];
    bullets?: string[];
}

export interface FaqItem {
    id: string;
    question: string;
    answer: string;
    tags: string[];
}

export interface ClanTrialTitle {
    title: string;
    talents: string;
    privilege: string;
    discount: string;
    objective: string;
}

export interface ClanTrial {
    id: string;
    name: string;
    law: string;
    rank: number;
    location: string;
    days: number;
    price: string;
    requiredTalents: string;
    lawRequirement: "Must obey" | "Can break if needed" | "Unknown";
    challenge: string;
    titles: ClanTrialTitle[];
    notes: string[];
    completionTips: string[];
}

export interface ClanTrialGuideSection {
    id: string;
    title: string;
    body: string;
    bullets: string[];
}

export interface ClanTalentGuide {
    id: string;
    name: string;
    summary: string;
    watchFor: string;
}

export interface ClanPrivilegeRoadmapItem {
    id: string;
    privilege: string;
    effect: string;
    trial: string;
    title: string;
    objective: string;
}
