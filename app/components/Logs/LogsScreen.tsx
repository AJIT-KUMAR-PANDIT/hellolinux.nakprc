import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Search, Trash2, Clock } from 'lucide-react';
import type { Message } from '../Chat/ChatScreen';

type LogsScreenProps = {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
};

export default function LogsScreen({ messages, setMessages }: LogsScreenProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLogs = messages.filter((log) => 
    log.content.toLowerCase().includes(searchTerm.toLowerCase()) || 
    log.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getLogColor = (role: string) => {
    if (role === 'user') {
      return 'text-green-400 border-green-400/20 bg-green-400/10';
    }
    return 'text-blue-400 border-blue-400/20 bg-blue-400/10';
  };

  return (
    <div className="flex flex-col h-screen w-full bg-[#0a0f18] text-gray-100 overflow-hidden pb-[88px] font-mono">
      {/* Header bar */}
      <header className="flex-none px-6 py-5 border-b border-white/5 bg-[#10141a]/90 backdrop-blur-md z-10 w-full flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-bold bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text text-transparent">
            History Logs
          </h1>
          <motion.button 
            whileHover={{ scale: 1.1 }} 
            whileTap={{ scale: 0.9 }}
            onClick={() => setMessages([])}
            className="text-gray-500 hover:text-red-400 transition-colors p-2"
            title="Clear Complete History"
          >
            <Trash2 size={18} />
          </motion.button>
        </div>
        
        {/* Search Bar */}
        <div className="relative flex items-center w-full max-w-4xl mx-auto">
          <Search size={16} className="absolute left-3 text-gray-500" />
          <input 
            type="text"
            placeholder="Search chat history..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#1a202c]/80 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm outline-none focus:border-gray-400 focus:bg-[#1a202c] transition-all text-gray-200 placeholder-gray-600 shadow-inner"
          />
        </div>
      </header>

      {/* Log List */}
      <main className="flex-1 overflow-y-auto w-full max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-3 custom-scrollbar">
        {filteredLogs.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-600 uppercase tracking-widest text-sm text-center gap-4">
            <Clock size={32} className="opacity-50" />
            {searchTerm ? "No matching history found" : "History empty"}
          </div>
        ) : (
          filteredLogs.map((log, i) => (
            <motion.div 
              key={log.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.02 }}
              className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 rounded-xl bg-[#10141a]/60 border border-white/5 hover:bg-[#1a202c]/80 hover:border-white/10 transition-colors shadow-md shadow-black/20"
            >
              <div className="flex items-center gap-3 shrink-0">
                <span className="text-xs text-gray-500 bg-black/40 px-2.5 py-1 rounded-md">
                  {/* Since fake history didn't map timestamps exactly, we extract the ID if numeric or just show the ID */}
                  ID: {log.id.slice(-4)}
                </span>
                <span className={`text-[11px] font-bold px-3 py-1 rounded-md border ${getLogColor(log.role)} w-[72px] text-center tracking-wide uppercase`}>
                  {log.role}
                </span>
              </div>
              <span className="text-[13px] text-gray-300 break-words leading-relaxed sm:pl-2">
                {log.content}
              </span>
            </motion.div>
          ))
        )}
      </main>
    </div>
  );
}
