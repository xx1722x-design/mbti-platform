# 💳 결제 시스템 연동 가이드

## **1단계: 토스페이먼츠 설정**

### **토스페이먼츠 계정 생성**
1. [토스페이먼츠](https://www.tosspayments.com/) 접속
2. **"시작하기"** 클릭
3. 사업자 정보 입력:
   - **사업자명**: K-TEST
   - **사업자등록번호**: 실제 사업자등록번호
   - **대표자명**: 실제 대표자명
   - **업종**: 소프트웨어 개발업
   - **사업장 주소**: 실제 사업장 주소

### **API 키 발급**
1. **개발자센터** → **API 키 관리**
2. **테스트 키** 발급:
   - **Client Key**: `test_ck_XXXXXXXXXXXXXXXXX`
   - **Secret Key**: `test_sk_XXXXXXXXXXXXXXXXX`
3. **운영 키** 발급 (승인 후):
   - **Client Key**: `live_ck_XXXXXXXXXXXXXXXXX`
   - **Secret Key**: `live_sk_XXXXXXXXXXXXXXXXX`

### **웹훅 설정**
1. **개발자센터** → **웹훅 설정**
2. **웹훅 URL**: `https://moneygoldmedal.com/api/payment/webhook`
3. **이벤트 선택**:
   - `payment.status.changed` (결제 상태 변경)
   - `payment.approved` (결제 승인)

## **2단계: 카카오페이 설정**

### **카카오페이 파트너 가입**
1. [카카오페이 비즈니스](https://business.kakaopay.com/) 접속
2. **파트너 가입** 클릭
3. **사업자 정보** 입력
4. **담당자 정보** 입력
5. **서비스 정보** 입력:
   - **서비스명**: K-TEST
   - **서비스 URL**: https://moneygoldmedal.com
   - **서비스 설명**: 심리테스트 플랫폼

### **API 키 발급**
1. **개발자센터** → **API 키 관리**
2. **Admin Key** 발급: `XXXXXXXXXXXXXXXXXXXXXXXX`
3. **JavaScript Key** 발급: `XXXXXXXXXXXXXXXXXXXXXXXX`

## **3단계: 환경 변수 설정**

### **서버 환경 변수 (.env)**
```bash
# 서버 설정
NODE_ENV=production
PORT=3001
FRONTEND_URL=https://moneygoldmedal.com

# 데이터베이스
MONGODB_URI=mongodb://localhost:27017/ktest
REDIS_URL=redis://localhost:6379

# JWT
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=7d

# 토스페이먼츠
TOSS_CLIENT_KEY=test_ck_XXXXXXXXXXXXXXXXX
TOSS_SECRET_KEY=test_sk_XXXXXXXXXXXXXXXXX

# 카카오페이
KAKAO_ADMIN_KEY=XXXXXXXXXXXXXXXXXXXXXXXX
KAKAO_JS_KEY=XXXXXXXXXXXXXXXXXXXXXXXX

# Stripe (해외 결제용)
STRIPE_SECRET_KEY=sk_test_XXXXXXXXXXXXXXXXX
STRIPE_PUBLISHABLE_KEY=pk_test_XXXXXXXXXXXXXXXXX

# 이메일 (결제 알림용)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# 기타
ENCRYPTION_KEY=your-32-character-encryption-key
```

## **4단계: 데이터베이스 스키마 설정**

### **MongoDB 스키마 생성**
```javascript
// server/models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: String },
  subscription: {
    planId: String,
    status: { type: String, enum: ['active', 'cancelled', 'expired'], default: 'expired' },
    startDate: Date,
    endDate: Date,
    autoRenew: { type: Boolean, default: true }
  },
  createdAt: { type: Date, default: Date.now },
  lastLogin: Date
});

module.exports = mongoose.model('User', userSchema);
```

```javascript
// server/models/Payment.js
const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  orderId: { type: String, required: true, unique: true },
  paymentKey: String,
  planId: { type: String, required: true },
  amount: { type: Number, required: true },
  paymentMethod: { type: String, required: true },
  status: { type: String, enum: ['pending', 'completed', 'failed', 'cancelled'], default: 'pending' },
  paymentData: mongoose.Schema.Types.Mixed,
  createdAt: { type: Date, default: Date.now },
  completedAt: Date
});

module.exports = mongoose.model('Payment', paymentSchema);
```

```javascript
// server/models/Subscription.js
const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  planId: { type: String, required: true },
  status: { type: String, enum: ['active', 'cancelled', 'expired'], default: 'active' },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  autoRenew: { type: Boolean, default: true },
  paymentHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Payment' }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Subscription', subscriptionSchema);
```

## **5단계: 프론트엔드 결제 연동**

### **토스페이먼츠 SDK 추가**
```html
<!-- index.html -->
<script src="https://js.tosspayments.com/v1/payment-widget"></script>
```

### **결제 컴포넌트 업데이트**
```jsx
// src/components/PaymentModal.jsx
import { useEffect } from 'react';

// 토스페이먼츠 위젯 초기화
useEffect(() => {
  if (window.TossPayments) {
    const clientKey = process.env.REACT_APP_TOSS_CLIENT_KEY;
    const tossPayments = window.TossPayments(clientKey);
    // 결제 위젯 초기화
  }
}, []);
```

## **6단계: 보안 설정**

### **HTTPS 설정**
```javascript
// server/middleware/security.js
const helmet = require('helmet');

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "https://js.tosspayments.com"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'", "https://api.tosspayments.com"]
    }
  }
}));
```

### **결제 데이터 암호화**
```javascript
// server/utils/encryption.js
const crypto = require('crypto');

const algorithm = 'aes-256-gcm';
const secretKey = process.env.ENCRYPTION_KEY;

function encrypt(text) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipher(algorithm, secretKey);
  cipher.setAAD(Buffer.from('ktest', 'utf8'));
  
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  
  const authTag = cipher.getAuthTag();
  
  return {
    encrypted,
    iv: iv.toString('hex'),
    authTag: authTag.toString('hex')
  };
}

function decrypt(encryptedData) {
  const decipher = crypto.createDecipher(algorithm, secretKey);
  decipher.setAAD(Buffer.from('ktest', 'utf8'));
  decipher.setAuthTag(Buffer.from(encryptedData.authTag, 'hex'));
  
  let decrypted = decipher.update(encryptedData.encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  
  return decrypted;
}

module.exports = { encrypt, decrypt };
```

## **7단계: 결제 테스트**

### **토스페이먼츠 테스트**
```javascript
// 테스트 카드 정보
const testCards = {
  success: '4242424242424242',
  fail: '4000000000000002',
  expired: '4000000000000069'
};

// 테스트 결제 요청
const testPayment = {
  orderId: 'test_order_123',
  orderName: 'K-TEST 테스트 결제',
  amount: 1000,
  customerEmail: 'test@example.com',
  customerName: '테스트 사용자'
};
```

### **카카오페이 테스트**
```javascript
// 카카오페이 테스트 모드
const testMode = process.env.NODE_ENV === 'development';
const cid = testMode ? 'TC0ONETIME' : 'TCSUBSCRIP';
```

## **8단계: 모니터링 및 로깅**

### **결제 로그 설정**
```javascript
// server/middleware/paymentLogger.js
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'logs/payment.log' }),
    new winston.transports.Console()
  ]
});

function logPayment(action, data) {
  logger.info({
    action,
    timestamp: new Date().toISOString(),
    data: {
      orderId: data.orderId,
      amount: data.amount,
      paymentMethod: data.paymentMethod,
      status: data.status
    }
  });
}

module.exports = { logPayment };
```

### **결제 실패 알림**
```javascript
// server/utils/notifications.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransporter({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

async function sendPaymentFailureAlert(paymentData) {
  const mailOptions = {
    from: process.env.SMTP_USER,
    to: 'admin@moneygoldmedal.com',
    subject: '결제 실패 알림',
    html: `
      <h2>결제 실패 알림</h2>
      <p>주문 ID: ${paymentData.orderId}</p>
      <p>금액: ${paymentData.amount}원</p>
      <p>결제 수단: ${paymentData.paymentMethod}</p>
      <p>실패 사유: ${paymentData.error}</p>
    `
  };
  
  await transporter.sendMail(mailOptions);
}
```

## **9단계: 구독 관리 시스템**

### **자동 갱신 설정**
```javascript
// server/jobs/subscriptionRenewal.js
const cron = require('node-cron');

// 매일 자정에 구독 갱신 확인
cron.schedule('0 0 * * *', async () => {
  const expiringSubscriptions = await Subscription.find({
    endDate: { $lte: new Date(Date.now() + 24 * 60 * 60 * 1000) },
    status: 'active',
    autoRenew: true
  });
  
  for (const subscription of expiringSubscriptions) {
    await processRenewal(subscription);
  }
});
```

### **구독 취소 처리**
```javascript
// server/routes/subscription.js
router.post('/cancel', async (req, res) => {
  try {
    const { subscriptionId, reason } = req.body;
    
    const subscription = await Subscription.findById(subscriptionId);
    if (!subscription) {
      return res.status(404).json({ error: 'Subscription not found' });
    }
    
    // 구독 취소 처리
    subscription.status = 'cancelled';
    subscription.cancelledAt = new Date();
    subscription.cancelReason = reason;
    await subscription.save();
    
    // 환불 처리 (필요시)
    if (subscription.refundEligible) {
      await processRefund(subscription);
    }
    
    res.json({ success: true, message: 'Subscription cancelled' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to cancel subscription' });
  }
});
```

## **10단계: 성능 최적화**

### **결제 API 캐싱**
```javascript
// server/middleware/cache.js
const redis = require('redis');
const client = redis.createClient(process.env.REDIS_URL);

const cachePaymentMethods = async (req, res, next) => {
  const cacheKey = 'payment_methods';
  const cached = await client.get(cacheKey);
  
  if (cached) {
    return res.json(JSON.parse(cached));
  }
  
  next();
};
```

### **데이터베이스 인덱싱**
```javascript
// server/models/Payment.js
paymentSchema.index({ userId: 1, createdAt: -1 });
paymentSchema.index({ orderId: 1 });
paymentSchema.index({ status: 1 });
```

## **완료! 🎉**

결제 시스템 연동이 완료되면 수익 창출이 시작됩니다!

다음 단계로 사용자 관리 시스템 구축을 진행하세요.
