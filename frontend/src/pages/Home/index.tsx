import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LevelThemesType } from './types';
import { levelThemes } from './constants';
import { Button } from '@/components';

import styles from './index.module.css';

export default function Home() {
  const navigate = useNavigate();

  const onSelectTheme = (title: string) => {
    navigate(`/${title.toLowerCase()}`);
  };

  return (
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
  );
}
