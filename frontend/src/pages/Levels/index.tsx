import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/Button';

import styles from './index.module.css';

export default function Levels() {
  const navigate = useNavigate();
  const levels: any = [
    { id: 1, title: 'Dragon' },
    { id: 2, title: 'Ocean' },
    { id: 3, title: 'Space' },
    { id: 4, title: 'Jungle' },
  ];
  return (
    <div>
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
          <Button key={level.id} className={styles.button} onClick={() => navigate('/levels/list')}>
            {level.title}
          </Button>
        ))}
      </div>
    </div>
  );
}
