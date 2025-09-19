#!/bin/bash

# K-Test Platform Deployment Script for Contabo
# Usage: ./deploy.sh

set -e

echo "🚀 Starting K-Test Platform deployment..."

# Variables
DOMAIN="moneygoldmedal.com"
WEB_ROOT="/var/www/$DOMAIN"
BACKUP_DIR="/var/backups/$DOMAIN"
DATE=$(date +%Y%m%d_%H%M%S)

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if running as root
if [ "$EUID" -ne 0 ]; then
    print_error "Please run as root (use sudo)"
    exit 1
fi

# Create backup
print_status "Creating backup..."
mkdir -p $BACKUP_DIR
if [ -d "$WEB_ROOT" ]; then
    tar -czf "$BACKUP_DIR/backup_$DATE.tar.gz" -C /var/www $DOMAIN
    print_status "Backup created: $BACKUP_DIR/backup_$DATE.tar.gz"
fi

# Create web directory
print_status "Creating web directory..."
mkdir -p $WEB_ROOT

# Copy files (assuming dist folder exists)
if [ -d "dist" ]; then
    print_status "Copying files to web directory..."
    cp -r dist/* $WEB_ROOT/
    chown -R www-data:www-data $WEB_ROOT
    chmod -R 755 $WEB_ROOT
    print_status "Files copied successfully"
else
    print_error "dist folder not found. Please run 'npm run build' first"
    exit 1
fi

# Install/Update Nginx configuration
print_status "Installing Nginx configuration..."
cp nginx.conf /etc/nginx/sites-available/$DOMAIN
ln -sf /etc/nginx/sites-available/$DOMAIN /etc/nginx/sites-enabled/

# Test Nginx configuration
print_status "Testing Nginx configuration..."
nginx -t

if [ $? -eq 0 ]; then
    print_status "Nginx configuration is valid"
    
    # Reload Nginx
    print_status "Reloading Nginx..."
    systemctl reload nginx
    
    # Enable Nginx to start on boot
    systemctl enable nginx
    
    print_status "Nginx reloaded successfully"
else
    print_error "Nginx configuration test failed"
    exit 1
fi

# Install Certbot for SSL (if not already installed)
if ! command -v certbot &> /dev/null; then
    print_status "Installing Certbot..."
    apt update
    apt install -y certbot python3-certbot-nginx
fi

# Setup SSL certificate
print_status "Setting up SSL certificate..."
certbot --nginx -d $DOMAIN -d www.$DOMAIN --non-interactive --agree-tos --email admin@$DOMAIN

# Setup auto-renewal
print_status "Setting up SSL auto-renewal..."
(crontab -l 2>/dev/null; echo "0 12 * * * /usr/bin/certbot renew --quiet") | crontab -

# Setup log rotation
print_status "Setting up log rotation..."
cat > /etc/logrotate.d/$DOMAIN << EOF
/var/log/nginx/$DOMAIN.access.log {
    daily
    missingok
    rotate 52
    compress
    delaycompress
    notifempty
    create 644 www-data www-data
    postrotate
        systemctl reload nginx
    endscript
}
EOF

# Setup monitoring
print_status "Setting up basic monitoring..."
cat > /etc/systemd/system/k-test-monitor.service << EOF
[Unit]
Description=K-Test Platform Monitor
After=network.target

[Service]
Type=simple
User=www-data
ExecStart=/bin/bash -c 'while true; do curl -f http://localhost/ > /dev/null 2>&1 || echo "Site is down at \$(date)" >> /var/log/k-test-monitor.log; sleep 60; done'
Restart=always

[Install]
WantedBy=multi-user.target
EOF

systemctl daemon-reload
systemctl enable k-test-monitor
systemctl start k-test-monitor

# Setup firewall
print_status "Configuring firewall..."
ufw allow 'Nginx Full'
ufw allow ssh
ufw --force enable

# Final status check
print_status "Performing final status check..."
if curl -f https://$DOMAIN > /dev/null 2>&1; then
    print_status "✅ Deployment successful! Site is accessible at https://$DOMAIN"
else
    print_warning "⚠️  Site might not be accessible yet. SSL certificate may take a few minutes to propagate."
fi

print_status "🎉 K-Test Platform deployment completed!"
print_status "📊 Site URL: https://$DOMAIN"
print_status "📁 Web root: $WEB_ROOT"
print_status "📋 Nginx config: /etc/nginx/sites-available/$DOMAIN"
print_status "🔒 SSL certificate: Managed by Let's Encrypt"
print_status "📈 Monitoring: Enabled (check /var/log/k-test-monitor.log)"

echo ""
echo "Next steps:"
echo "1. Update DNS records to point to this server's IP"
echo "2. Test the website functionality"
echo "3. Setup Google Analytics and AdSense"
echo "4. Configure payment systems"
echo "5. Setup user management system"
