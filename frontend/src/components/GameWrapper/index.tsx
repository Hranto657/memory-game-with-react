import React, { ReactNode } from 'react';
import { useParams } from 'react-router-dom';
import { GameProvider } from '@/contexts/GameContext';

const GameWrapper: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { level } = useParams();

  return <GameProvider level={Number(level)}>{children}</GameProvider>;
};

export default GameWrapper;
