# Development

## Local Workflow

1. `npm install`
2. `npm run dev`
3. Edit TypeScript/CSS/assets; Vite HMR refreshes.
4. `npm run build` before pushing non-trivial changes.

---

## Project Conventions

| Area | Convention |
| --- | --- |
| Language | TypeScript, ESM, relative imports |
| UI | Vanilla DOM; factory functions |
| CSS | BEM-ish `block__element--modifier` |
| Comments | Prefer no comments unless needed; docs live in `/docs` |
| Apps | Register in `types` + `registry`; one file per app |
| Git author | Commits as Lucas; no Cursor co-author trailers |

---

## Adding an App (Checklist)

1. Add PNG icon to `public/`.
2. Create `src/apps/<name>.ts` with `AppDefinition`.
3. Extend `AppId` + `appOrder`.
4. Import/register in `registry.ts`.
5. Style under `.app-*` in `style.css`.
6. If holding media/timers, implement `destroy` on the content root.
7. Document in `docs/apps/`.

---

## Changing Stage Art

Replace `public/loader.png` or `public/desktop.png` at **1920×1080**. If dimensions change, update CSS `.stage` size and design constants in `main.ts` / `desktop.ts`.

---

## Testing

There is **no automated test suite** in the repository. Manual checklist:

- [ ] Login clock updates
- [ ] Enter yeet → desktop
- [ ] Each app opens
- [ ] Window drag / minimize / close
- [ ] Music play + close stops audio
- [ ] Shut off returns to login and re-enter works
- [ ] Resize updates scale; warning appears below 1280×720
- [ ] `npm run build` succeeds

---

## Related Documents

- [Contributing](./contributing.md)
- [Configuration](./configuration.md)
- [Troubleshooting](./troubleshooting.md)
