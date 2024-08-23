import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CardType } from '@/types/commonTypes';
import { initialCards } from '@/data/initialCards';
import { initialCards2 } from '@/data/initialCards2';
import { shuffleCards } from '@/helpers/shuffleCards';
import { getRequiredMatches } from './functions';
import SubHeader from '@/components/SubHeader';
import Timer from './Timer';
import GameBoard from './GameBoard';

import styles from './index.module.css';

export default function Board() {
  const timerRef = useRef<{ freezeTimer: () => void }>(null);
  const { theme, difficulty, level } = useParams();
  const navigate = useNavigate();

  const [cards, setCards] = useState<CardType[]>([]);
  const [isCardDisabled, setIsCardDisabled] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isFreezeActive, setIsFreezeActive] = useState(false);

  const flippedCards = useMemo(() => cards.filter((card) => card.isFlipped).map((card) => card.id), [cards]);
  const matchedCards = useMemo(() => cards.filter((card) => card.isMatched), [cards]);

  const getCardsData = (theme: string) => {
    switch (theme) {
      case 'dragon':
        return initialCards;
      case 'mythical':
        return initialCards2;
    }
  };

  const handleCardClick = useCallback(
    (id: number) => {
      if (
        isCardDisabled ||
        flippedCards.includes(id) ||
        matchedCards.find((card) => card.id === id) ||
        !isGameStarted
      ) {
        return;
      }

      setCards((prevCards) => {
        const updatedCards = prevCards.map((card) => (card.id === id ? { ...card, isFlipped: true } : card));
        return updatedCards;
      });
    },
    [isCardDisabled, flippedCards, matchedCards, isGameStarted]
  );

  const getCardsForLevel = (level: number, difficulty: string) => {
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

  useEffect(() => {
    setCards(shuffleCards(getCardsForLevel(Number(level), difficulty)));
    if (Number(level) > 5) {
      navigate('/levels/list');
    }
  }, [level, theme, difficulty]);

  useEffect(() => {
    if (difficulty === 'easy') {
      setIsGameStarted(true);
    }
  }, [difficulty]);

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [firstId, secondId] = flippedCards;
      const firstCard = cards.find((card) => card.id === firstId);
      const secondCard = cards.find((card) => card.id === secondId);

      if (!firstCard || !secondCard) return;

      if (firstCard.isJoker || secondCard.isJoker) {
        setIsCardDisabled(true);
        setTimeout(() => {
          setCards((prevCards) => shuffleCards(prevCards.map((card) => ({ ...card, isFlipped: false }))));
          setIsCardDisabled(false);
        }, 1000);
      }
      if (firstCard.image === secondCard.image) {
        if (firstCard.isJoker && secondCard.isJoker) {
          setIsCardDisabled(true);
          setTimeout(() => {
            setCards((prevCards) =>
              shuffleCards(prevCards.map((card) => ({ ...card, isFlipped: false, isMatched: false })))
            );
            setIsCardDisabled(false);
          }, 1000);
        } else if (firstCard.isFreeze && secondCard.isFreeze && !isFreezeActive) {
          setIsFreezeActive(true);
          timerRef.current.freezeTimer();
          setTimeout(() => setIsFreezeActive(false), 5000);

          setCards((prevCards) =>
            prevCards.map((card) => {
              if (card.id === firstId || card.id === secondId) {
                return { ...card, isFlipped: true, isFreeze: true, isMatched: false };
              }
              return card;
            })
          );
        } else {
          setIsCardDisabled(true);
          setCards((prevCards) =>
            prevCards.map((card) =>
              card.id === firstId || card.id === secondId ? { ...card, isMatched: true, isFlipped: false } : card
            )
          );
          setTimeout(() => {
            setIsCardDisabled(false);
          }, 1000);
        }
      } else {
        setIsCardDisabled(true);
        setTimeout(() => {
          setCards((prevCards) => prevCards.map((card) => ({ ...card, isFlipped: false })));
          setIsCardDisabled(false);
        }, 1000);
      }
    }
  }, [flippedCards, isFreezeActive]);

  return (
    <div className={styles.main}>
      <SubHeader title={`Level ${level}`} path={`/levels/list/${theme}/${difficulty}`} />

      <div className={styles.header}>
        <p>Matched Pairs: {matchedCards.length / 2}</p>
        <p>Score: 0</p>
      </div>

      <GameBoard cards={cards} handleCardClick={handleCardClick} />
      <Timer
        ref={timerRef}
        isGameStarted={isGameStarted}
        setCards={setCards}
        setIsGameStarted={setIsGameStarted}
        setIsCardDisabled={setIsCardDisabled}
        level={Number(level)}
        matchedCards={matchedCards}
        flippedCards={flippedCards}
        getRequiredMatches={getRequiredMatches}
        difficulty={difficulty}
        theme={theme}
      />
    </div>
  );
}
