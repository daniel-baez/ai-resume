import fs from "fs";
import path from "path";
import { getAllPreviewDocuments } from "../src/lib/document-sources";
import { renderPdfPreview } from "./lib/render-pdf-preview";

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
