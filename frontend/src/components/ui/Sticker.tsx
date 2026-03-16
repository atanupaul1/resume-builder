// frontend/components/ui/Sticker.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface StickerProps {
  pack: 'yippy' | 'ven' | 'halo' | 'pack';
  scene: string;
  rotate?: number;
  size?: number;
  className?: string;
}

const IMAGE_MAP: Record<string, string> = {
  'yippy-thinking': '/Idea.png',
  'yippy-celebrate': '/Rating.png', // Better for "popular/featured"
  'ven-empty': '/Nothing-here.png',
  'ven-searching': '/No-results-found.png',
  'halo-hero': '/Resume.png',
  'ven-faq': '/FAQ.png',
  'ven-abstract': '/Welcome.png',
  'pack-education': '/Education.png',
  'pack-folder': '/Folder.png',
  'pack-coder': '/Coder.png',
  'pack-security': '/Data-security.png',
  'pack-login': '/Secure-login.png',
  'pack-work': '/Work-from-home.png',
  'yippy-success': '/Thank-you.png'
};

export const Sticker: React.FC<StickerProps> = ({ 
  pack, 
  scene, 
  rotate = 0, 
  size = 120, 
  className = "" 
}) => {
  const imageKey = `${pack}-${scene}`;
  const src = IMAGE_MAP[imageKey] || '/Resume.png'; // Fallback to Resume.png

  return (
    <motion.div
      whileHover={{ scale: 1.05, rotate: rotate + 2 }}
      initial={{ scale: 0.8, opacity: 0, rotate }}
      animate={{ scale: 1, opacity: 1, rotate }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      className={`relative inline-block ${className}`}
      style={{ width: size, height: size }}
    >
      <div className="relative w-full h-full">
        <Image 
          src={src} 
          alt={imageKey} 
          fill
          className="object-contain drop-shadow-xl"
          priority
        />
      </div>
    </motion.div>
  );
};

