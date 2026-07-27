'use client';

import { useCMS } from '@/contexts/CMSContext';

export default function PrivacyPage() {
  const { content } = useCMS();
  const d = content.privacy;
  
  if (!d) return null;
  
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
          <h1 className="text-4xl sm:text-6xl font-serif font-bold mb-6 leading-tight text-gray-900 dark:text-white">{d.heroTitle}</h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">{d.heroSubtitle}</p>
        </div>
      </section>
      <section className="max-w-4xl mx-auto px-4 py-16">
        <div className="prose prose-brand dark:prose-invert max-w-none text-gray-800 dark:text-gray-300" dangerouslySetInnerHTML={{ __html: d.content }} />
      </section>
    </div>
  );
}