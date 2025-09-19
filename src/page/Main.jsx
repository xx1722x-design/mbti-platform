import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TESTS } from '../data/TESTS.js';

function Main() {
  const navigate = useNavigate();
  const [selectedLang, setSelectedLang] = useState('all');

  const filteredTests = selectedLang === 'all' 
    ? TESTS 
    : TESTS.filter(test => test.info.lang === selectedLang);

  const handleTestClick = (testUrl) => {
    navigate(`/${testUrl}`);
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#f8f9fa', 
      padding: '20px' 
    }}>
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto' 
      }}>
        {/* 헤더 */}
        <header style={{ 
          textAlign: 'center', 
          marginBottom: '40px',
          padding: '20px 0'
        }}>
          <h1 style={{ 
            fontSize: '2.5rem', 
            fontWeight: 'bold', 
            color: '#333',
            marginBottom: '10px'
          }}>
            MBTI 테스트 플랫폼
          </h1>
          <p style={{ 
            fontSize: '1.2rem', 
            color: '#666',
            marginBottom: '30px'
          }}>
            나만의 성격 유형을 알아보세요
          </p>
          
          {/* 언어 필터 */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '10px',
            marginBottom: '20px'
          }}>
            <button
              onClick={() => setSelectedLang('all')}
              style={{
                padding: '8px 16px',
                border: '2px solid #007bff',
                backgroundColor: selectedLang === 'all' ? '#007bff' : 'white',
                color: selectedLang === 'all' ? 'white' : '#007bff',
                borderRadius: '20px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500'
              }}
            >
              전체
            </button>
            <button
              onClick={() => setSelectedLang('Kor')}
              style={{
                padding: '8px 16px',
                border: '2px solid #007bff',
                backgroundColor: selectedLang === 'Kor' ? '#007bff' : 'white',
                color: selectedLang === 'Kor' ? 'white' : '#007bff',
                borderRadius: '20px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500'
              }}
            >
              한국어
            </button>
            <button
              onClick={() => setSelectedLang('Eng')}
              style={{
                padding: '8px 16px',
                border: '2px solid #007bff',
                backgroundColor: selectedLang === 'Eng' ? '#007bff' : 'white',
                color: selectedLang === 'Eng' ? 'white' : '#007bff',
                borderRadius: '20px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500'
              }}
            >
              English
            </button>
            <button
              onClick={() => setSelectedLang('JP')}
              style={{
                padding: '8px 16px',
                border: '2px solid #007bff',
                backgroundColor: selectedLang === 'JP' ? '#007bff' : 'white',
                color: selectedLang === 'JP' ? 'white' : '#007bff',
                borderRadius: '20px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500'
              }}
            >
              日本語
            </button>
          </div>
        </header>

        {/* 테스트 목록 */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '30px' 
        }}>
          {filteredTests.map((test, index) => (
            <div
              key={index}
              onClick={() => handleTestClick(test.info.mainUrl)}
              style={{
                backgroundColor: 'white',
                borderRadius: '15px',
                overflow: 'hidden',
                boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                cursor: 'pointer',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                border: '1px solid #e9ecef'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
              }}
            >
              {/* 썸네일 이미지 */}
              <div style={{ 
                height: '200px', 
                backgroundImage: `url(${test.info.thumbImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                position: 'relative'
              }}>
                <div style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  backgroundColor: 'rgba(0,0,0,0.7)',
                  color: 'white',
                  padding: '4px 8px',
                  borderRadius: '12px',
                  fontSize: '12px',
                  fontWeight: '500'
                }}>
                  {test.info.lang}
                </div>
              </div>
              
              {/* 테스트 정보 */}
              <div style={{ padding: '20px' }}>
                <h3 style={{ 
                  fontSize: '1.3rem', 
                  fontWeight: 'bold', 
                  color: '#333',
                  marginBottom: '8px',
                  lineHeight: '1.4'
                }}>
                  {test.info.mainTitle}
                </h3>
                <p style={{ 
                  fontSize: '1rem', 
                  color: '#666',
                  marginBottom: '15px',
                  lineHeight: '1.5'
                }}>
                  {test.info.subTitle}
                </p>
                
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: '15px'
                }}>
                  <span style={{
                    backgroundColor: '#e3f2fd',
                    color: '#1976d2',
                    padding: '4px 12px',
                    borderRadius: '15px',
                    fontSize: '12px',
                    fontWeight: '500'
                  }}>
                    {test.info.scoreType}
                  </span>
                  <span style={{
                    color: '#007bff',
                    fontSize: '14px',
                    fontWeight: '500'
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
            padding: '60px 20px',
            color: '#666'
          }}>
            <p style={{ fontSize: '1.1rem' }}>
              선택한 언어의 테스트가 없습니다.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Main;