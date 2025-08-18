// API configuration
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

// API endpoints
export const API_ENDPOINTS = {
  projects: '/api/projects',
  featuredProjects: '/api/projects/featured',
}

// Helper function to build full API URLs
export const buildApiUrl = (endpoint: string) => `${API_BASE_URL}${endpoint}`

// Common API functions
export const api = {
  get: async (endpoint: string) => {
    const response = await fetch(buildApiUrl(endpoint))
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return response.json()
  },
  
  post: async (endpoint: string, data: unknown) => {
    const response = await fetch(buildApiUrl(endpoint), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return response.json()
  },
  
  put: async (endpoint: string, data: unknown) => {
    const response = await fetch(buildApiUrl(endpoint), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return response.json()
  },
  
  delete: async (endpoint: string) => {
    const response = await fetch(buildApiUrl(endpoint), {
      method: 'DELETE',
    })
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return response.json()
  },
}
