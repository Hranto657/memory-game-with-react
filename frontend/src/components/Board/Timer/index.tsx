import React, { useEffect, useState } from 'react';
import { CardType } from '@/types/commonTypes';
import { ITimerProps } from './types';
import { formatTime } from '@/helpers/formateTime';
import { shuffleCards } from '@/helpers/shuffleCards';
import Button from '@/components/Button';

import styles from './index.module.css';

const Timer = ({
  isGameStarted,
  setIsGameStarted,
  setCards,
  setIsCardDisabled,
  matchedCards,
  flippedCards,
}: ITimerProps) => {
  const [time, setTime] = useState(300);
  const [timer, setTimer] = useState<number | null>(null);

  const startGame = () => {
    setIsGameStarted(true);
    startTimer();
  };

  const pauseGame = () => {
    setIsGameStarted(false);
    pauseTimer();
  };

  const resetGame = () => {
    setCards((prevCards: CardType[]) =>
      prevCards.map((card: CardType) => ({
        ...card,
        isFlipped: false,
        isMatched: false,
      }))
    );

    setTimeout(() => {
      setCards((prevCards: CardType[]) => shuffleCards(prevCards));
    }, 100);

    setIsCardDisabled(false);
    setIsGameStarted(false);
    resetTimer();
  };

  const startTimer = () => {
    if (timer) return;
    const newTimer = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime === 1) {
          clearInterval(newTimer);
          setTimer(null);
          alert('Game Over');
          resetGame();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
    setTimer(newTimer);
  };

  const pauseTimer = () => {
    if (timer) {
      clearInterval(timer);
      setTimer(null);
    }
  };

  const resetTimer = () => {
    if (timer) {
      clearInterval(timer);
      setTimer(null);
    }
    setTime(300);
  };

  useEffect(() => {
    resetGame();
  }, []);

  useEffect(() => {
    if (matchedCards.length === 34) {
      alert('You win');
      pauseGame();
      resetGame();
    }
  }, [matchedCards]);

  return (
    <>
      <div className={styles.timer}>
        <p>{formatTime(time)}</p>
      </div>
      <div className={styles.footer_buttons_block}>
        <Button onClick={startGame} disabled={isGameStarted}>
          Start Game
        </Button>
        <Button onClick={pauseGame} disabled={!isGameStarted}>
          Pause Game
        </Button>
        <Button onClick={resetGame} disabled={isGameStarted || flippedCards.length > 0}>
          Reset Game
        </Button>
      </div>
    </>
  );
};

export default React.memo(Timer);
