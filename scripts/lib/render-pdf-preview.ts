import fs from "fs";
import path from "path";
import Canvas from "canvas";
import { getDocument, GlobalWorkerOptions } from "pdfjs-dist/legacy/build/pdf.mjs";

const MAX_PREVIEW_WIDTH = 1200;
const { createCanvas, Image } = Canvas;

// pdfjs checks instanceof HTMLCanvasElement/HTMLImageElement for embedded PDF images.
globalThis.Image = Image as unknown as typeof globalThis.Image;
globalThis.HTMLCanvasElement =
  createCanvas(1, 1).constructor as unknown as typeof globalThis.HTMLCanvasElement;
globalThis.HTMLImageElement =
  Image as unknown as typeof globalThis.HTMLImageElement;

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

export async function renderPdfPreview(
  pdfPath: string,
  outputPath: string
): Promise<void> {
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
