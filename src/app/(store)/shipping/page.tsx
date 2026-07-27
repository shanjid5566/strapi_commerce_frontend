'use client';

import { useCMS } from '@/contexts/CMSContext';
import { Icons } from '@/components/ui/Icons';
import type { CMSShippingMethod } from '@/types/cms';

export default function ShippingPage() {
  const { content } = useCMS();
  const { shipping } = content;

  const shippingIcons = [Icons.Truck, Icons.Zap, Icons.Package];

  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-300/20 rounded-full blur-3xl animate-pulse" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">{shipping.heroTitle}</h1>
          <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto">{shipping.heroSubtitle}</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {shipping.methods.map((method: CMSShippingMethod, i: number) => {
              const Icon = shippingIcons[i] ?? Icons.Truck;
              return (
                <div key={method.name} className="p-6 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/30 text-center hover:shadow-lg transition-all">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 mb-4">
                    <Icon size={28} />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{method.price}</div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{method.name}</h3>
                  <p className="text-sm text-indigo-600 dark:text-indigo-400 mb-2">{method.time}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{method.desc}</p>
                </div>
              );
            })}
          </div>

          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">Good to Know</h2>
            <div className="p-8 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/30 space-y-4">
              {shipping.notes.map((note: string, i: number) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 flex items-center justify-center">
                    <Icons.Check size={12} />
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">{note}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
