'use client'

import { useState } from 'react'
import { Icons } from '@/components/ui/Icons'
import ProductImage from '@/components/ui/ProductImage'
import { mockOrders } from '@/data/orders'
import { mockProducts } from '@/data/products'
import { useAdmin } from '@/contexts/AdminContext'

import type { OrderStatus } from '@/types'

const statusOptions = ['all', 'pending', 'processing', 'shipped', 'delivered', 'cancelled']


export default function AdminOrders() {
  const { orders, setOrders } = useAdmin()

  const updateOrderStatus = (orderId: string, status: string) => {
    setOrders(orders.map(o => o.id === orderId ? { ...o, status: status as OrderStatus } : o))
  }
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [selectedOrder, setSelectedOrder] = useState<any>(null)

  const filteredOrders = mockOrders.filter(order => {
    const matchesFilter = filter === 'all' || order.status === filter
    const matchesSearch = order.id.toLowerCase().includes(search.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const stats = [
    { title: 'Total Orders', value: mockOrders.length, icon: Icons.ShoppingBag, gradient: 'from-blue-500 to-indigo-500' },
    { title: 'Pending', value: mockOrders.filter(o => o.status === 'pending').length, icon: Icons.Clock, gradient: 'from-yellow-500 to-orange-500' },
    { title: 'Processing', value: mockOrders.filter(o => o.status === 'processing').length, icon: Icons.Package, gradient: 'from-blue-500 to-cyan-500' },
    { title: 'Delivered', value: mockOrders.filter(o => o.status === 'delivered').length, icon: Icons.CheckCircle, gradient: 'from-emerald-500 to-teal-500' }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-emerald-500/20 text-emerald-400'
      case 'processing': return 'bg-blue-500/20 text-blue-400'
      case 'pending': return 'bg-yellow-500/20 text-yellow-400'
      case 'shipped': return 'bg-purple-500/20 text-purple-400'
      case 'cancelled': return 'bg-red-500/20 text-red-400'
      default: return 'bg-gray-500/20 text-gray-400'
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Orders Management</h1>

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
        <div className="flex flex-wrap gap-3 mb-6">
          {statusOptions.map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-xl font-medium transition-all capitalize ${
                filter === status
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white'
                  : 'bg-white/10 text-white/60 hover:bg-white/20'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        <div className="mb-6">
          <div className="relative">
            <Icons.Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
            <input
              type="text"
              placeholder="Search orders..."
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
                <th className="pb-3 font-medium">Order ID</th>
                <th className="pb-3 font-medium">Items</th>
                <th className="pb-3 font-medium">Total</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium">Date</th>
                <th className="pb-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="text-white hover:bg-white/5">
                  <td className="py-4 font-medium">{order.id}</td>
                  <td className="py-4">
                    <div className="flex -space-x-2">
                      {order.items.slice(0, 3).map((item, i) => {
                        const product = mockProducts.find(p => p.id === item.productId)
                        return (
                          <ProductImage
                            key={i}
                            image={product?.image || ''}
                            className="w-8 h-8 rounded-lg border-2 border-gray-900 object-cover"
                          />
                        )
                      })}
                      {order.items.length > 3 && (
                        <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center text-xs text-white border-2 border-gray-900">
                          +{order.items.length - 3}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="py-4 font-semibold">${order.total.toFixed(2)}</td>
                  <td className="py-4">
                    <select
                      value={order.status}
                      onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                      className={`px-3 py-1 rounded-lg text-sm font-medium ${getStatusColor(order.status)} bg-transparent border-none focus:outline-none cursor-pointer`}
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="py-4 text-white/60">{new Date(order.date).toLocaleDateString()}</td>
                  <td className="py-4">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="p-2 rounded-lg hover:bg-white/10 text-white/60 hover:text-white transition-colors"
                    >
                      <Icons.Eye className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="backdrop-blur-md bg-gray-900/90 border border-white/20 rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Order Details</h2>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-2 rounded-lg hover:bg-white/10 text-white/60 hover:text-white"
              >
                <Icons.X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 rounded-xl p-4">
                  <p className="text-white/60 text-sm mb-1">Customer</p>
                  <p className="text-white font-medium">{selectedOrder.customer?.name || 'Guest'}</p>
                  <p className="text-white/60 text-sm">{selectedOrder.customer?.email || 'N/A'}</p>
                </div>
                <div className="bg-white/5 rounded-xl p-4">
                  <p className="text-white/60 text-sm mb-1">Shipping Address</p>
                  <p className="text-white font-medium text-sm">{selectedOrder.shippingAddress || 'No address provided'}</p>
                </div>
              </div>

              <div>
                <p className="text-white/60 text-sm mb-3">Order Items</p>
                <div className="space-y-3">
                  {selectedOrder.items.map((item: { productId: number; qty: number }, i: number) => {
                    const product = mockProducts.find(p => p.id === item.productId)
                    return (
                      <div key={i} className="flex items-center gap-3 bg-white/5 rounded-xl p-3">
                        <ProductImage image={product?.image || ''} className="w-12 h-12 rounded-lg object-cover" />
                        <div className="flex-1">
                          <p className="text-white font-medium">{product?.name || `Product #${item.productId}`}</p>
                          <p className="text-white/60 text-sm">Qty: {item.qty}</p>
                        </div>
                        <p className="text-white font-semibold">${product ? (product.price * item.qty).toFixed(2) : '0.00'}</p>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <div>
                  <p className="text-white/60 text-sm">Total</p>
                  <p className="text-2xl font-bold text-white">${selectedOrder.total.toFixed(2)}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-white/60">Status:</span>
                  <select
                    value={selectedOrder.status}
                    onChange={(e) => {
                      updateOrderStatus(selectedOrder.id, e.target.value)
                      setSelectedOrder({ ...selectedOrder, status: e.target.value })
                    }}
                    className={`px-3 py-1 rounded-lg text-sm font-medium ${getStatusColor(selectedOrder.status)} bg-transparent border-none focus:outline-none cursor-pointer`}
                  >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
