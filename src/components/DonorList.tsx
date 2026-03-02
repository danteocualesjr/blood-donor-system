import type { Donor } from '../types/donor';
import { DonorCard } from './DonorCard';

interface DonorListProps {
  donors: Donor[];
  isLoading?: boolean;
}

export function DonorList({ donors, isLoading = false }: DonorListProps) {
  if (isLoading) {
    return (
      <div className="grid gap-3 sm:gap-4 sm:grid-cols-2 xl:grid-cols-3" aria-busy="true">
        {Array.from({ length: 4 }, (_, i) => (
          <div key={i} className="bg-white rounded-2xl border border-slate-100 p-5">
            <div className="flex items-start gap-3.5">
              <div className="w-11 h-11 rounded-xl animate-shimmer" />
              <div className="flex-1 space-y-2 pt-1">
                <div className="h-3.5 rounded-md animate-shimmer w-3/5" />
                <div className="h-3 rounded-md animate-shimmer w-2/5" />
              </div>
              <div className="w-10 h-7 rounded-lg animate-shimmer" />
            </div>
            <div className="mt-4 pt-3.5 border-t border-slate-50 flex justify-between">
              <div className="h-3 rounded-md animate-shimmer w-1/3" />
              <div className="h-7 rounded-lg animate-shimmer w-16" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (donors.length === 0) {
    return (
      <div className="text-center py-20 animate-fade-in" role="status">
        <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-slate-50 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-8 h-8 text-slate-300">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
        </div>
        <p className="text-slate-800 font-semibold text-base">No donors match your criteria</p>
        <p className="text-slate-400 text-sm mt-1 max-w-xs mx-auto">Try a different blood type, location, or ask the AI for help finding alternatives.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-3 sm:gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {donors.map((donor, i) => (
        <DonorCard key={donor.id} donor={donor} index={i} />
      ))}
    </div>
  );
}
