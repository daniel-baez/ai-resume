import { Document, Page, Text, View, StyleSheet, Font, Link } from '@react-pdf/renderer';
import { getTranslations } from "@/constants/translations";
import { Language } from "@/constants/i18n";
import { ProfileData, ExperienceEntry, EducationEntry, Skill } from '@/types/portfolio';
import path from 'path';
import ReactMarkdown from 'react-markdown';

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

const styles = StyleSheet.create({
  page: {
    padding: '30 50',
    fontFamily: 'Roboto',
    fontSize: 10,
    lineHeight: 1.5,
    backgroundColor: colors.background,
    color: colors.text,
  },
  headerSection: {
    marginBottom: 20,
    borderBottom: `2 solid ${colors.border}`,
    paddingBottom: 15,
  },
  name: {
    fontFamily: 'Playfair Display',
    fontSize: 32,
    fontWeight: 700,
    marginBottom: 15,
    paddingBottom: 15,
    color: colors.primary,
  },
  title: {
    fontSize: 14,
    marginBottom: 4,
    color: colors.secondary,
  },
  location: {
    fontSize: 12,
    marginBottom: 4,
    color: colors.lightText,
  },
  links: {
    fontSize: 10,
    marginTop: 10,
    color: colors.lightText,
  },
  linkText: {
    color: colors.accent,
    textDecoration: 'none',
  },
  sectionTitle: {
    fontFamily: 'Playfair Display',
    fontSize: 16,
    marginTop: 15,
    marginBottom: 10,
    color: colors.primary,
    borderBottom: `1 solid ${colors.border}`,
    paddingBottom: 3,
  },
  paragraph: {
    fontSize: 10,
    marginBottom: 10,
    lineHeight: 1.6,
    textAlign: 'justify',
  },
  summaryParagraph: {
    fontSize: 11,
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
    fontSize: 12,
    fontWeight: 700,
    marginBottom: 2,
    color: colors.primary,
  },
  jobDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 10,
    fontStyle: 'italic',
    color: colors.lightText,
    marginBottom: 6,
  },
  jobDescription: {
    fontSize: 10,
    lineHeight: 1.6,
    textAlign: 'justify',
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
    fontSize: 9,
    backgroundColor: colors.accent,
    color: 'white',
  },
  educationEntry: {
    marginBottom: 15,
  },
  educationTitle: {
    fontSize: 12,
    fontWeight: 700,
    marginBottom: 2,
    color: colors.primary,
  },
  educationDetails: {
    fontSize: 10,
    fontStyle: 'italic',
    color: colors.lightText,
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 50,
    right: 50,
    textAlign: 'center',
    fontSize: 8,
    color: colors.lightText,
  },
  languagesContainer: {
    marginBottom: 15,
  },
  languageItem: {
    fontSize: 10,
    marginBottom: 4,
    color: colors.text,
  },
});

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
      <Page size="LETTER" style={styles.page}>
        <View style={styles.headerSection}>
          <Text style={styles.name}>Daniel Baez</Text>
          <Text style={styles.title}>{t.pdf.title} | {t.pdf.subtitle}</Text>
          <Text style={styles.location}>{profileData.info.location}</Text>
          <View style={styles.links}>
            <Text>
              <Link src={socialLinks.linkedin} style={styles.linkText}>{socialLinks.linkedin}</Link> |{' '}
              <Link src={socialLinks.github} style={styles.linkText}>{socialLinks.github}</Link> |{' '}
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
              <ReactMarkdown
                components={{
                  a: ({href, children}) => (
                    <Link src={href} style={styles.linkText}>{children}</Link>
                  ),
                  p: ({children}) => (
                    <Text style={styles.jobDescription}>{children}</Text>
                  ),
                }}
              >
                {exp.content}
              </ReactMarkdown>
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
          <Text style={styles.sectionTitle}>{t.sections.languages}</Text>
          <View style={styles.languagesContainer}>
            {profileData.languages.map((language, index) => (
              <Text key={index} style={styles.languageItem}>
                {language.name}: {language.level}
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

