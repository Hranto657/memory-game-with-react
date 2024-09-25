import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { UserProvider } from '@/contexts/UserContext';
import Container from './components/Container';
import GameWrapper from './components/GameWrapper';
import Home from './pages/Home';
import Board from './pages/Board';
import Levels from './pages/Levels';
import LevelsList from './pages/LevelsList';
import LevelsDifficulty from './pages/LevelsDifficulty';

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <UserProvider>
          <Container>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/levels" element={<Levels />} />
              <Route path="/levels/difficulty/:theme" element={<LevelsDifficulty />} />
              <Route path="/levels/list/:theme/:difficulty" element={<LevelsList />} />
              <Route
                path="/levels/list/:theme/:difficulty/:level"
                element={
                  <GameWrapper>
                    <Board />
                  </GameWrapper>
                }
              />
            </Routes>
          </Container>
        </UserProvider>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
