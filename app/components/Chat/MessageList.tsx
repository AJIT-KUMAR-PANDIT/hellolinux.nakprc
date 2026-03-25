import React, { useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';
import type { Message } from './ChatScreen';
import { AnimatePresence } from 'motion/react';

type MessageListProps = {
  messages: Message[];
};

export default function MessageList({ messages }: MessageListProps) {
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto">
      <AnimatePresence initial={false}>
        {messages.map((msg) => (
          <MessageBubble key={msg.id} role={msg.role} content={msg.content} />
        ))}
      </AnimatePresence>
      <div ref={endRef} className="h-4" />
    </div>
  );
}
