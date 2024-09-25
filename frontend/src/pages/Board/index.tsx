import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGame } from '@/contexts';
import { CardType } from '@/types/commonTypes';
import { shuffleCards } from '@/helpers';
import { getCardsForLevel } from './functions';
import { SubHeader } from '@/components';
import Timer from './Timer';
import GameBoard from './GameBoard';

import styles from './index.module.css';

export default function Board() {
  const { theme, difficulty, level } = useParams();
  const navigate = useNavigate();
  const {
    setIsGameStarted,
    freezeTime,
    cards,
    setCards,
    setIsCardDisabled,
    flippedCards,
    matchedCards,
    resetFlippedCards,
    resetMatchedCards,
    shuffleAndReset,
  } = useGame();

  const [isFreezeActive, setIsFreezeActive] = useState(false);

  useEffect(() => {
    setCards(shuffleCards(getCardsForLevel(Number(level), difficulty, theme)));

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

      setIsCardDisabled(true);

      if (
        (firstCard.isJoker && !secondCard.isJoker) ||
        (secondCard.isJoker && !firstCard.isJoker)
      ) {
        setTimeout(resetFlippedCards, 1000);
        setTimeout(shuffleAndReset, 1600);
      } else if (firstCard.image === secondCard.image) {
        if (firstCard.isJoker && secondCard.isJoker) {
          setTimeout(resetMatchedCards, 1000);
          setTimeout(shuffleAndReset, 1600);
        } else if (firstCard.isFreeze && secondCard.isFreeze && !isFreezeActive) {
          freezeTime();
          setIsFreezeActive(true);

          setIsCardDisabled(false);
          setCards((prevCards: CardType[]) =>
            prevCards.map((card: CardType) =>
              card.id === firstId || card.id === secondId
                ? { ...card, isFreeze: true, isMatched: true, isFlipped: true }
                : card
            )
          );

          setTimeout(() => setIsFreezeActive(false), 5000);
        } else {
          setCards((prevCards: CardType[]) =>
            prevCards.map((card: CardType) =>
              card.id === firstId || card.id === secondId
                ? { ...card, isMatched: true, isFlipped: false }
                : card
            )
          );
          setTimeout(() => setIsCardDisabled(false), 1000);
        }
      } else {
        setTimeout(resetFlippedCards, 1000);
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

      <GameBoard />
      <Timer />
    </div>
  );
}
