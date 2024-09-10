import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { UpdateUserResponseType, UpdateUserVariablesType } from '../types';
import UserUseCase from '@/core/useCases/UserUseCase';

export const useUpdateUser = (): UseMutationResult<UpdateUserResponseType, Error, UpdateUserVariablesType, unknown> => {
  return useMutation<UpdateUserResponseType, Error, UpdateUserVariablesType>({
    mutationFn: ({ userId, updateData }) => UserUseCase.updateUser({ userId, updateData }),
  });
};
