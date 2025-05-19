import { generatePDFBuffer } from '@/lib/pdf';
import { AVAILABLE_LANGUAGES } from '@/constants/i18n';
import { test, describe } from 'node:test';
import assert from 'node:assert';
import { isValidPDFBuffer } from './test-utils';
import { getProfileData, getSummaryData } from '@/lib/data';
import * as pdfjsLib from 'pdfjs-dist';
import type { TextItem, TextMarkedContent } from 'pdfjs-dist/types/src/display/api';
import path from 'path';

// Helper function to normalize text by removing diacritics and extra whitespace
function normalizeText(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

describe('PDF Generation Integration', async () => {
  // Configure pdf.js
  pdfjsLib.GlobalWorkerOptions.workerSrc = path.join(
    process.cwd(),
    'node_modules',
    'pdfjs-dist',
    'build',
    'pdf.worker.js'
  );

  // Set standard font data URL
  const standardFontDataUrl = path.join(
    process.cwd(),
    'node_modules',
    'pdfjs-dist',
    'standard_fonts'
  );

  // Test for each supported language
  for (const langCode of Object.keys(AVAILABLE_LANGUAGES)) {
    await test(`should generate a valid PDF document for ${langCode}`, async () => {
      // Get expected data for validation
      const profileData = getProfileData(AVAILABLE_LANGUAGES[langCode]);
      const summaryData = getSummaryData(AVAILABLE_LANGUAGES[langCode]);

      // Generate PDF buffer for the language
      const buffer = await generatePDFBuffer(langCode);

      // 1. Basic PDF structure validation
      assert(isValidPDFBuffer(buffer), 'Generated buffer should be a valid PDF');

      // 2. PDF-lib validation
      const loadingTask = pdfjsLib.getDocument({
        data: new Uint8Array(buffer),
        standardFontDataUrl
      });
      const pdfDoc = await loadingTask.promise;
      assert(pdfDoc.numPages > 0, 'PDF should have at least one page');

      // 3. Size validation (45-55KB range)
      const bufferSizeKB = buffer.length / 1024;
      assert(
        bufferSizeKB >= 45 && bufferSizeKB <= 55,
        `PDF size (${bufferSizeKB.toFixed(1)}KB) should be between 45KB and 55KB`
      );

      // 4. Content validation using pdf.js text extraction
      const page = await pdfDoc.getPage(1); // Get first page
      const textContent = await page.getTextContent();
      const pageText = textContent.items
        .map((item: TextItem | TextMarkedContent) => {
          if ('str' in item) {
            return item.str;
          }
          return '';
        })
        .join(' ');

      // Normalize both the extracted text and the expected values
      const normalizedPageText = normalizeText(pageText);
      const normalizedName = normalizeText(profileData.info.name);
      const normalizedTitle = normalizeText(profileData.info.title);
      const normalizedLocation = normalizeText(profileData.info.location);
      const normalizedSummary = normalizeText(summaryData);

      // Debug logging
      console.log(`\nTesting ${langCode}:`);
      console.log('Normalized page text:', normalizedPageText.slice(0, 200));
      console.log('Expected name:', normalizedName);
      console.log('Expected title:', normalizedTitle);
      console.log('Expected location:', normalizedLocation);
      console.log('Expected summary start:', normalizedSummary.slice(0, 50));

      // Profile content validation
      assert(
        normalizedPageText.includes(normalizedName),
        'PDF should contain profile name'
      );
      assert(
        normalizedPageText.includes(normalizedTitle),
        'PDF should contain profile title'
      );
      assert(
        normalizedPageText.includes(normalizedLocation),
        'PDF should contain profile location'
      );

      // Skills validation (first 3 from first category)
      const firstCategory = Object.values(profileData.skills)[0];
      const firstThreeSkills = firstCategory.slice(0, 3);
      firstThreeSkills.forEach(skill => {
        const normalizedSkill = normalizeText(skill.name);
        assert(
          normalizedPageText.includes(normalizedSkill),
          `PDF should contain skill: ${skill.name}`
        );
      });

      // Summary validation (first 50 chars)
      const summaryPreview = normalizedSummary.slice(0, 50);
      assert(
        normalizedPageText.includes(summaryPreview),
        'PDF should contain the beginning of the summary'
      );
    });
  }

  await test('should throw error for unsupported language', async () => {
    try {
      await generatePDFBuffer('invalid-lang');
      assert.fail('Should have thrown an error');
    } catch (error) {
      assert(error instanceof Error);
      assert(error.message.includes('Language code "invalid-lang" is not supported'));
    }
  });
}); 