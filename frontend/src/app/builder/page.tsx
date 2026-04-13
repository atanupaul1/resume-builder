"use client";
import { useState, useCallback, useEffect, useRef } from "react";
import { ResumeData, SectionKey, defaultResumeData, DEFAULT_SECTION_ORDER } from "@/types/resume";
import SectionPanel from "@/components/builder/SectionPanel";
import FormPanel from "@/components/builder/FormPanel";
import ResumeCanvas from "@/components/builder/ResumeCanvas";
import TemplateSwitcher from "@/components/builder/TemplateSwitcher";
import { exportApi, resumeApi } from "@/lib/api";
import {
  loadResumeDraft,
  loadResumeTitle,
  saveResumeDraft,
  saveResumeTitle,
  SELECTED_TEMPLATE_KEY,
} from "@/lib/resumeDraft";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { 
  DashboardSquare01Icon, 
  FileDownloadIcon, 
  ArrowUp01Icon, 
  Tick01Icon,
  FloppyDiskIcon,
  Delete01Icon
} from "@hugeicons/core-free-icons";

function getCompletionMap(data: ResumeData): Partial<Record<SectionKey, boolean>> {
  return {
    personalInfo: !!(data.personalInfo.fullName && data.personalInfo.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.personalInfo.email)),
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
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [statusTone, setStatusTone] = useState<"success" | "error" | "info">("info");
  const hasHydratedDraft = useRef(false);

    useEffect(() => {
    let data = loadResumeDraft();
    const savedTemplate = localStorage.getItem(SELECTED_TEMPLATE_KEY);
    
    if (savedTemplate) {
      data = { ...data, template: savedTemplate as ResumeData["template"] };
      // IMMEDIATELY save the draft so strict-mode double-invocation doesn't lose it
      saveResumeDraft(data);
      localStorage.removeItem(SELECTED_TEMPLATE_KEY);
    }
    
    setResumeData(data);
    setResumeTitle(loadResumeTitle());
    hasHydratedDraft.current = true;
  }, []);

  const [activeSection, setActiveSection] = useState<SectionKey | null>(null);
  const [resumeTitle, setResumeTitle] = useState("Untitled Resume");
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [saved, setSaved] = useState(false);
  const [exporting, setExporting] = useState(false);

  const [importing, setImporting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const showStatus = useCallback((message: string, tone: "success" | "error" | "info") => {
    setStatusMessage(message);
    setStatusTone(tone);
  }, []);

  useEffect(() => {
    if (!hasHydratedDraft.current) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      saveResumeDraft(resumeData);
      saveResumeTitle(resumeTitle);
    }, 800);

    return () => window.clearTimeout(timeoutId);
  }, [resumeData, resumeTitle]);

  const handleImportCV = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImporting(true);

    try {
      const parsedData = await resumeApi.uploadResume(file);
      
      setResumeData(prev => ({
        ...prev,
        personalInfo: { 
          ...prev.personalInfo, 
          ...(parsedData.personalInfo || {}) 
        },
        summary: parsedData.summary || prev.summary,
        workExperience: parsedData.workExperience?.length ? parsedData.workExperience : prev.workExperience,
        education: parsedData.education?.length ? parsedData.education : prev.education,
        skillGroups: parsedData.skillGroups?.length ? parsedData.skillGroups : prev.skillGroups,
        contact: { 
          ...prev.contact, 
          ...(parsedData.contact || {}) 
        },
      }));
      showStatus("Resume imported. Review fields before export.", "success");
    } catch (err) {
      console.error("Import failed:", err);
      const msg = err instanceof Error ? err.message : "An unknown error occurred";
      showStatus(`Import failed. ${msg}`, "error");
    } finally {
      setImporting(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };


  const handleClear = useCallback(() => {
    if (window.confirm("Clear all data? Cannot be undone.")) {
      setResumeData({
        ...defaultResumeData,
        sectionOrder: [...DEFAULT_SECTION_ORDER],
      });
      setResumeTitle("Untitled Resume");
      setSaved(false);
      showStatus("Resume cleared.", "info");
    }
  }, [showStatus]);

  const handleChange = useCallback((data: ResumeData) => {
    setResumeData(data);
    setSaved(false);
  }, []);

  const handleReorder = useCallback((newOrder: SectionKey[]) => {
    setResumeData((prev) => ({ ...prev, sectionOrder: newOrder }));
    setSaved(false);
  }, []);

  const handleSave = () => {
    // Validation
    if (!resumeData.personalInfo.fullName.trim()) {
      showStatus("Full name required before save.", "error");
      setActiveSection('personalInfo');
      return;
    }
    
    if (!resumeData.personalInfo.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(resumeData.personalInfo.email)) {
      showStatus("Valid email required before save.", "error");
      setActiveSection('personalInfo');
      return;
    }

    try {
      saveResumeDraft(resumeData);
      saveResumeTitle(resumeTitle);
      setSaved(true);
      showStatus("Draft saved locally.", "success");
      setTimeout(() => setSaved(false), 2000);
    } catch {
      showStatus("Failed to save draft locally.", "error");
    }
  };

  const handleExportPDF = async () => {
    setExporting(true);
    try {
      const element = document.getElementById("resume-canvas");
      if (!element) {
        showStatus("Resume canvas not found.", "error");
        return;
      }

      const fileName = resumeTitle ? `${resumeTitle.replace(/\s+/g, "_")}.pdf` : "resume.pdf";
      await exportApi.downloadElementAsPdf(element, fileName);
      showStatus("PDF export complete.", "success");
    } catch (err) {
      console.error("PDF export failed:", err);
      showStatus(err instanceof Error ? err.message : "Export failed. Please ensure backend is running.", "error");
    } finally {
      setExporting(false);
    }
  };

  const completionMap = getCompletionMap(resumeData);

  return (
    <div className="h-screen flex flex-col bg-[#F9F9F8]">
      <header className="h-14 flex items-center justify-between px-6 bg-white/80 backdrop-blur-md border-b border-gray-100/80 flex-shrink-0 z-50">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-200 group-hover:scale-105 transition-transform text-white">
              <HugeiconsIcon icon={DashboardSquare01Icon} size={16} />
            </div>
            <span className="font-bold text-gray-900 tracking-tight hidden sm:block">CV<span className="text-indigo-600">.io</span></span>
          </Link>

          <div className="h-4 w-px bg-gray-200 hidden sm:block" />

          <div className="flex items-center gap-2">
            {isEditingTitle ? (
              <input
                autoFocus
                className="text-sm font-bold text-gray-900 border-none outline-none bg-indigo-50/50 rounded-md px-2 py-1 transition-all focus:ring-2 focus:ring-indigo-100"
                value={resumeTitle}
                onChange={(e) => setResumeTitle(e.target.value)}
                onBlur={() => setIsEditingTitle(false)}
                onKeyDown={(e) => e.key === "Enter" && setIsEditingTitle(false)}
              />
            ) : (
              <button 
                className="group flex items-center gap-2 text-sm font-bold text-gray-900 hover:text-indigo-600 transition-colors"
                onClick={() => setIsEditingTitle(true)}
              >
                {resumeTitle}
                <HugeiconsIcon icon={ArrowUp01Icon} size={12} className="opacity-0 group-hover:opacity-100 rotate-90 transition-all" />
              </button>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleImportCV} 
            accept=".pdf,.docx,.txt" 
            className="hidden" 
          />
          
          <div className="flex items-center gap-1.5 p-1 bg-gray-50/50 rounded-xl border border-gray-100">
            <button 
              onClick={handleClear}
              title="Clear Resume"
              className="p-2 text-gray-500 hover:text-rose-600 hover:bg-white hover:shadow-sm rounded-lg transition-all"
            >
              <HugeiconsIcon icon={Delete01Icon} size={18} />
            </button>

            <div className="w-px h-4 bg-gray-200 mx-1" />

            <button 
              onClick={() => fileInputRef.current?.click()} 
              disabled={importing}
              title="Import CV (PDF/DOCX/TXT)"
              className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-white hover:shadow-sm rounded-lg transition-all disabled:opacity-50"
            >
              <HugeiconsIcon icon={DashboardSquare01Icon} size={18} className={importing ? "animate-pulse" : ""} />
            </button>


            <div className="w-px h-4 bg-gray-200 mx-1" />

            <button 
              onClick={handleSave}
              title="Save Progress"
              className={`p-2 rounded-lg transition-all ${saved ? "text-emerald-500 bg-white shadow-sm" : "text-gray-500 hover:text-emerald-500 hover:bg-white hover:shadow-sm"}`}
            >
              <HugeiconsIcon icon={saved ? Tick01Icon : FloppyDiskIcon} size={18} />
            </button>
          </div>

          <div className="flex items-center gap-2 ml-2">
            <button 
              onClick={handleExportPDF} 
              disabled={exporting}
              className="flex items-center gap-2 px-6 py-2.5 text-sm font-bold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 active:scale-95 disabled:opacity-50"
            >
              <HugeiconsIcon icon={FileDownloadIcon} size={16} className={exporting ? "animate-bounce" : ""} />
              {exporting ? "Exporting..." : "Download PDF"}
            </button>
          </div>
        </div>
      </header>

      {statusMessage && (
        <div
          className={`px-6 py-3 text-sm font-medium border-b ${
            statusTone === "success"
              ? "bg-emerald-50 text-emerald-700 border-emerald-100"
              : statusTone === "error"
                ? "bg-rose-50 text-rose-700 border-rose-100"
                : "bg-blue-50 text-blue-700 border-blue-100"
          }`}
        >
          <div className="flex items-center justify-between gap-4">
            <span>{statusMessage}</span>
            <button
              type="button"
              className="text-xs font-bold uppercase tracking-wide opacity-80 hover:opacity-100"
              onClick={() => setStatusMessage(null)}
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

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
