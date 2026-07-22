# Installation

## Prerequisites

| Tool | Notes |
| --- | --- |
| Node.js | Modern LTS recommended (Vite 8 / TypeScript 6 tooling) |
| npm | Ships with Node; lockfile is `package-lock.json` |
| Git | To clone [LucasZhang3/pf](https://github.com/LucasZhang3/pf) |

No Docker, Python, or system native deps are required for the app itself.

---

## Clone

```bash
git clone https://github.com/LucasZhang3/pf.git
cd pf
```

---

## Install Dependencies

```bash
npm install
```

This installs only development tooling:

- `vite` (^8.1.1)
- `typescript` (~6.0.2)

There are **no** production runtime npm dependencies.

---

## Run Development Server

```bash
npm run dev
```

Vite serves the app with HMR. Open the printed local URL (typically `http://127.0.0.1:5173`).

**What you should see:** Login artwork with a live clock in the box. Click to enter the desktop.

---

## Typecheck and Production Build

```bash
npm run build
```

Runs `tsc && vite build`:

1. `tsc` typechecks `src/` per `tsconfig.json` (`noEmit: true`).
2. `vite build` emits static files to `dist/`.

---

## Preview Production Build

```bash
npm run preview
```

Serves the contents of `dist/` locally for smoke-testing the production bundle.

---

## Deploy

The build output is a static site (`dist/`). Deploy that folder to any static host (GitHub Pages, Netlify, Cloudflare Pages, S3+CDN, etc.).

**Requirements for hosting:**

- Serve `index.html` for the site root.
- Serve `/public` assets at URL paths matching `/favicon.png`, `/loader.png`, etc. (Vite copies `public/` to `dist/` root).
- Allow outbound requests to Google Fonts and (for Music) Apple iTunes preview CDN.

This repository does not currently include a checked-in CI deploy workflow.

---

## Verify Success

| Check | Expected |
| --- | --- |
| `npm run dev` | Login screen renders |
| Enter | Yeet animation then desktop |
| Open Music, play, close | Audio stops |
| Shut off | Returns to login |
| `npm run build` | Exit code 0, `dist/` populated |

---

## Common Install Failures

See [Troubleshooting](./troubleshooting.md).

---

## Related Documents

- [Configuration](./configuration.md)
- [Development](./development.md)
- [Performance](./performance.md)
