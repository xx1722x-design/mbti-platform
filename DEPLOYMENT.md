# 🚀 MBTI 테스트 플랫폼 배포 가이드

## 도메인: https://www.moneygoldmedal.com

### 1. Vercel 배포 (추천)

#### 준비사항
```bash
# Vercel CLI 설치
npm install -g vercel

# 프로젝트 빌드 테스트
npm run build
```

#### 배포 단계
```bash
# 1. 프로젝트 디렉토리로 이동
cd mbti-contents-platform

# 2. Vercel 로그인
vercel login

# 3. 배포
vercel

# 4. 프로덕션 배포
vercel --prod
```

#### 도메인 연결
1. [Vercel 대시보드](https://vercel.com/dashboard) 접속
2. 프로젝트 선택 → **Settings** → **Domains**
3. `moneygoldmedal.com` 추가
4. DNS 설정 안내에 따라 도메인 설정

### 2. Netlify 배포

```bash
# 빌드
npm run build

# Netlify CLI 설치 및 배포
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

### 3. GitHub Pages 배포

```bash
# 1. GitHub에 코드 푸시
git add .
git commit -m "Deploy MBTI platform"
git push origin main

# 2. GitHub Pages 설정
# Repository → Settings → Pages → Source: Deploy from a branch
# Branch: main, Folder: / (root)

# 3. 커스텀 도메인 설정
# Pages 설정에서 Custom domain: moneygoldmedal.com
```

## 🔧 DNS 설정

### Vercel 사용 시:
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com

Type: A  
Name: @
Value: 76.76.19.61
```

### Netlify 사용 시:
```
Type: CNAME
Name: www
Value: your-site-name.netlify.app

Type: A
Name: @
Value: 75.2.60.5
```

## 📱 배포 후 확인사항

1. **HTTPS 인증서** 자동 발급 확인
2. **모바일 반응형** 테스트
3. **모든 라우트** 정상 작동 확인
4. **이미지 로딩** 확인
5. **공유 기능** 테스트

## 🛠️ 문제 해결

### 빌드 오류 시:
```bash
# 의존성 재설치
rm -rf node_modules package-lock.json
npm install

# 빌드 재시도
npm run build
```

### 도메인 연결 오류 시:
- DNS 전파 시간: 최대 24-48시간
- DNS 설정 확인: `nslookup moneygoldmedal.com`
- Vercel/Netlify 도메인 설정 재확인

## 📊 성능 최적화

- ✅ 이미지 최적화 (WebP 형식 권장)
- ✅ 코드 분할 (React.lazy 사용)
- ✅ 압축 (Gzip/Brotli)
- ✅ CDN 사용 (Vercel/Netlify 자동 제공)

## 🔒 보안 설정

- ✅ HTTPS 강제 리다이렉트
- ✅ 보안 헤더 설정
- ✅ CSP (Content Security Policy) 설정
