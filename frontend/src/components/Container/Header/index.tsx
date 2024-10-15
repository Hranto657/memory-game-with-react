import React from 'react';
import logo from '@/assets/logo.png';

import styles from './index.module.css';

export default function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <img className={styles.logo_img} src={logo} alt="Logo" />
      </div>
      <div className={styles.title}>
        <h1 className={styles.title_text}>Matched Master</h1>
      </div>
    </div>
  );
}
