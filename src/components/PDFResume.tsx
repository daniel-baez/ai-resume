import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font, Link } from '@react-pdf/renderer';
import { getTranslations } from "@/constants/translations";
import { Language } from "@/constants/i18n";
import { ProfileData, ExperienceEntry, EducationEntry, Skill } from '@/types/portfolio';
import path from 'path';

// Register fonts
Font.register({
  family: 'Roboto',
  fonts: [
    { src: path.join(process.cwd(), 'public/fonts/Roboto-Regular.ttf') },
    { src: path.join(process.cwd(), 'public/fonts/Roboto-Bold.ttf'), fontWeight: 700 },
    { src: path.join(process.cwd(), 'public/fonts/Roboto-Italic.ttf'), fontStyle: 'italic' },
  ],
});

Font.register({
  family: 'Playfair Display',
  fonts: [
    { src: path.join(process.cwd(), 'public/fonts/PlayfairDisplay-Regular.ttf') },
    { src: path.join(process.cwd(), 'public/fonts/PlayfairDisplay-Bold.ttf'), fontWeight: 700 },
    { src: path.join(process.cwd(), 'public/fonts/PlayfairDisplay-Italic.ttf'), fontStyle: 'italic' },
  ],
});

// Define a refined color scheme
const colors = {
  primary: '#1a2a3a',
  secondary: '#2c3e50',
  accent: '#3498db',
  background: '#f8f9fa',
  text: '#2c3e50',
  lightText: '#6c757d',
  border: '#dee2e6',
};
// Define font sizes for consistent typography
const fontSizes = {
  xxl: 28, // Used for name
  xl: 16,  // Used for section titles
  lg: 14,  // Used for job titles
  md: 12,  // Used for location
  sm: 10,  // Used for body text and links
};

const styles = StyleSheet.create({
  page: {
    padding: '30 50',
    fontFamily: 'Roboto',
    fontSize: fontSizes.sm,
    lineHeight: 1.5,
    minHeight: '100%',
    backgroundColor: colors.background,
    color: colors.text,
  },
  headerSection: {
    marginBottom: 20,
    backgroundColor: colors.primary,
    padding: 20,
    color: 'white',
  },
  name: {
    fontFamily: 'Playfair Display',
    fontSize: fontSizes.xxl,
    fontWeight: 700,
    marginBottom: 10,
    paddingBottom: 10,
    color: 'white',
  },
  title: {
    fontSize: fontSizes.lg,
    marginBottom: 4,
    color: 'white',
  },
  location: {
    fontSize: fontSizes.md,
    marginBottom: 4,
    color: colors.background,
  },
  links: {
    fontSize: fontSizes.sm,
    marginTop: 10,
    color: colors.background,
  },
  linkText: {
    color: colors.accent,
    textDecoration: 'underline',
  },
  sectionTitle: {
    fontFamily: 'Playfair Display',
    fontSize: fontSizes.lg,
    marginTop: 15,
    marginBottom: 10,
    color: colors.primary,
    borderBottom: `1 solid ${colors.border}`,
    paddingBottom: 3,
  },
  paragraph: {
    fontSize: fontSizes.sm,
    marginBottom: 10,
    lineHeight: 1.6,
    textAlign: 'justify',
  },
  summaryParagraph: {
    fontSize: fontSizes.sm,
    fontStyle: 'italic',
    marginBottom: 8,
    lineHeight: 1.6,
    textAlign: 'justify',
    color: colors.secondary,
  },
  experienceEntry: {
    marginBottom: 15,
  },
  jobTitle: {
    fontSize: fontSizes.lg,
    fontWeight: 700,
    marginBottom: 2,
    color: colors.primary,
  },
  jobDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: fontSizes.sm,
    fontStyle: 'italic',
    color: colors.lightText,
    marginBottom: 6,
  },
  jobDescription: {
    fontSize: fontSizes.sm,
    lineHeight: 1.6,
    textAlign: 'justify',
    marginBottom: 8,
  },
  heading2: {
    fontSize: fontSizes.md,
    fontWeight: 700,
    marginTop: 12,
    marginBottom: 6,
    color: colors.primary,
  },
  heading3: {
    fontSize: fontSizes.sm,
    fontWeight: 700,
    marginTop: 8,
    marginBottom: 4,
    color: colors.secondary,
  },
  listContainer: {
    marginLeft: 15,
    marginBottom: 8,
    marginTop: 4,
  },
  listItem: {
    fontSize: fontSizes.sm,
    marginBottom: 3,
    lineHeight: 1.6,
    flexDirection: 'row',
  },
  bullet: {
    width: 15,
    fontSize: fontSizes.sm,
  },
  listItemContent: {
    flex: 1,
    fontSize: fontSizes.sm,
    lineHeight: 1.6,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 6,
  },
  badge: {
    padding: '4 10',
    borderRadius: 12,
    fontSize: fontSizes.sm,
    backgroundColor: colors.accent,
    color: 'white',
  },
  educationEntry: {
    marginBottom: 15,
  },
  educationTitle: {
    fontSize: fontSizes.md,
    fontWeight: 700,
    marginBottom: 2,
    color: colors.primary,
  },
  educationDetails: {
    fontSize: fontSizes.sm,
    fontStyle: 'italic',
    color: colors.lightText,
  },
  footer: {
    marginTop: 30,
    textAlign: 'center',
    fontSize: fontSizes.sm,
    color: colors.lightText,
    paddingBottom: 20,
  },
  languagesContainer: {
    marginBottom: 15,
  },
  languageItem: {
    fontSize: fontSizes.sm,
    marginBottom: 4,
    color: colors.text,
  },
  certificationEntry: {
    marginBottom: 10,
  },
  certificationTitle: {
    fontSize: fontSizes.sm,
    fontWeight: 700,
    marginBottom: 2,
    color: colors.primary,
  },
  certificationDetails: {
    fontSize: fontSizes.sm,
    color: colors.lightText,
  },
});

