// src/pages/resume/[lang].tsx
import { GetStaticProps, GetStaticPaths } from 'next';
import { renderToStream } from '@react-pdf/renderer';
import { PDFResume } from '@/components/PDFResume';
import { getProfileData, getSummaryData, getExperienceEntries } from "@/lib/data";
import { AVAILABLE_LANGUAGES } from "@/constants/i18n";
import fs from 'fs';
import path from 'path';

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = Object.keys(AVAILABLE_LANGUAGES).map((lang) => ({
    params: { lang },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
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

    // Ensure the static directory exists
    const staticDir = path.join(process.cwd(), '.next/static/pdfs');
    if (!fs.existsSync(staticDir)) {
      fs.mkdirSync(staticDir, { recursive: true });
    }

    // Save the PDF file
    const fileName = `resume-daniel-baez-${language.code}.pdf`;
    const filePath = path.join(staticDir, fileName);
    fs.writeFileSync(filePath, pdfBuffer);

    return {
      props: {
        pdfUrl: `/static/pdfs/${fileName}`,
      },
      // Revalidate every 24 hours
      revalidate: 86400,
    };
  } catch (error) {
    console.error('Error generating PDF:', error);
    return {
      notFound: true,
    };
  }
};

export default function ResumePDF({ pdfUrl }: { pdfUrl: string }) {
  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <iframe
        src={pdfUrl}
        style={{ width: '100%', height: '100%', border: 'none' }}
        title="Resume PDF"
      />
    </div>
  );
}