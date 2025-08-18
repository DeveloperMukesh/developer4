'use client'

import { useState, useEffect } from 'react'
import { Plus, Search, Github, Eye, Edit, Trash2 } from 'lucide-react'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import Image from 'next/image'

interface Project {
  _id: string
  title: string
  description: string
  techStack: string[]
  imageUrl: string
  liveUrl: string
  githubUrl: string
  category: string
  status: string
  featured: boolean
  createdAt: string
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [featuredFilter, setFeaturedFilter] = useState('')
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    techStack: [''],
    imageUrl: '',
    liveUrl: '',
    githubUrl: '',
    category: 'Web App',
    status: 'Completed',
    featured: false
  })

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/projects`)
      setProjects(response.data.projects || response.data)
      setLoading(false)
    } catch (error: unknown) {
      console.error('Error fetching projects:', error)
      toast.error('Failed to fetch projects')
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const techStack = formData.techStack.filter(tech => tech.trim() !== '')
      const projectData = { ...formData, techStack }
      
      if (editingProject) {
        await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/projects/${editingProject._id}`, projectData)
        toast.success('Project updated successfully!')
        setEditingProject(null)
      } else {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/projects`, projectData)
        toast.success('Project added successfully!')
      }
      
      setShowAddForm(false)
      resetForm()
      fetchProjects()
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to save project'
      toast.error(errorMessage)
    }
  }

  const handleEdit = (project: Project) => {
    setEditingProject(project)
    setFormData({
      title: project.title,
      description: project.description,
      techStack: project.techStack,
      imageUrl: project.imageUrl,
      liveUrl: project.liveUrl,
      githubUrl: project.githubUrl,
      category: project.category,
      status: project.status,
      featured: project.featured
    })
    setShowAddForm(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      try {
        await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/projects/${id}`)
        toast.success('Project deleted successfully!')
        fetchProjects()
          } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to delete project'
      toast.error(errorMessage)
    }
    }
  }

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      techStack: [''],
      imageUrl: '',
      liveUrl: '',
      githubUrl: '',
      category: 'Web App',
      status: 'Completed',
      featured: false
    })
  }

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = !categoryFilter || project.category === categoryFilter
    const matchesStatus = !statusFilter || project.status === statusFilter
    const matchesFeatured = !featuredFilter || 
      (featuredFilter === 'true' ? project.featured : !project.featured)
    return matchesSearch && matchesCategory && matchesStatus && matchesFeatured
  })

  const addTechStack = () => {
    setFormData(prev => ({ ...prev, techStack: [...prev.techStack, ''] }))
  }

  const removeTechStack = (index: number) => {
    setFormData(prev => ({
      ...prev,
      techStack: prev.techStack.filter((_, i) => i !== index)
    }))
  }

  const updateTechStack = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      techStack: prev.techStack.map((tech, i) => i === index ? value : tech)
    }))
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
              <p className="mt-2 text-gray-600">Manage and showcase your development projects</p>
            </div>
            <button
              onClick={() => {
                setEditingProject(null)
                resetForm()
                setShowAddForm(true)
              }}
              className="mt-4 md:mt-0 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Add New Project
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Categories</option>
              <option value="Web App">Web App</option>
              <option value="Mobile App">Mobile App</option>
              <option value="Desktop App">Desktop App</option>
              <option value="API">API</option>
              <option value="Other">Other</option>
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Status</option>
              <option value="Completed">Completed</option>
              <option value="In Progress">In Progress</option>
              <option value="Planning">Planning</option>
            </select>
            <select
              value={featuredFilter}
              onChange={(e) => setFeaturedFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Projects</option>
              <option value="true">Featured Only</option>
              <option value="false">Non-Featured</option>
            </select>
            <button
              onClick={() => {
                setSearchTerm('')
                setCategoryFilter('')
                setStatusFilter('')
                setFeaturedFilter('')
              }}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Clear All
            </button>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div key={project._id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
              {project.imageUrl && (
                <div className="aspect-video bg-gray-200 rounded-t-lg overflow-hidden">
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    width={400}
                    height={225}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{project.title}</h3>
                  {project.featured && (
                    <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                      Featured
                    </span>
                  )}
                </div>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.techStack.map((tech, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span>{project.category}</span>
                  <span className={`px-2 py-1 rounded-full ${
                    project.status === 'Completed' ? 'bg-green-100 text-green-800' :
                    project.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {project.status}
                  </span>
                </div>
                <div className="flex items-center gap-2 mb-4">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm"
                    >
                      <Eye className="w-4 h-4" />
                      Live Demo
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-gray-600 hover:text-gray-700 text-sm"
                    >
                      <Github className="w-4 h-4" />
                      Code
                    </a>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(project)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm transition-colors flex items-center justify-center gap-1"
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(project._id)}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg text-sm transition-colors flex items-center justify-center gap-1"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No projects found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Add/Edit Project Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {editingProject ? 'Edit Project' : 'Add New Project'}
                </h2>
                <button
                  onClick={() => {
                    setShowAddForm(false)
                    setEditingProject(null)
                    resetForm()
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tech Stack *
                  </label>
                  {formData.techStack.map((tech, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        required
                        value={tech}
                        onChange={(e) => updateTechStack(index, e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Technology name"
                      />
                      {formData.techStack.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeTechStack(index)}
                          className="px-3 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addTechStack}
                    className="text-blue-600 hover:text-blue-700 text-sm"
                  >
                    + Add Technology
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Image URL
                    </label>
                    <input
                      type="url"
                      value={formData.imageUrl}
                      onChange={(e) => setFormData(prev => ({ ...prev, imageUrl: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Live URL
                    </label>
                    <input
                      type="url"
                      value={formData.liveUrl}
                      onChange={(e) => setFormData(prev => ({ ...prev, liveUrl: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    GitHub URL
                  </label>
                  <input
                    type="url"
                    value={formData.githubUrl}
                    onChange={(e) => setFormData(prev => ({ ...prev, githubUrl: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="Web App">Web App</option>
                      <option value="Mobile App">Mobile App</option>
                      <option value="Desktop App">Desktop App</option>
                      <option value="API">API</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Status
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="Completed">Completed</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Planning">Planning</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={formData.featured}
                    onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="featured" className="ml-2 block text-sm text-gray-900">
                    Mark as featured project
                  </label>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    {editingProject ? 'Update Project' : 'Add Project'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddForm(false)
                      setEditingProject(null)
                      resetForm()
                    }}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
