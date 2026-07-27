'use client'

import { useState } from 'react'
import { Icons } from '@/components/ui/Icons'
import ProductImage from '@/components/ui/ProductImage'
import { analyticsData } from '@/data/analytics'
import { mockOrders } from '@/data/orders'
import { mockProducts } from '@/data/products'

const stats = [
  {
    title: 'Total Revenue',
    value: '$284.7K',
    change: '+12.5%',
    positive: true,
    icon: Icons.DollarSign,
    gradient: 'from-emerald-500 to-teal-500'
  },
  {
    title: 'Total Orders',
    value: '1,847',
    change: '+8.3%',
    positive: true,
    icon: Icons.ShoppingBag,
    gradient: 'from-blue-500 to-indigo-500'
  },
  {
    title: 'Total Users',
    value: '12.5K',
    change: '+15.2%',
    positive: true,
    icon: Icons.Users,
    gradient: 'from-purple-500 to-pink-500'
  },
  {
    title: 'Conversion',
    value: '3.8%',
    change: '-0.5%',
    positive: false,
    icon: Icons.TrendUp,
    gradient: 'from-orange-500 to-red-500'
  }
]

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const revenueData = [18, 22, 19, 25, 28, 24, 30, 27, 32, 29, 35, 38]

export default function AdminDashboard() {
  const [hoveredBar, setHoveredBar] = useState<number | null>(null)

  const recentOrders = mockOrders.slice(0, 5)
  const topProducts = mockProducts.slice(0, 5)

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/60 text-sm">{stat.title}</p>
                <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                <div className="flex items-center mt-2">
                  {stat.positive ? (
                    <Icons.ArrowUp className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Icons.ArrowDown className="w-4 h-4 text-red-400" />
                  )}
                  <span className={`text-sm ml-1 ${stat.positive ? 'text-emerald-400' : 'text-red-400'}`}>
                    {stat.change}
                  </span>
                </div>
              </div>
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Revenue Overview</h2>
        <div className="flex items-end justify-between h-48">
          {revenueData.map((value, index) => (
            <div
              key={index}
              className="relative flex flex-col items-center"
              onMouseEnter={() => setHoveredBar(index)}
              onMouseLeave={() => setHoveredBar(null)}
            >
              {hoveredBar === index && (
                <div className="absolute -top-8 bg-gray-900 text-white text-xs px-2 py-1 rounded">
                  ${value}K
                </div>
              )}
              <div
                className="w-8 bg-gradient-to-t from-indigo-500 to-purple-500 rounded-t-lg transition-all hover:from-indigo-400 hover:to-purple-400"
                style={{ height: `${(value / 40) * 100}%` }}
              />
              <span className="text-white/60 text-xs mt-2">{months[index]}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Recent Orders</h2>
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${
                    order.status === 'delivered' ? 'bg-emerald-400' :
                    order.status === 'processing' ? 'bg-blue-400' :
                    order.status === 'pending' ? 'bg-yellow-400' : 'bg-gray-400'
                  }`} />
                  <div>
                    <p className="text-white font-medium">{order.id}</p>
                    <p className="text-white/60 text-sm">{order.items.length} items</p>
                  </div>
                </div>
                <p className="text-white font-semibold">${order.total.toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Top Products</h2>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div
                key={product.id}
                className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
              >
                <span className="text-white/60 font-medium w-6">#{index + 1}</span>
                <ProductImage
                  image={product.images?.[0]?.url || product.image}
                  className="w-10 h-10 rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium truncate">{product.name}</p>
                  <p className="text-white/60 text-sm">{product.brand}</p>
                </div>
                <p className="text-white font-semibold">${product.price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
