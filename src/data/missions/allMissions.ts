// src/data/missions/allMissions.ts
import type { Mission } from "../../types/ffta2";
import { STORY_MAIN_MISSIONS } from "./storyMain";
import { STORY_OPTIONAL_MISSIONS } from "./storyOptional";

export const ALL_MISSIONS: Mission[] = [
    ...STORY_MAIN_MISSIONS,
    ...STORY_OPTIONAL_MISSIONS,
];

