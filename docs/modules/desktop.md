# Module: `desktop.ts`

**Path:** `src/desktop.ts`  
**Role:** Build and control the desktop shell - stage art, menubars, icons, windows layer, power menu, shutdown.

---

## Purpose

After login, this is the primary surface. It composes pixel labels, the window manager, and icon desktop behavior into one controller consumed by `main.ts`.

---

## Public Types

```ts
export type DesktopOptions = {
  onShutdown: () => void;
};

export type DesktopController = {
  root: HTMLElement;
  show: () => void;
  hide: () => void;
  fit: () => void;
  tick: (now: Date) => void;
};
```

---

## DOM Structure (Conceptual)

```text
section.viewport.desktop#desktop
  .stage-scaler[data-desktop-scaler]
    .stage.desktop__stage
      img.stage__art[/desktop.png]
      header.menubar.menubar--top
        brand | time + github
      .desktop__workarea
        .desktop__icons
        .desktop__windows
      footer.menubar.menubar--bottom
        power menu | signature
```

---

## Responsibilities

| Area | Behavior |
| --- | --- |
| Brand / time / signature | Pixel labels redrawn in `paintChrome` |
| GitHub link | Opens `https://github.com/ZhaLuc/xuanOS` |
| Icons | Built from `listApps()`; wired via `enableIconDesktop` |
| Windows | `createWindowManager(windowsLayer, getScale)` |
| Power | Toggle menu; **shut off** runs shutdown sequence |
| Visibility | `.is-active`, `aria-hidden`, `visible` flag |

---

## Shutdown Sequence

Constants: `SHUTDOWN_MS = 1400`.

1. Ignore if already `shuttingDown`.
2. Close menu; add `.is-shutting-off`.
3. Timeout → `wm.closeAll()` → `hide()` → clear flags → `options.onShutdown()`.

`closeAll` is critical so Music `destroy()` runs before leaving the desktop.

---

## Show / Fit Quirks

`show()` uses double `requestAnimationFrame` before painting chrome so canvas parents have non-zero layout boxes (avoids 0×0 menubar text).

`fit()` updates `scaleX`/`scaleY` and applies scaler transform.

---

## Dependencies

- `./clock`, `./pixelText`, `./apps/registry`, `./apps/types`
- `./wm/windowManager`, `./desktopIcons`

---

## Edge Cases

| Case | Behavior |
| --- | --- |
| Tick while hidden | `paintChrome` / `tick` return early |
| Click outside power menu | Closes menu |
| Click inside menu | `stopPropagation` keeps it open |
| Re-show after shutdown | Clears `is-shutting-off`, resets `shuttingDown` |

---

## Limitations

- No taskbar for minimized windows.
- Signature and brand strings are hard-coded (`XUANOS`, `乐轩2026`).
- Scale constants duplicated vs `main.ts` (both 1920×1080).

---

## Related Documents

- [Module: desktop icons](./desktop-icons.md)
- [Module: window manager](./window-manager.md)
- [Workflow: desktop session](../workflows/desktop-session.md)
- [Workflow: shutdown](../workflows/shutdown.md)
