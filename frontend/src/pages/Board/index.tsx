import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Howl, Howler } from 'howler';
import { useGame } from '@/contexts';
import { CardType } from '@/types/commonTypes';
import { shuffleCards } from '@/helpers';
import { getBackgroundMusicPath, getCardsForLevel, getRequiredMatches } from './functions';
import { SubHeader } from '@/components';
import Header from './Header';
import Timer from './Timer';
import GameBoard from './GameBoard';
import WinModal from './WinModal';
import muteICon from '@/assets/mute_icon.png';

import styles from './index.module.css';
import LoseModal from './LoseModal';

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
    pauseGame,
    time,
    getNextLevelTime,
    getCurrentLevelTime,
  } = useGame();

  const nextLevel = Number(level) + 1;
  const [isMuted, setIsMuted] = useState(false);

  const backgroundMusicRef = useRef(null);

  const toggleMute = () => {
    setIsMuted((prevMuted) => {
      const newMuted = !prevMuted;
      backgroundMusicRef.current.mute(newMuted);
      return newMuted;
    });
  };

  const matchSound = new Howl({
    src: ['/sounds/match.wav'],
  });

  const levelCompleteSound = new Howl({
    src: ['/sounds/level_complete.wav'],
  });

  const levelLostSound = new Howl({
    src: ['/sounds/level_lost.wav'],
  });

  const [isWinModalOpen, setIsWinModalOpen] = useState(false);
  const [isLostModalOpen, setIsLostModalOpen] = useState(false);

  const closeWinModal = () => {
    setIsWinModalOpen(false);
  };

  const closeLostModal = () => {
    setIsLostModalOpen(false);
  };
  const [isFreezeActive, setIsFreezeActive] = useState(false);

  const onNextLevel = useCallback(() => {
    setTimeout(() => {
      resetFlippedCards();
      resetMatchedCards();
    }, 500);
    setTimeout(() => {
      shuffleAndReset();
    }, 800);
    setTimeout(() => {
      setIsWinModalOpen(false);
      navigate(`/${theme}/${difficulty}/${nextLevel}`);
    }, 1000);
    if (difficulty !== 'easy') {
      getNextLevelTime();
    }
  }, [isWinModalOpen]);

  const onRestartLevel = useCallback(() => {
    setTimeout(() => {
      resetFlippedCards();
      resetMatchedCards();
    }, 500);
    setTimeout(() => {
      shuffleAndReset();
      setIsLostModalOpen(false);
    }, 1000);

    getCurrentLevelTime();
  }, [isLostModalOpen]);

  useEffect(() => {
    setCards(shuffleCards(getCardsForLevel(Number(level), difficulty, theme)));

    if (Number(level) > 5) {
      navigate('/');
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
          matchSound.play();
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

  useEffect(() => {
    const requiredMatches =
      difficulty === 'veryhard'
        ? getRequiredMatches(Number(level), difficulty) + 2
        : getRequiredMatches(Number(level), difficulty);
    if (matchedCards.length === requiredMatches) {
      levelCompleteSound.play();
      setIsWinModalOpen(true);
      if (difficulty !== 'easy') {
        pauseGame();
      }
    }
  }, [matchedCards, level]);

  useEffect(() => {
    backgroundMusicRef.current = new Howl({
      src: getBackgroundMusicPath(theme),
      loop: true,
      volume: 0.1,
    });

    backgroundMusicRef.current.play();

    return () => {
      backgroundMusicRef.current.stop();
    };
  }, [theme]);

  useEffect(() => {
    if (time <= 0) {
      levelLostSound.play();
      setIsLostModalOpen(true);
      pauseGame();
    }
  }, [time]);

  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <SubHeader title={`Level ${level}`} path={`/${theme}/${difficulty}`} />
        <button onClick={toggleMute}>{isMuted ? 'Unmute' : 'Mute'}</button>
      </div>

      <Header />

      <GameBoard />
      <Timer />

      <WinModal
        isModalOpen={isWinModalOpen}
        closeModal={closeWinModal}
        nextLevel={nextLevel}
        onNextLevel={onNextLevel}
      />
      <LoseModal
        isModalOpen={isLostModalOpen}
        closeModal={closeLostModal}
        onRestartLevel={onRestartLevel}
      />
    </div>
  );
}
