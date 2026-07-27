'use client';

import { useState } from 'react';
import { Icons } from '@/components/ui/Icons';
import ProductImage from '@/components/ui/ProductImage';
import { mockOrders, mockProducts } from '@/data';

const statusConfig: Record<string, { color: string; bg: string }> = {
  pending: { color: 'text-amber-700 dark:text-amber-300', bg: 'bg-amber-100 dark:bg-amber-900/30' },
  processing: { color: 'text-blue-700 dark:text-blue-300', bg: 'bg-blue-100 dark:bg-blue-900/30' },
  shipped: { color: 'text-purple-700 dark:text-purple-300', bg: 'bg-purple-100 dark:bg-purple-900/30' },
  delivered: { color: 'text-emerald-700 dark:text-emerald-300', bg: 'bg-emerald-100 dark:bg-emerald-900/30' },
  cancelled: { color: 'text-red-700 dark:text-red-300', bg: 'bg-red-100 dark:bg-red-900/30' },
};

const timelineSteps = ['Placed', 'Processing', 'Shipped', 'Delivered'];

function getTimelineIndex(status: string): number {
  const map: Record<string, number> = { pending: 0, processing: 1, shipped: 2, delivered: 3, cancelled: -1 };
  return map[status] ?? 0;
}

export default function OrdersSection() {
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          My Orders
        </h2>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {mockOrders.length} orders
        </span>
      </div>

      {mockOrders.map((order) => {
        const isExpanded = expandedOrder === order.id;
        const cfg = statusConfig[order.status];
        const timelineIdx = getTimelineIndex(order.status);

        return (
          <div
            key={order.id}
            className="rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/30 shadow-lg overflow-hidden"
          >
            <button
              onClick={() => setExpandedOrder(isExpanded ? null : order.id)}
              className="w-full p-5 flex items-center gap-4 text-left hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors"
            >
              <div className="flex -space-x-3">
                {order.items.slice(0, 3).map((item, i) => {
                  const product = mockProducts.find((p) => p.id === item.productId);
                  return (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 border-2 border-white dark:border-gray-800 flex items-center justify-center overflow-hidden"
                    >
                      {product ? (
                        <ProductImage image={product.image} size="sm" className="scale-[0.35] origin-center" />
                      ) : (
                        <Icons.Package size={14} />
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-semibold text-gray-900 dark:text-white text-sm">
                    {order.id}
                  </span>
                  <span className={`px-2 py-0.5 rounded-full text-[11px] font-medium ${cfg.bg} ${cfg.color}`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  {new Date(order.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  {' '}&middot;{' '}{order.items.length} item{order.items.length > 1 ? 's' : ''}
                </p>
              </div>

              <span className="font-bold text-gray-900 dark:text-white text-sm">
                ${order.total.toLocaleString()}
              </span>

              <Icons.ChevronDown
                size={18}
                className={`text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
              />
            </button>

            {isExpanded && (
              <div className="px-5 pb-5 border-t border-gray-100 dark:border-gray-700/50">
                <div className="pt-4 space-y-5">
                  <div className="flex items-center gap-1">
                    {timelineSteps.map((step, i) => (
                      <div key={step} className="flex-1 flex items-center">
                        <div className="flex flex-col items-center">
                          <div
                            className={`w-3 h-3 rounded-full border-2 ${
                              i <= timelineIdx
                                ? 'bg-indigo-500 border-indigo-500'
                                : 'bg-gray-200 dark:bg-gray-600 border-gray-300 dark:border-gray-500'
                            }`}
                          />
                          <span className={`text-[10px] mt-1 font-medium ${
                            i <= timelineIdx
                              ? 'text-indigo-600 dark:text-indigo-400'
                              : 'text-gray-400 dark:text-gray-500'
                          }`}>
                            {step}
                          </span>
                        </div>
                        {i < timelineSteps.length - 1 && (
                          <div className={`flex-1 h-0.5 mx-1 ${
                            i < timelineIdx
                              ? 'bg-indigo-500'
                              : 'bg-gray-200 dark:bg-gray-600'
                          }`} />
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3">
                    {order.items.map((item) => {
                      const product = mockProducts.find((p) => p.id === item.productId);
                      if (!product) return null;
                      return (
                        <div key={item.productId} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-700/30">
                          <div className="w-12 h-12 rounded-lg bg-white dark:bg-gray-800 flex items-center justify-center overflow-hidden shrink-0">
                            <ProductImage image={product.image} size="sm" className="scale-[0.35] origin-center" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold text-indigo-500 dark:text-indigo-400">{product.brand}</p>
                            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{product.name}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-bold text-gray-900 dark:text-white">${product.price}</p>
                            <p className="text-[11px] text-gray-500 dark:text-gray-400">Qty: {item.qty}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button className="px-4 py-2 rounded-xl text-sm font-medium bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700 transition-all flex items-center gap-1.5">
                      <Icons.Truck size={14} />
                      Track Package
                    </button>
                    <button className="px-4 py-2 rounded-xl text-sm font-medium border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors flex items-center gap-1.5">
                      <Icons.FileText size={14} />
                      Download Invoice
                    </button>
                    {order.status === 'delivered' && (
                      <button className="px-4 py-2 rounded-xl text-sm font-medium border border-emerald-200 dark:border-emerald-700/50 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors flex items-center gap-1.5">
                        <Icons.Cart size={14} />
                        Buy Again
                      </button>
                    )}
                    {order.status !== 'delivered' && order.status !== 'cancelled' && (
                      <button className="px-4 py-2 rounded-xl text-sm font-medium border border-red-200 dark:border-red-700/50 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors flex items-center gap-1.5">
                        <Icons.X size={14} />
                        Cancel Order
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
