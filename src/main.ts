import "./style.css";
import { formatClock, startClock } from "./clock";

const DESIGN_WIDTH = 1920;
const DESIGN_HEIGHT = 1080;

const app = document.querySelector<HTMLDivElement>("#app");
if (!app) {
  throw new Error("Missing #app root");
}

app.innerHTML = `
  <main class="viewport" id="login" role="button" tabindex="0" aria-label="Click to enter XUANOS">
    <div class="stage-scaler" id="scaler">
      <div class="stage">
        <img
          class="stage__art"
          src="/loader.png"
          alt="XUANOS login: two figures pointing at the system clock"
          draggable="false"
          width="1920"
          height="1080"
        />
        <div class="stage__clock" aria-live="polite">
          <div class="stage__clock-weekday" data-clock="weekday"></div>
          <div class="stage__clock-date" data-clock="date"></div>
          <div class="stage__clock-time" data-clock="time"></div>
        </div>
      </div>
    </div>
  </main>
  <div class="boot-placeholder" id="boot" aria-hidden="true">desktop coming soon...</div>
`;

const login = document.querySelector<HTMLElement>("#login")!;
const scaler = document.querySelector<HTMLElement>("#scaler")!;
const boot = document.querySelector<HTMLElement>("#boot")!;
const weekdayEl = document.querySelector<HTMLElement>('[data-clock="weekday"]')!;
const dateEl = document.querySelector<HTMLElement>('[data-clock="date"]')!;
const timeEl = document.querySelector<HTMLElement>('[data-clock="time"]')!;

function renderClock(now: Date) {
  const parts = formatClock(now);
  weekdayEl.textContent = parts.weekday;
  dateEl.textContent = parts.date;
  timeEl.textContent = parts.time;
}

function fitStage() {
  const scale = Math.min(
    window.innerWidth / DESIGN_WIDTH,
    window.innerHeight / DESIGN_HEIGHT,
  );
  scaler.style.transform = `scale(${scale})`;
}

let entered = false;

function enter() {
  if (entered) return;
  entered = true;

  login.classList.add("is-entering");
  login.setAttribute("aria-disabled", "true");

  window.setTimeout(() => {
    login.hidden = true;
    boot.classList.add("is-visible");
    boot.setAttribute("aria-hidden", "false");
  }, 550);
}

renderClock(new Date());
const stopClock = startClock(renderClock);

fitStage();
window.addEventListener("resize", fitStage);

login.addEventListener("click", enter);
login.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    enter();
  }
});

window.addEventListener("beforeunload", () => {
  stopClock();
});
