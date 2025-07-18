import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Calendar, DollarSign, MapPin, Clock, Users, Star, Send } from 'lucide-react'
import { User } from '../types'
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Textarea } from '../components/ui/textarea'
import { Progress } from '../components/ui/progress'

interface ProjectDetailsPageProps {
  user: User
}

export function ProjectDetailsPage({ user }: ProjectDetailsPageProps) {
  const { projectId } = useParams()
  const [proposalText, setProposalText] = useState('')
  const [proposedRate, setProposedRate] = useState('')

  // Mock project data
  const project = {
    id: projectId,
    title: 'E-commerce Website Redesign',
    description: `We're looking for a talented UI/UX designer to completely redesign our e-commerce platform. The current site has usability issues and doesn't convert well. We need someone who can:

• Conduct user research and create user personas
• Design a modern, mobile-first interface
• Improve the checkout flow and reduce cart abandonment
• Create a design system for consistency
• Work closely with our development team

The project includes designing for web and mobile platforms. We have existing brand guidelines but are open to evolution. The ideal candidate has experience with e-commerce platforms and conversion optimization.`,
    client: {
      id: 'client1',
      name: 'TechCorp Inc.',
      avatar: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=150&h=150&fit=crop',
      rating: 4.8,
      projectsPosted: 23,
      location: 'San Francisco, CA'
    },
    budget: 5000,
    deadline: '2 weeks',
    skills: ['UI/UX Design', 'Figma', 'User Research', 'Prototyping', 'E-commerce'],
    postedTime: '2 hours ago',
    proposals: 12,
    status: 'open',
    attachments: [
      { name: 'Brand Guidelines.pdf', size: '2.4 MB' },
      { name: 'Current Site Screenshots.zip', size: '15.8 MB' }
    ]
  }

  // Mock proposals
  const proposals = [
    {
      id: '1',
      freelancer: {
        name: 'Sarah Chen',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
        rating: 4.9,
        completedProjects: 47
      },
      rate: 85,
      timeline: '10 days',
      proposal: 'I have extensive experience in e-commerce UX design and have helped increase conversion rates by 40% for similar projects...',
      submittedTime: '1 hour ago'
    },
    {
      id: '2',
      freelancer: {
        name: 'Alex Rodriguez',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        rating: 4.8,
        completedProjects: 32
      },
      rate: 75,
      timeline: '14 days',
      proposal: 'Your project aligns perfectly with my expertise. I specialize in conversion optimization and have worked with major e-commerce brands...',
      submittedTime: '3 hours ago'
    }
  ]

  const handleSubmitProposal = () => {
    if (!proposalText.trim() || !proposedRate) return
    
    // In real app, submit proposal to database
    console.log('Submitting proposal:', { proposalText, proposedRate })
    setProposalText('')
    setProposedRate('')
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Project Header */}
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h1 className="text-2xl font-bold mb-2">{project.title}</h1>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span>Posted {project.postedTime}</span>
                    <span>•</span>
                    <span>{project.proposals} proposals</span>
                    <span>•</span>
                    <Badge variant="secondary">{project.status}</Badge>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-accent">${project.budget}</p>
                  <p className="text-sm text-muted-foreground">Fixed price</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>{project.deadline}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>Full-time</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>1 freelancer</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>Remote</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {project.skills.map((skill) => (
                  <Badge key={skill} variant="outline">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Project Description */}
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold">Project Description</h2>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm max-w-none">
                <p className="whitespace-pre-line">{project.description}</p>
              </div>

              {project.attachments.length > 0 && (
                <div className="mt-6">
                  <h3 className="font-medium mb-3">Attachments</h3>
                  <div className="space-y-2">
                    {project.attachments.map((attachment, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <span className="text-sm font-medium">{attachment.name}</span>
                        <span className="text-xs text-muted-foreground">{attachment.size}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Submit Proposal */}
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold">Submit a Proposal</h2>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Your Proposal</label>
                <Textarea
                  placeholder="Describe your approach to this project, relevant experience, and why you're the best fit..."
                  value={proposalText}
                  onChange={(e) => setProposalText(e.target.value)}
                  className="min-h-[120px]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Your Rate ($/hour)</label>
                  <input
                    type="number"
                    placeholder="85"
                    value={proposedRate}
                    onChange={(e) => setProposedRate(e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Estimated Timeline</label>
                  <select className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
                    <option>1 week</option>
                    <option>2 weeks</option>
                    <option>3 weeks</option>
                    <option>1 month</option>
                  </select>
                </div>
              </div>

              <Button 
                onClick={handleSubmitProposal}
                disabled={!proposalText.trim() || !proposedRate}
                className="w-full"
              >
                <Send className="h-4 w-4 mr-2" />
                Submit Proposal
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Client Info */}
          <Card>
            <CardHeader>
              <h3 className="font-semibold">About the Client</h3>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={project.client.avatar} />
                  <AvatarFallback>{project.client.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-medium">{project.client.name}</h4>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm">{project.client.rating}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Location</span>
                  <span>{project.client.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Projects Posted</span>
                  <span>{project.client.projectsPosted}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Member Since</span>
                  <span>2020</span>
                </div>
              </div>

              <Button variant="outline" className="w-full">
                View Client Profile
              </Button>
            </CardContent>
          </Card>

          {/* Project Stats */}
          <Card>
            <CardHeader>
              <h3 className="font-semibold">Project Activity</h3>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Proposals</span>
                  <span className="font-medium">{project.proposals}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Interviewing</span>
                  <span className="font-medium">3</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Invites Sent</span>
                  <span className="font-medium">2</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Proposal Success Rate</span>
                  <span>25%</span>
                </div>
                <Progress value={25} className="h-2" />
              </div>
            </CardContent>
          </Card>

          {/* Recent Proposals */}
          <Card>
            <CardHeader>
              <h3 className="font-semibold">Recent Proposals</h3>
            </CardHeader>
            <CardContent className="space-y-4">
              {proposals.slice(0, 2).map((proposal) => (
                <div key={proposal.id} className="p-3 border rounded-lg space-y-2">
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={proposal.freelancer.avatar} />
                      <AvatarFallback>{proposal.freelancer.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{proposal.freelancer.name}</p>
                      <div className="flex items-center space-x-1">
                        <Star className="h-3 w-3 text-yellow-500 fill-current" />
                        <span className="text-xs">{proposal.freelancer.rating}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {proposal.proposal}
                  </p>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>${proposal.rate}/hr</span>
                    <span>{proposal.timeline}</span>
                  </div>
                </div>
              ))}
              <Button variant="outline" size="sm" className="w-full">
                View All Proposals
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}