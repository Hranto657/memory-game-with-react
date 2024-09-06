import { shuffleCards } from '@/helpers';
import { getCardsData, getRequiredMatches } from '../functions';

export const getCardsForLevel = (level: number, difficulty: string, theme: string) => {
  const pairs = getRequiredMatches(level, difficulty) / 2;
  let selectedThemeCards = getCardsData(theme.toLowerCase());
  let shuffledCards = shuffleCards(selectedThemeCards.filter((card) => !card.isJoker && !card.isFreeze));
  let selectedCards = shuffledCards.slice(0, pairs);

  let duplicatedCards = selectedCards.map((card) => ({
    ...card,
    id: card.id + 100,
  }));
  let levelCards = [...selectedCards, ...duplicatedCards];

  if (difficulty === 'hard' || difficulty === 'veryhard') {
    const initialJokers = selectedThemeCards.filter((card) => card.isJoker);

    if (initialJokers.length > 0) {
      const joker = initialJokers[0];

      let duplicatedJokers = [joker, { ...joker, id: joker.id + 100 }];

      levelCards = [...levelCards, ...duplicatedJokers];
    }
  }
  if (difficulty === 'veryhard') {
    const initialFreezes = selectedThemeCards.filter((card) => card.isFreeze);
    if (initialFreezes.length > 0) {
      const freeze = initialFreezes[0];

      let duplicatedJokers = [freeze, { ...freeze, id: freeze.id + 100 }];

      levelCards = [...levelCards, ...duplicatedJokers];
    }
  }
  return shuffleCards(levelCards);
};
