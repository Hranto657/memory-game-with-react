import { CardType } from '@/types/commonTypes';

export interface IGameBoardProps {
  cards: CardType[];
  handleCardClick: (id: number) => void;
}
