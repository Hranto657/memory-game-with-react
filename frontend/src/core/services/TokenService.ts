import Cookies from 'js-cookie';

const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

const tokenService = {
  saveTokens: (accessToken: string, refreshToken: string): void => {
    Cookies.set(ACCESS_TOKEN_KEY, accessToken, { expires: 1 });
    Cookies.set(REFRESH_TOKEN_KEY, refreshToken, { expires: 7 });
  },

  getAccessToken: (): string | undefined => {
    return Cookies.get(ACCESS_TOKEN_KEY);
  },

  getRefreshToken: (): string | undefined => {
    return Cookies.get(REFRESH_TOKEN_KEY);
  },

  clearTokens: (): void => {
    Cookies.remove(ACCESS_TOKEN_KEY);
    Cookies.remove(REFRESH_TOKEN_KEY);
  },
};

export default tokenService;
