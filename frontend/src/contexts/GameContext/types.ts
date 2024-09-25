import { CardType } from '@/types/commonTypes';

export interface GameContextType {
  isGameStarted: boolean;
  setIsGameStarted: (isStarted: boolean) => void;
  startGame: () => void;
  pauseGame: () => void;
  resetGame: () => void;
  freezeTime: () => void;
  handleCardClick: (id: number) => void;
  resetFlippedCards: () => void;
  resetMatchedCards: () => void;
  shuffleAndReset: () => void;
  getNextLevelTime: () => void;
  time: number;
  cards: CardType[];
  setCards: React.Dispatch<React.SetStateAction<CardType[]>>;
  isCardDisabled: boolean;
  setIsCardDisabled: (isDisabled: boolean) => void;
  flippedCards: number[];
  matchedCards: CardType[];
}
