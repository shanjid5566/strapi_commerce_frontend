'use client';

import { useCMS } from '@/contexts/CMSContext';

export default function TermsPage() {
  const { content } = useCMS();
  const { terms } = content;

  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-300/20 rounded-full blur-3xl animate-pulse" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">{terms.heroTitle}</h1>
          <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto">{terms.heroSubtitle}</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-12 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/30">
            <div
              className="prose prose-lg dark:prose-invert max-w-none whitespace-pre-wrap text-gray-600 dark:text-gray-300 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: terms.content }}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
