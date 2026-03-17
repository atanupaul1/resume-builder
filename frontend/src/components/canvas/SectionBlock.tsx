// frontend/components/canvas/SectionBlock.tsx
'use client';

import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { motion } from 'framer-motion';
import { HugeiconsIcon } from '@hugeicons/react';
import { 
  DragDropVerticalIcon, 
  Edit02Icon, 
  Delete02Icon 
} from '@hugeicons/core-free-icons';
import { ResumeSection } from '@/lib/types';
import { useResumeStore } from '@/lib/resumeStore';

interface SectionBlockProps {
  section: ResumeSection;
}

export const SectionBlock: React.FC<SectionBlockProps> = ({ section }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: section.id });

  const { selectedSectionId, setSelectedSection, removeSection } = useResumeStore();
  const isSelected = selectedSectionId === section.id;

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      ref={setNodeRef}
      style={style}
      className={`relative group mb-4 rounded-xl border-2 transition-all cursor-pointer ${
        isSelected ? 'border-indigo-500 bg-indigo-50/30' : 'border-transparent hover:border-gray-200 bg-white shadow-sm'
      } ${isDragging ? 'opacity-50 z-50' : ''}`}
      onClick={() => setSelectedSection(section.id)}
    >
      <div className="flex items-center p-4">
        {/* Drag Handle */}
        <div
          {...attributes}
          {...listeners}
          className="mr-3 text-gray-400 hover:text-gray-600 cursor-grab active:cursor-grabbing"
        >
          <HugeiconsIcon icon={DragDropVerticalIcon} size={20} />
        </div>

        {/* Content Preview */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
              {section.type}
            </span>
            <h4 className="font-semibold text-gray-900">{section.title}</h4>
          </div>
          <p className="text-sm text-gray-500 line-clamp-1">
            {section.content || 'Add your details...'}
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedSection(section.id);
            }}
            className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg"
          >
            <HugeiconsIcon icon={Edit02Icon} size={18} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              removeSection(section.id);
            }}
            className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
          >
            <HugeiconsIcon icon={Delete02Icon} size={18} />
          </button>
        </div>
      </div>

      {isSelected && (
        <motion.div
          layoutId="highlight"
          className="absolute inset-0 rounded-xl ring-2 ring-indigo-500 pointer-events-none"
          initial={false}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />
      )}
    </motion.div>
  );
};
