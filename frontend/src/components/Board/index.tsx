import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { shuffleCards } from '@/helpers/shuffleCards';
import { initialCards } from '@/data/initialCards';
import { CardType } from '@/types/commonTypes';
import GameInfo from './GameInfo';
import Card from './Card';
import Login from '../Login';
import Register from '../Register';

import styles from './index.module.css';

export default function Board() {
  const [cards, setCards] = useState<CardType[]>(initialCards);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isStarted, setIsStarted] = useState(false);

  const flippedCards = cards.filter((card) => card.isFlipped).map((card) => card.id);

  const matchedCards = useMemo(() => cards.filter((card) => card.isMatched), [cards]);

  const handleCardClick = (id: number) => {
    if (isDisabled || flippedCards.includes(id) || matchedCards.find((card) => card.id === id) || !isStarted) {
      return;
    }

    const flipCard = cards.find((card) => card.id === id);

    if (!flipCard) {
      return;
    }

    flipCard.isFlipped = true;

    setCards([...cards]);
  };

  const resetGame = useCallback(() => {
    const resetCards = initialCards.map((card) => ({
      ...card,
      isFlipped: false,
      isMatched: false,
    }));
    setCards(shuffleCards(resetCards));
    setIsDisabled(false);
    setIsStarted(false);
  }, [shuffleCards]);

  const startGame = () => {
    setIsStarted(true);
  };

  const pauseGame = () => {
    setIsStarted(false);
  };
  useEffect(() => {
    resetGame();
  }, [resetGame]);

  useEffect(() => {
    if (matchedCards.length === 12) {
      alert('You win');
      resetGame();
    }
  }, [matchedCards, resetGame]);

  useEffect(() => {
    if (flippedCards.length === 2) {
      setIsDisabled(true);

      const [firstId, secondId] = flippedCards;
      const firstCard = cards.find((card) => card.id === firstId);
      const secondCard = cards.find((card) => card.id === secondId);

      if (firstCard.image === secondCard.image) {
        setCards(
          cards.map((card) =>
            card.id === firstId || card.id === secondId
              ? { ...card, isMatched: true, isFlipped: false }
              : { ...card, isFlipped: false }
          )
        );
        setIsDisabled(false);
      } else {
        setTimeout(() => {
          const newCards = cards.map((card) => ({ ...card, isFlipped: false }));
          setCards(newCards);
          setIsDisabled(false);
        }, 1000);
      }
    }
  }, [cards, flippedCards, resetGame]);

  return (
    <div className={styles.main}>
      <h1>Memory Game</h1>
      <div className={styles.gameState__button}>
        <button className={styles.gameStart__button} onClick={startGame} disabled={isStarted}>
          Start Game
        </button>
        <button className={styles.gamePause__button} onClick={pauseGame} disabled={!isStarted}>
          Pause Game
        </button>
      </div>
      <div className={styles.auth_block}>
        <Login />
        <Register />
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
      <GameInfo matchedCards={matchedCards} onReset={resetGame} />
    </div>
  );
}
