# Module: `pixelText.ts`

**Path:** `src/pixelText.ts`  
**Role:** Render short strings onto a canvas at low internal resolution, optionally crush antialiasing to hard ink, and display with CSS nearest-neighbor upscaling.

---

## Purpose

Match the hand-drawn PNG aesthetic. Smooth webfont glyphs would look too clean on chunky art; crushing + pixel scaling makes type feel drawn.

---

## Exports

### `DEFAULT_PIXEL_SIZE = 3`

Default divisor from parent CSS size to canvas backing-store size.

### `crushToInk(ctx, width, height, ink?)`

Walks `ImageData`. Pixels with alpha `> 96` become solid ink (default RGB `17,17,17`); others become fully transparent.

### `createPixelLabel(options?): PixelLabel`

Returns `{ canvas, draw(text) }`.

#### Options

| Option | Default | Meaning |
| --- | --- | --- |
| `className` | `"pixel-label"` | Canvas CSS class |
| `pixelSize` | `3` | Parent size ÷ this = base canvas CSS pixels |
| `align` | `"left"` | Canvas text align |
| `crush` | `true` | Run `crushToInk` after fillText |
| `supersample` | `1` | Multiply backing store resolution |
| `fontFamily` | `"Gochi Hand", cursive` | Canvas font stack |

Desktop menubar uses `pixelSize: 1`, `crush: false`, `supersample: 2` (hires path) for readable brand/time/signature.

---

## Internal Draw Algorithm

1. Read parent `clientWidth` / `clientHeight`.
2. Compute canvas size: `(floor(client/pixelSize) * supersample)` each axis (min 1).
3. Clear; set fill `#111`; font size ≈ `0.72 * height`.
4. Position X by align (with small supersample padding).
5. Optionally crush.

If parent is missing or 0-sized, early return (blank). This is why desktop calls `requestAnimationFrame` twice after `show()` — layout must settle.

---

## Error Handling

Throws if `getContext("2d")` is unavailable.

---

## Performance

- `willReadFrequently: true` on context for crush reads.
- Redrawn on each desktop tick while visible (brand/time/signature). Cost is small canvases.

---

## Related Documents

- [Module: pixel clock](./pixel-clock.md)
- [Module: desktop](./desktop.md)
- [Design Philosophy](../design-philosophy.md)
