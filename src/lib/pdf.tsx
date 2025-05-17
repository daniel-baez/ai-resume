import React from 'react';
import { PDFResume } from '@/components/PDFResume';
import { renderToStream } from '@react-pdf/renderer';
import { getLanguageByCode, Language } from '@/constants/i18n';
import { getProfileData, getSummaryData, getExperienceEntries } from './data';
import { get } from 'http';

export async function generatePDFBuffer(language_code: string): Promise<Buffer> {
  const language = getLanguageByCode(language_code);
  if (!language) {
    throw new Error(`Language code "${language_code}" is not supported.`);
  }

  // Get data
  const profileData = getProfileData(language);
  const summaryContent = getSummaryData(language);
  const experienceEntries = getExperienceEntries(language, true);

  // Create PDF with explicit React.createElement
  const pdfStream = await renderToStream(
    React.createElement(PDFResume, {
      profileData,
      summaryContent,
      experienceEntries,
      currentLang: language
    })
  );

  // Convert stream to Buffer
  const chunks: Buffer[] = [];
  for await (const chunk of pdfStream) {
    chunks.push(Buffer.from(chunk));
  }
  return Buffer.concat(chunks);
}
