'use client';

import { useCart } from '@/contexts/CartContext';
import { Icons } from '@/components/ui/Icons';
import ProductImage from '@/components/ui/ProductImage';

interface CartPageProps {
  onNavigate: (page: string) => void;
}

export default function CartPage({ onNavigate }: CartPageProps) {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();
  
  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="text-8xl mb-6">🛒</div>
        <h2 className="text-2xl font-bold mb-3">Your cart is empty</h2>
        <button onClick={() => onNavigate('catalog')} className="px-8 py-3 bg-gradient-to-r from-brand-600 to-purple-600 rounded-xl font-semibold mt-4">Browse Products</button>
      </div>
    );
  }
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cart.map(item => (
            <div key={item.id} className="glass-card rounded-2xl p-4 flex gap-4 items-center">
              <div className="w-20 h-20 flex-shrink-0"><ProductImage product={item} size="sm" /></div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm truncate">{item.name}</h3>
                <p className="text-xs text-gray-400">{item.brand}</p>
                <p className="text-brand-400 font-bold mt-1">${item.price}</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center glass rounded-lg overflow-hidden">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-2 py-1.5 hover:bg-white/5"><Icons.Minus /></button>
                  <span className="px-3 text-sm font-medium">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-2 py-1.5 hover:bg-white/5"><Icons.Plus /></button>
                </div>
                <button onClick={() => removeFromCart(item.id)} className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg"><Icons.Trash /></button>
              </div>
            </div>
          ))}
        </div>
        <div className="glass-card rounded-2xl p-6 h-fit sticky top-24">
          <h2 className="text-lg font-bold mb-4">Order Summary</h2>
          <div className="space-y-3 mb-6">
            <div className="flex justify-between text-sm"><span className="text-gray-400">Subtotal</span><span>${cartTotal.toLocaleString()}</span></div>
            <div className="flex justify-between text-sm"><span className="text-gray-400">Shipping</span><span className="text-green-400">Free</span></div>
            <div className="border-t border-white/10 pt-3 flex justify-between"><span className="font-bold">Total</span><span className="text-xl font-bold gradient-text">${cartTotal.toLocaleString()}</span></div>
          </div>
          <button onClick={() => onNavigate('checkout')} className="w-full py-3.5 bg-gradient-to-r from-brand-600 to-purple-600 rounded-xl font-semibold">Proceed to Checkout</button>
        </div>
      </div>
    </div>
  );
}
