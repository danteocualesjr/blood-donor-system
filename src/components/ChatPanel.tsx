import { useEffect, useRef } from 'react';
import type { ChatMessage } from '../types/chat';

interface ChatPanelProps {
  messages: ChatMessage[];
  isLoading: boolean;
  error: string | null;
  onClear: () => void;
}

function renderMarkdown(content: string) {
  return content.split('\n').map((line, i) => {
    if (line.startsWith('- ') || line.startsWith('* ')) {
      return <li key={i} className="ml-4 list-disc text-slate-700">{inlineBold(line.slice(2))}</li>;
    }
    if (/^\*\*(.+)\*\*$/.test(line)) {
      return <p key={i} className="font-semibold text-slate-900 mt-3 first:mt-0">{line.slice(2, -2)}</p>;
    }
    if (line.trim() === '') return <div key={i} className="h-2" />;
    return <p key={i} className="text-slate-700">{inlineBold(line)}</p>;
  });
}

function inlineBold(text: string) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith('**') && part.endsWith('**')
      ? <strong key={i} className="font-semibold text-slate-900">{part.slice(2, -2)}</strong>
      : part
  );
}

export function ChatPanel({ messages, isLoading, error, onClear }: ChatPanelProps) {
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  if (!messages.length && !isLoading) return null;

  return (
    <div className="rounded-2xl border border-slate-200/70 bg-white shadow-[0_8px_40px_rgba(0,0,0,0.06)] overflow-hidden animate-fade-in-up">
      <div className="flex items-center justify-between px-4 sm:px-5 py-3 bg-gradient-to-r from-slate-50 to-white border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-[7px] bg-gradient-to-br from-blood to-rose-500 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5 text-white">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 0 0-2.455 2.456Z" />
            </svg>
          </div>
          <span className="text-[13px] font-semibold text-slate-800">BloodLink AI</span>
          {isLoading && (
            <div className="flex items-center gap-1 ml-1">
              <div className="w-1 h-1 rounded-full bg-blood typing-dot-1" />
              <div className="w-1 h-1 rounded-full bg-blood typing-dot-2" />
              <div className="w-1 h-1 rounded-full bg-blood typing-dot-3" />
            </div>
          )}
        </div>
        <button onClick={onClear} className="text-[11px] font-medium text-slate-400 hover:text-slate-600 px-2.5 py-1 rounded-md hover:bg-slate-50 transition-all">
          Clear
        </button>
      </div>

      <div className="max-h-[50vh] sm:max-h-[460px] overflow-y-auto px-4 sm:px-5 py-4 sm:py-5 space-y-4 overscroll-contain">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
            {msg.role === 'assistant' && (
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blood to-rose-500 flex items-center justify-center mr-2.5 mt-0.5 shrink-0">
                <svg viewBox="0 0 20 20" className="w-3 h-3 text-white" fill="currentColor"><path d="M10 18s-7-5.3-7-10.3C3 4.5 5.2 2 8 2c1.3 0 2 .5 2 .5s.7-.5 2-.5c2.8 0 5 2.5 5 5.7C17 12.7 10 18 10 18z"/></svg>
              </div>
            )}
            <div className={`max-w-[88%] sm:max-w-[82%] text-[13.5px] leading-relaxed ${
              msg.role === 'user'
                ? 'bg-slate-900 text-white px-4 py-2.5 rounded-2xl rounded-br-md'
                : 'space-y-1'
            }`}>
              {msg.role === 'assistant' ? renderMarkdown(msg.content) : msg.content}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start animate-fade-in">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blood to-rose-500 flex items-center justify-center mr-2.5 mt-0.5 shrink-0">
              <svg viewBox="0 0 20 20" className="w-3 h-3 text-white" fill="currentColor"><path d="M10 18s-7-5.3-7-10.3C3 4.5 5.2 2 8 2c1.3 0 2 .5 2 .5s.7-.5 2-.5c2.8 0 5 2.5 5 5.7C17 12.7 10 18 10 18z"/></svg>
            </div>
            <div className="flex items-center gap-1 px-3 py-2.5">
              <div className="w-1.5 h-1.5 rounded-full bg-slate-300 typing-dot-1" />
              <div className="w-1.5 h-1.5 rounded-full bg-slate-300 typing-dot-2" />
              <div className="w-1.5 h-1.5 rounded-full bg-slate-300 typing-dot-3" />
            </div>
          </div>
        )}

        {error && (
          <div className="flex justify-start animate-fade-in">
            <div className="max-w-[88%] sm:max-w-[82%] bg-red-50 border border-red-100 rounded-2xl rounded-bl-md px-4 py-3 text-[13px]">
              <p className="font-semibold text-red-800">Something went wrong</p>
              <p className="text-red-600 mt-0.5">{error}</p>
            </div>
          </div>
        )}

        <div ref={endRef} />
      </div>
    </div>
  );
}
