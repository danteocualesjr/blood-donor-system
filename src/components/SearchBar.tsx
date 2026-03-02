import { useCallback, useEffect, useRef, useState } from 'react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit?: (value: string) => void;
  placeholder?: string;
  className?: string;
  size?: 'default' | 'large';
  isAiLoading?: boolean;
}

const SUGGESTIONS = [
  { icon: '🔍', text: 'Find O+ donors near Manila' },
  { icon: '🚨', text: 'I need B- blood urgently in Makati' },
  { icon: '💡', text: 'Who can donate to AB+ patients?' },
  { icon: '📍', text: 'Nearest available donor to me' },
];

export function SearchBar({
  value, onChange, onSubmit,
  placeholder = 'Ask BloodLink AI anything about finding donors...',
  className = '', size = 'default', isAiLoading = false,
}: SearchBarProps) {
  const [local, setLocal] = useState(value);
  const [focused, setFocused] = useState(false);
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => { setLocal(value); }, [value]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setLocal(e.target.value);
    onChange(e.target.value);
  }, [onChange]);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (local.trim() && !isAiLoading) { onSubmit?.(local.trim()); setLocal(''); onChange(''); }
  }, [local, onSubmit, isAiLoading, onChange]);

  const handleClear = useCallback(() => { setLocal(''); onChange(''); ref.current?.focus(); }, [onChange]);

  const large = size === 'large';

  return (
    <div className={className}>
      <form onSubmit={handleSubmit}>
        <div className={`relative transition-transform duration-300 ${focused ? 'sm:scale-[1.015]' : ''}`}>
          <div className={`absolute -inset-[2px] rounded-[20px] bg-gradient-to-r from-blood/40 via-rose-400/25 to-blood/40 blur-md transition-opacity duration-500 hidden sm:block ${focused ? 'opacity-100' : 'opacity-0'}`} />

          <div className={`relative flex items-center rounded-2xl border bg-white shadow-sm transition-all duration-300 ${focused ? 'border-blood/30 shadow-[0_8px_30px_rgba(220,38,38,0.08)]' : 'border-slate-200 shadow-[0_1px_3px_rgba(0,0,0,0.04)]'}`}>
            <div className={`flex items-center justify-center shrink-0 ${large ? 'pl-3 sm:pl-5' : 'pl-3 sm:pl-4'}`}>
              <div className={`${large ? 'w-7 h-7 sm:w-8 sm:h-8' : 'w-7 h-7'} rounded-[10px] bg-gradient-to-br from-blood to-rose-500 flex items-center justify-center shadow-sm`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`text-white ${large ? 'w-4 h-4' : 'w-4 h-4'}`}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 0 0-2.455 2.456Z" />
                </svg>
              </div>
            </div>

            <input
              ref={ref}
              type="text"
              value={local}
              onChange={handleChange}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholder={placeholder}
              disabled={isAiLoading}
              enterKeyHint="send"
              aria-label="Ask BloodLink AI about blood donors"
              className={`flex-1 min-w-0 bg-transparent text-slate-900 placeholder-slate-400 focus:outline-none disabled:opacity-50 ${
                large ? 'px-3 sm:px-4 py-3.5 sm:py-4.5 text-[15px] sm:text-[17px]' : 'px-3 py-3 text-[15px]'
              }`}
            />

            <div className={`flex items-center gap-1.5 shrink-0 ${large ? 'pr-2.5 sm:pr-3' : 'pr-2.5'}`}>
              {local && !isAiLoading && (
                <button type="button" onClick={handleClear} aria-label="Clear" className="p-2 rounded-lg text-slate-300 hover:text-slate-500 hover:bg-slate-50 transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>
                </button>
              )}
              <button
                type="submit"
                disabled={isAiLoading || !local.trim()}
                className={`flex items-center gap-1.5 font-semibold rounded-xl transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed active:scale-95 ${
                  isAiLoading
                    ? 'bg-slate-100 text-slate-500'
                    : 'bg-slate-900 text-white hover:bg-slate-800 shadow-sm hover:shadow-md'
                } ${large ? 'px-3.5 sm:px-4.5 py-2 text-[13px]' : 'px-3.5 py-1.5 text-xs'}`}
              >
                {isAiLoading ? (
                  <><svg className="w-3.5 h-3.5 animate-spin" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/></svg><span className="hidden sm:inline">Thinking...</span></>
                ) : (
                  <><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5"><path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"/></svg><span className="hidden sm:inline">Ask AI</span></>
                )}
              </button>
            </div>
          </div>
        </div>
      </form>

      {large && !local && !isAiLoading && (
        <div className="mt-4 sm:mt-5 flex gap-2 overflow-x-auto sm:overflow-visible sm:flex-wrap sm:justify-center pb-2 sm:pb-0 -mx-1 px-1 scrollbar-hide animate-fade-in">
          {SUGGESTIONS.map((s) => (
            <button
              key={s.text}
              type="button"
              onClick={() => { if (!isAiLoading) onSubmit?.(s.text); }}
              className="group flex items-center gap-1.5 px-3.5 py-2.5 sm:py-2 text-[12px] font-medium text-slate-500 bg-white/70 border border-slate-200/80 rounded-xl hover:border-slate-300 hover:bg-white hover:text-slate-700 hover:shadow-sm transition-all duration-200 active:scale-[0.97] whitespace-nowrap shrink-0"
            >
              <span className="text-sm">{s.icon}</span>
              {s.text}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
