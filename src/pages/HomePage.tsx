import { useCallback } from 'react';
import { SearchBar } from '../components/SearchBar';
import { Filters } from '../components/Filters';
import { DonorList } from '../components/DonorList';
import { ChatPanel } from '../components/ChatPanel';
import { useSearch } from '../hooks/useSearch';
import { useChat } from '../hooks/useChat';

const STATS = [
  { value: '2,400+', label: 'Donors', icon: 'M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z' },
  { value: '850+', label: 'Lives Saved', icon: 'M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z' },
  { value: '6', label: 'Cities', icon: 'M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z' },
  { value: '<30s', label: 'Match Time', icon: 'M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z' },
];

export function HomePage() {
  const search = useSearch();
  const chat = useChat();

  const hasFilters = search.query || search.filters.location || search.filters.bloodType;
  const chatActive = chat.messages.length > 0 || chat.isLoading;

  const handleAsk = useCallback((q: string) => chat.sendMessage(q), [chat]);

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-[#0a0f1a]">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f1a] via-[#0f172a] to-[#0a0f1a]" />
          <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-gradient-to-br from-blood/15 via-rose-500/8 to-transparent rounded-full blur-[100px]" />
          <div className="absolute bottom-[-100px] left-1/4 w-[500px] h-[400px] bg-indigo-500/5 rounded-full blur-[80px]" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjAuNSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIvPjwvc3ZnPg==')] opacity-60" />
        </div>

        <div className="relative max-w-3xl mx-auto px-4 sm:px-8 pt-14 pb-16 sm:pt-28 sm:pb-32 text-center">
          {/* Status pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 sm:py-1 bg-white/[0.06] backdrop-blur-sm rounded-full border border-white/[0.08] text-[11px] sm:text-[12px] text-slate-400 mb-5 sm:mb-7 animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            AI-powered donor matching
          </div>

          {/* Headline */}
          <h1 className="text-[clamp(1.75rem,5vw,3.5rem)] font-extrabold leading-[1.1] tracking-tight text-white mb-4 sm:mb-5 animate-fade-in-up">
            Find a blood donor{' '}
            <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-rose-400 to-pink-300">near you, instantly</span>
          </h1>

          <p className="text-sm sm:text-lg text-slate-400 max-w-lg mx-auto mb-8 sm:mb-10 animate-fade-in-up stagger-2 leading-relaxed px-2 sm:px-0">
            Ask our AI to find compatible donors, check blood type compatibility, or get answers to donation questions.
          </p>

          {/* Search */}
          <SearchBar
            value={search.query}
            onChange={search.updateQuery}
            onSubmit={handleAsk}
            size="large"
            isAiLoading={chat.isLoading}
            className="max-w-xl mx-auto animate-fade-in-up stagger-3"
          />

          <div className="mt-8 sm:mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-4 max-w-sm sm:max-w-md mx-auto animate-fade-in-up stagger-4">
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-base sm:text-xl font-bold text-white">{s.value}</p>
                <p className="text-[10px] sm:text-[11px] text-slate-500 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CHAT PANEL ===== */}
      {chatActive && (
        <section className="relative -mt-6 sm:-mt-8 z-20 max-w-2xl mx-auto px-4 sm:px-8 mb-8 sm:mb-10">
          <ChatPanel messages={chat.messages} isLoading={chat.isLoading} error={chat.error} onClear={chat.clearChat} />
        </section>
      )}

      {/* ===== MAIN CONTENT ===== */}
      <section className={`max-w-7xl mx-auto px-4 sm:px-8 pb-16 sm:pb-20 ${chatActive ? '' : '-mt-4 sm:-mt-6'}`}>
        <div className="flex items-end justify-between mb-5 sm:mb-6 pt-6 sm:pt-8">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
              {hasFilters ? 'Filtered Results' : 'Available Donors'}
            </h2>
            <p className="text-[12px] sm:text-[13px] text-slate-400 mt-0.5">
              {search.donors.length} donor{search.donors.length !== 1 ? 's' : ''}
              {search.filters.location ? ` in ${search.filters.location}` : ''}
              {search.filters.bloodType ? ` \u00b7 Type ${search.filters.bloodType}` : ''}
            </p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-5 sm:gap-8">
          <aside className="lg:w-64 shrink-0 lg:order-first">
            <div className="bg-white rounded-2xl border border-slate-100 p-4 sm:p-5 lg:sticky lg:top-[76px] shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
              <div className="hidden lg:flex items-center justify-between mb-4">
                <h3 className="text-[13px] font-semibold text-slate-700">Filters</h3>
                <span className="text-[11px] font-medium text-slate-400 bg-slate-50 px-2 py-0.5 rounded-md">{search.donors.length}</span>
              </div>
              <Filters filters={search.filters} onFiltersChange={search.updateFilters} onClear={search.clearFilters} />
            </div>
          </aside>

          <div className="flex-1 min-w-0">
            <DonorList donors={search.donors} />
          </div>
        </div>
      </section>
    </>
  );
}
