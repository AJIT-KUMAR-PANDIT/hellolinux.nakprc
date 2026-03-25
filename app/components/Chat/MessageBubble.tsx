import { motion } from 'motion/react';
import { Volume2 } from 'lucide-react';
import { speak } from '~/lib/voice';

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
        className={`relative group max-w-[85%] sm:max-w-[75%] px-5 py-3.5 rounded-2xl ${
          isUser
            ? 'bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-tr-sm shadow-lg shadow-green-500/20'
            : 'bg-[#1a202c] text-gray-200 border border-white/5 rounded-tl-sm shadow-md shadow-black/40'
        }`}
      >
        <p className="text-[15px] leading-relaxed tracking-wide font-medium">
          {typeof content === 'string' ? content : JSON.stringify(content)}
        </p>
        
        {!isUser && (
          <button 
            onClick={() => speak(content)}
            className="absolute -right-10 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/10 text-gray-400 hover:text-green-400"
            title="Read aloud"
          >
            <Volume2 size={16} />
          </button>
        )}
      </div>
    </motion.div>
  );
}
