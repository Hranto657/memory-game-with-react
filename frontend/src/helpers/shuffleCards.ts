import { CardType } from '@/types/commonTypes';

export const shuffleCards = (cards: CardType[]) => {
  const newCards = [...cards];

  for (let i = newCards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newCards[i], newCards[j]] = [newCards[j], newCards[i]];
  }

  return newCards;
};
