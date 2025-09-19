import { useState } from 'react';

function PaymentModal({ isOpen, onClose, plan, onSuccess }) {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);

  const paymentMethods = [
    { id: 'card', name: '카드결제', icon: '💳', description: '신용카드/체크카드' },
    { id: 'kakao', name: '카카오페이', icon: '💛', description: '간편결제' },
    { id: 'toss', name: '토스페이먼츠', icon: '🔵', description: '토스 간편결제' },
    { id: 'bank', name: '계좌이체', icon: '🏦', description: '무통장입금' }
  ];

  const handlePayment = async () => {
    setIsProcessing(true);
    
    try {
      // 실제 결제 API 호출
      const paymentData = {
        planId: plan.id,
        amount: plan.price,
        paymentMethod: paymentMethod,
        customerInfo: {
          email: 'user@example.com', // 실제 사용자 정보
          name: '홍길동'
        }
      };

      // 토스페이먼츠 결제 요청
      if (paymentMethod === 'toss') {
        await requestTossPayment(paymentData);
      }
      // 카카오페이 결제 요청
      else if (paymentMethod === 'kakao') {
        await requestKakaoPayment(paymentData);
      }
      // 카드결제 요청
      else if (paymentMethod === 'card') {
        await requestCardPayment(paymentData);
      }
      // 계좌이체 요청
      else if (paymentMethod === 'bank') {
        await requestBankTransfer(paymentData);
      }

      onSuccess(plan);
      onClose();
    } catch (error) {
      console.error('Payment failed:', error);
      alert('결제에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsProcessing(false);
    }
  };

  // 토스페이먼츠 결제 요청
  const requestTossPayment = async (paymentData) => {
    const response = await fetch('/api/payment/toss', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paymentData)
    });
    
    if (!response.ok) {
      throw new Error('Toss payment failed');
    }
    
    const { paymentKey, orderId, amount } = await response.json();
    
    // 토스페이먼츠 결제 위젯 호출
    const tossWidget = window.TossPayments('test_ck_XXXXXXXXXXXXXXXXX');
    
    await tossWidget.requestPayment('카드', {
      orderId: orderId,
      orderName: plan.name,
      successUrl: `${window.location.origin}/payment/success`,
      failUrl: `${window.location.origin}/payment/fail`,
    });
  };

  // 카카오페이 결제 요청
  const requestKakaoPayment = async (paymentData) => {
    const response = await fetch('/api/payment/kakao', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paymentData)
    });
    
    if (!response.ok) {
      throw new Error('Kakao payment failed');
    }
    
    const { next_redirect_pc_url } = await response.json();
    window.location.href = next_redirect_pc_url;
  };

  // 카드결제 요청
  const requestCardPayment = async (paymentData) => {
    const response = await fetch('/api/payment/card', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paymentData)
    });
    
    if (!response.ok) {
      throw new Error('Card payment failed');
    }
    
    // 카드결제 폼 표시 또는 리다이렉트
    const { paymentUrl } = await response.json();
    window.location.href = paymentUrl;
  };

  // 계좌이체 요청
  const requestBankTransfer = async (paymentData) => {
    const response = await fetch('/api/payment/bank', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paymentData)
    });
    
    if (!response.ok) {
      throw new Error('Bank transfer failed');
    }
    
    const { bankInfo } = await response.json();
    alert(`계좌이체 정보:\n은행: ${bankInfo.bankName}\n계좌번호: ${bankInfo.accountNumber}\n예금주: ${bankInfo.accountHolder}`);
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
        maxWidth: '500px',
        width: '100%',
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
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h2 style={{
            fontSize: '1.8rem',
            fontWeight: 'bold',
            color: '#333',
            marginBottom: '10px'
          }}>
            💳 결제하기
          </h2>
          <p style={{ color: '#666' }}>
            {plan.name} 구독을 시작합니다
          </p>
        </div>

        {/* 결제 금액 */}
        <div style={{
          backgroundColor: '#f8f9fa',
          padding: '20px',
          borderRadius: '10px',
          marginBottom: '30px',
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '2rem',
            fontWeight: 'bold',
            color: '#667eea',
            marginBottom: '5px'
          }}>
            {plan.price}
          </div>
          <div style={{ color: '#666' }}>
            {plan.period}
          </div>
        </div>

        {/* 결제 수단 선택 */}
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{
            fontSize: '1.2rem',
            fontWeight: 'bold',
            color: '#333',
            marginBottom: '15px'
          }}>
            결제 수단 선택
          </h3>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '10px'
          }}>
            {paymentMethods.map(method => (
              <button
                key={method.id}
                onClick={() => setPaymentMethod(method.id)}
                style={{
                  padding: '15px',
                  border: paymentMethod === method.id ? '2px solid #667eea' : '2px solid #e9ecef',
                  backgroundColor: paymentMethod === method.id ? '#f8f9ff' : 'white',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '5px',
                  transition: 'all 0.3s ease'
                }}
              >
                <span style={{ fontSize: '24px' }}>{method.icon}</span>
                <span style={{
                  fontWeight: 'bold',
                  fontSize: '14px',
                  color: '#333'
                }}>
                  {method.name}
                </span>
                <span style={{
                  fontSize: '12px',
                  color: '#666'
                }}>
                  {method.description}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* 결제 버튼 */}
        <button
          onClick={handlePayment}
          disabled={isProcessing}
          style={{
            width: '100%',
            backgroundColor: isProcessing ? '#ccc' : '#667eea',
            color: 'white',
            border: 'none',
            padding: '15px',
            borderRadius: '10px',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            cursor: isProcessing ? 'not-allowed' : 'pointer',
            marginBottom: '20px'
          }}
        >
          {isProcessing ? '처리 중...' : `${plan.price} 결제하기`}
        </button>

        {/* 안전 결제 안내 */}
        <div style={{
          textAlign: 'center',
          fontSize: '12px',
          color: '#999'
        }}>
          <p>🔒 안전한 SSL 암호화 결제</p>
          <p>언제든지 구독을 취소할 수 있습니다</p>
        </div>
      </div>
    </div>
  );
}

export default PaymentModal;
