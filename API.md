# raken API Documentation

Complete API reference for the raken Spotify playlist mood sorter.

## Base URL

```
http://localhost:5000/api  (Development)
https://yourdomain.com/api (Production)
```

## Authentication

The API uses session-based authentication with Spotify OAuth 2.0.

### Authentication Flow

1. **Initiate OAuth**: `GET /api/auth/spotify`
2. **Handle Callback**: `GET /api/auth/spotify/callback`
3. **Check Authentication**: `GET /api/user`
4. **Logout**: `POST /api/auth/logout`

## Endpoints

### Authentication Endpoints

#### Initiate Spotify OAuth
```http
GET /api/auth/spotify
```

**Description**: Redirects user to Spotify authorization page.

**Response**: HTTP 302 redirect to Spotify

---

#### Handle OAuth Callback
```http
GET /api/auth/spotify/callback?code={auth_code}
```

**Description**: Processes Spotify OAuth callback and creates user session.

**Parameters**:
- `code` (query): Authorization code from Spotify

**Response**: HTTP 302 redirect to frontend

---

#### Get Current User
```http
GET /api/user
```

**Description**: Returns current authenticated user information.

**Headers**:
- Session cookie required

**Response**:
```json
{
  "id": "user-uuid",
  "username": "John Doe",
  "email": "john@example.com",
  "spotifyId": "spotify-user-id"
}
```

**Error Responses**:
- `401`: Not authenticated

---

#### Logout User
```http
POST /api/auth/logout
```

**Description**: Destroys user session.

**Response**:
```json
{
  "success": true
}
```

### Playlist Endpoints

#### Get User Playlists
```http
GET /api/playlists
```

**Description**: Returns all playlists (Spotify + manual) for the authenticated user.

**Headers**:
- Session cookie required

**Response**:
```json
[
  {
    "id": "playlist-uuid",
    "spotifyId": "spotify-playlist-id",
    "userId": "user-uuid",
    "name": "My Awesome Playlist",
    "description": "A great playlist",
    "coverImage": "https://image.url",
    "trackCount": 25,
    "isManual": 0,
    "createdAt": "2024-01-01T00:00:00Z"
  }
]
```

**Error Responses**:
- `401`: Not authenticated
- `500`: Server error

---

#### Get Playlist Tracks
```http
GET /api/playlists/{id}/tracks
```

**Description**: Returns tracks for a specific playlist with mood analysis.

**Parameters**:
- `id` (path): Playlist UUID

**Headers**:
- Session cookie required

**Response**:
```json
[
  {
    "id": "track-uuid",
    "spotifyId": "spotify-track-id",
    "name": "Track Name",
    "artist": "Artist Name",
    "album": "Album Name",
    "duration": 180000,
    "previewUrl": "https://preview.url",
    "albumCover": "https://cover.url",
    "audioFeatures": {
      "valence": 0.8,
      "energy": 0.7,
      "tempo": 120,
      "danceability": 0.6
    },
    "mood": "Happy",
    "addedAt": "2024-01-01T00:00:00Z"
  }
]
```

**Error Responses**:
- `401`: Not authenticated
- `404`: Playlist not found
- `500`: Server error

---

#### Create Manual Playlist
```http
POST /api/playlists
```

**Description**: Creates a new manual playlist with tracks.

**Headers**:
- Session cookie required
- Content-Type: application/json

**Request Body**:
```json
{
  "name": "My Manual Playlist",
  "description": "Created manually",
  "tracks": [
    {
      "name": "Song Title",
      "artist": "Artist Name",
      "album": "Album Name",
      "spotifyId": "optional-spotify-id",
      "duration": 180000,
      "albumCover": "https://cover.url",
      "mood": "Happy"
    }
  ]
}
```

**Response**:
```json
{
  "id": "playlist-uuid",
  "name": "My Manual Playlist",
  "description": "Created manually",
  "userId": "user-uuid",
  "trackCount": 1,
  "isManual": 1,
  "createdAt": "2024-01-01T00:00:00Z"
}
```

**Error Responses**:
- `400`: Invalid request body
- `401`: Not authenticated
- `500`: Server error

---

#### Export Playlist to Spotify
```http
POST /api/playlists/{id}/export
```

**Description**: Creates a new playlist on user's Spotify account.

**Parameters**:
- `id` (path): Playlist UUID

**Headers**:
- Session cookie required

