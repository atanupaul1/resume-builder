"use client";

import React, { useState, useRef, useEffect } from "react";

type TemplateId = "minimal" | "modern" | "ats" | "executive" | "current" | "creative";

interface Template {
  id: TemplateId;
  label: string;
  description: string;
  preview: React.ReactNode;
}

export const templates: Template[] = [
  { id: "minimal", label: "Minimalist", description: "Clean & classic", preview: <svg viewBox="0 0 60 80" className="w-full h-full"><rect width="60" height="80" fill="white" /><rect x="6" y="8" width="28" height="4" rx="1" fill="#111" /><rect x="6" y="14" width="18" height="2" rx="1" fill="#9ca3af" /><rect x="6" y="18" width="48" height="0.5" fill="#e5e7eb" /><rect x="6" y="24" width="46" height="1.5" rx="0.5" fill="#f3f4f6" /><rect x="6" y="28" width="42" height="1.5" rx="0.5" fill="#f3f4f6" /><rect x="6" y="36" width="12" height="2" rx="1" fill="#6b7280" /><rect x="6" y="40" width="30" height="1.5" rx="0.5" fill="#111" /><rect x="6" y="44" width="20" height="1.5" rx="0.5" fill="#9ca3af" /><rect x="6" y="50" width="46" height="1" rx="0.5" fill="#f3f4f6" /></svg> },
  { id: "modern", label: "Modern", description: "2-col with sidebar", preview: <svg viewBox="0 0 60 80" className="w-full h-full"><rect width="60" height="80" fill="white" /><rect width="60" height="14" fill="#6C63FF" /><rect width="18" height="66" y="14" fill="#f9f9fb" /><rect x="20" y="18" width="20" height="2" rx="0.5" fill="#111" /><rect x="20" y="22" width="36" height="1" rx="0.5" fill="#e5e7eb" /><rect x="20" y="26" width="30" height="1" rx="0.5" fill="#f3f4f6" /><rect x="20" y="35" width="20" height="2" rx="0.5" fill="#111" /><rect x="20" y="39" width="36" height="1" rx="0.5" fill="#e5e7eb" /></svg> },
  { id: "ats", label: "ATS Friendly", description: "Machine-readable", preview: <svg viewBox="0 0 60 80" className="w-full h-full"><rect width="60" height="80" fill="white" /><rect x="8" y="6" width="44" height="5" rx="0.5" fill="#111" /><rect x="8" y="13" width="44" height="2" rx="0.5" fill="#d1d5db" /><rect x="6" y="18" width="14" height="2" rx="0.5" fill="#111" /><rect x="6" y="22" width="48" height="0.5" fill="#000" /><rect x="6" y="24" width="46" height="1" rx="0.5" fill="#e5e7eb" /><rect x="6" y="38" width="30" height="1.5" rx="0.5" fill="#111" /><rect x="6" y="42" width="46" height="1" rx="0.5" fill="#d1d5db" /></svg> },
  { id: "executive", label: "Executive", description: "Corporate & polished", preview: <svg viewBox="0 0 60 80" className="w-full h-full"><rect width="60" height="80" fill="white" /><rect width="60" height="12" fill="#1e3a8a" /><rect x="6" y="26" width="30" height="2" fill="#1e3a8a" /><rect x="6" y="30" width="48" height="0.5" fill="#1e3a8a" /><rect x="6" y="34" width="48" height="8" fill="#f8fafc" /><rect x="6" y="46" width="30" height="2" fill="#1e3a8a" /><rect x="6" y="50" width="48" height="0.5" fill="#1e3a8a" /></svg> },
  { id: "current", label: "Current", description: "Sharp modern tech", preview: <svg viewBox="0 0 60 80" className="w-full h-full"><rect width="60" height="25" fill="#1e293b" /><rect width="60" height="55" y="25" fill="white" /><rect x="6" y="32" width="20" height="3" rx="1.5" fill="#f1f5f9" stroke="#e2e8f0" strokeWidth="0.5" /><rect x="30" y="32" width="24" height="3" rx="1.5" fill="#f1f5f9" stroke="#e2e8f0" strokeWidth="0.5" /><rect x="6" y="42" width="48" height="2" fill="#1e293b" /></svg> },
  { id: "creative", label: "Creative", description: "Vibrant but print-safe", preview: <svg viewBox="0 0 60 80" className="w-full h-full"><rect width="60" height="80" fill="white" /><rect x="6" y="6" width="15" height="15" rx="4" fill="#ec4899" transform="rotate(-5, 13, 13)" /><rect x="25" y="8" width="25" height="4" fill="#0f172a" /><rect x="25" y="14" width="15" height="2" fill="#ec4899" /><rect x="6" y="28" width="2" height="15" fill="#f1f5f9" /><circle cx="6" cy="32" r="2" fill="#ec4899" /><rect x="12" y="30" width="40" height="10" fill="#f8fafc" /></svg> },
];

