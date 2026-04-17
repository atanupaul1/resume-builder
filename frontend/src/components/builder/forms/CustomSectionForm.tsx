"use client";
import { CustomSection } from "@/types/resume";

interface Props {
  data: CustomSection[];
  onChange: (data: CustomSection[]) => void;
}

export default function CustomSectionForm({ data, onChange }: Props) {
  const addSection = () => {
    onChange([
      ...data,
      { id: Math.random().toString(36).substring(2, 9), title: "New Section", content: "" },
    ]);
  };

  const removeSection = (id: string) => {
    onChange(data.filter((s) => s.id !== id));
  };

  const updateSection = (id: string, field: keyof CustomSection, value: string) => {
    onChange(data.map((s) => (s.id === id ? { ...s, [field]: value } : s)));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Custom Sections</h3>
      </div>

      <div className="space-y-4">
        {data.map((section) => (
          <div key={section.id} className="p-4 bg-gray-50/50 rounded-2xl border border-gray-100 relative group transition-all hover:bg-white hover:shadow-sm">
            <button
              onClick={() => removeSection(section.id)}
              className="absolute -right-2 -top-2 w-6 h-6 bg-white border border-rose-100 text-rose-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:bg-rose-50 z-10"
              title="Remove Section"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>

            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-black uppercase tracking-wider text-gray-500 mb-1.5 block">Section Title</label>
                <input
                  className="form-input"
                  placeholder="e.g. Projects, Certifications, Awards"
                  value={section.title}
                  onChange={(e) => updateSection(section.id, "title", e.target.value)}
                />
              </div>
              <div>
                <label className="text-[10px] font-black uppercase tracking-wider text-gray-500 mb-1.5 block">Content</label>
                <textarea
                  className="form-input min-h-[120px] py-3 resize-y"
                  placeholder="Add your custom content here..."
                  value={section.content}
                  onChange={(e) => updateSection(section.id, "content", e.target.value)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={addSection}
        className="w-full py-4 border-2 border-dashed border-gray-200 rounded-2xl text-gray-400 hover:text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50/30 transition-all flex items-center justify-center gap-2 group"
      >
        <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" /></svg>
        <span className="text-xs font-bold uppercase tracking-widest">Add Custom Section</span>
      </button>
    </div>
  );
}
