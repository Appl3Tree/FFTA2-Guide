// src/data/missions/storyOptional.EX.ts
// Special map-event missions that sit outside the normal quest-grid arcs.

import type { Mission } from "../../types/ffta2";

export const OPTIONAL_MISSIONS_EX: Mission[] = [
    {
        id: "EX-03",
        arc: "EX",
        name: "Gifted",
        description:
            "Luso and Adelle stop at Overlook Rise in Zedlei Forest to gaze at the stars. Lennart appears, senses Adelle's talent, and tests her in a duel.",
        rank: 33,
        region: "Zedlei Forest",
        questType: "Battle",
        canDispatch: false,
        canCancel: false,
        members: 1,
        prerequisite: "The Search",
        objective: "Defeat Lennart!",
        law: "Forbidden: Targeting Distant Units – Actions targeting units two or more tiles away are forbidden.",
        enemies: [
            {
                name: "Lennart",
                job: "Heritor",
                quantity: 1,
                notes:
                    "Duel opponent. This battle unlocks Heritor for Adelle.",
            },
        ],
        strategy: [
            "Adelle fights Lennart in a one-on-one duel after the Zedlei Forest event.",
            "Stay close enough to avoid the Targeting Distant Units law and use Adelle's strongest single-target damage and recovery options.",
            "Completing the duel unlocks the Heritor job for Adelle.",
        ],
        rewards: {
            gil: 2050,
            cp: 36,
            loot: "Lightwing Crystal ×1",
        },
        notes:
            "Special map-event mission. Appears after The Search, following Adelle's Heritor unlock event chain.",
        tags: ["optional", "job-unlock", "chain"],
    },
];
