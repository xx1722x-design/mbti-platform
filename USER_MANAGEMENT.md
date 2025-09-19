# 👥 사용자 관리 시스템 구축 가이드

## **1단계: 인증 시스템 구축**

### **JWT 기반 인증**
```javascript
// server/middleware/auth.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select('-password');
    
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Invalid token' });
  }
};

const requireSubscription = (req, res, next) => {
  if (!req.user.subscription || req.user.subscription.status !== 'active') {
    return res.status(403).json({ error: 'Active subscription required' });
  }
  next();
};

module.exports = { authenticateToken, requireSubscription };
```

### **사용자 등록 API**
```javascript
// server/routes/auth.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');

const router = express.Router();

// 회원가입
router.post('/register', [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 8 }),
  body('name').trim().isLength({ min: 2 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, phone, agreeMarketing } = req.body;

    // 이메일 중복 확인
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    // 비밀번호 해시화
    const hashedPassword = await bcrypt.hash(password, 12);

    // 사용자 생성
    const user = new User({
      name,
      email,
      password: hashedPassword,
      phone,
      agreeMarketing,
      subscription: {
        status: 'expired'
      }
    });

    await user.save();

    // JWT 토큰 생성
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        subscription: user.subscription
      },
      token
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

// 로그인
router.post('/login', [
  body('email').isEmail().normalizeEmail(),
  body('password').exists()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    // 사용자 찾기
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // 비밀번호 확인
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // JWT 토큰 생성
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // 마지막 로그인 시간 업데이트
    user.lastLogin = new Date();
    await user.save();

    res.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        subscription: user.subscription
      },
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// 소셜 로그인 (Google)
router.get('/google', async (req, res) => {
  const { OAuth2Client } = require('google-auth-library');
  const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

  try {
    const { token } = req.body;
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID
    });

    const payload = ticket.getPayload();
    const { email, name, picture } = payload;

    let user = await User.findOne({ email });
    if (!user) {
      user = new User({
        name,
        email,
        profileImage: picture,
        subscription: { status: 'expired' }
      });
      await user.save();
    }

    const jwtToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        profileImage: user.profileImage,
        subscription: user.subscription
      },
      token: jwtToken
    });
  } catch (error) {
    console.error('Google login error:', error);
    res.status(500).json({ error: 'Google login failed' });
  }
});

module.exports = router;
```

## **2단계: 사용자 프로필 관리**

### **프로필 업데이트 API**
```javascript
// server/routes/users.js
const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');

const router = express.Router();

// 프로필 조회
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

// 프로필 업데이트
router.put('/profile', authenticateToken, [
  body('name').optional().trim().isLength({ min: 2 }),
  body('phone').optional().isMobilePhone('ko-KR')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, phone, profileImage } = req.body;
    const updateData = {};

    if (name) updateData.name = name;
    if (phone) updateData.phone = phone;
    if (profileImage) updateData.profileImage = profileImage;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      updateData,
      { new: true }
    ).select('-password');

    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

// 비밀번호 변경
router.put('/password', authenticateToken, [
  body('currentPassword').exists(),
  body('newPassword').isLength({ min: 8 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user._id);

    const isValidPassword = await bcrypt.compare(currentPassword, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ error: 'Current password is incorrect' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12);
    user.password = hashedPassword;
    await user.save();

    res.json({ success: true, message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update password' });
  }
});

// 계정 삭제
router.delete('/account', authenticateToken, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user._id);
    res.json({ success: true, message: 'Account deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete account' });
  }
});

module.exports = router;
```

## **3단계: 구독 관리 시스템**

### **구독 상태 확인**
```javascript
// server/routes/subscription.js
const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const Subscription = require('../models/Subscription');
const Payment = require('../models/Payment');

const router = express.Router();

// 구독 상태 조회
router.get('/status', authenticateToken, async (req, res) => {
  try {
    const subscription = await Subscription.findOne({ userId: req.user._id });
    
    if (!subscription) {
      return res.json({
        hasSubscription: false,
        status: 'expired',
        message: 'No active subscription'
      });
    }

    const isActive = subscription.status === 'active' && 
                    subscription.endDate > new Date();

    res.json({
      hasSubscription: true,
      status: subscription.status,
      isActive,
      planId: subscription.planId,
      startDate: subscription.startDate,
      endDate: subscription.endDate,
      autoRenew: subscription.autoRenew
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch subscription status' });
  }
});

// 구독 취소
router.post('/cancel', authenticateToken, async (req, res) => {
  try {
    const { reason } = req.body;
    const subscription = await Subscription.findOne({ userId: req.user._id });

    if (!subscription) {
      return res.status(404).json({ error: 'No subscription found' });
    }

    subscription.status = 'cancelled';
    subscription.cancelledAt = new Date();
    subscription.cancelReason = reason;
    await subscription.save();

    res.json({ success: true, message: 'Subscription cancelled' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to cancel subscription' });
  }
});

// 구독 갱신
router.post('/renew', authenticateToken, async (req, res) => {
  try {
    const subscription = await Subscription.findOne({ userId: req.user._id });

    if (!subscription) {
      return res.status(404).json({ error: 'No subscription found' });
    }

    // 결제 처리 로직 (실제 구현 필요)
    const renewalDate = new Date(subscription.endDate);
    renewalDate.setMonth(renewalDate.getMonth() + 1);

    subscription.endDate = renewalDate;
    subscription.status = 'active';
    await subscription.save();

    res.json({ success: true, message: 'Subscription renewed' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to renew subscription' });
  }
});

module.exports = router;
```

## **4단계: 테스트 결과 저장**

