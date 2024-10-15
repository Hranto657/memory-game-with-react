import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useUser } from '@/contexts/UserContext';
import { useGame } from '@/contexts';
import { useUpdateUser } from '@/core/hooks/useUpdateUser';
import { getRequiredMatches } from '../functions';
import { Button, Modal } from '@/components';
import TimerButtons from './TimerButtons';

import styles from './index.module.css';

const Timer = () => {
  const { theme, difficulty, level } = useParams();
  const navigate = useNavigate();
  const { mutateAsync } = useUpdateUser();
  const { user } = useUser();
  const {
    matchedCards,
    pauseGame,
    getNextLevelTime,
    resetFlippedCards,
    resetMatchedCards,
    shuffleAndReset,
  } = useGame();
  // const nextLevel = Number(level) + 1;
  // const [isModalOpen, setIsModalOpen] = useState(false);

  // const closeModal = () => {
  //   setIsModalOpen(false);
  // };

  // const updateUser = async ({ userId, updateData }: any) => {
  //   const response = await mutateAsync({ userId, updateData });
  //   console.log(response, 'response');
  //   localStorage.setItem(
  //     'user',
  //     JSON.stringify({
  //       id: response.updatedUser._id,
  //       username: response.updatedUser.username,
  //       level: response.updatedUser.level,
  //       count: response.updatedUser.count,
  //     })
  //   );
  // };

  // const onNextLevel = () => {
  //   resetFlippedCards();
  //   resetMatchedCards();
  //   shuffleAndReset();
  //   updateUser({ userId: user.id, updateData: { count: 500 } });
  //   setTimeout(() => {
  //     navigate(`/levels/list/${theme}/${difficulty}/${nextLevel}`);
  //   });
  //   if (difficulty !== 'easy') {
  //     getNextLevelTime();
  //   }
  //   setIsModalOpen(false);
  // };

  // useEffect(() => {
  //   const requiredMatches =
  //     difficulty === 'veryhard'
  //       ? getRequiredMatches(Number(level), difficulty) + 2
  //       : getRequiredMatches(Number(level), difficulty);
  //   if (matchedCards.length === requiredMatches) {
  //     setIsModalOpen(true);
  //     if (difficulty !== 'easy') {
  //       pauseGame();
  //     }
  //   }
  // }, [matchedCards, level]);
  return (
    <>
      {difficulty !== 'easy' && (
        <div className={styles.main}>
          <TimerButtons />
        </div>
      )}
    </>
  );
};

export default React.memo(Timer);
