# Final Fantasy Tactics A2 Guide

A fan-made, data-driven reference for **Final Fantasy Tactics A2: Grimoire of the Rift (FFTA2)** — focused on making it easier to browse missions, filter by story arc and tags, and view rich mission details in one place.

> **GitHub Pages URL:** `https://appl3tree.github.io/FFTA2-Guide/`

---

## 🌟 About the Project

This project builds on the earlier **FFTA-Guide** and adapts the approach to *Final Fantasy Tactics A2*. FFTA2 includes a large number of missions and loosely associated arcs, and this guide organizes that information into:

* A searchable mission list
* Arc-based filtering (A1–E5)
* Tag-based filtering
* Collapsible mission details with structured sections

All mission, meta, and race data is stored in TypeScript files under `src/data/` and rendered with React components.

---

## 🧭 Features

### Mission Browser

The mission browser includes story, optional, and mark missions defined in:

* `src/data/missions/storyMain.ts`
* Multiple `storyOptional.*.ts` files
* `marks.ts`

Missions can be:

* Searched by name, ID, region, description, rewards, tags, and notes
* Filtered by arc (`A1`–`E5` or `ALL`)
* Filtered by tag (as defined in `MissionTag` and `MISSION_TAGS`)

Each mission card shows, when available:

* ID, name, region
* Arc label
* Recommended level (from `rank`)
* Quest type and party size
* Contract details (fee, days, dispatch/cancel allowed)
* Rewards (gil, clan points, loot, items)
* Requirements (items, talents, recommended jobs)
* Strategy notes
* Enemy list
* Freeform notes
* Merged tag list

Mission detail sections are collapsed by default and expand when clicked.

### Search & Filters

The mission list supports:

* Text search
* Arc filtering
* Tag filtering
* Toggleable filter sections for a cleaner default view

### Meta, Systems, and Races Panels

The home view includes collapsible informational panels:

* **Intro Panels** using `INTRO_PANELS`
* **Systems Panels** using `SYSTEMS_PANELS`
* **Races Panels** using `RACE_JOBS`

All use the shared `Panel` component with a collapsible layout and tone-based styling.

---

## 🧱 Built With

* **React**
* **TypeScript**
* **Vite** with `@vitejs/plugin-react-swc`
* **TailwindCSS**
* **lucide-react** for icons
* **GitHub Pages** for deployment (`gh-pages` package)

Supporting structure includes:

* `src/types/ffta2.ts` for mission, meta, and race types
* `src/utils/keyify.ts`
* Global styles in `src/styles/index.css`

---

## 🗂️ Project Structure

```
src/
  App.tsx
  main.tsx

  components/
    missions/
      MissionTabs.tsx
      MissionCard.tsx
      MissionList.tsx
      MissionFilters.tsx
    meta/
      IntroPanels.tsx
      SystemsPanels.tsx
      RacesPanels.tsx
    ui/
      Panel.tsx
      SectionLabel.tsx

  data/
    missions/
      storyMain.ts
      storyOptional.A1.ts
      storyOptional.A2.ts
      ...
      storyOptional.E5.ts
      marks.ts
      missionTags.ts
    meta/
      introPanels.ts
      systemsPanels.ts
    races/
      raceJobs.ts

  styles/
    index.css

  types/
    ffta2.ts

  utils/
    keyify.ts
```

Arc and tag information is encoded directly in mission data and `MISSION_TAGS`.

---

## 💡 Feedback & Contributions

If you find incorrect mission data, missing missions, or UI issues, feel free to:

* Open an issue
* Submit a pull request

All mission and meta data is written in plain TypeScript objects, making contributions straightforward.

---

## ⚠️ Spoiler Notice

Mission names and some metadata are always visible. Detailed strategy, enemies, and notes appear only inside expanded panels, allowing you to control how much information you reveal.

---

## 🎮 Acknowledgments

Thanks to:

* The **FFTA2 community** for preserving mission information
* Wikis and archived forum posts that informed the mission data
* The earlier **FFTA-Guide** project for structural inspiration
* Square Enix for creating *Final Fantasy Tactics A2*

---

## 📖 License

This is a **fan-made project**.
All content related to *Final Fantasy Tactics A2: Grimoire of the Rift* is © Square Enix.
This guide is provided for **personal and educational use only**.

---
