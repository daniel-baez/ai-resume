import { NextRequest } from 'next/server';
import { renderToStream } from '@react-pdf/renderer';
import { PDFResume } from '@/components/PDFResume';
import { getProfileData, getSummaryData, getExperienceEntries} from "@/lib/data";
import { AVAILABLE_LANGUAGES } from "@/constants/i18n";

export async function GET(request: NextRequest) {
  try {
    // Get language from query params
    const { searchParams } = new URL(request.url);
    const langCode = searchParams.get('lang') || 'en';
    const lang = AVAILABLE_LANGUAGES[langCode as keyof typeof AVAILABLE_LANGUAGES];

    // Get data
    const profileData = getProfileData(lang);
    const summaryContent = getSummaryData(lang);
    const experienceEntries = getExperienceEntries(lang, true);
    // Create PDF
    const pdfStream = await renderToStream(
      PDFResume({
        profileData,
        summaryContent,
        experienceEntries,
        currentLang: lang
      })
    );

    // Convert stream to Uint8Array
    const chunks: Buffer[] = [];
    for await (const chunk of pdfStream) {
      chunks.push(Buffer.from(chunk));
    }
    const pdfBuffer = Buffer.concat(chunks);

    // Return the PDF
    return new Response(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `inline; filename="resume-${lang.code}.pdf"`,
      },
    });
  } catch (error) {
    console.error('PDF generation error:', error);
    return new Response('Error generating PDF', { status: 500 });
  }
} 