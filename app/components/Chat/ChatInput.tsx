import React, { useState, useRef, useEffect } from 'react';
import { SendIcon, Mic, MicOff } from 'lucide-react';
import { motion } from 'motion/react';

type ChatInputProps = {
  onSend: (text: string) => void;
};

export default function ChatInput({ onSend }: ChatInputProps) {
  const [text, setText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const recordingTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleSend = () => {
    if (text.trim()) {
      onSend(text);
      setText('');
      if (isRecording) {
        setIsRecording(false);
        if (recordingTimer.current) clearTimeout(recordingTimer.current);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const toggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      if (recordingTimer.current) clearTimeout(recordingTimer.current);
    } else {
      setIsRecording(true);
      
      // Simulate live interactivity with text transcription over time
      const words = ["System ", "diagnostic ", "voice ", "override ", "initiated..."];
      let currentWordIndex = 0;
      
      const simulateSpeech = () => {
        if (currentWordIndex < words.length) {
          setText(prev => prev + words[currentWordIndex]);
          currentWordIndex++;
          recordingTimer.current = setTimeout(simulateSpeech, 300);
        } else {
          setIsRecording(false);
        }
      };
      
      recordingTimer.current = setTimeout(simulateSpeech, 300);
    }
  };

  useEffect(() => {
    return () => {
      if (recordingTimer.current) clearTimeout(recordingTimer.current);
    }
  }, []);

  return (
    <div className={`w-full max-w-4xl mx-auto bg-[#1a202c]/60 backdrop-blur-xl border p-2 rounded-2xl flex items-end gap-2 shadow-2xl transition-all duration-300 ${isRecording ? 'border-green-500 shadow-green-500/20' : 'border-white/10 shadow-black/50 focus-within:border-green-500/50'}`}>
      
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleRecording}
        className={`flex-none p-3.5 rounded-xl transition-colors duration-300 mb-0.5 ${
          isRecording 
            ? 'bg-red-500/20 text-red-500 hover:bg-red-500/30' 
            : 'bg-transparent text-gray-500 hover:text-gray-300 hover:bg-white/5'
        }`}
        title="Voice Input"
      >
        {isRecording ? <MicOff size={20} className="animate-pulse" /> : <Mic size={20} />}
      </motion.button>
      
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={isRecording ? "Listening..." : "Type a command or tap mic..."}
        className="w-full max-h-32 bg-transparent text-gray-100 placeholder-gray-500 px-2 py-3 outline-none resize-none overflow-y-auto leading-relaxed"
        rows={1}
        style={{ minHeight: '48px' }}
      />

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleSend}
        disabled={!text.trim() && !isRecording}
        className="flex-none bg-green-500 hover:bg-green-400 disabled:bg-gray-700/50 disabled:text-gray-500 text-white p-3.5 rounded-xl transition-colors duration-200 mb-0.5"
      >
        <SendIcon size={20} className={text.trim() ? "ml-0.5" : ""} />
      </motion.button>
    </div>
  );
}
