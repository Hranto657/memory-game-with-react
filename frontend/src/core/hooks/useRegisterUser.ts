import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { RegisterDataType, RegisterResponseType } from '../types';
import UserUseCase from '@/core/useCases/UserUseCase';

export const useRegisterUser = (): UseMutationResult<RegisterResponseType, Error, RegisterDataType, unknown> => {
  return useMutation<RegisterResponseType, Error, RegisterDataType>({
    mutationFn: UserUseCase.registerUser,
  });
};
