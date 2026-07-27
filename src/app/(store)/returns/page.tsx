'use client';

import { useCMS } from '@/contexts/CMSContext';
import { Icons } from '@/components/ui/Icons';
import type { CMSReturnStep, CMSReturnPolicy } from '@/types/cms';

export default function ReturnsPage() {
  const { content } = useCMS();
  const { returns } = content;

  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-300/20 rounded-full blur-3xl animate-pulse" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">{returns.heroTitle}</h1>
          <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto">{returns.heroSubtitle}</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">How It Works</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {returns.steps.map((step: CMSReturnStep, index: number) => (
              <div key={step.num} className="p-6 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/30 text-center hover:shadow-lg transition-all">
                <div className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600 mb-4">
                  {step.num}
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{step.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{step.desc}</p>
              </div>
            ))}
          </div>

          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">Our Policies</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {returns.policies.map((policy: CMSReturnPolicy, index: number) => (
              <div key={policy.title} className="p-6 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/30 hover:shadow-lg transition-all">
                <h3 className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600 mb-2">{policy.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{policy.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
