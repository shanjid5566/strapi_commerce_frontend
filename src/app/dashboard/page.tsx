'use client';

import { useState } from 'react';
import { Icons } from '@/components/ui/Icons';
import OrdersSection from '@/components/dashboard/OrdersSection';
import ProfileSection from '@/components/dashboard/ProfileSection';
import AddressesSection from '@/components/dashboard/AddressesSection';
import WishlistSection from '@/components/dashboard/WishlistSection';
import SecuritySection from '@/components/dashboard/SecuritySection';

interface DashboardPageProps {
  onNavigate: (page: string) => void;
}

type Section = 'orders' | 'profile' | 'addresses' | 'wishlist' | 'security';

const navItems: { id: Section; label: string; icon: typeof Icons.Package }[] = [
  { id: 'orders', label: 'My Orders', icon: Icons.Package },
  { id: 'profile', label: 'Profile', icon: Icons.User },
  { id: 'addresses', label: 'Addresses', icon: Icons.MapPin },
  { id: 'wishlist', label: 'Wishlist', icon: Icons.Heart },
  { id: 'security', label: 'Security', icon: Icons.Shield },
];

const user = {
  name: 'Alex Johnson',
  email: 'alex.johnson@email.com',
  initial: 'AJ',
};

export default function UserDashboard({ onNavigate }: DashboardPageProps) {
  const [activeSection, setActiveSection] = useState<Section>('orders');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleNav = (section: Section) => {
    setActiveSection(section);
    setSidebarOpen(false);
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'orders':
        return <OrdersSection />;
      case 'profile':
        return <ProfileSection />;
      case 'addresses':
        return <AddressesSection />;
      case 'wishlist':
        return <WishlistSection onNavigate={onNavigate} />;
      case 'security':
        return <SecuritySection />;
      default:
        return <OrdersSection />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50 dark:from-gray-950 dark:via-gray-900 dark:to-indigo-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
        <div className="flex items-center justify-between mb-6 lg:hidden">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/30 shadow-sm"
          >
            <Icons.Menu size={20} />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <aside
            className={`lg:col-span-1 ${sidebarOpen ? 'fixed inset-0 z-50 bg-black/50 backdrop-blur-sm' : 'hidden lg:block'}`}
            onClick={(e) => {
              if (e.target === e.currentTarget) setSidebarOpen(false);
            }}
          >
            <div
              className={`${
                sidebarOpen
                  ? 'fixed right-0 top-0 bottom-0 w-72 z-50'
                  : 'sticky top-24'
              } space-y-4`}
            >
              <div className="p-5 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/30 shadow-lg">
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold shrink-0">
                    {user.initial}
                  </div>
                  <div className="min-w-0">
                    <h2 className="font-semibold text-gray-900 dark:text-white truncate">
                      {user.name}
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                      {user.email}
                    </p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-indigo-50/80 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/30 mb-5">
                  <div className="flex items-center gap-2">
                    <Icons.Zap size={16} className="text-indigo-500" />
                    <span className="text-sm font-medium text-indigo-700 dark:text-indigo-300">
                      Premium Member
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="p-2.5 rounded-xl bg-gray-50 dark:bg-gray-700/50">
                    <p className="text-lg font-bold text-gray-900 dark:text-white">6</p>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400">Orders</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-gray-50 dark:bg-gray-700/50">
                    <p className="text-lg font-bold text-gray-900 dark:text-white">3</p>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400">Wishlist</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-gray-50 dark:bg-gray-700/50">
                    <p className="text-lg font-bold text-gray-900 dark:text-white">2</p>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400">Addresses</p>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/30 shadow-lg">
                <nav className="space-y-1">
                  {navItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleNav(item.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                        activeSection === item.id
                          ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/25'
                          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700/50'
                      }`}
                    >
                      <item.icon size={18} />
                      {item.label}
                    </button>
                  ))}
                </nav>
              </div>

              <div className="p-4 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/30 shadow-lg">
                <p className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                  Need help?
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                  Our support team is here for you 24/7
                </p>
                <button className="w-full py-2.5 rounded-xl border border-indigo-200 dark:border-indigo-700/50 text-indigo-600 dark:text-indigo-400 text-sm font-medium hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors">
                  Contact Support
                </button>
              </div>
            </div>
          </aside>

          <main className="lg:col-span-3">
            <div className="hidden lg:flex items-center gap-4 mb-6">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/25">
                <Icons.Dashboard size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Welcome back, {user.name.split(' ')[0]}!
                </h1>
                <p className="text-gray-500 dark:text-gray-400">
                  Manage your orders, profile, and more
                </p>
              </div>
            </div>

            {renderSection()}
          </main>
        </div>
      </div>
    </div>
  );
}
