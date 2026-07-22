# Module: `style.css`

**Path:** `src/style.css`  
**Role:** Single stylesheet for the entire product — reset-ish base, viewports, login/desktop chrome, windows, and every app.

---

## Purpose

Centralize presentation so the hand-drawn look stays consistent. There is no CSS Modules / Tailwind / design-token package; conventions are by class naming.

---

## Global Base

- Box-sizing border-box on `*`.
- Scrollbars hidden (`scrollbar-width: none`, webkit display none) but overflow still scrolls where set.
- `html, body` full size, `overflow: hidden`, white background.
- Body font: Gochi Hand; `-webkit-font-smoothing: none`.

---

## Major Class Families

| Prefix / class | Area |
| --- | --- |
| `.res-warning` | Resolution banner |
| `.viewport` / `.login` / `.desktop` | Full-screen surfaces |
| `.stage-scaler` / `.stage` / `.stage__*` | Design canvas + art + login clock |
| `.pixel-label` | Canvas labels |
| `.menubar` / `.power` | Desktop chrome |
| `.desktop__*` / `.desktop-icon` | Workarea and icons |
| `.os-window` | Window chrome |
| `.app-me` / `.app-projects` / `.app-comps` / `.app-school` / `.app-music` / `.app-deadlock` | Apps |

---

## Critical Visibility Rules

```css
.viewport.is-away,
.viewport[hidden] {
  display: none !important;
}
```

Login uses `.is-away` after enter. Desktop uses `.is-active` to become visible.

School / Projects expandable panels use `.is-open` rather than removing `[hidden]`, avoiding conflicts with `display: flex` rules.

---

## Animations

| Keyframes | Trigger |
| --- | --- |
| `stupid-yeet` | `.login.is-entering .stage` |
| `clock-panic` | `.login.is-entering .stage__clock` |
| `bad-shutdown` | `.desktop.is-shutting-off .desktop__stage` |

---

## Design Tokens (Informal)

There is no CSS variable system. Recurring literals:

| Token | Typical value |
| --- | --- |
| Ink | `#111` |
| Muted text | `#555` / `#666` |
| Paper | `#fff` |
| Warning bg | `#f4f0e6` |
| Border | `2px solid #111` |

---

## Extending Styles

1. Add app-specific block under a new `.app-*` section at the bottom.
2. Reuse ink/border patterns.
3. Prefer class toggles for state.
4. Keep selectors shallow when possible.

---

## Related Documents

- [Design Philosophy](../design-philosophy.md)
- [Scaling and Viewport](../scaling-and-viewport.md)
