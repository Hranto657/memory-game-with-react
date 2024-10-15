import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Container from './components/Container';
import GameWrapper from './components/GameWrapper';
import Home from './pages/Home';
import LevelsList from './pages/LevelsList';
import LevelsDifficulty from './pages/LevelsDifficulty';
import Board from './pages/Board';

function App() {
  return (
    <Router>
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:theme" element={<LevelsDifficulty />} />
          <Route path="/:theme/:difficulty" element={<LevelsList />} />
          <Route
            path="/:theme/:difficulty/:level"
            element={
              <GameWrapper>
                <Board />
              </GameWrapper>
            }
          />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
