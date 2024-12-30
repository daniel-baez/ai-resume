import { Language } from "../constants/i18n";
export interface ExperienceEntry {
  title: string;
  company: string;
  period: string;
  location: string;
  content: string;
}

export interface EducationEntry {
  title: string;
  institution: string;
  period: string;
}

export interface LanguageEntry {
  name: string;
  level: string;
}

export interface SkillCategory {
  [key: string]: string[];  // If it's an object with string array values
}

export interface CertificationEntry {
  name: string;
  issuer: string;
}

export interface Skill {
  name: string;
}

// Component Props
export interface SkillsProps {
  skillCategories: Record<string, Skill[]>;
  currentLang: Language;
}

export interface ExperienceProps {
  experienceEntries: ExperienceEntry[];
  currentLang: Language;
}

export interface EducationProps {
  educationEntries: EducationEntry[];
  certifications: CertificationEntry[];
  languages: LanguageEntry[];
  currentLang: Language;
}

export interface SummaryProps {
  content: string;
  currentLang: Language;
}

export interface HeaderProps {
  name: string;
  title: string;
  subtitle: string;
  resumeUrl: string;
  calendlyUrl: string;
}