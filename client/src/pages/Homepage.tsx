import React from 'react'

const Homepage: React.FC = () => {
  const handleSpotifyConnect = () => {
    window.location.href = '/api/auth/spotify'
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <h1 style={{ fontSize: '6rem', fontWeight: 'bold', marginBottom: '16px' }} className="gradient-text">
          raken
        </h1>
        <p style={{ fontSize: '1.5rem', color: 'var(--muted-foreground)', fontWeight: '300' }}>
          Sort your music by mood
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', maxWidth: '400px' }}>
        <button 
          onClick={handleSpotifyConnect}
          style={{ background: 'var(--primary)', color: 'black', fontWeight: '600', padding: '16px 32px', borderRadius: '9999px', fontSize: '1.125rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }} 
          className="hover-lift"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.568 17.568c-.24.384-.768.512-1.152.24-3.168-1.92-7.152-2.352-11.856-1.296-.456.096-.912-.192-1.008-.648-.096-.456.192-.912.648-1.008 5.088-1.152 9.504-.576 13.056 1.488.384.24.512.768.312 1.224zm1.632-3.624c-.288.48-.912.624-1.392.336-3.624-2.232-9.144-2.88-13.416-1.584-.552.168-1.128-.12-1.296-.672-.168-.552.12-1.128.672-1.296 4.896-1.488 10.968-.768 15.048 1.8.48.288.624.912.384 1.416zm.144-3.768c-4.344-2.592-11.52-2.832-15.672-1.56-.672.216-1.392-.144-1.608-.816-.216-.672.144-1.392.816-1.608 4.752-1.464 12.624-1.176 17.568 1.8.576.336.768 1.08.432 1.656-.336.576-1.08.768-1.536.528z"/>
          </svg>
          Connect with Spotify
        </button>
      </div>
    </div>
  )
}

export default Homepage
