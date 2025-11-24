import React from "react";
import { Panel } from "../ui/Panel";
import { INTRO_PANELS } from "../../data/meta/introPanels";
import { SYSTEMS_PANELS } from "../../data/meta/systemsPanels";

export function BeforeYouStartPanel() {
    return (
        <Panel
            title="Before You Start"
            subtitle="Heads-up notes and systems to keep in mind as you begin your FFTA2 run."
            tone="neutral"
        >
            <div className="space-y-5 mt-3">
                {/* Intro / how-to-use sections */}
                {INTRO_PANELS.map((panel) => (
                    <section key={panel.id} className="space-y-3">
                        <header className="space-y-1">
                            <h3 className="text-sm sm:text-base font-semibold tracking-tight">
                                {panel.title}
                            </h3>
                            {panel.subtitle && (
                                <p className="text-xs sm:text-[0.8rem] text-zinc-600 dark:text-zinc-300">
                                    {panel.subtitle}
                                </p>
                            )}
                        </header>

                        <div className="space-y-3 text-sm sm:text-[0.9rem]">
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
                    <hr className="border-dashed border-zinc-300/70 dark:border-zinc-700/70" />
                    </section>
                ))}

                {/* Systems / mechanics sections */}
                {SYSTEMS_PANELS.map((panel) => (
                    <section key={panel.id} className="space-y-3">
                        <header className="space-y-1">
                            <h3 className="text-sm sm:text-base font-semibold tracking-tight">
                                {panel.title}
                            </h3>
                            {panel.subtitle && (
                                <p className="text-xs sm:text-[0.8rem] text-zinc-600 dark:text-zinc-300">
                                    {panel.subtitle}
                                </p>
                            )}
                        </header>

                        <div className="space-y-3 text-sm sm:text-[0.9rem]">
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
                            <hr className="border-dashed border-zinc-300/70 dark:border-zinc-700/70" />
                        </div>
                    </section>
                ))}
            </div>
        </Panel>
    );
}

