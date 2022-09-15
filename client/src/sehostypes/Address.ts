import { UserI } from './User';

export interface AddressI {
  id: number;
  id_user: UserI['id'];
  title: string;
  country: string;
  state: string;
  city: string;
  address: string;
  zip_code: string;
  isActive: boolean;
}

export interface AddressResponseDTO extends Omit<AddressI, 'id_user' | 'isActive'> {}
export interface AddressPostDTO extends AddressResponseDTO {}
