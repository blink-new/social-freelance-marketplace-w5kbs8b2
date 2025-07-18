import { useState } from 'react'
import { DollarSign, Clock, MessageSquare, Send } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Job } from '@/types'

interface OfferDialogProps {
  job: Job
  userType: 'freelancer' | 'employer'
  trigger: React.ReactNode
}

export function OfferDialog({ job, userType, trigger }: OfferDialogProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [proposedRate, setProposedRate] = useState('')
  const [proposedBudget, setProposedBudget] = useState('')
  const [message, setMessage] = useState('')
  const [timeline, setTimeline] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      // In real app, submit offer to backend
      console.log('Submitting offer:', {
        jobId: job.id,
        proposedRate: proposedRate ? parseFloat(proposedRate) : undefined,
        proposedBudget: proposedBudget ? parseFloat(proposedBudget) : undefined,
        message,
        timeline,
        userType
      })
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setIsOpen(false)
      // Reset form
      setProposedRate('')
      setProposedBudget('')
      setMessage('')
      setTimeline('')
    } catch (error) {
      console.error('Failed to submit offer:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const isFormValid = message.trim().length > 0 && (proposedRate || proposedBudget)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {userType === 'freelancer' ? 'Submit Proposal' : 'Make Offer'}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Job Summary */}
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-2">{job.title}</h3>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <span>{job.location}</span>
                <Badge variant="outline">{job.jobType}</Badge>
                <Badge variant="outline">{job.experienceLevel}</Badge>
              </div>
              {job.budget && (
                <div className="mt-2 text-sm">
                  <span className="text-muted-foreground">Budget: </span>
                  <span className="font-medium">${job.budget.toLocaleString()}</span>
                </div>
              )}
              {job.salary && (
                <div className="mt-2 text-sm">
                  <span className="text-muted-foreground">Salary: </span>
                  <span className="font-medium">{job.salary}</span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Pricing */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="rate" className="flex items-center space-x-2">
                <DollarSign className="h-4 w-4" />
                <span>Hourly Rate (USD)</span>
              </Label>
              <Input
                id="rate"
                type="number"
                placeholder="e.g. 75"
                value={proposedRate}
                onChange={(e) => setProposedRate(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="budget" className="flex items-center space-x-2">
                <DollarSign className="h-4 w-4" />
                <span>Fixed Budget (USD)</span>
              </Label>
              <Input
                id="budget"
                type="number"
                placeholder="e.g. 2500"
                value={proposedBudget}
                onChange={(e) => setProposedBudget(e.target.value)}
              />
            </div>
          </div>

          {/* Timeline */}
          <div className="space-y-2">
            <Label htmlFor="timeline" className="flex items-center space-x-2">
              <Clock className="h-4 w-4" />
              <span>Timeline</span>
            </Label>
            <Input
              id="timeline"
              placeholder="e.g. 2 weeks, Immediate start, etc."
              value={timeline}
              onChange={(e) => setTimeline(e.target.value)}
            />
          </div>

          {/* Message */}
          <div className="space-y-2">
            <Label htmlFor="message" className="flex items-center space-x-2">
              <MessageSquare className="h-4 w-4" />
              <span>
                {userType === 'freelancer' ? 'Cover Letter' : 'Project Details'}
              </span>
            </Label>
            <Textarea
              id="message"
              placeholder={
                userType === 'freelancer'
                  ? 'Explain why you\'re the perfect fit for this project...'
                  : 'Provide more details about the project requirements...'
              }
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
            />
          </div>

          {/* Pricing Note */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-blue-600 text-xs font-bold">💡</span>
              </div>
              <div className="text-sm text-blue-700">
                <p className="font-medium mb-1">Pricing Tips</p>
                <ul className="space-y-1 text-xs">
                  <li>• You can specify either hourly rate OR fixed budget</li>
                  <li>• {userType === 'freelancer' ? 'Employers' : 'Freelancers'} can counter your offer</li>
                  <li>• Final terms are agreed upon through negotiation</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!isFormValid || isSubmitting}
              className="flex-1"
            >
              {isSubmitting ? (
                'Submitting...'
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  {userType === 'freelancer' ? 'Submit Proposal' : 'Send Offer'}
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}