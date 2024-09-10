import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CardType } from '@/types/commonTypes';
import { ITimerProps } from './types';
import { useUser } from '@/contexts/UserContext';
import { useUpdateUser } from '@/core/hooks/useUpdateUser';
import { formatTime, shuffleCards } from '@/helpers';
import { getRequiredMatches, getTimeForLevel } from '../functions';
import { Button } from '@/components';

import styles from './index.module.css';

const Timer = forwardRef(
  (
    {
      isGameStarted,
      setIsGameStarted,
      setCards,
      setIsCardDisabled,
      level,
      matchedCards,
      flippedCards,
      difficulty,
      theme,
    }: ITimerProps,
    ref
  ) => {
    const navigate = useNavigate();
    const { mutateAsync } = useUpdateUser();
    const { user } = useUser();
    // console.log(user);
    const [time, setTime] = useState(getTimeForLevel(level));
    const [timer, setTimer] = useState<number | null>(null);

    const startTimer = () => {
      if (timer) {
        clearInterval(timer);
        setTimer(null);
      }

      const newTimer = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 0) {
            clearInterval(newTimer);
            setTimer(null);
            alert('Time is up!');
            navigate(`/levels/list/${theme}/${difficulty}`);
            pauseGame();
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
      setTime(getTimeForLevel(level));
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
    };

    useImperativeHandle(ref, () => ({
      freezeTimer: () => {
        pauseTimer();
        setTimeout(() => {
          startTimer();
        }, 5000);
      },
    }));

    const updateUser = async ({ userId, updateData }: any) => {
      const response = await mutateAsync({ userId, updateData });
      console.log(response, 'response');
      localStorage.setItem(
        'user',
        JSON.stringify({
          id: response.updatedUser._id,
          username: response.updatedUser.username,
          level: response.updatedUser.level,
          count: response.updatedUser.count,
        })
      );
    };
    // console.log(user);
    useEffect(() => {
      const requiredMatches =
        difficulty === 'veryhard'
          ? getRequiredMatches(Number(level), difficulty) + 2
          : getRequiredMatches(Number(level), difficulty);
      // console.log(requiredMatches);
      if (matchedCards.length === requiredMatches) {
        alert('You win');
        updateUser({ userId: user.id, updateData: { level: 3, count: 500 } });

        const nextLevel = Number(level) + 1;
        if (nextLevel <= 5) {
          navigate(`/levels/list/${theme}/${difficulty}/${nextLevel}`);
          if (difficulty !== 'easy') {
            pauseGame();
            setTime(getTimeForLevel(nextLevel));
          }
        } else {
          alert('Congratulations! You have completed all levels.');
          navigate('/');
          if (difficulty !== 'easy') {
            pauseGame();
          }
        }
      }
    }, [matchedCards, level, navigate]);
    return (
      <>
        {difficulty !== 'easy' && (
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
        )}
      </>
    );
  }
);

export default React.memo(Timer);
