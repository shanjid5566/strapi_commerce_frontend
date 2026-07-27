'use client'

import { useState } from 'react'
import { Icons } from '@/components/ui/Icons'
import { mockProducts } from '@/data/products'

const initialCoupons = [
  { id: '1', code: 'WELCOME20', type: 'percentage', discount: 20, target: 'all', uses: 156, active: true },
  { id: '2', code: 'SUMMER10', type: 'fixed', discount: 10, target: 'all', uses: 89, active: true },
  { id: '3', code: 'VIP50', type: 'percentage', discount: 50, target: 'specific', uses: 23, active: false }
]

export default function AdminCoupons() {

  const [coupons, setCoupons] = useState(initialCoupons)
  const [showModal, setShowModal] = useState(false)
  const [newCoupon, setNewCoupon] = useState({
    code: '',
    type: 'percentage',
    discount: 0,
    target: 'all',
    specificProducts: [] as string[]
  })
  const [productSearch, setProductSearch] = useState('')

  const stats = [
    { title: 'Total Coupons', value: coupons.length, icon: Icons.Tag, gradient: 'from-blue-500 to-indigo-500' },
    { title: 'Active', value: coupons.filter(c => c.active).length, icon: Icons.CheckCircle, gradient: 'from-emerald-500 to-teal-500' },
    { title: 'Inactive', value: coupons.filter(c => !c.active).length, icon: Icons.XCircle, gradient: 'from-red-500 to-pink-500' },
    { title: 'Total Uses', value: coupons.reduce((sum, c) => sum + c.uses, 0), icon: Icons.BarChart, gradient: 'from-purple-500 to-pink-500' }
  ]

  const toggleActive = (couponId: string) => {
    setCoupons(coupons.map(c =>
      c.id === couponId ? { ...c, active: !c.active } : c
    ))
  }

  const handleCreate = () => {
    if (newCoupon.code && newCoupon.discount > 0) {
      const coupon = {
        id: Date.now().toString(),
        ...newCoupon,
        uses: 0,
        active: true
      }
      setCoupons([...coupons, coupon])
      setShowModal(false)
      setNewCoupon({ code: '', type: 'percentage', discount: 0, target: 'all', specificProducts: [] })
    }
  }

  const handleDelete = (couponId: string) => {
    setCoupons(coupons.filter(c => c.id !== couponId))
  }

  const filteredProducts = mockProducts.filter(p =>
    p.name.toLowerCase().includes(productSearch.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Coupons Management</h1>
        <button
          onClick={() => setShowModal(true)}
          className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl font-medium hover:from-indigo-600 hover:to-purple-600 transition-all flex items-center gap-2"
        >
          <Icons.Plus className="w-5 h-5" />
          Create Coupon
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.title} className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/60 text-sm">{stat.title}</p>
                <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {coupons.map((coupon) => (
          <div key={coupon.id} className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <code className="text-xl font-mono font-bold text-white bg-white/10 px-3 py-1 rounded-lg">
                {coupon.code}
              </code>
              <button
                onClick={() => toggleActive(coupon.id)}
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  coupon.active ? 'bg-emerald-500/20 text-emerald-400' : 'bg-gray-500/20 text-gray-400'
                }`}
              >
                {coupon.active ? 'Active' : 'Inactive'}
              </button>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-white/60">Discount</span>
                <span className="text-white font-medium">
                  {coupon.type === 'percentage' ? `${coupon.discount}%` : `$${coupon.discount}`}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/60">Target</span>
                <span className="text-white font-medium capitalize">{coupon.target}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/60">Uses</span>
                <span className="text-white font-medium">{coupon.uses}</span>
              </div>
            </div>

            <button
              onClick={() => handleDelete(coupon.id)}
              className="w-full py-2 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors flex items-center justify-center gap-2"
            >
              <Icons.Trash className="w-4 h-4" />
              Delete
            </button>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="backdrop-blur-md bg-gray-900/90 border border-white/20 rounded-2xl p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Create Coupon</h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 rounded-lg hover:bg-white/10 text-white/60 hover:text-white"
              >
                <Icons.X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-white/80 text-sm mb-2">Coupon Code</label>
                <input
                  type="text"
                  value={newCoupon.code}
                  onChange={(e) => setNewCoupon({ ...newCoupon, code: e.target.value.toUpperCase() })}
                  placeholder="e.g., SAVE20"
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-indigo-500 font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/80 text-sm mb-2">Type</label>
                  <select
                    value={newCoupon.type}
                    onChange={(e) => setNewCoupon({ ...newCoupon, type: e.target.value })}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="percentage">Percentage (%)</option>
                    <option value="fixed">Fixed ($)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-white/80 text-sm mb-2">Discount Value</label>
                  <input
                    type="number"
                    value={newCoupon.discount || ''}
                    onChange={(e) => setNewCoupon({ ...newCoupon, discount: Number(e.target.value) })}
                    placeholder="0"
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white/80 text-sm mb-2">Target</label>
                <select
                  value={newCoupon.target}
                  onChange={(e) => setNewCoupon({ ...newCoupon, target: e.target.value })}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="all">All Products</option>
                  <option value="specific">Specific Products</option>
                </select>
              </div>

              {newCoupon.target === 'specific' && (
                <div>
                  <label className="block text-white/80 text-sm mb-2">Search Products</label>
                  <input
                    type="text"
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                    placeholder="Search products..."
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-indigo-500"
                  />
                  {productSearch && (
                    <div className="mt-2 max-h-40 overflow-y-auto bg-white/5 rounded-xl">
                      {filteredProducts.slice(0, 5).map((product) => (
                        <div
                          key={product.id}
                          className="px-4 py-2 hover:bg-white/10 cursor-pointer text-white text-sm"
                          onClick={() => {
                            setNewCoupon({
                              ...newCoupon,
                              specificProducts: [...newCoupon.specificProducts, String(product.id)]
                            })
                            setProductSearch('')
                          }}
                        >
                          {product.name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              <button
                onClick={handleCreate}
                disabled={!newCoupon.code || newCoupon.discount <= 0}
                className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl font-medium hover:from-indigo-600 hover:to-purple-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Create Coupon
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
