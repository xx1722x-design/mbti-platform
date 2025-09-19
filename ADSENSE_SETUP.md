# 💰 Google AdSense 연동 가이드

## **1단계: Google AdSense 계정 생성**

### **AdSense 계정 신청**
1. [Google AdSense](https://www.google.com/adsense/) 접속
2. **"시작하기"** 클릭
3. Google 계정으로 로그인
4. **웹사이트 URL**: `https://moneygoldmedal.com` 입력
5. **국가/지역**: 대한민국 선택
6. **결제 수단**: 계좌 정보 입력

### **AdSense 정책 준수**
- **콘텐츠 정책**: 원본적이고 유용한 콘텐츠 제공
- **트래픽 정책**: 자연스러운 트래픽 확보
- **클릭 정책**: 자체 클릭 금지
- **페이지 수**: 최소 10페이지 이상 권장

## **2단계: AdSense 승인을 위한 사이트 준비**

### **필수 페이지 추가**
```bash
# 필수 페이지 생성
mkdir -p src/page/legal
```

**개인정보처리방침 페이지:**
```jsx
// src/page/legal/PrivacyPolicy.jsx
function PrivacyPolicy() {
  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>개인정보처리방침</h1>
      <p>K-TEST는 개인정보보호법에 따라 이용자의 개인정보 보호 및 권익을 보호하고자 다음과 같이 처리방침을 수립·공개합니다.</p>
      {/* 상세 내용 추가 */}
    </div>
  );
}
```

**이용약관 페이지:**
```jsx
// src/page/legal/TermsOfService.jsx
function TermsOfService() {
  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>이용약관</h1>
      <p>K-TEST 서비스 이용약관입니다.</p>
      {/* 상세 내용 추가 */}
    </div>
  );
}
```

### **사이트맵 생성**
```xml
<!-- public/sitemap.xml -->
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://moneygoldmedal.com/</loc>
    <lastmod>2025-01-27</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://moneygoldmedal.com/personalColor</loc>
    <lastmod>2025-01-27</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <!-- 추가 URL들 -->
</urlset>
```

### **robots.txt 생성**
```txt
# public/robots.txt
User-agent: *
Allow: /

Sitemap: https://moneygoldmedal.com/sitemap.xml
```

## **3단계: AdSense 코드 설정**

### **AdSense 계정에서 광고 단위 생성**

1. **AdSense 대시보드** → **광고** → **광고 단위**
2. **표시 광고** 선택
3. 광고 단위별 설정:

#### **상단 배너 (728x90)**
```
광고 단위 이름: Top Banner
광고 크기: 728x90 (리더보드)
반응형: 예
```

#### **사이드바 직사각형 (300x250)**
```
광고 단위 이름: Sidebar Rectangle
광고 크기: 300x250 (중간 직사각형)
반응형: 예
```

#### **하단 리더보드 (970x60)**
```
광고 단위 이름: Bottom Leaderboard
광고 크기: 970x60 (리더보드)
반응형: 예
```

### **광고 코드 업데이트**

AdSense에서 생성된 광고 코드를 다음 파일에 적용:

```jsx
// src/components/AdBanner.jsx
// 실제 광고 ID로 교체
data-ad-client="ca-pub-1234567890123456"  // 실제 발행자 ID
data-ad-slot="1234567890"                 // 실제 광고 슬롯 ID
```

```html
<!-- index.html -->
<!-- 실제 광고 ID로 교체 -->
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1234567890123456"
     crossorigin="anonymous"></script>
```

## **4단계: Google Analytics 설정**

### **Google Analytics 4 계정 생성**
1. [Google Analytics](https://analytics.google.com/) 접속
2. **측정 시작** 클릭
3. **속성 만들기**:
   - 속성 이름: `K-TEST`
   - 보고 시간대: `대한민국`
   - 통화: `대한민원 (KRW)`

### **데이터 스트림 설정**
1. **웹** 선택
2. **웹사이트 URL**: `https://moneygoldmedal.com`
3. **스트림 이름**: `K-TEST Website`
4. **측정 ID** 복사 (G-XXXXXXXXXX)

### **Analytics 코드 업데이트**
```html
<!-- index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

## **5단계: Google Search Console 설정**

### **속성 추가**
1. [Google Search Console](https://search.google.com/search-console/) 접속
2. **속성 추가** → **URL 접두어** 선택
3. **웹사이트 URL**: `https://moneygoldmedal.com` 입력
4. **소유권 확인**:
   - HTML 파일 업로드 방법 선택
   - 제공된 HTML 파일을 `/public/` 폴더에 업로드
   - 또는 HTML 태그 방법으로 메타 태그 추가

### **사이트맵 제출**
1. **색인** → **사이트맵** 메뉴
2. **새 사이트맵 추가**: `sitemap.xml`
3. **제출** 클릭

## **6단계: 광고 최적화**

### **광고 배치 최적화**
```jsx
// src/page/Main.jsx
// 광고 배치 추가
<AdBanner position="top" size="banner" />
<AdBanner position="inline" size="rectangle" />
<AdBanner position="bottom" size="leaderboard" />
```

### **광고 성능 모니터링**
```jsx
// src/components/AdBanner.jsx
// 광고 로드 이벤트 추가
useEffect(() => {
  try {
    (adsbygoogle = window.adsbygoogle || []).push({});
  } catch (e) {
    console.error('AdSense error:', e);
  }
}, []);
```

## **7단계: 수익 최적화 전략**

### **광고 배치 전략**
1. **상단 배너**: 메인 페이지 상단
2. **사이드바**: 테스트 목록 사이
3. **인라인**: 테스트 진행 중간
4. **하단**: 페이지 하단

### **콘텐츠 최적화**
1. **키워드 최적화**: SEO 친화적 콘텐츠
2. **사용자 참여도**: 테스트 완료율 향상
3. **페이지 체류 시간**: 관련 테스트 추천
4. **모바일 최적화**: 반응형 광고

### **트래픽 증가 전략**
1. **소셜 미디어**: 인스타그램, 페이스북, 트위터
2. **SEO**: 구글 검색 최적화
3. **인플루언서**: 심리테스트 관련 인플루언서 협업
4. **바이럴**: 공유 기능 강화

## **8단계: AdSense 승인 후 설정**

### **자동 광고 활성화**
1. AdSense 대시보드 → **광고** → **자동 광고**
2. **자동 광고 켜기** 활성화
3. 광고 유형 선택:
   - **표시 광고**: 체크
   - **인피드 광고**: 체크
   - **멀티플렉스 광고**: 체크

### **수익 최적화**
1. **광고 균형**: 사용자 경험과 수익의 균형
2. **A/B 테스트**: 다양한 광고 배치 테스트
3. **성능 분석**: Analytics 데이터 분석
4. **지속적 개선**: 사용자 피드백 반영

## **9단계: 모니터링 및 분석**

### **AdSense 대시보드 모니터링**
- **수익**: 일일/월간 수익 확인
- **페이지 RPM**: 페이지당 수익
- **클릭률**: 광고 클릭률
- **노출수**: 광고 노출 횟수

### **Analytics 분석**
- **사용자 행동**: 페이지 뷰, 체류 시간
- **트래픽 소스**: 유입 경로 분석
- **모바일 사용률**: 모바일 최적화 확인
- **이탈률**: 페이지 이탈률 분석

## **10단계: 문제 해결**

### **광고가 표시되지 않는 경우**
1. **AdSense 승인 상태** 확인
2. **광고 차단기** 비활성화
3. **광고 코드** 문법 확인
4. **도메인 연결** 확인

### **수익이 낮은 경우**
1. **트래픽 증가**: SEO, SNS 마케팅
2. **광고 배치 최적화**: A/B 테스트
3. **콘텐츠 품질 향상**: 사용자 참여도 증가
4. **모바일 최적화**: 모바일 사용자 증가

## **성공 지표**

### **AdSense 승인 기준**
- [ ] 사이트 완성도 80% 이상
- [ ] 원본 콘텐츠 제공
- [ ] 개인정보처리방침, 이용약관 페이지
- [ ] 사이트맵, robots.txt
- [ ] 일일 방문자 100명 이상 (권장)

### **수익 목표**
- **1개월**: $10-50
- **3개월**: $100-300
- **6개월**: $500-1000
- **1년**: $2000-5000

## **완료! 🎉**

Google AdSense 연동이 완료되면 수익 창출이 시작됩니다!

다음 단계로 결제 시스템 연동을 진행하세요.
