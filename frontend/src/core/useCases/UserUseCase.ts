import { LoginDataType, RegisterDataType, UpdateUserVariablesType } from '../types';
import userApiService from '../services/UserApiService';

const UserUseCase = {
  loginUser: async (loginData: LoginDataType) => {
    const response = await userApiService.loginUser(loginData);
    return response;
  },

  registerUser: async (registerData: RegisterDataType) => {
    const response = await userApiService.registerUser(registerData);
    return response;
  },

  updateUser: async ({ userId, updateData }: UpdateUserVariablesType) => {
    const response = await userApiService.updateUser({ userId, updateData });
    return response;
  },

  //   deleteUser: async (userId) => {
  //     const response = await userApiService.deleteUser(userId);
  //     return response.data;
  //   },
};

export default UserUseCase;
