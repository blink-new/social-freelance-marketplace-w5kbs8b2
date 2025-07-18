import { useState, useEffect, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { blink } from '@/blink/client'
import { jobScrapingService, type ScrapedJob } from '@/services/jobScrapingService'
import { 
  ExternalLink, 
  MapPin, 
  Clock, 
  Building, 
  Briefcase,
  Search,
  RefreshCw,
  Globe,
  Calendar,
  DollarSign,
  Users,
  Loader2,
  AlertCircle
} from 'lucide-react'

type LiveJob = ScrapedJob

interface LocalJobSeeker {
  id: string
  name: string
  title: string
  location: string
  skills: string[]
  experience: string
  availability: 'immediate' | 'within_2_weeks' | 'within_month'
  hourlyRate?: number
  isRemote: boolean
  avatar?: string
}

export function LiveJobBoard() {
  const [liveJobs, setLiveJobs] = useState<LiveJob[]>([])
  const [localSeekers, setLocalSeekers] = useState<LocalJobSeeker[]>([])
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedLocation, setSelectedLocation] = useState('all')
  const [selectedSource, setSelectedSource] = useState('all')
  const [selectedJobType, setSelectedJobType] = useState('all')
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Real live job scraping
  const scrapeLiveJobs = useCallback(async () => {
    setLoading(true)
    setError(null)
    
    try {
      // Search for jobs using the scraping service
      const searchParams = {
        query: searchQuery || 'software engineer',
        location: selectedLocation !== 'all' ? selectedLocation : undefined,
        jobType: selectedJobType !== 'all' ? selectedJobType : undefined,
        remote: selectedLocation === 'remote',
        limit: 20
      }

      // Get jobs from all sources
      const scrapedJobs = await jobScrapingService.searchAllSources(searchParams)
      
      // Add some mock local jobs for demonstration
      const localJobs: LiveJob[] = [
        {
          id: 'local_1',
          title: 'Local Barista',
          company: 'Blue Bottle Coffee',
          location: 'San Francisco, CA',
          description: 'Join our team at our downtown location. Experience with espresso machines preferred.',
          salary: '$18 - $22/hour',
          jobType: 'part-time',
          experienceLevel: 'entry',
          skills: ['Customer Service', 'Coffee Preparation', 'Cash Handling'],
          postedDate: new Date(Date.now() - 14400000).toISOString(),
          source: 'local',
          externalUrl: '#',
          isRemote: false,
          applications: 12
        },
        {
          id: 'local_2',
          title: 'Freelance Web Designer',
          company: 'Local Agency',
          location: 'Oakland, CA',
          description: 'Looking for a talented web designer for ongoing projects. Must have portfolio of modern websites.',
          salary: '$50 - $75/hour',
          jobType: 'freelance',
          experienceLevel: 'mid',
          skills: ['Web Design', 'HTML', 'CSS', 'JavaScript', 'Figma'],
          postedDate: new Date(Date.now() - 7200000).toISOString(),
          source: 'local',
          externalUrl: '#',
          isRemote: true,
          applications: 8
        }
      ]

      const allJobs = [...scrapedJobs, ...localJobs]
      setLiveJobs(allJobs)

      // Mock local seekers data
      const mockLocalSeekers: LocalJobSeeker[] = [
        {
          id: 'seeker_1',
          name: 'Jennifer Walsh',
          title: 'Freelance Graphic Designer',
          location: 'San Francisco, CA',
          skills: ['Graphic Design', 'Adobe Creative Suite', 'Brand Identity'],
          experience: '3 years',
          availability: 'immediate',
          hourlyRate: 65,
          isRemote: true,
          avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
        },
        {
          id: 'seeker_2',
          name: 'Marcus Johnson',
          title: 'Web Developer',
          location: 'Oakland, CA',
          skills: ['JavaScript', 'React', 'Node.js', 'MongoDB'],
          experience: '5 years',
          availability: 'within_2_weeks',
          hourlyRate: 85,
          isRemote: false,
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
        },
        {
          id: 'seeker_3',
          name: 'Lisa Chen',
          title: 'Content Writer',
          location: 'Berkeley, CA',
          skills: ['Content Writing', 'SEO', 'Social Media', 'Copywriting'],
          experience: '4 years',
          availability: 'within_month',
          hourlyRate: 45,
          isRemote: true,
          avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
        }
      ]

      setLocalSeekers(mockLocalSeekers)
      setLastUpdated(new Date())
    } catch (err) {
      setError('Failed to fetch live jobs. Please try again.')
      console.error('Error scraping jobs:', err)
    } finally {
      setLoading(false)
    }
  }, [searchQuery, selectedLocation, selectedJobType])

  useEffect(() => {
    scrapeLiveJobs()
  }, [scrapeLiveJobs])

  const filteredJobs = liveJobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesLocation = selectedLocation === 'all' || 
                           job.location.toLowerCase().includes(selectedLocation.toLowerCase()) ||
                           (selectedLocation === 'remote' && job.isRemote)
    const matchesSource = selectedSource === 'all' || job.source === selectedSource
    const matchesJobType = selectedJobType === 'all' || job.jobType === selectedJobType
    
    return matchesSearch && matchesLocation && matchesSource && matchesJobType
  })

  const getSourceBadgeColor = (source: string) => {
    const colors = {
      'linkedin': 'bg-blue-100 text-blue-800',
      'indeed': 'bg-green-100 text-green-800',
      'glassdoor': 'bg-purple-100 text-purple-800',
      'remote.co': 'bg-orange-100 text-orange-800',
      'local': 'bg-gray-100 text-gray-800'
    }
    return colors[source as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  const getTimeAgo = (dateString: string) => {
    const now = new Date()
    const posted = new Date(dateString)
    const diffInHours = Math.floor((now.getTime() - posted.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return 'Just posted'
    if (diffInHours < 24) return `${diffInHours}h ago`
    const diffInDays = Math.floor(diffInHours / 24)
    return `${diffInDays}d ago`
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Live Job Board</h2>
          <p className="text-gray-600">Real-time jobs from LinkedIn, Indeed, Glassdoor, and local sources</p>
          {lastUpdated && (
            <p className="text-sm text-gray-500 mt-1">
              Last updated: {lastUpdated.toLocaleTimeString()}
            </p>
          )}
        </div>
        <Button 
          onClick={scrapeLiveJobs} 
          disabled={loading}
          className="bg-primary hover:bg-primary/90"
        >
          {loading ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <RefreshCw className="h-4 w-4 mr-2" />
          )}
          Refresh Jobs
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search jobs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger>
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                <SelectItem value="remote">Remote</SelectItem>
                <SelectItem value="san francisco">San Francisco</SelectItem>
                <SelectItem value="new york">New York</SelectItem>
                <SelectItem value="seattle">Seattle</SelectItem>
                <SelectItem value="austin">Austin</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedSource} onValueChange={setSelectedSource}>
              <SelectTrigger>
                <SelectValue placeholder="Source" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sources</SelectItem>
                <SelectItem value="linkedin">LinkedIn</SelectItem>
                <SelectItem value="indeed">Indeed</SelectItem>
                <SelectItem value="glassdoor">Glassdoor</SelectItem>
                <SelectItem value="remote.co">Remote.co</SelectItem>
                <SelectItem value="local">Local Jobs</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedJobType} onValueChange={setSelectedJobType}>
              <SelectTrigger>
                <SelectValue placeholder="Job Type" />
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
        </CardContent>
      </Card>

      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 text-red-800">
              <AlertCircle className="h-4 w-4" />
              <span>{error}</span>
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="jobs" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="jobs">Live Jobs ({filteredJobs.length})</TabsTrigger>
          <TabsTrigger value="seekers">Local Job Seekers ({localSeekers.length})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="jobs" className="space-y-4">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="ml-2 text-gray-600">Scraping latest jobs...</span>
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="text-center py-12">
              <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No jobs found</h3>
              <p className="text-gray-600">Try adjusting your filters or refresh to get new jobs.</p>
            </div>
          ) : (
            filteredJobs.map((job) => (
              <Card key={job.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
                        <Badge className={getSourceBadgeColor(job.source)}>
                          {job.source}
                        </Badge>
                        {job.isRemote && (
                          <Badge variant="outline" className="text-green-600 border-green-600">
                            <Globe className="h-3 w-3 mr-1" />
                            Remote
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                        <div className="flex items-center">
                          <Building className="h-4 w-4 mr-1" />
                          {job.company}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {job.location}
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {getTimeAgo(job.postedDate)}
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-4 line-clamp-2">{job.description}</p>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      {job.salary && (
                        <div className="flex items-center">
                          <DollarSign className="h-4 w-4 mr-1" />
                          {job.salary}
                        </div>
                      )}
                      <div className="flex items-center">
                        <Briefcase className="h-4 w-4 mr-1" />
                        {job.jobType}
                      </div>
                      {job.applications && (
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          {job.applications} applications
                        </div>
                      )}
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
                      {job.source === 'local' ? (
                        <Button size="sm" className="bg-primary hover:bg-primary/90">
                          Contact Employer
                        </Button>
                      ) : (
                        <Button 
                          size="sm" 
                          className="bg-primary hover:bg-primary/90"
                          onClick={() => window.open(job.externalUrl, '_blank')}
                        >
                          <ExternalLink className="h-3 w-3 mr-1" />
                          Apply on {job.source}
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="seekers" className="space-y-4">
          {localSeekers.map((seeker) => (
            <Card key={seeker.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                    {seeker.avatar ? (
                      <img 
                        src={seeker.avatar} 
                        alt={seeker.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                        <Users className="h-6 w-6 text-primary" />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">{seeker.name}</h3>
                      <div className="flex items-center space-x-2">
                        {seeker.isRemote && (
                          <Badge variant="outline" className="text-green-600 border-green-600">
                            <Globe className="h-3 w-3 mr-1" />
                            Remote OK
                          </Badge>
                        )}
                        <Badge 
                          className={
                            seeker.availability === 'immediate' 
                              ? 'bg-green-100 text-green-800'
                              : seeker.availability === 'within_2_weeks'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-orange-100 text-orange-800'
                          }
                        >
                          {seeker.availability.replace('_', ' ')}
                        </Badge>
                      </div>
                    </div>
                    
                    <p className="text-lg text-gray-700 mb-2">{seeker.title}</p>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {seeker.location}
                      </div>
                      <div className="flex items-center">
                        <Briefcase className="h-4 w-4 mr-1" />
                        {seeker.experience} experience
                      </div>
                      {seeker.hourlyRate && (
                        <div className="flex items-center">
                          <DollarSign className="h-4 w-4 mr-1" />
                          ${seeker.hourlyRate}/hour
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-2">
                        {seeker.skills.slice(0, 4).map((skill) => (
                          <Badge key={skill} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                        {seeker.skills.length > 4 && (
                          <Badge variant="outline" className="text-xs">
                            +{seeker.skills.length - 4} more
                          </Badge>
                        )}
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          View Profile
                        </Button>
                        <Button size="sm" className="bg-primary hover:bg-primary/90">
                          Contact
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}