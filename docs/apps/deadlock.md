# App: Deadlock

**Path:** `src/apps/deadlock.ts`  
**ID:** `deadlock`  
**Window:** 520×460, title `Deadlock`  
**Icon:** `/deadlock-icon.png`

---

## Purpose

A small slide deck about favorite Deadlock characters plus a personal rank slide with an external Statlocker profile link.

---

## Slide Model

```ts
type CharacterSlide = {
  kind: "character";
  name: string;
  portrait: string;
  alt: string;
  paragraphs: string[];
};

type StatsSlide = {
  kind: "stats";
  name: string;
  rankSrc: string;
  profileUrl: string;
  profileLabel: string;
};
```

Current slides: Seven, Wraith, Billy, then **my rank** (`/deadlock-rank.png`, profile `https://statlocker.gg/profile/3634006`).

---

## Navigation

- Prev / next buttons; pager `i / n`.
- Buttons disabled at ends.
- `render()` replaces slide innerHTML based on `kind`.

State (`index`) lives in the content closure; closing the window discards it (reopens at slide 1).

---

## Related Documents

- [Apps Overview](./overview.md)
- [Assets](../assets.md)
