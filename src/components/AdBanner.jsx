import { useState, useEffect } from 'react';

function AdBanner({ position = 'top', size = 'banner' }) {
  const [adVisible, setAdVisible] = useState(true);

  // 광고 크기별 스타일
  const adStyles = {
    banner: {
      width: '100%',
      height: '90px',
      maxWidth: '728px',
      margin: '0 auto'
    },
    rectangle: {
      width: '300px',
      height: '250px',
      margin: '0 auto'
    },
    square: {
      width: '250px',
      height: '250px',
      margin: '0 auto'
    },
    leaderboard: {
      width: '100%',
      height: '60px',
      maxWidth: '970px',
      margin: '0 auto'
    }
  };

  // 광고 위치별 스타일
  const positionStyles = {
    top: {
      marginBottom: '20px',
      marginTop: '10px'
    },
    bottom: {
      marginTop: '20px',
      marginBottom: '10px'
    },
    sidebar: {
      position: 'sticky',
      top: '100px',
      margin: '0 20px'
    },
    inline: {
      margin: '20px 0'
    }
  };

  const handleCloseAd = () => {
    setAdVisible(false);
  };

  if (!adVisible) return null;

  return (
    <div style={{
      ...adStyles[size],
      ...positionStyles[position],
      backgroundColor: '#f8f9fa',
      border: '2px dashed #dee2e6',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* 광고 닫기 버튼 */}
      <button
        onClick={handleCloseAd}
        style={{
          position: 'absolute',
          top: '5px',
          right: '5px',
          background: 'rgba(0,0,0,0.5)',
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          width: '20px',
          height: '20px',
          cursor: 'pointer',
          fontSize: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        ×
      </button>

      {/* 광고 내용 */}
      <div style={{
        textAlign: 'center',
        color: '#666',
        fontSize: '14px'
      }}>
        <div style={{
          fontSize: '24px',
          marginBottom: '5px'
        }}>
          📢
        </div>
        <div style={{
          fontWeight: 'bold',
          marginBottom: '3px'
        }}>
          광고 영역
        </div>
        <div style={{
          fontSize: '12px'
        }}>
          {size === 'banner' && '728x90 배너'}
          {size === 'rectangle' && '300x250 직사각형'}
          {size === 'square' && '250x250 정사각형'}
          {size === 'leaderboard' && '970x60 리더보드'}
        </div>
      </div>

      {/* 실제 광고 코드가 들어갈 영역 */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1
      }}>
        {/* Google AdSense, 네이버 애드포스트 등 광고 코드 삽입 */}
        {/* 예시: <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script> */}
      </div>
    </div>
  );
}

export default AdBanner;
