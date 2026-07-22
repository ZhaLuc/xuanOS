# App: Comps

**Path:** `src/apps/programmingComps.ts`  
**ID:** `programming-comps`  
**Window:** 480×420, title `Comps`  
**Icon:** `/programming-comps-icon.png` · label `Comps`

---

## Purpose

Static competitive-programming and goals summary. No toggles or external fetches.

---

## Content

### Competitions (as rendered)

- codeforces - 2129 (master)
- leetcode - 283 problems solved
- usaco - gold
- 3x hackathon winner

### Working for

- icpc
- comptia a+, network+, and security+
- ioi camp qualification
- codeforces international master
- usaco platinum
- regeneron sts

Copy is authored in the template string inside `createProgrammingCompsContent()`.

---

## Registration

| Field | Value |
| --- | --- |
| `id` | `programming-comps` |
| `title` | `Comps` |
| `width` / `height` | 480 × 420 |

Root class: `.app-comps`. No `destroy` hook.

---

## Related Documents

- [Apps Overview](./overview.md)
- [School](./school.md) - related résumé-style content
