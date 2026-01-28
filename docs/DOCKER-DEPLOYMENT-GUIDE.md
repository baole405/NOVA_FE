# 🐳 NOVA - Docker Deployment Guide

> **Deploy NOVA lên VPS với Docker (PostgreSQL + Backend)**  
> Frontend chạy với PM2, Backend + DB chạy trong Docker

---

## 📋 Tổng quan

### Kiến trúc Deployment

```
Digital Ocean VPS
├── Docker Containers
│   ├── postgres:16-alpine (Internal: 5432)
│   └── nova-backend (Exposed: 4000)
├── PM2 (Host)
│   └── nova-frontend (Port: 5000)
└── Nginx (Reverse Proxy)
    ├── :80/:443 → Frontend (5000)
    └── :80/:443/api → Backend (4000)
```

### Ưu điểm

✅ **Consistency**: Dev và prod giống hệt nhau  
✅ **Easy Setup**: 1 lệnh deploy  
✅ **Easy Backup**: Backup volumes  
✅ **Easy Update**: Rebuild images  
✅ **Resource Isolation**: Container độc lập

---

## 🎯 Checklist Chuẩn bị

### Trên Local

- [ ] Code đã test kỹ trên local
- [ ] `.env.production` đã tạo và điền đầy đủ
- [ ] Domain đã mua (hoặc dùng IP tạm)
- [ ] SSH key đã tạo

### Trên VPS

- [ ] Tạo Droplet trên Digital Ocean
- [ ] Connect SSH thành công
- [ ] Install Docker & Docker Compose
- [ ] Install Node.js & PM2 (cho Frontend)
- [ ] Install Nginx
- [ ] Setup Firewall

---

## 📝 PART 1: Setup VPS

### Bước 1: Tạo VPS trên Digital Ocean

1. Truy cập: https://www.digitalocean.com/
2. Click **"Create"** → **"Droplets"**
3. Chọn cấu hình:

```
Region:    Singapore
Image:     Ubuntu 22.04 LTS x64
Plan:      Basic - 2 GB RAM / 1 vCPU / 50 GB SSD ($12/month)
Auth:      SSH Key (khuyến nghị) hoặc Password
Hostname:  nova-production
```

4. Lấy IP Address: `157.245.xxx.xxx`

### Bước 2: Kết nối SSH

```bash
# Trên Windows PowerShell
ssh root@157.245.xxx.xxx

# Hoặc với SSH key
ssh -i C:\Users\YourName\.ssh\id_rsa root@157.245.xxx.xxx
```

### Bước 3: Update System

```bash
# Update packages
apt update && apt upgrade -y

# Install essential tools
apt install -y curl wget git vim htop ufw
```

### Bước 4: Tạo User Non-Root

```bash
# Tạo user
adduser nova
# Nhập password

# Add sudo
usermod -aG sudo nova

# Copy SSH key (nếu dùng)
rsync --archive --chown=nova:nova ~/.ssh /home/nova

# Logout và login lại
exit
ssh nova@157.245.xxx.xxx
```

### Bước 5: Setup Firewall

```bash
# Allow SSH, HTTP, HTTPS
sudo ufw allow OpenSSH
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable

# Check status
sudo ufw status
```

---

## 🐳 PART 2: Install Docker

### Bước 1: Install Docker

```bash
# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Add user to docker group
sudo usermod -aG docker $USER
newgrp docker

# Verify
docker --version
```

### Bước 2: Install Docker Compose V2

```bash
# Docker Compose V2 (built-in plugin)
sudo apt install docker-compose-plugin -y

# Verify
docker compose version
```

### Bước 3: Test Docker

```bash
docker run hello-world
# Should see "Hello from Docker!"
```

---

## 📦 PART 3: Deploy Backend với Docker

### Bước 1: Clone Code

```bash
cd ~
git clone https://github.com/your-username/your-repo.git nova
cd nova

# Hoặc upload từ local:
# scp -r /path/to/nova nova@157.245.xxx.xxx:~/
```

### Bước 2: Setup Environment Variables

```bash
cd ~/nova

# Copy example file
cp .env.production.example .env.production

# Edit với vim hoặc nano
vim .env.production
```

Điền vào:

```env
# Database
DB_USER=nova_user
DB_PASSWORD=SuperStrongPassword123!XYZ
DB_NAME=nova_db

# JWT Secret (generate random)
JWT_SECRET=abc123xyz456...your-long-secret-key

# Frontend URL (sẽ update sau khi setup domain)
FRONTEND_URL=http://157.245.xxx.xxx:5000
```

**Generate JWT Secret:**

```bash
openssl rand -base64 32
```

### Bước 3: Build và Start Containers

```bash
# Build images
docker compose -f docker-compose.production.yml build

# Start services
docker compose -f docker-compose.production.yml up -d

# Check status
docker compose -f docker-compose.production.yml ps
```

Output:

```
NAME                   STATUS         PORTS
nova-postgres-prod     Up (healthy)   5432/tcp
nova-backend-prod      Up (healthy)   0.0.0.0:4000->4000/tcp
```

