import { CardType } from '@/types/commonTypes';
import god1 from '@/assets/god-1.jpg';
import god2 from '@/assets/god-2.jpg';
import god3 from '@/assets/god-3.jpg';
import joker from '@/assets/joker-2.jpg';

export const initialCards2: CardType[] = [
  {
    id: 1,
    image: god1,
    alt: 'memory game card',
    isFlipped: false,
    isMatched: false,
    isJoker: false,
    isFreeze: false,
  },
  {
    id: 2,
    image: god2,
    alt: 'memory game card',
    isFlipped: false,
    isMatched: false,
    isJoker: false,
    isFreeze: false,
  },
  {
    id: 3,
    image: god3,
    alt: 'memory game card',
    isFlipped: false,
    isMatched: false,
    isJoker: false,
    isFreeze: false,
  },
  {
    id: 4,
    image: joker,
    alt: 'memory game card',
    isFlipped: false,
    isMatched: false,
    isJoker: true,
    isFreeze: false,
  },
];
