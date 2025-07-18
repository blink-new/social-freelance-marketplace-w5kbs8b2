import { TrendingUp, ArrowUpRight } from 'lucide-react'
import { Card, CardContent, CardHeader } from '../ui/card'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'

export function TrendingSkills() {
  const trendingSkills = [
    { name: 'React', growth: '+15%', demand: 'High', color: 'bg-blue-500' },
    { name: 'AI/ML', growth: '+28%', demand: 'Very High', color: 'bg-purple-500' },
    { name: 'TypeScript', growth: '+12%', demand: 'High', color: 'bg-blue-600' },
    { name: 'Figma', growth: '+18%', demand: 'High', color: 'bg-pink-500' },
    { name: 'Node.js', growth: '+10%', demand: 'Medium', color: 'bg-green-500' },
    { name: 'Python', growth: '+22%', demand: 'Very High', color: 'bg-yellow-500' },
  ]

  const getDemandColor = (demand: string) => {
    switch (demand) {
      case 'Very High': return 'text-red-500'
      case 'High': return 'text-orange-500'
      case 'Medium': return 'text-yellow-500'
      default: return 'text-muted-foreground'
    }
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center space-x-2">
          <TrendingUp className="h-5 w-5 text-accent" />
          <h3 className="font-semibold">Trending Skills</h3>
        </div>
        <p className="text-sm text-muted-foreground">
          Most in-demand skills this week
        </p>
      </CardHeader>

      <CardContent className="space-y-3">
        {trendingSkills.map((skill, index) => (
          <div key={skill.name} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-muted-foreground">#{index + 1}</span>
                <div className={`w-2 h-2 rounded-full ${skill.color}`} />
              </div>
              <div>
                <p className="font-medium text-sm">{skill.name}</p>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-green-600 font-medium">{skill.growth}</span>
                  <span className="text-xs text-muted-foreground">•</span>
                  <span className={`text-xs font-medium ${getDemandColor(skill.demand)}`}>
                    {skill.demand}
                  </span>
                </div>
              </div>
            </div>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
          </div>
        ))}

        <Button variant="outline" className="w-full mt-4" size="sm">
          View All Skills
        </Button>
      </CardContent>
    </Card>
  )
}