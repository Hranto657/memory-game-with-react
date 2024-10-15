// import axios from 'axios';
// import tokenService from '../services/TokenService';

// export const refreshAccessToken = async (): Promise<any> => {
//   const refreshToken = tokenService.getRefreshToken();
//   if (!refreshToken) {
//     tokenService.clearTokens();
//     return null;
//   }

//   try {
//     const response = await axios.post('https://memorygameserver.vercel.app/auth/refresh', {
//       refreshToken,
//     });

//     const { accessToken, refreshToken: newRefreshToken } = response.data;

//     tokenService.saveTokens(accessToken, newRefreshToken);

//     return { accessToken, newRefreshToken };
//   } catch (error) {
//     tokenService.clearTokens();
//     return null;
//   }
// };
