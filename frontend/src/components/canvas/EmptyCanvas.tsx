// frontend/components/canvas/EmptyCanvas.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sticker } from '../ui/Sticker';

export const EmptyCanvas = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center h-[500px] text-center p-8 border-2 border-dashed border-gray-200 rounded-3xl bg-gray-50/50"
    >
      <Sticker pack="ven" scene="empty" rotate={-5} size={240} className="mb-6" />
      <h3 className="text-xl font-bold text-gray-900 mb-2">Your canvas is empty</h3>
      <p className="text-gray-500 max-w-xs mx-auto mb-8">
        Drag and drop sections from the left panel to start building your professional resume.
      </p>
      <button className="px-6 py-2.5 bg-white border border-gray-200 text-gray-900 rounded-xl font-bold text-sm hover:border-indigo-100 hover:text-indigo-600 transition-all shadow-sm">
        Import Existing Resume
      </button>
    </motion.div>
  );
};
