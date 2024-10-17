import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ILoseModalProps } from './types';
import { Button, Modal } from '@/components';

import styles from './index.module.css';

const LoseModal = ({ isModalOpen, closeModal, onRestartLevel }: ILoseModalProps) => {
  const { theme, difficulty } = useParams();
  const navigate = useNavigate();

  return (
    <Modal isOpen={isModalOpen} onClose={closeModal} isVisible={false}>
      <h1>You lost</h1>
      <h2>Your time is up</h2>
      <div className={styles.buttons_block}>
        <Button className={styles.button} onClick={() => navigate(`/${theme}/${difficulty}/`)}>
          Back to List
        </Button>
        <Button className={styles.button} onClick={() => onRestartLevel()}>
          Restart Level
        </Button>
      </div>
    </Modal>
  );
};

export default React.memo(LoseModal);
