import React from 'react';

import Chat from './components/Chat/Chat';
import Join from './components/Join/Join';

import { BrowserRouter as Router,Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Routes>
          <Route exact path="/" element={<Join/>} />
          <Route exact path="/chat" element={<Chat/>} />
      </Routes>
    </Router>
  );
}

export default App;
