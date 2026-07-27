'use client';

import { useState } from 'react';
import { useAdmin } from '@/contexts/AdminContext';
import { Icons } from '@/components/ui/Icons';
import { mockProducts } from '@/data/products';
import ProductImage from '@/components/ui/ProductImage';

export default function AdminOrdersPage() {
  const { orders, setOrders } = useAdmin();
  const [statusFilter, setStatusFilter] = useState('all');
  const [orderSearch, setOrderSearch] = useState('');
  const [viewOrder, setViewOrder] = useState<any>(null);

  const statusColors: Record<string, string> = {
    delivered: 'text-green-400 bg-green-500/10',
    shipped: 'text-blue-400 bg-blue-500/10',
    processing: 'text-yellow-400 bg-yellow-500/10',
    pending: 'text-gray-400 bg-gray-500/10',
    cancelled: 'text-red-400 bg-red-500/10'
  };

  const filtered = orders.filter((o) => {
    const matchesStatus = statusFilter === 'all' || o.status === statusFilter;
    const matchesSearch =
      o.id.toLowerCase().includes(orderSearch.toLowerCase()) || String(o.total).includes(orderSearch);
    return matchesStatus && matchesSearch;
  });

  const updateOrderStatus = (id: string, newStatus: string) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status: newStatus as any } : o)));
  };

  return (
    <div className="space-y-6 animate-fade-in relative max-w-6xl">
      {viewOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in" onClick={() => setViewOrder(null)}>
          <div className="glass-card rounded-3xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-scale-in relative border border-white/10 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setViewOrder(null)} className="absolute top-4 right-4 p-2 hover:bg-white/5 rounded-lg text-white/50 hover:text-white transition-colors">
              <Icons.X size={18} />
            </button>
            <h2 className="text-2xl font-bold mb-2 text-white">Order Details</h2>
            <div className="flex items-center gap-4 mb-6">
              <span className="text-sm font-mono text-brand-400 font-bold">{viewOrder.id}</span>
              <select
                value={viewOrder.status}
                onChange={(e) => {
                  updateOrderStatus(viewOrder.id, e.target.value);
                  setViewOrder({ ...viewOrder, status: e.target.value });
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase cursor-pointer appearance-none outline-none border border-white/5 ${statusColors[viewOrder.status]}`}
              >
                {['pending', 'processing', 'shipped', 'delivered', 'cancelled'].map((s) => (
                  <option key={s} value={s} className="bg-gray-900 text-white">
                    {s.toUpperCase()}
                  </option>
                ))}
              </select>
              <span className="text-sm text-white/40 font-medium">{viewOrder.date}</span>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="glass p-5 rounded-2xl border border-white/5">
                <h3 className="text-sm font-semibold mb-3 text-white/70 uppercase tracking-wider">Customer Info</h3>
                <p className="font-medium text-white text-lg">Alex Johnson</p>
                <p className="text-sm text-white/50 mt-1">alex@demo.com</p>
                <p className="text-sm text-white/50 mt-1">+1 (555) 012-3456</p>
              </div>
              <div className="glass p-5 rounded-2xl border border-white/5">
                <h3 className="text-sm font-semibold mb-3 text-white/70 uppercase tracking-wider">Shipping Address</h3>
                <p className="text-sm text-white/50 leading-relaxed font-medium">
                  142 Wythe Avenue<br />
                  Apt 4B<br />
                  Brooklyn, NY 11249<br />
                  United States
                </p>
              </div>
            </div>

            <h3 className="text-sm font-semibold mb-3 text-white/70 uppercase tracking-wider">Order Items</h3>
            <div className="space-y-3 mb-6">
              {viewOrder.items.map((item: any, idx: number) => {
                const product = mockProducts.find((p) => p.id === item.productId);
                return product ? (
                  <div key={idx} className="flex items-center gap-4 p-3 glass rounded-xl border border-white/5">
                    <div className="w-14 h-14 rounded-lg overflow-hidden border border-white/10 flex-shrink-0 bg-white/5 flex items-center justify-center">
                      <ProductImage product={product} size="sm" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-bold text-white">{product.name}</h4>
                      <p className="text-xs text-white/50 mt-0.5">
                        Qty: {item.qty} &times; ${product.price}
                      </p>
                    </div>
                    <span className="font-bold text-sm text-white">${product.price * item.qty}</span>
                  </div>
                ) : null;
              })}
            </div>

            <div className="flex justify-between items-center p-5 bg-gradient-to-r from-brand-900/40 to-purple-900/40 rounded-2xl border border-brand-500/20">
              <span className="font-bold text-white/70 uppercase tracking-wider text-sm">Total Amount</span>
              <span className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-purple-400">
                ${viewOrder.total.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="glass-card rounded-2xl p-5 border border-white/5 hover-lift">
          <div className="text-white/50 text-xs font-medium mb-1">Total Orders</div>
          <div className="text-2xl font-bold text-white">{orders.length}</div>
        </div>
        <div className="glass-card rounded-2xl p-5 border border-white/5 hover-lift">
          <div className="text-white/50 text-xs font-medium mb-1">Pending</div>
          <div className="text-2xl font-bold text-white/50">{orders.filter((o) => o.status === 'pending').length}</div>
        </div>
        <div className="glass-card rounded-2xl p-5 border border-white/5 hover-lift">
          <div className="text-white/50 text-xs font-medium mb-1">Processing</div>
          <div className="text-2xl font-bold text-yellow-400">{orders.filter((o) => o.status === 'processing').length}</div>
        </div>
        <div className="glass-card rounded-2xl p-5 border border-white/5 hover-lift">
          <div className="text-white/50 text-xs font-medium mb-1">Delivered</div>
          <div className="text-2xl font-bold text-green-400">{orders.filter((o) => o.status === 'delivered').length}</div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
        <div className="flex flex-wrap gap-2">
          {['all', 'pending', 'processing', 'shipped', 'delivered', 'cancelled'].map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                statusFilter === s ? 'bg-gradient-to-r from-brand-600 to-purple-600 text-white shadow-lg shadow-brand-500/20' : 'glass text-white/50 hover:text-white'
              }`}
            >
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
        <div className="relative w-full sm:w-64">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40">
            <Icons.Search size={18} />
          </div>
          <input
            type="text"
            value={orderSearch}
            onChange={(e) => setOrderSearch(e.target.value)}
            placeholder="Search orders..."
            className="w-full pl-10 pr-4 py-2.5 glass rounded-xl text-sm text-white placeholder-white/30 outline-none focus:border-brand-500/50"
          />
        </div>
      </div>

      <div className="glass-card rounded-2xl overflow-hidden border border-white/10">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/5 bg-white/5">
                {['Order ID', 'Items', 'Total', 'Status', 'Date', 'Action'].map((h) => (
                  <th key={h} className={`px-5 py-4 text-xs font-semibold text-white/50 uppercase tracking-wider ${h === 'Action' ? 'text-right' : ''}`}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map((o) => {
                const products = o.items.map((i) => mockProducts.find((p) => p.id === i.productId)).filter(Boolean);
                return (
                  <tr key={o.id} className="hover:bg-white/5 transition-colors group">
                    <td className="px-5 py-4 text-sm font-mono text-brand-400 font-bold">{o.id}</td>
                    <td className="px-5 py-4">
                      <div className="flex -space-x-2">
                        {products.slice(0, 3).map((p) => (
                          <div key={p!.id} className="w-8 h-8 rounded-full overflow-hidden border-2 border-gray-900 bg-white/10 flex items-center justify-center" title={p!.name}>
                            <ProductImage product={p} size="sm" />
                          </div>
                        ))}
                      </div>
                      <p className="text-xs text-white/40 mt-1 font-medium">
                        {products.length} item{products.length !== 1 ? 's' : ''}
                      </p>
                    </td>
                    <td className="px-5 py-4 text-sm font-bold text-white">${o.total.toLocaleString()}</td>
                    <td className="px-5 py-4">
                      <select
                        value={o.status}
                        onChange={(e) => updateOrderStatus(o.id, e.target.value)}
                        className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase appearance-none cursor-pointer border border-white/10 outline-none ${statusColors[o.status]}`}
                      >
                        <option value="pending" className="bg-gray-900 text-white">PENDING</option>
                        <option value="processing" className="bg-gray-900 text-white">PROCESSING</option>
                        <option value="shipped" className="bg-gray-900 text-white">SHIPPED</option>
                        <option value="delivered" className="bg-gray-900 text-white">DELIVERED</option>
                        <option value="cancelled" className="bg-gray-900 text-white">CANCELLED</option>
                      </select>
                    </td>
                    <td className="px-5 py-4 text-sm text-white/50 font-medium">{o.date}</td>
                    <td className="px-5 py-4 text-right">
                      <button
                        onClick={() => setViewOrder(o)}
                        className="px-3 py-1.5 glass rounded-lg text-xs font-semibold text-white/50 hover:bg-brand-600 hover:text-white transition-all inline-flex items-center gap-1.5 opacity-0 group-hover:opacity-100"
                      >
                        <Icons.Eye size={14} /> View
                      </button>
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-10 text-sm text-white/50">
                    No orders found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
