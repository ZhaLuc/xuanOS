export type ClockParts = {
  weekday: string;
  date: string;
  time: string;
};

const WEEKDAYS = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
] as const;

const MONTHS = [
  "jan",
  "feb",
  "mar",
  "apr",
  "may",
  "jun",
  "jul",
  "aug",
  "sep",
  "oct",
  "nov",
  "dec",
] as const;

function pad(value: number): string {
  return value.toString().padStart(2, "0");
}

export function formatClock(now: Date): ClockParts {
  const hours24 = now.getHours();
  const hours12 = hours24 % 12 || 12;
  const meridiem = hours24 >= 12 ? "pm" : "am";

  return {
    weekday: WEEKDAYS[now.getDay()],
    date: `${MONTHS[now.getMonth()]} ${now.getDate()}`,
    time: `${hours12}:${pad(now.getMinutes())} ${meridiem}`,
  };
}

export function startClock(onTick: (now: Date) => void): () => void {
  const tick = () => onTick(new Date());

  tick();
  const intervalId = window.setInterval(tick, 1000);

  return () => window.clearInterval(intervalId);
}
