// src/pages/resume/[lang].tsx
import { GetServerSideProps } from 'next';
import { renderToStream } from '@react-pdf/renderer';
import { PDFResume } from '@/components/PDFResume';
import { getProfileData, getSummaryData, getExperienceEntries } from "@/lib/data";
import { AVAILABLE_LANGUAGES } from "@/constants/i18n";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { lang } = context.params as { lang: string };
  const language = AVAILABLE_LANGUAGES[lang as keyof typeof AVAILABLE_LANGUAGES] || AVAILABLE_LANGUAGES['en'];

  try {
    // Get data
    const profileData = getProfileData(language);
    const summaryContent = getSummaryData(language);
    const experienceEntries = getExperienceEntries(language, true);

    // Create PDF
    const pdfStream = await renderToStream(
      PDFResume({
        profileData,
        summaryContent,
        experienceEntries,
        currentLang: language
      })
    );

    // Convert stream to Uint8Array
    const chunks: Buffer[] = [];
    for await (const chunk of pdfStream) {
      chunks.push(Buffer.from(chunk));
    }
    const pdfBuffer = Buffer.concat(chunks);

    // Return the PDF as a response
    context.res.setHeader('Content-Type', 'application/pdf');
    context.res.setHeader('Content-Disposition', `inline; filename="resume-daniel-baez-${language.code}-${new Date().toISOString().split('T')[0]}.pdf"`);
    context.res.end(pdfBuffer);

    return { props: {} };
  } catch (error) {
    console.error('PDF generation error:', error);
    return { notFound: true };
  }
};

const ResumePage = () => null; // This page doesn't render anything on the client

export default ResumePage;