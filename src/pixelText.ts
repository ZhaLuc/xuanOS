

export const DEFAULT_PIXEL_SIZE = 3;

export function crushToInk(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  ink = { r: 17, g: 17, b: 17 },
) {
  const image = ctx.getImageData(0, 0, width, height);
  const pixels = image.data;

  for (let i = 0; i < pixels.length; i += 4) {
    if (pixels[i + 3] > 96) {
      pixels[i] = ink.r;
      pixels[i + 1] = ink.g;
      pixels[i + 2] = ink.b;
      pixels[i + 3] = 255;
    } else {
      pixels[i + 3] = 0;
    }
  }

  ctx.putImageData(image, 0, 0);
}

export type PixelLabelOptions = {
  className?: string;
  pixelSize?: number;
  align?: CanvasTextAlign;
  
  crush?: boolean;
  
  supersample?: number;
};

export type PixelLabel = {
  canvas: HTMLCanvasElement;
  draw: (text: string) => void;
};

export function createPixelLabel(options: PixelLabelOptions = {}): PixelLabel {
  const pixelSize = options.pixelSize ?? DEFAULT_PIXEL_SIZE;
  const align = options.align ?? "left";
  const crush = options.crush ?? true;
  const supersample = Math.max(1, options.supersample ?? 1);

  const canvas = document.createElement("canvas");
  canvas.className = options.className ?? "pixel-label";
  canvas.setAttribute("aria-hidden", "true");

  const context = canvas.getContext("2d", { willReadFrequently: true });
  if (!context) {
    throw new Error("2D canvas unavailable");
  }
  const ctx = context;

  function draw(text: string) {
    const display = canvas.parentElement;
    if (!display) return;

    const cssWidth = Math.max(1, Math.floor(display.clientWidth / pixelSize));
    const cssHeight = Math.max(1, Math.floor(display.clientHeight / pixelSize));
    const width = cssWidth * supersample;
    const height = cssHeight * supersample;

    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }

    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "#111";
    ctx.textAlign = align;
    ctx.textBaseline = "middle";
    ctx.font = `${Math.max(8, Math.round(height * 0.72))}px "Gochi Hand", cursive`;

    const x =
      align === "center" ? width / 2 : align === "right" ? width - 2 * supersample : 2 * supersample;
    ctx.fillText(text, x, height / 2 + supersample);

    if (crush) {
      crushToInk(ctx, width, height);
    }
  }

  return { canvas, draw };
}
