"use client";

import { ResumeData, SectionKey } from "@/types/resume";
import PersonalInfoForm from "./forms/PersonalInfoForm";
import SummaryForm from "./forms/SummaryForm";
import WorkExperienceForm from "./forms/WorkExperienceForm";
import EducationForm from "./forms/EducationForm";
import SkillsForm from "./forms/SkillsForm";
import CustomSectionForm from "./forms/CustomSectionForm";
import PublicationsForm from "./forms/PublicationsForm";

interface Props {
  activeSection: SectionKey | null;
  data: ResumeData;
  onChange: (data: ResumeData) => void;
  onClose: () => void;
  validationErrors?: Partial<Record<"fullName" | "email", string>>;
}

const sectionTitles: Record<SectionKey, string> = {
  personalInfo: "Personal Info",
  summary: "Professional Summary",
  workExperience: "Work Experience",
  education: "Education",
  skills: "Skills & Tools",
  custom: "Custom Sections",
  publications: "Publications & Research",
};

const sectionHints: Record<SectionKey, string> = {
  personalInfo: "This appears at the very top of your resume.",
  summary: "2-4 sentences recruiters read first.",
  workExperience: "List most recent first. Use strong action verbs.",
  education: "Include relevant degrees and certifications.",
  skills: "Group skills by category for clarity.",
  custom: "Add any other relevant information.",
  publications: "Research papers, journal articles, and conference proceedings.",
};

export default function FormPanel({ activeSection, data, onChange, onClose, validationErrors }: Props) {
  if (!activeSection) return null;

  return (
    <div className="w-full sm:max-w-[24rem] flex-shrink-0 bg-white/95 sm:bg-white/85 backdrop-blur-xl border-r border-white/70 flex flex-col h-full shadow-[8px_0_24px_rgba(15,23,42,0.04)] sm:shadow-none">
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100/80 bg-white/50">
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="sm:hidden -ml-2 p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="min-w-0">
            <h2 className="text-sm font-black text-gray-900 uppercase tracking-wider">{sectionTitles[activeSection]}</h2>
            <p className="text-[10px] text-gray-500 font-medium truncate hidden sm:block">{sectionHints[activeSection]}</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="hidden sm:flex text-gray-400 hover:text-gray-700 transition-colors p-2 rounded-full hover:bg-gray-100"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <button
          onClick={onClose}
          className="sm:hidden px-4 py-1.5 bg-indigo-600 text-white text-[11px] font-bold uppercase tracking-widest rounded-full shadow-lg shadow-indigo-100"
        >
          Done
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-5">
        {activeSection === "personalInfo" && (
          <PersonalInfoForm
            data={data.personalInfo}
            onChange={(val) => onChange({ ...data, personalInfo: val })}
            errors={validationErrors}
          />
        )}
        {activeSection === "summary" && (
          <SummaryForm
            data={data.summary}
            resumeData={data}
            onChange={(val) => onChange({ ...data, summary: val })}
          />
        )}
        {activeSection === "workExperience" && (
          <WorkExperienceForm
            data={data.workExperience}
            onChange={(val) => onChange({ ...data, workExperience: val })}
          />
        )}
        {activeSection === "education" && (
          <EducationForm
            data={data.education}
            onChange={(val) => onChange({ ...data, education: val })}
          />
        )}
        {activeSection === "skills" && (
          <SkillsForm
            data={data.skillGroups}
            onChange={(val) => onChange({ ...data, skillGroups: val })}
          />
        )}
        {activeSection === "custom" && (
          <CustomSectionForm
            data={data.customSections}
            onChange={(val) => onChange({ ...data, customSections: val })}
          />
        )}
        {activeSection === "publications" && (
          <PublicationsForm
            data={data.publications}
            onChange={(val) => onChange({ ...data, publications: val })}
          />
        )}
      </div>
    </div>
  );
}
