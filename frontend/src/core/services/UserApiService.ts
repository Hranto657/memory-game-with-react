import axios from 'axios';
import { JwtPayload, jwtDecode } from 'jwt-decode';
import tokenService from './TokenService';
import { refreshAccessToken } from '../functions/refreshAccessToken';
import {
  LoginDataType,
  LoginResponseType,
  RegisterDataType,
  RegisterResponseType,
  UpdateUserResponseType,
  UpdateUserVariablesType,
} from '../types';

const isTokenExpired = (token: string): boolean => {
  try {
    const { exp } = jwtDecode<JwtPayload & { exp: number }>(token);
    return exp * 1000 < Date.now();
  } catch (error) {
    return true;
  }
};

const api = axios.create({
  baseURL: 'https://memorygameserver.vercel.app/auth/',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});

// Add to another file in the future
api.interceptors.request.use(
  async (config) => {
    console.log('Interceptor triggered', config);
    if (config.url.includes('/update')) {
      let accessToken = tokenService.getAccessToken();

      if (accessToken && !isTokenExpired(accessToken)) {
        config.headers!['Authorization'] = `Bearer ${accessToken}`;
        return config;
      }

      accessToken = await refreshAccessToken();

      if (!accessToken) {
        tokenService.clearTokens();
        return Promise.reject('No access token available');
      }

      config.headers!['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },

  (error) => {
    console.error('Interceptor error', error);
    return Promise.reject(error);
  }
);

const userApiService = {
  loginUser: async (loginData: LoginDataType): Promise<LoginResponseType> => {
    const response = await api.post('/login', loginData);
    return response.data;
  },

  registerUser: async (registerData: RegisterDataType): Promise<RegisterResponseType> => {
    const response = await api.post('/registration', registerData);
    return response.data;
  },

  updateUser: async ({ userId, updateData }: UpdateUserVariablesType): Promise<UpdateUserResponseType> => {
    const response = await api.put(`/update/${userId}`, updateData);
    return response.data;
  },

  // deleteUser: (userId) =>
  //   axios.delete(`http://localhost:5000/users/${userId}`, {
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Access-Control-Allow-Origin': '*',
  //     },
  //   }),
};

export default userApiService;
