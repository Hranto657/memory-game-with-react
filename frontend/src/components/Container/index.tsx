import React from 'react';
import { IContainerProps } from './types';
import Header from './Header';

import styles from './index.module.css';

const Container = ({ children }: IContainerProps) => {
  return (
    <div className={styles.container}>
      <Header />
      {children}
    </div>
  );
};

export default Container;
