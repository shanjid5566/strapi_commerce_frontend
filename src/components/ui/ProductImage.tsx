'use client';

import { memo } from 'react';
import type { Product } from '@/types';

interface ProductImageProps {
  product?: Product;
  image?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizeMap = {
  sm: { width: 80, height: 80 },
  md: { width: '100%', height: 192 },
  lg: { width: '100%', height: 288 },
  xl: { width: '100%', height: 384 },
};

const gradientMap: Record<string, [string, string]> = {
  iphone15: ['#1a1a2e', '#2d2d4a'],
  s24ultra: ['#1a1a2e', '#3d2d4a'],
  pixel8: ['#1a2a3e', '#2d4a5a'],
  oneplus12: ['#1a2e1a', '#2d4a2d'],
  xiaomi14: ['#2e1a1a', '#4a2d2d'],
  nothing2a: ['#1a1a1a', '#2d2d2d'],
  a55: ['#1a1a3e', '#2d2d5a'],
  gt5pro: ['#1a2e2e', '#2d4a4a'],
  default: ['#1a1a2e', '#2d2d4a'],
};

const ProductImage = memo(function ProductImage({
  product,
  image,
  size = 'md',
  className = '',
}: ProductImageProps) {
  const imageName = product?.image || image || 'default';
  const [color1, color2] = gradientMap[imageName] || gradientMap['default'];
  const gradientId = `bg-${imageName}-${size}`;
  const screenId = `screen-${imageName}-${size}`;

  const displaySize = sizeMap[size];
  const isSm = size === 'sm';

  return (
    <div
      className={`inline-flex items-center justify-center ${className}`}
      style={!isSm ? { width: displaySize.width, height: displaySize.height } : undefined}
    >
      <svg
        viewBox="0 0 200 300"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color1} />
            <stop offset="100%" stopColor={color2} />
          </linearGradient>
          <linearGradient id={screenId} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#4338ca" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#6366f1" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#a855f7" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        <rect width="200" height="300" fill={`url(#${gradientId})`} />
        <rect x="55" y="30" width="90" height="180" rx="12" fill="#0a0a0f" stroke="#333" strokeWidth="1.5" />
        <rect x="59" y="38" width="82" height="164" rx="8" fill={`url(#${screenId})`} />
        <circle cx="100" cy="34" r="3" fill="#222" />
        <rect x="88" y="220" width="24" height="3" rx="1.5" fill="#333" />
        {product && (
          <text x="100" y="130" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="8" fontFamily="Inter, sans-serif">
            {product.brand}
          </text>
        )}
      </svg>
    </div>
  );
});

export default ProductImage;
