"use client";
import { SectionKey } from "@/types/resume";
import { useState, useRef } from "react";

const SECTION_META: Record<SectionKey, { label: string; description: string; icon: React.ReactNode }> = {
  personalInfo: {
    label: "Personal Info", description: "Name, title, photo",
    icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>,
  },
  summary: {
    label: "Summary", description: "Hook recruiters with 3 lines",
    icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
  },
  workExperience: {
    label: "Work Experience", description: "Highlight your roles",
    icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
  },
  education: {
    label: "Education", description: "Degrees, certifications",
    icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /></svg>,
  },
  skills: {
    label: "Skills & Tools", description: "Technical and soft skills",
    icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
  },
  contact: {
    label: "Contact Info", description: "Email, phone, social",
    icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
  },
};

interface Props {
  activeSection: SectionKey | null;
  onSelect: (key: SectionKey) => void;
  completionMap: Partial<Record<SectionKey, boolean>>;
  sectionOrder: SectionKey[];
  onReorder: (newOrder: SectionKey[]) => void;
}

export default function SectionPanel({ activeSection, onSelect, completionMap, sectionOrder, onReorder }: Props) {
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
    if (dragIndexRef.current !== null && dragIndexRef.current !== index) {
      setDragOverIndex(index);
    }
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    const fromIndex = dragIndexRef.current;
    if (fromIndex === null || fromIndex === dropIndex) { cleanup(); return; }
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
    <aside className="w-80 flex-shrink-0 bg-white border-r border-gray-100 flex flex-col h-full select-none">
      <div className="px-4 pt-5 pb-3 border-b border-gray-100">
        <p className="text-[10px] uppercase tracking-widest text-gray-600 font-bold">Sections</p>
        <p className="text-[10px] text-gray-500 mt-0.5 font-medium">Drag ⠿ to reorder your resume</p>
      </div>

      <nav className="flex-1 overflow-y-auto py-2">
        {sectionOrder.map((key, index) => {
          const meta = SECTION_META[key];
          const isActive = activeSection === key;
          const isDone = completionMap[key];
          const isBeingDragged = draggingIndex === index;
          const isDropTarget = dragOverIndex === index && draggingIndex !== null && draggingIndex !== index;

          return (
            <div
              key={key}
              onDragOver={(e) => handleDragOver(e, index)}
              onDrop={(e) => handleDrop(e, index)}
              className="relative"
            >
              {/* Drop indicator — above */}
              {isDropTarget && draggingIndex !== null && draggingIndex > index && (
                <div className="absolute top-0 inset-x-3 h-[2px] bg-indigo-400 rounded-full z-20 pointer-events-none" />
              )}

              <div
                className={`flex items-center group transition-all duration-100 ${isBeingDragged ? "opacity-30" : "opacity-100"} ${isDropTarget ? "bg-indigo-50/40" : ""}`}
              >
                {/* Drag handle — Move outside button to avoid event conflicts */}
                  <div
                    draggable
                    onDragStart={(e) => handleDragStart(e, index)}
                    onDragEnd={cleanup}
                    className="pl-3 py-4 flex-shrink-0 cursor-grab active:cursor-grabbing text-gray-400 hover:text-indigo-500 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
                      <circle cx="5" cy="3" r="1.5" /><circle cx="5" cy="8" r="1.5" /><circle cx="5" cy="13" r="1.5" />
                      <circle cx="11" cy="3" r="1.5" /><circle cx="11" cy="8" r="1.5" /><circle cx="11" cy="13" r="1.5" />
                    </svg>
                  </div>

                <button
                  type="button"
                  onClick={() => onSelect(key)}
                  className={`flex-1 flex items-center gap-2 px-3 py-3 text-left
                    ${isActive ? "bg-indigo-50 border-r-2 border-indigo-500 shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)]" : "hover:bg-gray-50 border-r-2 border-transparent"}
                  `}
                >
                  <span className={`flex-shrink-0 ${isActive ? "text-indigo-600" : "text-gray-500"}`}>
                    {meta.icon}
                  </span>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <span className={`text-[15px] font-bold truncate ${isActive ? "text-indigo-800" : "text-gray-900"}`}>
                        {meta.label}
                      </span>
                      {isDone && (
                        <svg className="w-4 h-4 text-emerald-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <span className="text-[12px] text-gray-500 truncate block font-medium">{meta.description}</span>
                  </div>
                </button>
              </div>

              {/* Drop indicator — below */}
              {isDropTarget && draggingIndex !== null && draggingIndex < index && (
                <div className="absolute bottom-0 inset-x-3 h-[2px] bg-indigo-400 rounded-full z-20 pointer-events-none" />
              )}
            </div>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-100 bg-gray-50/30">
        <p className="text-[10px] text-gray-600 text-center font-bold">
          {completedCount} of {sectionOrder.length} sections complete
        </p>
        <div className="mt-2 h-1 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-indigo-400 to-indigo-600 rounded-full transition-all duration-500"
            style={{ width: `${(completedCount / sectionOrder.length) * 100}%` }}
          />
        </div>
      </div>
    </aside>
  );
}
