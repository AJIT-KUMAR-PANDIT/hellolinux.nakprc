import React from 'react';
import { motion } from 'motion/react';

export default function VoiceVisualizer({ active }: { active: boolean }) {
  // Simple CSS animated bars
  const bars = Array.from({ length: 9 });
  return (
    <div className="flex items-center justify-center gap-2 h-16 w-full">
      {bars.map((_, i) => (
        <motion.div
          key={i}
          initial={{ height: 4 }}
          animate={{
            height: active ? [16, Math.random() * 40 + 20, 16] : 4,
          }}
          transition={{
            repeat: Infinity,
            duration: active ? 0.3 + Math.random() * 0.4 : 0.5,
            delay: active ? Math.random() * 0.2 : 0,
            ease: "easeInOut"
          }}
          className={`w-1.5 rounded-full ${active ? 'bg-gradient-to-t from-emerald-600 to-green-400' : 'bg-gray-700'}`}
        />
      ))}
    </div>
  );
}
