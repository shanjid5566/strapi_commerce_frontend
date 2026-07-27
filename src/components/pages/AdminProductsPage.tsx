'use client';

import { useState } from 'react';
import { Icons } from '@/components/ui/Icons';
import { mockProducts } from '@/data/products';
import ProductImage from '@/components/ui/ProductImage';

export default function AdminProductsPage() {
  const [products, setProducts] = useState(mockProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'list' | 'form' | 'detail'>('list');
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [editingId, setEditingId] = useState<number | null>(null);

  // Full Professional Form State
  const [formName, setFormName] = useState('');
  const [formBrand, setFormBrand] = useState('Apple');
  const [formBadge, setFormBadge] = useState('New');
  const [formImages, setFormImages] = useState([{ url: 'iphone15', isMain: true }]);
  const [formPrice, setFormPrice] = useState('');
  const [formOriginalPrice, setFormOriginalPrice] = useState('');
  const [formStock, setFormStock] = useState('50');
  const [formDesc, setFormDesc] = useState('');

  // Dynamic Specs Form State
  const [formSpecs, setFormSpecs] = useState([
    { key: 'Display', value: '6.7" OLED Display' },
    { key: 'Processor', value: 'Flagship Octa-Core Chip' },
    { key: 'RAM', value: '12GB' },
    { key: 'Storage', value: '256GB' },
    { key: 'Battery', value: '5000 mAh' },
    { key: 'Camera', value: '50MP Main + 12MP Ultra-Wide' }
  ]);

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openAddForm = () => {
    setEditingId(null);
    setFormName('');
    setFormBrand('Apple');
    setFormBadge('New');
    setFormImages([{ url: 'iphone15', isMain: true }]);
    setFormPrice('');
    setFormOriginalPrice('');
    setFormStock('50');
    setFormDesc('');
    setFormSpecs([
      { key: 'Display', value: '6.7" Super Retina XDR' },
      { key: 'Processor', value: 'A17 Pro' },
      { key: 'RAM', value: '8GB' },
      { key: 'Storage', value: '256GB' },
      { key: 'Battery', value: '4422mAh' },
      { key: 'Camera', value: '48MP Triple Camera' }
    ]);
    setViewMode('form');
  };

  const openEditForm = (p: any) => {
    setEditingId(p.id);
    setFormName(p.name);
    setFormBrand(p.brand);
    setFormBadge(p.badge || 'Featured');
    
    if (p.images && Array.isArray(p.images)) {
      setFormImages(p.images);
    } else {
      setFormImages([{ url: p.image || 'iphone15', isMain: true }]);
    }

    setFormPrice(String(p.price));
    setFormOriginalPrice(String(p.originalPrice || Number(p.price) + 150));
    setFormStock(String(p.stock));
    setFormDesc(p.description || '');
    
    if (Array.isArray(p.specs)) {
      setFormSpecs(p.specs);
    } else {
      const s = p.specs || {};
      const specArr = [];
      if (s.screen) specArr.push({ key: 'Display', value: s.screen });
      if (s.processor) specArr.push({ key: 'Processor', value: s.processor });
      if (s.ram) specArr.push({ key: 'RAM', value: s.ram });
      if (s.storage) specArr.push({ key: 'Storage', value: s.storage });
      if (s.battery) specArr.push({ key: 'Battery', value: s.battery });
      if (s.camera) specArr.push({ key: 'Camera', value: s.camera });
      if (specArr.length === 0) specArr.push({ key: 'Feature', value: 'Great performance' });
      setFormSpecs(specArr);
    }
    
    setViewMode('form');
  };

  const openDetailView = (p: any) => {
    setSelectedProduct(p);
    setViewMode('detail');
  };

  const handleDelete = (id: number) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    if (selectedProduct && selectedProduct.id === id) {
      setViewMode('list');
    }
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formPrice) return;

    const mainImage = formImages.find(img => img.isMain)?.url || formImages[0]?.url || 'iphone15';

    if (editingId) {
      setProducts(prev => prev.map(p => {
        if (p.id === editingId) {
          return {
            ...p,
            name: formName.trim(),
            brand: formBrand,
            badge: formBadge,
            image: mainImage,
            images: formImages,
            price: Number(formPrice),
            originalPrice: Number(formOriginalPrice) || Number(formPrice) + 150,
            stock: Number(formStock),
            description: formDesc.trim() || p.description,
            specs: formSpecs,
          };
        }
        return p;
      }));
    } else {
      const newProduct = {
        id: Date.now(),
        name: formName.trim(),
        brand: formBrand,
        badge: formBadge,
        image: mainImage,
        images: formImages,
        price: Number(formPrice),
        originalPrice: Number(formOriginalPrice) || Number(formPrice) + 150,
        rating: 5.0,
        reviews: 0,
        stock: Number(formStock),
        description: formDesc.trim() || `${formName.trim()} smartphone with flagship performance.`,
        specs: formSpecs,
      };
      setProducts([newProduct as any, ...products]);
    }
    setViewMode('list');
  };

  if (viewMode === 'detail' && selectedProduct) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setViewMode('list')}
            className="px-4 py-2 glass rounded-xl text-xs font-medium flex items-center gap-2 hover:bg-white/5"
          >
            <Icons.ArrowLeft size={16} /> Back to Products
          </button>
          <div className="flex items-center gap-3">
            <button
              onClick={() => openEditForm(selectedProduct)}
              className="px-4 py-2 bg-gradient-to-r from-brand-600 to-purple-600 rounded-xl text-xs font-semibold flex items-center gap-2"
            >
              <Icons.Edit size={14} /> Edit This Product
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5 space-y-4">
            <div className="glass-card rounded-3xl p-8 flex items-center justify-center relative min-h-[380px]">
              {selectedProduct.badge && (
                <span className="absolute top-5 left-5 px-3 py-1 bg-brand-500/20 text-brand-400 rounded-full text-xs font-bold">
                  {selectedProduct.badge}
                </span>
              )}
              <div className="w-56 h-64">
                <ProductImage product={selectedProduct} size="lg" />
              </div>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {[0, 1, 2, 3].map(i => (
                <div key={i} className="glass-card rounded-2xl p-2.5 aspect-square flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity">
                  <ProductImage product={selectedProduct} size="sm" />
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <div className="glass-card rounded-3xl p-6 sm:p-8 space-y-6">
              <div>
                <span className="text-sm font-semibold text-brand-400 uppercase tracking-wider">{selectedProduct.brand}</span>
                <h2 className="text-2xl sm:text-3xl font-extrabold mt-1 text-white">{selectedProduct.name}</h2>
                <div className="flex items-center gap-4 mt-3">
                  <div className="flex items-center gap-1 text-amber-400">
                    <Icons.Star filled size={14} />
                    <span className="font-bold text-sm">{selectedProduct.rating}</span>
                    <span className="text-xs text-white/40">({selectedProduct.reviews || 12} reviews)</span>
                  </div>
                  <span className="h-4 w-px bg-white/10"></span>
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${selectedProduct.stock > 10 ? 'bg-green-500/10 text-green-400' : 'bg-yellow-500/10 text-yellow-400'}`}>
                    {selectedProduct.stock} Units Available
                  </span>
                </div>
              </div>

              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-extrabold text-white">${selectedProduct.price}</span>
                {selectedProduct.originalPrice && (
                  <span className="text-lg text-white/40 line-through">${selectedProduct.originalPrice}</span>
                )}
              </div>

              <div className="border-t border-white/10 pt-4">
                <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-2">Overview</h3>
                <p className="text-sm text-white/70 leading-relaxed">
                  {selectedProduct.description || `${selectedProduct.name} engineered with premium materials, industry-leading performance, and advanced camera architecture.`}
                </p>
              </div>

              <div className="border-t border-white/10 pt-4">
                <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-4">Technical Specifications</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {(Array.isArray(selectedProduct.specs) ? selectedProduct.specs : [
                    { label: 'Display', value: selectedProduct.specs?.screen || '6.7" OLED XDR' },
                    { label: 'Processor', value: selectedProduct.specs?.processor || 'Flagship Octa-Core' },
                    { label: 'RAM', value: selectedProduct.specs?.ram || '12GB' },
                    { label: 'Storage', value: selectedProduct.specs?.storage || '256GB' },
                    { label: 'Battery', value: selectedProduct.specs?.battery || '5000 mAh' },
                    { label: 'Camera System', value: selectedProduct.specs?.camera || '50MP Triple Array' },
                  ]).map((spec: any, index: number) => (
                    <div key={index} className="glass rounded-xl p-3.5 border border-white/5">
                      <span className="text-xs text-white/40 block">{spec.key || spec.label}</span>
                      <span className="text-sm font-semibold mt-0.5 block text-white/90">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (viewMode === 'form') {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setViewMode('list')}
            className="px-4 py-2 glass rounded-xl text-xs font-medium flex items-center gap-2 hover:bg-white/5 text-white/70"
          >
            <Icons.ArrowLeft size={16} /> Back to Products Table
          </button>
          <h2 className="text-lg font-bold text-white">
            {editingId ? `Edit Product: ${formName}` : 'Create Professional Product Entry'}
          </h2>
        </div>

        <form onSubmit={handleSaveProduct} className="space-y-6">
          {/* Section 1 */}
          <div className="glass-card rounded-2xl p-6 space-y-4 border border-white/10">
            <h3 className="text-sm font-bold text-brand-400 uppercase tracking-wider border-b border-white/10 pb-3">
              1. General Product Details
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="sm:col-span-2">
                <label className="text-xs text-white/50 block mb-1.5 font-medium">Product Full Name *</label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="e.g. iPhone 16 Pro Max 256GB"
                  className="w-full px-4 py-2.5 glass rounded-xl text-sm text-white placeholder-white/30 outline-none focus:border-brand-500"
                />
              </div>
              <div>
                <label className="text-xs text-white/50 block mb-1.5 font-medium">Brand *</label>
                <select
                  value={formBrand}
                  onChange={(e) => setFormBrand(e.target.value)}
                  className="w-full px-4 py-2.5 glass rounded-xl text-sm text-white appearance-none outline-none focus:border-brand-500 bg-gray-900"
                >
                  {['Apple', 'Samsung', 'Google', 'OnePlus', 'Xiaomi', 'Nothing', 'Realme'].map(b => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs text-white/50 block mb-1.5 font-medium">Badge Tag</label>
                <select
                  value={formBadge}
                  onChange={(e) => setFormBadge(e.target.value)}
                  className="w-full px-4 py-2.5 glass rounded-xl text-sm text-white appearance-none outline-none focus:border-brand-500 bg-gray-900"
                >
                  <option value="New">New</option>
                  <option value="Best Seller">Best Seller</option>
                  <option value="Sale">Sale</option>
                  <option value="Limited">Limited Edition</option>
                  <option value="Featured">Featured</option>
                </select>
              </div>
            </div>

            <div className="grid sm:grid-cols-4 gap-4 pt-2">
              <div className="sm:col-span-4 border-t border-white/10 pt-4 mt-2">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-xs text-white/50 font-medium">Product Images (Upload)</label>
                  <button type="button" onClick={() => setFormImages([...formImages, { url: 'iphone15', isMain: false }])} className="px-2.5 py-1 glass rounded-lg text-xs hover:bg-white/5 text-white">+ Add Image</button>
                </div>
                <div className="space-y-3">
                  {formImages.map((img, i) => (
                    <div key={i} className="flex gap-3 items-center glass p-2 rounded-xl border border-white/5">
                      <input type="radio" name="mainImage" checked={img.isMain} onChange={() => setFormImages(formImages.map((img2, i2) => ({ ...img2, isMain: i === i2 })))} className="accent-brand-500 w-4 h-4 cursor-pointer" title="Set as Main Image" />
                      <div className="w-12 h-12 rounded bg-black/30 overflow-hidden flex items-center justify-center flex-shrink-0">
                        {img.url.startsWith('blob:') || img.url.includes('/') || img.url.includes('.') ? (
                          <img src={img.url} alt="Preview" className="w-full h-full object-cover" />
                        ) : (
                          <div className="text-[10px] text-white/40">{img.url}</div>
                        )}
                      </div>
                      <input type="file" accept="image/*" onChange={(e) => { 
                        if(e.target.files && e.target.files[0]) { 
                          const url = URL.createObjectURL(e.target.files[0]);
                          const newImgs = [...formImages]; 
                          newImgs[i].url = url; 
                          setFormImages(newImgs); 
                        } 
                      }} className="flex-1 text-sm text-white/60 file:mr-4 file:py-1.5 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-brand-500/20 file:text-brand-400 hover:file:bg-brand-500/30 cursor-pointer" />
                      <button type="button" onClick={() => { if(formImages.length > 1) { const newImgs = formImages.filter((_, idx) => idx !== i); if(img.isMain && newImgs.length > 0) newImgs[0].isMain = true; setFormImages(newImgs); } }} className="p-2 text-white/50 hover:text-red-400 hover:bg-red-500/10 rounded-lg"><Icons.Trash size={16} /></button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="sm:col-span-4 mt-2">
                <label className="text-xs text-white/50 block mb-1.5 font-medium">Detailed Description</label>
                <input
                  type="text"
                  value={formDesc}
                  onChange={(e) => setFormDesc(e.target.value)}
                  placeholder="Comprehensive marketing & product summary..."
                  className="w-full px-4 py-2.5 glass rounded-xl text-sm text-white placeholder-white/30 outline-none focus:border-brand-500"
                />
              </div>
            </div>
          </div>

          {/* Section 2 */}
          <div className="glass-card rounded-2xl p-6 space-y-4 border border-white/10">
            <h3 className="text-sm font-bold text-brand-400 uppercase tracking-wider border-b border-white/10 pb-3">
              2. Pricing & Inventory
            </h3>
            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs text-white/50 block mb-1.5 font-medium">Sale / Active Price ($) *</label>
                <input
                  type="number"
                  required
                  min="1"
                  value={formPrice}
                  onChange={(e) => setFormPrice(e.target.value)}
                  placeholder="1199"
                  className="w-full px-4 py-2.5 glass rounded-xl text-sm text-white placeholder-white/30 outline-none focus:border-brand-500"
                />
              </div>
              <div>
                <label className="text-xs text-white/50 block mb-1.5 font-medium">Original / Regular Price ($)</label>
                <input
                  type="number"
                  min="1"
                  value={formOriginalPrice}
                  onChange={(e) => setFormOriginalPrice(e.target.value)}
                  placeholder="1299"
                  className="w-full px-4 py-2.5 glass rounded-xl text-sm text-white placeholder-white/30 outline-none focus:border-brand-500"
                />
              </div>
              <div>
                <label className="text-xs text-white/50 block mb-1.5 font-medium">Stock Units Available *</label>
                <input
                  type="number"
                  required
                  min="0"
                  value={formStock}
                  onChange={(e) => setFormStock(e.target.value)}
                  placeholder="50"
                  className="w-full px-4 py-2.5 glass rounded-xl text-sm text-white placeholder-white/30 outline-none focus:border-brand-500"
                />
              </div>
            </div>
          </div>

          {/* Section 3 */}
          <div className="glass-card rounded-2xl p-6 space-y-4 border border-white/10">
            <h3 className="text-sm font-bold text-brand-400 uppercase tracking-wider border-b border-white/10 pb-3">
              3. Technical Hardware Specifications
            </h3>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs text-white/50">Dynamic Key/Value Specifications</span>
              <button type="button" onClick={() => setFormSpecs([...formSpecs, { key: '', value: '' }])} className="px-3 py-1.5 glass rounded-lg text-xs font-medium flex items-center gap-1 hover:bg-white/5 text-white"><Icons.Plus size={14} /> Add Specification</button>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {formSpecs.map((spec, i) => (
                <div key={i} className="glass rounded-xl p-3 relative group border border-white/5">
                  <button type="button" onClick={() => setFormSpecs(formSpecs.filter((_, idx) => idx !== i))} className="absolute top-2 right-2 p-1.5 hover:bg-red-500/10 rounded text-white/50 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity z-10"><Icons.Trash size={14} /></button>
                  <div className="space-y-2">
                    <div>
                      <label className="text-[10px] text-white/50 uppercase tracking-wider block mb-1">Specification Name</label>
                      <input type="text" value={spec.key} onChange={(e) => { const newSpecs = [...formSpecs]; newSpecs[i].key = e.target.value; setFormSpecs(newSpecs); }} placeholder="e.g. Display" className="w-full px-3 py-1.5 bg-white/5 rounded-lg text-sm font-medium pr-8 text-white outline-none" />
                    </div>
                    <div>
                      <label className="text-[10px] text-white/50 uppercase tracking-wider block mb-1">Value</label>
                      <input type="text" value={spec.value} onChange={(e) => { const newSpecs = [...formSpecs]; newSpecs[i].value = e.target.value; setFormSpecs(newSpecs); }} placeholder="e.g. 6.7 OLED" className="w-full px-3 py-1.5 bg-white/5 rounded-lg text-sm text-white outline-none" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setViewMode('list')}
              className="px-6 py-2.5 glass rounded-xl text-sm font-medium hover:bg-white/5 text-white/70 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-7 py-2.5 bg-gradient-to-r from-brand-600 to-purple-600 rounded-xl text-sm font-bold shadow-lg hover:opacity-90 transition-opacity text-white"
            >
              {editingId ? 'Save Product Changes' : 'Publish New Product'}
            </button>
          </div>
        </form>
      </div>
    );
  }

  // ==========================================
  // LIST VIEW MODE (MAIN TABLE)
  // ==========================================
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="glass-card rounded-2xl p-5 border border-white/5 hover-lift">
          <div className="text-white/50 text-xs font-medium mb-1">Total Products</div>
          <div className="text-2xl font-bold text-white">{products.length}</div>
        </div>
        <div className="glass-card rounded-2xl p-5 border border-white/5 hover-lift">
          <div className="text-white/50 text-xs font-medium mb-1">Active Brands</div>
          <div className="text-2xl font-bold text-white">{new Set(products.map(p => p.brand)).size}</div>
        </div>
        <div className="glass-card rounded-2xl p-5 border border-white/5 hover-lift">
          <div className="text-white/50 text-xs font-medium mb-1">Low Stock Items</div>
          <div className="text-2xl font-bold text-orange-400">{products.filter(p => p.stock < 10).length}</div>
        </div>
        <div className="glass-card rounded-2xl p-5 border border-white/5 hover-lift">
          <div className="text-white/50 text-xs font-medium mb-1">Avg. Price</div>
          <div className="text-2xl font-bold text-brand-400">${Math.round(products.reduce((acc, p) => acc + Number(p.price), 0) / (products.length || 1))}</div>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40"><Icons.Search size={18} /></div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search products by name or brand..."
            className="w-full pl-10 pr-4 py-2.5 glass rounded-xl text-sm text-white placeholder-white/30 outline-none focus:border-brand-500/50"
          />
        </div>
        <button
          onClick={openAddForm}
          className="px-5 py-2.5 bg-gradient-to-r from-brand-600 to-purple-600 rounded-xl text-sm font-semibold flex items-center gap-2 hover:opacity-90 transition-opacity text-white"
        >
          <Icons.Plus size={16} /> Add Product
        </button>
      </div>

      <div className="glass-card rounded-2xl overflow-hidden border border-white/10">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                {['Product', 'Brand', 'Price', 'Stock', 'Rating', 'Actions'].map(h => (
                  <th key={h} className={`px-5 py-3 text-xs font-bold text-white/50 uppercase tracking-wider ${h === 'Actions' ? 'text-right' : 'text-left'}`}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map(p => (
                <tr key={p.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 flex-shrink-0 bg-white/10 rounded-lg overflow-hidden flex items-center justify-center">
                        <ProductImage product={p} size="sm" />
                      </div>
                      <span className="text-sm font-medium text-white">{p.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-sm text-white/70">{p.brand}</td>
                  <td className="px-5 py-3 text-sm font-bold text-white">${p.price}</td>
                  <td className="px-5 py-3 text-sm">
                    <span className={`font-semibold ${p.stock < 30 ? 'text-yellow-400' : 'text-green-400'}`}>
                      {p.stock}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-1 text-amber-400">
                      <Icons.Star filled size={14} />
                      <span className="text-sm font-semibold text-white/90">{p.rating}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => openDetailView(p)}
                        className="p-2 hover:bg-white/10 rounded-lg text-white/50 hover:text-brand-400 transition-colors"
                        title="View Product Details"
                      >
                        <Icons.Eye size={16} />
                      </button>
                      <button
                        type="button"
                        onClick={() => openEditForm(p)}
                        className="p-2 hover:bg-white/10 rounded-lg text-white/50 hover:text-white transition-colors"
                        title="Edit Product"
                      >
                        <Icons.Edit size={16} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(p.id)}
                        className="p-2 hover:bg-red-500/10 rounded-lg text-white/50 hover:text-red-400 transition-colors"
                        title="Delete Product"
                      >
                        <Icons.Trash size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-sm text-white/50">No products found matching your search.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