### **테스트 결과 모델**
```javascript
// server/models/TestResult.js
const mongoose = require('mongoose');

const testResultSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  testId: { type: String, required: true },
  testName: { type: String, required: true },
  answers: [{
    questionId: String,
    answer: String,
    timestamp: Date
  }],
  result: {
    type: String,
    description: String,
    imageUrl: String,
    traits: [String]
  },
  score: {
    total: Number,
    categories: mongoose.Schema.Types.Mixed
  },
  completedAt: { type: Date, default: Date.now },
  isPublic: { type: Boolean, default: false }
});

module.exports = mongoose.model('TestResult', testResultSchema);
```

### **테스트 결과 저장 API**
```javascript
// server/routes/tests.js
const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const TestResult = require('../models/TestResult');

const router = express.Router();

// 테스트 결과 저장
router.post('/result', authenticateToken, async (req, res) => {
  try {
    const { testId, testName, answers, result, score } = req.body;

    const testResult = new TestResult({
      userId: req.user._id,
      testId,
      testName,
      answers,
      result,
      score
    });

    await testResult.save();

    res.json({ success: true, resultId: testResult._id });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save test result' });
  }
});

// 사용자 테스트 결과 조회
router.get('/results', authenticateToken, async (req, res) => {
  try {
    const results = await TestResult.find({ userId: req.user._id })
      .sort({ completedAt: -1 })
      .limit(20);

    res.json({ success: true, results });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch test results' });
  }
});

// 특정 테스트 결과 조회
router.get('/result/:resultId', authenticateToken, async (req, res) => {
  try {
    const result = await TestResult.findOne({
      _id: req.params.resultId,
      userId: req.user._id
    });

    if (!result) {
      return res.status(404).json({ error: 'Test result not found' });
    }

    res.json({ success: true, result });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch test result' });
  }
});

module.exports = router;
```

## **5단계: 프론트엔드 인증 상태 관리**

### **인증 컨텍스트 생성**
```javascript
// src/contexts/AuthContext.js
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 토큰 확인 및 사용자 정보 로드
    const token = localStorage.getItem('token');
    if (token) {
      loadUser(token);
    } else {
      setLoading(false);
    }
  }, []);

  const loadUser = async (token) => {
    try {
      const response = await fetch('/api/users/profile', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      } else {
        localStorage.removeItem('token');
      }
    } catch (error) {
      console.error('Failed to load user:', error);
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };

  const login = (userData, token) => {
    setUser(userData);
    localStorage.setItem('token', token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  const value = {
    user,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
```

### **App.jsx에 AuthProvider 추가**
```jsx
// src/App.jsx
import { AuthProvider } from './contexts/AuthContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './page/Main.jsx';
import Test from './page/Test.jsx';
import TestResult from './page/TestResult.jsx';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/:testName" element={<Test />} />
          <Route path="/:testName/result/:resultType" element={<TestResult />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
```

## **6단계: 보안 강화**

### **비밀번호 정책**
```javascript
// server/utils/passwordPolicy.js
const passwordPolicy = {
  minLength: 8,
  requireUppercase: true,
  requireLowercase: true,
  requireNumbers: true,
  requireSpecialChars: false,
  forbiddenPasswords: ['password', '123456', 'qwerty']
};

function validatePassword(password) {
  const errors = [];

  if (password.length < passwordPolicy.minLength) {
    errors.push('Password must be at least 8 characters long');
  }

  if (passwordPolicy.requireUppercase && !/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }

  if (passwordPolicy.requireLowercase && !/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }

  if (passwordPolicy.requireNumbers && !/\d/.test(password)) {
    errors.push('Password must contain at least one number');
  }

  if (passwordPolicy.forbiddenPasswords.includes(password.toLowerCase())) {
    errors.push('Password is too common');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

module.exports = { validatePassword };
```

### **계정 잠금 정책**
```javascript
// server/middleware/rateLimit.js
const rateLimit = require('express-rate-limit');

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15분
  max: 5, // 최대 5번 시도
  message: 'Too many login attempts, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

const registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1시간
  max: 3, // 최대 3번 가입 시도
  message: 'Too many registration attempts, please try again later.',
});

module.exports = { loginLimiter, registerLimiter };
```

## **7단계: 이메일 인증**

### **이메일 인증 모델**
```javascript
// server/models/EmailVerification.js
const mongoose = require('mongoose');

const emailVerificationSchema = new mongoose.Schema({
  email: { type: String, required: true },
  token: { type: String, required: true },
  expiresAt: { type: Date, required: true },
  verified: { type: Boolean, default: false }
});

module.exports = mongoose.model('EmailVerification', emailVerificationSchema);
```

### **이메일 인증 API**
```javascript
// server/routes/email.js
const express = require('express');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const EmailVerification = require('../models/EmailVerification');

const router = express.Router();

// 이메일 인증 요청
router.post('/verify', async (req, res) => {
  try {
    const { email } = req.body;
    
    // 기존 토큰 삭제
    await EmailVerification.deleteMany({ email });
    
    // 새 토큰 생성
    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24시간
    
    const verification = new EmailVerification({
      email,
      token,
      expiresAt
    });
    
    await verification.save();
    
    // 이메일 발송
    await sendVerificationEmail(email, token);
    
    res.json({ success: true, message: 'Verification email sent' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send verification email' });
  }
});

// 이메일 인증 확인
router.post('/confirm', async (req, res) => {
  try {
    const { token } = req.body;
    
    const verification = await EmailVerification.findOne({ token });
    
    if (!verification || verification.expiresAt < new Date()) {
      return res.status(400).json({ error: 'Invalid or expired token' });
    }
    
    verification.verified = true;
    await verification.save();
    
    res.json({ success: true, message: 'Email verified successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to verify email' });
  }
});

module.exports = router;
```

## **완료! 🎉**

사용자 관리 시스템이 완성되었습니다!

다음 단계로 SEO 최적화를 진행하세요.
