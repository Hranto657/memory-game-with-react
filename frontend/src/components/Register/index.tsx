import React, { useState } from 'react';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import { FormValues } from './types';
import Modal from '../Modal';
import Input from '../Input';

import styles from './index.module.css';

const namePattern = /^[A-Za-z]{2,30}$/;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export default function Register() {
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
      <button className={styles.button} onClick={openModal}>
        Sign Up
      </button>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h1 className={styles.title}>Register Form</h1>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Input
              name="firstName"
              rules={{
                required: 'First name is required',
                pattern: {
                  value: namePattern,
                  message: 'Invalid first name',
                },
              }}
              placeholder="First Name"
            />
            <Input
              name="lastName"
              rules={{
                required: 'Last name is required',
                pattern: {
                  value: namePattern,
                  message: 'Invalid last name',
                },
              }}
              placeholder="Last Name"
            />
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
                pattern: {
                  value: passwordPattern,
                  message:
                    'Password must be at least 8 characters long, include letters, numbers, and special characters',
                },
              }}
              placeholder="Password"
            />

            <div className={styles.form_button_block}>
              <input className={styles.form_button} type="submit" />
              <input className={styles.form_button} type="button" onClick={() => reset()} value="reset" />
            </div>
          </form>
        </FormProvider>
      </Modal>
    </>
  );
}
