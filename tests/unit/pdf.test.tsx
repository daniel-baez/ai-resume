import React from 'react';
import { generatePDFBuffer } from '@/lib/pdf';
import { AVAILABLE_LANGUAGES, getLanguageByCode } from '@/constants/i18n';
import { getProfileData, getSummaryData, getExperienceEntries } from '@/lib/data';
import { PDFResume } from '@/components/PDFResume';
import { pdf } from '@react-pdf/renderer';

// Mock dependencies
jest.mock('@/constants/i18n', () => ({
  AVAILABLE_LANGUAGES: { en: 'English', es: 'Spanish' },
  getLanguageByCode: jest.fn()
}));

jest.mock('@/lib/data', () => ({
  getProfileData: jest.fn(),
  getSummaryData: jest.fn(),
  getExperienceEntries: jest.fn()
}));

jest.mock('@/components/PDFResume', () => ({
  PDFResume: jest.fn()
}));

describe('PDF Generation', () => {
  const mockProfileData = {
    info: {
      location: 'Test Location'
    },
    education: [],
    certifications: {},
    languages: [],
    skills: {}
  };
  const mockSummaryContent = 'Test summary';
  const mockExperienceEntries = [
    {
      title: 'Test Job',
      company: 'Test Company',
      period: '2020-2023',
      location: 'Test Location',
      content: 'Test content',
      order: 1,
      pdf: true
    }
  ];

  beforeEach(() => {
    // Reset all mocks
    jest.clearAllMocks();
    
    // Setup mock implementations
    (getLanguageByCode as jest.Mock).mockImplementation((code) => 
      code === 'invalid-lang' ? null : code
    );
    (getProfileData as jest.Mock).mockReturnValue(mockProfileData);
    (getSummaryData as jest.Mock).mockReturnValue(mockSummaryContent);
    (getExperienceEntries as jest.Mock).mockReturnValue(mockExperienceEntries);
  });

  test('successfully generates PDF buffer', async () => {
    const mockArrayBuffer = new ArrayBuffer(1024);
    const mockBlob = {
      arrayBuffer: jest.fn().mockResolvedValue(mockArrayBuffer)
    };
    const mockPdf = {
      toBlob: jest.fn().mockResolvedValue(mockBlob)
    };
    (pdf as unknown as jest.Mock).mockReturnValue(mockPdf);

    const result = await generatePDFBuffer('en');

    // Verify data fetching
    expect(getLanguageByCode).toHaveBeenCalledWith('en');
    expect(getProfileData).toHaveBeenCalledWith('en');
    expect(getSummaryData).toHaveBeenCalledWith('en');
    expect(getExperienceEntries).toHaveBeenCalledWith('en', true);

    // Verify PDF component rendering
    expect(PDFResume).toHaveBeenCalledWith(
      {
        profileData: mockProfileData,
        summaryContent: mockSummaryContent,
        experienceEntries: mockExperienceEntries,
        currentLang: 'en'
      },
      {}
    );

    // Verify PDF generation
    expect(pdf).toHaveBeenCalled();
    expect(mockPdf.toBlob).toHaveBeenCalled();
    expect(mockBlob.arrayBuffer).toHaveBeenCalled();

    // Verify buffer creation
    expect(Buffer.isBuffer(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
  });

  test('throws error for invalid language code', async () => {
    await expect(generatePDFBuffer('invalid-lang')).rejects.toThrow(
      'Language code "invalid-lang" is not supported.'
    );
  });

  test('handles PDF generation errors', async () => {
    const mockError = new Error('PDF generation failed');
    (pdf as unknown as jest.Mock).mockImplementation(() => {
      throw mockError;
    });

    await expect(generatePDFBuffer('en')).rejects.toThrow('PDF generation failed');
  });
});
