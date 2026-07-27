'use client';

import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import ProductImage from '@/components/ui/ProductImage';

interface CheckoutPageProps {
  onNavigate: (page: string) => void;
}

export default function CheckoutPage({ onNavigate }: CheckoutPageProps) {
  const { cart, cartTotal } = useCart();
  const [step, setStep] = useState(1);
  
  if (step === 3) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-500/20 flex items-center justify-center">
          <svg className="w-10 h-10 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
        <h2 className="text-2xl font-bold mb-3">Order Placed!</h2>
        <p className="text-gray-400 mb-8">Order #ORD-{Math.floor(Math.random() * 9000 + 1000)}</p>
        <button onClick={() => onNavigate('home')} className="px-8 py-3 bg-gradient-to-r from-brand-600 to-purple-600 rounded-xl font-semibold">Continue Shopping</button>
      </div>
    );
  }
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      <div className="grid lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3 glass-card rounded-2xl p-6">
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold mb-4">Contact Information</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <input placeholder="First Name" className="px-4 py-2.5 glass rounded-xl text-sm text-white placeholder-gray-600" />
                <input placeholder="Last Name" className="px-4 py-2.5 glass rounded-xl text-sm text-white placeholder-gray-600" />
                <input placeholder="Email" className="px-4 py-2.5 glass rounded-xl text-sm text-white placeholder-gray-600" />
                <input placeholder="Phone" className="px-4 py-2.5 glass rounded-xl text-sm text-white placeholder-gray-600" />
              </div>
              <input placeholder="Address" className="w-full px-4 py-2.5 glass rounded-xl text-sm text-white placeholder-gray-600" />
              <button onClick={() => setStep(2)} className="w-full py-3 bg-gradient-to-r from-brand-600 to-purple-600 rounded-xl font-semibold mt-4">Continue to Payment</button>
            </div>
          )}
          {step === 2 && (
            <div>
              <h2 className="text-lg font-bold mb-4">Payment Method</h2>
              <div className="space-y-3 mb-6">
                {['Credit Card', 'PayPal', 'Apple Pay'].map((m, i) => (
                  <label key={m} className="flex items-center gap-3 p-4 glass rounded-xl cursor-pointer"><input type="radio" name="payment" defaultChecked={i === 0} className="accent-brand-500" /><span className="font-medium text-sm">{m}</span></label>
                ))}
              </div>
              <div className="flex gap-3">
                <button onClick={() => setStep(1)} className="px-6 py-3 glass rounded-xl font-medium">Back</button>
                <button onClick={() => setStep(3)} className="flex-1 py-3 bg-gradient-to-r from-brand-600 to-purple-600 rounded-xl font-semibold">Place Order</button>
              </div>
            </div>
          )}
        </div>
        <div className="glass-card rounded-2xl p-6 h-fit">
          <h3 className="font-bold mb-4">Order Summary</h3>
          <div className="space-y-3 mb-4">
            {cart.map(item => (
              <div key={item.id} className="flex items-center gap-3">
                <div className="w-12 h-12 flex-shrink-0"><ProductImage product={item} size="sm" /></div>
                <div className="flex-1 min-w-0"><p className="text-sm font-medium truncate">{item.name}</p><p className="text-xs text-gray-400">Qty: {item.quantity}</p></div>
                <span className="text-sm font-medium">${(item.price * item.quantity).toLocaleString()}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-white/10 pt-4 flex justify-between font-bold"><span>Total</span><span className="gradient-text">${cartTotal.toLocaleString()}</span></div>
        </div>
      </div>
    </div>
  );
}
