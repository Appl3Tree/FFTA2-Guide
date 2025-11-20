import React from "react";
import { Panel } from "../ui/Panel";
import { INTRO_PANELS } from "../../data/meta/introPanels";

export function IntroPanels() {
    return (
        <>
            {INTRO_PANELS.map((panel) => (
                <Panel key={panel.id} title={panel.title} subtitle={panel.subtitle} tone={panel.tone}>
                    <div className="space-y-3 mt-3">
                        {panel.paragraphs.map((p, idx) => (
                            <p key={idx}>{p}</p>
                        ))}
                        {panel.bullets && panel.bullets.length > 0 && (
                            <ul className="list-disc list-inside space-y-1">
                                {panel.bullets.map((b, idx) => (
                                    <li key={idx}>{b}</li>
                                ))}
                            </ul>
                        )}
                    </div>
                </Panel>
            ))}
        </>
    );
}
