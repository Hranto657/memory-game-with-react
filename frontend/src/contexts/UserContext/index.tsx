import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import { JwtPayload, jwtDecode } from 'jwt-decode';
import { UserContextType, UserType } from './types';
import tokenService from '@/core/services/TokenService';
// import { refreshAccessToken } from '@/core/functions/refreshAccessToken';

const UserContext = createContext<UserContextType | undefined>(undefined);

// Delete in the future if i don't used

// const isTokenExpired = (token: string): boolean => {
//   try {
//     const { exp } = jwtDecode<JwtPayload & { exp: number }>(token);
//     return exp * 1000 < Date.now();
//   } catch (error) {
//     return true;
//   }
// };

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const navigate = useNavigate();

  const setUserWithTokens = (user: UserType, accessToken: string, refreshToken: string) => {
    tokenService.saveTokens(accessToken, refreshToken);
    setUser(user);
  };

  const clearUser = () => {
    tokenService.clearTokens();
    setUser(null);
    localStorage.removeItem('user');
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const accessToken = tokenService.getAccessToken();
    const refreshToken = tokenService.getRefreshToken();

    // console.log(storedUser, 'storedUser');
    // console.log(accessToken, 'accessToken');

    if (storedUser && accessToken) {
      // console.log('FIRST IF');
      // console.log(isTokenExpired(accessToken));
      // if (isTokenExpired(accessToken)) {
      setUser(JSON.parse(storedUser));
      // }
      //  else if (refreshToken) {
      //   // console.log('ELSEIF 1');
      //   refreshAccessToken().then((newAccessToken) => {
      //     if (newAccessToken) {
      //       setUserWithTokens(JSON.parse(storedUser), newAccessToken, refreshToken);
      //     } else {
      //       clearUser();
      //     }
      //   });
      // } else {
      //   clearUser();
      // }
    } else if (refreshToken && !accessToken) {
      // refreshAccessToken().then(({ accessToken, newRefreshToken }) => {
      //   // console.log('ELSEIF 2');
      //   if (accessToken) {
      //     const user = JSON.parse(storedUser || '{}');
      //     setUserWithTokens(user, accessToken, newRefreshToken);
      //   } else {
      //     clearUser();
      //   }
      // });
    } else {
      // console.log('ELSE');
      clearUser();
      navigate('/');
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser: setUserWithTokens, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
