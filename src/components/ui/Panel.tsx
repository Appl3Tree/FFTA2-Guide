import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import type { PanelTone } from "../../types/ffta2";

const toneClasses: Record<
    PanelTone,
    { border: string; ring: string; accent: string; title: string; track: string }
> = {
    pink: {
        border: "border-fuchsia-300/80 dark:border-fuchsia-700/60",
        ring: "ring-fuchsia-200/70 dark:ring-fuchsia-800/40",
        accent: "bg-fuchsia-500",
        title: "text-fuchsia-900 dark:text-fuchsia-100",
        track: "bg-fuchsia-500/15",
    },

    neutral: {
        border: "border-zinc-300/80 dark:border-zinc-700/70",
        ring: "ring-zinc-200/70 dark:ring-zinc-800/60",
        accent: "bg-zinc-500",
        title: "text-zinc-950 dark:text-zinc-50",
        track: "bg-zinc-500/15",
    },

    blue: {
        border: "border-sky-300/80 dark:border-sky-700/60",
        ring: "ring-sky-200/70 dark:ring-sky-800/40",
        accent: "bg-sky-500",
        title: "text-sky-900 dark:text-sky-100",
        track: "bg-sky-500/15",
    },

    emerald: {
        border: "border-emerald-300/80 dark:border-emerald-700/60",
        ring: "ring-emerald-200/70 dark:ring-emerald-800/40",
        accent: "bg-emerald-500",
        title: "text-emerald-900 dark:text-emerald-100",
        track: "bg-emerald-500/15",
    },

    cyan: {
        border: "border-cyan-300/80 dark:border-cyan-700/60",
        ring: "ring-cyan-200/70 dark:ring-cyan-800/40",
        accent: "bg-cyan-500",
        title: "text-cyan-900 dark:text-cyan-100",
        track: "bg-cyan-500/15",
    },

    red: {
        border: "border-red-300/80 dark:border-red-700/60",
        ring: "ring-red-200/70 dark:ring-red-800/40",
        accent: "bg-red-500",
        title: "text-red-900 dark:text-red-100",
        track: "bg-red-500/15",
    },

    orange: {
        border: "border-orange-300/80 dark:border-orange-700/60",
        ring: "ring-orange-200/70 dark:ring-orange-800/40",
        accent: "bg-orange-500",
        title: "text-orange-900 dark:text-orange-100",
        track: "bg-orange-500/15",
    },

    purple: {
        border: "border-violet-300/80 dark:border-violet-700/60",
        ring: "ring-violet-200/70 dark:ring-violet-800/40",
        accent: "bg-violet-500",
        title: "text-violet-900 dark:text-violet-100",
        track: "bg-violet-500/15",
    },

    indigo: {
        border: "border-indigo-300/80 dark:border-indigo-700/60",
        ring: "ring-indigo-200/70 dark:ring-indigo-800/40",
        accent: "bg-indigo-500",
        title: "text-indigo-900 dark:text-indigo-100",
        track: "bg-indigo-500/15",
    },

    amber: {
        border: "border-amber-300/80 dark:border-amber-700/60",
        ring: "ring-amber-200/70 dark:ring-amber-800/40",
        accent: "bg-amber-500",
        title: "text-amber-900 dark:text-amber-100",
        track: "bg-amber-500/15",
    },

    yellow: {
        border: "border-yellow-300/80 dark:border-yellow-700/60",
        ring: "ring-yellow-200/70 dark:ring-yellow-800/40",
        accent: "bg-yellow-400",
        title: "text-yellow-900 dark:text-yellow-100",
        track: "bg-yellow-400/15",
    },

    lime: {
        border: "border-lime-300/80 dark:border-lime-700/60",
        ring: "ring-lime-200/70 dark:ring-lime-800/40",
        accent: "bg-lime-500",
        title: "text-lime-900 dark:text-lime-100",
        track: "bg-lime-500/15",
    },
};

