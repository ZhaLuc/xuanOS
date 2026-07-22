# App: School

**Path:** `src/apps/school.ts`  
**ID:** `school`  
**Window:** 520×480, title `School`  
**Icon:** `/school-icon.png`

---

## Purpose

Academic snapshot: AP count/scores/GPA, full AP list, extracurriculars.

---

## Structure

- Summary bullets (16x APs, score note, GPA).
- **aps** — collapsible list (`apCourses` array).
- **extracurriculars** — collapsible list (`extracurriculars` array).

### Toggle helper

`bindToggle(button, panel, showLabel, hideLabel)` toggles `.is-open` on the panel (not `[hidden]`), updates `aria-expanded` and button label text.

**Why `.is-open`:** CSS `display: flex` on lists would override `[hidden]`; class-based show/hide is reliable.

---

## Related Documents

- [Apps Overview](./overview.md)
- [Module: style](../modules/style.md)
