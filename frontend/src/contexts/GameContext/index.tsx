import React, { createContext, useState, useContext, ReactNode, useMemo, useCallback } from 'react';
import { GameContextType } from './types';
import { CardType } from '@/types/commonTypes';
import { getTimeForLevel, pauseTimer, resetTimer, startTimer } from './functions';
import { shuffleCards } from '@/helpers';

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: ReactNode; level: number; difficulty: string }> = ({
  children,
  level,
  difficulty,
}) => {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [time, setTime] = useState(getTimeForLevel(Number(level), difficulty));
  const [cards, setCards] = useState<CardType[]>([]);
  const [isCardDisabled, setIsCardDisabled] = useState(false);

  const [timer, setTimer] = useState<number | null>(null);

  const flippedCards = useMemo(
    () => cards.filter((card) => card.isFlipped).map((card) => card.id),
    [cards]
  );
  const matchedCards = useMemo(() => cards.filter((card) => card.isMatched), [cards]);

  const handleCardClick = useCallback(
    (id: number) => {
      if (
        isCardDisabled ||
        flippedCards.includes(id) ||
        matchedCards.some((card) => card.id === id) ||
        !isGameStarted
      ) {
        return;
      }

      setCards((prevCards: CardType[]) => {
        return prevCards.map((card: CardType) =>
          card.id === id ? { ...card, isFlipped: true } : card
        );
      });
    },
    [isCardDisabled, flippedCards, matchedCards, isGameStarted]
  );

  const resetFlippedCards = () => {
    setCards((prevCards: CardType[]) =>
      prevCards.map((card: CardType) => ({ ...card, isFlipped: false }))
    );
    setIsCardDisabled(false);
  };

  const resetMatchedCards = () => {
    setCards((prevCards: CardType[]) =>
      prevCards.map((card: CardType) => ({ ...card, isFlipped: false, isMatched: false }))
    );
    setIsCardDisabled(false);
  };

  const shuffleAndReset = () => {
    setCards((prevCards: CardType[]) => shuffleCards(prevCards));
    setIsCardDisabled(false);
  };

  const getNextLevelTime = () => {
    const nextLevel = Number(level) + 1;
    setTime(getTimeForLevel(nextLevel, difficulty));
  };

  const startGame = useCallback(() => {
    setIsGameStarted(true);
    startTimer(timer, setTime, setTimer);
  }, [timer]);

  const pauseGame = useCallback(() => {
    setIsGameStarted(false);
    pauseTimer(timer, setTimer);
  }, [timer]);

  const resetGame = useCallback(() => {
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
    resetTimer(timer, level, difficulty, setTimer, setTime);
  }, [timer, level]);

  const freezeTime = useCallback(() => {
    pauseTimer(timer, setTimer);
    setTimeout(() => {
      startTimer(timer, setTime, setTimer);
    }, 5000);
  }, [timer]);

  return (
    <GameContext.Provider
      value={{
        isGameStarted,
        setIsGameStarted,
        handleCardClick,
        resetFlippedCards,
        resetMatchedCards,
        shuffleAndReset,
        startGame,
        pauseGame,
        resetGame,
        freezeTime,
        getNextLevelTime,
        time,
        cards,
        setCards,
        isCardDisabled,
        setIsCardDisabled,
        flippedCards,
        matchedCards,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = (): GameContextType => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
