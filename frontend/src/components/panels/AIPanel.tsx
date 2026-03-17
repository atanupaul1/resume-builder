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
  const [activeTab, setActiveTab] = useState<'write' | 'ai'>('write');

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

      <div className="flex-1 overflow-y-auto flex flex-col">
        {!selectedSection ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-4">
            <Sticker pack="ven" scene="faq" size={140} />
            <p className="text-sm text-gray-500 font-medium">Select a section on the canvas to start building your story.</p>
          </div>
        ) : (
          <>
            {/* Tab Navigation */}
            <div className="flex px-4 pt-4 gap-1 border-b border-gray-50 bg-white sticky top-0 z-10">
              <button 
                onClick={() => setActiveTab('write')}
                className={`px-4 py-2 text-xs font-black uppercase tracking-widest transition-all border-b-2 ${
                  activeTab === 'write' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-400 hover:text-gray-600'
                }`}
              >
                Write
              </button>
              <button 
                onClick={() => setActiveTab('ai')}
                className={`px-4 py-2 text-xs font-black uppercase tracking-widest transition-all border-b-2 flex items-center gap-1.5 ${
                  activeTab === 'ai' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-400 hover:text-gray-600'
                }`}
              >
                <HugeiconsIcon icon={SparklesIcon} size={14} />
                AI Enhance
              </button>
            </div>

            <div className="p-4 flex-1 overflow-y-auto space-y-6">
              <AnimatePresence mode="wait">
                {activeTab === 'write' ? (
                  <motion.div
                    key="write"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="space-y-4"
                  >
                    <div className="space-y-2">
                       <div className="flex items-center justify-between">
                         <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Section Content</h4>
                         <span className="text-[10px] text-gray-300 font-bold uppercase">{selectedSection.type}</span>
                       </div>
                       <textarea
                         value={selectedSection.content || ''}
                         onChange={(e) => updateSection(selectedSection.id, { content: e.target.value })}
                         placeholder={`Compose your ${selectedSection.type} here...`}
                         className="w-full h-80 p-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm text-gray-700 outline-none focus:ring-4 focus:ring-indigo-50 focus:bg-white focus:border-indigo-200 transition-all resize-none shadow-inner"
                       />
                    </div>
                    
                    <div className="p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100/50">
                      <p className="text-[11px] text-indigo-700 font-medium leading-relaxed">
                        <span className="font-black uppercase mr-1">Pro Tip:</span> 
                        Use bullet points to highlight achievements. Switch to the AI Enhance tab if you need help polishing your wording!
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="ai"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="space-y-6"
                  >
                    <button
                      onClick={handleEnhance}
                      disabled={loading || !selectedSection.content}
                      className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-100 disabled:text-gray-400 text-white rounded-2xl font-black text-sm flex items-center justify-center gap-2 shadow-xl shadow-indigo-100 transition-all active:scale-95"
                    >
                      {loading ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                        >
                          <HugeiconsIcon icon={SparklesIcon} size={20} />
                        </motion.div>
                      ) : (
                        <HugeiconsIcon icon={AiChat01Icon} size={20} />
                      )}
                      {loading ? 'Analyzing Content...' : 'Polished with AI'}
                    </button>

                    <AnimatePresence>
                      {loading && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex flex-col items-center py-8"
                        >
                          <Sticker pack="yippy" scene="thinking" size={100} className="mb-4" />
                          <p className="text-xs text-indigo-600 font-black tracking-widest uppercase animate-pulse">Running Gemini 1.5...</p>
                        </motion.div>
                      )}

                      {suggestion && !loading && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="space-y-6"
                        >
                          {/* Score Badge */}
                          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100 shadow-sm">
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">ATS Compatibility</span>
                            <div className="flex items-center gap-2">
                              <span className={`text-xl font-black ${
                                suggestion.score >= 70 ? 'text-green-500' : suggestion.score >= 40 ? 'text-amber-500' : 'text-red-500'
                              }`}>
                                {suggestion.score}%
                              </span>
                            </div>
                          </div>

                          {/* Improved Version */}
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Better Alternative</span>
                              <button 
                                onClick={() => {
                                  applySuggestion(suggestion.improved);
                                  setActiveTab('write');
                                }}
                                className="px-3 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-widest rounded-full hover:bg-indigo-600 hover:text-white transition-all shadow-sm"
                              >
                                Apply Changes
                              </button>
                            </div>
                            <div className="p-5 bg-white border-2 border-indigo-100 rounded-[24px] text-sm leading-relaxed text-gray-800 font-medium shadow-sm relative overflow-hidden">
                              <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500" />
                              {suggestion.improved}
                            </div>
                          </div>

                          {/* Keywords */}
                          {suggestion.missingKeywords.length > 0 && (
                            <div className="space-y-3">
                               <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Stronger Keywords</span>
                               <div className="flex flex-wrap gap-2">
                                 {suggestion.missingKeywords.map((kw: string) => (
                                   <span key={kw} className="px-3 py-1.5 bg-green-50 text-green-700 text-[10px] font-black rounded-xl border border-green-100 uppercase tracking-wide">
                                     +{kw}
                                   </span>
                                 ))}
                               </div>
                            </div>
                          )}

                          {/* Alternatives */}
                           <div className="space-y-3">
                            <div className="flex items-center gap-2">
                              <HugeiconsIcon icon={InformationCircleIcon} size={14} className="text-gray-400" />
                              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">More Variations</span>
                            </div>
                            {suggestion.alternatives.map((alt: string, i: number) => (
                              <div key={i} className="group relative p-4 bg-white border border-gray-100 rounded-2xl text-[13px] text-gray-600 hover:border-indigo-200 transition-all hover:bg-indigo-50/20">
                                {alt}
                                <button 
                                  onClick={() => {
                                    navigator.clipboard.writeText(alt);
                                  }}
                                  className="absolute bottom-3 right-3 p-2 opacity-0 group-hover:opacity-100 bg-white shadow-lg text-indigo-600 rounded-xl transition-all hover:scale-110 active:scale-95"
                                >
                                  <HugeiconsIcon icon={Copy01Icon} size={16} />
                                </button>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
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
