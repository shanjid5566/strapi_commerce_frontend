'use client'

import { useState } from 'react'
import { Icons } from '@/components/ui/Icons'
import { useCMS } from '@/contexts/CMSContext'
import type { CMSBlogPost } from '@/types'

const categories = ['Technology', 'Reviews', 'Tutorials', 'News', 'Tips']

export default function AdminBlogs() {
  const { content, setContent } = useCMS()
  const posts = content.blog.posts

  const createPost = (postData: Omit<CMSBlogPost, 'id'>) => {
    const newPost: CMSBlogPost = { id: Date.now(), ...postData }
    setContent({
      ...content,
      blog: { ...content.blog, posts: [...content.blog.posts, newPost] }
    })
  }

  const updatePost = (id: number, postData: Partial<CMSBlogPost>) => {
    setContent({
      ...content,
      blog: {
        ...content.blog,
        posts: content.blog.posts.map((p: CMSBlogPost) => p.id === id ? { ...p, ...postData } : p)
      }
    })
  }

  const deletePost = (id: number) => {
    setContent({
      ...content,
      blog: {
        ...content.blog,
        posts: content.blog.posts.filter((p: CMSBlogPost) => p.id !== id)
      }
    })
  }
  const [search, setSearch] = useState('')
  const [view, setView] = useState<'list' | 'form'>('list')
  const [editingPost, setEditingPost] = useState<any>(null)
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    image: '',
    category: 'Technology',
    author: '',
    date: new Date().toISOString().split('T')[0],
    readTime: '5 min read',
    content: ''
  })

  const filteredPosts = posts?.filter((p: CMSBlogPost) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  ) || []

  const stats = [
    { title: 'Total Posts', value: posts.length, icon: Icons.FileText, gradient: 'from-blue-500 to-indigo-500' },
    { title: 'Authors', value: new Set(posts.map((p: CMSBlogPost) => p.author)).size, icon: Icons.User, gradient: 'from-purple-500 to-pink-500' },
    { title: 'Categories', value: categories.length, icon: Icons.Folder, gradient: 'from-emerald-500 to-teal-500' },
    { title: 'Content Items', value: posts.length, icon: Icons.Eye, gradient: 'from-orange-500 to-red-500' }
  ]

  const handleCreate = () => {
    setEditingPost(null)
    setFormData({
      title: '',
      excerpt: '',
      image: '',
      category: 'Technology',
      author: '',
      date: new Date().toISOString().split('T')[0],
      readTime: '5 min read',
      content: ''
    })
    setView('form')
  }

  const handleEdit = (post: CMSBlogPost) => {
    setEditingPost(post)
    setFormData({
      title: post.title,
      excerpt: post.excerpt,
      image: post.image || '',
      category: post.category,
      author: post.author,
      date: post.date,
      readTime: post.readTime,
      content: post.content
    })
    setView('form')
  }

  const handleSave = () => {
    if (editingPost) {
      updatePost(editingPost.id, formData)
    } else {
      createPost(formData)
    }
    setView('list')
  }

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this post?')) {
      deletePost(id)
    }
  }

  const applyFormat = (format: 'bold' | 'italic') => {
    const textarea = document.querySelector('textarea[name="content"]') as HTMLTextAreaElement
    if (textarea) {
      const start = textarea.selectionStart
      const end = textarea.selectionEnd
      const selectedText = formData.content.substring(start, end)
      const wrapper = format === 'bold' ? '**' : '_'
      const newContent = formData.content.substring(0, start) + wrapper + selectedText + wrapper + formData.content.substring(end)
      setFormData({ ...formData, content: newContent })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Blog Management</h1>
        {view === 'list' && (
          <button
            onClick={handleCreate}
            className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl font-medium hover:from-indigo-600 hover:to-purple-600 transition-all flex items-center gap-2"
          >
            <Icons.Plus className="w-5 h-5" />
            Create New Post
          </button>
        )}
      </div>

      {view === 'list' && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat) => (
              <div key={stat.title} className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/60 text-sm">{stat.title}</p>
                    <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6">
            <div className="mb-6">
              <div className="relative">
                <Icons.Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                <input
                  type="text"
                  placeholder="Search posts..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-xl pl-12 pr-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-white/60 border-b border-white/10">
                    <th className="pb-3 font-medium">Title</th>
                    <th className="pb-3 font-medium">Category</th>
                    <th className="pb-3 font-medium">Author</th>
                    <th className="pb-3 font-medium">Date</th>
                    <th className="pb-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {filteredPosts.map((post: CMSBlogPost) => (
                    <tr key={post.id} className="text-white hover:bg-white/5">
                      <td className="py-4 font-medium max-w-xs truncate">{post.title}</td>
                      <td className="py-4">
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-indigo-500/20 text-indigo-400">
                          {post.category}
                        </span>
                      </td>
                      <td className="py-4 text-white/60">{post.author}</td>
                      <td className="py-4 text-white/60">{new Date(post.date).toLocaleDateString()}</td>
                      <td className="py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleEdit(post)}
                            className="p-2 rounded-lg hover:bg-white/10 text-white/60 hover:text-white transition-colors"
                          >
                            <Icons.Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(post.id)}
                            className="p-2 rounded-lg hover:bg-red-500/20 text-white/60 hover:text-red-400 transition-colors"
                          >
                            <Icons.Trash className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {view === 'form' && (
        <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6">
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => setView('list')}
              className="p-2 rounded-lg hover:bg-white/10 text-white/60 hover:text-white"
            >
              <Icons.ArrowLeft className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-bold text-white">
              {editingPost ? 'Edit Post' : 'Create New Post'}
            </h2>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-white/80 text-sm mb-2">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Enter post title"
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-white/80 text-sm mb-2">Excerpt</label>
              <textarea
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                placeholder="Brief description..."
                rows={2}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-indigo-500 resize-none"
              />
            </div>

            <div>
              <label className="block text-white/80 text-sm mb-2">Banner Image</label>
              <div className="flex items-center gap-4">
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="Image URL or upload"
                  className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-indigo-500"
                />
                <button className="p-3 bg-white/10 rounded-xl text-white/60 hover:text-white hover:bg-white/20 transition-colors">
                  <Icons.Upload className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-white/80 text-sm mb-2">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-white/80 text-sm mb-2">Author</label>
                <input
                  type="text"
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  placeholder="Author name"
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-white/80 text-sm mb-2">Date</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-white/80 text-sm mb-2">Read Time</label>
                <input
                  type="text"
                  value={formData.readTime}
                  onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                  placeholder="e.g., 5 min read"
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-white/80 text-sm mb-2">Content</label>
              <div className="flex items-center gap-2 mb-2">
                <button
                  onClick={() => applyFormat('bold')}
                  className="p-2 rounded-lg bg-white/10 text-white/60 hover:text-white hover:bg-white/20 transition-colors"
                >
                  <Icons.Bold className="w-4 h-4" />
                </button>
                <button
                  onClick={() => applyFormat('italic')}
                  className="p-2 rounded-lg bg-white/10 text-white/60 hover:text-white hover:bg-white/20 transition-colors"
                >
                  <Icons.Italic className="w-4 h-4" />
                </button>
                <button className="p-2 rounded-lg bg-white/10 text-white/60 hover:text-white hover:bg-white/20 transition-colors">
                  <Icons.Image className="w-4 h-4" />
                </button>
              </div>
              <textarea
                name="content"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="Write your post content..."
                rows={12}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-indigo-500 resize-none"
              />
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={handleSave}
                disabled={!formData.title}
                className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl font-medium hover:from-indigo-600 hover:to-purple-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {editingPost ? 'Update Post' : 'Publish Post'}
              </button>
              <button
                onClick={() => setView('list')}
                className="px-6 py-3 bg-white/10 text-white rounded-xl font-medium hover:bg-white/20 transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
