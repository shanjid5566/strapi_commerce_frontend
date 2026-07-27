'use client';

import { useCMS } from '@/contexts/CMSContext';

interface BlogDetailPageProps {
  postId?: number | null;
  onNavigate?: (page: string, id?: number) => void;
}

export default function BlogDetailPage({ postId, onNavigate }: BlogDetailPageProps) {
  const { content } = useCMS();
  const d = content.blog;
  const post = d.posts.find((p: any) => p.id === postId) || d.posts[0];
  const relatedPosts = d.posts.filter((p: any) => p.id !== post.id).slice(0, 3);

  return (
    <div className="animate-fade-in py-12 max-w-6xl mx-auto px-4 sm:px-6">
      {/* Back Navigation */}
      <button
        onClick={() => onNavigate && onNavigate('blog')}
        className="inline-flex items-center gap-2 px-4 py-2 glass rounded-xl text-sm font-medium hover:bg-brand-600 hover:text-white transition-all mb-8 border border-gray-200 dark:border-white/10 shadow-sm"
      >
        ← Back to all articles
      </button>

      {/* Article Header */}
      <header className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <span className="px-3 py-1 bg-brand-500/15 dark:bg-brand-500/20 text-brand-600 dark:text-brand-300 rounded-full text-xs font-semibold uppercase tracking-wider">
            {post.category}
          </span>
          <span className="text-xs text-gray-500 font-medium">· {post.date} · {post.readTime} read</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-gray-900 dark:text-white leading-tight mb-6">
          {post.title}
        </h1>
        <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
          {post.excerpt}
        </p>
        <div className="flex flex-wrap items-center justify-between gap-4 py-6 border-y border-gray-200 dark:border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow">
              {post.author.split(' ').map((n: string) => n[0]).join('')}
            </div>
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white text-sm">{post.author}</h4>
              <p className="text-xs text-gray-500">MobileHub Editorial Team</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => alert('Article link copied to clipboard!')}
              className="px-3.5 py-2 glass rounded-xl text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-brand-600 hover:text-white transition-all border border-gray-200 dark:border-white/10"
            >
              Share Link
            </button>
          </div>
        </div>
      </header>

      {/* Hero Banner Graphic */}
      <div className="h-72 sm:h-96 rounded-3xl overflow-hidden bg-gradient-to-br from-brand-600 via-purple-600 to-pink-600 relative flex items-center justify-center mb-12 shadow-xl">
        <div className="absolute inset-0 bg-black/15" />
        <div className="relative text-7xl sm:text-8xl select-none">📱</div>
      </div>

      {/* Article Body Content */}
      <article className="space-y-8 text-gray-800 dark:text-gray-200 leading-relaxed text-base sm:text-lg">
        {post.content ? (
          <div dangerouslySetInnerHTML={{ __html: post.content }} className="prose dark:prose-invert max-w-none prose-brand" />
        ) : (
          <>
            {/* Key Takeaways Callout */}
            <div className="glass-card rounded-2xl p-6 sm:p-8 border border-brand-500/30 bg-brand-500/5">
              <h3 className="font-bold text-sm uppercase tracking-wider text-brand-600 dark:text-brand-400 mb-3">
                Key Takeaways
              </h3>
              <ul className="space-y-2 text-sm sm:text-base text-gray-700 dark:text-gray-300">
                <li className="flex items-start gap-2.5">
                  <span className="text-brand-500 font-bold mt-0.5">•</span>
                  <span>Real-world performance tells a very different story from day-one benchmarks and manufacturer spec sheets.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-brand-500 font-bold mt-0.5">•</span>
                  <span>Software efficiency and thermal management remain critical differentiators for sustained usage over several months.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-brand-500 font-bold mt-0.5">•</span>
                  <span>For most users coming from devices 2–3 years old, the leap in display efficiency and camera consistency is immediately noticeable.</span>
                </li>
              </ul>
            </div>

            <p>
              When a flagship device launches, the initial news cycle is dominated by unboxings, synthetic benchmarks, and spec sheet comparisons. But the real measure of any smartphone isn’t how it performs during week one — it’s how it integrates into daily life after the honeymoon phase ends.
            </p>

            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 dark:text-white pt-4">
              Daily Ergonomics & Hardware Polish
            </h2>
            <p>
              Over months of continuous use across travel, commuting, and heavy work days, hardware balance becomes just as important as sheer processing power. The subtle refinements in weight distribution, button tactility, and edge curvature make a tangible difference during one-handed operation.
            </p>

            {/* Pull Quote */}
            <blockquote className="glass-card rounded-2xl p-6 sm:p-8 border-l-4 border-brand-500 my-8 italic text-gray-900 dark:text-white font-serif text-lg sm:text-xl">
              "Great industrial design doesn't just look impressive on a billboard — it disappears into your daily routine while consistently delivering when you need it most."
            </blockquote>

            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 dark:text-white pt-4">
              Camera Reliability & Battery Longevity
            </h2>
            <p>
              In practical testing, consistency matters far more than theoretical peak performance. Whether capturing spontaneous moments in challenging low-light environments or relying on battery endurance through long travel days, the device proved exceptionally dependable.
            </p>
            <p>
              Ultimately, whether an upgrade makes sense depends on what you are stepping up from. If your current device is more than two generations old, this represents one of the most balanced and cohesive flagship experiences available today.
            </p>
          </>
        )}
      </article>

      {/* Author Full Card */}
      <div className="glass-card rounded-2xl p-6 sm:p-8 mt-12 border border-gray-200 dark:border-white/10 flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center text-white font-bold text-2xl flex-shrink-0 shadow-md">
          {post.author.split(' ').map((n: string) => n[0]).join('')}
        </div>
        <div className="text-center sm:text-left">
          <h3 className="font-bold text-lg text-gray-900 dark:text-white">Written by {post.author}</h3>
          <p className="text-xs text-brand-600 dark:text-brand-400 font-medium uppercase tracking-wider mt-0.5 mb-2">Senior Product Editor</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            Covering flagship mobile hardware, industry trends, and consumer tech reviews at MobileHub. Passionate about transparent benchmarks and real-world testing.
          </p>
        </div>
      </div>

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <section className="mt-16 pt-12 border-t border-gray-200 dark:border-white/10">
          <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mb-8">Related Articles</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {relatedPosts.map((rel: any) => (
              <article
                key={rel.id}
                onClick={() => onNavigate && onNavigate('blog-detail', rel.id)}
                className="glass-card rounded-2xl overflow-hidden hover-lift cursor-pointer group border border-gray-200 dark:border-white/10"
              >
                <div className="h-32 bg-gradient-to-br from-brand-600/40 to-purple-600/40 relative flex items-center justify-center text-4xl">
                  📱
                </div>
                <div className="p-4">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">{rel.category}</span>
                  <h4 className="font-bold text-sm mt-1 mb-2 line-clamp-2 text-gray-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-300 transition-colors">
                    {rel.title}
                  </h4>
                  <p className="text-xs text-gray-500">{rel.readTime} read</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}