export interface ICardProps {
  id: number;
  image: string;
  alt: string;
  isFlipped: boolean;
  isMatched: boolean;
  onClick: (id: number) => void;
}
