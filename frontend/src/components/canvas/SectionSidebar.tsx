// frontend/components/canvas/SectionSidebar.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useResumeStore } from '@/lib/resumeStore';
import { SectionType } from '@/lib/types';
import { DraggableSection } from './DraggableSection';

import { HugeiconsIcon } from '@hugeicons/react';
import { 
  UserCircleIcon, 
  Briefcase01Icon, 
  SchoolIcon, 
  Settings02Icon, 
  TextIcon,
  PlusSignIcon
} from '@hugeicons/core-free-icons';

interface SectionItem {
  type: SectionType;
  label: string;
  icon: React.ReactNode;
  description: string;
}

const SECTION_TEMPLATES: SectionItem[] = [
  { type: 'summary', label: 'Professional Summary', icon: <HugeiconsIcon icon={TextIcon} size={20} />, description: 'Hook recruiters with a 3-sentence intro.' },
  { type: 'experience', label: 'Work Experience', icon: <HugeiconsIcon icon={Briefcase01Icon} size={20} />, description: 'Highlight your roles and achievements.' },
  { type: 'education', label: 'Education', icon: <HugeiconsIcon icon={SchoolIcon} size={20} />, description: 'Degrees, certifications, and academic info.' },
  { type: 'skills', label: 'Skills & Tools', icon: <HugeiconsIcon icon={Settings02Icon} size={20} />, description: 'List your technical and soft skills.' },
  { type: 'contact', label: 'Contact Info', icon: <HugeiconsIcon icon={UserCircleIcon} size={20} />, description: 'Email, phone, and social links.' },
];

export const SectionSidebar = () => {
  const { resume, selectedSectionId, addSection } = useResumeStore();
  const sections = resume.sections;

  const getSectionStats = (type: SectionType) => {
    const typeSections = sections.filter(s => s.type === type);
    const count = typeSections.length;
    const isStarted = count > 0;
    
    let isComplete = false;
    if (type === 'summary') {
      isComplete = typeSections.some(s => (s.content as string).length >= 50);
    } else {
      isComplete = typeSections.length > 0 && typeSections.some(s => (s.content as string).length > 20);
    }

    const isActive = typeSections.some(s => s.id === selectedSectionId);

    return { count, isStarted, isComplete, isActive };
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="w-[260px] flex-shrink-0 border-r border-slate-100 bg-white h-full p-4 overflow-y-auto">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Add Sections</h3>
        <div className="w-5 h-5 bg-indigo-50 rounded flex items-center justify-center">
          <HugeiconsIcon icon={PlusSignIcon} size={12} className="text-indigo-600" />
        </div>
      </div>
      
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="flex flex-col gap-3"
      >
        {SECTION_TEMPLATES.map((section) => {
          const stats = getSectionStats(section.type);
          return (
            <DraggableSection 
              key={section.type}
              type={section.type}
              label={section.label}
              icon={section.icon}
              description={section.description}
              count={stats.count}
              isComplete={stats.isComplete}
              isStarted={stats.isStarted}
              isActive={stats.isActive}
              onClick={() => addSection(section.type)}
            />
          );
        })}
      </motion.div>
    </div>
  );
};
