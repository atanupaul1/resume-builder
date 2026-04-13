import { defaultResumeData, ResumeData } from "@/types/resume";

export const RESUME_DRAFT_KEY = "resumeData";
export const RESUME_TITLE_KEY = "resumeTitle";
export const SELECTED_TEMPLATE_KEY = "selectedTemplate";

export function createDefaultResumeDraft(): ResumeData {
  return {
    ...defaultResumeData,
    personalInfo: { ...defaultResumeData.personalInfo },
    workExperience: [...defaultResumeData.workExperience],
    education: [...defaultResumeData.education],
    skillGroups: [...defaultResumeData.skillGroups],
    contact: { ...defaultResumeData.contact },
    sectionOrder: [...defaultResumeData.sectionOrder],
  };
}

export function loadResumeDraft(): ResumeData {
  if (typeof window === "undefined") {
    return createDefaultResumeDraft();
  }

  try {
    const raw = window.localStorage.getItem(RESUME_DRAFT_KEY);
    if (!raw) {
      return createDefaultResumeDraft();
    }

    const parsed = JSON.parse(raw) as Partial<ResumeData>;
    return {
      ...createDefaultResumeDraft(),
      ...parsed,
      personalInfo: {
        ...defaultResumeData.personalInfo,
        ...parsed.personalInfo,
      },
      workExperience: parsed.workExperience ?? [],
      education: parsed.education ?? [],
      skillGroups: parsed.skillGroups ?? [],
      contact: {
        ...defaultResumeData.contact,
        ...parsed.contact,
      },
      template: parsed.template || defaultResumeData.template,
      sectionOrder:
        parsed.sectionOrder && parsed.sectionOrder.length > 0
          ? parsed.sectionOrder
          : [...defaultResumeData.sectionOrder],
    };
  } catch {
    return createDefaultResumeDraft();
  }
}

export function saveResumeDraft(data: ResumeData) {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.setItem(RESUME_DRAFT_KEY, JSON.stringify(data));
}

export function loadResumeTitle(): string {
  if (typeof window === "undefined") {
    return "Untitled Resume";
  }
  return window.localStorage.getItem(RESUME_TITLE_KEY) || "Untitled Resume";
}

export function saveResumeTitle(title: string) {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.setItem(RESUME_TITLE_KEY, title);
}
