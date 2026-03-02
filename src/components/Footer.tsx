import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 mt-auto" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 sm:py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-[8px] bg-gradient-to-br from-blood to-rose-500 flex items-center justify-center">
                <svg viewBox="0 0 20 20" className="w-3.5 h-3.5 text-white" fill="currentColor"><path d="M10 18s-7-5.3-7-10.3C3 4.5 5.2 2 8 2c1.3 0 2 .5 2 .5s.7-.5 2-.5c2.8 0 5 2.5 5 5.7C17 12.7 10 18 10 18z"/></svg>
              </div>
              <span className="text-white font-bold text-sm">BloodLink</span>
            </div>
            <p className="text-[13px] leading-relaxed text-slate-500">
              AI-powered blood donor matching. Connecting those who give with those who need.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold text-[12px] uppercase tracking-widest mb-4">Platform</h4>
            <ul className="space-y-2.5">
              <li><Link to="/" className="text-[13px] hover:text-white transition-colors">Find Donors</Link></li>
              <li><Link to="/how-to-donate" className="text-[13px] hover:text-white transition-colors">How to Donate</Link></li>
              <li><a href="#" className="text-[13px] hover:text-white transition-colors">Register</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold text-[12px] uppercase tracking-widest mb-4">Resources</h4>
            <ul className="space-y-2.5">
              <li><a href="#" className="text-[13px] hover:text-white transition-colors">Blood Types Guide</a></li>
              <li><a href="#" className="text-[13px] hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#" className="text-[13px] hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold text-[12px] uppercase tracking-widest mb-4">Legal</h4>
            <ul className="space-y-2.5">
              <li><a href="#" className="text-[13px] hover:text-white transition-colors">Privacy</a></li>
              <li><a href="#" className="text-[13px] hover:text-white transition-colors">Terms</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-slate-800/60 flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-3 text-center sm:text-left">
          <p className="text-[11px] text-slate-600">For emergencies, contact your local blood bank or hospital directly.</p>
          <p className="text-[11px] text-slate-700">Built with care for the community.</p>
        </div>
      </div>
    </footer>
  );
}
