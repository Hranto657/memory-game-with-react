import React from 'react';
import { IButtonProps } from './types';

import styles from './index.module.css';

export default function Button({ children, ...rest }: IButtonProps) {
  return (
    <button className={styles.button} {...rest}>
      {children}
    </button>
  );
}
