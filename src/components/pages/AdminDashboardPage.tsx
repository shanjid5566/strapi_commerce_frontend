'use client';

import { useState } from 'react';
import { useAdmin } from '@/contexts/AdminContext';
import { Icons } from '@/components/ui/Icons';
import ProductImage from '@/components/ui/ProductImage';
import { mockProducts } from '@/data/products';

const monthlyRevenue = [
  { month: 'Jan', value: 18200 },
  { month: 'Feb', value: 22400 },
  { month: 'Mar', value: 19800 },
  { month: 'Apr', value: 24600 },
  { month: 'May', value: 21300 },
  { month: 'Jun', value: 28100 },
  { month: 'Jul', value: 26500 },
  { month: 'Aug', value: 31200 },
  { month: 'Sep', value: 29800 },
  { month: 'Oct', value: 33400 },
  { month: 'Nov', value: 27600 },
  { month: 'Dec', value: 24300 },
];

const maxRevenue = Math.max(...monthlyRevenue.map((m) => m.value));

export default function AdminDashboardPage() {
  const { orders } = useAdmin();
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);

  const stats = [
    {
      label: 'Total Revenue',
      value: '$284.7K',
      change: 12.5,
      icon: Icons.TrendUp,
      color: 'from-brand-500 to-purple-500',
    },
    {
      label: 'Total Orders',
      value: '1,847',
      change: 8.3,
      icon: Icons.Package,
      color: 'from-green-500 to-emerald-500',
    },
    {
      label: 'Total Users',
      value: '12.5K',
      change: 15.2,
      icon: Icons.Users,
      color: 'from-orange-500 to-amber-500',
    },
    {
      label: 'Conversion',
      value: '3.8%',
      change: -0.5,
      icon: Icons.Zap,
      color: 'from-pink-500 to-rose-500',
    },
  ];

  const statusColors: Record<string, string> = {
    delivered: 'bg-green-500',
    shipped: 'bg-blue-500',
    processing: 'bg-yellow-500',
    pending: 'bg-gray-500',
    cancelled: 'bg-red-500',
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Stats Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <div key={i} className="glass-card rounded-2xl p-5 hover-lift">
            <div className="flex items-center justify-between mb-3">
              <div
                className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center opacity-80`}
              >
                <s.icon size={20} className="text-white" />
              </div>
              <div
                className={`flex items-center gap-1 text-xs font-medium ${
                  s.change >= 0 ? 'text-green-400' : 'text-red-400'
                }`}
              >
                {s.change >= 0 ? <Icons.TrendUp size={12} /> : <Icons.TrendDown size={12} />}
                {Math.abs(s.change)}%
              </div>
            </div>
            <p className="text-2xl font-bold">{s.value}</p>
            <p className="text-xs text-gray-400 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Revenue Chart */}
      <div className="glass-card rounded-2xl p-6">
        <h2 className="text-lg font-bold mb-6">Revenue Overview</h2>
        <div className="flex items-end gap-2 h-48">
          {monthlyRevenue.map((val, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full relative group">
                <div
                  className="w-full bg-gradient-to-t from-brand-600 to-brand-400 rounded-t-md hover:from-brand-500 hover:to-purple-400 cursor-pointer transition-all"
                  style={{ height: `${(val.value / maxRevenue) * 160}px` }}
                  onMouseEnter={() => setHoveredBar(i)}
                  onMouseLeave={() => setHoveredBar(null)}
                >
                  {hoveredBar === i && (
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-800 rounded text-xs whitespace-nowrap">
                      ${(val.value / 1000).toFixed(1)}K
                    </div>
                  )}
                </div>
              </div>
              <span className="text-[10px] text-gray-500">{val.month}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Orders & Products */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="glass-card rounded-2xl p-6">
          <h2 className="text-lg font-bold mb-4">Recent Orders</h2>
          <div className="space-y-3">
            {orders.slice(0, 5).map((o) => (
              <div
                key={o.id}
                className="flex items-center justify-between py-2 border-b border-white/5 last:border-0"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${statusColors[o.status] || 'bg-gray-500'}`} />
                  <div>
                    <p className="text-sm font-medium">Order #{o.id}</p>
                    <p className="text-xs text-gray-500">{o.items.length} items</p>
                  </div>
                </div>
                <span className="text-sm font-medium">${o.total}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card rounded-2xl p-6">
          <h2 className="text-lg font-bold mb-4">Top Products</h2>
          <div className="space-y-3">
            {mockProducts.slice(0, 5).map((p, i) => (
              <div
                key={p.id}
                className="flex items-center gap-3 py-2 border-b border-white/5 last:border-0"
              >
                <span className="text-sm font-bold text-gray-500 w-5">#{i + 1}</span>
                <div className="w-10 h-10 flex-shrink-0">
                  <ProductImage product={p} size="sm" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{p.name}</p>
                  <p className="text-xs text-gray-500">{p.brand}</p>
                </div>
                <span className="text-sm font-bold">${p.price}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
