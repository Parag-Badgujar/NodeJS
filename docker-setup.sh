#!/bin/bash
# Docker Setup Script for Node.js Application
# This script helps you set up and run your application with Docker

set -e

echo "=========================================="
echo "Node.js Docker Setup"
echo "=========================================="

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker Desktop from https://www.docker.com/products/docker-desktop"
    exit 1
fi

echo "✅ Docker is installed"

# Check if Docker daemon is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker daemon is not running. Please start Docker Desktop."
    exit 1
fi

echo "✅ Docker daemon is running"

# Check if docker-compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed"
    exit 1
fi

echo "✅ Docker Compose is installed"

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file from .env.example"
    cp .env.example .env
    echo "✅ .env file created. Please update it with your configuration."
fi

echo ""
echo "=========================================="
echo "Starting Docker Compose..."
echo "=========================================="
echo ""

# Stop existing containers
echo "🛑 Stopping existing containers (if any)..."
docker-compose down --remove-orphans || true

# Build and start containers
echo "🔨 Building and starting containers..."
docker-compose up -d --build

echo ""
echo "=========================================="
echo "✅ Setup Complete!"
echo "=========================================="
echo ""
echo "Your application is now running!"
echo ""
echo "📍 Application URL: http://localhost:4001"
echo "📍 Database: localhost:5432"
echo ""
echo "Useful commands:"
echo "  • View logs:      docker-compose logs -f app"
echo "  • Stop services:  docker-compose down"
echo "  • Restart:        docker-compose restart"
echo "  • View DB logs:   docker-compose logs -f db"
echo ""
echo "=========================================="
