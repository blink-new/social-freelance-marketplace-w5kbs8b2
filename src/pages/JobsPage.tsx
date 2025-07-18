import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { CountryTargeting } from '@/components/jobs/CountryTargeting'
import { UserTypeSelector } from '@/components/profile/UserTypeSelector'
import { mockJobs } from '@/services/mockData'
import { Job, UserType, SKILL_CATEGORIES } from '@/types'
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  Users, 
  DollarSign, 
  Search, 
  Filter,
  Plus,
  Building,
  Calendar
} from 'lucide-react'

export function JobsPage() {
  const [jobs] = useState<Job[]>(mockJobs)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCountries, setSelectedCountries] = useState<string[]>([])
  const [userType, setUserType] = useState<UserType>('jobseeker')
  const [selectedJobType, setSelectedJobType] = useState<string>('all')
  const [selectedExperience, setSelectedExperience] = useState<string>('all')
  const [selectedSkillCategory, setSelectedSkillCategory] = useState<string>('all')

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesJobType = selectedJobType === 'all' || job.jobType === selectedJobType
    const matchesExperience = selectedExperience === 'all' || job.experienceLevel === selectedExperience
    const matchesCountry = selectedCountries.length === 0 || 
                          selectedCountries.includes(job.country) ||
                          (job.targetDemographics?.countries?.some(c => selectedCountries.includes(c)))
    
    return matchesSearch && matchesJobType && matchesExperience && matchesCountry
  })

  const getJobTypeColor = (type: string) => {
    const colors = {
      'full-time': 'bg-green-100 text-green-800',
      'part-time': 'bg-blue-100 text-blue-800',
      'contract': 'bg-orange-100 text-orange-800',
      'freelance': 'bg-purple-100 text-purple-800'
    }
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  const getExperienceColor = (level: string) => {
    const colors = {
      'entry': 'bg-green-100 text-green-800',
      'mid': 'bg-blue-100 text-blue-800',
      'senior': 'bg-orange-100 text-orange-800',
      'executive': 'bg-red-100 text-red-800'
    }
    return colors[level as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Jobs</h1>
          <p className="text-gray-600">Discover opportunities that match your skills and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="space-y-6">
            {/* User Type Selection */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">I am looking to...</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button
                    variant={userType === 'jobseeker' ? 'default' : 'outline'}
                    className="w-full justify-start"
                    onClick={() => setUserType('jobseeker')}
                  >
                    <Users className="h-4 w-4 mr-2" />
                    Find Jobs
                  </Button>
                  <Button
                    variant={userType === 'employer' ? 'default' : 'outline'}
                    className="w-full justify-start"
                    onClick={() => setUserType('employer')}
                  >
                    <Building className="h-4 w-4 mr-2" />
                    Hire Talent
                  </Button>
                  <Button
                    variant={userType === 'both' ? 'default' : 'outline'}
                    className="w-full justify-start"
                    onClick={() => setUserType('both')}
                  >
                    <Briefcase className="h-4 w-4 mr-2" />
                    Both
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Search */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center">
                  <Search className="h-5 w-5 mr-2" />
                  Search
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Input
                  placeholder="Search jobs, skills, companies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </CardContent>
            </Card>

            {/* Filters */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center">
                  <Filter className="h-5 w-5 mr-2" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Job Type</label>
                  <Select value={selectedJobType} onValueChange={setSelectedJobType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="full-time">Full-time</SelectItem>
                      <SelectItem value="part-time">Part-time</SelectItem>
                      <SelectItem value="contract">Contract</SelectItem>
                      <SelectItem value="freelance">Freelance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Experience Level</label>
                  <Select value={selectedExperience} onValueChange={setSelectedExperience}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Levels</SelectItem>
                      <SelectItem value="entry">Entry Level</SelectItem>
                      <SelectItem value="mid">Mid Level</SelectItem>
                      <SelectItem value="senior">Senior Level</SelectItem>
                      <SelectItem value="executive">Executive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Skill Category</label>
                  <Select value={selectedSkillCategory} onValueChange={setSelectedSkillCategory}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {Object.keys(SKILL_CATEGORIES).map((category) => (
                        <SelectItem key={category} value={category}>
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Country Targeting */}
            <CountryTargeting
              selectedCountries={selectedCountries}
              onCountriesChange={setSelectedCountries}
            />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Action Bar */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">
                  Showing {filteredJobs.length} of {jobs.length} jobs
                </p>
              </div>
              {userType === 'employer' && (
                <Button className="bg-primary hover:bg-primary/90">
                  <Plus className="h-4 w-4 mr-2" />
                  Post Job
                </Button>
              )}
            </div>

            {/* Jobs List */}
            <div className="space-y-4">
              {filteredJobs.map((job) => (
                <Card key={job.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{job.title}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                          <div className="flex items-center">
                            <Building className="h-4 w-4 mr-1" />
                            Company Name
                          </div>
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            {job.location}
                          </div>
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {new Date(job.postedDate).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end space-y-2">
                        <Badge className={getJobTypeColor(job.jobType)}>
                          {job.jobType}
                        </Badge>
                        <Badge className={getExperienceColor(job.experienceLevel)}>
                          {job.experienceLevel}
                        </Badge>
                      </div>
                    </div>

                    <p className="text-gray-700 mb-4 line-clamp-3">{job.description}</p>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        {job.budget && (
                          <div className="flex items-center">
                            <DollarSign className="h-4 w-4 mr-1" />
                            ${job.budget.toLocaleString()}
                          </div>
                        )}
                        {job.salary && (
                          <div className="flex items-center">
                            <DollarSign className="h-4 w-4 mr-1" />
                            {job.salary}
                          </div>
                        )}
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          {job.applications} applications
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {job.status}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-2">
                        {job.skills.slice(0, 4).map((skill) => (
                          <Badge key={skill} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                        {job.skills.length > 4 && (
                          <Badge variant="outline" className="text-xs">
                            +{job.skills.length - 4} more
                          </Badge>
                        )}
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          Save
                        </Button>
                        <Button size="sm" className="bg-primary hover:bg-primary/90">
                          {userType === 'employer' ? 'View Applications' : 'Apply Now'}
                        </Button>
                      </div>
                    </div>

                    {/* Target Demographics */}
                    {job.targetDemographics && (
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <p className="text-xs text-gray-500 mb-2">Targeting:</p>
                        <div className="flex flex-wrap gap-1">
                          {job.targetDemographics.countries?.slice(0, 3).map((country) => (
                            <Badge key={country} variant="outline" className="text-xs">
                              {country}
                            </Badge>
                          ))}
                          {job.targetDemographics.countries && job.targetDemographics.countries.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{job.targetDemographics.countries.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredJobs.length === 0 && (
              <div className="text-center py-12">
                <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No jobs found</h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your filters or search terms to find more opportunities.
                </p>
                <Button variant="outline" onClick={() => {
                  setSearchQuery('')
                  setSelectedCountries([])
                  setSelectedJobType('all')
                  setSelectedExperience('all')
                  setSelectedSkillCategory('all')
                }}>
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}