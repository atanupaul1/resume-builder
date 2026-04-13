"use client";
import { SkillGroup } from "@/types/resume";
import { useState } from "react";

interface Props {
  data: SkillGroup[];
  onChange: (data: SkillGroup[]) => void;
}

const newGroup = (): SkillGroup => ({
  id: crypto.randomUUID(),
  category: "",
  skills: [],
});

export default function SkillsForm({ data, onChange }: Props) {
  const [inputValues, setInputValues] = useState<Record<string, string>>({});
  const [draggingSkillIndex, setDraggingSkillIndex] = useState<{ groupId: string; index: number } | null>(null);
  const [dragOverSkillIndex, setDragOverSkillIndex] = useState<{ groupId: string; index: number } | null>(null);

  const addGroup = () => onChange([...data, newGroup()]);

  const updateGroup = (id: string, field: keyof SkillGroup, value: unknown) =>
    onChange(data.map((g) => (g.id === id ? { ...g, [field]: value } : g)));

  const removeGroup = (id: string) => onChange(data.filter((g) => g.id !== id));

  const addSkill = (groupId: string) => {
    const val = (inputValues[groupId] || "").trim();
    if (!val) return;
    const group = data.find((g) => g.id === groupId);
    if (!group || group.skills.includes(val)) return;
    updateGroup(groupId, "skills", [...group.skills, val]);
    setInputValues((prev) => ({ ...prev, [groupId]: "" }));
  };

  const handleSkillDragStart = (groupId: string, index: number) => {
    setDraggingSkillIndex({ groupId, index });
  };

  const handleSkillDragOver = (e: React.DragEvent, groupId: string, index: number) => {
    e.preventDefault();
    if (draggingSkillIndex && draggingSkillIndex.groupId === groupId) {
      setDragOverSkillIndex({ groupId, index });
    }
  };

  const handleSkillDrop = (groupId: string, dropIndex: number) => {
    if (!draggingSkillIndex || draggingSkillIndex.groupId !== groupId) return;
    const group = data.find((g) => g.id === groupId);
    if (!group) return;

    const newSkills = [...group.skills];
    const [moved] = newSkills.splice(draggingSkillIndex.index, 1);
    newSkills.splice(dropIndex, 0, moved);

    updateGroup(groupId, "skills", newSkills);
    setDraggingSkillIndex(null);
    setDragOverSkillIndex(null);
  };

  const removeSkill = (groupId: string, skill: string) => {
    const group = data.find((g) => g.id === groupId);
    if (!group) return;
    updateGroup(groupId, "skills", group.skills.filter((s) => s !== skill));
  };

  return (
    <div className="space-y-4">
      <p className="text-xs text-gray-500">
        Group by category (e.g. &quot;Languages&quot;, &quot;Frameworks&quot;). Press Enter to add a skill tag.
      </p>

      {data.length === 0 && (
        <div className="text-center py-6 text-gray-400 text-sm">
          No skill groups yet. Add your skills manually below.
        </div>
      )}

      {data.map((group) => (
        <div key={group.id} className="border border-gray-200 rounded-xl p-4 space-y-3">
          <div className="flex items-center gap-2">
            <input
              className="form-input flex-1"
              placeholder="Category (e.g. Programming Languages)"
              value={group.category}
              onChange={(e) => updateGroup(group.id, "category", e.target.value)}
            />
            <button
              onClick={() => removeGroup(group.id)}
              className="text-gray-300 hover:text-red-400 transition-colors flex-shrink-0"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex flex-wrap gap-2 min-h-[32px]">
            {group.skills.map((skill, index) => {
              const isDragging = draggingSkillIndex?.groupId === group.id && draggingSkillIndex.index === index;
              const isOver = dragOverSkillIndex?.groupId === group.id && dragOverSkillIndex.index === index;

              return (
                <div
                  key={skill}
                  draggable
                  onDragStart={() => handleSkillDragStart(group.id, index)}
                  onDragOver={(e) => handleSkillDragOver(e, group.id, index)}
                  onDrop={() => handleSkillDrop(group.id, index)}
                  onDragEnd={() => {
                    setDraggingSkillIndex(null);
                    setDragOverSkillIndex(null);
                  }}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 text-indigo-700 text-xs font-medium rounded-2xl border border-indigo-100 shadow-sm cursor-move transition-all ${
                    isDragging ? "opacity-30 scale-95" : "opacity-100 scale-100"
                  } ${isOver ? "border-indigo-400 bg-indigo-100 -translate-y-1" : ""}`}
                >
                  {skill}
                  <button
                    onClick={() => removeSkill(group.id, skill)}
                    onMouseDown={(e) => e.stopPropagation()}
                    className="w-3.5 h-3.5 flex items-center justify-center rounded-full hover:bg-indigo-300 transition-colors text-indigo-300 hover:text-indigo-600 ml-1 text-sm leading-none"
                  >
                    x
                  </button>
                </div>
              );
            })}
          </div>

          <div className="flex gap-2">
            <input
              className="form-input flex-1 text-sm"
              placeholder="Type a skill and press Enter"
              value={inputValues[group.id] || ""}
              onChange={(e) => setInputValues((prev) => ({ ...prev, [group.id]: e.target.value }))}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === ",") {
                  e.preventDefault();
                  addSkill(group.id);
                }
              }}
            />
            <button
              onClick={() => addSkill(group.id)}
              className="px-3 py-2 bg-indigo-500 text-white text-sm rounded-lg hover:bg-indigo-600 transition-colors"
            >
              Add
            </button>
          </div>
        </div>
      ))}

      <button
        onClick={addGroup}
        className="w-full py-3 border-2 border-dashed border-indigo-200 rounded-xl text-sm text-indigo-400 hover:border-indigo-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all flex items-center justify-center gap-2"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        Add Skill Group
      </button>
    </div>
  );
}
