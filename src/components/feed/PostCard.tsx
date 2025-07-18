import { useState } from 'react'
import { Heart, MessageCircle, Share, MoreHorizontal, Bookmark } from 'lucide-react'
import { Post, User } from '../../types'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import { Card, CardContent, CardHeader } from '../ui/card'
import { Badge } from '../ui/badge'
import { formatDistanceToNow } from 'date-fns'
import { getUserById } from '../../services/mockData'

interface PostCardProps {
  post: Post
  currentUser: User
}

export function PostCard({ post, currentUser }: PostCardProps) {
  const [liked, setLiked] = useState(false)
  const [saved, setSaved] = useState(false)
  const [showComments, setShowComments] = useState(false)

  // Get user data from mock service
  const postUser = getUserById(post.userId) || {
    id: post.userId,
    displayName: 'Unknown User',
    avatar: '',
    isFreelancer: false,
    skills: []
  }

  const handleLike = () => {
    setLiked(!liked)
    // In real app, update database
  }

  const handleSave = () => {
    setSaved(!saved)
    // In real app, update database
  }

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={postUser.avatar} />
              <AvatarFallback>{postUser.displayName[0]}</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center space-x-2">
                <h4 className="font-semibold text-sm">{postUser.displayName}</h4>
                {postUser.isFreelancer && (
                  <Badge variant="secondary" className="text-xs">Freelancer</Badge>
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
              </p>
            </div>
          </div>
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Post Content */}
        <div>
          <p className="text-sm leading-relaxed">{post.content}</p>
          
          {/* Skills Tags */}
          {postUser.skills && postUser.skills.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {postUser.skills.map((skill) => (
                <Badge key={skill} variant="outline" className="text-xs">
                  {skill}
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Post Images */}
        {post.images && post.images.length > 0 && (
          <div className="grid grid-cols-1 gap-2 rounded-lg overflow-hidden">
            {post.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Post image ${index + 1}`}
                className="w-full h-64 object-cover"
              />
            ))}
          </div>
        )}

        {/* Engagement Stats */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>{post.likes + (liked ? 1 : 0)} likes</span>
          <div className="flex space-x-4">
            <span>{post.comments} comments</span>
            <span>{post.shares} shares</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-2 border-t">
          <div className="flex space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLike}
              className={`flex items-center space-x-2 ${liked ? 'text-red-500' : ''}`}
            >
              <Heart className={`h-4 w-4 ${liked ? 'fill-current' : ''}`} />
              <span>Like</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowComments(!showComments)}
              className="flex items-center space-x-2"
            >
              <MessageCircle className="h-4 w-4" />
              <span>Comment</span>
            </Button>
            <Button variant="ghost" size="sm" className="flex items-center space-x-2">
              <Share className="h-4 w-4" />
              <span>Share</span>
            </Button>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSave}
            className={saved ? 'text-accent' : ''}
          >
            <Bookmark className={`h-4 w-4 ${saved ? 'fill-current' : ''}`} />
          </Button>
        </div>

        {/* Comments Section */}
        {showComments && (
          <div className="pt-4 border-t space-y-3">
            <div className="flex space-x-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={currentUser.avatar} />
                <AvatarFallback>{currentUser.displayName?.[0] || currentUser.email[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Add a comment..."
                  className="w-full px-3 py-2 text-sm bg-muted rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
            
            {/* Sample Comments */}
            <div className="space-y-3">
              <div className="flex space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="bg-muted rounded-lg px-3 py-2">
                    <p className="font-medium text-sm">John Doe</p>
                    <p className="text-sm">Great work! Would love to collaborate on a project.</p>
                  </div>
                  <div className="flex items-center space-x-4 mt-1 text-xs text-muted-foreground">
                    <span>2h</span>
                    <button className="hover:text-foreground">Like</button>
                    <button className="hover:text-foreground">Reply</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}