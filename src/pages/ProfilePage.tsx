import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { MapPin, Star, Calendar, Edit, MessageCircle, Heart, Share } from 'lucide-react'
import { User } from '../types'
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'

interface ProfilePageProps {
  user: User
}

export function ProfilePage({ user }: ProfilePageProps) {
  const { userId } = useParams()
  const isOwnProfile = !userId || userId === user.id
  
  // Mock profile data - in real app, fetch based on userId
  const profileUser = isOwnProfile ? user : {
    id: '1',
    email: 'sarah.chen@example.com',
    displayName: 'Sarah Chen',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    bio: 'Passionate UI/UX designer with 5+ years of experience creating beautiful and functional digital experiences. I love turning complex problems into simple, elegant solutions.',
    skills: ['UI/UX Design', 'Figma', 'Prototyping', 'User Research', 'Design Systems'],
    location: 'San Francisco, CA',
    hourlyRate: 85,
    rating: 4.9,
    completedProjects: 47,
    isFreelancer: true,
    isClient: false,
    createdAt: '2020-01-15T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z'
  }

  const [following, setFollowing] = useState(false)

  // Mock portfolio projects
  const portfolioProjects = [
    {
      id: '1',
      title: 'E-commerce Mobile App',
      description: 'Complete redesign of a fashion e-commerce app with improved UX',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop',
      skills: ['UI/UX Design', 'Figma', 'Prototyping'],
      likes: 24,
      views: 156
    },
    {
      id: '2',
      title: 'SaaS Dashboard Design',
      description: 'Modern dashboard design for a project management tool',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
      skills: ['UI Design', 'Data Visualization'],
      likes: 18,
      views: 89
    },
    {
      id: '3',
      title: 'Banking App Redesign',
      description: 'User-friendly redesign focusing on accessibility and security',
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=300&fit=crop',
      skills: ['UX Research', 'Accessibility', 'Mobile Design'],
      likes: 31,
      views: 203
    }
  ]

  // Mock reviews
  const reviews = [
    {
      id: '1',
      clientName: 'John Smith',
      clientAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      rating: 5,
      comment: 'Sarah delivered exceptional work on our mobile app redesign. Her attention to detail and user-centered approach resulted in a 40% increase in user engagement.',
      projectTitle: 'Mobile App Redesign',
      date: '2024-01-10'
    },
    {
      id: '2',
      clientName: 'Emily Johnson',
      clientAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      rating: 5,
      comment: 'Professional, creative, and delivered ahead of schedule. Would definitely work with Sarah again!',
      projectTitle: 'Website Redesign',
      date: '2023-12-15'
    }
  ]

  const handleFollow = () => {
    setFollowing(!following)
    // In real app, update database
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {/* Profile Header */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src={profileUser.avatar} />
              <AvatarFallback className="text-2xl">{profileUser.displayName?.[0] || profileUser.email[0]}</AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h1 className="text-2xl font-bold">{profileUser.displayName || 'User'}</h1>
                  <p className="text-muted-foreground">UI/UX Designer</p>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4" />
                      <span>{profileUser.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>Joined January 2020</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  {isOwnProfile ? (
                    <Button variant="outline" className="flex items-center space-x-2">
                      <Edit className="h-4 w-4" />
                      <span>Edit Profile</span>
                    </Button>
                  ) : (
                    <>
                      <Button
                        variant="outline"
                        onClick={handleFollow}
                        className={following ? 'bg-primary text-primary-foreground' : ''}
                      >
                        {following ? 'Following' : 'Follow'}
                      </Button>
                      <Button className="flex items-center space-x-2">
                        <MessageCircle className="h-4 w-4" />
                        <span>Message</span>
                      </Button>
                    </>
                  )}
                </div>
              </div>

              <p className="text-sm mb-4">{profileUser.bio}</p>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="flex items-center justify-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="font-bold">{profileUser.rating}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Rating</p>
                </div>
                <div>
                  <p className="font-bold">{profileUser.completedProjects}</p>
                  <p className="text-xs text-muted-foreground">Projects</p>
                </div>
                <div>
                  <p className="font-bold">${profileUser.hourlyRate}/hr</p>
                  <p className="text-xs text-muted-foreground">Hourly Rate</p>
                </div>
                <div>
                  <p className="font-bold">1.2k</p>
                  <p className="text-xs text-muted-foreground">Followers</p>
                </div>
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="mt-6">
            <h3 className="font-semibold mb-3">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {profileUser.skills?.map((skill) => (
                <Badge key={skill} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Content Tabs */}
      <Tabs defaultValue="portfolio" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="portfolio" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolioProjects.map((project) => (
              <Card key={project.id} className="group hover:shadow-lg transition-shadow">
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2">{project.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-1 mb-3">
                    {project.skills.map((skill) => (
                      <Badge key={skill} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-1">
                        <Heart className="h-4 w-4" />
                        <span>{project.likes}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span>{project.views} views</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Share className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="reviews" className="space-y-4">
          {reviews.map((review) => (
            <Card key={review.id}>
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={review.clientAvatar} />
                    <AvatarFallback>{review.clientName[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h4 className="font-semibold">{review.clientName}</h4>
                        <p className="text-sm text-muted-foreground">{review.projectTitle}</p>
                      </div>
                      <div className="flex items-center space-x-1">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm mb-2">{review.comment}</p>
                    <p className="text-xs text-muted-foreground">{review.date}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardContent className="p-6 text-center">
              <h3 className="font-semibold mb-2">Recent Activity</h3>
              <p className="text-muted-foreground">Activity feed will be displayed here</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}