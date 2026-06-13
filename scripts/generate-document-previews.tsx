import fs from "fs";
import path from "path";
import { createCanvas } from "@napi-rs/canvas";
import { getDocument, GlobalWorkerOptions } from "pdfjs-dist/legacy/build/pdf.mjs";
import { getAllPreviewDocuments } from "../src/lib/document-sources";

const MAX_PREVIEW_WIDTH = 1200;

GlobalWorkerOptions.workerSrc = path.join(
  process.cwd(),
  "node_modules",
  "pdfjs-dist",
  "legacy",
  "build",
  "pdf.worker.mjs"
);

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
  const pdf = await getDocument({
    data,
    standardFontDataUrl,
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
