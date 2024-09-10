import React from 'react';
import { useUser } from '@/contexts/UserContext';
import { Button } from '@/components';

import styles from './index.module.css';

export default function Logout() {
  const { clearUser } = useUser();

  const handleLogout = () => {
    clearUser();
  };

  return (
    <Button onClick={handleLogout} className={styles.button}>
      Logout
    </Button>
  );
}
