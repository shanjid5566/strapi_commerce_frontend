'use client';

import { useState } from 'react';
import { Icons } from '@/components/ui/Icons';

interface Brand {
  id: number;
  name: string;
  productCount: number;
}

const defaultBrands: Brand[] = [
  { id: 1, name: 'Apple', productCount: 12 },
  { id: 2, name: 'Samsung', productCount: 18 },
  { id: 3, name: 'Google', productCount: 8 },
  { id: 4, name: 'OnePlus', productCount: 6 },
  { id: 5, name: 'Xiaomi', productCount: 10 },
  { id: 6, name: 'Nothing', productCount: 4 },
  { id: 7, name: 'Realme', productCount: 7 },
];

export default function AdminBrandsPage() {
  const [brands, setBrands] = useState<Brand[]>(defaultBrands);
  const [newBrandName, setNewBrandName] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editBrandName, setEditBrandName] = useState('');

  const handleAddBrand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBrandName.trim()) return;
    setBrands([{ id: Date.now(), name: newBrandName.trim(), productCount: 0 }, ...brands]);
    setNewBrandName('');
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editBrandName.trim() || editingId === null) return;
    setBrands(brands.map(b => b.id === editingId ? { ...b, name: editBrandName.trim() } : b));
    setEditingId(null);
  };

  const handleDelete = (id: number) => {
    setBrands(brands.filter((b) => b.id !== id));
  };

  const startEdit = (brand: Brand) => {
    setEditingId(brand.id);
    setEditBrandName(brand.name);
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl">
      <div className="glass-card rounded-2xl p-6 border border-white/10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-white">Brand Management</h2>
            <p className="text-sm text-white/50 mt-1">Manage product brands and manufacturers</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-brand-500/10 rounded-lg text-brand-400 font-medium text-sm">
            <Icons.Tag size={16} /> {brands.length} Brands
          </div>
        </div>

        {/* Inline Add Brand Form */}
        <form onSubmit={handleAddBrand} className="flex flex-col sm:flex-row gap-3 mb-8 pb-8 border-b border-white/10">
          <input
            type="text"
            value={newBrandName}
            onChange={(e) => setNewBrandName(e.target.value)}
            placeholder="Enter new brand name..."
            className="flex-1 px-4 py-3 bg-black/30 border border-white/10 rounded-xl text-sm text-white placeholder-white/30 outline-none focus:border-brand-500"
          />
          <button
            type="submit"
            disabled={!newBrandName.trim()}
            className="px-6 py-3 bg-gradient-to-r from-brand-600 to-purple-600 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 text-white hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
          >
            <Icons.Plus size={16} /> Add Brand
          </button>
        </form>

        {/* Stacked List Layout */}
        <div className="space-y-3">
          {brands.length === 0 ? (
            <div className="text-center py-8 text-white/50 text-sm bg-white/5 rounded-xl border border-white/5">
              No brands added yet. Create your first brand above.
            </div>
          ) : (
            brands.map((brand) => (
              <div key={brand.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 glass rounded-xl border border-white/5 hover:bg-white/5 transition-colors gap-4">
                
                {editingId === brand.id ? (
                  <form onSubmit={handleSaveEdit} className="flex items-center gap-3 flex-1 w-full">
                    <input
                      type="text"
                      autoFocus
                      value={editBrandName}
                      onChange={(e) => setEditBrandName(e.target.value)}
                      className="flex-1 px-3 py-2 bg-black/30 border border-brand-500/50 rounded-lg text-sm text-white outline-none"
                    />
                    <button type="submit" className="p-2 glass rounded-lg text-green-400 hover:bg-green-500/20" title="Save">
                      <Icons.Check size={16} />
                    </button>
                    <button type="button" onClick={() => setEditingId(null)} className="p-2 glass rounded-lg text-white/50 hover:text-white" title="Cancel">
                      <Icons.X size={16} />
                    </button>
                  </form>
                ) : (
                  <>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center text-white/50 font-bold border border-white/5">
                        {brand.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-white">{brand.name}</h3>
                        <p className="text-xs text-white/40 mt-0.5">{brand.productCount} associated products</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 self-end sm:self-auto">
                      <button
                        onClick={() => startEdit(brand)}
                        className="p-2 glass rounded-lg text-brand-400 hover:bg-brand-500/20 border border-transparent transition-colors"
                        title="Edit Brand"
                      >
                        <Icons.Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(brand.id)}
                        className="p-2 glass rounded-lg text-red-400 hover:bg-red-500/20 border border-transparent transition-colors"
                        title="Delete Brand"
                      >
                        <Icons.Trash size={16} />
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
