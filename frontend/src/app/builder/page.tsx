// frontend/app/builder/page.tsx
'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HugeiconsIcon } from '@hugeicons/react';
import { 
  ArrowLeft01Icon, 
  FloppyDiskIcon, 
  EyeIcon, 
  Download02Icon,
  SparklesIcon,
  Settings03Icon
} from '@hugeicons/core-free-icons';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SectionSidebar } from '@/components/canvas/SectionSidebar';
import { Canvas } from '@/components/canvas/Canvas';
import { AIPanel } from '@/components/panels/AIPanel';
import { ResumePreview } from '@/components/resume/ResumePreview';
import { useResumeStore } from '@/lib/resumeStore';
import { DndContext, DragEndEvent, DragStartEvent, PointerSensor, useSensor, useSensors, closestCenter } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { ATSScoreWidget } from '@/components/canvas/ATSScoreWidget';

export default function BuilderPage() {
  const { resume, isPreviewMode, togglePreviewMode, saveResume, addSection } = useResumeStore();
  const router = useRouter();
  const [activeId, setActiveId] = React.useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    // Sidebar to Canvas Drop
    if (over.id === 'canvas-drop-zone' && active.data.current?.isSidebarItem) {
      addSection(active.data.current.type);
      return;
    }

    // Internal Canvas Reordering
    if (active.id !== over.id && !active.data.current?.isSidebarItem) {
      const oldIndex = resume.sections.findIndex((s) => s.id === active.id);
      const newIndex = resume.sections.findIndex((s) => s.id === over.id);
      
      const newSections = arrayMove(resume.sections, oldIndex, newIndex);
      useResumeStore.getState().reorderSections(newSections);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">
      {/* Top Bar */}
      <nav className="h-16 flex-shrink-0 bg-white border-b border-gray-100 px-4 flex items-center justify-between z-40">
        <div className="flex items-center gap-4">
          <Link href="/templates" className="p-2 hover:bg-gray-50 rounded-xl text-gray-400 group transition-colors">
            <HugeiconsIcon icon={ArrowLeft01Icon} size={20} className="group-hover:-translate-x-1 transition-transform" />
          </Link>
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-indigo-600 rounded-lg shadow-lg shadow-indigo-100">
               <HugeiconsIcon icon={SparklesIcon} size={16} color="white" />
            </div>
            <input 
              type="text" 
              value={resume.title}
              onChange={() => {}} // Store update logic
              className="font-bold text-gray-900 border-none bg-transparent focus:ring-0 w-48 focus:bg-gray-50 rounded-lg px-2"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => togglePreviewMode()}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
              isPreviewMode ? 'bg-indigo-600 text-white' : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            <HugeiconsIcon icon={EyeIcon} size={18} />
            {isPreviewMode ? 'Exit Preview' : 'Preview'}
          </button>
          
          <button 
            onClick={() => saveResume()}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-100 text-gray-900 rounded-xl text-sm font-bold hover:border-indigo-100 hover:text-indigo-600 transition-all shadow-sm"
          >
            <HugeiconsIcon icon={FloppyDiskIcon} size={18} />
            Save
          </button>

          <button 
            onClick={() => router.push('/export')}
            className="flex items-center gap-2 px-5 py-2 bg-gray-900 text-white rounded-xl text-sm font-bold hover:bg-gray-800 transition-all shadow-lg shadow-gray-200 active:scale-95"
          >
            <HugeiconsIcon icon={Download02Icon} size={18} />
            Export
          </button>
        </div>
      </nav>

      {/* Main Workspace */}
      <DndContext 
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <main className="flex-1 flex overflow-hidden relative">
          <AnimatePresence mode="wait">
            {!isPreviewMode && (
              <motion.div
                key="sidebar"
                initial={{ x: -240 }}
                animate={{ x: 0 }}
                exit={{ x: -240 }}
                className="flex flex-shrink-0"
              >
                <SectionSidebar />
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex-1 overflow-hidden flex flex-col items-center justify-start py-8 bg-slate-50">
             <AnimatePresence mode="wait">
               {isPreviewMode ? (
                 <motion.div 
                   key="preview"
                   initial={{ opacity: 0, scale: 0.9 }}
                   animate={{ opacity: 1, scale: 1 }}
                   exit={{ opacity: 0, scale: 0.9 }}
                   className="flex-1 overflow-y-auto w-full flex justify-center pb-20"
                 >
                   <ResumePreview />
                 </motion.div>
               ) : (
                 <motion.div 
                   key="canvas"
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   exit={{ opacity: 0 }}
                   className="w-full h-full flex items-start justify-center"
                 >
                   <Canvas activeId={activeId} />
                 </motion.div>
               )}
             </AnimatePresence>
          </div>

          <AIPanel />
        </main>
        {!isPreviewMode && <ATSScoreWidget />}
      </DndContext>

      {/* Floating Action Buttons or mobile navigation could go here */}
    </div>
  );
}
