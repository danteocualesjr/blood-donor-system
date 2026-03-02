import { useState } from 'react';
import type { SearchFilters } from '../types/donor';

const BLOOD_TYPES = ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'];
const LOCATIONS = ['Manila', 'Quezon City', 'Makati', 'Pasig', 'Taguig', 'Mandaluyong'];

interface FiltersProps {
  filters: SearchFilters;
  onFiltersChange: (f: Partial<SearchFilters>) => void;
  onClear: () => void;
}

export function Filters({ filters, onFiltersChange, onClear }: FiltersProps) {
  const active = filters.location || filters.bloodType;
  const [expanded, setExpanded] = useState(false);
  const activeCount = (filters.bloodType ? 1 : 0) + (filters.location ? 1 : 0);

  return (
    <div>
      {/* Mobile toggle */}
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="lg:hidden w-full flex items-center justify-between py-1 text-left"
      >
        <span className="text-[13px] font-semibold text-slate-700 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-slate-400"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"/></svg>
          Filters
          {activeCount > 0 && (
            <span className="bg-blood text-white text-[10px] font-bold w-4.5 h-4.5 rounded-full inline-flex items-center justify-center">{activeCount}</span>
          )}
        </span>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}>
          <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>
      </button>

      {/* Filter content -- always visible on lg+, collapsible on mobile */}
      <div className={`${expanded ? 'block' : 'hidden'} lg:block mt-3 lg:mt-0 space-y-5 sm:space-y-6`}>
        {/* Blood type */}
        <div>
          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest mb-2.5">Blood Type</p>
          <div className="flex flex-wrap gap-1.5">
            {['All', ...BLOOD_TYPES].map((t) => {
              const isAll = t === 'All';
              const isActive = isAll ? !filters.bloodType : filters.bloodType === t;
              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => onFiltersChange({ bloodType: isAll ? '' : (filters.bloodType === t ? '' : t) })}
                  className={`px-3 py-[7px] sm:py-[5px] text-[12px] font-semibold rounded-lg border transition-all duration-200 active:scale-95 ${
                    isActive
                      ? 'bg-blood text-white border-blood shadow-[0_2px_8px_rgba(220,38,38,0.25)]'
                      : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300 hover:text-slate-700'
                  }`}
                >
                  {t}
                </button>
              );
            })}
          </div>
        </div>

        {/* Location */}
        <div>
          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest mb-2.5">Area</p>
          <div className="flex flex-wrap gap-1.5">
            <button
              type="button"
              onClick={() => onFiltersChange({ location: '' })}
              className={`px-3 py-[7px] sm:py-[5px] text-[12px] font-medium rounded-lg border transition-all duration-200 active:scale-95 flex items-center gap-1 ${
                !filters.location
                  ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                  : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300 hover:text-slate-700'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"/></svg>
              All
            </button>
            {LOCATIONS.map((loc) => (
              <button
                key={loc}
                type="button"
                onClick={() => onFiltersChange({ location: filters.location === loc ? '' : loc })}
                className={`px-3 py-[7px] sm:py-[5px] text-[12px] font-medium rounded-lg border transition-all duration-200 active:scale-95 ${
                  filters.location === loc
                    ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                    : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300 hover:text-slate-700'
                }`}
              >
                {loc}
              </button>
            ))}
          </div>
        </div>

        {active && (
          <button type="button" onClick={onClear} className="flex items-center gap-1 text-[12px] font-medium text-slate-400 hover:text-blood transition-colors py-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12"/></svg>
            Clear all
          </button>
        )}
      </div>
    </div>
  );
}
