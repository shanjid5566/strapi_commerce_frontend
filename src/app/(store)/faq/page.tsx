'use client';

import { useState } from 'react';
import { useCMS } from '@/contexts/CMSContext';
import { Icons } from '@/components/ui/Icons';
import type { CMSFAQCategory, CMSFAQItem } from '@/types/cms';

export default function FAQPage() {
  const { content } = useCMS();
  const { faq } = content;
  const [activeCategory, setActiveCategory] = useState(faq.categories[0]?.name ?? '');
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const toggleItem = (key: string) => {
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const activeItems = faq.categories.find((c) => c.name === activeCategory)?.items ?? [];

  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-300/20 rounded-full blur-3xl animate-pulse" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">{faq.heroTitle}</h1>
          <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto">{faq.heroSubtitle}</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            {faq.categories.map((cat: CMSFAQCategory, i: number) => (
              <button
                key={cat.name}
                onClick={() => setActiveCategory(cat.name)}
                className={`px-5 py-2.5 rounded-xl font-medium transition-all ${
                  activeCategory === cat.name
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/25'
                    : 'bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {activeItems.map((item: CMSFAQItem, i: number) => {
              const key = `${activeCategory}-${i}`;
              const isOpen = openItems[key];
              return (
                <div key={key} className="rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/30 overflow-hidden">
                  <button
                    onClick={() => toggleItem(key)}
                    className="w-full flex items-center justify-between p-5 text-left"
                  >
                    <span className="font-medium text-gray-900 dark:text-white">{item.q}</span>
                    <Icons.ChevronDown
                      size={20}
                      className={`text-gray-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                    />
                  </button>
                  <div
                    className="overflow-hidden transition-all duration-300"
                    style={{ maxHeight: isOpen ? '200px' : '0' }}
                  >
                    <p className="px-5 pb-5 text-gray-600 dark:text-gray-300">{item.a}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
