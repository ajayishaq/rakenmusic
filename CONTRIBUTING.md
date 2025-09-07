# Contributing to raken

Thank you for your interest in contributing to raken! This document provides guidelines and information for contributors.

## Getting Started

### Prerequisites
- Node.js 18 or higher
- npm or yarn package manager
- Git
- Spotify Developer Account (for testing)

### Development Setup

1. **Fork and clone the repository**
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
   # Fill in your Spotify credentials
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

## Project Structure

```
raken/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # UI components
│   │   ├── pages/         # Main pages
│   │   ├── lib/           # Utilities
│   │   └── types/         # TypeScript types
├── server/                # Express backend
│   ├── routes.ts         # API routes
│   └── storage.ts        # Data layer
├── shared/               # Shared code
│   └── schema.ts        # Database schemas
```

## Coding Standards

### TypeScript
- Use TypeScript for all new code
- Ensure proper type definitions
- Avoid `any` types when possible

### Code Style
- Use Prettier for code formatting
- Follow ESLint rules
- Use meaningful variable and function names
- Add JSDoc comments for complex functions

### Components
- Use functional components with hooks
- Follow the existing component structure
- Add proper TypeScript props interfaces
- Include `data-testid` attributes for testing

### Git Workflow

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Write clear, concise commit messages
   - Keep commits focused on a single change
   - Test your changes thoroughly

3. **Submit a pull request**
   - Provide a clear description of changes
   - Reference any related issues
   - Ensure all tests pass

## Types of Contributions

### Bug Fixes
- Check existing issues before creating new ones
- Provide detailed reproduction steps
- Include screenshots for UI bugs

### New Features
- Discuss major features in issues first
- Ensure features align with project goals
- Include proper documentation

### Documentation
- Improve README clarity
- Add code comments
- Update API documentation

### UI/UX Improvements
- Follow the Spotify-inspired dark theme
- Maintain consistency with existing design
- Ensure mobile responsiveness

## Spotify API Guidelines

When working with Spotify API:
- Respect rate limits
- Handle authentication errors gracefully
- Cache audio features when possible
- Follow Spotify's brand guidelines

## Mood Classification

If contributing to mood analysis:
- Base changes on audio feature research
- Test with diverse music genres
- Document algorithm changes
- Consider cultural music differences

## Testing

### Manual Testing
- Test authentication flow
- Verify playlist import/export
- Check mood classification accuracy
- Test responsive design

### Automated Testing
- Add unit tests for new functions
- Update integration tests as needed
- Ensure CI/CD pipeline passes

## Performance Considerations

- Optimize database queries
- Minimize API calls to Spotify
- Use proper caching strategies
- Consider bundle size impact

## Security Guidelines

- Never commit API keys or secrets
- Validate all user inputs
- Use proper authentication checks
- Follow OAuth best practices

## Code Review Process

1. **Self-review** your changes before submitting
2. **Address feedback** promptly and professionally
3. **Test thoroughly** after making changes
4. **Keep PRs focused** on a single feature/fix

## Release Process

Releases follow semantic versioning:
- **Major** (x.0.0): Breaking changes
- **Minor** (0.x.0): New features
- **Patch** (0.0.x): Bug fixes

## Getting Help

- Check existing issues and documentation
- Ask questions in discussions
- Join our community chat (if available)
- Tag maintainers for urgent issues

## Recognition

Contributors will be recognized:
- In the README contributors section
- In release notes for significant contributions
- Through GitHub's contribution tracking

## Code of Conduct

Be respectful and professional:
- Use inclusive language
- Be constructive in feedback
- Help newcomers get started
- Focus on the project's success

Thank you for contributing to raken! 🎵
