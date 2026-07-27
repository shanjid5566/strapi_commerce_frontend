'use client';

import { useCMS } from '@/contexts/CMSContext';
import { Icons } from '@/components/ui/Icons';
import type { CMSCareersOpening } from '@/types/cms';

export default function CareersPage() {
  const { content } = useCMS();
  const { careers } = content;

  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-300/20 rounded-full blur-3xl animate-pulse" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">{careers.heroTitle}</h1>
          <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto">{careers.heroSubtitle}</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="p-8 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/30">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Our Culture</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{careers.culture}</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Perks & Benefits</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {careers.perks.map((perk: string, index: number) => (
                <div key={perk} className="flex items-center gap-3 p-4 rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/30">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 flex items-center justify-center">
                    <Icons.Check size={14} />
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">{perk}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Open Positions</h2>
            <div className="space-y-4">
              {careers.openings.map((job: CMSCareersOpening, index: number) => (
                <div key={job.title} className="p-6 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/30 hover:shadow-lg transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white text-lg">{job.title}</h3>
                    <div className="flex flex-wrap gap-3 mt-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="flex items-center gap-1"><Icons.Users size={14} /> {job.team}</span>
                      <span className="flex items-center gap-1"><Icons.MapPin size={14} /> {job.location}</span>
                      <span className="flex items-center gap-1"><Icons.Briefcase size={14} /> {job.type}</span>
                      <span className="flex items-center gap-1"><Icons.Tag size={14} /> {job.salary}</span>
                    </div>
                  </div>
                  <button className="px-6 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-semibold hover:from-indigo-600 hover:to-purple-700 transition-all shadow-lg shadow-indigo-500/25 whitespace-nowrap">
                    Apply Now
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
