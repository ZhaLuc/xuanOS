import { formatClock } from "./clock";
import { createPixelLabel } from "./pixelText";
import { listApps } from "./apps/registry";
import type { AppId } from "./apps/types";
import { createWindowManager } from "./wm/windowManager";

export type DesktopOptions = {
  onShutdown: () => void;
};

export type DesktopController = {
  root: HTMLElement;
  show: () => void;
  hide: () => void;
  fit: () => void;
  tick: (now: Date) => void;
};

export function createDesktop(options: DesktopOptions): DesktopController {
  const root = document.createElement("section");
  root.className = "viewport desktop";
  root.id = "desktop";
  root.setAttribute("aria-hidden", "true");
  root.setAttribute("aria-label", "XUANOS desktop");

  root.innerHTML = `
    <div class="stage-scaler" data-desktop-scaler>
      <div class="stage desktop__stage">
        <img
          class="stage__art"
          src="/desktop.png"
          alt=""
          draggable="false"
          width="1920"
          height="1080"
        />
        <header class="menubar menubar--top">
          <div class="menubar__brand" data-brand></div>
          <div class="menubar__status">
            <div class="menubar__time" data-menubar-time></div>
          </div>
        </header>
        <div class="desktop__workarea" data-workarea>
          <div class="desktop__icons" data-icons></div>
          <div class="desktop__windows" data-windows></div>
        </div>
        <footer class="menubar menubar--bottom">
          <div class="power" data-power>
            <button type="button" class="power__btn" data-power-btn aria-label="Power" aria-expanded="false" aria-haspopup="true">
              <img class="power__icon" src="/power.png" alt="" draggable="false" width="38" height="18" />
            </button>
            <div class="power__menu" data-power-menu>
              <button type="button" class="power__item" data-shutdown>shut off</button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  `;

  const scaler = root.querySelector<HTMLElement>("[data-desktop-scaler]")!;
  const brandMount = root.querySelector<HTMLElement>("[data-brand]")!;
  const timeMount = root.querySelector<HTMLElement>("[data-menubar-time]")!;
  const iconsMount = root.querySelector<HTMLElement>("[data-icons]")!;
  const windowsLayer = root.querySelector<HTMLElement>("[data-windows]")!;
  const powerBtn = root.querySelector<HTMLButtonElement>("[data-power-btn]")!;
  const powerMenu = root.querySelector<HTMLElement>("[data-power-menu]")!;
  const shutdownBtn = root.querySelector<HTMLButtonElement>("[data-shutdown]")!;

  const brandLabel = createPixelLabel({
    className: "pixel-label pixel-label--hires",
    align: "left",
    pixelSize: 1,
    crush: false,
    supersample: 2,
  });
  const timeLabel = createPixelLabel({
    className: "pixel-label pixel-label--hires",
    align: "right",
    pixelSize: 1,
    crush: false,
    supersample: 2,
  });

  brandMount.append(brandLabel.canvas);
  timeMount.append(timeLabel.canvas);

  let scaleX = 1;
  let scaleY = 1;
  let visible = false;

  const wm = createWindowManager(windowsLayer, () => ({ x: scaleX, y: scaleY }));

  for (const app of listApps()) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "desktop-icon";
    button.dataset.appId = app.id;
    button.setAttribute("aria-label", `Open ${app.iconLabel}`);
    button.innerHTML = `
      <img class="desktop-icon__img" src="${app.iconSrc}" alt="" draggable="false" width="72" height="72" />
      <span class="desktop-icon__label">${app.iconLabel}</span>
    `;
    button.addEventListener("click", () => wm.open(app.id as AppId));
    iconsMount.append(button);
  }

  function setPowerMenuOpen(open: boolean) {
    powerMenu.classList.toggle("is-open", open);
    powerBtn.setAttribute("aria-expanded", String(open));
  }

  powerBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    setPowerMenuOpen(!powerMenu.classList.contains("is-open"));
  });

  let shuttingDown = false;
  const SHUTDOWN_MS = 1400;

  shutdownBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    if (shuttingDown) return;
    shuttingDown = true;
    setPowerMenuOpen(false);
    root.classList.add("is-shutting-off");

    window.setTimeout(() => {
      hide();
      root.classList.remove("is-shutting-off");
      shuttingDown = false;
      options.onShutdown();
    }, SHUTDOWN_MS);
  });

  root.addEventListener("click", () => {
    if (powerMenu.classList.contains("is-open")) {
      setPowerMenuOpen(false);
    }
  });

  powerMenu.addEventListener("click", (event) => {
    event.stopPropagation();
  });

  function paintChrome(now: Date) {
    if (!visible) return;
    const { time } = formatClock(now);
    brandLabel.draw("XUANOS");
    timeLabel.draw(time);
  }

  function fit() {
    scaleX = window.innerWidth / 1920;
    scaleY = window.innerHeight / 1080;
    scaler.style.transform = `scale(${scaleX}, ${scaleY})`;
    paintChrome(new Date());
  }

  function show() {
    visible = true;
    shuttingDown = false;
    root.classList.remove("is-shutting-off");
    root.classList.add("is-active");
    root.setAttribute("aria-hidden", "false");
    setPowerMenuOpen(false);

    requestAnimationFrame(() => {
      fit();
      requestAnimationFrame(() => paintChrome(new Date()));
    });
  }

  function hide() {
    visible = false;
    setPowerMenuOpen(false);
    root.classList.remove("is-active");
    root.setAttribute("aria-hidden", "true");
  }

  function tick(now: Date) {
    if (!visible) return;
    paintChrome(now);
  }

  return { root, show, hide, fit, tick };
}
