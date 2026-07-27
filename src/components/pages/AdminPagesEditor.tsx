'use client';

import { useState } from 'react';
import { useCMS } from '@/contexts/CMSContext';
import { Icons } from '@/components/ui/Icons';

interface AdminPagesEditorProps {
  page: string;
  onNavigate: (page: string) => void;
}

const CMS_PAGES = [
  { id: 'about', label: 'About', icon: Icons.Users },
  { id: 'contact', label: 'Contact', icon: Icons.Mail },
  { id: 'faq', label: 'FAQ', icon: Icons.FileText },
  { id: 'shipping', label: 'Shipping', icon: Icons.Truck },
  { id: 'returns', label: 'Returns', icon: Icons.ArrowLeft },
  { id: 'careers', label: 'Careers', icon: Icons.Briefcase },
  { id: 'privacy', label: 'Privacy', icon: Icons.Shield },
  { id: 'terms', label: 'Terms', icon: Icons.FileText },
  { id: 'cookies', label: 'Cookies', icon: Icons.Zap },
];

export default function AdminPagesEditor({ page, onNavigate }: AdminPagesEditorProps) {
  const { content, setContent } = useCMS();
  const [activePage, setActivePage] = useState(page || 'about');
  const [showPreview, setShowPreview] = useState(false);
  const [savedIndicator, setSavedIndicator] = useState(false);

  const handleSave = () => {
    setSavedIndicator(true);
    setTimeout(() => setSavedIndicator(false), 2000);
  };

  const updateField = (field: string, value: string) => {
    setContent((prev) => ({
      ...prev,
      [activePage]: {
        ...prev[activePage as keyof typeof prev],
        [field]: value,
      },
    }));
  };

  const pageData = content[activePage as keyof typeof content];

  const renderHeroFields = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-xs text-white/50 mb-1.5">Hero Title</label>
        <input
          type="text"
          value={(pageData as unknown as Record<string, unknown>).heroTitle as string || ''}
          onChange={(e) => updateField('heroTitle', e.target.value)}
          className="w-full px-4 py-2.5 bg-black/30 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-brand-500"
        />
      </div>
      <div>
        <label className="block text-xs text-white/50 mb-1.5">Hero Subtitle</label>
        <input
          type="text"
          value={(pageData as unknown as Record<string, unknown>).heroSubtitle as string || ''}
          onChange={(e) => updateField('heroSubtitle', e.target.value)}
          className="w-full px-4 py-2.5 bg-black/30 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-brand-500"
        />
      </div>
    </div>
  );

  const renderAboutFields = () => {
    const data = content.about;
    return (
      <div className="space-y-4">
        {renderHeroFields()}
        <div>
          <label className="block text-xs text-white/50 mb-1.5">Our Story</label>
          <textarea
            value={data.story}
            onChange={(e) => {
              setContent((prev) => ({ ...prev, about: { ...prev.about, story: e.target.value } }));
            }}
            rows={4}
            className="w-full px-4 py-2.5 bg-black/30 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-brand-500 resize-none"
          />
        </div>
        <div>
          <label className="block text-xs text-white/50 mb-1.5">Mission</label>
          <textarea
            value={data.mission}
            onChange={(e) => {
              setContent((prev) => ({ ...prev, about: { ...prev.about, mission: e.target.value } }));
            }}
            rows={3}
            className="w-full px-4 py-2.5 bg-black/30 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-brand-500 resize-none"
          />
        </div>
        <div>
          <label className="block text-xs text-white/50 mb-1.5">Values</label>
          {data.values.map((v, i) => (
            <div key={i} className="flex gap-2 mb-2">
              <input
                type="text"
                value={v.title}
                onChange={(e) => {
                  const newValues = [...data.values];
                  newValues[i] = { ...newValues[i], title: e.target.value };
                  setContent((prev) => ({ ...prev, about: { ...prev.about, values: newValues } }));
                }}
                className="flex-1 px-3 py-2 bg-black/30 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-brand-500"
                placeholder="Title"
              />
              <input
                type="text"
                value={v.desc}
                onChange={(e) => {
                  const newValues = [...data.values];
                  newValues[i] = { ...newValues[i], desc: e.target.value };
                  setContent((prev) => ({ ...prev, about: { ...prev.about, values: newValues } }));
                }}
                className="flex-1 px-3 py-2 bg-black/30 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-brand-500"
                placeholder="Description"
              />
              <button
                onClick={() => {
                  const newValues = data.values.filter((_, idx) => idx !== i);
                  setContent((prev) => ({ ...prev, about: { ...prev.about, values: newValues } }));
                }}
                className="p-2 rounded-lg hover:bg-red-500/10 text-white/50 hover:text-red-400"
              >
                <Icons.X size={14} />
              </button>
            </div>
          ))}
          <button
            onClick={() => {
              setContent((prev) => ({
                ...prev,
                about: { ...prev.about, values: [...prev.about.values, { title: '', desc: '' }] },
              }));
            }}
            className="flex items-center gap-1 text-xs text-brand-400 hover:text-brand-300 mt-1"
          >
            <Icons.Plus size={12} /> Add Value
          </button>
        </div>
        <div>
          <label className="block text-xs text-white/50 mb-1.5">Team</label>
          {data.team.map((member, i) => (
            <div key={i} className="p-3 bg-black/20 rounded-xl border border-white/5 mb-2 space-y-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={member.name}
                  onChange={(e) => {
                    const newTeam = [...data.team];
                    newTeam[i] = { ...newTeam[i], name: e.target.value };
                    setContent((prev) => ({ ...prev, about: { ...prev.about, team: newTeam } }));
                  }}
                  className="flex-1 px-3 py-2 bg-black/30 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-brand-500"
                  placeholder="Name"
                />
                <input
                  type="text"
                  value={member.role}
                  onChange={(e) => {
                    const newTeam = [...data.team];
                    newTeam[i] = { ...newTeam[i], role: e.target.value };
                    setContent((prev) => ({ ...prev, about: { ...prev.about, team: newTeam } }));
                  }}
                  className="flex-1 px-3 py-2 bg-black/30 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-brand-500"
                  placeholder="Role"
                />
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={member.bio}
                  onChange={(e) => {
                    const newTeam = [...data.team];
                    newTeam[i] = { ...newTeam[i], bio: e.target.value };
                    setContent((prev) => ({ ...prev, about: { ...prev.about, team: newTeam } }));
                  }}
                  className="flex-1 px-3 py-2 bg-black/30 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-brand-500"
                  placeholder="Bio"
                />
                <button
                  onClick={() => {
                    const newTeam = data.team.filter((_, idx) => idx !== i);
                    setContent((prev) => ({ ...prev, about: { ...prev.about, team: newTeam } }));
                  }}
                  className="p-2 rounded-lg hover:bg-red-500/10 text-white/50 hover:text-red-400"
                >
                  <Icons.X size={14} />
                </button>
              </div>
            </div>
          ))}
          <button
            onClick={() => {
              setContent((prev) => ({
                ...prev,
                about: { ...prev.about, team: [...prev.about.team, { name: '', role: '', bio: '' }] },
              }));
            }}
            className="flex items-center gap-1 text-xs text-brand-400 hover:text-brand-300 mt-1"
          >
            <Icons.Plus size={12} /> Add Team Member
          </button>
        </div>
      </div>
    );
  };

  const renderContactFields = () => {
    const data = content.contact;
    return (
      <div className="space-y-4">
        {renderHeroFields()}
        <div>
          <label className="block text-xs text-white/50 mb-1.5">Email</label>
          <input
            type="email"
            value={data.email}
            onChange={(e) => {
              setContent((prev) => ({ ...prev, contact: { ...prev.contact, email: e.target.value } }));
            }}
            className="w-full px-4 py-2.5 bg-black/30 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-brand-500"
          />
        </div>
        <div>
          <label className="block text-xs text-white/50 mb-1.5">Phone</label>
          <input
            type="text"
            value={data.phone}
            onChange={(e) => {
              setContent((prev) => ({ ...prev, contact: { ...prev.contact, phone: e.target.value } }));
            }}
            className="w-full px-4 py-2.5 bg-black/30 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-brand-500"
          />
        </div>
        <div>
          <label className="block text-xs text-white/50 mb-1.5">Hours</label>
          <input
            type="text"
            value={data.hours}
            onChange={(e) => {
              setContent((prev) => ({ ...prev, contact: { ...prev.contact, hours: e.target.value } }));
            }}
            className="w-full px-4 py-2.5 bg-black/30 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-brand-500"
          />
        </div>
        <div>
          <label className="block text-xs text-white/50 mb-1.5">Address</label>
          <input
            type="text"
            value={data.address}
            onChange={(e) => {
              setContent((prev) => ({ ...prev, contact: { ...prev.contact, address: e.target.value } }));
            }}
            className="w-full px-4 py-2.5 bg-black/30 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-brand-500"
          />
        </div>
      </div>
    );
  };

  const renderFAQFields = () => {
    const data = content.faq;
    return (
      <div className="space-y-4">
        {renderHeroFields()}
        {data.categories.map((cat, ci) => (
          <div key={ci} className="p-3 bg-black/20 rounded-xl border border-white/5 space-y-2">
            <div className="flex gap-2 items-center">
              <input
                type="text"
                value={cat.name}
                onChange={(e) => {
                  const newCats = [...data.categories];
                  newCats[ci] = { ...newCats[ci], name: e.target.value };
                  setContent((prev) => ({ ...prev, faq: { ...prev.faq, categories: newCats } }));
                }}
                className="flex-1 px-3 py-2 bg-black/30 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-brand-500"
                placeholder="Category name"
              />
              <button
                onClick={() => {
                  const newCats = data.categories.filter((_, idx) => idx !== ci);
                  setContent((prev) => ({ ...prev, faq: { ...prev.faq, categories: newCats } }));
                }}
                className="p-2 rounded-lg hover:bg-red-500/10 text-white/50 hover:text-red-400"
              >
                <Icons.X size={14} />
              </button>
            </div>
            {cat.items.map((item, ii) => (
              <div key={ii} className="flex gap-2 ml-4">
                <input
                  type="text"
                  value={item.q}
                  onChange={(e) => {
                    const newCats = [...data.categories];
                    const newItems = [...newCats[ci].items];
                    newItems[ii] = { ...newItems[ii], q: e.target.value };
                    newCats[ci] = { ...newCats[ci], items: newItems };
                    setContent((prev) => ({ ...prev, faq: { ...prev.faq, categories: newCats } }));
                  }}
                  className="flex-1 px-3 py-2 bg-black/30 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-brand-500"
                  placeholder="Question"
                />
                <input
                  type="text"
                  value={item.a}
                  onChange={(e) => {
                    const newCats = [...data.categories];
                    const newItems = [...newCats[ci].items];
                    newItems[ii] = { ...newItems[ii], a: e.target.value };
                    newCats[ci] = { ...newCats[ci], items: newItems };
                    setContent((prev) => ({ ...prev, faq: { ...prev.faq, categories: newCats } }));
                  }}
                  className="flex-1 px-3 py-2 bg-black/30 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-brand-500"
                  placeholder="Answer"
                />
                <button
                  onClick={() => {
                    const newCats = [...data.categories];
                    newCats[ci] = { ...newCats[ci], items: newCats[ci].items.filter((_, idx) => idx !== ii) };
                    setContent((prev) => ({ ...prev, faq: { ...prev.faq, categories: newCats } }));
                  }}
                  className="p-2 rounded-lg hover:bg-red-500/10 text-white/50 hover:text-red-400"
                >
                  <Icons.X size={14} />
                </button>
              </div>
            ))}
            <button
              onClick={() => {
                const newCats = [...data.categories];
                newCats[ci] = { ...newCats[ci], items: [...newCats[ci].items, { q: '', a: '' }] };
                setContent((prev) => ({ ...prev, faq: { ...prev.faq, categories: newCats } }));
              }}
              className="flex items-center gap-1 text-xs text-brand-400 hover:text-brand-300 ml-4"
            >
              <Icons.Plus size={12} /> Add Q&A
            </button>
          </div>
        ))}
        <button
          onClick={() => {
            setContent((prev) => ({
              ...prev,
              faq: { ...prev.faq, categories: [...prev.faq.categories, { name: '', items: [] }] },
            }));
          }}
          className="flex items-center gap-1 text-xs text-brand-400 hover:text-brand-300"
        >
          <Icons.Plus size={12} /> Add Category
        </button>
      </div>
    );
  };

  const renderShippingFields = () => {
    const data = content.shipping;
    return (
      <div className="space-y-4">
        {renderHeroFields()}
        {data.methods.map((method, i) => (
          <div key={i} className="p-3 bg-black/20 rounded-xl border border-white/5 space-y-2">
            <div className="flex gap-2">
              <input
                type="text"
                value={method.name}
                onChange={(e) => {
                  const newMethods = [...data.methods];
                  newMethods[i] = { ...newMethods[i], name: e.target.value };
                  setContent((prev) => ({ ...prev, shipping: { ...prev.shipping, methods: newMethods } }));
                }}
                className="flex-1 px-3 py-2 bg-black/30 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-brand-500"
                placeholder="Method name"
              />
              <button
                onClick={() => {
                  const newMethods = data.methods.filter((_, idx) => idx !== i);
                  setContent((prev) => ({ ...prev, shipping: { ...prev.shipping, methods: newMethods } }));
                }}
                className="p-2 rounded-lg hover:bg-red-500/10 text-white/50 hover:text-red-400"
              >
                <Icons.X size={14} />
              </button>
            </div>
            <div className="flex gap-2 ml-0">
              <input
                type="text"
                value={method.price}
                onChange={(e) => {
                  const newMethods = [...data.methods];
                  newMethods[i] = { ...newMethods[i], price: e.target.value };
                  setContent((prev) => ({ ...prev, shipping: { ...prev.shipping, methods: newMethods } }));
                }}
                className="w-1/4 px-3 py-2 bg-black/30 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-brand-500"
                placeholder="Price"
              />
              <input
                type="text"
                value={method.time}
                onChange={(e) => {
                  const newMethods = [...data.methods];
                  newMethods[i] = { ...newMethods[i], time: e.target.value };
                  setContent((prev) => ({ ...prev, shipping: { ...prev.shipping, methods: newMethods } }));
                }}
                className="w-1/4 px-3 py-2 bg-black/30 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-brand-500"
                placeholder="Time"
              />
              <input
                type="text"
                value={method.desc}
                onChange={(e) => {
                  const newMethods = [...data.methods];
                  newMethods[i] = { ...newMethods[i], desc: e.target.value };
                  setContent((prev) => ({ ...prev, shipping: { ...prev.shipping, methods: newMethods } }));
                }}
                className="flex-1 px-3 py-2 bg-black/30 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-brand-500"
                placeholder="Description"
              />
            </div>
          </div>
        ))}
        <button
          onClick={() => {
            setContent((prev) => ({
              ...prev,
              shipping: { ...prev.shipping, methods: [...prev.shipping.methods, { name: '', price: '', time: '', desc: '' }] },
            }));
          }}
          className="flex items-center gap-1 text-xs text-brand-400 hover:text-brand-300"
        >
          <Icons.Plus size={12} /> Add Method
        </button>
      </div>
    );
  };

  const renderReturnsFields = () => {
    const data = content.returns;
    return (
      <div className="space-y-4">
        {renderHeroFields()}
        <div>
          <label className="block text-xs text-white/50 mb-1.5">Steps</label>
          {data.steps.map((step, i) => (
            <div key={i} className="flex gap-2 mb-2">
              <input
                type="text"
                value={step.num}
                onChange={(e) => {
                  const newSteps = [...data.steps];
                  newSteps[i] = { ...newSteps[i], num: e.target.value };
                  setContent((prev) => ({ ...prev, returns: { ...prev.returns, steps: newSteps } }));
                }}
                className="w-12 px-3 py-2 bg-black/30 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-brand-500"
                placeholder="#"
              />
              <input
                type="text"
                value={step.title}
                onChange={(e) => {
                  const newSteps = [...data.steps];
                  newSteps[i] = { ...newSteps[i], title: e.target.value };
                  setContent((prev) => ({ ...prev, returns: { ...prev.returns, steps: newSteps } }));
                }}
                className="flex-1 px-3 py-2 bg-black/30 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-brand-500"
                placeholder="Title"
              />
              <input
                type="text"
                value={step.desc}
                onChange={(e) => {
                  const newSteps = [...data.steps];
                  newSteps[i] = { ...newSteps[i], desc: e.target.value };
                  setContent((prev) => ({ ...prev, returns: { ...prev.returns, steps: newSteps } }));
                }}
                className="flex-1 px-3 py-2 bg-black/30 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-brand-500"
                placeholder="Description"
              />
              <button
                onClick={() => {
                  const newSteps = data.steps.filter((_, idx) => idx !== i);
                  setContent((prev) => ({ ...prev, returns: { ...prev.returns, steps: newSteps } }));
                }}
                className="p-2 rounded-lg hover:bg-red-500/10 text-white/50 hover:text-red-400"
              >
                <Icons.X size={14} />
              </button>
            </div>
          ))}
          <button
            onClick={() => {
              setContent((prev) => ({
                ...prev,
                returns: { ...prev.returns, steps: [...prev.returns.steps, { num: '', title: '', desc: '' }] },
              }));
            }}
            className="flex items-center gap-1 text-xs text-brand-400 hover:text-brand-300"
          >
            <Icons.Plus size={12} /> Add Step
          </button>
        </div>
        <div>
          <label className="block text-xs text-white/50 mb-1.5">Policies</label>
          {data.policies.map((policy, i) => (
            <div key={i} className="flex gap-2 mb-2">
              <input
                type="text"
                value={policy.title}
                onChange={(e) => {
                  const newPolicies = [...data.policies];
                  newPolicies[i] = { ...newPolicies[i], title: e.target.value };
                  setContent((prev) => ({ ...prev, returns: { ...prev.returns, policies: newPolicies } }));
                }}
                className="flex-1 px-3 py-2 bg-black/30 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-brand-500"
                placeholder="Title"
              />
              <input
                type="text"
                value={policy.desc}
                onChange={(e) => {
                  const newPolicies = [...data.policies];
                  newPolicies[i] = { ...newPolicies[i], desc: e.target.value };
                  setContent((prev) => ({ ...prev, returns: { ...prev.returns, policies: newPolicies } }));
                }}
                className="flex-1 px-3 py-2 bg-black/30 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-brand-500"
                placeholder="Description"
              />
              <button
                onClick={() => {
                  const newPolicies = data.policies.filter((_, idx) => idx !== i);
                  setContent((prev) => ({ ...prev, returns: { ...prev.returns, policies: newPolicies } }));
                }}
                className="p-2 rounded-lg hover:bg-red-500/10 text-white/50 hover:text-red-400"
              >
                <Icons.X size={14} />
              </button>
            </div>
          ))}
          <button
            onClick={() => {
              setContent((prev) => ({
                ...prev,
                returns: { ...prev.returns, policies: [...prev.returns.policies, { title: '', desc: '' }] },
              }));
            }}
            className="flex items-center gap-1 text-xs text-brand-400 hover:text-brand-300"
          >
            <Icons.Plus size={12} /> Add Policy
          </button>
        </div>
      </div>
    );
  };

  const renderCareersFields = () => {
    const data = content.careers;
    return (
      <div className="space-y-4">
        {renderHeroFields()}
        <div>
          <label className="block text-xs text-white/50 mb-1.5">Culture</label>
          <textarea
            value={data.culture}
            onChange={(e) => {
              setContent((prev) => ({ ...prev, careers: { ...prev.careers, culture: e.target.value } }));
            }}
            rows={3}
            className="w-full px-4 py-2.5 bg-black/30 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-brand-500 resize-none"
          />
        </div>
        <div>
          <label className="block text-xs text-white/50 mb-1.5">Perks</label>
          {data.perks.map((perk, i) => (
            <div key={i} className="flex gap-2 mb-2">
              <input
                type="text"
                value={perk}
                onChange={(e) => {
                  const newPerks = [...data.perks];
                  newPerks[i] = e.target.value;
                  setContent((prev) => ({ ...prev, careers: { ...prev.careers, perks: newPerks } }));
                }}
                className="flex-1 px-3 py-2 bg-black/30 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-brand-500"
                placeholder="Perk"
              />
              <button
                onClick={() => {
                  const newPerks = data.perks.filter((_, idx) => idx !== i);
                  setContent((prev) => ({ ...prev, careers: { ...prev.careers, perks: newPerks } }));
                }}
                className="p-2 rounded-lg hover:bg-red-500/10 text-white/50 hover:text-red-400"
              >
                <Icons.X size={14} />
              </button>
            </div>
          ))}
          <button
            onClick={() => {
              setContent((prev) => ({
                ...prev,
                careers: { ...prev.careers, perks: [...prev.careers.perks, ''] },
              }));
            }}
            className="flex items-center gap-1 text-xs text-brand-400 hover:text-brand-300"
          >
            <Icons.Plus size={12} /> Add Perk
          </button>
        </div>
        <div>
          <label className="block text-xs text-white/50 mb-1.5">Openings</label>
          {data.openings.map((opening, i) => (
            <div key={i} className="p-3 bg-black/20 rounded-xl border border-white/5 space-y-2 mb-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={opening.title}
                  onChange={(e) => {
                    const newOpenings = [...data.openings];
                    newOpenings[i] = { ...newOpenings[i], title: e.target.value };
                    setContent((prev) => ({ ...prev, careers: { ...prev.careers, openings: newOpenings } }));
                  }}
                  className="flex-1 px-3 py-2 bg-black/30 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-brand-500"
                  placeholder="Title"
                />
                <button
                  onClick={() => {
                    const newOpenings = data.openings.filter((_, idx) => idx !== i);
                    setContent((prev) => ({ ...prev, careers: { ...prev.careers, openings: newOpenings } }));
                  }}
                  className="p-2 rounded-lg hover:bg-red-500/10 text-white/50 hover:text-red-400"
                >
                  <Icons.X size={14} />
                </button>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={opening.team}
                  onChange={(e) => {
                    const newOpenings = [...data.openings];
                    newOpenings[i] = { ...newOpenings[i], team: e.target.value };
                    setContent((prev) => ({ ...prev, careers: { ...prev.careers, openings: newOpenings } }));
                  }}
                  className="flex-1 px-3 py-2 bg-black/30 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-brand-500"
                  placeholder="Team"
                />
                <input
                  type="text"
                  value={opening.location}
                  onChange={(e) => {
                    const newOpenings = [...data.openings];
                    newOpenings[i] = { ...newOpenings[i], location: e.target.value };
                    setContent((prev) => ({ ...prev, careers: { ...prev.careers, openings: newOpenings } }));
                  }}
                  className="flex-1 px-3 py-2 bg-black/30 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-brand-500"
                  placeholder="Location"
                />
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={opening.type}
                  onChange={(e) => {
                    const newOpenings = [...data.openings];
                    newOpenings[i] = { ...newOpenings[i], type: e.target.value };
                    setContent((prev) => ({ ...prev, careers: { ...prev.careers, openings: newOpenings } }));
                  }}
                  className="flex-1 px-3 py-2 bg-black/30 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-brand-500"
                  placeholder="Type"
                />
                <input
                  type="text"
                  value={opening.salary}
                  onChange={(e) => {
                    const newOpenings = [...data.openings];
                    newOpenings[i] = { ...newOpenings[i], salary: e.target.value };
                    setContent((prev) => ({ ...prev, careers: { ...prev.careers, openings: newOpenings } }));
                  }}
                  className="flex-1 px-3 py-2 bg-black/30 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-brand-500"
                  placeholder="Salary"
                />
              </div>
            </div>
          ))}
          <button
            onClick={() => {
              setContent((prev) => ({
                ...prev,
                careers: {
                  ...prev.careers,
                  openings: [...prev.careers.openings, { title: '', team: '', location: '', type: '', salary: '' }],
                },
              }));
            }}
            className="flex items-center gap-1 text-xs text-brand-400 hover:text-brand-300"
          >
            <Icons.Plus size={12} /> Add Opening
          </button>
        </div>
      </div>
    );
  };

  const renderLegalFields = () => {
    const data = content[activePage as keyof typeof content] as { heroTitle: string; heroSubtitle: string; content: string };
    return (
      <div className="space-y-4">
        {renderHeroFields()}
        <div>
          <label className="block text-xs text-white/50 mb-1.5">Content (HTML)</label>
          <textarea
            value={data.content || ''}
            onChange={(e) => updateField('content', e.target.value)}
            rows={12}
            className="w-full px-4 py-2.5 bg-black/30 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-brand-500 resize-none font-mono"
          />
        </div>
      </div>
    );
  };

  const renderPageFields = () => {
    switch (activePage) {
      case 'about': return renderAboutFields();
      case 'contact': return renderContactFields();
      case 'faq': return renderFAQFields();
      case 'shipping': return renderShippingFields();
      case 'returns': return renderReturnsFields();
      case 'careers': return renderCareersFields();
      case 'privacy': case 'terms': case 'cookies': return renderLegalFields();
      default: return null;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">Page Editor</h2>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 text-white text-sm rounded-xl hover:bg-white/10 transition-colors"
          >
            <Icons.Eye size={14} />
            Preview
          </button>
        </div>
      </div>

      <div className="flex gap-6">
        <div className="w-48 flex-shrink-0">
          <div className="glass-card rounded-2xl border border-white/10 overflow-hidden">
            {CMS_PAGES.map((p) => (
              <button
                key={p.id}
                onClick={() => setActivePage(p.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors ${
                  activePage === p.id
                    ? 'bg-brand-600/20 text-brand-400 border-l-2 border-brand-500'
                    : 'text-white/60 hover:bg-white/5 hover:text-white border-l-2 border-transparent'
                }`}
              >
                <p.icon size={16} />
                {p.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="glass-card rounded-2xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-white capitalize">{activePage} Page</h3>
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-brand-600 to-purple-600 text-white text-sm font-bold rounded-xl hover:opacity-90 transition-opacity"
              >
                <Icons.Save size={14} />
                {savedIndicator ? 'Saved!' : `Save ${activePage.charAt(0).toUpperCase() + activePage.slice(1)} Page`}
              </button>
            </div>
            {renderPageFields()}
          </div>
        </div>
      </div>

      {showPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="glass-card rounded-2xl p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto border border-white/10">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-white capitalize">{activePage} Preview</h3>
              <button onClick={() => setShowPreview(false)} className="p-1.5 rounded-lg hover:bg-white/10 text-white/50 hover:text-white">
                <Icons.X size={18} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="text-xl font-bold text-white">{(pageData as unknown as Record<string, unknown>).heroTitle as string}</h4>
                <p className="text-sm text-white/60 mt-1">{(pageData as unknown as Record<string, unknown>).heroSubtitle as string}</p>
              </div>
              {('content' in (pageData as unknown as Record<string, unknown>)) && (
                <div className="text-sm text-white/70 whitespace-pre-wrap">
                  {((pageData as unknown as Record<string, unknown>).content as string) || 'No content'}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
