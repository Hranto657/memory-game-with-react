import React from 'react';
import { IGameInfo } from './types';
import Button from '@/components/Button';

import styles from './index.module.css';

const GameInfo = ({ matchedCards, onReset }: IGameInfo) => {
  return (
    <>
      <div>Matched Pairs: {matchedCards.length / 2}</div>
      <Button onClick={onReset}>Reset Game</Button>
    </>
  );
};

export default React.memo(GameInfo);
