'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  DragDropIcon,
  File01Icon,
  Pdf01Icon,
  Tick01Icon
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';

const FeatureCard = ({
  icon,
  iconBg,
  iconColor,
  title,
  description,
  children
}: {
  icon: React.ComponentProps<typeof HugeiconsIcon>["icon"];
  iconBg: string;
  iconColor: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 group relative flex flex-col h-full overflow-hidden"
    >
      <div className={`w-12 h-12 rounded-xl ${iconBg} ${iconColor} flex items-center justify-center mb-6`}>
        <HugeiconsIcon icon={icon} size={24} />
      </div>

      <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
      <p className="text-slate-500 text-sm font-medium mb-8 leading-relaxed">
        {description}
      </p>

      <div className="mt-auto relative h-32 bg-slate-50 rounded-2xl p-4 overflow-hidden border border-slate-100/50 flex items-center justify-center">
        {children}
      </div>
    </motion.div>
  );
};

export const FeaturesSection = () => {
  const [dragOrder, setDragOrder] = useState(['Education', 'Skills']);
  const [activeTemplate, setActiveTemplate] = useState<'Minimal' | 'Executive' | 'Tech'>('Minimal');
  const [pdfProgress, setPdfProgress] = useState(0);
  const [isPdfComplete, setIsPdfComplete] = useState(false);
  const [isHoveringPdf, setIsHoveringPdf] = useState(false);

  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isHoveringPdf && pdfProgress < 100) {
      interval = setInterval(() => {
        setPdfProgress((prev) => {
          const next = prev + 5;
          if (next >= 100) {
            setIsPdfComplete(true);
            return 100;
          }
          return next;
        });
      }, 75);
    } else if (!isHoveringPdf) {
      setPdfProgress(0);
      setIsPdfComplete(false);
    }
    return () => clearInterval(interval);
  }, [isHoveringPdf, pdfProgress]);

  return (
    <section className="py-24 bg-transparent px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 mb-6"
          >
            Everything you <span className="text-indigo-600">need.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate-500 font-medium text-lg"
          >
            Tools built for fast resume editing.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            onMouseEnter={() => setDragOrder(['Skills', 'Education'])}
            onMouseLeave={() => setDragOrder(['Education', 'Skills'])}
          >
            <FeatureCard
              icon={DragDropIcon}
              iconBg="bg-blue-50"
              iconColor="text-blue-600"
              title="Drag & drop builder"
              description="Reorder sections fast. See changes in live A4 preview."
            >
              <div className="flex flex-col gap-3 w-40">
                {dragOrder.map((item) => (
                  <motion.div
                    key={item}
                    layout
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className="bg-white border border-indigo-100/50 p-3 rounded-xl shadow-sm flex items-center gap-3"
                  >
                    <div className="w-2 h-2 rounded-full bg-indigo-200" />
                    <span className="text-xs font-bold text-slate-700">{item}</span>
                  </motion.div>
                ))}
              </div>
            </FeatureCard>
          </div>

          <FeatureCard
            icon={File01Icon}
            iconBg="bg-violet-50"
            iconColor="text-violet-600"
            title="Template switching"
            description="Swap styles while keeping same resume data and structure."
          >
            <div className="w-full flex flex-col gap-3">
              {(['Minimal', 'Executive', 'Tech'] as const).map((template) => (
                <button
                  key={template}
                  onClick={() => setActiveTemplate(template)}
                  className={`flex items-center justify-between rounded-xl border px-4 py-3 text-left transition-all ${
                    activeTemplate === template
                      ? 'border-violet-300 bg-white shadow-sm'
                      : 'border-slate-200 bg-slate-50 text-slate-500'
                  }`}
                >
                  <span className="text-xs font-bold">{template}</span>
                  {activeTemplate === template && (
                    <span className="text-[10px] font-bold uppercase tracking-wide text-violet-600">Active</span>
                  )}
                </button>
              ))}
            </div>
          </FeatureCard>

          <div
            onMouseEnter={() => setIsHoveringPdf(true)}
            onMouseLeave={() => {
              setIsPdfComplete(false);
              setIsHoveringPdf(false);
            }}
          >
            <FeatureCard
              icon={Pdf01Icon}
              iconBg="bg-rose-50"
              iconColor="text-rose-600"
              title="One-click PDF export"
              description="High-quality exports ready for internship and job applications."
            >
              <div className="w-48 flex flex-col gap-4">
                <AnimatePresence mode="wait">
                  {!isPdfComplete ? (
                    <motion.div
                      key="loader"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="w-full space-y-3"
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] uppercase tracking-widest font-bold text-slate-400">Exporting PDF...</span>
                        <span className="text-[10px] font-bold text-slate-600">{pdfProgress}%</span>
                      </div>
                      <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-blue-500 to-indigo-600"
                          initial={{ width: 0 }}
                          animate={{ width: `${pdfProgress}%` }}
                        />
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="success"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                      className="flex flex-col items-center gap-2"
                    >
                      <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center shadow-lg shadow-green-100">
                        <HugeiconsIcon icon={Tick01Icon} size={20} />
                      </div>
                      <span className="text-xs font-bold text-green-600 uppercase tracking-widest">Resume Ready</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </FeatureCard>
          </div>
        </div>
      </div>
    </section>
  );
};
