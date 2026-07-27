'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Icons } from '@/components/ui/Icons';

export default function AdminProfilePage() {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name || 'Admin User');
  const [email, setEmail] = useState(user?.email || 'admin@mobilehub.com');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [saved, setSaved] = useState(false);
  const [passwordSaved, setPasswordSaved] = useState(false);

  const handleSaveProfile = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleChangePassword = () => {
    if (!currentPassword || !newPassword || newPassword !== confirmPassword) return;
    setPasswordSaved(true);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setTimeout(() => setPasswordSaved(false), 2000);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">My Profile</h2>
        <button
          onClick={handleSaveProfile}
          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-brand-600 to-purple-600 text-white text-sm font-bold rounded-xl hover:opacity-90 transition-opacity"
        >
          <Icons.Save size={14} />
          {saved ? 'Saved!' : 'Save Changes'}
        </button>
      </div>

      <div className="glass-card rounded-2xl p-6 border border-white/10">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-purple-500 flex items-center justify-center">
            <Icons.User size={20} className="text-white" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">Personal Information</h3>
            <p className="text-xs text-white/50">Update your personal details</p>
          </div>
        </div>

        <div className="flex items-start gap-6">
          <div className="flex-shrink-0">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-brand-500 to-purple-500 flex items-center justify-center text-white text-2xl font-bold">
              {name.charAt(0).toUpperCase()}
            </div>
          </div>

          <div className="flex-1 space-y-4">
            <div>
              <label className="block text-xs text-white/50 mb-1.5">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 bg-black/30 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-brand-500"
              />
            </div>
            <div>
              <label className="block text-xs text-white/50 mb-1.5">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 bg-black/30 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-brand-500"
              />
            </div>
            <div>
              <label className="block text-xs text-white/50 mb-1.5">Role</label>
              <input
                type="text"
                value={user?.role?.replace('_', ' ').replace(/\b\w/g, (l) => l.toUpperCase()) || 'Super Admin'}
                disabled
                className="w-full px-4 py-2.5 bg-black/30 border border-white/10 rounded-xl text-sm text-white/50 cursor-not-allowed"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="glass-card rounded-2xl p-6 border border-white/10">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-rose-500 flex items-center justify-center">
            <Icons.Lock size={20} className="text-white" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">Change Password</h3>
            <p className="text-xs text-white/50">Update your account password</p>
          </div>
        </div>

        <div className="space-y-4 max-w-md">
          <div>
            <label className="block text-xs text-white/50 mb-1.5">Current Password</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full px-4 py-2.5 bg-black/30 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-brand-500"
              placeholder="••••••••"
            />
          </div>
          <div>
            <label className="block text-xs text-white/50 mb-1.5">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-2.5 bg-black/30 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-brand-500"
              placeholder="••••••••"
            />
          </div>
          <div>
            <label className="block text-xs text-white/50 mb-1.5">Confirm New Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2.5 bg-black/30 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-brand-500"
              placeholder="••••••••"
            />
          </div>
          {newPassword && confirmPassword && newPassword !== confirmPassword && (
            <p className="text-xs text-red-400">Passwords do not match</p>
          )}
          <button
            onClick={handleChangePassword}
            disabled={!currentPassword || !newPassword || newPassword !== confirmPassword}
            className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-brand-600 to-purple-600 text-white text-sm font-bold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Icons.Key size={14} />
            {passwordSaved ? 'Password Updated!' : 'Update Password'}
          </button>
        </div>
      </div>
    </div>
  );
}
