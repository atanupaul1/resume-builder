"use client";
import { ResumeData } from "@/types/resume";
import MinimalTemplate from "@/components/templates/MinimalTemplate";
import ModernTemplate from "@/components/templates/ModernTemplate";
import ATSTemplate from "@/components/templates/ATSTemplate";

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
    <div className="flex-1 bg-[#f0ede6] overflow-auto flex items-start justify-center py-8 px-4">
      {/* A4 paper */}
      <div
        id="resume-canvas"
        className="bg-white shadow-2xl flex-shrink-0 relative"
        style={{ width: "794px", minHeight: "1123px" }}
      >
        {!hasAnyContent ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
            <div className="w-64 h-64 mb-4 flex items-center justify-center">
              <img
                src="/Nothing-here.png"
                alt="Empty Canvas"
                className="w-full h-full object-contain opacity-70 block"
              />
            </div>
            <h3 className="text-gray-400 font-sans text-sm font-medium">Your canvas is empty</h3>
            <p className="text-gray-300 font-sans text-xs mt-1">
              Click any section on the left to start filling in your resume
            </p>
          </div>
        ) : (
          <>
            {data.template === "minimal" && <MinimalTemplate data={data} />}
            {data.template === "modern"  && <ModernTemplate data={data} />}
            {data.template === "ats"     && <ATSTemplate data={data} />}
          </>
        )}
      </div>
    </div>
  );
}
