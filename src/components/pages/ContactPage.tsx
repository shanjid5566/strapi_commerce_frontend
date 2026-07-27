'use client';

import { useState } from 'react';
import { useCMS } from '@/contexts/CMSContext';
import { Icons } from '@/components/ui/Icons';

export default function ContactPage() {
  const { content } = useCMS();
  const d = content.contact;
  const [sent, setSent] = useState(false);

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
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">{d.heroSubtitle}</p>
        </div>
      </section>
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {[
              { icon: <Icons.Mail />, label: 'Email us', value: d.email, sub: 'We reply within 1 hour' },
              { icon: <Icons.Phone />, label: 'Call us', value: d.phone, sub: d.hours },
              { icon: <Icons.MapPin />, label: 'Visit us', value: d.address, sub: 'Brooklyn, NY' },
            ].map((c, i) => (
              <div key={i} className="glass-card rounded-2xl p-5 flex gap-4 hover-lift">
                <div className="w-12 h-12 rounded-xl bg-brand-500/20 text-brand-400 flex items-center justify-center flex-shrink-0">{c.icon}</div>
                <div><p className="text-xs text-gray-400 uppercase tracking-wider">{c.label}</p><p className="font-medium mt-1">{c.value}</p><p className="text-xs text-gray-500 mt-1">{c.sub}</p></div>
              </div>
            ))}
          </div>
          <div className="lg:col-span-3 glass-card rounded-2xl p-8">
            {sent ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center"><Icons.Check /></div>
                <h3 className="text-xl font-bold mb-2">Message sent!</h3>
                <p className="text-gray-400">We'll get back to you within 24 hours.</p>
                <button onClick={() => setSent(false)} className="mt-6 text-brand-400 text-sm">Send another message</button>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-4">
                <h2 className="text-2xl font-bold mb-2">Send us a message</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <input required placeholder="Your name" className="px-4 py-3 glass rounded-xl text-white placeholder-gray-600 text-sm" />
                  <input required type="email" placeholder="Email address" className="px-4 py-3 glass rounded-xl text-white placeholder-gray-600 text-sm" />
                </div>
                <select className="w-full px-4 py-3 glass rounded-xl text-white text-sm appearance-none cursor-pointer">
                  <option>General inquiry</option><option>Order support</option><option>Trade-in question</option><option>Partnership</option><option>Press</option>
                </select>
                <input placeholder="Subject" className="w-full px-4 py-3 glass rounded-xl text-white placeholder-gray-600 text-sm" />
                <textarea required rows={5} placeholder="How can we help?" className="w-full px-4 py-3 glass rounded-xl text-white placeholder-gray-600 text-sm resize-none" />
                <button type="submit" className="w-full py-3.5 bg-gradient-to-r from-brand-600 to-purple-600 rounded-xl font-semibold">Send Message</button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
