'use client'

import { useState } from 'react'
import { Icons } from '@/components/ui/Icons'
import { useAuth } from '@/contexts/AuthContext'

const mockCustomers = [
  { id: '1', name: 'John Doe', email: 'john@example.com', avatar: '/avatars/1.jpg', orders: 12, spent: 1249.99, status: 'active' },
  { id: '2', name: 'Sarah Wilson', email: 'sarah@example.com', avatar: '/avatars/2.jpg', orders: 8, spent: 899.50, status: 'active' },
  { id: '3', name: 'Mike Johnson', email: 'mike@example.com', avatar: '/avatars/3.jpg', orders: 15, spent: 2349.00, status: 'suspended' },
  { id: '4', name: 'Emily Brown', email: 'emily@example.com', avatar: '/avatars/4.jpg', orders: 5, spent: 459.99, status: 'active' },
  { id: '5', name: 'David Lee', email: 'david@example.com', avatar: '/avatars/5.jpg', orders: 22, spent: 3599.00, status: 'active' }
]

export default function AdminCustomers() {
  const { user } = useAuth()
  const [customers, setCustomers] = useState(mockCustomers)
  const [search, setSearch] = useState('')
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null)

  const filteredCustomers = customers.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase())
  )

  const stats = [
    { title: 'Total Customers', value: customers.length, icon: Icons.Users, gradient: 'from-blue-500 to-indigo-500' },
    { title: 'Active', value: customers.filter(c => c.status === 'active').length, icon: Icons.UserCheck, gradient: 'from-emerald-500 to-teal-500' },
    { title: 'Suspended', value: customers.filter(c => c.status === 'suspended').length, icon: Icons.UserX, gradient: 'from-red-500 to-pink-500' }
  ]

  const toggleSuspend = (customerId: string) => {
    setCustomers(customers.map(c =>
      c.id === customerId
        ? { ...c, status: c.status === 'active' ? 'suspended' : 'active' }
        : c
    ))
  }

  const isSuperAdmin = user?.role === 'super_admin'

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Customers Management</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
              placeholder="Search customers..."
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
                <th className="pb-3 font-medium">Customer</th>
                <th className="pb-3 font-medium">Email</th>
                <th className="pb-3 font-medium">Orders</th>
                <th className="pb-3 font-medium">Spent</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="text-white hover:bg-white/5">
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                        <Icons.User className="w-5 h-5 text-white" />
                      </div>
                      <span className="font-medium">{customer.name}</span>
                    </div>
                  </td>
                  <td className="py-4 text-white/60">{customer.email}</td>
                  <td className="py-4">{customer.orders}</td>
                  <td className="py-4 font-semibold">${customer.spent.toFixed(2)}</td>
                  <td className="py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      customer.status === 'active' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
                    }`}>
                      {customer.status}
                    </span>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedCustomer(customer)}
                        className="p-2 rounded-lg hover:bg-white/10 text-white/60 hover:text-white transition-colors"
                      >
                        <Icons.Eye className="w-4 h-4" />
                      </button>
                      {isSuperAdmin && (
                        <button
                          onClick={() => toggleSuspend(customer.id)}
                          className={`p-2 rounded-lg transition-colors ${
                            customer.status === 'active'
                              ? 'hover:bg-red-500/20 text-white/60 hover:text-red-400'
                              : 'hover:bg-emerald-500/20 text-white/60 hover:text-emerald-400'
                          }`}
                        >
                          {customer.status === 'active' ? (
                            <Icons.UserX className="w-4 h-4" />
                          ) : (
                            <Icons.UserCheck className="w-4 h-4" />
                          )}
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedCustomer && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="backdrop-blur-md bg-gray-900/90 border border-white/20 rounded-2xl p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Customer Details</h2>
              <button
                onClick={() => setSelectedCustomer(null)}
                className="p-2 rounded-lg hover:bg-white/10 text-white/60 hover:text-white"
              >
                <Icons.X className="w-5 h-5" />
              </button>
            </div>

            <div className="text-center mb-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center mx-auto mb-4">
                <Icons.User className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white">{selectedCustomer.name}</h3>
              <p className="text-white/60">{selectedCustomer.email}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-white/5 rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-white">{selectedCustomer.orders}</p>
                <p className="text-white/60 text-sm">Total Orders</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-white">${selectedCustomer.spent.toFixed(2)}</p>
                <p className="text-white/60 text-sm">Total Spent</p>
              </div>
            </div>

            <div className="flex items-center justify-between mb-6">
              <span className="text-white/60">Status:</span>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                selectedCustomer.status === 'active' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
              }`}>
                {selectedCustomer.status}
              </span>
            </div>

            {isSuperAdmin && (
              <button
                onClick={() => {
                  toggleSuspend(selectedCustomer.id)
                  setSelectedCustomer({
                    ...selectedCustomer,
                    status: selectedCustomer.status === 'active' ? 'suspended' : 'active'
                  })
                }}
                className={`w-full py-3 rounded-xl font-medium transition-all ${
                  selectedCustomer.status === 'active'
                    ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                    : 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30'
                }`}
              >
                {selectedCustomer.status === 'active' ? 'Suspend Customer' : 'Restore Customer'}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
