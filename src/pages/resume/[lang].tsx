// src/pages/resume/[lang].tsx
import { GetStaticProps, GetStaticPaths } from 'next';
import { renderToBuffer } from '@react-pdf/renderer';
import { PDFResume } from '@/components/PDFResume';
import { getProfileData, getSummaryData, getExperienceEntries } from "@/lib/data";
import { AVAILABLE_LANGUAGES } from "@/constants/i18n";
import fs from 'fs';
import path from 'path';

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: Object.values(AVAILABLE_LANGUAGES).map((lang) => ({
      params: { lang: lang.code },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { lang } = params as { lang: string };
  const language = AVAILABLE_LANGUAGES[lang as keyof typeof AVAILABLE_LANGUAGES] || AVAILABLE_LANGUAGES['en'];

  try {
    // Get data
    const profileData = getProfileData(language);
    const summaryContent = getSummaryData(language);
    const experienceEntries = getExperienceEntries(language, true);

    // Create PDF
    const pdfBuffer = await renderToBuffer(
      PDFResume({
        profileData,
        summaryContent,
        experienceEntries,
        currentLang: language
      })
    );

    // Ensure the public/pdfs directory exists
    const pdfDir = path.join(process.cwd(), 'public', 'pdfs');
    if (!fs.existsSync(pdfDir)) {
      fs.mkdirSync(pdfDir, { recursive: true });
    }

    // Write PDF to public directory
    const pdfPath = path.join(pdfDir, `resume-${language.code}.pdf`);
    fs.writeFileSync(pdfPath, pdfBuffer);

    // Return minimal props as we're generating a static file
    return {
      props: {
        pdfFileName: `daniel-baez-resume-${language.code}.pdf`,
        languageCode: language.code
      },
    };
  } catch (error) {
    console.error('PDF generation error:', error);
    return { notFound: true };
  }
};

const ResumePage = ({ pdfFileName, languageCode }: { pdfFileName: string, languageCode: string }) => {
  // Client-side redirect to the generated PDF
  if (typeof window !== 'undefined') {
    window.location.href = `/pdfs/${pdfFileName}`;
    return null;
  }

  // Return minimal markup for SEO
  return (
    <div>
      <p>Redirecting to resume in {languageCode}...</p>
      <a href={`/pdfs/${pdfFileName}`}>Click here if not redirected</a>
    </div>
  );
};

export default ResumePage;