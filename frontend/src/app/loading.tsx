"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { DashboardSquare01Icon } from "@hugeicons/core-free-icons";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[radial-gradient(circle_at_top_left,_rgba(99,102,241,0.05),_transparent_40%),#faf8f3]">
      <div className="relative">
        {/* Pulsing rings */}
        <div className="absolute inset-0 animate-ping rounded-3xl bg-indigo-400/20 duration-[2000ms]" />
        <div className="absolute inset-0 animate-pulse rounded-3xl bg-indigo-500/10 duration-[3000ms]" />
        
        {/* Main Logo Container */}
        <div className="relative w-20 h-20 bg-white rounded-3xl shadow-[0_20px_50px_rgba(79,70,229,0.15)] border border-indigo-50 flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-cyan-600 opacity-90" />
          <HugeiconsIcon icon={DashboardSquare01Icon} size={32} className="text-white relative z-10 animate-[bounce_2s_infinite]" />
          
          {/* Shine effect */}
          <div className="absolute inset-0 w-full h-full bg-gradient-to-tr from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
        </div>
      </div>

      <div className="mt-12 flex flex-col items-center">
        <h2 className="text-lg font-black text-gray-900 tracking-tight">
          CV<span className="text-indigo-600">.io</span>
        </h2>
        <div className="mt-4 flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-[bounce_1s_infinite_0ms]" />
          <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-[bounce_1s_infinite_200ms]" />
          <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-[bounce_1s_infinite_400ms]" />
        </div>
        <p className="mt-6 text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">
          Preparing your workspace
        </p>
      </div>

      <style jsx global>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}
