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
    children,
}: {
    title: string;
    subtitle?: string;
    tone?: PanelTone;
    headerAddon?: React.ReactNode;
    children: React.ReactNode;
}) {
    const [open, setOpen] = useState(false);
    const t = toneClasses[tone];

    return (
        <section
            className={`rounded-lg border ${t.border} bg-white/85 dark:bg-zinc-950/80 ring-1 ${t.ring} shadow-sm shadow-black/5 dark:shadow-black/25 overflow-hidden transition-colors`}
        >
            <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                className="group w-full text-left px-4 py-3 sm:px-5 sm:py-3.5 text-zinc-900 dark:text-zinc-50 flex items-center justify-between gap-3 bg-white/70 hover:bg-white dark:bg-zinc-900/40 dark:hover:bg-zinc-900/70 transition-colors"
            >
                <div className="w-full flex items-center gap-3">
                    <span
                        className={`hidden sm:block h-10 w-1.5 shrink-0 rounded-full ${t.accent}`}
                    />
                    <div className="w-full flex flex-col gap-2">
                        {headerAddon && <div>{headerAddon}</div>}
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
                            <div className="grid gap-1 sm:grid-cols-[minmax(8rem,14rem)_minmax(0,1fr)] sm:items-center sm:gap-4">
                                <h2
                                    className={`flex items-center gap-2 text-base sm:text-lg font-semibold tracking-tight leading-tight ${t.title}`}
                                >
                                    <span
                                        className={`inline-block h-2.5 w-2.5 shrink-0 rounded-full sm:hidden ${t.accent}`}
                                    />
                                    <span>{title}</span>
                                </h2>
                                {subtitle && (
                                    <p className="text-xs sm:text-sm leading-snug text-zinc-600 dark:text-zinc-300 max-w-2xl">
                                        {subtitle}
                                    </p>
                                )}
                            </div>
                            <span
                                className={`flex w-fit shrink-0 items-center gap-1 rounded-full px-2 py-1 text-[0.7rem] font-semibold uppercase tracking-wide text-zinc-700 dark:text-zinc-200 ${t.track}`}
                            >
                                <span className="hidden sm:inline">
                                    {open ? "Hide" : "Show"}
                                </span>
                                {open ? (
                                    <ChevronUp className="h-3.5 w-3.5" />
                                ) : (
                                    <ChevronDown className="h-3.5 w-3.5" />
                                )}
                            </span>
                        </div>
                    </div>
                </div>
            </button>

            {open && (
                <div className="border-t border-zinc-200/80 dark:border-zinc-800 bg-zinc-50/85 dark:bg-zinc-950/50">
                    <div
                        className="
                            border border-zinc-200/70 dark:border-zinc-700/70 
                            rounded-lg
                            p-4 sm:p-5 
                            bg-white/70 dark:bg-zinc-900/20
                            space-y-4 text-sm text-zinc-800 dark:text-zinc-100/90
                        "
                    >
                        {children}
                    </div>
                </div>
            )}
        </section>
    );
}
