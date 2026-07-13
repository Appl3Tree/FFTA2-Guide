import React, { useMemo, useState } from "react";
import type { Mission } from "../../types/ffta2";
import { MissionFilters } from "./MissionFilters";
import { MissionCard } from "./MissionCard";
import { getMissionSearchScore } from "../../utils/missionSearch";

export function MissionList({ missions }: { missions: Mission[] }) {
    const [filterArc, setFilterArc] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    const visible = useMemo(() => {
        const term = searchTerm.trim().toLowerCase();
        let filtered = missions
            .map((m) => {
                // Arc filter
                if (filterArc && m.arc !== filterArc) {
                    return null;
                }

                if (!term) {
                    return { mission: m, score: 0 };
                }

                const score = getMissionSearchScore(m, term);
                return score == null ? null : { mission: m, score };
            })
            .filter(
                (entry): entry is { mission: Mission; score: number } =>
                    entry !== null,
            );

        if (term) {
            const bestScore = filtered.reduce(
                (best, entry) => Math.max(best, entry.score),
                0,
            );

            if (bestScore >= 900) {
                filtered = filtered.filter((entry) => entry.score >= 820);
            }

            filtered.sort((a, b) => {
                if (b.score !== a.score) return b.score - a.score;
                return a.mission.id.localeCompare(b.mission.id);
            });
        }

        return filtered.map((entry) => entry.mission);
    }, [missions, filterArc, searchTerm]);

    return (
        <div className="space-y-4">
            <MissionFilters
                missions={missions}
                filterArc={filterArc}
                setFilterArc={setFilterArc}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
            />
            <div className="space-y-3">
                {visible.map((mission) => (
                    <MissionCard key={mission.id} mission={mission} />
                ))}
            </div>
        </div>
    );
}
