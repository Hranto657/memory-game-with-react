import { Dispatch, SetStateAction } from 'react';

export const startTimer = (
  setTime: Dispatch<SetStateAction<number>>,
  setTimer: Dispatch<SetStateAction<number | null>>,
  timer: number | null,
  resetGame: () => void
) => {
  if (timer) return;
  const newTimer = setInterval(() => {
    setTime((prevTime) => {
      if (prevTime === 0) {
        clearInterval(newTimer);
        setTimer(null);
        alert('Game Over');
        resetGame();
      }
      return prevTime - 1;
    });
  }, 1000);
  setTimer(newTimer);
};

export const pauseTimer = (timer: number | null, setTimer: Dispatch<SetStateAction<number | null>>) => {
  if (timer) {
    clearInterval(timer);
    setTimer(null);
  }
};

export const resetTimer = (timer: number | null, setTimer: Dispatch<SetStateAction<number | null>>) => {
  if (timer) {
    clearInterval(timer);
    setTimer(null);
  }
};

export const getTimeForLevel = (level: number) => {
  switch (level) {
    case 1:
      return 20;
    case 2:
      return 120;
    case 3:
      return 180;
    case 4:
      return 240;
    case 5:
      return 300;
  }
};
