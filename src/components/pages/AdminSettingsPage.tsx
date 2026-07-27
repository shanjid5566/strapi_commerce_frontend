'use client';

import { useState } from 'react';
import { Icons } from '@/components/ui/Icons';

export default function AdminSettingsPage() {
  const [isSaved, setIsSaved] = useState(false);
  
  const [settings, setSettings] = useState({
    storeName: 'MobileHub',
    tagline: 'The Future of Tech, Today.',
    supportEmail: 'support@mobilehub.com',
    supportPhone: '+1 (555) 123-4567',
    currencyCode: 'USD',
    currencySymbol: '$',
    timezone: 'UTC',
    address: '123 Tech Lane, Silicon Valley, CA 94025'
  });

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const fields = [
    { key: 'storeName', label: 'Store Name', type: 'text' },
    { key: 'tagline', label: 'Tagline', type: 'text' },
    { key: 'supportEmail', label: 'Support Email', type: 'email' },
    { key: 'supportPhone', label: 'Support Phone', type: 'text' },
    { key: 'currencyCode', label: 'Currency Code', type: 'text' },
    { key: 'currencySymbol', label: 'Currency Symbol', type: 'text' },
    { 
      key: 'timezone', 
      label: 'Timezone', 
      type: 'select', 
      options: [
        'UTC-12 (Baker Island)', 
        'UTC-8 (Pacific Time)', 
        'UTC-5 (Eastern Time)', 
        'UTC (London)', 
        'UTC+1 (Paris)', 
        'UTC+4 (Dubai)', 
        'UTC+5:30 (India)', 
        'UTC+8 (Singapore)', 
        'UTC+9 (Tokyo)', 
        'UTC+11 (Sydney)'
      ] 
    },
    { key: 'address', label: 'Physical Address', type: 'text' }
  ];

  return (
    <div className="max-w-3xl space-y-6 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">Store Settings</h2>
          <p className="text-sm text-white/50 mt-1">Manage global configuration for MobileHub</p>
        </div>
        <div className="flex items-center gap-4">
          {isSaved && <span className="text-sm text-green-400 flex items-center gap-1"><Icons.Check size={16} /> Saved</span>}
          <button 
            onClick={handleSave} 
            className="px-6 py-2.5 bg-gradient-to-r from-brand-600 to-purple-600 rounded-xl text-sm font-semibold flex items-center gap-2 hover:shadow-lg transition-all text-white hover:opacity-90"
          >
            <Icons.Save size={16} /> Save Settings
          </button>
        </div>
      </div>

      <div className="glass-card rounded-2xl p-6 border border-white/10">
        <h3 className="text-sm font-bold text-brand-400 uppercase tracking-wider mb-4 border-b border-white/10 pb-3">General Information</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          {fields.map(f => (
            <div key={f.key}>
              <label className="text-xs text-white/50 mb-1.5 block font-medium">{f.label}</label>
              {f.type === 'select' ? (
                <select 
                  value={settings[f.key as keyof typeof settings]} 
                  onChange={(e) => setSettings(prev => ({ ...prev, [f.key]: e.target.value }))}
                  className="w-full px-4 py-2.5 glass bg-black/30 border border-white/10 rounded-xl text-sm text-white appearance-none cursor-pointer outline-none focus:border-brand-500"
                >
                  {f.options?.map(opt => <option key={opt} value={opt} className="bg-gray-900">{opt}</option>)}
                </select>
              ) : (
                <input 
                  type={f.type} 
                  value={settings[f.key as keyof typeof settings]} 
                  onChange={(e) => setSettings(prev => ({ ...prev, [f.key]: e.target.value }))}
                  className="w-full px-4 py-2.5 glass bg-black/30 border border-white/10 rounded-xl text-sm text-white outline-none focus:border-brand-500" 
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
