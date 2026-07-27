'use client';

import React from 'react';
import { useCMS } from '@/contexts/CMSContext';
import { Icons } from '@/components/ui/Icons';
import type { CMSBlogPost } from '@/types/cms';

interface BlogDetailPageProps {
  params: { id: string };
  onNavigate: (page: string, id?: number) => void;
}

export default function BlogDetailPage({ params, onNavigate }: BlogDetailPageProps) {
  const { content } = useCMS();
  const { blog } = content;
  const postId = Number(params.id);
  const post = blog.posts.find((p: CMSBlogPost) => p.id === postId);
  const related = blog.posts.filter((p: CMSBlogPost) => p.id !== postId).slice(0, 3);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Post not found</h1>
          <button
            onClick={() => onNavigate('blog')}
            className="px-6 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-semibold hover:from-indigo-600 hover:to-purple-700 transition-all"
          >
            Back to Blog
          </button>
        </div>
      </div>
    );
  }

  const paragraphs = post.content.split('\n').filter(Boolean);
  const keyTakeaway = paragraphs[0] ?? '';

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => onNavigate('blog')}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mb-8"
        >
          <Icons.ArrowLeft size={20} />
          Back to Blog
        </button>

        <article>
          <div className="mb-8">
            <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">{post.category}</span>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mt-2 mb-4">{post.title}</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">{post.excerpt}</p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold">
                {post.author.split(' ').map((n: string) => n[0]).join('')}
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">{post.author}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{post.date} · {post.readTime}</p>
              </div>
            </div>
          </div>

          <div className="aspect-video rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mb-10">
            <Icons.Newspaper size={80} className="text-white/30" />
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <div className="p-6 rounded-2xl bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800/30 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Key Takeaways</h3>
              <p className="text-gray-700 dark:text-gray-300">{keyTakeaway}</p>
            </div>

            {paragraphs.slice(1).map((p: string, i: number) => (
              <p key={i} className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">{p}</p>
            ))}

            <blockquote className="border-l-4 border-indigo-500 pl-6 py-2 my-8 italic text-gray-600 dark:text-gray-400">
              &quot;The best way to predict the future is to create it.&quot;
            </blockquote>
          </div>

          <div className="mt-12 p-8 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/30">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">About the Author</h3>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold">
                {post.author.split(' ').map((n: string) => n[0]).join('')}
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">{post.author}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">MobileHub Content Team</p>
              </div>
            </div>
          </div>
        </article>

        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Related Articles</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((r: CMSBlogPost) => (
                <div
                  key={r.id}
                  onClick={() => onNavigate('blog', r.id)}
                  className="p-6 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/30 hover:shadow-lg transition-all cursor-pointer"
                >
                  <div className="aspect-video rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mb-4">
                    <Icons.Newspaper size={32} className="text-white/40" />
                  </div>
                  <span className="text-xs font-medium text-indigo-600 dark:text-indigo-400">{r.category}</span>
                  <h3 className="font-semibold text-gray-900 dark:text-white mt-1 mb-2">{r.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">{r.excerpt}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
