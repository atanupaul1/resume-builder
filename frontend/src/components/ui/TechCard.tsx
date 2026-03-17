// frontend/components/ui/TechCard.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Tick01Icon, CodeIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';

interface TechCardProps {
  isSelected?: boolean;
}

export const TechCard = ({ isSelected }: TechCardProps) => {
  return (
    <motion.div
      whileHover={{
        y: -10,
        boxShadow: "0 25px 50px -12px rgba(15, 23, 42, 0.3)"
      }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className={`group relative w-full aspect-[3/4] rounded-2xl p-4 cursor-pointer transition-all overflow-hidden border-2 ${isSelected
          ? 'border-slate-900 bg-slate-50/10 shadow-slate-200 ring-4 ring-slate-900/5'
          : 'bg-white border-slate-200 hover:border-slate-300'
        }`}
    >
      {/* Success Badge */}
      {isSelected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-4 right-4 z-40 w-6 h-6 bg-slate-900 rounded-full flex items-center justify-center shadow-lg border-2 border-white"
        >
          <HugeiconsIcon icon={Tick01Icon} size={14} className="text-white" />
        </motion.div>
      )}

      {/* Graphic Area */}
      <div className="relative w-full h-full rounded-xl overflow-hidden flex">
        <motion.div
           className="w-full h-full bg-slate-50/10 p-0 flex"
           transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
           whileHover={{ scale: 1.05 }}
        >
          {/* Tech Dark Sidebar */}
          <div className="w-1/3 h-full bg-slate-900 p-4 flex flex-col gap-4">
             <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center">
                <HugeiconsIcon icon={CodeIcon} size={18} className="text-sky-400" />
             </div>
             <div className="space-y-2 mt-4">
                <div className="h-1.5 w-full bg-slate-800 rounded-full shimmer-dark" />
                <div className="h-1 w-2/3 bg-slate-800 rounded-full shimmer-dark" />
             </div>
             <div className="mt-auto space-y-2">
                <div className="h-1 w-full bg-slate-800 rounded-full shimmer-dark" />
                <div className="h-1 w-4/5 bg-slate-800 rounded-full shimmer-dark" />
             </div>
          </div>

          {/* Main Content Areas */}
          <div className="flex-1 h-full bg-white p-6 space-y-8">
             <div className="space-y-2">
                <div className="h-3 w-1/2 bg-slate-100 rounded-full shimmer" />
                <div className="h-1.5 w-1/3 bg-slate-50 rounded-full shimmer" />
             </div>

             <div className="space-y-4">
                {[1, 2].map(i => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between">
                       <div className="h-2 w-1/3 bg-sky-50 rounded-full shimmer" />
                       <div className="h-1.5 w-12 bg-slate-50 rounded-full shimmer" />
                    </div>
                    <div className="h-1 w-full bg-slate-50 rounded-full shimmer" />
                    <div className="h-1 w-full bg-slate-50 rounded-full shimmer" />
                    <div className="h-1 w-3/4 bg-slate-50 rounded-full shimmer" />
                  </div>
                ))}
             </div>
             
             <div className="grid grid-cols-2 gap-2">
                {[1, 2, 3, 4].map(i => (
                   <div key={i} className="h-4 bg-slate-50 rounded border border-slate-100 shimmer" />
                ))}
             </div>
          </div>
        </motion.div>

        {/* Glassmorphism Overlay */}
        <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 group-hover:backdrop-blur-[1px] transition-all duration-400 ease-[0.4,0,0.2,1] z-10" />
      </div>

      {/* Title & Description */}
      <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-white via-white/100 to-transparent pt-12 z-20">
        <h3 className="text-lg font-semibold text-slate-900 tracking-tight font-sans">
          The Tech
        </h3>
        <p className="text-xs text-slate-400 font-medium mt-1">
          Dark modes and code-friendly layouts.
        </p>
      </div>

      <style jsx>{`
        .shimmer {
          background: linear-gradient(
            90deg, 
            rgba(226, 232, 240, 0) 25%, 
            rgba(226, 232, 240, 0.4) 50%, 
            rgba(226, 232, 240, 0) 75%
          );
          background-size: 200% 100%;
          animation: shimmer-animation 3s infinite linear;
        }

        .shimmer-dark {
          background: linear-gradient(
            90deg, 
            rgba(30, 41, 59, 0) 25%, 
            rgba(51, 65, 85, 0.4) 50%, 
            rgba(30, 41, 59, 0) 75%
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
