import type { ClockParts } from "./clock";
import { crushToInk } from "./pixelText";

type PixelClock = {
  canvas: HTMLCanvasElement;
  draw: (parts: ClockParts) => void;
};

export function createPixelClock(): PixelClock {
  const canvas = document.createElement("canvas");
  canvas.className = "stage__clock-canvas";
  canvas.setAttribute("aria-hidden", "true");

  const context = canvas.getContext("2d", { willReadFrequently: true });
  if (!context) {
    throw new Error("2D canvas unavailable");
  }
  const ctx = context;

  function draw(parts: ClockParts) {
    const display = canvas.parentElement;
    if (!display) return;

    const width = Math.max(1, Math.floor(display.clientWidth / 4));
    const height = Math.max(1, Math.floor(display.clientHeight / 4));

    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }

    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "#111";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const cx = width / 2;
    const lines = [
      { text: parts.weekday, size: height * 0.11 },
      { text: parts.date, size: height * 0.13 },
      { text: parts.time, size: height * 0.18 },
    ];

    const gap = height * 0.02;
    const blockHeight =
      lines.reduce((sum, line) => sum + line.size, 0) + gap * (lines.length - 1);
    let y = (height - blockHeight) / 2;

    for (const line of lines) {
      ctx.font = `${Math.max(8, Math.round(line.size))}px "Gochi Hand", cursive`;
      y += line.size / 2;
      ctx.fillText(line.text, cx, y);
      y += line.size / 2 + gap;
    }

    crushToInk(ctx, width, height);
  }

  return { canvas, draw };
}
