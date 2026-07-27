'use client';

import React, { memo } from 'react';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { Icons } from './Icons';
import ProductImage from './ProductImage';

interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  image: string;
}

interface ProductCardProps {
  product: Product;
  onNavigate?: (page: string, id?: number) => void;
}

const ProductCard = memo(({ product, onNavigate }: ProductCardProps) => {
  const { addToCart } = useCart();
  const { wishlist, toggleWishlist } = useWishlist();
  const isWished = wishlist.includes(product.id);
  const discount = Math.round((1 - product.price / product.originalPrice) * 100);
  
  return (
    <div className="glass-card rounded-2xl overflow-hidden hover-lift group cursor-pointer" onClick={() => onNavigate?.('product', product.id)}>
      <div className="product-img-container relative">
        <ProductImage product={product} size="md" />
        <div className="absolute top-3 left-3"><span className="px-2 py-1 bg-red-500/90 text-white text-xs font-bold rounded-lg">-{discount}%</span></div>
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); toggleWishlist(product.id); }}
          aria-label="Add to Wishlist"
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-sm ${
            isWished
              ? 'bg-red-500 text-white shadow-red-500/30'
              : 'bg-white/90 dark:bg-gray-900/80 backdrop-blur-md text-gray-700 dark:text-gray-200 hover:text-red-500 dark:hover:text-red-400 border border-gray-300 dark:border-white/15'
          }`}
        >
          <Icons.Heart filled={isWished} />
        </button>
      </div>
      <div className="p-4">
        <p className="text-xs text-brand-400 font-medium mb-1">{product.brand}</p>
        <h3 className="font-semibold text-sm line-clamp-2 mb-2 group-hover:text-brand-300 transition-colors">{product.name}</h3>
        <div className="flex items-center gap-1 mb-3">
          <div className="flex">{Array.from({ length: 5 }).map((_, i) => <Icons.Star key={i} filled={i < Math.floor(product.rating)} />)}</div>
          <span className="text-xs text-gray-400">({product.reviews})</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-lg font-bold">${product.price}</span>
            <span className="text-sm text-gray-500 line-through ml-2">${product.originalPrice}</span>
          </div>
          <button onClick={(e) => { e.stopPropagation(); addToCart(product); }}
            className="w-9 h-9 rounded-xl bg-brand-600 hover:bg-brand-500 flex items-center justify-center transition-colors"><Icons.Plus /></button>
        </div>
      </div>
    </div>
  );
});

ProductCard.displayName = 'ProductCard';

export default ProductCard;
