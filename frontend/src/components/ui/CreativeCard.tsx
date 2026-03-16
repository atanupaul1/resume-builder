// frontend/components/ui/CreativeCard.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { EyeIcon, Tick01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';

interface CreativeCardProps {
  isSelected?: boolean;
}

export const CreativeCard = ({ isSelected }: CreativeCardProps) => {
  return (
    <motion.div
      whileHover={{
        y: -10,
        boxShadow: "0 25px 50px -12px rgba(148, 163, 184, 0.2)"
      }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className={`group relative w-full aspect-[3/4] rounded-2xl p-4 cursor-pointer transition-all overflow-hidden border-2 ${isSelected
          ? 'border-indigo-600 bg-indigo-50/10 shadow-indigo-100 ring-4 ring-indigo-600/5'
          : 'bg-white border-slate-200 hover:border-slate-300'
        }`}
    >
      {/* Success Badge */}
      {isSelected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-4 right-4 z-40 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white"
        >
          <HugeiconsIcon icon={Tick01Icon} size={14} className="text-white" />
        </motion.div>
      )}

      {/* Magnifier Skeleton Area */}
      <div className="relative w-full h-full rounded-xl overflow-hidden">
        <motion.div
          className="w-full h-full bg-slate-50/50 p-6 flex flex-col gap-6"
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          whileHover={{ scale: 1.05 }}
        >
          {/* Creative 2-Column Header */}
          <div className="flex gap-4 items-start border-b border-slate-100 pb-6">
            <div className="w-16 h-16 rounded-full shimmer shrink-0 border-2 border-white shadow-sm" />
            <div className="space-y-3 flex-1 pt-1">
              <div className="h-4 w-full shimmer rounded-full" />
              <div className="h-2 w-2/3 shimmer rounded-full" />
            </div>
          </div>

          <div className="flex gap-6 flex-1">
            <div className="w-1/3 space-y-4">
              <div className="h-1.5 w-full shimmer rounded-full" />
              <div className="h-1.5 w-4/5 shimmer rounded-full" />
            </div>
            <div className="flex-1 space-y-5">
              <div className="h-1.5 w-1/2 shimmer rounded-full" />
              <div className="h-1.5 w-3/4 shimmer rounded-full" />
            </div>
          </div>
        </motion.div>

        {/* Glassmorphism Overlay */}
        <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 group-hover:backdrop-blur-[2px] transition-all duration-400 ease-[0.4,0,0.2,1] z-10" />
      </div>

      {/* Title & Description */}
      <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-white via-white/100 to-transparent pt-12 z-20">
        <h3 className="text-lg font-semibold text-slate-900 tracking-tight font-sans">
          Modern Creative
        </h3>
        <p className="text-xs text-slate-400 font-medium mt-1">
          Dynamic, 2-column layout with bold accents.
        </p>
      </div>

      {/* Hover/Active Button */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
        <div className={`px-6 py-2 text-xs font-bold rounded-xl transition-all duration-400 ease-[0.4,0,0.2,1] shadow-xl flex items-center gap-2 ${isSelected
            ? 'bg-green-600 text-white opacity-100 translate-y-16'
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
            #e2e8f0 25%, 
            #f8fafc 50%, 
            #e2e8f0 75%
          );
          background-size: 200% 100%;
          animation: shimmer-animation 2s infinite linear;
        }

        @keyframes shimmer-animation {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }

        :global(.group:hover) .shimmer {
          animation-duration: 1.2s;
        }
      `}</style>
    </motion.div>
  );
};
