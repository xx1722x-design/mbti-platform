# 🚀 Contabo 서버 배포 가이드

## **1단계: Contabo 서버 준비**

### **서버 요구사항**
- **OS**: Ubuntu 20.04 LTS 또는 22.04 LTS
- **RAM**: 최소 2GB (4GB 권장)
- **Storage**: 최소 20GB SSD
- **CPU**: 2 vCPU 이상

### **서버 설정**
```bash
# 서버 업데이트
sudo apt update && sudo apt upgrade -y

# 필수 패키지 설치
sudo apt install -y nginx certbot python3-certbot-nginx ufw curl wget git

# Nginx 시작 및 활성화
sudo systemctl start nginx
sudo systemctl enable nginx

# 방화벽 설정
sudo ufw allow 'Nginx Full'
sudo ufw allow ssh
sudo ufw --force enable
```

## **2단계: 프로젝트 파일 업로드**

### **방법 1: Git을 통한 업로드 (추천)**
```bash
# 프로젝트 클론
cd /var/www
sudo git clone https://github.com/xx1722x-design/mbti-platform.git
sudo mv mbti-platform moneygoldmedal.com
sudo chown -R www-data:www-data moneygoldmedal.com
```

### **방법 2: SCP를 통한 업로드**
```bash
# 로컬에서 실행
scp -r mbti-contents-platform/* root@YOUR_SERVER_IP:/var/www/moneygoldmedal.com/
```

### **방법 3: SFTP를 통한 업로드**
- FileZilla, WinSCP 등 사용
- 서버 IP, 사용자명, 비밀번호 입력
- `/var/www/moneygoldmedal.com/` 폴더에 업로드

## **3단계: Node.js 및 빌드 환경 설정**

```bash
# Node.js 설치 (NodeSource 저장소 사용)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# 프로젝트 디렉토리로 이동
cd /var/www/moneygoldmedal.com

# 의존성 설치
sudo npm install

# 프로덕션 빌드
sudo npm run build

# 권한 설정
sudo chown -R www-data:www-data /var/www/moneygoldmedal.com
sudo chmod -R 755 /var/www/moneygoldmedal.com
```

## **4단계: Nginx 설정**

```bash
# Nginx 설정 파일 생성
sudo nano /etc/nginx/sites-available/moneygoldmedal.com
```

**설정 파일 내용:**
```nginx
server {
    listen 80;
    server_name moneygoldmedal.com www.moneygoldmedal.com;
    
    root /var/www/moneygoldmedal.com/dist;
    index index.html;
    
    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
    
    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # Handle React Router
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
}
```

```bash
# 사이트 활성화
sudo ln -s /etc/nginx/sites-available/moneygoldmedal.com /etc/nginx/sites-enabled/

# 기본 사이트 비활성화
sudo rm /etc/nginx/sites-enabled/default

# Nginx 설정 테스트
sudo nginx -t

# Nginx 재시작
sudo systemctl restart nginx
```

## **5단계: SSL 인증서 설정**

```bash
# Let's Encrypt SSL 인증서 설치
sudo certbot --nginx -d moneygoldmedal.com -d www.moneygoldmedal.com

# 자동 갱신 설정
sudo crontab -e
# 다음 줄 추가:
# 0 12 * * * /usr/bin/certbot renew --quiet
```

## **6단계: 도메인 DNS 설정**

### **DNS 레코드 설정**
도메인 제공업체에서 다음 레코드 추가:

```
Type: A
Name: @
Value: YOUR_SERVER_IP

Type: A
Name: www
Value: YOUR_SERVER_IP

Type: CNAME
Name: *
Value: moneygoldmedal.com
```

## **7단계: 모니터링 및 백업 설정**

```bash
# 로그 로테이션 설정
sudo nano /etc/logrotate.d/moneygoldmedal.com
```

**로그 로테이션 설정:**
```
/var/log/nginx/moneygoldmedal.com.access.log {
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
```

```bash
# 백업 스크립트 생성
sudo nano /usr/local/bin/backup-site.sh
```

**백업 스크립트:**
```bash
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/var/backups/moneygoldmedal.com"
mkdir -p $BACKUP_DIR
tar -czf "$BACKUP_DIR/backup_$DATE.tar.gz" -C /var/www moneygoldmedal.com
find $BACKUP_DIR -name "backup_*.tar.gz" -mtime +7 -delete
```

```bash
# 백업 스크립트 실행 권한 부여
sudo chmod +x /usr/local/bin/backup-site.sh

# 매일 자동 백업 설정
sudo crontab -e
# 다음 줄 추가:
# 0 2 * * * /usr/local/bin/backup-site.sh
```

## **8단계: 성능 최적화**

```bash
# Nginx 성능 최적화
sudo nano /etc/nginx/nginx.conf
```

**성능 최적화 설정:**
```nginx
worker_processes auto;
worker_rlimit_nofile 65535;

events {
    worker_connections 4096;
    use epoll;
    multi_accept on;
}

http {
    sendfile on;
    tcp_nopush on;
    tcp_nodelay on;
    keepalive_timeout 65;
    types_hash_max_size 2048;
    client_max_body_size 16M;
    
    # 기존 설정들...
}
```

## **9단계: 보안 강화**

```bash
# Fail2ban 설치 (무차별 대입 공격 방지)
sudo apt install -y fail2ban

# SSH 보안 설정
sudo nano /etc/ssh/sshd_config
# PasswordAuthentication no (키 기반 인증만 허용)
# Port 2222 (기본 포트 변경)

# 방화벽 추가 설정
sudo ufw deny 22
sudo ufw allow 2222
sudo ufw reload
```

## **10단계: 배포 완료 확인**

```bash
# 사이트 상태 확인
curl -I https://moneygoldmedal.com

# SSL 인증서 확인
sudo certbot certificates

# Nginx 상태 확인
sudo systemctl status nginx

# 로그 확인
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

## **자동 배포 스크립트 사용**

배포 스크립트를 사용하려면:

```bash
# 스크립트 실행 권한 부여
sudo chmod +x deploy.sh

# 배포 실행
sudo ./deploy.sh
```

## **문제 해결**

### **사이트가 로드되지 않는 경우:**
1. Nginx 상태 확인: `sudo systemctl status nginx`
2. 설정 파일 문법 확인: `sudo nginx -t`
3. 포트 확인: `sudo netstat -tlnp | grep :80`

### **SSL 인증서 문제:**
1. Certbot 상태 확인: `sudo certbot certificates`
2. 인증서 갱신: `sudo certbot renew --dry-run`

### **권한 문제:**
1. 파일 소유자 확인: `ls -la /var/www/moneygoldmedal.com`
2. 권한 수정: `sudo chown -R www-data:www-data /var/www/moneygoldmedal.com`

## **성공! 🎉**

배포가 완료되면 `https://moneygoldmedal.com`에서 사이트에 접속할 수 있습니다!

다음 단계로 Google AdSense 연동과 결제 시스템 구축을 진행하세요.
