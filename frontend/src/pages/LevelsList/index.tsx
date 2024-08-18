import React from 'react';
import { useNavigate } from 'react-router-dom';
import { levelsListType } from './types';
import SubHeader from '@/components/SubHeader';
import Button from '@/components/Button';

import styles from './index.module.css';

export default function LevelsList() {
  const navigate = useNavigate();
  const levelsList: levelsListType[] = [
    { id: 1, title: 'Level 1' },
    { id: 2, title: 'Level 2' },
    { id: 3, title: 'Level 3' },
    { id: 4, title: 'Level 4' },
    { id: 5, title: 'Level 5' },
  ];
  const selectLevel = (id: number) => {
    if (id > 5) {
      navigate('/levels/list');
    }
    navigate(`/levels/list/${id}`);
  };
  return (
    <>
      <SubHeader title="Level List" path="/levels/difficulty" />

      <div className={styles.buttons_block}>
        {levelsList.map((level: levelsListType) => (
          <Button key={level.id} className={styles.button} onClick={() => selectLevel(level.id)}>
            {level.title}
          </Button>
        ))}
      </div>
    </>
  );
}
