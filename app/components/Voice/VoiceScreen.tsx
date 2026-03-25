import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mic, MicOff } from 'lucide-react';
import VoiceVisualizer from './VoiceVisualizer';

export default function VoiceScreen() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("Tap to speak...");

  const handleToggleMic = () => {
    setIsListening((prev) => !prev);
    if (!isListening) {
      setTranscript("Listening...");
      // Mock transcript update 
      setTimeout(() => setTranscript("I heard: \"Generate a new UI component\""), 2500);
    } else {
      setTranscript("Tap to speak...");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen w-full bg-[#0a0f18] text-gray-100 overflow-hidden pb-[88px]">
      
      <div className="flex flex-col items-center justify-center flex-1 w-full gap-16 px-6">
        
        <div className="relative flex items-center justify-center">
          {isListening && (
            <motion.div
              layoutId="mic-glow"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: [1, 1.4, 1.2], opacity: [0.5, 0.8, 0.5] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="absolute w-40 h-40 rounded-full bg-green-500/20 blur-xl pointer-events-none"
            />
          )}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleToggleMic}
            className={`relative z-10 w-28 h-28 flex items-center justify-center rounded-full shadow-2xl transition-all duration-300 ${
              isListening 
                ? 'bg-gradient-to-br from-green-400 to-emerald-600 shadow-green-500/40 border-2 border-green-300/50' 
                : 'bg-[#1a202c] shadow-black/50 border border-white/5 text-gray-500 hover:text-gray-300'
            }`}
          >
            {isListening ? (
              <Mic size={48} className="text-white drop-shadow-md" />
            ) : (
              <MicOff size={48} className="drop-shadow-sm" />
            )}
          </motion.button>
        </div>

        <div className="flex flex-col items-center gap-8 w-full max-w-sm">
          <VoiceVisualizer active={isListening} />
          
          <div className="w-full text-center px-6 py-8 bg-[#10141a]/60 backdrop-blur-md rounded-[2rem] border border-white/5 shadow-lg shadow-black/20 min-h-[120px] flex items-center justify-center">
            <p className={`text-xl font-medium tracking-wide transition-colors duration-300 ${
              isListening ? 'text-green-400' : 'text-gray-500'
            }`}>
              {transcript}
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
