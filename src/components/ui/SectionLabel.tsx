import React from "react";

export function SectionLabel({ children }: { children: React.ReactNode }) {
    return (
        <div className="inline-flex items-center gap-2 rounded-full bg-zinc-900/80 px-3 py-1 text-xs font-medium uppercase tracking-wide text-zinc-200 ring-1 ring-zinc-700/80">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            {children}
        </div>
    );
}
