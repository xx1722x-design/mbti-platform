import { Helmet } from 'react-helmet-async';

function SEOHead({ 
  title = "K-TEST - 나를 알아가는 재미있는 심리테스트",
  description = "정확하고 재미있는 심리테스트로 나만의 성격을 발견해보세요. MBTI, 연애, AI, 사주 등 다양한 카테고리의 테스트를 제공합니다.",
  keywords = "심리테스트, MBTI, 성격테스트, 연애테스트, AI테스트, 사주, 퍼스널컬러, 무료테스트",
  image = "https://moneygoldmedal.com/og-image.jpg",
  url = "https://moneygoldmedal.com",
  type = "website"
}) {
  return (
    <Helmet>
      {/* 기본 메타 태그 */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="K-TEST" />
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
      {/* Open Graph 메타 태그 */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="K-TEST" />
      <meta property="og:locale" content="ko_KR" />
      
      {/* Twitter Card 메타 태그 */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:site" content="@ktest_official" />
      <meta name="twitter:creator" content="@ktest_official" />
      
      {/* 추가 SEO 메타 태그 */}
      <meta name="theme-color" content="#667eea" />
      <meta name="msapplication-TileColor" content="#667eea" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="K-TEST" />
      
      {/* 구조화된 데이터 (JSON-LD) */}
      <script type="application/ld+json">
        {JSON.stringify({
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
        })}
      </script>
      
      {/* 추가 구조화된 데이터 - 심리테스트 */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          "name": "심리테스트 목록",
          "description": "다양한 카테고리의 심리테스트를 제공합니다",
          "url": "https://moneygoldmedal.com",
          "numberOfItems": 5,
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "MBTI 성격 테스트",
              "description": "16가지 성격 유형을 알아보는 테스트",
              "url": "https://moneygoldmedal.com/personalColor"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "연애 스타일 테스트",
              "description": "나의 연애 유형을 알아보는 테스트",
              "url": "https://moneygoldmedal.com/loveStyle"
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": "AI와의 궁합 테스트",
              "description": "어떤 AI와 가장 잘 맞을까 테스트",
              "url": "https://moneygoldmedal.com/aiCompatibility"
            }
          ]
        })}
      </script>
    </Helmet>
  );
}

export default SEOHead;
