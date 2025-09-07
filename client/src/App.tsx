import React, { useState, useEffect } from 'react'
import Homepage from './pages/Homepage'
import Dashboard from './pages/Dashboard'

interface User {
  id: string
  display_name: string
  email: string
  images: Array<{ url: string }>
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [sessionId, setSessionId] = useState<string | null>(null)

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const session = urlParams.get('session')
    const userData = urlParams.get('user')
    const error = urlParams.get('error')

    if (error) {
      console.error('Authentication error:', error)
      alert(`Authentication failed: ${error}`)
      return
    }

    if (session && userData) {
      try {
        const parsedUser = JSON.parse(decodeURIComponent(userData))
        setUser(parsedUser)
        setSessionId(session)
        setIsAuthenticated(true)
        window.history.replaceState({}, document.title, window.location.pathname)
      } catch (err) {
        console.error('Error parsing user data:', err)
      }
    }
  }, [])

  const handleLogout = async () => {
    if (sessionId) {
      try {
        await fetch('/api/auth/logout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId }),
        })
      } catch (err) {
        console.error('Logout error:', err)
      }
    }
    setIsAuthenticated(false)
    setUser(null)
    setSessionId(null)
  }

  return (
    <div className="App">
      {isAuthenticated ? (
        <Dashboard user={user} sessionId={sessionId} onLogout={handleLogout} />
      ) : (
        <Homepage />
      )}
    </div>
  )
}

export default App
