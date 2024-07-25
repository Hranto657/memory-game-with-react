import { Dispatch, SetStateAction } from 'react';
import { CardType } from '@/types/commonTypes';

export interface ITimerProps {
  isGameStarted: boolean;
  setCards: Dispatch<SetStateAction<CardType[]>>;
  setIsGameStarted: Dispatch<SetStateAction<boolean>>;
  setIsCardDisabled: Dispatch<SetStateAction<boolean>>;
  matchedCards: CardType[];
  flippedCards: number[];
}
