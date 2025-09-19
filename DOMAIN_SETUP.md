# 🌐 도메인 연결 및 SSL 설정 가이드

## **moneygoldmedal.com 도메인 설정**

### **1단계: DNS 레코드 설정**

도메인을 구매한 곳(가비아, 후이즈, GoDaddy, Namecheap 등)에서 다음 DNS 레코드를 추가하세요:

#### **A 레코드 (IPv4)**
```
Type: A
Name: @
Value: YOUR_CONTABO_SERVER_IP
TTL: 3600 (1시간)

Type: A
Name: www
Value: YOUR_CONTABO_SERVER_IP
TTL: 3600 (1시간)
```

#### **CNAME 레코드 (서브도메인)**
```
Type: CNAME
Name: api
Value: moneygoldmedal.com
TTL: 3600

Type: CNAME
Name: admin
Value: moneygoldmedal.com
TTL: 3600
```

#### **MX 레코드 (이메일, 선택사항)**
```
Type: MX
Name: @
Value: mail.moneygoldmedal.com
Priority: 10
TTL: 3600
```

### **2단계: DNS 전파 확인**

DNS 변경 후 전파를 확인하는 방법:

#### **온라인 도구 사용**
- [whatsmydns.net](https://www.whatsmydns.net)
- [dnschecker.org](https://dnschecker.org)
- 도메인: `moneygoldmedal.com` 입력
- 레코드 타입: `A` 선택
- 전 세계 DNS 서버에서 확인

#### **명령어로 확인**
```bash
# Windows (PowerShell)
nslookup moneygoldmedal.com
nslookup www.moneygoldmedal.com

# Linux/Mac
dig moneygoldmedal.com
dig www.moneygoldmedal.com
```

### **3단계: Contabo 서버에서 도메인 확인**

```bash
# 서버에서 도메인 확인
curl -H "Host: moneygoldmedal.com" http://localhost
curl -H "Host: www.moneygoldmedal.com" http://localhost

# Nginx 로그 확인
sudo tail -f /var/log/nginx/access.log
```

## **SSL 인증서 자동 설정**

### **Let's Encrypt SSL 인증서 설치**

```bash
# Certbot 설치 (이미 설치되어 있다면 생략)
sudo apt update
sudo apt install -y certbot python3-certbot-nginx

# SSL 인증서 발급
sudo certbot --nginx -d moneygoldmedal.com -d www.moneygoldmedal.com

# 인증서 발급 과정에서 이메일 입력 요구됨
# 동의 여부: Y 입력
# 이메일 수신 동의: Y 입력 (선택사항)
```

### **SSL 인증서 자동 갱신 설정**

```bash
# 자동 갱신 테스트
sudo certbot renew --dry-run

# 자동 갱신 cron 작업 추가
sudo crontab -e

# 다음 줄 추가:
0 12 * * * /usr/bin/certbot renew --quiet --post-hook "systemctl reload nginx"
```

### **SSL 강화 설정**

```bash
# Nginx SSL 설정 강화
sudo nano /etc/nginx/sites-available/moneygoldmedal.com
```

**SSL 강화 설정 추가:**
```nginx
server {
    listen 443 ssl http2;
    server_name moneygoldmedal.com www.moneygoldmedal.com;
    
    # SSL 인증서
    ssl_certificate /etc/letsencrypt/live/moneygoldmedal.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/moneygoldmedal.com/privkey.pem;
    
    # SSL 설정
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-SHA384;
    ssl_prefer_server_ciphers off;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;
    ssl_session_tickets off;
    
    # HSTS (HTTP Strict Transport Security)
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;
    
    # 기존 설정들...
}
```

## **도메인 연결 확인**

### **1. HTTP → HTTPS 리다이렉트 확인**
```bash
# HTTP 접속 시 HTTPS로 리다이렉트되는지 확인
curl -I http://moneygoldmedal.com
# 응답: 301 Moved Permanently
# Location: https://moneygoldmedal.com/
```

### **2. SSL 인증서 확인**
```bash
# SSL 인증서 정보 확인
openssl s_client -connect moneygoldmedal.com:443 -servername moneygoldmedal.com

# 인증서 만료일 확인
echo | openssl s_client -servername moneygoldmedal.com -connect moneygoldmedal.com:443 2>/dev/null | openssl x509 -noout -dates
```

### **3. 온라인 SSL 테스트**
- [SSL Labs](https://www.ssllabs.com/ssltest/) - A+ 등급 목표
- [SSL Checker](https://www.sslchecker.com/)
- [SSL Shopper](https://www.sslshopper.com/ssl-checker.html)

## **성능 최적화**

### **CDN 설정 (Cloudflare 추천)**

1. [Cloudflare](https://cloudflare.com) 가입
2. 도메인 추가: `moneygoldmedal.com`
3. DNS 레코드 설정:
   ```
   Type: A
   Name: @
   Value: YOUR_CONTABO_SERVER_IP
   Proxy: Proxied (오렌지 구름)
   
   Type: A
   Name: www
   Value: YOUR_CONTABO_SERVER_IP
   Proxy: Proxied (오렌지 구름)
   ```
4. SSL/TLS 설정: **Full (strict)**
5. Always Use HTTPS: **On**

### **Nginx 성능 최적화**

```bash
# Nginx 설정 최적화
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
    # 기존 설정들...
    
    # Gzip 압축
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types
        text/plain
        text/css
        text/xml
        text/javascript
        application/json
        application/javascript
        application/xml+rss
        application/atom+xml
        image/svg+xml;
    
    # 브라우저 캐싱
    map $sent_http_content_type $expires {
        default                    off;
        text/html                  epoch;
        text/css                   max;
        application/javascript     max;
        ~image/                    max;
    }
    
    expires $expires;
}
```

## **모니터링 설정**

### **Uptime 모니터링**

```bash
# Uptime 모니터링 스크립트 생성
sudo nano /usr/local/bin/uptime-monitor.sh
```

**모니터링 스크립트:**
```bash
#!/bin/bash
LOG_FILE="/var/log/uptime-monitor.log"
SITE_URL="https://moneygoldmedal.com"

# 사이트 상태 확인
if curl -f -s "$SITE_URL" > /dev/null; then
    echo "$(date): Site is UP" >> $LOG_FILE
else
    echo "$(date): Site is DOWN" >> $LOG_FILE
    # 알림 전송 (이메일, 슬랙 등)
    # mail -s "Site Down Alert" admin@moneygoldmedal.com < /dev/null
fi
```

```bash
# 실행 권한 부여
sudo chmod +x /usr/local/bin/uptime-monitor.sh

# 5분마다 모니터링
sudo crontab -e
# 다음 줄 추가:
# */5 * * * * /usr/local/bin/uptime-monitor.sh
```

## **보안 강화**

### **방화벽 설정**

```bash
# UFW 방화벽 설정
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow ssh
sudo ufw allow 'Nginx Full'
sudo ufw --force enable

# 방화벽 상태 확인
sudo ufw status verbose
```

### **Fail2ban 설정**

```bash
# Fail2ban 설치
sudo apt install -y fail2ban

# 설정 파일 생성
sudo nano /etc/fail2ban/jail.local
```

**Fail2ban 설정:**
```ini
[DEFAULT]
bantime = 3600
findtime = 600
maxretry = 3

[nginx-http-auth]
enabled = true
port = http,https
logpath = /var/log/nginx/error.log

[nginx-limit-req]
enabled = true
port = http,https
logpath = /var/log/nginx/error.log
maxretry = 10
```

```bash
# Fail2ban 시작
sudo systemctl enable fail2ban
sudo systemctl start fail2ban
```

## **완료 확인 체크리스트**

- [ ] DNS 레코드 설정 완료
- [ ] DNS 전파 확인 (24-48시간 소요)
- [ ] SSL 인증서 발급 완료
- [ ] HTTP → HTTPS 리다이렉트 작동
- [ ] www 서브도메인 작동
- [ ] SSL Labs 테스트 A+ 등급
- [ ] Cloudflare CDN 설정 (선택사항)
- [ ] 모니터링 시스템 구축
- [ ] 보안 설정 완료

## **문제 해결**

### **DNS 전파가 안 되는 경우**
1. TTL 값을 낮춰서 설정 (300초)
2. 다른 DNS 서버 사용 (Google DNS: 8.8.8.8)
3. 24-48시간 대기

### **SSL 인증서 발급 실패**
1. 도메인이 서버 IP로 올바르게 연결되었는지 확인
2. 80번 포트가 열려있는지 확인
3. 방화벽 설정 확인

### **사이트가 로드되지 않는 경우**
1. Nginx 상태 확인: `sudo systemctl status nginx`
2. 설정 파일 문법 확인: `sudo nginx -t`
3. 로그 확인: `sudo tail -f /var/log/nginx/error.log`

## **성공! 🎉**

도메인 연결이 완료되면 `https://moneygoldmedal.com`에서 사이트에 접속할 수 있습니다!

다음 단계로 Google AdSense 연동을 진행하세요.
