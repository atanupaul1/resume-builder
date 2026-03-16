"use client";

type TemplateId = "minimal" | "modern" | "ats";

interface Template {
  id: TemplateId;
  label: string;
  description: string;
  preview: React.ReactNode;
}

const templates: Template[] = [
  {
    id: "minimal",
    label: "Minimalist",
    description: "Clean & classic",
    preview: (
      <svg viewBox="0 0 60 80" className="w-full h-full">
        <rect width="60" height="80" fill="white" />
        <rect x="6" y="8" width="28" height="4" rx="1" fill="#111" />
        <rect x="6" y="14" width="18" height="2" rx="1" fill="#9ca3af" />
        <rect x="6" y="18" width="48" height="0.5" fill="#e5e7eb" />
        <rect x="6" y="22" width="12" height="2" rx="1" fill="#6b7280" />
        <rect x="6" y="26" width="48" height="1.5" rx="0.5" fill="#f3f4f6" />
        <rect x="6" y="29" width="44" height="1.5" rx="0.5" fill="#f3f4f6" />
        <rect x="6" y="35" width="12" height="2" rx="1" fill="#6b7280" />
        <rect x="6" y="39" width="30" height="1.5" rx="0.5" fill="#111" />
        <rect x="6" y="43" width="20" height="1.5" rx="0.5" fill="#9ca3af" />
        <rect x="6" y="47" width="46" height="1" rx="0.5" fill="#f3f4f6" />
        <rect x="6" y="50" width="42" height="1" rx="0.5" fill="#f3f4f6" />
        <rect x="6" y="58" width="12" height="2" rx="1" fill="#6b7280" />
        <rect x="6" y="62" width="30" height="1.5" rx="0.5" fill="#111" />
        <rect x="6" y="66" width="20" height="1.5" rx="0.5" fill="#9ca3af" />
      </svg>
    ),
  },
  {
    id: "modern",
    label: "Modern",
    description: "2-col with sidebar",
    preview: (
      <svg viewBox="0 0 60 80" className="w-full h-full">
        <rect width="60" height="80" fill="white" />
        <rect width="60" height="14" fill="#6C63FF" />
        <rect x="4" y="3" width="26" height="4" rx="1" fill="white" />
        <rect x="4" y="9" width="16" height="2" rx="1" fill="rgba(255,255,255,0.6)" />
        <rect width="18" height="66" y="14" fill="#f9f9fb" />
        <rect x="2" y="18" width="14" height="1.5" rx="0.5" fill="#9ca3af" />
        <rect x="2" y="21" width="14" height="1" rx="0.5" fill="#d1d5db" />
        <rect x="2" y="24" width="12" height="1" rx="0.5" fill="#d1d5db" />
        <rect x="2" y="30" width="14" height="1.5" rx="0.5" fill="#9ca3af" />
        <rect x="2" y="33" width="8" height="5" rx="1" fill="#ede9fe" />
        <rect x="11" y="33" width="5" height="5" rx="1" fill="#ede9fe" />
        <rect x="2" y="40" width="6" height="5" rx="1" fill="#ede9fe" />
        <rect x="9" y="40" width="7" height="5" rx="1" fill="#ede9fe" />
        <rect x="20" y="18" width="20" height="2" rx="0.5" fill="#111" />
        <rect x="20" y="22" width="36" height="1" rx="0.5" fill="#e5e7eb" />
        <rect x="20" y="26" width="36" height="1" rx="0.5" fill="#f3f4f6" />
        <rect x="20" y="29" width="30" height="1" rx="0.5" fill="#f3f4f6" />
        <rect x="20" y="35" width="20" height="2" rx="0.5" fill="#111" />
        <rect x="20" y="39" width="36" height="1" rx="0.5" fill="#e5e7eb" />
        <rect x="20" y="43" width="28" height="1.5" rx="0.5" fill="#111" />
        <rect x="20" y="47" width="20" height="1" rx="0.5" fill="#9ca3af" />
        <rect x="20" y="51" width="34" height="1" rx="0.5" fill="#f3f4f6" />
        <rect x="20" y="54" width="30" height="1" rx="0.5" fill="#f3f4f6" />
      </svg>
    ),
  },
  {
    id: "ats",
    label: "ATS",
    description: "Machine-readable",
    preview: (
      <svg viewBox="0 0 60 80" className="w-full h-full">
        <rect width="60" height="80" fill="white" />
        <rect x="8" y="6" width="44" height="5" rx="0.5" fill="#111" />
        <rect x="8" y="13" width="44" height="2" rx="0.5" fill="#d1d5db" />
        <rect x="6" y="18" width="14" height="2" rx="0.5" fill="#111" />
        <rect x="6" y="22" width="48" height="0.5" fill="#000" />
        <rect x="6" y="24" width="46" height="1" rx="0.5" fill="#e5e7eb" />
        <rect x="6" y="27" width="40" height="1" rx="0.5" fill="#e5e7eb" />
        <rect x="6" y="32" width="16" height="2" rx="0.5" fill="#111" />
        <rect x="6" y="36" width="48" height="0.5" fill="#000" />
        <rect x="6" y="38" width="30" height="1.5" rx="0.5" fill="#111" />
        <rect x="6" y="42" width="46" height="1" rx="0.5" fill="#d1d5db" />
        <rect x="6" y="45" width="42" height="1" rx="0.5" fill="#d1d5db" />
        <rect x="6" y="50" width="38" height="1.5" rx="0.5" fill="#111" />
        <rect x="6" y="54" width="44" height="1" rx="0.5" fill="#d1d5db" />
        <rect x="6" y="60" width="12" height="2" rx="0.5" fill="#111" />
        <rect x="6" y="64" width="48" height="0.5" fill="#000" />
        <rect x="6" y="66" width="44" height="1" rx="0.5" fill="#d1d5db" />
        <rect x="6" y="69" width="38" height="1" rx="0.5" fill="#d1d5db" />
      </svg>
    ),
  },
];

