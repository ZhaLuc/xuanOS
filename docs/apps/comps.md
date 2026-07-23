# App: Comps

**Path:** `src/apps/programmingComps.ts`  
**ID:** `programming-comps`  
**Window:** 480×480, title `Comps`  
**Icon:** `/programming-comps-icon.png` · label `Comps`

---

## Purpose

Static competitive-programming and goals summary. No toggles or external fetches.

---

## Content

### Competitions (as rendered)

- codeforces - 2129 (master)
- leetcode - 133 problems solved
- usaco - gold
- National Underwater Robotics Competition - 3rd place
- EPICS research presentation - ASU Ira A. Fulton Schools of Engineering
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
| `width` / `height` | 480 × 480 |

Root class: `.app-comps`. No `destroy` hook.

---

## Related Documents

- [Apps Overview](./overview.md)
- [School](./school.md) - related résumé-style content
