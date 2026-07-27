'use client'

import { useState } from 'react'
import { Icons } from '@/components/ui/Icons'

const initialBrands = [
  'Apple', 'Samsung', 'Google', 'OnePlus', 'Xiaomi', 'Nothing'
]

export default function AdminBrands() {
  const [brands, setBrands] = useState(initialBrands)
  const [newBrand, setNewBrand] = useState('')

  const handleAddBrand = () => {
    if (newBrand.trim() && !brands.includes(newBrand.trim())) {
      setBrands([...brands, newBrand.trim()])
      setNewBrand('')
    }
  }

  const handleDeleteBrand = (brand: string) => {
    setBrands(brands.filter(b => b !== brand))
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Brands Management</h1>

      <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6">
        <div className="flex gap-3">
          <input
            type="text"
            value={newBrand}
            onChange={(e) => setNewBrand(e.target.value)}
            placeholder="Enter brand name"
            className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-indigo-500"
            onKeyDown={(e) => e.key === 'Enter' && handleAddBrand()}
          />
          <button
            onClick={handleAddBrand}
            className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl font-medium hover:from-indigo-600 hover:to-purple-600 transition-all flex items-center gap-2"
          >
            <Icons.Plus className="w-5 h-5" />
            Add Brand
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {brands.map((brand) => (
          <div
            key={brand}
            className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-4 flex items-center justify-between"
          >
            <span className="text-white font-medium">{brand}</span>
            <button
              onClick={() => handleDeleteBrand(brand)}
              className="p-2 rounded-lg hover:bg-red-500/20 text-white/60 hover:text-red-400 transition-colors"
            >
              <Icons.Trash className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {brands.length === 0 && (
        <div className="text-center py-12 text-white/60">
          No brands added yet. Add your first brand above.
        </div>
      )}
    </div>
  )
}
