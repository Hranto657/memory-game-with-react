import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { levelsDifficultyType } from './types';
import SubHeader from '@/components/SubHeader';
import Button from '@/components/Button';

import styles from './index.module.css';

export default function LevelsDifficulty() {
  const navigate = useNavigate();
  const { theme } = useParams();
  const levelsDifficulty: levelsDifficultyType[] = [
    { id: 1, title: 'Easy' },
    { id: 2, title: 'Normal' },
    { id: 3, title: 'Hard' },
    { id: 4, title: 'VeryHard' },
  ];
  const onSelectDifficulty = (difficulty: string) => {
    navigate(`/levels/list/${theme}/${difficulty.toLowerCase()}`);
  };
  return (
    <>
      <SubHeader title="Level Difficulty" path={`/levels`} />
      <div className={styles.buttons_block}>
        {levelsDifficulty.map((levelDifficulty: levelsDifficultyType) => (
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
