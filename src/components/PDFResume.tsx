import { Document, Page, Text, View, StyleSheet, Font, Link } from '@react-pdf/renderer';
import { getTranslations } from "@/constants/translations";
import { Language } from "@/constants/i18n";
import { ProfileData, ExperienceEntry, EducationEntry, Skill } from '@/types/portfolio';
import path from 'path';


// Register fonts
Font.register({
  family: 'Helvetica',
  fonts: [
    { src: path.join(process.cwd(), 'public/fonts/Helvetica.ttf') },
    { src: path.join(process.cwd(), 'public/fonts/Helvetica-Bold.ttf'), fontWeight: 700 },
    { src: path.join(process.cwd(), 'public/fonts/Helvetica-Oblique.ttf'), fontStyle: 'italic' },
  ],
});

// Define color pairs similar to your web version
const colorPairs = [
  ['#dbeafe', '#1e40af'], // blue
  ['#dcfce7', '#166534'], // green
  ['#f3e8ff', '#6b21a8'], // purple
  ['#e0e7ff', '#3730a3'], // indigo
  ['#fef9c3', '#854d0e'], // yellow
  ['#fee2e2', '#991b1b'], // red
  ['#fce7f3', '#9d174d'], // pink
  ['#ffedd5', '#9a3412'], // orange
  ['#ccfbf1', '#115e59'], // teal
  ['#cffafe', '#155e75'], // cyan
  ['#d1fae5', '#065f46'], // emerald
  ['#e0f2fe', '#075985'], // sky
  ['#ede9fe', '#5b21b6'], // violet
  ['#f1f5f9', '#334155'], // slate
];

let currentColorIndex = 0;
const getNextColor = () => {
  const color = colorPairs[currentColorIndex];
  currentColorIndex = (currentColorIndex + 1) % colorPairs.length;
  return color;
};

const styles = StyleSheet.create({
  page: {
    padding: '40 60',
    fontFamily: 'Helvetica',
    fontSize: 10,
    lineHeight: 1.4,
  },
  headerSection: {
    marginBottom: 20,
    textAlign: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: 700,
    color: '#1e3a8a', // dark blue
    marginBottom: 10,
  },
  title: {
    fontSize: 12,
    color: '#1f2937', // gray-800
    marginBottom: 4,
  },
  location: {
    fontSize: 10,
    color: '#4b5563', // gray-600
    marginBottom: 4,
  },
  links: {
    fontSize: 10,
    color: '#4b5563', // gray-600
  },
  linkText: {
    color: '#2563eb', // blue-600
    textDecoration: 'underline',
  },
  sectionTitle: {
    fontSize: 18,
    marginTop: 20,
    marginBottom: 10,
    color: '#1f2937', // gray-800
  },
  paragraph: {
    fontSize: 10,
    marginBottom: 8,
    lineHeight: 1.4,
    textAlign: 'justify',
    color: '#374151', // gray-700
  },
  summaryParagraph: {
    fontSize: 10,
    fontFamily: 'Helvetica',
    marginBottom: 8,
    lineHeight: 1.4,
    textAlign: 'justify',
    color: '#374151', // gray-700
    fontStyle: 'italic',
  },
  experienceEntry: {
    marginBottom: 15,
  },
  jobTitle: {
    fontSize: 12,
    fontWeight: 700,
    marginBottom: 2,
    color: '#1f2937', // gray-800
  },
  jobDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 10,
    fontStyle: 'italic',
    color: '#4b5563', // gray-600
    marginBottom: 4,
  },
  jobDescription: {
    fontSize: 10,
    lineHeight: 1.4,
    textAlign: 'justify',
    color: '#374151', // gray-700
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 6,
  },
  badge: {
    padding: '3 8',
    borderRadius: 4,
    fontSize: 10,
  },
  educationEntry: {
    marginBottom: 15,
  },
  educationTitle: {
    fontSize: 12,
    fontWeight: 700,
    marginBottom: 2,
    color: '#1f2937', // gray-800
  },
  educationDetails: {
    fontSize: 10,
    fontStyle: 'italic',
    color: '#4b5563', // gray-600
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
    linkedin: "https://linkedin.com/in/danielbaez",
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
              <Link src={socialLinks.linkedin} style={styles.linkText}>{socialLinks.linkedin}</Link> | {' '}
              <Link src={socialLinks.github} style={styles.linkText}>{socialLinks.github}</Link> | {' '}
              <Link src={socialLinks.website} style={styles.linkText}>{socialLinks.website}</Link>
            </Text>
          </View>
        </View>
        <View>
          <Text style={styles.sectionTitle}>{t.pdf.sections.summary}</Text>
          <Text style={[styles.summaryParagraph, { fontStyle: 'italic' }]}>{summaryContent}</Text>
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
              <Text style={styles.jobDescription}>{exp.content}</Text>
            </View>
          ))}
        </View>
        </Page>

        <Page size="LETTER" style={styles.page}>
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
          <Text style={styles.sectionTitle}>{t.pdf.sections.technicalSkills}</Text>
          {Object.entries(profileData.skills).map(([category, skills]: [string, Skill[]], index: number) => (
            <View key={index} style={{ marginBottom: 10 }}>
              <Text style={{ fontSize: 12, fontWeight: 700, marginBottom: 4 }}>
                {category}
              </Text>
              <View style={styles.skillsContainer}>
                {skills.map((skill: Skill, idx: number) => {
                  const [bgColor, textColor] = getNextColor();
                  return (
                    <Text
                      key={idx}
                      style={[
                        styles.badge,
                        { backgroundColor: bgColor, color: textColor }
                      ]}
                    >
                      {skill.name}
                    </Text>
                  );
                })}
              </View>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
}; 