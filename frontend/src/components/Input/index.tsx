import React from 'react';
import { useFormContext, FieldError } from 'react-hook-form';
import { IInputProps } from './types';

import styles from './index.module.css';

export default function Input({ name, rules, ...rest }: IInputProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className={styles.input_block}>
      <input className={styles.input} {...register(name, rules)} {...rest} />
      {errors[name] && <p className={styles.error_message}>{(errors[name] as FieldError).message}</p>}
    </div>
  );
}
