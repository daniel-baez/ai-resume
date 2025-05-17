import { GetStaticProps, GetStaticPaths } from 'next';
import { renderToStream } from '@react-pdf/renderer';
import { PDFResume } from '@/components/PDFResume';
import { getProfileData, getSummaryData, getExperienceEntries } from "@/lib/data";
import { AVAILABLE_LANGUAGES } from "@/constants/i18n";
import { remark } from 'remark';
import strip from 'strip-markdown';

// This page pre-renders the PDFs at build time and stores them in Vercel's CDN
export const getStaticPaths: GetStaticPaths = async () => {
  const paths = Object.keys(AVAILABLE_LANGUAGES).map((lang) => ({
    params: { lang },
  }));

  return {
    paths,
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

    // Process markdown to plain text
    const processedExperiences = await Promise.all(
      experienceEntries.map(async (exp) => {
        const plainText = await remark()
          .use(strip)
          .process(exp.content);
        
        return {
          ...exp,
          plainContent: String(plainText) // Use this in PDF instead of content
        };
      })
    );

    // Create PDF
    const pdfStream = await renderToStream(
      PDFResume({
        profileData,
        summaryContent,
        experienceEntries: processedExperiences,
        currentLang: language
      })
    );

    // Convert stream to Buffer
    const chunks: Buffer[] = [];
    for await (const chunk of pdfStream) {
      chunks.push(Buffer.from(chunk));
    }
    const pdfBuffer = Buffer.concat(chunks);

    // Return the PDF as base64 string (will be cached by Vercel)
    const pdfBase64 = pdfBuffer.toString('base64');

    // Get the current date for the filename
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed

    return {
      props: {
        pdfBase64,
        contentType: 'application/pdf',
        fileName: `resume-daniel-baez-${language.code}-${year}-${month}.pdf`,
      },
      // Revalidate every 24 hours (86400 seconds)
      revalidate: 86400,
    };
  } catch (error) {
    console.error('Error generating PDF:', error);
    return {
      notFound: true,
    };
  }
};

// This page component serves the PDF directly
export default function ResumePDF({ 
  pdfBase64, 
  contentType, 
  fileName 
}: { 
  pdfBase64: string; 
  contentType: string; 
  fileName: string; 
}) {
  // If this component renders on the client, send the PDF content
  if (typeof window === 'object') {
    // Convert base64 back to binary and create a Blob
    const binary = atob(pdfBase64);
    const array = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      array[i] = binary.charCodeAt(i);
    }
    const blob = new Blob([array], { type: contentType });
    const url = URL.createObjectURL(blob);
    
    // Download or display PDF
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Clean up the URL
    setTimeout(() => URL.revokeObjectURL(url), 100);
  }
  
  // Return empty div (actual rendering happens via PDF download)
  return null;
} 