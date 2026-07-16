import { RefreshCw } from "lucide-react";

const REPEAT_CRAFT_EXPLANATION =
    "Only one copy is stocked each time. Submit the recipe again for another copy.";

export function RepeatCraftBadge() {
    return (
        <span
            className="inline-flex items-center gap-1 rounded-md border border-amber-400/60 bg-amber-400/10 px-1.5 py-0.5 text-[0.7rem] font-semibold text-amber-200"
            aria-label={`Repeat craft. ${REPEAT_CRAFT_EXPLANATION}`}
            title={REPEAT_CRAFT_EXPLANATION}
        >
            <RefreshCw aria-hidden="true" size={12} strokeWidth={2.2} />
            Repeat craft
        </span>
    );
}
