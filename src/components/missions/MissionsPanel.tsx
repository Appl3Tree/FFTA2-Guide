import React from "react";
import { ALL_MISSIONS } from "../../data/missions/allMissions";
import { useProgress } from "../ProgressContext";
import { Panel } from "../ui/Panel";
import { PanelProgress } from "../ui/PanelProgress";
import { MissionTabs } from "./MissionTabs";
import { useChecklistPreferences } from "../ChecklistPreferencesContext";

const QUEST_REPORT_MISSIONS = ALL_MISSIONS.filter(
    (mission) => mission.arc !== "EX" && mission.arc !== "ME",
);
const OTHER_MISSIONS = ALL_MISSIONS.filter(
    (mission) => mission.arc === "EX" || mission.arc === "ME",
);

export function MissionsPanel() {
    const { checked } = useProgress();
    const { isChecklistEnabled, isScopeEnabled } = useChecklistPreferences();
    const trackingEnabled = isChecklistEnabled("missions");
    const trackedQuestReportMissions = isScopeEnabled(
        "missions",
        "quest-report",
    )
        ? QUEST_REPORT_MISSIONS
        : [];
    const trackedOtherMissions = isScopeEnabled("missions", "other-missions")
        ? OTHER_MISSIONS
        : [];
    const completedQuestReportMissions = trackedQuestReportMissions.filter(
        (mission) => checked[`mission:${mission.id}`],
    ).length;
    const completedOtherMissions = trackedOtherMissions.filter(
        (mission) => checked[`mission:${mission.id}`],
    ).length;
    const completedMissions =
        completedQuestReportMissions + completedOtherMissions;
    const trackedMissionTotal =
        trackedQuestReportMissions.length + trackedOtherMissions.length;

    return (
        <Panel
            title="Missions Hub"
            subtitle={`${QUEST_REPORT_MISSIONS.length} Quest Report missions plus ${OTHER_MISSIONS.length} optional missions and map events.`}
            tone="purple"
            defaultOpen
            collapsible={false}
            headerAddon={trackingEnabled && trackedMissionTotal > 0 ? (
                <PanelProgress
                    completed={completedMissions}
                    label="Missions"
                    tone="violet"
                    total={trackedMissionTotal}
                />
            ) : undefined}
        >
            <MissionTabs />
        </Panel>
    );
}
