#!/bin/bash
set -e

echo "Deploying AI Club Website..."

# Build frontend first
echo "Building frontend..."
cd frontend
npm install
npm run build
cd ..

# Start containers
echo "Starting Docker containers..."
docker compose up -d --build

echo ""
echo "Done! Website running at:"
echo "   http://localhost"
echo "   Admin: http://localhost/admin (admin/admin123)"
echo ""
echo "View logs: docker compose logs -f"