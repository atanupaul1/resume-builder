"use client";

import { useState, useEffect, useRef } from "react";
import { ResumeData } from "@/types/resume";
import MinimalTemplate from "@/components/templates/MinimalTemplate";
import ModernTemplate from "@/components/templates/ModernTemplate";
import ATSTemplate from "@/components/templates/ATSTemplate";
import ExecutiveTemplate from "@/components/templates/ExecutiveTemplate";
import CurrentTemplate from "@/components/templates/CurrentTemplate";
import CreativeTemplate from "@/components/templates/CreativeTemplate";

interface Props {
  data: ResumeData;
}

export default function ResumeCanvas({ data }: Props) {
  const [scale, setScale] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current) return;
      const containerWidth = containerRef.current.offsetWidth - 32; // Horizontal padding
      if (containerWidth < 794) {
        setScale(containerWidth / 794);
      } else {
        setScale(1);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const hasAnyContent =
    data.personalInfo.fullName ||
    data.summary ||
    data.workExperience.length > 0 ||
    data.education.length > 0 ||
    data.skillGroups.length > 0;

  return (
    <div ref={containerRef} className="flex-1 overflow-auto flex items-start justify-center py-6 sm:py-8 px-4 sm:px-5 bg-[radial-gradient(circle_at_top,_rgba(163,52,74,0.03),_transparent_35%),linear-gradient(180deg,_#F5EDE2_0%,_#E7D4BB_100%)]">
      <div className="relative origin-top" style={{ transform: `scale(${scale})`, width: "794px" }}>
        <div className="mb-3 flex items-center justify-between px-1">
          <p className="text-[10px] uppercase tracking-[0.25em] text-gray-500 font-black">Preview</p>
          <p className="text-[10px] text-gray-500 font-medium">A4 size</p>
        </div>
        <div className="absolute inset-0 translate-y-3 blur-2xl bg-slate-300/30 rounded-[28px]" />
        <div
          id="resume-canvas"
          className="bg-white shadow-[0_30px_90px_rgba(15,23,42,0.16)] flex-shrink-0 relative rounded-[14px] overflow-hidden border border-white/80"
          style={{ width: "794px", minHeight: "1123px" }}
        >
          {!hasAnyContent ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
              <div className="w-80 sm:w-96 h-80 sm:h-96 mb-6 flex items-center justify-center">
                <img
                  src="/Nothing-here.png"
                  alt="Empty Canvas"
                  className="w-full h-full object-contain opacity-80 block"
                />
              </div>
              <h3 className="text-gray-800 text-lg font-black tracking-tight">Your canvas is empty</h3>
              <p className="text-gray-500 text-sm mt-2 max-w-xs leading-relaxed">
                Click any section on left to start filling resume and see preview update live.
              </p>
            </div>
          ) : (
            <>
              {(() => {
                const hidden = data.hiddenSections || [];
                const filteredData: ResumeData = {
                  ...data,
                  sectionOrder: data.sectionOrder.filter((k) => !hidden.includes(k)),
                  personalInfo: hidden.includes("personalInfo") ? { fullName: "", email: "", phone: "", location: "", linkedin: "", website: "", github: "", jobTitle: "", customFields: [] } : data.personalInfo,
                  summary: hidden.includes("summary") ? "" : data.summary,
                  workExperience: hidden.includes("workExperience") ? [] : data.workExperience,
                  education: hidden.includes("education") ? [] : data.education,
                  skillGroups: hidden.includes("skills") ? [] : data.skillGroups,
                };
                return (
                  <>
                    {filteredData.template === "minimal" && <MinimalTemplate data={filteredData} />}
                    {filteredData.template === "modern" && <ModernTemplate data={filteredData} />}
                    {filteredData.template === "ats" && <ATSTemplate data={filteredData} />}
                    {filteredData.template === "executive" && <ExecutiveTemplate data={filteredData} />}
                    {filteredData.template === "current" && <CurrentTemplate data={filteredData} />}
                    {filteredData.template === "creative" && <CreativeTemplate data={filteredData} />}
                  </>
                );
              })()}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
