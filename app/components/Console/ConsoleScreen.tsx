import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, MessageSquare, Clock, Search, ChevronRight } from 'lucide-react';

type SavedChat = {
  id: string;
  title: string;
  date: string;
  preview: string;
  isFavorite: boolean;
};

const initialChats: SavedChat[] = [
  { id: '1', title: 'System Diagnostics', date: 'Just now', preview: 'Analyzing core module integrations...', isFavorite: true },
  { id: '2', title: 'UI Component UI', date: '2 hrs ago', preview: 'Generate a glowing microphone with blur filters', isFavorite: true },
  { id: '3', title: 'Server Config', date: 'Yesterday', preview: 'Setting up the backend neural processing node...', isFavorite: false },
  { id: '4', title: 'Voice API Test', date: 'Yesterday', preview: 'Live transcription override initiated', isFavorite: false },
  { id: '5', title: 'React Router Setup', date: 'Mar 20', preview: 'How do I use the new file-based routing?', isFavorite: false },
];

export default function ConsoleScreen() {
  const [chats, setChats] = useState<SavedChat[]>(initialChats);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setChats(chats.map(c => c.id === id ? { ...c, isFavorite: !c.isFavorite } : c));
  };

  const filteredChats = chats.filter(c => 
    c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.preview.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const favorites = filteredChats.filter(c => c.isFavorite);
  const regular = filteredChats.filter(c => !c.isFavorite);

  const renderChatCard = (chat: SavedChat, idx: number) => (
    <motion.div
      key={chat.id}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: idx * 0.05 }}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      className="group flex flex-col p-4 rounded-xl bg-[#10141a]/60 border border-white/5 hover:bg-[#1a202c]/80 hover:border-white/10 transition-all cursor-pointer shadow-md shadow-black/20"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
            <MessageSquare size={16} />
          </div>
          <h3 className="font-semibold text-gray-200 tracking-wide text-sm">{chat.title}</h3>
        </div>
        <button 
          onClick={(e) => toggleFavorite(chat.id, e)}
          className={`p-1.5 rounded-full transition-colors ${chat.isFavorite ? 'text-yellow-400 bg-yellow-400/10 hover:bg-yellow-400/20' : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'}`}
        >
          <Star size={18} fill={chat.isFavorite ? "currentColor" : "none"} />
        </button>
      </div>
      <p className="text-sm text-gray-400 line-clamp-1 mb-3 ml-11">{chat.preview}</p>
      <div className="flex items-center justify-between mt-auto ml-11">
        <div className="flex items-center gap-1.5 text-xs text-gray-500 font-mono">
          <Clock size={12} />
          <span>{chat.date}</span>
        </div>
        <ChevronRight size={16} className="text-gray-600 group-hover:text-green-400 transition-colors" />
      </div>
    </motion.div>
  );

  return (
    <div className="flex flex-col h-screen w-full bg-[#0a0f18] text-gray-100 overflow-hidden pb-[88px]">
      
      {/* Header */}
      <header className="flex-none px-6 py-5 border-b border-white/5 bg-[#10141a]/90 backdrop-blur-md z-10 w-full flex flex-col gap-4 shadow-sm shadow-black/20">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
            Saved Console Data
          </h1>
        </div>
        
        {/* Search */}
        <div className="relative flex items-center w-full max-w-4xl mx-auto">
          <Search size={16} className="absolute left-3 text-gray-500 z-10" />
          <input 
            type="text"
            placeholder="Search saved chats..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#1a202c]/80 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm outline-none focus:border-blue-500/50 focus:bg-[#1a202c] transition-all text-gray-200 placeholder-gray-600 shadow-inner"
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto px-4 sm:px-6 md:px-8 py-6 custom-scrollbar w-full max-w-4xl mx-auto">
        
        {favorites.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-2">
              <Star size={14} className="text-yellow-500" fill="currentColor" /> 
              Favorites
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <AnimatePresence>
                {favorites.map((chat, idx) => renderChatCard(chat, idx))}
              </AnimatePresence>
            </div>
          </div>
        )}

        {regular.length > 0 && (
          <div>
            <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-2">
              <Clock size={14} /> 
              Recent History
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <AnimatePresence>
                {regular.map((chat, idx) => renderChatCard(chat, idx))}
              </AnimatePresence>
            </div>
          </div>
        )}

        {filteredChats.length === 0 && (
          <div className="flex flex-col items-center justify-center h-40 text-gray-600 uppercase tracking-widest text-sm text-center gap-4">
            <Search size={32} className="opacity-50" />
            No saved chats found
          </div>
        )}

      </main>

    </div>
  );
}
