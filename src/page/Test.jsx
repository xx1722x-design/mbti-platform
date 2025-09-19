import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TESTS } from '../data/TESTS.js';

function Test() {
  const { testName } = useParams();
  const navigate = useNavigate();
  const [currentTest, setCurrentTest] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const test = TESTS.find(t => t.info.mainUrl === testName);
    if (test) {
      setCurrentTest(test);
    } else {
      navigate('/');
    }
  }, [testName, navigate]);

  const handleAnswerSelect = (questionIndex, answerType) => {
    setAnswers(prev => ({
      ...prev,
      [questionIndex]: answerType
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < currentTest.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // 모든 질문 완료 - 결과 계산
      calculateResult();
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const calculateResult = () => {
    setIsLoading(true);
    
    // MBTI 점수 계산
    const scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
    
    Object.values(answers).forEach(answer => {
      if (answer) {
        scores[answer]++;
      }
    });

    // MBTI 유형 결정
    const mbtiType = 
      (scores.E >= scores.I ? 'E' : 'I') +
      (scores.S >= scores.N ? 'S' : 'N') +
      (scores.T >= scores.F ? 'T' : 'F') +
      (scores.J >= scores.P ? 'J' : 'P');

    // 결과 페이지로 이동
    setTimeout(() => {
      navigate(`/${testName}/result/${mbtiType}`);
    }, 2000);
  };

  const startTest = () => {
    setShowIntro(false);
  };

  if (!currentTest) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '1.2rem',
        color: '#666'
      }}>
        테스트를 찾을 수 없습니다.
      </div>
    );
  }

  if (showIntro) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '20px',
          padding: '40px',
          maxWidth: '600px',
          textAlign: 'center',
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
        }}>
          <img 
            src={currentTest.info.mainImage} 
            alt={currentTest.info.mainTitle}
            style={{
              width: '100%',
              maxWidth: '400px',
              height: 'auto',
              borderRadius: '15px',
              marginBottom: '30px'
            }}
          />
          <h1 style={{ 
            fontSize: '2rem', 
            fontWeight: 'bold', 
            color: '#333',
            marginBottom: '15px'
          }}>
            {currentTest.info.mainTitle}
          </h1>
          <p style={{ 
            fontSize: '1.2rem', 
            color: '#666',
            marginBottom: '30px',
            lineHeight: '1.6'
          }}>
            {currentTest.info.subTitle}
          </p>
          <p style={{ 
            fontSize: '1rem', 
            color: '#888',
            marginBottom: '40px',
            lineHeight: '1.5'
          }}>
            총 {currentTest.questions.length}개의 질문으로 구성된 테스트입니다.<br/>
            솔직하게 답변해주세요!
          </p>
          <button
            onClick={startTest}
            style={{
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              padding: '15px 40px',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              borderRadius: '25px',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#0056b3';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#007bff';
            }}
          >
            테스트 시작하기
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
      }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '20px',
          padding: '40px',
          textAlign: 'center',
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
        }}>
          <div style={{
            width: '60px',
            height: '60px',
            border: '4px solid #f3f3f3',
            borderTop: '4px solid #007bff',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 20px'
          }}></div>
          <h2 style={{ 
            fontSize: '1.5rem', 
            color: '#333',
            marginBottom: '10px'
          }}>
            결과를 분석 중입니다...
          </h2>
          <p style={{ color: '#666' }}>
            잠시만 기다려주세요
          </p>
        </div>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  const currentQuestion = currentTest.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / currentTest.questions.length) * 100;

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#f8f9fa',
      padding: '20px'
    }}>
      <div style={{ 
        maxWidth: '800px', 
        margin: '0 auto',
        backgroundColor: 'white',
        borderRadius: '20px',
        padding: '40px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
      }}>
        {/* 진행률 바 */}
        <div style={{ marginBottom: '30px' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '10px'
          }}>
            <span style={{ fontSize: '14px', color: '#666' }}>
              {currentQuestionIndex + 1} / {currentTest.questions.length}
            </span>
            <span style={{ fontSize: '14px', color: '#666' }}>
              {Math.round(progress)}%
            </span>
          </div>
          <div style={{
            width: '100%',
            height: '8px',
            backgroundColor: '#e9ecef',
            borderRadius: '4px',
            overflow: 'hidden'
          }}>
            <div style={{
              width: `${progress}%`,
              height: '100%',
              backgroundColor: '#007bff',
              transition: 'width 0.3s ease'
            }}></div>
          </div>
        </div>

        {/* 질문 */}
        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ 
            fontSize: '1.5rem', 
            fontWeight: 'bold', 
            color: '#333',
            marginBottom: '20px',
            lineHeight: '1.4'
          }}>
            {currentQuestion.question}
          </h2>
        </div>

        {/* 답변 옵션 */}
        <div style={{ marginBottom: '40px' }}>
          {currentQuestion.answers.map((answer, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(currentQuestionIndex, answer.type)}
              style={{
                width: '100%',
                padding: '20px',
                marginBottom: '15px',
                border: answers[currentQuestionIndex] === answer.type 
                  ? '2px solid #007bff' 
                  : '2px solid #e9ecef',
                backgroundColor: answers[currentQuestionIndex] === answer.type 
                  ? '#e3f2fd' 
                  : 'white',
                borderRadius: '15px',
                cursor: 'pointer',
                fontSize: '1rem',
                textAlign: 'left',
                transition: 'all 0.3s ease',
                color: '#333'
              }}
              onMouseEnter={(e) => {
                if (answers[currentQuestionIndex] !== answer.type) {
                  e.target.style.borderColor = '#007bff';
                  e.target.style.backgroundColor = '#f8f9fa';
                }
              }}
              onMouseLeave={(e) => {
                if (answers[currentQuestionIndex] !== answer.type) {
                  e.target.style.borderColor = '#e9ecef';
                  e.target.style.backgroundColor = 'white';
                }
              }}
            >
              {answer.content}
            </button>
          ))}
        </div>

        {/* 네비게이션 버튼 */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <button
            onClick={handlePrevQuestion}
            disabled={currentQuestionIndex === 0}
            style={{
              padding: '12px 24px',
              border: '2px solid #6c757d',
              backgroundColor: currentQuestionIndex === 0 ? '#f8f9fa' : 'white',
              color: currentQuestionIndex === 0 ? '#adb5bd' : '#6c757d',
              borderRadius: '25px',
              cursor: currentQuestionIndex === 0 ? 'not-allowed' : 'pointer',
              fontSize: '1rem',
              fontWeight: '500'
            }}
          >
            이전
          </button>

          <button
            onClick={handleNextQuestion}
            disabled={!answers[currentQuestionIndex]}
            style={{
              padding: '12px 24px',
              border: 'none',
              backgroundColor: answers[currentQuestionIndex] ? '#007bff' : '#e9ecef',
              color: answers[currentQuestionIndex] ? 'white' : '#adb5bd',
              borderRadius: '25px',
              cursor: answers[currentQuestionIndex] ? 'pointer' : 'not-allowed',
              fontSize: '1rem',
              fontWeight: '500'
            }}
          >
            {currentQuestionIndex === currentTest.questions.length - 1 ? '완료' : '다음'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Test;
