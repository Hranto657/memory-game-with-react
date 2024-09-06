import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LevelThemesType } from './types';
import { levelThemes } from './constants';
import { Button, SubHeader } from '@/components';

import styles from './index.module.css';

export default function Levels() {
  const navigate = useNavigate();

  const onSelectTheme = (title: string) => {
    navigate(`/levels/difficulty/${title.toLowerCase()}`);
  };

  return (
    <>
      <SubHeader title="Level Theme" path="/" />

      <div className={styles.buttons_block}>
        {levelThemes.map((levelTheme: LevelThemesType) => (
          <Button
            key={levelTheme.id}
            className={styles.button}
            onClick={() => onSelectTheme(levelTheme.title)}
            disabled={!levelTheme.isAvailable}
          >
            {levelTheme.title}
          </Button>
        ))}
      </div>
    </>
  );
}
