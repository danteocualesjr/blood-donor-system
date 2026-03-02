import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export function Header() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  const links = [
    { to: '/', label: 'Find Donors' },
    { to: '/how-to-donate', label: 'How to Donate' },
  ];

  return (
    <header className="sticky top-0 z-50 glass border-b border-white/40" style={{ paddingTop: 'env(safe-area-inset-top)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex items-center justify-between h-14 sm:h-[60px]">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative w-8 h-8 rounded-[10px] bg-gradient-to-br from-blood to-rose-500 flex items-center justify-center shadow-[0_2px_8px_rgba(220,38,38,0.3)] group-hover:shadow-[0_4px_16px_rgba(220,38,38,0.35)] transition-shadow">
              <svg viewBox="0 0 20 20" className="w-4 h-4 text-white" fill="currentColor">
                <path d="M10 18s-7-5.3-7-10.3C3 4.5 5.2 2 8 2c1.3 0 2 .5 2 .5s.7-.5 2-.5c2.8 0 5 2.5 5 5.7C17 12.7 10 18 10 18z"/>
              </svg>
            </div>
            <span className="text-[15px] font-bold tracking-tight text-slate-900">
              Blood<span className="text-blood">Link</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-0.5" aria-label="Main">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={`relative px-3.5 py-1.5 rounded-lg text-[13px] font-medium transition-all duration-200 ${
                  pathname === l.to
                    ? 'text-blood bg-red-50/80'
                    : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                }`}
              >
                {l.label}
              </Link>
            ))}
            <div className="mx-3 w-px h-5 bg-slate-200" />
            <button className="px-4 py-1.5 bg-slate-900 text-white text-[13px] font-semibold rounded-lg hover:bg-slate-800 transition-all shadow-sm hover:shadow-md active:scale-[0.98]">
              Become a Donor
            </button>
          </nav>

          <button onClick={() => setOpen(!open)} className="md:hidden p-2.5 -mr-2 rounded-lg text-slate-500 hover:bg-slate-50 active:bg-slate-100 transition-colors" aria-label="Menu">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-5 h-5">
              {open
                ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-slate-100 bg-white animate-slide-down">
          <div className="px-4 py-3 space-y-0.5" style={{ paddingBottom: 'max(12px, env(safe-area-inset-bottom))' }}>
            {links.map((l) => (
              <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className={`block px-4 py-3 rounded-xl text-[15px] font-medium transition-colors ${pathname === l.to ? 'bg-red-50 text-blood' : 'text-slate-600 active:bg-slate-50'}`}>{l.label}</Link>
            ))}
            <button className="w-full mt-2 px-4 py-3 bg-slate-900 text-white text-[15px] font-semibold rounded-xl active:bg-slate-800">Become a Donor</button>
          </div>
        </div>
      )}
    </header>
  );
}
