# Final Fantasy Tactics A2 Guide

A comprehensive, fan-made reference for **Final Fantasy Tactics A2: Grimoire of the Rift (FFTA2)** — built to make it easier to browse missions, understand story arcs, filter optional content, and track progress throughout the game.

🕹️ **Live Site:** [https://appl3tree.github.io/FFTA2-Guide/](https://appl3tree.github.io/FFTA2-Guide/)

---

## 🌟 About the Project

This guide is a modern, data-driven companion for *Final Fantasy Tactics A2*. The game’s mission list is massive and full of branching arcs, optional content, and hidden dependencies. Managing all of that with wikis or scattered notes quickly becomes messy.

This project centralizes that information into a single organized interface with:

* structured mission data
* story arc groupings
* tag-based filtering
* expandable mission details
* local save slots for tracking

It builds on lessons learned from the earlier **FFTA-Guide** project, but redesigned and rebuilt specifically for the much larger FFTA2 mission ecosystem.

---

## 🧭 Features

### ✔️ Mission Browser

Browse the entire mission list with clear structure and metadata, including:

* Mission names
* Categories / tags
* Arc placement
* Rewards
* Requirements
* Notes

### ✔️ Story Arc Organization

FFTA2 contains numerous multi-mission arcs. This guide organizes arcs into their own sections so you can easily:

* Understand mission order
* See where optional branches appear
* Track your position within any arc

### ✔️ Tag-Based Filtering

Filter missions by tags to quickly locate:

* Story missions
* Optional missions
* Clan trials
* Race-specific quests
* Regions
* Item / skill related missions

The filtering system is fully dynamic and updates the mission list instantly.

### ✔️ Save Slots (LocalStorage)

Track your mission progress across multiple playthroughs using built-in save slots.
No login, no server — everything is stored locally in the browser.

### ✔️ Clean, Expandable UI

Mission details are fully expandable/collapsible so you can avoid spoilers unless you choose to reveal more information.

### ✔️ Mobile-Friendly Layout

Components are designed with Tailwind to stay readable on both desktop and mobile.

---

## 🧱 Built With

* **React** (with functional components)
* **TypeScript**
* **Vite** for development & builds
* **TailwindCSS** for layout and styling
* **GitHub Pages** for hosting
* **LocalStorage** for client-side save files

The project follows a fully data-driven structure where missions, arcs, and tags are defined in `/data` and rendered via reusable components.

---

## 🗂️ Project Structure

```
src/
  components/
    missions/        # Mission list, mission details, tag filters
    ui/              # Shared UI components
  data/
    missions/        # Mission definitions split by sections/arcs
    arcs/            # Story arc data groups
    tags/            # Tag metadata
  save/              # LocalStorage save slot logic
  App.tsx
  main.tsx

public/
  # Public assets

vite.config.ts
tailwind.config.cjs
package.json
```

Everything mission-related is modular and easy to extend.

---

## 💡 Feedback & Contributions

If you find incorrect mission data, missing prerequisites, reward errors, or want to suggest improvements:

* **Open an issue**
* **Submit a pull request**

All contributions are welcome — this is a fan project built for the community.

---

## ⚠️ Spoiler Notice

The guide includes mission names, arc progressions, and rewards.
All spoiler-heavy details are **collapsed by default**, letting you browse safely.

---

## 🎮 Acknowledgments

Special thanks to:

* The **FFTA2 community** for preserving mission data over the years
* Wiki contributors and archived forum posts used as reference material
* The original **FFTA-Guide** project which inspired the structure
* Square Enix for creating one of the best tactics RPGs ever made

---

## 📖 License

This is a **fan project**.
All content related to *Final Fantasy Tactics A2: Grimoire of the Rift* is © Square Enix.
This guide is provided strictly for **educational and personal use**.

---
