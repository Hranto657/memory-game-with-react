import React from 'react';
import { IButtonProps } from './types';

import styles from './index.module.css';

export default function Button({ children, className = '', ...rest }: IButtonProps) {
  return (
    <button className={`${styles.button} ${className}`} {...rest}>
      {children}
    </button>
  );
}
