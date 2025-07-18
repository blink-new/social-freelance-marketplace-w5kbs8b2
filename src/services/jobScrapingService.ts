import { blink } from '@/blink/client'

export interface ScrapedJob {
  id: string
  title: string
  company: string
  location: string
  description: string
  salary?: string
  jobType: string
  experienceLevel: string
  skills: string[]
  postedDate: string
  source: 'linkedin' | 'indeed' | 'glassdoor' | 'remote.co' | 'local'
  externalUrl: string
  isRemote: boolean
  applications?: number
}

export interface JobSearchParams {
  query?: string
  location?: string
  jobType?: string
  experienceLevel?: string
  remote?: boolean
  limit?: number
}

class JobScrapingService {
  private cache = new Map<string, { data: ScrapedJob[], timestamp: number }>()
  private readonly CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

  async searchLinkedInJobs(params: JobSearchParams): Promise<ScrapedJob[]> {
    const cacheKey = `linkedin_${JSON.stringify(params)}`
    const cached = this.cache.get(cacheKey)
    
    if (cached && Date.now() - cached.timestamp < this.CACHE_DURATION) {
      return cached.data
    }

    try {
      // Use Blink's web search to find LinkedIn job postings
      const searchQuery = this.buildLinkedInSearchQuery(params)
      const searchResults = await blink.data.search(searchQuery, {
        type: 'web',
        limit: params.limit || 20
      })

      const jobs = this.parseLinkedInResults(searchResults.organic_results || [])
      
      this.cache.set(cacheKey, { data: jobs, timestamp: Date.now() })
      return jobs
    } catch (error) {
      console.error('Error searching LinkedIn jobs:', error)
      return []
    }
  }

  async searchIndeedJobs(params: JobSearchParams): Promise<ScrapedJob[]> {
    const cacheKey = `indeed_${JSON.stringify(params)}`
    const cached = this.cache.get(cacheKey)
    
    if (cached && Date.now() - cached.timestamp < this.CACHE_DURATION) {
      return cached.data
    }

    try {
      const searchQuery = this.buildIndeedSearchQuery(params)
      const searchResults = await blink.data.search(searchQuery, {
        type: 'web',
        limit: params.limit || 20
      })

      const jobs = this.parseIndeedResults(searchResults.organic_results || [])
      
      this.cache.set(cacheKey, { data: jobs, timestamp: Date.now() })
      return jobs
    } catch (error) {
      console.error('Error searching Indeed jobs:', error)
      return []
    }
  }

  async searchRemoteJobs(params: JobSearchParams): Promise<ScrapedJob[]> {
    const cacheKey = `remote_${JSON.stringify(params)}`
    const cached = this.cache.get(cacheKey)
    
    if (cached && Date.now() - cached.timestamp < this.CACHE_DURATION) {
      return cached.data
    }

    try {
      const searchQuery = this.buildRemoteJobsSearchQuery(params)
      const searchResults = await blink.data.search(searchQuery, {
        type: 'web',
        limit: params.limit || 20
      })

      const jobs = this.parseRemoteJobsResults(searchResults.organic_results || [])
      
      this.cache.set(cacheKey, { data: jobs, timestamp: Date.now() })
      return jobs
    } catch (error) {
      console.error('Error searching remote jobs:', error)
      return []
    }
  }

  async searchAllSources(params: JobSearchParams): Promise<ScrapedJob[]> {
    try {
      const [linkedinJobs, indeedJobs, remoteJobs] = await Promise.allSettled([
        this.searchLinkedInJobs(params),
        this.searchIndeedJobs(params),
        this.searchRemoteJobs(params)
      ])

      const allJobs: ScrapedJob[] = []

      if (linkedinJobs.status === 'fulfilled') {
        allJobs.push(...linkedinJobs.value)
      }
      if (indeedJobs.status === 'fulfilled') {
        allJobs.push(...indeedJobs.value)
      }
      if (remoteJobs.status === 'fulfilled') {
        allJobs.push(...remoteJobs.value)
      }

      // Remove duplicates and sort by posted date
      const uniqueJobs = this.removeDuplicates(allJobs)
      return uniqueJobs.sort((a, b) => 
        new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime()
      )
    } catch (error) {
      console.error('Error searching all job sources:', error)
      return []
    }
  }

