"use client";
import { SkillGroup, ResumeData } from "@/types/resume";
import { useState } from "react";

interface Props {
  data: SkillGroup[];
  resumeData: ResumeData;
  onChange: (data: SkillGroup[]) => void;
}

const newGroup = (): SkillGroup => ({
  id: crypto.randomUUID(),
  category: "",
  skills: [],
});

export default function SkillsForm({ data, resumeData, onChange }: Props) {
  const [inputValues, setInputValues] = useState<Record<string, string>>({});
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState("");
  const [suggestedGroups, setSuggestedGroups] = useState<{ category: string; skills: string[] }[]>([]);

  const addGroup = () => onChange([...data, newGroup()]);

  const updateGroup = (id: string, field: keyof SkillGroup, value: unknown) =>
    onChange(data.map((g) => (g.id === id ? { ...g, [field]: value } : g)));

  const removeGroup = (id: string) => onChange(data.filter((g) => g.id !== id));

  const addSkill = (groupId: string) => {
    const val = (inputValues[groupId] || "").trim();
    if (!val) return;
    const group = data.find((g) => g.id === groupId)!;
    if (group.skills.includes(val)) return;
    updateGroup(groupId, "skills", [...group.skills, val]);
    setInputValues((prev) => ({ ...prev, [groupId]: "" }));
  };

  const removeSkill = (groupId: string, skill: string) => {
    const group = data.find((g) => g.id === groupId)!;
    updateGroup(groupId, "skills", group.skills.filter((s) => s !== skill));
  };

  const suggestSkills = async () => {
    setAiLoading(true);
    setAiError("");
    setSuggestedGroups([]);
    try {
      const existingSkills = data.flatMap((g) => g.skills);
      const res = await fetch("/api/ai/suggest-skills", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobTitle: resumeData.personalInfo.jobTitle,
          existingSkills,
          experience: resumeData.workExperience,
        }),
      });
      const json = await res.json();
      if (json.error) throw new Error(json.error);
      setSuggestedGroups(json.groups || []);
    } catch (err) {
      setAiError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setAiLoading(false);
    }
  };

  const addSuggestedGroup = (group: { category: string; skills: string[] }) => {
    onChange([
      ...data,
      { id: crypto.randomUUID(), category: group.category, skills: group.skills },
    ]);
    setSuggestedGroups((prev) => prev.filter((g) => g.category !== group.category));
  };

  const addSingleSkill = (groupId: string, skill: string) => {
    const group = data.find((g) => g.id === groupId);
    if (!group) return;
    if (group.skills.includes(skill)) return;
    updateGroup(groupId, "skills", [...group.skills, skill]);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-xs text-gray-500">
          Group by category (e.g. &quot;Languages&quot;, &quot;Frameworks&quot;). Press Enter to add a skill tag.
        </p>
        <button
          onClick={suggestSkills}
          disabled={aiLoading}
          className="flex-shrink-0 flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-medium text-indigo-600 bg-indigo-50 border border-indigo-200 rounded-lg hover:bg-indigo-100 transition-all disabled:opacity-50"
        >
          {aiLoading ? (
            <svg className="w-3 h-3 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
            </svg>
          ) : (
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
            </svg>
          )}
          {aiLoading ? "Suggesting..." : "Suggest skills"}
        </button>
      </div>

      {/* AI Error */}
      {aiError && (
        <p className="text-xs text-red-500 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{aiError}</p>
      )}

      {/* AI Suggested Groups */}
      {suggestedGroups.length > 0 && (
        <div className="rounded-xl border border-indigo-200 bg-gradient-to-br from-indigo-50 to-violet-50 p-3 space-y-2">
          <div className="flex items-center gap-1.5 mb-2">
            <svg className="w-3 h-3 text-indigo-500" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
            </svg>
            <span className="text-[11px] font-semibold text-indigo-600 uppercase tracking-wider">
              AI Suggestions — click to add
            </span>
            <button onClick={() => setSuggestedGroups([])} className="ml-auto text-indigo-300 hover:text-indigo-500">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {suggestedGroups.map((group) => (
            <div key={group.category} className="bg-white rounded-lg border border-indigo-100 p-2.5">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-semibold text-gray-700">{group.category}</span>
                <button
                  onClick={() => addSuggestedGroup(group)}
                  className="text-[11px] text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1"
                >
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add all
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {group.skills.map((skill) => {
                  const alreadyExists = data.some((g) => g.skills.includes(skill));
                  return (
                    <button
                      key={skill}
                      disabled={alreadyExists}
                      onClick={() => {
                        // Find a matching category group or create new
                        const match = data.find((g) => g.category.toLowerCase() === group.category.toLowerCase());
                        if (match) {
                          addSingleSkill(match.id, skill);
                        } else {
                          onChange([...data, { id: crypto.randomUUID(), category: group.category, skills: [skill] }]);
                        }
                        setSuggestedGroups((prev) =>
                          prev.map((g) =>
                            g.category === group.category
                              ? { ...g, skills: g.skills.filter((s) => s !== skill) }
                              : g
                          ).filter((g) => g.skills.length > 0)
                        );
                      }}
                      className={`text-[11px] px-2 py-1 rounded-full border transition-all
                        ${alreadyExists
                          ? "bg-gray-50 text-gray-300 border-gray-100 cursor-not-allowed line-through"
                          : "bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100 cursor-pointer"
                        }`}
                    >
                      {alreadyExists ? "" : "+ "}{skill}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Existing skill groups */}
      {data.length === 0 && !suggestedGroups.length && (
        <div className="text-center py-6 text-gray-400 text-sm">
          No skill groups yet. Add manually or use AI suggestions above.
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
            {group.skills.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center gap-1 px-3 py-1 bg-indigo-50 text-indigo-700 text-xs rounded-full border border-indigo-200"
              >
                {skill}
                <button onClick={() => removeSkill(group.id, skill)} className="text-indigo-400 hover:text-indigo-700 ml-1">×</button>
              </span>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              className="form-input flex-1 text-sm"
              placeholder="Type a skill and press Enter"
              value={inputValues[group.id] || ""}
              onChange={(e) => setInputValues((prev) => ({ ...prev, [group.id]: e.target.value }))}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === ",") { e.preventDefault(); addSkill(group.id); }
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
