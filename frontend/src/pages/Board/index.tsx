import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CardType } from '@/types/commonTypes';
import { shuffleCards } from '@/helpers';
import { getCardsForLevel } from './functions';
import { SubHeader } from '@/components';
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

  const handleCardClick = useCallback(
    (id: number) => {
      if (
        isCardDisabled ||
        flippedCards.includes(id) ||
        matchedCards.some((card) => card.id === id) ||
        !isGameStarted
      ) {
        return;
      }

      setCards((prevCards) => {
        return prevCards.map((card) => (card.id === id ? { ...card, isFlipped: true } : card));
      });
    },
    [isCardDisabled, flippedCards, matchedCards, isGameStarted]
  );

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

      const resetFlippedCards = () => {
        setCards((prevCards) => prevCards.map((card) => ({ ...card, isFlipped: false })));
        setIsCardDisabled(false);
      };

      const resetMatchedCards = () => {
        setCards((prevCards) => prevCards.map((card) => ({ ...card, isFlipped: false, isMatched: false })));
        setIsCardDisabled(false);
      };

      const shuffleAndReset = () => {
        setCards((prevCards) => shuffleCards(prevCards));
        setIsCardDisabled(false);
      };

      setIsCardDisabled(true);

      if ((firstCard.isJoker && !secondCard.isJoker) || (secondCard.isJoker && !firstCard.isJoker)) {
        setTimeout(resetFlippedCards, 1000);
        setTimeout(shuffleAndReset, 1600);
      } else if (firstCard.image === secondCard.image) {
        if (firstCard.isJoker && secondCard.isJoker) {
          setTimeout(resetMatchedCards, 1000);
          setTimeout(shuffleAndReset, 1600);
        } else if (firstCard.isFreeze && secondCard.isFreeze && !isFreezeActive) {
          timerRef.current?.freezeTimer();
          setTimeout(() => setIsFreezeActive(false), 5000);

          setCards((prevCards) =>
            prevCards.map((card) =>
              card.id === firstId || card.id === secondId
                ? { ...card, isFreeze: true, isMatched: true, isFlipped: true }
                : card
            )
          );
        } else {
          setCards((prevCards) =>
            prevCards.map((card) =>
              card.id === firstId || card.id === secondId ? { ...card, isMatched: true, isFlipped: false } : card
            )
          );
          setTimeout(() => setIsCardDisabled(false), 1000);
        }
      } else {
        setTimeout(resetFlippedCards, 1000);
      }
    }
  }, [flippedCards, cards, isFreezeActive]);

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
        difficulty={difficulty}
        theme={theme}
      />
    </div>
  );
}
