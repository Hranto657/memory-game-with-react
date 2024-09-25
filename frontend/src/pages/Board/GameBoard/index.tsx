import React from 'react';
import { useGame } from '@/contexts';
import Card from '../Card';

import styles from './index.module.css';

const GameBoard = () => {
  const { cards } = useGame();
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
        />
      ))}
    </div>
  );
};

export default React.memo(GameBoard);
