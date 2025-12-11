# Mobile Store Backend - Node.js Application

A comprehensive Node.js backend application with Docker and CI/CD integration.

## Features

- ✅ Express.js server with TypeScript
- ✅ PostgreSQL database integration
- ✅ Docker containerization with multi-stage builds
- ✅ Docker Compose for local development
- ✅ GitHub Actions CI/CD pipeline
- ✅ Automated testing and linting
- ✅ Docker image registry push to GitHub Container Registry

## Prerequisites

- Node.js 20.x or higher
- Docker Desktop (Windows/Mac) or Docker Engine (Linux)
- Git
- npm or yarn package manager

## Local Development Setup

### 1. Using Docker Compose (Recommended)

Clone the repository and navigate to the project directory:

```bash
git clone <your-repo-url>
cd NodeJS
```

Create a `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

Start the application with Docker Compose:

```bash
docker-compose up -d
```

Your application will be available at `http://localhost:4001`

The PostgreSQL database will be available at `localhost:5432`

### 2. Using Docker Commands

Build the Docker image:

```bash
docker build -t nodejs-app:latest .
```

Run the container:

```bash
docker run -d \
  --name nodejs_app \
  -p 4001:4001 \
  -e NODE_ENV=development \
  -e DB_HOST=<your-db-host> \
  -e DB_USER=postgres \
  -e DB_PASSWORD=root \
  -e DB_DATABASE=mobilestore \
  nodejs-app:latest
```

### 3. Local Development (Without Docker)

Install dependencies:

```bash
npm install
```

Build TypeScript:

```bash
npm run build
```

Start the development server:

```bash
npm run dev
```

## Available Commands

```bash
npm run build      # Build TypeScript to JavaScript
npm start          # Start the production server
npm run dev        # Start development server with hot reload
npm run lint       # Run ESLint
npm run lint:fix   # Fix linting issues
npm run db-migrate # Run database migrations
npm test           # Run tests with coverage
```

## Docker Commands

### Using Docker Compose

```bash
# Start services
docker-compose up -d

# View logs
docker-compose logs -f app

# Stop services
docker-compose down

# Remove volumes (careful - deletes database data)
docker-compose down -v

# Rebuild and restart
docker-compose up -d --build
```

### Using Docker CLI

```bash
# Build image
docker build -t nodejs-app:latest .

# Run container
docker run -d -p 4001:4001 --name nodejs_app nodejs-app:latest

# View logs
docker logs -f nodejs_app

# Stop container
docker stop nodejs_app

# Remove container
docker rm nodejs_app

# List containers
docker ps -a

# List images
docker images
```

## Environment Variables

Configure your application using environment variables. See `.env.example` for all available options:

```env
# Application
PORT=4001
HOST=0.0.0.0
NODE_ENV=development

# Database
DB_HOST=db
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=root
DB_DATABASE=mobilestore
DIALECT=postgres
```

## GitHub Actions CI/CD Pipeline

The project includes automated CI/CD workflows that:

1. **Build & Test**: Runs on every push and PR
   - Checks out code
   - Installs dependencies
   - Runs linter
   - Builds the project
   - Runs test suite

2. **Docker Build & Push**: Triggered after successful build
   - Builds Docker image
   - Pushes to GitHub Container Registry
   - Tags with branch name, commit SHA, and semantic versioning

3. **Deploy**: Automatic on main branch
   - Deploys latest image to local Docker

### GitHub Secrets Required

Add these secrets to your GitHub repository settings:

- `GITHUB_TOKEN`: Automatically available (for Container Registry)

## Docker Architecture

```
┌─────────────────────────────────────┐
│      Docker Compose Network         │
├─────────────────────────────────────┤
│                                     │
│  ┌──────────────────────────────┐  │
│  │   Node.js App Container      │  │
│  │   - Port: 4001               │  │
│  │   - Health Check: Enabled    │  │
│  └──────────────────────────────┘  │
│           ↓                          │
│  ┌──────────────────────────────┐  │
│  │  PostgreSQL Database         │  │
│  │   - Port: 5432               │  │
│  │   - Health Check: Enabled    │  │
│  │   - Persistent Volume        │  │
│  └──────────────────────────────┘  │
│                                     │
└─────────────────────────────────────┘
```

## Port Mapping

| Service | Internal Port | External Port |
|---------|---------------|---------------|
| Node.js App | 4001 | 4001 |
| PostgreSQL | 5432 | 5432 |

## Troubleshooting

### Application can't connect to database
- Ensure PostgreSQL service is running: `docker-compose logs db`
- Check DB_HOST is set to `db` (service name) in Docker
- Verify credentials in `.env` file

### Port already in use
```bash
# Find and kill process on port
lsof -i :4001
kill -9 <PID>

# Or use different port in docker-compose.yml
```

### Docker image build fails
```bash
# Clear Docker cache
docker system prune -a

# Rebuild
docker-compose up -d --build
```

### Logs are not visible
```bash
# View container logs
docker-compose logs -f app

# Check specific service logs
docker logs <container-name>
```

## Best Practices

1. **Always use `.env` file** for sensitive data (not committed to git)
2. **Use `docker-compose.yml`** for local development with all services
3. **Keep Dockerfile lean** using multi-stage builds (already implemented)
4. **Monitor container health** using health checks (configured)
5. **Use named volumes** for persistent data (PostgreSQL data)
6. **Build and test locally** before pushing to GitHub

## Security Considerations

- Never commit `.env` file to git
- Use environment variables for sensitive data
- Update Node.js base image regularly
- Use specific version tags for images
- Implement proper error handling (production ready)

## Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Express.js Documentation](https://expressjs.com/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

## Support

For issues or questions, please create an issue in the GitHub repository.
