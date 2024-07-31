import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { CardType } from '@/types/commonTypes';
import { initialCards } from '@/data/initialCards';
import { shuffleCards } from '@/helpers/shuffleCards';
import Card from './Card';
import Timer from './Timer';
// import Login from '../Login';
// import Register from '../Register';

import styles from './index.module.css';

export default function Board() {
  const [cards, setCards] = useState<CardType[]>(initialCards);
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

      <div className={styles.board}>
        {cards.map((card) => (
          <Card
            key={card.id}
            id={card.id}
            image={card.image}
            alt={card.alt}
            isFlipped={card.isFlipped}
            isMatched={card.isMatched}
            onClick={handleCardClick}
          />
        ))}
      </div>
      <Timer
        isGameStarted={isGameStarted}
        setCards={setCards}
        setIsGameStarted={setIsGameStarted}
        setIsCardDisabled={setIsCardDisabled}
        matchedCards={matchedCards}
        flippedCards={flippedCards}
      />
      {/* <div className={styles.auth_buttons_block}>
        <Login />
        <Register />
      </div> */}
    </div>
  );
}
