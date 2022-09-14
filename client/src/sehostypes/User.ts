export interface UserI {
  id: number;
  username: string;
  password: string;
  email: string;
  name: string;
  last_name: string;
  birth_date: Date;
  phone: string;
  identification: number;
  type_user: string;
  isActive: boolean;
}

export interface UserInfoI extends Partial<UserI> {}
