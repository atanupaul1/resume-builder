// frontend/src/components/landing/FeaturesSection.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  DragDropIcon, 
  AiMagicIcon, 
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
  icon: any, 
  iconBg: string, 
  iconColor: string, 
  title: string, 
  description: string, 
  children: React.ReactNode 
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
  // Drag & Drop State
  const [dragOrder, setDragOrder] = useState(['Education', 'Skills']);
  
  // AI Suggestions State
  const [aiText, setAiText] = useState('I am a good coder');
  const [isHoveringAi, setIsHoveringAi] = useState(false);
  
  // PDF Progress State
  const [pdfProgress, setPdfProgress] = useState(0);
  const [isPdfComplete, setIsPdfComplete] = useState(false);
  const [isHoveringPdf, setIsHoveringPdf] = useState(false);

  // Typewriter effect logic
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const targetText = 'Full-stack developer with expertise in scalable Python architectures';
    
    if (isHoveringAi) {
      if (aiText.length > 0) {
        // Deleting
        timeout = setTimeout(() => {
          setAiText(prev => prev.slice(0, -1));
        }, 50);
      } else {
        // Typing
        const currentLength = aiText.length;
        if (aiText !== targetText) {
          timeout = setTimeout(() => {
            setAiText(targetText.slice(0, aiText.length + 1));
          }, 40);
        }
      }
    } else {
      setAiText('I am a good coder');
    }
    
    return () => clearTimeout(timeout);
  }, [aiText, isHoveringAi]);

  // PDF Progress logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isHoveringPdf && pdfProgress < 100) {
      interval = setInterval(() => {
        setPdfProgress(prev => {
          const next = prev + 5;
          if (next >= 100) {
            setIsPdfComplete(true);
            return 100;
          }
          return next;
        });
      }, 75); // ~1.5 seconds total (20 steps * 75ms)
    } else if (!isHoveringPdf) {
      setPdfProgress(0);
      setIsPdfComplete(false);
    }
    return () => clearInterval(interval);
  }, [isHoveringPdf, pdfProgress]);

  return (
    <section className="py-24 bg-white px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
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
            Tools designed for modern recruitment.
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1: Drag & Drop */}
          <div 
            onMouseEnter={() => setDragOrder(['Skills', 'Education'])}
            onMouseLeave={() => setDragOrder(['Education', 'Skills'])}
          >
            <FeatureCard
              icon={DragDropIcon}
              iconBg="bg-blue-50"
              iconColor="text-blue-600"
              title="Drag & drop builder"
              description="Reorder sections effortlessly. See changes in live A4 preview."
            >
              <div className="flex flex-col gap-3 w-40">
                {dragOrder.map((item) => (
                  <motion.div
                    key={item}
                    layout
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="bg-white border border-indigo-100/50 p-3 rounded-xl shadow-sm flex items-center gap-3"
                  >
                    <div className="w-2 h-2 rounded-full bg-indigo-200" />
                    <span className="text-xs font-bold text-slate-700">{item}</span>
                  </motion.div>
                ))}
              </div>
            </FeatureCard>
          </div>

          {/* Card 2: AI Suggestions */}
          <div 
            onMouseEnter={() => setIsHoveringAi(true)}
            onMouseLeave={() => setIsHoveringAi(false)}
          >
            <FeatureCard
              icon={AiMagicIcon}
              iconBg="bg-purple-50"
              iconColor="text-purple-600"
              title="AI suggestions"
              description="Powered by Gemini 2.0. Quantified bullet points within one click."
            >
              <div className="w-full h-full flex items-center justify-center p-4">
                <div className="w-full bg-white border border-slate-100 rounded-xl p-4 shadow-sm min-h-[80px]">
                  <p className="text-xs font-medium text-slate-600 leading-relaxed">
                    {aiText.split('').map((char, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className={isHoveringAi ? "bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent" : ""}
                      >
                        {char}
                      </motion.span>
                    ))}
                    <motion.span
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                      className="inline-block w-0.5 h-3 bg-purple-500 ml-0.5 align-middle"
                    />
                  </p>
                </div>
              </div>
            </FeatureCard>
          </div>

          {/* Card 3: PDF Export */}
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
              description="High-quality, ATS-optimized exports ready for application."
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
                      transition={{ type: "spring", stiffness: 300, damping: 15 }}
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
