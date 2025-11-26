import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import type { PanelTone } from "../../types/ffta2";

const toneClasses: Record<PanelTone, { border: string; bg: string; header: string; pill: string }> = {
    neutral: {
        border: "border-zinc-300 dark:border-zinc-700/80",
        bg: "bg-zinc-400 dark:bg-zinc-950/40",
        ring: "ring-zinc-400 dark:ring-zinc-700/50",
        pill: "bg-zinc-700 dark:bg-zinc-700",
    },

    blue: {
        border: "border-sky-300 dark:border-sky-700/80",
        bg: "bg-sky-400 dark:bg-sky-950/40",
        ring: "ring-sky-400 dark:ring-sky-700/50",
        pill: "bg-sky-700 dark:bg-sky-700",
    },

    emerald: {
        border: "border-emerald-300 dark:border-emerald-700/80",
        bg: "bg-emerald-400 dark:bg-emerald-950/40",
        ring: "ring-emerald-400 dark:ring-emerald-700/50",
        pill: "bg-emerald-700 dark:bg-emerald-700",
    },

    red: {
        border: "border-rose-300 dark:border-rose-700/80",
        bg: "bg-rose-400 dark:bg-rose-950/40",
        ring: "ring-rose-400 dark:ring-rose-700/50",
        pill: "bg-rose-700 dark:bg-rose-700",
    },

    purple: {
        border: "border-violet-300 dark:border-violet-700/80",
        bg: "bg-violet-400 dark:bg-violet-950/40",
        ring: "ring-violet-400 dark:ring-violet-700/50",
        pill: "bg-violet-700 dark:bg-violet-700",
    },

    amber: {
        border: "border-amber-300 dark:border-amber-700/80",
        bg: "bg-amber-400 dark:bg-amber-950/40",
        ring: "ring-amber-400 dark:ring-amber-700/50",
        pill: "bg-amber-700 dark:bg-amber-700",
    },

    yellow: {
        border: "border-yellow-300 dark:border-yellow-700/80",
        bg: "bg-yellow-400 dark:bg-yellow-950/40",
        ring: "ring-yellow-400 dark:ring-yellow-700/50",
        pill: "bg-yellow-700 dark:bg-yellow-700",
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
            className={`rounded-2xl border ${t.border} ${t.bg} ${t.ring} shadow-sm shadow-black/10 dark:shadow-black/40 overflow-hidden`}
        >
            <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                className={`w-full text-left px-4 py-3 sm:px-5 sm:py-3.5 ${t.header} text-zinc-50 flex items-center justify-between gap-3`}
            >
                <div className="w-full flex flex-col gap-2">
                    {headerAddon && <div>{headerAddon}</div>}
                    <div className="flex items-center justify-between gap-3">
                        <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-2">
                            <h2 className="text-lg sm:text-xl font-semibold tracking-tight flex items-center gap-2">
                                <span>{title}</span>
                            </h2>
                            {subtitle && (
                                <p className="text-xs sm:text-sm text-zinc-100/80 max-w-xl mt-0.5 sm:mt-0">
                                    {subtitle}
                                </p>
                            )}
                        </div>
                        <span className="flex items-center gap-1 text-xs text-zinc-100/80">
                            <span className="hidden sm:inline">
                                {open ? "Hide panel" : "Show panel"}
                            </span>
                            {open ? (
                                <ChevronUp className="h-4 w-4" />
                            ) : (
                                <ChevronDown className="h-4 w-4" />
                            )}
                        </span>
                    </div>
                </div>
            </button>

            {open && (
                <div className="border-t border-white/20 dark:border-zinc-700/70 bg-zinc-50/80 dark:bg-zinc-950/40">
                    <div
                        className="
                            border border-zinc-200/70 dark:border-zinc-700/70 
                            rounded-xl 
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

