export interface ICard {
  id: number;
  image: string;
  alt: string;
  isFlipped: boolean;
  isMatched: boolean;
  onClick: (id: number) => void;
}
