# Glossary

Terms used in XUANOS docs and source. Definitions match the implementation, not a general OS textbook.

---

## A–C

| Term | Meaning here |
| --- | --- |
| **App / AppDefinition** | Registered portfolio window module: `id`, title, icon, size, `createContent()`. |
| **AppId** | String union of app keys: `me`, `projects`, `programming-comps`, `school`, `music`, `deadlock`. |
| **appOrder** | Array in `types.ts` controlling desktop icon order via `listApps()`. |
| **Bad shutdown** | CSS animation `bad-shutdown` on `.desktop.is-shutting-off` (~1400 ms) before returning to login. |
| **Boot** | `boot()` in `main.ts`: await fonts, then `fitAll()`. |
| **Chrome** | Non-content UI: menubars, power control, window titlebar — not browser Chrome specifically. |
| **Clock parts** | `{ weekday, date, time }` from `formatClock()` in `clock.ts`. |
| **Crush / crushToInk** | Pixel processing in `pixelText.ts` that stamps canvas text into a low-ink look. |

---

## D–L

| Term | Meaning here |
| --- | --- |
| **Design stage** | Logical 1920×1080 coordinate space for art and chrome. |
| **Desktop controller** | Object from `createDesktop()` with `root`, `show`, `hide`, `fit`, `tick`. |
| **destroy** | Optional method on app content roots; WM calls it on close (Music audio cleanup). |
| **Entered** | `main.ts` flag preventing double yeet until shutdown resets the session. |
| **Factory** | Function that creates DOM + closures and returns a small controller API (no classes required). |
| **Fit** | Recompute `scaleX`/`scaleY` and apply `transform: scale(...)` on `.stage-scaler`. |
| **Focus** | Raising a window’s `z-index` and `.is-focused` class in the window manager. |
| **Grid** | Icon snap grid: 120×120 cells, padding 10, in `desktopIcons.ts`. |
| **Login viewport** | `#login.viewport.login` surface with `loader.png` and pixel clock. |

---

## M–R

| Term | Meaning here |
| --- | --- |
| **Menubar** | Top brand/time/GitHub bar and bottom power/signature bar on the desktop stage. |
| **Minimize** | Hides window via `.is-minimized`; no dock; restore by opening the icon again. |
| **Pixel clock** | Login canvas clock from `pixelClock.ts`. |
| **Pixel label** | Generic canvas text widget from `pixelText.ts` (menubar brand/time/signature). |
| **Power menu** | Bottom-left control; item **shut off** triggers shutdown. |
| **Public assets** | Files under `public/` served at `/` (copied to `dist/` root by Vite). |
| **Registry** | `apps/registry.ts` mapping `AppId` → `AppDefinition` plus `getApp` / `listApps`. |
| **Resolution warning** | Banner when viewport &lt; 1280×720. |
| **Rewrites** | Vercel rule sending `/(.*)` → `/index.html` for the static SPA shell. |

---

## S–Z

| Term | Meaning here |
| --- | --- |
| **Scale provider** | `() => { x, y }` passed into WM / icons so pointer deltas map to stage space. |
| **Shut off** | User-facing shutdown: animate, `closeAll()`, hide desktop, `onShutdown()` → login. |
| **Stage** | `.stage` element holding art at design size inside a scaler. |
| **Stage scaler** | `.stage-scaler` wrapper receiving non-uniform CSS scale. |
| **Viewport** | Full-bleed `.viewport` surface (login or desktop). |
| **Window manager (WM)** | `createWindowManager` in `wm/windowManager.ts`: open/close/focus/drag/minimize. |
| **Workarea** | Desktop region for icons + windows between menubars. |
| **XUANOS** | Product / brand name drawn on the menubar and used as the page title. |
| **Yeet** | Login enter animation (`stupid-yeet` / `clock-panic`, `YEET_MS = 1350`). |

---

## Abbreviations

| Abbr | Expansion |
| --- | --- |
| **HMR** | Hot Module Replacement (Vite) |
| **SPA** | Single-Page Application |
| **WM** | Window manager |
| **TS** | TypeScript |

---

## Related Documents

- [Architecture](./architecture.md)
- [Docs index](./README.md)
