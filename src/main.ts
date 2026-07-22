import "./style.css";
import { formatClock, startClock } from "./clock";
import { createPixelClock } from "./pixelClock";
import { createDesktop } from "./desktop";
import { createResolutionWarning } from "./resolutionWarning";

const DESIGN_WIDTH = 1920;
const DESIGN_HEIGHT = 1080;

const app = document.querySelector<HTMLDivElement>("#app");
if (!app) {
  throw new Error("Missing #app root");
}

app.innerHTML = `
  <main class="viewport login" id="login" role="button" tabindex="0" aria-label="Click to enter XUANOS">
    <div class="stage-scaler" id="login-scaler">
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
          <span class="stage__clock-sr" data-clock-label></span>
        </div>
      </div>
    </div>
  </main>
`;

const login = document.querySelector<HTMLElement>("#login")!;
const loginScaler = document.querySelector<HTMLElement>("#login-scaler")!;
const clockMount = document.querySelector<HTMLElement>(".stage__clock")!;
const clockLabel = document.querySelector<HTMLElement>("[data-clock-label]")!;

const pixelClock = createPixelClock();
clockMount.append(pixelClock.canvas);

const desktop = createDesktop({
  onShutdown: () => {
    desktop.hide();
    entered = false;
    login.classList.remove("is-entering", "is-away");
    login.removeAttribute("aria-disabled");
    login.setAttribute("aria-hidden", "false");
    login.focus();
    fitLogin();
  },
});
app.append(desktop.root);

const resolutionWarning = createResolutionWarning();
app.append(resolutionWarning.root);

function renderLoginClock(now: Date) {
  const parts = formatClock(now);
  clockLabel.textContent = `${parts.weekday}, ${parts.date}, ${parts.time}`;
  pixelClock.draw(parts);
}

function fitLogin() {
  const scaleX = window.innerWidth / DESIGN_WIDTH;
  const scaleY = window.innerHeight / DESIGN_HEIGHT;
  loginScaler.style.transform = `scale(${scaleX}, ${scaleY})`;
  renderLoginClock(new Date());
}

function fitAll() {
  fitLogin();
  desktop.fit();
  resolutionWarning.sync();
}

let entered = false;
const YEET_MS = 1350;

function enter() {
  if (entered) return;
  entered = true;

  login.classList.add("is-entering");
  login.setAttribute("aria-disabled", "true");

  window.setTimeout(() => {
    desktop.show();
    login.classList.add("is-away");
    login.setAttribute("aria-hidden", "true");
  }, YEET_MS);
}

async function boot() {
  if (document.fonts?.ready) {
    await document.fonts.ready;
  }
  fitAll();
}

boot();
const stopClock = startClock((now) => {
  if (!login.classList.contains("is-away")) {
    renderLoginClock(now);
  }
  desktop.tick(now);
});

window.addEventListener("resize", fitAll);

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
