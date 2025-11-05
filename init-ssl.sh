#!/bin/bash
set -e

echo "🔒 Setting up SSL for aiclub-bitsp..."

# Get SSL certificate
docker-compose run --rm certbot certonly \
    --webroot \
    --webroot-path=/var/www/certbot \
    --email admin@aiclub-bitsp \
    --agree-tos \
    --no-eff-email \
    -d aiclub-bitsp \
    -d www.aiclub-bitsp

echo "✅ SSL certificate obtained!"
echo "📝 Now edit nginx/nginx.conf:"
echo "   1. Comment out the HTTP location blocks"
echo "   2. Uncomment the HTTPS server block"
echo "   3. Uncomment the HTTP->HTTPS redirect"
echo "   4. Run: docker-compose restart nginx"