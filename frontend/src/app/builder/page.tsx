"use client";
import { useState, useCallback, useEffect, useRef } from "react";
import { ResumeData, SectionKey, defaultResumeData, DEFAULT_SECTION_ORDER } from "@/types/resume";
import SectionPanel from "@/components/builder/SectionPanel";
import FormPanel from "@/components/builder/FormPanel";
import ResumeCanvas from "@/components/builder/ResumeCanvas";
import TemplateSwitcher from "@/components/builder/TemplateSwitcher";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { 
  DashboardSquare01Icon, 
  SparklesIcon, 
  FileDownloadIcon, 
  ArrowUp01Icon, 
  Tick01Icon,
  FloppyDiskIcon,
  FileAttachmentIcon
} from "@hugeicons/core-free-icons";

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

  const [importing, setImporting] = useState(false);
  const [exportingWord, setExportingWord] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImportCV = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImporting(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://localhost:8000/api/resume/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error(await res.text());
      }
      
      const parsedData = await res.json();
      
      setResumeData(prev => ({
        ...prev,
        personalInfo: { ...prev.personalInfo, ...(parsedData.personalInfo || {}) },
        summary: parsedData.summary || prev.summary,
        workExperience: parsedData.workExperience?.length ? parsedData.workExperience : prev.workExperience,
        education: parsedData.education?.length ? parsedData.education : prev.education,
        skillGroups: parsedData.skillGroups?.length ? parsedData.skillGroups : prev.skillGroups,
        contact: { ...prev.contact, ...(parsedData.contact || {}) },
      }));
      // Optional: Add a small delay to make the alert less abrupt
      setTimeout(() => alert("Resume imported successfully!"), 100);
    } catch (err) {
      console.error("Import failed:", err);
      alert("Failed to import resume. Please check if backend is running.");
    } finally {
      setImporting(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

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
        margin: 0,
        filename,
        image: { type: "jpeg", quality: 0.95 },
        html2canvas: { 
          scale: 2, 
          useCORS: true, 
          letterRendering: true, 
          width: 794,
          windowWidth: 794,
          logging: false
        },
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

  const handleExportWord = async () => {
    setExportingWord(true);
    try {
      const { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } = await import("docx");
      const { saveAs } = (await import("file-saver")).default as any;

      const doc = new Document({
        sections: [{
          properties: {},
          children: [
            // Header Content
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({ text: resumeData.personalInfo.fullName || "Your Name", bold: true, size: 48 }),
              ],
            }),
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({ text: resumeData.personalInfo.jobTitle || "", size: 28, color: "666666" }),
              ],
            }),
            new Paragraph({
              alignment: AlignmentType.CENTER,
              spacing: { before: 200, after: 400 },
              children: [
                new TextRun({ text: `${resumeData.personalInfo.email} | ${resumeData.personalInfo.phone} | ${resumeData.personalInfo.location}`, size: 20 }),
              ],
            }),

            // Summary
            ...(resumeData.summary ? [
              new Paragraph({ text: "PROFESSIONAL SUMMARY", heading: HeadingLevel.HEADING_1 }),
              new Paragraph({ children: [new TextRun({ text: resumeData.summary, size: 22 })], spacing: { after: 300 } })
            ] : []),

            // Experience
            new Paragraph({ text: "WORK EXPERIENCE", heading: HeadingLevel.HEADING_1 }),
            ...resumeData.workExperience.flatMap(exp => [
              new Paragraph({
                children: [
                  new TextRun({ text: exp.role, bold: true, size: 24 }),
                  new TextRun({ text: `\t${exp.startDate} - ${exp.endDate || "Present"}`, bold: true }),
                ],
              }),
              new Paragraph({
                children: [new TextRun({ text: exp.company, italics: true, color: "444444" })],
              }),
              ...exp.bullets.map(bullet => new Paragraph({
                text: bullet,
                bullet: { level: 0 }
              })),
              new Paragraph({ text: "", spacing: { after: 200 } })
            ]),

            // Education
            new Paragraph({ text: "EDUCATION", heading: HeadingLevel.HEADING_1 }),
            ...resumeData.education.flatMap(edu => [
              new Paragraph({
                children: [
                  new TextRun({ text: edu.institution, bold: true, size: 24 }),
                  new TextRun({ text: `\t${edu.startDate} - ${edu.endDate || "Present"}`, bold: true }),
                ],
              }),
              new Paragraph({ children: [new TextRun({ text: `${edu.degree} in ${edu.field}` })] }),
              new Paragraph({ text: "", spacing: { after: 200 } })
            ]),

            // Skills
            new Paragraph({ text: "SKILLS", heading: HeadingLevel.HEADING_1 }),
            ...resumeData.skillGroups.map(group => 
              new Paragraph({
                children: [
                  new TextRun({ text: `${group.category}: `, bold: true }),
                  new TextRun({ text: group.skills.join(", ") }),
                ]
              })
            ),
          ],
        }],
      });

      const blob = await Packer.toBlob(doc);
      const filename = resumeTitle ? `${resumeTitle.replace(/\s+/g, "_")}.docx` : "resume.docx";
      saveAs(blob, filename);
    } catch (err) {
      console.error("Word export failed:", err);
      alert("Word export failed. Please try again.");
    } finally {
      setExportingWord(false);
    }
  };

  const completionMap = getCompletionMap(resumeData);

  return (
    <div className="h-screen flex flex-col bg-[#F9F9F8]">
      {/* Aesthetic Minimal Header */}
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
          
          {/* Action Icons Bar */}
          <div className="flex items-center gap-1.5 p-1 bg-gray-50/50 rounded-xl border border-gray-100">
            {/* Import */}
            <button 
              onClick={() => fileInputRef.current?.click()} 
              disabled={importing}
              title="Import CV"
              className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-white hover:shadow-sm rounded-lg transition-all disabled:opacity-50"
            >
              <HugeiconsIcon icon={DashboardSquare01Icon} size={18} className={importing ? "animate-pulse" : ""} />
            </button>

            {/* AI Suggest (Placeholder action for aesthetic) */}
            <button 
              title="AI Suggestions"
              className="p-2 text-gray-500 hover:text-purple-600 hover:bg-white hover:shadow-sm rounded-lg transition-all"
            >
              <HugeiconsIcon icon={SparklesIcon} size={18} />
            </button>

            <div className="w-px h-4 bg-gray-200 mx-1" />

            {/* Save */}
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
              className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-gray-700 bg-white border border-gray-200 rounded-xl hover:border-indigo-200 hover:text-indigo-600 transition-all shadow-sm active:scale-95 disabled:opacity-50"
            >
              <HugeiconsIcon icon={FileDownloadIcon} size={14} className={exporting ? "animate-bounce" : ""} />
              {exporting ? "Exporting..." : "PDF"}
            </button>
            <button 
              onClick={handleExportWord} 
              disabled={exportingWord}
              className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 active:scale-95 disabled:opacity-50"
            >
              <HugeiconsIcon icon={FileAttachmentIcon} size={14} className={exportingWord ? "animate-bounce" : ""} />
              {exportingWord ? "Preparing..." : "Word"}
            </button>
          </div>
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
