"use client";
import { ResumeData } from "@/types/resume";
import MinimalTemplate from "@/components/templates/MinimalTemplate";
import ModernTemplate from "@/components/templates/ModernTemplate";
import ATSTemplate from "@/components/templates/ATSTemplate";
import ExecutiveTemplate from "@/components/templates/ExecutiveTemplate";
import AcademicTemplate from "@/components/templates/AcademicTemplate";
import TechTemplate from "@/components/templates/TechTemplate";

interface Props {
  data: ResumeData;
}

export default function ResumeCanvas({ data }: Props) {
  const hasAnyContent =
    data.personalInfo.fullName ||
    data.summary ||
    data.workExperience.length > 0 ||
    data.education.length > 0 ||
    data.skillGroups.length > 0;

  return (
    <div className="flex-1 bg-[#f3f2f0] overflow-auto flex items-start justify-center py-8 px-4">
      {/* A4 paper */}
      <div
        id="resume-canvas"
        className="bg-white shadow-2xl flex-shrink-0 relative"
        style={{ width: "794px", minHeight: "1123px" }}
      >
        {!hasAnyContent ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
            <div className="w-96 h-96 mb-6 flex items-center justify-center">
              <img
                src="/Nothing-here.png"
                alt="Empty Canvas"
                className="w-full h-full object-contain opacity-80 block"
              />
            </div>
            <h3 className="text-gray-700 font-sans text-lg font-bold">Your canvas is empty</h3>
            <p className="text-gray-500 font-sans text-sm mt-2 max-w-xs">
              Click any section on the left to start filling in your resume and see the magic happen.
            </p>
          </div>
        ) : (
          <>
            {data.template === "minimal" && <MinimalTemplate data={data} />}
            {data.template === "modern"  && <ModernTemplate data={data} />}
            {data.template === "ats"     && <ATSTemplate data={data} />}
            {data.template === "executive" && <ExecutiveTemplate data={data} />}
            {data.template === "academic" && <AcademicTemplate data={data} />}
            {data.template === "tech" && <TechTemplate data={data} />}
          </>
        )}
      </div>
    </div>
  );
}
