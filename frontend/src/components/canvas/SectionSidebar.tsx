// frontend/components/canvas/SectionSidebar.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { HugeiconsIcon } from '@hugeicons/react';
import { 
  UserAccountIcon, 
  WorkHistoryIcon, 
  SchoolIcon, 
  Settings03Icon, 
  TextItalicIcon,
  Add01Icon
} from '@hugeicons/core-free-icons';
import { useResumeStore } from '@/lib/resumeStore';
import { SectionType } from '@/lib/types';

interface SectionItem {
  type: SectionType;
  label: string;
  icon: any;
  description: string;
}

const SECTION_TEMPLATES: SectionItem[] = [
  { type: 'summary', label: 'Professional Summary', icon: TextItalicIcon, description: 'Hook recruiters with a 3-sentence intro.' },
  { type: 'experience', label: 'Work Experience', icon: WorkHistoryIcon, description: 'Highlight your roles and achievements.' },
  { type: 'education', label: 'Education', icon: SchoolIcon, description: 'Degrees, certifications, and academic info.' },
  { type: 'skills', label: 'Skills & Tools', icon: Settings03Icon, description: 'List your technical and soft skills.' },
  { type: 'contact', label: 'Contact Info', icon: UserAccountIcon, description: 'Email, phone, and social links.' },
];

export const SectionSidebar = () => {
  const { addSection } = useResumeStore();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 }
  };

  return (
    <div className="w-[240px] flex-shrink-0 border-r border-gray-100 bg-white h-full p-4 overflow-y-auto">
      <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">Add Sections</h3>
      
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-3"
      >
        {SECTION_TEMPLATES.map((section) => (
          <motion.button
            key={section.type}
            variants={item}
            whileHover={{ scale: 1.02, x: 5 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => addSection(section.type)}
            className="w-full text-left p-3 rounded-xl border border-gray-100 hover:border-indigo-100 hover:bg-indigo-50/50 transition-all group"
          >
            <div className="flex items-center gap-3 mb-1">
              <div className="p-2 bg-gray-50 rounded-lg group-hover:bg-indigo-100 group-hover:text-indigo-600 transition-colors">
                <HugeiconsIcon icon={section.icon} size={20} />
              </div>
              <span className="font-semibold text-gray-900 text-sm">{section.label}</span>
            </div>
            <p className="text-[11px] text-gray-500 leading-tight pl-1">
              {section.description}
            </p>
            <div className="mt-2 flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
              <HugeiconsIcon icon={Add01Icon} size={16} className="text-indigo-600" />
            </div>
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
};
