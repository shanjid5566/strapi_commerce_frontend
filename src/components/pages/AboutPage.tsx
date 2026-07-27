'use client';

import { useCMS } from '@/contexts/CMSContext';

export default function AboutPage() {
  const { content } = useCMS();
  const d = content.about;

  return (
    <div className="animate-fade-in">
      <section className="relative py-24 overflow-hidden bg-gradient-to-br from-brand-100 via-slate-50 to-purple-100 dark:from-brand-900/40 dark:via-gray-950 dark:to-purple-900/30">
        {d.bannerImage && (
          <div className="absolute inset-0 z-0">
            <img src={d.bannerImage} alt="Banner" className="w-full h-full object-cover opacity-20 dark:opacity-30" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white dark:to-gray-950" />
          </div>
        )}
        <div className="absolute top-20 right-20 w-96 h-96 bg-brand-500 rounded-full blur-[128px] opacity-15 dark:opacity-20 z-0" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <span className="inline-block px-3 py-1 bg-brand-500/10 dark:glass border border-brand-500/20 rounded-full text-xs font-semibold text-brand-600 dark:text-brand-300 mb-6">Our Story</span>
          <h1 className="text-4xl sm:text-6xl font-serif font-bold mb-6 leading-tight text-gray-900 dark:text-white">{d.heroTitle}</h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">{d.heroSubtitle}</p>
        </div>
      </section>
      <section className="max-w-4xl mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-3xl font-serif font-bold mb-6 text-gray-900 dark:text-white">How it started</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{d.story}</p>
          </div>
          <div className="glass-card rounded-2xl p-8 border border-gray-200 dark:border-white/10">
            <h3 className="text-xl font-bold mb-4 gradient-text">Our mission</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{d.mission}</p>
          </div>
        </div>
      </section>
      <section className="max-w-6xl mx-auto px-4 py-20">
        <h2 className="text-3xl font-serif font-bold text-center mb-12 text-gray-900 dark:text-white">What we stand for</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {d.values.map((v: any, i: number) => (
            <div key={i} className="glass-card rounded-2xl p-6 hover-lift border border-gray-200 dark:border-white/10">
              <div className="w-10 h-10 rounded-xl bg-brand-500/15 text-brand-600 dark:text-brand-400 flex items-center justify-center font-bold mb-4">0{i + 1}</div>
              <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">{v.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="max-w-6xl mx-auto px-4 py-20">
        <h2 className="text-3xl font-serif font-bold text-center mb-12 text-gray-900 dark:text-white">Meet the team</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {d.team.map((t: any, i: number) => (
            <div key={i} className="glass-card rounded-2xl p-6 text-center hover-lift border border-gray-200 dark:border-white/10">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-brand-500 to-purple-500 flex items-center justify-center text-2xl font-bold text-white shadow-md">{t.name.split(' ').map((n: string) => n[0]).join('')}</div>
              <h3 className="font-bold text-gray-900 dark:text-white">{t.name}</h3>
              <p className="text-xs text-brand-600 dark:text-brand-400 font-medium mb-2">{t.role}</p>
              <p className="text-xs text-gray-600 dark:text-gray-400 italic">"{t.bio}"</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
