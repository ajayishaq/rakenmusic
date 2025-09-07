# raken - Spotify Playlist Mood Sorter

A sleek web application that analyzes and sorts Spotify playlists by mood using audio feature analysis.

![raken Dashboard](https://via.placeholder.com/800x400/121212/1DB954?text=raken+Dashboard)

## Features

- 🎵 **Spotify Integration** - Connect your Spotify account with OAuth 2.0
- 🧠 **AI Mood Analysis** - Automatically classify tracks into Happy, Sad, Chill, or Energetic
- 📊 **Smart Sorting** - Sort playlists by mood, energy, tempo, and more
- 📥 **Manual Import** - Add songs manually or upload CSV files
- 📤 **Export Options** - Create new Spotify playlists or export to CSV
- 🌙 **Dark Theme** - Spotify-inspired dark UI with sleek design
- 📱 **Responsive** - Works perfectly on desktop and mobile

## Tech Stack

- **Frontend**: React, TypeScript, TailwindCSS, Vite
- **Backend**: Node.js, Express, TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **APIs**: Spotify Web API
- **UI Components**: Radix UI with shadcn/ui
- **State Management**: TanStack Query

## Quick Start

### Prerequisites

- Node.js 18+ 
- Spotify Developer Account
- PostgreSQL database (or use Neon for serverless)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/raken.git
   cd raken
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Fill in your Spotify credentials and database URL.

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5000`

## Environment Variables

Create a `.env` file in the root directory:

```env
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
SPOTIFY_REDIRECT_URI=http://localhost:5000/api/auth/spotify/callback
DATABASE_URL=your_postgresql_connection_string
```

### Getting Spotify Credentials

1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Create a new app
3. Add redirect URI: `http://localhost:5000/api/auth/spotify/callback`
4. Copy Client ID and Client Secret to your `.env` file

## How It Works

### Mood Classification Algorithm

raken analyzes Spotify's audio features to classify tracks:

- **Happy**: High valence (positivity) + medium/high energy
- **Sad**: Low valence + low energy  
- **Chill**: Medium valence + low energy
- **Energetic**: High energy + fast tempo

### Audio Features Used

- **Valence**: Musical positivity (0.0 to 1.0)
- **Energy**: Intensity and power (0.0 to 1.0)
- **Tempo**: Beats per minute
- **Danceability**: How suitable for dancing (0.0 to 1.0)

## Project Structure

```
raken/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Main application pages
│   │   ├── lib/           # Utilities and configurations
│   │   └── types/         # TypeScript type definitions
│   └── index.html
├── server/                # Backend Express application
│   ├── index.ts          # Server entry point
│   ├── routes.ts         # API route definitions
│   └── storage.ts        # Database abstraction layer
├── shared/               # Shared types and schemas
│   └── schema.ts        # Database schema definitions
└── package.json
```

## API Endpoints

### Authentication
- `GET /api/auth/spotify` - Initiate Spotify OAuth
- `GET /api/auth/spotify/callback` - Handle OAuth callback
- `POST /api/auth/logout` - Logout user

### User & Playlists
- `GET /api/user` - Get current user
- `GET /api/playlists` - Get user playlists
- `GET /api/playlists/:id/tracks` - Get playlist tracks
- `POST /api/playlists` - Create manual playlist

### Tracks & Search
- `GET /api/search` - Search Spotify tracks
- `POST /api/playlists/:id/export` - Export playlist to Spotify

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run type-check` - Run TypeScript type checking
- `npm run lint` - Run ESLint

### Database Setup

The application uses Drizzle ORM with PostgreSQL. For development, you can use:

1. **Local PostgreSQL**
2. **Neon (Serverless)** - Recommended for easy setup
3. **In-memory storage** - Default for quick testing

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Spotify Web API](https://developer.spotify.com/documentation/web-api/) for music data
- [shadcn/ui](https://ui.shadcn.com/) for beautiful UI components
- [Radix UI](https://www.radix-ui.com/) for accessible primitives
- [TailwindCSS](https://tailwindcss.com/) for styling

## Support

If you like this project, please consider giving it a ⭐ on GitHub!

For questions or support, please open an issue on GitHub.
