"use client";
import { ResumeData } from "@/types/resume";

interface Props {
  data: string;
  resumeData: ResumeData;
  onChange: (val: string) => void;
}

export default function SummaryForm({ data, resumeData, onChange }: Props) {
  const wordCount = data.trim() ? data.trim().split(/\s+/).length : 0;

  return (
    <div className="space-y-3">
      <p className="text-xs text-gray-500 leading-relaxed">
        Write 2-4 sentences that summarize your career, key strengths, and what
        you are looking for. Recruiters spend ~6 seconds here.
      </p>
      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="form-label !mb-0">Professional Summary</label>
          <span className="text-[11px] font-medium text-gray-400">Manual section</span>
        </div>
        <textarea
          className="form-input resize-none"
          rows={6}
          placeholder="Results-driven professional with..."
          value={data}
          onChange={(e) => onChange(e.target.value)}
        />
        <div className="flex justify-between mt-1">
          <span className="text-xs text-gray-400">
            {wordCount < 30 ? "Tip: aim for 40-80 words" : wordCount > 80 ? "Consider trimming" : "Good length"}
          </span>
          <span className="text-xs text-gray-400">{wordCount} words</span>
        </div>
      </div>
      {!resumeData.personalInfo.jobTitle && !resumeData.workExperience.length && (
        <p className="text-[11px] text-amber-500 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
          Add your Job Title and Work Experience first for stronger writing context
        </p>
      )}
    </div>
  );
}
