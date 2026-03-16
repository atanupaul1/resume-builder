// frontend/app/templates/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { HugeiconsIcon } from '@hugeicons/react';
import { Search01Icon, FilterIcon, SparklesIcon } from '@hugeicons/core-free-icons';
import { resumeApi } from '@/lib/api';
import { TemplateConfig } from '@/lib/types';
import { Sticker } from '@/components/ui/Sticker';
import { useRouter } from 'next/navigation';

export default function TemplateGallery() {
  const [templates, setTemplates] = useState<TemplateConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

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
    <div className="min-h-screen bg-gray-50 pt-24 px-4 pb-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <h1 className="text-5xl font-black tracking-tighter text-gray-900 mb-4">Choose your <span className="text-indigo-600">vibe.</span></h1>
            <p className="text-gray-500 font-medium">Pick a template to start building. You can change this later.</p>
          </div>
          
          <div className="flex gap-4">
            <div className="relative group">
              <HugeiconsIcon icon={Search01Icon} size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600" />
              <input 
                type="text" 
                placeholder="Search templates..." 
                className="pl-12 pr-4 py-3 bg-white border border-gray-100 rounded-2xl w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-all font-medium"
              />
            </div>
            <button className="p-3 bg-white border border-gray-100 rounded-2xl text-gray-400 hover:text-indigo-600">
              <HugeiconsIcon icon={FilterIcon} size={20} />
            </button>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-3 mb-12">
          {['All', 'Minimal', 'Modern', 'Creative', 'ATS-Friendly'].map((p, i) => (
            <button key={p} className={`px-6 py-2 rounded-full font-bold text-xs uppercase tracking-widest transition-all ${i === 0 ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'bg-white border border-gray-100 text-gray-400 hover:border-indigo-100 hover:text-indigo-600'}`}>
              {p}
            </button>
          ))}
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-[400px] bg-white rounded-[32px] animate-pulse" />
            ))}
          </div>
        ) : (
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {templates.map((template) => (
              <motion.div 
                key={template.id} 
                variants={item}
                whileHover={{ y: -10 }}
                className="group relative bg-white border border-gray-100 rounded-[32px] p-4 transition-all hover:shadow-2xl hover:shadow-indigo-50"
              >
                {/* Popular Badge */}
                {template.id === 'minimal' && (
                  <div className="absolute -top-10 -right-8 z-20 pointer-events-none transform hover:scale-110 transition-transform">
                     <Sticker pack="yippy" scene="celebrate" size={140} rotate={10} />
                  </div>
                )}

                <div className="relative aspect-[3/4] bg-gray-50 rounded-[24px] overflow-hidden mb-6 border-2 border-gray-50 group-hover:border-indigo-100 transition-colors">
                  {/* Thumbnail Placeholder */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center text-gray-300">
                    <HugeiconsIcon icon={SparklesIcon} size={48} className="mb-4 opacity-50" />
                    <span className="font-black uppercase tracking-tighter text-2xl">{template.name}</span>
                  </div>
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-indigo-600/0 group-hover:bg-indigo-600/10 transition-colors flex items-center justify-center">
                    <button 
                      onClick={() => router.push('/builder')}
                      className="px-8 py-3 bg-white text-indigo-600 rounded-xl font-bold opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all shadow-xl active:scale-95"
                    >
                      Use this template
                    </button>
                  </div>
                </div>

                <div className="px-2">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-black tracking-tight text-gray-900">{template.name}</h3>
                    <div className="flex gap-1">
                      {template.colorScheme.map((c: string) => (
                        <div key={c} className="w-3 h-3 rounded-full border border-gray-100" style={{ backgroundColor: c }} />
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    <span>{template.layout}</span>
                    <span className="w-1 h-1 rounded-full bg-gray-200" />
                    <span>{template.fontPair}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
