"use client";
import { WorkExperience } from "@/types/resume";
import { useState, useRef } from "react";

interface Props {
  data: WorkExperience[];
  onChange: (data: WorkExperience[]) => void;
}

const newEntry = (): WorkExperience => ({
  id: crypto.randomUUID(), company: "", role: "",
  startDate: "", endDate: "", current: false, location: "", bullets: [""],
});

export default function WorkExperienceForm({ data, onChange }: Props) {
  const [openId, setOpenId] = useState<string | null>(data.length > 0 ? data[0].id : null);
  const dragIndexRef = useRef<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);

  const addEntry = () => { const e = newEntry(); onChange([...data, e]); setOpenId(e.id); };
  const updateEntry = (id: string, field: keyof WorkExperience, value: unknown) =>
    onChange(data.map((e) => (e.id === id ? { ...e, [field]: value } : e)));
  const removeEntry = (id: string) => { onChange(data.filter((e) => e.id !== id)); setOpenId(null); };
  const updateBullet = (id: string, idx: number, value: string) => {
    const entry = data.find((e) => e.id === id);
    if (!entry) return;
    const bullets = [...entry.bullets];
    bullets[idx] = value;
    updateEntry(id, "bullets", bullets);
  };
  const addBullet = (id: string) => {
    const entry = data.find((x) => x.id === id);
    if (!entry) return;
    updateEntry(id, "bullets", [...entry.bullets, ""]);
  };
  const removeBullet = (id: string, idx: number) => {
    const entry = data.find((x) => x.id === id);
    if (!entry) return;
    updateEntry(id, "bullets", entry.bullets.filter((_, i) => i !== idx));
  };

  const handleDragStart = (e: React.DragEvent, index: number) => {
    dragIndexRef.current = index;
    setDraggingIndex(index);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (dragIndexRef.current !== null && dragIndexRef.current !== index) {
      setDragOverIndex(index);
    }
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    const from = dragIndexRef.current;
    if (from === null || from === dropIndex) {
      cleanupDrag();
      return;
    }
    const newData = [...data];
    const [moved] = newData.splice(from, 1);
    newData.splice(dropIndex, 0, moved);
    onChange(newData);
    cleanupDrag();
  };

  const cleanupDrag = () => {
    dragIndexRef.current = null;
    setDragOverIndex(null);
    setDraggingIndex(null);
  };

  return (
    <div className="space-y-3 select-none">
      {data.length === 0 && (
        <div className="text-center py-8 text-gray-400 text-sm">No work experience yet.</div>
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

            <div className={`border rounded-xl overflow-hidden transition-all duration-100 ${
              isBeingDragged ? "opacity-30 border-indigo-300" : isDropTarget ? "border-indigo-300 bg-indigo-50/30" : "border-gray-200"
            }`}>
              <div
                className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
                onClick={() => setOpenId(openId === entry.id ? null : entry.id)}
              >
                <div className="flex items-center gap-2">
                  <span
                    className="cursor-grab active:cursor-grabbing text-gray-300 hover:text-gray-500 transition-colors flex-shrink-0"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 16 16">
                      <circle cx="5" cy="3" r="1.2"/><circle cx="5" cy="8" r="1.2"/><circle cx="5" cy="13" r="1.2"/>
                      <circle cx="11" cy="3" r="1.2"/><circle cx="11" cy="8" r="1.2"/><circle cx="11" cy="13" r="1.2"/>
                    </svg>
                  </span>
                  <div>
                    <span className="text-sm font-medium text-gray-800">{entry.role || `Experience ${index + 1}`}</span>
                    {entry.company && <span className="text-xs text-gray-500 ml-2">@ {entry.company}</span>}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (confirm("Are you sure you want to remove this experience?")) removeEntry(entry.id);
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-red-500 bg-red-50 hover:bg-red-100 rounded-lg transition-colors border border-red-100"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Remove
                  </button>
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
                      <label className="form-label">Job Title *</label>
                      <input className="form-input" placeholder="e.g. Software Engineer" value={entry.role}
                        onChange={(e) => updateEntry(entry.id, "role", e.target.value)} />
                    </div>
                    <div>
                      <label className="form-label">Company *</label>
                      <input className="form-input" placeholder="e.g. Google" value={entry.company}
                        onChange={(e) => updateEntry(entry.id, "company", e.target.value)} />
                    </div>
                    <div>
                      <label className="form-label">Location</label>
                      <input className="form-input" placeholder="Remote / Bangalore" value={entry.location}
                        onChange={(e) => updateEntry(entry.id, "location", e.target.value)} />
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
                        <span className="text-xs text-gray-500">I currently work here</span>
                      </label>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="form-label !mb-0">Key Achievements</label>
                      <span className="text-[10px] text-gray-400">Write clear, quantified bullets</span>
                    </div>
                    <p className="text-xs text-gray-400 mb-2">Use action verbs. Quantify when possible.</p>
                    <div className="space-y-3">
                      {entry.bullets.map((bullet, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <span className="text-gray-400 mt-2.5 text-sm flex-shrink-0">•</span>
                          <div className="flex-1 flex items-start gap-1.5">
                            <textarea
                              className="form-input resize-none flex-1 text-sm"
                              rows={2}
                              placeholder={idx === 0 ? "Built REST APIs serving 50k+ daily users" : "Add another achievement..."}
                              value={bullet}
                              onChange={(e) => updateBullet(entry.id, idx, e.target.value)}
                            />
                            {entry.bullets.length > 1 && (
                              <button onClick={() => removeBullet(entry.id, idx)}
                                className="w-7 h-7 flex items-center justify-center text-gray-300 hover:text-red-400 transition-colors">
                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    <button onClick={() => addBullet(entry.id)}
                      className="mt-2 text-xs text-indigo-500 hover:text-indigo-700 flex items-center gap-1">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      Add bullet
                    </button>
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
        Add Work Experience
      </button>
    </div>
  );
}
