import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { LevelsDifficultyType } from './types';
import { levelsDifficulty } from './constants';
import { Button, SubHeader } from '@/components';

import styles from './index.module.css';

export default function LevelsDifficulty() {
  const navigate = useNavigate();
  const { theme } = useParams();
  const onSelectDifficulty = (difficulty: string) => {
    navigate(`/levels/list/${theme}/${difficulty.toLowerCase()}`);
  };
  return (
    <>
      <SubHeader title="Level Difficulty" path={`/levels`} />
      <div className={styles.buttons_block}>
        {levelsDifficulty.map((levelDifficulty: LevelsDifficultyType) => (
          <Button
            key={levelDifficulty.id}
            className={styles.button}
            onClick={() => onSelectDifficulty(levelDifficulty.title)}
          >
            {levelDifficulty.title}
          </Button>
        ))}
      </div>
    </>
  );
}
