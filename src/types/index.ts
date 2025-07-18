export interface User {
  id: string
  email: string
  displayName?: string
  avatar?: string
  bio?: string
  skills?: string[]
  location?: string
  hourlyRate?: number
  rating?: number
  completedProjects?: number
  isFreelancer?: boolean
  isClient?: boolean
  createdAt: string
  updatedAt: string
}

export interface Project {
  id: string
  title: string
  description: string
  budget: number
  deadline: string
  skills: string[]
  clientId: string
  freelancerId?: string
  status: 'open' | 'in_progress' | 'completed' | 'cancelled'
  images?: string[]
  createdAt: string
  updatedAt: string
}

export interface Post {
  id: string
  userId: string
  content: string
  images?: string[]
  projectId?: string
  likes: number
  comments: number
  shares: number
  createdAt: string
  updatedAt: string
}

export interface Message {
  id: string
  senderId: string
  receiverId: string
  content: string
  projectId?: string
  createdAt: string
  isRead: boolean
}

export interface Skill {
  id: string
  name: string
  category: string
}

export interface Match {
  id: string
  freelancerId: string
  projectId: string
  score: number
  reasons: string[]
  createdAt: string
}