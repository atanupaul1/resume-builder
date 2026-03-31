"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowDown01Icon, Tick01Icon } from "@hugeicons/core-free-icons";

type TemplateId = "minimal" | "modern" | "ats" | "executive" | "academic" | "tech" | "glassmorphism" | "portfolio" | "timeline" | "compact" | "newspaper" | "skill-based" | "contemporary" | "essential" | "polished" | "current" | "elegant" | "indigo" | "crisp" | "professional" | "avant-garde" | "creative" | "iconic";

interface Template {
  id: TemplateId;
  label: string;
  description: string;
  preview: React.ReactNode;
}

export const templates: Template[] = [
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
  },
  {
    id: "glassmorphism",
    label: "Glassmorphism",
    description: "Modern Frosted UI",
    preview: (
      <svg viewBox="0 0 60 80" className="w-full h-full">
        <defs>
          <linearGradient id="glassGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
        </defs>
        <rect width="60" height="80" fill="url(#glassGrad)" />
        <rect x="6" y="8" width="20" height="20" rx="4" fill="rgba(255,255,255,0.2)" stroke="rgba(255,255,255,0.3)" />
        <rect x="30" y="8" width="24" height="25" rx="4" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.2)" />
        <rect x="6" y="38" width="48" height="34" rx="4" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.2)" />
        <rect x="12" y="44" width="36" height="2" fill="white" opacity="0.5" />
        <rect x="12" y="50" width="24" height="1" fill="white" opacity="0.3" />
      </svg>
    )
  },
  {
    id: "portfolio",
    label: "Creative Portfolio",
    description: "Designer Focus",
    preview: (
      <svg viewBox="0 0 60 80" className="w-full h-full">
        <rect width="60" height="80" fill="#fff" />
        <rect width="60" height="24" fill="#f43f5e" />
        <rect x="20" y="6" width="20" height="4" fill="#fbbf24" />
        <rect x="10" y="32" width="40" height="20" rx="2" fill="#fff1f2" stroke="#f43f5e" strokeWidth="0.5" />
        <rect x="10" y="58" width="40" height="12" rx="2" fill="#fef3c7" stroke="#fbbf24" strokeWidth="0.5" />
      </svg>
    )
  },
  {
    id: "timeline",
    label: "Timeline",
    description: "Professional History",
    preview: (
      <svg viewBox="0 0 60 80" className="w-full h-full">
        <rect width="60" height="80" fill="#fff" />
        <line x1="12" y1="10" x2="12" y2="70" stroke="#e2e8f0" strokeWidth="1" />
        {[20, 40, 60].map(y => (
          <g key={y}>
            <circle cx="12" cy={y} r="2" fill="#10b981" />
            <rect x="18" y={y - 4} width="30" height="8" rx="1" fill="#f0fdf4" />
            <rect x="4" y={y - 2} width="6" height="4" fill="#e2e8f0" />
          </g>
        ))}
      </svg>
    )
  },
  {
    id: "compact",
    label: "Compact One-Page",
    description: "Space Optimized",
    preview: (
      <svg viewBox="0 0 60 80" className="w-full h-full">
        <rect width="60" height="80" fill="#fff" />
        <rect x="4" y="4" width="52" height="6" fill="#f8fafc" />
        <rect x="4" y="14" width="24" height="62" fill="#fff" stroke="#f1f5f9" />
        <rect x="32" y="14" width="24" height="62" fill="#fff" stroke="#f1f5f9" />
        {[18, 22, 26, 30].map(y => <rect key={y} x="6" y={y} width="20" height="1" fill="#e2e8f0" />)}
      </svg>
    )
  },
  {
    id: "newspaper",
    label: "Newspaper",
    description: "Editorial Style",
    preview: (
      <svg viewBox="0 0 60 80" className="w-full h-full">
        <rect width="60" height="80" fill="#fdfbf7" />
        <rect x="4" y="4" width="52" height="4" fill="#111" />
        <line x1="4" y1="10" x2="56" y2="10" stroke="#111" strokeWidth="0.5" />
        <line x1="30" y1="14" x2="30" y2="76" stroke="#111" strokeWidth="0.2" />
        <rect x="4" y="14" width="22" height="20" fill="#111" opacity="0.05" />
        <rect x="34" y="14" width="22" height="40" fill="#111" opacity="0.05" />
      </svg>
    )
  },
  {
    id: "skill-based",
    label: "Skill Dashboard",
    description: "Skills-First Vibe",
    preview: (
      <svg viewBox="0 0 60 80" className="w-full h-full">
        <rect width="60" height="80" fill="#fff" />
        <rect x="4" y="4" width="52" height="20" rx="3" fill="#eef2ff" />
        <rect x="8" y="8" width="12" height="12" rx="2" fill="#6366f1" opacity="0.2" />
        <rect x="24" y="8" width="12" height="12" rx="2" fill="#06b6d4" opacity="0.2" />
        <rect x="40" y="8" width="12" height="12" rx="2" fill="#6366f1" opacity="0.2" />
        <rect x="4" y="28" width="52" height="48" rx="2" fill="#f8fafc" />
      </svg>
    )
  },
  {
    id: "contemporary",
    label: "Contemporary",
    description: "Bold & Structured",
    preview: (
      <svg viewBox="0 0 60 80" className="w-full h-full">
        <rect width="60" height="80" fill="white" />
        <rect x="0" y="8" width="4" height="15" fill="#2563eb" />
        <rect x="8" y="8" width="30" height="4" rx="1" fill="#111" />
        <rect x="8" y="14" width="20" height="2" rx="1" fill="#2563eb" />
        <rect x="8" y="20" width="40" height="1.5" rx="0.5" fill="#64748b" />

        <rect x="8" y="32" width="45" height="1" fill="#2563eb" opacity="0.2" />
        <rect x="8" y="38" width="15" height="2" fill="#2563eb" rx="0.5" />
        <rect x="8" y="44" width="30" height="1.5" rx="0.5" fill="#111" />
        <rect x="8" y="48" width="20" height="1" rx="0.5" fill="#64748b" />

        <rect x="8" y="58" width="45" height="1" fill="#2563eb" opacity="0.2" />
        <rect x="8" y="64" width="15" height="2" fill="#2563eb" rx="0.5" />
        <rect x="8" y="70" width="30" height="1.5" rx="0.5" fill="#111" />
      </svg>
    )
  },
  {
    id: "essential",
    label: "Essential",
    description: "Corporate & Clean",
    preview: (
      <svg viewBox="0 0 60 80" className="w-full h-full">
        <rect width="60" height="80" fill="white" />
        <rect x="15" y="8" width="30" height="4" rx="1" fill="#111" />
        <rect x="10" y="14" width="40" height="1" rx="0.5" fill="#e5e7eb" />

        <rect x="6" y="22" width="48" height="1.5" fill="#334155" />
        <rect x="6" y="28" width="20" height="1.5" rx="0.5" fill="#111" />
        <rect x="34" y="28" width="20" height="1" rx="0.5" fill="#64748b" />
        <rect x="6" y="32" width="48" height="8" fill="#f8fafc" />

        <rect x="6" y="46" width="48" height="1.5" fill="#334155" />
        <rect x="6" y="52" width="30" height="1.5" rx="0.5" fill="#111" />
        <rect x="6" y="56" width="20" height="1" rx="0.5" fill="#64748b" />
        <rect x="6" y="60" width="48" height="12" fill="#f8fafc" />
      </svg>
    )
  },
  {
    id: "polished",
    label: "Polished",
    description: "Executive Focus",
    preview: (
      <svg viewBox="0 0 60 80" className="w-full h-full">
        <rect width="60" height="80" fill="white" />
        <rect x="6" y="8" width="40" height="6" fill="#111" />
        <rect x="6" y="16" width="30" height="2" fill="#1e293b" />
        <rect x="6" y="22" width="48" height="0.5" fill="#f1f5f9" />

        <rect x="4" y="28" width="12" height="2" rx="0.5" fill="#94a3b8" />
        <rect x="20" y="28" width="30" height="2" fill="#111" />
        <rect x="20" y="32" width="20" height="1.5" fill="#1e293b" />
        <rect x="20" y="36" width="34" height="8" fill="#f8fafc" />

        <rect x="4" y="48" width="12" height="2" rx="0.5" fill="#94a3b8" />
        <rect x="20" y="48" width="30" height="2" fill="#111" />
        <rect x="20" y="52" width="20" height="1.5" fill="#1e293b" />
        <rect x="20" y="56" width="34" height="12" fill="#f8fafc" />
      </svg>
    )
  },
  {
    id: "current",
    label: "Current",
    description: "High-Energy Tech",
    preview: (
      <svg viewBox="0 0 60 80" className="w-full h-full">
        <rect width="60" height="25" fill="#1e293b" />
        <rect width="60" height="55" y="25" fill="white" />
        <circle cx="30" cy="12" r="6" fill="rgba(255,255,255,0.2)" />
        <rect x="15" y="20" width="30" height="2" fill="white" opacity="0.5" />

        <rect x="6" y="32" width="20" height="3" rx="1.5" fill="#f1f5f9" stroke="#e2e8f0" strokeWidth="0.5" />
        <rect x="30" y="32" width="24" height="3" rx="1.5" fill="#f1f5f9" stroke="#e2e8f0" strokeWidth="0.5" />

        <rect x="6" y="42" width="48" height="2" fill="#1e293b" />
        <rect x="6" y="48" width="48" height="10" fill="#f8fafc" />
        <rect x="6" y="62" width="48" height="10" fill="#f8fafc" />
      </svg>
    )
  },
  {
    id: "elegant",
    label: "Elegant",
    description: "Premium Modern",
    preview: (
      <svg viewBox="0 0 60 80" className="w-full h-full">
        <rect width="60" height="80" fill="white" />
        <rect x="10" y="8" width="40" height="4" rx="1" fill="#111" />
        <rect x="10" y="22" width="40" height="1" fill="#e5e7eb" />

        <rect x="6" y="28" width="20" height="2" fill="#1e293b" />
        <rect x="6" y="32" width="48" height="10" fill="#f8fafc" />

        <rect x="6" y="46" width="20" height="2" fill="#1e293b" />
        <rect x="6" y="50" width="48" height="15" fill="#f8fafc" />
      </svg>
    )
  },
  {
    id: "indigo",
    label: "Indigo",
    description: "Modern Sidebar",
    preview: (
      <svg viewBox="0 0 60 80" className="w-full h-full">
        <rect width="20" height="80" fill="#f8fafc" />
        <rect width="40" height="80" x="20" fill="white" />
        <rect x="4" y="6" width="12" height="12" rx="3" fill="#e2e8f0" />
        <rect x="4" y="24" width="12" height="1.5" fill="#4f46e5" />
        <rect x="4" y="28" width="12" height="10" fill="#e2e8f0" opacity="0.5" />

        <rect x="24" y="8" width="30" height="4" fill="#0f172a" />
        <rect x="24" y="14" width="20" height="2" fill="#4f46e5" />
        <rect x="24" y="22" width="30" height="1" fill="#f1f5f9" />
        <rect x="24" y="26" width="30" height="15" fill="#f8fafc" />
      </svg>
    )
  },
  {
    id: "crisp",
    label: "Crisp",
    description: "Sharp Modern",
    preview: (
      <svg viewBox="0 0 60 80" className="w-full h-full">
        <rect width="60" height="80" fill="white" />
        <rect width="35" height="15" fill="#f8fafc" />
        <rect x="6" y="4" width="20" height="4" fill="#0f172a" />
        <rect x="6" y="10" width="12" height="1.5" fill="#64748b" />
        <rect x="40" y="4" width="14" height="6" fill="#f1f5f9" />

        <rect x="0" y="24" width="3" height="8" fill="#0f172a" />
        <rect x="6" y="24" width="20" height="2" fill="#64748b" />
        <rect x="6" y="30" width="48" height="12" fill="#f8fafc" />

        <rect x="0" y="48" width="3" height="8" fill="#0f172a" />
        <rect x="6" y="48" width="20" height="2" fill="#64748b" />
        <rect x="6" y="54" width="48" height="18" fill="#f8fafc" />
      </svg>
    )
  },
  {
    id: "professional",
    label: "Professional",
    description: "Corporate Authority",
    preview: (
      <svg viewBox="0 0 60 80" className="w-full h-full">
        <rect width="60" height="80" fill="white" />
        <rect x="10" y="8" width="40" height="3" fill="#0f172a" />
        <rect x="15" y="14" width="30" height="1.5" fill="#1e3a8a" />
        <rect x="10" y="24" width="40" height="0.5" fill="#1e3a8a" />

        <rect x="6" y="28" width="48" height="2" fill="#1e3a8a" opacity="0.1" />
        <rect x="6" y="32" width="20" height="2" fill="#1e3a8a" />
        <rect x="6" y="36" width="48" height="12" fill="#f8fafc" />

        <rect x="6" y="52" width="48" height="2" fill="#1e3a8a" opacity="0.1" />
        <rect x="6" y="56" width="20" height="2" fill="#1e3a8a" />
        <rect x="6" y="60" width="48" height="12" fill="#f8fafc" />
      </svg>
    )
  },
  {
    id: "avant-garde",
    label: "Avant-Garde",
    description: "Creative Bold",
    preview: (
      <svg viewBox="0 0 60 80" className="w-full h-full">
        <rect width="60" height="80" fill="white" />
        <rect width="60" height="20" fill="#f1f5f9" />
        <rect x="6" y="6" width="30" height="6" fill="#000" />
        <rect x="6" y="14" width="20" height="2" fill="#111" opacity="0.5" />
        <rect y="20" width="60" height="3" fill="#000" />

        <rect x="0" y="28" width="4" height="6" fill="#000" />
        <rect x="8" y="28" width="48" height="12" fill="#f8fafc" />

        <rect x="0" y="44" width="4" height="6" fill="#000" />
        <rect x="8" y="44" width="48" height="15" fill="#f8fafc" />

        <rect x="8" y="64" width="10" height="4" stroke="#000" strokeWidth="1" fill="none" />
        <rect x="22" y="64" width="10" height="4" stroke="#000" strokeWidth="1" fill="none" />
        <rect x="36" y="64" width="10" height="4" stroke="#000" strokeWidth="1" fill="none" />
      </svg>
    )
  },
  {
    id: "creative",
    label: "Creative",
    description: "Vibrant & Bold",
    preview: (
      <svg viewBox="0 0 60 80" className="w-full h-full">
        <rect width="60" height="80" fill="white" />
        <rect x="6" y="6" width="15" height="15" rx="4" fill="#ec4899" transform="rotate(-5, 13, 13)" />
        <rect x="25" y="8" width="25" height="4" fill="#0f172a" />
        <rect x="25" y="14" width="15" height="2" fill="#ec4899" />

        <rect x="6" y="28" width="2" height="15" fill="#f1f5f9" />
        <circle cx="6" cy="32" r="2" fill="#ec4899" />
        <rect x="12" y="30" width="40" height="10" fill="#f8fafc" />

        <rect x="6" y="48" width="20" height="4" rx="2" fill="#ec4899" />
        <rect x="30" y="48" width="24" height="4" rx="2" fill="#ec4899" />
      </svg>
    )
  },
  {
    id: "iconic",
    label: "Iconic",
    description: "Premium Branding",
    preview: (
      <svg viewBox="0 0 60 80" className="w-full h-full">
        <rect width="60" height="80" fill="white" />
        <rect width="60" height="20" rx="8" fill="#111827" />
        <rect x="10" y="6" width="30" height="4" fill="white" />
        <rect x="10" y="12" width="20" height="2" fill="white" opacity="0.6" />

        <rect x="6" y="26" width="48" height="12" rx="4" fill="#f8fafc" stroke="#cbd5e1" strokeDasharray="2,2" />

        <rect x="6" y="44" width="4" height="4" rx="1" fill="#111827" />
        <rect x="14" y="44" width="30" height="2" fill="#0f172a" />
        <rect x="14" y="48" width="40" height="10" fill="#f1f5f9" />

        <rect x="6" y="64" width="20" height="6" rx="3" fill="#fff" stroke="#f1f5f9" strokeWidth="2" />
        <rect x="30" y="64" width="20" height="6" rx="3" fill="#fff" stroke="#f1f5f9" strokeWidth="2" />
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
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const colorPickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
      if (colorPickerRef.current && !colorPickerRef.current.contains(event.target as Node)) {
        setIsColorPickerOpen(false);
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
            className={`flex items-center gap-3 px-3 py-1.5 rounded-xl border text-sm transition-all min-w-[160px] ${isOpen ? "border-indigo-400 ring-2 ring-indigo-50 shadow-sm" : "border-gray-200 hover:border-gray-300"
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
                className="absolute top-full left-0 mt-2 w-72 bg-white rounded-2xl border border-gray-100 shadow-2xl p-2 z-[100] max-h-[450px] overflow-y-auto"
              >
                <div className="grid grid-cols-1 gap-1">
                  {templates.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => {
                        onChange(t.id);
                        setIsOpen(false);
                      }}
                      className={`flex items-center gap-3 p-2 rounded-xl transition-all text-left group ${active === t.id ? "bg-indigo-50" : "hover:bg-gray-50"
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
              className="w-5 h-5 rounded-full border-2 transition-all hover:scale-110 flex-shrink-0"
              style={{
                backgroundColor: color,
                borderColor: accentColor === color ? color : "transparent",
                boxShadow: accentColor === color ? `0 0 0 2px white, 0 0 0 4px ${color}` : "none",
              }}
            />
          ))}

          {/* Custom color input - Aesthetic Popover version */}
          <div className="relative ml-1" ref={colorPickerRef}>
            <button
              onClick={() => setIsColorPickerOpen(!isColorPickerOpen)}
              className="w-6 h-6 rounded-full overflow-hidden border-2 border-gray-100 flex-shrink-0 hover:border-gray-300 transition-all flex items-center justify-center p-[2px]"
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

            <AnimatePresence>
              {isColorPickerOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -10 }}
                  className="absolute right-0 top-full mt-4 w-48 bg-white rounded-2xl border border-gray-100 shadow-2xl p-4 z-[110]"
                >
                  <div className="space-y-3">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Custom HEX</p>
                    <div className="relative">
                      <input
                        type="text"
                        value={accentColor.toUpperCase()}
                        onChange={(e) => {
                          const val = e.target.value;
                          if (val.startsWith('#') && val.length <= 7) onAccentChange(val);
                          else if (!val.startsWith('#') && val.length <= 6) onAccentChange(`#${val}`);
                        }}
                        className="w-full pl-8 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs font-mono font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 transition-all"
                        placeholder="#000000"
                      />
                      <div
                        className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 rounded shadow-sm border border-white"
                        style={{ backgroundColor: accentColor }}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-50">
                      <input
                        type="color"
                        value={accentColor}
                        onChange={(e) => onAccentChange(e.target.value)}
                        className="w-full h-8 rounded-lg cursor-pointer opacity-0 absolute pointer-events-none"
                        id="native-color"
                      />
                      <label
                        htmlFor="native-color"
                        className="col-span-2 text-center py-2 bg-indigo-50 text-indigo-600 rounded-lg text-[10px] font-bold hover:bg-indigo-100 cursor-pointer transition-colors"
                      >
                        Open Visual Picker
                      </label>
                    </div>
                  </div>

                  {/* Popover Arrow - Flipped to top */}
                  <div className="absolute bottom-full right-6 w-3 h-3 bg-white border-l border-t border-gray-100 rotate-45 translate-y-1.5" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
