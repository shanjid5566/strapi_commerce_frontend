'use client'

import { useState } from 'react'
import { Icons } from '@/components/ui/Icons'
import { useCMS } from '@/contexts/CMSContext'
import { useAuth } from '@/contexts/AuthContext'

import { use } from 'react'

const pageSlugs = [
  { slug: 'about', label: 'About Us' },
  { slug: 'contact', label: 'Contact' },
  { slug: 'faq', label: 'FAQ' },
  { slug: 'shipping', label: 'Shipping' },
  { slug: 'returns', label: 'Returns' },
  { slug: 'careers', label: 'Careers' },
  { slug: 'privacy', label: 'Privacy Policy' },
  { slug: 'terms', label: 'Terms of Service' },
  { slug: 'cookies', label: 'Cookie Policy' }
]

export default function AdminPages({ params, onNavigate }: { params: { slug: string }; onNavigate?: (page: string) => void }) {
  const { slug } = params
  const { content, setContent } = useCMS()
  const { user } = useAuth()
  const [saved, setSaved] = useState(false)
  const [showPreview, setShowPreview] = useState(false)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const pageData: Record<string, any> = (content as Record<string, any>)[slug] || {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [formData, setFormData] = useState<Record<string, any>>({
    heroTitle: pageData.heroTitle || '',
    heroSubtitle: pageData.heroSubtitle || '',
    bannerImage: pageData.bannerImage || '',
    ...pageData
  })

  const handleSave = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setContent({ ...content, [slug]: { ...(content as Record<string, any>)[slug], ...formData } })
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="flex gap-6">
      <div className="w-64 flex-shrink-0">
        <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-4 sticky top-6">
          <h2 className="text-lg font-semibold text-white mb-4">Pages</h2>
          <nav className="space-y-1">
            {pageSlugs.map((page) => (
              <a
                key={page.slug}
                href={`/admin/pages/${page.slug}`}
                className={`block px-4 py-2 rounded-xl transition-all ${
                  slug === page.slug
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white'
                    : 'text-white/60 hover:bg-white/10 hover:text-white'
                }`}
              >
                {page.label}
              </a>
            ))}
          </nav>
        </div>
      </div>

      <div className="flex-1 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">
            {pageSlugs.find(p => p.slug === slug)?.label || slug}
          </h1>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowPreview(true)}
              className="px-4 py-2 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-all flex items-center gap-2"
            >
              <Icons.Eye className="w-4 h-4" />
              Preview
            </button>
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
                  Save Changes
                </>
              )}
            </button>
          </div>
        </div>

        <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Hero Section</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-white/80 text-sm mb-2">Hero Title</label>
              <input
                type="text"
                value={formData.heroTitle}
                onChange={(e) => handleChange('heroTitle', e.target.value)}
                placeholder="Enter hero title"
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-white/80 text-sm mb-2">Hero Subtitle</label>
              <input
                type="text"
                value={formData.heroSubtitle}
                onChange={(e) => handleChange('heroSubtitle', e.target.value)}
                placeholder="Enter hero subtitle"
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-white/80 text-sm mb-2">Banner Image</label>
              <div className="flex items-center gap-4">
                <input
                  type="text"
                  value={formData.bannerImage}
                  onChange={(e) => handleChange('bannerImage', e.target.value)}
                  placeholder="Image URL or upload"
                  className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-indigo-500"
                />
                <button className="p-3 bg-white/10 rounded-xl text-white/60 hover:text-white hover:bg-white/20 transition-colors">
                  <Icons.Upload className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {slug === 'about' && (
          <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6 space-y-6">
            <h3 className="text-lg font-semibold text-white">About Content</h3>
            <div>
              <label className="block text-white/80 text-sm mb-2">Our Story</label>
              <textarea
                value={formData.story || ''}
                onChange={(e) => handleChange('story', e.target.value)}
                placeholder="Tell your story..."
                rows={4}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-indigo-500 resize-none"
              />
            </div>
            <div>
              <label className="block text-white/80 text-sm mb-2">Mission</label>
              <textarea
                value={formData.mission || ''}
                onChange={(e) => handleChange('mission', e.target.value)}
                placeholder="Your mission statement..."
                rows={3}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-indigo-500 resize-none"
              />
            </div>
            <div>
              <label className="block text-white/80 text-sm mb-2">Values</label>
              <div className="space-y-2">
                {(formData.values || []).map((value: string, index: number) => (
                  <div key={index} className="flex items-center gap-3">
                    <input
                      type="text"
                      value={value}
                      onChange={(e) => {
                        const newValues = [...(formData.values || [])]
                        newValues[index] = e.target.value
                        handleChange('values', newValues)
                      }}
                      className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-indigo-500"
                    />
                    <button
                      onClick={() => handleChange('values', (formData.values || []).filter((_: any, i: number) => i !== index))}
                      className="p-2 rounded-lg hover:bg-red-500/20 text-white/60 hover:text-red-400"
                    >
                      <Icons.Trash className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => handleChange('values', [...(formData.values || []), ''])}
                  className="flex items-center gap-2 text-white/60 hover:text-white"
                >
                  <Icons.Plus className="w-4 h-4" />
                  Add Value
                </button>
              </div>
            </div>
            <div>
              <label className="block text-white/80 text-sm mb-2">Team</label>
              <div className="space-y-4">
                {(formData.team || []).map((member: any, index: number) => (
                  <div key={index} className="bg-white/5 rounded-xl p-4 space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        value={member.name || ''}
                        onChange={(e) => {
                          const newTeam = [...(formData.team || [])]
                          newTeam[index] = { ...newTeam[index], name: e.target.value }
                          handleChange('team', newTeam)
                        }}
                        placeholder="Name"
                        className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-indigo-500"
                      />
                      <input
                        type="text"
                        value={member.role || ''}
                        onChange={(e) => {
                          const newTeam = [...(formData.team || [])]
                          newTeam[index] = { ...newTeam[index], role: e.target.value }
                          handleChange('team', newTeam)
                        }}
                        placeholder="Role"
                        className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                    <button
                      onClick={() => handleChange('team', (formData.team || []).filter((_: any, i: number) => i !== index))}
                      className="text-red-400 text-sm hover:text-red-300"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => handleChange('team', [...(formData.team || []), { name: '', role: '' }])}
                  className="flex items-center gap-2 text-white/60 hover:text-white"
                >
                  <Icons.Plus className="w-4 h-4" />
                  Add Team Member
                </button>
              </div>
            </div>
          </div>
        )}

        {slug === 'contact' && (
          <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-white/80 text-sm mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email || ''}
                  onChange={(e) => handleChange('email', e.target.value)}
                  placeholder="support@example.com"
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-white/80 text-sm mb-2">Phone</label>
                <input
                  type="tel"
                  value={formData.phone || ''}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  placeholder="+1 (555) 123-4567"
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-white/80 text-sm mb-2">Business Hours</label>
                <input
                  type="text"
                  value={formData.hours || ''}
                  onChange={(e) => handleChange('hours', e.target.value)}
                  placeholder="Mon-Fri 9AM-6PM"
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-white/80 text-sm mb-2">Address</label>
                <textarea
                  value={formData.address || ''}
                  onChange={(e) => handleChange('address', e.target.value)}
                  placeholder="Full address..."
                  rows={2}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-indigo-500 resize-none"
                />
              </div>
            </div>
          </div>
        )}

        {slug === 'faq' && (
          <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6 space-y-4">
            <h3 className="text-lg font-semibold text-white">FAQ Categories</h3>
            {(formData.categories || []).map((category: any, catIndex: number) => (
              <div key={catIndex} className="bg-white/5 rounded-xl p-4 space-y-3">
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={category.name || ''}
                    onChange={(e) => {
                      const newCategories = [...(formData.categories || [])]
                      newCategories[catIndex] = { ...newCategories[catIndex], name: e.target.value }
                      handleChange('categories', newCategories)
                    }}
                    placeholder="Category name"
                    className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-indigo-500"
                  />
                  <button
                    onClick={() => handleChange('categories', (formData.categories || []).filter((_: any, i: number) => i !== catIndex))}
                    className="p-2 rounded-lg hover:bg-red-500/20 text-white/60 hover:text-red-400"
                  >
                    <Icons.Trash className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-2 ml-4">
                  {(category.items || []).map((item: any, itemIndex: number) => (
                    <div key={itemIndex} className="bg-white/5 rounded-lg p-3 space-y-2">
                      <input
                        type="text"
                        value={item.question || ''}
                        onChange={(e) => {
                          const newCategories = [...(formData.categories || [])]
                          const newItems = [...newCategories[catIndex].items]
                          newItems[itemIndex] = { ...newItems[itemIndex], question: e.target.value }
                          newCategories[catIndex] = { ...newCategories[catIndex], items: newItems }
                          handleChange('categories', newCategories)
                        }}
                        placeholder="Question"
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm placeholder-white/50 focus:outline-none focus:border-indigo-500"
                      />
                      <textarea
                        value={item.answer || ''}
                        onChange={(e) => {
                          const newCategories = [...(formData.categories || [])]
                          const newItems = [...newCategories[catIndex].items]
                          newItems[itemIndex] = { ...newItems[itemIndex], answer: e.target.value }
                          newCategories[catIndex] = { ...newCategories[catIndex], items: newItems }
                          handleChange('categories', newCategories)
                        }}
                        placeholder="Answer"
                        rows={2}
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm placeholder-white/50 focus:outline-none focus:border-indigo-500 resize-none"
                      />
                    </div>
                  ))}
                  <button
                    onClick={() => {
                      const newCategories = [...(formData.categories || [])]
                      newCategories[catIndex] = {
                        ...newCategories[catIndex],
                        items: [...(newCategories[catIndex].items || []), { question: '', answer: '' }]
                      }
                      handleChange('categories', newCategories)
                    }}
                    className="text-white/60 text-sm hover:text-white flex items-center gap-1"
                  >
                    <Icons.Plus className="w-3 h-3" />
                    Add Item
                  </button>
                </div>
              </div>
            ))}
            <button
              onClick={() => handleChange('categories', [...(formData.categories || []), { name: '', items: [] }])}
              className="flex items-center gap-2 text-white/60 hover:text-white"
            >
              <Icons.Plus className="w-4 h-4" />
              Add Category
            </button>
          </div>
        )}

        {slug === 'shipping' && (
          <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6 space-y-6">
            <h3 className="text-lg font-semibold text-white">Shipping Methods</h3>
            <div className="space-y-3">
              {(formData.methods || []).map((method: any, index: number) => (
                <div key={index} className="bg-white/5 rounded-xl p-4 grid grid-cols-3 gap-3">
                  <input
                    type="text"
                    value={method.name || ''}
                    onChange={(e) => {
                      const newMethods = [...(formData.methods || [])]
                      newMethods[index] = { ...newMethods[index], name: e.target.value }
                      handleChange('methods', newMethods)
                    }}
                    placeholder="Method name"
                    className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-indigo-500"
                  />
                  <input
                    type="text"
                    value={method.duration || ''}
                    onChange={(e) => {
                      const newMethods = [...(formData.methods || [])]
                      newMethods[index] = { ...newMethods[index], duration: e.target.value }
                      handleChange('methods', newMethods)
                    }}
                    placeholder="Duration"
                    className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-indigo-500"
                  />
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={method.price || ''}
                      onChange={(e) => {
                        const newMethods = [...(formData.methods || [])]
                        newMethods[index] = { ...newMethods[index], price: e.target.value }
                        handleChange('methods', newMethods)
                      }}
                      placeholder="Price"
                      className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-indigo-500"
                    />
                    <button
                      onClick={() => handleChange('methods', (formData.methods || []).filter((_: any, i: number) => i !== index))}
                      className="p-2 rounded-lg hover:bg-red-500/20 text-white/60 hover:text-red-400"
                    >
                      <Icons.Trash className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
              <button
                onClick={() => handleChange('methods', [...(formData.methods || []), { name: '', duration: '', price: '' }])}
                className="flex items-center gap-2 text-white/60 hover:text-white"
              >
                <Icons.Plus className="w-4 h-4" />
                Add Method
              </button>
            </div>

            <h3 className="text-lg font-semibold text-white pt-4 border-t border-white/10">Shipping Notes</h3>
            <div className="space-y-2">
              {(formData.notes || []).map((note: string, index: number) => (
                <div key={index} className="flex items-center gap-3">
                  <input
                    type="text"
                    value={note}
                    onChange={(e) => {
                      const newNotes = [...(formData.notes || [])]
                      newNotes[index] = e.target.value
                      handleChange('notes', newNotes)
                    }}
                    className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-indigo-500"
                  />
                  <button
                    onClick={() => handleChange('notes', (formData.notes || []).filter((_: any, i: number) => i !== index))}
                    className="p-2 rounded-lg hover:bg-red-500/20 text-white/60 hover:text-red-400"
                  >
                    <Icons.Trash className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <button
                onClick={() => handleChange('notes', [...(formData.notes || []), ''])}
                className="flex items-center gap-2 text-white/60 hover:text-white"
              >
                <Icons.Plus className="w-4 h-4" />
                Add Note
              </button>
            </div>
          </div>
        )}

        {slug === 'returns' && (
          <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6 space-y-6">
            <h3 className="text-lg font-semibold text-white">Return Steps</h3>
            <div className="space-y-3">
              {(formData.steps || []).map((step: any, index: number) => (
                <div key={index} className="bg-white/5 rounded-xl p-4 flex items-start gap-3">
                  <span className="w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </span>
                  <div className="flex-1 space-y-2">
                    <input
                      type="text"
                      value={step.title || ''}
                      onChange={(e) => {
                        const newSteps = [...(formData.steps || [])]
                        newSteps[index] = { ...newSteps[index], title: e.target.value }
                        handleChange('steps', newSteps)
                      }}
                      placeholder="Step title"
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-indigo-500"
                    />
                    <textarea
                      value={step.description || ''}
                      onChange={(e) => {
                        const newSteps = [...(formData.steps || [])]
                        newSteps[index] = { ...newSteps[index], description: e.target.value }
                        handleChange('steps', newSteps)
                      }}
                      placeholder="Step description"
                      rows={2}
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-indigo-500 resize-none"
                    />
                  </div>
                  <button
                    onClick={() => handleChange('steps', (formData.steps || []).filter((_: any, i: number) => i !== index))}
                    className="p-2 rounded-lg hover:bg-red-500/20 text-white/60 hover:text-red-400"
                  >
                    <Icons.Trash className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <button
                onClick={() => handleChange('steps', [...(formData.steps || []), { title: '', description: '' }])}
                className="flex items-center gap-2 text-white/60 hover:text-white"
              >
                <Icons.Plus className="w-4 h-4" />
                Add Step
              </button>
            </div>

            <h3 className="text-lg font-semibold text-white pt-4 border-t border-white/10">Policies</h3>
            <div className="space-y-2">
              {(formData.policies || []).map((policy: string, index: number) => (
                <div key={index} className="flex items-center gap-3">
                  <input
                    type="text"
                    value={policy}
                    onChange={(e) => {
                      const newPolicies = [...(formData.policies || [])]
                      newPolicies[index] = e.target.value
                      handleChange('policies', newPolicies)
                    }}
                    className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-indigo-500"
                  />
                  <button
                    onClick={() => handleChange('policies', (formData.policies || []).filter((_: any, i: number) => i !== index))}
                    className="p-2 rounded-lg hover:bg-red-500/20 text-white/60 hover:text-red-400"
                  >
                    <Icons.Trash className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <button
                onClick={() => handleChange('policies', [...(formData.policies || []), ''])}
                className="flex items-center gap-2 text-white/60 hover:text-white"
              >
                <Icons.Plus className="w-4 h-4" />
                Add Policy
              </button>
            </div>
          </div>
        )}

        {slug === 'careers' && (
          <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6 space-y-6">
            <h3 className="text-lg font-semibold text-white">Culture</h3>
            <textarea
              value={formData.culture || ''}
              onChange={(e) => handleChange('culture', e.target.value)}
              placeholder="Describe your company culture..."
              rows={4}
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-indigo-500 resize-none"
            />

            <h3 className="text-lg font-semibold text-white pt-4 border-t border-white/10">Perks</h3>
            <div className="space-y-2">
              {(formData.perks || []).map((perk: string, index: number) => (
                <div key={index} className="flex items-center gap-3">
                  <input
                    type="text"
                    value={perk}
                    onChange={(e) => {
                      const newPerks = [...(formData.perks || [])]
                      newPerks[index] = e.target.value
                      handleChange('perks', newPerks)
                    }}
                    className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-indigo-500"
                  />
                  <button
                    onClick={() => handleChange('perks', (formData.perks || []).filter((_: any, i: number) => i !== index))}
                    className="p-2 rounded-lg hover:bg-red-500/20 text-white/60 hover:text-red-400"
                  >
                    <Icons.Trash className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <button
                onClick={() => handleChange('perks', [...(formData.perks || []), ''])}
                className="flex items-center gap-2 text-white/60 hover:text-white"
              >
                <Icons.Plus className="w-4 h-4" />
                Add Perk
              </button>
            </div>

            <h3 className="text-lg font-semibold text-white pt-4 border-t border-white/10">Open Positions</h3>
            <div className="space-y-3">
              {(formData.openings || []).map((opening: any, index: number) => (
                <div key={index} className="bg-white/5 rounded-xl p-4 grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    value={opening.title || ''}
                    onChange={(e) => {
                      const newOpenings = [...(formData.openings || [])]
                      newOpenings[index] = { ...newOpenings[index], title: e.target.value }
                      handleChange('openings', newOpenings)
                    }}
                    placeholder="Position title"
                    className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-indigo-500"
                  />
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={opening.department || ''}
                      onChange={(e) => {
                        const newOpenings = [...(formData.openings || [])]
                        newOpenings[index] = { ...newOpenings[index], department: e.target.value }
                        handleChange('openings', newOpenings)
                      }}
                      placeholder="Department"
                      className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-indigo-500"
                    />
                    <button
                      onClick={() => handleChange('openings', (formData.openings || []).filter((_: any, i: number) => i !== index))}
                      className="p-2 rounded-lg hover:bg-red-500/20 text-white/60 hover:text-red-400"
                    >
                      <Icons.Trash className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
              <button
                onClick={() => handleChange('openings', [...(formData.openings || []), { title: '', department: '' }])}
                className="flex items-center gap-2 text-white/60 hover:text-white"
              >
                <Icons.Plus className="w-4 h-4" />
                Add Opening
              </button>
            </div>
          </div>
        )}

        {(slug === 'privacy' || slug === 'terms' || slug === 'cookies') && (
          <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Content</h3>
            <textarea
              value={formData.content || ''}
              onChange={(e) => handleChange('content', e.target.value)}
              placeholder="Enter HTML content..."
              rows={20}
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-indigo-500 resize-none font-mono text-sm"
            />
          </div>
        )}
      </div>

      {showPreview && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex justify-end">
          <div className="w-full max-w-2xl bg-gray-900 h-full overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Preview</h2>
              <button
                onClick={() => setShowPreview(false)}
                className="p-2 rounded-lg hover:bg-white/10 text-white/60 hover:text-white"
              >
                <Icons.X className="w-5 h-5" />
              </button>
            </div>
            <div className="prose prose-invert max-w-none">
              <h1>{formData.heroTitle}</h1>
              <p className="text-white/60">{formData.heroSubtitle}</p>
              {formData.content && (
                <div dangerouslySetInnerHTML={{ __html: formData.content }} />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
