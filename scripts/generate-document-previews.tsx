import fs from "fs";
import path from "path";
import { createCanvas, Image } from "canvas";
import * as pdfjsLib from "pdfjs-dist";
import { getAllPreviewDocuments } from "../src/lib/document-sources";

const MAX_PREVIEW_WIDTH = 1200;

pdfjsLib.GlobalWorkerOptions.workerSrc = path.join(
  process.cwd(),
  "node_modules",
  "pdfjs-dist",
  "build",
  "pdf.worker.js"
);

// pdfjs needs node-canvas Image when rendering PDFs with embedded images.
globalThis.Image = Image as unknown as typeof globalThis.Image;

class NodeCanvasFactory {
  create(width: number, height: number) {
    const canvas = createCanvas(width, height);
    const context = canvas.getContext("2d");
    return { canvas, context };
  }

  reset(
    canvasAndContext: { canvas: ReturnType<typeof createCanvas>; context: ReturnType<ReturnType<typeof createCanvas>["getContext"]> },
    width: number,
    height: number
  ) {
    canvasAndContext.canvas.width = width;
    canvasAndContext.canvas.height = height;
  }

  destroy(
    canvasAndContext: { canvas: ReturnType<typeof createCanvas> | null; context: ReturnType<ReturnType<typeof createCanvas>["getContext"]> | null }
  ) {
    canvasAndContext.canvas = null;
    canvasAndContext.context = null;
  }
}

async function renderPdfPreview(
  pdfPath: string,
  outputPath: string
): Promise<void> {
  const standardFontDataUrl = path.join(
    process.cwd(),
    "node_modules",
    "pdfjs-dist",
    "standard_fonts/"
  );

  const data = new Uint8Array(fs.readFileSync(pdfPath));
  const pdf = await pdfjsLib.getDocument({
    data,
    standardFontDataUrl,
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

async function generatePreviewForDocument(
  pdfPublicPath: string,
  previewRelativePath: string
): Promise<void> {
  const pdfPath = path.join(process.cwd(), "public", pdfPublicPath.replace(/^\//, ""));
  const outputPath = path.join(process.cwd(), "public", previewRelativePath);

  if (!fs.existsSync(pdfPath)) {
    console.warn(`Skipping preview for missing PDF: ${pdfPublicPath}`);
    return;
  }

  await renderPdfPreview(pdfPath, outputPath);
  console.log(`Preview generated: ${outputPath}`);
}

(async () => {
  try {
    const documents = getAllPreviewDocuments();

    for (const doc of documents) {
      await generatePreviewForDocument(doc.pdf, doc.previewRelativePath);
    }

    console.log("All document previews have been generated successfully.");
  } catch (error) {
    console.error("Failed to generate document previews:", error);
    process.exit(1);
  }
})();
