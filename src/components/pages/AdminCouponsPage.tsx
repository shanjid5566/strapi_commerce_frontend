'use client';

import { useState } from 'react';
import { useAdmin } from '@/contexts/AdminContext';
import { Icons } from '@/components/ui/Icons';
import { mockProducts } from '@/data/products';

export default function AdminCouponsPage() {
  const { coupons, setCoupons } = useAdmin();
  const [showForm, setShowForm] = useState(false);
  const [newCode, setNewCode] = useState('');
  const [newDiscount, setNewDiscount] = useState('');
  const [newType, setNewType] = useState('percent');
  const [newTarget, setNewTarget] = useState<string | number>('all');
  const [targetProduct, setTargetProduct] = useState<number>(mockProducts[0].id);
  const [productSearch, setProductSearch] = useState('');
  const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);
  
  const filteredProducts = mockProducts.filter(p => p.name.toLowerCase().includes(productSearch.toLowerCase()));

  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCode.trim() || !newDiscount) return;
    const newCoupon = {
      id: Date.now(),
      code: newCode.trim().toUpperCase(),
      discount: Number(newDiscount),
      type: newType as 'percent' | 'fixed',
      active: true,
      uses: 0,
      target: newTarget === 'all' ? 'all' : targetProduct
    };
    setCoupons([newCoupon, ...coupons]);
    setNewCode('');
    setNewDiscount('');
    setNewType('percent');
    setNewTarget('all');
    setShowForm(false);
  };

  const toggleStatus = (index: number) => {
    setCoupons(prev => prev.map((c, i) => i === index ? { ...c, active: !c.active } : c));
  };

  const deleteCoupon = (index: number) => {
    setCoupons(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6 animate-fade-in relative">
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in" onClick={() => setShowForm(false)}>
          <form onSubmit={handleCreateCoupon} className="glass-card rounded-3xl p-8 w-full max-w-md animate-scale-in relative border border-white/10" onClick={(e) => e.stopPropagation()}>
            <button type="button" onClick={() => setShowForm(false)} className="absolute top-4 right-4 p-2 hover:bg-white/5 rounded-lg text-white/50 hover:text-white"><Icons.X size={18} /></button>
            <h3 className="text-xl font-bold mb-6 text-white">Create New Coupon</h3>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm text-white/50 mb-1 block">Coupon Code</label>
                <input value={newCode} onChange={(e) => setNewCode(e.target.value)} placeholder="e.g. SUMMER25" className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-xl text-white uppercase outline-none focus:border-brand-500" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-white/50 mb-1 block">Type</label>
                  <select value={newType} onChange={(e) => setNewType(e.target.value)} className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-xl text-white appearance-none outline-none focus:border-brand-500 bg-gray-900 cursor-pointer">
                    <option value="percent" className="bg-gray-900 text-white">% Discount</option>
                    <option value="fixed" className="bg-gray-900 text-white">Fixed Amount</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm text-white/50 mb-1 block">Discount Value</label>
                  <input type="number" value={newDiscount} onChange={(e) => setNewDiscount(e.target.value)} placeholder="25" className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-xl text-white outline-none focus:border-brand-500" />
                </div>
              </div>

              <div>
                <label className="text-sm text-white/50 mb-2 block">Target Products</label>
                <div className="flex gap-4 mb-3">
                  <label className="flex items-center gap-2 cursor-pointer text-white/80 text-sm">
                    <input type="radio" name="target" checked={newTarget === 'all'} onChange={() => setNewTarget('all')} className="accent-brand-500" /> All Products
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-white/80 text-sm">
                    <input type="radio" name="target" checked={newTarget === 'specific'} onChange={() => setNewTarget('specific')} className="accent-brand-500" /> Specific Product
                  </label>
                </div>
                {newTarget === 'specific' && (
                  <div className="relative">
                    <input
                      type="text"
                      value={productSearch}
                      onChange={(e) => { setProductSearch(e.target.value); setIsProductDropdownOpen(true); }}
                      onFocus={() => setIsProductDropdownOpen(true)}
                      placeholder="Search product by name..."
                      className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-xl text-white placeholder-white/30 outline-none focus:border-brand-500"
                    />
                    {isProductDropdownOpen && (
                      <div className="absolute z-10 w-full mt-2 glass-card rounded-xl border border-white/10 max-h-48 overflow-y-auto">
                        {filteredProducts.map(p => (
                          <button
                            key={p.id}
                            type="button"
                            onClick={() => { setTargetProduct(p.id); setProductSearch(p.name); setIsProductDropdownOpen(false); }}
                            className={`w-full text-left px-4 py-2.5 text-sm hover:bg-brand-500/20 transition-colors ${targetProduct === p.id ? 'bg-brand-500/20 text-brand-400 font-medium' : 'text-white/70'}`}
                          >
                            {p.name}
                          </button>
                        ))}
                        {filteredProducts.length === 0 && (
                          <div className="px-4 py-3 text-sm text-white/50 text-center">No products found</div>
                        )}
                      </div>
                    )}
                    {/* Backdrop to close dropdown */}
                    {isProductDropdownOpen && (
                      <div className="fixed inset-0 z-0" onClick={() => setIsProductDropdownOpen(false)}></div>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="mt-8 flex justify-end gap-3">
              <button type="button" onClick={() => setShowForm(false)} className="px-5 py-2.5 glass rounded-xl text-sm font-medium hover:bg-white/5 text-white/70 hover:text-white border border-white/5">Cancel</button>
              <button type="submit" className="px-5 py-2.5 bg-gradient-to-r from-brand-600 to-purple-600 rounded-xl text-sm font-semibold text-white hover:opacity-90 transition-opacity shadow-lg">Save Coupon</button>
            </div>
          </form>
        </div>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="glass-card rounded-2xl p-5 border border-white/5 hover-lift">
          <div className="text-white/50 text-xs font-medium mb-1">Total Coupons</div>
          <div className="text-2xl font-bold text-white">{coupons.length}</div>
        </div>
        <div className="glass-card rounded-2xl p-5 border border-white/5 hover-lift">
          <div className="text-white/50 text-xs font-medium mb-1">Active Coupons</div>
          <div className="text-2xl font-bold text-green-400">{coupons.filter(c => c.active).length}</div>
        </div>
        <div className="glass-card rounded-2xl p-5 border border-white/5 hover-lift">
          <div className="text-white/50 text-xs font-medium mb-1">Inactive Coupons</div>
          <div className="text-2xl font-bold text-red-400">{coupons.filter(c => !c.active).length}</div>
        </div>
        <div className="glass-card rounded-2xl p-5 border border-white/5 hover-lift">
          <div className="text-white/50 text-xs font-medium mb-1">Total Uses</div>
          <div className="text-2xl font-bold text-brand-400">{coupons.reduce((acc, c) => acc + c.uses, 0)}</div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">Discount Coupons</h2>
          <p className="text-xs text-white/50 mt-0.5">Manage promo codes and discounts for customers</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="px-5 py-2.5 bg-gradient-to-r from-brand-600 to-purple-600 rounded-xl text-sm font-semibold flex items-center gap-2 hover:opacity-90 transition-opacity text-white"
        >
          <Icons.Plus size={16} /> Create Coupon
        </button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {coupons.map((c, i) => (
          <div key={c.id || i} className="glass-card rounded-2xl p-5 hover-lift relative group border border-white/5">
            <div className="flex items-start justify-between mb-3">
              <span className="font-mono text-lg font-bold text-brand-400">{c.code}</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => toggleStatus(i)}
                  className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${c.active ? 'bg-green-500/10 text-green-400 hover:bg-green-500/20' : 'bg-red-500/10 text-red-400 hover:bg-red-500/20'}`}
                >
                  {c.active ? 'Active' : 'Inactive'}
                </button>
                <button
                  type="button"
                  onClick={() => deleteCoupon(i)}
                  className="p-1.5 rounded-lg text-white/50 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                  title="Delete Coupon"
                >
                  <Icons.Trash size={14} />
                </button>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-white/50">Discount</span><span className="font-semibold text-white/90">{c.type === 'percent' ? `${c.discount}%` : `$${c.discount}`}</span></div>
              <div className="flex justify-between"><span className="text-white/50">Target</span><span className="text-right text-white/90 truncate max-w-[120px]" title={c.target === 'all' ? 'All Products' : mockProducts.find(p=>p.id===Number(c.target))?.name}>{c.target === 'all' ? 'All Products' : mockProducts.find(p=>p.id===Number(c.target))?.name || 'Specific'}</span></div>
              <div className="flex justify-between"><span className="text-white/50">Uses</span><span className="text-white/90">{c.uses}</span></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
