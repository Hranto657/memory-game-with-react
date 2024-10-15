import React from 'react';
import { useParams } from 'react-router-dom';
import TimerButtons from './TimerButtons';

import styles from './index.module.css';

const Timer = () => {
  const { difficulty } = useParams();

  return (
    <>
      {difficulty !== 'easy' && (
        <div className={styles.main}>
          <TimerButtons />
        </div>
      )}
    </>
  );
};

export default Timer;
