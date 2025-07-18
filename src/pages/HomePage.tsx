import { useState, useEffect } from 'react'
import { User, Post } from '../types'
import { blink } from '../blink/client'
import { PostCard } from '../components/feed/PostCard'
import { CreatePost } from '../components/feed/CreatePost'
import { AIMatchCard } from '../components/ai/AIMatchCard'
import { SkillCategories } from '../components/discover/SkillCategories'
import { mockPosts, mockJobs, delay } from '../services/mockData'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Briefcase, MapPin, Clock, Users, TrendingUp, Star, Loader2 } from 'lucide-react'

interface HomePageProps {
  user: User
}

export function HomePage({ user }: HomePageProps) {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadFeed()
  }, [])

  const loadFeed = async () => {
    try {
      setLoading(true)
      
      // Try to load posts from database first
      try {
        const feedPosts = await blink.db.posts.list({
          orderBy: { createdAt: 'desc' },
          limit: 20
        })
        setPosts(feedPosts)
      } catch (dbError) {
        console.log('Database not available, using mock data')
        // Simulate loading delay for better UX
        await delay(800)
        // Use mock data when database is not available
        setPosts(mockPosts)
      }
    } catch (error) {
      console.error('Failed to load feed:', error)
      // Fallback to mock data on any error
      setPosts(mockPosts)
    } finally {
      setLoading(false)
    }
  }

  const handlePostCreated = (newPost: Post) => {
    setPosts(prev => [newPost, ...prev])
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Sidebar - User Profile */}
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4 mb-4">
                <img
                  src={user.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'}
                  alt={user.displayName}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold text-lg">{user.displayName}</h3>
                  <p className="text-sm text-gray-600">{user.jobTitle}</p>
                  <p className="text-xs text-gray-500">{user.location}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-primary">{user.connections}</p>
                  <p className="text-xs text-gray-600">Connections</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-primary">{user.endorsements}</p>
                  <p className="text-xs text-gray-600">Endorsements</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Users className="h-4 w-4 mr-2" />
                Find Connections
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Briefcase className="h-4 w-4 mr-2" />
                Browse Jobs
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Star className="h-4 w-4 mr-2" />
                Get Endorsed
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Main Feed */}
        <div className="lg:col-span-2 space-y-6">
          {/* AI Recommendations */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Recommended for You</h2>
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                <TrendingUp className="h-3 w-3 mr-1" />
                AI Powered
              </Badge>
            </div>
            <AIMatchCard user={user} />
          </div>

          <CreatePost user={user} onPostCreated={handlePostCreated} />
          
          {posts.length === 0 ? (
            <div className="text-center py-12 bg-card rounded-lg border">
              <h3 className="text-lg font-semibold mb-2">Welcome to MeetOut!</h3>
              <p className="text-muted-foreground mb-4">
                Start connecting with professionals to see their posts here.
              </p>
              <button className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors">
                Discover People
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} currentUser={user} />
              ))}
            </div>
          )}
        </div>

        {/* Right Sidebar - Jobs & Insights */}
        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center">
                <Briefcase className="h-5 w-5 mr-2 text-primary" />
                Recent Jobs
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockJobs.slice(0, 3).map((job) => (
                <div key={job.id} className="border-b border-gray-100 last:border-0 pb-4 last:pb-0">
                  <h4 className="font-medium text-sm mb-2 line-clamp-2">{job.title}</h4>
                  <div className="space-y-1 text-xs text-gray-600">
                    <div className="flex items-center">
                      <MapPin className="h-3 w-3 mr-1" />
                      {job.location}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {job.jobType}
                    </div>
                    <div className="flex items-center">
                      <Users className="h-3 w-3 mr-1" />
                      {job.applications} applications
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {job.skills.slice(0, 2).map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {job.skills.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{job.skills.length - 2}
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
              <Button variant="outline" size="sm" className="w-full">
                View All Jobs
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Trending Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {['Video Editing', 'React', 'Digital Marketing', 'UI/UX Design', 'Content Writing'].map((skill, index) => (
                  <div key={skill} className="flex items-center justify-between">
                    <span className="text-sm font-medium">{skill}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-12 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary rounded-full"
                          style={{ width: `${90 - index * 15}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-500">#{index + 1}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Your Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Profile Views</span>
                  <span className="font-medium">24</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Job Matches</span>
                  <span className="font-medium">8</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Messages</span>
                  <span className="font-medium">12</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Skills Categories Section */}
      <div className="mt-12">
        <SkillCategories />
      </div>
    </div>
  )
}