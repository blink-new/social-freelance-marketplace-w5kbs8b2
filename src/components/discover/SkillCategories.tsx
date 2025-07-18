import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { SKILL_CATEGORIES } from '@/types'
import { Palette, Code, Briefcase, MoreHorizontal } from 'lucide-react'

const categoryIcons = {
  creative: Palette,
  technical: Code,
  business: Briefcase,
  other: MoreHorizontal
}

const categoryColors = {
  creative: 'bg-pink-100 text-pink-800 hover:bg-pink-200',
  technical: 'bg-blue-100 text-blue-800 hover:bg-blue-200',
  business: 'bg-green-100 text-green-800 hover:bg-green-200',
  other: 'bg-gray-100 text-gray-800 hover:bg-gray-200'
}

export function SkillCategories() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Explore Skills</h2>
        <p className="text-gray-600">Discover opportunities across diverse skill categories</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(SKILL_CATEGORIES).map(([category, skills]) => {
          const Icon = categoryIcons[category as keyof typeof categoryIcons]
          const colorClass = categoryColors[category as keyof typeof categoryColors]
          
          return (
            <Card key={category} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center space-x-2 text-lg capitalize">
                  <Icon className="h-5 w-5 text-primary" />
                  <span>{category}</span>
                  <Badge variant="secondary" className="ml-auto">
                    {skills.length} skills
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {skills.slice(0, 8).map((skill) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className={`cursor-pointer transition-colors ${colorClass}`}
                    >
                      {skill}
                    </Badge>
                  ))}
                  {skills.length > 8 && (
                    <Badge variant="outline" className="cursor-pointer">
                      +{skills.length - 8} more
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}