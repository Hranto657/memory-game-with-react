import React, { useState } from 'react';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import { FormValues } from './types';
import { useRegisterUser } from '@/core/hooks/useRegisterUser';
import { Button, Modal, Input } from '@/components';

import styles from './index.module.css';

const namePattern = /^[A-Za-z]{2,30}$/;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export default function Register() {
  const { mutate } = useRegisterUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const methods = useForm<FormValues>({ mode: 'onChange' });
  const { handleSubmit, reset } = methods;

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const response = await mutate({
        username: data.email,
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
      });
      console.log('Registration successful:', response);
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <>
      <Button onClick={openModal} className={styles.button}>
        Register
      </Button>
      <Modal isOpen={isModalOpen} onClose={closeModal} isVisible={true}>
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
              <input className={styles.form_button} type="submit" value="submit" />
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
