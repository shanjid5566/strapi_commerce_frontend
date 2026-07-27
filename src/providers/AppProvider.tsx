'use client';

import { ThemeProvider } from '@/contexts/ThemeContext';
import { CartProvider } from '@/contexts/CartContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { CMSProvider } from '@/contexts/CMSContext';
import { WishlistProvider } from '@/contexts/WishlistContext';
import { AdminProvider } from '@/contexts/AdminContext';

interface AppProviderProps {
  children: React.ReactNode;
}

export default function AppProvider({ children }: AppProviderProps) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CMSProvider>
          <CartProvider>
            <WishlistProvider>
              <AdminProvider>{children}</AdminProvider>
            </WishlistProvider>
          </CartProvider>
        </CMSProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
