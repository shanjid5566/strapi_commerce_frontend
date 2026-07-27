'use client';

import React, { useState, useMemo } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { useCart } from '@/contexts/CartContext';
import { mockOrders } from '@/data/orders';
import { mockProducts } from '@/data/products';
import { Icons } from '@/components/ui/Icons';
import ProductImage from '@/components/ui/ProductImage';

interface UserDashboardProps {
  onNavigate: (page: string, id?: number) => void;
}

export default function UserDashboard({ onNavigate }: UserDashboardProps) {
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState('orders');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { id: 'orders', label: 'My Orders', icon: <Icons.Package /> },
    { id: 'profile', label: 'Profile', icon: <Icons.User /> },
    { id: 'addresses', label: 'Addresses', icon: <Icons.Map /> },
    { id: 'wishlist', label: 'Wishlist', icon: <Icons.Heart filled={false} /> },
    { id: 'security', label: 'Security', icon: <Icons.Lock /> },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      {/* Header Card */}
      <div className="glass-card rounded-2xl p-6 mb-8 flex flex-col sm:flex-row items-center gap-6">
        <div className="relative">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-brand-500 to-purple-500 flex items-center justify-center text-2xl font-bold">{user?.avatar || 'U'}</div>
          <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-brand-600 border-2 border-gray-950 flex items-center justify-center cursor-pointer hover:bg-brand-500">
            <Icons.Camera />
          </div>
        </div>
        <div className="text-center sm:text-left flex-1">
          <h1 className="text-2xl font-bold">{user?.name || 'User'}</h1>
          <p className="text-gray-400">{user?.email || 'user@email.com'}</p>
          <div className="flex items-center justify-center sm:justify-start gap-3 mt-2">
            <span className="px-2 py-0.5 bg-brand-500/10 text-brand-400 text-xs font-medium rounded-full">Premium Member</span>
            <span className="text-xs text-gray-500">Since Jan 2024</span>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div><p className="text-xl font-bold">6</p><p className="text-xs text-gray-500">Orders</p></div>
          <div><p className="text-xl font-bold">3</p><p className="text-xs text-gray-500">Wishlist</p></div>
          <div><p className="text-xl font-bold">2</p><p className="text-xs text-gray-500">Addresses</p></div>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Sidebar */}
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden mb-4 px-4 py-2 glass rounded-xl text-sm font-medium flex items-center gap-2">
          <Icons.Menu /> Menu
        </button>
        <aside className={`${sidebarOpen ? 'fixed inset-0 z-50 p-6 bg-gray-950/95' : 'hidden'} lg:block lg:w-64 flex-shrink-0`}>
          {sidebarOpen && <button onClick={() => setSidebarOpen(false)} className="lg:hidden mb-4 text-gray-400 flex items-center gap-2"><Icons.X /> Close</button>}
          <div className="sticky-sidebar">
            <div className="glass-card rounded-2xl p-3">
              {navItems.map(item => (
                <button key={item.id} onClick={() => { setActiveSection(item.id); setSidebarOpen(false); }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all mb-1 ${activeSection === item.id ? 'bg-brand-600/20 text-brand-400' : 'text-gray-300 hover:bg-white/5 hover:text-white'}`}>
                  {item.icon}{item.label}
                </button>
              ))}
            </div>
            <div className="glass-card rounded-2xl p-4 mt-4">
              <div className="flex items-center gap-3 mb-3">
                <Icons.Shield />
                <span className="text-sm font-medium">Need help?</span>
              </div>
              <p className="text-xs text-gray-400 mb-3">Our support team is available 24/7</p>
              <button onClick={() => onNavigate('contact')} className="w-full py-2 glass rounded-xl text-xs font-medium hover:bg-white/5">Contact Support</button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {activeSection === 'orders' && <OrdersSection />}
          {activeSection === 'profile' && <ProfileSection />}
          {activeSection === 'addresses' && <AddressesSection />}
          {activeSection === 'wishlist' && <WishlistSection onNavigate={onNavigate} />}
          {activeSection === 'security' && <SecuritySection />}
        </div>
      </div>
    </div>
  );
}

// ORDERS SECTION — shows products
function OrdersSection() {
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const statusColors: Record<string, string> = { delivered: 'text-green-400 bg-green-500/10', shipped: 'text-blue-400 bg-blue-500/10', processing: 'text-yellow-400 bg-yellow-500/10', pending: 'text-gray-400 bg-gray-500/10', cancelled: 'text-red-400 bg-red-500/10' };

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-bold">Order History</h2>
        <span className="text-sm text-gray-400">{mockOrders.length} orders</span>
      </div>
      {mockOrders.map(order => {
        const products = order.items.map(i => mockProducts.find(p => p.id === i.productId)).filter(Boolean) as any[];
        const isExpanded = expandedOrder === order.id;
        return (
          <div key={order.id} className="glass-card rounded-2xl overflow-hidden">
            <button onClick={() => setExpandedOrder(isExpanded ? null : order.id)} className="w-full p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-white/[0.02] transition-colors text-left">
              <div className="flex items-center gap-4">
                <div className="flex -space-x-2">
                  {products.slice(0, 3).map(p => (
                    <div key={p.id} className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-950">
                      <ProductImage product={p} size="sm" />
                    </div>
                  ))}
                  {products.length > 3 && <div className="w-10 h-10 rounded-full bg-brand-600 border-2 border-gray-950 flex items-center justify-center text-xs font-bold">+{products.length - 3}</div>}
                </div>
                <div>
                  <span className="font-mono text-sm text-brand-400">{order.id}</span>
                  <p className="text-xs text-gray-500 mt-0.5">{order.date} · {products.length} item{products.length > 1 ? 's' : ''}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-bold">${order.total.toLocaleString()}</span>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[order.status]}`}>{order.status.charAt(0).toUpperCase() + order.status.slice(1)}</span>
                <span className={`text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}><Icons.ChevronDown /></span>
              </div>
            </button>
            {isExpanded && (
              <div className="border-t border-white/5 p-5 animate-slide-down">
                {/* Order Timeline */}
                <div className="flex items-center gap-1 mb-5">
                  {['Placed', 'Processing', 'Shipped', 'Delivered'].map((step, i) => {
                    const stepIndex = ['pending', 'processing', 'shipped', 'delivered'].indexOf(order.status);
                    const isActive = i <= stepIndex;
                    return (
                      <React.Fragment key={step}>
                        <div className="flex flex-col items-center gap-1">
                          <div className={`w-3 h-3 rounded-full ${isActive ? 'bg-brand-500' : 'bg-gray-700'}`} />
                          <span className="text-[10px] text-gray-500">{step}</span>
                        </div>
                        {i < 3 && <div className={`flex-1 h-0.5 mb-4 ${i < stepIndex ? 'bg-brand-500' : 'bg-gray-700'}`} />}
                      </React.Fragment>
                    );
                  })}
                </div>
                {/* Products */}
                <h4 className="text-sm font-medium text-gray-300 mb-3">Items in this order</h4>
                <div className="space-y-3 mb-4">
                  {products.map(p => {
                    const itemInfo = order.items.find(i => i.productId === p.id);
                    return (
                      <div key={p.id} className="flex items-center gap-3 p-3 glass rounded-xl">
                        <div className="w-14 h-14 flex-shrink-0"><ProductImage product={p} size="sm" /></div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">{p.name}</p>
                          <p className="text-xs text-gray-500">{p.brand} · Qty: {itemInfo?.qty || 1}</p>
                        </div>
                        <span className="text-sm font-medium">${(p.price * (itemInfo?.qty || 1)).toLocaleString()}</span>
                      </div>
                    );
                  })}
                </div>
                <div className="flex flex-wrap gap-2 pt-3 border-t border-white/5">
                  <button className="px-4 py-2 glass rounded-xl text-xs font-medium hover:bg-white/5">Track Package</button>
                  <button className="px-4 py-2 glass rounded-xl text-xs font-medium hover:bg-white/5">Download Invoice</button>
                  {order.status === 'delivered' && <button className="px-4 py-2 bg-brand-600 rounded-xl text-xs font-medium hover:bg-brand-500">Buy Again</button>}
                  {order.status !== 'cancelled' && order.status !== 'delivered' && <button className="px-4 py-2 text-red-400 text-xs font-medium hover:bg-red-500/10 rounded-xl">Cancel Order</button>}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// PROFILE SECTION — email readonly, more fields
function ProfileSection() {
  const { user } = useAuth();
  const [profile, setProfile] = useState({
    name: user?.name || 'Alex Johnson',
    phone: '+1 (555) 012-3456',
    dob: '1992-05-15',
    gender: 'prefer-not',
    bio: 'Tech enthusiast and photography lover. Always on the hunt for the next great smartphone.',
    newsletter: true,
    promotions: false,
  });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Profile Information</h2>
        {saved && <span className="text-xs text-green-400 flex items-center gap-1"><Icons.Check /> Saved</span>}
      </div>

      {/* Avatar */}
      <div className="glass-card rounded-2xl p-6">
        <h3 className="text-sm font-medium text-gray-300 mb-4">Profile Picture</h3>
        <div className="flex items-center gap-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-brand-500 to-purple-500 flex items-center justify-center text-3xl font-bold">{user?.avatar || 'U'}</div>
            <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-brand-600 border-2 border-gray-950 flex items-center justify-center hover:bg-brand-500">
              <Icons.Camera />
            </button>
          </div>
          <div>
            <p className="text-sm font-medium mb-1">Upload a new photo</p>
            <p className="text-xs text-gray-500 mb-3">JPG, PNG or GIF. Max 2MB.</p>
            <div className="flex gap-2">
              <button className="px-4 py-2 glass rounded-xl text-xs font-medium hover:bg-white/5">Upload</button>
              <button className="px-4 py-2 text-red-400 text-xs font-medium hover:bg-red-500/10 rounded-xl">Remove</button>
            </div>
          </div>
        </div>
      </div>

      {/* Personal Info */}
      <div className="glass-card rounded-2xl p-6">
        <h3 className="text-sm font-medium text-gray-300 mb-4">Personal Information</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-gray-400 mb-1.5 block">Full Name</label>
            <input value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} className="w-full px-4 py-2.5 glass rounded-xl text-white text-sm" />
          </div>
          <div>
            <label className="text-xs text-gray-400 mb-1.5 flex items-center gap-1.5">
              Email Address
              <span className="flex items-center gap-1 text-[10px] text-gray-500 bg-white/5 px-1.5 py-0.5 rounded"><Icons.Lock /> Cannot be changed</span>
            </label>
            <input value={user?.email || 'alex@demo.com'} readOnly className="w-full px-4 py-2.5 glass rounded-xl text-gray-400 text-sm cursor-not-allowed bg-white/[0.02]" />
          </div>
          <div>
            <label className="text-xs text-gray-400 mb-1.5 block">Phone Number</label>
            <input value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} className="w-full px-4 py-2.5 glass rounded-xl text-white text-sm" />
          </div>
          <div>
            <label className="text-xs text-gray-400 mb-1.5 block">Date of Birth</label>
            <input type="date" value={profile.dob} onChange={(e) => setProfile({ ...profile, dob: e.target.value })} className="w-full px-4 py-2.5 glass rounded-xl text-white text-sm" />
          </div>
          <div>
            <label className="text-xs text-gray-400 mb-1.5 block">Gender</label>
            <select value={profile.gender} onChange={(e) => setProfile({ ...profile, gender: e.target.value })} className="w-full px-4 py-2.5 glass rounded-xl text-white text-sm appearance-none cursor-pointer">
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
              <option value="prefer-not">Prefer not to say</option>
            </select>
          </div>
          <div>
            <label className="text-xs text-gray-400 mb-1.5 block">Member Since</label>
            <input value="January 2024" readOnly className="w-full px-4 py-2.5 glass rounded-xl text-gray-400 text-sm cursor-not-allowed bg-white/[0.02]" />
          </div>
        </div>
        <div className="mt-4">
          <label className="text-xs text-gray-400 mb-1.5 block">Bio</label>
          <textarea value={profile.bio} onChange={(e) => setProfile({ ...profile, bio: e.target.value })} rows={3} className="w-full px-4 py-2.5 glass rounded-xl text-white text-sm resize-none" maxLength={200} />
          <p className="text-xs text-gray-500 mt-1 text-right">{profile.bio.length}/200</p>
        </div>
      </div>

      {/* Communication Preferences */}
      <div className="glass-card rounded-2xl p-6">
        <h3 className="text-sm font-medium text-gray-300 mb-4">Communication Preferences</h3>
        <div className="space-y-3">
          {[
            { key: 'newsletter', label: 'Newsletter', desc: 'Receive weekly updates about new products and deals' },
            { key: 'promotions', label: 'Promotional Offers', desc: 'Get notified about special discounts and sales' },
          ].map(pref => (
            <label key={pref.key} className="flex items-start gap-3 p-3 glass rounded-xl cursor-pointer hover:bg-white/[0.02]">
              <input type="checkbox" checked={(profile as any)[pref.key]} onChange={(e) => setProfile({ ...profile, [pref.key]: e.target.checked })} className="accent-brand-500 mt-0.5" />
              <div>
                <p className="text-sm font-medium">{pref.label}</p>
                <p className="text-xs text-gray-500">{pref.desc}</p>
              </div>
            </label>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <button onClick={handleSave} className="px-6 py-2.5 bg-gradient-to-r from-brand-600 to-purple-600 rounded-xl text-sm font-semibold flex items-center gap-2">
          <Icons.Save /> Save Changes
        </button>
      </div>
    </div>
  );
}

// ADDRESSES SECTION
function AddressesSection() {
  const [addresses, setAddresses] = useState([
    { id: 1, label: 'Home', name: 'Alex Johnson', street: '123 Main Street, Apt 4B', city: 'New York', state: 'NY', zip: '10001', country: 'United States', phone: '+1 (555) 012-3456', isDefault: true },
    { id: 2, label: 'Work', name: 'Alex Johnson', street: '456 Tech Avenue, Floor 12', city: 'Brooklyn', state: 'NY', zip: '11201', country: 'United States', phone: '+1 (555) 987-6543', isDefault: false },
  ]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ label: 'Home', name: '', street: '', city: '', state: '', zip: '', country: 'United States', phone: '' });

  const handleSave = () => {
    if (editingId) {
      setAddresses(addresses.map(a => a.id === editingId ? { ...form, id: editingId, isDefault: a.isDefault } : a));
    } else {
      setAddresses([...addresses, { ...form, id: Date.now(), isDefault: addresses.length === 0 }]);
    }
    setShowForm(false);
    setEditingId(null);
    setForm({ label: 'Home', name: '', street: '', city: '', state: '', zip: '', country: 'United States', phone: '' });
  };

  const handleEdit = (addr: typeof addresses[0]) => {
    setForm(addr);
    setEditingId(addr.id);
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    setAddresses(addresses.filter(a => a.id !== id));
  };

  const setDefault = (id: number) => {
    setAddresses(addresses.map(a => ({ ...a, isDefault: a.id === id })));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Saved Addresses</h2>
        <button onClick={() => { setShowForm(true); setEditingId(null); setForm({ label: 'Home', name: '', street: '', city: '', state: '', zip: '', country: 'United States', phone: '' }); }} className="px-4 py-2 bg-gradient-to-r from-brand-600 to-purple-600 rounded-xl text-sm font-semibold flex items-center gap-2">
          <Icons.Plus /> Add New
        </button>
      </div>

      {showForm && (
        <div className="glass-card rounded-2xl p-6 animate-slide-down">
          <h3 className="font-bold mb-4">{editingId ? 'Edit Address' : 'New Address'}</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-gray-400 mb-1 block">Label</label>
              <select value={form.label} onChange={(e) => setForm({ ...form, label: e.target.value })} className="w-full px-4 py-2.5 glass rounded-xl text-white text-sm appearance-none cursor-pointer">
                <option>Home</option><option>Work</option><option>Other</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-gray-400 mb-1 block">Full Name</label>
              <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Recipient name" className="w-full px-4 py-2.5 glass rounded-xl text-white text-sm" />
            </div>
            <div className="sm:col-span-2">
              <label className="text-xs text-gray-400 mb-1 block">Street Address</label>
              <input value={form.street} onChange={(e) => setForm({ ...form, street: e.target.value })} placeholder="123 Main Street" className="w-full px-4 py-2.5 glass rounded-xl text-white text-sm" />
            </div>
            <div>
              <label className="text-xs text-gray-400 mb-1 block">City</label>
              <input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} placeholder="New York" className="w-full px-4 py-2.5 glass rounded-xl text-white text-sm" />
            </div>
            <div>
              <label className="text-xs text-gray-400 mb-1 block">State / Province</label>
              <input value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} placeholder="NY" className="w-full px-4 py-2.5 glass rounded-xl text-white text-sm" />
            </div>
            <div>
              <label className="text-xs text-gray-400 mb-1 block">ZIP / Postal Code</label>
              <input value={form.zip} onChange={(e) => setForm({ ...form, zip: e.target.value })} placeholder="10001" className="w-full px-4 py-2.5 glass rounded-xl text-white text-sm" />
            </div>
            <div>
              <label className="text-xs text-gray-400 mb-1 block">Country</label>
              <input value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} className="w-full px-4 py-2.5 glass rounded-xl text-white text-sm" />
            </div>
            <div className="sm:col-span-2">
              <label className="text-xs text-gray-400 mb-1 block">Phone</label>
              <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+1 (555) 000-0000" className="w-full px-4 py-2.5 glass rounded-xl text-white text-sm" />
            </div>
          </div>
          <div className="flex gap-3 mt-4">
            <button onClick={() => { setShowForm(false); setEditingId(null); }} className="px-4 py-2 glass rounded-xl text-sm">Cancel</button>
            <button onClick={handleSave} className="px-4 py-2 bg-brand-600 rounded-xl text-sm font-medium">{editingId ? 'Update' : 'Save'} Address</button>
          </div>
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-4">
        {addresses.map(addr => (
          <div key={addr.id} className={`glass-card rounded-2xl p-5 relative ${addr.isDefault ? 'border-brand-500/30' : ''}`}>
            {addr.isDefault && <span className="absolute top-3 right-3 px-2 py-0.5 bg-brand-500/20 text-brand-400 text-[10px] font-medium rounded-full">DEFAULT</span>}
            <div className="flex items-start gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-brand-500/10 text-brand-400 flex items-center justify-center flex-shrink-0"><Icons.MapPin /></div>
              <div>
                <h4 className="font-bold">{addr.label}</h4>
                <p className="text-sm text-gray-300">{addr.name}</p>
              </div>
            </div>
            <div className="text-sm text-gray-400 space-y-1 mb-4">
              <p>{addr.street}</p>
              <p>{addr.city}, {addr.state} {addr.zip}</p>
              <p>{addr.country}</p>
              <p className="text-xs">{addr.phone}</p>
            </div>
            <div className="flex flex-wrap gap-2 pt-3 border-t border-white/5">
              {!addr.isDefault && <button onClick={() => setDefault(addr.id)} className="px-3 py-1.5 glass rounded-lg text-xs font-medium hover:bg-white/5">Set Default</button>}
              <button onClick={() => handleEdit(addr)} className="px-3 py-1.5 glass rounded-lg text-xs font-medium hover:bg-white/5 flex items-center gap-1"><Icons.Edit /> Edit</button>
              <button onClick={() => handleDelete(addr.id)} className="px-3 py-1.5 text-red-400 text-xs font-medium hover:bg-red-500/10 rounded-lg flex items-center gap-1"><Icons.Trash /> Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// WISHLIST SECTION
function WishlistSection({ onNavigate }: { onNavigate: (page: string, id?: number) => void }) {
  const { wishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();
  const wishedProducts = mockProducts.filter(p => wishlist.includes(p.id));

  if (wishedProducts.length === 0) {
    return (
      <div className="glass-card rounded-2xl p-12 text-center animate-fade-in">
        <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-brand-500/10 flex items-center justify-center text-brand-400">
          <Icons.Heart filled={false} />
        </div>
        <h3 className="text-xl font-bold mb-2">Your wishlist is empty</h3>
        <p className="text-gray-400 text-sm mb-6">Save items you love to buy them later</p>
        <button onClick={() => onNavigate('catalog')} className="px-6 py-2.5 bg-gradient-to-r from-brand-600 to-purple-600 rounded-xl text-sm font-semibold">Browse Products</button>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">My Wishlist</h2>
        <span className="text-sm text-gray-400">{wishedProducts.length} item{wishedProducts.length > 1 ? 's' : ''}</span>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {wishedProducts.map(p => (
          <div key={p.id} className="glass-card rounded-2xl overflow-hidden hover-lift group">
            <div className="product-img-container cursor-pointer" onClick={() => onNavigate('product', p.id)}>
              <ProductImage product={p} size="md" />
            </div>
            <div className="p-4">
              <p className="text-xs text-brand-400 font-medium mb-1">{p.brand}</p>
              <h3 className="font-semibold text-sm line-clamp-2 mb-2 cursor-pointer hover:text-brand-300" onClick={() => onNavigate('product', p.id)}>{p.name}</h3>
              <div className="flex items-baseline gap-2 mb-3">
                <span className="text-lg font-bold">${p.price}</span>
                <span className="text-sm text-gray-500 line-through">${p.originalPrice}</span>
              </div>
              <div className="flex gap-2">
                <button onClick={() => addToCart(p)} className="flex-1 py-2 bg-brand-600 rounded-xl text-xs font-semibold hover:bg-brand-500 transition-colors">Add to Cart</button>
                <button onClick={() => toggleWishlist(p.id)} className="px-3 py-2 glass rounded-xl text-red-400 hover:bg-red-500/10 transition-colors"><Icons.Trash /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// SECURITY SECTION — Change Password
function SecuritySection() {
  const [passwords, setPasswords] = useState({ current: '', newPw: '', confirm: '' });
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  const passwordStrength = useMemo(() => {
    const pw = passwords.newPw;
    if (!pw) return { score: 0, label: '', color: '' };
    let score = 0;
    if (pw.length >= 8) score++;
    if (pw.length >= 12) score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;
    const labels = ['', 'Very Weak', 'Weak', 'Fair', 'Strong', 'Very Strong'];
    const colors = ['', 'bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-green-500', 'bg-emerald-500'];
    return { score, label: labels[score], color: colors[score] };
  }, [passwords.newPw]);

  const handleChange = () => {
    setError('');
    if (!passwords.current || !passwords.newPw || !passwords.confirm) { setError('Please fill in all fields'); return; }
    if (passwords.newPw !== passwords.confirm) { setError('New passwords do not match'); return; }
    if (passwords.newPw.length < 8) { setError('Password must be at least 8 characters'); return; }
    setSaved(true);
    setPasswords({ current: '', newPw: '', confirm: '' });
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-xl font-bold">Security Settings</h2>

      {/* Change Password */}
      <div className="glass-card rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-medium text-gray-300">Change Password</h3>
            <p className="text-xs text-gray-500 mt-1">Update your password to keep your account secure</p>
          </div>
          {saved && <span className="text-xs text-green-400 flex items-center gap-1"><Icons.Check /> Password updated</span>}
        </div>
        <div className="space-y-4 max-w-md">
          <div>
            <label className="text-xs text-gray-400 mb-1.5 block">Current Password</label>
            <div className="relative">
              <input type={showCurrent ? 'text' : 'password'} value={passwords.current} onChange={(e) => setPasswords({ ...passwords, current: e.target.value })} placeholder="Enter current password" className="w-full px-4 py-2.5 glass rounded-xl text-white text-sm pr-10" />
              <button onClick={() => setShowCurrent(!showCurrent)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white">
                <Icons.Eye />
              </button>
            </div>
          </div>
          <div>
            <label className="text-xs text-gray-400 mb-1.5 block">New Password</label>
            <div className="relative">
              <input type={showNew ? 'text' : 'password'} value={passwords.newPw} onChange={(e) => setPasswords({ ...passwords, newPw: e.target.value })} placeholder="Enter new password" className="w-full px-4 py-2.5 glass rounded-xl text-white text-sm pr-10" />
              <button onClick={() => setShowNew(!showNew)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white">
                <Icons.Eye />
              </button>
            </div>
            {passwords.newPw && (
              <div className="mt-2">
                <div className="flex gap-1 mb-1">
                  {[1, 2, 3, 4, 5].map(i => (
                    <div key={i} className={`h-1 flex-1 rounded-full ${i <= passwordStrength.score ? passwordStrength.color : 'bg-white/10'}`} />
                  ))}
                </div>
                <p className="text-xs text-gray-400">Strength: <span className={passwordStrength.score >= 4 ? 'text-green-400' : passwordStrength.score >= 2 ? 'text-yellow-400' : 'text-red-400'}>{passwordStrength.label}</span></p>
              </div>
            )}
          </div>
          <div>
            <label className="text-xs text-gray-400 mb-1.5 block">Confirm New Password</label>
            <input type="password" value={passwords.confirm} onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })} placeholder="Confirm new password" className="w-full px-4 py-2.5 glass rounded-xl text-white text-sm" />
            {passwords.confirm && passwords.newPw !== passwords.confirm && (
              <p className="text-xs text-red-400 mt-1">Passwords do not match</p>
            )}
          </div>
          {error && <p className="text-xs text-red-400">{error}</p>}
          <button onClick={handleChange} className="px-6 py-2.5 bg-gradient-to-r from-brand-600 to-purple-600 rounded-xl text-sm font-semibold">Update Password</button>
        </div>
      </div>

      {/* Two-Factor */}
      <div className="glass-card rounded-2xl p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-500/10 text-brand-400 flex items-center justify-center flex-shrink-0"><Icons.Shield /></div>
            <div>
              <h3 className="text-sm font-medium">Two-Factor Authentication</h3>
              <p className="text-xs text-gray-500 mt-1">Add an extra layer of security to your account</p>
            </div>
          </div>
          <button className="px-4 py-2 glass rounded-xl text-xs font-medium hover:bg-white/5">Enable</button>
        </div>
      </div>

      {/* Active Sessions */}
      <div className="glass-card rounded-2xl p-6">
        <h3 className="text-sm font-medium text-gray-300 mb-4">Active Sessions</h3>
        <div className="space-y-3">
          {[
            { device: 'MacBook Pro · Chrome', location: 'New York, US', current: true, time: 'Active now' },
            { device: 'iPhone 15 · Safari', location: 'New York, US', current: false, time: '2 hours ago' },
          ].map((s, i) => (
            <div key={i} className="flex items-center justify-between p-3 glass rounded-xl">
              <div>
                <p className="text-sm font-medium flex items-center gap-2">{s.device} {s.current && <span className="text-[10px] text-green-400 bg-green-500/10 px-1.5 py-0.5 rounded">Current</span>}</p>
                <p className="text-xs text-gray-500">{s.location} · {s.time}</p>
              </div>
              {!s.current && <button className="text-xs text-red-400 hover:text-red-300">Revoke</button>}
            </div>
          ))}
        </div>
      </div>

      {/* Danger Zone */}
      <div className="glass-card rounded-2xl p-6 border border-red-500/20">
        <h3 className="text-sm font-medium text-red-400 mb-2">Danger Zone</h3>
        <p className="text-xs text-gray-500 mb-4">Once you delete your account, there is no going back.</p>
        <button className="px-4 py-2 border border-red-500/30 text-red-400 rounded-xl text-xs font-medium hover:bg-red-500/10">Delete Account</button>
      </div>
    </div>
  );
}
