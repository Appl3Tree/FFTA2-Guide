import React from "react";

type ProgressTone = "amber" | "cyan" | "violet";

const toneClasses: Record<
    ProgressTone,
    { fill: string; track: string; value: string }
> = {
    amber: {
        fill: "bg-amber-500 dark:bg-amber-300",
        track: "bg-amber-100 ring-amber-500/20 dark:bg-amber-950/70",
        value: "text-amber-700 dark:text-amber-200",
    },
    cyan: {
        fill: "bg-cyan-500 dark:bg-cyan-300",
        track: "bg-cyan-100 ring-cyan-500/20 dark:bg-cyan-950/70",
        value: "text-cyan-700 dark:text-cyan-200",
    },
    violet: {
        fill: "bg-violet-500 dark:bg-violet-300",
        track: "bg-violet-100 ring-violet-500/20 dark:bg-violet-950/70",
        value: "text-violet-700 dark:text-violet-200",
    },
};

export function PanelProgress({
    completed,
    label,
    meta,
    tone,
    total,
}: {
    completed: number;
    label: string;
    meta?: string;
    tone: ProgressTone;
    total: number;
}) {
    const safeTotal = Math.max(0, total);
    const safeCompleted = Math.min(Math.max(0, completed), safeTotal);
    const percentage =
        safeTotal === 0
            ? 0
            : Math.round((safeCompleted / safeTotal) * 1000) / 10;
    const percentageLabel = Number.isInteger(percentage)
        ? `${percentage}%`
        : `${percentage.toFixed(1)}%`;
    const classes = toneClasses[tone];

    return (
        <div
            className="grid min-w-0 grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-1.5"
            data-progress-label={label}
        >
            <div className="flex min-w-0 items-baseline gap-2 text-xs leading-none text-zinc-600 dark:text-zinc-300">
                <span className="shrink-0 font-medium">{label}</span>
                <span className="shrink-0 font-semibold tabular-nums text-zinc-950 dark:text-zinc-50">
                    {safeCompleted}/{safeTotal}
                </span>
                {meta ? (
                    <span className="min-w-0 truncate text-zinc-500 dark:text-zinc-400">
                        <span aria-hidden="true">·</span> {meta}
                    </span>
                ) : null}
            </div>
            <span
                className={`text-xs font-semibold tabular-nums ${classes.value}`}
            >
                {percentageLabel}
            </span>
            <div
                role="progressbar"
                aria-label={`${label} completion`}
                aria-valuemin={0}
                aria-valuemax={Math.max(safeTotal, 1)}
                aria-valuenow={safeCompleted}
                aria-valuetext={`${safeCompleted} of ${safeTotal}, ${percentageLabel}`}
                className={`col-span-2 h-1.5 overflow-hidden rounded-full ring-1 ring-inset ${classes.track}`}
            >
                <div
                    className={`h-full rounded-full transition-[width] duration-300 motion-reduce:transition-none ${classes.fill}`}
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    );
}
