'use client';

import { useCMS } from '@/contexts/CMSContext';
import { Icons } from '@/components/ui/Icons';

export default function ShippingPage() {
  const { content } = useCMS();
  const d = content.shipping;

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
      <section className="max-w-5xl mx-auto px-4 py-16">
        <div className="grid sm:grid-cols-2 gap-6 mb-16">
          {d.methods.map((m: any, i: number) => (
            <div key={i} className="glass-card rounded-2xl p-6 hover-lift">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-brand-500/20 text-brand-400 flex items-center justify-center"><Icons.Truck /></div>
                <span className="text-xl font-bold gradient-text">{m.price}</span>
              </div>
              <h3 className="text-lg font-bold mb-1">{m.name}</h3>
              <p className="text-sm text-brand-400 mb-3">{m.time}</p>
              <p className="text-sm text-gray-400">{m.desc}</p>
            </div>
          ))}
        </div>
        <div className="glass-card rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-6">Good to know</h2>
          <ul className="space-y-3">
            {d.notes.map((n: string, i: number) => (
              <li key={i} className="flex gap-3 text-gray-300 text-sm"><span className="text-brand-400 flex-shrink-0 mt-0.5"><Icons.Check /></span>{n}</li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
