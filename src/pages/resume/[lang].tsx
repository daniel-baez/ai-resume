// src/pages/resume/[lang].tsx
import { GetServerSideProps } from 'next';
import fs from 'fs';
import path from 'path';
import { AVAILABLE_LANGUAGES } from "@/constants/i18n";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { lang } = context.params as { lang: string };
  const language = AVAILABLE_LANGUAGES[lang as keyof typeof AVAILABLE_LANGUAGES] || AVAILABLE_LANGUAGES['en'];

  try {
    // Find the most recent PDF for this language
    const pdfDir = path.join(process.cwd(), 'public', 'pdfs');
    const files = fs.readdirSync(pdfDir);
    const pdfFile = files
      .filter(file => file.startsWith(`resume-${language.code}-`))
      .sort()
      .pop();

    if (!pdfFile) {
      return { notFound: true };
    }

    // Read the PDF file
    const pdfPath = path.join(pdfDir, pdfFile);
    const pdfBuffer = fs.readFileSync(pdfPath);

    // Return the PDF as a response
    context.res.setHeader('Content-Type', 'application/pdf');
    context.res.setHeader('Content-Disposition', `inline; filename="${pdfFile}"`);
    context.res.end(pdfBuffer);

    return { props: {} };
  } catch (error) {
    console.error('PDF serving error:', error);
    return { notFound: true };
  }
};

// This page doesn't render anything on the client
export default function ResumePage() {
  return null;
}