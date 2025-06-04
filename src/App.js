import './App.css';
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

const App = () => {
  //const pageSize = 5;
  const [progress, setProgress] = useState(0);
 // const loadingBarRef = useRef(null);

  return (
    <div>
      <Router>
        <Navbar />
        <LoadingBar color='#f11946' progress={progress} height={3}
         />
        <Routes>
          <Route exact path="/" element={<News setProgress={setProgress} key="general" pageSize={8} country="us" category="general" />} />
          <Route exact path="/business" element={<News setProgress={setProgress} key="business" pageSize={8} country="us" category="business" />} />
          <Route exact path="/entertainment" element={<News setProgress={setProgress} key="entertainment" pageSize={8} country="us" category="entertainment" />} />
          <Route exact path="/general" element={<News setProgress={setProgress} key="general" pageSize={8} country="us" category="general" />} />
          <Route exact path="/health" element={<News setProgress={setProgress} key="health" pageSize={8} country="us" category="health" />} />
          <Route exact path="/science" element={<News setProgress={setProgress} key="science" pageSize={8} country="us" category="science" />} />
          <Route exact path="/sports" element={<News setProgress={setProgress} key="sports" pageSize={8} country="us" category="sports" />} />
          <Route exact path="/technology" element={<News setProgress={setProgress} key="technology" pageSize={8} country="us" category="technology" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
