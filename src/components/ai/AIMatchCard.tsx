import { useState } from 'react'
import { Sparkles, ArrowRight, X, Heart } from 'lucide-react'
import { User } from '../../types'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import { Card, CardContent, CardHeader } from '../ui/card'
import { Badge } from '../ui/badge'
import { Progress } from '../ui/progress'

interface AIMatchCardProps {
  user: User
}

export function AIMatchCard({ user }: AIMatchCardProps) {
  const [currentMatch, setCurrentMatch] = useState(0)
  
  // Mock AI matches - in real app, this would come from AI matching algorithm
  const matches = [
    {
      id: '1',
      type: 'freelancer',
      name: 'Alex Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      title: 'Full-Stack Developer',
      skills: ['React', 'Node.js', 'TypeScript'],
      rating: 4.9,
      hourlyRate: 85,
      matchScore: 95,
      reasons: ['Excellent React skills', 'Similar project experience', 'High client ratings']
    },
    {
      id: '2',
      type: 'project',
      title: 'E-commerce Website Redesign',
      client: 'TechCorp Inc.',
      avatar: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=150&h=150&fit=crop',
      budget: 5000,
      deadline: '2 weeks',
      skills: ['UI/UX Design', 'React', 'Figma'],
      matchScore: 88,
      reasons: ['Perfect skill match', 'Budget fits your rate', 'Timeline works well']
    },
    {
      id: '3',
      type: 'freelancer',
      name: 'Maria Santos',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      title: 'UI/UX Designer',
      skills: ['Figma', 'Prototyping', 'User Research'],
      rating: 4.8,
      hourlyRate: 75,
      matchScore: 92,
      reasons: ['Complementary skills', 'Available for collaboration', 'Great portfolio']
    }
  ]

  const currentMatchData = matches[currentMatch]

  const handleNext = () => {
    setCurrentMatch((prev) => (prev + 1) % matches.length)
  }

  const handlePass = () => {
    handleNext()
  }

  const handleLike = () => {
    // In real app, save the match and send notification
    console.log('Liked match:', currentMatchData.id)
    handleNext()
  }

  return (
    <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
      <CardHeader className="pb-3">
        <div className="flex items-center space-x-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <h3 className="font-semibold text-primary">AI Recommendations</h3>
        </div>
        <p className="text-sm text-muted-foreground">
          Personalized matches based on your profile and activity
        </p>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Match Score */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Match Score</span>
            <span className="text-sm font-bold text-primary">{currentMatchData.matchScore}%</span>
          </div>
          <Progress value={currentMatchData.matchScore} className="h-2" />
        </div>

        {/* Match Card */}
        <div className="bg-card rounded-lg border p-4 space-y-3">
          <div className="flex items-start space-x-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={currentMatchData.avatar} />
              <AvatarFallback>{currentMatchData.name?.[0] || currentMatchData.title[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-sm truncate">
                {currentMatchData.type === 'freelancer' ? currentMatchData.name : currentMatchData.title}
              </h4>
              <p className="text-xs text-muted-foreground">
                {currentMatchData.type === 'freelancer' 
                  ? currentMatchData.title 
                  : `by ${currentMatchData.client}`
                }
              </p>
              {currentMatchData.type === 'freelancer' && (
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-xs text-muted-foreground">⭐ {currentMatchData.rating}</span>
                  <span className="text-xs text-muted-foreground">•</span>
                  <span className="text-xs font-medium text-accent">${currentMatchData.hourlyRate}/hr</span>
                </div>
              )}
              {currentMatchData.type === 'project' && (
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-xs font-medium text-accent">${currentMatchData.budget}</span>
                  <span className="text-xs text-muted-foreground">•</span>
                  <span className="text-xs text-muted-foreground">{currentMatchData.deadline}</span>
                </div>
              )}
            </div>
          </div>

          {/* Skills */}
          <div className="flex flex-wrap gap-1">
            {currentMatchData.skills.map((skill) => (
              <Badge key={skill} variant="secondary" className="text-xs">
                {skill}
              </Badge>
            ))}
          </div>

          {/* Match Reasons */}
          <div className="space-y-1">
            <p className="text-xs font-medium text-muted-foreground">Why this match:</p>
            <ul className="space-y-1">
              {currentMatchData.reasons.map((reason, index) => (
                <li key={index} className="text-xs text-muted-foreground flex items-center">
                  <span className="w-1 h-1 bg-primary rounded-full mr-2" />
                  {reason}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Actions */}
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePass}
            className="flex-1 flex items-center justify-center space-x-2"
          >
            <X className="h-4 w-4" />
            <span>Pass</span>
          </Button>
          <Button
            size="sm"
            onClick={handleLike}
            className="flex-1 flex items-center justify-center space-x-2 bg-accent hover:bg-accent/90"
          >
            <Heart className="h-4 w-4" />
            <span>Connect</span>
          </Button>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{currentMatch + 1} of {matches.length}</span>
          <Button variant="ghost" size="sm" onClick={handleNext}>
            <span className="mr-1">Next</span>
            <ArrowRight className="h-3 w-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}