import React from 'react';
import { IGameInfo } from './types';

import styles from './index.module.css';

function GameInfo({ matchedCards, onReset }: IGameInfo) {
  return (
    <div className={styles.gameInfo}>
      <div>Matched Pairs: {matchedCards.length / 2}</div>
      <button className={styles.gameInfo__button} onClick={onReset}>
        Reset Game
      </button>
    </div>
  );
}

export default React.memo(GameInfo);
