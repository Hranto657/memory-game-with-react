import React from 'react';
import { useGame } from '@/contexts';

import styles from './index.module.css';

const Header = () => {
  const { matchedCards } = useGame();

  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <p>Matched Pairs: {matchedCards.length / 2}</p>
      </div>
    </div>
  );
};

export default Header;
