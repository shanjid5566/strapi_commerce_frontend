'use client';

import { memo, useState, useCallback, useMemo } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useAdmin } from '@/contexts/AdminContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Icons } from '@/components/ui/Icons';

interface AdminLayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onNavigate: (page: string) => void;
}

const allNavItems = [
  { id: 'admin-dashboard', label: 'Dashboard', icon: Icons.Dashboard },
  { id: 'admin-products', label: 'Products', icon: Icons.Package },
  { id: 'admin-orders', label: 'Orders', icon: Icons.Cart },
  { id: 'admin-brands', label: 'Brands', icon: Icons.Tag },
  { id: 'admin-customers', label: 'Customers', icon: Icons.Users },
  { id: 'admin-coupons', label: 'Coupons', icon: Icons.Tag },
  { id: 'admin-page-about', label: 'Pages', icon: Icons.FileText },
  { id: 'admin-blogs', label: 'Blogs', icon: Icons.FileText },
  { id: 'admin-staff', label: 'Staff', icon: Icons.Users },
  { id: 'admin-settings', label: 'Settings', icon: Icons.Settings },
];

const cmsPages = [
  { id: 'admin-page-about', label: 'About', icon: '📖' },
  { id: 'admin-page-contact', label: 'Contact', icon: '✉️' },
  { id: 'admin-page-faq', label: 'FAQ', icon: '❓' },
  { id: 'admin-page-shipping', label: 'Shipping', icon: '🚚' },
  { id: 'admin-page-returns', label: 'Returns', icon: '↩️' },
  { id: 'admin-page-careers', label: 'Careers', icon: '💼' },
  { id: 'admin-page-privacy', label: 'Privacy', icon: '🔒' },
  { id: 'admin-page-terms', label: 'Terms', icon: '⚖️' },
  { id: 'admin-page-cookies', label: 'Cookies', icon: '🍪' },
];

const AdminLayout = memo(function AdminLayout({
  children,
  currentPage,
  onNavigate,
}: AdminLayoutProps) {
  const { user, logout } = useAuth();
  const { roles } = useAdmin();
  const { darkMode, setDarkMode } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const userRole = user?.role ?? 'super_admin';

  const userRoleDef = useMemo(
    () => roles.find((r) => r.id === userRole),
    [roles, userRole]
  );

  const perms = userRoleDef?.perms ?? [];

  const navItems = useMemo(
    () =>
      allNavItems.filter((item) => {
        if (item.id === 'admin-page-about' && user?.role === 'content_editor')
          return false;
        return perms.includes(item.label);
      }),
    [perms, user?.role]
  );

  const pageTitle = useMemo(() => {
    if (currentPage.startsWith('admin-page-'))
      return currentPage.replace('admin-page-', '');
    return currentPage.replace('admin-', '').replace('-', ' ');
  }, [currentPage]);

  const handleNavClick = useCallback(
    (page: string) => {
      onNavigate(page);
      setSidebarOpen(false);
    },
    [onNavigate]
  );

  return (
    <div className="min-h-screen flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 glass-light transform transition-transform lg:translate-x-0 lg:static lg:sticky lg:top-0 lg:h-screen ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-screen">
          {/* Logo */}
          <div className="p-6 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-purple-500 flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-white"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <rect
                    x="7"
                    y="2"
                    width="10"
                    height="20"
                    rx="2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              </div>
              <div>
                <span className="font-bold text-sm">Admin Panel</span>
                <p className="text-[10px] text-gray-500">MobileHub CMS</p>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden"
            >
              <Icons.X />
            </button>
          </div>

          {/* Nav */}
          <nav className="flex-1 px-3 space-y-1 overflow-y-auto pb-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  currentPage === item.id ||
                  (item.id === 'admin-page-about' &&
                    currentPage.startsWith('admin-page-'))
                    ? 'bg-brand-600/20 text-brand-400'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <item.icon size={18} />
                {item.label}
              </button>
            ))}

            {/* CMS Pages sub-section for content_editor */}
            {perms.includes('Pages') && user?.role === 'content_editor' && (
              <div className="pt-4 mt-4 border-t border-white/5 space-y-1">
                <p className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  CMS Pages
                </p>
                {cmsPages.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      currentPage === item.id
                        ? 'bg-brand-600/20 text-brand-400'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <span>{item.icon}</span>
                    {item.label}
                  </button>
                ))}
              </div>
            )}

            {/* My Profile */}
            <div className="pt-4 mt-4 border-t border-white/5 space-y-1">
              <button
                onClick={() => handleNavClick('admin-profile')}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  currentPage === 'admin-profile'
                    ? 'bg-brand-600/20 text-brand-400'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icons.User size={18} />
                My Profile
              </button>
            </div>
          </nav>

          {/* View Store */}
          <div className="p-4 border-t border-white/5 flex-shrink-0">
            <button
              onClick={() => handleNavClick('home')}
              className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-gray-400 hover:text-white hover:bg-white/5"
            >
              <Icons.ArrowLeft size={18} />
              View Store
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-30 glass-light px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 hover:bg-white/5 rounded-lg"
            >
              <Icons.Menu />
            </button>
            <h1 className="text-lg font-bold capitalize">{pageTitle}</h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 hover:bg-white/5 rounded-lg transition-colors text-gray-300 hover:text-white"
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {darkMode ? <Icons.Sun /> : <Icons.Moon />}
            </button>
            <button className="p-2 hover:bg-white/5 rounded-lg relative">
              <Icons.Bell />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            {user && (
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-500 to-purple-500 flex items-center justify-center text-xs font-bold">
                {user.name?.charAt(0) || 'A'}
              </div>
            )}
          </div>
        </header>

        <main className="flex-1 p-6 pb-20 lg:pb-6">{children}</main>
      </div>
    </div>
  );
});

export default AdminLayout;
