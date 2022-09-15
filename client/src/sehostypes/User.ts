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

// Para traer cierta data
export interface UserInfoI extends Partial<UserI> {}

// Para los formularios de Datos personales
export interface UserPersonalInfoForm
  extends Pick<UserInfoI, 'id' | 'name' | 'last_name' | 'identification' | 'birth_date'> {}

// Para los datos de la cuenta
export interface UserDataInfoForm extends Pick<UserInfoI, 'id' | 'username' | 'phone' | 'email'> {}
