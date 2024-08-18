import React from 'react';
import { useNavigate } from 'react-router-dom';
import { levelThemesType } from './types';
import SubHeader from '@/components/SubHeader';
import Button from '@/components/Button';

import styles from './index.module.css';

export default function Levels() {
  const navigate = useNavigate();
  const levelThemes: levelThemesType[] = [
    { id: 1, title: 'Dragon' },
    { id: 2, title: 'Ocean' },
    { id: 3, title: 'Space' },
    { id: 4, title: 'Jungle' },
    { id: 5, title: 'Mythical' },
  ];
  return (
    <>
      <SubHeader title="Level Theme" path="/" />

      <div className={styles.buttons_block}>
        {levelThemes.map((levelTheme: levelThemesType) => (
          <Button key={levelTheme.id} className={styles.button} onClick={() => navigate('/levels/difficulty')}>
            {levelTheme.title}
          </Button>
        ))}
      </div>
    </>
  );
}
