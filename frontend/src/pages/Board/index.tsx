import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CardType } from '@/types/commonTypes';
import { initialCards } from '@/data/initialCards';
import { shuffleCards } from '@/helpers/shuffleCards';
import { getRequiredMatches } from './functions';
import Timer from '@/components/Board/Timer';
import GameBoard from '@/components/Board/GameBoard';

import styles from './index.module.css';

export default function Board() {
  const { level } = useParams();
  const [cards, setCards] = useState<CardType[]>([]);
  const [isCardDisabled, setIsCardDisabled] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);

  const flippedCards = useMemo(() => cards.filter((card) => card.isFlipped).map((card) => card.id), [cards]);
  const matchedCards = useMemo(() => cards.filter((card) => card.isMatched), [cards]);

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

  const getCardsForLevel = (level: number) => {
    const pairs = getRequiredMatches(level) / 2;
    let shuffledCards = shuffleCards(initialCards.filter((card) => !card.isJoker));
    let selectedCards = shuffledCards.slice(0, pairs);

    let duplicatedCards = selectedCards.map((card) => ({
      ...card,
      id: card.id + 100,
    }));
    let levelCards = [...selectedCards, ...duplicatedCards];

    if (level >= 2) {
      const initialJokers = initialCards.filter((card) => card.isJoker);

      if (initialJokers.length > 0) {
        const joker = initialJokers[0];

        let duplicatedJokers = [joker, { ...joker, id: joker.id + 100 }];

        levelCards = [...levelCards, ...duplicatedJokers];
      }
    }
    return shuffleCards(levelCards);
  };

  useEffect(() => {
    setCards(shuffleCards(getCardsForLevel(Number(level))));
  }, [level]);

  useEffect(() => {
    if (flippedCards.length === 2) {
      setIsCardDisabled(true);

      const [firstId, secondId] = flippedCards;
      const firstCard = cards.find((card) => card.id === firstId);
      const secondCard = cards.find((card) => card.id === secondId);

      if (firstCard.isJoker || secondCard.isJoker) {
        setTimeout(() => {
          setCards((prevCards) => shuffleCards(prevCards.map((card) => ({ ...card, isFlipped: false }))));
          setIsCardDisabled(false);
        }, 1000);
      }

      if (firstCard?.image === secondCard?.image) {
        if (firstCard.isJoker && secondCard.isJoker) {
          setTimeout(() => {
            setCards((prevCards) =>
              shuffleCards(prevCards.map((card) => ({ ...card, isFlipped: false, isMatched: false })))
            );
            setIsCardDisabled(false);
          }, 1000);
        } else {
          setCards((prevCards) =>
            prevCards.map((card) =>
              card.id === firstId || card.id === secondId ? { ...card, isMatched: true, isFlipped: false } : card
            )
          );
          setIsCardDisabled(false);
        }
      } else {
        setTimeout(() => {
          setCards((prevCards) => prevCards.map((card) => ({ ...card, isFlipped: false })));
          setIsCardDisabled(false);
        }, 1000);
      }
    }
  }, [flippedCards, cards]);

  return (
    <div className={styles.main}>
      <div className={styles.title}>
        <h1>Memory Game</h1>
      </div>

      <div className={styles.header}>
        <p>Matched Pairs: {matchedCards.length / 2}</p>
        <p>Score: 0</p>
      </div>

      <GameBoard cards={cards} handleCardClick={handleCardClick} />
      <Timer
        isGameStarted={isGameStarted}
        setCards={setCards}
        setIsGameStarted={setIsGameStarted}
        setIsCardDisabled={setIsCardDisabled}
        level={Number(level)}
        matchedCards={matchedCards}
        flippedCards={flippedCards}
        getRequiredMatches={getRequiredMatches}
      />
    </div>
  );
}
