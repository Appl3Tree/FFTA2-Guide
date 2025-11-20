// src/data/missions/storyOptional.ts
// Aggregates all per-arc optional mission fragments into a single export.
// Each arc lives in its own storyOptional.X#.ts file.

import type { Mission } from "../../types/ffta2";

import { OPTIONAL_MISSIONS_A1 } from "./storyOptional.A1";
import { OPTIONAL_MISSIONS_A2 } from "./storyOptional.A2";
import { OPTIONAL_MISSIONS_A3 } from "./storyOptional.A3";
import { OPTIONAL_MISSIONS_A4 } from "./storyOptional.A4";
import { OPTIONAL_MISSIONS_A5 } from "./storyOptional.A5";

import { OPTIONAL_MISSIONS_B1 } from "./storyOptional.B1";
import { OPTIONAL_MISSIONS_B2 } from "./storyOptional.B2";
import { OPTIONAL_MISSIONS_B3 } from "./storyOptional.B3";
import { OPTIONAL_MISSIONS_B4 } from "./storyOptional.B4";
import { OPTIONAL_MISSIONS_B5 } from "./storyOptional.B5";

import { OPTIONAL_MISSIONS_C1 } from "./storyOptional.C1";
import { OPTIONAL_MISSIONS_C2 } from "./storyOptional.C2";
import { OPTIONAL_MISSIONS_C3 } from "./storyOptional.C3";
import { OPTIONAL_MISSIONS_C4 } from "./storyOptional.C4";
import { OPTIONAL_MISSIONS_C5 } from "./storyOptional.C5";

import { OPTIONAL_MISSIONS_D1 } from "./storyOptional.D1";
import { OPTIONAL_MISSIONS_D2 } from "./storyOptional.D2";
import { OPTIONAL_MISSIONS_D3 } from "./storyOptional.D3";
import { OPTIONAL_MISSIONS_D4 } from "./storyOptional.D4";
import { OPTIONAL_MISSIONS_D5 } from "./storyOptional.D5";

import { OPTIONAL_MISSIONS_E1 } from "./storyOptional.E1";
import { OPTIONAL_MISSIONS_E2 } from "./storyOptional.E2";
import { OPTIONAL_MISSIONS_E3 } from "./storyOptional.E3";
import { OPTIONAL_MISSIONS_E4 } from "./storyOptional.E4";
import { OPTIONAL_MISSIONS_E5 } from "./storyOptional.E5";

// Primary unified export for the rest of the app to consume.
export const STORY_OPTIONAL_MISSIONS: Mission[] = [
    // Arc A
    ...OPTIONAL_MISSIONS_A1,
    ...OPTIONAL_MISSIONS_A2,
    ...OPTIONAL_MISSIONS_A3,
    ...OPTIONAL_MISSIONS_A4,
    ...OPTIONAL_MISSIONS_A5,

    // Arc B
    ...OPTIONAL_MISSIONS_B1,
    ...OPTIONAL_MISSIONS_B2,
    ...OPTIONAL_MISSIONS_B3,
    ...OPTIONAL_MISSIONS_B4,
    ...OPTIONAL_MISSIONS_B5,

    // Arc C
    ...OPTIONAL_MISSIONS_C1,
    ...OPTIONAL_MISSIONS_C2,
    ...OPTIONAL_MISSIONS_C3,
    ...OPTIONAL_MISSIONS_C4,
    ...OPTIONAL_MISSIONS_C5,

    // Arc D
    ...OPTIONAL_MISSIONS_D1,
    ...OPTIONAL_MISSIONS_D2,
    ...OPTIONAL_MISSIONS_D3,
    ...OPTIONAL_MISSIONS_D4,
    ...OPTIONAL_MISSIONS_D5,

    // Arc E
    ...OPTIONAL_MISSIONS_E1,
    ...OPTIONAL_MISSIONS_E2,
    ...OPTIONAL_MISSIONS_E3,
    ...OPTIONAL_MISSIONS_E4,
    ...OPTIONAL_MISSIONS_E5
];

// Backwards-compat alias so existing imports keep working:
// MissionTabs.tsx imports { OPTIONAL_MISSIONS } from this file.
export const OPTIONAL_MISSIONS = STORY_OPTIONAL_MISSIONS;

