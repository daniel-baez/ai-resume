import React from 'react';
import { PDFResume } from '@/components/PDFResume';
import { renderToStream, Document } from '@react-pdf/renderer';
import { getLanguageByCode } from '@/constants/i18n';
import { getProfileData, getSummaryData, getExperienceEntries } from './data';

export async function generatePDFBuffer(language_code: string): Promise<Buffer> {
  const language = getLanguageByCode(language_code);
  if (!language) {
    throw new Error(`Language code "${language_code}" is not supported.`);
  }

  // Get data
  const profileData = getProfileData(language);
  const summaryContent = getSummaryData(language);
  const experienceEntries = getExperienceEntries(language, true);

  // Create PDF by wrapping PDFResume in a Document
  const pdfStream = await renderToStream(
    <Document>
      <PDFResume
        profileData={profileData}
        summaryContent={summaryContent}
        experienceEntries={experienceEntries}
        currentLang={language}
      />
    </Document>
  );

  // Convert stream to Buffer
  const chunks: Buffer[] = [];
  for await (const chunk of pdfStream) {
    chunks.push(Buffer.from(chunk));
  }
  return Buffer.concat(chunks);
}
