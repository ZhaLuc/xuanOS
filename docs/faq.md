# FAQ

## Is XUANOS a real operating system?

No. It is a portfolio website that *looks and behaves a bit like* a toy desktop OS in the browser.

## What stack does it use?

Vite + TypeScript + vanilla DOM + one CSS file. No React/Vue/Svelte.

## Why does the image stretch on my ultrawide?

By design the 1920×1080 stage scales independently on X and Y to fill the viewport (no letterboxing). See [Scaling and Viewport](./scaling-and-viewport.md).

## Where did my minimized window go?

Minimize hides it. Click the same desktop icon to restore/focus. There is no taskbar.

## Why does music keep playing when I minimize Music?

Only **close** (or OS shut off → `closeAll`) runs `destroy()` and stops audio. Minimize preserves state, including playback.

## Can I change the favorite songs?

Yes — edit the arrays in `src/apps/music.ts` and assets under `public/music/`. Preview URLs must be valid audio URLs the browser can play.

## Is there a backend?

No.

## Are there tests?

No automated tests yet. Use the manual checklist in [Development](./development.md).

## How do I deploy?

`npm run build` and host the `dist/` folder on any static host.

## Who maintains this?

Lucas ([GitHub](https://github.com/LucasZhang3/pf)).

---

## Related Documents

- [System Overview](./system-overview.md)
- [Troubleshooting](./troubleshooting.md)
