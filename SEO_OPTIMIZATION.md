# 🔍 SEO 최적화 가이드

## **1단계: 메타데이터 최적화**

### **페이지별 메타데이터 설정**
```jsx
// src/page/Main.jsx
import SEOHead from '../components/SEOHead';

function Main() {
  return (
    <>
      <SEOHead
        title="K-TEST - 나를 알아가는 재미있는 심리테스트"
        description="정확하고 재미있는 심리테스트로 나만의 성격을 발견해보세요. MBTI, 연애, AI, 사주 등 다양한 카테고리의 테스트를 제공합니다."
        keywords="심리테스트, MBTI, 성격테스트, 연애테스트, AI테스트, 사주, 퍼스널컬러, 무료테스트"
        url="https://moneygoldmedal.com"
      />
      {/* 페이지 내용 */}
    </>
  );
}
```

### **테스트별 메타데이터**
```jsx
// src/page/Test.jsx
function Test() {
  const testMeta = {
    personalColor: {
      title: "퍼스널 컬러 테스트 - 나에게 어울리는 컬러는?",
      description: "나만의 퍼스널 컬러를 찾아보세요. MBTI 기반의 정확한 컬러 진단으로 스타일링에 도움을 드립니다.",
      keywords: "퍼스널컬러, 컬러진단, MBTI, 스타일링, 패션, 색상테스트"
    },
    loveStyle: {
      title: "연애 스타일 테스트 - 나의 연애 유형은?",
      description: "나만의 연애 스타일을 알아보고 이상적인 연인을 찾아보세요. 과학적 근거에 기반한 연애 테스트입니다.",
      keywords: "연애테스트, 연애스타일, 연애유형, 연인, 데이트, 커플테스트"
    }
  };

  return (
    <>
      <SEOHead
        title={testMeta[testName]?.title || "심리테스트"}
        description={testMeta[testName]?.description || "재미있는 심리테스트"}
        keywords={testMeta[testName]?.keywords || "심리테스트"}
        url={`https://moneygoldmedal.com/${testName}`}
      />
      {/* 테스트 내용 */}
    </>
  );
}
```

## **2단계: 구조화된 데이터 (Schema.org)**

### **웹사이트 스키마**
```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "K-TEST",
  "url": "https://moneygoldmedal.com",
  "description": "정확하고 재미있는 심리테스트로 나만의 성격을 발견해보세요",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://moneygoldmedal.com/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  },
  "publisher": {
    "@type": "Organization",
    "name": "K-TEST",
    "url": "https://moneygoldmedal.com",
    "logo": {
      "@type": "ImageObject",
      "url": "https://moneygoldmedal.com/logo.png"
    }
  }
}
```

### **심리테스트 스키마**
```json
{
  "@context": "https://schema.org",
  "@type": "Quiz",
  "name": "퍼스널 컬러 테스트",
  "description": "나에게 어울리는 컬러는 무엇일까?",
  "url": "https://moneygoldmedal.com/personalColor",
  "author": {
    "@type": "Organization",
    "name": "K-TEST"
  },
  "datePublished": "2025-01-27",
  "dateModified": "2025-01-27",
  "inLanguage": "ko-KR",
  "isAccessibleForFree": true,
  "educationalLevel": "beginner",
  "learningResourceType": "quiz",
  "timeRequired": "PT5M"
}
```

### **FAQ 스키마**
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "K-TEST는 무료인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "네, K-TEST의 모든 테스트는 무료로 이용하실 수 있습니다. 프리미엄 구독을 통해 추가 기능을 이용하실 수 있습니다."
      }
    },
    {
      "@type": "Question",
      "name": "테스트 결과는 정확한가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "K-TEST의 모든 테스트는 심리학적 근거에 기반하여 개발되었으며, 정확한 결과를 제공하기 위해 지속적으로 개선하고 있습니다."
      }
    }
  ]
}
```

## **3단계: 사이트맵 최적화**

