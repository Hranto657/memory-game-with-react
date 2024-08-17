import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/Button';
import Login from '@/components/Login';
import Register from '@/components/Register';

import styles from './index.module.css';

export default function Home() {
  const navigate = useNavigate();
  return (
    <div>
      <div className={styles.title}>
        <h1>Memory Game</h1>
      </div>
      <div className={styles.buttons_block}>
        <Button className={styles.button} onClick={() => navigate('/levels')}>
          Start
        </Button>
        <Button className={styles.button} onClick={() => navigate('levels/list/5')}>
          Try Game
        </Button>
        <Login />
        <Register />
      </div>
    </div>
  );
}
