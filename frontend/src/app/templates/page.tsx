// frontend/app/templates/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { HugeiconsIcon } from '@hugeicons/react';
import { Search01Icon, FilterIcon, SparklesIcon, Tick01Icon } from '@hugeicons/core-free-icons';
import { resumeApi } from '@/lib/api';
import { TemplateConfig } from '@/lib/types';
import { Sticker } from '@/components/ui/Sticker';
import { MinimalistCard } from '@/components/ui/MinimalistCard';
import { CreativeCard } from '@/components/ui/CreativeCard';
import { ATSCard } from '@/components/ui/ATSCard';
import { ExecutiveCard } from '@/components/ui/ExecutiveCard';
import { AcademicCard } from '@/components/ui/AcademicCard';
import { TechCard } from '@/components/ui/TechCard';
import { useRouter } from 'next/navigation';

const CATEGORIES = ['All', 'Creative', 'Academic', 'Corporate', 'Tech', 'Minimalist', 'ATS-Friendly'] as const;
type Category = typeof CATEGORIES[number];

export default function TemplateGallery() {
  const [templates, setTemplates] = useState<TemplateConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<Category>('All');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const router = useRouter();

  // Calculate counts based on categories
  const getCount = (category: Category) => {
    if (category === 'All') return templates.length;
    return templates.filter(t => t.category === category).length;
  };

  useEffect(() => {
    resumeApi.getTemplates().then((data: any) => {
      setTemplates(data);
      setLoading(false);
    });
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, scale: 0.9 },
    show: { opacity: 1, scale: 1 }
  };

  return (
    <div className="min-h-screen bg-transparent pt-24 px-4 pb-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="text-center md:text-left w-full">
            <h1 className="text-6xl font-black tracking-tighter text-gray-900 mb-4">Resume Template <span className="text-indigo-600">Gallery</span></h1>
            <p className="text-xl text-gray-500 font-medium">Browse handcrafted resume templates for every profession. Customizable and free.</p>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {CATEGORIES.map((p) => {
            const isActive = activeFilter === p;
            const count = getCount(p);

            return (
              <button
                key={p}
                onClick={() => setActiveFilter(p)}
                className={`flex items-center gap-2.5 px-8 py-3 rounded-full font-bold text-xs transition-all duration-300 ${isActive
                  ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-100 scale-105'
                  : 'bg-white border border-gray-100 text-gray-500 hover:border-indigo-100 hover:text-indigo-600 hover:bg-indigo-50/10'
                  }`}
              >
                <span>{p}</span>
                <span className={`flex items-center justify-center w-5 h-5 rounded-full text-[10px] transform transition-colors duration-300 ${isActive
                  ? 'bg-white/20 text-white'
                  : 'bg-indigo-50 text-indigo-400'
                  }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="h-[500px] bg-white rounded-[32px] animate-pulse shadow-sm" />
            ))}
          </div>
        ) : (
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
          >
            {templates
              .filter(t => activeFilter === 'All' || t.category === activeFilter)
              .map((template) => {
                const isSelected = selectedId === template.id;
                const handleSelect = () => {
                  setSelectedId(template.id);
                  // Map 'ats-friendly' to 'ats' for the builder state
                  const templateKey = template.id === 'ats-friendly' ? 'ats' : template.id;
                  localStorage.setItem('selectedTemplate', templateKey);
                  router.push('/builder');
                };

                return (
                  <motion.div key={template.id} variants={item} className="w-full">
                    <div onClick={handleSelect} className="w-full">
                      {template.id === 'minimal' ? (
                        <MinimalistCard isSelected={isSelected} />
                      ) : template.id === 'modern' ? (
                        <CreativeCard isSelected={isSelected} />
                      ) : template.id === 'ats-friendly' ? (
                        <ATSCard isSelected={isSelected} />
                      ) : template.id === 'executive' ? (
                        <ExecutiveCard isSelected={isSelected} />
                      ) : template.id === 'academic' ? (
                        <AcademicCard isSelected={isSelected} />
                      ) : template.id === 'tech' ? (
                        <TechCard isSelected={isSelected} />
                      ) : (
                        <div
                          className={`group relative bg-white border rounded-[32px] p-4 transition-all cursor-pointer hover:shadow-2xl hover:shadow-indigo-50 ${isSelected ? 'border-indigo-600 ring-4 ring-indigo-600/5 bg-indigo-50/10' : 'border-gray-100 hover:border-indigo-100'
                            }`}
                        >
                          <div className="relative aspect-[3/4] bg-gray-50 rounded-[24px] overflow-hidden mb-6 border-2 border-gray-50">
                            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center text-gray-300">
                              <HugeiconsIcon icon={SparklesIcon} size={48} className="mb-4 opacity-50" />
                              <span className="font-black uppercase tracking-tighter text-2xl">{template.name}</span>
                            </div>
                          </div>
                          <div className="px-2">
                             <h3 className="text-lg font-semibold text-slate-900 tracking-tight font-sans">{template.name}</h3>
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
          </motion.div>
        )}
      </div>
    </div>
  );
}
