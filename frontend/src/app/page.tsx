'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowRight01Icon, DashboardSquare01Icon } from '@hugeicons/core-free-icons';
import { Sticker } from '@/components/ui/Sticker';
import { FeaturesSection } from '@/components/landing/FeaturesSection';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-transparent selection:bg-indigo-100">
      <div className="fixed inset-x-0 top-0 h-24 bg-gradient-to-b from-white/80 to-transparent z-40 pointer-events-none" />

      <nav className="fixed top-0 w-full z-50 border-b border-white/70 bg-white/75 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 h-18 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-gradient-to-br from-indigo-600 to-cyan-600 rounded-xl shadow-lg shadow-indigo-100 transition-transform hover:scale-105">
              <HugeiconsIcon icon={DashboardSquare01Icon} size={20} color="white" />
            </div>
            <span className="font-display font-black text-xl tracking-tighter text-brand-nav">CV.io</span>
          </div>
          <Link
            href="/builder"
            className="px-5 py-2.5 bg-gray-900 text-white rounded-full font-bold text-sm hover:bg-gray-800 transition-all active:scale-95 shadow-lg shadow-gray-200"
          >
            Get Started
          </Link>
        </div>
      </nav>

      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-14">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-1 text-center lg:text-left"
          >
            <span className="inline-block px-4 py-1.5 bg-white/80 text-indigo-700 text-xs font-black uppercase tracking-[0.25em] rounded-full mb-6 border border-indigo-100 shadow-sm">
              Career Tool
            </span>
            <h1 className="text-5xl sm:text-6xl lg:text-8xl font-display font-black text-indigo-900 leading-[0.92] tracking-tighter mb-8">
              Build your resume,
              <br />
              <span className="text-brand-rose px-4 inline-block bg-brand-rose/10 rotate-[-2deg] rounded-2xl mt-2">
                your way.
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-xl mb-10 leading-relaxed font-medium">
              Professional resume builder for fast editing, clean templates, and export-ready results.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <Link
                href="/templates"
                className="px-8 py-4 bg-brand-nav text-white rounded-full font-bold text-base sm:text-lg hover:bg-brand-plum transition-all flex items-center gap-2 shadow-2xl shadow-brand-plum/10 active:scale-95"
              >
                Choose Template
                <HugeiconsIcon icon={ArrowRight01Icon} size={20} />
              </Link>
              <p className="text-sm font-bold text-gray-500">Trusted by 10,000+ candidates</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: -6 }}
            className="flex-1 relative"
          >
            <div className="relative z-10 p-4 bg-white/90 rounded-[40px] shadow-2xl border border-white/80 backdrop-blur-sm">
              <Sticker pack="halo" scene="hero" size={450} rotate={0} />
            </div>
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

      <FeaturesSection />

      <section className="py-24 sm:py-32 px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="max-w-5xl mx-auto p-8 sm:p-12 bg-gray-900 rounded-[40px] sm:rounded-[48px] text-center relative overflow-hidden shadow-2xl shadow-gray-200"
        >
          <div className="relative z-10">
            <h2 className="text-4xl sm:text-5xl font-display font-black text-white tracking-tighter mb-8 leading-tight">
              Ready to land your <br /> dream job?
            </h2>
            <Link
              href="/builder"
              className="px-10 py-4 sm:px-12 sm:py-5 bg-white text-gray-900 rounded-full font-black text-base sm:text-xl hover:bg-gray-100 transition-all shadow-xl active:scale-95 inline-block"
            >
              Start Building for Free
            </Link>
          </div>

          <div className="absolute top-0 left-0 opacity-10 pointer-events-none">
            <Sticker pack="ven" scene="abstract" size={400} />
          </div>
        </motion.div>
      </section>

      <footer className="py-12 border-t border-white/70 bg-white/40 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-2">
              <HugeiconsIcon icon={DashboardSquare01Icon} size={20} className="text-brand-rose" />
              <span className="font-display font-bold text-brand-nav tracking-tighter">CV.io</span>
            </div>
            <span className="text-xs font-bold text-gray-600 mt-2">Made by Atanu and Swetasri</span>
          </div>
          <p className="text-sm text-gray-400 font-medium italic">Handcrafted with care for ambitious builders.</p>
        </div>
      </footer>
    </div>
  );
}
