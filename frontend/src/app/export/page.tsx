// frontend/app/export/page.tsx
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HugeiconsIcon } from '@hugeicons/react';
import { 
  ArrowLeft01Icon, 
  Download02Icon, 
  Copy01Icon, 
  CheckmarkCircle02Icon,
  SparklesIcon
} from '@hugeicons/core-free-icons';
import Link from 'next/link';
import { useResumeStore } from '@/lib/resumeStore';
import { exportApi } from '@/lib/api';
import { ResumePreview } from '@/components/resume/ResumePreview';
import { Sticker } from '@/components/ui/Sticker';

export default function ExportPage() {
  const { resume } = useResumeStore();
  const [exporting, setExporting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleDownload = async () => {
    setExporting(true);
    try {
      await exportApi.downloadPdf(resume);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 5000);
    } catch (error) {
      console.error("Export failed:", error);
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <nav className="h-16 px-6 bg-white border-b border-gray-100 flex items-center justify-between">
        <Link href="/builder" className="flex items-center gap-2 text-gray-500 hover:text-gray-900 font-bold transition-colors">
          <HugeiconsIcon icon={ArrowLeft01Icon} size={20} />
          Back to Editor
        </Link>
        <div className="flex items-center gap-2">
            <div className="p-1.5 bg-indigo-600 rounded-lg">
               <HugeiconsIcon icon={SparklesIcon} size={16} color="white" />
            </div>
            <span className="font-black text-lg tracking-tighter text-gray-900 uppercase">Export</span>
        </div>
        <div className="w-24" /> {/* Spacer */}
      </nav>

      <main className="flex-1 max-w-7xl mx-auto w-full p-8 flex flex-col lg:flex-row gap-12 items-start justify-center">
        {/* Left: Preview */}
        <div className="flex-1 flex justify-center scale-[0.85] lg:scale-1 origin-top">
          <ResumePreview />
        </div>

        {/* Right: Actions */}
        <div className="w-full lg:w-[400px] space-y-8 py-12">
          <div className="bg-white p-8 rounded-[40px] shadow-2xl border border-gray-100 relative overflow-hidden">
            <h2 className="text-3xl font-black tracking-tighter text-gray-900 mb-2">Looks solid!</h2>
            <p className="text-gray-500 font-medium mb-8">Ready to send this to your future employer?</p>
            
            <div className="space-y-4">
              <button 
                onClick={handleDownload}
                disabled={exporting}
                className="w-full py-5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-[24px] font-black text-xl flex items-center justify-center gap-3 shadow-2xl shadow-indigo-100 transition-all active:scale-95 disabled:bg-gray-200"
              >
                {exporting ? (
                   <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}>
                     <HugeiconsIcon icon={SparklesIcon} size={24} />
                   </motion.div>
                ) : (
                   <HugeiconsIcon icon={Download02Icon} size={24} />
                )}
                {exporting ? 'Generating...' : 'Download PDF'}
              </button>

              <button className="w-full py-4 bg-gray-50 hover:bg-gray-100 text-gray-900 rounded-[20px] font-bold text-sm flex items-center justify-center gap-3 transition-colors active:scale-95">
                <HugeiconsIcon icon={Copy01Icon} size={18} />
                Copy Shareable Link
              </button>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-50 space-y-4">
               <div className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded-full bg-green-50 text-green-500 flex items-center justify-center">
                    <HugeiconsIcon icon={CheckmarkCircle02Icon} size={18} />
                 </div>
                 <span className="text-sm font-bold text-gray-600">ATS Optimized Format</span>
               </div>
               <div className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded-full bg-green-50 text-green-500 flex items-center justify-center">
                    <HugeiconsIcon icon={CheckmarkCircle02Icon} size={18} />
                 </div>
                 <span className="text-sm font-bold text-gray-600">High Resolution Vector PDF</span>
               </div>
            </div>

            {/* Success Animation */}
            <AnimatePresence>
              {success && (
                <motion.div 
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="absolute inset-0 bg-white z-50 flex flex-col items-center justify-center text-center p-8"
                >
                  <Sticker pack="yippy" scene="success" size={240} rotate={0} className="mb-6" />
                  <h3 className="text-3xl font-black tracking-tighter text-gray-900 mb-2">Downloaded!</h3>
                  <p className="text-gray-500 font-medium">Good luck with your application!</p>
                  <button 
                    onClick={() => setSuccess(false)}
                    className="mt-8 text-indigo-600 font-bold hover:underline"
                  >
                    Back to options
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Tip Card */}
          <div className="p-6 bg-indigo-50/50 rounded-[32px] border border-indigo-100 flex items-center gap-4">
             <Sticker pack="yippy" scene="thinking" size={60} rotate={-8} />
             <div className="flex-1">
               <h4 className="font-bold text-indigo-900 text-sm">Insider Tip</h4>
               <p className="text-indigo-600/70 text-xs font-medium">Tailor your summary for every job. Use our AI for that step!</p>
             </div>
          </div>
        </div>
      </main>
    </div>
  );
}
