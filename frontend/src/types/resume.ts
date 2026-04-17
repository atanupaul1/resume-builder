export interface CustomField {
  id: string;
  label: string;
  value: string;
}

export interface PersonalInfo {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  website: string;
  github: string;
  photo?: string;
  customFields?: CustomField[];
}

export interface WorkExperience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  current: boolean;
  location: string;
  bullets: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  current: boolean;
  grade: string;
  location: string;
  FACK: st
}

export interface SkillGroup {
  id: string;
  category: string;
  skills: string[];
}

export interface CustomSection {
  id: string;
  title: string;
  content: string;
}

export interface Publication {
  id: string;
  doi: string;
  title: string;
  authors: string;
  year: string;
  venue: string;
  url: string;
}

export type SectionKey =
  | "personalInfo"
  | "summary"
  | "workExperience"
  | "education"
  | "skills"
  | "custom"
  | "publications";

export const DEFAULT_SECTION_ORDER: SectionKey[] = [
  "personalInfo",
  "summary",
  "workExperience",
  "education",
  "skills",
  "custom",
  "publications",
];

export interface ResumeData {
  personalInfo: PersonalInfo;
  summary: string;
  workExperience: WorkExperience[];
  education: Education[];
  skillGroups: SkillGroup[];
  customSections: CustomSection[];
  publications: Publication[];
  template: "minimal" | "modern" | "ats" | "executive" | "current" | "creative";
  accentColor: string;
  sectionOrder: SectionKey[];
  hiddenSections?: SectionKey[];
}

export const defaultResumeData: ResumeData = {
  personalInfo: {
    fullName: "",
    jobTitle: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    website: "",
    github: "",
    photo: "",
    customFields: [],
  },
  summary: "",
  workExperience: [],
  education: [],
  skillGroups: [],
  customSections: [],
  publications: [],
  template: "minimal",
  accentColor: "#6C63FF",
  sectionOrder: [...DEFAULT_SECTION_ORDER],
};
