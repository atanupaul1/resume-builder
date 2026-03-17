"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowDown01Icon, Tick01Icon } from "@hugeicons/core-free-icons";

type TemplateId = "minimal" | "modern" | "ats" | "executive" | "academic" | "tech";

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
    label: "ATS Friendly",
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
  {
    id: "executive",
    label: "Executive",
    description: "Corporate & Polished",
    preview: (
      <svg viewBox="0 0 60 80" className="w-full h-full">
        <rect width="60" height="80" fill="white" />
        <rect width="60" height="12" fill="#1e3a8a" />
        <rect x="6" y="16" width="48" height="4" fill="#e2e8f0" />
        <rect x="6" y="22" width="48" height="1" fill="#cbd5e1" />
        <rect x="6" y="26" width="30" height="2" fill="#1e3a8a" />
        <rect x="6" y="30" width="48" height="0.5" fill="#1e3a8a" />
        <rect x="6" y="34" width="48" height="8" fill="#f8fafc" />
        <rect x="6" y="46" width="30" height="2" fill="#1e3a8a" />
        <rect x="6" y="50" width="48" height="0.5" fill="#1e3a8a" />
        <rect x="6" y="54" width="48" height="15" fill="#f8fafc" />
      </svg>
    )
  },
  {
    id: "academic",
    label: "Academic",
    description: "Research Focused",
    preview: (
      <svg viewBox="0 0 60 80" className="w-full h-full">
        <rect width="60" height="80" fill="white" />
        <rect x="15" y="4" width="30" height="4" fill="#581c87" />
        <rect x="10" y="10" width="40" height="1" fill="#e2e8f0" />
        <rect x="6" y="16" width="48" height="1" fill="#581c87" />
        <rect x="15" y="20" width="30" height="1" fill="#94a3b8" />
        <rect x="15" y="23" width="30" height="1" fill="#94a3b8" />
        <rect x="6" y="28" width="48" height="1" fill="#581c87" />
        <rect x="6" y="32" width="48" height="10" fill="#f5f3ff" />
        <rect x="6" y="46" width="48" height="1" fill="#581c87" />
        <rect x="6" y="50" width="48" height="15" fill="#f5f3ff" />
      </svg>
    )
  },
  {
    id: "tech",
    label: "Tech",
    description: "Modern Developer",
    preview: (
      <svg viewBox="0 0 60 80" className="w-full h-full">
        <rect width="60" height="80" fill="#020617" />
        <rect width="20" height="80" fill="#0f172a" />
        <rect x="4" y="6" width="12" height="12" rx="2" fill="#1e293b" />
        <rect x="4" y="24" width="12" height="2" fill="#0ea5e9" />
        <rect x="4" y="28" width="12" height="10" fill="#1e293b" />
        <rect x="24" y="6" width="30" height="4" fill="#0ea5e9" />
        <rect x="24" y="14" width="30" height="1" fill="#334155" />
        <rect x="24" y="18" width="30" height="25" fill="#0f172a" />
        <rect x="24" y="48" width="30" height="1" fill="#334155" />
        <rect x="24" y="52" width="30" height="20" fill="#0f172a" />
      </svg>
    )
  }
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
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const activeTemplate = templates.find((t) => t.id === active) || templates[0];

  return (
    <div className="flex items-center gap-4 px-4 py-2 bg-white border-b border-gray-100 flex-shrink-0 z-50">
      {/* Template Dropdown */}
      <div className="flex items-center gap-2" ref={dropdownRef}>
        <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mr-1 whitespace-nowrap">Template</span>
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`flex items-center gap-3 px-3 py-1.5 rounded-xl border text-sm transition-all min-w-[160px] ${
              isOpen ? "border-indigo-400 ring-2 ring-indigo-50 shadow-sm" : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <div className="w-6 h-8 rounded-md overflow-hidden border border-gray-100 flex-shrink-0 shadow-sm">
              {activeTemplate.preview}
            </div>
            <div className="flex-1 text-left">
              <p className="text-[11px] font-bold text-gray-900 leading-none">{activeTemplate.label}</p>
              <p className="text-[9px] text-gray-500 font-medium mt-0.5">{activeTemplate.description}</p>
            </div>
            <HugeiconsIcon icon={ArrowDown01Icon} size={14} className={`text-gray-500 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
          </button>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className="absolute top-full left-0 mt-2 w-72 bg-white rounded-2xl border border-gray-100 shadow-2xl p-2 z-[100]"
              >
                <div className="grid grid-cols-1 gap-1">
                  {templates.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => {
                        onChange(t.id);
                        setIsOpen(false);
                      }}
                      className={`flex items-center gap-3 p-2 rounded-xl transition-all text-left group ${
                        active === t.id ? "bg-indigo-50" : "hover:bg-gray-50"
                      }`}
                    >
                      <div className="w-10 h-13 rounded-lg overflow-hidden border border-gray-100 flex-shrink-0 shadow-sm bg-white">
                        {t.preview}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-1.5">
                          <p className={`text-xs font-bold ${active === t.id ? "text-indigo-600" : "text-gray-900"}`}>
                            {t.label}
                          </p>
                          {active === t.id && <HugeiconsIcon icon={Tick01Icon} size={12} className="text-indigo-600" />}
                        </div>
                        <p className="text-[10px] text-gray-500 leading-tight mt-0.5 font-medium">{t.description}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="w-px h-8 bg-gray-200 mx-1" />

      {/* Accent color picker */}
      <div className="flex items-center gap-2">
        <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold whitespace-nowrap">Accent</span>
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
          <label className="w-5 h-5 rounded-full overflow-hidden cursor-pointer border border-gray-200 flex-shrink-0 hover:bg-gray-50 transition-colors" title="Custom color">
            <input
              type="color"
              value={accentColor}
              onChange={(e) => onAccentChange(e.target.value)}
              className="opacity-0 w-0 h-0"
            />
            <span className="w-full h-full flex items-center justify-center text-[10px] text-gray-400">+</span>
          </label>
        </div>
      </div>
    </div>
  );
}
