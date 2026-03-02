import type { Donor } from '../types/donor';

interface DonorCardProps {
  donor: Donor;
  index: number;
}

function initials(name: string) {
  return name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);
}

const AVATAR_COLORS = [
  'from-violet-500 to-purple-600',
  'from-sky-500 to-blue-600',
  'from-emerald-500 to-teal-600',
  'from-amber-500 to-orange-600',
  'from-rose-500 to-pink-600',
  'from-cyan-500 to-sky-600',
  'from-fuchsia-500 to-purple-600',
  'from-lime-500 to-green-600',
];

function avatarColor(name: string) {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = name.charCodeAt(i) + ((h << 5) - h);
  return AVATAR_COLORS[Math.abs(h) % AVATAR_COLORS.length];
}

export function DonorCard({ donor, index }: DonorCardProps) {
  return (
    <article
      className={`group relative bg-white rounded-2xl border border-slate-100 hover:border-slate-200 p-5 transition-all duration-300 hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 animate-fade-in-up stagger-${Math.min(index + 1, 9)}`}
    >
      {/* Top row */}
      <div className="flex items-start gap-3.5">
        <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${avatarColor(donor.name)} flex items-center justify-center shrink-0 shadow-sm`}>
          <span className="text-white font-bold text-[12px] tracking-wide">{initials(donor.name)}</span>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <h3 className="text-[14px] font-semibold text-slate-900 truncate">{donor.name}</h3>
            {donor.verified && (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-blue-500 shrink-0">
                <path fillRule="evenodd" d="M16.403 12.652a3 3 0 0 0 0-5.304 3 3 0 0 0-3.75-3.751 3 3 0 0 0-5.305 0 3 3 0 0 0-3.751 3.75 3 3 0 0 0 0 5.305 3 3 0 0 0 3.75 3.751 3 3 0 0 0 5.305 0 3 3 0 0 0 3.751-3.75Zm-2.546-4.46a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clipRule="evenodd" />
              </svg>
            )}
          </div>
          <div className="flex items-center gap-2 mt-0.5 text-[12px] text-slate-400">
            <span className="flex items-center gap-0.5">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"/></svg>
              {donor.location}
            </span>
            {donor.distance && <span className="text-slate-300">{donor.distance}</span>}
          </div>
        </div>

        {/* Blood type badge */}
        <div className="shrink-0 px-2.5 py-1 rounded-lg bg-red-50 border border-red-100">
          <span className="text-[13px] font-bold text-blood tracking-wide">{donor.bloodType}</span>
        </div>
      </div>

      <div className="mt-4 pt-3.5 border-t border-slate-50 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 sm:gap-3 text-[11px] text-slate-400 min-w-0">
          <span className="flex items-center gap-1 shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"/></svg>
            {donor.donationCount} donations
          </span>
          {donor.lastDonation && (
            <span className="truncate">Last: {new Date(donor.lastDonation).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
          )}
        </div>
        <button type="button" className="px-3.5 py-2 sm:py-1.5 text-[12px] font-semibold rounded-lg text-blood bg-red-50 border border-red-100 hover:bg-blood hover:text-white hover:border-blood transition-all duration-200 active:scale-95 shrink-0">
          Request
        </button>
      </div>
    </article>
  );
}
