import { useState } from 'react'
import { Search, Filter, MapPin, Star, Clock } from 'lucide-react'
import { User } from '../types'
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader } from '../components/ui/card'
import { Input } from '../components/ui/input'
import { Badge } from '../components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'

interface DiscoverPageProps {
  user: User
}

export function DiscoverPage({ user }: DiscoverPageProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState('freelancers')

  // Mock data
  const freelancers = [
    {
      id: '1',
      name: 'Sarah Chen',
      title: 'UI/UX Designer',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      location: 'San Francisco, CA',
      rating: 4.9,
      hourlyRate: 85,
      skills: ['Figma', 'Prototyping', 'User Research'],
      completedProjects: 47,
      responseTime: '2 hours'
    },
    {
      id: '2',
      name: 'Alex Rodriguez',
      title: 'Full-Stack Developer',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      location: 'New York, NY',
      rating: 4.8,
      hourlyRate: 95,
      skills: ['React', 'Node.js', 'TypeScript'],
      completedProjects: 32,
      responseTime: '1 hour'
    },
    {
      id: '3',
      name: 'Maria Santos',
      title: 'Content Writer',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      location: 'Austin, TX',
      rating: 4.7,
      hourlyRate: 45,
      skills: ['Copywriting', 'SEO', 'Content Strategy'],
      completedProjects: 89,
      responseTime: '30 minutes'
    }
  ]

  const projects = [
    {
      id: '1',
      title: 'E-commerce Website Redesign',
      client: 'TechCorp Inc.',
      budget: 5000,
      deadline: '2 weeks',
      skills: ['UI/UX Design', 'React', 'Figma'],
      description: 'Looking for a talented designer to redesign our e-commerce platform...',
      postedTime: '2 hours ago',
      proposals: 12
    },
    {
      id: '2',
      title: 'Mobile App Development',
      client: 'StartupXYZ',
      budget: 8000,
      deadline: '1 month',
      skills: ['React Native', 'TypeScript', 'API Integration'],
      description: 'Need an experienced developer to build a cross-platform mobile app...',
      postedTime: '5 hours ago',
      proposals: 8
    },
    {
      id: '3',
      title: 'Content Marketing Campaign',
      client: 'GrowthCo',
      budget: 2500,
      deadline: '3 weeks',
      skills: ['Content Writing', 'SEO', 'Social Media'],
      description: 'Seeking a content strategist to create a comprehensive marketing campaign...',
      postedTime: '1 day ago',
      proposals: 15
    }
  ]

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Discover</h1>
        <p className="text-muted-foreground">Find talented freelancers and exciting projects</p>
      </div>

      {/* Search Bar */}
      <div className="flex space-x-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search freelancers, skills, or projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" className="flex items-center space-x-2">
          <Filter className="h-4 w-4" />
          <span>Filters</span>
        </Button>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="freelancers">Freelancers</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
        </TabsList>

        <TabsContent value="freelancers" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {freelancers.map((freelancer) => (
              <Card key={freelancer.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start space-x-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={freelancer.avatar} />
                      <AvatarFallback>{freelancer.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold truncate">{freelancer.name}</h3>
                      <p className="text-sm text-muted-foreground">{freelancer.title}</p>
                      <div className="flex items-center space-x-1 mt-1">
                        <MapPin className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{freelancer.location}</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="font-medium">{freelancer.rating}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-accent">${freelancer.hourlyRate}/hr</span>
                    </div>
                    <div className="text-muted-foreground">
                      {freelancer.completedProjects} projects
                    </div>
                    <div className="text-right flex items-center justify-end space-x-1">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{freelancer.responseTime}</span>
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-1">
                    {freelancer.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      View Profile
                    </Button>
                    <Button size="sm" className="flex-1">
                      Contact
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="projects" className="space-y-4">
          <div className="space-y-4">
            {projects.map((project) => (
              <Card key={project.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{project.title}</h3>
                      <p className="text-sm text-muted-foreground">by {project.client}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-accent text-lg">${project.budget}</p>
                      <p className="text-xs text-muted-foreground">{project.deadline}</p>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {project.description}
                  </p>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2">
                    {project.skills.map((skill) => (
                      <Badge key={skill} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>

                  {/* Meta */}
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>Posted {project.postedTime}</span>
                    <span>{project.proposals} proposals</span>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      View Details
                    </Button>
                    <Button size="sm" className="flex-1">
                      Submit Proposal
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}