interface Props {
  active: TemplateId;
  onChange: (id: TemplateId) => void;
  accentColor: string;
  onAccentChange: (color: string) => void;
}

const PRESET_COLORS = ["#6C63FF", "#111827", "#0f766e", "#1d4ed8", "#9333ea", "#dc2626", "#ea580c", "#16a34a", "#0369a1", "#7c3aed"];

export default function TemplateSwitcher({ active, onChange, accentColor, onAccentChange }: Props) {
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
  const colorPickerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (colorPickerRef.current && !colorPickerRef.current.contains(event.target as Node)) setIsColorPickerOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative z-50 flex flex-col gap-3 px-4 py-3 bg-white/70 backdrop-blur-xl border-b border-white/70 flex-shrink-0 shadow-[0_1px_0_rgba(15,23,42,0.03)]">
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <span className="text-[10px] uppercase tracking-[0.25em] text-gray-500 font-black whitespace-nowrap">Template</span>
        <div className="inline-flex rounded-full border border-gray-200 bg-white/90 p-1 shadow-sm">
          {templates.map((t) => {
            const isActive = active === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => onChange(t.id)}
                className={`px-3 py-1.5 rounded-full text-[11px] font-bold transition-all whitespace-nowrap ${
                  isActive
                    ? "bg-gray-900 text-white shadow-sm"
                    : "text-gray-600 hover:text-indigo-700"
                }`}
              >
                {t.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex items-center gap-2 min-w-max">
        <span className="text-[10px] uppercase tracking-[0.25em] text-gray-500 font-black whitespace-nowrap">Accent</span>
        <div className="flex items-center gap-1">
          {PRESET_COLORS.map((color) => (
            <button
              key={color}
              onClick={() => onAccentChange(color)}
              title={color}
              className="w-5 h-5 rounded-full border-2 transition-all hover:scale-110 flex-shrink-0"
              style={{
                backgroundColor: color,
                borderColor: accentColor === color ? color : "transparent",
                boxShadow: accentColor === color ? `0 0 0 2px white, 0 0 0 4px ${color}` : "none",
              }}
            />
          ))}

          <div className="relative ml-1 z-50" ref={colorPickerRef}>
            <button
              onClick={() => setIsColorPickerOpen(!isColorPickerOpen)}
              type="button"
              className="w-6 h-6 rounded-full overflow-hidden border-2 border-gray-100 flex-shrink-0 hover:border-gray-300 transition-all flex items-center justify-center p-[2px] bg-white"
              title="Enter HEX code"
              style={{
                boxShadow: !PRESET_COLORS.includes(accentColor) ? `0 0 0 2px white, 0 0 0 4px ${accentColor}` : "none",
              }}
            >
              <div
                className="w-full h-full rounded-full transition-colors flex items-center justify-center"
                style={{ background: !PRESET_COLORS.includes(accentColor) ? accentColor : "conic-gradient(from 0deg, red, yellow, green, cyan, blue, magenta, red)" }}
              >
                {!PRESET_COLORS.includes(accentColor) && <div className="w-1.5 h-1.5 rounded-full bg-white shadow-sm" />}
              </div>
            </button>

            {isColorPickerOpen && (
              <div className="absolute right-0 top-full mt-4 w-48 bg-white rounded-2xl border border-gray-100 shadow-2xl p-4 z-[220]">
                <div className="space-y-3">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.25em]">Custom HEX</p>
                  <div className="relative">
                    <input
                      type="text"
                      value={accentColor.toUpperCase()}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (val.startsWith("#") && val.length <= 7) onAccentChange(val);
                        else if (!val.startsWith("#") && val.length <= 6) onAccentChange(`#${val}`);
                      }}
                      className="w-full pl-8 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs font-mono font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 transition-all"
                      placeholder="#000000"
                    />
                    <div className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 rounded shadow-sm border border-white" style={{ backgroundColor: accentColor }} />
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-50">
                    <input
                      type="color"
                      value={accentColor}
                      onChange={(e) => onAccentChange(e.target.value)}
                      className="w-full h-8 rounded-lg cursor-pointer opacity-0 absolute pointer-events-none"
                      id="native-color"
                    />
                    <label htmlFor="native-color" className="col-span-2 text-center py-2 bg-indigo-50 text-indigo-600 rounded-lg text-[10px] font-bold hover:bg-indigo-100 cursor-pointer transition-colors">
                      Open Visual Picker
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
