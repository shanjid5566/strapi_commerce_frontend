'use client';

import { useState, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useAdmin } from '@/contexts/AdminContext';
import { Icons } from '@/components/ui/Icons';
import Modal from '@/components/ui/Modal';
import type { User, UserRole } from '@/types';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const demoUsers: { label: string; role: UserRole; email: string; icon: typeof Icons.User }[] = [
  { label: 'Customer', role: 'customer', email: 'john@example.com', icon: Icons.User },
  { label: 'Super Admin', role: 'super_admin', email: 'admin@mobilehub.com', icon: Icons.Shield },
  { label: 'Order Mgr', role: 'order_manager', email: 'orders@mobilehub.com', icon: Icons.Truck },
  { label: 'Product Mgr', role: 'product_manager', email: 'products@mobilehub.com', icon: Icons.Package },
  { label: 'Content Ed', role: 'content_editor', email: 'content@mobilehub.com', icon: Icons.Edit },
  { label: 'Blog Mgr', role: 'blog_manager', email: 'blog@mobilehub.com', icon: Icons.Newspaper },
];

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const { login } = useAuth();
  const { customers } = useAdmin();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const resolveRole = useCallback(
    (emailAddr: string): UserRole => {
      if (emailAddr.endsWith('@mobilehub.com')) {
        const prefix = emailAddr.split('@')[0];
        if (prefix.includes('admin')) return 'super_admin';
        if (prefix.includes('order')) return 'order_manager';
        if (prefix.includes('product')) return 'product_manager';
        if (prefix.includes('content')) return 'content_editor';
        if (prefix.includes('blog')) return 'blog_manager';
        return 'super_admin';
      }
      return 'customer';
    },
    []
  );

  const handleDemoLogin = useCallback(
    (demo: (typeof demoUsers)[number]) => {
      const user: User = {
        name: demo.label,
        email: demo.email,
        role: demo.role,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${demo.label}`,
      };
      login(user);
      onClose();
    },
    [login, onClose]
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      setError('');

      if (!email || !password) {
        setError('Please fill in all fields');
        return;
      }

      const role = resolveRole(email);

      if (role === 'customer') {
        const suspended = customers.find(
          (c) => c.email === email && c.status === 'suspended'
        );
        if (suspended) {
          setError('This account has been suspended. Please contact support.');
          return;
        }
      }

      const user: User = {
        name: email.split('@')[0].replace(/^\w/, (c) => c.toUpperCase()),
        email,
        role,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
      };
      login(user);
      onClose();
      setEmail('');
      setPassword('');
    },
    [email, password, customers, resolveRole, login, onClose]
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="rounded-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/30 shadow-2xl p-8">
        <div className="text-center mb-6">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mb-4 shadow-lg">
            <Icons.Zap filled className="text-white" size={32} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Welcome Back</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Sign in to your MobileHub account</p>
        </div>

        <div className="mb-6">
          <p className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3">Quick Demo Login</p>
          <div className="grid grid-cols-3 gap-2">
            {demoUsers.map((demo) => (
              <button
                key={demo.role}
                onClick={() => handleDemoLogin(demo)}
                className="flex flex-col items-center gap-1.5 p-2.5 rounded-xl border border-gray-200 dark:border-gray-700/50 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:border-indigo-300 dark:hover:border-indigo-600 transition-all group"
              >
                <demo.icon size={18} className="text-gray-400 group-hover:text-indigo-500 transition-colors" />
                <span className="text-[11px] font-medium text-gray-600 dark:text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                  {demo.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200 dark:border-gray-700" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="px-2 bg-white dark:bg-gray-900 text-gray-400">or sign in with email</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm flex items-center gap-2">
              <Icons.Shield size={16} />
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email</label>
            <div className="relative">
              <Icons.Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Password</label>
            <div className="relative">
              <Icons.Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <Icons.Eye size={18} />
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold hover:from-indigo-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all shadow-lg shadow-indigo-500/25"
          >
            Sign In
          </button>
        </form>
      </div>
    </Modal>
  );
}
