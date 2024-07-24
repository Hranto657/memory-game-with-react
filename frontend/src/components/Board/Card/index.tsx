import React from 'react';
import { ICard } from './types';
import icon from '@/assets/card-back-icon.png';

import styles from './index.module.css';

const Card = ({ id, image, alt, isFlipped, isMatched, onClick }: ICard) => {
  const handleClick = () => {
    if (!isFlipped && !isMatched) {
      onClick(id);
    }
  };

  return (
    <div className={`${styles.card} ${isFlipped || isMatched ? styles.flipped : ''}`} onClick={handleClick}>
      <div className={styles.card_inner}>
        <div className={styles.card_front}>
          <img className={styles.card_front_img} src={image} alt={alt} />
        </div>
        <div className={styles.card_back}>
          <img className={styles.card_back_img} src={icon} alt="Card Back Icon" />
        </div>
      </div>
    </div>
  );
};

export default React.memo(Card);
