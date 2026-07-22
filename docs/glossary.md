# Glossary

| Term | Meaning in XUANOS |
| --- | --- |
| **App** | Registered `AppDefinition` opened in a window |
| **AppId** | Literal id string such as `"music"` |
| **Bad shutdown** | CSS animation when choosing shut off |
| **Crush / crushToInk** | Force canvas pixels to hard ink or clear |
| **Design space** | Coordinates on the unscaled 1920×1080 stage |
| **Desktop** | Post-login shell (`desktop.ts`) |
| **Destroy hook** | Optional `element.destroy()` for cleanup on close |
| **Icon grid** | 120×120 snap lattice for desktop icons |
| **Login** | First viewport with `loader.png` |
| **Menubar** | Top/bottom chrome bands on the desktop |
| **Pixel label** | Canvas-rendered menubar/login text |
| **Registry** | `apps` map + `getApp` / `listApps` |
| **Scale provider** | Callback returning `{ x, y }` scale factors |
| **Stage** | 1920×1080 art root inside a scaler |
| **Stage scaler** | Element with CSS `transform: scale(sx, sy)` |
| **Window manager (WM)** | Module owning window chrome and lifecycle |
| **Workarea** | Region between menubars for icons/windows |
| **Yeet** | Login enter spin/zoom animation |
| **XUANOS** | The fictional OS / portfolio product name |

---

## Related Documents

- [Architecture](./architecture.md)
- [Docs index](./README.md)
