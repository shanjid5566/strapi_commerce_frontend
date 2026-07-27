'use client';

import { useState, useMemo } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { Icons } from '@/components/ui/Icons';
import ProductImage from '@/components/ui/ProductImage';
import { mockProducts } from '@/data/products';

interface ProductDetailPageProps {
  params: { id: string };
  onNavigate: (page: string, id?: number) => void;
}

interface Review {
  id: number;
  name: string;
  rating: number;
  date: string;
  text: string;
  avatar: string;
}

const mockReviews: Review[] = [
  { id: 1, name: 'Alex Thompson', rating: 5, date: '2 days ago', text: 'Absolutely love this phone! The camera quality is exceptional and battery life is impressive.', avatar: 'AT' },
  { id: 2, name: 'Maria Garcia', rating: 4, date: '1 week ago', text: 'Great performance and design. Only minor complaint is the price, but you get what you pay for.', avatar: 'MG' },
  { id: 3, name: 'John Smith', rating: 5, date: '2 weeks ago', text: 'Best smartphone I have ever owned. The display is stunning and performance is top-notch.', avatar: 'JS' },
];

export default function ProductDetailPage({ params, onNavigate }: ProductDetailPageProps) {
  const { id } = params;
  const product = useMemo(() => mockProducts.find((p) => p.id === parseInt(id)), [id]);

  const { user } = useAuth();
  const { addToCart } = useCart();
  const { wishlist, toggleWishlist } = useWishlist();

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'specs' | 'reviews'>('specs');
  const [selectedImage, setSelectedImage] = useState(0);
  const [reviewForm, setReviewForm] = useState({ name: '', rating: 5, text: '' });
  const [reviews, setReviews] = useState<Review[]>(mockReviews);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Product not found</h2>
          <button
            onClick={() => onNavigate('catalog')}
            className="text-indigo-600 hover:text-indigo-700 font-medium"
          >
            Back to Catalog
          </button>
        </div>
      </div>
    );
  }

  const isWishlisted = wishlist.includes(product.id);
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewForm.name || !reviewForm.text) return;
    const newReview: Review = {
      id: reviews.length + 1,
      name: reviewForm.name,
      rating: reviewForm.rating,
      date: 'Just now',
      text: reviewForm.text,
      avatar: reviewForm.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2),
    };
    setReviews([newReview, ...reviews]);
    setReviewForm({ name: '', rating: 5, text: '' });
  };

  const specRows = [
    { label: 'Display', value: product.specs.display },
    { label: 'Processor', value: product.specs.chip },
    { label: 'RAM', value: product.specs.ram },
    { label: 'Storage', value: product.specs.storage },
  ];

  const specRows2 = [
    { label: 'Battery', value: product.specs.battery },
    { label: 'Camera', value: product.specs.camera },
    { label: 'Category', value: product.category },
    { label: 'In Stock', value: `${product.stock} units` },
  ];

  const thumbnails = Array(4).fill(product.image);

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => onNavigate('catalog')}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 mb-8 transition-colors"
        >
          <Icons.ArrowLeft size={20} />
          Back to Catalog
        </button>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          <div className="space-y-4">
            <div className="relative p-8 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/30 flex items-center justify-center">
              {discount > 0 && (
                <span className="absolute top-4 left-4 px-3 py-1 rounded-lg bg-gradient-to-r from-red-500 to-pink-500 text-white text-sm font-bold">
                  -{discount}%
                </span>
              )}
              <ProductImage image={product.image} size="xl" />
            </div>
            <div className="grid grid-cols-4 gap-3">
              {thumbnails.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`p-3 rounded-xl border-2 transition-all flex justify-center ${
                    selectedImage === i
                      ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
                      : 'border-white/20 dark:border-gray-700/30 bg-white/80 dark:bg-gray-800/80 hover:border-indigo-300'
                  }`}
                >
                  <ProductImage image={img} size="sm" />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <p className="text-sm font-semibold text-indigo-500 dark:text-indigo-400 uppercase tracking-wider mb-1">
                {product.brand}
              </p>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3">
                {product.name}
              </h1>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Icons.Star
                      key={i}
                      size={18}
                      filled={i < Math.round(product.rating)}
                      className={i < Math.round(product.rating) ? 'text-amber-400' : 'text-gray-300'}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{product.description}</p>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-gray-900 dark:text-white">
                ${product.price.toLocaleString()}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-lg text-gray-400 line-through">
                  ${product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>

            <button
              onClick={() => toggleWishlist(product.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                isWishlisted
                  ? 'bg-red-50 dark:bg-red-900/20 text-red-500'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-red-400'
              }`}
            >
              <Icons.Heart size={20} filled={isWishlisted} />
              {isWishlisted ? 'In Wishlist' : 'Add to Wishlist'}
            </button>

            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Quantity:</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  <Icons.Minus size={16} />
                </button>
                <span className="w-12 text-center font-semibold text-gray-900 dark:text-white">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  <Icons.Plus size={16} />
                </button>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold hover:from-indigo-600 hover:to-purple-700 transition-all shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2"
            >
              <Icons.Cart size={20} />
              Add to Cart
            </button>
          </div>
        </div>

        <div className="mt-12">
          <div className="flex gap-4 border-b border-gray-200 dark:border-gray-700 mb-6">
            <button
              onClick={() => setActiveTab('specs')}
              className={`pb-3 px-1 font-medium transition-colors ${
                activeTab === 'specs'
                  ? 'text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400'
              }`}
            >
              Specifications
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`pb-3 px-1 font-medium transition-colors ${
                activeTab === 'reviews'
                  ? 'text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400'
              }`}
            >
              Reviews ({reviews.length})
            </button>
          </div>

          {activeTab === 'specs' && (
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/30">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Performance</h3>
                <div className="space-y-3">
                  {specRows.map((row) => (
                    <div key={row.label} className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-700 last:border-0">
                      <span className="text-gray-500 dark:text-gray-400">{row.label}</span>
                      <span className="font-medium text-gray-900 dark:text-white">{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-6 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/30">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">General</h3>
                <div className="space-y-3">
                  {specRows2.map((row) => (
                    <div key={row.label} className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-700 last:border-0">
                      <span className="text-gray-500 dark:text-gray-400">{row.label}</span>
                      <span className="font-medium text-gray-900 dark:text-white">{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-6">
              {user && (
                <form onSubmit={handleSubmitReview} className="p-6 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/30">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Write a Review</h3>
                  <div className="space-y-4">
                    <input
                      type="text"
                      value={reviewForm.name}
                      onChange={(e) => setReviewForm({ ...reviewForm, name: e.target.value })}
                      placeholder="Your name"
                      className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                        >
                          <Icons.Star
                            size={24}
                            filled={star <= reviewForm.rating}
                            className={star <= reviewForm.rating ? 'text-amber-400' : 'text-gray-300'}
                          />
                        </button>
                      ))}
                    </div>
                    <textarea
                      value={reviewForm.text}
                      onChange={(e) => setReviewForm({ ...reviewForm, text: e.target.value })}
                      placeholder="Share your experience..."
                      rows={4}
                      className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                      required
                    />
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold hover:from-indigo-600 hover:to-purple-700 transition-all"
                    >
                      Submit Review
                    </button>
                  </div>
                </form>
              )}

              <div className="space-y-4">
                {reviews.map((review) => (
                  <div
                    key={review.id}
                    className="p-6 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/30"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                        {review.avatar}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-semibold text-gray-900 dark:text-white">{review.name}</span>
                          <span className="text-sm text-gray-400">{review.date}</span>
                        </div>
                        <div className="flex items-center gap-0.5 mb-2">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Icons.Star
                              key={i}
                              size={14}
                              filled={i < review.rating}
                              className={i < review.rating ? 'text-amber-400' : 'text-gray-300'}
                            />
                          ))}
                        </div>
                        <p className="text-gray-600 dark:text-gray-300">{review.text}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
