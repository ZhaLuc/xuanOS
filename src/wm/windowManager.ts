import { getApp } from "../apps/registry";
import type { AppId } from "../apps/types";

export type ScaleProvider = () => { x: number; y: number };

type WindowRecord = {
  id: AppId;
  el: HTMLElement;
  minimized: boolean;
};

export type WindowManager = {
  open: (id: AppId) => void;
  close: (id: AppId) => void;
  minimize: (id: AppId) => void;
  restore: (id: AppId) => void;
  focus: (id: AppId) => void;
};

export function createWindowManager(
  layer: HTMLElement,
  getScale: ScaleProvider,
): WindowManager {
  const windows = new Map<AppId, WindowRecord>();
  let zCounter = 10;

  function focus(id: AppId) {
    const record = windows.get(id);
    if (!record || record.minimized) return;
    zCounter += 1;
    record.el.style.zIndex = String(zCounter);
    layer.querySelectorAll(".os-window").forEach((node) => {
      node.classList.toggle("is-focused", node === record.el);
    });
  }

  function close(id: AppId) {
    const record = windows.get(id);
    if (!record) return;
    record.el.remove();
    windows.delete(id);
  }

  function minimize(id: AppId) {
    const record = windows.get(id);
    if (!record) return;
    record.minimized = true;
    record.el.classList.add("is-minimized");
    record.el.classList.remove("is-focused");
  }

  function restore(id: AppId) {
    const record = windows.get(id);
    if (!record) return;
    record.minimized = false;
    record.el.classList.remove("is-minimized");
    focus(id);
  }

  function open(id: AppId) {
    const existing = windows.get(id);
    if (existing) {
      if (existing.minimized) restore(id);
      else focus(id);
      return;
    }

    const app = getApp(id);
    const el = document.createElement("article");
    el.className = "os-window is-focused";
    el.dataset.appId = id;
    el.style.width = `${app.width}px`;
    el.style.height = `${app.height}px`;
    el.style.left = `${180 + windows.size * 28}px`;
    el.style.top = `${120 + windows.size * 28}px`;

    el.innerHTML = `
      <header class="os-window__titlebar" data-titlebar>
        <div class="os-window__title" data-window-title></div>
        <div class="os-window__controls">
          <button type="button" class="os-window__btn" data-minimize aria-label="Minimize">_</button>
          <button type="button" class="os-window__btn os-window__btn--close" data-close aria-label="Close">x</button>
        </div>
      </header>
      <div class="os-window__body" data-body></div>
    `;

    const titleMount = el.querySelector<HTMLElement>("[data-window-title]")!;
    titleMount.textContent = app.title;

    const body = el.querySelector<HTMLElement>("[data-body]")!;
    body.append(app.createContent());

    el.querySelector("[data-minimize]")!.addEventListener("click", (event) => {
      event.stopPropagation();
      minimize(id);
    });
    el.querySelector("[data-close]")!.addEventListener("click", (event) => {
      event.stopPropagation();
      close(id);
    });
    el.addEventListener("mousedown", () => focus(id));

    enableDrag(el, el.querySelector("[data-titlebar]")!, getScale);

    layer.append(el);
    windows.set(id, { id, el, minimized: false });
    focus(id);
  }

  return { open, close, minimize, restore, focus };
}

function enableDrag(
  win: HTMLElement,
  handle: HTMLElement,
  getScale: ScaleProvider,
) {
  let dragging = false;
  let originX = 0;
  let originY = 0;
  let startLeft = 0;
  let startTop = 0;

  handle.addEventListener("pointerdown", (event) => {
    if ((event.target as HTMLElement).closest("button")) return;
    dragging = true;
    handle.setPointerCapture(event.pointerId);
    originX = event.clientX;
    originY = event.clientY;
    startLeft = parseFloat(win.style.left || "0");
    startTop = parseFloat(win.style.top || "0");
    win.classList.add("is-dragging");
    event.preventDefault();
  });

  handle.addEventListener("pointermove", (event) => {
    if (!dragging) return;
    const scale = getScale();
    const dx = (event.clientX - originX) / scale.x;
    const dy = (event.clientY - originY) / scale.y;
    win.style.left = `${startLeft + dx}px`;
    win.style.top = `${startTop + dy}px`;
  });

  const endDrag = (event: PointerEvent) => {
    if (!dragging) return;
    dragging = false;
    win.classList.remove("is-dragging");
    try {
      handle.releasePointerCapture(event.pointerId);
    } catch {
      void 0;
    }
  };

  handle.addEventListener("pointerup", endDrag);
  handle.addEventListener("pointercancel", endDrag);
}
