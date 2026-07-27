'use client'

import { useState } from 'react'
import { Icons } from '@/components/ui/Icons'
import { useAuth } from '@/contexts/AuthContext'

export default function AdminProfile() {
  const { user } = useAuth()
  const [saved, setSaved] = useState(false)
  const [profile, setProfile] = useState({
    fullName: user?.name || 'Admin User',
    email: user?.email || 'admin@mobilehub.com',
    avatar: user?.avatar || '/avatars/default.jpg'
  })
  const [passwords, setPasswords] = useState({
    current: '',
    newPassword: '',
    confirm: ''
  })

  const handleProfileSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const handlePasswordChange = () => {
    if (passwords.newPassword === passwords.confirm && passwords.current) {
      setPasswords({ current: '', newPassword: '', confirm: '' })
      alert('Password updated successfully!')
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">My Profile</h1>

      <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6">
        <div className="flex items-center gap-6 mb-8">
          <div className="relative">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
              <Icons.User className="w-12 h-12 text-white" />
            </div>
            <button className="absolute -bottom-2 -right-2 p-2 bg-indigo-500 rounded-full text-white hover:bg-indigo-600 transition-colors">
              <Icons.Camera className="w-4 h-4" />
            </button>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">{profile.fullName}</h2>
            <p className="text-white/60">{profile.email}</p>
          </div>
        </div>

        <h3 className="text-lg font-semibold text-white mb-4">Personal Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-white/80 text-sm mb-2">Full Name</label>
            <input
              type="text"
              value={profile.fullName}
              onChange={(e) => setProfile(prev => ({ ...prev, fullName: e.target.value }))}
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-white/80 text-sm mb-2">Email</label>
            <input
              type="email"
              value={profile.email}
              onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        <button
          onClick={handleProfileSave}
          className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl font-medium hover:from-indigo-600 hover:to-purple-600 transition-all flex items-center gap-2"
        >
          {saved ? (
            <>
              <Icons.Check className="w-5 h-5" />
              Profile Updated!
            </>
          ) : (
            <>
              <Icons.Save className="w-5 h-5" />
              Update Profile
            </>
          )}
        </button>
      </div>

      <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Change Password</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <label className="block text-white/80 text-sm mb-2">Current Password</label>
            <input
              type="password"
              value={passwords.current}
              onChange={(e) => setPasswords(prev => ({ ...prev, current: e.target.value }))}
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-white/80 text-sm mb-2">New Password</label>
            <input
              type="password"
              value={passwords.newPassword}
              onChange={(e) => setPasswords(prev => ({ ...prev, newPassword: e.target.value }))}
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-white/80 text-sm mb-2">Confirm Password</label>
            <input
              type="password"
              value={passwords.confirm}
              onChange={(e) => setPasswords(prev => ({ ...prev, confirm: e.target.value }))}
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>
        <button
          onClick={handlePasswordChange}
          disabled={!passwords.current || !passwords.newPassword || passwords.newPassword !== passwords.confirm}
          className="px-6 py-3 bg-white/10 border border-white/20 text-white rounded-xl font-medium hover:bg-white/20 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Icons.Lock className="w-5 h-5" />
          Change Password
        </button>
      </div>
    </div>
  )
}
