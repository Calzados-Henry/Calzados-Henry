import { Address, Users } from "../db"

//PATCH/address: enviar un objeto que contenga todos los datos de la direccion a editar
//junto con una propiedad llamada update: "la direccion". Ej: //! consultar si es conveniente pedir solo la direccion o un objeto con la direccion y el zip_code
//
// {...address,
// update:'Springfield 343'
//}

export const getAddress = async (id: string): Promise<object> => {
  const userAddresses: any = await Users.findByPk(id, { include: { model: Address } })
  if (userAddresses) {
    return userAddresses.Addresses
  } else {
    return []
  }
}

export const postAddress = async (id: string, body: any) => {
  const { address, zip_code, city, state, country, title }: any = body
  const user: any = await Users.findByPk(id)
  const newAddress = {
    id_user: id,
    title: title,
    address: address,
    city: city,
    state: state,
    country: country,
    zip_code: zip_code,
  }

  return await user.createAddress(newAddress)

  /* const [newAddress, created]: any = await Address.findOrCreate({
    where: {
      id_user: id,
      title: title,
      address: address,
      city: city,
      state: state,
      country: country,
      zip_code: zip_code
    }
  }) */

  /* console.log("NewAddress:", newAddress)
  console.log("Created", created)

  if (user && created) {
    await user.addAddress(newAddress)
    const userAddresses = await Users.findByPk(id, { include: { model: Address } })
    if (userAddresses) {
      return userAddresses
    }
  } else if (!created) {
    throw new Error(`The address ${newAddress.address} already exists`);
  } else if (!user) {
    throw new Error(`We couldn't find user with id: ${id}`)
  }
  throw new Error('An error has ocurred') */
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
  const deletedAddress = await Address.findByPk(value.id)
  await deletedAddress?.destroy()
  return { msg: "Done" }
}
