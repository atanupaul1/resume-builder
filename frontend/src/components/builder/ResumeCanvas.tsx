"use client";
import { ResumeData } from "@/types/resume";
import MinimalTemplate from "@/components/templates/MinimalTemplate";
import ModernTemplate from "@/components/templates/ModernTemplate";
import ATSTemplate from "@/components/templates/ATSTemplate";
import ExecutiveTemplate from "@/components/templates/ExecutiveTemplate";
import AcademicTemplate from "@/components/templates/AcademicTemplate";
import TechTemplate from "@/components/templates/TechTemplate";
import GlassmorphismTemplate from "@/components/templates/GlassmorphismTemplate";
import PortfolioTemplate from "@/components/templates/PortfolioTemplate";
import TimelineTemplate from "@/components/templates/TimelineTemplate";
import CompactTemplate from "@/components/templates/CompactTemplate";
import NewspaperTemplate from "@/components/templates/NewspaperTemplate";
import SkillBasedTemplate from "@/components/templates/SkillBasedTemplate";
import ContemporaryTemplate from "@/components/templates/ContemporaryTemplate";
import EssentialTemplate from "@/components/templates/EssentialTemplate";
import PolishedTemplate from "@/components/templates/PolishedTemplate";
import CurrentTemplate from "@/components/templates/CurrentTemplate";
import ElegantTemplate from "@/components/templates/ElegantTemplate";
import IndigoTemplate from "@/components/templates/IndigoTemplate";
import CrispTemplate from "@/components/templates/CrispTemplate";
import ProfessionalTemplate from "@/components/templates/ProfessionalTemplate";
import AvantGardeTemplate from "@/components/templates/AvantGardeTemplate";
import CreativeTemplate from "@/components/templates/CreativeTemplate";
import IconicTemplate from "@/components/templates/IconicTemplate";

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
            {data.template === "glassmorphism" && <GlassmorphismTemplate data={data} />}
            {data.template === "portfolio" && <PortfolioTemplate data={data} />}
            {data.template === "timeline" && <TimelineTemplate data={data} />}
            {data.template === "compact" && <CompactTemplate data={data} />}
            {data.template === "newspaper" && <NewspaperTemplate data={data} />}
            {data.template === "skill-based" && <SkillBasedTemplate data={data} />}
            {data.template === "contemporary" && <ContemporaryTemplate data={data} />}
            {data.template === "essential" && <EssentialTemplate data={data} />}
            {data.template === "polished" && <PolishedTemplate data={data} />}
            {data.template === "current" && <CurrentTemplate data={data} />}
            {data.template === "elegant" && <ElegantTemplate data={data} />}
            {data.template === "indigo" && <IndigoTemplate data={data} />}
            {data.template === "crisp" && <CrispTemplate data={data} />}
            {data.template === "professional" && <ProfessionalTemplate data={data} />}
            {data.template === "avant-garde" && <AvantGardeTemplate data={data} />}
            {data.template === "creative" && <CreativeTemplate data={data} />}
            {data.template === "iconic" && <IconicTemplate data={data} />}
          </>
        )}
      </div>
    </div>
  );
}
