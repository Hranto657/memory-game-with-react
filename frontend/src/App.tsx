import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Container from './components/Container';
import Home from './pages/Home';
import Board from './pages/Board';
import Levels from './pages/Levels';
import LevelsList from './pages/LevelsList';
import LevelsDifficulty from './pages/LevelsDifficulty';

function App() {
  return (
    <Router>
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/levels" element={<Levels />} />
          <Route path="/levels/list" element={<LevelsList />} />
          <Route path="/levels/difficulty" element={<LevelsDifficulty />} />
          <Route path="/levels/list/:level" element={<Board />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
