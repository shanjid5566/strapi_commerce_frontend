'use client';

import { useState, useRef, useCallback, useMemo } from 'react';
import { mockProducts } from '@/data/products';
import { Icons } from '@/components/ui/Icons';
import ProductCard from '@/components/ui/ProductCard';

interface CatalogPageProps {
  onNavigate: (page: string, id?: number) => void;
}

export default function CatalogPage({ onNavigate }: CatalogPageProps) {
  const [search, setSearch] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const [priceRange, setPriceRange] = useState([0, 1500]);
  const [showFilters, setShowFilters] = useState(false);
  const searchTimer = useRef<NodeJS.Timeout | null>(null);
  const [debouncedSearch, setDebouncedSearch] = useState('');

  const handleSearch = useCallback((val: string) => {
    setSearch(val);
    if (searchTimer.current) clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(() => setDebouncedSearch(val), 300);
  }, []);

  const filteredProducts = useMemo(() => {
    let result = [...mockProducts];
    if (debouncedSearch) {
      result = result.filter(p => p.name.toLowerCase().includes(debouncedSearch.toLowerCase()) || p.brand.toLowerCase().includes(debouncedSearch.toLowerCase()));
    }
    if (selectedBrand !== 'all') {
      result = result.filter(p => p.brand === selectedBrand);
    }
    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);
    switch (sortBy) {
      case 'price-low': result.sort((a, b) => a.price - b.price); break;
      case 'price-high': result.sort((a, b) => b.price - a.price); break;
      case 'rating': result.sort((a, b) => b.rating - a.rating); break;
      default: result.sort((a, b) => b.reviews - a.reviews);
    }
    return result;
  }, [debouncedSearch, selectedBrand, sortBy, priceRange]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-6">All Smartphones</h1>
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"><Icons.Search /></div>
          <input type="text" value={search} onChange={(e) => handleSearch(e.target.value)} placeholder="Search phones, brands..." className="w-full pl-12 pr-4 py-3 glass rounded-xl text-white placeholder-gray-500" />
        </div>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="px-4 py-3 glass rounded-xl text-white appearance-none cursor-pointer min-w-[170px] bg-gray-900/90 font-medium">
          <option value="popular" className="bg-gray-900 text-white">Most Popular</option>
          <option value="price-low" className="bg-gray-900 text-white">Price: Low to High</option>
          <option value="price-high" className="bg-gray-900 text-white">Price: High to Low</option>
          <option value="rating" className="bg-gray-900 text-white">Highest Rated</option>
        </select>
        <button onClick={() => setShowFilters(!showFilters)} className="sm:hidden px-4 py-3 glass rounded-xl flex items-center gap-2"><Icons.Filter /> Filters</button>
      </div>
      <div className="flex gap-8">
        {/* STICKY SIDEBAR */}
        <aside className={`${showFilters ? 'fixed inset-0 z-50 p-6 bg-gray-950/95 overflow-auto' : 'hidden'} sm:block sm:w-64 flex-shrink-0`}>
          <div className="sticky-sidebar pr-2">
            {showFilters && <button onClick={() => setShowFilters(false)} className="sm:hidden mb-4 text-gray-400 flex items-center gap-2"><Icons.X /> Close</button>}
            <div className="space-y-6">
              <div className="glass-card rounded-2xl p-5">
                <h3 className="font-semibold mb-3 text-sm uppercase tracking-wider text-gray-300">Brand</h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="brand" checked={selectedBrand === 'all'} onChange={() => setSelectedBrand('all')} className="accent-brand-500" />
                    <span className="text-sm text-gray-300">All Brands</span>
                  </label>
                  {['Apple', 'Samsung', 'Google', 'OnePlus', 'Xiaomi', 'Nothing', 'Realme'].map(brand => (
                    <label key={brand} className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="brand" checked={selectedBrand === brand} onChange={() => setSelectedBrand(brand)} className="accent-brand-500" />
                      <span className="text-sm text-gray-300">{brand}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="glass-card rounded-2xl p-5">
                <h3 className="font-semibold mb-3 text-sm uppercase tracking-wider text-gray-300">Price Range</h3>
                <input type="range" min="0" max="1500" value={priceRange[1]} onChange={(e) => setPriceRange([0, parseInt(e.target.value)])} className="w-full accent-brand-500" />
                <div className="flex justify-between text-sm text-gray-400 mt-2"><span>$0</span><span>${priceRange[1]}</span></div>
              </div>
              <div className="glass-card rounded-2xl p-5">
                <h3 className="font-semibold mb-3 text-sm uppercase tracking-wider text-gray-300">Category</h3>
                <div className="space-y-2">
                  {['All', 'Flagship', 'Mid-Range', 'Budget'].map(c => (
                    <label key={c} className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="accent-brand-500" />
                      <span className="text-sm text-gray-300">{c}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </aside>
        <div className="flex-1">
          <p className="text-sm text-gray-400 mb-4">{filteredProducts.length} products found</p>
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {filteredProducts.map(p => <ProductCard key={p.id} product={p} onNavigate={onNavigate} />)}
            </div>
          ) : (
            <div className="text-center py-20"><div className="text-6xl mb-4">📱</div><h3 className="text-xl font-semibold mb-2">No products found</h3></div>
          )}
        </div>
      </div>
    </div>
  );
}