### Bước 4: Run Database Migrations

```bash
# Push schema to database
docker compose -f docker-compose.production.yml exec backend npm run db:push

# Seed data (optional, for demo)
docker compose -f docker-compose.production.yml exec backend npm run db:seed
```

### Bước 5: Test Backend

```bash
# Test API
curl http://localhost:4000/api

# View logs
docker compose -f docker-compose.production.yml logs -f backend
```

---

## 🎨 PART 4: Deploy Frontend với PM2

### Bước 1: Install Node.js & PM2

```bash
# Install Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Verify
node --version  # v20.x.x

# Install PM2
sudo npm install -g pm2
```

### Bước 2: Setup Frontend

```bash
cd ~/nova/nova-fe

# Install dependencies
npm install

# Create .env.local
cat > .env.local << EOF
# Neon Auth
NEON_AUTH_BASE_URL=https://ep-mute-surf-a1zsmaaq.neonauth.ap-southeast-1.aws.neon.tech/neondb/auth

# Backend API (internal connection)
NEXT_PUBLIC_API_URL=http://localhost:4000/api
EOF

# Build production
npm run build
```

### Bước 3: Start Frontend với PM2

```bash
# Start Next.js
pm2 start npm --name nova-frontend -- start

# Save PM2 config
pm2 save

# Auto-start on reboot
pm2 startup
# Copy and run the command shown

# Check status
pm2 status
pm2 logs nova-frontend
```

---

## 🌐 PART 5: Setup Nginx Reverse Proxy

### Bước 1: Install Nginx

```bash
sudo apt install -y nginx

# Start and enable
sudo systemctl start nginx
sudo systemctl enable nginx
```

### Bước 2: Create Nginx Config

```bash
sudo vim /etc/nginx/sites-available/nova
```

Paste config:

```nginx
# Backend API
upstream backend {
    server localhost:4000;
}

# Frontend
upstream frontend {
    server localhost:5000;
}

# HTTP Server
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    # Or use IP: server_name 157.245.xxx.xxx;

    client_max_body_size 10M;

    # Frontend
    location / {
        proxy_pass http://frontend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Backend API
    location /api {
        proxy_pass http://backend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### Bước 3: Enable Site

```bash
# Create symlink
sudo ln -s /etc/nginx/sites-available/nova /etc/nginx/sites-enabled/

# Remove default
sudo rm /etc/nginx/sites-enabled/default

# Test config
sudo nginx -t

# Restart
sudo systemctl restart nginx
```

### Bước 4: Test Access

Mở browser: `http://157.245.xxx.xxx` → Thấy app NOVA! 🎉

---

## 🔒 PART 6: Setup Domain & SSL (Optional)

### Bước 1: Point Domain to VPS

Vào DNS settings của domain, thêm A Records:

```
Type    Name    Value               TTL
A       @       157.245.xxx.xxx     300
A       www     157.245.xxx.xxx     300
```

Đợi 5-30 phút để DNS propagate.

### Bước 2: Install Certbot

```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Follow prompts:
# - Email
# - Agree to terms
# - Redirect HTTP to HTTPS: Yes (2)
```

### Bước 3: Update Environment Variables

```bash
# Update .env.production
cd ~/nova
vim .env.production
```

Sửa:

```env
FRONTEND_URL=https://yourdomain.com
```

Rebuild backend:

```bash
docker compose -f docker-compose.production.yml down
docker compose -f docker-compose.production.yml up -d --build
```

Update frontend:

```bash
cd ~/nova/nova-fe
vim .env.local
```

Sửa:

```env
NEXT_PUBLIC_API_URL=https://yourdomain.com/api
```

Rebuild và restart:

```bash
npm run build
pm2 restart nova-frontend
```

---

## 🔧 PART 7: Useful Commands

### Docker Commands

```bash
# View all containers
docker compose -f docker-compose.production.yml ps

# View logs
docker compose -f docker-compose.production.yml logs -f
docker compose -f docker-compose.production.yml logs -f backend
docker compose -f docker-compose.production.yml logs -f postgres

# Restart services
docker compose -f docker-compose.production.yml restart backend
docker compose -f docker-compose.production.yml restart postgres

# Stop all
docker compose -f docker-compose.production.yml down

# Start all
docker compose -f docker-compose.production.yml up -d

# Rebuild backend
docker compose -f docker-compose.production.yml up -d --build backend

# Execute command in container
docker compose -f docker-compose.production.yml exec backend npm run db:push
docker compose -f docker-compose.production.yml exec postgres psql -U nova_user -d nova_db
```

### PM2 Commands

```bash
# List processes
pm2 list

# View logs
pm2 logs nova-frontend

# Restart
pm2 restart nova-frontend

# Stop
pm2 stop nova-frontend

# Delete
pm2 delete nova-frontend

# Monitor (CPU, memory)
pm2 monit
```

### Nginx Commands

```bash
# Test config
sudo nginx -t

# Restart
sudo systemctl restart nginx

# Reload (no downtime)
sudo systemctl reload nginx

# View logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

---

## 🔄 PART 8: Update Code (CI/CD)

### Manual Update

```bash
# 1. Pull latest code
cd ~/nova
git pull origin main