### **동적 사이트맵 생성**
```javascript
// server/routes/sitemap.js
const express = require('express');
const router = express.Router();

router.get('/sitemap.xml', async (req, res) => {
  try {
    const tests = await Test.find({ isActive: true });
    const categories = ['characteristic', 'love', 'aiSimulation', 'sajuPlus', 'promotion'];
    
    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

    // 메인 페이지
    sitemap += `
  <url>
    <loc>https://moneygoldmedal.com/</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>`;

    // 테스트 페이지들
    tests.forEach(test => {
      sitemap += `
  <url>
    <loc>https://moneygoldmedal.com/${test.mainUrl}</loc>
    <lastmod>${test.updatedAt.toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`;
    });

    // 카테고리 페이지들
    categories.forEach(category => {
      sitemap += `
  <url>
    <loc>https://moneygoldmedal.com/category/${category}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
    });

    sitemap += `
</urlset>`;

    res.set('Content-Type', 'application/xml');
    res.send(sitemap);
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate sitemap' });
  }
});

module.exports = router;
```

## **4단계: 페이지 속도 최적화**

### **이미지 최적화**
```jsx
// src/components/OptimizedImage.jsx
import { useState } from 'react';

function OptimizedImage({ src, alt, width, height, ...props }) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div style={{ position: 'relative', width, height }}>
      {!loaded && !error && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: '#f0f0f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          로딩 중...
        </div>
      )}
      
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        style={{
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.3s ease',
          ...props.style
        }}
        loading="lazy"
        {...props}
      />
    </div>
  );
}

export default OptimizedImage;
```

### **코드 분할 (Code Splitting)**
```jsx
// src/App.jsx
import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// 지연 로딩
const Main = lazy(() => import('./page/Main.jsx'));
const Test = lazy(() => import('./page/Test.jsx'));
const TestResult = lazy(() => import('./page/TestResult.jsx'));

function App() {
  return (
    <Router>
      <Suspense fallback={<div>로딩 중...</div>}>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/:testName" element={<Test />} />
          <Route path="/:testName/result/:resultType" element={<TestResult />} />
        </Routes>
      </Suspense>
    </Router>
  );
}
```

## **5단계: 내부 링크 최적화**

### **관련 테스트 추천**
```jsx
// src/components/RelatedTests.jsx
function RelatedTests({ currentTest, tests }) {
  const relatedTests = tests
    .filter(test => 
      test.info.category === currentTest.info.category && 
      test.info.mainUrl !== currentTest.info.mainUrl
    )
    .slice(0, 3);

  return (
    <div style={{ marginTop: '40px' }}>
      <h3 style={{ marginBottom: '20px', color: '#333' }}>
        관련 테스트
      </h3>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '20px'
      }}>
        {relatedTests.map(test => (
          <Link
            key={test.info.mainUrl}
            to={`/${test.info.mainUrl}`}
            style={{
              textDecoration: 'none',
              color: 'inherit'
            }}
          >
            <div style={{
              backgroundColor: 'white',
              borderRadius: '10px',
              padding: '20px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
              transition: 'transform 0.3s ease'
            }}>
              <h4 style={{ marginBottom: '10px' }}>
                {test.info.mainTitle}
              </h4>
              <p style={{ fontSize: '14px', color: '#666' }}>
                {test.info.subTitle}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
```

## **6단계: 콘텐츠 최적화**

### **키워드 최적화**
```jsx
// src/page/Main.jsx
function Main() {
  return (
    <div>
      {/* 헤더 섹션 - 주요 키워드 포함 */}
      <header>
        <h1>K-TEST - 나를 알아가는 재미있는 심리테스트</h1>
        <p>
          정확하고 재미있는 심리테스트로 나만의 성격을 발견해보세요. 
          MBTI, 연애, AI, 사주 등 다양한 카테고리의 테스트를 제공합니다.
        </p>
      </header>

      {/* 카테고리별 섹션 - 롱테일 키워드 포함 */}
      <section>
        <h2>성격 테스트</h2>
        <p>
          MBTI 성격 유형 검사와 퍼스널 컬러 테스트를 통해 
          나만의 성격 특성을 정확하게 파악해보세요.
        </p>
      </section>

      <section>
        <h2>연애 테스트</h2>
        <p>
          연애 스타일 테스트와 커플 궁합 테스트로 
          이상적인 연인과의 관계를 알아보세요.
        </p>
      </section>
    </div>
  );
}
```

### **FAQ 섹션 추가**
```jsx
// src/components/FAQ.jsx
function FAQ() {
  const faqs = [
    {
      question: "K-TEST는 무료인가요?",
      answer: "네, K-TEST의 모든 테스트는 무료로 이용하실 수 있습니다. 프리미엄 구독을 통해 추가 기능을 이용하실 수 있습니다."
    },
    {
      question: "테스트 결과는 정확한가요?",
      answer: "K-TEST의 모든 테스트는 심리학적 근거에 기반하여 개발되었으며, 정확한 결과를 제공하기 위해 지속적으로 개선하고 있습니다."
    },
    {
      question: "테스트 결과를 저장할 수 있나요?",
      answer: "회원가입 후 로그인하시면 테스트 결과를 저장하고 언제든지 다시 확인하실 수 있습니다."
    }
  ];

  return (
    <section style={{ marginTop: '60px', padding: '40px 20px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '40px' }}>
        자주 묻는 질문
      </h2>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        {faqs.map((faq, index) => (
          <div key={index} style={{
            marginBottom: '20px',
            backgroundColor: 'white',
            borderRadius: '10px',
            padding: '20px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ marginBottom: '10px', color: '#333' }}>
              {faq.question}
            </h3>
            <p style={{ color: '#666', lineHeight: '1.6' }}>
              {faq.answer}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
```

## **7단계: 모바일 최적화**

### **반응형 디자인**
```css
/* src/styles/responsive.css */
@media (max-width: 768px) {
  .container {
    padding: 10px;
  }
  
  .test-grid {
    grid-template-columns: 1fr;
    gap: 15px;
  }
  
  .test-card {
    padding: 15px;
  }
  
  h1 {
    font-size: 2rem;
  }
  
  h2 {
    font-size: 1.5rem;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 5px;
  }
  
  .test-card {
    padding: 10px;
  }
  
  h1 {
    font-size: 1.5rem;
  }
}
```

### **터치 최적화**
```jsx
// 터치 친화적 버튼 크기
<button style={{
  minHeight: '44px', // 최소 터치 영역
  minWidth: '44px',
  padding: '12px 20px',
  fontSize: '16px' // iOS 줌 방지
}}>
  테스트 시작하기
</button>
```

## **8단계: 성능 모니터링**

### **Google PageSpeed Insights 설정**
```javascript
// src/utils/analytics.js
export const trackPageSpeed = () => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'page_speed', {
      event_category: 'Performance',
      event_label: 'Page Load Time',
      value: Math.round(performance.now())
    });
  }
};

export const trackCoreWebVitals = () => {
  if (typeof window !== 'undefined' && window.gtag) {
    // LCP (Largest Contentful Paint)
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1];
      window.gtag('event', 'web_vitals', {
        event_category: 'Performance',
        event_label: 'LCP',
        value: Math.round(lastEntry.startTime)
      });
    }).observe({ entryTypes: ['largest-contentful-paint'] });

    // FID (First Input Delay)
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      entries.forEach((entry) => {
        window.gtag('event', 'web_vitals', {
          event_category: 'Performance',
          event_label: 'FID',
          value: Math.round(entry.processingStart - entry.startTime)
        });
      });
    }).observe({ entryTypes: ['first-input'] });
  }
};
```

## **9단계: 소셜 미디어 최적화**

### **Open Graph 이미지 생성**
```javascript
// server/routes/og-image.js
const express = require('express');
const { createCanvas } = require('canvas');

const router = express.Router();

router.get('/og-image/:testName', async (req, res) => {
  try {
    const { testName } = req.params;
    const test = await Test.findOne({ mainUrl: testName });
    
    if (!test) {
      return res.status(404).json({ error: 'Test not found' });
    }

    const canvas = createCanvas(1200, 630);
    const ctx = canvas.getContext('2d');

    // 배경 그라데이션
    const gradient = ctx.createLinearGradient(0, 0, 1200, 630);
    gradient.addColorStop(0, '#667eea');
    gradient.addColorStop(1, '#764ba2');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1200, 630);

    // 제목
    ctx.fillStyle = 'white';
    ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(test.info.mainTitle, 600, 200);

    // 부제목
    ctx.font = '24px Arial';
    ctx.fillText(test.info.subTitle, 600, 280);

    // 로고
    ctx.font = 'bold 36px Arial';
    ctx.fillText('K-TEST', 600, 400);

    const buffer = canvas.toBuffer('image/png');
    res.set('Content-Type', 'image/png');
    res.send(buffer);
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate OG image' });
  }
});

module.exports = router;
```

## **10단계: SEO 모니터링**

### **검색 순위 추적**
```javascript
// server/jobs/seoMonitoring.js
const cron = require('node-cron');
const axios = require('axios');

const keywords = [
  '심리테스트',
  'MBTI 테스트',
  '성격테스트',
  '연애테스트',
  '무료 심리테스트'
];

// 매주 검색 순위 확인
cron.schedule('0 9 * * 1', async () => {
  for (const keyword of keywords) {
    try {
      const response = await axios.get(`https://www.googleapis.com/customsearch/v1`, {
        params: {
          key: process.env.GOOGLE_API_KEY,
          cx: process.env.GOOGLE_SEARCH_ENGINE_ID,
          q: keyword,
          siteSearch: 'moneygoldmedal.com'
        }
      });

      const ranking = response.data.items?.findIndex(
        item => item.link.includes('moneygoldmedal.com')
      ) + 1;

      console.log(`${keyword}: ${ranking || 'Not found'}`);
    } catch (error) {
      console.error(`Error checking ranking for ${keyword}:`, error);
    }
  }
});
```

## **완료! 🎉**

SEO 최적화가 완료되었습니다!

### **최종 체크리스트**
- [ ] 메타데이터 최적화 완료
- [ ] 구조화된 데이터 추가
- [ ] 사이트맵 생성 및 제출
- [ ] 페이지 속도 최적화
- [ ] 내부 링크 구조 개선
- [ ] 모바일 최적화
- [ ] 소셜 미디어 최적화
- [ ] 성능 모니터링 설정

이제 완전한 수익 창출 플랫폼이 완성되었습니다! 🚀
