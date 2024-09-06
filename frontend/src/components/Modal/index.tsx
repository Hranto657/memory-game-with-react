import React from 'react';
import ReactDOM from 'react-dom';
import { IModalItemProps } from './types';
import icon from '@/assets/close-icon.svg';

import styles from './index.module.css';

export default function Modal({ isOpen, onClose, children }: IModalItemProps) {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className={styles.modal_overlay}>
      <div className={styles.modal}>
        <div className={styles.modal_content}>
          {children}
          <button className={styles.modal_close_btn} onClick={onClose}>
            <img className={styles.modal_close_btn_img} src={icon} alt="Close Icon" />
          </button>
        </div>
      </div>
    </div>,
    document.getElementById('modal-root')
  );
}
