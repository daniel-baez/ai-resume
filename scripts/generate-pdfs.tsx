import fs from 'fs';
import path from 'path';
import { generatePDFBuffer } from '../src/lib/pdf';
import { Language } from '../src/constants/i18n';
import { AVAILABLE_LANGUAGES } from '../src/constants/i18n';

const LANGS: string[] = Object.keys(AVAILABLE_LANGUAGES)
const OUTPUT_DIR = path.join(process.cwd(), 'public', 'pdfs');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function generateAndSavePDF(lang: string) {
  try {
    const pdfBuffer = await generatePDFBuffer(lang);
    const outPath = path.join(OUTPUT_DIR, `resume-${lang}.pdf`);
    fs.writeFileSync(outPath, pdfBuffer);
    
    if (fs.statSync(outPath).size < 1000) {
      throw new Error(`PDF ${outPath} is too small, likely failed to generate properly.`);
    }
    
    console.log(`PDF generated: ${outPath}`);
  } catch (error) {
    console.error(`Error generating PDF for ${lang}:`, error);
    throw error;
  }
}

(async () => {
  try {
    await Promise.all(LANGS.map(generateAndSavePDF));
    console.log('All PDFs have been generated successfully.');
  } catch (error) {
    console.error('Failed to generate PDFs:', error);
    process.exit(1);
  }
})();
