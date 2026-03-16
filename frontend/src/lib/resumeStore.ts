// frontend/lib/resumeStore.ts
import { create } from 'zustand';
import { ResumeData, ResumeSection, ResumeTheme, SectionType } from './types';
import { v4 as uuidv4 } from 'uuid';

interface ResumeState {
  resume: ResumeData;
  selectedSectionId: string | null;
  isAIPanelOpen: boolean;
  isPreviewMode: boolean;

  // Actions
  addSection: (type: SectionType) => void;
  removeSection: (id: string) => void;
  updateSection: (id: string, updates: Partial<ResumeSection>) => void;
  reorderSections: (sections: ResumeSection[]) => void;
  updateTheme: (updates: Partial<ResumeTheme>) => void;
  setSelectedSection: (id: string | null) => void;
  toggleAIPanel: (isOpen?: boolean) => void;
  togglePreviewMode: (isPreview?: boolean) => void;
  saveResume: () => Promise<void>;
  loadResume: (id: string) => Promise<void>;
}

const initialResume: ResumeData = {
  id: 'new-resume',
  title: 'Untitled Resume',
  sections: [],
  theme: {
    fontFamily: 'Inter',
    primaryColor: '#4f46e5', // indigo-600
    fontSize: '14px',
    spacing: '16px',
  },
  template: 'minimal',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export const useResumeStore = create<ResumeState>((set, get) => ({
  resume: initialResume,
  selectedSectionId: null,
  isAIPanelOpen: false,
  isPreviewMode: false,

  addSection: (type: SectionType) => {
    const newSection: ResumeSection = {
      id: Math.random().toString(36).substr(2, 9), // Simple ID generator
      type,
      title: type.charAt(0).toUpperCase() + type.slice(1),
      content: '',
      position: { x: 0, y: 0 },
      order: get().resume.sections.length,
    };

    set((state) => ({
      resume: {
        ...state.resume,
        sections: [...state.resume.sections, newSection],
      },
    }));
  },

  removeSection: (id: string) => {
    set((state) => ({
      resume: {
        ...state.resume,
        sections: state.resume.sections.filter((s) => s.id !== id),
      },
      selectedSectionId: state.selectedSectionId === id ? null : state.selectedSectionId,
    }));
  },

  updateSection: (id: string, updates: Partial<ResumeSection>) => {
    set((state) => ({
      resume: {
        ...state.resume,
        sections: state.resume.sections.map((s) =>
          s.id === id ? { ...s, ...updates } : s
        ),
      },
    }));
  },

  reorderSections: (sections: ResumeSection[]) => {
    set((state) => ({
      resume: {
        ...state.resume,
        sections: sections.map((s, index) => ({ ...s, order: index })),
      },
    }));
  },

  updateTheme: (updates: Partial<ResumeTheme>) => {
    set((state) => ({
      resume: {
        ...state.resume,
        theme: { ...state.resume.theme, ...updates },
      },
    }));
  },

  setSelectedSection: (id: string | null) => {
    set({ selectedSectionId: id });
    if (id) set({ isAIPanelOpen: true });
  },

  toggleAIPanel: (isOpen) => {
    set((state) => ({ isAIPanelOpen: isOpen ?? !state.isAIPanelOpen }));
  },

  togglePreviewMode: (isPreview) => {
    set((state) => ({ isPreviewMode: isPreview ?? !state.isPreviewMode }));
  },

  saveResume: async () => {
    // Implementation for Step 8
    console.log('Saving resume...', get().resume);
  },

  loadResume: async (id: string) => {
    // Implementation for Step 8
    console.log('Loading resume...', id);
  },
}));
