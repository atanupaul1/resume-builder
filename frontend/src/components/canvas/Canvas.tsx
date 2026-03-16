// frontend/components/canvas/Canvas.tsx
'use client';

import React from 'react';
import {
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  useDroppable,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { motion, AnimatePresence } from 'framer-motion';
import { useResumeStore } from '@/lib/resumeStore';
import { SectionBlock } from './SectionBlock';
import { EmptyCanvas } from './EmptyCanvas';

interface CanvasProps {
  activeId: string | null;
}

export const Canvas = ({ activeId }: CanvasProps) => {
  const { resume, reorderSections } = useResumeStore();
  const sections = resume.sections;
  const { setNodeRef, isOver } = useDroppable({
    id: 'canvas-drop-zone',
  });

  const isDraggingSidebarItem = activeId?.startsWith('sidebar-');

  return (
    <div
      ref={setNodeRef}
      className={`flex-1 min-h-[600px] w-full max-w-2xl bg-white rounded-[40px] shadow-2xl transition-all duration-500 relative overflow-hidden flex flex-col items-center ${isOver ? 'ring-4 ring-indigo-100 bg-indigo-50/5' : ''
        }`}
    >
      <AnimatePresence mode="wait">
        {sections.length === 0 && !isDraggingSidebarItem ? (
          <EmptyCanvas key="empty" />
        ) : isDraggingSidebarItem ? (
          <motion.div
            key="ghost"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full h-full p-12 space-y-8"
          >
            {/* Ghost Layout */}
            <div className="opacity-20 flex flex-col items-center">
              <div className="w-24 h-24 rounded-full bg-gray-200 mb-8" />
              <div className="h-6 w-48 bg-gray-200 rounded-full mb-4" />
              <div className="h-4 w-32 bg-gray-200 rounded-full" />
            </div>

            <div className="grid grid-cols-3 gap-8 opacity-20 h-full">
              <div className="col-span-1 space-y-6">
                <div className="h-4 w-full bg-gray-200 rounded-full" />
                <div className="h-4 w-full bg-gray-200 rounded-full" />
                <div className="h-4 w-full bg-gray-200 rounded-full" />
              </div>
              <div className="col-span-2 space-y-8">
                <div
                  className={`h-32 w-full border-2 border-dashed rounded-3xl transition-all duration-300 ${isOver ? 'bg-indigo-600/10 border-indigo-600 scale-[1.02]' : 'border-gray-200'
                    }`}
                >
                  {isOver && (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-indigo-600 font-bold text-xs uppercase tracking-widest">Drop to Add Section</span>
                    </div>
                  )}
                </div>
                <div className="h-24 w-full bg-gray-200 rounded-3xl" />
                <div className="h-48 w-full bg-gray-200 rounded-3xl" />
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full p-12 space-y-6"
          >
            <SortableContext
              items={sections.map((s: any) => s.id)}
              strategy={verticalListSortingStrategy}
            >
              {sections.map((section: any) => (
                <SectionBlock key={section.id} section={section} />
              ))}
            </SortableContext>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
