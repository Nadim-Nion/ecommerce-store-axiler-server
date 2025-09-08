export type TUserRole = 'customer' | 'admin';

export type TUser = {
  name: string;
  email: string;
  password: string;
  role: TUserRole;
};
