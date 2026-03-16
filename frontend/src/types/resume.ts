export interface PersonalInfo {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  website: string;
  photo?: string;
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
}

export interface SkillGroup {
  id: string;
  category: string;
  skills: string[];
}

export interface ContactInfo {
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  website: string;
  github: string;
}

export type SectionKey =
  | "personalInfo"
  | "summary"
  | "workExperience"
  | "education"
  | "skills"
  | "contact";

export const DEFAULT_SECTION_ORDER: SectionKey[] = [
  "personalInfo",
  "summary",
  "workExperience",
  "education",
  "skills",
  "contact",
];

export interface ResumeData {
  personalInfo: PersonalInfo;
  summary: string;
  workExperience: WorkExperience[];
  education: Education[];
  skillGroups: SkillGroup[];
  contact: ContactInfo;
  template: "minimal" | "modern" | "ats";
  accentColor: string;
  sectionOrder: SectionKey[];
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
    photo: "",
  },
  summary: "",
  workExperience: [],
  education: [],
  skillGroups: [],
  contact: {
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    website: "",
    github: "",
  },
  template: "minimal",
  accentColor: "#6C63FF",
  sectionOrder: [...DEFAULT_SECTION_ORDER],
};