interface Props {
  active: TemplateId;
  onChange: (id: TemplateId) => void;
  accentColor: string;
  onAccentChange: (color: string) => void;
}

const PRESET_COLORS = [
  "#6C63FF", "#111827", "#0f766e", "#1d4ed8", "#9333ea",
  "#dc2626", "#ea580c", "#16a34a", "#0369a1", "#7c3aed",
];

export default function TemplateSwitcher({ active, onChange, accentColor, onAccentChange }: Props) {
  return (
    <div className="flex items-center gap-4 px-4 py-2 bg-white border-b border-gray-100 flex-shrink-0">
      {/* Template cards */}
      <div className="flex items-center gap-2">
        <span className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold mr-1 whitespace-nowrap">Template</span>
        {templates.map((t) => (
          <button
            key={t.id}
            onClick={() => onChange(t.id)}
            title={t.description}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs transition-all ${
              active === t.id
                ? "border-indigo-400 bg-indigo-50 text-indigo-700 font-medium"
                : "border-gray-200 text-gray-500 hover:border-gray-300 hover:bg-gray-50"
            }`}
          >
            <span className="w-7 h-9 rounded overflow-hidden border border-gray-200 flex-shrink-0 inline-block">
              {t.preview}
            </span>
            {t.label}
          </button>
        ))}
      </div>

      <div className="w-px h-8 bg-gray-200 mx-1" />

      {/* Accent color picker */}
      <div className="flex items-center gap-2">
        <span className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold whitespace-nowrap">Accent</span>
        <div className="flex items-center gap-1">
          {PRESET_COLORS.map((color) => (
            <button
              key={color}
              onClick={() => onAccentChange(color)}
              title={color}
              className="w-5 h-5 rounded-full border-2 transition-transform hover:scale-110 flex-shrink-0"
              style={{
                backgroundColor: color,
                borderColor: accentColor === color ? color : "transparent",
                outline: accentColor === color ? `2px solid ${color}` : "none",
                outlineOffset: "1px",
              }}
            />
          ))}
          {/* Custom color input */}
          <label className="w-5 h-5 rounded-full overflow-hidden cursor-pointer border border-gray-200 flex-shrink-0" title="Custom color">
            <input
              type="color"
              value={accentColor}
              onChange={(e) => onAccentChange(e.target.value)}
              className="opacity-0 w-0 h-0"
            />
            <span className="w-full h-full flex items-center justify-center text-[8px] text-gray-400">+</span>
          </label>
        </div>
      </div>
    </div>
  );
}
