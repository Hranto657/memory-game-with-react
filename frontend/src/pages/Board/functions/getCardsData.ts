import { initialCards, initialCards2 } from '@/data';

export const getCardsData = (theme: string) => {
  switch (theme) {
    case 'dragon':
      return initialCards;
    case 'mythical':
      return initialCards2;
  }
};
