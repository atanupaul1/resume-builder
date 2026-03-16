"use client";
import { ResumeData } from "@/types/resume";
import { useState } from "react";
import AISuggestionBox from "@/components/builder/AISuggestionBox";

interface Props {
  data: string;
  resumeData: ResumeData;
  onChange: (val: string) => void;
}

export default function SummaryForm({ data, resumeData, onChange }: Props) {
  const wordCount = data.trim() ? data.trim().split(/\s+/).length : 0;
  const [aiLoading, setAiLoading] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState("");
  const [aiError, setAiError] = useState("");

  const generateSummary = async () => {
    setAiLoading(true);
    setAiSuggestion("");
    setAiError("");
    try {
      const res = await fetch("/api/ai/generate-summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobTitle: resumeData.personalInfo.jobTitle,
          experience: resumeData.workExperience,
          education: resumeData.education,
          skills: resumeData.skillGroups,
        }),
      });
      const json = await res.json();
      if (json.error) throw new Error(json.error);
      setAiSuggestion(json.summary);
    } catch (err) {
      setAiError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setAiLoading(false);
    }
  };

  const clearAI = () => { setAiSuggestion(""); setAiError(""); setAiLoading(false); };

  return (
    <div className="space-y-3">
      <p className="text-xs text-gray-500 leading-relaxed">
        Write 2-4 sentences that summarize your career, key strengths, and what
        you are looking for. Recruiters spend ~6 seconds here.
      </p>
      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="form-label !mb-0">Professional Summary</label>
          <button
            onClick={generateSummary}
            disabled={aiLoading}
            className="flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-medium text-indigo-600 bg-indigo-50 border border-indigo-200 rounded-lg hover:bg-indigo-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {aiLoading ? (
              <svg className="w-3 h-3 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
              </svg>
            ) : (
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
              </svg>
            )}
            {aiLoading ? "Generating..." : "Generate with AI"}
          </button>
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
        <AISuggestionBox
          isLoading={aiLoading}
          suggestion={aiSuggestion}
          error={aiError}
          label="AI summary"
          onAccept={(val) => { onChange(val); clearAI(); }}
          onReject={clearAI}
          onRetry={generateSummary}
        />
      </div>
      {!resumeData.personalInfo.jobTitle && !resumeData.workExperience.length && (
        <p className="text-[11px] text-amber-500 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
          Add your Job Title and Work Experience first for better AI results
        </p>
      )}
    </div>
  );
}
