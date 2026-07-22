# Module: `resolutionWarning.ts`

**Path:** `src/resolutionWarning.ts`  
**Role:** Show a dismissible banner when the viewport is smaller than the recommended minimum.

---

## Purpose

XUANOS stretches a 1920×1080 drawing. Below 1280×720 the experience degrades; the banner sets expectations bluntly.

---

## API

```ts
export function createResolutionWarning(): {
  root: HTMLElement;
  sync: () => void;
}
```

`main.ts` appends `root` to `#app` and calls `sync()` from `fitAll()` (boot + resize).

---

## Thresholds

| Constant | Value |
| --- | --- |
| `MIN_WIDTH` | 1280 |
| `MIN_HEIGHT` | 720 |

Visible when `(innerWidth < MIN_WIDTH || innerHeight < MIN_HEIGHT) && !dismissed`.

---

## Dismissal Semantics

- Close button sets `dismissed = true` and hides.
- When viewport becomes large enough again, `dismissed` resets to `false`, so a later shrink re-shows the banner.

---

## Accessibility

Root has `role="status"`. Close button has `aria-label="Dismiss"`.

Copy: `this project will suck at this resolution`.

---

## Related Documents

- [Scaling and Viewport](../scaling-and-viewport.md)
- [Troubleshooting](../troubleshooting.md)
