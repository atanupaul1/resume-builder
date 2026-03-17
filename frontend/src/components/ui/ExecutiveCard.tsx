// frontend/components/ui/ExecutiveCard.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Tick01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';

interface ExecutiveCardProps {
  isSelected?: boolean;
}

export const ExecutiveCard = ({ isSelected }: ExecutiveCardProps) => {
  return (
    <motion.div
      whileHover={{
        y: -10,
        boxShadow: "0 25px 50px -12px rgba(30, 58, 138, 0.2)"
      }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className={`group relative w-full aspect-[3/4] rounded-2xl p-4 cursor-pointer transition-all overflow-hidden border-2 ${isSelected
          ? 'border-blue-700 bg-blue-50/10 shadow-blue-100 ring-4 ring-blue-700/5'
          : 'bg-white border-slate-200 hover:border-slate-300'
        }`}
    >
      {/* Success Badge */}
      {isSelected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-4 right-4 z-40 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center shadow-lg border-2 border-white"
        >
          <HugeiconsIcon icon={Tick01Icon} size={14} className="text-white" />
        </motion.div>
      )}

      {/* Graphic Area */}
      <div className="relative w-full h-full rounded-xl overflow-hidden">
        <motion.div
          className="w-full h-full bg-slate-50/10 p-6 flex flex-col gap-6"
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          whileHover={{ scale: 1.05 }}
        >
          {/* Executive Blue Header */}
          <div className="relative -mx-6 -mt-6 mb-4">
            <div className="h-20 bg-blue-900 w-full relative overflow-hidden flex items-center px-6">
               <div className="w-12 h-12 rounded-full border-2 border-white/20 bg-white/10 shimmer" />
               <div className="ml-4 space-y-2">
                 <div className="h-3 w-28 bg-white/30 rounded-full shimmer" />
                 <div className="h-1.5 w-16 bg-white/20 rounded-full shimmer" />
               </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
              <div className="h-2 w-1/4 bg-blue-100 rounded-full shimmer" />
              <div className="space-y-2">
                <div className="h-1.5 w-full bg-slate-100 rounded-full shimmer" />
                <div className="h-1.5 w-full bg-slate-100 rounded-full shimmer" />
                <div className="h-1.5 w-3/4 bg-slate-100 rounded-full shimmer" />
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="h-2 w-1/3 bg-blue-100 rounded-full shimmer" />
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                   <div className="h-2 w-1/2 bg-slate-200 rounded-full shimmer" />
                   <div className="h-1.5 w-12 bg-slate-100 rounded-full shimmer" />
                </div>
                <div className="h-1.5 w-full bg-slate-50 rounded-full shimmer" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Glassmorphism Overlay */}
        <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 group-hover:backdrop-blur-[1px] transition-all duration-400 ease-[0.4,0,0.2,1] z-10" />
      </div>

      {/* Title & Description */}
      <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-white via-white/100 to-transparent pt-12 z-20">
        <h3 className="text-lg font-semibold text-slate-900 tracking-tight font-sans">
          The Executive
        </h3>
        <p className="text-xs text-slate-400 font-medium mt-1">
          Polished, high-level corporate structure.
        </p>
      </div>

      {/* Hover/Active Button */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
        <div className={`px-6 py-2 text-xs font-bold rounded-xl transition-all duration-400 ease-[0.4,0,0.2,1] shadow-xl flex items-center gap-2 ${isSelected
            ? 'bg-blue-600 text-white opacity-100 translate-y-16'
            : 'bg-slate-900 text-white opacity-0 group-hover:opacity-100 transform translate-y-12 group-hover:translate-y-16'
          }`}>
          {isSelected && <HugeiconsIcon icon={Tick01Icon} size={14} />}
          {isSelected ? 'Selected' : 'Use Template'}
        </div>
      </div>

      <style jsx>{`
        .shimmer {
          background: linear-gradient(
            90deg, 
            rgba(255,255,255,0) 25%, 
            rgba(255,255,255,0.1) 50%, 
            rgba(255,255,255,0) 75%
          );
          background-size: 200% 100%;
          animation: shimmer-animation 3s infinite linear;
        }

        @keyframes shimmer-animation {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </motion.div>
  );
};
