'use client';

import { useState, useCallback, useEffect } from 'react';
import ProductCard from '@/components/store/ProductCard';
import { Icons } from '@/components/ui/Icons';
import ProductImage from '@/components/ui/ProductImage';
import { mockProducts } from '@/data/products';

interface HomePageProps {
  onNavigate: (page: string, id?: number) => void;
}

const testimonials = [
  { name: 'Alex J.', role: 'Verified Buyer · iPhone 15 Pro Max', text: 'Best mobile shopping experience. Fast delivery and genuine products! Received my phone in sealed packaging within 24 hours.', rating: 5 },
  { name: 'Sarah C.', role: 'Verified Buyer · Galaxy S24 Ultra', text: 'Amazing customer service. They helped me choose the perfect phone and explained the trade-in valuation clearly.', rating: 5 },
  { name: 'Mike P.', role: 'Verified Buyer · Google Pixel 8 Pro', text: 'Great prices and the trade-in program saved me hundreds! Plus the 2-year MobileHub Care gives me total peace of mind.', rating: 5 },
  { name: 'Elena R.', role: 'Verified Buyer · OnePlus 12', text: 'I was skeptical about buying online, but MobileHub exceeded every expectation. Customer support replied in under 2 minutes!', rating: 5 },
  { name: 'David K.', role: 'Verified Buyer · Xiaomi 14 Ultra', text: 'Flawless international shipping and zero hidden customs fees. Highly recommended for flagship phone enthusiasts!', rating: 5 },
  { name: 'Priya M.', role: 'Verified Buyer · Nothing Phone (2a)', text: 'Unbeatable price match promise. Found it $30 cheaper elsewhere and they refunded the difference immediately.', rating: 5 },
  { name: 'Marcus T.', role: 'Verified Buyer · iPhone 15 Pro', text: 'Carbon-neutral shipping and super easy checkout. I will never buy a smartphone from a carrier store again.', rating: 5 },
  { name: 'Rachel W.', role: 'Verified Buyer · Galaxy Z Fold6', text: 'The trade-in discount was processed the same day they received my old device. Incredible service from start to finish!', rating: 5 },
];

const features = [
  { icon: Icons.Truck, title: 'Free Shipping', desc: 'On orders over $500' },
  { icon: Icons.Shield, title: '2-Year Warranty', desc: 'Extended protection plan' },
  { icon: Icons.Zap, title: 'Fast Delivery', desc: '2-3 business days' },
  { icon: Icons.Tag, title: 'Best Prices', desc: 'Price match guarantee' },
];

const CARDS_TO_SHOW = 3;

