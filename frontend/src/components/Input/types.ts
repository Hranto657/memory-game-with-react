import React from 'react';
import { RegisterOptions } from 'react-hook-form';

export interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  rules: RegisterOptions;
}
