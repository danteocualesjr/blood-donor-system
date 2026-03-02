const STEPS = [
  { num: '01', title: 'Check Eligibility', desc: 'At least 18 years old, weigh 50+ kg, in good general health, and no recent donations within 56 days.', icon: 'M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z' },
  { num: '02', title: 'Prepare', desc: 'Sleep well, eat a healthy meal, drink fluids, and bring a valid ID to the donation center.', icon: 'M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75' },
  { num: '03', title: 'Donate', desc: 'The process takes 10-15 minutes. A small needle collects about one pint. You may feel a slight pinch.', icon: 'M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z' },
  { num: '04', title: 'Recover', desc: 'Enjoy refreshments, rest 15 minutes, avoid heavy lifting. You\'ll feel completely normal within a day.', icon: 'M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z' },
];

const REQS = [
  'At least 18 years old',
  'Weigh at least 50 kg (110 lbs)',
  'In good general health',
  'No donation in the last 56 days',
  'No recent tattoos or piercings (3-6 months)',
  'Not currently on antibiotics',
];

export function HowToDonatePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[#0a0f1a]">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f1a] via-[#0f172a] to-[#0a0f1a]" />
          <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-br from-blood/12 via-rose-500/6 to-transparent rounded-full blur-[100px]" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjAuNSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIvPjwvc3ZnPg==')] opacity-60" />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 sm:px-8 pt-14 pb-20 sm:pt-20 sm:pb-24 text-center">
          <h1 className="text-[clamp(1.75rem,5vw,3rem)] font-extrabold leading-[1.1] tracking-tight text-white mb-3 sm:mb-4 animate-fade-in-up">
            How to{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-rose-300">Donate Blood</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-400 max-w-md mx-auto animate-fade-in-up stagger-2 px-2 sm:px-0">One of the simplest ways to save a life. Here&apos;s everything you need to know.</p>
        </div>
      </section>

      {/* Steps */}
      <section className="max-w-4xl mx-auto px-4 sm:px-8 -mt-10 relative z-10 mb-12 sm:mb-16">
        <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
          {STEPS.map((s, i) => (
            <div key={s.num} className={`bg-white rounded-2xl border border-slate-100 p-5 sm:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.04)] animate-fade-in-up stagger-${i + 1}`}>
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-red-50 flex items-center justify-center shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-blood"><path strokeLinecap="round" strokeLinejoin="round" d={s.icon} /></svg>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-blood/50 uppercase tracking-widest">Step {s.num}</span>
                  <h3 className="text-[14px] sm:text-[15px] font-bold text-slate-900 mt-0.5 mb-1.5">{s.title}</h3>
                  <p className="text-[13px] text-slate-500 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Requirements */}
      <section className="max-w-2xl mx-auto px-4 sm:px-8 mb-12 sm:mb-16">
        <div className="bg-white rounded-2xl border border-slate-100 p-5 sm:p-7 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
          <h2 className="text-lg font-bold text-slate-900 mb-4 sm:mb-5">Eligibility</h2>
          <div className="space-y-3">
            {REQS.map((r, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center mt-0.5 shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3 h-3 text-emerald-500"><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5"/></svg>
                </div>
                <p className="text-[13px] text-slate-600">{r}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-2xl mx-auto px-4 sm:px-8 mb-16 sm:mb-20">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0a0f1a] to-slate-900 p-6 sm:p-10 text-center">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[300px] bg-blood/10 rounded-full blur-[80px]" />
          <div className="relative">
            <h2 className="text-xl sm:text-3xl font-bold text-white mb-2 sm:mb-3">Ready to save a life?</h2>
            <p className="text-slate-400 text-[13px] sm:text-sm mb-5 sm:mb-7 max-w-sm mx-auto">Register and get notified when someone near you needs your blood type.</p>
            <button className="px-7 py-3 sm:py-2.5 bg-white text-slate-900 text-sm font-bold rounded-xl hover:bg-slate-50 transition-all shadow-lg hover:shadow-xl active:scale-[0.97]">
              Become a Donor
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
