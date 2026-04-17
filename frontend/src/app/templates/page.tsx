'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { resumeApi } from '@/lib/api';
import { TemplateConfig } from '@/lib/templateTypes';
import { useRouter } from 'next/navigation';
import { SELECTED_TEMPLATE_KEY } from '@/lib/resumeDraft';
import { MinimalistCard } from '@/components/ui/MinimalistCard';
import { CreativeCard } from '@/components/ui/CreativeCard';
import { ATSCard } from '@/components/ui/ATSCard';
import { ExecutiveCard } from '@/components/ui/ExecutiveCard';
import { CurrentCard } from '@/components/ui/CurrentCard';
import { VibrantCard } from '@/components/ui/VibrantCard';

const CATEGORIES = ['All', 'Creative', 'Corporate', 'Tech', 'Minimalist', 'Modern', 'ATS-Friendly'] as const;
type Category = typeof CATEGORIES[number];

export default function TemplateGallery() {
  const [templates, setTemplates] = useState<TemplateConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<Category>('All');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    resumeApi.getTemplates().then((data) => {
      setTemplates(data);
      setLoading(false);
    });
  }, []);

  const counts = useMemo(() => {
    return CATEGORIES.reduce<Record<Category, number>>((acc, category) => {
      acc[category] = category === 'All' ? templates.length : templates.filter((t) => t.category === category).length;
      return acc;
    }, {} as Record<Category, number>);
  }, [templates]);

  const visibleTemplates = useMemo(
    () => templates.filter((t) => activeFilter === 'All' || t.category === activeFilter),
    [templates, activeFilter]
  );

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };

  const item = {
    hidden: { opacity: 0, scale: 0.96, y: 10 },
    show: { opacity: 1, scale: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-transparent pt-24 px-4 pb-20">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <span className="inline-flex px-4 py-1.5 bg-white/80 border border-indigo-100 rounded-full text-xs font-black uppercase tracking-[0.25em] text-indigo-700 shadow-sm mb-5">
            Template Library
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter text-gray-900 mb-4">
            Pick a layout that fits your story.
          </h1>
          <p className="text-base sm:text-xl text-gray-600 font-medium leading-relaxed">
            Browse clean, polished templates. Start fast, then tune the details inside builder.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-10 sm:mb-14">
          {CATEGORIES.map((category) => {
            const isActive = activeFilter === category;
            return (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-full font-bold text-xs sm:text-sm transition-all duration-200 border ${
                  isActive
                    ? 'bg-gray-900 text-white border-gray-900 shadow-lg shadow-gray-200'
                    : 'bg-white/80 text-gray-600 border-white hover:border-indigo-100 hover:text-indigo-700 hover:bg-indigo-50/60'
                }`}
              >
                <span>{category}</span>
                <span className={`flex items-center justify-center min-w-5 h-5 px-1 rounded-full text-[10px] ${isActive ? 'bg-white/15 text-white' : 'bg-indigo-50 text-indigo-500'}`}>
                  {counts[category]}
                </span>
              </button>
            );
          })}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-[460px] bg-white/80 rounded-[32px] animate-pulse shadow-sm border border-white" />
            ))}
          </div>
        ) : (
          <>
            {visibleTemplates.length === 0 ? (
              <div className="max-w-xl mx-auto text-center py-20">
                <p className="text-xl font-black text-gray-900 mb-2">No templates here.</p>
                <p className="text-gray-500">Try another filter.</p>
              </div>
            ) : (
              <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
              >
                {visibleTemplates.map((template) => {
                  const isSelected = selectedId === template.id;
                  const handleSelect = (e: React.MouseEvent) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setSelectedId(template.id);
                    localStorage.setItem(SELECTED_TEMPLATE_KEY, template.id);
                    router.push('/builder');
                  };

                  return (
                    <motion.div
                      key={template.id}
                      variants={item}
                      className="w-full cursor-pointer"
                      onClick={handleSelect}
                    >
                      {template.id === 'minimal' ? (
                        <MinimalistCard isSelected={isSelected} />
                      ) : template.id === 'modern' ? (
                        <CreativeCard isSelected={isSelected} />
                      ) : template.id === 'ats' ? (
                        <ATSCard isSelected={isSelected} />
                      ) : template.id === 'executive' ? (
                        <ExecutiveCard isSelected={isSelected} />
                      ) : template.id === 'current' ? (
                        <CurrentCard isSelected={isSelected} />
                      ) : (
                        <VibrantCard isSelected={isSelected} />
                      )}
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
