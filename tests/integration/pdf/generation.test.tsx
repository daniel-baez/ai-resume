import { generatePDFBuffer } from "@/lib/pdf";
import { AVAILABLE_LANGUAGES } from "@/constants/i18n";
import { test, describe } from "node:test";
import assert from "node:assert";
import { isValidPDFBuffer } from "../../helpers/pdf";
import { getProfileData, getSummaryData, getExperienceEntries } from "@/lib/data";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";
import type { TextItem, TextMarkedContent } from "pdfjs-dist/types/src/display/api";
import type { PDFDocumentProxy } from "pdfjs-dist/types/src/display/api";
import path from "path";

function normalizeText(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

async function extractAllPagesText(pdfDoc: PDFDocumentProxy): Promise<string> {
  const pages: string[] = [];

  for (let pageNum = 1; pageNum <= pdfDoc.numPages; pageNum++) {
    const page = await pdfDoc.getPage(pageNum);
    const textContent = await page.getTextContent();
    const pageText = textContent.items
      .map((item: TextItem | TextMarkedContent) => {
        if ("str" in item) {
          return item.str;
        }
        return "";
      })
      .join(" ");
    pages.push(pageText);
  }

  return normalizeText(pages.join(" "));
}

describe("PDF Generation Integration", async () => {
  pdfjsLib.GlobalWorkerOptions.workerSrc = path.join(
    process.cwd(),
    "node_modules",
    "pdfjs-dist",
    "legacy",
    "build",
    "pdf.worker.mjs"
  );

  const standardFontDataUrl = path.join(
    process.cwd(),
    "node_modules",
    "pdfjs-dist",
    "standard_fonts/"
  );

  for (const langCode of Object.keys(AVAILABLE_LANGUAGES)) {
    await test(`should generate a valid PDF document for ${langCode}`, async () => {
      const lang = AVAILABLE_LANGUAGES[langCode];
      const profileData = getProfileData(lang);
      const summaryData = getSummaryData(lang);
      const pdfExperiences = getExperienceEntries(lang, true);

      const buffer = await generatePDFBuffer(langCode);

      assert(isValidPDFBuffer(buffer), "Generated buffer should be a valid PDF");

      const loadingTask = pdfjsLib.getDocument({
        data: new Uint8Array(buffer),
        standardFontDataUrl,
      });
      const pdfDoc = await loadingTask.promise;
      assert(pdfDoc.numPages > 0, "PDF should have at least one page");

      const bufferSizeKB = buffer.length / 1024;
      assert(
        bufferSizeKB >= 10,
        `PDF size (${bufferSizeKB.toFixed(1)}KB) should be at least 10KB`
      );

      const normalizedPageText = await extractAllPagesText(pdfDoc);
      const normalizedName = normalizeText(profileData.info.name);
      const normalizedTitle = normalizeText(profileData.info.title);
      const normalizedLocation = normalizeText(profileData.info.location);
      const normalizedSummary = normalizeText(summaryData);

      assert(
        normalizedPageText.includes(normalizedName),
        "PDF should contain profile name"
      );
      assert(
        normalizedPageText.includes(normalizedTitle),
        "PDF should contain profile title"
      );
      assert(
        normalizedPageText.includes(normalizedLocation),
        "PDF should contain profile location"
      );

      const firstCategory = Object.values(profileData.skills)[0];
      const firstThreeSkills = firstCategory.slice(0, 3);
      firstThreeSkills.forEach((skill) => {
        const normalizedSkill = normalizeText(skill.name);
        assert(
          normalizedPageText.includes(normalizedSkill),
          `PDF should contain skill: ${skill.name}`
        );
      });

      const summaryPreview = normalizedSummary.slice(0, 50);
      assert(
        normalizedPageText.includes(summaryPreview),
        "PDF should contain the beginning of the summary"
      );

      const primaryExperience = pdfExperiences[0];
      const companyFragment = normalizeText(primaryExperience.company).split(
        " "
      )[0];
      assert(
        normalizedPageText.includes(companyFragment),
        `PDF should contain experience company: ${primaryExperience.company}`
      );
    });
  }

  await test("should throw error for unsupported language", async () => {
    try {
      await generatePDFBuffer("invalid-lang");
      assert.fail("Should have thrown an error");
    } catch (error) {
      assert(error instanceof Error);
      assert(
        error.message.includes('Language code "invalid-lang" is not supported')
      );
    }
  });
});
