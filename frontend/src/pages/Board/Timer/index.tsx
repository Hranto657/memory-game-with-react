import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CardType } from '@/types/commonTypes';
import { ITimerProps } from './types';
import { formatTime } from '@/helpers/formateTime';
import { shuffleCards } from '@/helpers/shuffleCards';
import { getTimeForLevel } from './functions';
import Button from '@/components/Button';

import styles from './index.module.css';

const Timer = ({
  isGameStarted,
  setIsGameStarted,
  setCards,
  setIsCardDisabled,
  level,
  matchedCards,
  flippedCards,
  getRequiredMatches,
}: ITimerProps) => {
  const navigate = useNavigate();
  const [time, setTime] = useState(getTimeForLevel(level));
  const [timer, setTimer] = useState<number | null>(null);

  const startTimer = () => {
    if (timer) return;
    const newTimer = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime === 0) {
          clearInterval(newTimer);
          setTimer(null);
          alert('Game Over');
          navigate('/levels/list');
          pauseGame();
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
  };
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
    setTime(getTimeForLevel(level));
  };

  useEffect(() => {
    const requiredMatches = getRequiredMatches(Number(level));
    if (matchedCards.length === requiredMatches) {
      alert('You win');
      const nextLevel = Number(level) + 1;
      if (nextLevel < 5) {
        navigate(`/levels/list/${nextLevel}`);
        pauseGame();
        setTime(getTimeForLevel(nextLevel));
      } else {
        alert('Congratulations! You have completed all levels.');
        navigate('/');
        pauseGame();
      }
    }
  }, [matchedCards, level, navigate]);
  return (
    <div className={styles.main}>
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
    </div>
  );
};

export default React.memo(Timer);
