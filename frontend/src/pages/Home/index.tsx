import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/contexts/UserContext';
import { Button, Login, Logout, Register } from '@/components';

import styles from './index.module.css';

export default function Home() {
  const navigate = useNavigate();
  const { user } = useUser();
  return (
    <div>
      <div className={styles.buttons_block}>
        <Button className={styles.button} onClick={() => navigate('/levels')}>
          Start
        </Button>
        <Button className={styles.button} onClick={() => navigate('levels/list/5')}>
          Try Game
        </Button>
        {!user ? (
          <>
            <Login />
            <Register />
          </>
        ) : (
          <Logout />
        )}
      </div>
    </div>
  );
}
