import React from 'react';
import { useNavigate } from 'react-router-dom';
import { levelThemesType } from './types';
import SubHeader from '@/components/SubHeader';
import Button from '@/components/Button';

import styles from './index.module.css';

export default function Levels() {
  const navigate = useNavigate();
  const levelThemes: levelThemesType[] = [
    { id: 1, title: 'Dragon', isAvailable: true },
    { id: 2, title: 'Mythical', isAvailable: true },
    { id: 3, title: 'Space', isAvailable: false },
    { id: 4, title: 'Jungle', isAvailable: false },
    { id: 5, title: 'Ocean', isAvailable: false },
  ];

  const onSelectTheme = (title: string) => {
    navigate(`/levels/difficulty/${title.toLowerCase()}`);
  };

  return (
    <>
      <SubHeader title="Level Theme" path="/" />

      <div className={styles.buttons_block}>
        {levelThemes.map((levelTheme: levelThemesType) => (
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
