import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSwipeable } from 'react-swipeable';
import { ISubHeaderProps } from './types';
import { Button } from '@/components';
import backIcon from '@/assets/back_arrow_icon.svg';

import styles from './index.module.css';

export default function SubHeader({ title, path }: ISubHeaderProps) {
  const navigate = useNavigate();

  const handlers = useSwipeable({
    onSwipedLeft: (eventData) => {
      eventData.event.preventDefault();
      navigate(path);
    },
    trackMouse: true,
  });

  return (
    <div {...handlers} className={styles.sub_header}>
      <Button className={styles.back_button} onClick={() => navigate(path)}>
        <div className={styles.back_icon}>
          <img src={backIcon} />
        </div>
      </Button>
      <div className={styles.title}>
        <h1 className={styles.title_text}>{title}</h1>
      </div>
    </div>
  );
}
