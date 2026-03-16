"use client";
import { Education } from "@/types/resume";
import { useState, useRef } from "react";

interface Props {
  data: Education[];
  onChange: (data: Education[]) => void;
}

const newEntry = (): Education => ({
  id: crypto.randomUUID(), institution: "", degree: "", field: "",
  startDate: "", endDate: "", current: false, grade: "", location: "",
});

export default function EducationForm({ data, onChange }: Props) {
  const [openId, setOpenId] = useState<string | null>(data.length > 0 ? data[0].id : null);
  const dragIndexRef = useRef<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);

  const addEntry = () => { const e = newEntry(); onChange([...data, e]); setOpenId(e.id); };
  const updateEntry = (id: string, field: keyof Education, value: unknown) =>
    onChange(data.map((e) => (e.id === id ? { ...e, [field]: value } : e)));
  const removeEntry = (id: string) => { onChange(data.filter((e) => e.id !== id)); setOpenId(null); };

  const handleDragStart = (e: React.DragEvent, index: number) => {
    dragIndexRef.current = index; setDraggingIndex(index);
    e.dataTransfer.effectAllowed = "move";
    const ghost = document.createElement("div");
    ghost.style.cssText = "position:absolute;top:-9999px;";
    document.body.appendChild(ghost);
    e.dataTransfer.setDragImage(ghost, 0, 0);
    setTimeout(() => document.body.removeChild(ghost), 0);
  };
  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (dragIndexRef.current !== null && dragIndexRef.current !== index) setDragOverIndex(index);
  };
  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    const from = dragIndexRef.current;
    if (from === null || from === dropIndex) { cleanupDrag(); return; }
    const newData = [...data];
    const [moved] = newData.splice(from, 1);
    newData.splice(dropIndex, 0, moved);
    onChange(newData); cleanupDrag();
  };
  const cleanupDrag = () => { dragIndexRef.current = null; setDragOverIndex(null); setDraggingIndex(null); };

  return (
    <div className="space-y-3 select-none">
      {data.length === 0 && (
        <div className="text-center py-8 text-gray-400 text-sm">No education added yet.</div>
      )}

      {data.map((entry, index) => {
        const isDropTarget = dragOverIndex === index && draggingIndex !== null && draggingIndex !== index;
        const isBeingDragged = draggingIndex === index;
        return (
          <div
            key={entry.id}
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDrop={(e) => handleDrop(e, index)}
            onDragEnd={cleanupDrag}
            className="relative"
          >
            {isDropTarget && draggingIndex! > index && (
              <div className="absolute top-0 inset-x-0 h-[2px] bg-indigo-400 rounded-full z-10 pointer-events-none" />
            )}
            <div className={`border rounded-xl overflow-hidden transition-all duration-100
              ${isBeingDragged ? "opacity-30 border-indigo-300" : isDropTarget ? "border-indigo-300 bg-indigo-50/30" : "border-gray-200"}`}
            >
              <div
                className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
                onClick={() => setOpenId(openId === entry.id ? null : entry.id)}
              >
                <div className="flex items-center gap-2">
                  <span
                    className="cursor-grab active:cursor-grabbing text-gray-300 hover:text-gray-500 transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 16 16">
                      <circle cx="5" cy="3" r="1.2"/><circle cx="5" cy="8" r="1.2"/><circle cx="5" cy="13" r="1.2"/>
                      <circle cx="11" cy="3" r="1.2"/><circle cx="11" cy="8" r="1.2"/><circle cx="11" cy="13" r="1.2"/>
                    </svg>
                  </span>
                  <div>
                    <span className="text-sm font-medium text-gray-800">{entry.degree || `Education ${index + 1}`}</span>
                    {entry.institution && <span className="text-xs text-gray-500 ml-2">@ {entry.institution}</span>}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={(e) => { e.stopPropagation(); removeEntry(entry.id); }}
                    className="text-xs text-red-400 hover:text-red-600 px-2 py-1 rounded">Remove</button>
                  <svg className={`w-4 h-4 text-gray-400 transition-transform ${openId === entry.id ? "rotate-180" : ""}`}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {openId === entry.id && (
                <div className="p-4 space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="col-span-2">
                      <label className="form-label">Institution *</label>
                      <input className="form-input" placeholder="e.g. IIT Guwahati" value={entry.institution}
                        onChange={(e) => updateEntry(entry.id, "institution", e.target.value)} />
                    </div>
                    <div>
                      <label className="form-label">Degree *</label>
                      <input className="form-input" placeholder="e.g. B.Tech" value={entry.degree}
                        onChange={(e) => updateEntry(entry.id, "degree", e.target.value)} />
                    </div>
                    <div>
                      <label className="form-label">Field of Study</label>
                      <input className="form-input" placeholder="e.g. Computer Science" value={entry.field}
                        onChange={(e) => updateEntry(entry.id, "field", e.target.value)} />
                    </div>
                    <div>
                      <label className="form-label">Start Date</label>
                      <input className="form-input" type="month" value={entry.startDate}
                        onChange={(e) => updateEntry(entry.id, "startDate", e.target.value)} />
                    </div>
                    <div>
                      <label className="form-label">End Date</label>
                      <input className="form-input" type="month" value={entry.endDate} disabled={entry.current}
                        onChange={(e) => updateEntry(entry.id, "endDate", e.target.value)} />
                      <label className="flex items-center gap-2 mt-2 cursor-pointer">
                        <input type="checkbox" checked={entry.current} className="accent-indigo-500"
                          onChange={(e) => updateEntry(entry.id, "current", e.target.checked)} />
                        <span className="text-xs text-gray-500">Currently studying</span>
                      </label>
                    </div>
                    <div>
                      <label className="form-label">Grade / CGPA</label>
                      <input className="form-input" placeholder="e.g. 8.5 / 10" value={entry.grade}
                        onChange={(e) => updateEntry(entry.id, "grade", e.target.value)} />
                    </div>
                    <div>
                      <label className="form-label">Location</label>
                      <input className="form-input" placeholder="e.g. Guwahati" value={entry.location}
                        onChange={(e) => updateEntry(entry.id, "location", e.target.value)} />
                    </div>
                  </div>
                </div>
              )}
            </div>
            {isDropTarget && draggingIndex! < index && (
              <div className="absolute bottom-0 inset-x-0 h-[2px] bg-indigo-400 rounded-full z-10 pointer-events-none" />
            )}
          </div>
        );
      })}

      <button onClick={addEntry}
        className="w-full py-3 border-2 border-dashed border-indigo-200 rounded-xl text-sm text-indigo-400 hover:border-indigo-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all flex items-center justify-center gap-2">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        Add Education
      </button>
    </div>
  );
}
