import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TESTS } from '../data/TESTS.js';

function TestResult() {
  const { testName, resultType } = useParams();
  const navigate = useNavigate();
  const [currentTest, setCurrentTest] = useState(null);
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const test = TESTS.find(t => t.info.mainUrl === testName);
    if (test) {
      setCurrentTest(test);
      const foundResult = test.results.find(r => r.type === resultType);
      if (foundResult) {
        setResult(foundResult);
      }
      setIsLoading(false);
    } else {
      navigate('/');
    }
  }, [testName, resultType, navigate]);

  const handleRetakeTest = () => {
    navigate(`/${testName}`);
  };

  const handleGoHome = () => {
    navigate('/');
  };

  const handleShareResult = () => {
    if (navigator.share) {
      navigator.share({
        title: `${currentTest?.info.mainTitle} - ${resultType} 결과`,
        text: `나의 MBTI 유형은 ${resultType}입니다!`,
        url: window.location.href
      });
    } else {
      // 클립보드에 복사
      navigator.clipboard.writeText(window.location.href).then(() => {
        alert('링크가 클립보드에 복사되었습니다!');
      });
    }
  };

  if (isLoading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '1.2rem',
        color: '#666'
      }}>
        결과를 불러오는 중...
      </div>
    );
  }

  if (!currentTest || !result) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '1.2rem',
        color: '#666'
      }}>
        결과를 찾을 수 없습니다.
      </div>
    );
  }

  // MBTI 유형별 설명 (간단한 예시)
  const mbtiDescriptions = {
    'ESTJ': {
      title: '경영자형',
      description: '체계적이고 실용적인 리더십을 발휘하는 타입입니다.',
      traits: ['체계적', '책임감 강함', '결정력 있음', '현실적']
    },
    'ESTP': {
      title: '사업가형',
      description: '활동적이고 현실적인 문제 해결사입니다.',
      traits: ['활동적', '현실적', '자발적', '열정적']
    },
    'ESFJ': {
      title: '집정관형',
      description: '사람들을 돌보고 조화를 추구하는 타입입니다.',
      traits: ['배려심 많음', '협력적', '책임감 강함', '따뜻함']
    },
    'ESFP': {
      title: '연예인형',
      description: '자유롭고 열정적인 연예인 같은 타입입니다.',
      traits: ['자유로운', '열정적', '사교적', '즉흥적']
    },
    'ENTJ': {
      title: '통솔자형',
      description: '대담하고 상상력이 풍부한 지도자입니다.',
      traits: ['대담함', '상상력 풍부', '의지력 강함', '리더십']
    },
    'ENTP': {
      title: '토론가형',
      description: '똑똑하고 호기심이 많은 사고가입니다.',
      traits: ['똑똑함', '호기심 많음', '창의적', '독창적']
    },
    'ENFJ': {
      title: '주인공형',
      description: '카리스마 있고 영감을 주는 리더입니다.',
      traits: ['카리스마', '영감적', '리더십', '사교적']
    },
    'ENFP': {
      title: '활동가형',
      description: '열정적이고 창의적인 활동가입니다.',
      traits: ['열정적', '창의적', '사교적', '자유로운']
    },
    'ISTJ': {
      title: '논리주의자형',
      description: '실용적이고 사실에 근거한 신뢰할 수 있는 사람입니다.',
      traits: ['실용적', '신뢰할 수 있음', '체계적', '책임감 강함']
    },
    'ISTP': {
      title: '만능재주꾼형',
      description: '대담하고 실용적인 실험정신의 소유자입니다.',
      traits: ['대담함', '실용적', '실험적', '독립적']
    },
    'ISFJ': {
      title: '수호자형',
      description: '따뜻하고 헌신적인 수호자입니다.',
      traits: ['따뜻함', '헌신적', '배려심', '신뢰할 수 있음']
    },
    'ISFP': {
      title: '모험가형',
      description: '유연하고 매력적인 예술가입니다.',
      traits: ['유연함', '매력적', '예술적', '자유로운']
    },
    'INTJ': {
      title: '건축가형',
      description: '상상력이 풍부하고 전략적인 사고가입니다.',
      traits: ['상상력 풍부', '전략적', '독립적', '결정력 있음']
    },
    'INTP': {
      title: '논리학자형',
      description: '혁신적이고 호기심이 많은 사고가입니다.',
      traits: ['혁신적', '호기심 많음', '논리적', '독창적']
    },
    'INFJ': {
      title: '옹호자형',
      description: '창의적이고 영감을 주는 이상주의자입니다.',
      traits: ['창의적', '영감적', '이상주의적', '결단력 있음']
    },
    'INFP': {
      title: '중재자형',
      description: '시적이고 친절한 이상주의자입니다.',
      traits: ['시적', '친절함', '이상주의적', '유연함']
    }
  };

  const mbtiInfo = mbtiDescriptions[resultType] || {
    title: '알 수 없는 유형',
    description: '이 유형에 대한 정보를 찾을 수 없습니다.',
    traits: []
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px'
    }}>
      <div style={{ 
        maxWidth: '800px', 
        margin: '0 auto' 
      }}>
        {/* 결과 카드 */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '20px',
          padding: '40px',
          textAlign: 'center',
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
          marginBottom: '30px'
        }}>
          {/* MBTI 유형 이미지 */}
          <div style={{ marginBottom: '30px' }}>
            <img 
              src={result.img_src} 
              alt={`${resultType} 결과`}
              style={{
                width: '200px',
                height: '200px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '5px solid #f8f9fa',
                boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
              }}
            />
          </div>

          {/* MBTI 유형 */}
          <div style={{ marginBottom: '20px' }}>
            <h1 style={{ 
              fontSize: '3rem', 
              fontWeight: 'bold', 
              color: '#333',
              marginBottom: '10px',
              letterSpacing: '2px'
            }}>
              {resultType}
            </h1>
            <h2 style={{ 
              fontSize: '1.5rem', 
              color: '#666',
              marginBottom: '20px'
            }}>
              {mbtiInfo.title}
            </h2>
          </div>

          {/* 설명 */}
          <p style={{ 
            fontSize: '1.2rem', 
            color: '#555',
            lineHeight: '1.6',
            marginBottom: '30px'
          }}>
            {mbtiInfo.description}
          </p>

          {/* 특성 태그 */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '10px',
            marginBottom: '30px'
          }}>
            {mbtiInfo.traits.map((trait, index) => (
              <span
                key={index}
                style={{
                  backgroundColor: '#e3f2fd',
                  color: '#1976d2',
                  padding: '8px 16px',
                  borderRadius: '20px',
                  fontSize: '14px',
                  fontWeight: '500'
                }}
              >
                {trait}
              </span>
            ))}
          </div>

          {/* 액션 버튼들 */}
          <div style={{
            display: 'flex',
            gap: '15px',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <button
              onClick={handleShareResult}
              style={{
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '25px',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: '500',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              📤 결과 공유하기
            </button>
            <button
              onClick={handleRetakeTest}
              style={{
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '25px',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: '500'
              }}
            >
              🔄 다시 테스트하기
            </button>
            <button
              onClick={handleGoHome}
              style={{
                backgroundColor: '#6c757d',
                color: 'white',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '25px',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: '500'
              }}
            >
              🏠 홈으로
            </button>
          </div>
        </div>

        {/* 추가 정보 카드 */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '20px',
          padding: '30px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ 
            fontSize: '1.5rem', 
            fontWeight: 'bold', 
            color: '#333',
            marginBottom: '20px',
            textAlign: 'center'
          }}>
            {resultType}에 대해 더 알아보기
          </h3>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px',
            marginTop: '20px'
          }}>
            <div style={{
              backgroundColor: '#f8f9fa',
              padding: '20px',
              borderRadius: '15px',
              textAlign: 'center'
            }}>
              <h4 style={{ color: '#007bff', marginBottom: '10px' }}>강점</h4>
              <p style={{ color: '#666', fontSize: '14px' }}>
                체계적이고 신뢰할 수 있는 성격으로 팀워크에 기여합니다.
              </p>
            </div>
            <div style={{
              backgroundColor: '#f8f9fa',
              padding: '20px',
              borderRadius: '15px',
              textAlign: 'center'
            }}>
              <h4 style={{ color: '#28a745', marginBottom: '10px' }}>적성</h4>
              <p style={{ color: '#666', fontSize: '14px' }}>
                계획적이고 체계적인 업무에 적합한 성격입니다.
              </p>
            </div>
            <div style={{
              backgroundColor: '#f8f9fa',
              padding: '20px',
              borderRadius: '15px',
              textAlign: 'center'
            }}>
              <h4 style={{ color: '#ffc107', marginBottom: '10px' }}>관계</h4>
              <p style={{ color: '#666', fontSize: '14px' }}>
                신뢰할 수 있는 친구이자 동료로 인정받습니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TestResult;
