# Docker & CI/CD Setup Guide

## Overview

Your Node.js application is now fully configured with Docker and GitHub Actions CI/CD. This document explains how everything works and how to use it.

## 📋 What's Included

### 1. **Dockerfile** (Multi-stage Build)
- Optimized production image
- Stages: Builder → Runtime
- Health checks included
- Minimal image size (~300-400MB)

### 2. **docker-compose.yml**
- Local development environment
- Node.js application container
- PostgreSQL database container
- Volume persistence for database
- Network configuration
- Health checks for reliability

### 3. **GitHub Actions Workflows**
- Automated testing on push/PR
- Docker image build and push
- Continuous deployment ready

### 4. **Helper Scripts**
- `docker-setup.sh` (Linux/Mac)
- `docker-setup.bat` (Windows)

---

## 🚀 Quick Start

### Option 1: Using Helper Script (Recommended for Windows)

Double-click `docker-setup.bat` and it will:
1. Check if Docker is installed
2. Verify Docker is running
3. Create `.env` file (if needed)
4. Start all services with `docker-compose up -d --build`

### Option 2: Manual Setup

```bash
# 1. Ensure Docker Desktop is running

# 2. Create environment file
copy .env.example .env

# 3. Start services
docker-compose up -d

# 4. View logs
docker-compose logs -f app
```

---

## 📁 File Structure Explanation

```
NodeJS/
├── Dockerfile                 # Multi-stage Docker build
├── docker-compose.yml         # Local development setup
├── .dockerignore              # Files to exclude from Docker
├── .env                       # Environment variables (created from .env.example)
├── .env.example               # Template for environment variables
├── docker-setup.sh            # Setup script for Linux/Mac
├── docker-setup.bat           # Setup script for Windows
├── .github/
│   └── workflows/
│       └── ci-cd.yml          # GitHub Actions CI/CD pipeline
└── [other application files]
```

---

## 🐳 Docker Concepts

### Docker Image vs Container

**Docker Image**: Blueprint (like a template)
- Built from Dockerfile
- Stored locally or in registry
- Reusable across multiple containers

**Docker Container**: Running instance (like a server)
- Created from image
- Has its own filesystem, network, processes
- Can be started/stopped/removed

### Multi-Stage Build

Your Dockerfile uses multi-stage build:

```
Stage 1 (Builder)                Stage 2 (Runtime)
├── FROM node:20                 ├── FROM node:20
├── npm install                  ├── npm install --production
└── npm run build          →      ├── COPY dist from builder
                                  └── Start app
Result: Smaller production image (~300MB vs 1GB+)
```

---

## 🔄 How CI/CD Works

### When You Push Code

```
1. Push to GitHub
        ↓
2. GitHub Actions triggered
        ↓
3. Jobs run:
   a) Build & Test
      - Install dependencies
      - Run linter
      - Build TypeScript
      - Run tests
   b) Build & Push Docker
      - Build Docker image
      - Push to GitHub Container Registry (ghcr.io)
   c) Deploy (on main branch)
      - Can trigger deployment
```

### GitHub Container Registry

Your Docker image is automatically pushed to:
```
ghcr.io/YOUR_USERNAME/YOUR_REPO:initBranch-latest
```

---

## 📊 Port Configuration

```
Your Machine          Docker Container
     ↓                      ↓
localhost:4001 ← Port Mapping → :4001 (Node.js App)
localhost:5432 ← Port Mapping → :5432 (PostgreSQL)
```

This means:
- Open `http://localhost:4001` on your browser to access the app
- Connect to database at `localhost:5432` from your machine
- Inside containers, database host is `db` (service name), not `localhost`

---

## 🛠️ Common Docker Commands

### View Running Containers
```bash
docker ps                  # Show running containers
docker ps -a              # Show all containers (running + stopped)
```

### View Images
```bash
docker images             # List all images
docker image rm IMAGE_ID  # Remove image
```

### View Logs
```bash
docker-compose logs -f app    # Follow app logs
docker-compose logs -f db     # Follow database logs
docker logs CONTAINER_ID      # Single container logs
```

