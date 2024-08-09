import { CardType } from '@/types/commonTypes';

export interface IGameBoardProps {
  level: number;
  cards: CardType[];
  handleCardClick: (id: number) => void;
}
