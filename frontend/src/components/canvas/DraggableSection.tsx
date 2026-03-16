// frontend/components/canvas/DraggableSection.tsx
'use client';

import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { motion, AnimatePresence } from 'framer-motion';
import { HugeiconsIcon } from '@hugeicons/react';
import { CheckmarkCircle02Icon, PlusSignIcon } from '@hugeicons/core-free-icons';
import { SectionType } from '@/lib/types';

interface DraggableSectionProps {
  type: SectionType;
  label: string;
  icon: React.ReactNode;
  description: string;
  isComplete?: boolean;
  count?: number;
  isActive?: boolean;
  isStarted?: boolean;
  onClick?: () => void;
}

export const DraggableSection = ({ 
  type, 
  label, 
  icon, 
  description, 
  isComplete, 
  count = 0,
  isActive,
  isStarted,
  onClick
}: DraggableSectionProps) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `sidebar-${type}`,
    data: {
      type,
      label,
      isSidebarItem: true,
    },
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes} className="touch-none group">
      <motion.div
        whileHover={{ scale: 1.02, x: 8 }}
        whileTap={{ scale: 0.98 }}
        onClick={onClick}
        className={`relative w-full text-left p-4 rounded-2xl border transition-all duration-300 cursor-grab active:cursor-grabbing shadow-sm flex flex-col gap-1 ${
          isActive 
            ? 'bg-white border-indigo-200 border-l-[3px] border-l-indigo-600 shadow-md' 
            : 'bg-white/80 border-slate-100 hover:border-indigo-100'
        } ${isDragging ? 'opacity-50 ring-2 ring-indigo-500 ring-offset-2' : ''}`}
      >
        {/* Progress Checkmark */}
        <AnimatePresence>
          {isComplete && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="absolute top-3 right-3 text-green-500"
            >
              <HugeiconsIcon icon={CheckmarkCircle02Icon} size={16} fill="currentColor" className="text-white fill-green-500" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Instance Counter */}
        {count > 0 && !isComplete && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute top-3 right-3 px-1.5 py-0.5 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-black border border-indigo-100"
          >
            +{count}
          </motion.div>
        )}

        <div className="flex items-center gap-3">
          <div className={`p-2.5 rounded-xl transition-all duration-300 ${
            isActive ? 'bg-indigo-600 text-white' : 'bg-slate-50 text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600'
          } ${isStarted ? '' : 'filter grayscale opacity-60'}`}>
            {icon}
          </div>
          <div className="flex-1">
            <h4 className="font-bold text-slate-900 text-[13px] tracking-tight">{label}</h4>
            <p className="text-[10px] text-slate-400 font-medium leading-tight line-clamp-1">
              {description}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