  private buildLinkedInSearchQuery(params: JobSearchParams): string {
    let query = 'site:linkedin.com/jobs'
    
    if (params.query) {
      query += ` "${params.query}"`
    }
    if (params.location) {
      query += ` "${params.location}"`
    }
    if (params.jobType) {
      query += ` "${params.jobType}"`
    }
    if (params.remote) {
      query += ' remote'
    }
    
    return query
  }

  private buildIndeedSearchQuery(params: JobSearchParams): string {
    let query = 'site:indeed.com'
    
    if (params.query) {
      query += ` "${params.query}" jobs`
    }
    if (params.location) {
      query += ` "${params.location}"`
    }
    if (params.remote) {
      query += ' remote'
    }
    
    return query
  }

  private buildRemoteJobsSearchQuery(params: JobSearchParams): string {
    let query = 'site:remote.co OR site:remoteok.io OR site:weworkremotely.com'
    
    if (params.query) {
      query += ` "${params.query}"`
    }
    if (params.jobType) {
      query += ` "${params.jobType}"`
    }
    
    return query
  }

  private parseLinkedInResults(results: any[]): ScrapedJob[] {
    return results
      .filter(result => result.link?.includes('linkedin.com/jobs'))
      .map((result, index) => ({
        id: `linkedin_${Date.now()}_${index}`,
        title: this.extractJobTitle(result.title || ''),
        company: this.extractCompany(result.snippet || ''),
        location: this.extractLocation(result.snippet || ''),
        description: result.snippet || '',
        salary: this.extractSalary(result.snippet || ''),
        jobType: this.extractJobType(result.snippet || ''),
        experienceLevel: this.extractExperienceLevel(result.snippet || ''),
        skills: this.extractSkills(result.snippet || ''),
        postedDate: new Date().toISOString(),
        source: 'linkedin' as const,
        externalUrl: result.link || '',
        isRemote: this.isRemoteJob(result.snippet || ''),
        applications: Math.floor(Math.random() * 100) + 1
      }))
      .filter(job => job.title && job.company)
  }

  private parseIndeedResults(results: any[]): ScrapedJob[] {
    return results
      .filter(result => result.link?.includes('indeed.com'))
      .map((result, index) => ({
        id: `indeed_${Date.now()}_${index}`,
        title: this.extractJobTitle(result.title || ''),
        company: this.extractCompany(result.snippet || ''),
        location: this.extractLocation(result.snippet || ''),
        description: result.snippet || '',
        salary: this.extractSalary(result.snippet || ''),
        jobType: this.extractJobType(result.snippet || ''),
        experienceLevel: this.extractExperienceLevel(result.snippet || ''),
        skills: this.extractSkills(result.snippet || ''),
        postedDate: new Date().toISOString(),
        source: 'indeed' as const,
        externalUrl: result.link || '',
        isRemote: this.isRemoteJob(result.snippet || ''),
        applications: Math.floor(Math.random() * 150) + 1
      }))
      .filter(job => job.title && job.company)
  }

  private parseRemoteJobsResults(results: any[]): ScrapedJob[] {
    return results
      .filter(result => 
        result.link?.includes('remote.co') || 
        result.link?.includes('remoteok.io') || 
        result.link?.includes('weworkremotely.com')
      )
      .map((result, index) => ({
        id: `remote_${Date.now()}_${index}`,
        title: this.extractJobTitle(result.title || ''),
        company: this.extractCompany(result.snippet || ''),
        location: 'Remote',
        description: result.snippet || '',
        salary: this.extractSalary(result.snippet || ''),
        jobType: this.extractJobType(result.snippet || ''),
        experienceLevel: this.extractExperienceLevel(result.snippet || ''),
        skills: this.extractSkills(result.snippet || ''),
        postedDate: new Date().toISOString(),
        source: 'remote.co' as const,
        externalUrl: result.link || '',
        isRemote: true,
        applications: Math.floor(Math.random() * 80) + 1
      }))
      .filter(job => job.title && job.company)
  }

