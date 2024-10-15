import { getTimeForLevel } from './getTimeForLevel';

export function startTimer(
  timer: number | null,
  setTime: React.Dispatch<React.SetStateAction<number>>,
  setTimer: React.Dispatch<React.SetStateAction<number | null>>
) {
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
        return 0;
      }
      return prevTime - 1;
    });
  }, 1000);
  setTimer(newTimer);
}

export function pauseTimer(
  timer: number | null,
  setTimer: React.Dispatch<React.SetStateAction<number | null>>
) {
  if (timer) {
    clearInterval(timer);
    setTimer(null);
  }
}

export function resetTimer(
  timer: number | null,
  level: number,
  difficulty: string,
  setTimer: React.Dispatch<React.SetStateAction<number | null>>,
  setTime: React.Dispatch<React.SetStateAction<number>>
) {
  if (timer) {
    clearInterval(timer);
    setTimer(null);
  }
  setTime(getTimeForLevel(Number(level), difficulty));
}
