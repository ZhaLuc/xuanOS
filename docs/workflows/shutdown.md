# Workflow: Shutdown

## Goal

Return from an active desktop session to the login screen, closing apps and stopping media.

---

## Trigger

User opens the power menu and clicks **shut off** (`data-shutdown`).

---

## Sequence

```mermaid
sequenceDiagram
  actor User
  participant Desktop
  participant WM
  participant Main

  User->>Desktop: shut off
  Desktop->>Desktop: is-shutting-off (bad-shutdown CSS)
  Note over Desktop: SHUTDOWN_MS 1400ms
  Desktop->>WM: closeAll()
  Note over WM: Music destroy() stops audio
  Desktop->>Desktop: hide()
  Desktop->>Main: onShutdown()
  Main->>Main: entered=false, restore login focus
```

Constants: `SHUTDOWN_MS = 1400` in `desktop.ts`. Animation: `bad-shutdown` on `.desktop.is-shutting-off .desktop__stage`.

---

## `onShutdown` (main.ts)

- `desktop.hide()` already invoked from desktop path; callback also:
  - Sets `entered = false`
  - Removes login `is-entering` / `is-away`
  - Restores login `aria-*` and focus
  - `fitLogin()`

Double shut-off while animating is ignored (`shuttingDown` flag).

---

## Guarantees

| Concern | Result |
| --- | --- |
| Open windows | Removed via `closeAll` |
| Music audio | Stopped if Music implemented `destroy` |
| Icon positions | Kept in memory until full page reload |
| Login clock | Resumes (login no longer `.is-away`) |

---

## Related Documents

- [Desktop session](./desktop-session.md)
- [Module: desktop](../modules/desktop.md)
- [App: Music](../apps/music.md)
