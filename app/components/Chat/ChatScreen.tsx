import React, { useState } from 'react';
import MessageList from './MessageList';
import ChatInput from './ChatInput';
import { generateAIResponse } from '~/API/ai/llm';
import { useAISettingsStore } from '~/store/useAISettingsStore';
import { speak, getCleanTextForSpeech } from '~/lib/voice';

export type Message = {
  id: string;
  role: 'user' | 'ai';
  content: string;
};

type ChatScreenProps = {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
};

export default function ChatScreen({ messages, setMessages }: ChatScreenProps) {
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    // Add user message immediately
    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: text };
    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    try {
      // ✅ Call real Gemini AI
      const responseText = await generateAIResponse(text);
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        content: responseText,
      };
      setMessages(prev => [...prev, aiMsg]);

      // Auto TTS if enabled
      const { autoTTS } = useAISettingsStore.getState();
      if (autoTTS) {
        speak(getCleanTextForSpeech(responseText));
      }
    } catch (err) {
      console.error('AI error:', err);
      const errMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        content: `⚠️ AI Error: ${err instanceof Error ? err.message : String(err)}`,
      };
      setMessages(prev => [...prev, errMsg]);
    } finally {
      setIsTyping(false);
    }
  };


  return (
    <div className="flex flex-col h-screen w-full bg-[#0a0f18] text-gray-100 overflow-hidden pb-[88px]">
      <header className="flex-none px-6 py-5 border-b border-white/5 bg-[#10141a]/90 backdrop-blur-md z-10 flex items-center justify-between shadow-sm shadow-black/20">
        <div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent tracking-tight">
            Terminal / Chat
          </h1>
          <p className="text-xs text-gray-500 font-mono mt-1">Status: Online</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-4 sm:px-6 md:px-8 py-8 custom-scrollbar">
        <MessageList messages={messages} />
        {isTyping && (
          <div className="flex w-full mb-6 justify-start max-w-4xl mx-auto">
            <div className="bg-[#1a202c] text-gray-400 border border-white/5 rounded-2xl rounded-tl-sm px-5 py-3.5 shadow-md flex items-center gap-1.5 h-[52px]">
              <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}
      </main>

      <div className="flex-none px-4 sm:px-6 md:px-8 pb-4 bg-gradient-to-t from-[#0a0f18] to-transparent pt-4">
        <ChatInput onSend={handleSendMessage} />
      </div>
    </div>
  );
}