// Parse and render markdown content manually to avoid ReactMarkdown's text node issues
const MarkdownContent = ({ content }: { content: string }) => {
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let currentList: string[] = [];
  let key = 0;

  // Process inline markdown (bold, links) within text
  const processInlineMarkdown = (text: string): React.ReactNode[] => {
    const parts: React.ReactNode[] = [];
    let inlineKey = 0;

    // Process links first: [text](url)
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    let linkMatch;
    let lastLinkIndex = 0;

    while ((linkMatch = linkRegex.exec(text)) !== null) {
      // Add text before link
      if (linkMatch.index > lastLinkIndex) {
        const beforeLink = text.substring(lastLinkIndex, linkMatch.index);
        parts.push(...processBoldText(beforeLink, inlineKey));
        inlineKey += 100;
      }
      // Add link
      parts.push(
        <Link key={`link-${inlineKey++}`} src={linkMatch[2]} style={styles.linkText}>
          {linkMatch[1]}
        </Link>
      );
      lastLinkIndex = linkMatch.index + linkMatch[0].length;
    }

    // Process remaining text for bold
    if (lastLinkIndex < text.length) {
      const afterLinks = text.substring(lastLinkIndex);
      parts.push(...processBoldText(afterLinks, inlineKey));
    }

    return parts.length > 0 ? parts : [text];
  };

  // Process bold text: **text**
  const processBoldText = (text: string, baseKey: number): React.ReactNode[] => {
    const parts: React.ReactNode[] = [];
    const boldRegex = /\*\*([^*]+)\*\*/g;
    let lastIndex = 0;
    let match;
    let localKey = baseKey;

    while ((match = boldRegex.exec(text)) !== null) {
      // Add text before bold
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index));
      }
      // Add bold text
      parts.push(
        <Text key={`bold-${localKey++}`} style={{ fontWeight: 700 }}>
          {match[1]}
        </Text>
      );
      lastIndex = match.index + match[0].length;
    }

    // Add remaining text
    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }

    return parts.length > 0 ? parts : [text];
  };

  const flushList = () => {
    if (currentList.length > 0) {
      elements.push(
        <View key={`list-${key++}`} style={styles.listContainer}>
          {currentList.map((item, idx) => (
            <View key={`li-${key}-${idx}`} style={styles.listItem}>
              <Text style={styles.bullet}>• </Text>
              <Text style={styles.listItemContent}>
                {processInlineMarkdown(item)}
              </Text>
            </View>
          ))}
        </View>
      );
      currentList = [];
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Skip empty lines
    if (!line) {
      flushList();
      continue;
    }

    // Handle H2 headers
    if (line.startsWith('## ')) {
      flushList();
      elements.push(
        <Text key={`h2-${key++}`} style={styles.heading2}>
          {line.substring(3)}
        </Text>
      );
      continue;
    }

    // Handle H3 headers
    if (line.startsWith('### ')) {
      flushList();
      elements.push(
        <Text key={`h3-${key++}`} style={styles.heading3}>
          {line.substring(4)}
        </Text>
      );
      continue;
    }

    // Handle list items
    if (line.startsWith('- ')) {
      currentList.push(line.substring(2));
      continue;
    }

    // Handle regular paragraphs
    flushList();
    elements.push(
      <Text key={`p-${key++}`} style={styles.jobDescription}>
        {processInlineMarkdown(line)}
      </Text>
    );
  }

  // Flush any remaining list items
  flushList();

  return <>{elements}</>;
};