**Response**:
```json
{
  "success": true,
  "spotifyPlaylistId": "new-spotify-playlist-id",
  "spotifyUrl": "https://open.spotify.com/playlist/..."
}
```

**Error Responses**:
- `401`: Not authenticated
- `404`: Playlist not found
- `500`: Export failed

### Search Endpoints

#### Search Spotify Tracks
```http
GET /api/search?q={query}
```

**Description**: Searches Spotify for tracks matching the query.

**Parameters**:
- `q` (query): Search query string

**Headers**:
- Session cookie required

**Response**:
```json
[
  {
    "spotifyId": "track-id",
    "name": "Track Name",
    "artist": "Artist Name",
    "album": "Album Name",
    "duration": 180000,
    "albumCover": "https://cover.url",
    "previewUrl": "https://preview.url"
  }
]
```

**Error Responses**:
- `400`: Missing query parameter
- `401`: Not authenticated
- `500`: Search failed

## Data Models

### User
```typescript
interface User {
  id: string;
  spotifyId: string | null;
  username: string;
  email: string | null;
  accessToken: string | null;
  refreshToken: string | null;
  tokenExpiry: Date | null;
}
```

### Playlist
```typescript
interface Playlist {
  id: string;
  spotifyId: string | null;
  userId: string;
  name: string;
  description: string | null;
  coverImage: string | null;
  trackCount: number | null;
  isManual: number | null; // 0 = Spotify, 1 = Manual
  createdAt: Date | null;
}
```

### Track
```typescript
interface Track {
  id: string;
  spotifyId: string | null;
  name: string;
  artist: string;
  album: string | null;
  duration: number | null; // milliseconds
  previewUrl: string | null;
  albumCover: string | null;
  audioFeatures: any; // Spotify audio features object
  mood: string | null; // "Happy" | "Sad" | "Chill" | "Energetic"
  addedAt: Date | null;
}
```

### Audio Features
```typescript
interface AudioFeatures {
  valence: number;      // 0.0 to 1.0
  energy: number;       // 0.0 to 1.0
  tempo: number;        // BPM
  danceability: number; // 0.0 to 1.0
  acousticness: number; // 0.0 to 1.0
  instrumentalness: number; // 0.0 to 1.0
  speechiness: number;  // 0.0 to 1.0
}
```

## Mood Classification

The API automatically classifies tracks into moods based on audio features:

- **Happy**: High valence (>0.6) + medium/high energy (>0.5)
- **Sad**: Low valence (<0.4) + low energy (<0.5)  
- **Chill**: Medium valence (0.4-0.6) + low energy (<0.5)
- **Energetic**: High energy (>0.7) + fast tempo (>120 BPM)

## Rate Limits

- **Spotify API**: Respects Spotify's rate limits
- **Search**: Limited to 10 results per query
- **Playlist Creation**: No specific limits

## Error Handling

All endpoints return appropriate HTTP status codes:

- `200`: Success
- `400`: Bad Request - Invalid parameters
- `401`: Unauthorized - Authentication required
- `404`: Not Found - Resource doesn't exist
- `500`: Internal Server Error - Server issue

Error responses include a JSON object:
```json
{
  "error": "Error message description"
}
```

## Example Usage

### JavaScript/TypeScript
```javascript
// Get user playlists
const response = await fetch('/api/playlists', {
  credentials: 'include' // Include session cookie
});
const playlists = await response.json();

// Search for tracks
const searchResponse = await fetch('/api/search?q=bohemian rhapsody', {
  credentials: 'include'
});
const tracks = await searchResponse.json();

// Create manual playlist
const createResponse = await fetch('/api/playlists', {
  method: 'POST',
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'My Playlist',
    tracks: [/* track objects */]
  })
});
```

### cURL Examples
```bash
# Get current user (requires session cookie)
curl -X GET "http://localhost:5000/api/user" \
  -H "Cookie: session=your-session-cookie"

# Search tracks
curl -X GET "http://localhost:5000/api/search?q=beatles" \
  -H "Cookie: session=your-session-cookie"

# Create playlist
curl -X POST "http://localhost:5000/api/playlists" \
  -H "Content-Type: application/json" \
  -H "Cookie: session=your-session-cookie" \
  -d '{"name":"Test Playlist","tracks":[]}'
```

## WebSocket Support

Currently not implemented, but planned for future releases:
- Real-time playlist updates
- Live mood analysis progress
- Collaborative playlist editing

For questions about the API, please open an issue on GitHub.
