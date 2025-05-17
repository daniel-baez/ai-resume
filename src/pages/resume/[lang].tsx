// src/pages/resume/[lang].tsx
import fs from 'fs';
import path from 'path';
import { GetServerSideProps } from 'next';
import { generatePDFBuffer } from '@/lib/pdf';
import { AVAILABLE_LANGUAGES } from "@/constants/i18n";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { lang } = context.params as { lang: string };
  // const language = AVAILABLE_LANGUAGES[lang as keyof typeof AVAILABLE_LANGUAGES] || AVAILABLE_LANGUAGES['en'];
  const language = lang || 'en'; // Default to English if no language is provided

  // Vérifier si le PDF statique existe
  const staticPath = path.join(process.cwd(), 'public', 'pdfs', `resume-${language}.pdf`);
  if (fs.existsSync(staticPath)) {
    const pdfBuffer = fs.readFileSync(staticPath);
    context.res.setHeader('Content-Type', 'application/pdf');
    context.res.setHeader('Content-Disposition', `inline; filename="resume-daniel-baez-${language}.pdf"`);
    context.res.end(pdfBuffer);
    return { props: {} };
  }

  try {
    const pdfBuffer = await generatePDFBuffer(language);

    // Return the PDF as a response
    context.res.setHeader('Content-Type', 'application/pdf');
    context.res.setHeader('Content-Disposition', `inline; filename="resume-daniel-baez-${language}.pdf"`);
    context.res.end(pdfBuffer);

    return { props: {} };
  } catch (error) {
    console.error('PDF generation error:', error);
    return { notFound: true };
  }
};

const ResumePage = () => null; // This page doesn't render anything on the client

export default ResumePage;