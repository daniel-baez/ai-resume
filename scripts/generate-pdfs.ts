console.log('--- generate-pdfs.ts script starting ---');
import { renderToStream, Font } from '@react-pdf/renderer';
console.log('Imported renderToStream');
import { PDFResume } from '../src/components/PDFResume';
console.log('Imported PDFResume');
import { getProfileData, getSummaryData, getExperienceEntries } from "../src/lib/data";
console.log('Imported data functions');
import { AVAILABLE_LANGUAGES } from "../src/constants/i18n";
console.log('Imported AVAILABLE_LANGUAGES');
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log('Imported fs and path');
// Font registration directly here
const robotoRegular = path.resolve(__dirname, '../public/fonts/Roboto-Regular.ttf');
const robotoBold = path.resolve(__dirname, '../public/fonts/Roboto-Bold.ttf');
const robotoItalic = path.resolve(__dirname, '../public/fonts/Roboto-Italic.ttf');
const playfairRegular = path.resolve(__dirname, '../public/fonts/PlayfairDisplay-Regular.ttf');
const playfairBold = path.resolve(__dirname, '../public/fonts/PlayfairDisplay-Bold.ttf');
const playfairItalic = path.resolve(__dirname, '../public/fonts/PlayfairDisplay-Italic.ttf');
console.log('Registering fonts:');
console.log('Roboto-Regular:', robotoRegular);
console.log('Roboto-Bold:', robotoBold);
console.log('Roboto-Italic:', robotoItalic);
console.log('Playfair-Regular:', playfairRegular);
console.log('Playfair-Bold:', playfairBold);
console.log('Playfair-Italic:', playfairItalic);
Font.register({
  family: 'Roboto',
  fonts: [
    { src: robotoRegular },
    { src: robotoBold, fontWeight: 700 },
    { src: robotoItalic, fontStyle: 'italic' },
  ],
});
Font.register({
  family: 'Playfair Display',
  fonts: [
    { src: playfairRegular },
    { src: playfairBold, fontWeight: 700 },
    { src: playfairItalic, fontStyle: 'italic' },
  ],
});

async function generatePDFs() {
  try {
    console.log('Starting PDF generation...');
    // Create public/pdfs directory if it doesn't exist
    const pdfDir = path.join(process.cwd(), 'public', 'pdfs');
    if (!fs.existsSync(pdfDir)) {
      fs.mkdirSync(pdfDir, { recursive: true });
    }
    console.log('Ensured pdfDir exists:', pdfDir);

    // Generate PDF for each language
    for (const lang of Object.values(AVAILABLE_LANGUAGES)) {
      try {
        console.log(`Generating PDF for ${lang.code}...`);
        // Get data
        const profileData = getProfileData(lang);
        const summaryContent = getSummaryData(lang);
        const experienceEntries = getExperienceEntries(lang, true);
        console.log('Loaded data for', lang.code);

        // Create PDF
        const pdfStream = await renderToStream(
          PDFResume({
            profileData,
            summaryContent,
            experienceEntries,
            currentLang: lang
          })
        );
        console.log('Rendered PDF stream for', lang.code);

        // Convert stream to buffer
        const chunks: Buffer[] = [];
        for await (const chunk of pdfStream) {
          chunks.push(Buffer.from(chunk));
        }
        const pdfBuffer = Buffer.concat(chunks);
        console.log('Buffered PDF for', lang.code);

        // Save to file
        const filename = `resume-${lang.code}-${new Date().toISOString().split('T')[0]}.pdf`;
        const filepath = path.join(pdfDir, filename);
        fs.writeFileSync(filepath, pdfBuffer);
        console.log(`Generated ${filename}`);
      } catch (error) {
        console.error(`Error generating PDF for ${lang.code}:`, error);
        try { console.error('Error (string):', String(error)); } catch {}
        try { console.error('Error (json):', JSON.stringify(error)); } catch {}
      }
    }
    console.log('PDF generation complete.');
  } catch (err) {
    console.error('Fatal error in generatePDFs:', err);
    try { console.error('Fatal error (string):', String(err)); } catch {}
    try { console.error('Fatal error (json):', JSON.stringify(err)); } catch {}
  }
}

generatePDFs().catch((err) => {
  console.error('Unhandled error in generatePDFs:', err);
  try { console.error('Unhandled error (string):', String(err)); } catch {}
  try { console.error('Unhandled error (json):', JSON.stringify(err)); } catch {}
}); 