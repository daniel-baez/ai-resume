import { generatePDFBuffer } from '@/lib/pdf';
import { AVAILABLE_LANGUAGES } from '@/constants/i18n';

describe('PDF Generation', () => {
  test('successfully generates PDF buffer for English', async () => {
    const buffer = await generatePDFBuffer('en');
    const size = buffer.length;
    
    expect(Buffer.isBuffer(buffer)).toBe(true);
    expect(size).toBeGreaterThan(30000);
    expect(size).toBeLessThan(100000);
  }, 30000); // Increased timeout for actual PDF generation

  test('generates PDFs for all supported languages', async () => {
    const languages = Object.keys(AVAILABLE_LANGUAGES);
    
    for (const lang of languages) {
      const buffer = await generatePDFBuffer(lang);
      const size = buffer.length;
      
      expect(Buffer.isBuffer(buffer)).toBe(true);
      expect(size).toBeGreaterThan(30000);
      expect(size).toBeLessThan(100000);
    }
  }, 60000); // Longer timeout for multiple PDFs

  test('throws error for invalid language code', async () => {
    await expect(generatePDFBuffer('invalid-lang')).rejects.toThrow(
      'Language code "invalid-lang" is not supported.'
    );
  });
});
