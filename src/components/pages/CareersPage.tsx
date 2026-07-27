'use client';

import { useCMS } from '@/contexts/CMSContext';
import { Icons } from '@/components/ui/Icons';

export default function CareersPage() {
  const { content } = useCMS();
  const d = content.careers;

  return (
    <div className="animate-fade-in">
      <section className="relative py-24 overflow-hidden bg-gradient-to-br from-brand-100 via-slate-50 to-purple-100 dark:from-brand-900/40 dark:via-gray-950 dark:to-purple-900/30">
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
      <section className="max-w-4xl mx-auto px-4 py-16">
        <div className="glass-card rounded-2xl p-8 mb-12">
          <h2 className="text-2xl font-serif font-bold mb-4">Our culture</h2>
          <p className="text-gray-300 leading-relaxed">{d.culture}</p>
        </div>
        <h2 className="text-2xl font-bold mb-6">What you get</h2>
        <div className="grid sm:grid-cols-2 gap-3 mb-16">
          {d.perks.map((p: string, i: number) => (
            <div key={i} className="glass-card rounded-xl p-4 flex gap-3 items-start"><span className="text-brand-400 flex-shrink-0 mt-0.5"><Icons.Check /></span><span className="text-sm text-gray-300">{p}</span></div>
          ))}
        </div>
        <h2 className="text-2xl font-bold mb-6">Open positions <span className="text-gray-500 text-lg">({d.openings.length})</span></h2>
        <div className="space-y-3">
          {d.openings.map((o: any, i: number) => (
            <div key={i} className="glass-card rounded-2xl p-6 hover-lift cursor-pointer group">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold group-hover:text-brand-300 transition-colors">{o.title}</h3>
                  <div className="flex flex-wrap gap-3 mt-2 text-xs text-gray-400">
                    <span className="flex items-center gap-1"><Icons.Briefcase /> {o.team}</span>
                    <span className="flex items-center gap-1"><Icons.MapPin /> {o.location}</span>
                    <span className="flex items-center gap-1"><Icons.Clock /> {o.type}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-bold gradient-text">{o.salary}</span>
                  <button className="px-4 py-2 glass rounded-xl text-sm font-medium hover:bg-brand-600 hover:text-white transition-all">Apply</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
