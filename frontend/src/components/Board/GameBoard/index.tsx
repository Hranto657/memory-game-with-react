import React from 'react';
import { IGameBoardProps } from './types';
import { getColumns } from './functions';
import Card from '../Card';

import styles from './index.module.css';

const GameBoard = ({ level, cards, handleCardClick }: IGameBoardProps) => {
  return (
    <div className={styles.board} style={{ gridTemplateColumns: getColumns(level) }}>
      {cards.map((card) => (
        <Card
          key={card.id}
          id={card.id}
          image={card.image}
          alt={card.alt}
          isFlipped={card.isFlipped}
          isMatched={card.isMatched}
          onClick={handleCardClick}
          level={level}
        />
      ))}
    </div>
  );
};

export default React.memo(GameBoard);
