// frontend/src/components/canvas/ATSScoreWidget.tsx
'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, Zap, Info, X, CheckCircle2, Briefcase, Type } from 'lucide-react';
import { useResumeStore } from '@/lib/resumeStore';

export const ATSScoreWidget = () => {
  const { resume } = useResumeStore();
  const [isOpen, setIsOpen] = useState(false);
  const [lastScore, setLastScore] = useState(0);

  // Simple heuristic for ATS score calculation
  const { score, tips } = useMemo(() => {
    let currentScore = 15; // Base score
    const currentTips = [];

    const hasSkills = resume.sections.some(s => s.type === 'skills');
    const hasExperience = resume.sections.some(s => s.type === 'experience');
    const hasSummary = resume.sections.some(s => s.type === 'summary');
    const hasEducation = resume.sections.some(s => s.type === 'education');

    if (hasSkills) {
      currentScore += 20;
    } else {
      currentTips.push({ text: "Add a 'Skills' section", points: 20, icon: <Zap size={14} className="text-yellow-500" /> });
    }

    if (hasExperience) {
      currentScore += 15;
      // Check for content length or keywords in experience
      const expContent = resume.sections.filter(s => s.type === 'experience').map(s => s.content).join(' ');
      if (expContent.length > 100) {
          currentScore += 10;
      } else {
          currentTips.push({ text: "Expand experience details", points: 10, icon: <Target size={14} className="text-indigo-500" /> });
      }
      
      // Look for numbers (quantifying results)
      if (/\d+/.test(expContent)) {
          currentScore += 10;
      } else {
          currentTips.push({ text: "Quantify results with numbers", points: 10, icon: <CheckCircle2 size={14} className="text-green-500" /> });
      }
    } else {
      currentTips.push({ text: "Add Work Experience", points: 15, icon: <Briefcase size={14} className="text-indigo-500" /> });
    }

    if (hasSummary) {
      currentScore += 10;
    } else {
      currentTips.push({ text: "Add a Professional Summary", points: 10, icon: <Type size={14} className="text-blue-500" /> });
    }

    if (hasEducation) {
        currentScore += 10;
    }

    // Limit to 100
    currentScore = Math.min(currentScore, 100);

    return { score: currentScore, tips: currentTips };
  }, [resume.sections]);

  useEffect(() => {
    if (score !== lastScore) {
      setLastScore(score);
    }
  }, [score]);

  const size = 64;
  const strokeWidth = 5;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 translate-x-[-150px]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            className="w-72 bg-white/90 backdrop-blur-xl border border-slate-200 rounded-3xl shadow-2xl p-5 mb-2 overflow-hidden"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Target size={16} className="text-indigo-600" />
                <h4 className="font-bold text-slate-900 text-sm">Optimization Tips</h4>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-slate-100 rounded-full transition-colors"
              >
                <X size={14} className="text-slate-400" />
              </button>
            </div>

            <div className="space-y-3">
              {tips.length > 0 ? (
                tips.map((tip, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-3 p-3 bg-slate-50/50 border border-slate-100 rounded-2xl group hover:border-indigo-100 transition-all"
                  >
                    <div className="mt-0.5">{tip.icon}</div>
                    <div className="flex-1">
                      <p className="text-[11px] font-bold text-slate-700 leading-tight mb-1">{tip.text}</p>
                      <span className="text-[10px] font-black text-indigo-500">+{tip.points} points</span>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="py-4 text-center">
                   <div className="w-10 h-10 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-2">
                      <CheckCircle2 size={20} />
                   </div>
                   <p className="text-xs font-bold text-slate-900">Your resume is optimized!</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="relative group p-1"
      >
        {/* Glow effect on score change */}
        <motion.div 
          animate={{ 
            opacity: [0, 0.4, 0],
            scale: [1, 1.1, 1]
          }}
          key={score}
          className="absolute inset-0 bg-indigo-400 blur-xl rounded-full"
        />

        <div className="relative w-20 h-20 bg-white/80 backdrop-blur-md border border-slate-100 rounded-full shadow-xl flex items-center justify-center group-hover:border-indigo-200 transition-colors">
          <svg width={size} height={size} className="transform -rotate-90">
            {/* Background Circle */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke="currentColor"
              strokeWidth={strokeWidth}
              fill="transparent"
              className="text-slate-100"
            />
            {/* Progress Circle */}
            <motion.circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke="url(#scoreGradient)"
              strokeWidth={strokeWidth}
              fill="transparent"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: offset }}
              transition={{ type: "spring", stiffness: 60, damping: 15 }}
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F87171" />
                <stop offset="100%" stopColor="#4ADE80" />
              </linearGradient>
            </defs>
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-xl font-black text-slate-900 tracking-tighter leading-none">{score}</span>
            <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest mt-0.5">ATS</span>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 5 }}
            whileHover={{ opacity: 1, y: 0 }}
            className="absolute -top-6 bg-slate-900 text-white text-[9px] font-bold px-2 py-1 rounded-md pointer-events-none whitespace-nowrap"
          >
            Click for Tips
          </motion.div>
        </div>
      </motion.button>
    </div>
  );
};
