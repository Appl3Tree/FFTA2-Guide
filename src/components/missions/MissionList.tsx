import React, { useMemo, useState } from "react";
import type { Mission } from "../../types/ffta2";
import { MissionFilters } from "./MissionFilters";
import { MissionCard } from "./MissionCard";

export function MissionList({ missions }: { missions: Mission[] }) {
    const [filterArc, setFilterArc] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    const visible = useMemo(
        () =>
            missions.filter((m) => {
                // Arc filter
                if (filterArc && m.arc !== filterArc) {
                    return false;
                }

                const term = searchTerm.trim().toLowerCase();
                if (!term) {
                    return true;
                }

                // 🔍 Search anywhere in the mission object
                const haystack = JSON.stringify(m).toLowerCase();
                return haystack.includes(term);
            }),
        [missions, filterArc, searchTerm],
    );

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

