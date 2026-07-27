'use client';

import { useState } from 'react';
import { useCMS } from '@/contexts/CMSContext';
import { Icons } from '@/components/ui/Icons';

type ViewMode = 'list' | 'form';

interface BlogForm {
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  content: string;
  image: string;
}

const emptyForm: BlogForm = {
  title: '',
  excerpt: '',
  category: '',
  author: '',
  date: '',
  readTime: '',
  content: '',
  image: '',
};

export default function AdminBlogsPage() {
  const { content, setContent } = useCMS();
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [search, setSearch] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<BlogForm>(emptyForm);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const posts = content.blog.posts;

  const filtered = posts.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase()) ||
      p.author.toLowerCase().includes(search.toLowerCase())
  );

  const openAdd = () => {
    setEditingId(null);
    setForm(emptyForm);
    setPreviewImage(null);
    setViewMode('form');
  };

  const openEdit = (id: number) => {
    const post = posts.find((p) => p.id === id);
    if (!post) return;
    setEditingId(id);
    setForm({
      title: post.title,
      excerpt: post.excerpt,
      category: post.category,
      author: post.author,
      date: post.date,
      readTime: post.readTime,
      content: post.content,
      image: post.image || '',
    });
    setPreviewImage(post.image || null);
    setViewMode('form');
  };

  const handleSave = () => {
    if (!form.title.trim()) return;
    if (editingId !== null) {
      setContent((prev) => ({
        ...prev,
        blog: {
          ...prev.blog,
          posts: prev.blog.posts.map((p) =>
            p.id === editingId ? { ...p, ...form } : p
          ),
        },
      }));
    } else {
      const newPost = {
        ...form,
        id: Date.now(),
        image: previewImage || form.image,
      };
      setContent((prev) => ({
        ...prev,
        blog: {
          ...prev.blog,
          posts: [...prev.blog.posts, newPost],
        },
      }));
    }
    setViewMode('list');
  };

  const handleDelete = (id: number) => {
    setContent((prev) => ({
      ...prev,
      blog: {
        ...prev.blog,
        posts: prev.blog.posts.filter((p) => p.id !== id),
      },
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        setPreviewImage(result);
        setForm((f) => ({ ...f, image: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const insertFormatting = (tag: string) => {
    const textarea = document.getElementById('blog-content') as HTMLTextAreaElement;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = form.content.substring(start, end);
    const before = form.content.substring(0, start);
    const after = form.content.substring(end);
    const newContent = `${before}<${tag}>${selected}</${tag}>${after}`;
    setForm((f) => ({ ...f, content: newContent }));
  };

  if (viewMode === 'form') {
    return (
      <div className="space-y-6 animate-fade-in">
        <button
          onClick={() => setViewMode('list')}
          className="flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm"
        >
          <Icons.ArrowLeft size={16} />
          Back to Blogs
        </button>

        <div className="glass-card rounded-2xl p-6 border border-white/10">
          <h2 className="text-lg font-bold text-white mb-5">
            {editingId !== null ? 'Edit Blog Post' : 'Create Blog Post'}
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-xs text-white/50 mb-1.5">Title</label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                className="w-full px-4 py-2.5 bg-black/30 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-brand-500"
                placeholder="Blog title"
              />
            </div>

            <div>
              <label className="block text-xs text-white/50 mb-1.5">Excerpt</label>
              <textarea
                value={form.excerpt}
                onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))}
                rows={2}
                className="w-full px-4 py-2.5 bg-black/30 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-brand-500 resize-none"
                placeholder="Short description"
              />
            </div>

            <div>
              <label className="block text-xs text-white/50 mb-1.5">Banner Image</label>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 px-4 py-2.5 bg-black/30 border border-white/10 rounded-xl text-sm text-white/70 hover:text-white hover:border-white/20 cursor-pointer transition-colors">
                  <Icons.Upload size={16} />
                  Choose Image
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
                {previewImage && (
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-white/10">
                    <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                    <button
                      onClick={() => {
                        setPreviewImage(null);
                        setForm((f) => ({ ...f, image: '' }));
                      }}
                      className="absolute top-0.5 right-0.5 p-0.5 rounded bg-black/60 text-white/60 hover:text-white"
                    >
                      <Icons.X size={10} />
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-white/50 mb-1.5">Category</label>
                <input
                  type="text"
                  value={form.category}
                  onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                  className="w-full px-4 py-2.5 bg-black/30 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-brand-500"
                  placeholder="e.g. Reviews, Technology"
                />
              </div>
              <div>
                <label className="block text-xs text-white/50 mb-1.5">Author</label>
                <input
                  type="text"
                  value={form.author}
                  onChange={(e) => setForm((f) => ({ ...f, author: e.target.value }))}
                  className="w-full px-4 py-2.5 bg-black/30 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-brand-500"
                  placeholder="Author name"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-white/50 mb-1.5">Publish Date</label>
                <input
                  type="text"
                  value={form.date}
                  onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
                  className="w-full px-4 py-2.5 bg-black/30 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-brand-500"
                  placeholder="e.g. Jan 15, 2025"
                />
              </div>
              <div>
                <label className="block text-xs text-white/50 mb-1.5">Read Time</label>
                <input
                  type="text"
                  value={form.readTime}
                  onChange={(e) => setForm((f) => ({ ...f, readTime: e.target.value }))}
                  className="w-full px-4 py-2.5 bg-black/30 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-brand-500"
                  placeholder="e.g. 8 min read"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-white/50 mb-1.5">Content (HTML)</label>
              <div className="flex gap-2 mb-2">
                <button
                  type="button"
                  onClick={() => insertFormatting('b')}
                  className="p-1.5 rounded-lg bg-black/30 border border-white/10 text-white/60 hover:text-white hover:border-white/20 transition-colors"
                >
                  <Icons.Bold size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => insertFormatting('i')}
                  className="p-1.5 rounded-lg bg-black/30 border border-white/10 text-white/60 hover:text-white hover:border-white/20 transition-colors"
                >
                  <Icons.Italic size={14} />
                </button>
              </div>
              <textarea
                id="blog-content"
                value={form.content}
                onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
                rows={8}
                className="w-full px-4 py-2.5 bg-black/30 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-brand-500 resize-none font-mono"
                placeholder="Write your blog content here..."
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={() => setViewMode('list')}
              className="px-4 py-2 text-sm text-white/60 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-brand-600 to-purple-600 text-white text-sm font-bold rounded-xl hover:opacity-90 transition-opacity"
            >
              <Icons.Save size={14} />
              {editingId !== null ? 'Update' : 'Publish'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">Blog Management</h2>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Icons.Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
          <input
            type="text"
            placeholder="Search blogs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder:text-white/40 focus:outline-none focus:border-brand-500/50"
          />
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-brand-600 to-purple-600 text-white text-sm font-bold rounded-xl hover:opacity-90 transition-opacity"
        >
          <Icons.Plus size={16} />
          Create Blog
        </button>
      </div>

      <div className="glass-card rounded-2xl overflow-hidden border border-white/10">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5">
                <th className="px-5 py-3 text-xs font-bold text-white/50 uppercase">Title</th>
                <th className="px-5 py-3 text-xs font-bold text-white/50 uppercase">Category</th>
                <th className="px-5 py-3 text-xs font-bold text-white/50 uppercase">Author</th>
                <th className="px-5 py-3 text-xs font-bold text-white/50 uppercase">Date</th>
                <th className="px-5 py-3 text-xs font-bold text-white/50 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-5 py-12 text-center">
                    <Icons.Newspaper size={40} className="mx-auto text-white/20 mb-3" />
                    <p className="text-white/50 text-sm">No blog posts found</p>
                    <p className="text-white/30 text-xs mt-1">Create your first blog post to get started</p>
                  </td>
                </tr>
              ) : (
                filtered.map((post) => (
                  <tr key={post.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                          <Icons.FileText size={18} className="text-white/50" />
                        </div>
                        <div>
                          <p className="text-sm text-white font-medium">{post.title}</p>
                          <p className="text-xs text-white/40 line-clamp-1">{post.excerpt}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-white/10 text-white/70">
                        {post.category}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-sm text-white/70">{post.author}</td>
                    <td className="px-5 py-3 text-sm text-white/70">{post.date}</td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openEdit(post.id)}
                          className="p-1.5 rounded-lg hover:bg-white/10 text-white/50 hover:text-white transition-colors"
                        >
                          <Icons.Edit size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(post.id)}
                          className="p-1.5 rounded-lg hover:bg-red-500/10 text-white/50 hover:text-red-400 transition-colors"
                        >
                          <Icons.Trash size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
