import { User, Job, Post, UserType, TrustVote, ProjectOffer, WorkHistory } from '../types'

export const mockUsers: User[] = [
  {
    id: '1',
    email: 'sarah.designer@email.com',
    displayName: 'Sarah Chen',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    bio: 'Creative video editor and motion graphics designer with 5+ years of experience in digital marketing campaigns.',
    skills: ['Video Editing', 'Motion Graphics', 'Adobe Premiere Pro', 'After Effects', 'Social Media Content'],
    location: 'San Francisco, CA',
    country: 'United States',
    rating: 4.9,
    completedProjects: 127,
    userType: 'jobseeker' as UserType,
    jobTitle: 'Senior Video Editor',
    connections: 342,
    endorsements: 89,
    trustScore: 92,
    totalVotes: 89,
    upvotes: 82,
    downvotes: 7,
    isOnline: true,
    createdAt: '2023-01-15T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z'
  },
  {
    id: '2',
    email: 'alex.dev@email.com',
    displayName: 'Alex Rodriguez',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    bio: 'Full-stack developer specializing in React, Node.js, and cloud architecture. Building scalable web applications.',
    skills: ['Web Development', 'React', 'Node.js', 'AWS', 'TypeScript', 'Database Management'],
    location: 'Austin, TX',
    country: 'United States',
    rating: 4.8,
    completedProjects: 89,
    userType: 'jobseeker' as UserType,
    jobTitle: 'Full Stack Developer',
    connections: 567,
    endorsements: 134,
    trustScore: 88,
    totalVotes: 76,
    upvotes: 67,
    downvotes: 9,
    isOnline: false,
    createdAt: '2023-02-20T00:00:00Z',
    updatedAt: '2024-01-20T00:00:00Z'
  },
  {
    id: '3',
    email: 'maria.marketing@email.com',
    displayName: 'Maria Silva',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    bio: 'Digital marketing strategist helping brands grow through data-driven campaigns and creative content.',
    skills: ['Digital Marketing', 'Content Writing', 'Social Media Management', 'SEO', 'Google Analytics'],
    location: 'Miami, FL',
    country: 'United States',
    rating: 4.7,
    completedProjects: 156,
    userType: 'jobseeker' as UserType,
    jobTitle: 'Digital Marketing Manager',
    connections: 789,
    endorsements: 203,
    trustScore: 85,
    totalVotes: 134,
    upvotes: 114,
    downvotes: 20,
    isOnline: true,
    createdAt: '2023-03-10T00:00:00Z',
    updatedAt: '2024-01-10T00:00:00Z'
  },
  {
    id: '4',
    email: 'david.ceo@techstartup.com',
    displayName: 'David Kim',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    bio: 'CEO of TechStartup Inc. Looking for talented professionals to join our growing team.',
    skills: ['Leadership', 'Strategy', 'Business Development', 'Product Management'],
    location: 'Seattle, WA',
    country: 'United States',
    salary: '$150,000 - $200,000',
    rating: 4.9,
    completedProjects: 23,
    userType: 'employer' as UserType,
    company: 'TechStartup Inc.',
    jobTitle: 'CEO & Founder',
    connections: 1234,
    endorsements: 456,
    trustScore: 95,
    totalVotes: 45,
    upvotes: 43,
    downvotes: 2,
    isOnline: true,
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '5',
    email: 'emma.designer@email.com',
    displayName: 'Emma Thompson',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
    bio: 'UI/UX designer passionate about creating beautiful and intuitive user experiences.',
    skills: ['UI/UX Design', 'Figma', 'Adobe Creative Suite', 'Prototyping', 'User Research'],
    location: 'London',
    country: 'United Kingdom',
    rating: 4.8,
    completedProjects: 94,
    userType: 'both' as UserType,
    jobTitle: 'Senior UX Designer',
    connections: 445,
    endorsements: 112,
    trustScore: 90,
    totalVotes: 67,
    upvotes: 60,
    downvotes: 7,
    isOnline: true,
    createdAt: '2023-04-05T00:00:00Z',
    updatedAt: '2024-01-05T00:00:00Z'
  }
]

