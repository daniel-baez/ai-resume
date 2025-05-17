import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');

// Import the compiled libraries to avoid ESM vs CJS issues
const ReactPDF = require('@react-pdf/renderer');

// We can't directly import the constants, so manually define the languages
const LANGUAGES = {
  en: { code: 'en', name: 'English' },
  es: { code: 'es', name: 'Spanish' },
  fr: { code: 'fr', name: 'French' },
  de: { code: 'de', name: 'German' }
};

/**
 * Standalone function to generate PDFs without relying on Next.js imports
 */
async function generatePDFs() {
  console.log('🔄 Generating PDF resumes during build...');
  
  // Ensure the pdfs directory exists
  const pdfDir = path.join(rootDir, 'public/pdfs');
  if (!fs.existsSync(pdfDir)) {
    fs.mkdirSync(pdfDir, { recursive: true });
  }

  try {
    // Create a simple PDF for each language
    for (const langCode of Object.keys(LANGUAGES)) {
      const language = LANGUAGES[langCode];
      console.log(`📄 Generating PDF for language: ${language.name}`);
      
      // Create a temporary PDF document with minimal content
      const { Document, Page, Text, View, StyleSheet } = ReactPDF;
      
      const styles = StyleSheet.create({
        page: {
          flexDirection: 'column',
          backgroundColor: '#fff',
          padding: 30,
        },
        section: {
          margin: 10,
          padding: 10,
        },
        heading: {
          fontSize: 24,
          marginBottom: 10,
        },
        text: {
          fontSize: 12,
          marginBottom: 5,
        },
      });
      
      // Simple document with basic information
      const MyDocument = () => (
        <Document>
          <Page size="A4" style={styles.page}>
            <View style={styles.section}>
              <Text style={styles.heading}>Daniel Baez - Resume</Text>
              <Text style={styles.text}>Language: {language.name}</Text>
              <Text style={styles.text}>Generated on: {new Date().toLocaleDateString()}</Text>
              <Text style={styles.text}>
                Note: This is a placeholder PDF. Please visit the website to see the full interactive resume.
              </Text>
            </View>
          </Page>
        </Document>
      );

      // Save the PDF file to public directory
      const fileName = `resume-daniel-baez-${language.code}.pdf`;
      const filePath = path.join(pdfDir, fileName);
      
      const pdfStream = await ReactPDF.renderToStream(<MyDocument />);
      
      // Convert stream to Buffer
      const chunks = [];
      for await (const chunk of pdfStream) {
        chunks.push(Buffer.from(chunk));
      }
      const pdfBuffer = Buffer.concat(chunks);
      
      // Write to file
      fs.writeFileSync(filePath, pdfBuffer);

      console.log(`✅ Generated ${fileName}`);
    }
    
    console.log('✅ All PDFs generated successfully');
    return true;
  } catch (error) {
    console.error('❌ Error generating PDFs:', error);
    console.error(error.stack);
    // Don't fail the build
    return false;
  }
}

// Execute the function if this script is run directly
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  generatePDFs().catch(console.error);
}

export { generatePDFs }; 