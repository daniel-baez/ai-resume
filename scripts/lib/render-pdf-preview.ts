import fs from "fs";
import path from "path";
import { getDocument, GlobalWorkerOptions } from "pdfjs-dist/legacy/build/pdf.mjs";

const MAX_PREVIEW_WIDTH = 1200;

GlobalWorkerOptions.workerSrc = path.join(
  process.cwd(),
  "node_modules",
  "pdfjs-dist",
  "legacy",
  "build",
  "pdf.worker.mjs"
);

function getStandardFontDataUrl(): string {
  return path.join(
    process.cwd(),
    "node_modules",
    "pdfjs-dist",
    "standard_fonts/"
  );
}

type PreviewRenderer = (
  pdfPath: string,
  outputPath: string
) => Promise<void>;

async function renderWithNapiCanvas(
  pdfPath: string,
  outputPath: string
): Promise<void> {
  const { createCanvas } = await import("@napi-rs/canvas");
  const data = new Uint8Array(fs.readFileSync(pdfPath));
  const pdf = await getDocument({
    data,
    standardFontDataUrl: getStandardFontDataUrl(),
  }).promise;
  const page = await pdf.getPage(1);
  const baseViewport = page.getViewport({ scale: 1 });
  const scale = MAX_PREVIEW_WIDTH / baseViewport.width;
  const viewport = page.getViewport({ scale });

  const canvas = createCanvas(
    Math.floor(viewport.width),
    Math.floor(viewport.height)
  );
  const context = canvas.getContext("2d");

  if (!context) {
    throw new Error(`Failed to create 2D context for preview: ${pdfPath}`);
  }

  await page.render({
    canvasContext: context as unknown as CanvasRenderingContext2D,
    canvas: canvas as unknown as HTMLCanvasElement,
    viewport,
  }).promise;

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, await canvas.toBuffer("image/jpeg"));
}

async function renderWithNodeCanvas(
  pdfPath: string,
  outputPath: string
): Promise<void> {
  const Canvas = (await import("canvas")).default;
  const { createCanvas, Image } = Canvas;

  globalThis.Image = Image as unknown as typeof globalThis.Image;
  globalThis.HTMLCanvasElement =
    createCanvas(1, 1).constructor as unknown as typeof globalThis.HTMLCanvasElement;
  globalThis.HTMLImageElement =
    Image as unknown as typeof globalThis.HTMLImageElement;

  class NodeCanvasFactory {
    create(width: number, height: number) {
      const canvas = createCanvas(width, height);
      const context = canvas.getContext("2d");
      return { canvas, context };
    }

    reset(
      canvasAndContext: { canvas: ReturnType<typeof createCanvas> },
      width: number,
      height: number
    ) {
      canvasAndContext.canvas.width = width;
      canvasAndContext.canvas.height = height;
    }

    destroy(canvasAndContext: { canvas: null; context: null }) {
      canvasAndContext.canvas = null;
      canvasAndContext.context = null;
    }
  }

  const data = new Uint8Array(fs.readFileSync(pdfPath));
  const pdf = await getDocument({
    data,
    standardFontDataUrl: getStandardFontDataUrl(),
  }).promise;
  const page = await pdf.getPage(1);
  const baseViewport = page.getViewport({ scale: 1 });
  const scale = MAX_PREVIEW_WIDTH / baseViewport.width;
  const viewport = page.getViewport({ scale });

  const canvasFactory = new NodeCanvasFactory();
  const canvasAndContext = canvasFactory.create(viewport.width, viewport.height);

  if (!canvasAndContext.context) {
    throw new Error(`Failed to create 2D context for preview: ${pdfPath}`);
  }

  await page.render({
    canvasContext: canvasAndContext.context as unknown as CanvasRenderingContext2D,
    viewport,
    canvasFactory,
  }).promise;

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(
    outputPath,
    canvasAndContext.canvas.toBuffer("image/jpeg", { quality: 0.85 })
  );
}

export function getPreviewRenderer(): PreviewRenderer {
  // @napi-rs/canvas is reliable on Linux (Vercel) but segfaults on macOS.
  // node-canvas works locally on macOS with HTML element polyfills.
  if (process.platform === "linux") {
    return renderWithNapiCanvas;
  }

  return renderWithNodeCanvas;
}

export async function renderPdfPreview(
  pdfPath: string,
  outputPath: string
): Promise<void> {
  return getPreviewRenderer()(pdfPath, outputPath);
}
