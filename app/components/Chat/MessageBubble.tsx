import React from 'react';
import { motion } from 'motion/react';

type MessageBubbleProps = {
  role: 'user' | 'ai';
  content: string;
};

export default function MessageBubble({ role, content }: MessageBubbleProps) {
  const isUser = role === 'user';
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      className={`flex w-full mb-6 ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`max-w-[85%] sm:max-w-[75%] px-5 py-3.5 rounded-2xl ${
          isUser
            ? 'bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-tr-sm shadow-lg shadow-green-500/20'
            : 'bg-[#1a202c] text-gray-200 border border-white/5 rounded-tl-sm shadow-md shadow-black/40'
        }`}
      >
        <p className="text-[15px] leading-relaxed tracking-wide font-medium">{content}</p>
      </div>
    </motion.div>
  );
}
