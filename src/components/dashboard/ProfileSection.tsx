'use client';

import { useState } from 'react';
import { Icons } from '@/components/ui/Icons';

export default function ProfileSection() {
  const [formData, setFormData] = useState({
    fullName: 'Alex Johnson',
    phone: '+1 (555) 123-4567',
    dob: '1990-05-15',
    gender: 'male',
    bio: 'Tech enthusiast and mobile phone collector. Always looking for the latest gadgets and innovations.',
    newsletter: true,
    promoOffers: false,
  });
  const [saved, setSaved] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const bioLength = formData.bio.length;
  const maxBioLength = 200;

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Profile</h2>

      <div className="p-5 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/30 shadow-lg">
        <div className="flex items-center gap-5">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
              AJ
            </div>
            <button className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 flex items-center justify-center shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <Icons.Camera size={14} className="text-gray-600 dark:text-gray-300" />
            </button>
          </div>
          <div>
            <p className="font-semibold text-gray-900 dark:text-white">Profile Photo</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              JPG, PNG or GIF. Max 2MB.
            </p>
          </div>
        </div>
      </div>

      <div className="p-5 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/30 shadow-lg">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
          Personal Information
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  value="alex.johnson@email.com"
                  readOnly
                  className="w-full px-4 py-2.5 pr-10 rounded-xl bg-gray-100 dark:bg-gray-700/30 border border-gray-200 dark:border-gray-600 text-sm text-gray-500 dark:text-gray-400 cursor-not-allowed"
                />
                <Icons.Lock size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">
                Date of Birth
              </label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">
                Gender
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                <option value="prefer-not">Prefer not to say</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">
              Member Since
            </label>
            <div className="relative">
              <input
                type="text"
                value="January 2024"
                readOnly
                className="w-full px-4 py-2.5 pr-10 rounded-xl bg-gray-100 dark:bg-gray-700/30 border border-gray-200 dark:border-gray-600 text-sm text-gray-500 dark:text-gray-400 cursor-not-allowed"
              />
              <Icons.Lock size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-medium text-gray-500 dark:text-gray-400">Bio</label>
              <span className={`text-[11px] ${
                bioLength > maxBioLength
                  ? 'text-red-500'
                  : 'text-gray-400 dark:text-gray-500'
              }`}>
                {bioLength}/{maxBioLength}
              </span>
            </div>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              maxLength={maxBioLength}
              rows={3}
              className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
            />
          </div>
        </div>
      </div>

      <div className="p-5 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/30 shadow-lg">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
          Communication Preferences
        </h3>
        <div className="space-y-3">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="newsletter"
              checked={formData.newsletter}
              onChange={handleChange}
              className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">Newsletter</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Receive updates about new products and features
              </p>
            </div>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="promoOffers"
              checked={formData.promoOffers}
              onChange={handleChange}
              className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">Promotional Offers</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Receive exclusive deals and discounts
              </p>
            </div>
          </label>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={handleSave}
          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-semibold hover:from-indigo-600 hover:to-purple-700 transition-all shadow-lg shadow-indigo-500/25 flex items-center gap-2"
        >
          {saved ? (
            <>
              <Icons.Check size={16} />
              Saved!
            </>
          ) : (
            <>
              <Icons.Save size={16} />
              Save Changes
            </>
          )}
        </button>
        {saved && (
          <span className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">
            Profile updated successfully
          </span>
        )}
      </div>
    </div>
  );
}
