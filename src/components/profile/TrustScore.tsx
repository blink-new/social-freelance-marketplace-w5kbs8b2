import { useState } from 'react'
import { ThumbsUp, ThumbsDown, Shield, AlertTriangle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { canVoteForUser, getTrustScore } from '@/services/mockData'

interface TrustScoreProps {
  userId: string
  currentUserId: string
  showVoting?: boolean
}

export function TrustScore({ userId, currentUserId, showVoting = true }: TrustScoreProps) {
  const [voteComment, setVoteComment] = useState('')
  const [isVoting, setIsVoting] = useState(false)
  const [showVoteDialog, setShowVoteDialog] = useState(false)
  const [selectedVoteType, setSelectedVoteType] = useState<'upvote' | 'downvote' | null>(null)

  const trustData = getTrustScore(userId)
  const canVote = canVoteForUser(currentUserId, userId)
  const isOwnProfile = currentUserId === userId

  const getTrustLevel = (score: number) => {
    if (score >= 90) return { level: 'Excellent', color: 'bg-green-100 text-green-800', icon: Shield }
    if (score >= 80) return { level: 'Very Good', color: 'bg-blue-100 text-blue-800', icon: Shield }
    if (score >= 70) return { level: 'Good', color: 'bg-yellow-100 text-yellow-800', icon: Shield }
    if (score >= 60) return { level: 'Fair', color: 'bg-orange-100 text-orange-800', icon: AlertTriangle }
    return { level: 'Poor', color: 'bg-red-100 text-red-800', icon: AlertTriangle }
  }

  const trustLevel = getTrustLevel(trustData.score)
  const TrustIcon = trustLevel.icon

  const handleVote = async (voteType: 'upvote' | 'downvote') => {
    setSelectedVoteType(voteType)
    setShowVoteDialog(true)
  }

  const submitVote = async () => {
    if (!selectedVoteType) return

    setIsVoting(true)
    try {
      // In real app, submit vote to backend
      console.log('Submitting vote:', {
        targetUserId: userId,
        voteType: selectedVoteType,
        comment: voteComment
      })
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setShowVoteDialog(false)
      setVoteComment('')
      setSelectedVoteType(null)
    } catch (error) {
      console.error('Failed to submit vote:', error)
    } finally {
      setIsVoting(false)
    }
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center space-x-2">
          <TrustIcon className="h-5 w-5" />
          <span>Trust Score</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Trust Score Display */}
        <div className="text-center">
          <div className="text-3xl font-bold text-primary mb-2">{trustData.score}</div>
          <Badge className={trustLevel.color}>
            {trustLevel.level}
          </Badge>
        </div>

        {/* Vote Breakdown */}
        <div className="grid grid-cols-3 gap-4 text-center text-sm">
          <div>
            <div className="flex items-center justify-center space-x-1 text-green-600">
              <ThumbsUp className="h-4 w-4" />
              <span className="font-semibold">{trustData.upvotes}</span>
            </div>
            <p className="text-muted-foreground">Upvotes</p>
          </div>
          <div>
            <div className="flex items-center justify-center space-x-1 text-red-600">
              <ThumbsDown className="h-4 w-4" />
              <span className="font-semibold">{trustData.downvotes}</span>
            </div>
            <p className="text-muted-foreground">Downvotes</p>
          </div>
          <div>
            <div className="font-semibold">{trustData.total}</div>
            <p className="text-muted-foreground">Total Votes</p>
          </div>
        </div>

        {/* Voting Actions */}
        {showVoting && !isOwnProfile && (
          <div className="pt-4 border-t">
            {canVote ? (
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground text-center">
                  You can vote based on your work experience together
                </p>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 text-green-600 hover:bg-green-50"
                    onClick={() => handleVote('upvote')}
                  >
                    <ThumbsUp className="h-4 w-4 mr-2" />
                    Trustworthy
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 text-red-600 hover:bg-red-50"
                    onClick={() => handleVote('downvote')}
                  >
                    <ThumbsDown className="h-4 w-4 mr-2" />
                    Untrustworthy
                  </Button>
                </div>
              </div>
            ) : (
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription className="text-sm">
                  You can only vote for users you've worked with on completed projects.
                </AlertDescription>
              </Alert>
            )}
          </div>
        )}

        {/* Vote Dialog */}
        <Dialog open={showVoteDialog} onOpenChange={setShowVoteDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {selectedVoteType === 'upvote' ? 'Recommend as Trustworthy' : 'Report Trust Issues'}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex items-center space-x-2 p-3 rounded-lg bg-muted">
                {selectedVoteType === 'upvote' ? (
                  <ThumbsUp className="h-5 w-5 text-green-600" />
                ) : (
                  <ThumbsDown className="h-5 w-5 text-red-600" />
                )}
                <span className="font-medium">
                  {selectedVoteType === 'upvote' 
                    ? 'This will increase their trust score' 
                    : 'This will decrease their trust score'
                  }
                </span>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Comment (optional)
                </label>
                <Textarea
                  placeholder={
                    selectedVoteType === 'upvote'
                      ? 'Share why you trust this person...'
                      : 'Explain the trust issues you experienced...'
                  }
                  value={voteComment}
                  onChange={(e) => setVoteComment(e.target.value)}
                  rows={3}
                />
              </div>

              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setShowVoteDialog(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={submitVote}
                  disabled={isVoting}
                  className="flex-1"
                >
                  {isVoting ? 'Submitting...' : 'Submit Vote'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}