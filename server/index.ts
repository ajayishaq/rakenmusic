import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import axios from 'axios'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET
const SPOTIFY_REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI || 'http://localhost:5000/api/auth/spotify/callback'

app.use(cors())
app.use(express.json())

const userSessions = new Map()

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'raken backend is running' })
})

app.get('/api/auth/spotify', (req, res) => {
  const scopes = [
    'user-read-private',
    'user-read-email',
    'playlist-read-private',
    'playlist-read-collaborative'
  ].join(' ')

  const authURL = `https://accounts.spotify.com/authorize?` +
    `response_type=code&` +
    `client_id=${SPOTIFY_CLIENT_ID}&` +
    `scope=${encodeURIComponent(scopes)}&` +
    `redirect_uri=${encodeURIComponent(SPOTIFY_REDIRECT_URI)}`

  res.redirect(authURL)
})

app.get('/api/auth/spotify/callback', async (req, res) => {
  const { code, error } = req.query

  if (error) {
    return res.redirect(`http://localhost:5000?error=${error}`)
  }

  try {
    const tokenResponse = await axios.post('https://accounts.spotify.com/api/token', {
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: SPOTIFY_REDIRECT_URI,
      client_id: SPOTIFY_CLIENT_ID,
      client_secret: SPOTIFY_CLIENT_SECRET,
    }, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    })

    const { access_token } = tokenResponse.data

    const userResponse = await axios.get('https://api.spotify.com/v1/me', {
      headers: { Authorization: `Bearer ${access_token}` },
    })

    const user = userResponse.data
    const sessionId = Math.random().toString(36).substring(7)

    userSessions.set(sessionId, {
      user,
      access_token,
      expires_at: Date.now() + 3600000,
    })

    res.redirect(`http://localhost:5000?session=${sessionId}&user=${encodeURIComponent(JSON.stringify(user))}`)
  } catch (error) {
    console.error('Spotify OAuth error:', error)
    res.redirect(`http://localhost:5000?error=auth_failed`)
  }
})

app.post('/api/auth/logout', (req, res) => {
  const { sessionId } = req.body
  if (sessionId) {
    userSessions.delete(sessionId)
  }
  res.json({ message: 'Logout successful' })
})

app.get('/api/playlists', async (req, res) => {
  const sessionId = req.headers.authorization?.replace('Bearer ', '')
  const session = userSessions.get(sessionId)
  
  if (!session) {
    return res.status(401).json({ error: 'Not authenticated' })
  }

  try {
    const playlistsResponse = await axios.get('https://api.spotify.com/v1/me/playlists', {
      headers: { Authorization: `Bearer ${session.access_token}` },
    })

    res.json({ playlists: playlistsResponse.data.items })
  } catch (error) {
    console.error('Error fetching playlists:', error)
    res.status(500).json({ error: 'Failed to fetch playlists' })
  }
})

app.listen(PORT, () => {
  console.log(`🎵 raken backend server running on port ${PORT}`)
})
