import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './page/Main.jsx';
import Test from './page/Test.jsx';
import TestResult from './page/TestResult.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/:testName" element={<Test />} />
        <Route path="/:testName/result/:resultType" element={<TestResult />} />
      </Routes>
    </Router>
  );
}

export default App;

// 주소 체계
// 1. 메인 썸네일 리스트 페이지 : root/
// 2. 테스트 페이지 -Intro/Quiz/Loading : root/testName
// 3. 결과 페이지 : root/testName/result/resultName