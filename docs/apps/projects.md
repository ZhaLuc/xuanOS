# App: Projects

**Path:** `src/apps/projects.ts`  
**ID:** `projects`  
**Window:** 560×520, title `Projects`  
**Icon:** `/projects-icon.png`

---

## Purpose

Showcase repositories with short blurbs and GitHub links in an expandable list.

---

## Data Model

```ts
type Project = { name: string; blurb: string; url: string };
```

In-module array currently includes GenesisOS, mycc, GridMark, RayTracing, Underwater Robotics, WebRadarDL, ManualMapperWindows, AZSEF water analysis, BMECS EPICS, SaveEditorTBCA, AstroBeeQuest, Codeforces, USACO, Arch Linux Webpage.

---

## Interaction

Each item:

- Toggle button with chevron `↓` / `↑`.
- Panel with blurb + `github` anchor (`target="_blank"`, `noopener noreferrer`).
- Open state via `.is-open` on the item + `aria-expanded`.

Multiple items may be open simultaneously.

---

## Extending

Append to the `projects` array; no registry change needed.

---

## Related Documents

- [Apps Overview](./overview.md)
