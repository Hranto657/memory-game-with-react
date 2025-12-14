import { CardType } from '@/types/commonTypes';
import { getImageSourceByName } from '@/helpers';
import god1 from '@/assets/god-1.jpg';
import god2 from '@/assets/god-2.jpg';
import god3 from '@/assets/god-3.jpg';
import god4 from '@/assets/god-4.jpg';
import god5 from '@/assets/god-5.jpg';
import god6 from '@/assets/god-6.jpg';
import god7 from '@/assets/god-7.jpg';
import god8 from '@/assets/god-8.jpg';
import god9 from '@/assets/god-9.jpg';
import god10 from '@/assets/god-10.jpg';
import god11 from '@/assets/god-11.jpg';
import god12 from '@/assets/god-12.jpg';
import god13 from '@/assets/god-13.jpg';
import god14 from '@/assets/god-14.jpg';
import god15 from '@/assets/god-15.jpg';
import god16 from '@/assets/god-16.jpg';
import god17 from '@/assets/god-17.jpg';
import god18 from '@/assets/god-18.jpg';
import joker from '@/assets/joker-2.jpg';
import freeze from '@/assets/freeze-2.jpg';

function createInitialCards2(): CardType[] {
  return [
    {
      id: 1,
      image: getImageSourceByName('god-1.jpg', god1),
      alt: 'memory game card',
      isFlipped: false,
      isMatched: false,
      isJoker: false,
      isFreeze: false,
    },
    {
      id: 2,
      image: getImageSourceByName('god-2.jpg', god2),
      alt: 'memory game card',
      isFlipped: false,
      isMatched: false,
      isJoker: false,
      isFreeze: false,
    },
    {
      id: 3,
      image: getImageSourceByName('god-3.jpg', god3),
      alt: 'memory game card',
      isFlipped: false,
      isMatched: false,
      isJoker: false,
      isFreeze: false,
    },
    {
      id: 4,
      image: getImageSourceByName('god-4.jpg', god4),
      alt: 'memory game card',
      isFlipped: false,
      isMatched: false,
      isJoker: false,
      isFreeze: false,
    },
    {
      id: 5,
      image: getImageSourceByName('god-5.jpg', god5),
      alt: 'memory game card',
      isFlipped: false,
      isMatched: false,
      isJoker: false,
      isFreeze: false,
    },
    {
      id: 6,
      image: getImageSourceByName('god-6.jpg', god6),
      alt: 'memory game card',
      isFlipped: false,
      isMatched: false,
      isJoker: false,
      isFreeze: false,
    },
    {
      id: 7,
      image: getImageSourceByName('god-7.jpg', god7),
      alt: 'memory game card',
      isFlipped: false,
      isMatched: false,
      isJoker: false,
      isFreeze: false,
    },
    {
      id: 8,
      image: getImageSourceByName('god-8.jpg', god8),
      alt: 'memory game card',
      isFlipped: false,
      isMatched: false,
      isJoker: false,
      isFreeze: false,
    },
    {
      id: 9,
      image: getImageSourceByName('god-9.jpg', god9),
      alt: 'memory game card',
      isFlipped: false,
      isMatched: false,
      isJoker: false,
      isFreeze: false,
    },
    {
      id: 10,
      image: getImageSourceByName('god-10.jpg', god10),
      alt: 'memory game card',
      isFlipped: false,
      isMatched: false,
      isJoker: false,
      isFreeze: false,
    },
    {
      id: 11,
      image: getImageSourceByName('god-11.jpg', god11),
      alt: 'memory game card',
      isFlipped: false,
      isMatched: false,
      isJoker: false,
      isFreeze: false,
    },
    {
      id: 12,
      image: getImageSourceByName('god-12.jpg', god12),
      alt: 'memory game card',
      isFlipped: false,
      isMatched: false,
      isJoker: false,
      isFreeze: false,
    },
    {
      id: 13,
      image: getImageSourceByName('god-13.jpg', god13),
      alt: 'memory game card',
      isFlipped: false,
      isMatched: false,
      isJoker: false,
      isFreeze: false,
    },
    {
      id: 14,
      image: getImageSourceByName('god-14.jpg', god14),
      alt: 'memory game card',
      isFlipped: false,
      isMatched: false,
      isJoker: false,
      isFreeze: false,
    },
    {
      id: 15,
      image: getImageSourceByName('god-15.jpg', god15),
      alt: 'memory game card',
      isFlipped: false,
      isMatched: false,
      isJoker: false,
      isFreeze: false,
    },
    {
      id: 16,
      image: getImageSourceByName('god-16.jpg', god16),
      alt: 'memory game card',
      isFlipped: false,
      isMatched: false,
      isJoker: false,
      isFreeze: false,
    },
    {
      id: 17,
      image: getImageSourceByName('god-17.jpg', god17),
      alt: 'memory game card',
      isFlipped: false,
      isMatched: false,
      isJoker: false,
      isFreeze: false,
    },
    {
      id: 18,
      image: getImageSourceByName('god-18.jpg', god18),
      alt: 'memory game card',
      isFlipped: false,
      isMatched: false,
      isJoker: false,
      isFreeze: false,
    },
    {
      id: 19,
      image: getImageSourceByName('joker-2.jpg', joker),
      alt: 'memory game card',
      isFlipped: false,
      isMatched: false,
      isJoker: true,
      isFreeze: false,
    },
    {
      id: 20,
      image: getImageSourceByName('freeze-2.jpg', freeze),
      alt: 'memory game card',
      isFlipped: false,
      isMatched: false,
      isJoker: false,
      isFreeze: true,
    },
  ];
}

export const initialCards2 = createInitialCards2();

export { createInitialCards2 };
