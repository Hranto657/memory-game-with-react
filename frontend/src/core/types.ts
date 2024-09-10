export type LoginDataType = {
  username: string;
  password: string;
};
export type LoginResponseType = {
  id: string;
  accessToken: string;
  refreshToken: string;
  username: string;
  count: number;
  level: number;
};

export type RegisterDataType = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  username: string;
};
export type RegisterResponseType = {
  message: string;
};

export type UpdateDataType = {
  level: number;
  count: number;
};
export type UpdateUserVariablesType = {
  userId: string;
  updateData: UpdateDataType;
};
export type UpdateUserResponseType = {
  message: string;
  updatedUser: UpdatedUserType;
};
export type UpdatedUserType = {
  _id: string;
  username: string;
  email: string;
  password: string;
  level: number;
  count: number;
  roles: string[];
  __v: number;
};
