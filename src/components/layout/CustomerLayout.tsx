'use client';

import { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { Icons } from '@/components/ui/Icons';
import LoginModal from '@/components/auth/LoginModal';

interface CustomerLayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onNavigate: (page: string) => void;
}

export default function CustomerLayout({ children, currentPage, onNavigate }: CustomerLayoutProps) {
  const { darkMode, setDarkMode } = useTheme();
  const { cart } = useCart();
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleProfileClick = () => {
    if (!user) setShowLogin(true);
    else if (user.role === 'admin') onNavigate('admin-dashboard');
    else onNavigate('dashboard');
  };

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'catalog', label: 'Shop' },
    { id: 'about', label: 'About' },
    { id: 'blog', label: 'Blog' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {showLogin && <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />}
      <nav className="sticky top-0 z-50 glass-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <button onClick={() => onNavigate('home')} className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-purple-500 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor"><rect x="7" y="2" width="10" height="20" rx="2" fill="none" stroke="currentColor" strokeWidth="2"/><circle cx="12" cy="18" r="1" fill="currentColor"/></svg>
                </div>
                <span className="text-xl font-bold gradient-text hidden sm:inline">MobileHub</span>
              </button>
              <div className="hidden lg:flex items-center gap-6">
                {navLinks.map(link => (
                  <button key={link.id} onClick={() => onNavigate(link.id)} className={`text-sm font-medium transition-colors ${currentPage === link.id ? 'text-brand-400' : 'text-gray-300 hover:text-white'}`}>{link.label}</button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 hover:bg-white/5 rounded-lg transition-colors text-gray-300 hover:text-white"
                title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              >
                {darkMode ? <Icons.Sun /> : <Icons.Moon />}
              </button>
              <button onClick={() => onNavigate('cart')} className="p-2 hover:bg-white/5 rounded-lg transition-colors relative">
                <Icons.Cart />
                {cartCount > 0 && <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-brand-500 rounded-full text-xs flex items-center justify-center font-bold">{cartCount}</span>}
              </button>
              <button onClick={handleProfileClick} className="p-2 hover:bg-white/5 rounded-lg transition-colors relative">
                {user ? (
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-brand-500 to-purple-500 flex items-center justify-center text-xs font-bold">{user.avatar}</div>
                ) : <Icons.User />}
              </button>
              {user && <button onClick={logout} className="hidden sm:flex p-2 hover:bg-white/5 rounded-lg transition-colors text-gray-400 hover:text-white" title="Logout"><Icons.Logout /></button>}
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 hover:bg-white/5 rounded-lg transition-colors lg:hidden">
                {mobileMenuOpen ? <Icons.X /> : <Icons.Menu />}
              </button>
            </div>
          </div>
          {mobileMenuOpen && (
            <div className="pb-4 lg:hidden animate-slide-down">
              <div className="space-y-1">
                {navLinks.map(link => (
                  <button key={link.id} onClick={() => { onNavigate(link.id); setMobileMenuOpen(false); }} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium hover:bg-white/5">{link.label}</button>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>
      
      <main className="flex-1">{children}</main>
      
      <footer className="border-t border-white/5 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-purple-500 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor"><rect x="7" y="2" width="10" height="20" rx="2" fill="none" stroke="currentColor" strokeWidth="2"/></svg>
                </div>
                <span className="text-lg font-bold gradient-text">MobileHub</span>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">Premium mobile devices with best prices and fast delivery.</p>
            </div>
            {[
              { title: 'Shop', links: [{ label: 'All Phones', id: 'catalog' }, { label: 'Flagship', id: 'catalog' }, { label: 'Mid-Range', id: 'catalog' }] },
              { title: 'Support', links: [{ label: 'Contact Us', id: 'contact' }, { label: 'FAQ', id: 'faq' }, { label: 'Shipping', id: 'shipping' }, { label: 'Returns', id: 'returns' }] },
              { title: 'Company', links: [{ label: 'About', id: 'about' }, { label: 'Careers', id: 'careers' }, { label: 'Blog', id: 'blog' }, { label: 'Privacy', id: 'privacy' }, { label: 'Terms', id: 'terms' }, { label: 'Cookies', id: 'cookies' }] },
            ].map(col => (
              <div key={col.title}>
                <h4 className="font-semibold mb-3 text-sm">{col.title}</h4>
                <ul className="space-y-2">
                  {col.links.map(link => (
                    <li key={link.label}><button onClick={() => onNavigate(link.id)} className="text-sm text-gray-400 hover:text-white transition-colors">{link.label}</button></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs text-gray-500">© 2024 MobileHub. All rights reserved.</p>
            <div className="flex gap-4">
              {['Privacy', 'Terms', 'Cookies'].map(l => <button key={l} onClick={() => onNavigate(l.toLowerCase())} className="text-xs text-gray-500 hover:text-white">{l}</button>)}
            </div>
          </div>
        </div>
      </footer>
      
      <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden glass-light border-t border-white/10">
        <div className="flex justify-around py-2">
          {[
            { id: 'home', icon: <Icons.Home />, label: 'Home', badge: 0 },
            { id: 'catalog', icon: <Icons.Grid />, label: 'Shop', badge: 0 },
            { id: 'cart', icon: <Icons.Cart />, label: 'Cart', badge: cartCount },
            { id: 'profile-action', icon: user ? null : <Icons.User />, label: user ? 'Account' : 'Sign In', badge: 0, custom: user ? <div className="w-5 h-5 rounded-full bg-gradient-to-br from-brand-500 to-purple-500 flex items-center justify-center text-[10px] font-bold">{user.avatar}</div> : null },
          ].map(tab => (
            <button key={tab.id} onClick={() => tab.id === 'profile-action' ? handleProfileClick() : onNavigate(tab.id)} className="flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl text-gray-400">
              <div className="relative">{tab.custom || tab.icon}{(tab.badge ?? 0) > 0 && <span className="absolute -top-1 -right-2 w-4 h-4 bg-brand-500 rounded-full text-[10px] flex items-center justify-center font-bold">{tab.badge}</span>}</div>
              <span className="text-[10px]">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
