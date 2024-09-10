import axios from 'axios';
import tokenService from '../services/TokenService';

export const refreshAccessToken = async (): Promise<any> => {
  const refreshToken = tokenService.getRefreshToken();
  if (!refreshToken) {
    tokenService.clearTokens();
    return null;
  }

  try {
    const response = await axios.post('https://memorygameserver.vercel.app/auth/refresh', {
      refreshToken,
    });
    // console.log('REFRESHTOKENFUNCTION');
    // console.log(response);

    const { accessToken, refreshToken: newRefreshToken } = response.data;

    // console.log(newRefreshToken, 'new');
    // console.log(refreshToken, 'refresh');
    // console.log(accessToken, 'accesstoken');
    tokenService.saveTokens(accessToken, newRefreshToken);

    return { accessToken, newRefreshToken };
  } catch (error) {
    tokenService.clearTokens();
    return null;
  }
};
