import React from 'react';
import { ICard } from './types';

import styles from './index.module.css';

export default function Card({ id, image, alt, isFlipped, isMatched, onClick }: ICard) {
  return (
    <div className={`${styles.card} ${isFlipped || isMatched ? styles.flipped : ''}`} onClick={() => onClick(id)}>
      <div className={styles.cardInner}>
        <div className={styles.cardFront}>
          <img className={styles.cardFront__img} src={image} alt={alt} />
        </div>
        <div className={styles.cardBack}></div>
      </div>
    </div>
  );
}
