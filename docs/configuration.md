# Configuration

XUANOS has minimal configuration. There is no `.env` file and no runtime feature flags.

---

## package.json

| Field | Value | Meaning |
| --- | --- | --- |
| `name` | `xuanos` | Package identity |
| `private` | `true` | Not for npm publish |
| `version` | `0.1.0` | Project version |
| `type` | `module` | ESM |

### Scripts

| Script | Command | Purpose |
| --- | --- | --- |
| `dev` | `vite` | Dev server + HMR |
| `build` | `tsc && vite build` | Typecheck then bundle |
| `preview` | `vite preview` | Serve `dist/` |

### Dependencies

Only `devDependencies`: `typescript`, `vite`.

---

## tsconfig.json

Key compiler options:

| Option | Effect |
| --- | --- |
| `target` / `lib` | ES2023 + DOM |
| `module` / `moduleResolution` | `esnext` / `bundler` (Vite) |
| `noEmit` | `true` — `tsc` is typecheck only |
| `verbatimModuleSyntax` | Forces type-only imports where needed |
| `noUnusedLocals` / `noUnusedParameters` | Unused symbols fail typecheck |
| `erasableSyntaxOnly` | Restricts TS syntax Vite can strip |
| `include` | `["src"]` only |

There is no path alias map; imports use relative paths.

---

## index.html

Configured in the HTML head:

- Charset UTF-8, responsive viewport meta.
- Favicon `/favicon.png`.
- Title `XUANOS`.
- Google Fonts preconnect + stylesheet for **Gochi Hand** and **ZCOOL KuaiLe**.
- Module entry `/src/main.ts`.
- Mount point `#app`.

Changing fonts requires updating both the Google Fonts URL and CSS / canvas `fontFamily` strings.

---

## Vite Defaults

There is **no** `vite.config.ts` in the repository. Behavior uses Vite defaults:

- Root: project root.
- Dev entry: `index.html`.
- Static assets: `public/` → site root.
- Build out: `dist/`.

Add a config file only when you need aliases, custom base path, or plugin pipeline.

---

## vercel.json

Checked-in deploy config for Vercel:

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "framework": "vite",
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

No environment variables are required for the static site.

---

## Soft Configuration in Code

These are constants, not env vars:

| Constant | File | Role |
| --- | --- | --- |
| `DESIGN_WIDTH` / `DESIGN_HEIGHT` | `main.ts` | Login fit |
| `1920` / `1080` | `desktop.ts` `fit()` | Desktop fit |
| `YEET_MS = 1350` | `main.ts` | Login animation duration |
| `SHUTDOWN_MS = 1400` | `desktop.ts` | Shutdown animation duration |
| `MIN_WIDTH` / `MIN_HEIGHT` | `resolutionWarning.ts` | Warning threshold |
| `GRID_X` / `GRID_Y` | `desktopIcons.ts` | Icon snap grid |
| Default volume `70` | `music.ts` HTML range | Preview volume |

---

## .gitignore

Ignores logs, `node_modules`, `dist`, editor junk, `*.local`. Does not ignore `public/` or `docs/`.

---

## Related Documents

- [Installation](./installation.md)
- [Development](./development.md)
- [Module: style](./modules/style.md)
