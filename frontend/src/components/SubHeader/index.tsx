import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ISubHeaderProps } from './types';
import Button from '../Button';

import styles from './index.module.css';

export default function SubHeader({ title, path }: ISubHeaderProps) {
  const navigate = useNavigate();
  return (
    <div className={styles.sub_header}>
      <div className={styles.back_button_block}>
        <Button className={styles.back_button} onClick={() => navigate(path)}>
          Back
        </Button>
      </div>
      <div className={styles.title}>
        <h1 className={styles.title_text}>{title}</h1>
      </div>
    </div>
  );
}
