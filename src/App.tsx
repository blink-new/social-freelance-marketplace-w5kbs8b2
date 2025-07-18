import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { blink } from './blink/client'
import { User } from './types'

// Components
import { Navigation } from './components/layout/Navigation'
import { LoadingScreen } from './components/ui/LoadingScreen'

// Pages
import { HomePage } from './pages/HomePage'
import { DiscoverPage } from './pages/DiscoverPage'
import { MessagesPage } from './pages/MessagesPage'
import { ProfilePage } from './pages/ProfilePage'
import { ProjectDetailsPage } from './pages/ProjectDetailsPage'

function App() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      setUser(state.user)
      setLoading(state.isLoading)
    })
    return unsubscribe
  }, [])

  if (loading) {
    return <LoadingScreen />
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-primary">FreelanceConnect</h1>
          <p className="text-muted-foreground">Please sign in to continue</p>
          <button 
            onClick={() => blink.auth.login()}
            className="bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
          >
            Sign In
          </button>
        </div>
      </div>
    )
  }

  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Navigation user={user} />
        <main className="pb-16 md:pb-0">
          <Routes>
            <Route path="/" element={<HomePage user={user} />} />
            <Route path="/discover" element={<DiscoverPage user={user} />} />
            <Route path="/messages" element={<MessagesPage user={user} />} />
            <Route path="/profile/:userId?" element={<ProfilePage user={user} />} />
            <Route path="/project/:projectId" element={<ProjectDetailsPage user={user} />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App