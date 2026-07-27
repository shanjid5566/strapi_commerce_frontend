'use client';

import { Icons } from '@/components/ui/Icons';
import ProductImage from '@/components/ui/ProductImage';
import { mockProducts } from '@/data';
import { useWishlist } from '@/contexts/WishlistContext';
import { useCart } from '@/contexts/CartContext';

interface WishlistSectionProps {
  onNavigate: (page: string) => void;
}

export default function WishlistSection({ onNavigate }: WishlistSectionProps) {
  const { wishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  const wishlistProducts = mockProducts.filter((p) => wishlist.includes(p.id));

  if (wishlistProducts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="w-24 h-24 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-6">
          <Icons.Heart size={40} className="text-gray-300 dark:text-gray-600" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Your wishlist is empty
        </h3>
        <p className="text-gray-500 dark:text-gray-400 mb-6 text-center max-w-sm">
          Save your favorite products here and come back to them anytime.
        </p>
        <button
          onClick={() => onNavigate('catalog')}
          className="px-8 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold hover:from-indigo-600 hover:to-purple-700 transition-all shadow-lg shadow-indigo-500/25"
        >
          Browse Products
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          My Wishlist
        </h2>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {wishlistProducts.length} item{wishlistProducts.length !== 1 ? 's' : ''}
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {wishlistProducts.map((product) => (
          <div
            key={product.id}
            className="p-4 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/30 shadow-lg group"
          >
            <div className="relative mb-3">
              <div className="aspect-[1/2] rounded-xl bg-gray-50 dark:bg-gray-700/50 flex items-center justify-center overflow-hidden">
                <ProductImage image={product.image} size="sm" className="scale-90" />
              </div>
              <button
                onClick={() => toggleWishlist(product.id)}
                className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm flex items-center justify-center text-red-500 hover:bg-white dark:hover:bg-gray-700 transition-colors"
              >
                <Icons.Heart size={16} filled />
              </button>
            </div>

            <p className="text-xs font-semibold text-indigo-500 dark:text-indigo-400 uppercase tracking-wider">
              {product.brand}
            </p>
            <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate mt-0.5">
              {product.name}
            </h3>

            <div className="flex items-center gap-2 mt-2">
              <span className="text-base font-bold text-gray-900 dark:text-white">
                ${product.price}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-xs text-gray-400 line-through">
                  ${product.originalPrice}
                </span>
              )}
            </div>

            <div className="flex gap-2 mt-3">
              <button
                onClick={() => {
                  addToCart(product);
                }}
                className="flex-1 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700 transition-all flex items-center justify-center gap-1"
              >
                <Icons.Cart size={12} />
                Add to Cart
              </button>
              <button
                onClick={() => toggleWishlist(product.id)}
                className="w-9 h-9 rounded-xl border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-200 dark:hover:border-red-700/50 transition-colors"
              >
                <Icons.X size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
