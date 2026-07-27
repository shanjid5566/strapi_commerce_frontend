'use client';

import { useState } from 'react';
import { useCMS } from '@/contexts/CMSContext';

interface BlogPageProps {
  onNavigate?: (page: string, id?: number) => void;
}

export default function BlogPage({ onNavigate }: BlogPageProps) {
  const { content } = useCMS();
  const d = content.blog;
  const [filter, setFilter] = useState('All');
  const categories = ['All', ...new Set(d.posts.map((p: any) => p.category))];
  const filtered = filter === 'All' ? d.posts : d.posts.filter((p: any) => p.category === filter);
  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <div className="animate-fade-in">
      <section className="relative py-24 overflow-hidden bg-gradient-to-br from-brand-100 via-slate-50 to-purple-100 dark:from-purple-900/40 dark:via-gray-950 dark:to-brand-900/30">
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
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((c: any) => (
            <button key={c} onClick={() => setFilter(c)} className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${filter === c ? 'bg-brand-600 text-white shadow-md' : 'glass text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white border border-gray-200 dark:border-white/10'}`}>{c}</button>
          ))}
        </div>
        {featured && (
          <div
            onClick={() => onNavigate && onNavigate('blog-detail', featured.id)}
            className="glass-card rounded-3xl overflow-hidden mb-10 blog-card cursor-pointer group border border-gray-200 dark:border-white/10"
          >
            <div className="grid md:grid-cols-2 gap-0">
              <div className="h-64 md:h-auto overflow-hidden bg-gradient-to-br from-brand-600 to-purple-600 relative">
                <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-30">📱</div>
              </div>
              <div className="p-8 flex flex-col justify-center">
                <span className="text-xs text-brand-600 dark:text-brand-400 font-medium uppercase tracking-wider mb-3">Featured · {featured.category}</span>
                <h2 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-300 transition-colors">{featured.title}</h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">{featured.excerpt}</p>
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <span>{featured.author}</span><span>·</span><span>{featured.date}</span><span>·</span><span>{featured.readTime} read</span>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((post: any) => (
            <article
              key={post.id}
              onClick={() => onNavigate && onNavigate('blog-detail', post.id)}
              className="glass-card rounded-2xl overflow-hidden hover-lift cursor-pointer group blog-card border border-gray-200 dark:border-white/10"
            >
              <div className="h-40 bg-gradient-to-br from-brand-600/50 to-purple-600/50 relative overflow-hidden">
                <div className="blog-img absolute inset-0 flex items-center justify-center text-5xl opacity-40">📱</div>
              </div>
              <div className="p-5">
                <span className="text-xs text-brand-600 dark:text-brand-400 font-medium uppercase tracking-wider">{post.category}</span>
                <h3 className="font-bold mt-2 mb-2 line-clamp-2 text-gray-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-300 transition-colors">{post.title}</h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 mb-4">{post.excerpt}</p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{post.author}</span><span>{post.readTime}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}