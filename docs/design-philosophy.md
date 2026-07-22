# Design Philosophy

## Intent

XUANOS is meant to feel **hand-drawn, imperfect, and personal** - closer to a sketchbook OS than a polished product landing page. The portfolio content (projects, school, contact) is real; the chrome is theatrical.

---

## Guiding Principles

### 1. OS as navigation

Instead of a top nav and sections, the user moves through **icons and windows**. That metaphor justifies:

- Login before desktop.
- Power off returning to login.
- One window per app with titlebar controls.

### 2. Drawn art is the UI

Primary visuals are PNGs (`loader.png`, `desktop.png`, icons, portraits). Code overlays clocks, labels, and interactive widgets onto those drawings rather than replacing them with generic layouts.

### 3. Intentional low fidelity

Canvas text is often crushed to hard ink and upscaled with `image-rendering: pixelated` so type matches chunky MS Paint edges. Menubar labels use a higher-resolution pixel path (`pixelSize: 1`, `crush: false`, `supersample: 2`) for readability while staying on-canvas.

### 4. Lean stack

No React, no UI kit, no CSS framework. Fewer abstractions mean faster load and less stylistic homogenization. Complexity lives in a small set of hand-written modules.

### 5. Casual voice

App copy is lowercase, conversational, and sometimes jokey (Deadlock blurbs, resolution warning: "this project will suck at this resolution"). That voice is part of the brand.

---

## Visual Rules Observed in Code

| Rule | Implementation |
| --- | --- |
| White stage background | `html, body` and `.stage` use `#fff` |
| Near-black ink | Text and UI accents `#111` |
| Hand fonts | Gochi Hand globally; ZCOOL KuaiLe for signature |
| Hard borders | Many controls use `2px solid #111` |
| Hidden scrollbars | Global scrollbar suppression; scrolling still works |
| Stretch to fill | Independent X/Y scale (not letterbox) |

---

## Motion Philosophy

Motion is sparse and characterful:

| Motion | Class / keyframes | Role |
| --- | --- | --- |
| Login yeet | `stupid-yeet`, `clock-panic` | Spin/zoom into clock box |
| Shutdown | `bad-shutdown` | Collapse toward bottom-left power corner |

Motion creates presence and hierarchy, not ambient noise.

---

## Interaction Philosophy

- **Click without drag** opens an icon; drag repositions then snaps to grid.
- **Windows** focus on mousedown; titlebar drag moves them; minimize hides; close destroys.
- **Power menu** closes on outside click; menu clicks do not bubble to dismiss incorrectly.
- **Music** hover-reveals play on covers; volume defaults to 70%; close/shutdown stops audio.

---

## What "Good" Looks Like Here

Good changes:

- Preserve the hand-drawn look and casual copy.
- Keep modules small and framework-free unless there is a strong reason.
- Match existing class naming (`block__element--modifier` style).
- Document new apps in `/docs/apps`.

Poor changes:

- Replacing drawings with generic card grids or purple SaaS themes.
- Adding heavy dependencies for marginal DX.
- Formal corporate tone that fights the OS character.

---

## Related Documents

- [System Overview](./system-overview.md)
- [Scaling and Viewport](./scaling-and-viewport.md)
- [Module: style](./modules/style.md)
