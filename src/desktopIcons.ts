import type { AppId } from "./apps/types";

export type ScaleProvider = () => { x: number; y: number };

const GRID_X = 120;
const GRID_Y = 120;
const ICON_W = 104;
const ICON_H = 108;
const PAD = 10;

type IconDragOptions = {
  workarea: HTMLElement;
  getScale: ScaleProvider;
  onOpen: (id: AppId) => void;
};

export function enableIconDesktop(
  iconsMount: HTMLElement,
  buttons: HTMLButtonElement[],
  options: IconDragOptions,
) {
  iconsMount.classList.add("desktop__icons--grid");

  const positions = new Map<AppId, { col: number; row: number }>();

  function rowsPerColumn() {
    const height = options.workarea.clientHeight || 968;
    // Column-major wrap: fill down, then start the next column beside it.
    return Math.max(1, Math.floor((height - PAD) / GRID_Y));
  }

  buttons.forEach((button, index) => {
    const id = button.dataset.appId as AppId;
    const perCol = rowsPerColumn();
    const col = Math.floor(index / perCol);
    const row = index % perCol;
    positions.set(id, { col, row });
    placeIcon(button, col, row);
    bindIcon(button, id);
  });

  function placeIcon(button: HTMLElement, col: number, row: number) {
    button.style.left = `${PAD + col * GRID_X}px`;
    button.style.top = `${PAD + row * GRID_Y}px`;
  }

  function clampCell(col: number, row: number) {
    const bounds = options.workarea;
    const maxCol = Math.max(
      0,
      Math.floor((bounds.clientWidth - PAD - ICON_W) / GRID_X),
    );
    const maxRow = Math.max(
      0,
      Math.floor((bounds.clientHeight - PAD - ICON_H) / GRID_Y),
    );
    return {
      col: Math.min(maxCol, Math.max(0, col)),
      row: Math.min(maxRow, Math.max(0, row)),
    };
  }

  function pointerToLocal(clientX: number, clientY: number) {
    const rect = options.workarea.getBoundingClientRect();
    const scale = options.getScale();
    return {
      x: (clientX - rect.left) / scale.x,
      y: (clientY - rect.top) / scale.y,
    };
  }

  function bindIcon(button: HTMLButtonElement, id: AppId) {
    let dragging = false;
    let moved = false;
    let originX = 0;
    let originY = 0;
    let startLeft = 0;
    let startTop = 0;

    button.addEventListener("pointerdown", (event) => {
      if (event.button !== 0) return;
      dragging = true;
      moved = false;
      button.setPointerCapture(event.pointerId);
      const local = pointerToLocal(event.clientX, event.clientY);
      originX = local.x;
      originY = local.y;
      startLeft = parseFloat(button.style.left || "0");
      startTop = parseFloat(button.style.top || "0");
      button.classList.add("is-dragging");
      event.preventDefault();
    });

    button.addEventListener("pointermove", (event) => {
      if (!dragging) return;
      const local = pointerToLocal(event.clientX, event.clientY);
      const dx = local.x - originX;
      const dy = local.y - originY;
      if (Math.abs(dx) > 4 || Math.abs(dy) > 4) {
        moved = true;
      }
      if (!moved) return;

      const rawLeft = startLeft + dx;
      const rawTop = startTop + dy;
      const maxLeft = Math.max(0, options.workarea.clientWidth - ICON_W);
      const maxTop = Math.max(0, options.workarea.clientHeight - ICON_H);
      button.style.left = `${Math.min(maxLeft, Math.max(0, rawLeft))}px`;
      button.style.top = `${Math.min(maxTop, Math.max(0, rawTop))}px`;
    });

    const endDrag = (event: PointerEvent) => {
      if (!dragging) return;
      dragging = false;
      button.classList.remove("is-dragging");
      try {
        button.releasePointerCapture(event.pointerId);
      } catch {
        void 0;
      }

      if (!moved) {
        options.onOpen(id);
        return;
      }

      const left = parseFloat(button.style.left || "0");
      const top = parseFloat(button.style.top || "0");
      const snapped = clampCell(
        Math.round((left - PAD) / GRID_X),
        Math.round((top - PAD) / GRID_Y),
      );
      positions.set(id, snapped);
      placeIcon(button, snapped.col, snapped.row);
    };

    button.addEventListener("pointerup", endDrag);
    button.addEventListener("pointercancel", endDrag);

    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
    });
  }
}
