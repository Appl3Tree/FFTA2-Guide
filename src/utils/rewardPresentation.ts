import type { ClanTalentChanges } from "../types/ffta2";

const TALENT_LABELS: Readonly<Record<keyof ClanTalentChanges, string>> = {
    negotiation: "Negotiation",
    aptitude: "Aptitude",
    teamwork: "Teamwork",
    adaptability: "Adaptability",
};

export function splitRewardEntries(
    value?: string | readonly string[] | null,
): string[] {
    const entries = Array.isArray(value) ? value : [value ?? ""];
    return entries
        .flatMap((entry) => entry.split(","))
        .map((part) => part.trim())
        .filter(Boolean);
}

export function getClanTalentChangeEntries(changes?: ClanTalentChanges) {
    if (!changes) return [];

    return (Object.keys(TALENT_LABELS) as Array<keyof ClanTalentChanges>)
        .map((key) => ({
            key,
            label: TALENT_LABELS[key],
            amount: changes[key] ?? 0,
        }))
        .filter((entry) => entry.amount > 0);
}
