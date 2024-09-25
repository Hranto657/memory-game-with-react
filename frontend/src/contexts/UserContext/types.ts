export type UserType = {
  id: string;
  username: string;
  level: number;
  count: number;
};

export interface UserContextType {
  user: UserType | null;
  setUser: (user: UserType, accessToken: string, refreshToken: string) => void;
  clearUser: () => void;
}
