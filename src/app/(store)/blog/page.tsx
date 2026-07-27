'use client';

import { useState } from 'react';
import { useCMS } from '@/contexts/CMSContext';
import { Icons } from '@/components/ui/Icons';
import type { CMSBlogPost } from '@/types/cms';

interface BlogPageProps {
  onNavigate: (page: string, id?: number) => void;
}

export default function BlogPage({ onNavigate }: BlogPageProps) {
  const { content } = useCMS();
  const { blog } = content;
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', ...Array.from(new Set(blog.posts.map((p: CMSBlogPost) => p.category)))];
  const filtered = activeCategory === 'All' ? blog.posts : blog.posts.filter((p: CMSBlogPost) => p.category === activeCategory);
  const featured = filtered[0] as CMSBlogPost | undefined;
  const rest = filtered.slice(1);

  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-300/20 rounded-full blur-3xl animate-pulse" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">{blog.heroTitle}</h1>
          <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto">{blog.heroSubtitle}</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-xl font-medium transition-all ${
                  activeCategory === cat
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/25'
                    : 'bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {featured && (
            <div
              onClick={() => onNavigate('blog', featured.id)}
              className="grid md:grid-cols-2 gap-8 mb-12 p-8 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/30 hover:shadow-lg transition-all cursor-pointer"
            >
              <div className="aspect-video rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <Icons.Newspaper size={64} className="text-white/40" />
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400 mb-2">{featured.category}</span>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">{featured.title}</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{featured.excerpt}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                  <span>{featured.author}</span>
                  <span>{featured.date}</span>
                  <span>{featured.readTime}</span>
                </div>
              </div>
            </div>
          )}

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((post: CMSBlogPost) => (
              <div
                key={post.id}
                onClick={() => onNavigate('blog', post.id)}
                className="p-6 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/30 hover:shadow-lg transition-all cursor-pointer"
              >
                <div className="aspect-video rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mb-4">
                  <Icons.Newspaper size={40} className="text-white/40" />
                </div>
                <span className="text-xs font-medium text-indigo-600 dark:text-indigo-400">{post.category}</span>
                <h3 className="font-semibold text-gray-900 dark:text-white mt-1 mb-2">{post.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 line-clamp-2">{post.excerpt}</p>
                <div className="flex items-center gap-3 text-xs text-gray-400 dark:text-gray-500">
                  <span>{post.author}</span>
                  <span>{post.readTime}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
