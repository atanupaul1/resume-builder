"use client";
import { useState, useCallback, useEffect } from "react";
import { ResumeData, SectionKey, defaultResumeData, DEFAULT_SECTION_ORDER } from "@/types/resume";
import SectionPanel from "@/components/builder/SectionPanel";
import FormPanel from "@/components/builder/FormPanel";
import ResumeCanvas from "@/components/builder/ResumeCanvas";
import TemplateSwitcher from "@/components/builder/TemplateSwitcher";
import Link from "next/link";

function getCompletionMap(data: ResumeData): Partial<Record<SectionKey, boolean>> {
  return {
    personalInfo: !!(data.personalInfo.fullName && data.personalInfo.email),
    summary: data.summary.trim().length > 20,
    workExperience: data.workExperience.length > 0,
    education: data.education.length > 0,
    skills: data.skillGroups.length > 0,
    contact: !!(data.personalInfo.email || data.personalInfo.phone),
  };
}

export default function BuilderPage() {
  const [resumeData, setResumeData] = useState<ResumeData>({
    ...defaultResumeData,
    sectionOrder: [...DEFAULT_SECTION_ORDER],
  });

  useEffect(() => {
    const savedTemplate = localStorage.getItem("selectedTemplate");
    if (savedTemplate) {
      setResumeData(prev => ({ ...prev, template: savedTemplate as any }));
      localStorage.removeItem("selectedTemplate");
    }
  }, []);

  const [activeSection, setActiveSection] = useState<SectionKey | null>(null);
  const [resumeTitle, setResumeTitle] = useState("Untitled Resume");
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [saved, setSaved] = useState(false);
  const [exporting, setExporting] = useState(false);

  const handleChange = useCallback((data: ResumeData) => {
    setResumeData(data);
    setSaved(false);
  }, []);

  const handleReorder = useCallback((newOrder: SectionKey[]) => {
    setResumeData((prev) => ({ ...prev, sectionOrder: newOrder }));
    setSaved(false);
  }, []);

  const handleSave = () => {
    try {
      localStorage.setItem("resumeData", JSON.stringify(resumeData));
      localStorage.setItem("resumeTitle", resumeTitle);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch { /* silently fail */ }
  };

  const handleExportPDF = async () => {
    setExporting(true);
    try {
      const html2pdf = (await import("html2pdf.js")).default;
      const element = document.getElementById("resume-canvas");
      if (!element) return;
      const filename = resumeTitle ? `${resumeTitle.replace(/\s+/g, "_")}.pdf` : "resume.pdf";
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const opt: any = {
        margin: 0, filename,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, letterRendering: true, width: 794 },
        jsPDF: { unit: "px", format: [794, 1123], orientation: "portrait", hotfixes: ["px_scaling"] },
      };
      await html2pdf().set(opt).from(element).save();
    } catch (err) {
      console.error("PDF export failed:", err);
      alert("Export failed. Please try again.");
    } finally {
      setExporting(false);
    }
  };

  const completionMap = getCompletionMap(resumeData);

  return (
    <div className="h-screen flex flex-col bg-white overflow-hidden">
      {/* Top Bar */}
      <header className="flex items-center justify-between px-5 py-3 border-b border-gray-100 bg-white z-10 flex-shrink-0">
        <div className="flex items-center gap-3">
          <Link href="/templates" className="text-gray-400 hover:text-gray-600 transition-colors p-1">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <div className="w-px h-5 bg-gray-200" />
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-indigo-600 rounded-md flex items-center justify-center">
              <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            {isEditingTitle ? (
              <input autoFocus
                className="text-sm font-medium text-gray-800 border-b border-indigo-400 outline-none bg-transparent px-1"
                value={resumeTitle}
                onChange={(e) => setResumeTitle(e.target.value)}
                onBlur={() => setIsEditingTitle(false)}
                onKeyDown={(e) => e.key === "Enter" && setIsEditingTitle(false)}
              />
            ) : (
              <button className="text-sm font-medium text-gray-800 hover:text-indigo-600 transition-colors"
                onClick={() => setIsEditingTitle(true)}>{resumeTitle}</button>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button onClick={handleSave}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-all
              ${saved ? "border-emerald-300 text-emerald-600 bg-emerald-50" : "border-gray-200 text-gray-600 hover:bg-gray-50"}`}>
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
            </svg>
            {saved ? "Saved!" : "Save"}
          </button>
          <button onClick={handleExportPDF} disabled={exporting}
            className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-medium bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed">
            {exporting ? (
              <><svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>Exporting…</>
            ) : (
              <><svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>Export PDF</>
            )}
          </button>
        </div>
      </header>

      {/* Main layout */}
      <div className="flex flex-1 overflow-hidden">
        <SectionPanel
          activeSection={activeSection}
          onSelect={(key) => setActiveSection(activeSection === key ? null : key)}
          completionMap={completionMap}
          sectionOrder={resumeData.sectionOrder}
          onReorder={handleReorder}
        />

        {activeSection && (
          <FormPanel
            activeSection={activeSection}
            data={resumeData}
            onChange={handleChange}
            onClose={() => setActiveSection(null)}
          />
        )}

        <div className="flex-1 flex flex-col overflow-hidden">
          <TemplateSwitcher
            active={resumeData.template}
            onChange={(t) => handleChange({ ...resumeData, template: t })}
            accentColor={resumeData.accentColor}
            onAccentChange={(c) => handleChange({ ...resumeData, accentColor: c })}
          />
          <ResumeCanvas data={resumeData} />
        </div>
      </div>
    </div>
  );
}
