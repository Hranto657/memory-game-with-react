import { initialCards, initialCards2, createInitialCards, createInitialCards2 } from '@/data';

export const getCardsData = (theme: string) => {
  switch (theme) {
    case 'dragon':
      return createInitialCards();
    case 'mythical':
      return createInitialCards2();
    default:
      return theme === 'dragon' ? initialCards : initialCards2;
  }
};
