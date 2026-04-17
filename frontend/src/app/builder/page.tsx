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
  Delete01Icon,
} from "@hugeicons/core-free-icons";

function getCompletionMap(data: ResumeData): Partial<Record<SectionKey, boolean>> {
  return {
    personalInfo: !!(data.personalInfo.fullName && data.personalInfo.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.personalInfo.email)),
    summary: data.summary.trim().length > 20,
    workExperience: data.workExperience.length > 0,
    education: data.education.length > 0,
    skills: data.skillGroups.length > 0,
  };
}

export default function BuilderPage() {
  const [resumeData, setResumeData] = useState<ResumeData>({
    ...defaultResumeData,
    sectionOrder: [...DEFAULT_SECTION_ORDER],
  });
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [statusTone, setStatusTone] = useState<"success" | "error" | "info">("info");
  const [validationErrors, setValidationErrors] = useState<Partial<Record<"fullName" | "email", string>>>({});
  const hasHydratedDraft = useRef(false);

  useEffect(() => {
    let data = loadResumeDraft();
    const savedTemplate = localStorage.getItem(SELECTED_TEMPLATE_KEY);

    if (savedTemplate) {
      data = { ...data, template: savedTemplate as ResumeData["template"] };
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
  const [mobileTab, setMobileTab] = useState<"edit" | "preview">("edit");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const showStatus = useCallback((message: string, tone: "success" | "error" | "info") => {
    setStatusMessage(message);
    setStatusTone(tone);
  }, []);

  useEffect(() => {
    if (!hasHydratedDraft.current) return;

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

      setResumeData((prev) => ({
        ...prev,
        personalInfo: {
          ...prev.personalInfo,
          ...(parsedData.personalInfo || {}),
        },
        summary: parsedData.summary || prev.summary,
        workExperience: parsedData.workExperience?.length ? parsedData.workExperience : prev.workExperience,
        education: parsedData.education?.length ? parsedData.education : prev.education,
        skillGroups: parsedData.skillGroups?.length ? parsedData.skillGroups : prev.skillGroups,
      }));
      showStatus("Resume imported. Review fields before export.", "success");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "An unknown error occurred";
      showStatus(
        msg.includes("No text could be extracted") || msg.includes("No readable text found")
          ? "Import failed. This PDF looks scanned or image-only. Use a text-based PDF, DOCX, or TXT file."
          : `Import failed. ${msg}`,
        "error"
      );
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
    setValidationErrors((prev) => {
      const next = { ...prev };
      if (data.personalInfo.fullName.trim()) delete next.fullName;
      if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.personalInfo.email)) delete next.email;
      return next;
    });
  }, []);

  const handleReorder = useCallback((newOrder: SectionKey[]) => {
    setResumeData((prev) => ({ ...prev, sectionOrder: newOrder }));
    setSaved(false);
  }, []);

  const handleToggleVisibility = useCallback((key: SectionKey) => {
    setResumeData((prev) => {
      const hidden = prev.hiddenSections || [];
      const newHidden = hidden.includes(key) ? hidden.filter((k) => k !== key) : [...hidden, key];
      return { ...prev, hiddenSections: newHidden };
    });
    setSaved(false);
  }, []);

  const handleSave = () => {
    const errors: Partial<Record<"fullName" | "email", string>> = {};

    if (!resumeData.personalInfo.fullName.trim()) {
      errors.fullName = "Please enter your full name.";
      setActiveSection("personalInfo");
    }

    if (!resumeData.personalInfo.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(resumeData.personalInfo.email)) {
      errors.email = "Please enter a valid email address.";
      setActiveSection("personalInfo");
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      showStatus("Fix highlighted fields before saving.", "error");
      return;
    }

    setValidationErrors({});

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
      showStatus(`PDF Export Failed. ${err instanceof Error ? err.message : "Please ensure backend is running."}`, "error");
    } finally {
      setExporting(false);
    }
  };

  const completionMap = getCompletionMap(resumeData);

  return (
    <div className="h-screen flex flex-col bg-[radial-gradient(circle_at_top_left,_rgba(99,102,241,0.08),_transparent_30%),linear-gradient(180deg,_#faf8f3_0%,_#f4f1e8_100%)]">
      <header className="h-16 flex items-center justify-between px-4 sm:px-6 bg-white/75 backdrop-blur-xl border-b border-white/70 flex-shrink-0 z-50 shadow-[0_1px_0_rgba(15,23,42,0.03)]">
        <div className="flex items-center gap-4 sm:gap-8 min-w-0">
          <Link href="/" className="flex items-center gap-2 group shrink-0">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-100 group-hover:scale-105 transition-transform text-white">
              <HugeiconsIcon icon={DashboardSquare01Icon} size={16} />
            </div>
            <span className="font-black text-gray-900 tracking-tight hidden sm:block">
              CV<span className="text-indigo-600">.io</span>
            </span>
          </Link>

          <div className="h-4 w-px bg-gray-200 hidden sm:block" />

          <div className="min-w-0 flex items-center gap-2">
            {isEditingTitle ? (
              <input
                autoFocus
                className="min-w-0 max-w-[14rem] sm:max-w-[22rem] text-sm font-bold text-gray-900 border border-indigo-100 bg-white rounded-full px-3 py-1.5 outline-none shadow-sm focus:ring-2 focus:ring-indigo-100"
                value={resumeTitle}
                onChange={(e) => setResumeTitle(e.target.value)}
                onBlur={() => setIsEditingTitle(false)}
                onKeyDown={(e) => e.key === "Enter" && setIsEditingTitle(false)}
              />
            ) : (
              <button
                className="group flex items-center gap-2 text-sm font-bold text-gray-900 hover:text-indigo-600 transition-colors truncate"
                onClick={() => setIsEditingTitle(true)}
              >
                <span className="truncate max-w-[10rem] sm:max-w-[18rem]">{resumeTitle}</span>
                <HugeiconsIcon icon={ArrowUp01Icon} size={12} className="opacity-0 group-hover:opacity-100 rotate-90 transition-all shrink-0" />
              </button>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <input type="file" ref={fileInputRef} onChange={handleImportCV} accept=".pdf,.docx,.txt" className="hidden" />

          <div className="flex items-center gap-1 p-1 bg-white/80 rounded-full border border-gray-100 shadow-sm">
            <button
              onClick={handleClear}
              title="Clear Resume"
              className="p-2 text-gray-500 hover:text-rose-600 hover:bg-rose-50 rounded-full transition-all"
            >
              <HugeiconsIcon icon={Delete01Icon} size={18} />
            </button>

            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={importing}
              title="Import CV (PDF/DOCX/TXT)"
              className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-all disabled:opacity-50"
            >
              <HugeiconsIcon icon={DashboardSquare01Icon} size={18} className={importing ? "animate-pulse" : ""} />
            </button>

            <button
              onClick={handleSave}
              title="Save Progress"
              className={`p-2 rounded-full transition-all ${saved ? "text-emerald-500 bg-emerald-50" : "text-gray-500 hover:text-emerald-500 hover:bg-emerald-50"}`}
            >
              <HugeiconsIcon icon={saved ? Tick01Icon : FloppyDiskIcon} size={18} />
            </button>
          </div>

          <button
            onClick={handleExportPDF}
            disabled={exporting}
            className="hidden sm:flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-white bg-gray-900 rounded-full hover:bg-gray-800 transition-all shadow-lg shadow-gray-200 active:scale-95 disabled:opacity-50"
          >
            <HugeiconsIcon icon={FileDownloadIcon} size={16} className={exporting ? "animate-bounce" : ""} />
            {exporting ? "Exporting..." : "Download PDF"}
          </button>
        </div>
      </header>

      {statusMessage && (
        <div
          className={`px-4 sm:px-6 py-3 text-sm font-medium border-b ${
            statusTone === "success"
              ? "bg-emerald-50 text-emerald-700 border-emerald-100"
              : statusTone === "error"
                ? "bg-rose-50 text-rose-700 border-rose-100"
                : "bg-blue-50 text-blue-700 border-blue-100"
          }`}
        >
          <div className="flex items-center justify-between gap-4 max-w-7xl mx-auto">
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

      <div className="flex-1 flex overflow-hidden relative">
        {/* Editor Sidebar (Mobile: only in "edit" tab) */}
        <div className={`flex flex-shrink-0 z-20 ${mobileTab === "edit" ? "flex" : "hidden sm:flex"}`}>
          <SectionPanel
            activeSection={activeSection}
            onSelect={(key) => setActiveSection(activeSection === key ? null : key)}
            completionMap={completionMap}
            sectionOrder={resumeData.sectionOrder}
            onReorder={handleReorder}
            hiddenSections={resumeData.hiddenSections || []}
            onToggleVisibility={handleToggleVisibility}
          />
        </div>

        {/* Form Panel (Overlay on mobile, sidebar on desktop) */}
        {activeSection && (
          <div className="fixed inset-0 z-[60] sm:relative sm:inset-auto sm:z-30">
            <FormPanel
              activeSection={activeSection}
              data={resumeData}
              onChange={handleChange}
              onClose={() => setActiveSection(null)}
              validationErrors={validationErrors}
            />
          </div>
        )}

        {/* Preview Area (Mobile: only in "preview" tab) */}
        <div className={`flex-1 flex flex-col overflow-hidden min-w-0 ${mobileTab === "preview" ? "flex" : "hidden sm:flex"}`}>
          <TemplateSwitcher
            active={resumeData.template}
            onChange={(t) => handleChange({ ...resumeData, template: t })}
            accentColor={resumeData.accentColor}
            onAccentChange={(c) => handleChange({ ...resumeData, accentColor: c })}
          />
          <ResumeCanvas data={resumeData} />
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="sm:hidden border-t border-white/70 bg-white/80 backdrop-blur-xl p-3 flex gap-3">
        <div className="flex-1 flex bg-gray-100/80 p-1 rounded-2xl">
          <button
            onClick={() => setMobileTab("edit")}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all ${
              mobileTab === "edit" ? "bg-white text-indigo-600 shadow-sm" : "text-gray-500"
            }`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
            Editor
          </button>
          <button
            onClick={() => setMobileTab("preview")}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all ${
              mobileTab === "preview" ? "bg-white text-indigo-600 shadow-sm" : "text-gray-500"
            }`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
            Preview
          </button>
        </div>
        
        <button
          onClick={handleExportPDF}
          disabled={exporting}
          className="aspect-square flex items-center justify-center bg-gray-900 text-white rounded-2xl w-[48px] disabled:opacity-50 active:scale-95 transition-transform"
        >
          <HugeiconsIcon icon={FileDownloadIcon} size={18} className={exporting ? "animate-bounce" : ""} />
        </button>
      </div>
    </div>
  );
}
