# Assets

All static binary assets live under `public/` and are referenced by absolute root paths (e.g. `/loader.png`). Vite copies them to the build output root unchanged.

---

## Inventory

### Chrome and shell

| Path | Used by | Role |
| --- | --- | --- |
| `/favicon.png` | `index.html` | Browser tab icon (rainbow flower) |
| `/loader.png` | Login stage | Hand-drawn login with clock box |
| `/desktop.png` | Desktop stage | Desktop wallpaper / bars |
| `/power.png` | Desktop menubar | Power button glyph |

### Desktop icons

| Path | App |
| --- | --- |
| `/me-icon.png` | Me |
| `/projects-icon.png` | Projects |
| `/programming-comps-icon.png` | Comps |
| `/school-icon.png` | School |
| `/music-icon.png` | Music |
| `/deadlock-icon.png` | Deadlock |

### App content images

| Path | App | Role |
| --- | --- | --- |
| `/me-portrait.png` | Me | Portrait |
| `/seven.png` | Deadlock | Character |
| `/wraith.png` | Deadlock | Character |
| `/billy.png` | Deadlock | Character |
| `/deadlock-rank.png` | Deadlock | Rank slide |
| `/music/artist-*.jpg` | Music | Artist art |
| `/music/song-*.jpg` | Music | Song covers |

### Music artwork files

- `artist-newjeans.jpg`, `artist-dean.jpg`, `artist-aespa.jpg`, `artist-illit.jpg`
- `song-armageddon.jpg`, `song-54321.jpg`, `song-what2do.jpg`, `song-halfmoon.jpg`, `song-aeao.jpg`

---

## External Assets (Not in repo)

| Resource | Source | Consumer |
| --- | --- | --- |
| Gochi Hand / ZCOOL KuaiLe | Google Fonts | CSS + canvas |
| iTunes preview `.m4a` URLs | `audio-ssl.itunes.apple.com` | Music app |

---

## Asset Guidelines

- Prefer hand-drawn / pixel PNGs consistent with existing chrome.
- Keep stage art at **1920×1080** if replacing login/desktop backgrounds.
- Icon art is displayed around 72×72 in the desktop; higher resolution sources scale down.
- Do not commit secrets in assets; none are expected.

---

## Related Documents

- [Design Philosophy](./design-philosophy.md)
- [Apps: Music](./apps/music.md)
- [Performance](./performance.md)
