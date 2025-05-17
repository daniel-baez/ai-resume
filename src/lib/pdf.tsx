import React from 'react';
import { PDFResume } from '@/components/PDFResume';
import { pdf } from '@react-pdf/renderer';
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

  // Create PDF using the pdf utility
  try {
    const doc = (
      <PDFResume
        profileData={profileData}
        summaryContent={summaryContent}
        experienceEntries={experienceEntries}
        currentLang={language}
      />
    );

    const pdfBytes = await pdf(doc).toBlob();
    const arrayBuffer = await pdfBytes.arrayBuffer();
    return Buffer.from(arrayBuffer);
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
}