# 2. Update Backend (Docker)
docker compose -f docker-compose.production.yml up -d --build backend

# 3. Run migrations if needed
docker compose -f docker-compose.production.yml exec backend npm run db:push

# 4. Update Frontend
cd ~/nova/nova-fe
npm install
npm run build
pm2 restart nova-frontend

# 5. Verify
pm2 logs nova-frontend
docker compose -f docker-compose.production.yml logs -f backend
```

### Quick Deploy Script

```bash
# Make deploy.sh executable
chmod +x ~/nova/deploy.sh

# Run deployment
cd ~/nova
./deploy.sh
```

---

## 💾 PART 9: Database Backup

### Manual Backup

```bash
# Create backup directory
mkdir -p ~/nova/backups

# Backup database
docker compose -f docker-compose.production.yml exec -T postgres \
  pg_dump -U nova_user nova_db > ~/nova/backups/backup_$(date +%Y%m%d_%H%M%S).sql

# Compress
gzip ~/nova/backups/backup_$(date +%Y%m%d_%H%M%S).sql
```

### Automated Backup (Cron)

```bash
# Create backup script
cat > ~/nova/backup.sh << 'EOF'
#!/bin/bash
BACKUP_DIR=~/nova/backups
DATE=$(date +%Y%m%d_%H%M%S)
cd ~/nova
docker compose -f docker-compose.production.yml exec -T postgres \
  pg_dump -U nova_user nova_db | gzip > $BACKUP_DIR/backup_$DATE.sql.gz

# Keep only last 7 days
find $BACKUP_DIR -name "backup_*.sql.gz" -mtime +7 -delete
EOF

chmod +x ~/nova/backup.sh

# Add to crontab (daily at 2 AM)
crontab -e
# Add: 0 2 * * * ~/nova/backup.sh
```

### Restore Backup

```bash
# Restore from backup
gunzip -c ~/nova/backups/backup_20260128_020000.sql.gz | \
  docker compose -f docker-compose.production.yml exec -T postgres \
  psql -U nova_user -d nova_db
```

---

## 🚨 Troubleshooting

### Backend không start

```bash
# Check logs
docker compose -f docker-compose.production.yml logs backend

# Common issues:
# 1. Database not ready → Wait for postgres healthcheck
# 2. Port 4000 already in use → Change port in .env.production
# 3. Environment variables missing → Check .env.production

# Restart backend
docker compose -f docker-compose.production.yml restart backend
```

### PostgreSQL không kết nối được

```bash
# Check postgres is running
docker compose -f docker-compose.production.yml ps postgres

# Check logs
docker compose -f docker-compose.production.yml logs postgres

# Test connection
docker compose -f docker-compose.production.yml exec postgres \
  psql -U nova_user -d nova_db -c "SELECT version();"
```

### Frontend không load data

```bash
# Check PM2 logs
pm2 logs nova-frontend

# Check environment variables
cat ~/nova/nova-fe/.env.local

# Make sure NEXT_PUBLIC_API_URL is correct
# Should be: http://localhost:4000/api (internal)
# Or: https://yourdomain.com/api (with domain)

# Restart frontend
pm2 restart nova-frontend
```

### Nginx 502 Bad Gateway

```bash
# Check backend is running
curl http://localhost:4000/api

# Check frontend is running
curl http://localhost:5000

# Check Nginx config
sudo nginx -t

# Check Nginx logs
sudo tail -f /var/log/nginx/error.log

# Restart Nginx
sudo systemctl restart nginx
```

---

## 📊 Monitoring

### Resource Usage

```bash
# System resources
htop

# Docker stats
docker stats

# Disk usage
df -h

# Container logs size
docker compose -f docker-compose.production.yml ps -q | xargs docker inspect --format='{{.Name}} {{.LogPath}}' | xargs -n2 sh -c 'du -sh $1'
```

### Health Checks

```bash
# Backend health
curl http://localhost:4000/api

# Database health
docker compose -f docker-compose.production.yml exec postgres \
  pg_isready -U nova_user -d nova_db

# Frontend health
curl http://localhost:5000
```

---

## 🎉 Deployment Complete!

**Your NOVA app is now running on:**

- Frontend: http://yourdomain.com (hoặc http://your-vps-ip)
- Backend API: http://yourdomain.com/api
- Database: Internal (trong Docker network)

**Next Steps:**

1. ✅ Test login với Google OAuth
2. ✅ Test các chức năng chính
3. ✅ Setup backup automation
4. ✅ Setup monitoring (optional: Prometheus, Grafana)
5. ✅ Setup alerts (optional: email/Slack)

**Useful Links:**

- Swagger API: http://yourdomain.com/api/docs (nếu enable trong production)
- PM2 Web UI: `pm2 web` → http://your-vps-ip:9615

---

**Need help?** Check logs:

```bash
# Backend
docker compose -f docker-compose.production.yml logs -f backend

# Frontend
pm2 logs nova-frontend

# Nginx
sudo tail -f /var/log/nginx/error.log
```
