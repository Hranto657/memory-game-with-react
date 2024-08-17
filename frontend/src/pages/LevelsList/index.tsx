import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/Button';

import styles from './index.module.css';

export default function LevelsList() {
  const navigate = useNavigate();
  const levels: any = [
    { id: 1, title: 'Level 1' },
    { id: 2, title: 'Level 2' },
    { id: 3, title: 'Level 3' },
    { id: 4, title: 'Level 4' },
    { id: 5, title: 'Level 5' },
  ];
  return (
    <>
      <div className={styles.title}>
        <h1>Memory Game</h1>
      </div>
      <div className={styles.back_button_block}>
        <Button className={styles.back_button} onClick={() => navigate(-1)}>
          Back
        </Button>
      </div>
      <div className={styles.buttons_block}>
        {levels.map((level: any) => (
          <Button key={level.id} className={styles.button} onClick={() => navigate(`/levels/list/${level.id}`)}>
            {level.title}
          </Button>
        ))}
      </div>
    </>
  );
}
