import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { LevelsListType } from './types';
import { levelsList } from './constants';
import { Button, SubHeader } from '@/components';

import styles from './index.module.css';

export default function LevelsList() {
  const navigate = useNavigate();
  const { theme, difficulty } = useParams();

  const selectLevel = (id: number) => {
    if (id > 5) {
      navigate('/levels/list');
    } else {
      navigate(`/levels/list/${theme}/${difficulty}/${id}`);
    }
  };

  return (
    <>
      <SubHeader title="Level List" path={`/levels/difficulty/${theme}`} />

      <div className={styles.buttons_block}>
        {levelsList.map((level: LevelsListType) => (
          <Button key={level.id} className={styles.button} onClick={() => selectLevel(level.id)}>
            {level.title}
          </Button>
        ))}
      </div>
    </>
  );
}
