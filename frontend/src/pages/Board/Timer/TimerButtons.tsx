import React from 'react';
import { useGame } from '@/contexts';
import { formatTime } from '@/helpers';
import { Button } from '@/components';

import styles from './index.module.css';

export default function TimerButtons() {
  const { time, startGame, pauseGame, resetGame, flippedCards, isGameStarted } = useGame();

  return (
    <>
      <div className={styles.timer}>
        <p>{formatTime(time)}</p>
      </div>
      <div className={styles.footer_buttons_block}>
        <Button className={styles.button} onClick={startGame} disabled={isGameStarted}>
          Start Game
        </Button>
        <Button className={styles.button} onClick={pauseGame} disabled={!isGameStarted}>
          Pause Game
        </Button>
        <Button className={styles.button} onClick={resetGame} disabled={isGameStarted || flippedCards.length > 0}>
          Reset Game
        </Button>
      </div>
    </>
  );
}
