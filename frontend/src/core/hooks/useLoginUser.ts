import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { LoginDataType, LoginResponseType } from '../types';
import UserUseCase from '@/core/useCases/UserUseCase';

export const useLoginUser = (): UseMutationResult<LoginResponseType, Error, LoginDataType, unknown> => {
  return useMutation<LoginResponseType, Error, LoginDataType>({
    mutationFn: UserUseCase.loginUser,
  });
};
