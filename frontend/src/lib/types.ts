// frontend/lib/types.ts

export type SectionType = 'experience' | 'education' | 'skills' | 'summary' | 'contact';

export interface ResumeSection {
  id: string;
  type: SectionType;
  title: string;
  content: string; // Markdown or JSON string depending on section needs
  position: { x: number; y: number };
  order: number;
}

export interface ResumeTheme {
  fontFamily: string;
  primaryColor: string;
  fontSize: string;
  spacing: string;
}

export interface ResumeData {
  id: string;
  title: string;
  sections: ResumeSection[];
  theme: ResumeTheme;
  template: string;
  createdAt: string;
  updatedAt: string;
}

export interface AIRequest {
  sectionId: string;
  sectionType: SectionType;
  content: string;
  targetRole?: string;
  jobDescription?: string;
}

export interface AIResponse {
  improved: string;
  alternatives: string[];
  missingKeywords: string[];
  score: number; // 0-100
  tips: string[];
}

export interface TemplateConfig {
  id: string;
  name: string;
  thumbnail: string;
  layout: 'single-column' | 'two-column';
  colorScheme: string[];
  fontPair: string;
}
