import React, { useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { FormValues } from './types';
import { useLoginUser } from '@/core/hooks/useLoginUser';
import { useUser } from '@/contexts/UserContext';
import { Button, Modal, Input } from '@/components';

import styles from './index.module.css';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Login() {
  const { mutateAsync } = useLoginUser();
  const { setUser, user } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const methods = useForm<FormValues>({ mode: 'onChange' });
  const { handleSubmit, reset } = methods;

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const onSubmit: SubmitHandler<{ email: string; password: string }> = async (data) => {
    try {
      const response = await mutateAsync({ username: data.email, password: data.password });
      console.log('Login successful:', response);
      if (response) {
        const { id, username, accessToken, refreshToken, level, count } = response;
        localStorage.setItem('user', JSON.stringify({ id, username, level, count }));
        setUser({ id, username, level, count }, accessToken, refreshToken);
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <>
      <Button onClick={openModal} className={styles.button}>
        Login
      </Button>

      <Modal isOpen={isModalOpen} onClose={closeModal} isVisible={true}>
        <h1 className={styles.title}>Login Form</h1>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Input
              name="email"
              type="email"
              rules={{
                required: 'Email is required',
                pattern: {
                  value: emailPattern,
                  message: 'Invalid email address format. Please enter a valid email address.',
                },
              }}
              placeholder="Email"
            />
            <Input
              name="password"
              type="password"
              rules={{
                required: 'Password is required',
              }}
              placeholder="Password"
            />

            <div className={styles.form_button_block}>
              <input className={styles.form_button} type="submit" value="Login" />
              <input
                className={styles.form_button}
                type="button"
                onClick={() => reset()}
                value="reset"
              />
            </div>
          </form>
        </FormProvider>
      </Modal>
    </>
  );
}
