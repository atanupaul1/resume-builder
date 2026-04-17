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
      skillGroups: (parsed.skillGroups ?? []).map(group => ({
        ...group,
        skills: (group.skills ?? []).map(skill => {
          if (typeof skill === 'string') return skill;
          if (typeof skill === 'object' && skill !== null) {
            // Recover from corrupted {0: 'a', 1: 'b'} spread string objects
            const str = Object.keys(skill)
              .filter(k => !isNaN(Number(k)))
              .sort((a, b) => Number(a) - Number(b))
              .map(k => (skill as any)[k])
              .join('');
            return str || (skill as any).name || "Unknown Skill";
          }
          return String(skill);
        })
      })),
      template: parsed.template || defaultResumeData.template,
      sectionOrder: (() => {
        const order = parsed.sectionOrder?.filter((k) => defaultResumeData.sectionOrder.includes(k));
        return order && order.length > 0 ? order : [...defaultResumeData.sectionOrder];
      })(),
      hiddenSections: parsed.hiddenSections?.filter((k) => defaultResumeData.sectionOrder.includes(k)) || [],
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