export function Panel({
    title,
    subtitle,
    tone = "blue",
    headerAddon,
    defaultOpen = false,
    collapsible = true,
    children,
}: {
    title: string;
    subtitle?: string;
    tone?: PanelTone;
    headerAddon?: React.ReactNode;
    defaultOpen?: boolean;
    collapsible?: boolean;
    children: React.ReactNode;
}) {
    const [open, setOpen] = useState(collapsible ? defaultOpen : true);
    const [hasOpened, setHasOpened] = useState(
        collapsible ? defaultOpen : true,
    );
    const panelId = React.useId();
    const titleId = `${panelId}-title`;
    const subtitleId = subtitle ? `${panelId}-subtitle` : undefined;
    const contentId = `${panelId}-content`;
    const t = toneClasses[tone];

    const toggleOpen = () => {
        if (!open) {
            setHasOpened(true);
        }
        setOpen((value) => !value);
    };

    return (
        <section
            className={`overflow-hidden rounded-lg border ${t.border} bg-white/85 shadow-sm shadow-black/5 ring-1 ${t.ring} transition-colors dark:bg-zinc-950/80 dark:shadow-black/25`}
            data-panel-title={title}
            aria-labelledby={titleId}
            aria-describedby={subtitleId}
        >
            <header
                className={`group relative grid w-full items-center gap-x-3 gap-y-2 bg-white/70 px-4 py-3 text-left text-zinc-900 transition-colors sm:px-5 sm:py-3.5 dark:bg-zinc-900/40 dark:text-zinc-50 ${
                    collapsible
                        ? `grid-cols-[auto_minmax(0,1fr)_auto] hover:bg-white dark:hover:bg-zinc-900/70 ${
                              headerAddon
                                  ? "lg:grid-cols-[auto_minmax(0,1fr)_minmax(15rem,19rem)_auto]"
                                  : ""
                          }`
                        : `grid-cols-[auto_minmax(0,1fr)] ${
                              headerAddon
                                  ? "lg:grid-cols-[auto_minmax(0,1fr)_minmax(15rem,19rem)]"
                                  : ""
                          }`
                }`}
            >
                <span
                    aria-hidden="true"
                    className={`h-2.5 w-2.5 shrink-0 rounded-full transition-transform group-hover:scale-110 motion-reduce:transition-none sm:h-10 sm:w-1.5 ${t.accent}`}
                />
                <div className="min-w-0 self-center">
                    <h2
                        id={titleId}
                        className={`text-base font-semibold leading-tight sm:text-lg ${t.title}`}
                    >
                        {title}
                    </h2>
                    {subtitle ? (
                        <p
                            id={subtitleId}
                            className="mt-1 min-w-0 text-xs leading-snug text-zinc-600 sm:text-sm dark:text-zinc-300"
                        >
                            {subtitle}
                        </p>
                    ) : null}
                </div>
                {headerAddon ? (
                    <div
                        className={
                            collapsible
                                ? "col-span-2 col-start-2 row-start-2 min-w-0 lg:col-span-1 lg:col-start-3 lg:row-start-1 lg:self-center"
                                : "col-start-2 row-start-2 min-w-0 lg:col-start-3 lg:row-start-1 lg:self-center"
                        }
                    >
                        {headerAddon}
                    </div>
                ) : null}
                {collapsible ? (
                    <>
                        <span
                            aria-hidden="true"
                            className={`col-start-3 row-start-1 flex min-h-9 w-11 shrink-0 items-center justify-center gap-1 justify-self-end rounded-md px-2 py-1 text-[0.72rem] font-semibold uppercase text-zinc-700 dark:text-zinc-200 sm:w-[4.75rem] ${
                                headerAddon
                                    ? "lg:col-start-4"
                                    : "lg:col-start-3"
                            } ${t.track}`}
                        >
                            <span className="hidden sm:inline">
                                {open ? "Hide" : "Show"}
                            </span>
                            {open ? (
                                <ChevronUp className="h-4 w-4" />
                            ) : (
                                <ChevronDown className="h-4 w-4" />
                            )}
                        </span>
                        <button
                            type="button"
                            onClick={toggleOpen}
                            aria-controls={contentId}
                            aria-describedby={subtitleId}
                            aria-expanded={open}
                            aria-labelledby={titleId}
                            className="absolute inset-0 z-10 rounded-[7px] focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-sky-300"
                        />
                    </>
                ) : null}
            </header>

            {hasOpened ? (
                <div
                    id={contentId}
                    hidden={!open}
                    className="border-t border-zinc-200/80 bg-zinc-50/85 dark:border-zinc-800 dark:bg-zinc-950/50"
                >
                    <div
                        className="
                            p-4 sm:p-5
                            space-y-4 text-sm text-zinc-800 dark:text-zinc-100/90
                        "
                    >
                        {children}
                    </div>
                </div>
            ) : null}
        </section>
    );
}
