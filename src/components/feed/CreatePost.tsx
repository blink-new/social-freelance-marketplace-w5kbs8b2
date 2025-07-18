import { useState } from 'react'
import { ImagePlus, X, Send } from 'lucide-react'
import { User, Post } from '../../types'
import { blink } from '../../blink/client'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import { Card, CardContent, CardHeader } from '../ui/card'
import { Textarea } from '../ui/textarea'
import { Badge } from '../ui/badge'

interface CreatePostProps {
  user: User
  onPostCreated: (post: Post) => void
}

export function CreatePost({ user, onPostCreated }: CreatePostProps) {
  const [content, setContent] = useState('')
  const [images, setImages] = useState<string[]>([])
  const [isPosting, setIsPosting] = useState(false)
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])

  const availableSkills = [
    'React', 'TypeScript', 'Node.js', 'Python', 'UI/UX Design', 
    'Figma', 'Photoshop', 'Marketing', 'Content Writing', 'SEO'
  ]

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files) return

    try {
      const uploadPromises = Array.from(files).map(async (file) => {
        const { publicUrl } = await blink.storage.upload(
          file,
          `posts/${Date.now()}-${file.name}`,
          { upsert: true }
        )
        return publicUrl
      })

      const uploadedUrls = await Promise.all(uploadPromises)
      setImages(prev => [...prev, ...uploadedUrls])
    } catch (error) {
      console.error('Failed to upload images:', error)
    }
  }

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index))
  }

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev => 
      prev.includes(skill) 
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    )
  }

  const handleSubmit = async () => {
    if (!content.trim()) return

    try {
      setIsPosting(true)
      
      const newPost: Omit<Post, 'id' | 'createdAt' | 'updatedAt'> = {
        userId: user.id,
        content: content.trim(),
        images: images.length > 0 ? images : undefined,
        likes: 0,
        comments: 0,
        shares: 0
      }

      const createdPost = await blink.db.posts.create({
        ...newPost,
        id: `post_${Date.now()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      })

      onPostCreated(createdPost)
      
      // Reset form
      setContent('')
      setImages([])
      setSelectedSkills([])
    } catch (error) {
      console.error('Failed to create post:', error)
    } finally {
      setIsPosting(false)
    }
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center space-x-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={user.avatar} />
            <AvatarFallback>{user.displayName?.[0] || user.email[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h4 className="font-medium">Share your work</h4>
            <p className="text-sm text-muted-foreground">
              Show off your latest projects or find collaborators
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <Textarea
          placeholder="What are you working on? Share your latest project, achievement, or looking for collaboration..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="min-h-[100px] resize-none border-0 bg-muted focus:bg-background"
        />

        {/* Skills Selection */}
        <div>
          <p className="text-sm font-medium mb-2">Tag relevant skills:</p>
          <div className="flex flex-wrap gap-2">
            {availableSkills.map((skill) => (
              <Badge
                key={skill}
                variant={selectedSkills.includes(skill) ? "default" : "outline"}
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                onClick={() => toggleSkill(skill)}
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        {/* Image Preview */}
        {images.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {images.map((image, index) => (
              <div key={index} className="relative group">
                <img
                  src={image}
                  alt={`Upload ${index + 1}`}
                  className="w-full h-24 object-cover rounded-lg"
                />
                <button
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between pt-2 border-t">
          <div className="flex items-center space-x-2">
            <label htmlFor="image-upload" className="cursor-pointer">
              <Button variant="ghost" size="sm" asChild>
                <span className="flex items-center space-x-2">
                  <ImagePlus className="h-4 w-4" />
                  <span>Add Images</span>
                </span>
              </Button>
            </label>
            <input
              id="image-upload"
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>

          <Button
            onClick={handleSubmit}
            disabled={!content.trim() || isPosting}
            className="bg-primary hover:bg-primary/90"
          >
            {isPosting ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                <span>Posting...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Send className="h-4 w-4" />
                <span>Post</span>
              </div>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}