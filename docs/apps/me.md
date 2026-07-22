# App: Me

**Path:** `src/apps/me.ts`  
**ID:** `me`  
**Window:** 520×360, title `Me`  
**Icon:** `/me-icon.png`

---

## Purpose

Personal intro card: portrait, short quote, outbound GitHub and email actions.

---

## Content

- Image `/me-portrait.png` (180×240 presentation size in markup).
- Quote: `i code stuff i like`.
- Link to `https://github.com/LucasZhang3`.
- `mailto:lucaszhangbusiness@gmail.com`.

Inline SVG icons for GitHub and Gmail-style envelope.

---

## Lifecycle

Stateless DOM. No `destroy` hook. Recreated only if the window is closed and opened again.

---

## Related Documents

- [Apps Overview](./overview.md)