  private extractJobTitle(text: string): string {
    // Remove common prefixes and clean up
    const cleaned = text
      .replace(/^(Job|Jobs|Hiring|Career|Position|Opening):\s*/i, '')
      .replace(/\s*-\s*(LinkedIn|Indeed|Remote\.co).*$/i, '')
      .trim()
    
    return cleaned || 'Job Opening'
  }

  private extractCompany(text: string): string {
    // Look for company patterns in the snippet
    const companyPatterns = [
      /at\s+([A-Z][a-zA-Z\s&.,-]+?)(?:\s|$|,|\.|in\s)/,
      /([A-Z][a-zA-Z\s&.,-]+?)\s+is\s+hiring/i,
      /Join\s+([A-Z][a-zA-Z\s&.,-]+?)(?:\s|$|,|\.|as\s)/i
    ]
    
    for (const pattern of companyPatterns) {
      const match = text.match(pattern)
      if (match && match[1]) {
        return match[1].trim()
      }
    }
    
    return 'Company'
  }

  private extractLocation(text: string): string {
    const locationPatterns = [
      /in\s+([A-Z][a-zA-Z\s,]+?)(?:\s|$|,|\.|·)/,
      /([A-Z][a-zA-Z\s]+,\s*[A-Z]{2})/,
      /(Remote|Worldwide|Global)/i
    ]
    
    for (const pattern of locationPatterns) {
      const match = text.match(pattern)
      if (match && match[1]) {
        return match[1].trim()
      }
    }
    
    return 'Location not specified'
  }

  private extractSalary(text: string): string | undefined {
    const salaryPatterns = [
      /\$[\d,]+(?:\s*-\s*\$[\d,]+)?(?:\s*\/\s*(?:year|yr|hour|hr))?/i,
      /[\d,]+k(?:\s*-\s*[\d,]+k)?/i
    ]
    
    for (const pattern of salaryPatterns) {
      const match = text.match(pattern)
      if (match) {
        return match[0]
      }
    }
    
    return undefined
  }

  private extractJobType(text: string): string {
    const fullTimePatterns = /full.?time|permanent/i
    const partTimePatterns = /part.?time/i
    const contractPatterns = /contract|contractor|freelance/i
    
    if (fullTimePatterns.test(text)) return 'full-time'
    if (partTimePatterns.test(text)) return 'part-time'
    if (contractPatterns.test(text)) return 'contract'
    
    return 'full-time' // default
  }

  private extractExperienceLevel(text: string): string {
    const seniorPatterns = /senior|lead|principal|staff/i
    const midPatterns = /mid.?level|experienced|3.5\s*years/i
    const entryPatterns = /entry.?level|junior|graduate|intern/i
    
    if (seniorPatterns.test(text)) return 'senior'
    if (midPatterns.test(text)) return 'mid'
    if (entryPatterns.test(text)) return 'entry'
    
    return 'mid' // default
  }

  private extractSkills(text: string): string[] {
    const commonSkills = [
      'JavaScript', 'Python', 'Java', 'React', 'Node.js', 'TypeScript',
      'AWS', 'Docker', 'Kubernetes', 'SQL', 'MongoDB', 'PostgreSQL',
      'HTML', 'CSS', 'Vue.js', 'Angular', 'PHP', 'Ruby', 'Go', 'Rust',
      'Machine Learning', 'AI', 'Data Science', 'DevOps', 'Agile',
      'Figma', 'Adobe', 'Photoshop', 'Illustrator', 'UI/UX', 'Design',
      'Marketing', 'SEO', 'Content', 'Social Media', 'Analytics'
    ]
    
    const foundSkills = commonSkills.filter(skill => 
      new RegExp(skill, 'i').test(text)
    )
    
    return foundSkills.slice(0, 6) // Limit to 6 skills
  }

  private isRemoteJob(text: string): boolean {
    return /remote|work.from.home|distributed|anywhere/i.test(text)
  }

  private removeDuplicates(jobs: ScrapedJob[]): ScrapedJob[] {
    const seen = new Set<string>()
    return jobs.filter(job => {
      const key = `${job.title.toLowerCase()}_${job.company.toLowerCase()}`
      if (seen.has(key)) {
        return false
      }
      seen.add(key)
      return true
    })
  }

  clearCache(): void {
    this.cache.clear()
  }
}

export const jobScrapingService = new JobScrapingService()