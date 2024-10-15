import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IWinModalProps } from './types';
import { Button, Modal } from '@/components';

import styles from './index.module.css';

const WinModal = ({ isModalOpen, closeModal, nextLevel, onNextLevel }: IWinModalProps) => {
  const { theme, difficulty } = useParams();
  const navigate = useNavigate();

  return (
    <Modal isOpen={isModalOpen} onClose={closeModal} isVisible={false}>
      {nextLevel > 5 ? (
        <>
          <h1>Congratulations!</h1>
          <p>You have completed all levels.</p>
          <div className={styles.buttons_block}>
            <Button className={styles.button} onClick={() => navigate('/')}>
              Home Page
            </Button>
          </div>
        </>
      ) : (
        <>
          <h1>You Win</h1>
          <div className={styles.buttons_block}>
            <Button className={styles.button} onClick={() => navigate(`/${theme}/${difficulty}/`)}>
              Back to List
            </Button>
            <Button className={styles.button} onClick={() => onNextLevel()}>
              Next Level
            </Button>
          </div>
        </>
      )}
    </Modal>
  );
};

export default React.memo(WinModal);