export const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Video Editor for Marketing Campaign',
    description: 'We need a skilled video editor to create engaging promotional videos for our upcoming product launch. The project involves editing 5-10 short videos for social media platforms.',
    budget: 2500,
    skills: ['Video Editing', 'Motion Graphics', 'Social Media Content'],
    employerId: '4',
    status: 'open',
    applications: 12,
    postedDate: '2024-01-15',
    location: 'Remote',
    country: 'United States',
    jobType: 'contract',
    experienceLevel: 'mid',
    targetDemographics: {
      countries: ['United States', 'Canada', 'United Kingdom'],
      experience: 'mid-level'
    },
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z'
  },
  {
    id: '2',
    title: 'Senior Full Stack Developer',
    description: 'Join our team as a Senior Full Stack Developer to build and maintain our web applications. You will work with React, Node.js, and AWS to create scalable solutions.',
    salary: '$120,000 - $150,000',
    skills: ['Web Development', 'React', 'Node.js', 'AWS', 'TypeScript'],
    employerId: '4',
    status: 'open',
    applications: 28,
    postedDate: '2024-01-10',
    location: 'Seattle, WA',
    country: 'United States',
    jobType: 'full-time',
    experienceLevel: 'senior',
    targetDemographics: {
      countries: ['United States'],
      experience: 'senior-level'
    },
    createdAt: '2024-01-10T00:00:00Z',
    updatedAt: '2024-01-10T00:00:00Z'
  },
  {
    id: '3',
    title: 'Digital Marketing Specialist',
    description: 'Looking for a creative digital marketing specialist to help grow our online presence. Experience with content creation, social media management, and SEO required.',
    budget: 3000,
    skills: ['Digital Marketing', 'Content Writing', 'Social Media Management', 'SEO'],
    employerId: '5',
    status: 'open',
    applications: 19,
    postedDate: '2024-01-12',
    location: 'Remote',
    country: 'United Kingdom',
    jobType: 'contract',
    experienceLevel: 'mid',
    targetDemographics: {
      countries: ['United Kingdom', 'Ireland', 'Australia'],
      experience: 'mid-level'
    },
    createdAt: '2024-01-12T00:00:00Z',
    updatedAt: '2024-01-12T00:00:00Z'
  },
  {
    id: '4',
    title: 'Graphic Designer for Brand Identity',
    description: 'We need a talented graphic designer to create a complete brand identity package including logo, business cards, and marketing materials.',
    budget: 1800,
    skills: ['Graphic Design', 'Brand Design', 'Adobe Creative Suite', 'Logo Design'],
    employerId: '4',
    status: 'open',
    applications: 15,
    postedDate: '2024-01-14',
    location: 'Remote',
    country: 'United States',
    jobType: 'freelance',
    experienceLevel: 'mid',
    targetDemographics: {
      countries: ['United States', 'Canada', 'Mexico'],
      experience: 'mid-level'
    },
    createdAt: '2024-01-14T00:00:00Z',
    updatedAt: '2024-01-14T00:00:00Z'
  }
]

export const mockPosts: Post[] = [
  {
    id: '1',
    userId: '1',
    content: 'Just completed an amazing video editing project for a tech startup! Created 8 promotional videos that increased their social media engagement by 300%. Love working with innovative companies! 🎬✨',
    images: ['https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=500&h=300&fit=crop'],
    likes: 47,
    comments: 12,
    shares: 8,
    postType: 'achievement',
    createdAt: '2024-01-16T10:30:00Z',
    updatedAt: '2024-01-16T10:30:00Z'
  },
  {
    id: '2',
    userId: '4',
    content: 'We\'re hiring! Looking for a Senior Full Stack Developer to join our growing team at TechStartup Inc. Great benefits, remote-friendly, and exciting projects ahead! Apply now 👨‍💻',
    jobId: '2',
    likes: 23,
    comments: 6,
    shares: 15,
    postType: 'job_posting',
    createdAt: '2024-01-15T14:20:00Z',
    updatedAt: '2024-01-15T14:20:00Z'
  },
  {
    id: '3',
    userId: '3',
    content: 'Sharing some insights on digital marketing trends for 2024. The key is authentic storytelling and data-driven strategies. What trends are you seeing in your industry?',
    likes: 89,
    comments: 24,
    shares: 31,
    postType: 'article',
    createdAt: '2024-01-14T09:15:00Z',
    updatedAt: '2024-01-14T09:15:00Z'
  },
  {
    id: '4',
    userId: '5',
    content: 'Excited to announce that I\'m now offering both design services and looking for talented designers to collaborate with! Building a network of creative professionals. Let\'s connect! 🎨',
    likes: 34,
    comments: 8,
    shares: 12,
    postType: 'update',
    createdAt: '2024-01-13T16:45:00Z',
    updatedAt: '2024-01-13T16:45:00Z'
  }
]

