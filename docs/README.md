# XUANOS Documentation

Welcome to the technical documentation for **XUANOS**, a hand-drawn fictional desktop operating system that doubles as a personal portfolio website.

This documentation suite is written for:

- **New contributors** who need to understand the full system before changing code.
- **Senior engineers** who need precise implementation details, edge cases, and design rationale.

> **Accuracy note:** Everything here is derived from the current codebase. Features that do not exist (automated tests, a backend API, a CLI beyond npm scripts, authentication, persistence) are called out explicitly rather than invented.

---

## Start Here

| If you want to… | Read |
| --- | --- |
| Understand what XUANOS is and why it exists | [System Overview](./system-overview.md) |
| See how modules connect | [Architecture](./architecture.md) |
| Run the project locally | [Installation](./installation.md) |
| Learn the design and visual rules | [Design Philosophy](./design-philosophy.md) |
| Trace login → desktop → shutdown | [Workflows](./workflows/boot-and-login.md) |
| Add or change an app | [Apps Overview](./apps/overview.md) |
| Fix a bug or odd behavior | [Troubleshooting](./troubleshooting.md) |
| Learn project vocabulary | [Glossary](./glossary.md) |

---

## Documentation Map

### Foundations

| Document | Description |
| --- | --- |
| [system-overview.md](./system-overview.md) | Product purpose, audience, capabilities, non-goals |
| [architecture.md](./architecture.md) | Component graph, data/control flow, lifecycle |
| [design-philosophy.md](./design-philosophy.md) | Hand-drawn aesthetic, UX rules, intentional imperfection |
| [scaling-and-viewport.md](./scaling-and-viewport.md) | 1920×1080 stage, stretch scaling, coordinate math |
| [assets.md](./assets.md) | Public asset inventory and roles |

### Setup and Development

| Document | Description |
| --- | --- |
| [installation.md](./installation.md) | Prerequisites, install, run, build, preview |
| [configuration.md](./configuration.md) | TypeScript, Vite, HTML, fonts, package scripts |
| [deployment.md](./deployment.md) | Vercel config, static hosting, live URL |
| [development.md](./development.md) | Local workflow, conventions, how to extend |
| [contributing.md](./contributing.md) | Contribution expectations and process |
| [troubleshooting.md](./troubleshooting.md) | Common failures and fixes |
| [faq.md](./faq.md) | Frequently asked questions |
| [glossary.md](./glossary.md) | Terms used across docs and code |

### Cross-Cutting Concerns

| Document | Description |
| --- | --- |
| [security.md](./security.md) | Threat model for a static client site |
| [performance.md](./performance.md) | Bundle size, assets, canvas, audio |

### Modules

| Document | Source | Description |
| --- | --- | --- |
| [modules/main.md](./modules/main.md) | `src/main.ts` | Boot, login, yeet, clock loop, handoff |
| [modules/clock.md](./modules/clock.md) | `src/clock.ts` | Time formatting and 1s ticker |
| [modules/pixel-text.md](./modules/pixel-text.md) | `src/pixelText.ts` | Low-res canvas text labels |
| [modules/pixel-clock.md](./modules/pixel-clock.md) | `src/pixelClock.ts` | Login box pixel clock |
| [modules/desktop.md](./modules/desktop.md) | `src/desktop.ts` | Desktop shell, menubar, power |
| [modules/desktop-icons.md](./modules/desktop-icons.md) | `src/desktopIcons.ts` | Icon grid drag/open |
| [modules/window-manager.md](./modules/window-manager.md) | `src/wm/windowManager.ts` | Windows, focus, drag, destroy |
| [modules/resolution-warning.md](./modules/resolution-warning.md) | `src/resolutionWarning.ts` | Small-viewport banner |
| [modules/style.md](./modules/style.md) | `src/style.css` | CSS architecture and class families |

### Apps

| Document | Source | Description |
| --- | --- | --- |
| [apps/overview.md](./apps/overview.md) | `src/apps/*` | App contract and registration |
| [apps/registry.md](./apps/registry.md) | `registry.ts`, `types.ts` | IDs, order, lookup |
| [apps/me.md](./apps/me.md) | `me.ts` | About / contact |
| [apps/projects.md](./apps/projects.md) | `projects.ts` | Expandable project list |
| [apps/comps.md](./apps/comps.md) | `programmingComps.ts` | Competitions and goals |
| [apps/school.md](./apps/school.md) | `school.ts` | APs and extracurriculars |
| [apps/music.md](./apps/music.md) | `music.ts` | Artists, songs, iTunes previews |
| [apps/deadlock.md](./apps/deadlock.md) | `deadlock.ts` | Character slide deck |

### Workflows

| Document | Description |
| --- | --- |
| [workflows/boot-and-login.md](./workflows/boot-and-login.md) | Page load through enter animation |
| [workflows/desktop-session.md](./workflows/desktop-session.md) | Icons, windows, menubar during use |
| [workflows/shutdown.md](./workflows/shutdown.md) | Power menu, bad shutdown, return to login |
| [workflows/app-lifecycle.md](./workflows/app-lifecycle.md) | Open, focus, minimize, close, destroy |

---

## Suggested Reading Order

1. [System Overview](./system-overview.md)
2. [Architecture](./architecture.md)
3. [Design Philosophy](./design-philosophy.md)
4. [Boot and Login](./workflows/boot-and-login.md)
5. [Window Manager](./modules/window-manager.md)
6. [Apps Overview](./apps/overview.md)
7. [Development](./development.md)

---

## Repository Entry Point

The root [`README.md`](../README.md) is the polished project landing page. This `/docs` tree is the deep technical reference.
