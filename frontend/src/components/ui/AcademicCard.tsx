// frontend/components/ui/AcademicCard.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Tick01Icon, School01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';

interface AcademicCardProps {
  isSelected?: boolean;
}

export const AcademicCard = ({ isSelected }: AcademicCardProps) => {
  return (
    <motion.div
      whileHover={{
        y: -10,
        boxShadow: "0 25px 50px -12px rgba(88, 28, 135, 0.2)"
      }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className={`group relative w-full aspect-[3/4] rounded-2xl p-4 cursor-pointer transition-all overflow-hidden border-2 ${isSelected
          ? 'border-purple-600 bg-purple-50/10 shadow-purple-100 ring-4 ring-purple-600/5'
          : 'bg-white border-slate-200 hover:border-slate-300'
        }`}
    >
      {/* Success Badge */}
      {isSelected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-4 right-4 z-40 w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center shadow-lg border-2 border-white"
        >
          <HugeiconsIcon icon={Tick01Icon} size={14} className="text-white" />
        </motion.div>
      )}

      {/* Graphic Area */}
      <div className="relative w-full h-full rounded-xl overflow-hidden">
        <motion.div
          className="w-full h-full bg-slate-50/10 p-6 flex flex-col items-center gap-6"
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          whileHover={{ scale: 1.05 }}
        >
          {/* Academic Icon */}
          <div className="flex flex-col items-center gap-4 py-4">
             <div className="text-purple-600 opacity-80">
                <HugeiconsIcon icon={School01Icon} size={32} />
             </div>
             <div className="h-3 w-32 bg-purple-100 rounded-full shimmer" />
             <div className="h-1.5 w-24 bg-slate-100 rounded-full shimmer" />
          </div>

          {/* Timeline Center Graphic */}
          <div className="w-full flex-1 relative flex flex-col items-center">
            {/* Center Line */}
            <div className="absolute top-0 bottom-0 w-[1px] bg-slate-200" />
            
            <div className="w-full space-y-10 relative">
               {[1, 2, 3].map((i) => (
                 <div key={i} className="flex items-center justify-center relative">
                    {/* Node */}
                    <div className="absolute w-2 h-2 rounded-full bg-purple-400 border-2 border-white shadow-sm z-10" />
                    
                    {/* Content Left & Right */}
                    <div className="w-full flex justify-between px-2">
                       <div className={`w-[40%] space-y-1 ${i % 2 === 0 ? 'opacity-0' : ''}`}>
                          <div className="h-1.5 w-full bg-slate-100 rounded-full shimmer" />
                          <div className="h-1 w-2/3 bg-slate-50 rounded-full shimmer" />
                       </div>
                       <div className={`w-[40%] space-y-1 ${i % 2 !== 0 ? 'opacity-0' : ''}`}>
                          <div className="h-1.5 w-full bg-slate-100 rounded-full shimmer" />
                          <div className="h-1 w-2/3 bg-slate-50 rounded-full shimmer" />
                       </div>
                    </div>
                 </div>
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
          The Academic
        </h3>
        <p className="text-xs text-slate-400 font-medium mt-1">
          Structured for research and education.
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
          animation: shimmer-animation 2.5s infinite linear;
        }

        @keyframes shimmer-animation {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </motion.div>
  );
};
