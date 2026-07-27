'use client';

import { useState } from 'react';
import { useCMS } from '@/contexts/CMSContext';
import { Icons } from '@/components/ui/Icons';

export default function FAQPage() {
  const { content } = useCMS();
  const d = content.faq;
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});
  const [activeCat, setActiveCat] = useState(0);

  const toggle = (key: string) => setOpenItems(prev => ({ ...prev, [key]: !prev[key] }));

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
        <div className="flex flex-wrap gap-2 mb-10 justify-center">
          {d.categories.map((cat: any, i: number) => (
            <button key={i} onClick={() => setActiveCat(i)} className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${activeCat === i ? 'bg-brand-600 text-white' : 'glass text-gray-300 hover:text-white'}`}>{cat.name}</button>
          ))}
        </div>
        <div className="space-y-3">
          {d.categories[activeCat].items.map((item: any, i: number) => {
            const key = `${activeCat}-${i}`;
            const isOpen = openItems[key];
            return (
              <div key={i} className="glass-card rounded-2xl overflow-hidden">
                <button onClick={() => toggle(key)} className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-white/[0.02]">
                  <span className="font-medium pr-4">{item.q}</span>
                  <span className={`text-brand-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}><Icons.ChevronDown /></span>
                </button>
                <div className={`accordion-content ${isOpen ? 'open' : ''}`}>
                  <div className="px-6 pb-5 text-gray-300 text-sm leading-relaxed">{item.a}</div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
