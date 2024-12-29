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
}

export interface ExperienceProps {
  experienceEntries: ExperienceEntry[];
}

export interface EducationProps {
  educationEntries: EducationEntry[];
  certifications: CertificationEntry[];
  languages: LanguageEntry[];
}

export interface SummaryProps {
  content: string;
  title?: string;  // Making title optional as it might have a default
}

export interface HeaderProps {
  name: string;
  title: string;
  subtitle: string;
  resumeUrl: string;
  calendlyUrl: string;
}