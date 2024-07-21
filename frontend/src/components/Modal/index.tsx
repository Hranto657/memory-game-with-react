import React from 'react';
import { IModalItemProps } from './types';
import icon from '@/assets/close-icon.svg';

import styles from './index.module.css';

const Modal = ({ isOpen, onClose, children }: IModalItemProps) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modal_overlay}>
      <div className={styles.modal}>
        <div className={styles.modal_content}>
          {children}
          <button className={styles.modal_close_btn} onClick={onClose}>
            <img src={icon} alt="Close Icon" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
