import React, { useState } from 'react';
import { SendIcon } from 'lucide-react';
import { motion } from 'motion/react';

type ChatInputProps = {
  onSend: (text: string) => void;
};

export default function ChatInput({ onSend }: ChatInputProps) {
  const [text, setText] = useState('');

  const handleSend = () => {
    if (text.trim()) {
      onSend(text);
      setText('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-[#1a202c]/60 backdrop-blur-xl border border-white/10 p-2 rounded-2xl flex items-end gap-2 shadow-2xl shadow-black/50 focus-within:border-green-500/50 transition-colors duration-300">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type a command or message..."
        className="w-full max-h-32 bg-transparent text-gray-100 placeholder-gray-500 px-4 py-3 outline-none resize-none overflow-y-auto leading-relaxed"
        rows={1}
        style={{ minHeight: '48px' }}
      />
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleSend}
        disabled={!text.trim()}
        className="flex-none bg-green-500 hover:bg-green-400 disabled:bg-gray-700/50 disabled:text-gray-500 text-white p-3.5 rounded-xl transition-colors duration-200 mb-0.5"
      >
        <SendIcon size={20} className={text.trim() ? "ml-0.5" : ""} />
      </motion.button>
    </div>
  );
}
