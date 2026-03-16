// frontend/components/resume/ResumePreview.tsx
'use client';

import React from 'react';
import { useResumeStore } from '@/lib/resumeStore';
import { ResumeSection } from '@/lib/types';
import { motion } from 'framer-motion';

const SectionRenderer: React.FC<{ section: ResumeSection; theme: any }> = ({ section, theme }) => {
  // Simplistic rendering for the preview
  return (
    <div className="mb-6">
      <h3 
        className="text-lg font-bold border-b mb-2" 
        style={{ color: theme.primaryColor, borderColor: '#eee', fontFamily: theme.fontFamily }}
      >
        {section.title}
      </h3>
      <div 
        className="text-gray-700 whitespace-pre-wrap"
        style={{ fontSize: theme.fontSize, lineHeight: '1.6' }}
      >
        {section.content}
      </div>
    </div>
  );
};

export const ResumePreview = () => {
  const { resume, selectedSectionId } = useResumeStore();
  const { theme, sections } = resume;

  return (
    <div className="bg-white shadow-2xl overflow-hidden relative origin-top">
      {/* A4 Aspect Ratio Container: 595px x 842px at 72dpi */}
      <div 
        className="w-[595px] min-h-[842px] bg-white p-[40px] shadow-inner flex flex-col"
        style={{ fontFamily: theme.fontFamily }}
      >
        {/* Header */}
        <div className="mb-8 border-b-4 pb-4" style={{ borderColor: theme.primaryColor }}>
          <h1 className="text-4xl font-black uppercase tracking-tighter mb-1" style={{ color: theme.primaryColor }}>
            {resume.title || 'Untitled Resume'}
          </h1>
          <div className="flex gap-4 text-xs text-gray-500 font-bold uppercase tracking-widest">
            <span>AI Powered</span>
            <span>Professional Resume</span>
          </div>
        </div>

        {/* Sections */}
        <div className="flex-1">
          {sections.sort((a: any, b: any) => a.order - b.order).map((section: any) => (
            <div 
              key={section.id}
              className={`transition-all ${selectedSectionId === section.id ? 'ring-2 ring-indigo-500 ring-offset-8 rounded-sm' : ''}`}
            >
              <SectionRenderer section={section} theme={theme} />
            </div>
          ))}

          {sections.length === 0 && (
            <div className="flex flex-col items-center justify-center h-[400px] border-2 border-dashed border-gray-100 rounded-xl">
              <span className="text-gray-300 font-bold uppercase tracking-widest">A4 Preview Area</span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-8 pt-4 border-t border-gray-100 flex justify-between items-center text-[10px] text-gray-400 font-medium">
          <span>Crafted with ❤️ by Atanu, Swetasri</span>
          <span>{new Date().toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
};
