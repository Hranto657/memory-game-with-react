import { CardType } from '@/types/commonTypes';
import { getImageSourceByName } from '@/helpers';
import dragon1 from '@/assets/dragon-1.jpg';
import dragon2 from '@/assets/dragon-2.jpg';
import dragon3 from '@/assets/dragon-3.jpg';
import dragon4 from '@/assets/dragon-4.jpg';
import dragon5 from '@/assets/dragon-5.jpg';
import dragon6 from '@/assets/dragon-6.jpg';
import dragon7 from '@/assets/dragon-7.jpg';
import dragon8 from '@/assets/dragon-8.jpg';
import dragon9 from '@/assets/dragon-9.jpg';
import dragon10 from '@/assets/dragon-10.jpg';
import dragon11 from '@/assets/dragon-11.jpg';
import dragon12 from '@/assets/dragon-12.jpg';
import dragon13 from '@/assets/dragon-13.jpg';
import dragon14 from '@/assets/dragon-14.jpg';
import dragon15 from '@/assets/dragon-15.jpg';
import dragon16 from '@/assets/dragon-16.jpg';
import dragon17 from '@/assets/dragon-17.jpg';
import dragon18 from '@/assets/dragon-18.jpg';
import joker from '@/assets/joker.jpg';
import freeze from '@/assets/freeze.jpg';

function createInitialCards(): CardType[] {
  return [
    {
      id: 1,
      image: getImageSourceByName('dragon-1.jpg', dragon1),
      alt: 'memory game card',
      isFlipped: false,
      isMatched: false,
      isJoker: false,
      isFreeze: false,
    },
    {
      id: 2,
      image: getImageSourceByName('dragon-2.jpg', dragon2),
      alt: 'memory game card',
      isFlipped: false,
      isMatched: false,
      isJoker: false,
      isFreeze: false,
    },
    {
      id: 3,
      image: getImageSourceByName('dragon-3.jpg', dragon3),
      alt: 'memory game card',
      isFlipped: false,
      isMatched: false,
      isJoker: false,
      isFreeze: false,
    },
    {
      id: 4,
      image: getImageSourceByName('dragon-4.jpg', dragon4),
      alt: 'memory game card',
      isFlipped: false,
      isMatched: false,
      isJoker: false,
      isFreeze: false,
    },
    {
      id: 5,
      image: getImageSourceByName('dragon-5.jpg', dragon5),
      alt: 'memory game card',
      isFlipped: false,
      isMatched: false,
      isJoker: false,
      isFreeze: false,
    },
    {
      id: 6,
      image: getImageSourceByName('dragon-6.jpg', dragon6),
      alt: 'memory game card',
      isFlipped: false,
      isMatched: false,
      isJoker: false,
      isFreeze: false,
    },
    {
      id: 7,
      image: getImageSourceByName('dragon-7.jpg', dragon7),
      alt: 'memory game card',
      isFlipped: false,
      isMatched: false,
      isJoker: false,
      isFreeze: false,
    },
    {
      id: 8,
      image: getImageSourceByName('dragon-8.jpg', dragon8),
      alt: 'memory game card',
      isFlipped: false,
      isMatched: false,
      isJoker: false,
      isFreeze: false,
    },
    {
      id: 9,
      image: getImageSourceByName('joker.jpg', joker),
      alt: 'memory game card',
      isFlipped: false,
      isMatched: false,
      isJoker: true,
      isFreeze: false,
    },
    {
      id: 10,
      image: getImageSourceByName('dragon-9.jpg', dragon9),
      alt: 'memory game card',
      isFlipped: false,
      isMatched: false,
      isJoker: false,
      isFreeze: false,
    },
    {
      id: 11,
      image: getImageSourceByName('dragon-10.jpg', dragon10),
      alt: 'memory game card',
      isFlipped: false,
      isMatched: false,
      isJoker: false,
      isFreeze: false,
    },
    {
      id: 12,
      image: getImageSourceByName('dragon-11.jpg', dragon11),
      alt: 'memory game card',
      isFlipped: false,
      isMatched: false,
      isJoker: false,
      isFreeze: false,
    },
    {
      id: 13,
      image: getImageSourceByName('dragon-12.jpg', dragon12),
      alt: 'memory game card',
      isFlipped: false,
      isMatched: false,
      isJoker: false,
      isFreeze: false,
    },
    {
      id: 14,
      image: getImageSourceByName('dragon-13.jpg', dragon13),
      alt: 'memory game card',
      isFlipped: false,
      isMatched: false,
      isJoker: false,
      isFreeze: false,
    },
    {
      id: 15,
      image: getImageSourceByName('dragon-14.jpg', dragon14),
      alt: 'memory game card',
      isFlipped: false,
      isMatched: false,
      isJoker: false,
      isFreeze: false,
    },
    {
      id: 16,
      image: getImageSourceByName('dragon-15.jpg', dragon15),
      alt: 'memory game card',
      isFlipped: false,
      isMatched: false,
      isJoker: false,
      isFreeze: false,
    },
    {
      id: 17,
      image: getImageSourceByName('dragon-16.jpg', dragon16),
      alt: 'memory game card',
      isFlipped: false,
      isMatched: false,
      isJoker: false,
      isFreeze: false,
    },
    {
      id: 18,
      image: getImageSourceByName('dragon-17.jpg', dragon17),
      alt: 'memory game card',
      isFlipped: false,
      isMatched: false,
      isJoker: false,
      isFreeze: false,
    },
    {
      id: 19,
      image: getImageSourceByName('dragon-18.jpg', dragon18),
      alt: 'memory game card',
      isFlipped: false,
      isMatched: false,
      isJoker: false,
      isFreeze: false,
    },
    {
      id: 20,
      image: getImageSourceByName('freeze.jpg', freeze),
      alt: 'memory game card',
      isFlipped: false,
      isMatched: false,
      isJoker: false,
      isFreeze: true,
    },
  ];
}

export const initialCards = createInitialCards();

export { createInitialCards };
