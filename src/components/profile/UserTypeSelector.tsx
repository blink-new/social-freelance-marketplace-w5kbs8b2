import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { UserType } from '@/types'
import { Briefcase, User, Users } from 'lucide-react'

interface UserTypeSelectorProps {
  userType: UserType
  onUserTypeChange: (type: UserType) => void
}

export function UserTypeSelector({ userType, onUserTypeChange }: UserTypeSelectorProps) {
  const userTypes = [
    {
      type: 'jobseeker' as UserType,
      icon: User,
      title: 'Job Seeker',
      description: 'Looking for opportunities and projects',
      features: ['Find jobs', 'Showcase skills', 'Build network', 'Get hired']
    },
    {
      type: 'employer' as UserType,
      icon: Briefcase,
      title: 'Employer',
      description: 'Hiring talent and posting opportunities',
      features: ['Post jobs', 'Find candidates', 'Manage hiring', 'Build team']
    },
    {
      type: 'both' as UserType,
      icon: Users,
      title: 'Both',
      description: 'Seeking opportunities and hiring talent',
      features: ['All features', 'Flexible networking', 'Dual perspective', 'Maximum reach']
    }
  ]

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">I am a...</h3>
        <p className="text-sm text-gray-600">Choose how you want to use MeetOut</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {userTypes.map((type) => {
          const Icon = type.icon
          const isSelected = userType === type.type
          
          return (
            <Card
              key={type.type}
              className={`cursor-pointer transition-all hover:shadow-md ${
                isSelected 
                  ? 'ring-2 ring-primary bg-primary/5' 
                  : 'hover:bg-gray-50'
              }`}
              onClick={() => onUserTypeChange(type.type)}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <Icon className={`h-6 w-6 ${isSelected ? 'text-primary' : 'text-gray-600'}`} />
                  {isSelected && (
                    <Badge className="bg-primary text-primary-foreground">
                      Selected
                    </Badge>
                  )}
                </div>
                
                <h4 className={`font-semibold mb-2 ${isSelected ? 'text-primary' : 'text-gray-900'}`}>
                  {type.title}
                </h4>
                
                <p className="text-sm text-gray-600 mb-4">
                  {type.description}
                </p>
                
                <ul className="space-y-1">
                  {type.features.map((feature, index) => (
                    <li key={index} className="text-xs text-gray-500 flex items-center">
                      <span className="w-1 h-1 bg-gray-400 rounded-full mr-2"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Additional Info */}
      <div className="bg-blue-50 p-4 rounded-lg">
        <div className="flex items-start space-x-3">
          <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-blue-600 text-xs font-bold">i</span>
          </div>
          <div className="text-sm text-blue-700">
            <p className="font-medium mb-1">You can change this anytime</p>
            <p>Your selection helps us personalize your MeetOut experience and show you the most relevant opportunities and connections.</p>
          </div>
        </div>
      </div>
    </div>
  )
}