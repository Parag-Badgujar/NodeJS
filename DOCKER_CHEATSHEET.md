# Docker Commands Cheat Sheet

## Quick Start

```bash
# Windows
docker-setup.bat

# Linux/Mac
./docker-setup.sh

# Or manually
docker-compose up -d
```

## Docker Compose Commands

| Command | Description |
|---------|-------------|
| `docker-compose up -d` | Start all services in background |
| `docker-compose up -d --build` | Rebuild images and start |
| `docker-compose down` | Stop all services |
| `docker-compose restart` | Restart all services |
| `docker-compose ps` | Show running services |
| `docker-compose logs` | Show all logs |
| `docker-compose logs -f app` | Follow app logs |
| `docker-compose logs -f db` | Follow database logs |
| `docker-compose exec app bash` | Access app container shell |
| `docker-compose exec db psql -U postgres` | Access database |

## Docker Commands

| Command | Description |
|---------|-------------|
| `docker ps` | List running containers |
| `docker ps -a` | List all containers |
| `docker images` | List all images |
| `docker logs CONTAINER_ID` | View container logs |
| `docker logs -f CONTAINER_ID` | Follow container logs |
| `docker exec -it CONTAINER_ID bash` | Access container shell |
| `docker stop CONTAINER_ID` | Stop a container |
| `docker start CONTAINER_ID` | Start a container |
| `docker rm CONTAINER_ID` | Remove a container |
| `docker rmi IMAGE_ID` | Remove an image |
| `docker volume ls` | List volumes |
| `docker volume inspect VOLUME_NAME` | Inspect volume |
| `docker system prune -a` | Clean unused resources |

## Useful Combinations

```bash
# View everything
docker-compose ps
docker-compose logs

# Access database
docker-compose exec db psql -U postgres -d mobilestore

# View app logs only
docker-compose logs -f app

# Rebuild everything
docker-compose down
docker-compose up -d --build

# Clean and restart
docker system prune -a
docker-compose up -d --build

# Monitor resources
docker stats
```

## Environment Variables

Access these in docker-compose.yml or via:

```bash
docker-compose exec app env
docker-compose exec db env
```

## Networking

Services communicate via service names:
- App to DB: `DB_HOST=db` (NOT localhost)
- From your machine: `localhost:5432`

## Volume Management

```bash
# List volumes
docker volume ls

# Inspect volume
docker volume inspect nodejs_postgres_data

# Backup database
docker-compose exec db pg_dump -U postgres mobilestore > backup.sql

# Restore database
docker-compose exec -T db psql -U postgres mobilestore < backup.sql

# Remove volumes (WARNING: deletes data)
docker-compose down -v
```

## Debugging

```bash
# Check container health
docker-compose ps

# View detailed logs
docker-compose logs [service]

# Access container
docker-compose exec [service] bash

# Check port usage
netstat -ano | findstr :4001  # Windows
lsof -i :4001                  # Linux/Mac

# Inspect running container
docker inspect CONTAINER_ID

# View resource usage
docker stats
```

## Performance Optimization

```bash
# Use multi-stage builds (already in Dockerfile)
# Use .dockerignore to reduce context

# Cache layers effectively
docker-compose build --no-cache

# Use lightweight images
FROM node:20-alpine
```

## Security

```bash
# Run as non-root user (add to Dockerfile)
USER node

# Don't commit .env
# Use secrets in GitHub Actions

# Keep images updated
docker pull node:20-alpine
```

## Production vs Development

```bash
# Development (current setup)
docker-compose up -d
# Runs with: npm run dev
# Watches for changes
# Mounts volumes

# Production
docker build -t app:prod .
docker run -d -p 4001:4001 app:prod
# Runs with: npm start
# No volume mounts
# Optimized image
```

## GitHub Actions

```bash
# View workflow
cat .github/workflows/ci-cd.yml

# Check action runs
https://github.com/YOUR_USERNAME/YOUR_REPO/actions
```

## Useful Links

- Docker CLI Reference: https://docs.docker.com/reference/cli/docker/
- Docker Compose Reference: https://docs.docker.com/compose/compose-file/
- NodeJS with Docker: https://nodejs.org/en/docs/guides/nodejs-docker-webapp/
