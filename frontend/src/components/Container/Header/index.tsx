import React from 'react';
import { useUser } from '@/contexts/UserContext';
import logo from '@/assets/logo.png';

import styles from './index.module.css';

export default function Header() {
  const { user } = useUser();
  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <img className={styles.logo_img} src={logo} alt="Logo" />
      </div>
      <div className={styles.title}>
        <h1 className={styles.title_text}>Matched Master</h1>
      </div>
      <div>
        <p>{user?.username}</p>
      </div>
    </div>
  );
}
