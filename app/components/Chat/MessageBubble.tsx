import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Volume2, Copy, Check } from 'lucide-react';
import { speak, getCleanTextForSpeech } from '~/lib/voice';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

type MessageBubbleProps = {
  role: 'user' | 'ai';
  content: string;
};

const CodeBlock = ({ language, value }: { language: string; value: string }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group/code my-4 rounded-lg overflow-hidden border border-white/10 shadow-lg">
      <div className="flex items-center justify-between px-4 py-1.5 bg-[#2d333b] border-b border-white/5 text-[10px] text-gray-400 font-mono uppercase tracking-wider">
        <span>{language || 'code'}</span>
        <button
          onClick={copyToClipboard}
          className="hover:text-green-400 transition-colors flex items-center gap-1"
        >
          {copied ? <Check size={12} className="text-green-500" /> : <Copy size={12} />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <SyntaxHighlighter
        language={language || 'text'}
        style={oneDark}
        customStyle={{ margin: 0, padding: '1rem', fontSize: '13px', background: '#1a1d23' }}
      >
        {value}
      </SyntaxHighlighter>
    </div>
  );
};

export default function MessageBubble({ role, content }: MessageBubbleProps) {
  const isUser = role === 'user';

  // Custom renderer for markdown
  const MarkdownComponents = {
    code({ node, inline, className, children, ...props }: any) {
      const match = /language-(\w+)/.exec(className || '');
      const value = String(children).replace(/\n$/, '');

      return !inline ? (
        <CodeBlock language={match ? match[1] : ''} value={value} />
      ) : (
        <code className="bg-black/30 px-1.5 py-0.5 rounded text-green-400 font-mono text-[13px] border border-white/5" {...props}>
          {children}
        </code>
      );
    },
    blockquote({ children }: any) {
      const text = children?.[0]?.props?.children?.[0];
      const isThinking = typeof text === 'string' && text.startsWith('[THINKING]:');

      if (isThinking) {
        return (
          <div className="my-4 p-4 rounded-xl bg-black/20 border-l-4 border-amber-500/50 text-amber-200/80 italic text-sm shadow-inner shadow-black/40">
            <div className="flex items-center gap-2 mb-2 not-italic font-bold text-amber-500 text-[10px] uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
              Thought Process
            </div>
            {String(text).replace('[THINKING]:', '').trim()}
          </div>
        );
      }
      return <blockquote className="border-l-4 border-white/20 pl-4 my-2 italic text-gray-400">{children}</blockquote>;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      className={`flex w-full mb-6 ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`relative group max-w-[85%] sm:max-w-[85%] md:max-w-[75%] px-5 py-3.5 rounded-2xl ${isUser
          ? 'bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-tr-sm shadow-lg shadow-green-500/20'
          : 'bg-[#1a202c] text-gray-200 border border-white/5 rounded-tl-sm shadow-md shadow-black/40'
          }`}
      >
        <div className="prose prose-invert prose-sm max-w-none">
          <ReactMarkdown components={MarkdownComponents}>
            {typeof content === 'string' ? content : JSON.stringify(content)}
          </ReactMarkdown>
        </div>

        {!isUser && (
          <button
            onClick={() => speak(getCleanTextForSpeech(content))}
            className="absolute -right-10 top-6 p-2 rounded-full bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/10 text-gray-400 hover:text-green-400"
            title="Read aloud"
          >
            <Volume2 size={16} />
          </button>
        )}
      </div>
    </motion.div>
  );
}
