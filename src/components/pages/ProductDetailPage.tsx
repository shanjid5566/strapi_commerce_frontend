'use client';

import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { useAuth } from '@/contexts/AuthContext';
import { mockProducts } from '@/data/products';
import { Icons } from '@/components/ui/Icons';
import ProductImage from '@/components/ui/ProductImage';

interface ProductDetailPageProps {
  productId?: number | null;
  onNavigate: (page: string, id?: number) => void;
}

export default function ProductDetailPage({ productId, onNavigate }: ProductDetailPageProps) {
  const product = mockProducts.find(p => p.id === productId) || mockProducts[0];
  const { addToCart } = useCart();
  const { wishlist, toggleWishlist } = useWishlist();
  const { user } = useAuth();
  const isWished = wishlist.includes(product.id);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('specs');
  const [reviews, setReviews] = useState([
    { id: 1, user: 'John D.', rating: 5, date: '2024-01-10', text: 'Absolutely love this phone! The camera quality is insane.', helpful: 24 },
    { id: 2, user: 'Emma S.', rating: 4, date: '2024-01-08', text: 'Great phone overall. Display is beautiful.', helpful: 12 },
    { id: 3, user: 'Mike R.', rating: 5, date: '2024-01-05', text: 'Best upgrade from my old phone.', helpful: 18 },
  ]);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewText, setNewReviewText] = useState('');
  const [newReviewName, setNewReviewName] = useState('');

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewText.trim()) return;
    const authorName = (newReviewName.trim() || (user ? user.name : 'Anonymous User'));
    const newEntry = {
      id: Date.now(),
      user: authorName,
      rating: newReviewRating,
      date: new Date().toISOString().split('T')[0],
      text: newReviewText.trim(),
      helpful: 0
    };
    setReviews([newEntry, ...reviews]);
    setNewReviewText('');
    setNewReviewName('');
    setShowReviewForm(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <button onClick={() => onNavigate('catalog')} className="flex items-center gap-2 text-gray-400 hover:text-white mb-6"><Icons.ArrowLeft /> Back</button>
      <div className="grid lg:grid-cols-2 gap-12">
        <div>
          <div className="glass-card rounded-3xl p-6 mb-4"><ProductImage product={product} size="xl" /></div>
          <div className="grid grid-cols-4 gap-3">
            {[0, 1, 2, 3].map(i => (
              <div key={i} className="glass-card rounded-xl p-2 cursor-pointer hover:border-brand-500/50"><ProductImage product={product} size="sm" /></div>
            ))}
          </div>
        </div>
        <div>
          <span className="text-brand-400 text-sm font-medium">{product.brand}</span>
          <h1 className="text-3xl font-bold mb-3">{product.name}</h1>
          <div className="flex items-center gap-3 mb-4">
            <div className="flex">{Array.from({ length: 5 }).map((_, i) => <Icons.Star key={i} filled={i < Math.floor(product.rating)} />)}</div>
            <span className="text-sm text-gray-400">{product.rating} ({product.reviews} reviews)</span>
          </div>
          <p className="text-gray-300 mb-6 leading-relaxed">{product.description}</p>
          <div className="flex items-baseline gap-3 mb-6">
            <span className="text-4xl font-bold gradient-text">${product.price}</span>
            <span className="text-xl text-gray-500 line-through">${product.originalPrice}</span>
          </div>
          <div className="flex gap-3 mb-6">
            <button onClick={() => toggleWishlist(product.id)} className={`px-5 py-3.5 rounded-xl font-semibold flex items-center gap-2 transition-all ${isWished ? 'bg-red-500 text-white' : 'glass hover:bg-white/10'}`}>
              <Icons.Heart filled={isWished} /> {isWished ? 'Saved' : 'Wishlist'}
            </button>
            <div className="flex items-center glass rounded-xl overflow-hidden">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 py-2.5 hover:bg-white/5"><Icons.Minus /></button>
              <span className="px-4 py-2.5 font-medium">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="px-3 py-2.5 hover:bg-white/5"><Icons.Plus /></button>
            </div>
            <button onClick={() => { for (let i = 0; i < quantity; i++) addToCart(product); }} className="flex-1 py-3.5 bg-gradient-to-r from-brand-600 to-purple-600 rounded-xl font-semibold">
              Add to Cart — ${(product.price * quantity).toLocaleString()}
            </button>
          </div>
        </div>
      </div>
      <div className="mt-16">
        <div className="flex gap-6 border-b border-white/10 mb-8">
          {[{ id: 'specs', label: 'Specifications' }, { id: 'reviews', label: `Reviews (${product.reviews})` }].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`pb-4 text-sm font-medium ${activeTab === tab.id ? 'text-white tab-active' : 'text-gray-400 hover:text-white'}`}>{tab.label}</button>
          ))}
        </div>
        {activeTab === 'specs' && (
          <div className="space-y-8 animate-fade-in">
            {/* Performance & General */}
            <div className="glass-card rounded-2xl overflow-hidden border border-gray-200 dark:border-white/10">
              <div className="px-6 py-4 bg-gray-100/80 dark:bg-white/5 border-b border-gray-200 dark:border-white/10">
                <h3 className="font-bold text-sm uppercase tracking-wider text-gray-800 dark:text-gray-200">Performance & General</h3>
              </div>
              <div className="divide-y divide-gray-200 dark:divide-white/10 text-sm">
                {[
                  { label: 'Operating System', value: product.brand === 'Apple' ? 'iOS' : 'Android' },
                  { label: 'OS Version', value: product.brand === 'Apple' ? 'iOS 17' : 'v14' },
                  { label: 'User Interface', value: product.brand === 'Apple' ? 'iOS' : product.brand === 'Samsung' ? 'One UI 6.1' : product.brand === 'Xiaomi' ? 'HyperOS' : 'Clean Stock UI' },
                  { label: 'Chipset', value: (product.specs as any)?.chip || 'Octa-core flagship processor' },
                  { label: 'CPU', value: product.brand === 'Apple' ? 'Hexa-core (2x3.78 GHz + 4x2.11 GHz)' : 'Octa-core (1x3.3 GHz Cortex-X4 & 5x3.2 GHz & 2x2.3 GHz)' },
                  { label: 'CPU Cores', value: product.brand === 'Apple' ? '6 Cores' : '8 Cores' },
                  { label: 'Architecture', value: '64 bit' },
                  { label: 'Fabrication', value: product.brand === 'Apple' ? '3 nm' : '4 nm' },
                  { label: 'RAM', value: (product.specs as any)?.ram || '12GB LPDDR5X' },
                  { label: 'Internal Storage', value: (product.specs as any)?.storage || '256GB UFS 4.0' },
                ].map((row, idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row hover:bg-gray-50/50 dark:hover:bg-white/[0.02] transition-colors">
                    <div className="sm:w-1/3 py-3.5 px-6 font-medium text-gray-600 dark:text-gray-400 bg-gray-50/40 dark:bg-white/[0.01]">{row.label}</div>
                    <div className="sm:w-2/3 py-3.5 px-6 font-normal text-gray-900 dark:text-gray-100">{row.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Display & Multimedia */}
            <div className="glass-card rounded-2xl overflow-hidden border border-gray-200 dark:border-white/10">
              <div className="px-6 py-4 bg-gray-100/80 dark:bg-white/5 border-b border-gray-200 dark:border-white/10">
                <h3 className="font-bold text-sm uppercase tracking-wider text-gray-800 dark:text-gray-200">Display, Camera & Battery</h3>
              </div>
              <div className="divide-y divide-gray-200 dark:divide-white/10 text-sm">
                {[
                  { label: 'Display Type', value: (product.specs as any)?.display || 'AMOLED Display' },
                  { label: 'Resolution', value: '1080x2400 px (FHD+) / 1440x3120 px (QHD+)' },
                  { label: 'Aspect Ratio', value: '20:9' },
                  { label: 'Pixel Density', value: '460 ppi' },
                  { label: 'Refresh Rate', value: '120Hz LTPO Adaptive Refresh Rate' },
                  { label: 'Screen Protection', value: product.brand === 'Apple' ? 'Ceramic Shield Glass' : 'Corning Gorilla Glass Armor' },
                  { label: 'Peak Brightness', value: '2400 nits Peak Brightness' },
                  { label: 'HDR Support', value: 'HDR10+ / Dolby Vision Support' },
                  { label: 'Main Camera System', value: (product.specs as any)?.camera || '50MP Triple Camera Setup with OIS' },
                  { label: 'Battery Capacity', value: (product.specs as any)?.battery || '5000mAh Li-Po (Non-removable)' },
                ].map((row, idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row hover:bg-gray-50/50 dark:hover:bg-white/[0.02] transition-colors">
                    <div className="sm:w-1/3 py-3.5 px-6 font-medium text-gray-600 dark:text-gray-400 bg-gray-50/40 dark:bg-white/[0.01]">{row.label}</div>
                    <div className="sm:w-2/3 py-3.5 px-6 font-normal text-gray-900 dark:text-gray-100">{row.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        {activeTab === 'reviews' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 glass-card rounded-2xl p-6">
              <div>
                <h3 className="text-lg font-bold">Customer Reviews ({reviews.length})</h3>
                <p className="text-xs text-gray-400 mt-0.5">Share your experience with this device</p>
              </div>
              <button
                onClick={() => setShowReviewForm(!showReviewForm)}
                className="px-5 py-2.5 bg-gradient-to-r from-brand-600 to-purple-600 rounded-xl font-semibold text-sm flex items-center gap-2 hover:opacity-90 transition-opacity"
              >
                <Icons.Plus /> Write a Review
              </button>
            </div>

            {showReviewForm && (
              <form onSubmit={handleAddReview} className="glass-card rounded-2xl p-6 border border-brand-500/30 animate-slide-down space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm">Add Your Review</h4>
                  <button type="button" onClick={() => setShowReviewForm(false)} className="text-gray-400 hover:text-white"><Icons.X /></button>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-gray-400 block mb-1.5">Your Name</label>
                    <input
                      type="text"
                      value={newReviewName}
                      onChange={(e) => setNewReviewName(e.target.value)}
                      placeholder={user ? user.name : "e.g. Alex Johnson"}
                      className="w-full px-4 py-2.5 glass rounded-xl text-sm text-white placeholder-gray-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 block mb-1.5">Rating</label>
                    <div className="flex items-center gap-2 h-10">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setNewReviewRating(star)}
                          className="p-1.5 hover:scale-110 transition-transform"
                        >
                          <Icons.Star filled={star <= newReviewRating} />
                        </button>
                      ))}
                      <span className="text-xs text-gray-400 ml-2">{newReviewRating} / 5 Stars</span>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="text-xs text-gray-400 block mb-1.5">Your Review</label>
                  <textarea
                    rows={3}
                    required
                    value={newReviewText}
                    onChange={(e) => setNewReviewText(e.target.value)}
                    placeholder="What did you like or dislike about this device?"
                    className="w-full px-4 py-2.5 glass rounded-xl text-sm text-white placeholder-gray-500 resize-none"
                  />
                </div>
                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowReviewForm(false)}
                    className="px-4 py-2 glass rounded-xl text-xs font-medium hover:bg-white/5"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-gradient-to-r from-brand-600 to-purple-600 rounded-xl text-xs font-semibold"
                  >
                    Submit Review
                  </button>
                </div>
              </form>
            )}

            <div className="space-y-4">
              {reviews.map(r => (
                <div key={r.id} className="glass-card rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-500 to-purple-500 flex items-center justify-center font-bold text-sm">{r.user[0]}</div>
                      <div><p className="font-medium text-sm">{r.user}</p><p className="text-xs text-gray-500">{r.date}</p></div>
                    </div>
                    <div className="flex">{Array.from({ length: 5 }).map((_, i) => <Icons.Star key={i} filled={i < r.rating} />)}</div>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">{r.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
