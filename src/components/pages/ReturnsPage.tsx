'use client';

import { useCMS } from '@/contexts/CMSContext';

export default function ReturnsPage() {
  const { content } = useCMS();
  const d = content.returns;

  return (
    <div className="animate-fade-in">
      <section className="relative py-24 overflow-hidden bg-gradient-to-br from-brand-100 via-slate-50 to-purple-100 dark:from-purple-900/40 dark:via-gray-950 dark:to-brand-900/30">
        {d.bannerImage && (
          <div className="absolute inset-0 z-0">
            <img src={d.bannerImage} alt="Banner" className="w-full h-full object-cover opacity-20 dark:opacity-30" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white dark:to-gray-950" />
          </div>
        )}
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl sm:text-6xl font-serif font-bold mb-6 leading-tight text-gray-900 dark:text-white">{d.heroTitle}</h1>
          <p className="text-xl text-gray-700 dark:text-gray-300">{d.heroSubtitle}</p>
        </div>
      </section>
      <section className="max-w-5xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-serif font-bold mb-10 text-center">How it works</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {d.steps.map((s: any, i: number) => (
            <div key={i} className="glass-card rounded-2xl p-6 hover-lift relative">
              <div className="text-5xl font-bold gradient-text opacity-30 mb-2">{s.num}</div>
              <h3 className="text-lg font-bold mb-2">{s.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
        <h2 className="text-3xl font-serif font-bold mb-10 text-center">Our policies</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {d.policies.map((p: any, i: number) => (
            <div key={i} className="glass-card rounded-2xl p-6">
              <h3 className="text-lg font-bold mb-2 gradient-text">{p.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
