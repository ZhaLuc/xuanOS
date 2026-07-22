# FAQ

Answers grounded in the current XUANOS codebase and repo layout.

---

## Product

### What is XUANOS?

A personal portfolio presented as a fictional desktop OS: login → desktop → apps in windows → shut off back to login. Package name `xuanos`, version `0.1.0`, private.

### Is this a real operating system?

No. It is a Vite + TypeScript static website that *looks* like an OS. There is no kernel, filesystem, or process isolation.

### Where is it live?

[https://lexuan.vercel.app](https://lexuan.vercel.app), deployed from [github.com/LucasZhang3/pf](https://github.com/LucasZhang3/pf).

### Why does it look stretched on my monitor?

The design stage is 1920×1080 and scaled independently on X and Y to fill the viewport (no letterboxing). See [Scaling and Viewport](./scaling-and-viewport.md).

### Why the resolution warning?

If the viewport is below **1280×720**, `resolutionWarning.ts` shows: “this project will suck at this resolution.” You can dismiss it; it reappears if you go small again after being large enough.

---

## Technical

### What framework does it use?

None. Vanilla DOM with factory functions (`createDesktop`, `createWindowManager`, etc.).

### Are there automated tests?

No. Manual smoke checks are listed in [Development](./development.md).

### Is there a backend / API / auth?

No. Everything runs in the browser. Portfolio content is hardcoded in TypeScript modules.

### How do I add an app?

Create an `AppDefinition`, extend `AppId` + `appOrder`, register in `registry.ts`, add a `public/` icon, style in `style.css`, document under `docs/apps/`. Details: [Apps Overview](./apps/overview.md).

### Why does Music stop when I close the window or shut off?

Music attaches `destroy()` on its content root. The window manager calls it on `close` / `closeAll`, which pauses audio and clears `src`.

### Can I restore a minimized window?

There is no taskbar. Click the same desktop icon again; `wm.open` restores if minimized, or focuses if already open.

### Why is there no `vite.config.ts`?

Defaults are enough: root `index.html`, `public/` static copy, `dist/` output. Add a config only when you need custom base path, aliases, or plugins.

### What does `vercel.json` do?

Declares Vite framework, `npm run build`, `dist` output, and a catch-all rewrite to `index.html` for the SPA shell.

---

## Content and assets

### Where do I change projects / school / comps copy?

Edit the constants in the corresponding file under `src/apps/` (`projects.ts`, `school.ts`, `programmingComps.ts`, etc.).

### Where is the favicon?

`public/favicon.png`, linked from `index.html` as `/favicon.png`.

### Can I replace login/desktop art?

Yes — replace `public/loader.png` / `public/desktop.png` at **1920×1080**, or update CSS/stage constants if dimensions change.

---

## Contributing

### Who should commits be authored as?

Repository owner **Lucas** `<lucaszhang1118@gmail.com>`. Do not add Cursor co-author trailers. See [Contributing](./contributing.md).

### Should I update docs?

Yes, when behavior or architecture changes. Start from [`docs/README.md`](./README.md).

---

## Related Documents

- [System Overview](./system-overview.md)
- [Troubleshooting](./troubleshooting.md)
- [Glossary](./glossary.md)