export default function HomePage({ onNavigate }: HomePageProps) {
  const [testIndex, setTestIndex] = useState(0);
  const [email, setEmail] = useState('');

  const handlePrevTestimonial = useCallback(() => {
    setTestIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  }, []);

  const handleNextTestimonial = useCallback(() => {
    setTestIndex((prev) => (prev >= testimonials.length - 1 ? 0 : prev + 1));
  }, []);

  useEffect(() => {
    const timer = setInterval(handleNextTestimonial, 5000);
    return () => clearInterval(timer);
  }, [handleNextTestimonial]);

  const visibleTestimonials = [];
  for (let i = 0; i < CARDS_TO_SHOW; i++) {
    visibleTestimonials.push(testimonials[(testIndex + i) % testimonials.length]);
  }

  const handleSubscribe = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (email) setEmail('');
    },
    [email]
  );

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-900/80 via-gray-950 to-purple-900/60" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-brand-500 rounded-full blur-[128px] animate-pulse-slow" />
          <div
            className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500 rounded-full blur-[128px] animate-pulse-slow"
            style={{ animationDelay: '1.5s' }}
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-slide-up">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs font-medium text-brand-300 mb-6">
              <Icons.Zap /> New Arrivals 2024
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              <span className="gradient-text">Premium</span>
              <br />
              Mobile Devices
            </h1>
            <p className="text-gray-400 text-lg max-w-md mb-8 leading-relaxed">
              Discover the latest flagship smartphones with exclusive deals. Free shipping on orders over $500.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => onNavigate('catalog')}
                className="px-8 py-3.5 bg-gradient-to-r from-brand-600 to-purple-600 rounded-xl font-semibold hover:shadow-lg hover:shadow-brand-500/25 transition-all hover:-translate-y-0.5"
              >
                Shop Now
              </button>
              <button
                onClick={() => onNavigate('about')}
                className="px-8 py-3.5 glass rounded-xl font-semibold hover:bg-white/10 transition-all"
              >
                Our Story
              </button>
            </div>
          </div>
          <div className="hidden lg:flex justify-center animate-float">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-brand-500 to-purple-500 rounded-3xl blur-3xl opacity-20" />
              <div className="relative glass rounded-3xl p-8">
                <ProductImage product={mockProducts[0]} size="xl" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <div
              key={i}
              className="glass-card rounded-2xl p-6 text-center hover-lift group"
            >
              <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-brand-500/10 flex items-center justify-center text-brand-400 group-hover:bg-brand-500/20 transition-colors">
                <f.icon size={24} />
              </div>
              <h3 className="font-semibold mb-1">{f.title}</h3>
              <p className="text-sm text-gray-400">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Trending Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold mb-2">Trending Now</h2>
            <p className="text-gray-400">Most popular this week</p>
          </div>
          <button
            onClick={() => onNavigate('catalog')}
            className="hidden sm:flex items-center gap-2 text-sm text-brand-400 hover:text-brand-300"
          >
            View all <Icons.ExternalLink />
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {mockProducts.slice(0, 8).map((p) => (
            <ProductCard key={p.id} product={p} onNavigate={onNavigate} />
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass text-xs font-medium text-brand-400 mb-3">
            <Icons.Star filled /> 4.9/5 Average Customer Rating
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold">What Our Clients Say</h2>
          <p className="text-gray-400 text-sm mt-2">
            Real reviews from thousands of verified mobile tech buyers
          </p>
        </div>

        <div className="relative px-2 sm:px-10">
          <button
            type="button"
            onClick={handlePrevTestimonial}
            aria-label="Previous testimonial"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full glass flex items-center justify-center text-gray-800 dark:text-gray-100 hover:bg-brand-600 hover:text-white dark:hover:text-white hover:border-brand-500 hover:scale-110 transition-all shadow-xl active:scale-95"
          >
            <Icons.ChevronLeft />
          </button>

          <div className="grid md:grid-cols-3 gap-6">
            {visibleTestimonials.map((t, i) => (
              <div
                key={`${testIndex}-${i}`}
                className="glass-card rounded-2xl p-6 hover-lift flex flex-col justify-between border border-white/5 relative group transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex gap-1 text-amber-400">
                      {Array.from({ length: t.rating }).map((_, j) => (
                        <Icons.Star key={j} filled />
                      ))}
                    </div>
                    <span className="text-[11px] font-medium text-green-400 bg-green-500/10 px-2.5 py-0.5 rounded-full">
                      Verified
                    </span>
                  </div>
                  <p className="text-gray-300 mb-6 text-sm leading-relaxed italic">
                    &ldquo;{t.text}&rdquo;
                  </p>
                </div>
                <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center font-bold text-sm text-white shadow-md">
                    {t.name[0]}
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm leading-tight text-white">
                      {t.name}
                    </h4>
                    <p className="text-xs text-gray-400 mt-0.5">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={handleNextTestimonial}
            aria-label="Next testimonial"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full glass flex items-center justify-center text-gray-800 dark:text-gray-100 hover:bg-brand-600 hover:text-white dark:hover:text-white hover:border-brand-500 hover:scale-110 transition-all shadow-xl active:scale-95"
          >
            <Icons.ChevronRight />
          </button>
        </div>

        <div className="flex items-center justify-center gap-2 mt-8">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setTestIndex(idx)}
              aria-label={`Go to testimonial ${idx + 1}`}
              className={`h-2 rounded-full transition-all ${
                testIndex === idx ? 'w-8 bg-brand-500' : 'w-2 bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-brand-600 to-purple-600" />
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl" />
          </div>
          <div className="relative px-8 py-16 text-center">
            <h2 className="text-3xl font-bold mb-4">Get 10% Off Your First Order</h2>
            <p className="text-white/80 mb-8 max-w-md mx-auto">
              Subscribe to our newsletter and receive exclusive deals directly in your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-5 py-3 rounded-xl bg-white/10 border border-white/20 placeholder-white/50 text-white focus:outline-none"
                required
              />
              <button
                onClick={handleSubscribe}
                className="px-6 py-3 bg-white text-brand-700 font-semibold rounded-xl hover:bg-white/90 transition-colors"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
