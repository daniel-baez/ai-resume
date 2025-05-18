import fs from 'fs';
import path from 'path';
import { generatePDFBuffer } from '@/lib/pdf';
import { AVAILABLE_LANGUAGES } from '@/constants/i18n';

const TEST_OUTPUT_DIR = path.join(process.cwd(), 'public', 'test-pdfs');
const TEST_TIMEOUT = 30000; // 30 seconds
const MAX_GENERATION_TIME = 2000; // 2 seconds

describe('PDF Generation Tests', () => {
  beforeAll(() => {
    // Create test directory if it doesn't exist
    if (!fs.existsSync(TEST_OUTPUT_DIR)) {
      fs.mkdirSync(TEST_OUTPUT_DIR, { recursive: true });
    }
  });

  afterAll(() => {
    // Clean up test directory after tests
    if (fs.existsSync(TEST_OUTPUT_DIR)) {
      fs.rmSync(TEST_OUTPUT_DIR, { recursive: true, force: true });
    }
  });

  describe('Basic PDF Generation', () => {
    test.each(Object.keys(AVAILABLE_LANGUAGES))(
      'should generate PDF for %s language',
      async (lang) => {
        const startTime = Date.now();
        const pdfBuffer = await generatePDFBuffer(lang);
        const generationTime = Date.now() - startTime;

        // Performance check
        expect(generationTime).toBeLessThan(MAX_GENERATION_TIME);

        // File generation check
        const outPath = path.join(TEST_OUTPUT_DIR, `resume-${lang}.pdf`);
        fs.writeFileSync(outPath, pdfBuffer);
        
        // File existence check
        expect(fs.existsSync(outPath)).toBe(true);
        
        // File size check
        const stats = fs.statSync(outPath);
        expect(stats.size).toBeGreaterThan(1000);
      },
      TEST_TIMEOUT
    );
  });

  describe('Error Handling', () => {
    test('should throw error for invalid language code', async () => {
      await expect(generatePDFBuffer('invalid-lang')).rejects.toThrow();
    });

    test('should handle directory permission issues', async () => {
      const readOnlyDir = path.join(TEST_OUTPUT_DIR, 'readonly');
      fs.mkdirSync(readOnlyDir, { recursive: true });
      fs.chmodSync(readOnlyDir, 0o444); // Read-only permissions

      const pdfBuffer = await generatePDFBuffer('en');
      await expect(
        fs.promises.writeFile(path.join(readOnlyDir, 'test.pdf'), pdfBuffer)
      ).rejects.toThrow();
    });
  });

  describe('Parallel Generation', () => {
    test('should generate multiple PDFs simultaneously', async () => {
      const startTime = Date.now();
      const languages = Object.keys(AVAILABLE_LANGUAGES);
      
      const results = await Promise.all(
        languages.map(lang => generatePDFBuffer(lang))
      );
      
      const totalTime = Date.now() - startTime;
      const averageTime = totalTime / languages.length;
      
      expect(results.length).toBe(languages.length);
      expect(averageTime).toBeLessThan(MAX_GENERATION_TIME);
      
      // Verify all PDFs are valid
      results.forEach((pdfBuffer, index) => {
        const outPath = path.join(TEST_OUTPUT_DIR, `parallel-${languages[index]}.pdf`);
        fs.writeFileSync(outPath, pdfBuffer);
        const stats = fs.statSync(outPath);
        expect(stats.size).toBeGreaterThan(1000);
      });
    }, TEST_TIMEOUT);
  });
});
