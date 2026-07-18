# Final Fantasy Tactics A2 Guide

A fan-made, data-driven completion reference for **Final Fantasy Tactics A2: Grimoire of the Rift (FFTA2)**. The app helps players track missions, RetroAchievements, equipment, abilities, bazaar recipes, races, jobs, and important missables in one place.

> **GitHub Pages URL:** `https://appl3tree.github.io/FFTA2-Guide/`

---

## About The Project

This project builds on the earlier **FFTA-Guide** and adapts the approach to *Final Fantasy Tactics A2*. FFTA2 has a large mission list, deep job and equipment systems, missable/recruitment chains, and optional challenge goals. This guide organizes that information into:

* A searchable mission list
* Arc-based filtering from `A1` through `E5`
* Tag-based filtering
* A missable RetroAchievements quick filter
* Multi-phase mission strategy and enemy breakdowns
* Equipment, ability, recipe, race, and job reference hubs
* Global search across the guide

All guide data is stored in TypeScript files under `src/data/` and rendered with React components.

---

## Features

### Completion Dashboard

The main page includes collapsible sections for:

* Before You Start notes
* RetroAchievements
* Races & Jobs
* Bazaar Recipes
* Equipment Hub
* Ability Hub
* Missions Hub

Progress state is tracked locally in the browser so users can mark missions and achievements complete as they play.

### Mission Browser

The mission browser includes story, optional, and mark-style missions defined in:

* `src/data/missions/storyMain.ts`
* Multiple `src/data/missions/storyOptional.*.ts` files
* `src/data/missions/missionTags.ts`

Missions can be:

* Searched by name, ID, region, description, rewards, tags, and notes
* Filtered by arc (`A1`-`E5` or `ALL`)
* Filtered by tag
* Filtered to missable RetroAchievements

Each mission card shows, when available:

* ID, name, region
* Arc label
* Recommended level
* Quest type and party size
* Contract details
* Rewards, including special reward notes
* Requirements
* Strategy notes
* Enemy lists
* Multi-phase tournament or route breakdowns
* Mission-specific RetroAchievements
* Freeform notes
* Merged tag list

Mission detail sections are collapsed by default and expand when clicked.

### Reference Hubs

The guide also includes structured reference data for:

* Bazaar recipes and loot requirements
* Equipment stats, rules, effects, and taught abilities
* Ability sets and ability details
* Race and job summaries
* RetroAchievements and mission ties

### Global Search

The floating global search panel searches across missions, abilities, equipment, recipes, races/jobs, and RetroAchievements.

### Data Quality

The validation commands check canonical counts, required fields, duplicate identifiers, cross-linked records, checklist coverage, and presentation invariants. Generated reports are written to `audit/` for review.

---

## Built With

* **React**
* **TypeScript**
* **Vite** with `@vitejs/plugin-react-swc`
* **TailwindCSS**
* **lucide-react** for icons
* **GitHub Pages** for deployment through GitHub Actions

Supporting structure includes:

* `src/types/ffta2.ts` for mission, equipment, ability, recipe, RetroAchievement, and reference types
* `src/utils/missionPhases.ts` for multi-phase mission grouping
* `scripts/audit-data.mjs` for local data integrity checks
* Global styles in `src/styles/index.css`

---

## Local Development

Install dependencies:

```bash
npm install
```

Start the local dev server:

```bash
npm run dev
```

Before publishing or opening a pull request, run:

```bash
npm run audit:data
npm run typecheck
npm run build
```

`npm run audit:data` writes a generated report to `audit/data-audit.json`. That file is intentionally ignored by git; the other focused audit commands write their reports to `audit/`.

---

## Project Structure

```text
src/
  App.tsx
  main.tsx

  components/
    missions/
      MissionTabs.tsx
      MissionCard.tsx
    meta/
      AbilityHub.tsx
      BazaarRecipesPanel.tsx
      EquipmentHub.tsx
      GlobalSearchPanel.tsx
      RetroAchievementsPanels.tsx
      IntroPanels.tsx
      SystemsPanels.tsx
      RacesPanels.tsx
    ui/
      Panel.tsx
      SectionLabel.tsx

  data/
    missions/
      allMissions.ts
      storyMain.ts
      storyOptional.A1.ts
      storyOptional.A2.ts
      ...
      storyOptional.E5.ts
      missionTags.ts
    abilities/
      abilities.ts
    bestiary/
      bestiary.ts
    equipment/
      equipment.ts
      equipment.weapons.ts
      equipment.armors.ts
      ...
    meta/
      introPanels.ts
      systemsPanels.ts
    races/
      raceJobs.ts
    bazaarRecipes.ts
    retroAchievements.ts

  styles/
    index.css

  types/
    ffta2.ts

  utils/
    missionPhases.ts
    resolveAbilities.ts
    resolveEquipment.ts

scripts/
  audit-data.mjs

audit/
  validation-notes.md
```

Arc and tag information is encoded directly in mission data and `MISSION_TAGS`. Runtime mission aggregation is handled by `ALL_MISSIONS`, which deduplicates story missions that also appear in per-arc data.

---

## Feedback & Contributions

If you find incorrect mission data, missing guide details, or UI issues, feel free to:

* Open an issue
* Submit a pull request

Most guide data is written in plain TypeScript objects, making contributions straightforward. Please run the local validation commands before submitting changes.

---

## Spoiler Notice

Mission names and some metadata are always visible. Detailed strategy, enemies, rewards, RetroAchievements, and notes appear inside expanded panels, allowing you to control how much information you reveal.

---

## Acknowledgments

Thanks to:

* The **FFTA2 community** for testing, corrections, and feedback
* Square Enix for creating *Final Fantasy Tactics A2*

---

## License

This is a **fan-made project**.
All content related to *Final Fantasy Tactics A2: Grimoire of the Rift* is copyright Square Enix.
This guide is provided for **personal and educational use only**.
