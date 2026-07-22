# Module: `pixelClock.ts`

**Path:** `src/pixelClock.ts`  
**Role:** Draw the three-line login clock (weekday, date, time) into the loader's white box.

---

## Purpose

Specialize pixel text for the login clock layout: centered multi-line block with relative font sizes, always crushed to ink.

---

## API

```ts
export function createPixelClock(): {
  canvas: HTMLCanvasElement;
  draw: (parts: ClockParts) => void;
}
```

Canvas class: `stage__clock-canvas` (CSS sets `image-rendering: pixelated` and fills the `.stage__clock` box).

---

## Draw Behavior

1. Backing store size = parent client size ÷ **4** (fixed pixel factor).
2. Three lines with sizes proportional to canvas height (`0.11`, `0.13`, `0.18`).
3. Vertically centered stack with small gaps.
4. Font: Gochi Hand.
5. Always calls `crushToInk`.

Screen-reader text is separate: `main.ts` keeps a visually hidden `.stage__clock-sr` label updated with the same parts.

---

## Dependencies

- `./clock` — `ClockParts`
- `./pixelText` — `crushToInk`

---

## Edge Cases

| Case | Behavior |
| --- | --- |
| Clock box not laid out yet | `draw` no-ops until parent has size |
| During yeet | CSS animates clock (`clock-panic`); canvas still redraws if login not away |

---

## Related Documents

- [Module: clock](./clock.md)
- [Module: pixel text](./pixel-text.md)
- [Workflow: boot and login](../workflows/boot-and-login.md)
