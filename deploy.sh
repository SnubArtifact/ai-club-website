#!/bin/bash
set -e

echo "🚀 Deploying to aiclub-bitsp..."

# Build frontend
echo "📦 Building frontend..."
cd frontend
npm install
npm run build
cd ..

# Deploy with Docker
echo "🐳 Starting Docker services..."
docker-compose down
docker-compose up -d --build

# Wait for services to start
echo "⏳ Waiting for services..."
sleep 10

# Check status
docker-compose ps

echo "✅ Deployment complete!"
echo "🌐 Visit: http://aiclub-bitsp (HTTPS after SSL setup)"
echo "📊 Logs: docker-compose logs -f"