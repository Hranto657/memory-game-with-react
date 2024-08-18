import React from 'react';
import { useNavigate } from 'react-router-dom';
import { levelsDifficultyType } from './types';
import SubHeader from '@/components/SubHeader';
import Button from '@/components/Button';

import styles from './index.module.css';

export default function LevelsDifficulty() {
  const navigate = useNavigate();
  const levelsDifficulty: levelsDifficultyType[] = [
    { id: 1, title: 'Easy' },
    { id: 2, title: 'Normal' },
    { id: 3, title: 'Hard' },
    { id: 4, title: 'Very Hard' },
  ];
  const onSelectDifficulty = () => {
    navigate('/levels/list');
  };
  return (
    <>
      <SubHeader title="Level Difficulty" path="/levels" />
      <div className={styles.buttons_block}>
        {levelsDifficulty.map((levelDifficulty: levelsDifficultyType) => (
          <Button key={levelDifficulty.id} className={styles.button} onClick={() => onSelectDifficulty()}>
            {levelDifficulty.title}
          </Button>
        ))}
      </div>
    </>
  );
}
