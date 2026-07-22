# Module: `clock.ts`

**Path:** `src/clock.ts`  
**Role:** Format local time into lowercase portfolio-friendly parts and run a 1-second ticker.

---

## Purpose

Centralize time presentation so login pixel clock and desktop menubar stay consistent.

---

## Types

```ts
export type ClockParts = {
  weekday: string; // e.g. "monday"
  date: string;    // e.g. "jul 22"
  time: string;    // e.g. "2:27 am"
};
```

---

## API

### `formatClock(now: Date): ClockParts`

- Weekday from fixed lowercase English list.
- Month abbreviated lowercase (`jan`…`dec`) + day-of-month (no zero pad on day).
- 12-hour time with zero-padded minutes and `am`/`pm`.

**Assumptions:** Uses the browser's local timezone via `Date` getters. No Intl API.

### `startClock(onTick: (now: Date) => void): () => void`

- Calls `onTick` immediately, then every 1000 ms.
- Returns a stopper that `clearInterval`s.

---

## Dependencies

None (stdlib / DOM timers only).

**Dependents:** `main.ts`, `desktop.ts` (via `formatClock`), `pixelClock.ts` (consumes `ClockParts`).

---

## Edge Cases

| Case | Behavior |
| --- | --- |
| Tab backgrounded | Interval may throttle; clock can jump when foregrounded |
| DST transitions | Next tick shows new local time; no special handling |
| Midnight | Date/weekday update on next tick |

---

## Limitations

- English-only month/weekday strings.
- Seconds are not displayed; updates are minute-granularity visually for time string changes, but tick still fires every second (useful for eventual second display or chrome redraw).

---

## Related Documents

- [Module: pixel clock](./pixel-clock.md)
- [Module: main](./main.md)
