// src/pages/resume/[lang].tsx
import fs from 'fs';
import path from 'path';
import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { lang } = context.params as { lang: string };
  const language = lang || 'en'; // Default to English if no language is provided

  console.log(`Generating PDF for language: ${language}`);

  // Vérifier si le PDF statique existe
  const staticPath = path.join(process.cwd(), 'public', 'pdfs', `resume-${language}.pdf`);
  if (fs.existsSync(staticPath)) {
    const pdfBuffer = fs.readFileSync(staticPath);
    context.res.setHeader('Content-Type', 'application/pdf');
    context.res.setHeader('Content-Disposition', `inline; filename="resume-daniel-baez-${language}.pdf"`);
    context.res.end(pdfBuffer);
    return { props: {} };
  }

  // If static PDF doesn't exist, return 404
  return {
    notFound: true
  };
};

const ResumePage = () => null; // This page doesn't render anything on the client

export default ResumePage;