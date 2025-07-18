export type UserType = 'jobseeker' | 'employer' | 'both';

export interface User {
  id: string;
  email: string;
  displayName: string;
  avatar?: string;
  bio?: string;
  skills: string[];
  location: string;
  country: string;
  salary?: string;
  rating: number;
  completedProjects: number;
  userType: UserType;
  company?: string;
  jobTitle: string;
  connections: number;
  endorsements: number;
  trustScore: number; // 0-100 based on upvotes/downvotes
  totalVotes: number;
  upvotes: number;
  downvotes: number;
  isOnline: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Job {
  id: string;
  title: string;
  description: string;
  budget?: number;
  salary?: string;
  deadline?: string;
  skills: string[];
  employerId: string;
  status: 'open' | 'in_progress' | 'closed';
  applications: number;
  postedDate: string;
  location: string;
  country: string;
  jobType: 'full-time' | 'part-time' | 'contract' | 'freelance';
  experienceLevel: 'entry' | 'mid' | 'senior' | 'executive';
  targetDemographics?: {
    countries: string[];
    ageRange?: string;
    experience?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface Post {
  id: string;
  userId: string;
  content: string;
  images?: string[];
  jobId?: string;
  likes: number;
  comments: number;
  shares: number;
  postType: 'achievement' | 'job_posting' | 'article' | 'update';
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  jobId?: string;
  createdAt: string;
  isRead: boolean;
}

export interface Connection {
  id: string;
  userId: string;
  connectedUserId: string;
  status: 'pending' | 'accepted' | 'declined';
  createdAt: string;
}

export interface Endorsement {
  id: string;
  endorserId: string;
  endorsedUserId: string;
  skill: string;
  createdAt: string;
}

export interface Match {
  id: string;
  candidateId: string;
  jobId: string;
  score: number;
  reasons: string[];
  createdAt: string;
}

export interface TrustVote {
  id: string;
  voterId: string;
  targetUserId: string;
  projectId: string; // Only after working together
  voteType: 'upvote' | 'downvote';
  comment?: string;
  createdAt: string;
}

export interface ProjectOffer {
  id: string;
  jobId: string;
  freelancerId: string;
  employerId: string;
  proposedRate?: number;
  proposedBudget?: number;
  message: string;
  timeline?: string;
  status: 'pending' | 'accepted' | 'rejected' | 'countered';
  counterOffer?: {
    rate?: number;
    budget?: number;
    message: string;
    createdAt: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface WorkHistory {
  id: string;
  jobId: string;
  freelancerId: string;
  employerId: string;
  status: 'completed' | 'in_progress' | 'cancelled';
  finalRate?: number;
  finalBudget?: number;
  completedAt?: string;
  canVote: boolean; // True if project is completed and user hasn't voted yet
  createdAt: string;
}

export const SKILL_CATEGORIES = {
  creative: [
    'Video Editing',
    'Graphic Design',
    'Photography',
    'Animation',
    'UI/UX Design',
    'Content Writing',
    'Copywriting',
    'Social Media Management',
    'Brand Design',
    'Illustration',
    'Video Production',
    'Audio Editing',
    'Motion Graphics'
  ],
  technical: [
    'Web Development',
    'Mobile Development',
    'Data Science',
    'Machine Learning',
    'DevOps',
    'Cybersecurity',
    'Database Management',
    'Cloud Computing',
    'Software Testing',
    'System Administration',
    'AI/ML Engineering',
    'Blockchain Development'
  ],
  business: [
    'Project Management',
    'Digital Marketing',
    'Sales',
    'Business Analysis',
    'Consulting',
    'Financial Planning',
    'HR Management',
    'Operations',
    'Strategy',
    'Customer Service',
    'Product Management',
    'Business Development'
  ],
  other: [
    'Translation',
    'Virtual Assistant',
    'Data Entry',
    'Research',
    'Teaching',
    'Legal Services',
    'Accounting',
    'Event Planning',
    'Healthcare',
    'Real Estate'
  ]
};

export const COUNTRIES = [
  'United States',
  'United Kingdom',
  'Canada',
  'Australia',
  'Germany',
  'France',
  'Netherlands',
  'Sweden',
  'India',
  'Singapore',
  'Japan',
  'Brazil',
  'Mexico',
  'Spain',
  'Italy',
  'Poland',
  'Ukraine',
  'Philippines',
  'Pakistan',
  'Bangladesh',
  'South Africa',
  'Nigeria',
  'Kenya',
  'Argentina',
  'Chile'
];