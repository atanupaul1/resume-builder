"use client";
import { ResumeData, SectionKey } from "@/types/resume";
import PersonalInfoForm from "./forms/PersonalInfoForm";
import SummaryForm from "./forms/SummaryForm";
import WorkExperienceForm from "./forms/WorkExperienceForm";
import EducationForm from "./forms/EducationForm";
import SkillsForm from "./forms/SkillsForm";

interface Props {
  activeSection: SectionKey | null;
  data: ResumeData;
  onChange: (data: ResumeData) => void;
  onClose: () => void;
}

const sectionTitles: Record<SectionKey, string> = {
  personalInfo: "Personal Info",
  summary: "Professional Summary",
  workExperience: "Work Experience",
  education: "Education",
  skills: "Skills & Tools",
  contact: "Contact Info",
};

const sectionHints: Record<SectionKey, string> = {
  personalInfo: "This appears at the very top of your resume.",
  summary: "2–4 sentences recruiters read first.",
  workExperience: "List most recent first. Use strong action verbs.",
  education: "Include relevant degrees and certifications.",
  skills: "Group skills by category for clarity.",
  contact: "Make it easy for employers to reach you.",
};

export default function FormPanel({ activeSection, data, onChange, onClose }: Props) {
  if (!activeSection) return null;

  return (
    <div className="w-96 flex-shrink-0 bg-white border-r border-gray-100 flex flex-col h-full shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-gray-100">
        <div>
          <h2 className="text-sm font-semibold text-gray-800">
            {sectionTitles[activeSection]}
          </h2>
          <p className="text-xs text-gray-400 mt-0.5">
            {sectionHints[activeSection]}
          </p>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-lg hover:bg-gray-100"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Form content */}
      <div className="flex-1 overflow-y-auto px-5 py-4">
        {activeSection === "personalInfo" && (
          <PersonalInfoForm
            data={data.personalInfo}
            onChange={(val) => onChange({ ...data, personalInfo: val })}
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
            resumeData={data}
            onChange={(val) => onChange({ ...data, skillGroups: val })}
          />
        )}
        {activeSection === "contact" && (
          <div className="text-sm text-gray-500 mt-4">
            Contact info is pulled automatically from Personal Info (email, phone, location, LinkedIn).
          </div>
        )}
      </div>
    </div>
  );
}
