import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Container from './components/Container';
import Board from './components/Board';

function App() {
  return (
    <Router>
      <Container>
        <Routes>
          <Route path="/" element={<Navigate to="/level/1" />} />
          <Route path="/level/:level" element={<Board />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
