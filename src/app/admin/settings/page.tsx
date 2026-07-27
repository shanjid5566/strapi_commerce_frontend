'use client'

import { useState } from 'react'
import { Icons } from '@/components/ui/Icons'

export default function AdminSettings() {
  const [saved, setSaved] = useState(false)
  const [settings, setSettings] = useState({
    storeName: 'MobileHub',
    tagline: 'Premium Mobile Accessories',
    supportEmail: 'support@mobilehub.com',
    supportPhone: '+1 (555) 123-4567',
    currencyCode: 'USD',
    currencySymbol: '$',
    timezone: 'America/New_York',
    address: '123 Tech Street, Silicon Valley, CA 94025'
  })

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const handleChange = (field: string, value: string) => {
    setSettings(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Store Settings</h1>
        <button
          onClick={handleSave}
          className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl font-medium hover:from-indigo-600 hover:to-purple-600 transition-all flex items-center gap-2"
        >
          {saved ? (
            <>
              <Icons.Check className="w-5 h-5" />
              Saved!
            </>
          ) : (
            <>
              <Icons.Save className="w-5 h-5" />
              Save Settings
            </>
          )}
        </button>
      </div>

      <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6">
        <h2 className="text-lg font-semibold text-white mb-6">General Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-white/80 text-sm mb-2">Store Name</label>
            <input
              type="text"
              value={settings.storeName}
              onChange={(e) => handleChange('storeName', e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-white/80 text-sm mb-2">Tagline</label>
            <input
              type="text"
              value={settings.tagline}
              onChange={(e) => handleChange('tagline', e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-white/80 text-sm mb-2">Support Email</label>
            <input
              type="email"
              value={settings.supportEmail}
              onChange={(e) => handleChange('supportEmail', e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-white/80 text-sm mb-2">Support Phone</label>
            <input
              type="tel"
              value={settings.supportPhone}
              onChange={(e) => handleChange('supportPhone', e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-white/80 text-sm mb-2">Currency Code</label>
            <input
              type="text"
              value={settings.currencyCode}
              onChange={(e) => handleChange('currencyCode', e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-white/80 text-sm mb-2">Currency Symbol</label>
            <input
              type="text"
              value={settings.currencySymbol}
              onChange={(e) => handleChange('currencySymbol', e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-white/80 text-sm mb-2">Timezone</label>
            <select
              value={settings.timezone}
              onChange={(e) => handleChange('timezone', e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500"
            >
              <option value="America/New_York">Eastern Time (ET)</option>
              <option value="America/Chicago">Central Time (CT)</option>
              <option value="America/Denver">Mountain Time (MT)</option>
              <option value="America/Los_Angeles">Pacific Time (PT)</option>
              <option value="UTC">UTC</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block text-white/80 text-sm mb-2">Physical Address</label>
            <textarea
              value={settings.address}
              onChange={(e) => handleChange('address', e.target.value)}
              rows={3}
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-indigo-500 resize-none"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
