// frontend/app/page.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { HugeiconsIcon } from '@hugeicons/react';
import { 
  DragDropVerticalIcon, 
  SparklesIcon, 
  Download02Icon, 
  ArrowRight01Icon,
  CheckmarkCircle02Icon
} from '@hugeicons/core-free-icons';
import { Sticker } from '@/components/ui/Sticker';
import { FeaturesSection } from '@/components/landing/FeaturesSection';

export default function LandingPage() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-transparent selection:bg-indigo-100">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-indigo-600 rounded-lg">
              <HugeiconsIcon icon={SparklesIcon} size={20} color="white" />
            </div>
            <span className="font-black text-xl tracking-tighter text-gray-900">RESUME.AI</span>
          </div>
          <Link 
            href="/builder"
            className="px-5 py-2.5 bg-gray-900 text-white rounded-xl font-bold text-sm hover:bg-gray-800 transition-all active:scale-95 shadow-lg shadow-gray-200"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-1 text-center lg:text-left"
          >
            <span className="inline-block px-4 py-1.5 bg-indigo-50 text-indigo-600 text-xs font-black uppercase tracking-widest rounded-full mb-6">
              Next-Gen Career Tool
            </span>
            <h1 className="text-6xl lg:text-8xl font-black text-gray-900 leading-[0.9] tracking-tighter mb-8 italic">
              Build your resume, <br />
              <span className="text-indigo-600 px-4 inline-block bg-indigo-50 -rotate-2">your way.</span>
            </h1>
            <p className="text-xl text-gray-500 max-w-xl mb-10 leading-relaxed font-medium">
              The only playground where professional meets powerful. Drag, drop, and let Gemini AI write your success story in seconds.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <Link 
                href="/templates" 
                className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold text-lg hover:bg-indigo-700 transition-all flex items-center gap-2 shadow-2xl shadow-indigo-200 active:scale-95"
              >
                Choose Template
                <HugeiconsIcon icon={ArrowRight01Icon} size={20} />
              </Link>
              <p className="text-sm font-bold text-gray-400">Trusted by 10,000+ candidates</p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: -6 }}
            className="flex-1 relative"
          >
            <div className="relative z-10 p-4 bg-white rounded-[40px] shadow-2xl border-4 border-gray-100">
               <Sticker pack="halo" scene="hero" size={450} rotate={0} />
            </div>
            {/* Floating Accents */}
            <div className="absolute -top-10 -right-10 z-20">
               <Sticker pack="yippy" scene="success" size={200} rotate={12} />
            </div>
            <div className="absolute -bottom-6 -left-12 z-20 hidden md:block">
               <Sticker pack="pack" scene="work" size={140} rotate={-10} />
            </div>
            <div className="absolute top-1/2 -right-20 z-0 opacity-20 hidden lg:block">
               <Sticker pack="pack" scene="coder" size={200} rotate={15} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <FeaturesSection />

      {/* CTA Section */}
      <section className="py-32 px-4">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="max-w-5xl mx-auto p-12 bg-indigo-600 rounded-[48px] text-center relative overflow-hidden shadow-2xl shadow-indigo-200"
        >
          <div className="relative z-10">
            <h2 className="text-5xl font-black text-white tracking-tighter mb-8 leading-none">
              Ready to land your <br /> dream job?
            </h2>
            <Link 
              href="/builder" 
              className="px-12 py-5 bg-white text-indigo-600 rounded-2xl font-black text-xl hover:bg-gray-100 transition-all shadow-xl active:scale-95 inline-block"
            >
              Start Building for Free
            </Link>
          </div>
          
          <div className="absolute top-0 left-0 opacity-10 pointer-events-none">
             <Sticker pack="ven" scene="abstract" size={400} />
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-100 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <HugeiconsIcon icon={SparklesIcon} size={20} className="text-indigo-600" />
            <span className="font-bold text-gray-900 tracking-tighter">Made By ❤️Atanu, Swetasri</span>
          </div>
          <p className="text-sm text-gray-400 font-medium italic">Handcrafted with care for ambitious builders.</p>
        </div>
      </footer>
    </div>
  );
}
