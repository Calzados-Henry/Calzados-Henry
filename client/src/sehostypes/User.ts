import { Roles } from './Roles';

export interface UserInfoI {
  id: number;
  name: string;
  email: string;
  rol: Roles;
}
