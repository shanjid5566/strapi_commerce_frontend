'use client'

import { useState } from 'react'
import { Icons } from '@/components/ui/Icons'
import ProductImage from '@/components/ui/ProductImage'
import { mockProducts } from '@/data/products'
import type { Product } from '@/types'

type ViewMode = 'list' | 'form' | 'detail'

const badges = ['New', 'Sale', 'Popular', 'Trending', 'Limited']

export default function AdminProducts() {
  const [view, setView] = useState<ViewMode>('list')
  const [products, setProducts] = useState(mockProducts)
  const [search, setSearch] = useState('')
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [formData, setFormData] = useState({
    name: '',
    brand: 'Apple',
    badge: '',
    images: [''],
    mainImageIndex: 0,
    description: '',
    price: 0,
    originalPrice: 0,
    stock: 0,
    specs: [{ key: '', value: '' }]
  })

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.brand.toLowerCase().includes(search.toLowerCase())
  )

  const stats = [
    { title: 'Total Products', value: products.length, icon: Icons.Package, gradient: 'from-blue-500 to-indigo-500' },
    { title: 'Active Brands', value: new Set(products.map((p) => p.brand)).size, icon: Icons.Tag, gradient: 'from-purple-500 to-pink-500' },
    { title: 'Low Stock', value: products.filter((p) => p.stock < 10).length, icon: Icons.AlertTriangle, gradient: 'from-orange-500 to-red-500' },
    { title: 'Avg Price', value: `$${(products.reduce((sum, p) => sum + p.price, 0) / products.length).toFixed(0)}`, icon: Icons.DollarSign, gradient: 'from-emerald-500 to-teal-500' }
  ]

  const getStockColor = (stock: number) => {
    if (stock > 20) return 'bg-emerald-500/20 text-emerald-400'
    if (stock > 10) return 'bg-yellow-500/20 text-yellow-400'
    return 'bg-red-500/20 text-red-400'
  }

  const handleView = (product: typeof mockProducts[0]) => {
    setSelectedProduct(product)
    setSelectedImageIndex(0)
    setView('detail')
  }

  const handleEdit = (product: typeof mockProducts[0]) => {
    setSelectedProduct(product)
    setFormData({
      name: product.name,
      brand: product.brand,
      badge: product.badge || '',
      images: product.images ? product.images.map((img) => img.url) : [product.image],
      mainImageIndex: 0,
      description: product.description || '',
      price: product.price,
      originalPrice: product.originalPrice || product.price,
      stock: product.stock,
      specs: product.specs ? Object.entries(product.specs).map(([key, value]) => ({ key, value: value as string })) : [{ key: '', value: '' }]
    })
    setView('form')
  }

  const handleAdd = () => {
    setSelectedProduct(null)
    setFormData({
      name: '',
      brand: 'Apple',
      badge: '',
      images: [''],
      mainImageIndex: 0,
      description: '',
      price: 0,
      originalPrice: 0,
      stock: 0,
      specs: [{ key: '', value: '' }]
    })
    setView('form')
  }

  const handleSave = () => {
    const specsRecord: Record<string, string> = {}
    formData.specs.forEach((s) => { if (s.key) specsRecord[s.key] = s.value })

    if (selectedProduct) {
      setProducts(products.map((p) =>
        p.id === selectedProduct.id ? {
          ...p,
          name: formData.name,
          brand: formData.brand,
          badge: formData.badge,
          description: formData.description,
          price: formData.price,
          originalPrice: formData.originalPrice,
          stock: formData.stock,
          specs: specsRecord,
          image: formData.images[0] || p.image,
        } : p
      ))
    } else {
      const newProduct: Product = {
        id: Date.now(),
        name: formData.name,
        brand: formData.brand,
        badge: formData.badge,
        description: formData.description,
        price: formData.price,
        originalPrice: formData.originalPrice,
        stock: formData.stock,
        specs: specsRecord,
        image: formData.images[0] || '',
        rating: 0,
        reviews: 0,
        category: 'general',
        colors: [],
      }
      setProducts([...products, newProduct])
    }
    setView('list')
  }

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter((p) => p.id !== id))
    }
  }

  const addSpec = () => {
    setFormData({ ...formData, specs: [...formData.specs, { key: '', value: '' }] })
  }

  const removeSpec = (index: number) => {
    setFormData({ ...formData, specs: formData.specs.filter((_: { key: string; value: string }, i: number) => i !== index) })
  }

  const updateSpec = (index: number, field: 'key' | 'value', value: string) => {
    const newSpecs = [...formData.specs]
    newSpecs[index][field] = value
    setFormData({ ...formData, specs: newSpecs })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Products Management</h1>
        {view === 'list' && (
          <button
            onClick={handleAdd}
            className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl font-medium hover:from-indigo-600 hover:to-purple-600 transition-all flex items-center gap-2"
          >
            <Icons.Plus className="w-5 h-5" />
            Add Product
          </button>
        )}
      </div>

      {view === 'list' && (
        <>
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

          <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6">
            <div className="mb-6">
              <div className="relative">
                <Icons.Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-xl pl-12 pr-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-white/60 border-b border-white/10">
                    <th className="pb-3 font-medium">Product</th>
                    <th className="pb-3 font-medium">Brand</th>
                    <th className="pb-3 font-medium">Price</th>
                    <th className="pb-3 font-medium">Stock</th>
                    <th className="pb-3 font-medium">Rating</th>
                    <th className="pb-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {filteredProducts.map((product) => (
                    <tr key={product.id} className="text-white hover:bg-white/5">
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <ProductImage
                            image={product.images?.[0]?.url || product.image}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                          <span className="font-medium">{product.name}</span>
                        </div>
                      </td>
                      <td className="py-4 text-white/60">{product.brand}</td>
                      <td className="py-4 font-semibold">${product.price}</td>
                      <td className="py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStockColor(product.stock)}`}>
                          {product.stock}
                        </span>
                      </td>
                      <td className="py-4">
                        <div className="flex items-center gap-1">
                          <Icons.Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                          <span>{product.rating || '4.5'}</span>
                        </div>
                      </td>
                      <td className="py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleView(product)}
                            className="p-2 rounded-lg hover:bg-white/10 text-white/60 hover:text-white transition-colors"
                          >
                            <Icons.Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleEdit(product)}
                            className="p-2 rounded-lg hover:bg-white/10 text-white/60 hover:text-white transition-colors"
                          >
                            <Icons.Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="p-2 rounded-lg hover:bg-red-500/20 text-white/60 hover:text-red-400 transition-colors"
                          >
                            <Icons.Trash className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {view === 'form' && (
        <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6">
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => setView('list')}
              className="p-2 rounded-lg hover:bg-white/10 text-white/60 hover:text-white"
            >
              <Icons.ArrowLeft className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-bold text-white">
              {selectedProduct ? 'Edit Product' : 'Add New Product'}
            </h2>
          </div>

          <div className="space-y-8">
            <div className="bg-white/5 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">General Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/80 text-sm mb-2">Product Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter product name"
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-white/80 text-sm mb-2">Brand</label>
                  <select
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="Apple">Apple</option>
                    <option value="Samsung">Samsung</option>
                    <option value="Google">Google</option>
                    <option value="OnePlus">OnePlus</option>
                    <option value="Xiaomi">Xiaomi</option>
                    <option value="Nothing">Nothing</option>
                  </select>
                </div>
                <div>
                  <label className="block text-white/80 text-sm mb-2">Badge</label>
                  <select
                    value={formData.badge}
                    onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="">No Badge</option>
                    {badges.map((badge) => (
                      <option key={badge} value={badge}>{badge}</option>
                    ))}
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-white/80 text-sm mb-2">Images</label>
                  <div className="space-y-3">
                    {formData.images.map((image, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="mainImage"
                          checked={formData.mainImageIndex === index}
                          onChange={() => setFormData({ ...formData, mainImageIndex: index })}
                          className="w-4 h-4"
                        />
                        <input
                          type="text"
                          value={image}
                          onChange={(e) => {
                            const newImages = [...formData.images]
                            newImages[index] = e.target.value
                            setFormData({ ...formData, images: newImages })
                          }}
                          placeholder="Image URL"
                          className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-indigo-500"
                        />
                        {formData.images.length > 1 && (
                          <button
                            onClick={() => setFormData({ ...formData, images: formData.images.filter((_, i) => i !== index) })}
                            className="p-2 rounded-lg hover:bg-red-500/20 text-white/60 hover:text-red-400"
                          >
                            <Icons.X className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      onClick={() => setFormData({ ...formData, images: [...formData.images, ''] })}
                      className="flex items-center gap-2 text-white/60 hover:text-white"
                    >
                      <Icons.Plus className="w-4 h-4" />
                      Add Image
                    </button>
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-white/80 text-sm mb-2">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Product description..."
                    rows={4}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-indigo-500 resize-none"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Pricing & Inventory</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-white/80 text-sm mb-2">Sale Price</label>
                  <input
                    type="number"
                    value={formData.price || ''}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    placeholder="0"
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-white/80 text-sm mb-2">Original Price</label>
                  <input
                    type="number"
                    value={formData.originalPrice || ''}
                    onChange={(e) => setFormData({ ...formData, originalPrice: Number(e.target.value) })}
                    placeholder="0"
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-white/80 text-sm mb-2">Stock</label>
                  <input
                    type="number"
                    value={formData.stock || ''}
                    onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                    placeholder="0"
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Technical Specifications</h3>
                <button
                  onClick={addSpec}
                  className="flex items-center gap-2 text-white/60 hover:text-white"
                >
                  <Icons.Plus className="w-4 h-4" />
                  Add Spec
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {formData.specs.map((spec, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <input
                      type="text"
                      value={spec.key}
                      onChange={(e) => updateSpec(index, 'key', e.target.value)}
                      placeholder="Key (e.g., Display)"
                      className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-indigo-500"
                    />
                    <input
                      type="text"
                      value={spec.value}
                      onChange={(e) => updateSpec(index, 'value', e.target.value)}
                      placeholder="Value (e.g., 6.1 inch)"
                      className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-indigo-500"
                    />
                    <button
                      onClick={() => removeSpec(index)}
                      className="p-2 rounded-lg hover:bg-red-500/20 text-white/60 hover:text-red-400"
                    >
                           <Icons.Trash className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={handleSave}
                disabled={!formData.name}
                className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl font-medium hover:from-indigo-600 hover:to-purple-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {selectedProduct ? 'Update Product' : 'Add Product'}
              </button>
              <button
                onClick={() => setView('list')}
                className="px-6 py-3 bg-white/10 text-white rounded-xl font-medium hover:bg-white/20 transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {view === 'detail' && selectedProduct && (
        <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6">
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => setView('list')}
              className="p-2 rounded-lg hover:bg-white/10 text-white/60 hover:text-white"
            >
              <Icons.ArrowLeft className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-bold text-white flex-1">Product Details</h2>
            <button
              onClick={() => handleEdit(selectedProduct)}
              className="px-4 py-2 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-all flex items-center gap-2"
            >
              <Icons.Edit className="w-4 h-4" />
              Edit
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <div className="aspect-square rounded-2xl overflow-hidden bg-white/5 mb-4">
                <ProductImage
                  image={selectedProduct.images?.[selectedImageIndex]?.url || selectedProduct.image}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {selectedProduct.images.map((image: { url: string; isMain: boolean }, index: number) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImageIndex === index ? 'border-indigo-500' : 'border-transparent'
                    }`}
                  >
                    <ProductImage image={image.url} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <p className="text-white/60 text-sm mb-1">{selectedProduct.brand}</p>
                <h3 className="text-2xl font-bold text-white">{selectedProduct.name}</h3>
                <div className="flex items-center gap-2 mt-2">
                  <Icons.Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  <span className="text-white">{selectedProduct.rating || '4.5'}</span>
                  <span className="text-white/60">({selectedProduct.reviews || 128} reviews)</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/20 text-emerald-400">
                  In Stock ({selectedProduct.stock})
                </span>
                {selectedProduct.badge && (
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-indigo-500/20 text-indigo-400">
                    {selectedProduct.badge}
                  </span>
                )}
              </div>

              <div>
                <p className="text-3xl font-bold text-white">${selectedProduct.price}</p>
                {selectedProduct.originalPrice && selectedProduct.originalPrice > selectedProduct.price && (
                  <p className="text-white/60 line-through">${selectedProduct.originalPrice}</p>
                )}
              </div>

              <div>
                <p className="text-white/60 text-sm mb-2">Overview</p>
                <p className="text-white/80">{selectedProduct.description || 'No description available.'}</p>
              </div>

              {selectedProduct.specs && Object.keys(selectedProduct.specs).length > 0 && (
                <div>
                  <p className="text-white/60 text-sm mb-2">Specifications</p>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(selectedProduct.specs).map(([key, value]) => (
                      <div key={key} className="bg-white/5 rounded-lg p-3">
                        <p className="text-white/60 text-xs">{key}</p>
                        <p className="text-white font-medium">{value as string}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
