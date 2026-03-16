// frontend/components/canvas/Canvas.tsx
'use client';

import React from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
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

export const Canvas = () => {
  const { resume, reorderSections } = useResumeStore();
  const sections = resume.sections;

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // Avoid accidental drags when clicking
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = sections.findIndex((s: any) => s.id === active.id);
      const newIndex = sections.findIndex((s: any) => s.id === over.id);
      
      const newSections = arrayMove(sections, oldIndex, newIndex);
      reorderSections(newSections);
    }
  };

  return (
    <div className="flex-1 bg-gray-50 overflow-y-auto p-8 flex flex-col items-center">
      <div className="w-full max-w-2xl">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={sections.map((s: any) => s.id)}
            strategy={verticalListSortingStrategy}
          >
            <AnimatePresence>
              {sections.length === 0 ? (
                <EmptyCanvas key="empty" />
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-4"
                >
                  {sections.map((section: any) => (
                    <SectionBlock key={section.id} section={section} />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
};
