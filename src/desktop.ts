import { formatClock } from "./clock";
import { createPixelLabel } from "./pixelText";
import { listApps } from "./apps/registry";
import type { AppId } from "./apps/types";
import { createWindowManager } from "./wm/windowManager";
import { enableIconDesktop } from "./desktopIcons";

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
            <a
              class="menubar__github"
              href="https://github.com/ZhaLuc/xuanOS"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open this project on GitHub"
              title="GitHub"
            >
              <svg class="menubar__github-icon" viewBox="0 0 24 24" aria-hidden="true">
                <path fill="currentColor" d="M12 2C6.48 2 2 6.58 2 12.26c0 4.52 2.87 8.35 6.84 9.7.5.1.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.89 1.57 2.34 1.12 2.91.86.09-.66.35-1.12.63-1.38-2.22-.26-4.55-1.14-4.55-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.31.1-2.73 0 0 .84-.27 2.75 1.05A9.3 9.3 0 0 1 12 6.8c.85 0 1.71.12 2.51.35 1.91-1.32 2.75-1.05 2.75-1.05.55 1.42.2 2.47.1 2.73.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.8-4.57 5.06.36.32.68.94.68 1.9 0 1.38-.01 2.49-.01 2.83 0 .26.18.58.69.48A10.33 10.33 0 0 0 22 12.26C22 6.58 17.52 2 12 2z"/>
              </svg>
            </a>
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
          <div class="menubar__signature" data-signature></div>
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
  const signatureMount = root.querySelector<HTMLElement>("[data-signature]")!;

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
  const signatureLabel = createPixelLabel({
    className: "pixel-label pixel-label--hires",
    align: "right",
    pixelSize: 1,
    crush: false,
    supersample: 2,
    fontFamily: '"ZCOOL KuaiLe", "Gochi Hand", cursive',
  });

  brandMount.append(brandLabel.canvas);
  timeMount.append(timeLabel.canvas);
  signatureMount.append(signatureLabel.canvas);

  let scaleX = 1;
  let scaleY = 1;
  let visible = false;

  const wm = createWindowManager(windowsLayer, () => ({ x: scaleX, y: scaleY }));
  const workarea = root.querySelector<HTMLElement>("[data-workarea]")!;

  const iconButtons: HTMLButtonElement[] = [];
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
    iconsMount.append(button);
    iconButtons.push(button);
  }

  enableIconDesktop(iconsMount, iconButtons, {
    workarea,
    getScale: () => ({ x: scaleX, y: scaleY }),
    onOpen: (id: AppId) => wm.open(id),
  });

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
      wm.closeAll();
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
    signatureLabel.draw("乐轩2026");
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
