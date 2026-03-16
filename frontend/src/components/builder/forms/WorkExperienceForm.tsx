"use client";
import { WorkExperience } from "@/types/resume";
import { useState, useRef } from "react";
import AISuggestionBox from "@/components/builder/AISuggestionBox";

interface Props {
  data: WorkExperience[];
  onChange: (data: WorkExperience[]) => void;
}

const newEntry = (): WorkExperience => ({
  id: crypto.randomUUID(), company: "", role: "",
  startDate: "", endDate: "", current: false, location: "", bullets: [""],
});

interface BulletAIState { loading: boolean; suggestion: string; error: string; }

export default function WorkExperienceForm({ data, onChange }: Props) {
  const [openId, setOpenId] = useState<string | null>(data.length > 0 ? data[0].id : null);
  const [aiStates, setAiStates] = useState<Record<string, BulletAIState>>({});
  const dragIndexRef = useRef<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);

  const addEntry = () => { const e = newEntry(); onChange([...data, e]); setOpenId(e.id); };
  const updateEntry = (id: string, field: keyof WorkExperience, value: unknown) =>
    onChange(data.map((e) => (e.id === id ? { ...e, [field]: value } : e)));
  const removeEntry = (id: string) => { onChange(data.filter((e) => e.id !== id)); setOpenId(null); };
  const updateBullet = (id: string, idx: number, value: string) => {
    const entry = data.find((e) => e.id === id)!;
    const bullets = [...entry.bullets]; bullets[idx] = value;
    updateEntry(id, "bullets", bullets);
  };
  const addBullet = (id: string) => { const e = data.find((x) => x.id === id)!; updateEntry(id, "bullets", [...e.bullets, ""]); };
  const removeBullet = (id: string, idx: number) => { const e = data.find((x) => x.id === id)!; updateEntry(id, "bullets", e.bullets.filter((_, i) => i !== idx)); };

  const setAI = (key: string, patch: Partial<BulletAIState>) => {
    setAiStates((prev) => {
      const existing = prev[key] || { loading: false, suggestion: "", error: "" };
      return {
        ...prev,
        [key]: { ...existing, ...patch },
      };
    });
  };
  const clearAI = (key: string) => setAiStates((prev) => { const n = { ...prev }; delete n[key]; return n; });

  const improveBullet = async (entry: WorkExperience, idx: number) => {
    const key = `${entry.id}-${idx}`;
    const bullet = entry.bullets[idx];
    if (!bullet.trim()) { setAI(key, { error: "Write something first.", loading: false, suggestion: "" }); return; }
    setAI(key, { loading: true, suggestion: "", error: "" });
    try {
      const res = await fetch("/api/ai/improve-bullet", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bullet, role: entry.role, company: entry.company }),
      });
      const json = await res.json();
      if (json.error) throw new Error(json.error);
      setAI(key, { suggestion: json.improved, loading: false, error: "" });
    } catch (err) {
      setAI(key, { error: err instanceof Error ? err.message : "Something went wrong", loading: false, suggestion: "" });
    }
  };

  // Drag handlers for entry reordering
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
            <div className={`border rounded-xl overflow-hidden transition-all duration-100
              ${isBeingDragged ? "opacity-30 border-indigo-300" : isDropTarget ? "border-indigo-300 bg-indigo-50/30" : "border-gray-200"}`}
            >
              {/* Accordion header */}
              <div
                className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
                onClick={() => setOpenId(openId === entry.id ? null : entry.id)}
              >
                <div className="flex items-center gap-2">
                  {/* Drag handle */}
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
                      <span className="text-[10px] text-indigo-400 flex items-center gap-1">
                        <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" /></svg>
                        Click ✦ to improve with AI
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 mb-2">Use action verbs. Quantify when possible.</p>
                    <div className="space-y-3">
                      {entry.bullets.map((bullet, idx) => {
                        const key = `${entry.id}-${idx}`;
                        const ai = aiStates[key];
                        return (
                          <div key={idx}>
                            <div className="flex items-start gap-2">
                              <span className="text-gray-400 mt-2.5 text-sm flex-shrink-0">•</span>
                              <div className="flex-1">
                                <div className="flex items-start gap-1.5">
                                  <textarea className="form-input resize-none flex-1 text-sm" rows={2}
                                    placeholder={idx === 0 ? "Built REST APIs serving 50k+ daily users" : "Add another achievement..."}
                                    value={bullet} onChange={(e) => updateBullet(entry.id, idx, e.target.value)} />
                                  <div className="flex flex-col gap-1 flex-shrink-0 pt-0.5">
                                    <button onClick={() => improveBullet(entry, idx)} disabled={ai?.loading}
                                      title="Improve with AI"
                                      className="w-7 h-7 flex items-center justify-center rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-500 hover:bg-indigo-100 transition-all disabled:opacity-50">
                                      {ai?.loading
                                        ? <svg className="w-3 h-3 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                                        : <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" /></svg>
                                      }
                                    </button>
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
                                <AISuggestionBox
                                  isLoading={ai?.loading ?? false} suggestion={ai?.suggestion ?? ""} error={ai?.error ?? ""}
                                  label="AI rewrite"
                                  onAccept={(val) => { updateBullet(entry.id, idx, val); clearAI(key); }}
                                  onReject={() => clearAI(key)} onRetry={() => improveBullet(entry, idx)}
                                />
                              </div>
                            </div>
                          </div>
                        );
                      })}
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