### Stop/Start Services
```bash
docker-compose down           # Stop all services
docker-compose up -d          # Start all services
docker-compose restart        # Restart services
docker-compose down -v        # Stop & remove volumes (⚠️ deletes data)
```

### Rebuild Images
```bash
docker-compose up -d --build  # Rebuild and start
docker build -t myapp:latest . # Build single image
```

### Access Container
```bash
docker exec -it CONTAINER_ID bash  # Open shell in container
docker-compose exec app sh         # Shell in app container
```

---

## 📝 Environment Variables

Variables are read from `.env` file:

```env
# App Configuration
PORT=4001                    # App runs on this port
HOST=0.0.0.0                # Listen on all interfaces
NODE_ENV=development        # development|production|test

# Database Configuration
DB_HOST=db                   # "db" is service name in docker-compose
DB_PORT=5432               # PostgreSQL default port
DB_USER=postgres           # Database user
DB_PASSWORD=root           # Database password
DB_DATABASE=mobilestore    # Database name
DIALECT=postgres           # Database type (Sequelize)
```

**Important**: In Docker:
- Use `DB_HOST=db` (service name)
- NOT `DB_HOST=localhost`

**On your machine (outside Docker)**:
- Use `localhost` or `127.0.0.1`

---

## 🔍 Debugging

### App Won't Start?

1. Check logs:
```bash
docker-compose logs app
```

2. Check if port is in use:
```bash
netstat -ano | findstr :4001  # Windows
lsof -i :4001                 # Linux/Mac
```

3. Rebuild:
```bash
docker-compose down
docker-compose up -d --build
```

### Can't Connect to Database?

1. Ensure database is running:
```bash
docker-compose logs db
```

2. Check DB_HOST in `.env`:
```
DB_HOST=db  ✅ (inside Docker)
DB_HOST=localhost ❌ (wrong for Docker)
```

3. Check credentials:
```env
DB_USER=postgres
DB_PASSWORD=root
DB_DATABASE=mobilestore
```

### Volume Persistence Issues?

```bash
# View volumes
docker volume ls

# Inspect volume
docker volume inspect VOLUME_NAME

# Remove unused volumes
docker volume prune
```

---

## 🔐 Security Best Practices

1. **Never commit `.env` to git**
   - Already in `.gitignore` ✅

2. **Use strong passwords in `.env`**
   - Change `DB_PASSWORD=root` in production

3. **Don't use `latest` tag in production**
   - Use specific version: `node:20-alpine`

4. **Health Checks**
   - Already configured for both services ✅

5. **Network Isolation**
   - Containers on private network ✅

---

## 📦 Deployment Options

### Option 1: Docker Hub
```bash
docker tag myapp:latest username/myapp:latest
docker push username/myapp:latest
```

### Option 2: GitHub Container Registry (Current)
Already configured! Images pushed to `ghcr.io`

### Option 3: Cloud Deployment
- AWS ECS
- Google Cloud Run
- Azure Container Instances
- DigitalOcean App Platform

---

## ✅ Verification Checklist

After setup:

- [ ] Docker Desktop is running
- [ ] `.env` file exists with correct values
- [ ] `docker-compose up -d` completes successfully
- [ ] `docker-compose ps` shows 2 services running
- [ ] `curl http://localhost:4001` or browser returns your app
- [ ] Database connection works (check logs)
- [ ] GitHub Actions workflow configured
- [ ] Docker image builds on push

---

## 📚 Useful Resources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Node.js Docker Best Practices](https://nodejs.org/en/docs/guides/nodejs-docker-webapp/)

---

## 🆘 Getting Help

If you encounter issues:

1. Check logs: `docker-compose logs -f`
2. Verify Docker is running
3. Verify ports are available
4. Check `.env` file configuration
5. Review GitHub Actions workflow runs on GitHub
6. Check application-specific logs

---

## Next Steps

1. Push your code to GitHub
2. GitHub Actions will automatically:
   - Run tests
   - Build Docker image
   - Push to registry
3. Monitor workflow at: `https://github.com/YOUR_USERNAME/YOUR_REPO/actions`

---

Generated: December 2024
