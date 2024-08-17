import React, { useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { FormValues } from './types';
import Modal from '../Modal';
import Input from '../Input';
import Button from '../Button';

import styles from './index.module.css';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Login() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const methods = useForm<FormValues>({ mode: 'onChange' });
  const { handleSubmit, reset } = methods;

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
  };
  return (
    <>
      <Button onClick={openModal} className={styles.button}>
        Login
      </Button>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
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
              <input className={styles.form_button} type="button" onClick={() => reset()} value="reset" />
            </div>
          </form>
        </FormProvider>
      </Modal>
    </>
  );
}