export const mockTrustVotes: TrustVote[] = [
  {
    id: '1',
    voterId: '4',
    targetUserId: '1',
    projectId: 'proj_1',
    voteType: 'upvote',
    comment: 'Excellent work on the video editing project. Professional and delivered on time.',
    createdAt: '2024-01-16T00:00:00Z'
  },
  {
    id: '2',
    voterId: '5',
    targetUserId: '2',
    projectId: 'proj_2',
    voteType: 'upvote',
    comment: 'Great developer, clean code and good communication.',
    createdAt: '2024-01-14T00:00:00Z'
  }
]

export const mockProjectOffers: ProjectOffer[] = [
  {
    id: '1',
    jobId: '1',
    freelancerId: '1',
    employerId: '4',
    proposedRate: 80,
    message: 'I would love to work on this video editing project. I have extensive experience with similar campaigns and can deliver high-quality results.',
    timeline: '1 week',
    status: 'pending',
    createdAt: '2024-01-17T00:00:00Z',
    updatedAt: '2024-01-17T00:00:00Z'
  },
  {
    id: '2',
    jobId: '2',
    freelancerId: '2',
    employerId: '4',
    proposedRate: 100,
    message: 'I am interested in this full-stack position. My experience with React and Node.js makes me a perfect fit.',
    timeline: 'Immediate start',
    status: 'countered',
    counterOffer: {
      rate: 95,
      message: 'We like your profile! Would you consider $95/hour?',
      createdAt: '2024-01-16T00:00:00Z'
    },
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-01-16T00:00:00Z'
  }
]

export const mockWorkHistory: WorkHistory[] = [
  {
    id: '1',
    jobId: 'job_completed_1',
    freelancerId: '1',
    employerId: '4',
    status: 'completed',
    finalRate: 75,
    completedAt: '2024-01-10T00:00:00Z',
    canVote: false, // Already voted
    createdAt: '2023-12-15T00:00:00Z'
  },
  {
    id: '2',
    jobId: 'job_completed_2',
    freelancerId: '2',
    employerId: '5',
    status: 'completed',
    finalRate: 90,
    completedAt: '2024-01-12T00:00:00Z',
    canVote: true, // Can still vote
    createdAt: '2023-12-20T00:00:00Z'
  }
]

// Helper functions
export const getUserById = (userId: string): User | undefined => {
  return mockUsers.find(user => user.id === userId)
}

export const getTrustScore = (userId: string): { score: number; upvotes: number; downvotes: number; total: number } => {
  const user = getUserById(userId)
  if (!user) return { score: 0, upvotes: 0, downvotes: 0, total: 0 }
  
  return {
    score: user.trustScore,
    upvotes: user.upvotes,
    downvotes: user.downvotes,
    total: user.totalVotes
  }
}

export const canVoteForUser = (voterId: string, targetUserId: string): boolean => {
  // Check if they have worked together and voting is allowed
  return mockWorkHistory.some(work => 
    ((work.freelancerId === voterId && work.employerId === targetUserId) ||
     (work.employerId === voterId && work.freelancerId === targetUserId)) &&
    work.status === 'completed' &&
    work.canVote
  )
}

export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))