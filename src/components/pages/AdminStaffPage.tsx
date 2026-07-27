'use client';

import { useState } from 'react';
import { useAdmin } from '@/contexts/AdminContext';
import { Icons } from '@/components/ui/Icons';

interface StaffForm {
  name: string;
  email: string;
  password: string;
  role: string;
}

const emptyForm: StaffForm = { name: '', email: '', password: '', role: 'product_manager' };

export default function AdminStaffPage() {
  const { staff, setStaff, roles } = useAdmin();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPassword, setFormPassword] = useState('');
  const [formRole, setFormRole] = useState('product_manager');
  const [staffSearch, setStaffSearch] = useState('');

  const filteredStaff = staff.filter(s => 
    s.name.toLowerCase().includes(staffSearch.toLowerCase()) || 
    s.email.toLowerCase().includes(staffSearch.toLowerCase())
  );

  const openAddForm = () => {
    setEditingId(null);
    setFormName('');
    setFormEmail('');
    setFormPassword('');
    setFormRole('product_manager');
    setIsModalOpen(true);
  };

  const openEditForm = (member: any) => {
    setEditingId(member.id);
    setFormName(member.name);
    setFormEmail(member.email);
    setFormPassword('');
    setFormRole(member.role);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const newMember = {
      id: editingId || Date.now(),
      name: formName,
      email: formEmail,
      role: formRole,
      status: 'active' as const,
      lastActive: editingId ? (staff.find(s => s.id === editingId)?.lastActive || 'Just now') : 'Never'
    };
    if (editingId) {
      setStaff(staff.map(s => s.id === editingId ? newMember : s));
    } else {
      setStaff([...staff, newMember]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl relative">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="glass-card rounded-2xl p-5 border border-white/5">
          <div className="text-white/50 text-xs font-medium mb-1">Total Staff</div>
          <div className="text-2xl font-bold text-white">{staff.length}</div>
        </div>
        <div className="glass-card rounded-2xl p-5 border border-white/5">
          <div className="text-white/50 text-xs font-medium mb-1">Active Staff</div>
          <div className="text-2xl font-bold text-green-400">{staff.filter(s => s.status === 'active').length}</div>
        </div>
        <div className="glass-card rounded-2xl p-5 border border-white/5">
          <div className="text-white/50 text-xs font-medium mb-1">Super Admins</div>
          <div className="text-2xl font-bold text-purple-400">{staff.filter(s => s.role === 'super_admin').length}</div>
        </div>
        <div className="glass-card rounded-2xl p-5 border border-white/5">
          <div className="text-white/50 text-xs font-medium mb-1">Other Roles</div>
          <div className="text-2xl font-bold text-brand-400">{staff.filter(s => s.role !== 'super_admin').length}</div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">Staff Management</h2>
          <p className="text-sm text-white/50 mt-1">Manage admin users and assign their roles</p>
        </div>
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40"><Icons.Search size={18} /></div>
            <input 
              type="text" 
              value={staffSearch} 
              onChange={(e) => setStaffSearch(e.target.value)} 
              placeholder="Search staff..." 
              className="w-full pl-10 pr-4 py-2.5 glass rounded-xl text-sm text-white placeholder-white/30 outline-none focus:border-brand-500/50" 
            />
          </div>
          <button 
            onClick={openAddForm} 
            className="px-5 py-2.5 bg-gradient-to-r from-brand-600 to-purple-600 rounded-xl text-sm font-semibold flex items-center gap-2 hover:opacity-90 transition-opacity whitespace-nowrap text-white"
          >
            <Icons.Plus size={16} /> Add Staff
          </button>
        </div>
      </div>

      <div className="glass-card rounded-2xl overflow-hidden border border-white/10">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10 bg-white/5 text-xs font-semibold text-white/50 uppercase tracking-wider">
              <th className="px-6 py-4">Name & Email</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filteredStaff.map(s => (
              <tr key={s.id} className="hover:bg-white/5 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-medium text-white">{s.name}</div>
                  <div className="text-xs text-white/40">{s.email}</div>
                </td>
                <td className="px-6 py-4 text-sm text-brand-300">{roles.find(r => r.id === s.role)?.name || s.role}</td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${s.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-white/50'}`}>{s.status}</span>
                </td>
                <td className="px-6 py-4 text-right space-x-2">
                  <button onClick={() => openEditForm(s)} className="p-2 glass rounded-lg text-brand-400 hover:bg-brand-500/20 border border-transparent"><Icons.Edit size={16} /></button>
                  <button onClick={() => setStaff(staff.filter(x => x.id !== s.id))} className="p-2 glass rounded-lg text-red-400 hover:bg-red-500/20 border border-transparent"><Icons.Trash size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="glass-card rounded-3xl p-6 w-full max-w-md relative animate-scale-in border border-white/10 shadow-2xl">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 p-2 text-white/50 hover:text-white hover:bg-white/5 rounded-lg transition-colors"><Icons.X size={18} /></button>
            <h2 className="text-xl font-bold mb-6 text-white">{editingId ? 'Edit Staff Member' : 'Add New Staff'}</h2>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="text-xs text-white/50 block mb-1">Full Name</label>
                <input required value={formName} onChange={e => setFormName(e.target.value)} className="w-full px-4 py-2.5 bg-black/30 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-brand-500 placeholder-white/20" placeholder="e.g. John Doe" />
              </div>
              <div>
                <label className="text-xs text-white/50 block mb-1">Email Address</label>
                <input required type="email" value={formEmail} onChange={e => setFormEmail(e.target.value)} className="w-full px-4 py-2.5 bg-black/30 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-brand-500 placeholder-white/20" placeholder="john@example.com" />
              </div>
              <div>
                <label className="text-xs text-white/50 block mb-1">{editingId ? 'New Password (leave blank to keep current)' : 'Password'}</label>
                <input type="password" required={!editingId} value={formPassword} onChange={e => setFormPassword(e.target.value)} className="w-full px-4 py-2.5 bg-black/30 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-brand-500 placeholder-white/20" placeholder="••••••••" />
              </div>
              <div>
                <label className="text-xs text-white/50 block mb-1">Assigned Role</label>
                <select value={formRole} onChange={e => setFormRole(e.target.value)} className="w-full px-4 py-2.5 bg-black/30 border border-white/10 rounded-xl text-sm text-white appearance-none focus:outline-none focus:border-brand-500 cursor-pointer">
                  {roles.map(r => <option key={r.id} value={r.id} className="bg-gray-900 text-white">{r.name}</option>)}
                </select>
              </div>
              <div className="pt-4 flex justify-end gap-3 mt-6">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 glass rounded-xl text-sm font-medium hover:bg-white/5 transition-colors text-white/70 hover:text-white border border-white/5">Cancel</button>
                <button type="submit" className="px-5 py-2.5 bg-gradient-to-r from-brand-600 to-purple-600 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity text-white">Save Staff Member</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
