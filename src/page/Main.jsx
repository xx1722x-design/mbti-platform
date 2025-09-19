import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TESTS } from '../data/TESTS.js';
import AdBanner from '../components/AdBanner.jsx';

function Main() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLang, setSelectedLang] = useState('all');

  const categories = [
    { id: 'all', name: '전체', icon: '🌟' },
    { id: 'characteristic', name: '성격', icon: '🧠' },
    { id: 'love', name: '연애', icon: '💕' },
    { id: 'aiSimulation', name: 'AI 시뮬레이션', icon: '🤖' },
    { id: 'sajuPlus', name: '사주플러스', icon: '🔮' },
    { id: 'digitalBook', name: '디지털북', icon: '📚' },
    { id: 'promotion', name: '프로모션', icon: '🎁' },
    { id: 'etc', name: '기타', icon: '✨' }
  ];

  const languages = [
    { id: 'all', name: '전체', flag: '🌍' },
    { id: 'Kor', name: '한국어', flag: '🇰🇷' },
    { id: 'Eng', name: 'English', flag: '🇺🇸' },
    { id: 'JP', name: '日本語', flag: '🇯🇵' }
  ];

  const filteredTests = TESTS.filter(test => {
    const categoryMatch = selectedCategory === 'all' || test.info.category === selectedCategory;
    const langMatch = selectedLang === 'all' || test.info.lang === selectedLang;
    return categoryMatch && langMatch;
  });

  const handleTestClick = (testUrl) => {
    navigate(`/${testUrl}`);
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#f8f9fa',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* 상단 네비게이션 */}
      <nav style={{
        backgroundColor: 'white',
        padding: '15px 0',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 20px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              backgroundColor: '#667eea',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px',
              color: 'white',
              fontWeight: 'bold'
            }}>
              K
            </div>
            <h1 style={{
              fontSize: '1.8rem',
              fontWeight: 'bold',
              color: '#333',
              margin: 0
            }}>
              K-TEST
            </h1>
          </div>
          
          <div style={{
            display: 'flex',
            gap: '20px',
            alignItems: 'center'
          }}>
            <div style={{
              display: 'flex',
              gap: '10px'
            }}>
              {languages.map(lang => (
                <button
                  key={lang.id}
                  onClick={() => setSelectedLang(lang.id)}
                  style={{
                    padding: '8px 12px',
                    border: '1px solid #e9ecef',
                    backgroundColor: selectedLang === lang.id ? '#667eea' : 'white',
                    color: selectedLang === lang.id ? 'white' : '#666',
                    borderRadius: '20px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '500',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px'
                  }}
                >
                  <span>{lang.flag}</span>
                  {lang.name}
                </button>
              ))}
            </div>
            <button style={{
              padding: '10px 20px',
              backgroundColor: '#667eea',
              color: 'white',
              border: 'none',
              borderRadius: '25px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500'
            }}>
              로그인
            </button>
          </div>
        </div>
      </nav>

      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto',
        padding: '40px 20px'
      }}>
        {/* 메인 헤더 */}
        <header style={{ 
          textAlign: 'center', 
          marginBottom: '50px'
        }}>
          <h1 style={{ 
            fontSize: '3.5rem', 
            fontWeight: 'bold', 
            color: '#333',
            marginBottom: '20px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            K-TEST
          </h1>
          <p style={{ 
            fontSize: '1.4rem', 
            color: '#666',
            marginBottom: '40px',
            fontWeight: '300'
          }}>
            나를 알아가는 재미있는 심리테스트
          </p>
          
          {/* 카테고리 필터 */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '15px',
            marginBottom: '40px',
            flexWrap: 'wrap'
          }}>
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                style={{
                  padding: '12px 20px',
                  border: '2px solid #e9ecef',
                  backgroundColor: selectedCategory === category.id ? '#667eea' : 'white',
                  color: selectedCategory === category.id ? 'white' : '#666',
                  borderRadius: '25px',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: '500',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'all 0.3s ease',
                  boxShadow: selectedCategory === category.id ? '0 4px 15px rgba(102, 126, 234, 0.3)' : '0 2px 5px rgba(0,0,0,0.1)'
                }}
                onMouseEnter={(e) => {
                  if (selectedCategory !== category.id) {
                    e.target.style.borderColor = '#667eea';
                    e.target.style.transform = 'translateY(-2px)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedCategory !== category.id) {
                    e.target.style.borderColor = '#e9ecef';
                    e.target.style.transform = 'translateY(0)';
                  }
                }}
              >
                <span style={{ fontSize: '18px' }}>{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>
        </header>

        {/* 상단 광고 */}
        <AdBanner position="top" size="banner" />

        {/* 테스트 목록 */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
          gap: '30px',
          marginBottom: '80px'
        }}>
          {filteredTests.map((test, index) => (
            <div
              key={index}
              onClick={() => handleTestClick(test.info.mainUrl)}
              style={{
                backgroundColor: 'white',
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                border: '1px solid #f0f0f0',
                position: 'relative'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 15px 40px rgba(0,0,0,0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.12)';
              }}
            >
              {/* 썸네일 이미지 */}
              <div style={{ 
                height: '220px', 
                backgroundImage: `url(${test.info.thumbImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                position: 'relative'
              }}>
                <div style={{
                  position: 'absolute',
                  top: '15px',
                  right: '15px',
                  backgroundColor: 'rgba(0,0,0,0.8)',
                  color: 'white',
                  padding: '6px 12px',
                  borderRadius: '15px',
                  fontSize: '12px',
                  fontWeight: '600'
                }}>
                  {test.info.lang}
                </div>
                <div style={{
                  position: 'absolute',
                  bottom: '15px',
                  left: '15px',
                  backgroundColor: 'rgba(102, 126, 234, 0.9)',
                  color: 'white',
                  padding: '6px 12px',
                  borderRadius: '15px',
                  fontSize: '12px',
                  fontWeight: '600'
                }}>
                  {categories.find(cat => cat.id === test.info.category)?.name || '기타'}
                </div>
              </div>
              
              {/* 테스트 정보 */}
              <div style={{ padding: '25px' }}>
                <h3 style={{ 
                  fontSize: '1.4rem', 
                  fontWeight: 'bold', 
                  color: '#333',
                  marginBottom: '10px',
                  lineHeight: '1.3'
                }}>
                  {test.info.mainTitle}
                </h3>
                <p style={{ 
                  fontSize: '1rem', 
                  color: '#666',
                  marginBottom: '20px',
                  lineHeight: '1.5'
                }}>
                  {test.info.subTitle}
                </p>
                
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: '20px'
                }}>
                  <div style={{
                    display: 'flex',
                    gap: '8px'
                  }}>
                    <span style={{
                      backgroundColor: '#f0f8ff',
                      color: '#667eea',
                      padding: '6px 12px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: '600'
                    }}>
                      {test.info.scoreType}
                    </span>
                    <span style={{
                      backgroundColor: '#f0f0f0',
                      color: '#666',
                      padding: '6px 12px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: '500'
                    }}>
                      {test.questions.length}문항
                    </span>
                  </div>
                  <span style={{
                    color: '#667eea',
                    fontSize: '14px',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px'
                  }}>
                    테스트 시작 →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredTests.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '80px 20px',
            color: '#666'
          }}>
            <div style={{
              fontSize: '4rem',
              marginBottom: '20px'
            }}>
              🔍
            </div>
            <h3 style={{
              fontSize: '1.5rem',
              marginBottom: '10px',
              color: '#333'
            }}>
              해당 카테고리의 테스트가 없습니다
            </h3>
            <p style={{ fontSize: '1rem' }}>
              다른 카테고리나 언어를 선택해보세요
            </p>
          </div>
        )}

        {/* 하단 광고 */}
        <AdBanner position="bottom" size="leaderboard" />

        {/* 푸터 */}
        <footer style={{
          marginTop: '100px',
          padding: '60px 20px',
          backgroundColor: 'white',
          borderRadius: '20px',
          textAlign: 'center',
          boxShadow: '0 -5px 20px rgba(0,0,0,0.1)'
        }}>
          <div style={{
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '15px',
              marginBottom: '30px'
            }}>
              <div style={{
                width: '50px',
                height: '50px',
                backgroundColor: '#667eea',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                color: 'white',
                fontWeight: 'bold'
              }}>
                K
              </div>
              <h2 style={{
                fontSize: '2rem',
                fontWeight: 'bold',
                color: '#333',
                margin: 0
              }}>
                K-TEST
              </h2>
            </div>
            
            <p style={{
              color: '#666',
              marginBottom: '40px',
              lineHeight: '1.6',
              fontSize: '1.1rem'
            }}>
              정확하고 재미있는 심리테스트로 나만의 성격을 발견해보세요.<br/>
              다양한 카테고리와 언어로 제공되는 전문적인 테스트 플랫폼입니다.
            </p>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '40px',
              marginBottom: '40px',
              textAlign: 'left'
            }}>
              <div>
                <h4 style={{ color: '#333', marginBottom: '20px', fontSize: '1.1rem', fontWeight: '600' }}>테스트 카테고리</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <span style={{ color: '#666', fontSize: '0.95rem' }}>🧠 성격 테스트</span>
                  <span style={{ color: '#666', fontSize: '0.95rem' }}>💕 연애 테스트</span>
                  <span style={{ color: '#666', fontSize: '0.95rem' }}>🤖 AI 시뮬레이션</span>
                  <span style={{ color: '#666', fontSize: '0.95rem' }}>🔮 사주플러스</span>
                </div>
              </div>
              <div>
                <h4 style={{ color: '#333', marginBottom: '20px', fontSize: '1.1rem', fontWeight: '600' }}>지원 언어</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <span style={{ color: '#666', fontSize: '0.95rem' }}>🇰🇷 한국어</span>
                  <span style={{ color: '#666', fontSize: '0.95rem' }}>🇺🇸 English</span>
                  <span style={{ color: '#666', fontSize: '0.95rem' }}>🇯🇵 日本語</span>
                </div>
              </div>
              <div>
                <h4 style={{ color: '#333', marginBottom: '20px', fontSize: '1.1rem', fontWeight: '600' }}>플랫폼 특징</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <span style={{ color: '#666', fontSize: '0.95rem' }}>📱 모바일 최적화</span>
                  <span style={{ color: '#666', fontSize: '0.95rem' }}>🆓 무료 이용</span>
                  <span style={{ color: '#666', fontSize: '0.95rem' }}>🎯 정확한 결과</span>
                  <span style={{ color: '#666', fontSize: '0.95rem' }}>🔄 지속적 업데이트</span>
                </div>
              </div>
            </div>
            
            <div style={{
              borderTop: '1px solid #f0f0f0',
              paddingTop: '30px',
              color: '#999',
              fontSize: '0.9rem'
            }}>
              <p style={{ margin: '0 0 10px 0' }}>
                © 2025 K-TEST. All Rights Reserved.
              </p>
              <p style={{ margin: 0 }}>
                Powered by Vercel | Built with React & Vite | Hosted on Contabo
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Main;