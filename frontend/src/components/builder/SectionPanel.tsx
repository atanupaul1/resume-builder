"use client";

import { SectionKey } from "@/types/resume";
import { useState, useRef } from "react";

const SECTION_META: Record<SectionKey, { label: string; description: string; icon: React.ReactNode }> = {
  personalInfo: {
    label: "Personal Info",
    description: "Name, title, photo",
    icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>,
  },
  summary: {
    label: "Summary",
    description: "Hook recruiters with 3 lines",
    icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
  },
  workExperience: {
    label: "Work Experience",
    description: "Highlight your roles",
    icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
  },
  education: {
    label: "Education",
    description: "Degrees, certifications",
    icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /></svg>,
  },
  skills: {
    label: "Skills & Tools",
    description: "Technical and soft skills",
    icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
  },
  custom: {
    label: "Custom Section",
    description: "Add anything else",
    icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  },
  publications: {
    label: "Publications",
    description: "Research and papers",
    icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.168.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>,
  },
};

interface Props {
  activeSection: SectionKey | null;
  onSelect: (key: SectionKey) => void;
  completionMap: Partial<Record<SectionKey, boolean>>;
  sectionOrder: SectionKey[];
  onReorder: (newOrder: SectionKey[]) => void;
  hiddenSections: SectionKey[];
  onToggleVisibility: (key: SectionKey) => void;
}

export default function SectionPanel({ 
  activeSection, 
  onSelect, 
  completionMap, 
  sectionOrder, 
  onReorder,
  hiddenSections,
  onToggleVisibility
}: Props) {
  const dragIndexRef = useRef<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);

  const handleDragStart = (e: React.DragEvent, index: number) => {
    dragIndexRef.current = index;
    setDraggingIndex(index);
    e.dataTransfer.effectAllowed = "move";
    const ghost = document.createElement("div");
    ghost.style.cssText = "position:absolute;top:-9999px;";
    document.body.appendChild(ghost);
    e.dataTransfer.setDragImage(ghost, 0, 0);
    setTimeout(() => document.body.removeChild(ghost), 0);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (dragIndexRef.current !== null && dragIndexRef.current !== index) setDragOverIndex(index);
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    const fromIndex = dragIndexRef.current;
    if (fromIndex === null || fromIndex === dropIndex) {
      cleanup();
      return;
    }
    const newOrder = [...sectionOrder];
    const [moved] = newOrder.splice(fromIndex, 1);
    newOrder.splice(dropIndex, 0, moved);
    onReorder(newOrder);
    cleanup();
  };

  const cleanup = () => {
    dragIndexRef.current = null;
    setDragOverIndex(null);
    setDraggingIndex(null);
  };

  const completedCount = sectionOrder.filter((k) => completionMap[k]).length;

  return (
    <aside className="w-full sm:w-80 flex-shrink-0 bg-white/80 backdrop-blur-xl border-r border-white/70 flex flex-col h-full select-none shadow-[1px_0_0_rgba(15,23,42,0.03)]">
      <div className="px-4 pt-5 pb-4 border-b border-gray-100/80">
        <p className="text-[10px] uppercase tracking-[0.25em] text-gray-500 font-black">Sections</p>
        <p className="text-[11px] text-gray-500 mt-1 font-medium">Drag handle to reorder resume</p>
      </div>

      <nav className="flex-1 overflow-y-auto py-2">
        {sectionOrder.map((key, index) => {
          const meta = SECTION_META[key];
          const isActive = activeSection === key;
          const isDone = completionMap[key];
          const isBeingDragged = draggingIndex === index;
          const isDropTarget = dragOverIndex === index && draggingIndex !== null && draggingIndex !== index;
          const isHidden = hiddenSections.includes(key);

          return (
            <div
              key={key}
              onDragOver={(e) => handleDragOver(e, index)}
              onDrop={(e) => handleDrop(e, index)}
              className="relative px-2"
            >
              {isDropTarget && draggingIndex !== null && draggingIndex > index && (
                <div className="absolute top-0 inset-x-4 h-[2px] bg-indigo-400 rounded-full z-20 pointer-events-none" />
              )}

              <div className={`flex items-stretch gap-1 rounded-2xl transition-all duration-150 ${isBeingDragged ? "opacity-40 scale-[0.99]" : "opacity-100"} ${isDropTarget ? "bg-indigo-50/50" : ""} ${isHidden ? "opacity-60 bg-gray-50 grayscale-[0.5]" : ""}`}>
                <div
                  draggable
                  onDragStart={(e) => handleDragStart(e, index)}
                  onDragEnd={cleanup}
                  className="pl-3 py-4 flex-shrink-0 cursor-grab active:cursor-grabbing text-gray-400 hover:text-indigo-500 transition-colors self-stretch flex items-center"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
                    <circle cx="5" cy="3" r="1.5" />
                    <circle cx="5" cy="8" r="1.5" />
                    <circle cx="5" cy="13" r="1.5" />
                    <circle cx="11" cy="3" r="1.5" />
                    <circle cx="11" cy="8" r="1.5" />
                    <circle cx="11" cy="13" r="1.5" />
                  </svg>
                </div>

                <div className={`flex-1 flex items-center rounded-2xl border transition-all ${
                    isActive
                      ? "bg-indigo-50 border-indigo-100 shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)]"
                      : "bg-white/0 hover:bg-gray-50 border-transparent"
                  }`}>
                  <button
                    type="button"
                    onClick={() => onSelect(key)}
                    className="flex-1 flex items-center gap-3 px-3 py-3 text-left"
                  >
                    <span className={`flex-shrink-0 ${isActive ? "text-indigo-600" : "text-gray-500"}`}>
                      {meta.icon}
                    </span>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className={`text-[15px] font-bold truncate ${isActive ? "text-indigo-900" : "text-gray-900"} ${isHidden ? "line-through text-gray-500" : ""}`}>
                          {meta.label}
                        </span>
                      </div>
                      <span className="text-[12px] text-gray-500 truncate block font-medium">{meta.description}</span>
                    </div>
                  </button>
                  
                  <div className="pr-4 flex items-center border-l border-transparent">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleVisibility(key);
                      }}
                      className={`w-[22px] h-[22px] flex-shrink-0 rounded-full flex items-center justify-center transition-all duration-200 shadow-sm border ${
                        !isHidden
                          ? "bg-indigo-600 border-indigo-600 text-white hover:bg-indigo-700 hover:scale-110"
                          : "bg-gray-50 border-gray-300 text-transparent hover:border-gray-400 hover:bg-gray-100 hover:scale-110"
                      }`}
                      title={isHidden ? "Show section" : "Hide section"}
                    >
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {isDropTarget && draggingIndex !== null && draggingIndex < index && (
                <div className="absolute bottom-0 inset-x-4 h-[2px] bg-indigo-400 rounded-full z-20 pointer-events-none" />
              )}
            </div>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-100/80 bg-white/60">
        <div className="flex items-center justify-between mb-2">
          <p className="text-[10px] text-gray-600 font-black uppercase tracking-[0.2em]">Progress</p>
          <p className="text-[10px] text-gray-500 font-medium">
            {completedCount}/{sectionOrder.length}
          </p>
        </div>
        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-indigo-400 to-indigo-600 rounded-full transition-all duration-500"
            style={{ width: `${(completedCount / sectionOrder.length) * 100}%` }}
          />
        </div>
      </div>
    </aside>
  );
}
