const express = require('express');
const router = express.Router();
const axios = require('axios');
const crypto = require('crypto');

// 환경 변수
const TOSS_CLIENT_KEY = process.env.TOSS_CLIENT_KEY;
const TOSS_SECRET_KEY = process.env.TOSS_SECRET_KEY;
const KAKAO_ADMIN_KEY = process.env.KAKAO_ADMIN_KEY;
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;

// 토스페이먼츠 결제 요청
router.post('/toss', async (req, res) => {
  try {
    const { planId, amount, customerInfo } = req.body;
    
    const orderId = `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const paymentData = {
      orderId: orderId,
      orderName: `K-TEST ${planId} 구독`,
      amount: amount,
      customerEmail: customerInfo.email,
      customerName: customerInfo.name,
      successUrl: `${process.env.FRONTEND_URL}/payment/success`,
      failUrl: `${process.env.FRONTEND_URL}/payment/fail`
    };

    // 토스페이먼츠 결제 키 발급
    const response = await axios.post('https://api.tosspayments.com/v1/payments/confirm', paymentData, {
      headers: {
        'Authorization': `Basic ${Buffer.from(TOSS_SECRET_KEY + ':').toString('base64')}`,
        'Content-Type': 'application/json'
      }
    });

    res.json({
      paymentKey: response.data.paymentKey,
      orderId: orderId,
      amount: amount,
      clientKey: TOSS_CLIENT_KEY
    });
  } catch (error) {
    console.error('Toss payment error:', error.response?.data || error.message);
    res.status(400).json({ 
      error: 'Payment request failed',
      message: error.response?.data?.message || 'Unknown error'
    });
  }
});

// 카카오페이 결제 요청
router.post('/kakao', async (req, res) => {
  try {
    const { planId, amount, customerInfo } = req.body;
    
    const orderId = `kakao_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const paymentData = {
      cid: 'TC0ONETIME', // 테스트용 CID
      partner_order_id: orderId,
      partner_user_id: customerInfo.email,
      item_name: `K-TEST ${planId} 구독`,
      quantity: 1,
      total_amount: amount,
      tax_free_amount: 0,
      approval_url: `${process.env.FRONTEND_URL}/payment/success`,
      cancel_url: `${process.env.FRONTEND_URL}/payment/cancel`,
      fail_url: `${process.env.FRONTEND_URL}/payment/fail`
    };

    const response = await axios.post('https://kapi.kakao.com/v1/payment/ready', paymentData, {
      headers: {
        'Authorization': `KakaoAK ${KAKAO_ADMIN_KEY}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    res.json({
      tid: response.data.tid,
      next_redirect_pc_url: response.data.next_redirect_pc_url,
      next_redirect_mobile_url: response.data.next_redirect_mobile_url,
      orderId: orderId
    });
  } catch (error) {
    console.error('Kakao payment error:', error.response?.data || error.message);
    res.status(400).json({ 
      error: 'Kakao payment request failed',
      message: error.response?.data?.msg || 'Unknown error'
    });
  }
});

// 카드결제 요청 (간단한 구현)
router.post('/card', async (req, res) => {
  try {
    const { planId, amount, customerInfo } = req.body;
    
    // 실제 구현에서는 PG사 API 연동 필요
    const orderId = `card_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // 시뮬레이션용 응답
    res.json({
      orderId: orderId,
      paymentUrl: `${process.env.FRONTEND_URL}/payment/card-form?orderId=${orderId}`,
      amount: amount
    });
  } catch (error) {
    console.error('Card payment error:', error);
    res.status(400).json({ 
      error: 'Card payment request failed',
      message: 'Payment processing error'
    });
  }
});

// 계좌이체 요청
router.post('/bank', async (req, res) => {
  try {
    const { planId, amount, customerInfo } = req.body;
    
    const orderId = `bank_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // 가상 계좌 정보 (실제로는 PG사에서 발급)
    const bankInfo = {
      bankName: '국민은행',
      accountNumber: '123456-78-901234',
      accountHolder: 'K-TEST',
      amount: amount,
      orderId: orderId,
      expiryDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24시간 후 만료
    };

    res.json({
      orderId: orderId,
      bankInfo: bankInfo
    });
  } catch (error) {
    console.error('Bank transfer error:', error);
    res.status(400).json({ 
      error: 'Bank transfer request failed',
      message: 'Bank transfer processing error'
    });
  }
});

// 결제 완료 확인
router.post('/verify', async (req, res) => {
  try {
    const { paymentKey, orderId, amount } = req.body;
    
    // 토스페이먼츠 결제 확인
    const response = await axios.post('https://api.tosspayments.com/v1/payments/confirm', {
      paymentKey: paymentKey,
      orderId: orderId,
      amount: amount
    }, {
      headers: {
        'Authorization': `Basic ${Buffer.from(TOSS_SECRET_KEY + ':').toString('base64')}`,
        'Content-Type': 'application/json'
      }
    });

    // 결제 성공 시 구독 정보 저장
    const subscription = {
      userId: req.body.userId,
      planId: req.body.planId,
      paymentKey: paymentKey,
      orderId: orderId,
      amount: amount,
      status: 'active',
      startDate: new Date(),
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30일 후
      createdAt: new Date()
    };

    // 데이터베이스에 저장 (실제 구현 필요)
    // await Subscription.create(subscription);

    res.json({
      success: true,
      subscription: subscription,
      paymentInfo: response.data
    });
  } catch (error) {
    console.error('Payment verification error:', error.response?.data || error.message);
    res.status(400).json({ 
      error: 'Payment verification failed',
      message: error.response?.data?.message || 'Unknown error'
    });
  }
});

// 구독 취소
router.post('/cancel', async (req, res) => {
  try {
    const { subscriptionId, reason } = req.body;
    
    // 구독 취소 로직 (실제 구현 필요)
    // await Subscription.findByIdAndUpdate(subscriptionId, { status: 'cancelled' });
    
    res.json({
      success: true,
      message: 'Subscription cancelled successfully'
    });
  } catch (error) {
    console.error('Subscription cancellation error:', error);
    res.status(400).json({ 
      error: 'Cancellation failed',
      message: 'Failed to cancel subscription'
    });
  }
});

// 결제 내역 조회
router.get('/history/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    // 결제 내역 조회 (실제 구현 필요)
    // const payments = await Payment.find({ userId }).sort({ createdAt: -1 });
    
    // 시뮬레이션용 데이터
    const payments = [
      {
        id: '1',
        planName: '월간 구독',
        amount: 9900,
        status: 'completed',
        createdAt: new Date(),
        paymentMethod: '카드'
      }
    ];
    
    res.json({
      success: true,
      payments: payments
    });
  } catch (error) {
    console.error('Payment history error:', error);
    res.status(400).json({ 
      error: 'Failed to fetch payment history',
      message: 'Database error'
    });
  }
});

module.exports = router;
