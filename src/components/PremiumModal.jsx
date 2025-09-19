import { useState } from 'react';

function PremiumModal({ isOpen, onClose }) {
  const [selectedPlan, setSelectedPlan] = useState('monthly');

  const plans = [
    {
      id: 'monthly',
      name: '월간 구독',
      price: '9,900원',
      period: '/월',
      features: ['모든 테스트 무제한', '광고 제거', '고급 결과 분석', '개인화 추천'],
      popular: false
    },
    {
      id: 'yearly',
      name: '연간 구독',
      price: '99,000원',
      period: '/년',
      originalPrice: '118,800원',
      discount: '17% 할인',
      features: ['모든 테스트 무제한', '광고 제거', '고급 결과 분석', '개인화 추천', '우선 고객 지원'],
      popular: true
    },
    {
      id: 'lifetime',
      name: '평생 구독',
      price: '299,000원',
      period: '일회성',
      features: ['모든 테스트 무제한', '광고 제거', '고급 결과 분석', '개인화 추천', '우선 고객 지원', '새로운 테스트 우선 제공'],
      popular: false
    }
  ];

  const handleSubscribe = () => {
    // 실제 결제 시스템 연동
    alert(`${plans.find(plan => plan.id === selectedPlan)?.name} 구독을 시작합니다!`);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '20px',
        padding: '40px',
        maxWidth: '600px',
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
        position: 'relative'
      }}>
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'none',
            border: 'none',
            fontSize: '24px',
            cursor: 'pointer',
            color: '#666'
          }}
        >
          ×
        </button>

        {/* 헤더 */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 style={{
            fontSize: '2rem',
            fontWeight: 'bold',
            color: '#333',
            marginBottom: '10px'
          }}>
            🎯 K-TEST 프리미엄
          </h2>
          <p style={{
            color: '#666',
            fontSize: '1.1rem'
          }}>
            더 많은 테스트와 고급 기능을 경험해보세요
          </p>
        </div>

        {/* 구독 플랜 */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '20px',
          marginBottom: '40px'
        }}>
          {plans.map(plan => (
            <div
              key={plan.id}
              onClick={() => setSelectedPlan(plan.id)}
              style={{
                border: selectedPlan === plan.id ? '3px solid #667eea' : '2px solid #e9ecef',
                borderRadius: '15px',
                padding: '25px 20px',
                cursor: 'pointer',
                position: 'relative',
                backgroundColor: selectedPlan === plan.id ? '#f8f9ff' : 'white',
                transition: 'all 0.3s ease'
              }}
            >
              {plan.popular && (
                <div style={{
                  position: 'absolute',
                  top: '-10px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  backgroundColor: '#667eea',
                  color: 'white',
                  padding: '5px 15px',
                  borderRadius: '15px',
                  fontSize: '12px',
                  fontWeight: 'bold'
                }}>
                  인기
                </div>
              )}
              
              <h3 style={{
                fontSize: '1.2rem',
                fontWeight: 'bold',
                color: '#333',
                marginBottom: '10px',
                textAlign: 'center'
              }}>
                {plan.name}
              </h3>
              
              <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <span style={{
                  fontSize: '2rem',
                  fontWeight: 'bold',
                  color: '#667eea'
                }}>
                  {plan.price}
                </span>
                <span style={{
                  color: '#666',
                  fontSize: '1rem'
                }}>
                  {plan.period}
                </span>
                {plan.originalPrice && (
                  <div style={{
                    fontSize: '0.9rem',
                    color: '#999',
                    textDecoration: 'line-through',
                    marginTop: '5px'
                  }}>
                    {plan.originalPrice}
                  </div>
                )}
                {plan.discount && (
                  <div style={{
                    fontSize: '0.8rem',
                    color: '#28a745',
                    fontWeight: 'bold',
                    marginTop: '5px'
                  }}>
                    {plan.discount}
                  </div>
                )}
              </div>

              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0
              }}>
                {plan.features.map((feature, index) => (
                  <li key={index} style={{
                    padding: '5px 0',
                    fontSize: '0.9rem',
                    color: '#666',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <span style={{ color: '#28a745' }}>✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* 구독 버튼 */}
        <div style={{ textAlign: 'center' }}>
          <button
            onClick={handleSubscribe}
            style={{
              backgroundColor: '#667eea',
              color: 'white',
              border: 'none',
              padding: '15px 40px',
              borderRadius: '25px',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              marginBottom: '20px'
            }}
          >
            지금 구독하기
          </button>
          
          <p style={{
            fontSize: '0.9rem',
            color: '#999',
            margin: 0
          }}>
            언제든지 취소 가능합니다
          </p>
        </div>
      </div>
    </div>
  );
}

export default PremiumModal;
