import React from 'react';
import { IGameBoardProps } from './types';
import Card from '../Card';

import styles from './index.module.css';

const GameBoard = ({ cards, handleCardClick }: IGameBoardProps) => {
  return (
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
  );
};

export default React.memo(GameBoard);
