import { Address, Users } from "../db"

//PATCH/address: enviar un objeto que contenga todos los datos de la direccion a editar
//junto con una propiedad llamada update: "la direccion". Ej: //! consultar si es conveniente pedir solo la direccion o un objeto con la direccion y el zip_code
//
// {...address,
// update:'Springfield 343'
//}

export const getAddress = async (id: string): Promise<object> => {
  const userAddresses: any = await Users.findByPk(id, { include: { model: Address } })

  if (!userAddresses?.Addresses && userAddresses) {
    throw new Error(`There's not any addresses for the user id: ${id}`)
  } else if (!userAddresses) {
    throw new Error(`There's not any user for the id: ${id}`)
  } else {
    return userAddresses.Addresses
  }
}

export const postAddress = async (id: string, body: any) => {
  const { address, zip_code, city, state, country, title }: any = body
  try {
    const newAddress: any = await Address.create({
      id_user: id,
      title: title,
      address: address,
      city: city,
      state: state,
      country: country,
      zip_code: zip_code,
    })
    return newAddress
  } catch (error) {
    return error
  }
}

export const patchAddress = async (value: any): Promise<object> => {
  var address: any = await Address.findByPk(value.id)
  if (address !== null) {
    if (address.address === value.address && address.zip_code === value.zip_code) {
      throw new Error(`Please type another address`)
    }
    address.set(value)
    await address.save()
    return address
  }
  throw new Error(`There's not any address with the id: ${value.id}`)
}

export const deleteAddress = async (value: any): Promise<object> => {
  const deletedAddress: any = await Address.findByPk(value.id)
  if (deletedAddress.isActive == false) {
    throw new Error(`${value.address} is already deleted`)
  } else {
    deletedAddress.isActive = false
    await deletedAddress.save()
  }
  return deletedAddress
}
