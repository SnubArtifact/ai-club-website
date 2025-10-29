#!/bin/bash
set -e

echo "🏗️  Building AI Club Website Frontend..."

cd frontend

echo "📦 Installing dependencies..."
npm install

echo "🔨 Building production bundle..."
npm run build

echo "✅ Frontend build complete!"
echo "📂 Output directory: frontend/dist"
echo ""
echo "To test locally:"
echo "  cd frontend/dist"
echo "  npx serve -s ."