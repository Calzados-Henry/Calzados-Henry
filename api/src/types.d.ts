export interface AddressI {
  id?: number
  id_user?: number
  address: string
  zip_code: number
  isActive: boolean
}

export type NewAddresEntry = Omit<AddressI, 'id' | 'id_user' | 'isActive'>