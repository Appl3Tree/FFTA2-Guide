export interface Enemy {
    name: string;
    type: string;
    notes?: string;
}

export interface Reward {
    gil?: number;
    cp?: number;
    loot?: string;
    items?: string[];
}

export interface RetroAchievements {
    id: string;
    name: string;
    description: string;
    missable?: boolean;
}

export interface GlobalRetroAchievement {
    id: string;
    name: string;
    description: string;
    category: string;
}

export type MissionTag =
    | "story"
    | "optional"
    | "job-unlock"
    | "hunt"
    | "notorious-mark"
    | "multi-battle"
    | "chain"
    | "recruit"
    | "boss"
    | "collection"
    | "puzzle"
    | "escort"
    | "protection"
    | "timed"
    | "law-sensitive"
    | "story-cameo"
    | "elite";

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
    tags?: (MissionTag | "optional" | string)[];
}

export interface Job {
    name: string;
    role: string;
    summary: string;
    notes?: string;
}

export interface RaceJobs {
    race: string;
    tagline: string;
    jobs: Job[];
}

export type PanelTone = "blue" | "green" | "red" | "purple" | "amber" | "neutral" | "yellow";

export interface MetaPanel {
    id: string;
    title: string;
    subtitle?: string;
    tone: PanelTone;
    paragraphs: string[];
    bullets?: string[];
}
