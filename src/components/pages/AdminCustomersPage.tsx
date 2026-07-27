'use client';

import { useState } from 'react';
import { useAdmin } from '@/contexts/AdminContext';
import { Icons } from '@/components/ui/Icons';

export default function AdminCustomersPage() {
  const { customers } = useAdmin();
  const [search, setSearch] = useState('');

  const filtered = customers.filter(
    (c) => c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase())
  );

  const activeCount = customers.filter((c) => c.status === 'active').length;
  const suspendedCount = customers.filter((c) => c.status === 'suspended').length;

  const customerStats = [
    { label: 'Total Customers', value: customers.length, icon: Icons.Users, gradient: 'from-brand-500 to-purple-500' },
    { label: 'Active', value: activeCount, icon: Icons.UserCheck, gradient: 'from-green-500 to-emerald-500' },
    { label: 'Suspended', value: suspendedCount, icon: Icons.UserX, gradient: 'from-red-500 to-rose-500' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {customerStats.map((stat) => (
          <div key={stat.label} className="glass-card rounded-2xl p-5 hover-lift">
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center`}>
                <stat.icon size={20} className="text-white" />
              </div>
            </div>
            <p className="text-white/50 text-xs mb-1">{stat.label}</p>
            <p className="text-2xl font-bold text-white">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="relative">
        <Icons.Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
        <input
          type="text"
          placeholder="Search customers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder:text-white/40 focus:outline-none focus:border-brand-500/50"
        />
      </div>

      <div className="glass-card rounded-2xl overflow-hidden border border-white/10">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5">
                <th className="px-5 py-3 text-xs font-bold text-white/50 uppercase">Name</th>
                <th className="px-5 py-3 text-xs font-bold text-white/50 uppercase">Email</th>
                <th className="px-5 py-3 text-xs font-bold text-white/50 uppercase">Orders</th>
                <th className="px-5 py-3 text-xs font-bold text-white/50 uppercase">Spent</th>
                <th className="px-5 py-3 text-xs font-bold text-white/50 uppercase">Status</th>
                <th className="px-5 py-3 text-xs font-bold text-white/50 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map((customer) => (
                <tr key={customer.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold">
                        {customer.name.charAt(0)}
                      </div>
                      <span className="text-sm text-white font-medium">{customer.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-sm text-white/70">{customer.email}</td>
                  <td className="px-5 py-3 text-sm text-white/70">{customer.orders}</td>
                  <td className="px-5 py-3 text-sm text-white font-bold">${customer.spent.toLocaleString()}</td>
                  <td className="px-5 py-3">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                      customer.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                    }`}>
                      {customer.status}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <button className="p-1.5 rounded-lg hover:bg-white/10 text-white/50 hover:text-white transition-colors">
                        <Icons.Eye size={14} />
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-white/10 text-white/50 hover:text-white transition-colors">
                        <Icons.Edit size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