export const PDFResume = ({ 
  profileData, 
  summaryContent, 
  experienceEntries,
  currentLang,
}: {
  profileData: ProfileData;
  summaryContent: string;
  experienceEntries: ExperienceEntry[];
  currentLang: Language;
}) => {
  const t = getTranslations(currentLang);
  
  const socialLinks = {
    linkedin: "https://linkedin.com/in/baezdaniel",
    github: "https://github.com/danielbaez",
    website: "https://baezdaniel.cl"
  };

  return (
    <Document>
      <Page size={[595.276, 'auto']} style={styles.page}>
        <View style={styles.headerSection}>
          <Text style={styles.name}>Daniel Baez</Text>
          <Text style={styles.title}>{profileData.info.title} | {profileData.info.subtitle}</Text>
          <Text style={styles.location}>{profileData.info.location}</Text>
          <View style={styles.links}>
            <Text>
              <Link src={socialLinks.linkedin} style={styles.linkText}>{socialLinks.linkedin}</Link> | {' '}
              <Link src={socialLinks.github} style={styles.linkText}>{socialLinks.github}</Link> | {' '}
              <Link src={socialLinks.website} style={styles.linkText}>{socialLinks.website}</Link>
            </Text>
          </View>
        </View>
        <View>
          <Text style={styles.sectionTitle}>{t.pdf.sections.summary}</Text>
          <Text style={styles.summaryParagraph}>{summaryContent}</Text>
        </View>

        <View>
          <Text style={styles.sectionTitle}>{t.pdf.sections.experience}</Text>
          {experienceEntries.map((exp: ExperienceEntry, index: number) => (
            <View key={index} style={styles.experienceEntry}>
              <Text style={styles.jobTitle}>{exp.title} at {exp.company}</Text>
              <View style={styles.jobDetails}>
                <Text>{exp.location}</Text>
                <Text>{exp.period}</Text>
              </View>
              <MarkdownContent content={exp.content} />
            </View>
          ))}
        </View>
        <View>
          <Text style={styles.sectionTitle}>{t.pdf.sections.education}</Text>
          {profileData.education.map((edu: EducationEntry, index: number) => (
            <View key={index} style={styles.educationEntry}>
              <Text style={styles.educationTitle}>{edu.title}</Text>
              <Text style={styles.educationDetails}>{edu.institution} | {edu.period}</Text>
            </View>
          ))}
        </View>

        <View>
          <Text style={styles.sectionTitle}>{t.sections.certifications}</Text>
          {Object.entries(profileData.certifications).map(([name, details], index) => (
            <View key={index} style={styles.certificationEntry}>
              <Text style={styles.certificationTitle}>{name}</Text>
              <Text style={styles.certificationDetails}>{details.issuer} &nbsp;|&nbsp; {details.period}</Text>
            </View>
          ))}
        </View>

        <View>
          <Text style={styles.sectionTitle}>{t.sections.languages}</Text>
          <View style={styles.languagesContainer}>
            {profileData.languages.map((language, index) => (
              <Text key={index} style={styles.languageItem}>
                {language.name}: {language.level} {language.certifications?.map((certification) => (
                  <>
                    &nbsp;|&nbsp;
                    <Link src={certification.url} style={styles.languageItem}>{certification.name}</Link>
                  </>
                ))}
              </Text>
            ))}
          </View>
        </View>

        <View>
          <Text style={styles.sectionTitle}>{t.sections.softSkills}</Text>
          <View style={styles.languagesContainer}>
            {profileData.softSkills.map((softSkill, index) => (
              <Text key={index} style={styles.languageItem}>
                {softSkill.name}: &nbsp;
                <Link src={softSkill.url} style={styles.languageItem}>{softSkill.year}</Link>
              </Text>
            ))}
          </View>
        </View>

        <View>
          <Text style={styles.sectionTitle}>{t.pdf.sections.technicalSkills}</Text>
          {Object.entries(profileData.skills).map(([category, skills]: [string, Skill[]], index: number) => (
            <View key={index} style={{ marginBottom: 15 }}>
              <Text style={{ fontSize: 12, fontWeight: 700, marginBottom: 6, color: colors.secondary }}>
                {category}
              </Text>
              <View style={styles.skillsContainer}>
                {skills.map((skill: Skill, idx: number) => (
                  <Text key={idx} style={styles.badge}>
                    {skill.name}
                  </Text>
                ))}
              </View>
            </View>
          ))}
        </View>
        <Text style={styles.footer}>Daniel Baez | Software Engineer | {profileData.info.location}</Text>
      </Page>
    </Document>
  );
};

