import React, { useState, useEffect } from 'react'

interface User {
  id: string
  display_name: string
  email: string
  images: Array<{ url: string }>
}

interface Playlist {
  id: string
  name: string
  tracks: { total: number }
}

interface DashboardProps {
  user: User | null
  sessionId: string | null
  onLogout: () => void
}

const Dashboard: React.FC<DashboardProps> = ({ user, sessionId, onLogout }) => {
  const [playlists, setPlaylists] = useState<Playlist[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (sessionId) {
      fetch('/api/playlists', {
        headers: { Authorization: `Bearer ${sessionId}` },
      })
      .then(res => res.json())
      .then(data => setPlaylists(data.playlists || []))
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
    }
  }, [sessionId])

  return (
    <div style={{ minHeight: '100vh', padding: '24px' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '8px' }}>
          Welcome back, {user?.display_name || 'User'}!
        </h1>
        <p style={{ color: 'var(--muted-foreground)', fontSize: '1.125rem' }}>Your music, organized by mood</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '32px' }}>
        <div style={{ background: 'var(--card)', borderRadius: '12px', padding: '24px', border: '1px solid var(--border)' }}>
          <h3 style={{ fontWeight: '600', marginBottom: '8px' }}>Total Playlists</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary)' }}>
            {loading ? '...' : playlists.length}
          </p>
        </div>
        
        <div style={{ background: 'var(--card)', borderRadius: '12px', padding: '24px', border: '1px solid var(--border)' }}>
          <h3 style={{ fontWeight: '600', marginBottom: '8px' }}>Spotify Connected</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary)' }}>✓</p>
        </div>
        
        <div style={{ background: 'var(--card)', borderRadius: '12px', padding: '24px', border: '1px solid var(--border)' }}>
          <button onClick={onLogout} style={{ background: 'var(--primary)', color: 'black', padding: '12px 24px', borderRadius: '8px', fontWeight: '600' }}>
            Logout
          </button>
        </div>
      </div>

      <div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '16px' }}>Your Playlists</h2>
        {loading ? (
          <p>Loading playlists...</p>
        ) : playlists.length === 0 ? (
          <p>No playlists found</p>
        ) : (
          playlists.map((playlist) => (
            <div key={playlist.id} style={{ padding: '16px', margin: '8px 0', background: 'var(--card)', borderRadius: '8px', border: '1px solid var(--border)' }}>
              <div style={{ fontWeight: '500' }}>{playlist.name}</div>
              <div style={{ fontSize: '0.875rem', color: 'var(--muted-foreground)' }}>{playlist.tracks.total} tracks</div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Dashboard
