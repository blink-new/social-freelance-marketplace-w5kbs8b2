import { useState, useEffect } from 'react'
import { User, Post } from '../types'
import { blink } from '../blink/client'
import { PostCard } from '../components/feed/PostCard'
import { CreatePost } from '../components/feed/CreatePost'
import { AIMatchCard } from '../components/ai/AIMatchCard'
import { TrendingSkills } from '../components/discover/TrendingSkills'
import { Loader2 } from 'lucide-react'

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
      // Load posts from database
      const feedPosts = await blink.db.posts.list({
        orderBy: { createdAt: 'desc' },
        limit: 20
      })
      setPosts(feedPosts)
    } catch (error) {
      console.error('Failed to load feed:', error)
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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Feed */}
        <div className="lg:col-span-2 space-y-6">
          <CreatePost user={user} onPostCreated={handlePostCreated} />
          
          {posts.length === 0 ? (
            <div className="text-center py-12 bg-card rounded-lg border">
              <h3 className="text-lg font-semibold mb-2">Welcome to FreelanceConnect!</h3>
              <p className="text-muted-foreground mb-4">
                Start following freelancers and clients to see their posts here.
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

        {/* Sidebar */}
        <div className="space-y-6">
          <AIMatchCard user={user} />
          <TrendingSkills />
          
          {/* Quick Stats */}
          <div className="bg-card rounded-lg border p-6">
            <h3 className="font-semibold mb-4">Your Activity</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Profile Views</span>
                <span className="font-medium">24</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Project Matches</span>
                <span className="font-medium">8</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Messages</span>
                <span className="font-medium">12</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}