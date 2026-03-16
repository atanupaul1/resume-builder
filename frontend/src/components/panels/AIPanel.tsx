// frontend/components/panels/AIPanel.tsx
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HugeiconsIcon } from '@hugeicons/react';
import { 
  SparklesIcon, 
  Copy01Icon, 
  CheckmarkCircle02Icon,
  AiChat01Icon,
  InformationCircleIcon,
  ArrowRight01Icon
} from '@hugeicons/core-free-icons';
import { useResumeStore } from '@/lib/resumeStore';
import { aiApi } from '@/lib/api';
import { AIResponse } from '@/lib/types';
import { Sticker } from '../ui/Sticker';

export const AIPanel = () => {
  const { 
    selectedSectionId, 
    resume, 
    updateSection, 
    isAIPanelOpen, 
    toggleAIPanel 
  } = useResumeStore();
  
  const [loading, setLoading] = useState(false);
  const [suggestion, setSuggestion] = useState<AIResponse | null>(null);

  const selectedSection = resume.sections.find((s: any) => s.id === selectedSectionId);

  const handleEnhance = async () => {
    if (!selectedSection) return;
    
    setLoading(true);
    try {
      const response = await aiApi.enhance({
        sectionId: selectedSection.id,
        sectionType: selectedSection.type,
        content: selectedSection.content,
      });
      setSuggestion(response);
    } catch (error) {
      console.error("Failed to enhance section:", error);
    } finally {
      setLoading(false);
    }
  };

  const applySuggestion = (text: string) => {
    if (selectedSectionId) {
      updateSection(selectedSectionId, { content: text });
      setSuggestion(null);
    }
  };

  if (!isAIPanelOpen) return null;

  return (
    <motion.div
      initial={{ x: 320, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 320, opacity: 0 }}
      className="w-[320px] border-l border-gray-100 bg-white h-full fixed right-0 top-0 z-50 shadow-2xl flex flex-col"
    >
      <div className="p-4 border-b border-gray-50 flex items-center justify-between bg-indigo-50/30">
        <div className="flex items-center gap-2 text-indigo-600 font-bold">
          <HugeiconsIcon icon={SparklesIcon} size={20} />
          <span>AI Assistant</span>
        </div>
        <button 
          onClick={() => toggleAIPanel(false)}
          className="p-1 hover:bg-white rounded-md transition-colors"
        >
          <HugeiconsIcon icon={ArrowRight01Icon} size={20} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {!selectedSection ? (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
            <Sticker pack="ven" scene="faq" size={140} />
            <p className="text-sm text-gray-500">Select a section to get AI suggestions</p>
          </div>
        ) : (
          <>
            <div>
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Current Section</h4>
              <div className="p-3 bg-gray-50 rounded-xl text-sm text-gray-600 line-clamp-3 italic">
                "{selectedSection.content || 'No content yet...'}"
              </div>
            </div>

            <button
              onClick={handleEnhance}
              disabled={loading || !selectedSection.content}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-200 text-white rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg shadow-indigo-100 transition-all active:scale-95"
            >
              {loading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                >
                  <HugeiconsIcon icon={SparklesIcon} size={18} />
                </motion.div>
              ) : (
                <HugeiconsIcon icon={AiChat01Icon} size={18} />
              )}
              {loading ? 'Thinking...' : 'Enhance with AI'}
            </button>

            <AnimatePresence>
              {loading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center py-8"
                >
                  <Sticker pack="yippy" scene="thinking" size={100} className="mb-4" />
                  <p className="text-xs text-indigo-600 font-medium animate-pulse">Consulting career experts...</p>
                </motion.div>
              )}

              {suggestion && !loading && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  {/* Score Badge */}
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
                    <span className="text-xs font-bold text-gray-500 uppercase">Optimization Score</span>
                    <span className={`text-lg font-black ${
                      suggestion.score >= 70 ? 'text-green-500' : suggestion.score >= 40 ? 'text-amber-500' : 'text-red-500'
                    }`}>
                      {suggestion.score}%
                    </span>
                  </div>

                  {/* Improved Version */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Recommended</span>
                      <button 
                        onClick={() => applySuggestion(suggestion.improved)}
                        className="text-[10px] font-bold text-indigo-600 flex items-center gap-1 hover:underline"
                      >
                        <HugeiconsIcon icon={CheckmarkCircle02Icon} size={14} />
                        Apply
                      </button>
                    </div>
                    <div className="p-4 bg-indigo-50/50 border border-indigo-100 rounded-xl text-sm leading-relaxed text-indigo-900 font-medium">
                      {suggestion.improved}
                    </div>
                  </div>

                  {/* Keywords */}
                  {suggestion.missingKeywords.length > 0 && (
                    <div className="space-y-2">
                       <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Keywords to add</span>
                       <div className="flex flex-wrap gap-2">
                         {suggestion.missingKeywords.map((kw: string) => (
                           <span key={kw} className="px-2 py-1 bg-green-50 text-green-700 text-[10px] font-bold rounded-lg border border-green-100 uppercase">
                             +{kw}
                           </span>
                         ))}
                       </div>
                    </div>
                  )}

                  {/* Alternatives */}
                   <div className="space-y-3">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Alternatives</span>
                    {suggestion.alternatives.map((alt: string, i: number) => (
                      <div key={i} className="group relative p-3 bg-white border border-gray-100 rounded-xl text-[13px] text-gray-600 hover:border-indigo-200 transition-colors">
                        {alt}
                        <button 
                          onClick={() => {
                            navigator.clipboard.writeText(alt);
                          }}
                          className="absolute bottom-2 right-2 p-1.5 opacity-0 group-hover:opacity-100 bg-indigo-50 text-indigo-600 rounded-lg transition-all"
                        >
                          <HugeiconsIcon icon={Copy01Icon} size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </div>

      <div className="p-4 bg-gray-50 border-t border-gray-100">
        <div className="flex items-center gap-2 text-gray-400">
          <HugeiconsIcon icon={InformationCircleIcon} size={16} />
          <span className="text-[10px]">AI-generated content should be reviewed.</span>
        </div>
      </div>
    </motion.div>
  );
};
