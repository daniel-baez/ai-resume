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
    backgroundColor: colors.background,
    color: colors.text,
  },
  container: {
    flex: 1,
    // Continuous scroll document has no page breaks
  },
  headerSection: {
    marginBottom: 20,
    backgroundColor: colors.primary,
    padding: 20,
    color: 'white',
    borderRadius: 8, // Rounded corners for more modern look
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
    color: colors.background,
    textDecoration: 'none',
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
    paddingTop: 10,
    borderTop: `1 solid ${colors.border}`,
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
  // New section divider for continuous document
  sectionDivider: {
    marginTop: 30,
    marginBottom: 30,
    borderBottom: `1 dashed ${colors.border}`,
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
      {/* Use a custom page with auto-height */}
      <Page size={[595.28, 'auto']} style={styles.page} wrap={false}>
        <View style={styles.container}>
          {/* Header Section */}
          <View style={styles.headerSection}>
            <Text style={styles.name}>Daniel Baez</Text>
            <Text style={styles.title}>{t.pdf.title} | {t.pdf.subtitle}</Text>
            <Text style={styles.location}>{profileData.info.location}</Text>
            <View style={styles.links}>
              <Text>
                <Link src={socialLinks.linkedin} style={styles.linkText}>{socialLinks.linkedin}</Link>
                <Text> | </Text>
                <Link src={socialLinks.github} style={styles.linkText}>{socialLinks.github}</Link>
                <Text> | </Text>
                <Link src={socialLinks.website} style={styles.linkText}>{socialLinks.website}</Link>
              </Text>
            </View>
          </View>

          {/* Summary Section */}
          <View>
            <Text style={styles.sectionTitle}>{t.pdf.sections.summary}</Text>
            <Text style={styles.summaryParagraph}>{summaryContent}</Text>
          </View>

          {/* Experience Section */}
          <View>
            <Text style={styles.sectionTitle}>{t.pdf.sections.experience}</Text>
            {experienceEntries.map((exp: ExperienceEntry, index: number) => (
              <View key={index} style={styles.experienceEntry}>
                <Text style={styles.jobTitle}>{exp.title} at {exp.company}</Text>
                <View style={styles.jobDetails}>
                  <Text>{exp.location}</Text>
                  <Text>{exp.period}</Text>
                </View>
                <Text style={styles.jobDescription}>
                  {/* Convert markdown to plain text */}
                  {exp.content.replace(/\*\*(.*?)\*\*/g, '$1').replace(/\n/g, ' ')}
                </Text>
              </View>
            ))}
          </View>

          {/* Education Section */}
          <View>
            <Text style={styles.sectionTitle}>{t.pdf.sections.education}</Text>
            {profileData.education.map((edu: EducationEntry, index: number) => (
              <View key={index} style={styles.educationEntry}>
                <Text style={styles.educationTitle}>{edu.title}</Text>
                <Text style={styles.educationDetails}>{edu.institution} | {edu.period}</Text>
              </View>
            ))}
          </View>

          {/* Certifications Section */}
          <View>
            <Text style={styles.sectionTitle}>{t.sections.certifications}</Text>
            {Object.entries(profileData.certifications).map(([name, details], index) => (
              <View key={index} style={styles.certificationEntry}>
                <Text style={styles.certificationTitle}>{name}</Text>
                <Text style={styles.certificationDetails}>{details.issuer}</Text>
              </View>
            ))}
          </View>

          {/* Languages Section */}
          <View>
            <Text style={styles.sectionTitle}>{t.sections.languages}</Text>
            <View style={styles.languagesContainer}>
              {profileData.languages.map((language, index) => (
                <Text key={index} style={styles.languageItem}>
                  {language.name}: {language.level} {language.certification && (
                    <>
                      &nbsp;|&nbsp;
                      <Link src={language.certification.url} style={styles.languageItem}>{language.certification.name}</Link>
                    </>
                  )}
                </Text>
              ))}
            </View>
          </View>

          {/* Technical Skills Section */}
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

          {/* Footer - now a regular element at end of document instead of absolute positioning */}
          <View style={styles.footer}>
            <Text>Daniel Baez | Software Engineer | {profileData.info.location}</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

