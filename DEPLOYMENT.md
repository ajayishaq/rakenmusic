# Deployment Guide for raken

This guide covers different deployment options for the raken application.

## Environment Variables

Ensure these environment variables are set in your deployment environment:

```env
SPOTIFY_CLIENT_ID=cfdf716fa6754de3921750d0777591c4
SPOTIFY_CLIENT_SECRET=98ab41d9eaee430da19abe36a048ab38
SPOTIFY_REDIRECT_URI=https://yourdomain.com/api/auth/spotify/callback
DATABASE_URL=your_postgresql_connection_string
NODE_ENV=production
PORT=5000
```

## Deployment Options

### 1. Replit (Current Setup)

The application is already configured for Replit deployment:

1. **Environment Variables**: Set in Replit Secrets tab
2. **Domain**: Use your Replit app domain for redirect URI
3. **Database**: Can use Neon PostgreSQL or Replit's built-in database

### 2. Vercel Deployment

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Environment Variables**: Set in Vercel dashboard
4. **Database**: Use Neon, PlanetScale, or Vercel Postgres

### 3. Netlify Deployment

1. **Build Settings**
   - Build command: `npm run build`
   - Publish directory: `dist`

2. **Environment Variables**: Set in Netlify dashboard

3. **Functions**: For API routes, use Netlify Functions or external API

### 4. Railway Deployment

1. **Connect GitHub Repository**
2. **Environment Variables**: Set in Railway dashboard
3. **Database**: Railway provides PostgreSQL addon

### 5. Heroku Deployment

1. **Create Heroku App**
   ```bash
   heroku create your-app-name
   ```

2. **Set Environment Variables**
   ```bash
   heroku config:set SPOTIFY_CLIENT_ID=cfdf716fa6754de3921750d0777591c4
heroku config:set SPOTIFY_CLIENT_SECRET=98ab41d9eaee430da19abe36a048ab38
heroku config:set SPOTIFY_REDIRECT_URI=https://your-app.herokuapp.com/api/auth/spotify/callback
   ```

3. **Add PostgreSQL**
   ```bash
   heroku addons:create heroku-postgresql:hobby-dev
   ```

4. **Deploy**
   ```bash
   git push heroku main
   ```

### 6. DigitalOcean App Platform

1. **Create App from GitHub**
2. **Configure Build Settings**
3. **Set Environment Variables**
4. **Add Database Component**

## Database Setup

### Neon (Recommended for Serverless)

1. Create account at [Neon](https://neon.tech)
2. Create new project
3. Copy connection string to `DATABASE_URL`

### Local PostgreSQL

1. **Install PostgreSQL**
2. **Create Database**
   ```sql
   CREATE DATABASE raken_db;
   ```
3. **Set Connection String**
   ```env
   DATABASE_URL=postgresql://username:password@localhost:5432/raken_db
   ```

## Spotify App Configuration

1. **Go to Spotify Developer Dashboard**
2. **Update Redirect URIs** with your production domain:
   - `https://yourdomain.com/api/auth/spotify/callback`
3. **Update App Settings** if needed

## Build Process

The application uses Vite for building:

```bash
# Install dependencies
npm install

# Build for production
npm run build

# Start production server
npm start
```

## Performance Optimization

### Frontend
- Static assets are served with caching headers
- Images are optimized and lazy-loaded
- Bundle is split for optimal loading

### Backend
- Database queries are optimized
- Spotify API responses are cached
- Session management is efficient

## Monitoring

### Health Checks
- API endpoint: `GET /api/health`
- Database connectivity check
- Spotify API availability check

### Logging
- Error tracking with proper error boundaries
- API request/response logging
- Performance monitoring

## Security Considerations

### Environment Variables
- Never commit secrets to repository
- Use secure secret management in production
- Rotate keys regularly

### Authentication
- Secure session management
- Proper OAuth implementation
- Token refresh handling

### API Security
- Rate limiting on endpoints
- Input validation and sanitization
- CORS configuration

## Troubleshooting

### Common Issues

1. **Spotify Authentication Fails**
   - Check redirect URI configuration
   - Verify client credentials
   - Ensure HTTPS in production

2. **Database Connection Issues**
   - Verify connection string format
   - Check firewall settings
   - Confirm database server is running

3. **Build Failures**
   - Clear node_modules and reinstall
   - Check Node.js version compatibility
   - Verify environment variables

### Debug Mode

Enable debug logging:
```env
NODE_ENV=development
DEBUG=raken:*
```

## Scaling Considerations

### Horizontal Scaling
- Application is stateless (except sessions)
- Database connection pooling
- Load balancer configuration

### Caching Strategy
- Redis for session storage
- CDN for static assets
- API response caching

## Backup and Recovery

### Database Backups
- Automated daily backups
- Point-in-time recovery
- Regular backup testing

### Application Data
- Environment variable backup
- Configuration management
- Disaster recovery plan

For additional support, please refer to the main README or open an issue on GitHub.
