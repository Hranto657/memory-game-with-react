import { Dispatch, SetStateAction } from 'react';
import { CardType } from '@/types/commonTypes';

export interface ITimerProps {
  isGameStarted: boolean;
  setCards: Dispatch<SetStateAction<CardType[]>>;
  setIsGameStarted: Dispatch<SetStateAction<boolean>>;
  setIsCardDisabled: Dispatch<SetStateAction<boolean>>;
  level: number;
  matchedCards: CardType[];
  flippedCards: number[];
  getRequiredMatches: (level: number, difficulty: string) => number;
  difficulty: string;
  theme: string;
}
