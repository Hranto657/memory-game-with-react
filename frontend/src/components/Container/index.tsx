import React from 'react';
import { IContainerProps } from './types';

import styles from './index.module.css';

const Container = ({ children }: IContainerProps) => {
  return <div className={styles.container}>{children}</div>;
};

export default Container;
