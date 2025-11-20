import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import type { PanelTone } from "../../types/ffta2";

const toneClasses: Record<PanelTone, { border: string; bg: string; header: string; pill: string }> = {
    neutral: {
        border: "border-zinc-300 dark:border-zinc-600",
        // lighter on left → darker on right
        bg: "bg-gradient-to-r from-zinc-700 to-zinc-900 dark:from-zinc-800 dark:to-black",
        header: "from-zinc-600 to-zinc-900 dark:from-zinc-700 dark:to-black",
        pill: "bg-zinc-700 dark:bg-zinc-600",
    },

    blue: {
        border: "border-sky-300 dark:border-sky-600",
        // light sky → saturated sky
        bg: "bg-gradient-to-r from-sky-700 to-sky-400 dark:from-sky-700 dark:to-sky-800",
        header: "from-sky-700 to-sky-400 dark:from-sky-700 dark:to-sky-800",
        pill: "bg-sky-700 dark:bg-sky-700",
    },

    green: {
        border: "border-emerald-300 dark:border-emerald-600",
        bg: "bg-gradient-to-r from-emerald-700 to-emerald-400 dark:from-emerald-700 dark:to-emerald-800",
        header: "from-emerald-700 to-emerald-400 dark:from-emerald-700 dark:to-emerald-800",
        pill: "bg-emerald-700 dark:bg-emerald-700",
    },

    red: {
        border: "border-rose-300 dark:border-rose-600",
        bg: "bg-gradient-to-r from-rose-700 to-rose-400 dark:from-rose-700 dark:to-rose-800",
        header: "from-rose-700 to-rose-400 dark:from-rose-700 dark:to-rose-800",
        pill: "bg-rose-700 dark:bg-rose-700",
    },

    purple: {
        border: "border-violet-300 dark:border-violet-600",
        bg: "bg-gradient-to-r from-violet-700 to-violet-400 dark:from-violet-700 dark:to-violet-800",
        header: "from-violet-700 to-violet-400 dark:from-violet-700 dark:to-violet-800",
        pill: "bg-violet-700 dark:bg-violet-700",
    },

    amber: {
        border: "border-amber-300 dark:border-amber-600",
        bg: "bg-gradient-to-r from-amber-700 to-amber-400 dark:from-amber-700 dark:to-amber-800",
        header: "from-amber-700 to-amber-400 dark:from-amber-700 dark:to-amber-800",
        pill: "bg-amber-700 dark:bg-amber-700",
    },

    yellow: {
        border: "border-yellow-300 dark:border-yellow-600",
        bg: "bg-gradient-to-r from-yellow-700 to-yellow-700 dark:from-yellow-700 dark:to-yellow-700",
        header: "from-yellow-700 to-yellow-700 dark:from-yellow-700 dark:to-yellow-700",
        pill: "bg-yellow-700 dark:bg-yellow-700",
    },
};

export function Panel({
    title,
    subtitle,
    tone = "blue",
    children,
}: {
    title: string;
    subtitle?: string;
    tone?: PanelTone;
    children: React.ReactNode;
}) {
    const [open, setOpen] = useState(false);
    const t = toneClasses[tone];

    return (
        <section className={`rounded-2xl border ${t.border} ${t.bg} shadow-sm shadow-black/10 dark:shadow-black/40 overflow-hidden`}>
            <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                className={`w-full text-left px-4 py-3 sm:px-5 sm:py-4 bg-gradient-to-r ${t.header} text-zinc-50 flex items-center justify-between gap-3`}
            >
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-2">
                    <h2 className="text-lg sm:text-xl font-semibold tracking-tight flex items-center gap-2">
                        {/* <span
                            className={`inline-flex items-center px-2 py-0.5 rounded-full text-[0.65rem] font-semibold uppercase tracking-wide text-zinc-100 ${t.pill}`}
                        >
                            Main
                        </span> */}
                        <span>{title}</span>
                    </h2>
                    {subtitle && (
                        <p className="text-xs sm:text-sm text-zinc-100/80 max-w-xl mt-0.5 sm:mt-0">{subtitle}</p>
                    )}
                </div>
                <span className="flex items-center gap-1 text-xs text-zinc-100/80">
                    <span className="hidden sm:inline">{open ? "Hide panel" : "Show panel"}</span>
                    {open ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </span>
            </button>
            {open && (
                <div className="p-4 sm:p-5">
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
