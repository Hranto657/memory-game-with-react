// import axios from 'axios';
// import { JwtPayload, jwtDecode } from 'jwt-decode';
// import { getAccessToken, clearTokens } from '../services/AuthService';
// import { refreshAccessToken } from './refreshAccessToken';

// const isTokenExpired = (token: string): boolean => {
//   try {
//     const { exp } = jwtDecode<JwtPayload & { exp: number }>(token);
//     return exp * 1000 < Date.now();
//   } catch (error) {
//     return true; // Считаем токен истекшим, если не удалось его декодировать
//   }
// };

// export const setupInterceptors = () => {
//   axios.interceptors.request.use(
//     async (config) => {
//       console.log('Interceptor triggered', config);
//       let accessToken = getAccessToken();

//       if (accessToken && !isTokenExpired(accessToken)) {
//         config.headers!['Authorization'] = `Bearer ${accessToken}`;
//         return config;
//       }

//       accessToken = await refreshAccessToken();

//       if (!accessToken) {
//         clearTokens();
//         return Promise.reject('No access token available');
//       }

//       config.headers!['Authorization'] = `Bearer ${accessToken}`;
//       return config;
//     },
//     (error) => {
//       console.log('Interceptor error', error); // Лог для отслеживания ошибок в перехватчике
//       return Promise.reject(error);
//     }
//   );
// };
