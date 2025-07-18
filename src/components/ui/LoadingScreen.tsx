import { Loader2 } from 'lucide-react'

export function LoadingScreen() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center space-y-4">
        <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
        <h1 className="text-2xl font-bold text-primary">FreelanceConnect</h1>
        <p className="text-muted-foreground">Loading your workspace...</p>
      </div>
    </div>
  )
}