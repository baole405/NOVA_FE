# 🚀 NOVA - Digital Ocean VPS Deployment Guide

> **Hướng dẫn chi tiết deploy NOVA lên Digital Ocean VPS**  
> Backend (NestJS) + Frontend (Next.js) + PostgreSQL

---

## 📋 Mục Lục

1. [Tạo VPS trên Digital Ocean](#1-tạo-vps-trên-digital-ocean)
2. [Kết nối và Setup Server](#2-kết-nối-và-setup-server)
3. [Cài đặt Dependencies](#3-cài-đặt-dependencies)
4. [Setup PostgreSQL Database](#4-setup-postgresql-database)
5. [Deploy Backend (NestJS)](#5-deploy-backend-nestjs)
6. [Deploy Frontend (Next.js)](#6-deploy-frontend-nextjs)
7. [Setup Nginx Reverse Proxy](#7-setup-nginx-reverse-proxy)
8. [Setup Domain & SSL](#8-setup-domain--ssl)
9. [Environment Variables](#9-environment-variables)
10. [Monitoring & Maintenance](#10-monitoring--maintenance)

---

## 1. Tạo VPS trên Digital Ocean

### Bước 1.1: Đăng ký/Đăng nhập Digital Ocean

1. Truy cập: https://www.digitalocean.com/
2. Đăng ký account mới (có $200 credit cho 60 ngày)
3. Verify email và thêm payment method

### Bước 1.2: Tạo Droplet (VPS)

1. Click **"Create"** → **"Droplets"**
2. Chọn cấu hình:

```
Region: Singapore (gần Việt Nam nhất)
Image: Ubuntu 22.04 LTS x64
Droplet Size:
  - Basic Plan
  - Regular CPU
  - 2 GB RAM / 1 vCPU / 50 GB SSD ($12/month)
  (đủ cho MVP, scale sau nếu cần)

Authentication:
  - Chọn "SSH Key" (bảo mật hơn password)
  - Hoặc "Password" (đơn giản hơn)

Hostname: nova-production
```

3. **Nếu chọn SSH Key**:

```bash
# Trên máy local (Windows PowerShell):
ssh-keygen -t rsa -b 4096 -C "your-email@example.com"
# Lưu tại: C:\Users\YourName\.ssh\id_rsa

# Xem public key:
cat C:\Users\YourName\.ssh\id_rsa.pub
# Copy nội dung và paste vào Digital Ocean
```

4. Click **"Create Droplet"** → Đợi 1-2 phút

### Bước 1.3: Lấy IP Address

Sau khi tạo xong, bạn sẽ thấy:

```
Droplet Name: nova-production
IP Address: 157.245.xxx.xxx  (copy cái này)
```

---

## 2. Kết nối và Setup Server

### Bước 2.1: Kết nối SSH

**Nếu dùng Password:**

```bash
ssh root@157.245.xxx.xxx
# Nhập password đã tạo
```

**Nếu dùng SSH Key:**

```bash
ssh -i C:\Users\YourName\.ssh\id_rsa root@157.245.xxx.xxx
```

### Bước 2.2: Update System

```bash
# Update package list
apt update && apt upgrade -y

# Install essential tools
apt install -y curl wget git vim htop ufw
```

### Bước 2.3: Tạo User Non-Root (Bảo mật)

```bash
# Tạo user mới
adduser nova
# Nhập password, các field khác enter bỏ qua

# Add vào sudo group
usermod -aG sudo nova

# Copy SSH key sang user mới (nếu dùng SSH)
rsync --archive --chown=nova:nova ~/.ssh /home/nova

# Logout và login lại bằng user mới
exit
ssh nova@157.245.xxx.xxx
```

### Bước 2.4: Setup Firewall

```bash
# Cho phép SSH, HTTP, HTTPS
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw enable

# Check status
sudo ufw status
```

---

## 3. Cài đặt Dependencies

### Bước 3.1: Cài Node.js 20 LTS

```bash
# Install Node.js 20 via NodeSource
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Verify
node --version   # v20.x.x
npm --version    # 10.x.x

# Install PM2 (Process Manager)
sudo npm install -g pm2
```

### Bước 3.2: Cài PostgreSQL 16

```bash
# Add PostgreSQL repository
sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list'
wget -qO- https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo tee /etc/apt/trusted.gpg.d/pgdg.asc &>/dev/null

# Install PostgreSQL
sudo apt update
sudo apt install -y postgresql-16 postgresql-contrib-16

# Check status
sudo systemctl status postgresql
```

### Bước 3.3: Cài Nginx

```bash
sudo apt install -y nginx

# Start Nginx
sudo systemctl start nginx
sudo systemctl enable nginx

# Test: Mở browser vào http://157.245.xxx.xxx
# Sẽ thấy trang "Welcome to nginx!"
```

---

## 4. Setup PostgreSQL Database

### Bước 4.1: Tạo Database và User

```bash
# Switch to postgres user
sudo -u postgres psql

# Trong PostgreSQL console:
CREATE DATABASE nova_db;
CREATE USER nova_user WITH ENCRYPTED PASSWORD 'YourStrongPassword123!';
GRANT ALL PRIVILEGES ON DATABASE nova_db TO nova_user;

# Grant schema permissions
\c nova_db
GRANT ALL ON SCHEMA public TO nova_user;
ALTER DATABASE nova_db OWNER TO nova_user;

# Exit
\q
```

### Bước 4.2: Configure PostgreSQL để Accept Remote Connections (nếu cần)

```bash
# Edit postgresql.conf
sudo vim /etc/postgresql/16/main/postgresql.conf

# Tìm và sửa:
listen_addresses = 'localhost'  # OK cho internal connection

# Edit pg_hba.conf
sudo vim /etc/postgresql/16/main/pg_hba.conf

# Thêm vào cuối:
# TYPE  DATABASE        USER            ADDRESS                 METHOD
local   nova_db         nova_user                               md5
host    nova_db         nova_user       127.0.0.1/32            md5

# Restart PostgreSQL
sudo systemctl restart postgresql
```

### Bước 4.3: Test Connection

```bash
psql -U nova_user -d nova_db -h localhost
# Nhập password
# Nếu connect thành công, gõ \q để thoát
```

---

## 5. Deploy Backend (NestJS)

### Bước 5.1: Clone Repository

```bash
cd ~
git clone https://github.com/your-username/nova-be.git
cd nova-be
```

**Hoặc upload code từ local:**

```bash
# Trên máy local, từ thư mục nova-be:
scp -r ./* nova@157.245.xxx.xxx:~/nova-be/
```

### Bước 5.2: Setup Environment Variables

```bash
cd ~/nova-be

# Tạo file .env
vim .env
```

Paste nội dung sau (nhấn `i` để insert, `Esc` + `:wq` để save):

```env
# Database
DATABASE_URL=postgresql://nova_user:YourStrongPassword123!@localhost:5432/nova_db

# Server
NODE_ENV=production
PORT=4000
FRONTEND_URL=https://yourdomain.com

# JWT Secret (generate một chuỗi random dài)
NEON_AUTH_JWT_SECRET=your-super-long-secret-key-at-least-32-characters-long

# CORS
CORS_ORIGIN=https://yourdomain.com
```

### Bước 5.3: Install Dependencies và Build

```bash
npm install

# Push database schema
npm run db:push

# Seed data (optional, cho demo)
npm run db:seed

# Build production
npm run build
```

### Bước 5.4: Start Backend với PM2

```bash
# Start backend
pm2 start dist/main.js --name nova-backend

# Set PM2 to auto-start on reboot
pm2 startup
pm2 save

# Check status
pm2 status
pm2 logs nova-backend
```

**Test backend:**

```bash
curl http://localhost:4000/api
# Hoặc mở: http://157.245.xxx.xxx:4000/api/docs (nếu firewall mở port 4000)
```

---

## 6. Deploy Frontend (Next.js)

### Bước 6.1: Clone Repository

```bash
cd ~
git clone https://github.com/your-username/nova-fe.git
cd nova-fe
```

### Bước 6.2: Setup Environment Variables

```bash
vim .env.local
```

Paste:

```env
# Neon Auth
NEON_AUTH_BASE_URL=https://ep-mute-surf-a1zsmaaq.neonauth.ap-southeast-1.aws.neon.tech/neondb/auth

# Backend API URL (internal connection)
NEXT_PUBLIC_API_URL=http://localhost:4000/api
```

### Bước 6.3: Install và Build

```bash
npm install

# Build for production
npm run build
```

### Bước 6.4: Start Frontend với PM2

```bash
# Start Next.js production server
pm2 start npm --name nova-frontend -- start

# Save PM2 config
pm2 save

# Check status
pm2 status
pm2 logs nova-frontend
```

**Test frontend:**

```bash
curl http://localhost:3000
```

---

## 7. Setup Nginx Reverse Proxy

### Bước 7.1: Create Nginx Config

```bash
sudo vim /etc/nginx/sites-available/nova
```

Paste config này:

```nginx
# Backend API Server
upstream backend {
    server localhost:4000;
}

# Frontend Server
upstream frontend {
    server localhost:5000;
}

# Redirect HTTP to HTTPS (sẽ setup sau khi có SSL)
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    # Temporary: Allow access via HTTP for testing
    # Comment out these 2 lines after SSL setup:
    # return 301 https://$server_name$request_uri;

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

# HTTPS Server (enable after SSL setup)
# server {
#     listen 443 ssl http2;
#     server_name yourdomain.com www.yourdomain.com;
#
#     ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
#     ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;
#
#     # Frontend
#     location / {
#         proxy_pass http://frontend;
#         # ... same proxy settings as above
#     }
#
#     # Backend API
#     location /api {
#         proxy_pass http://backend;
#         # ... same proxy settings as above
#     }
# }
```

### Bước 7.2: Enable Site và Restart Nginx

```bash
# Create symlink
sudo ln -s /etc/nginx/sites-available/nova /etc/nginx/sites-enabled/

# Remove default site
sudo rm /etc/nginx/sites-enabled/default

# Test config
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
```

### Bước 7.3: Test

Mở browser: `http://157.245.xxx.xxx` → Sẽ thấy app NOVA!

---

## 8. Setup Domain & SSL

### Bước 8.1: Point Domain to VPS

1. Mua domain (ví dụ: namecheap.com, godaddy.com)
2. Vào DNS settings, thêm A Records:

```
Type    Name    Value               TTL
A       @       157.245.xxx.xxx     300
A       www     157.245.xxx.xxx     300
```

3. Đợi 5-30 phút để DNS propagate

### Bước 8.2: Install Certbot (Let's Encrypt SSL)

```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Follow prompts:
# - Enter email
# - Agree to terms
# - Redirect HTTP to HTTPS: Yes (2)
```

Certbot sẽ tự động:

- Tạo SSL certificate
- Update Nginx config
- Setup auto-renewal

### Bước 8.3: Verify SSL

Mở browser: `https://yourdomain.com` → Thấy 🔒 là OK!

### Bước 8.4: Update Frontend Environment

```bash
cd ~/nova-fe
vim .env.local
```

Update:

```env
# Backend API URL (use your domain)
NEXT_PUBLIC_API_URL=https://yourdomain.com/api
```

Rebuild và restart:

```bash
npm run build
pm2 restart nova-frontend
```

---

## 9. Environment Variables

### Backend (.env)

```env
# Database
DATABASE_URL=postgresql://nova_user:YourStrongPassword123!@localhost:5432/nova_db

# Server
NODE_ENV=production
PORT=3001
FRONTEND_URL=https://yourdomain.com

# JWT
NEON_AUTH_JWT_SECRET=your-super-long-secret-key-at-least-32-characters-long

# CORS
CORS_ORIGIN=https://yourdomain.com
```

### Frontend (.env.local)

```env
# Neon Auth
NEON_AUTH_BASE_URL=https://ep-mute-surf-a1zsmaaq.neonauth.ap-southeast-1.aws.neon.tech/neondb/auth

# Backend API
NEXT_PUBLIC_API_URL=https://yourdomain.com/api
```

---

## 10. Monitoring & Maintenance

### PM2 Commands

```bash
# List all processes
pm2 list

# View logs
pm2 logs

# Restart specific app
pm2 restart nova-backend
pm2 restart nova-frontend

# Stop app
pm2 stop nova-backend

# Delete app from PM2
pm2 delete nova-backend

# Monitor (real-time CPU, memory)
pm2 monit
```

### Update Code

```bash
# Backend
cd ~/nova-be
git pull origin main
npm install
npm run build
pm2 restart nova-backend

# Frontend
cd ~/nova-fe
git pull origin main
npm install
npm run build
pm2 restart nova-frontend
```

### Database Backup

```bash
# Create backup
pg_dump -U nova_user -h localhost nova_db > backup_$(date +%Y%m%d).sql

# Restore backup
psql -U nova_user -h localhost nova_db < backup_20260128.sql
```

### SSL Certificate Renewal

```bash
# Certbot auto-renews, test renewal:
sudo certbot renew --dry-run

# Force renew
sudo certbot renew
```

### Monitor Server Resources

```bash
# CPU, Memory, Disk
htop

# Disk usage
df -h

# Check Nginx logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

---

## 📝 Checklist Deployment

### Pre-deployment

- [ ] Code đã test kỹ trên local
- [ ] Database schema đã finalize
- [ ] Environment variables đã chuẩn bị
- [ ] Domain đã mua (hoặc dùng IP tạm)

### VPS Setup

- [ ] Tạo Droplet trên Digital Ocean
- [ ] Connect SSH thành công
- [ ] Tạo user non-root
- [ ] Setup firewall (UFW)
- [ ] Cài Node.js 20
- [ ] Cài PostgreSQL 16
- [ ] Cài Nginx

### Database

- [ ] Tạo database `nova_db`
- [ ] Tạo user `nova_user`
- [ ] Test connection thành công
- [ ] Push schema (`npm run db:push`)
- [ ] Seed data (`npm run db:seed`)

### Backend

- [ ] Clone/upload code
- [ ] Setup `.env` file
- [ ] `npm install` thành công
- [ ] `npm run build` thành công
- [ ] Start với PM2
- [ ] Test API: `curl http://localhost:3001/api`

### Frontend

- [ ] Clone/upload code
- [ ] Setup `.env.local` file
- [ ] `npm install` thành công
- [ ] `npm run build` thành công
- [ ] Start với PM2
- [ ] Test: `curl http://localhost:5000`

### Nginx

- [ ] Create config file
- [ ] Enable site
- [ ] Test config: `sudo nginx -t`
- [ ] Restart Nginx
- [ ] Access qua IP thành công

### Domain & SSL

- [ ] Point domain to VPS IP
- [ ] DNS propagated (check: `nslookup yourdomain.com`)
- [ ] Install Certbot
- [ ] Get SSL certificate
- [ ] Access qua HTTPS thành công

### Final Tests

- [ ] Login với Google OAuth hoạt động
- [ ] Dashboard load data từ backend
- [ ] Bills list hiển thị đúng
- [ ] Mark paid hoạt động
- [ ] Responsive trên mobile
- [ ] Performance OK (Lighthouse score)

---

## 🚨 Troubleshooting

### Lỗi: Cannot connect to database

```bash
# Check PostgreSQL status
sudo systemctl status postgresql

# Check logs
sudo tail -f /var/log/postgresql/postgresql-16-main.log

# Restart PostgreSQL
sudo systemctl restart postgresql
```

### Lỗi: PM2 app crashed

```bash
# View logs
pm2 logs nova-backend --lines 100

# Restart app
pm2 restart nova-backend

# Delete và start lại
pm2 delete nova-backend
cd ~/nova-be
pm2 start dist/main.js --name nova-backend
```

### Lỗi: Nginx 502 Bad Gateway

```bash
# Check PM2 apps đang chạy
pm2 status

# Check Nginx logs
sudo tail -f /var/log/nginx/error.log

# Restart Nginx
sudo systemctl restart nginx
```

### Lỗi: Cannot access via domain

```bash
# Check DNS propagation
nslookup yourdomain.com

# Check Nginx config
sudo nginx -t

# Check firewall
sudo ufw status
```

---

## 📚 Resources

- Digital Ocean Docs: https://docs.digitalocean.com/
- Nginx Docs: https://nginx.org/en/docs/
- PM2 Docs: https://pm2.keymetrics.io/docs/
- Let's Encrypt: https://letsencrypt.org/
- PostgreSQL Docs: https://www.postgresql.org/docs/

---

**🎉 Chúc bạn deploy thành công!**

Nếu gặp vấn đề, check logs:

- Backend: `pm2 logs nova-backend`
- Frontend: `pm2 logs nova-frontend`
- Nginx: `sudo tail -f /var/log/nginx/error.log`
